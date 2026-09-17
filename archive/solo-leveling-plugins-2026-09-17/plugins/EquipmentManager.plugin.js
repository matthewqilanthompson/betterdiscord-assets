/**
 * @name EquipmentManager
 * @description Lore-accurate Solo Leveling equipment system with boss drops, 10 equipment slots, set bonuses, and stat integration.
 * @version 1.0.0
 * @author matthewqilanthompson
 */
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// src/EquipmentManager/storage.js
var require_storage = __commonJS({
  "src/EquipmentManager/storage.js"(exports2, module2) {
    var DB_NAME = "EquipmentManagerDB";
    var DB_VERSION = 1;
    var STORE_INVENTORY = "inventory";
    var STORE_EQUIPPED = "equipped";
    var FLUSH_DEBOUNCE_MS = 2e3;
    var EquipmentStorage2 = class {
      constructor() {
        this._db = null;
        this._inventory = /* @__PURE__ */ new Map();
        this._equipped = /* @__PURE__ */ new Map();
        this._dirty = /* @__PURE__ */ new Set();
        this._dirtyKeys = {
          [STORE_INVENTORY]: /* @__PURE__ */ new Set(),
          [STORE_EQUIPPED]: /* @__PURE__ */ new Set()
        };
        this._deletedKeys = {
          [STORE_INVENTORY]: /* @__PURE__ */ new Set(),
          [STORE_EQUIPPED]: /* @__PURE__ */ new Set()
        };
        this._flushTimer = null;
        this._ready = false;
        this._version = 0;
      }
      /** Monotonically increasing counter — changes whenever inventory or equipped changes. */
      get version() {
        return this._version;
      }
      // ---------------------------------------------------------------------------
      // Lifecycle
      // ---------------------------------------------------------------------------
      /**
       * Open the IDB database, create stores on first run, then load all data into
       * the in-memory cache. Must be called before any read/write operations.
       */
      async open() {
        if (this._db) return;
        await new Promise((resolve, reject) => {
          const req = indexedDB.open(DB_NAME, DB_VERSION);
          req.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains(STORE_INVENTORY)) {
              db.createObjectStore(STORE_INVENTORY, { keyPath: "instanceId" });
            }
            if (!db.objectStoreNames.contains(STORE_EQUIPPED)) {
              db.createObjectStore(STORE_EQUIPPED, { keyPath: "slot" });
            }
          };
          req.onsuccess = (e) => {
            this._db = e.target.result;
            resolve();
          };
          req.onerror = (e) => {
            console.error("[EquipmentManager] IDB open failed:", e.target.error);
            reject(e.target.error);
          };
        });
        await this.loadAll();
      }
      /**
       * Read both stores into memory. Called once after open(). Safe to call
       * again to re-sync from disk (discards any in-memory dirty state).
       */
      async loadAll() {
        if (!this._db) return;
        try {
          const tx = this._db.transaction([STORE_INVENTORY, STORE_EQUIPPED], "readonly");
          const [inventoryRecords, equippedRecords] = await Promise.all([
            this._getAllFromStore(tx, STORE_INVENTORY),
            this._getAllFromStore(tx, STORE_EQUIPPED)
          ]);
          this._inventory.clear();
          for (const record of inventoryRecords) {
            this._inventory.set(record.instanceId, record);
          }
          this._equipped.clear();
          for (const record of equippedRecords) {
            this._equipped.set(record.slot, record.instanceId);
          }
          this._ready = true;
        } catch (err) {
          console.error("[EquipmentManager] loadAll failed:", err);
        }
      }
      /** Flush dirty stores and close the IDB connection. */
      async close() {
        this._cancelFlushTimer();
        await this.flush();
        if (this._db) {
          this._db.close();
          this._db = null;
        }
        this._ready = false;
      }
      // ---------------------------------------------------------------------------
      // Read API
      // ---------------------------------------------------------------------------
      /** Returns all inventory instances as an Array. */
      getInventory() {
        return Array.from(this._inventory.values());
      }
      /** Returns equipped slots as a plain object { [slot]: instanceId }. */
      getEquipped() {
        const result = {};
        for (const [slot, instanceId] of this._equipped) {
          result[slot] = instanceId;
        }
        return result;
      }
      /**
       * O(1) lookup of a single inventory instance (2026-07-13). Callers used to
       * rebuild a full instanceId→item Map (or run a linear .find()) for a single
       * lookup — up to 3-4 times per equip click — even though the authoritative
       * Map already lives here.
       */
      getInstance(instanceId) {
        return this._inventory.get(instanceId) ?? null;
      }
      get isReady() {
        return this._ready;
      }
      // ---------------------------------------------------------------------------
      // Write API
      // ---------------------------------------------------------------------------
      /** Mark a key for write (put) on next flush. */
      _markPut(storeName, key) {
        this._deletedKeys[storeName].delete(key);
        this._dirtyKeys[storeName].add(key);
        this._dirty.add(storeName);
      }
      /** Mark a key for deletion on next flush. */
      _markDelete(storeName, key) {
        this._dirtyKeys[storeName].delete(key);
        this._deletedKeys[storeName].add(key);
        this._dirty.add(storeName);
      }
      /** Add or overwrite an equipment instance in inventory. */
      addToInventory(instance) {
        this._inventory.set(instance.instanceId, instance);
        this._markPut(STORE_INVENTORY, instance.instanceId);
        this._version++;
        this._scheduleFlush();
      }
      /** Remove an equipment instance from inventory by instanceId. */
      removeFromInventory(instanceId) {
        if (!this._inventory.has(instanceId)) return;
        this._inventory.delete(instanceId);
        this._markDelete(STORE_INVENTORY, instanceId);
        this._version++;
        this._scheduleFlush();
      }
      /** Assign an instanceId to a slot. */
      setEquipped(slot, instanceId) {
        this._equipped.set(slot, instanceId);
        this._markPut(STORE_EQUIPPED, slot);
        this._version++;
        this._scheduleFlush();
      }
      /** Remove whatever is equipped in a slot. */
      clearEquipped(slot) {
        if (!this._equipped.has(slot)) return;
        this._equipped.delete(slot);
        this._markDelete(STORE_EQUIPPED, slot);
        this._version++;
        this._scheduleFlush();
      }
      // ---------------------------------------------------------------------------
      // Flush
      // ---------------------------------------------------------------------------
      /**
       * Write all dirty stores to IDB in a single atomic transaction.
       * Both inventory and equipped are written together so a crash between
       * them cannot leave dangling equipped slots referencing missing instances.
       * Dirty entries are cleared optimistically; re-marked on failure.
       */
      async flush() {
        if (!this._db || this._dirty.size === 0) return;
        const dirtyStores = [...this._dirty];
        this._dirty.clear();
        const putSnapshot = {};
        const delSnapshot = {};
        for (const storeName of dirtyStores) {
          putSnapshot[storeName] = [...this._dirtyKeys[storeName]];
          delSnapshot[storeName] = [...this._deletedKeys[storeName]];
          this._dirtyKeys[storeName].clear();
          this._deletedKeys[storeName].clear();
        }
        const requeue = () => {
          for (const storeName of dirtyStores) {
            for (const k of putSnapshot[storeName]) {
              if (!this._deletedKeys[storeName].has(k)) this._dirtyKeys[storeName].add(k);
            }
            for (const k of delSnapshot[storeName]) {
              if (!this._dirtyKeys[storeName].has(k)) this._deletedKeys[storeName].add(k);
            }
            this._dirty.add(storeName);
          }
        };
        return new Promise((resolve, reject) => {
          try {
            const tx = this._db.transaction(dirtyStores, "readwrite");
            for (const storeName of dirtyStores) {
              const store = tx.objectStore(storeName);
              const sourceMap = storeName === STORE_INVENTORY ? this._inventory : this._equipped;
              for (const key of delSnapshot[storeName]) {
                const delReq = store.delete(key);
                delReq.onerror = (e) => {
                  console.error(`[EquipmentManager] delete failed for "${storeName}" key:`, key, e.target.error);
                  try {
                    tx.abort();
                  } catch (_) {
                  }
                };
              }
              for (const key of putSnapshot[storeName]) {
                const record = storeName === STORE_INVENTORY ? sourceMap.get(key) : sourceMap.has(key) ? { slot: key, instanceId: sourceMap.get(key) } : void 0;
                if (record === void 0) continue;
                const putReq = store.put(record);
                putReq.onerror = (e) => {
                  console.error(
                    `[EquipmentManager] put failed for "${storeName}" record:`,
                    record,
                    e.target.error
                  );
                  try {
                    tx.abort();
                  } catch (_) {
                  }
                };
              }
            }
            tx.oncomplete = () => resolve(true);
            tx.onerror = (e) => {
              console.error("[EquipmentManager] flush transaction failed:", e.target.error);
              requeue();
              reject(tx.error);
            };
            tx.onabort = () => {
              console.error("[EquipmentManager] flush transaction aborted");
              requeue();
              reject(tx.error || new Error("Transaction aborted"));
            };
          } catch (err) {
            console.error("[EquipmentManager] flush error:", err);
            requeue();
            reject(err);
          }
        });
      }
      // ---------------------------------------------------------------------------
      // Private helpers
      // ---------------------------------------------------------------------------
      _scheduleFlush() {
        this._cancelFlushTimer();
        this._flushTimer = setTimeout(() => {
          this._flushTimer = null;
          this.flush();
        }, FLUSH_DEBOUNCE_MS);
      }
      _cancelFlushTimer() {
        if (this._flushTimer !== null) {
          clearTimeout(this._flushTimer);
          this._flushTimer = null;
        }
      }
      /** Build the array of records to write for a given store name. */
      /** Promise wrapper around IDBObjectStore.getAll() within an existing tx. */
      _getAllFromStore(tx, storeName) {
        return new Promise((resolve, reject) => {
          const req = tx.objectStore(storeName).getAll();
          req.onsuccess = () => resolve(req.result);
          req.onerror = (e) => reject(e.target.error);
        });
      }
    };
    module2.exports = { EquipmentStorage: EquipmentStorage2 };
  }
});

// src/EquipmentManager/constants.js
var require_constants = __commonJS({
  "src/EquipmentManager/constants.js"(exports2, module2) {
    var EQUIPMENT_SLOTS = Object.freeze({
      weapon: { label: "Weapon", icon: "\u2694\uFE0F" },
      offHand: { label: "Off-Hand", icon: "\u{1F6E1}\uFE0F" },
      helmet: { label: "Helmet", icon: "\u26D1\uFE0F" },
      chestplate: { label: "Chestplate", icon: "\u{1F9E5}" },
      gloves: { label: "Gloves", icon: "\u{1F9E4}" },
      boots: { label: "Boots", icon: "\u{1F462}" },
      earring: { label: "Earring", icon: "\u{1F48E}" },
      necklace: { label: "Necklace", icon: "\u{1F4FF}" },
      ring1: { label: "Ring (L)", icon: "\u{1F48D}" },
      ring2: { label: "Ring (R)", icon: "\u{1F48D}" }
    });
    var RARITY_COLORS = Object.freeze({
      E: "#9ca3af",
      D: "#60a5fa",
      C: "#34d399",
      B: "#a78bfa",
      A: "#f59e0b",
      S: "#ef4444",
      SS: "#ec4899",
      SSS: "#8b5cf6",
      // Endgame tiers — same hexes the rest of the suite uses for these ranks.
      "SSS+": "#c084fc",
      NH: "#14b8a6",
      Monarch: "#fbbf24",
      "Monarch+": "#f97316",
      // Terminal tier. Matches the 'Shadow Monarch' hex already used by
      // ShadowSenses/constants.js and ShadowArmy/modal.js.
      "Shadow Monarch": "#8a2be2"
    });
    var STAT_KEYS = Object.freeze([
      "strength",
      "agility",
      "intelligence",
      "vitality",
      "perception",
      "attack",
      "defense",
      "critChance",
      "critDamage"
    ]);
    var EMPTY_STATS = Object.freeze({
      strength: 0,
      agility: 0,
      intelligence: 0,
      vitality: 0,
      perception: 0,
      attack: 0,
      defense: 0,
      critChance: 0,
      critDamage: 0
    });
    var EQUIPMENT_DATABASE = {
      // ── Weapons ─────────────────────────────────────────────────────────────
      kasakas_venom_fang: {
        id: "kasakas_venom_fang",
        name: "Kasaka's Venom Fang",
        slot: "weapon",
        rarity: "C",
        icon: "\u{1F5E1}\uFE0F",
        description: "A curved dagger dripping with Kasaka the Water Snake King's paralytic venom. Inflicts paralysis and bleed on hit.",
        levelReq: 15,
        stats: { ...EMPTY_STATS, attack: 25 },
        specialEffects: ["On hit: 12% chance to inflict Paralysis for 3s", "On hit: 15% chance to inflict Bleed (2 stacks)"],
        setId: null,
        source: "Dropped by Kasaka the Water Snake King \u2014 C-rank dungeon boss",
        lore: "The fangs of a water serpent king, still slick with venom centuries after the beast's death. Hunters who wield it report a faint hissing in their sleep."
      },
      knight_killer: {
        id: "knight_killer",
        name: "Knight Killer",
        slot: "weapon",
        rarity: "B",
        icon: "\u{1F5E1}\uFE0F",
        description: "A brutal short sword forged to pierce plate armour. Favoured by assassin-class hunters who target armoured dungeon knights.",
        levelReq: 40,
        stats: { ...EMPTY_STATS, attack: 75, strength: 10 },
        specialEffects: ["Ignores 10% of target's physical defense"],
        setId: null,
        source: "Purchasable from the Hunter's Association black-market armoury at B-rank",
        lore: "Designed in the early days of the Gate crisis when knight-class mobs began appearing in high-frequency B-rank dungeons. Smiths never gave it a fancier name \u2014 knights die when they see it, and that said everything."
      },
      barukas_dagger: {
        id: "barukas_dagger",
        name: "Baruka's Dagger",
        slot: "weapon",
        rarity: "A",
        icon: "\u{1F5E1}\uFE0F",
        description: "The ceremonial blade of Baruka, Chieftain of the Ice Elves. Etched with runes that amplify the speed of the wielder.",
        levelReq: 80,
        stats: { ...EMPTY_STATS, attack: 110, agility: 10 },
        specialEffects: ["Dash cooldown reduced by 20%", "Attack speed +8%"],
        setId: null,
        source: "Dropped by Baruka, Chieftain of the Ice Elves \u2014 A-rank dungeon final boss",
        lore: `"Speed is the only truth." \u2014 Baruka's final words before Sung Jin-Woo claimed his blade. The runes still pulse cold blue even in warm hands.`
      },
      demon_kings_daggers: {
        id: "demon_kings_daggers",
        name: "Demon King's Daggers",
        slot: "weapon",
        rarity: "S",
        icon: "\u2694\uFE0F",
        description: "Twin daggers forged from the essence of a Demon King. In the hands of the Shadow Monarch they move as one, extensions of a single will.",
        levelReq: 150,
        stats: { ...EMPTY_STATS, attack: 220, strength: 15, agility: 15 },
        specialEffects: ["Two As One: dual-wield attacks strike simultaneously, dealing 100% damage each", "Shadow Affinity: +15% damage against demon-type enemies"],
        setId: null,
        source: "Guaranteed drop \u2014 Demon Castle floor 100 final boss",
        lore: "A matched pair. Legends say the Demon King forged them so his left hand would never outpace his right. Sung Jin-Woo gave them a new purpose: ending kings."
      },
      demon_kings_longsword: {
        id: "demon_kings_longsword",
        name: "Demon King's Longsword",
        slot: "weapon",
        rarity: "S",
        icon: "\u2694\uFE0F",
        description: "A towering longsword left behind by a fallen Demon King. Channels the wielder's mana into cascading arcs of white flame.",
        levelReq: 180,
        stats: { ...EMPTY_STATS, attack: 350, strength: 20 },
        specialEffects: ["Storm of White Flames: charged heavy attack releases a mana-flame arc dealing 250% ATK", "Intimidation Aura: enemies below level 120 suffer 15% ATK reduction"],
        setId: null,
        source: "Rare drop \u2014 Demon Castle floor 100 final boss",
        lore: "The white flames do not burn the wielder \u2014 they only recognise the strong. Those too weak to control the blade report it feels as heavy as a mountain."
      },
      kamishs_wrath: {
        id: "kamishs_wrath",
        name: "Kamish's Wrath",
        slot: "weapon",
        rarity: "SS",
        icon: "\u{1F409}",
        description: "Twin dragon-bone daggers carved from the teeth of Kamish, the Catastrophe-class Dragon. The most powerful weapons ever documented on the Korean peninsula.",
        levelReq: 300,
        stats: { ...EMPTY_STATS, attack: 1500, strength: 30, agility: 30 },
        specialEffects: ["Dragon Fang: every 5th attack releases a Dragon Breath projectile dealing 400% ATK", "Draconic Resonance: +25% critical strike damage", "Unbreakable: cannot be destroyed or lost on death"],
        setId: null,
        source: "Carved from the corpse of Kamish by Sung Jin-Woo using Shadow Extraction",
        lore: '"Even dead, the dragon bites." The teeth of Kamish were harder than any known alloy. When Sung Jin-Woo fashioned them into daggers the magic within simply\u2026 stayed.'
      },
      // ── Off-Hand ─────────────────────────────────────────────────────────────
      iron_shield: {
        id: "iron_shield",
        name: "Iron Shield",
        slot: "offHand",
        rarity: "D",
        icon: "\u{1F6E1}\uFE0F",
        description: "A basic reinforced iron shield issued to rookie tank-class hunters. Reliable but unremarkable.",
        levelReq: 10,
        stats: { ...EMPTY_STATS, defense: 10, vitality: 5 },
        specialEffects: ["Block: 8% chance to fully block incoming attack"],
        setId: null,
        source: "Purchasable from any Hunter's Association supply depot",
        lore: "Tens of thousands were manufactured in the first year after Gates opened. Most hunters replace them by level 20; a few sentimentalists keep them forever."
      },
      knights_guard: {
        id: "knights_guard",
        name: "Knight's Guard",
        slot: "offHand",
        rarity: "B",
        icon: "\u{1F6E1}\uFE0F",
        description: "A reinforced kite shield used by elite knight-class hunters. The central boss is engraved with the Korean Hunter's Association crest.",
        levelReq: 45,
        stats: { ...EMPTY_STATS, defense: 30, vitality: 10 },
        specialEffects: ["Block: 18% chance to fully block incoming attack", "Shield Bash: activatable skill deals 80% ATK and stuns for 1.5s (12s CD)"],
        setId: null,
        source: "Dropped by dungeon knight captains (B-rank and above)",
        lore: "The Association's crest is not decorative \u2014 it encodes a micro-enchantment that strengthens the bearer's resolve when outnumbered."
      },
      shadow_monarchs_aegis: {
        id: "shadow_monarchs_aegis",
        name: "Shadow Monarch's Aegis",
        slot: "offHand",
        rarity: "Shadow Monarch",
        icon: "\u{1F311}",
        description: "A shield formed from condensed shadow energy, said to be the literal embodiment of the Shadow Monarch's will. Ordinary attacks phase through its surface as if striking smoke.",
        levelReq: 2e3,
        stats: { ...EMPTY_STATS, defense: 1e3, vitality: 80 },
        specialEffects: ["Shadow Absorption: absorbs 5% of all incoming damage as mana", "Domain: activatable 6s invulnerability bubble (120s CD)", "Unbreakable: cannot be destroyed or lost on death"],
        setId: "shadow_monarch_regalia",
        source: "Materialises for the Shadow Monarch",
        lore: "It does not exist in any physical sense. It is presence. The mere sight of it has caused S-rank monsters to hesitate."
      },
      // ── Helmets ───────────────────────────────────────────────────────────────
      leather_helm: {
        id: "leather_helm",
        name: "Leather Helm",
        slot: "helmet",
        rarity: "D",
        icon: "\u26D1\uFE0F",
        description: "Standard-issue leather helmet with a stiffened brow guard. Provides minimal protection but better than nothing for low-rank hunters.",
        levelReq: 8,
        stats: { ...EMPTY_STATS, defense: 5, vitality: 5 },
        specialEffects: [],
        setId: null,
        source: "Starting equipment; widely available at any Guild shop",
        lore: "The stitching on the chin-strap is always the first to go. Hunters have complained about this since year one. The Association keeps ordering the same design."
      },
      red_knights_helmet: {
        id: "red_knights_helmet",
        name: "Red Knight's Helmet",
        slot: "helmet",
        rarity: "S",
        icon: "\u26D1\uFE0F",
        description: "The visored helmet of the Red Knight, one of the Shadow Monarch's elite generals. Reinforced with mana-crystallised shadow steel.",
        levelReq: 160,
        stats: { ...EMPTY_STATS, defense: 50, strength: 20, vitality: 20 },
        specialEffects: ["Commander's Presence: allied shadows within 15m gain +5% ATK", "Mana Shell: absorbs the first lethal blow once per dungeon"],
        setId: null,
        source: "Obtained by extracting the Red Knight as a shadow and releasing the armour component",
        lore: "The red visor is not lacquered \u2014 the colour is an inherent property of the metal, forged in a realm where the sun sets but never rises."
      },
      // ── Chestplates ───────────────────────────────────────────────────────────
      chainmail_vest: {
        id: "chainmail_vest",
        name: "Chainmail Vest",
        slot: "chestplate",
        rarity: "C",
        icon: "\u{1F9E5}",
        description: "Interlocked steel rings over a padded gambeson. A solid mid-tier chest piece for hunters transitioning out of rookie gear.",
        levelReq: 20,
        stats: { ...EMPTY_STATS, defense: 15, vitality: 5 },
        specialEffects: ["Pierce Resistance: reduces piercing damage by 5%"],
        setId: null,
        source: "Common dungeon drop (C-rank or higher) / Hunter Guild armoury",
        lore: "The rings are sized precisely to deflect fangs and claws. Against bladed weapons, less so \u2014 a lesson every chainmail-wearer learns the hard way."
      },
      high_knights_chestplate: {
        id: "high_knights_chestplate",
        name: "High Knight's Chestplate",
        slot: "chestplate",
        rarity: "A",
        icon: "\u{1F9E5}",
        description: "Full plate chestpiece worn by dungeon high knights. Enchanted to distribute impact force across the entire surface, reducing blunt trauma.",
        levelReq: 90,
        stats: { ...EMPTY_STATS, defense: 35, strength: 15, vitality: 10 },
        specialEffects: ["Impact Distribution: blunt damage reduced by 12%", "Fortitude: max HP +5%"],
        setId: null,
        source: "Dropped by High Knight commanders (A-rank dungeon mini-bosses)",
        lore: "Found exclusively on the strongest humanoid elites in the Gate system. Researchers believe dungeon architects equipped these mobs with purpose-built armour to gatekeep floor progression."
      },
      // ── Gloves ────────────────────────────────────────────────────────────────
      steel_gauntlets: {
        id: "steel_gauntlets",
        name: "Steel Gauntlets",
        slot: "gloves",
        rarity: "C",
        icon: "\u{1F9E4}",
        description: "Heavy plate gauntlets that reinforce every punch. A staple for fighter-class hunters who prefer to let their fists do the talking.",
        levelReq: 18,
        stats: { ...EMPTY_STATS, defense: 15, strength: 5 },
        specialEffects: ["Unarmed Attack: melee attacks without a weapon deal +10% damage"],
        setId: null,
        source: "Purchasable at C-rank Hunter Guild armoury / common C-rank dungeon drop",
        lore: "The knuckle guards are the thickest part. After enough dungeons they develop a satisfying dent pattern that veteran hunters wear like a badge of honour."
      },
      shadow_threads: {
        id: "shadow_threads",
        name: "Shadow Threads",
        slot: "gloves",
        rarity: "A",
        icon: "\u{1F9E4}",
        description: "Fingerless gloves woven from shadow silk \u2014 impossibly thin yet harder than tempered steel. They seem to react to the wearer's intent, tightening before a critical strike.",
        levelReq: 85,
        stats: { ...EMPTY_STATS, defense: 10, agility: 20, critChance: 5 },
        specialEffects: ["Shadow Reflex: dodge chance +4% while below 50% HP", "Predator's Grip: critical hit damage +10%"],
        setId: null,
        source: "Crafted by the Shadow Monarch's army smiths; rarely surfaces in A-rank gate loot pools",
        lore: "No one knows who first wove them or how. They appeared in Sung Jin-Woo's inventory the morning after a particularly brutal A-rank clear. He never asked questions."
      },
      // ── Boots ─────────────────────────────────────────────────────────────────
      assassins_boots: {
        id: "assassins_boots",
        name: "Assassin's Boots",
        slot: "boots",
        rarity: "B",
        icon: "\u{1F462}",
        description: "Soft-soled leather boots enchanted to muffle footsteps and enhance lateral movement speed. Standard issue for rogue-class hunter squads.",
        levelReq: 50,
        stats: { ...EMPTY_STATS, defense: 10, agility: 15 },
        specialEffects: ["Silent Step: footstep sound radius reduced by 80%", "Sprint: movement speed +8%"],
        setId: null,
        source: "Dropped by assassin-class dungeon mobs (B-rank+) / Hunter black market",
        lore: "The enchantment is woven into the sole, not the upper. A good cobbler can resoled them indefinitely without losing the magic \u2014 if you know one with the right clearance."
      },
      boots_of_haste: {
        id: "boots_of_haste",
        name: "Boots of Haste",
        slot: "boots",
        rarity: "A",
        icon: "\u{1F462}",
        description: "Wind-enchanted greaves recovered from an A-rank air elemental dungeon. The enchantment permanently accelerates the wearer's base movement threshold.",
        levelReq: 100,
        stats: { ...EMPTY_STATS, defense: 15, agility: 25 },
        specialEffects: ["Gale Step: first attack after a dash deals +20% damage", "Windborne: fall damage reduced by 60%"],
        setId: null,
        source: "Dropped by Tempest Elementals \u2014 A-rank wind-elemental dungeons",
        lore: "Wind elemental dungeons are among the least explored Gate types \u2014 the constant gales make visibility near zero. Those who push through find the loot density is worth every bruise."
      },
      // ── Earring ───────────────────────────────────────────────────────────────
      demon_monarchs_earring: {
        id: "demon_monarchs_earring",
        name: "Demon Monarch's Earring",
        slot: "earring",
        rarity: "S",
        icon: "\u{1F48E}",
        description: "A single obsidian drop earring pulsing with the residual authority of a Demon Monarch. Part of the Demon Monarch's Set.",
        levelReq: 150,
        stats: { ...EMPTY_STATS, strength: 20, vitality: 20 },
        specialEffects: ["Set Piece: contributes to the Demon Monarch's Set bonus", "Monarch's Bearing: intimidation effects against you are reduced by 30%"],
        setId: "demon_monarch_set",
        source: "Guaranteed drop \u2014 Demon Castle floor 50 boss",
        lore: "The obsidian was not mined \u2014 it crystallised spontaneously around a fragment of Demon Monarch essence during the initial assault on the Demon Castle. It chose its shape."
      },
      // ── Necklaces ─────────────────────────────────────────────────────────────
      gatekeepers_necklace: {
        id: "gatekeepers_necklace",
        name: "Gatekeeper's Necklace",
        slot: "necklace",
        rarity: "A",
        icon: "\u{1F4FF}",
        description: "A mana-stone pendant worn by the Gatekeeper that guards the first floor of the Demon Castle. Sharpens the wearer's spatial awareness and reaction time.",
        levelReq: 80,
        stats: { ...EMPTY_STATS, agility: 20, perception: 10 },
        specialEffects: ["Dimensional Sense: hidden traps and ambushes detected within 10m", "Threshold Guardian: +10% DEF while standing in a doorway or entrance"],
        setId: null,
        source: "Guaranteed drop \u2014 Demon Castle floor 1 boss (the Gatekeeper)",
        lore: "The Gatekeeper has held its post for centuries. Every challenger who failed left a fragment of their fear in the stone. Those who succeed inherit everything the stone remembers."
      },
      demon_monarchs_necklace: {
        id: "demon_monarchs_necklace",
        name: "Demon Monarch's Necklace",
        slot: "necklace",
        rarity: "S",
        icon: "\u{1F4FF}",
        description: "A strand of void-black beads threaded on demon silk, radiating an aura of command. Part of the Demon Monarch's Set.",
        levelReq: 175,
        stats: { ...EMPTY_STATS, agility: 20, intelligence: 20 },
        specialEffects: ["Set Piece: contributes to the Demon Monarch's Set bonus", "Mana Conduit: mana regeneration rate +15%"],
        setId: "demon_monarch_set",
        source: "Rare drop \u2014 Demon Castle floor 75 boss",
        lore: "Each bead is a calcified mana core from a defeated lesser demon. The Monarch wore it as a record of conquests. Now it records yours."
      },
      // ── Shadow Monarch's Regalia — full 10-slot set ───────────────────────────
      // Stats are intentionally minimal; real power comes from dynamic scaling
      // in SoloLevelingStats.getTotalEffectiveStats (external, reads setId).
      shadow_monarchs_blade: {
        id: "shadow_monarchs_blade",
        name: "Shadow Monarch's Blade",
        slot: "weapon",
        rarity: "Shadow Monarch",
        icon: "\u{1F311}",
        description: "A sword of pure condensed shadow, forged from the will of the Shadow Monarch himself. It exists between light and darkness.",
        levelReq: 2e3,
        stats: { ...EMPTY_STATS, attack: 2500, strength: 80, agility: 80 },
        specialEffects: ["Shadow Affinity: all shadow-type skills deal +5% damage"],
        setId: "shadow_monarch_regalia",
        source: "Materialises for the Shadow Monarch",
        lore: "It appeared in the Shadow Monarch's hand without being forged. The blade is not made of anything \u2014 it is the absence of everything."
      },
      // offHand: shadow_monarchs_aegis is defined above (originally standalone;
      // updated to setId: 'shadow_monarch_regalia' and levelReq: 2000).
      crown_of_the_shadow_monarch: {
        id: "crown_of_the_shadow_monarch",
        name: "Crown of the Shadow Monarch",
        slot: "helmet",
        rarity: "Shadow Monarch",
        icon: "\u{1F451}",
        description: "A circlet of living shadow that crowns the ruler of all shadows. It confers absolute authority over any shadow-type entity.",
        levelReq: 2e3,
        stats: { ...EMPTY_STATS, defense: 500, intelligence: 80, perception: 80 },
        specialEffects: ["Sovereign's Authority: shadow soldiers gain +3% ATK"],
        setId: "shadow_monarch_regalia",
        source: "Materialises for the Shadow Monarch",
        lore: "Every Shadow Monarch throughout history wore an identical crown. None of them forged it. It simply arrived."
      },
      shadow_sovereigns_mantle: {
        id: "shadow_sovereigns_mantle",
        name: "Shadow Sovereign's Mantle",
        slot: "chestplate",
        rarity: "Shadow Monarch",
        icon: "\u{1F311}",
        description: "A flowing mantle of shadow-silk that wraps the Shadow Monarch in absolute darkness. No physical force can pierce it while the Monarch's will holds.",
        levelReq: 2e3,
        stats: { ...EMPTY_STATS, defense: 800, vitality: 80, strength: 50 },
        specialEffects: ["Void Weave: 3% chance to phase through any incoming hit"],
        setId: "shadow_monarch_regalia",
        source: "Materialises for the Shadow Monarch",
        lore: "It weighs nothing. It absorbs light. Enemies who look directly at the wearer report seeing only a silhouette even in bright daylight."
      },
      shadow_gauntlets: {
        id: "shadow_gauntlets",
        name: "Shadow Gauntlets",
        slot: "gloves",
        rarity: "Shadow Monarch",
        icon: "\u{1F311}",
        description: "Gauntlets of solidified shadow that amplify every strike the Shadow Monarch delivers. The fingers flex without resistance \u2014 they feel like wearing nothing.",
        levelReq: 2e3,
        stats: { ...EMPTY_STATS, attack: 400, defense: 400, strength: 80, agility: 50 },
        specialEffects: ["Shadow Strike: melee attacks leave a shadow imprint for 2s"],
        setId: "shadow_monarch_regalia",
        source: "Materialises for the Shadow Monarch",
        lore: "Shadow soldiers can be summoned from the imprints left by these gauntlets. This was never documented anywhere \u2014 it simply happened."
      },
      shadow_greaves: {
        id: "shadow_greaves",
        name: "Shadow Greaves",
        slot: "boots",
        rarity: "Shadow Monarch",
        icon: "\u{1F311}",
        description: "Greaves that let the Shadow Monarch walk through shadows as if through air. Distance means nothing to those who command the dark.",
        levelReq: 2e3,
        stats: { ...EMPTY_STATS, defense: 400, agility: 80, vitality: 40 },
        specialEffects: ["Shadow Step: movement through shadowed areas is silent and 10% faster"],
        setId: "shadow_monarch_regalia",
        source: "Materialises for the Shadow Monarch",
        lore: "They leave no footprints. Not because of any enchantment \u2014 the darkness simply parts to let the Monarch pass."
      },
      shadow_monarchs_earring: {
        id: "shadow_monarchs_earring",
        name: "Shadow Monarch's Earring",
        slot: "earring",
        rarity: "Shadow Monarch",
        icon: "\u{1F311}",
        description: "A single drop of solidified shadow, worn as an earring. It resonates with the full set, amplifying the Monarch's dominion.",
        levelReq: 2e3,
        stats: { ...EMPTY_STATS, perception: 80, intelligence: 50, defense: 150 },
        specialEffects: ["Set Piece: contributes to the Shadow Monarch's Regalia set bonus"],
        setId: "shadow_monarch_regalia",
        source: "Materialises for the Shadow Monarch",
        lore: "Each piece of the Regalia holds a fragment of the Shadow Monarch's authority. The earring holds the fragment of awareness."
      },
      shadow_monarchs_necklace: {
        id: "shadow_monarchs_necklace",
        name: "Shadow Monarch's Necklace",
        slot: "necklace",
        rarity: "Shadow Monarch",
        icon: "\u{1F311}",
        description: "A strand of shadow-crystal beads that encircles the Shadow Monarch's throat. Each bead contains the memory of a fallen enemy.",
        levelReq: 2e3,
        stats: { ...EMPTY_STATS, intelligence: 80, vitality: 50, defense: 150 },
        specialEffects: ["Set Piece: contributes to the Shadow Monarch's Regalia set bonus"],
        setId: "shadow_monarch_regalia",
        source: "Materialises for the Shadow Monarch",
        lore: "The beads are unnumbered. Counting them produces different results each attempt. Most give up after twenty."
      },
      shadow_monarchs_ring_left: {
        id: "shadow_monarchs_ring_left",
        name: "Shadow Monarch's Ring (Void)",
        slot: "ring",
        rarity: "Shadow Monarch",
        icon: "\u{1F311}",
        description: "A ring of pure shadow worn on the left hand. It is the seal of authority over life \u2014 the hand that commands shadows to rise.",
        levelReq: 2e3,
        stats: { ...EMPTY_STATS, attack: 200, strength: 80, vitality: 40 },
        specialEffects: ["Set Piece: contributes to the Shadow Monarch's Regalia set bonus", "Arise: shadow extraction cost reduced by 2%"],
        setId: "shadow_monarch_regalia",
        source: "Materialises for the Shadow Monarch",
        lore: 'The word "Arise" is engraved on the inner band. It has always been there. It will always be there.'
      },
      shadow_monarchs_ring_right: {
        id: "shadow_monarchs_ring_right",
        name: "Shadow Monarch's Ring (Domain)",
        slot: "ring",
        rarity: "Shadow Monarch",
        icon: "\u{1F311}",
        description: "A ring of pure shadow worn on the right hand. It is the seal of dominion over space \u2014 the hand that extends the Monarch's domain.",
        levelReq: 2e3,
        stats: { ...EMPTY_STATS, attack: 200, perception: 80, agility: 50 },
        specialEffects: ["Set Piece: contributes to the Shadow Monarch's Regalia set bonus", "Domain Pulse: shadow soldier detection range +5%"],
        setId: "shadow_monarch_regalia",
        source: "Materialises for the Shadow Monarch",
        lore: "Twins to the Void ring. The two together form a circuit of authority that flows through the Monarch's entire body."
      },
      // ── Rings ─────────────────────────────────────────────────────────────────
      high_magicians_ring: {
        id: "high_magicians_ring",
        name: "High Magician's Ring",
        slot: "ring",
        rarity: "B",
        icon: "\u{1F48D}",
        description: "A platinum band set with a mana amplification crystal. Standard accessory among high-ranking mage-class hunters.",
        levelReq: 55,
        stats: { ...EMPTY_STATS, intelligence: 15, perception: 10 },
        specialEffects: ["Spell Efficiency: mana cost of active skills reduced by 8%", "Crystal Focus: skill cast time reduced by 5%"],
        setId: null,
        source: "Dropped by high-level magic-type dungeon bosses (B-rank+)",
        lore: "The crystal is grown, not cut. Mage artificers seed a mana-rich solution and let the lattice form over six months. The result is always unique \u2014 no two rings amplify the same way."
      },
      demon_monarchs_ring: {
        id: "demon_monarchs_ring",
        name: "Demon Monarch's Ring",
        slot: "ring",
        rarity: "S",
        icon: "\u{1F48D}",
        description: "A signet ring bearing the seal of the Demon Monarch. Its presence on one's finger marks them as a successor to infernal dominion. Part of the Demon Monarch's Set.",
        levelReq: 200,
        stats: { ...EMPTY_STATS, perception: 20, intelligence: 20 },
        specialEffects: ["Set Piece: contributes to the Demon Monarch's Set bonus", "Infernal Sight: see through all illusions and invisibility within 25m", "Monarch's Seal: skills that command or summon cost 10% less mana"],
        setId: "demon_monarch_set",
        source: "Rare drop \u2014 Demon Castle floor 100 final boss",
        lore: "The seal on the face has never been successfully copied. Artisans who attempted it reported the etching tools melting. The ring refuses to be replicated."
      },
      // ── Kamish's Legacy — full 10-slot SS set ──────────────────────────────────
      // 'Shadow Monarch' rarity is grant-only (the Regalia), so SS was historically
      // the top tier anyone could farm — it previously held a single
      // item (Kamish's Wrath), which made the entire endgame chase one weapon on
      // repeat. Forged from the corpse of Kamish, the Catastrophe-class dragon, so
      // it sits alongside Kamish's Wrath rather than replacing it.
      //
      // Flat stats by design: the Regalia's power is a PERCENTAGE multiplier applied
      // by SoloLevelingStats ((pieces/10) x (totalBase/5000), uncapped, Shadow
      // Monarch rank only), so no flat-stat set can outscale it. The Lv2000 reward
      // stays the terminal prize.
      kamishs_fang: {
        id: "kamishs_fang",
        name: "Kamish's Fang",
        slot: "weapon",
        rarity: "SS",
        icon: "\u{1F432}",
        description: "A greatsword hewn from the upper jawbone of Kamish. Where the daggers were carved for speed, the Fang was shaped for finality.",
        levelReq: 300,
        stats: { ...EMPTY_STATS, strength: 35, attack: 600, critDamage: 15 },
        specialEffects: ["Catastrophe: attacks against enemies above 50% HP deal +30% damage", "Dragon Fear: on hit, 10% chance to reduce enemy defense by 25% for 8s"],
        setId: "kamishs_legacy",
        source: "Dropped by SS-rank and higher gate bosses",
        lore: "Kamish killed 3,000 people before it fell. The hunters who carved it afterwards worked in silence \u2014 no one wanted to be the first to speak near the body."
      },
      kamishs_scale_ward: {
        id: "kamishs_scale_ward",
        name: "Kamish's Scale Ward",
        slot: "offHand",
        rarity: "SS",
        icon: "\u{1F6E1}\uFE0F",
        description: "A tower shield of overlapping dragon scales. Each scale is still warm.",
        levelReq: 300,
        stats: { ...EMPTY_STATS, vitality: 25, defense: 100 },
        specialEffects: ["Scaled Ward: blocks reduce incoming damage by an additional 20%", "Ember Skin: attackers suffer 8% of the damage they deal as fire"],
        setId: "kamishs_legacy",
        source: "Dropped by SS-rank and higher gate bosses",
        lore: "Fire does not mark it. Neither does mana. The scales simply refuse to acknowledge that anything happened to them."
      },
      dragonbone_visor: {
        id: "dragonbone_visor",
        name: "Dragonbone Visor",
        slot: "helmet",
        rarity: "SS",
        icon: "\u{1F47A}",
        description: "A visored helm shaped from the skull-plate of a Catastrophe-class dragon. The eye slits glow faintly amber.",
        levelReq: 290,
        stats: { ...EMPTY_STATS, perception: 25, defense: 75 },
        specialEffects: ["Dragon Sight: reveals enemy weak points; +12% critical strike chance", "Unflinching: immune to fear and intimidation effects"],
        setId: "kamishs_legacy",
        source: "Dropped by SS-rank and higher gate bosses",
        lore: "Wearers report a persistent warmth at the temples, as though something inside the bone is still deciding whether to wake."
      },
      scaled_cuirass_of_the_catastrophe: {
        id: "scaled_cuirass_of_the_catastrophe",
        name: "Scaled Cuirass of the Catastrophe",
        slot: "chestplate",
        rarity: "SS",
        icon: "\u{1F409}",
        description: "Breastplate cut from the dragon's flank, where the scales grew thickest. It has never been pierced.",
        levelReq: 310,
        stats: { ...EMPTY_STATS, vitality: 40, strength: 15, defense: 130 },
        specialEffects: ["Catastrophe Hide: reduces all incoming damage by 15%", "Molten Core: regenerate 2% max HP per second while below 40% HP"],
        setId: "kamishs_legacy",
        source: "Dropped by SS-rank and higher gate bosses",
        lore: "The Association tried to cut a sample for study. They ruined four diamond saws and gave up."
      },
      dragonclaw_gauntlets: {
        id: "dragonclaw_gauntlets",
        name: "Dragonclaw Gauntlets",
        slot: "gloves",
        rarity: "SS",
        icon: "\u{1F9BE}",
        description: "Gauntlets tipped with the dragon's own talons. They close harder than a human hand should be able to.",
        levelReq: 285,
        stats: { ...EMPTY_STATS, strength: 30, agility: 15, defense: 55 },
        specialEffects: ["Rending Grip: attacks apply a stacking bleed dealing 40% ATK over 5s", "Talon Lock: grabbed enemies cannot dash or blink for 3s"],
        setId: "kamishs_legacy",
        source: "Dropped by SS-rank and higher gate bosses",
        lore: "The claws still retract and extend on their own when the wearer is angry. No one has explained this."
      },
      wyrmstride_greaves: {
        id: "wyrmstride_greaves",
        name: "Wyrmstride Greaves",
        slot: "boots",
        rarity: "SS",
        icon: "\u{1F97E}",
        description: "Greaves strung with wing-sinew. The wearer's steps land lighter than they should.",
        levelReq: 285,
        stats: { ...EMPTY_STATS, agility: 35, defense: 60 },
        specialEffects: ["Wyrmstride: +30% movement speed; falling deals no damage", "Skyborne: may dash a second time in mid-air"],
        setId: "kamishs_legacy",
        source: "Dropped by SS-rank and higher gate bosses",
        lore: "Kamish never truly landed during the battle. Something of that refusal stayed in the sinew."
      },
      ember_of_kamish: {
        id: "ember_of_kamish",
        name: "Ember of Kamish",
        slot: "earring",
        rarity: "SS",
        icon: "\u{1F525}",
        description: "A single coal from the dragon's throat, still burning after all these years.",
        levelReq: 295,
        stats: { ...EMPTY_STATS, intelligence: 35, perception: 20 },
        specialEffects: ["Dragon Breath: fire and mana-flame skills deal +25% damage", "Everburning: mana regeneration increased by 30%"],
        setId: "kamishs_legacy",
        source: "Dropped by SS-rank and higher gate bosses",
        lore: "It has not cooled. It will not cool. Whatever fire a Catastrophe carries, it is not the kind that goes out."
      },
      heart_of_the_catastrophe: {
        id: "heart_of_the_catastrophe",
        name: "Heart of the Catastrophe",
        slot: "necklace",
        rarity: "SS",
        icon: "\u{1F4A0}",
        description: "The crystallised mana-core of Kamish, strung on dragonhide. It beats, very slowly.",
        levelReq: 305,
        stats: { ...EMPTY_STATS, vitality: 45, intelligence: 25 },
        specialEffects: ["Catastrophe Heart: +25% maximum HP", "Second Breath: once per dungeon, survive a lethal blow at 1 HP"],
        setId: "kamishs_legacy",
        source: "Dropped by SS-rank and higher gate bosses",
        lore: "It beats once every forty seconds. Hunters who wear it eventually find their own pulse slowing to match."
      },
      ring_of_the_dragons_eye: {
        id: "ring_of_the_dragons_eye",
        name: "Ring of the Dragon's Eye",
        slot: "ring",
        rarity: "SS",
        icon: "\u{1F48D}",
        description: "Set with a sliver of Kamish's eye. It watches what the wearer does not.",
        levelReq: 300,
        stats: { ...EMPTY_STATS, perception: 30, agility: 15, critChance: 10 },
        specialEffects: ["Dragon's Eye: cannot be ambushed; attacks from behind deal no bonus damage", "Predator: +15% critical strike damage against wounded enemies"],
        setId: "kamishs_legacy",
        source: "Dropped by SS-rank and higher gate bosses",
        lore: "The sliver tracks movement in the room even when set down on a table. Several owners have covered it with a cloth at night."
      },
      ring_of_the_dragons_maw: {
        id: "ring_of_the_dragons_maw",
        name: "Ring of the Dragon's Maw",
        slot: "ring",
        rarity: "SS",
        icon: "\u{1F48D}",
        description: "Forged from a molar the size of a fist. Blunt, heavy, and entirely without subtlety.",
        levelReq: 300,
        stats: { ...EMPTY_STATS, strength: 30, vitality: 15, critDamage: 20 },
        specialEffects: ["Devour: killing blows restore 5% maximum HP", "Maw: heavy attacks cannot be blocked by enemies of lower rank"],
        setId: "kamishs_legacy",
        source: "Dropped by SS-rank and higher gate bosses",
        lore: "A dragon does not bite to wound. It bites to end the conversation."
      },
      // ── S-rank slot gap-fills ──────────────────────────────────────────────────
      // S previously covered only weapon/helmet/earring/necklace/ring, so four of
      // the ten slots had no S-tier option at all and the ladder skipped straight
      // from A to SS for them.
      white_flame_bulwark: {
        id: "white_flame_bulwark",
        name: "White Flame Bulwark",
        slot: "offHand",
        rarity: "S",
        icon: "\u{1F6E1}\uFE0F",
        description: "A kite shield that answers mana with fire. Blocking a blow lights it.",
        levelReq: 170,
        stats: { ...EMPTY_STATS, vitality: 15, defense: 70 },
        specialEffects: ["White Flame: successful blocks release a flame burst dealing 120% ATK", "Bulwark: +20% block chance"],
        setId: null,
        source: "Dropped by S-rank and higher gate bosses",
        lore: "The flames are the colour of nothing in particular. Witnesses always describe them as white because there is no better word."
      },
      blood_red_commanders_armor: {
        id: "blood_red_commanders_armor",
        name: "Blood-Red Commander's Armor",
        slot: "chestplate",
        rarity: "S",
        icon: "\u{1FA78}",
        description: "The plate of a knight-commander who did not survive the gate he was sent to close.",
        levelReq: 185,
        stats: { ...EMPTY_STATS, vitality: 25, strength: 10, defense: 80 },
        specialEffects: ["Commander's Presence: summoned allies gain +15% attack", "Last Stand: below 25% HP, defense is doubled"],
        setId: null,
        source: "Dropped by S-rank and higher gate bosses",
        lore: "It was already red before the blood. That is the part people forget when they retell it."
      },
      gauntlets_of_the_iron_body: {
        id: "gauntlets_of_the_iron_body",
        name: "Gauntlets of the Iron Body",
        slot: "gloves",
        rarity: "S",
        icon: "\u{1F94A}",
        description: "Heavy plated gauntlets favoured by hunters who have stopped bothering with weapons.",
        levelReq: 160,
        stats: { ...EMPTY_STATS, strength: 25, defense: 45 },
        specialEffects: ["Iron Body: unarmed attacks deal 200% ATK", "Crushing Blow: attacks ignore 20% of enemy defense"],
        setId: null,
        source: "Dropped by S-rank and higher gate bosses",
        lore: "The previous owner is said to have punched a C-rank gate shut. This is almost certainly untrue and absolutely worth repeating."
      },
      greaves_of_the_swift_step: {
        id: "greaves_of_the_swift_step",
        name: "Greaves of the Swift Step",
        slot: "boots",
        rarity: "S",
        icon: "\u{1F97E}",
        description: "Light greaves woven with mana-thread. The wearer arrives slightly before they are expected.",
        levelReq: 165,
        stats: { ...EMPTY_STATS, agility: 30, defense: 40 },
        specialEffects: ["Swift Step: +25% movement speed", "Afterimage: dashing leaves a decoy that absorbs one attack"],
        setId: null,
        source: "Dropped by S-rank and higher gate bosses",
        lore: "Slow enough to be seen. Fast enough that seeing does not help."
      },
      // ── A-rank slot gap-fills ──────────────────────────────────────────────────
      knights_aegis: {
        id: "knights_aegis",
        name: "Knight's Aegis",
        slot: "offHand",
        rarity: "A",
        icon: "\u{1F6E1}\uFE0F",
        description: "Standard-issue guild tower shield, reinforced well past standard issue.",
        levelReq: 90,
        stats: { ...EMPTY_STATS, vitality: 10, defense: 40 },
        specialEffects: ["Guard: +15% block chance", "Steadfast: cannot be knocked back while blocking"],
        setId: null,
        source: "Dropped by A-rank and higher gate bosses",
        lore: "Issued to four hundred hunters. Returned by rather fewer."
      },
      helm_of_the_steel_fang: {
        id: "helm_of_the_steel_fang",
        name: "Helm of the Steel Fang",
        slot: "helmet",
        rarity: "A",
        icon: "\u26D1\uFE0F",
        description: "A fanged half-helm taken from a beast-type gate. It still smells faintly of the place.",
        levelReq: 85,
        stats: { ...EMPTY_STATS, strength: 12, defense: 30 },
        specialEffects: ["Steel Fang: +10% critical strike chance", "Thick Skull: reduces stun duration by half"],
        setId: null,
        source: "Dropped by A-rank and higher gate bosses",
        lore: "The fangs are not decorative. They were load-bearing, once, for something else."
      },
      earring_of_clarity: {
        id: "earring_of_clarity",
        name: "Earring of Clarity",
        slot: "earring",
        rarity: "A",
        icon: "\u{1F4A7}",
        description: "A pale mana-stone stud. Thoughts arrive in order while wearing it.",
        levelReq: 80,
        stats: { ...EMPTY_STATS, intelligence: 20, perception: 10 },
        specialEffects: ["Clarity: skill cooldowns reduced by 10%", "Focus: mana costs reduced by 10%"],
        setId: null,
        source: "Dropped by A-rank and higher gate bosses",
        lore: 'Mages describe the effect as "the noise stopping". Non-mages report no effect whatsoever, which mages find very funny.'
      },
      band_of_the_lesser_monarch: {
        id: "band_of_the_lesser_monarch",
        name: "Band of the Lesser Monarch",
        slot: "ring",
        rarity: "A",
        icon: "\u{1F48D}",
        description: "A plain iron band that once belonged to something that called itself a king.",
        levelReq: 95,
        stats: { ...EMPTY_STATS, strength: 12, intelligence: 12, perception: 8 },
        specialEffects: ["Lesser Dominion: +10% damage against enemies of lower rank", "Pretender: +5% experience from all sources"],
        setId: null,
        source: "Dropped by A-rank and higher gate bosses",
        lore: "Every gate seems to produce at least one of these. There are, apparently, a great many lesser monarchs."
      },
      // ── D-rank slot gap-fills ────────────────────────────────────────────────
      // D previously covered only offHand/helmet, leaving weapon/chestplate/
      // gloves/boots/earring/necklace/ring with no entry-level option at all.
      worn_iron_shortsword: {
        id: "worn_iron_shortsword",
        name: "Worn Iron Shortsword",
        slot: "weapon",
        rarity: "D",
        icon: "\u{1F5E1}\uFE0F",
        description: "A basic iron shortsword, nicked from years of use against low-rank mobs. Most rookie hunters carry one until something better drops.",
        levelReq: 10,
        stats: { ...EMPTY_STATS, attack: 20, strength: 3 },
        specialEffects: [],
        setId: null,
        source: "Common drop from E and D-rank gate mobs",
        lore: "The edge dulls faster than the Association would like to admit. Sharpening kits outsell the swords themselves three to one."
      },
      padded_gambeson: {
        id: "padded_gambeson",
        name: "Padded Gambeson",
        slot: "chestplate",
        rarity: "D",
        icon: "\u{1F9E5}",
        description: "A quilted underlayer worn beneath heavier armour, or alone by hunters who can't yet afford anything better.",
        levelReq: 9,
        stats: { ...EMPTY_STATS, defense: 6, vitality: 4 },
        specialEffects: [],
        setId: null,
        source: "Starting equipment; widely available at any Guild shop",
        lore: "It has stopped exactly one killing blow in Association records. The hunter who wore it still tells the story."
      },
      rough_hide_gloves: {
        id: "rough_hide_gloves",
        name: "Rough Hide Gloves",
        slot: "gloves",
        rarity: "D",
        icon: "\u{1F9E4}",
        description: "Untanned leather gloves, stiff until broken in. Better than bare knuckles against a D-rank mob's hide.",
        levelReq: 8,
        stats: { ...EMPTY_STATS, defense: 4, strength: 3 },
        specialEffects: ["Grip: 3% chance to prevent weapon disarm"],
        setId: null,
        source: "Purchasable from any Hunter's Association supply depot",
        lore: "They smell for weeks. No one has found a cure for this."
      },
      scuffed_travel_boots: {
        id: "scuffed_travel_boots",
        name: "Scuffed Travel Boots",
        slot: "boots",
        rarity: "D",
        icon: "\u{1F462}",
        description: "Ordinary boots for ordinary distances. The scuffing is cosmetic, not enchanted \u2014 hunters just walk a lot.",
        levelReq: 8,
        stats: { ...EMPTY_STATS, defense: 3, agility: 4 },
        specialEffects: [],
        setId: null,
        source: "Starting equipment; widely available at any Guild shop",
        lore: "The soles are rated for two years of gate work. Most hunters don't last that long in D-rank gear, so the rating is rarely tested."
      },
      chipped_mana_stud: {
        id: "chipped_mana_stud",
        name: "Chipped Mana Stud",
        slot: "earring",
        rarity: "D",
        icon: "\u{1F48E}",
        description: "A small fractured mana-crystal set in a plain stud. The chip in the crystal leaks a faint blue glow.",
        levelReq: 12,
        stats: { ...EMPTY_STATS, intelligence: 4, perception: 3 },
        specialEffects: [],
        setId: null,
        source: "Common dungeon drop (D-rank)",
        lore: "Jewellers refuse to repair the chip \u2014 they say it changes the resonance for the worse. No one has proven them wrong."
      },
      beginners_talisman: {
        id: "beginners_talisman",
        name: "Beginner's Talisman",
        slot: "necklace",
        rarity: "D",
        icon: "\u{1F4FF}",
        description: "A wooden talisman blessed at the Association's intake ceremony. More tradition than enchantment, but it works, a little.",
        levelReq: 11,
        stats: { ...EMPTY_STATS, vitality: 4, perception: 3 },
        specialEffects: [],
        setId: null,
        source: "Issued to all hunters upon Association registration",
        lore: "Every hunter gets one on their first day. Most lose it by the third."
      },
      apprentices_band: {
        id: "apprentices_band",
        name: "Apprentice's Band",
        slot: "ring",
        rarity: "D",
        icon: "\u{1F48D}",
        description: "A thin brass ring given to hunters who complete basic Awakening orientation. Carries a trace enchantment, nothing more.",
        levelReq: 14,
        stats: { ...EMPTY_STATS, strength: 3, intelligence: 3 },
        specialEffects: [],
        setId: null,
        source: "Awarded on completion of Association orientation",
        lore: "Most hunters keep it in a drawer once they outgrow it. A few wear it anyway, for luck they don't believe in."
      },
      // ── C-rank slot gap-fills ────────────────────────────────────────────────
      hunters_buckler: {
        id: "hunters_buckler",
        name: "Hunter's Buckler",
        slot: "offHand",
        rarity: "C",
        icon: "\u{1F6E1}\uFE0F",
        description: "A small round shield favoured by mobile hunters who need to block without sacrificing speed.",
        levelReq: 18,
        stats: { ...EMPTY_STATS, defense: 18, vitality: 6 },
        specialEffects: ["Deflect: 10% chance to fully block incoming attack"],
        setId: null,
        source: "Common dungeon drop (C-rank) / Hunter Guild armoury",
        lore: "Light enough to forget you're carrying it, until the moment you're glad you are."
      },
      scouts_half_helm: {
        id: "scouts_half_helm",
        name: "Scout's Half-Helm",
        slot: "helmet",
        rarity: "C",
        icon: "\u26D1\uFE0F",
        description: "An open-faced helm that trades protection for field of view. Popular with recon-class hunters.",
        levelReq: 16,
        stats: { ...EMPTY_STATS, defense: 10, perception: 7 },
        specialEffects: ["Wide Sight: peripheral detection range +5%"],
        setId: null,
        source: "Common dungeon drop (C-rank) / Hunter Guild armoury",
        lore: "Scouts swear it saves their necks. Quartermasters point out it barely covers them."
      },
      wind_runners_boots: {
        id: "wind_runners_boots",
        name: "Wind Runner's Boots",
        slot: "boots",
        rarity: "C",
        icon: "\u{1F462}",
        description: "Lightweight boots enchanted with a minor wind charm. A step up from standard issue for hunters who move first and think later.",
        levelReq: 20,
        stats: { ...EMPTY_STATS, agility: 9, defense: 5 },
        specialEffects: ["Light Step: movement speed +4%"],
        setId: null,
        source: "Dropped by C-rank dungeon mobs / Hunter black market",
        lore: "Not enchanted enough to outrun anything serious. Enchanted exactly enough to feel like you could."
      },
      resonant_earstud: {
        id: "resonant_earstud",
        name: "Resonant Earstud",
        slot: "earring",
        rarity: "C",
        icon: "\u{1F48E}",
        description: "A mana-stone stud that hums faintly in sync with the wearer's own mana output. Popular among aspiring mage-class hunters.",
        levelReq: 22,
        stats: { ...EMPTY_STATS, intelligence: 8, perception: 6 },
        specialEffects: ["Resonance: mana regeneration +5%"],
        setId: null,
        source: "Common dungeon drop (C-rank) / Hunter Guild armoury",
        lore: "The hum changes pitch with the wearer's mood. Nobody has explained why, and most stopped asking."
      },
      guildmarked_pendant: {
        id: "guildmarked_pendant",
        name: "Guildmarked Pendant",
        slot: "necklace",
        rarity: "C",
        icon: "\u{1F4FF}",
        description: "A pendant stamped with a guild crest, issued to full guild members past their probationary period.",
        levelReq: 19,
        stats: { ...EMPTY_STATS, vitality: 7, strength: 6 },
        specialEffects: [],
        setId: null,
        source: "Awarded upon full guild membership",
        lore: "The stamp wears smooth after a few years of dungeon dust. Veterans wear the smoothness like a rank of its own."
      },
      journeymans_signet: {
        id: "journeymans_signet",
        name: "Journeyman's Signet",
        slot: "ring",
        rarity: "C",
        icon: "\u{1F48D}",
        description: "A plain signet ring marking a hunter who has cleared their first ten C-rank gates. A small milestone, worn with quiet pride.",
        levelReq: 25,
        stats: { ...EMPTY_STATS, strength: 7, agility: 6 },
        specialEffects: [],
        setId: null,
        source: "Awarded on completion of ten C-rank gate clears",
        lore: "Ten gates doesn't sound like much until you've done it. Most hunters remember every one."
      },
      // ── B-rank slot gap-fills ────────────────────────────────────────────────
      veterans_barbute: {
        id: "veterans_barbute",
        name: "Veteran's Barbute",
        slot: "helmet",
        rarity: "B",
        icon: "\u26D1\uFE0F",
        description: "A close-fitting steel helm worn by hunters who've survived enough B-rank gates to stop counting.",
        levelReq: 45,
        stats: { ...EMPTY_STATS, defense: 25, strength: 12 },
        specialEffects: ["Battle-Tested: +5% defense while below 30% HP"],
        setId: null,
        source: "Dropped by B-rank and higher gate bosses",
        lore: "The dents aren't polished out. Every one is a story the wearer doesn't tell twice."
      },
      reinforced_plate_vest: {
        id: "reinforced_plate_vest",
        name: "Reinforced Plate Vest",
        slot: "chestplate",
        rarity: "B",
        icon: "\u{1F9E5}",
        description: "A double-layered steel vest built for hunters who expect to take hits and keep standing.",
        levelReq: 50,
        stats: { ...EMPTY_STATS, defense: 22, vitality: 13 },
        specialEffects: ["Reinforced Plating: blunt damage reduced by 6%"],
        setId: null,
        source: "Dropped by B-rank and higher gate bosses",
        lore: "Heavier than it looks. Hunters who complain about the weight are usually the ones who need it most."
      },
      bruisers_knuckle_plates: {
        id: "bruisers_knuckle_plates",
        name: "Bruiser's Knuckle Plates",
        slot: "gloves",
        rarity: "B",
        icon: "\u{1F9E4}",
        description: "Segmented steel plates worn over the knuckles, built for hunters who close distance and stay there.",
        levelReq: 42,
        stats: { ...EMPTY_STATS, defense: 15, strength: 15 },
        specialEffects: ["Heavy Hands: unarmed and melee attacks deal +6% damage"],
        setId: null,
        source: "Dropped by B-rank and higher gate bosses",
        lore: "The plates are replaced more often than the gloves themselves. Steel doesn't survive B-rank knuckles for long."
      },
      sharpened_senses_earring: {
        id: "sharpened_senses_earring",
        name: "Sharpened Senses Earring",
        slot: "earring",
        rarity: "B",
        icon: "\u{1F48E}",
        description: "A slim earring enchanted to keep the wearer's reflexes a half-second ahead of danger.",
        levelReq: 55,
        stats: { ...EMPTY_STATS, perception: 14, agility: 10 },
        specialEffects: ["Sharpened Senses: ambush and surprise-attack chance against you reduced by 10%"],
        setId: null,
        source: "Dropped by B-rank and higher gate bosses",
        lore: "Wearers describe a persistent itch just before something goes wrong. They've learned to trust it."
      },
      oathbound_choker: {
        id: "oathbound_choker",
        name: "Oathbound Choker",
        slot: "necklace",
        rarity: "B",
        icon: "\u{1F4FF}",
        description: "A leather choker inscribed with a binding oath, traditionally worn by hunters who've sworn to protect a party member.",
        levelReq: 60,
        stats: { ...EMPTY_STATS, vitality: 15, intelligence: 10 },
        specialEffects: ["Oathbound: +5% max HP while in a party"],
        setId: null,
        source: "Dropped by B-rank and higher gate bosses",
        lore: "The oath isn't magical. The choker just makes it harder to forget you made one."
      },
      // ── Vestments of the Rulers — full 10-slot SSS+ set ─────────────────────
      // SSS+ is the first endgame rarity above the Shadow Monarch's grant-only
      // Regalia, and previously had zero items — any drop resolving to SSS+
      // found nothing. Themed on the Rulers, the faction of god-like beings
      // opposing the Monarchs; their chosen hunters are marked by gear like this.
      rulers_judgment: {
        id: "rulers_judgment",
        name: "Ruler's Judgment",
        slot: "weapon",
        rarity: "SSS+",
        icon: "\u26A1",
        description: "A spear of crystallised divine authority, granted to a hunter marked by a Ruler. It does not rust, chip, or dull.",
        levelReq: 400,
        stats: { ...EMPTY_STATS, attack: 1800, strength: 30, perception: 25 },
        specialEffects: ["Divine Judgment: attacks against Monarch-aligned enemies deal +20% damage", "Ruler's Blessing: cannot be disarmed"],
        setId: "rulers_vestments",
        source: "Dropped by SSS+-rank and higher gate bosses",
        lore: "No smith made it. It was simply given, the way a verdict is given \u2014 without negotiation."
      },
      aegis_of_the_absolute: {
        id: "aegis_of_the_absolute",
        name: "Aegis of the Absolute",
        slot: "offHand",
        rarity: "SSS+",
        icon: "\u{1F6E1}\uFE0F",
        description: "A shield of layered light that does not so much block attacks as decline to acknowledge them.",
        levelReq: 410,
        stats: { ...EMPTY_STATS, defense: 200, vitality: 50 },
        specialEffects: ["Absolute Ward: 4% chance to negate incoming damage entirely", "Unbreakable: cannot be destroyed or lost on death"],
        setId: "rulers_vestments",
        source: "Dropped by SSS+-rank and higher gate bosses",
        lore: "Held up against a Monarch's strike, it did not crack. It did not even move."
      },
      halo_of_the_chosen: {
        id: "halo_of_the_chosen",
        name: "Halo of the Chosen",
        slot: "helmet",
        rarity: "SSS+",
        icon: "\u{1F607}",
        description: "A ring of pale light that hovers rather than sits, worn by hunters a Ruler has decided are worth watching.",
        levelReq: 405,
        stats: { ...EMPTY_STATS, defense: 150, perception: 30, intelligence: 20 },
        specialEffects: ["Chosen One: immune to fear, charm, and possession effects", "Watcher's Eye: reveals hidden and stealthed enemies within 20m"],
        setId: "rulers_vestments",
        source: "Dropped by SSS+-rank and higher gate bosses",
        lore: "It does not touch the head that wears it. It simply stays where it is put, the way attention stays where it is directed."
      },
      vestment_of_divine_authority: {
        id: "vestment_of_divine_authority",
        name: "Vestment of Divine Authority",
        slot: "chestplate",
        rarity: "SSS+",
        icon: "\u{1F458}",
        description: "A robe of woven light layered over the body like armour that forgot to be heavy. It answers to the wearer's conviction, not their strength.",
        levelReq: 420,
        stats: { ...EMPTY_STATS, defense: 200, vitality: 55 },
        specialEffects: ["Divine Authority: damage taken reduced by 12% while above 50% HP", "Radiant Form: allies within 10m resist fear effects"],
        setId: "rulers_vestments",
        source: "Dropped by SSS+-rank and higher gate bosses",
        lore: "It weighs nothing until the wearer hesitates. Then, for a moment, it weighs everything."
      },
      gauntlets_of_absolute_will: {
        id: "gauntlets_of_absolute_will",
        name: "Gauntlets of Absolute Will",
        slot: "gloves",
        rarity: "SSS+",
        icon: "\u{1F9E4}",
        description: "Gauntlets of hardened light that channel a Ruler's conviction directly into every strike.",
        levelReq: 415,
        stats: { ...EMPTY_STATS, defense: 120, strength: 50 },
        specialEffects: ["Unyielding Grip: attacks cannot be parried or deflected", "Absolute Will: critical strike chance +6%"],
        setId: "rulers_vestments",
        source: "Dropped by SSS+-rank and higher gate bosses",
        lore: "They do not tire. Neither, it is said, does the will that shaped them."
      },
      sandals_of_the_ruler: {
        id: "sandals_of_the_ruler",
        name: "Sandals of the Ruler",
        slot: "boots",
        rarity: "SSS+",
        icon: "\u{1F463}",
        description: "Simple woven sandals that carry the wearer above the ground more often than on it.",
        levelReq: 400,
        stats: { ...EMPTY_STATS, agility: 55, defense: 90 },
        specialEffects: ["Weightless Step: fall damage entirely negated", "Ruler's Pace: movement speed +18%"],
        setId: "rulers_vestments",
        source: "Dropped by SSS+-rank and higher gate bosses",
        lore: "The wearer's footprints appear a half-second after their feet leave the ground, as if the world is still deciding whether they were really there."
      },
      earring_of_celestial_sight: {
        id: "earring_of_celestial_sight",
        name: "Earring of Celestial Sight",
        slot: "earring",
        rarity: "SSS+",
        icon: "\u2728",
        description: "A drop of solidified starlight, granted to hunters whose perception has been sharpened beyond mortal limits.",
        levelReq: 425,
        stats: { ...EMPTY_STATS, perception: 30, intelligence: 25 },
        specialEffects: ["Celestial Sight: sees through all illusions, invisibility, and dimensional concealment"],
        setId: "rulers_vestments",
        source: "Dropped by SSS+-rank and higher gate bosses",
        lore: "Wearers report seeing the shape of things a half-second before they happen. Most learn to stop mentioning it."
      },
      pendant_of_the_covenant: {
        id: "pendant_of_the_covenant",
        name: "Pendant of the Covenant",
        slot: "necklace",
        rarity: "SSS+",
        icon: "\u{1F4FF}",
        description: "A pendant marking a binding covenant between hunter and Ruler. Neither side has ever been recorded breaking it.",
        levelReq: 430,
        stats: { ...EMPTY_STATS, intelligence: 30, vitality: 25 },
        specialEffects: ["Covenant: mana and HP regeneration +10%", "Bound Word: cannot be silenced or mana-sealed"],
        setId: "rulers_vestments",
        source: "Dropped by SSS+-rank and higher gate bosses",
        lore: "The terms of the covenant were never written down. Both sides simply remember them, perfectly, forever."
      },
      ring_of_the_first_ruler: {
        id: "ring_of_the_first_ruler",
        name: "Ring of the First Ruler",
        slot: "ring",
        rarity: "SSS+",
        icon: "\u{1F48D}",
        description: "A band of pale gold said to have been worn by the very first of the Rulers, before there was a name for what they were.",
        levelReq: 440,
        stats: { ...EMPTY_STATS, strength: 28, perception: 27 },
        specialEffects: ["First Authority: +8% damage against Monarch-aligned enemies"],
        setId: "rulers_vestments",
        source: "Dropped by SSS+-rank and higher gate bosses",
        lore: "It has no inscription. Whoever made it assumed no one would need reminding what it was."
      },
      ring_of_the_last_covenant: {
        id: "ring_of_the_last_covenant",
        name: "Ring of the Last Covenant",
        slot: "ring",
        rarity: "SSS+",
        icon: "\u{1F48D}",
        description: "Twin to the Ring of the First Ruler, said to be the final piece a Ruler ever grants before disappearing from a hunter's life entirely.",
        levelReq: 450,
        stats: { ...EMPTY_STATS, agility: 28, intelligence: 27 },
        specialEffects: ["Last Word: once per dungeon, negate one instance of crowd control"],
        setId: "rulers_vestments",
        source: "Dropped by SSS+-rank and higher gate bosses",
        lore: "Every hunter who receives it stops seeing their Ruler afterward. None of them describe this as a loss."
      },
      // ── National Hunter's Panoply — full 10-slot NH set ─────────────────────
      // NH sits above SSS+ and below Monarch, previously empty. Themed on
      // National-Level Hunters — the handful of humans recognised as individually
      // capable of turning the tide of an S-rank+ crisis.
      blade_of_the_strongest: {
        id: "blade_of_the_strongest",
        name: "Blade of the Strongest",
        slot: "weapon",
        rarity: "NH",
        icon: "\u{1F5E1}\uFE0F",
        description: "A longsword carried by a National-Level Hunter through a dozen S-rank catastrophes. The edge has never once needed sharpening.",
        levelReq: 620,
        stats: { ...EMPTY_STATS, attack: 2600, strength: 45, agility: 35 },
        specialEffects: ["Strongest's Resolve: damage dealt increases by 1% for every 10% HP missing, up to +15%", "National Threat: boss-type enemies take +10% damage"],
        setId: "national_hunters_panoply",
        source: "Dropped by NH-rank and higher gate bosses",
        lore: "Every National-Level Hunter is asked, eventually, to name their blade. Most refuse. This one didn't need a name to be recognised on sight."
      },
      bulwark_of_the_kaisho: {
        id: "bulwark_of_the_kaisho",
        name: "Bulwark of the Kaisho",
        slot: "offHand",
        rarity: "NH",
        icon: "\u{1F6E1}\uFE0F",
        description: "A tower shield carried by Japan's Kaisho-ranked hunter, built to hold a line no one else could.",
        levelReq: 610,
        stats: { ...EMPTY_STATS, defense: 300, vitality: 75 },
        specialEffects: ["Immovable Line: cannot be knocked back or displaced while blocking", "Kaisho's Stand: block chance +15%"],
        setId: "national_hunters_panoply",
        source: "Dropped by NH-rank and higher gate bosses",
        lore: "It has been struck by things that levelled city blocks. The dents are shallow. The line held."
      },
      crown_of_national_authority: {
        id: "crown_of_national_authority",
        name: "Crown of National Authority",
        slot: "helmet",
        rarity: "NH",
        icon: "\u{1F451}",
        description: "A circlet marking formal recognition by a nation's Hunter Association as its strongest active asset.",
        levelReq: 630,
        stats: { ...EMPTY_STATS, defense: 220, perception: 45, intelligence: 35 },
        specialEffects: ["Command Presence: nearby allied hunters gain +8% defense", "Recognised Authority: immune to rank-based intimidation effects"],
        setId: "national_hunters_panoply",
        source: "Dropped by NH-rank and higher gate bosses",
        lore: "Ceremony grants the title. The crown, unofficially, grants everyone else's belief in it."
      },
      plate_of_the_ten: {
        id: "plate_of_the_ten",
        name: "Plate of the Ten",
        slot: "chestplate",
        rarity: "NH",
        icon: "\u{1F9E5}",
        description: "Armour forged for a hunter ranked among the world's top ten. Layered to withstand attacks meant to end wars.",
        levelReq: 650,
        stats: { ...EMPTY_STATS, defense: 300, vitality: 80 },
        specialEffects: ["Ranked Endurance: max HP +8%", "Ten's Resolve: damage taken while below 20% HP reduced by 20%"],
        setId: "national_hunters_panoply",
        source: "Dropped by NH-rank and higher gate bosses",
        lore: "Only ten are ever made at a time. When one hunter falls from the ranking, the plate simply stops responding to them."
      },
      gauntlets_of_the_apex_predator: {
        id: "gauntlets_of_the_apex_predator",
        name: "Gauntlets of the Apex Predator",
        slot: "gloves",
        rarity: "NH",
        icon: "\u{1F9BE}",
        description: "Gauntlets worn by a hunter whose combat record includes soloing threats the Association classified as unsurvivable.",
        levelReq: 640,
        stats: { ...EMPTY_STATS, defense: 180, strength: 80 },
        specialEffects: ["Apex Instinct: critical strike chance +10% against enemies above your rank", "Predatory Grip: grabbed enemies take +15% damage"],
        setId: "national_hunters_panoply",
        source: "Dropped by NH-rank and higher gate bosses",
        lore: "The Association reclassified the threat as survivable after the fact. The gauntlets were the reason."
      },
      boots_of_the_frontline: {
        id: "boots_of_the_frontline",
        name: "Boots of the Frontline",
        slot: "boots",
        rarity: "NH",
        icon: "\u{1F97E}",
        description: "Boots issued only to hunters who are first through a collapsing gate, every time, without exception.",
        levelReq: 615,
        stats: { ...EMPTY_STATS, agility: 80, defense: 130 },
        specialEffects: ["Frontline Reflex: dodge chance +8%", "First In: movement speed +20% for the first 10s of any dungeon"],
        setId: "national_hunters_panoply",
        source: "Dropped by NH-rank and higher gate bosses",
        lore: "Every scar on the leather corresponds to a gate that would otherwise have made the news for the wrong reasons."
      },
      earring_of_command: {
        id: "earring_of_command",
        name: "Earring of Command",
        slot: "earring",
        rarity: "NH",
        icon: "\u{1F48E}",
        description: "A stud enchanted to carry a hunter's voice across an entire battlefield, clear over any din.",
        levelReq: 660,
        stats: { ...EMPTY_STATS, perception: 45, intelligence: 35 },
        specialEffects: ["Commanding Voice: party members gain +6% attack while you are above 50% HP"],
        setId: "national_hunters_panoply",
        source: "Dropped by NH-rank and higher gate bosses",
        lore: "A single word through this earring has stopped a retreat mid-collapse. Twice."
      },
      medallion_of_the_association: {
        id: "medallion_of_the_association",
        name: "Medallion of the Association",
        slot: "necklace",
        rarity: "NH",
        icon: "\u{1F396}\uFE0F",
        description: "A medallion presented by the Korean Hunter's Association to a hunter formally acknowledged as National-Level.",
        levelReq: 670,
        stats: { ...EMPTY_STATS, intelligence: 45, vitality: 35 },
        specialEffects: ["Association Backing: mana cost of all skills reduced by 8%", "National Duty: revive time from downed states reduced by 25%"],
        setId: "national_hunters_panoply",
        source: "Dropped by NH-rank and higher gate bosses",
        lore: "Fewer than a dozen exist at any time. Every government on the planet knows exactly who holds one."
      },
      signet_of_the_strongest_guild: {
        id: "signet_of_the_strongest_guild",
        name: "Signet of the Strongest Guild",
        slot: "ring",
        rarity: "NH",
        icon: "\u{1F48D}",
        description: "A signet ring carried only by the leader of the world's highest-ranked hunter guild.",
        levelReq: 690,
        stats: { ...EMPTY_STATS, strength: 40, agility: 30, critChance: 8 },
        specialEffects: ["Guild Authority: summoned or commanded allies gain +8% attack"],
        setId: "national_hunters_panoply",
        source: "Dropped by NH-rank and higher gate bosses",
        lore: "Guild rankings change constantly. This ring, notably, does not \u2014 it simply finds its way to whoever currently deserves it."
      },
      seal_of_national_recognition: {
        id: "seal_of_national_recognition",
        name: "Seal of National Recognition",
        slot: "ring",
        rarity: "NH",
        icon: "\u{1F48D}",
        description: "A seal ring stamped with a national emblem, granted only after a hunter's strength has been formally verified by three governing bodies.",
        levelReq: 700,
        stats: { ...EMPTY_STATS, perception: 40, intelligence: 30, critDamage: 15 },
        specialEffects: ["Verified Strength: experience gained from S-rank+ kills increased by 10%"],
        setId: "national_hunters_panoply",
        source: "Dropped by NH-rank and higher gate bosses",
        lore: "The verification process takes years. The ring, once granted, has never been revoked."
      },
      // ── Monarch's Dominion — full 10-slot Monarch set ───────────────────────
      // Monarch sits above NH, previously empty. Themed on the invading
      // Monarchs — Beast, Ice, Frost, and Plague — the rulers whose armies
      // poured through the gates before the Shadow Monarch turned against them.
      fang_of_the_beast_monarch: {
        id: "fang_of_the_beast_monarch",
        name: "Fang of the Beast Monarch",
        slot: "weapon",
        rarity: "Monarch",
        icon: "\u{1F981}",
        description: "A curved claw-blade torn from the Beast Monarch itself, still carrying the weight of a will that once commanded armies of beasts.",
        levelReq: 950,
        stats: { ...EMPTY_STATS, attack: 3800, strength: 65, agility: 55 },
        specialEffects: ["Feral Instinct: critical strike chance +12%", "Beast's Hunger: killing blows restore 8% max HP"],
        setId: "monarchs_dominion",
        source: "Dropped by Monarch-rank and higher gate bosses",
        lore: "It hungers even now, detached from the creature that carried it for ten thousand years. Wielders learn to feed it kills, or it finds a way to remind them."
      },
      ward_of_the_frost_monarch: {
        id: "ward_of_the_frost_monarch",
        name: "Ward of the Frost Monarch",
        slot: "offHand",
        rarity: "Monarch",
        icon: "\u2744\uFE0F",
        description: "A shield of eternal ice carved from the Frost Monarch's own domain. It does not melt, even against fire that ends worlds.",
        levelReq: 930,
        stats: { ...EMPTY_STATS, defense: 450, vitality: 110 },
        specialEffects: ["Frozen Bastion: 6% chance to freeze an attacker for 2s on block", "Eternal Ice: cannot be destroyed or lost on death"],
        setId: "monarchs_dominion",
        source: "Dropped by Monarch-rank and higher gate bosses",
        lore: "Frost this deep does not answer to seasons. It answers to a will that has not existed for years, and still hasn't noticed."
      },
      crown_of_absolute_dominion: {
        id: "crown_of_absolute_dominion",
        name: "Crown of Absolute Dominion",
        slot: "helmet",
        rarity: "Monarch",
        icon: "\u{1F451}",
        description: "A jagged crown worn by a Monarch before its fall, radiating the residual authority of a being that once ruled an entire race.",
        levelReq: 960,
        stats: { ...EMPTY_STATS, defense: 320, perception: 65, intelligence: 55 },
        specialEffects: ["Absolute Dominion: lower-rank enemies suffer -10% attack in your presence", "Monarch's Gaze: reveals all enemies on the current floor for 5s (once per dungeon)"],
        setId: "monarchs_dominion",
        source: "Dropped by Monarch-rank and higher gate bosses",
        lore: "It does not fit any head comfortably. It was never meant to. Dominion isn't supposed to be comfortable."
      },
      carapace_of_the_plague_monarch: {
        id: "carapace_of_the_plague_monarch",
        name: "Carapace of the Plague Monarch",
        slot: "chestplate",
        rarity: "Monarch",
        icon: "\u2623\uFE0F",
        description: "Chitinous armour grown from the Plague Monarch's own exoskeleton, immune to every disease and toxin known to either world.",
        levelReq: 1e3,
        stats: { ...EMPTY_STATS, defense: 450, vitality: 120 },
        specialEffects: ["Plague Immunity: complete immunity to poison, disease, and debuff effects", "Toxic Retaliation: attackers suffer a stacking poison dealing 3% max HP over 5s"],
        setId: "monarchs_dominion",
        source: "Dropped by Monarch-rank and higher gate bosses",
        lore: "It was harvested, not forged. What grew back afterward was not the same shape, and no one asked why."
      },
      talons_of_the_beast_monarch: {
        id: "talons_of_the_beast_monarch",
        name: "Talons of the Beast Monarch",
        slot: "gloves",
        rarity: "Monarch",
        icon: "\u{1F43E}",
        description: "Gauntlets tipped with the Beast Monarch's own claws, still sharp enough to open a rift between worlds.",
        levelReq: 970,
        stats: { ...EMPTY_STATS, defense: 260, strength: 120 },
        specialEffects: ["Rending Talons: attacks ignore 25% of enemy defense", "Alpha Strike: first hit of combat deals +30% damage"],
        setId: "monarchs_dominion",
        source: "Dropped by Monarch-rank and higher gate bosses",
        lore: "Something in the marrow of the claws still remembers being obeyed by every beast that ever lived. It has not adjusted well."
      },
      greaves_of_the_ice_monarch: {
        id: "greaves_of_the_ice_monarch",
        name: "Greaves of the Ice Monarch",
        slot: "boots",
        rarity: "Monarch",
        icon: "\u{1F976}",
        description: "Greaves that leave a trail of frost with every step, a fragment of the Ice Monarch's endless winter given form.",
        levelReq: 940,
        stats: { ...EMPTY_STATS, agility: 120, defense: 200 },
        specialEffects: ["Glacial Stride: leaves a frost trail that slows pursuing enemies by 20%", "Winter's Grace: immune to slow and freeze effects"],
        setId: "monarchs_dominion",
        source: "Dropped by Monarch-rank and higher gate bosses",
        lore: "The frost never melts behind them. Somewhere, a winter that should have ended keeps not ending."
      },
      earring_of_the_frost_monarch: {
        id: "earring_of_the_frost_monarch",
        name: "Earring of the Frost Monarch",
        slot: "earring",
        rarity: "Monarch",
        icon: "\u{1F48E}",
        description: "A shard of eternal ice set as a drop earring, cold enough to numb thought in anyone but its rightful bearer.",
        levelReq: 1020,
        stats: { ...EMPTY_STATS, perception: 65, intelligence: 55 },
        specialEffects: ["Frost Clarity: skill cooldowns reduced by 12%"],
        setId: "monarchs_dominion",
        source: "Dropped by Monarch-rank and higher gate bosses",
        lore: "It has never warmed, not once, not even held against skin for years. Some things simply refuse."
      },
      pendant_of_plague: {
        id: "pendant_of_plague",
        name: "Pendant of Plague",
        slot: "necklace",
        rarity: "Monarch",
        icon: "\u{1F4FF}",
        description: "A pendant containing a single sealed spore from the Plague Monarch's domain, potent enough to end cities if released.",
        levelReq: 1040,
        stats: { ...EMPTY_STATS, intelligence: 65, vitality: 55 },
        specialEffects: ["Contained Plague: mana regeneration +18%", "Sealed Menace: cannot be removed by enemy debuff-strip effects"],
        setId: "monarchs_dominion",
        source: "Dropped by Monarch-rank and higher gate bosses",
        lore: "The seal has held for years. No one has volunteered to check how."
      },
      ring_of_beastly_command: {
        id: "ring_of_beastly_command",
        name: "Ring of Beastly Command",
        slot: "ring",
        rarity: "Monarch",
        icon: "\u{1F48D}",
        description: "A ring grown from bone and claw, carrying the Beast Monarch's authority over every lesser creature.",
        levelReq: 1080,
        stats: { ...EMPTY_STATS, strength: 60, agility: 50, critDamage: 20 },
        specialEffects: ["Beastly Command: summoned or extracted beast-type allies gain +10% attack"],
        setId: "monarchs_dominion",
        source: "Dropped by Monarch-rank and higher gate bosses",
        lore: "Lesser creatures give it a wide berth without knowing why. Something in them still remembers who used to give the orders."
      },
      ring_of_glacial_sovereignty: {
        id: "ring_of_glacial_sovereignty",
        name: "Ring of Glacial Sovereignty",
        slot: "ring",
        rarity: "Monarch",
        icon: "\u{1F48D}",
        description: "A band of blue ice that never melts and never cracks, a remnant of the Frost Monarch's absolute rule over cold itself.",
        levelReq: 1100,
        stats: { ...EMPTY_STATS, perception: 60, intelligence: 50, critChance: 12 },
        specialEffects: ["Glacial Sovereignty: ice and frost skills deal +15% damage"],
        setId: "monarchs_dominion",
        source: "Dropped by Monarch-rank and higher gate bosses",
        lore: "The cold radiating from it has been measured. The instruments used to measure it stopped working afterward."
      },
      // ── Dragon Emperor's Ruin — full 10-slot Monarch+ set ───────────────────
      // Monarch+ is the highest droppable rarity below the grant-only Regalia,
      // previously empty. Themed on Antares, the Dragon Emperor — Monarch of
      // Destruction and by reputation the single strongest Monarch to ever cross
      // through a gate.
      antares_fang_of_ruin: {
        id: "antares_fang_of_ruin",
        name: "Antares, Fang of Ruin",
        slot: "weapon",
        rarity: "Monarch+",
        icon: "\u{1F432}",
        description: "A single fang torn from Antares, the Dragon Emperor, reforged into a blade that still radiates the heat of a dying star.",
        levelReq: 1350,
        stats: { ...EMPTY_STATS, attack: 5500, strength: 100, agility: 80 },
        specialEffects: ["Emperor's Ruin: attacks deal an additional 10% of the target's current HP as true damage", "Draconic Wrath: critical hits ignite the target, dealing 5% max HP over 6s"],
        setId: "dragon_emperors_ruin",
        source: "Dropped by Monarch+-rank and higher gate bosses",
        lore: "Antares was called the strongest of the Monarchs by every account that survived to say so. This is what remained after the ones who disagreed stopped disagreeing."
      },
      scale_ward_of_annihilation: {
        id: "scale_ward_of_annihilation",
        name: "Scale Ward of Annihilation",
        slot: "offHand",
        rarity: "Monarch+",
        icon: "\u{1F6E1}\uFE0F",
        description: "A shield built from a single scale of the Dragon Emperor, large enough to cover a hunter twice over and still not run out of surface.",
        levelReq: 1380,
        stats: { ...EMPTY_STATS, defense: 650, vitality: 170 },
        specialEffects: ["Annihilation Ward: reduces all incoming damage by 20%", "Draconic Bulwark: cannot be destroyed, lost on death, or disarmed"],
        setId: "dragon_emperors_ruin",
        source: "Dropped by Monarch+-rank and higher gate bosses",
        lore: "It was struck once, by something that erased a mountain range on impact. The scale did not notice."
      },
      crown_of_the_dragon_emperor: {
        id: "crown_of_the_dragon_emperor",
        name: "Crown of the Dragon Emperor",
        slot: "helmet",
        rarity: "Monarch+",
        icon: "\u{1F451}",
        description: "A crown of fused dragonbone and molten gold, worn by Antares before its fall. The heat inside never fully cools.",
        levelReq: 1400,
        stats: { ...EMPTY_STATS, defense: 480, perception: 100, intelligence: 80 },
        specialEffects: ["Emperor's Authority: all enemies below Monarch rank suffer -15% attack in your presence", "Sovereign Sight: sees through all forms of concealment, illusion, and dimensional folding"],
        setId: "dragon_emperors_ruin",
        source: "Dropped by Monarch+-rank and higher gate bosses",
        lore: "Every Monarch who saw it worn hesitated, if only for a heartbeat. A heartbeat was usually enough."
      },
      hide_of_absolute_destruction: {
        id: "hide_of_absolute_destruction",
        name: "Hide of Absolute Destruction",
        slot: "chestplate",
        rarity: "Monarch+",
        icon: "\u{1F409}",
        description: "Armour cut from the Dragon Emperor's own hide, thick enough to have shrugged off attacks meant to unmake continents.",
        levelReq: 1500,
        stats: { ...EMPTY_STATS, defense: 650, vitality: 180 },
        specialEffects: ["Absolute Endurance: max HP +15%", "Ruinous Resolve: below 15% HP, all damage taken reduced by 30% for 10s (60s CD)"],
        setId: "dragon_emperors_ruin",
        source: "Dropped by Monarch+-rank and higher gate bosses",
        lore: "The Association classified it as indestructible after three separate attempts to test that claim. All three attempts are also classified."
      },
      talons_of_the_apocalypse: {
        id: "talons_of_the_apocalypse",
        name: "Talons of the Apocalypse",
        slot: "gloves",
        rarity: "Monarch+",
        icon: "\u{1F9BE}",
        description: "Gauntlets forged around the Dragon Emperor's own talons, capable of rending through dimensions as easily as flesh.",
        levelReq: 1420,
        stats: { ...EMPTY_STATS, defense: 380, strength: 180 },
        specialEffects: ["Dimensional Rend: attacks ignore 35% of enemy defense", "Apocalyptic Strike: every 8th attack deals 300% ATK to all enemies within 5m"],
        setId: "dragon_emperors_ruin",
        source: "Dropped by Monarch+-rank and higher gate bosses",
        lore: "They were named for what happened the one time they were used without restraint. The name stuck."
      },
      greaves_of_the_burning_horizon: {
        id: "greaves_of_the_burning_horizon",
        name: "Greaves of the Burning Horizon",
        slot: "boots",
        rarity: "Monarch+",
        icon: "\u{1F525}",
        description: "Greaves wreathed in a fire that never gutters, said to carry the Dragon Emperor's wingbeat in every stride.",
        levelReq: 1370,
        stats: { ...EMPTY_STATS, agility: 180, defense: 300 },
        specialEffects: ["Burning Horizon: movement speed +30%; leaves a trail of fire dealing damage to pursuing enemies", "Emperor's Flight: may briefly take to the air, ignoring ground-based terrain and traps"],
        setId: "dragon_emperors_ruin",
        source: "Dropped by Monarch+-rank and higher gate bosses",
        lore: "The fire does not burn the wearer, or anything the wearer wishes spared. Everything else is a different matter."
      },
      earring_of_the_final_beast: {
        id: "earring_of_the_final_beast",
        name: "Earring of the Final Beast",
        slot: "earring",
        rarity: "Monarch+",
        icon: "\u{1F48E}",
        description: "A single dragon-scale earring, the last piece of Antares ever recovered intact. It hums with a mind that no longer exists to think.",
        levelReq: 1450,
        stats: { ...EMPTY_STATS, perception: 100, intelligence: 80 },
        specialEffects: ["Final Beast: cooldown reduction +20%", "Emperor's Instinct: cannot be surprised or ambushed"],
        setId: "dragon_emperors_ruin",
        source: "Dropped by Monarch+-rank and higher gate bosses",
        lore: "It hums a note no instrument can replicate. Musicians who have heard it stop trying to write music for a while afterward."
      },
      heart_of_annihilation: {
        id: "heart_of_annihilation",
        name: "Heart of Annihilation",
        slot: "necklace",
        rarity: "Monarch+",
        icon: "\u{1F4A0}",
        description: "The crystallised mana-core of the Dragon Emperor itself, still beating with the force of whatever kept a being like that alive.",
        levelReq: 1480,
        stats: { ...EMPTY_STATS, intelligence: 100, vitality: 80 },
        specialEffects: ["Heart of Annihilation: +20% maximum HP and MP", "Draconic Rebirth: once per dungeon, survive a lethal blow at 10% HP and cleanse all debuffs"],
        setId: "dragon_emperors_ruin",
        source: "Dropped by Monarch+-rank and higher gate bosses",
        lore: "It beats once every ten minutes, a slow and terrible rhythm. Wearers say they can feel it in their teeth."
      },
      ring_of_the_ruinous_flame: {
        id: "ring_of_the_ruinous_flame",
        name: "Ring of the Ruinous Flame",
        slot: "ring",
        rarity: "Monarch+",
        icon: "\u{1F48D}",
        description: "A band of black gold wreathed in a flame that consumes without ever running out of fuel.",
        levelReq: 1550,
        stats: { ...EMPTY_STATS, strength: 90, agility: 70, critDamage: 25 },
        specialEffects: ["Ruinous Flame: fire and destruction-type skills deal +20% damage"],
        setId: "dragon_emperors_ruin",
        source: "Dropped by Monarch+-rank and higher gate bosses",
        lore: "The flame has consumed nothing in the wearer's presence for years. It has not, notably, gone out."
      },
      ring_of_the_dragon_emperors_wrath: {
        id: "ring_of_the_dragon_emperors_wrath",
        name: "Ring of the Dragon Emperor's Wrath",
        slot: "ring",
        rarity: "Monarch+",
        icon: "\u{1F48D}",
        description: "The final ring of the set, said to carry the last thing Antares felt before falling \u2014 not fear, but fury that it was even possible.",
        levelReq: 1600,
        stats: { ...EMPTY_STATS, perception: 90, intelligence: 70, critChance: 18 },
        specialEffects: ["Emperor's Wrath: damage dealt to Monarch-rank and higher enemies increased by 15%"],
        setId: "dragon_emperors_ruin",
        source: "Dropped by Monarch+-rank and higher gate bosses",
        lore: "It is said to still be angry. No one has been foolish enough to ask what about."
      }
    };
    var EQUIPMENT_SETS = Object.freeze({
      // Kamish's Legacy — the top FARMABLE set (SS). Flat bonuses on purpose: the
      // Shadow Monarch's Regalia scales as a percentage of base stats via
      // SoloLevelingStats and is rank-gated, so this can never eclipse the Lv2000
      // reward no matter how much gear is farmed.
      kamishs_legacy: {
        name: "Kamish's Legacy",
        pieces: [
          "kamishs_fang",
          "kamishs_scale_ward",
          "dragonbone_visor",
          "scaled_cuirass_of_the_catastrophe",
          "dragonclaw_gauntlets",
          "wyrmstride_greaves",
          "ember_of_kamish",
          "heart_of_the_catastrophe",
          "ring_of_the_dragons_eye",
          "ring_of_the_dragons_maw"
        ],
        bonuses: {
          3: Object.freeze({ strength: 8, agility: 8, intelligence: 8, vitality: 8, perception: 8 }),
          6: Object.freeze({ strength: 18, agility: 18, intelligence: 18, vitality: 18, perception: 18 }),
          10: Object.freeze({ strength: 35, agility: 35, intelligence: 35, vitality: 35, perception: 35 })
        }
      },
      demon_monarch_set: {
        name: "Demon Monarch's Set",
        pieces: ["demon_monarchs_earring", "demon_monarchs_necklace", "demon_monarchs_ring"],
        bonuses: {
          2: Object.freeze({ strength: 5, agility: 5, intelligence: 5, vitality: 5, perception: 5 }),
          3: Object.freeze({ strength: 10, agility: 10, intelligence: 10, vitality: 10, perception: 10 })
        }
      },
      shadow_monarch_regalia: {
        name: "Shadow Monarch's Regalia",
        pieces: [
          "shadow_monarchs_blade",
          "shadow_monarchs_aegis",
          "crown_of_the_shadow_monarch",
          "shadow_sovereigns_mantle",
          "shadow_gauntlets",
          "shadow_greaves",
          "shadow_monarchs_earring",
          "shadow_monarchs_necklace",
          "shadow_monarchs_ring_left",
          "shadow_monarchs_ring_right"
        ],
        // Strongest set in the game: high flat bonuses here, PLUS SoloLevelingStats
        // getTotalEffectiveStats layers the Shadow Monarch scaling perk (grows with
        // the player's own base stats) on top. See progression-read-model.js.
        bonuses: {
          3: Object.freeze({ strength: 15, agility: 15, intelligence: 15, vitality: 15, perception: 15 }),
          6: Object.freeze({ strength: 40, agility: 40, intelligence: 40, vitality: 40, perception: 40, attack: 250, defense: 250 }),
          10: Object.freeze({ strength: 80, agility: 80, intelligence: 80, vitality: 80, perception: 80, attack: 750, defense: 750 })
        }
      },
      rulers_vestments: {
        name: "Vestments of the Rulers",
        pieces: [
          "rulers_judgment",
          "aegis_of_the_absolute",
          "halo_of_the_chosen",
          "vestment_of_divine_authority",
          "gauntlets_of_absolute_will",
          "sandals_of_the_ruler",
          "earring_of_celestial_sight",
          "pendant_of_the_covenant",
          "ring_of_the_first_ruler",
          "ring_of_the_last_covenant"
        ],
        bonuses: {
          3: Object.freeze({ strength: 45, agility: 45, intelligence: 45, vitality: 45, perception: 45 }),
          6: Object.freeze({ strength: 90, agility: 90, intelligence: 90, vitality: 90, perception: 90 }),
          10: Object.freeze({ strength: 160, agility: 160, intelligence: 160, vitality: 160, perception: 160 })
        }
      },
      national_hunters_panoply: {
        name: "National Hunter's Panoply",
        pieces: [
          "blade_of_the_strongest",
          "bulwark_of_the_kaisho",
          "crown_of_national_authority",
          "plate_of_the_ten",
          "gauntlets_of_the_apex_predator",
          "boots_of_the_frontline",
          "earring_of_command",
          "medallion_of_the_association",
          "signet_of_the_strongest_guild",
          "seal_of_national_recognition"
        ],
        bonuses: {
          3: Object.freeze({ strength: 70, agility: 70, intelligence: 70, vitality: 70, perception: 70 }),
          6: Object.freeze({ strength: 140, agility: 140, intelligence: 140, vitality: 140, perception: 140 }),
          10: Object.freeze({ strength: 250, agility: 250, intelligence: 250, vitality: 250, perception: 250 })
        }
      },
      monarchs_dominion: {
        name: "Monarch's Dominion",
        pieces: [
          "fang_of_the_beast_monarch",
          "ward_of_the_frost_monarch",
          "crown_of_absolute_dominion",
          "carapace_of_the_plague_monarch",
          "talons_of_the_beast_monarch",
          "greaves_of_the_ice_monarch",
          "earring_of_the_frost_monarch",
          "pendant_of_plague",
          "ring_of_beastly_command",
          "ring_of_glacial_sovereignty"
        ],
        bonuses: {
          3: Object.freeze({ strength: 110, agility: 110, intelligence: 110, vitality: 110, perception: 110 }),
          6: Object.freeze({ strength: 220, agility: 220, intelligence: 220, vitality: 220, perception: 220 }),
          10: Object.freeze({ strength: 400, agility: 400, intelligence: 400, vitality: 400, perception: 400 })
        }
      },
      dragon_emperors_ruin: {
        name: "Dragon Emperor's Ruin",
        pieces: [
          "antares_fang_of_ruin",
          "scale_ward_of_annihilation",
          "crown_of_the_dragon_emperor",
          "hide_of_absolute_destruction",
          "talons_of_the_apocalypse",
          "greaves_of_the_burning_horizon",
          "earring_of_the_final_beast",
          "heart_of_annihilation",
          "ring_of_the_ruinous_flame",
          "ring_of_the_dragon_emperors_wrath"
        ],
        bonuses: {
          3: Object.freeze({ strength: 170, agility: 170, intelligence: 170, vitality: 170, perception: 170 }),
          6: Object.freeze({ strength: 340, agility: 340, intelligence: 340, vitality: 340, perception: 340 }),
          10: Object.freeze({ strength: 600, agility: 600, intelligence: 600, vitality: 600, perception: 600 })
        }
      }
    });
    var DROP_CHANCE_BY_RANK = Object.freeze({
      E: 0.25,
      D: 0.26,
      C: 0.27,
      B: 0.28,
      A: 0.29,
      S: 0.3,
      SS: 0.31,
      SSS: 0.32,
      "SSS+": 0.33,
      NH: 0.34,
      Monarch: 0.35,
      "Monarch+": 0.35
      // 'Shadow Monarch' is deliberately ABSENT. It is the player's terminal rank,
      // and its reward is the Regalia grant at Lv2000 (+35 achievements) — not
      // loot. A Shadow-Monarch-rank boss resolves DOWN to the nearest ranked entry
      // (Monarch+) for drop purposes; see _resolveRankForDrops().
    });
    var RARITY_POOL_BY_RANK = Object.freeze({
      E: Object.freeze(["D", "C"]),
      D: Object.freeze(["D", "C"]),
      C: Object.freeze(["D", "C", "B"]),
      B: Object.freeze(["C", "B", "A"]),
      A: Object.freeze(["B", "A", "S"]),
      S: Object.freeze(["A", "S", "SS"]),
      SS: Object.freeze(["S", "SS", "SSS+"]),
      SSS: Object.freeze(["SS", "SSS+", "NH"]),
      "SSS+": Object.freeze(["SS", "SSS+", "NH"]),
      NH: Object.freeze(["SSS+", "NH", "Monarch"]),
      Monarch: Object.freeze(["NH", "Monarch", "Monarch+"]),
      "Monarch+": Object.freeze(["NH", "Monarch", "Monarch+"])
    });
    var GRANT_ONLY_SET_IDS = Object.freeze(["shadow_monarch_regalia"]);
    var RARITY_ORDER = Object.freeze([
      "D",
      "C",
      "B",
      "A",
      "S",
      "SS",
      "SSS",
      "SSS+",
      "NH",
      "Monarch",
      "Monarch+",
      "Shadow Monarch"
    ]);
    var RARITY_WEIGHTS = Object.freeze([0.7, 0.2, 0.1]);
    var RARITY_WEIGHTS_BY_RANK = Object.freeze({
      A: Object.freeze([0.55, 0.3, 0.15]),
      S: Object.freeze([0.55, 0.3, 0.15]),
      SS: Object.freeze([0.55, 0.32, 0.13]),
      SSS: Object.freeze([0.5, 0.35, 0.15]),
      "SSS+": Object.freeze([0.45, 0.37, 0.18]),
      NH: Object.freeze([0.45, 0.37, 0.18]),
      Monarch: Object.freeze([0.45, 0.37, 0.18]),
      "Monarch+": Object.freeze([0.35, 0.4, 0.25])
    });
    var DROP_TABLES = Object.freeze({
      DROP_CHANCE_BY_RANK,
      RARITY_POOL_BY_RANK,
      RARITY_WEIGHTS,
      RARITY_WEIGHTS_BY_RANK
    });
    var GUARANTEED_DROPS = Object.freeze({
      1: Object.freeze(["gatekeepers_necklace"]),
      50: Object.freeze(["demon_monarchs_earring"]),
      75: Object.freeze(["demon_monarchs_necklace"]),
      100: Object.freeze(["demon_monarchs_ring", "demon_kings_daggers"])
    });
    function getEquipmentById(id) {
      return EQUIPMENT_DATABASE[id] || null;
    }
    function getEquipmentForSlot(slot) {
      const isRingSlot = slot === "ring1" || slot === "ring2" || slot === "ring";
      return Object.values(EQUIPMENT_DATABASE).filter((item) => {
        if (isRingSlot) return item.slot === "ring";
        return item.slot === slot;
      });
    }
    function getRarityColor(rarity) {
      return RARITY_COLORS[rarity] || RARITY_COLORS.E;
    }
    module2.exports = {
      EQUIPMENT_SLOTS,
      RARITY_COLORS,
      STAT_KEYS,
      EMPTY_STATS,
      EQUIPMENT_DATABASE,
      EQUIPMENT_SETS,
      DROP_TABLES,
      DROP_CHANCE_BY_RANK,
      RARITY_POOL_BY_RANK,
      RARITY_WEIGHTS,
      RARITY_WEIGHTS_BY_RANK,
      RARITY_ORDER,
      GRANT_ONLY_SET_IDS,
      GUARANTEED_DROPS,
      getEquipmentById,
      getEquipmentForSlot,
      getRarityColor
    };
  }
});

// src/shared/event-bus.js
var require_event_bus = __commonJS({
  "src/shared/event-bus.js"(exports2, module2) {
    (function initGlobalEventBus() {
      if (typeof window === "undefined") return;
      if (!window.__SL_EventBus) {
        let _getNativeBus2 = function() {
          if (_nativeBusChecked) return _nativeBus;
          _nativeBusChecked = true;
          if (typeof BdApi !== "undefined" && BdApi.Events && typeof BdApi.Events.on === "function" && typeof BdApi.Events.emit === "function") {
            _nativeBus = BdApi.Events;
          }
          return _nativeBus;
        };
        var _getNativeBus = _getNativeBus2;
        const listeners = /* @__PURE__ */ new Map();
        let _nativeBus = null;
        let _nativeBusChecked = false;
        window.__SL_EventBus = {
          on(event, handler) {
            if (!listeners.has(event)) listeners.set(event, /* @__PURE__ */ new Set());
            listeners.get(event).add(handler);
            const _nb_on = _getNativeBus2();
            if (_nb_on) {
              try {
                _nb_on.on(event, handler);
              } catch (_) {
              }
            }
          },
          off(event, handler) {
            const set = listeners.get(event);
            if (set) {
              set.delete(handler);
              if (set.size === 0) listeners.delete(event);
            }
            const _nb_off = _getNativeBus2();
            if (_nb_off) {
              try {
                _nb_off.off(event, handler);
              } catch (_) {
              }
            }
          },
          emit(event, ...args) {
            const set = listeners.get(event);
            if (set) {
              for (const handler of set) {
                try {
                  handler(...args);
                } catch (err) {
                  console.error(`[SL:EventBus] ${event}:`, err);
                }
              }
            }
          }
        };
      }
    })();
    module2.exports = window.__SL_EventBus;
  }
});

// src/EquipmentManager/equipment-logic.js
var require_equipment_logic = __commonJS({
  "src/EquipmentManager/equipment-logic.js"(exports2, module2) {
    var C2 = require_constants();
    var SLEvents = require_event_bus();
    var SLOT_COMPATIBILITY = {
      ring: ["ring1", "ring2"]
    };
    function resolveCompatibleSlots(definition) {
      const slotType = definition.slot;
      return SLOT_COMPATIBILITY[slotType] || [slotType];
    }
    module2.exports = {
      /**
       * Equip an item from inventory into a slot.
       *
       * @param {string} instanceId   — inventory item instance ID
       * @param {string} targetSlot   — slot to equip into (e.g. 'weapon', 'ring1')
       * @returns {{ success: boolean, message: string, unequippedInstanceId?: string }}
       */
      equipItem(instanceId, targetSlot) {
        var _a, _b;
        const instance = this.storage.getInstance(instanceId);
        if (!instance) {
          return { success: false, message: "Item not found in inventory." };
        }
        const definition = C2.getEquipmentById(instance.equipmentId);
        if (!definition) {
          return {
            success: false,
            message: `Unknown equipment ID: ${instance.equipmentId}`
          };
        }
        const compatibleSlots = resolveCompatibleSlots(definition);
        if (!compatibleSlots.includes(targetSlot)) {
          return {
            success: false,
            message: `${definition.name} cannot be equipped in slot "${targetSlot}". Compatible slots: ${compatibleSlots.join(", ")}.`
          };
        }
        const levelReq = definition.levelReq || definition.levelRequirement || 0;
        const userLevel = this._userLevel || 0;
        if (userLevel < levelReq) {
          return {
            success: false,
            message: `Requires level ${levelReq}. Current level: ${userLevel}.`
          };
        }
        const equipped = this.storage.getEquipped();
        let unequippedInstanceId;
        if (equipped[targetSlot]) {
          unequippedInstanceId = equipped[targetSlot];
          this.storage.clearEquipped(targetSlot);
          (_a = this.debugLog) == null ? void 0 : _a.call(this, `[EquipmentManager] Auto-unequipped ${unequippedInstanceId} from ${targetSlot}`);
        }
        this.storage.setEquipped(targetSlot, instanceId);
        this.calculateTotalBonuses();
        SLEvents.emit("EquipmentManager:changed", {
          action: "equip",
          instanceId,
          slot: targetSlot,
          unequippedInstanceId: unequippedInstanceId || null,
          bonuses: this._cachedBonuses
        });
        (_b = this.debugLog) == null ? void 0 : _b.call(this, `[EquipmentManager] Equipped ${definition.name} (${instanceId}) into slot "${targetSlot}"`);
        return {
          success: true,
          message: `${definition.name} equipped.`,
          ...unequippedInstanceId ? { unequippedInstanceId } : {}
        };
      },
      /**
       * Unequip the item in the given slot, returning it to inventory.
       *
       * @param {string} slot — slot name to clear (e.g. 'weapon', 'ring2')
       * @returns {{ success: boolean, message: string }}
       */
      unequipItem(slot) {
        var _a;
        const equipped = this.storage.getEquipped();
        const instanceId = equipped[slot];
        if (!instanceId) {
          return { success: false, message: `Slot "${slot}" is already empty.` };
        }
        this.storage.clearEquipped(slot);
        this.calculateTotalBonuses();
        SLEvents.emit("EquipmentManager:changed", {
          action: "unequip",
          instanceId,
          slot,
          bonuses: this._cachedBonuses
        });
        (_a = this.debugLog) == null ? void 0 : _a.call(this, `[EquipmentManager] Unequipped ${instanceId} from slot "${slot}"`);
        return { success: true, message: `Item unequipped from "${slot}".` };
      },
      /**
       * Calculate total stat bonuses from all equipped items and active set bonuses.
       * Caches result in this._cachedBonuses and returns it.
       *
       * @returns {object} — flat stat bonus object matching C.EMPTY_STATS shape
       */
      calculateTotalBonuses(instanceMap) {
        var _a, _b, _c;
        const totals = { ...C2.EMPTY_STATS };
        const equipped = this.storage.getEquipped();
        const lookupInstance = (id) => instanceMap ? instanceMap.get(id) : this.storage.getInstance(id);
        for (const [slot, instanceId] of Object.entries(equipped)) {
          if (!instanceId) continue;
          const instance = lookupInstance(instanceId);
          if (!instance) {
            (_a = this.debugLog) == null ? void 0 : _a.call(this, `[EquipmentManager] calculateTotalBonuses: instance ${instanceId} (slot ${slot}) not found in inventory`);
            continue;
          }
          const definition = C2.getEquipmentById(instance.equipmentId);
          if (!definition) {
            (_b = this.debugLog) == null ? void 0 : _b.call(this, `[EquipmentManager] calculateTotalBonuses: unknown equipmentId ${instance.equipmentId}`);
            continue;
          }
          const stats = definition.stats || {};
          for (const key of Object.keys(totals)) {
            totals[key] += stats[key] || 0;
          }
        }
        const setPieceCounts = /* @__PURE__ */ new Map();
        for (const instanceId of Object.values(equipped)) {
          if (!instanceId) continue;
          const instance = lookupInstance(instanceId);
          if (!instance) continue;
          const definition = C2.getEquipmentById(instance.equipmentId);
          if (!(definition == null ? void 0 : definition.setId)) continue;
          setPieceCounts.set(definition.setId, (setPieceCounts.get(definition.setId) || 0) + 1);
        }
        for (const [setId, pieceCount] of setPieceCounts.entries()) {
          const setDef = (_c = C2.EQUIPMENT_SETS) == null ? void 0 : _c[setId];
          if (!(setDef == null ? void 0 : setDef.bonuses)) continue;
          let bestBonus = null;
          for (const [threshold, stats] of Object.entries(setDef.bonuses)) {
            if (pieceCount >= Number(threshold)) {
              bestBonus = stats;
            }
          }
          if (!bestBonus) continue;
          for (const key of Object.keys(totals)) {
            totals[key] += bestBonus[key] || 0;
          }
        }
        this._cachedBonuses = totals;
        return totals;
      },
      /**
       * Get a description of all currently active set bonuses.
       *
       * @returns {Array<{ setId: string, name: string, equipped: number, total: number, activeBonus: object }>}
       */
      getActiveSetBonuses(instanceMap) {
        var _a, _b;
        const equipped = this.storage.getEquipped();
        const lookupInstance = (id) => instanceMap ? instanceMap.get(id) : this.storage.getInstance(id);
        const setPieceCounts = /* @__PURE__ */ new Map();
        for (const instanceId of Object.values(equipped)) {
          if (!instanceId) continue;
          const instance = lookupInstance(instanceId);
          if (!instance) continue;
          const definition = C2.getEquipmentById(instance.equipmentId);
          if (!(definition == null ? void 0 : definition.setId)) continue;
          setPieceCounts.set(definition.setId, (setPieceCounts.get(definition.setId) || 0) + 1);
        }
        const result = [];
        for (const [setId, pieceCount] of setPieceCounts.entries()) {
          const setDef = (_a = C2.EQUIPMENT_SETS) == null ? void 0 : _a[setId];
          if (!setDef) continue;
          const totalPieces = ((_b = setDef.pieces) == null ? void 0 : _b.length) || 0;
          let activeBonus = null;
          for (const [threshold, stats] of Object.entries(setDef.bonuses || {})) {
            if (pieceCount >= Number(threshold)) {
              activeBonus = stats;
            }
          }
          if (!activeBonus) continue;
          result.push({
            setId,
            name: setDef.name || setId,
            equipped: pieceCount,
            total: totalPieces,
            activeBonus
          });
        }
        return result;
      },
      /**
       * Salvage (permanently destroy) an inventory item.
       *
       * Added 2026-07-13: until now nothing ever called storage.removeFromInventory,
       * so inventory only ever grew. This is the caller — the deliberate way to
       * shed unwanted drops.
       *
       * Refuses to salvage an EQUIPPED item (the popup only offers salvage for
       * unequipped items, but callers are external too — guard at the boundary).
       *
       * @param {string} instanceId
       * @returns {{ success: boolean, message: string, name?: string }}
       */
      salvageItem(instanceId) {
        var _a;
        const instance = this.storage.getInstance(instanceId);
        if (!instance) {
          return { success: false, message: "Item not found in inventory." };
        }
        const equipped = this.storage.getEquipped();
        for (const [slot, equippedId] of Object.entries(equipped)) {
          if (equippedId === instanceId) {
            return {
              success: false,
              message: `Unequip it from "${slot}" before salvaging.`
            };
          }
        }
        const definition = C2.getEquipmentById(instance.equipmentId);
        const name = (definition == null ? void 0 : definition.name) || instance.equipmentId;
        this.storage.removeFromInventory(instanceId);
        SLEvents.emit("EquipmentManager:salvaged", {
          instanceId,
          equipmentId: instance.equipmentId,
          name,
          rarity: (definition == null ? void 0 : definition.rarity) || null
        });
        (_a = this.debugLog) == null ? void 0 : _a.call(this, `[EquipmentManager] Salvaged ${name} (${instanceId})`);
        return { success: true, message: `${name} salvaged.`, name };
      },
      /**
       * Salvage every DUPLICATE unequipped item, keeping one copy of each
       * equipmentId. This is the bulk answer to inventory growth — boss drops
       * repeat, and hand-salvaging hundreds of copies is not a workflow.
       *
       * Equipped items are never touched, and the copy kept for each equipmentId
       * is preferred in this order: the equipped one (so it's never counted as a
       * duplicate), else the oldest instance (stable, so repeated runs are no-ops).
       *
       * @returns {{ success: boolean, salvaged: number, message: string }}
       */
      salvageDuplicates() {
        var _a;
        const equippedIds = new Set(Object.values(this.storage.getEquipped()).filter(Boolean));
        const inventory = this.storage.getInventory();
        const byEquipmentId = /* @__PURE__ */ new Map();
        for (const inst of inventory) {
          if (equippedIds.has(inst.instanceId)) continue;
          const list = byEquipmentId.get(inst.equipmentId) || [];
          list.push(inst);
          byEquipmentId.set(inst.equipmentId, list);
        }
        const toSalvage = [];
        for (const [equipmentId, list] of byEquipmentId) {
          const hasEquippedCopy = inventory.some(
            (i) => i.equipmentId === equipmentId && equippedIds.has(i.instanceId)
          );
          list.sort((a, b) => (a.acquiredAt || 0) - (b.acquiredAt || 0));
          const keepCount = hasEquippedCopy ? 0 : 1;
          for (let i = keepCount; i < list.length; i++) toSalvage.push(list[i]);
        }
        for (const inst of toSalvage) {
          this.storage.removeFromInventory(inst.instanceId);
        }
        if (toSalvage.length > 0) {
          SLEvents.emit("EquipmentManager:salvaged", {
            bulk: true,
            count: toSalvage.length
          });
          (_a = this.debugLog) == null ? void 0 : _a.call(this, `[EquipmentManager] Salvaged ${toSalvage.length} duplicate(s)`);
        }
        return {
          success: true,
          salvaged: toSalvage.length,
          message: toSalvage.length ? `Salvaged ${toSalvage.length} duplicate${toSalvage.length === 1 ? "" : "s"}.` : "No duplicates to salvage."
        };
      },
      /**
       * Check if an item can currently be equipped by the user.
       *
       * @param {string} equipmentId
       * @returns {{ canEquip: boolean, reason?: string }}
       */
      canEquip(equipmentId) {
        const definition = C2.getEquipmentById(equipmentId);
        if (!definition) {
          return { canEquip: false, reason: `Unknown equipment ID: ${equipmentId}` };
        }
        const levelReq = definition.levelReq || definition.levelRequirement || 0;
        const userLevel = this._userLevel || 0;
        if (userLevel < levelReq) {
          return {
            canEquip: false,
            reason: `Requires level ${levelReq} (current: ${userLevel}).`
          };
        }
        return { canEquip: true };
      }
    };
  }
});

// src/shared/rank-utils.js
var require_rank_utils = __commonJS({
  "src/shared/rank-utils.js"(exports2, module2) {
    var RANK_ORDER = Object.freeze([
      "E",
      "D",
      "C",
      "B",
      "A",
      "S",
      "SS",
      "SSS",
      "SSS+",
      "NH",
      "Monarch",
      "Monarch+",
      "Shadow Monarch"
    ]);
    function getRankIndex(rank) {
      const idx = RANK_ORDER.indexOf(rank);
      return idx >= 0 ? idx : 0;
    }
    function compareRanks(rankA, rankB) {
      return getRankIndex(rankA) - getRankIndex(rankB);
    }
    function getRankAtIndex(index) {
      const clamped = Math.max(0, Math.min(RANK_ORDER.length - 1, Math.floor(index)));
      return RANK_ORDER[clamped];
    }
    module2.exports = { RANK_ORDER, getRankIndex, compareRanks, getRankAtIndex };
  }
});

// src/EquipmentManager/drop-system.js
var require_drop_system = __commonJS({
  "src/EquipmentManager/drop-system.js"(exports2, module2) {
    var C2 = require_constants();
    var { RANK_ORDER } = require_rank_utils();
    module2.exports = {
      /**
       * Roll for equipment drop(s) on a boss kill.
       * Called when the Dungeons:awardEssence event fires with source === 'boss_kill'.
       *
       * @param {string} bossRank  — e.g. 'E', 'D', 'C', 'B', 'A', 'S', 'SS', 'SSS'
       * @param {object} context   — optional metadata from the dungeon event
       * @param {boolean} [context.isDemonCastle]
       * @param {number}  [context.dcFloor]
       * @param {string}  [context.bossName]
       * @returns {string[]} — array of dropped equipment IDs (may be empty)
       */
      rollEquipmentDrop(bossRank, context = {}) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
        if (context.isDemonCastle && context.dcFloor != null) {
          const guaranteed = (_a = C2.GUARANTEED_DROPS) == null ? void 0 : _a[context.dcFloor];
          if (guaranteed && guaranteed.length > 0) {
            (_b = this.debugLog) == null ? void 0 : _b.call(
              this,
              `[EquipmentManager] Demon Castle floor ${context.dcFloor}: awarding ${guaranteed.length} guaranteed drop(s)`
            );
            return [...guaranteed];
          }
        }
        const rank = this._resolveRankForDrops(bossRank);
        const chanceTable = ((_c = C2.DROP_TABLES) == null ? void 0 : _c.DROP_CHANCE_BY_RANK) || {};
        const dropChance = chanceTable[rank] ?? chanceTable.E ?? 0.25;
        if (Math.random() >= dropChance) {
          (_d = this.debugLog) == null ? void 0 : _d.call(this, `[EquipmentManager] No drop for rank ${bossRank} boss (chance ${dropChance})`);
          return [];
        }
        const poolTable = ((_e = C2.DROP_TABLES) == null ? void 0 : _e.RARITY_POOL_BY_RANK) || {};
        const pool = poolTable[rank] || poolTable.E || ["D"];
        const weights = ((_g = (_f = C2.DROP_TABLES) == null ? void 0 : _f.RARITY_WEIGHTS_BY_RANK) == null ? void 0 : _g[rank]) || ((_h = C2.DROP_TABLES) == null ? void 0 : _h.RARITY_WEIGHTS) || {};
        const selectedRarity = this._weightedRarityPick(pool, weights);
        (_i = this.debugLog) == null ? void 0 : _i.call(
          this,
          `[EquipmentManager] Drop roll for rank ${bossRank} (as ${rank}): rarity=${selectedRarity}`
        );
        const allEquipment = this._droppableEquipment();
        const eligible = this._resolveEligibleForRarity(allEquipment, selectedRarity);
        if (eligible.length === 0) {
          (_j = this.debugLog) == null ? void 0 : _j.call(this, `[EquipmentManager] No equipment found at or below rarity "${selectedRarity}"`);
          return [];
        }
        const item = eligible[Math.floor(Math.random() * eligible.length)];
        (_k = this.debugLog) == null ? void 0 : _k.call(this, `[EquipmentManager] Dropped: ${item.name} (${item.id})`);
        return [item.id];
      },
      /**
       * All equipment that is allowed to appear as a random drop.
       *
       * Excludes grant-only sets (see C.GRANT_ONLY_SET_IDS) — currently the Shadow
       * Monarch's Regalia, which is awarded whole on reaching Shadow Monarch rank
       * (Lv2000 + 35 achievements). Every SSS-rarity item in the catalogue belongs
       * to that set, so without this filter a single SSS roll could hand the player
       * a Regalia piece and undercut the terminal reward.
       *
       * @returns {object[]}
       */
      _droppableEquipment() {
        const all = Object.values(C2.EQUIPMENT_DATABASE || {});
        const grantOnly = C2.GRANT_ONLY_SET_IDS || [];
        if (grantOnly.length === 0) return all;
        return all.filter((e) => !grantOnly.includes(e.setId));
      },
      /**
       * Map a boss rank onto the nearest rank that HAS drop tables.
       *
       * 'Shadow Monarch' is deliberately not in the tables, so a boss of that rank
       * would otherwise hit the unknown-rank default and drop bottom-tier junk.
       * Walk DOWN the canonical rank ladder to the nearest ranked entry instead
       * (Shadow Monarch -> Monarch+). A rank that isn't on the ladder at all is
       * genuinely unknown and falls back to 'E'.
       *
       * @param {string} bossRank
       * @returns {string}
       */
      _resolveRankForDrops(bossRank) {
        var _a;
        const chanceTable = ((_a = C2.DROP_TABLES) == null ? void 0 : _a.DROP_CHANCE_BY_RANK) || {};
        if (chanceTable[bossRank] != null) return bossRank;
        const ladder = RANK_ORDER || [];
        const idx = ladder.indexOf(bossRank);
        if (idx === -1) return "E";
        for (let i = idx - 1; i >= 0; i--) {
          if (chanceTable[ladder[i]] != null) return ladder[i];
        }
        return "E";
      },
      /**
       * Resolve a chosen rarity to a non-empty item list.
       *
       * A rarity tier with no items in the catalogue used to mean "no drop": the
       * chance roll succeeded, the rarity was picked, the filter came back empty
       * and the caller silently returned []. That is how the (item-less) 'E' tier
       * turned E-rank bosses into a guaranteed 0% and ate most of D/C's rolls.
       *
       * Now a gap degrades gracefully — step DOWN the rarity ladder to the nearest
       * tier that actually has items (and only as a last resort, up). A future
       * catalogue gap costs the player a slightly worse item, never the whole drop.
       *
       * @param {object[]} allEquipment
       * @param {string}   rarity
       * @returns {object[]}
       */
      _resolveEligibleForRarity(allEquipment, rarity) {
        const at = (r) => allEquipment.filter((e) => e.rarity === r);
        const exact = at(rarity);
        if (exact.length > 0) return exact;
        const order = C2.RARITY_ORDER || ["D", "C", "B", "A", "S", "SS", "SSS"];
        const idx = order.indexOf(rarity);
        if (idx === -1) return [];
        for (let i = idx - 1; i >= 0; i--) {
          const down = at(order[i]);
          if (down.length > 0) return down;
        }
        for (let i = idx + 1; i < order.length; i++) {
          const up = at(order[i]);
          if (up.length > 0) return up;
        }
        return [];
      },
      /**
       * Create a new inventory instance from a dropped equipment ID.
       *
       * @param {string} equipmentId  — ID from C.EQUIPMENT_DATABASE
       * @param {string} [source]     — provenance label, e.g. 'boss_kill', 'dc_floor_5'
       * @returns {{ instanceId: string, equipmentId: string, acquiredAt: number, acquiredFrom: string }}
       */
      createDropInstance(equipmentId, source = "boss_kill") {
        return {
          instanceId: this._generateId(),
          equipmentId,
          acquiredAt: Date.now(),
          acquiredFrom: source
        };
      },
      /**
       * Perform a weighted random selection from a rarity pool.
       *
       * pool    = ['B', 'A', 'S']          — rarities to pick from
       * weights = { E: 0.90, D: 0.80, ... } — per-rarity probability weights (keyed by rarity)
       *
       * If a pool entry has no entry in weights, it gets a share of the remaining weight
       * distributed evenly across all unweighted entries.
       *
       * @param {string[]} pool
       * @param {object}   weights  — map of rarity → relative weight (0–1 or any positive number)
       * @returns {string}
       */
      _weightedRarityPick(pool, weights) {
        if (pool.length === 0) return C2.RARITY_ORDER && C2.RARITY_ORDER[0] || "D";
        if (pool.length === 1) return pool[0];
        const rawWeights = pool.map((rarity, index) => {
          const w = Array.isArray(weights) ? weights[index] : weights[rarity];
          return typeof w === "number" && w > 0 ? w : null;
        });
        const weightedCount = rawWeights.filter((w) => w !== null).length;
        const weightedSum = rawWeights.reduce((acc, w) => acc + (w ?? 0), 0);
        const unweightedCount = pool.length - weightedCount;
        const fallbackWeight = unweightedCount > 0 ? Math.max(0, (1 - weightedSum) / unweightedCount) : 0;
        const resolvedWeights = rawWeights.map((w) => w !== null ? w : fallbackWeight);
        const totalWeight = resolvedWeights.reduce((acc, w) => acc + w, 0);
        if (totalWeight <= 0) {
          return pool[Math.floor(Math.random() * pool.length)];
        }
        let roll = Math.random() * totalWeight;
        for (let i = 0; i < pool.length; i++) {
          roll -= resolvedWeights[i];
          if (roll <= 0) return pool[i];
        }
        return pool[pool.length - 1];
      },
      /**
       * Generate a unique instance ID for an inventory item.
       * Prefers crypto.randomUUID when available; falls back to timestamp + random hex.
       *
       * @returns {string}
       */
      _generateId() {
        if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
          return crypto.randomUUID();
        }
        return Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 10);
      }
    };
  }
});

// src/EquipmentManager/event-api.js
var require_event_api = __commonJS({
  "src/EquipmentManager/event-api.js"(exports2, module2) {
    var SLEvents = require_event_bus();
    var SM_REGALIA_ITEM_IDS = [
      "shadow_monarchs_blade",
      // weapon
      "shadow_monarchs_aegis",
      // offHand
      "crown_of_the_shadow_monarch",
      // helmet
      "shadow_sovereigns_mantle",
      // chestplate
      "shadow_gauntlets",
      // gloves
      "shadow_greaves",
      // boots
      "shadow_monarchs_earring",
      // earring
      "shadow_monarchs_necklace",
      // necklace
      "shadow_monarchs_ring_left",
      // ring (→ ring1)
      "shadow_monarchs_ring_right"
      // ring (→ ring2)
    ];
    var SM_GRANT_FLAG_KEY = "_shadowMonarchRegaliaGranted";
    var PLUGIN_NAME = "EquipmentManager";
    module2.exports = {
      _mountEventListeners() {
        this._onBossKill = (data) => {
          var _a, _b, _c;
          if ((data == null ? void 0 : data.source) !== "boss_kill") return;
          const bossRank = (data == null ? void 0 : data.bossRank) || (data == null ? void 0 : data.mobRank) || "E";
          const context = {
            isDemonCastle: (data == null ? void 0 : data.isDemonCastle) || false,
            dcFloor: (data == null ? void 0 : data.dcFloor) || null,
            bossName: (data == null ? void 0 : data.bossName) || null
          };
          let droppedIds = this.rollEquipmentDrop(bossRank, context) || [];
          try {
            const rank = (_c = (_b = (_a = BdApi.Plugins.get("SoloLevelingStats")) == null ? void 0 : _a.instance) == null ? void 0 : _b.settings) == null ? void 0 : _c.rank;
            if (rank === "Shadow Monarch") {
              droppedIds = droppedIds.concat(this.rollEquipmentDrop(bossRank, context) || []);
            }
          } catch (_) {
          }
          if (!droppedIds || droppedIds.length === 0) return;
          for (const eqId of droppedIds) {
            const instance = this.createDropInstance(eqId, "boss_kill");
            this.storage.addToInventory(instance);
            const def = require_constants().getEquipmentById(eqId);
            BdApi.UI.showToast(
              `Equipment Drop: ${(def == null ? void 0 : def.name) || eqId} [${(def == null ? void 0 : def.rarity) || "?"}-Rank]`,
              { type: "success" }
            );
            SLEvents.emit("EquipmentManager:itemDropped", {
              equipmentId: eqId,
              instanceId: instance.instanceId,
              rarity: def == null ? void 0 : def.rarity,
              name: def == null ? void 0 : def.name
            });
          }
          clearTimeout(this._bossKillRefreshTimer);
          this._bossKillRefreshTimer = setTimeout(() => this._refreshPopup(), 200);
        };
        SLEvents.on("Dungeons:awardEssence", this._onBossKill);
        this._checkShadowMonarchGrant();
        if (!BdApi.Data.load(PLUGIN_NAME, SM_GRANT_FLAG_KEY)) {
          this._smRankPollInterval = setInterval(() => {
            this._checkShadowMonarchGrant();
          }, 3e4);
        }
      },
      _unmountEventListeners() {
        if (this._onBossKill) {
          SLEvents.off("Dungeons:awardEssence", this._onBossKill);
          this._onBossKill = null;
        }
        clearTimeout(this._bossKillRefreshTimer);
        this._bossKillRefreshTimer = null;
        if (this._smRankPollInterval) {
          clearInterval(this._smRankPollInterval);
          this._smRankPollInterval = null;
        }
      },
      /**
       * Check if the player is Shadow Monarch rank and, if so, grant the full
       * Shadow Monarch's Regalia set to their inventory exactly once.
       *
       * Idempotency: persisted via BdApi.Data[SM_GRANT_FLAG_KEY].
       * Cross-plugin read: BdApi.Plugins.get('SoloLevelingStats')?.instance?.settings?.rank
       */
      _checkShadowMonarchGrant() {
        var _a, _b, _c;
        try {
          const alreadyGranted = BdApi.Data.load(PLUGIN_NAME, SM_GRANT_FLAG_KEY);
          if (alreadyGranted) return;
          const sls = (_a = BdApi.Plugins.get("SoloLevelingStats")) == null ? void 0 : _a.instance;
          const rank = ((_b = sls == null ? void 0 : sls.settings) == null ? void 0 : _b.rank) || (sls == null ? void 0 : sls.rank) || null;
          if (rank !== "Shadow Monarch") return;
          const C2 = require_constants();
          for (const eqId of SM_REGALIA_ITEM_IDS) {
            const instance = this.createDropInstance(eqId, "shadow_monarch_regalia_grant");
            this.storage.addToInventory(instance);
            const def = C2.getEquipmentById(eqId);
            SLEvents.emit("EquipmentManager:itemDropped", {
              equipmentId: eqId,
              instanceId: instance.instanceId,
              rarity: def == null ? void 0 : def.rarity,
              name: def == null ? void 0 : def.name
            });
          }
          BdApi.Data.save(PLUGIN_NAME, SM_GRANT_FLAG_KEY, true);
          if (this._smRankPollInterval) {
            clearInterval(this._smRankPollInterval);
            this._smRankPollInterval = null;
          }
          BdApi.UI.showToast(
            "Shadow Monarch's Regalia has materialised in your inventory.",
            { type: "success" }
          );
          (_c = this._refreshPopup) == null ? void 0 : _c.call(this);
          SLEvents.emit("EquipmentManager:shadowMonarchRegaliaGranted", {
            itemIds: SM_REGALIA_ITEM_IDS
          });
        } catch (err) {
          console.error("[EquipmentManager] _checkShadowMonarchGrant error:", err);
        }
      },
      _exposePublicAPI() {
        window.EquipmentManager = {
          getTotalEquippedBonuses: () => this._cachedBonuses || this.calculateTotalBonuses(),
          /**
           * Returns a map of slot → equipment definition for every filled slot.
           * Each definition includes `setId` so callers can filter by set membership.
           * @returns {{ [slot: string]: object }}
           */
          getEquippedItems: () => {
            const C2 = require_constants();
            const equipped = this.storage.getEquipped();
            const result = {};
            for (const [slot, instanceId] of Object.entries(equipped)) {
              const inst = this.storage.getInstance(instanceId);
              if (inst) result[slot] = C2.getEquipmentById(inst.equipmentId);
            }
            return result;
          },
          /**
           * Returns the number of equipped pieces belonging to the given setId.
           * Convenience wrapper so external plugins don't need to iterate getEquippedItems().
           *
           * Usage from another plugin:
           *   const count = window.EquipmentManager?.getEquippedSetPieceCount?.('shadow_monarch_regalia') ?? 0;
           *
           * @param {string} setId
           * @returns {number}
           */
          getEquippedSetPieceCount: (setId) => {
            const C2 = require_constants();
            const equipped = this.storage.getEquipped();
            let count = 0;
            for (const instanceId of Object.values(equipped)) {
              if (!instanceId) continue;
              const inst = this.storage.getInstance(instanceId);
              if (!inst) continue;
              const def = C2.getEquipmentById(inst.equipmentId);
              if ((def == null ? void 0 : def.setId) === setId) count++;
            }
            return count;
          },
          getInventory: () => this.storage.getInventory(),
          isReady: () => this._ready || false
        };
      },
      _removePublicAPI() {
        if (window.EquipmentManager) delete window.EquipmentManager;
      },
      _emitChanged(slot, action) {
        SLEvents.emit("EquipmentManager:changed", {
          slot,
          action,
          totalBonuses: this._cachedBonuses || this.calculateTotalBonuses()
        });
      }
    };
  }
});

// src/EquipmentManager/styles.css
var require_styles = __commonJS({
  "src/EquipmentManager/styles.css"(exports2, module2) {
    module2.exports = "/* EquipmentManager \u2014 Black/Purple Sharp Theme */\n\n/* \u2500\u2500\u2500 SL-themed scrollbar for the header popup (overrides macOS default) \u2500\u2500\u2500 */\n#eq-header-popup::-webkit-scrollbar {\n  width: 9px;\n}\n#eq-header-popup::-webkit-scrollbar-track {\n  background: rgba(8, 8, 13, 0.6);\n}\n#eq-header-popup::-webkit-scrollbar-thumb {\n  background: linear-gradient(180deg, rgba(138, 43, 226, 0.6) 0%, rgba(138, 43, 226, 0.38) 100%);\n  border: 1px solid rgba(138, 43, 226, 0.35);\n  border-radius: 2px;\n}\n#eq-header-popup::-webkit-scrollbar-thumb:hover {\n  background: linear-gradient(180deg, rgba(186, 85, 211, 0.75) 0%, rgba(138, 43, 226, 0.5) 100%);\n}\n\n.eq-header-btn {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  padding: 4px;\n  margin: 0 2px;\n  cursor: pointer;\n  color: #b5bac1;\n  border: none;\n  background: none;\n  border-radius: 2px;\n  opacity: 0.85;\n  transition: opacity 0.15s, background 0.15s, color 0.15s;\n}\n.eq-header-btn:hover { opacity: 1; background: rgba(138,43,226,0.15); color: #b5bac1; }\n.eq-header-btn svg { width: 20px; height: 20px; }\n";
  }
});

// src/EquipmentManager/manifest.json
var require_manifest = __commonJS({
  "src/EquipmentManager/manifest.json"(exports2, module2) {
    module2.exports = {
      name: "EquipmentManager",
      description: "Lore-accurate Solo Leveling equipment system with boss drops, 10 equipment slots, set bonuses, and stat integration.",
      version: "1.0.0",
      author: "matthewqilanthompson"
    };
  }
});

// src/shared/toast.js
var require_toast = __commonJS({
  "src/shared/toast.js"(exports2, module2) {
    function createToast2() {
      return (message, type = "info", timeout) => {
        const opts = { type: type === "level-up" ? "info" : type };
        if (typeof timeout === "number" && timeout > 0) opts.timeout = timeout;
        BdApi.UI.showToast(message, opts);
      };
    }
    module2.exports = { createToast: createToast2 };
  }
});

// src/shared/dispatcher.js
var require_dispatcher = __commonJS({
  "src/shared/dispatcher.js"(exports2, module2) {
    var { Webpack } = BdApi;
    var _cached = null;
    function isValidDispatcher(d) {
      return d != null && typeof d.subscribe === "function" && typeof d.dispatch === "function" && typeof d.unsubscribe === "function";
    }
    function extractFromStores() {
      var _a, _b;
      try {
        const stores = Webpack.Stores;
        if (!stores) return null;
        const storeNames = [
          "UserStore",
          "GuildStore",
          "ChannelStore",
          "SelectedChannelStore",
          "MessageStore",
          "PresenceStore"
        ];
        for (const name of storeNames) {
          const d = (_a = stores[name]) == null ? void 0 : _a._dispatcher;
          if (isValidDispatcher(d)) return d;
        }
        for (const key of Object.keys(stores)) {
          try {
            const d = (_b = stores[key]) == null ? void 0 : _b._dispatcher;
            if (isValidDispatcher(d)) return d;
          } catch (_) {
          }
        }
      } catch (_) {
      }
      return null;
    }
    function acquireDispatcher() {
      if (_cached) return _cached;
      const d = (
        // Tier 1: Extract from Flux stores (most reliable, zero search cost)
        extractFromStores() || // Tier 2: Webpack module filter (NO optional chaining!)
        Webpack.getModule((m) => m.dispatch && m.subscribe && m.unsubscribe) || // Tier 3: Legacy named key
        Webpack.getByKeys("actionLogger") || // Tier 4: Webpack filter with _actionHandlers (Discord-specific internal)
        Webpack.getModule((m) => m.dispatch && m._actionHandlers) || // Tier 5: Check for global FluxDispatcher (some BD builds expose it)
        (typeof window !== "undefined" && isValidDispatcher(window.FluxDispatcher) ? window.FluxDispatcher : null) || null
      );
      if (isValidDispatcher(d)) {
        _cached = d;
        return d;
      }
      return null;
    }
    function pollForDispatcher(options = {}) {
      const {
        initialDelay = 200,
        maxDelay = 5e3,
        timeout = 3e4,
        onAcquired,
        onTimeout,
        onPoll
      } = options;
      const immediate = acquireDispatcher();
      if (immediate) {
        onAcquired == null ? void 0 : onAcquired(immediate);
        return { dispatcher: immediate, cancel: () => {
        } };
      }
      let timer = null;
      let cancelled = false;
      let attempt = 0;
      let delay = initialDelay;
      const startTime = Date.now();
      const cancel = () => {
        cancelled = true;
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
      };
      const tryAcquire = () => {
        if (cancelled) return;
        attempt++;
        onPoll == null ? void 0 : onPoll(attempt, delay);
        const dispatcher = acquireDispatcher();
        if (dispatcher) {
          timer = null;
          onAcquired == null ? void 0 : onAcquired(dispatcher);
          return;
        }
        const elapsed = Date.now() - startTime;
        if (elapsed >= timeout) {
          timer = null;
          onTimeout == null ? void 0 : onTimeout();
          return;
        }
        delay = Math.min(delay * 2, maxDelay);
        delay = Math.min(delay, timeout - elapsed);
        timer = setTimeout(tryAcquire, delay);
      };
      timer = setTimeout(tryAcquire, initialDelay);
      return { dispatcher: null, cancel };
    }
    function resetCache() {
      _cached = null;
    }
    module2.exports = { acquireDispatcher, pollForDispatcher, isValidDispatcher, resetCache };
  }
});

// src/shared/header-toolbar.js
var require_header_toolbar = __commonJS({
  "src/shared/header-toolbar.js"(exports2, module2) {
    var TOOLBAR_FALLBACKS = [
      '[aria-label="Channel header"] [class*="toolbar_"]',
      '[class*="titleWrapper_"] [class*="toolbar_"]',
      'header [class*="toolbar_"]'
    ];
    function getChannelHeaderToolbar() {
      for (const selector of TOOLBAR_FALLBACKS) {
        const nodes = document.querySelectorAll(selector);
        for (const node of nodes) {
          if (!node || node.offsetParent === null) continue;
          const host = node.closest('[aria-label="Channel header"], [class*="titleWrapper_"], header');
          if (host && host.offsetParent === null) continue;
          return node;
        }
      }
      return null;
    }
    function getAllChannelHeaderToolbars() {
      const out = [];
      const seen = /* @__PURE__ */ new Set();
      for (const selector of TOOLBAR_FALLBACKS) {
        const nodes = document.querySelectorAll(selector);
        for (const node of nodes) {
          if (!node || seen.has(node)) continue;
          if (node.offsetParent === null) continue;
          seen.add(node);
          out.push(node);
        }
      }
      return out;
    }
    var { acquireDispatcher } = require_dispatcher();
    function _resolveDispatcher() {
      return acquireDispatcher();
    }
    function _getToolbarHub() {
      if (window.__SL_ToolbarHub) return window.__SL_ToolbarHub;
      const hub = {
        callbacks: /* @__PURE__ */ new Set(),
        _rafScheduled: false,
        _mo: null,
        _dispatcherUnsubs: [],
        _onVisibility: null,
        // Coalesce a burst of triggers into one rAF tick, fan out to all callbacks.
        // BATCHED READ (2026-07-30, profiler: 76ms avg / 183ms worst per tick):
        // every subscriber used to resolve the toolbar itself, so one tick ran
        // read(offsetParent) -> write(inject) -> read -> write ... across ~6
        // consumers: textbook layout thrashing, since each write invalidates the
        // layout the next read forces recomputation of. The hub now performs ONE
        // read up front and passes the element to every callback; subscribers
        // that accept the argument skip their own lookup entirely. Callbacks that
        // ignore the argument keep working exactly as before.
        // PER-SUBSCRIBER ATTRIBUTION (2026-08-06). AAPerfSentinel showed
        // `fireAll` in ALL FIVE of a session's worst stalls (908-2019ms each,
        // avg 285ms over 312 calls) — but the sentinel attributes shared-singleton
        // work to whichever plugin WON THE STARTUP RACE to create the hub, not to
        // the subscriber whose callback actually burned the time. That made the
        // cost unactionable: "SoloLevelingTheme fireAll" names this hub, not a
        // culprit.
        //
        // Timing each callback closes the gap. Only a genuinely slow subscriber
        // (>=50ms — a whole frame) logs, so this is silent in normal operation and
        // self-announcing exactly when it matters. performance.now() per callback
        // across ~6 subscribers is negligible next to the work being measured.
        fireAll() {
          if (this._rafScheduled || document.hidden) return;
          this._rafScheduled = true;
          requestAnimationFrame(() => {
            this._rafScheduled = false;
            let toolbar = null;
            try {
              toolbar = getChannelHeaderToolbar();
            } catch (_) {
              toolbar = null;
            }
            for (const cb of this.callbacks) {
              const t0 = performance.now();
              try {
                cb(toolbar);
              } catch (_) {
              }
              const ms = performance.now() - t0;
              if (ms >= 50) {
                try {
                  console.warn(
                    `[__SL_ToolbarHub] slow subscriber: ${Math.round(ms)}ms \u2014 ${cb._slOwner || cb.name || "(anonymous)"}`
                  );
                } catch (_) {
                }
              }
            }
          });
        },
        _setup() {
          const dispatcher = _resolveDispatcher();
          if (dispatcher) {
            const fire = () => this.fireAll();
            for (const action of ["CHANNEL_SELECT", "VOICE_STATE_UPDATES"]) {
              try {
                dispatcher.subscribe(action, fire);
                this._dispatcherUnsubs.push(() => {
                  try {
                    dispatcher.unsubscribe(action, fire);
                  } catch (_) {
                  }
                });
              } catch (_) {
              }
            }
          }
          try {
            const target = document.getElementById("app-mount") || document.body;
            this._mo = new MutationObserver((records) => {
              if (document.hidden) return;
              if (!this._moPending) this._moPending = [];
              for (let i = 0; i < records.length; i++) this._moPending.push(records[i]);
              if (this._moScanScheduled) return;
              this._moScanScheduled = true;
              requestAnimationFrame(() => {
                var _a;
                this._moScanScheduled = false;
                const pending = this._moPending;
                this._moPending = [];
                if (document.hidden) return;
                for (const r of pending) {
                  for (const list of [r.addedNodes, r.removedNodes]) {
                    for (const node of list) {
                      if (node.nodeType !== 1) continue;
                      if ((_a = node.matches) == null ? void 0 : _a.call(node, '[aria-label="Channel header"], [class*="toolbar_"]')) {
                        this.fireAll();
                        return;
                      }
                    }
                  }
                }
              });
            });
            this._mo.observe(target, { childList: true, subtree: true });
          } catch (_) {
            this._mo = null;
          }
          try {
            this._onVisibility = () => {
              if (!document.hidden) this.fireAll();
            };
            document.addEventListener("visibilitychange", this._onVisibility);
          } catch (_) {
            this._onVisibility = null;
          }
        },
        _teardown() {
          for (const fn of this._dispatcherUnsubs) {
            try {
              fn();
            } catch (_) {
            }
          }
          this._dispatcherUnsubs = [];
          if (this._mo) {
            try {
              this._mo.disconnect();
            } catch (_) {
            }
            this._mo = null;
          }
          if (this._onVisibility) {
            try {
              document.removeEventListener("visibilitychange", this._onVisibility);
            } catch (_) {
            }
            this._onVisibility = null;
          }
        },
        /**
         * @param {Function} cb        called with the resolved toolbar element
         * @param {string} [owner]     label for slow-subscriber logging. Optional —
         *   when omitted the owning .plugin.js is derived from the registration
         *   stack ONCE, here, never on the fire path. Subscribers are anonymous
         *   arrows in every current call site, so cb.name alone would report
         *   nothing useful when a callback turns out to be the slow one.
         */
        add(cb, owner) {
          const wasEmpty = this.callbacks.size === 0;
          if (!cb._slOwner) {
            let label = owner || "";
            if (!label) {
              try {
                const frame = (new Error().stack || "").split("\n").find((l) => l.includes(".plugin.js"));
                label = frame ? (frame.match(/(\w+)\.plugin\.js/) || [])[1] || "" : "";
              } catch (_) {
              }
            }
            try {
              cb._slOwner = label || void 0;
            } catch (_) {
            }
          }
          this.callbacks.add(cb);
          if (wasEmpty) this._setup();
          requestAnimationFrame(() => {
            if (this.callbacks.has(cb)) {
              try {
                cb();
              } catch (_) {
              }
            }
          });
        },
        remove(cb) {
          this.callbacks.delete(cb);
          if (this.callbacks.size === 0) {
            this._teardown();
            if (typeof window !== "undefined") window.__SL_ToolbarHub = null;
          }
        }
      };
      window.__SL_ToolbarHub = hub;
      return hub;
    }
    function watchToolbar2(onChange) {
      if (typeof onChange !== "function") return () => {
      };
      const hub = _getToolbarHub();
      hub.add(onChange);
      let disposed = false;
      return function unwatch() {
        if (disposed) return;
        disposed = true;
        hub.remove(onChange);
      };
    }
    module2.exports = {
      TOOLBAR_FALLBACKS,
      getChannelHeaderToolbar,
      getAllChannelHeaderToolbars,
      watchToolbar: watchToolbar2
    };
  }
});

// src/shared/toolbar-tooltip.js
var require_toolbar_tooltip = __commonJS({
  "src/shared/toolbar-tooltip.js"(exports2, module2) {
    var SHARED_CSS_ID = "sl-toolbar-tip-shared";
    var TOOLTIP_CSS = `
  /* \u2500\u2500 Shared Toolbar Tooltip \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
  .sl-toolbar-tip {
    position: fixed;
    transform: translateX(-50%);
    padding: 8px 12px;
    background: rgb(10, 10, 15);
    border: 1px solid rgba(138, 43, 226, 0.4);
    border-radius: 2px;
    box-shadow: 0 2px 12px rgba(138, 43, 226, 0.25), 0 0 20px rgba(138, 43, 226, 0.08);
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.3px;
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.1s ease;
    z-index: 999999;
  }
  .sl-toolbar-tip--visible {
    opacity: 1;
  }
  .sl-toolbar-tip::after {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 5px solid transparent;
    border-bottom-color: rgba(138, 43, 226, 0.4);
  }
`;
    function ensureTooltipCSS2() {
      if (document.getElementById(SHARED_CSS_ID)) return;
      try {
        BdApi.DOM.addStyle(SHARED_CSS_ID, TOOLTIP_CSS);
      } catch (_) {
        const style = document.createElement("style");
        style.id = SHARED_CSS_ID;
        style.textContent = TOOLTIP_CSS;
        (document.head || document.documentElement).appendChild(style);
      }
    }
    function showToolbarTooltip2(icon, tooltipId, label) {
      const rect = icon.getBoundingClientRect();
      let tip = document.getElementById(tooltipId);
      if (!tip) {
        tip = document.createElement("div");
        tip.id = tooltipId;
        tip.className = "sl-toolbar-tip";
        (document.body || document.documentElement).appendChild(tip);
      }
      tip.textContent = label;
      if (!tip._cachedHeight || tip._lastLabel !== label) {
        tip._cachedHeight = tip.offsetHeight;
        tip._lastLabel = label;
      }
      tip.style.top = `${rect.bottom + 8}px`;
      tip.style.left = `${rect.left + rect.width / 2}px`;
      tip.classList.add("sl-toolbar-tip--visible");
    }
    function hideToolbarTooltip2(tooltipId) {
      const tip = document.getElementById(tooltipId);
      if (tip) tip.classList.remove("sl-toolbar-tip--visible");
    }
    function removeToolbarTooltip2(tooltipId) {
      const tip = document.getElementById(tooltipId);
      if (tip) tip.remove();
    }
    module2.exports = {
      showToolbarTooltip: showToolbarTooltip2,
      hideToolbarTooltip: hideToolbarTooltip2,
      removeToolbarTooltip: removeToolbarTooltip2,
      ensureTooltipCSS: ensureTooltipCSS2
    };
  }
});

// src/shared/escape-html.js
var require_escape_html = __commonJS({
  "src/shared/escape-html.js"(exports2, module2) {
    function escapeHtml2(value) {
      return String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    }
    module2.exports = { escapeHtml: escapeHtml2 };
  }
});

// src/EquipmentManager/index.js
var { EquipmentStorage } = require_storage();
var C = require_constants();
var equipmentLogic = require_equipment_logic();
var dropSystem = require_drop_system();
var eventAPI = require_event_api();
var CSS = require_styles();
var { version: PLUGIN_VERSION } = require_manifest();
var { createToast } = require_toast();
var { watchToolbar } = require_header_toolbar();
var _toast = createToast();
var { showToolbarTooltip, hideToolbarTooltip, removeToolbarTooltip, ensureTooltipCSS } = require_toolbar_tooltip();
var STYLE_ID = "EquipmentManager-styles";
var HEADER_ICON_ID = "eq-header-icon";
var POPUP_ID = "eq-header-popup";
var HIDDEN_CHANNEL_TYPES = /* @__PURE__ */ new Set([2, 13]);
var VALUABLE_RARITIES = /* @__PURE__ */ new Set(["B", "A", "S", "SS", "SSS"]);
function _getUrlChannelType() {
  var _a, _b, _c, _d, _e;
  try {
    const path = String(((_a = window.location) == null ? void 0 : _a.pathname) || "");
    const match = path.match(/^\/channels\/(?:@me|\d+)\/(\d+)/);
    if (!match) return null;
    const channel = (_e = (_d = (_c = (_b = BdApi == null ? void 0 : BdApi.Webpack) == null ? void 0 : _b.getStore) == null ? void 0 : _c.call(_b, "ChannelStore")) == null ? void 0 : _d.getChannel) == null ? void 0 : _e.call(_d, match[1]);
    return channel ? Number(channel.type) : null;
  } catch (_) {
    return null;
  }
}
function _visibleChannelHeaders() {
  return Array.from(
    document.querySelectorAll('section[aria-label="Channel header"]')
  ).filter((el) => el.offsetParent !== null);
}
var { escapeHtml } = require_escape_html();
module.exports = class EquipmentManager {
  constructor() {
    this.storage = new EquipmentStorage();
    this._userLevel = 1;
    this._cachedBonuses = null;
    this._unwatchToolbar = null;
    this._popupTickLoop = null;
    this._popupDocClick = null;
    this._stopped = true;
    this._ready = false;
    this._lastPopupVersion = -1;
  }
  // ─── Lifecycle ──────────────────────────────────────────────────────────────
  async start() {
    var _a;
    this._stopped = false;
    BdApi.DOM.addStyle(STYLE_ID, CSS);
    try {
      await this.storage.open();
      this._syncUserLevel();
      this.calculateTotalBonuses();
      this._mountEventListeners();
      this._exposePublicAPI();
      this._startHeaderIcon();
      this._ready = true;
      try {
        (_a = this._emitChanged) == null ? void 0 : _a.call(this, null, "startup");
      } catch (_) {
      }
    } catch (err) {
      console.error("[EquipmentManager] Storage init failed:", err);
    }
  }
  stop() {
    var _a, _b, _c;
    this._stopped = true;
    this._ready = false;
    this._unmountEventListeners();
    this._removePublicAPI();
    if (this._unwatchToolbar) {
      try {
        this._unwatchToolbar();
      } catch (_) {
      }
      this._unwatchToolbar = null;
    }
    if (this._popupTickLoop) {
      clearInterval(this._popupTickLoop);
      this._popupTickLoop = null;
    }
    this._removePopup();
    (_a = document.getElementById(HEADER_ICON_ID)) == null ? void 0 : _a.remove();
    removeToolbarTooltip("sl-toolbar-tip-em");
    BdApi.DOM.removeStyle(STYLE_ID);
    try {
      const closeResult = (_c = (_b = this.storage) == null ? void 0 : _b.close) == null ? void 0 : _c.call(_b);
      if (closeResult && typeof closeResult.then === "function") {
        closeResult.catch((err) => console.error("[EquipmentManager] Storage close error:", err));
      }
    } catch (err) {
      console.error("[EquipmentManager] Storage close error:", err);
    }
  }
  // ─── SoloLevelingStats integration ──────────────────────────────────────────
  _syncUserLevel() {
    var _a, _b;
    try {
      const sls = (_a = BdApi.Plugins.get("SoloLevelingStats")) == null ? void 0 : _a.instance;
      this._userLevel = ((_b = sls == null ? void 0 : sls.settings) == null ? void 0 : _b.level) || (sls == null ? void 0 : sls.level) || 1;
    } catch (_) {
      this._userLevel = 1;
    }
  }
  // ─── Header Icon ────────────────────────────────────────────────────────────
  //
  // Injection rules (all must hold to inject):
  //   1. URL channel must not be a voice / stage channel.
  //   2. Exactly ONE channel-header section is visible. When the VC chat
  //      overlay is open Discord renders TWO headers — refuse to inject
  //      in that scenario.
  //   3. The icon, if it already exists, must live inside the canonical
  //      header. If it has migrated (Discord re-rendered into the wrong
  //      header), we remove and re-inject in the right place.
  _removeHeaderIcon() {
    const el = document.getElementById(HEADER_ICON_ID);
    if (el) el.remove();
  }
  _startHeaderIcon() {
    if (this._unwatchToolbar) return;
    this._unwatchToolbar = watchToolbar(() => {
      if (this._stopped || document.hidden) return;
      this._ensureHeaderIcon();
    });
  }
  _ensureHeaderIcon() {
    const channelType = _getUrlChannelType();
    if (HIDDEN_CHANNEL_TYPES.has(channelType)) {
      this._removeHeaderIcon();
      return;
    }
    const headers = _visibleChannelHeaders();
    if (headers.length !== 1) {
      this._removeHeaderIcon();
      return;
    }
    const canonical = headers[0];
    const toolbar = canonical.querySelector('[class*="toolbar_"]');
    if (!toolbar) {
      this._removeHeaderIcon();
      return;
    }
    const existing = document.getElementById(HEADER_ICON_ID);
    if (existing == null ? void 0 : existing.isConnected) {
      if (canonical.contains(existing)) return;
      existing.remove();
    }
    if (toolbar.querySelector(`#${HEADER_ICON_ID}`)) return;
    const btn = document.createElement("button");
    btn.id = HEADER_ICON_ID;
    btn.className = "eq-header-btn";
    btn.setAttribute("aria-label", "Equipment Manager");
    btn.style.cssText = `
      background: none; border: none; padding: 0; margin: 0 4px;
      position: relative; display: flex; align-items: center; justify-content: center;
      width: 24px; height: 24px; cursor: pointer; color: #b5bac1;
      transition: color 0.15s ease;
    `;
    btn.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
    </svg>`;
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      this._togglePopup();
    });
    ensureTooltipCSS();
    btn.addEventListener("mouseenter", () => showToolbarTooltip(btn, "sl-toolbar-tip-em", "Equipment Manager"));
    btn.addEventListener("mouseleave", () => hideToolbarTooltip("sl-toolbar-tip-em"));
    toolbar.insertBefore(btn, toolbar.firstChild);
  }
  // ─── Popup ──────────────────────────────────────────────────────────────────
  _togglePopup() {
    if (document.getElementById(POPUP_ID)) {
      this._removePopup();
    } else {
      this._showPopup();
    }
  }
  _removePopup() {
    if (this._popupTickLoop) {
      clearInterval(this._popupTickLoop);
      this._popupTickLoop = null;
    }
    if (this._popupDocClick) {
      document.removeEventListener("mousedown", this._popupDocClick, true);
      this._popupDocClick = null;
    }
    const popup = document.getElementById(POPUP_ID);
    if (popup && this._popupClickHandler) {
      popup.removeEventListener("click", this._popupClickHandler);
      this._popupClickHandler = null;
    }
    popup == null ? void 0 : popup.remove();
  }
  _showPopup() {
    this._removePopup();
    this._syncUserLevel();
    const btn = document.getElementById(HEADER_ICON_ID);
    if (!btn) return;
    const POPUP_WIDTH = 560;
    const popup = document.createElement("div");
    popup.id = POPUP_ID;
    popup.style.cssText = `
      position: fixed; z-index: 10001;
      width: ${POPUP_WIDTH}px;
      overflow-y: auto;
      background: linear-gradient(165deg, rgba(22,18,32,0.97) 0%, rgba(13,12,20,0.97) 55%, rgba(10,10,16,0.98) 100%);
      border: 1px solid rgba(138,43,226,0.32);
      border-radius: 2px;
      box-shadow: 0 20px 52px rgba(0,0,0,0.85), 0 0 30px rgba(138,43,226,0.18), inset 0 1px 0 rgba(255,255,255,0.06), inset 0 0 0 1px rgba(138,43,226,0.06);
      padding: 0;
      scrollbar-width: thin;
      scrollbar-color: rgba(138,43,226,0.85) rgba(8,8,13,0.55);
    `;
    document.body.appendChild(popup);
    this._popupClickHandler = (e) => {
      const target = e.target.closest("[data-eq-action]");
      if (!target) return;
      const action = target.dataset.eqAction;
      if (action === "equip") {
        const instanceId = target.dataset.eqInstance;
        if (!instanceId) return;
        const inst = this.storage.getInstance(instanceId);
        if (!inst) return;
        const def = C.getEquipmentById(inst.equipmentId);
        if (!def) return;
        let targetSlot = def.slot;
        if (targetSlot === "ring") {
          const equipped = this.storage.getEquipped();
          targetSlot = !equipped.ring1 ? "ring1" : "ring2";
        }
        const result = this.equipItem(instanceId, targetSlot);
        if (result == null ? void 0 : result.success) {
          if (result.unequippedInstanceId) {
            const displacedInst = this.storage.getInstance(result.unequippedInstanceId);
            const displacedDef = displacedInst ? C.getEquipmentById(displacedInst.equipmentId) : null;
            _toast(`Equipped ${def.name} (replaced ${(displacedDef == null ? void 0 : displacedDef.name) || "previous item"})`, "success");
          } else {
            _toast(`Equipped ${def.name}`, "success");
          }
        } else {
          _toast((result == null ? void 0 : result.message) || "Cannot equip", "error");
        }
        this._refreshPopup();
      }
      if (action === "slot-click") {
        const slot = target.dataset.eqSlot;
        const equipped = this.storage.getEquipped();
        if (!slot || !equipped[slot]) return;
        const prevInstanceId = equipped[slot];
        const result = this.unequipItem(slot);
        if (result == null ? void 0 : result.success) {
          const inst = this.storage.getInstance(prevInstanceId);
          const def = inst ? C.getEquipmentById(inst.equipmentId) : null;
          _toast(`Unequipped ${(def == null ? void 0 : def.name) || "item"}`, "info");
        }
        this._refreshPopup();
      }
      if (action === "salvage") {
        const instanceId = target.dataset.eqInstance;
        if (!instanceId) return;
        const inst = this.storage.getInstance(instanceId);
        if (!inst) return;
        const def = C.getEquipmentById(inst.equipmentId);
        const name = (def == null ? void 0 : def.name) || "this item";
        const rarity = (def == null ? void 0 : def.rarity) || "E";
        const doSalvage = () => {
          const result = this.salvageItem(instanceId);
          _toast(result.message, result.success ? "info" : "error");
          this._refreshPopup();
        };
        if (VALUABLE_RARITIES.has(rarity)) {
          this._confirmDestructive(
            `Salvage ${name}?`,
            `${name} (${rarity}-Rank) will be permanently destroyed. This cannot be undone.`,
            doSalvage
          );
        } else {
          doSalvage();
        }
      }
      if (action === "salvage-duplicates") {
        const preview = this._countDuplicates();
        if (preview === 0) {
          _toast("No duplicates to salvage.", "info");
          return;
        }
        this._confirmDestructive(
          `Salvage ${preview} duplicate${preview === 1 ? "" : "s"}?`,
          `One copy of each item is kept (equipped items are never touched). ${preview} item${preview === 1 ? "" : "s"} will be permanently destroyed. This cannot be undone.`,
          () => {
            const result = this.salvageDuplicates();
            _toast(result.message, "success");
            this._refreshPopup();
          }
        );
      }
    };
    popup.addEventListener("click", this._popupClickHandler);
    const anchorRect = btn.getBoundingClientRect();
    this._renderPopupContent(popup);
    this._positionPopup(popup, btn, anchorRect);
    this._popupDocClick = (e) => {
      if (!popup.contains(e.target) && e.target !== btn && !btn.contains(e.target)) {
        this._removePopup();
      }
    };
    document.addEventListener("mousedown", this._popupDocClick, true);
    this._popupTickLoop = setInterval(() => {
      if (this._stopped) return;
      const p = document.getElementById(POPUP_ID);
      if (!p) {
        clearInterval(this._popupTickLoop);
        this._popupTickLoop = null;
        return;
      }
      if (document.hidden) return;
      if (this.storage.version === this._lastPopupVersion) return;
      const scrollTop = p.scrollTop;
      this._renderPopupContent(p);
      p.scrollTop = scrollTop;
    }, 2e3);
  }
  /**
   * Count unequipped duplicates. Mirrors salvageDuplicates' keep-rule exactly:
   * if a copy of an equipmentId is equipped, every unequipped copy is a
   * duplicate; otherwise one unequipped copy is kept.
   */
  _countDuplicates() {
    const equipped = this.storage.getEquipped();
    const equippedInstanceIds = new Set(Object.values(equipped).filter(Boolean));
    const inventory = this.storage.getInventory();
    const equippedEquipmentIds = new Set(
      inventory.filter((i) => equippedInstanceIds.has(i.instanceId)).map((i) => i.equipmentId)
    );
    const seen = /* @__PURE__ */ new Set();
    let count = 0;
    for (const inst of inventory) {
      if (equippedInstanceIds.has(inst.instanceId)) continue;
      if (equippedEquipmentIds.has(inst.equipmentId) || seen.has(inst.equipmentId)) count++;
      seen.add(inst.equipmentId);
    }
    return count;
  }
  /**
   * Confirmation modal for irreversible actions. Falls back to executing
   * nothing (safe default) if BdApi's modal API is unavailable — a destructive
   * action must never proceed just because the confirm UI failed to render.
   */
  _confirmDestructive(title, body, onConfirm) {
    var _a;
    try {
      if (typeof ((_a = BdApi.UI) == null ? void 0 : _a.showConfirmationModal) === "function") {
        BdApi.UI.showConfirmationModal(title, body, {
          danger: true,
          confirmText: "Salvage",
          cancelText: "Cancel",
          onConfirm
        });
        return;
      }
    } catch (err) {
      console.error("[EquipmentManager] Confirmation modal failed:", err);
    }
    _toast("Cannot show confirmation dialog \u2014 salvage aborted.", "error");
  }
  _positionPopup(popup, btn, prereadRect = null) {
    const rect = prereadRect || btn.getBoundingClientRect();
    const vw = window.innerWidth;
    const margin = 12;
    const POPUP_WIDTH = 560;
    let left = rect.right - POPUP_WIDTH;
    left = Math.max(margin, Math.min(left, vw - POPUP_WIDTH - margin));
    popup.style.left = `${left}px`;
    const top = rect.bottom + 8;
    popup.style.top = `${top}px`;
    popup.style.maxHeight = `${Math.max(200, window.innerHeight - top - margin)}px`;
  }
  _refreshPopup() {
    const p = document.getElementById(POPUP_ID);
    if (!p) return;
    const scrollTop = p.scrollTop;
    this._renderPopupContent(p);
    p.scrollTop = scrollTop;
  }
  _renderPopupContent(popup) {
    if (!popup) popup = document.getElementById(POPUP_ID);
    if (!popup) return;
    const equipped = this.storage.getEquipped();
    const inventory = this.storage.getInventory();
    const bonuses = this._cachedBonuses || this.calculateTotalBonuses();
    const sets = this.getActiveSetBonuses();
    this._lastPopupVersion = this.storage.version;
    const slotOrder = [
      "weapon",
      "offHand",
      "helmet",
      "chestplate",
      "gloves",
      "boots",
      "earring",
      "necklace",
      "ring1",
      "ring2"
    ];
    let slotsHtml = "";
    for (const slotKey of slotOrder) {
      const slotDef = C.EQUIPMENT_SLOTS[slotKey];
      const instanceId = equipped[slotKey];
      const instance = instanceId ? this.storage.getInstance(instanceId) : null;
      const def = instance ? C.getEquipmentById(instance.equipmentId) : null;
      const rarityColor = def ? C.getRarityColor(def.rarity) : "#2a1a3a";
      const isEmpty = !def;
      const bgEmpty = "rgba(138,43,226,0.03)";
      const bgFilled = "rgba(138,43,226,0.08)";
      const bgHover = "rgba(138,43,226,0.12)";
      const borderColor = isEmpty ? "rgba(138,43,226,0.1)" : `${rarityColor}60`;
      slotsHtml += `
        <div data-eq-action="slot-click" data-eq-slot="${slotKey}" style="
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          width: 96px; height: 96px;
          background: ${isEmpty ? bgEmpty : bgFilled};
          border: 1px solid ${borderColor};
          cursor: pointer;
          transition: background 0.12s;
        " onmouseenter="this.style.background='${bgHover}'" onmouseleave="this.style.background='${isEmpty ? bgEmpty : bgFilled}'">
          <div style="font-size: 22px; margin-bottom: 2px;">${(def == null ? void 0 : def.icon) || (slotDef == null ? void 0 : slotDef.icon) || "\u25FB\uFE0F"}</div>
          <div style="font-size: 9px; color: ${def ? rarityColor : "#b5bac1"}; font-weight: 700; text-align: center; max-width: 88px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
            ${def ? escapeHtml(def.name) : escapeHtml((slotDef == null ? void 0 : slotDef.label) || slotKey)}
          </div>
          ${def ? `<div style="font-size: 8px; color: ${rarityColor}; font-weight: 800; margin-top: 1px;">${def.rarity}-Rank</div>` : ""}
        </div>
      `;
    }
    let setsHtml = "";
    if (sets.length > 0) {
      setsHtml = sets.map((s) => {
        const bonusStr = Object.entries(s.activeBonus || {}).filter(([, v]) => v > 0).map(([k, v]) => `+${v} ${k.toUpperCase().slice(0, 3)}`).join(", ") || "Bonus";
        return `
          <div style="padding: 8px 20px; border-bottom: 1px solid rgba(138,43,226,0.1); font-size: 12px; color: #8a2be2;">
            &#9656; ${escapeHtml(s.name)} (${s.equipped}/${s.total}) \u2014 ${bonusStr}
          </div>
        `;
      }).join("");
    }
    const equippedInstanceIds = new Set(Object.values(equipped).filter(Boolean));
    const unequipped = inventory.filter((i) => !equippedInstanceIds.has(i.instanceId));
    const invSlotOrder = Object.keys(C.EQUIPMENT_SLOTS);
    const slotRank = (slot) => {
      const i = invSlotOrder.indexOf(slot === "ring" ? "ring1" : slot);
      return i === -1 ? invSlotOrder.length : i;
    };
    const rarityRank = (rarity) => {
      const i = C.RARITY_ORDER.indexOf(rarity);
      return i === -1 ? -1 : i;
    };
    unequipped.sort((a, b) => {
      const da = C.getEquipmentById(a.equipmentId);
      const db = C.getEquipmentById(b.equipmentId);
      if (!da || !db) return da ? -1 : db ? 1 : 0;
      const ea = this.canEquip(da.id).canEquip ? 0 : 1;
      const eb = this.canEquip(db.id).canEquip ? 0 : 1;
      if (ea !== eb) return ea - eb;
      const sa = slotRank(da.slot);
      const sb = slotRank(db.slot);
      if (sa !== sb) return sa - sb;
      const ra = rarityRank(da.rarity);
      const rb = rarityRank(db.rarity);
      if (ra !== rb) return rb - ra;
      return (db.levelReq || db.levelRequirement || 0) - (da.levelReq || da.levelRequirement || 0);
    });
    const duplicateCount = this._countDuplicates();
    let inventoryHtml = "";
    if (unequipped.length === 0) {
      inventoryHtml = `<div style="text-align: center; color: #b5bac1; padding: 20px; font-size: 11px;">
        No items in inventory. Defeat dungeon bosses for equipment drops!
      </div>`;
    } else {
      inventoryHtml = unequipped.map((inst) => {
        const def = C.getEquipmentById(inst.equipmentId);
        if (!def) return "";
        const rc = C.getRarityColor(def.rarity);
        const canEquipResult = this.canEquip(def.id);
        const mainStat = Object.entries(def.stats || {}).filter(([, v]) => v > 0).map(([k, v]) => `+${v} ${k.toUpperCase().slice(0, 3)}`).join(", ") || "\u2014";
        const levelReq = def.levelReq || def.levelRequirement || 0;
        const btnBg = canEquipResult.canEquip ? "rgba(138,43,226,0.2)" : "rgba(255,255,255,0.03)";
        const btnColor = canEquipResult.canEquip ? "#8a2be2" : "#b5bac1";
        const btnBorder = canEquipResult.canEquip ? "rgba(138,43,226,0.3)" : "rgba(255,255,255,0.05)";
        const btnCursor = canEquipResult.canEquip ? "pointer" : "not-allowed";
        return `
          <div style="display: flex; align-items: center; gap: 12px; padding: 10px 16px; border-bottom: 1px solid rgba(138,43,226,0.06); border-left: 3px solid ${rc};">
            <div style="font-size: 20px; width: 36px; text-align: center;">${def.icon}</div>
            <div style="flex: 1; min-width: 0;">
              <div style="font-size: 13px; font-weight: 700; color: #dcddde;">
                ${escapeHtml(def.name)}
                <span style="font-size: 9px; font-weight: 800; color: ${rc}; margin-left: 6px;">${def.rarity}-Rank</span>
              </div>
              <div style="font-size: 10px; color: #b5bac1; margin-top: 2px;">${mainStat}</div>
              <div style="font-size: 9px; color: #b5bac1; margin-top: 1px;">Lv.${levelReq} req &middot; ${escapeHtml(def.slot)}</div>
            </div>
            <button data-eq-action="equip" data-eq-instance="${inst.instanceId}" style="
              padding: 4px 12px; font-size: 10px; font-weight: 800;
              background: ${btnBg};
              color: ${btnColor};
              border: 1px solid ${btnBorder};
              cursor: ${btnCursor};
              text-transform: uppercase; letter-spacing: 0.06em;
              font-family: inherit;
              border-radius: 0;
            ">${canEquipResult.canEquip ? "Equip" : `Lv.${levelReq}`}</button>
            <button data-eq-action="salvage" data-eq-instance="${inst.instanceId}" title="Salvage (destroy) this item" style="
              padding: 4px 10px; font-size: 10px; font-weight: 800;
              background: rgba(239,68,68,0.08);
              color: #ef4444;
              border: 1px solid rgba(239,68,68,0.25);
              cursor: pointer;
              text-transform: uppercase; letter-spacing: 0.06em;
              font-family: inherit;
              border-radius: 0;
            ">Salvage</button>
          </div>
        `;
      }).join("");
    }
    popup.innerHTML = `
      <!-- Header -->
      <div style="display: flex; align-items: center; gap: 10px; padding: 16px 20px; background: linear-gradient(90deg, rgba(138,43,226,0.15) 0%, rgba(10,10,15,0) 100%); border-bottom: 1px solid rgba(138,43,226,0.3);">
        <span style="font-size: 22px;">&#9876;&#65039;</span>
        <div style="flex: 1;">
          <h3 style="margin: 0; font-size: 17px; font-weight: 800; color: #dcddde; letter-spacing: 0.04em; text-transform: uppercase;">Equipment</h3>
          <div style="font-size: 10px; color: #b5bac1; letter-spacing: 0.03em;">Solo Leveling Armory</div>
        </div>
        <span style="font-size: 10px; color: #b5bac1; font-weight: 600;">${PLUGIN_VERSION}</span>
      </div>

      <!-- Stats summary row -->
      <div style="display: flex; padding: 10px 20px; background: rgba(138,43,226,0.04); border-bottom: 1px solid rgba(138,43,226,0.15);">
        <div style="flex: 1; text-align: center;">
          <div style="font-size: 18px; font-weight: 800; color: #ef4444; font-variant-numeric: tabular-nums;">${bonuses.attack || 0}</div>
          <div style="font-size: 9px; color: #b5bac1; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600;">ATK</div>
        </div>
        <div style="width: 1px; background: rgba(138,43,226,0.2); margin: 4px 0;"></div>
        <div style="flex: 1; text-align: center;">
          <div style="font-size: 18px; font-weight: 800; color: #60a5fa; font-variant-numeric: tabular-nums;">${bonuses.defense || 0}</div>
          <div style="font-size: 9px; color: #b5bac1; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600;">DEF</div>
        </div>
        <div style="width: 1px; background: rgba(138,43,226,0.2); margin: 4px 0;"></div>
        <div style="flex: 1; text-align: center;">
          <div style="font-size: 18px; font-weight: 800; color: #8a2be2; font-variant-numeric: tabular-nums;">${sets.length}</div>
          <div style="font-size: 9px; color: #b5bac1; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600;">Sets</div>
        </div>
        <div style="width: 1px; background: rgba(138,43,226,0.2); margin: 4px 0;"></div>
        <div style="flex: 1; text-align: center;">
          <div style="font-size: 18px; font-weight: 800; color: #34d399; font-variant-numeric: tabular-nums;">${inventory.length}</div>
          <div style="font-size: 9px; color: #b5bac1; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600;">Items</div>
        </div>
      </div>

      <!-- Equipment slot grid -->
      <div style="padding: 12px 16px;">
        <div style="font-size: 10px; color: #b5bac1; text-transform: uppercase; letter-spacing: 0.12em; font-weight: 700; margin-bottom: 8px; padding-left: 4px;">Equipped</div>
        <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 4px;">
          ${slotsHtml}
        </div>
      </div>

      <!-- Set bonuses -->
      ${setsHtml}

      <!-- Inventory -->
      <div style="padding: 8px 0 0 0;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; padding: 0 20px;">
          <div style="font-size: 10px; color: #b5bac1; text-transform: uppercase; letter-spacing: 0.12em; font-weight: 700;">Inventory (${unequipped.length})</div>
          ${duplicateCount > 0 ? `
            <button data-eq-action="salvage-duplicates" title="Salvage every duplicate, keeping one copy of each item" style="
              padding: 3px 10px; font-size: 9px; font-weight: 800;
              background: rgba(239,68,68,0.08);
              color: #ef4444;
              border: 1px solid rgba(239,68,68,0.25);
              cursor: pointer;
              text-transform: uppercase; letter-spacing: 0.06em;
              font-family: inherit;
              border-radius: 0;
            ">Salvage ${duplicateCount} Duplicate${duplicateCount === 1 ? "" : "s"}</button>
          ` : ""}
        </div>
        ${inventoryHtml}
      </div>
    `;
  }
  // ─── Settings Panel ──────────────────────────────────────────────────────────
  getSettingsPanel() {
    const panel = document.createElement("div");
    panel.style.cssText = "padding: 16px; background: rgba(10, 10, 16, 0.98); color: #dcddde;";
    panel.innerHTML = `
      <div style="font-size: 14px; font-weight: 700; color: #dcddde; margin-bottom: 8px;">EquipmentManager v${PLUGIN_VERSION}</div>
      <div style="font-size: 12px; color: #b5bac1; line-height: 1.5;">
        Equipment drops from dungeon boss kills. Open the armory from the channel header icon (&#11088;).
      </div>
    `;
    return panel;
  }
};
var EquipmentManagerClass = module.exports;
Object.assign(EquipmentManagerClass.prototype, equipmentLogic, dropSystem, eventAPI);
