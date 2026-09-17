/**
 * @name Dungeons
 * @author matthewqilanthompson
 * @description Solo Leveling dungeon system with biome-based spawns, family-typed mobs, status effects (bleed, burn, frostbite, necrotic, enrage), boss durability phases, and shadow army combat
 * @version 4.9.1
 * @source https://github.com/matthewqilanthompson/betterdiscord-assets
 */
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// src/shared/arise-svg.js
var require_arise_svg = __commonJS({
  "src/shared/arise-svg.js"(exports2, module2) {
    var ARISE_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 781 405"><g fill="#ffffff"><path d="M 235.77 232.52 C 232.56 235.89 228.78 236.99 223.88 238.88 Q 222.15 239.55 220.54 242.74 A 1.90 1.90 0.0 0 0 220.35 243.69 C 220.60 247.17 220.52 253.64 220.05 258.40 C 219.24 266.51 218.73 275.42 217.60 282.89 Q 216.62 289.36 216.49 294.21 C 216.37 298.98 215.39 302.83 215.20 307.32 C 214.95 312.97 213.91 318.00 213.08 324.71 Q 211.80 335.13 208.11 349.83 Q 207.37 352.79 205.51 355.08 A 1.08 1.08 0.0 0 1 203.78 355.01 C 202.22 352.76 202.21 348.42 202.11 343.94 C 201.98 338.18 201.93 327.50 202.34 319.03 Q 202.87 308.36 202.78 304.69 C 202.58 296.54 204.85 289.54 204.49 280.84 Q 204.38 278.12 204.87 270.31 C 205.41 261.60 205.17 253.67 205.19 244.38 A 0.80 0.79 10.9 0 0 204.68 243.64 Q 203.23 243.08 201.73 243.45 Q 193.08 245.55 188.10 246.70 C 181.97 248.12 175.32 248.17 169.05 249.95 A 6.43 6.21 -53.6 0 1 167.69 250.18 Q 165.89 250.29 161.99 250.98 C 156.92 251.88 156.10 254.16 153.40 259.09 C 139.93 283.59 131.76 299.13 118.83 317.84 C 116.74 320.87 114.95 324.49 110.54 323.64 A 1.91 1.91 0.0 0 1 108.99 321.73 Q 109.07 316.73 109.30 314.51 Q 109.64 311.35 112.19 301.88 C 114.30 294.01 117.95 285.82 120.49 277.74 C 122.23 272.20 125.71 265.39 127.33 260.06 C 128.10 257.54 130.90 255.37 127.42 253.33 C 122.83 250.64 118.28 251.07 115.27 245.88 A 2.81 2.80 -42.6 0 1 115.40 242.86 L 118.74 238.09 A 1.71 1.57 -0.6 0 1 119.22 237.64 L 125.13 233.88 A 4.75 4.60 -70.4 0 1 126.08 233.41 Q 136.02 229.86 138.21 228.98 Q 140.15 228.19 141.35 225.62 Q 144.19 219.57 156.49 190.96 Q 159.92 182.97 166.30 168.87 Q 175.87 147.72 180.95 137.44 C 181.92 135.48 182.80 132.56 183.96 130.41 Q 185.52 127.49 187.97 122.42 Q 192.23 113.56 196.85 106.58 C 200.29 101.37 204.64 98.36 211.07 100.43 Q 212.35 100.84 213.58 102.31 A 2.20 2.16 -75.4 0 1 214.01 103.06 C 218.09 114.51 218.74 124.03 220.65 139.50 C 221.33 144.94 221.48 150.25 221.98 156.00 Q 223.84 177.44 223.41 214.99 A 4.26 4.19 -32.1 0 1 222.98 216.80 C 221.42 219.99 220.95 224.56 224.38 226.94 A 1.81 1.78 -26.0 0 0 225.34 227.26 Q 231.45 227.55 235.74 231.58 A 0.67 0.66 43.5 0 1 235.77 232.52 Z M 204.33 224.37 A 1.34 1.32 80.2 0 0 205.16 223.18 Q 205.50 209.55 204.15 194.55 Q 203.97 192.64 202.26 178.45 C 201.99 176.20 202.10 173.95 202.06 171.25 C 202.02 168.06 197.68 164.09 195.52 168.67 Q 189.99 180.38 184.31 195.13 Q 183.16 198.12 181.46 201.73 C 178.77 207.46 177.99 209.66 175.27 214.57 Q 173.26 218.21 172.46 221.26 A 2.00 2.00 0.0 0 0 173.27 223.41 Q 174.62 224.32 177.01 224.32 Q 187.58 224.27 196.89 224.33 C 199.42 224.35 202.04 225.29 204.33 224.37 Z"/><path d="M 295.03 236.35 A 0.40 0.40 0.0 0 0 295.15 236.99 C 301.66 240.07 307.69 245.72 312.83 250.96 C 319.14 257.39 324.26 262.45 328.37 269.13 Q 329.47 270.91 334.59 279.27 C 340.39 288.74 343.92 298.47 347.56 309.31 Q 348.43 311.91 348.58 313.72 C 350.21 333.22 328.03 305.90 326.12 303.45 C 324.30 301.11 321.41 298.52 319.05 295.61 C 313.17 288.36 305.21 282.46 297.93 278.57 Q 287.68 273.09 286.00 271.83 Q 284.74 270.88 280.22 268.54 Q 277.41 267.08 272.88 263.70 Q 271.33 262.55 268.87 262.96 A 0.96 0.96 0.0 0 0 268.18 263.49 L 266.52 267.07 A 3.07 2.98 -25.7 0 0 266.37 267.48 C 261.42 284.42 258.51 300.07 255.14 319.66 C 254.52 323.29 253.30 327.99 252.18 331.93 Q 251.45 334.50 250.69 335.46 A 1.85 1.85 0.0 0 1 247.81 335.47 Q 245.66 332.82 245.40 329.27 Q 242.95 295.23 248.08 262.76 Q 248.29 261.41 248.74 249.53 C 248.94 244.41 248.07 239.23 248.14 234.38 A 4.06 4.04 -24.6 0 1 249.10 231.82 C 253.31 226.82 254.47 220.18 255.97 212.24 Q 261.68 181.83 264.92 169.38 Q 265.63 166.67 266.22 165.48 A 1.24 1.23 42.3 0 0 266.16 164.27 Q 264.31 161.27 261.14 161.94 C 257.22 162.76 252.80 163.33 249.77 160.87 A 1.08 1.07 -70.1 0 1 249.39 160.05 L 249.39 153.69 A 1.50 1.48 -24.9 0 1 249.75 152.72 Q 254.12 147.61 255.60 146.34 Q 260.36 142.23 262.36 140.14 C 265.85 136.49 270.73 133.63 274.36 131.37 C 277.46 129.44 280.11 122.53 281.30 119.49 C 282.32 116.88 284.18 113.84 285.45 111.45 C 287.42 107.71 290.97 102.55 295.59 101.82 A 2.53 2.53 0.0 0 1 297.77 102.53 L 300.87 105.62 A 1.41 1.40 23.0 0 1 301.27 106.60 L 301.27 111.07 A 2.00 1.98 -60.6 0 0 301.55 112.09 L 302.87 114.39 A 2.72 2.70 70.8 0 0 305.60 115.72 C 309.21 115.20 312.29 113.40 315.66 112.40 C 323.72 110.03 330.63 107.61 338.34 106.22 Q 343.13 105.36 347.90 104.35 A 11.34 11.03 38.0 0 1 350.11 104.11 Q 364.70 103.99 377.49 104.14 Q 379.13 104.16 384.69 105.70 C 394.10 108.29 401.01 114.11 404.81 123.25 C 408.39 131.87 406.80 139.22 404.39 147.78 Q 399.18 166.26 385.55 180.78 Q 375.03 191.99 367.43 198.14 Q 358.51 205.37 347.40 212.51 Q 337.45 218.91 325.63 223.98 Q 310.73 230.39 298.37 234.35 Q 296.26 235.03 295.03 236.35 Z M 278.36 222.64 Q 281.88 225.13 284.98 223.92 Q 300.62 217.81 304.56 216.33 Q 305.96 215.80 309.48 213.44 C 313.86 210.49 320.20 207.81 323.16 205.91 Q 341.68 194.04 357.57 179.57 Q 368.86 169.29 376.35 157.37 C 378.96 153.20 382.12 145.72 380.19 141.30 C 378.70 137.88 376.71 136.09 372.81 135.45 C 368.70 134.78 365.75 134.81 359.41 134.85 C 355.88 134.88 352.92 135.71 349.82 135.61 Q 346.60 135.52 342.76 136.60 C 338.38 137.84 333.30 138.22 328.82 139.68 Q 319.19 142.81 309.56 146.06 C 306.95 146.94 296.47 150.82 295.62 154.40 Q 292.61 166.99 291.02 175.29 Q 289.77 181.81 279.99 218.02 Q 279.14 221.19 278.33 221.87 A 0.49 0.48 43.0 0 0 278.36 222.64 Z"/><path d="M 408.33 347.47 Q 412.15 341.07 417.67 337.66 Q 440.21 323.68 443.57 321.32 Q 446.93 318.97 453.77 312.73 Q 459.52 307.48 462.79 302.89 Q 469.74 293.13 473.31 281.31 Q 481.27 254.91 468.02 232.51 C 462.95 223.92 452.72 211.32 447.54 203.75 C 442.44 196.28 439.41 187.46 440.29 177.85 Q 441.39 165.81 444.58 155.06 Q 445.99 150.29 447.93 146.68 Q 459.11 125.89 479.41 114.65 C 486.70 110.61 496.55 108.43 505.01 106.62 A 10.23 10.21 -51.1 0 1 506.97 106.41 Q 521.11 106.33 530.49 106.45 Q 531.82 106.47 534.18 108.03 A 1.08 1.08 0.0 0 1 534.66 108.93 L 534.66 113.09 A 1.67 1.67 0.0 0 1 534.22 114.22 Q 530.22 118.61 528.56 119.56 Q 526.40 120.79 524.27 122.27 Q 523.23 123.00 519.78 124.58 Q 510.56 128.80 505.96 130.66 C 488.91 137.54 472.56 149.63 469.18 168.67 C 468.18 174.32 471.43 183.42 474.59 188.49 Q 478.70 195.09 483.53 201.23 Q 484.93 203.02 489.92 211.18 Q 490.77 212.57 493.65 217.34 Q 502.47 231.93 502.51 249.26 Q 502.52 253.32 502.08 259.64 C 500.95 275.91 493.92 292.75 483.07 305.05 C 478.55 310.18 475.39 314.98 470.49 319.19 Q 459.30 328.82 446.94 335.93 Q 445.59 336.71 431.43 344.06 C 427.50 346.10 424.17 347.27 420.17 348.87 C 416.58 350.30 411.68 350.80 408.48 348.27 A 0.62 0.61 34.9 0 1 408.33 347.47 Z"/><path d="M 395.84 330.99 C 392.86 328.92 391.60 324.45 391.18 320.81 Q 390.21 312.36 389.79 302.45 C 389.37 292.46 390.21 282.15 390.36 271.69 Q 390.43 266.92 391.20 259.37 Q 395.63 215.81 404.17 172.92 Q 404.82 169.65 406.48 163.72 Q 408.98 154.78 413.25 139.46 Q 416.12 129.19 421.70 120.73 C 425.12 115.55 429.06 110.39 435.15 111.37 C 437.90 111.81 438.92 114.18 439.83 116.59 A 3.86 3.84 34.5 0 1 440.07 117.87 Q 440.12 123.24 440.11 127.23 C 440.10 131.77 438.94 135.74 438.53 140.49 Q 438.37 142.34 437.61 145.76 Q 433.11 166.13 432.08 173.03 Q 430.23 185.51 428.58 192.31 Q 422.98 215.36 414.45 250.64 Q 409.68 270.31 407.07 284.96 Q 403.99 302.19 402.57 319.77 C 402.32 322.89 401.62 327.84 399.60 330.39 A 2.82 2.76 -53.4 0 1 395.84 330.99 Z"/><path d="M 615.68 281.33 C 612.43 288.28 607.88 293.87 601.49 299.73 Q 587.41 312.65 571.37 322.10 Q 560.36 328.58 546.55 331.13 Q 541.56 332.05 537.05 331.21 Q 530.71 330.02 528.06 327.97 C 522.46 323.63 518.29 318.76 515.93 311.56 Q 511.02 296.60 511.96 281.00 Q 513.02 263.20 514.95 248.53 C 515.26 246.22 516.10 243.81 516.36 242.30 A 3.11 3.11 0.0 0 0 515.21 239.33 C 513.17 237.72 510.64 236.32 509.38 234.04 A 1.34 1.33 -52.3 0 1 509.26 233.07 Q 510.45 228.46 512.16 227.16 C 515.72 224.44 518.62 222.95 520.32 219.57 C 521.84 216.55 522.53 212.30 523.85 208.07 Q 531.84 182.37 541.77 157.78 Q 542.39 156.23 544.09 153.44 A 0.69 0.69 0.0 0 0 543.95 152.56 C 541.25 150.16 538.50 150.11 534.28 149.43 Q 532.87 149.20 530.48 146.74 A 1.65 1.61 -67.7 0 1 530.02 145.60 L 530.02 141.29 A 2.35 2.31 -29.7 0 1 530.36 140.08 Q 533.93 134.22 538.34 131.57 C 546.95 126.40 557.91 122.29 566.33 120.59 Q 576.01 118.63 578.29 118.04 Q 580.72 117.40 583.76 117.41 C 586.35 117.42 588.63 116.66 591.11 116.67 Q 595.95 116.69 601.98 115.39 A 10.66 10.44 -49.4 0 1 604.48 115.17 C 610.33 115.36 615.57 114.30 621.16 114.32 Q 632.20 114.37 650.50 114.33 Q 651.87 114.32 653.82 114.73 A 2.06 1.95 12.5 0 1 655.43 117.11 Q 655.25 117.91 654.11 118.88 C 648.72 123.45 641.43 125.38 632.75 127.75 C 625.38 129.76 616.22 131.89 606.32 135.01 Q 601.93 136.39 593.87 138.86 C 586.53 141.12 578.96 142.71 572.18 144.94 C 568.59 146.13 566.56 149.41 566.59 153.39 C 566.60 155.48 565.50 157.17 564.94 159.64 Q 560.22 180.36 553.66 201.98 C 552.93 204.36 552.73 206.27 551.57 208.25 A 1.97 1.97 0.0 0 0 552.87 211.17 C 560.87 212.82 568.79 209.53 576.78 209.16 Q 580.29 209.01 593.47 207.08 Q 597.33 206.52 604.41 205.97 Q 609.60 205.57 615.26 204.27 Q 617.14 203.84 619.53 204.72 A 0.96 0.96 0.0 0 1 620.15 205.43 Q 620.64 207.65 618.71 209.49 Q 613.13 214.82 604.13 218.88 Q 589.15 225.62 573.61 230.81 Q 562.57 234.50 547.88 237.74 Q 545.02 238.37 544.50 238.89 C 542.48 240.89 542.29 242.45 542.07 245.44 A 4.21 3.91 58.8 0 1 541.85 246.50 C 539.51 253.19 538.57 263.37 537.71 267.65 C 536.57 273.29 536.74 278.44 535.71 284.19 Q 534.70 289.82 535.37 293.97 Q 536.29 299.68 538.05 304.08 A 3.06 3.02 -81.8 0 0 538.92 305.26 Q 545.08 310.24 552.73 310.46 A 7.11 6.95 -50.2 0 0 554.59 310.27 Q 564.04 308.04 572.62 304.36 C 577.63 302.22 584.72 298.37 590.23 294.42 Q 601.50 286.34 609.26 280.77 Q 611.66 279.06 614.97 279.86 A 1.06 1.05 19.5 0 1 615.68 281.33 Z"/></g></svg>';
    module2.exports = { ARISE_SVG };
  }
});

// src/Dungeons/constants.js
var require_constants = __commonJS({
  "src/Dungeons/constants.js"(exports2, module2) {
    module2.exports = {
      COMBAT_STATUS_EFFECTS: {
        poison: {
          maxStacks: 4,
          durationMs: 9e3,
          tickMs: 1e3,
          damagePctPerStack: 25e-4,
          // 0.25% maxHP per stack per tick
          maxDamagePct: 0.018
          // 1.8% maxHP cap
        },
        armorBreak: {
          maxStacks: 3,
          durationMs: 7e3,
          damageAmpPerStack: 0.06,
          // +6% incoming damage per stack
          maxDamageAmp: 0.2
          // +20% cap
        },
        slow: {
          maxStacks: 3,
          durationMs: 7e3,
          slowPerStack: 0.08,
          // +8% attack cooldown per stack
          maxSlow: 0.3
          // +30% cap
        },
        bleed: {
          maxStacks: 5,
          durationMs: 8e3,
          tickMs: 1e3,
          damagePctPerStack: 3e-3,
          // 0.3% maxHP per stack per tick (physical DOT)
          maxDamagePct: 0.02
          // 2.0% maxHP cap
        },
        burn: {
          maxStacks: 3,
          durationMs: 6e3,
          tickMs: 1e3,
          damagePctPerStack: 5e-3,
          // 0.5% maxHP per stack per tick (fire DOT — high but short)
          maxDamagePct: 0.022
          // 2.2% maxHP cap
        },
        frostbite: {
          maxStacks: 4,
          durationMs: 1e4,
          slowPerStack: 0.1,
          // +10% attack cooldown per stack (stronger than slow)
          maxSlow: 0.4,
          // +40% cap
          rootAtMaxStacks: true,
          // At 4 stacks: 3s full freeze (100% slow)
          rootDurationMs: 3e3
        },
        necrotic: {
          maxStacks: 3,
          durationMs: 9e3,
          tickMs: 1e3,
          damagePctPerStack: 2e-3,
          // 0.2% maxHP per tick (weaker DOT but anti-heal)
          maxDamagePct: 0.012,
          // 1.2% maxHP cap
          healReductionPerStack: 0.15,
          // 15% healing reduction per stack
          maxHealReduction: 0.45
          // 45% heal reduction cap
        },
        enrage: {
          maxStacks: 2,
          // Phase 1 (50% HP) and Phase 2 (25% HP)
          durationMs: Infinity,
          // Permanent per phase
          damageBoostPerStack: 0.2,
          // +20% outgoing damage per stack
          maxDamageBoost: 0.4,
          // +40% cap at 2 stacks
          speedBoostPerStack: 0.15,
          // +15% attack speed per stack
          maxSpeedBoost: 0.3
          // +30% cap at 2 stacks
        }
      },
      // Family → status effect mapping (enemies and magic beast shadows use creature-matched ailments)
      FAMILY_STATUS_EFFECT_MAP: {
        beast: { primary: "bleed", secondary: "armorBreak", chance: 0.09 },
        ice: { primary: "frostbite", secondary: "slow", chance: 0.1 },
        reptile: { primary: "poison", secondary: "bleed", chance: 0.09 },
        dragon: { primary: "burn", secondary: "bleed", chance: 0.11 },
        demon: { primary: "burn", secondary: "necrotic", chance: 0.1 },
        undead: { primary: "necrotic", secondary: "poison", chance: 0.09 },
        giant: { primary: "armorBreak", secondary: "bleed", chance: 0.08 },
        "humanoid-beast": { primary: "bleed", secondary: "armorBreak", chance: 0.09 },
        insect: { primary: "poison", secondary: "slow", chance: 0.1 },
        construct: { primary: "armorBreak", secondary: "slow", chance: 0.08 },
        ancient: { primary: "slow", secondary: "poison", chance: 0.08 }
      },
      // Magic beast stat weights — species-specific combat specialization (mirrors ShadowArmy weights)
      // Applied to mob/boss base stats so an orc hits harder but moves slower than a spider at the same rank
      BEAST_STAT_WEIGHTS: {
        ant: { strength: 1.2, agility: 1.3, intelligence: 0.3, vitality: 1, perception: 0.7 },
        bear: { strength: 1.6, agility: 0.4, intelligence: 0.3, vitality: 1.4, perception: 0.5 },
        wolf: { strength: 1, agility: 1.5, intelligence: 0.6, vitality: 0.7, perception: 1 },
        spider: { strength: 0.6, agility: 1.4, intelligence: 1, vitality: 0.5, perception: 1 },
        golem: { strength: 1.3, agility: 0.2, intelligence: 0.1, vitality: 1.9, perception: 0.3 },
        wyvern: { strength: 1.4, agility: 1.6, intelligence: 0.5, vitality: 1, perception: 0.9 },
        serpent: { strength: 0.8, agility: 1.4, intelligence: 0.8, vitality: 0.7, perception: 1 },
        dragon: { strength: 1.7, agility: 1.4, intelligence: 1.5, vitality: 1.6, perception: 1.2 },
        orc: { strength: 1.5, agility: 0.8, intelligence: 0.7, vitality: 1.2, perception: 0.5 },
        naga: { strength: 0.8, agility: 1.3, intelligence: 1.4, vitality: 0.9, perception: 1 },
        titan: { strength: 1.8, agility: 0.3, intelligence: 0.4, vitality: 1.7, perception: 0.6 },
        giant: { strength: 1.6, agility: 0.4, intelligence: 0.5, vitality: 1.5, perception: 0.5 },
        elf: { strength: 0.5, agility: 1.5, intelligence: 1.6, vitality: 0.6, perception: 1.3 },
        demon: { strength: 1.5, agility: 1.2, intelligence: 1.4, vitality: 1.1, perception: 1 },
        ghoul: { strength: 1, agility: 0.8, intelligence: 0.3, vitality: 1.6, perception: 0.4 },
        ogre: { strength: 1.7, agility: 0.3, intelligence: 0.2, vitality: 1.4, perception: 0.4 },
        centipede: { strength: 1, agility: 1.4, intelligence: 0.5, vitality: 1.1, perception: 0.7 },
        yeti: { strength: 1.4, agility: 0.8, intelligence: 0.6, vitality: 1.5, perception: 0.7 }
      },
      // Boss enrage intensity by family
      BOSS_ENRAGE_INTENSITY: {
        beast: "high",
        demon: "high",
        dragon: "high",
        "humanoid-beast": "high",
        giant: "medium",
        ice: "medium",
        reptile: "medium",
        insect: "medium",
        undead: "low",
        ancient: "low",
        construct: "none"
        // Mechanical — no rage
      },
      COMBAT_STATUS_LIMITS: {
        tickIntervalMs: 1e3,
        maxTrackedMobsPerDungeon: 600
      },
      // Boss durability — prevents shadow armies from one-shotting bosses
      // 1) BOSS DAMAGE RESISTANCE — rank-scaled % reduction on ALL incoming damage
      BOSS_DAMAGE_RESISTANCE: {
        E: 0.1,
        D: 0.15,
        C: 0.22,
        B: 0.3,
        A: 0.38,
        S: 0.45,
        SS: 0.5,
        SSS: 0.55,
        "SSS+": 0.58,
        NH: 0.6,
        Monarch: 0.62,
        "Monarch+": 0.64,
        "Shadow Monarch": 0.65
      },
      // 2) PER-HIT DAMAGE CAP — no single hit can exceed this % of boss maxHP
      // Cap at PARITY (deployed army averages the boss's own rank): 6% of maxHP per
      // tick, so an evenly-matched fight still needs 17+ ticks and can't be one-shot.
      BOSS_DAMAGE_CAP_PCT: 0.06,
      // Each full rank the deployed army averages ABOVE the boss multiplies the cap.
      // 1.6x/rank: +1 rank 9.6%, +2 15%, +3 25%, +4 39%, +5 63%, +6 100% (one-shot).
      // Raise it to make overwhelming force pay off sooner; lower it to keep even
      // lopsided fights lasting several ticks.
      BOSS_DAMAGE_CAP_RANK_GROWTH: 1.6,
      // 3) BOSS PHASE SHIELD — brief invulnerability at HP thresholds
      BOSS_PHASE_THRESHOLDS: [0.75, 0.5, 0.25],
      BOSS_PHASE_SHIELD_MS: 2500,
      // 2.5s invulnerability
      // 4) BOSS HP SCALING — accounts for shadow army size (old formula assumed solo player)
      BOSS_HP_ARMY_MULTIPLIER: 8,
      // 8x base HP to survive sustained shadow DPS
      // 5) SHADOW VS BOSS DAMAGE REDUCTION
      SHADOW_VS_BOSS_DAMAGE_MULT: 0.35,
      // Shadows deal 35% of calculated damage to bosses
      // 6) SHADOW AOE — lore-accurate abilities from Solo Leveling
      //    Each entry: { name, chance, targets, dmgFrac, hitBoss }
      //    Tuned to canon: Tusk/demon = #1 AOE mage (Hellfire, Hymn of Fire Dragon),
      //    Dragon = city-scale breath, Ants = coordinated swarm, Assassin = zero AOE.
      SHADOW_AOE: {
        // ── Beast families ──
        // INSECTS — Beru-style coordinated swarm tactics. Ants target weakest first,
        // fly in formation, overwhelm with sheer numbers. Each individual is A-rank+.
        ant: { name: "Swarm Assault", chance: 0.45, targets: 10, dmgFrac: 0.25, hitBoss: false },
        spider: { name: "Web Entangle", chance: 0.35, targets: 8, dmgFrac: 0.25, hitBoss: false },
        centipede: { name: "Venom Barrage", chance: 0.35, targets: 8, dmgFrac: 0.3, hitBoss: false },
        // BEASTS — Tank (bear) uses Shout of Provocation (AOE taunt), plows through
        // enemies like a military tank. Wolves are precision single-target flankers.
        bear: { name: "Provocation Ram", chance: 0.25, targets: 4, dmgFrac: 0.45, hitBoss: false },
        wolf: { name: "Pack Coordinate", chance: 0.2, targets: 2, dmgFrac: 0.35, hitBoss: false },
        // REPTILES — Naga (Jima) wields dual tridents + size manipulation.
        // Serpents are venomous single-target strikers.
        serpent: { name: "Venom Strike", chance: 0.2, targets: 2, dmgFrac: 0.5, hitBoss: false },
        naga: { name: "Trident Sweep", chance: 0.3, targets: 6, dmgFrac: 0.45, hitBoss: true },
        // DRAGONS — Kamish-tier: Dragon Breath obliterated the US west coast.
        // City-scale devastation. Highest damage AOE in the game. Hits boss.
        // Wyvern (Kaisel) is primarily transport — minimal AOE.
        wyvern: { name: "Dive Strike", chance: 0.15, targets: 3, dmgFrac: 0.35, hitBoss: false },
        dragon: { name: "Dragon's Breath", chance: 0.35, targets: 12, dmgFrac: 0.65, hitBoss: true },
        // GIANTS — 28 shadow giants from Tokyo S-Rank Gate. Massive ground slams,
        // area denial through sheer size. Each can handle S-rank hunters.
        titan: { name: "Seismic Slam", chance: 0.3, targets: 8, dmgFrac: 0.45, hitBoss: true },
        giant: { name: "Ground Pound", chance: 0.3, targets: 6, dmgFrac: 0.4, hitBoss: true },
        // CONSTRUCT — Golems are pure tanks. Shockwave from mass, not skill.
        golem: { name: "Shockwave", chance: 0.2, targets: 4, dmgFrac: 0.3, hitBoss: false },
        // ANCIENT — Elves channel arcane magic. Ranged artillery barrage.
        elf: { name: "Arcane Barrage", chance: 0.35, targets: 7, dmgFrac: 0.4, hitBoss: false },
        // DEMON — Tusk: THE shadow army's AOE specialist. Hymn of Fire Dragon
        // blasted through Mount Hallasan. Hellfire decimates entire armies.
        // Orb of Avarice doubles magic damage. Highest AOE proc + targets.
        demon: { name: "Hellfire", chance: 0.4, targets: 12, dmgFrac: 0.6, hitBoss: true },
        // UNDEAD — Ghouls spread plague through contact. Chain-spread on kill.
        ghoul: { name: "Plague Burst", chance: 0.35, targets: 6, dmgFrac: 0.3, hitBoss: false },
        // HUMANOID-BEAST — Orcs/ogres are brute-force melee. War cry + slam.
        orc: { name: "War Cry Slam", chance: 0.25, targets: 4, dmgFrac: 0.45, hitBoss: false },
        ogre: { name: "Club Sweep", chance: 0.25, targets: 4, dmgFrac: 0.45, hitBoss: false },
        // ICE — Yeti generates frost nova, freezing and shattering nearby mobs.
        yeti: { name: "Frost Nova", chance: 0.25, targets: 5, dmgFrac: 0.4, hitBoss: false },
        // ── Humanoid roles ──
        // MAGE — Shadow army mage corps. Ranged artillery behind knight line.
        // Tusk leads them. Blazing Fire / Fireball AOE.
        mage: { name: "Blazing Fire", chance: 0.4, targets: 8, dmgFrac: 0.5, hitBoss: true },
        // RANGER — Ranged volley, suppressive fire. Arrow Rain on groups.
        ranger: { name: "Arrow Rain", chance: 0.3, targets: 6, dmgFrac: 0.35, hitBoss: false },
        // BERSERKER — Whirlwind melee. Reckless close-range devastation.
        berserker: { name: "Whirlwind", chance: 0.3, targets: 5, dmgFrac: 0.55, hitBoss: false },
        // KNIGHT — Igris-style master swordsman. Precision cleave, not mass AOE.
        // Ruler's Authority gives telekinetic sweep (2-3 targets max).
        knight: { name: "Sword Sweep", chance: 0.2, targets: 3, dmgFrac: 0.4, hitBoss: false },
        // ASSASSIN — Greed-style. Speed + single-target elimination. NO AOE.
        // Canon: assassins are pure single-target killers.
        assassin: { name: "Shadow Strike", chance: 0.1, targets: 1, dmgFrac: 0.8, hitBoss: false },
        // TANK — Provocation/taunt role. Absorbs hits, minimal damage output.
        tank: { name: "Shield Slam", chance: 0.15, targets: 2, dmgFrac: 0.25, hitBoss: false },
        // HEALER — Beru-style healing magic. Holy Nova is weak offensive AOE.
        healer: { name: "Holy Nova", chance: 0.15, targets: 3, dmgFrac: 0.2, hitBoss: false },
        // SUPPORT — Utility/buff role. Spirit Burst is minor offensive AOE.
        support: { name: "Spirit Burst", chance: 0.15, targets: 3, dmgFrac: 0.2, hitBoss: false },
        // Fallback for unknown roles
        _default: { name: "Cleave", chance: 0.15, targets: 2, dmgFrac: 0.35, hitBoss: false }
      },
      RANK_MULTIPLIERS: {
        E: 1,
        D: 2,
        C: 3,
        B: 5,
        A: 8,
        S: 12,
        SS: 16,
        SSS: 21,
        "SSS+": 27,
        NH: 34,
        Monarch: 42,
        "Monarch+": 51,
        "Shadow Monarch": 61
      },
      // Dungeon deployment scaling -- mob capacity per dungeon rank + shadow deploy ratio.
      // SINGLE SOURCE OF TRUTH (wave 9, 2026-07-12): previously duplicated 3x across
      // spawn-core.js (MOB_COUNT_BY_RANK), player-sync-allocation.js (MOB_CAP_BY_RANK +
      // WARM_MOB_CAP_BY_RANK), held in sync only by a "must match" comment -- a drift
      // hazard. Now centralized; spawn, deploy-target, and pool-warming all read this.
      //
      // Deploy target = mobCapacity(rank) x DEPLOY_MOB_RATIO, then clamped by the army
      // reserve (25% held back, split across active dungeons) and DEPLOY_CEILING_ABSOLUTE.
      // Cost model (why raising the ceiling is safe): combat processes a rotating
      // TICK_BUDGET=500-shadow slice per dungeon per tick regardless of total allocation
      // (combat-shadow-execution.js) -- allocation size affects rotation-cycle length and
      // memory, NOT per-tick CPU. Fetches that scale with the target use rank-indexed
      // bounded reads only (ShadowArmy storage.js:getShadowsByRankLimited / getShadows
      // with an explicit count), never a full-store scan (PERF-CONVENTIONS.md R1).
      DUNGEON_MOB_CAPACITY_BY_RANK: {
        E: 50,
        D: 150,
        C: 400,
        B: 1200,
        A: 4e3,
        S: 1e4,
        SS: 25e3,
        SSS: 5e4,
        "SSS+": 75e3,
        NH: 1e5,
        Monarch: 25e4,
        "Monarch+": 5e5,
        "Shadow Monarch": 1e6
      },
      DEPLOY_MOB_RATIO: 1.5,
      // deploy target = mobCapacity x this ratio ("overwhelming, not OP")
      // Raised 50000 -> 200000 (wave 9): the old flat 50k ceiling flattened every rank from
      // SSS upward to the SAME deploy count (SSS/SSS+/NH/Monarch/Monarch+/Shadow Monarch all
      // clamped to 50000 -- no top-end differentiation). 200000 sits just under a typical
      // late-game army's available-cap headroom (75% of army, split across active dungeons),
      // so it only governs the truly extreme ranks, not normal play.
      // Raised 200000 -> 500000 (2026-08-03), now that army DPS actually scales past
      // ~50k deployed (see ROTATION_CATCHUP_SCALE_MAX below — before that fix every
      // shadow beyond ~50k was decorative, so a higher ceiling would have bought
      // memory cost and no damage).
      //
      // What this limit is actually for: MEMORY, not CPU. Combat processes a fixed
      // TICK_BUDGET slice per tick regardless of roster size, but every deployed
      // shadow is retained as a full object in shadowAllocations. Rough cost is
      // ~300-600 bytes each: ~57-114 MB at 200k, ~143-286 MB at 500k, ~286-572 MB
      // at 1M. Measured heap is 367 MB typical / 880 MB peak against a 4096 MB
      // limit, so 500k is comfortable and 1M+ is not — re-measure the heap FLOOR in
      // AAPerfSentinel before going higher.
      //
      // Still below the top mob capacities (Monarch+ wants 750k, Shadow Monarch
      // 1.5M). Those remain deliberately unreachable; raise this only alongside a
      // heap measurement at the new size.
      //
      // PAST ~1M THIS APPROACH STOPS WORKING — every deployed shadow is a retained
      // object, so memory, not CPU, ends it. The design for an unbounded army
      // (bounded head of real objects + O(ranks) aggregate tail) is drafted, with
      // revisit triggers, at DevKnowledgeBase guides/projects/
      // shadowarmy-aggregate-tail-design.md. Read it BEFORE raising this past 1M.
      DEPLOY_CEILING_ABSOLUTE: 5e5,
      // WARFRONT per-tick kill ceiling (difficulty-contributions.js).
      // Expressed as a fraction of the host's REMAINING reserves rather than a flat
      // number, so the mass battle is scale-free: a 1,000,000-reserve gate and a
      // 50,000-reserve gate both take a bounded number of ticks, and an unbounded
      // army can approach the ceiling faster but never collapse a war into one
      // tick. 0.02 => ~50 ticks minimum at rank parity.
      WARFRONT_HOST_FRACTION_PER_TICK: 0.02,
      // Floor, so small hosts are not slowed down by the fraction. This is the old
      // flat cap; settings.warfrontMaxKillsPerTick still overrides it and now acts
      // as the FLOOR rather than an absolute ceiling.
      WARFRONT_MIN_KILLS_PER_TICK: 5e3,
      // Rank superiority raises the ceiling on the same curve as the boss damage
      // cap: 1.6x per mean effective rank above the host, capped at 8x
      // (~6 ticks to annihilate — "functional annihilation" territory).
      WARFRONT_CAP_RANK_GROWTH: 1.6,
      WARFRONT_CAP_RANK_MAX: 8,
      // Upper bound on the rotation catch-up multiplier (combat-shadow-execution.js).
      // 64 covers a ~3.2M-shadow roster at the default 3s tick / 500 budget before
      // damage starts being truncated again; it exists only so a pathological
      // rotationTicks value can't produce an absurd damage spike. Set
      // settings.rotationCatchUpScaling = false to disable the correction entirely
      // and return to the pre-2026-08-03 behaviour (army DPS caps near 50k deployed).
      ROTATION_CATCHUP_SCALE_MAX: 64,
      ARISE_SVG: require_arise_svg().ARISE_SVG
    };
  }
});

// src/Dungeons/bootstrap-runtime.js
var require_bootstrap_runtime = __commonJS({
  "src/Dungeons/bootstrap-runtime.js"(exports2, module2) {
    var _bdLoad = (f) => {
      try {
        const m = { exports: {} };
        new Function("module", "exports", require("fs").readFileSync(require("path").join(BdApi.Plugins.folder, f), "utf8"))(m, m.exports);
        return typeof m.exports === "function" || Object.keys(m.exports).length ? m.exports : null;
      } catch (e) {
        return null;
      }
    };
    var _PluginUtils;
    try {
      _PluginUtils = _bdLoad("BetterDiscordPluginUtils.js");
    } catch (_) {
      _PluginUtils = null;
    }
    function openIndexedDbDatabase({ dbName, dbVersion, onUpgrade, onBlocked }) {
      return new Promise((resolve, reject) => {
        if (!window.indexedDB) {
          reject(new Error("IndexedDB not supported"));
          return;
        }
        const request = indexedDB.open(dbName, dbVersion);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
        request.onupgradeneeded = (event) => onUpgrade == null ? void 0 : onUpgrade(event);
        request.onblocked = () => {
          onBlocked == null ? void 0 : onBlocked();
          reject(new Error("Database upgrade blocked"));
        };
      });
    }
    var _dungeonsStartupWarn = (...args) => {
      try {
        if (typeof window !== "undefined" && window.__DUNGEONS_DEBUG_STARTUP__) {
          console.warn(...args);
        }
      } catch (_) {
      }
    };
    var UnifiedSaveManager = (() => {
      try {
        if (typeof window !== "undefined" && typeof window.UnifiedSaveManager === "function") {
          return window.UnifiedSaveManager;
        }
        const _USM = _bdLoad("UnifiedSaveManager.js") || (typeof window !== "undefined" ? window.UnifiedSaveManager : null) || null;
        if (_USM && typeof window !== "undefined" && !window.UnifiedSaveManager) window.UnifiedSaveManager = _USM;
        return _USM;
      } catch (error) {
        _dungeonsStartupWarn("[Dungeons] Failed to load UnifiedSaveManager:", error);
        return typeof window !== "undefined" ? window.UnifiedSaveManager || null : null;
      }
    })();
    module2.exports = {
      _bdLoad,
      _PluginUtils,
      _dungeonsStartupWarn,
      UnifiedSaveManager,
      openIndexedDbDatabase
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

// src/Dungeons/init-state.js
var require_init_state = __commonJS({
  "src/Dungeons/init-state.js"(exports2, module2) {
    var { UnifiedSaveManager } = require_bootstrap_runtime();
    module2.exports = {
      _initDefaults() {
        this.defaultSettings = {
          enabled: true,
          debug: false,
          autoDeploy: true,
          // auto-deploy shadows when a dungeon spawns (no manual join)
          spawnChance: 12,
          dungeonDuration: 6e5,
          maxDungeonsPercentage: 0.15,
          minDungeonsAllowed: 3,
          maxDungeonsAllowed: 20,
          channelSpawnCooldown: 3e5,
          globalSpawnCooldown: 6e4,
          shadowAttackInterval: 3e3,
          userAttackCooldown: 2e3,
          mobKillNotificationInterval: 3e4,
          mobMaxActiveCap: Infinity,
          mobWaveBaseCount: 200,
          mobWaveVariancePercent: 0.2,
          mobTierNormalShare: 0.7,
          mobTierEliteShare: 0.25,
          mobTierChampionShare: 0.05,
          // Post-unlock shadow split between mobs and boss. Raised 0.25 -> 0.5
          // (2026-07-14) so shadows keep clearing adds while fighting the boss
          // instead of ~75% tunnelling the boss; still shifts toward the boss at
          // low boss HP via shadowBossTargetShareLowBossHp. While the boss is
          // GATED, shadows already target mobs 100% (getShadowBossTargetChance
          // returns 0), so this only governs the post-unlock phase.
          // Extra army boss-damage while the player is actively participating
          // (joined + attacking). Makes joining matter instead of deploy-and-idle.
          // 0.25 = +25%. Range 0–2.
          userParticipationDamageBonus: 0.25,
          // Deliberate flat multiplier on all shadow damage (boss + mobs) so a large
          // shadow army overwhelms by sheer size. 2.0 = double. Raise for more
          // steamroll, lower for more challenge. (Not the old inflation bug — this
          // is the clean, single-source power lever.)
          shadowDamageScalar: 2,
          // MONARCH'S WILL (SM perk, 2026-08-05): damage multiplier for shadows
          // fighting in dungeons OTHER than the one the Monarch has joined.
          monarchsWillMultiplier: 1.25,
          // PERFORMANCE MODE (default ON): clamps concurrent alive mobs to
          // performanceAliveMobCap regardless of dungeon rank. High-rank dungeons
          // allowed up to 1M alive mobs, and several per-tick passes scan the full
          // alive array — the main in-dungeon lag source. Kill throughput is
          // unchanged (the attack budget only simulates ~800 mobs/tick anyway;
          // mobs refill from the queue as they die). Set false for rank-table caps.
          performanceMode: true,
          performanceAliveMobCap: 800,
          // WARFRONT (2026-07-15): two-layer battle. The object-simulated frontline
          // stays capped (performanceAliveMobCap), while the MASS battle — your
          // surplus army vs the gate's war host (dungeon.war.reserves, seeded from
          // mobCapacity: S 10k … Monarch+ 500k) — resolves in AGGREGATE each combat
          // tick: O(1) arithmetic, real war-scale kill counts, zero per-entity cost.
          // Kills flow through _onMobKilled (XP/essence/gate credit all batched).
          warfrontEnabled: true,
          // SOVEREIGN'S COMMAND: a species whose Grand Marshal is fielded fights
          // with its leader's edge — offense sovereigns raise war output, defense
          // sovereigns cut casualties, and led frontline shadows hit harder.
          gmLeadershipEnabled: true,
          gmLeadershipOffenseBonus: 0.2,
          gmLeadershipCasualtyCut: 0.4,
          gmLeadershipFrontlineBonus: 0.1,
          // Aggregate kills per surplus shadow per combat tick (~2s). 0.015 with a
          // 100k surplus army ≈ 1,500 kills/tick ≈ 45k/min — a Monarch host
          // (250k) falls in ~5 minutes of sustained war.
          warfrontKillRatePerShadow: 0.015,
          warfrontMaxKillsPerTick: 5e3,
          // Boss gate during war: the general takes the field only after this
          // fraction of the host is culled (floor on top of the rank-scaled kills).
          warGateCullPercent: 0.1,
          // Anti-stuck valve: the gate opens on time alone after this long, so an
          // under-sized army is never permanently walled off the boss.
          bossGateMaxWaitMs: 6e5,
          // Healer/support shadows actively restore HP to alive-damaged shadows
          // each combat tick (scaled by healer presence). Set false to disable.
          shadowHealerRestorationEnabled: true,
          // When the army exceeds its deployable cap, guarantee this share of the
          // deployed set is support/tank so the role-pressure mechanics engage
          // instead of being benched by a pure strongest-first cut. 0.12 = 12%.
          roleDiversityGuaranteeEnabled: true,
          minSupportTankShare: 0.12,
          shadowMobTargetShare: 0.5,
          shadowBossTargetShareLowBossHp: 0.85,
          shadowBossFocusLowHpThreshold: 0.4,
          bossGateEnabled: true,
          // Boss gate = clear-mobs-then-boss pacing. Was a pure 3-min timer with
          // ZERO required kills, so mobs were a side-show. Now the gate needs a
          // real mob cull (40 kills) plus a shorter 60s floor, so the mob phase is
          // an actual phase. Mobs spawn continuously while the boss lives, so any
          // finite kill count is always reachable — no unwinnable risk.
          bossGateMinDurationMs: 6e4,
          bossGateRequiredMobKills: 40,
          shadowPressureScalingEnabled: false,
          shadowPressureMobScaleStep: 0.12,
          shadowPressureBossScaleStep: 0.18,
          shadowPressureScaleMax: 2.75,
          staticBossHpBaseMultiplier: 2.3,
          // GEOMETRIC per rank (was staticBossHpRankStep: 0.14, linear — replaced
          // 2026-08-03). See getStaticBossHpMultiplier in player-sync-allocation.js
          // for why a linear step could not separate the top ranks. Old saves that
          // still carry staticBossHpRankStep are harmless: the reader keys off
          // staticBossHpRankGrowth and falls back to this default when absent.
          staticBossHpRankGrowth: 1.25,
          rankAllocationDeployPoolShare: 0.8,
          rankAllocationPreferredPairShare: 0.8,
          rankAllocationSameRankShare: 0.75,
          roleCombatModelEnabled: true,
          roleCombatModelVersion: 1,
          combatStatusEffectsEnabled: true,
          combatStatusTickMs: 1e3,
          combatStatusMaxTrackedMobs: 600,
          // Dungeon ranks including SS, SSS
          dungeonRanks: [
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
          ],
          userActiveDungeon: null,
          lastSpawnTime: {},
          lastDungeonEndTime: {},
          mobKillNotifications: {},
          userHP: null,
          userMaxHP: null,
          userMana: null,
          userMaxMana: null,
          // HP scaling: rank quadratic + shadow soft-cap
          userRankHpLinearStep: 50,
          userRankHpCurveStep: 35,
          userHpPerShadowBase: 8,
          userHpPerShadowRankStep: 0.6,
          userHpShadowSoftCapCount: 500,
          userHpShadowSoftCapMultiplier: 0.12,
          // Combat stat harmonizer: compresses extreme high-rank stats
          shadowCombatStatPivotScale: 3.5,
          shadowCombatStatCompressionExp: 0.68,
          settingsVersion: 4
        };
        this.settings = structuredClone(this.defaultSettings);
        this.started = false;
        this.soloLevelingStats = null;
        this.shadowArmy = null;
        this.toasts = null;
        this.rankScaling = {
          powerStep: 1.35,
          damageExponent: 0.85,
          damageMin: 0.35,
          damageMax: 8,
          mobHpStep: 1.18,
          mobHpMaxFactor: 12,
          bossHpStep: 1.3,
          bossHpMaxFactor: 60,
          shadowHpBaseFactor: 0.9,
          shadowHpStep: 0.05,
          shadowHpMaxFactor: 1.5
        };
        this.extractionRetryLimit = 3;
      },
      _initTimers() {
        this.shadowAttackIntervals = /* @__PURE__ */ new Map();
        this.mobKillNotificationTimers = /* @__PURE__ */ new Map();
        this.mobSpawnTimers = /* @__PURE__ */ new Map();
        this._mobSpawnNextAt = /* @__PURE__ */ new Map();
        this._mobSpawnQueueNextAt = /* @__PURE__ */ new Map();
        this._mobSpawnLoopInterval = null;
        this._mobSpawnLoopInFlight = false;
        this._mobSpawnLoopNextAt = 0;
        this._mobSpawnLoopTickMs = 1500;
        this.bossAttackTimers = /* @__PURE__ */ new Map();
        this.mobAttackTimers = /* @__PURE__ */ new Map();
        this._intervals = /* @__PURE__ */ new Set();
        this._timeouts = /* @__PURE__ */ new Set();
        this.regenInterval = null;
        this.currentChannelUpdateInterval = null;
        this._combatLoopInterval = null;
        this._combatLoopInFlight = false;
        this._combatLoopNextAt = 0;
        this._combatLoopTickMs = 2e3;
        this._shadowActiveIntervalMs = /* @__PURE__ */ new Map();
        this._shadowBackgroundIntervalMs = /* @__PURE__ */ new Map();
        this._bossBackgroundIntervalMs = /* @__PURE__ */ new Map();
        this._mobBackgroundIntervalMs = /* @__PURE__ */ new Map();
        this._visibilityChangeHandler = null;
        this._pausedIntervals = /* @__PURE__ */ new Map();
        this._hpBarRestoreInterval = null;
        this.dungeonCleanupInterval = null;
        this._lastShadowAttackTime = /* @__PURE__ */ new Map();
        this._lastBossAttackTime = /* @__PURE__ */ new Map();
        this._lastMobAttackTime = /* @__PURE__ */ new Map();
      },
      _initCaches() {
        this._ariseButtonRefs = /* @__PURE__ */ new Map();
        this._bossBarCache = /* @__PURE__ */ new Map();
        this._mobCleanupCache = /* @__PURE__ */ new Map();
        this._bossBarLayoutThrottle = /* @__PURE__ */ new Map();
        this._rankStatsCache = /* @__PURE__ */ new Map();
        this._personalityCache = /* @__PURE__ */ new Map();
        this._memberWidthCache = /* @__PURE__ */ new Map();
        this._containerCache = /* @__PURE__ */ new Map();
        this._shadowCountCache = null;
        this._shadowsCache = null;
        this._deployStarterPoolCache = null;
        this._deployStarterPoolCacheTime = null;
        this._deployStarterPoolCacheRank = null;
        this._deployStarterPoolCacheTTL = 12e4;
        this._deployStarterPoolStaleMaxAge = 9e5;
        this._shadowStatsCache = /* @__PURE__ */ new Map();
        this._mobGenerationCache = /* @__PURE__ */ new Map();
        this._mobCacheTTL = 6e4;
        this._cache = {
          pluginInstances: {},
          pluginInstancesTime: {},
          pluginInstancesTTL: 5e3,
          skillTreeBonuses: null,
          skillTreeBonusesTime: 0,
          skillTreeBonusesTTL: 500,
          userEffectiveStats: null,
          userEffectiveStatsTime: 0,
          userEffectiveStatsTTL: 500
        };
        this._guildChannelCache = /* @__PURE__ */ new Map();
        this._guildChannelCacheTTL = 3e4;
        this._spawnableChannelCache = /* @__PURE__ */ new Map();
        this._spawnableChannelCacheTTL = 1e4;
        this.shadowAllocations = /* @__PURE__ */ new Map();
        this.shadowReserve = [];
        this.allocationCache = null;
        this.allocationCacheTime = null;
        this.allocationCacheTTL = 45e3;
        this._allocationHardRefreshTTL = 12e4;
        this._allocationDirty = true;
        this._allocationDirtyReason = "init";
        this._allocationShadowSetDirty = true;
        this._allocationSortedShadowsCache = null;
        this._allocationSortedShadowsCacheTime = null;
        this._allocationSortedShadowsCacheTTL = 6e5;
        this._allocationScoreCache = null;
        this._allocationSummary = /* @__PURE__ */ new Map();
        this.shadowArmyCountCache = /* @__PURE__ */ new Map();
      },
      _initState() {
        this._msgDispatcher = null;
        this._msgCreateHandler = null;
        this._msgDispatcherPoll = null;
        this._sessionToken = 0;
        this._mobIdCounter = 0;
        this._mobSpawnQueue = /* @__PURE__ */ new Map();
        this._spawnPipelineGuardAt = /* @__PURE__ */ new Map();
        this._mobContributionMissLogState = /* @__PURE__ */ new Map();
        this.lastUserAttackTime = 0;
        this.storageManager = null;
        this.mobBossStorageManager = null;
        this.activeDungeons = /* @__PURE__ */ new Map();
        this._pendingDungeonMobXPByBatch = /* @__PURE__ */ new Map();
        this._pendingDungeonMobKillsByBatch = /* @__PURE__ */ new Map();
        this._combatRoundRobinCursor = 0;
        this._roleCombatStates = /* @__PURE__ */ new Map();
        this._combatStatusByChannel = /* @__PURE__ */ new Map();
        this._perfTelemetry = {
          combatTickEmaMs: 0,
          mobSpawnTickEmaMs: 0,
          lastAutotuneLogAt: 0,
          lastSchedulerLogAt: 0,
          lastSpikeLogAt: 0,
          combatSpikeCount: 0,
          combatDirtyMarkCount: 0,
          lastCombatDirtyReason: null,
          lastProcessedDungeonCount: 0,
          lastSkippedDungeonCount: 0
        };
        this._combatSettingsDirty = false;
        this._combatSettingsLastFlushAt = 0;
        this._combatSettingsFlushIntervalMs = 1e4;
        this._combatSettingsFallbackFlushTimer = null;
        this.hiddenComments = /* @__PURE__ */ new Map();
        this.channelLocks = /* @__PURE__ */ new Set();
        this._lastGlobalSpawnTime = 0;
        this.deadShadows = /* @__PURE__ */ new Map();
        this._observers = /* @__PURE__ */ new Set();
        this._listeners = /* @__PURE__ */ new Map();
        this.defeatedBosses = /* @__PURE__ */ new Map();
        this._arisedBossIds = /* @__PURE__ */ new Set();
        this._lastRebalanceAt = /* @__PURE__ */ new Map();
        this._rebalanceCooldownMs = 15e3;
        this._deployRebalanceInFlight = /* @__PURE__ */ new Set();
        this._deployStarterWarmInFlight = null;
        this._deployStarterShadowCap = 240;
        this.currentChannelKey = null;
        this._isWindowVisible = !document.hidden;
        this._windowHiddenTime = null;
        this.saveManager = null;
        if (UnifiedSaveManager) {
          this.saveManager = new UnifiedSaveManager("Dungeons");
        }
        this.observerStartTime = Date.now();
        this.processedMessageIds = /* @__PURE__ */ new Set();
        this._injectedStyles = /* @__PURE__ */ new Set();
        this._mobCapWarningShown = {};
        this.extractionEvents = /* @__PURE__ */ new Map();
        this.extractionInProgress = /* @__PURE__ */ new Set();
        this._storyModeActive = false;
        this._demonCastle = null;
        this._dcPermits = 0;
        this._dcPermitsPendingFlush = 0;
        this.storyModeStorage = null;
      },
      _initUI() {
        this.dungeonIndicators = /* @__PURE__ */ new Map();
        this.bossHPBars = /* @__PURE__ */ new Map();
        this._bossBarLayoutFrame = null;
        this._navigationUtils = null;
        this._dungeonHeaderWidgetButton = null;
        this._dungeonHeaderPopup = null;
        this._dungeonHeaderWidgetLoop = null;
        this._dungeonHeaderPopupDocClickHandler = null;
        this._dungeonHeaderPopupResizeHandler = null;
        this._dungeonHeaderPopupScrollHandler = null;
        this._dungeonHeaderPopupPositionRaf = null;
        this._dungeonUiActionLocks = /* @__PURE__ */ new Set();
        this._storyModePopupTab = "dungeons";
        this._hpBarUpdateQueue = /* @__PURE__ */ new Set();
        this._hpBarUpdateScheduled = false;
        this._lastHPBarUpdate = {};
      },
      debugLog(...args) {
        if (!args || args.length === 0) return;
        if (this.settings.debug) {
          console.log("[Dungeons]", ...args);
        }
      },
      debugLogOnce(key, ...args) {
        if (!key) return this.debugLog(...args);
        this._debugLogOnceKeys || (this._debugLogOnceKeys = /* @__PURE__ */ new Set());
        if (this._debugLogOnceKeys.size > 5e3) {
          this._debugLogOnceKeys.clear();
        }
        if (this._debugLogOnceKeys.has(key)) return;
        this._debugLogOnceKeys.add(key);
        this.debugLog(...args);
      },
      _setTrackedTimeout(callback, delayMs) {
        const timeoutId = setTimeout(() => {
          this._timeouts.delete(timeoutId);
          callback();
        }, delayMs);
        this._timeouts.add(timeoutId);
        return timeoutId;
      },
      _yieldToEventLoop(delayMs = 0) {
        return new Promise((resolve) => {
          this._setTrackedTimeout(resolve, delayMs);
        });
      },
      _getPluginSafe(name) {
        var _a, _b;
        try {
          if (!BdApi.Plugins.isEnabled(name)) return null;
          const plugin = BdApi.Plugins.get(name);
          if (!(plugin == null ? void 0 : plugin.instance)) {
            (_a = this.debugLogOnce) == null ? void 0 : _a.call(this, `PLUGIN_MISSING:${name}`, "PLUGIN", `Plugin ${name} not available`);
            return null;
          }
          return plugin.instance;
        } catch (e) {
          (_b = this.errorLog) == null ? void 0 : _b.call(this, "PLUGIN", `Failed to get plugin ${name}`, e);
          return null;
        }
      },
      _getShadowSensesDeployedIds() {
        var _a, _b, _c;
        const deployed = /* @__PURE__ */ new Set();
        try {
          const senses = this._getPluginSafe("ShadowSenses");
          if (!senses) return deployed;
          if (typeof senses.getDeployedShadowIds === "function") {
            const ids = senses.getDeployedShadowIds();
            if (ids instanceof Set) {
              ids.forEach((id) => id && deployed.add(String(id)));
              return deployed;
            }
          }
          const deployments = (_b = (_a = senses.deploymentManager) == null ? void 0 : _a.getDeployments) == null ? void 0 : _b.call(_a);
          if (Array.isArray(deployments)) {
            deployments.forEach((entry) => {
              const id = entry == null ? void 0 : entry.shadowId;
              id && deployed.add(String(id));
            });
          }
        } catch (error) {
          (_c = this.errorLog) == null ? void 0 : _c.call(this, "PLUGIN", "Failed to get ShadowSenses deployed IDs", error);
        }
        return deployed;
      },
      _ensureCombatLoop() {
        if (this._combatLoopInterval) return;
        const tick = () => {
          if (!this.started) return;
          if (this._combatLoopInFlight) return;
          if (this.shadowAttackIntervals.size === 0 && this.bossAttackTimers.size === 0 && this.mobAttackTimers.size === 0) {
            this._stopCombatLoop();
            return;
          }
          this._combatLoopInFlight = true;
          Promise.resolve().then(() => this._combatLoopTick()).catch((error) => this.errorLog("CRITICAL", "Combat loop tick error", error)).finally(() => {
            this._combatLoopInFlight = false;
          });
        };
        this._combatLoopInterval = setInterval(tick, this._combatLoopTickMs);
        this._intervals.add(this._combatLoopInterval);
      },
      _stopCombatLoop() {
        if (!this._combatLoopInterval) return;
        clearInterval(this._combatLoopInterval);
        this._intervals.delete(this._combatLoopInterval);
        this._combatLoopInterval = null;
        this._combatLoopInFlight = false;
        this._combatLoopNextAt = 0;
      },
      _ensureMobSpawnLoop() {
        if (this._mobSpawnLoopInterval) return;
        this.settings.debug && console.log(`[Dungeons] MOB_SPAWN_TRACE: _ensureMobSpawnLoop \u2014 STARTING loop (tickMs=${this._mobSpawnLoopTickMs})`);
        const tick = () => {
          if (!this.started) return;
          if (this._mobSpawnLoopInFlight) return;
          const hasWork = this._mobSpawnNextAt && this._mobSpawnNextAt.size > 0 || this._mobSpawnQueueNextAt && this._mobSpawnQueueNextAt.size > 0;
          if (!hasWork) {
            this._stopMobSpawnLoop();
            return;
          }
          const isVisible = this.isWindowVisible();
          this._mobSpawnLoopInFlight = true;
          Promise.resolve().then(() => this._mobSpawnLoopTick(isVisible)).catch((error) => this.errorLog("CRITICAL", "Mob spawn loop tick error", error)).finally(() => {
            this._mobSpawnLoopInFlight = false;
          });
        };
        this._mobSpawnLoopInterval = setInterval(tick, this._mobSpawnLoopTickMs || 300);
        this._intervals.add(this._mobSpawnLoopInterval);
      },
      _stopMobSpawnLoop() {
        if (!this._mobSpawnLoopInterval) return;
        clearInterval(this._mobSpawnLoopInterval);
        this._intervals.delete(this._mobSpawnLoopInterval);
        this._mobSpawnLoopInterval = null;
        this._mobSpawnLoopInFlight = false;
        this._mobSpawnLoopNextAt = 0;
      },
      _computeNextMobSpawnDelayMs(dungeonState) {
        var _a, _b, _c, _d, _e;
        const mobCount = ((_b = (_a = dungeonState == null ? void 0 : dungeonState.mobs) == null ? void 0 : _a.activeMobs) == null ? void 0 : _b.length) || 0;
        const dungeonCapRaw = Number((_c = dungeonState == null ? void 0 : dungeonState.mobs) == null ? void 0 : _c.mobCapacity);
        const mobCap = Number.isFinite(dungeonCapRaw) && dungeonCapRaw > 0 ? Math.max(50, Math.floor(dungeonCapRaw)) : 200;
        const fillRatio = mobCap > 0 ? this.clampNumber(mobCount / mobCap, 0, 1) : 1;
        let baseInterval;
        if (fillRatio < (((_d = this._spawnPhases) == null ? void 0 : _d.rapid) ?? 0.3)) {
          baseInterval = 2500;
        } else if (fillRatio < (((_e = this._spawnPhases) == null ? void 0 : _e.moderate) ?? 0.7)) {
          baseInterval = 4e3 + (fillRatio - 0.3) * 4e3;
        } else {
          baseInterval = 6e3 + (fillRatio - 0.7) * 6667;
        }
        const variance = baseInterval * 0.15;
        return baseInterval - variance + Math.random() * variance * 2;
      },
      _getDesiredMobSpawnTickMs(isVisible = true) {
        var _a;
        if (!isVisible) return 1e3;
        const activeCount = ((_a = this.activeDungeons) == null ? void 0 : _a.size) || 0;
        let base = this._mobSpawnLoopTickMs || 500;
        if (activeCount >= 3) base = 750;
        else if (activeCount >= 2) base = 650;
        const adaptive = this._getAdaptiveLoadState();
        return base + Math.floor(adaptive.tickPenaltyMs * 0.7);
      },
      _getDesiredCombatTickMs(isWindowVisible = true) {
        var _a;
        const activeCount = ((_a = this.activeDungeons) == null ? void 0 : _a.size) || 0;
        let base = this._combatLoopTickMs || 1e3;
        if (!isWindowVisible) base = 2e3;
        else if (activeCount >= 4) base = 1500;
        else if (activeCount >= 2) base = 1250;
        const adaptive = this._getAdaptiveLoadState();
        return base + adaptive.tickPenaltyMs;
      },
      _recordPerfMetric(metricKey, sampleMs, alpha = 0.15) {
        if (!this._perfTelemetry || !Number.isFinite(sampleMs) || sampleMs < 0) return;
        const prev = Number(this._perfTelemetry[metricKey]) || 0;
        if (prev <= 0) {
          this._perfTelemetry[metricKey] = sampleMs;
          return;
        }
        this._perfTelemetry[metricKey] = prev + (sampleMs - prev) * this.clampNumber(alpha, 0.05, 0.5);
      },
      _maybeLogPerfSpike({
        now = Date.now(),
        tickMs = 0,
        desiredTickMs = 0,
        activeDungeonCount = 0,
        processedDungeonCount = 0,
        skippedDungeonCount = 0,
        isWindowVisible = true
      } = {}) {
        if (!this._perfTelemetry || !Number.isFinite(tickMs) || tickMs <= 0) return;
        const targetTickMs = Number.isFinite(desiredTickMs) && desiredTickMs > 0 ? desiredTickMs : this._combatLoopTickMs || 1e3;
        const overshootMs = tickMs - targetTickMs;
        if (overshootMs < 250 && tickMs < 1500) return;
        this._perfTelemetry.combatSpikeCount = (this._perfTelemetry.combatSpikeCount || 0) + 1;
        const severeSpike = overshootMs >= 1e3 || tickMs >= 2200;
        const throttleMs = severeSpike ? 2e4 : 45e3;
        const lastSpikeLogAt = Number(this._perfTelemetry.lastSpikeLogAt) || 0;
        if (now - lastSpikeLogAt < throttleMs) return;
        this._perfTelemetry.lastSpikeLogAt = now;
        const adaptive = this._getAdaptiveLoadState();
        console.warn(
          `[Dungeons] PERF SPIKE tick=${Math.round(tickMs)}ms target=${Math.round(targetTickMs)}ms overshoot=+${Math.round(Math.max(0, overshootMs))}ms active=${activeDungeonCount} processed=${processedDungeonCount} skipped=${skippedDungeonCount} visible=${isWindowVisible ? 1 : 0} ema=${Math.round(adaptive.maxEma)}ms dirty=${this._combatSettingsDirty ? 1 : 0} reason=${this._perfTelemetry.lastCombatDirtyReason || "n/a"} spikes=${this._perfTelemetry.combatSpikeCount}`
        );
      },
      _getAdaptiveLoadState() {
        var _a, _b;
        const combatEma = Number((_a = this._perfTelemetry) == null ? void 0 : _a.combatTickEmaMs) || 0;
        const spawnEma = Number((_b = this._perfTelemetry) == null ? void 0 : _b.mobSpawnTickEmaMs) || 0;
        const maxEma = Math.max(combatEma, spawnEma);
        if (maxEma >= 450) {
          return { tickPenaltyMs: 500, budgetScale: 0.6, maxEma, combatEma, spawnEma };
        }
        if (maxEma >= 300) {
          return { tickPenaltyMs: 300, budgetScale: 0.75, maxEma, combatEma, spawnEma };
        }
        if (maxEma >= 200) {
          return { tickPenaltyMs: 150, budgetScale: 0.9, maxEma, combatEma, spawnEma };
        }
        return { tickPenaltyMs: 0, budgetScale: 1, maxEma, combatEma, spawnEma };
      },
      _isAllocationHardExpired(now = Date.now()) {
        if (!this.allocationCache || !this.allocationCacheTime) return true;
        const hardTtl = Number.isFinite(this._allocationHardRefreshTTL) ? Math.max(3e4, this._allocationHardRefreshTTL) : 12e4;
        return now - this.allocationCacheTime >= hardTtl;
      },
      _hasDeployedDungeonMissingAllocation() {
        var _a, _b;
        for (const [channelKey, dungeon] of this.activeDungeons.entries()) {
          if (!dungeon || dungeon.completed || dungeon.failed || !dungeon.shadowsDeployed) continue;
          if ((dungeon == null ? void 0 : dungeon._deployPendingFullAllocation) === true) continue;
          if ((_b = (_a = this._deployRebalanceInFlight) == null ? void 0 : _a.has) == null ? void 0 : _b.call(_a, channelKey)) continue;
          const assigned = this.shadowAllocations.get(channelKey);
          if (!Array.isArray(assigned) || assigned.length === 0) return true;
        }
        return false;
      },
      _buildRankLookupTables() {
        var _a, _b;
        const { RANK_ORDER } = require_rank_utils();
        const ranks = this.settings.dungeonRanks || RANK_ORDER;
        const n = ranks.length;
        this._flatResCostTable = new Float32Array([5, 8, 12, 18, 25, 35, 50, 70, 85, 95, 120, 150, 200].slice(0, n));
        this._mobStatTable = {
          strength: new Float32Array(n),
          agility: new Float32Array(n),
          intelligence: new Float32Array(n),
          vitality: new Float32Array(n)
        };
        for (let i = 0; i < n; i++) {
          this._mobStatTable.strength[i] = 100 + i * 50 + Math.floor(i * i * 15);
          this._mobStatTable.agility[i] = 80 + i * 40 + Math.floor(i * i * 12);
          this._mobStatTable.intelligence[i] = 60 + i * 30 + Math.floor(i * i * 8);
          this._mobStatTable.vitality[i] = 150 + i * 100 + Math.floor(i * i * 40);
        }
        this._bossHPBonusTable = new Float32Array(n);
        for (let i = 0; i < n; i++) {
          this._bossHPBonusTable[i] = Math.pow(i + 1, 2.5) * 50;
        }
        this._spawnPhases = { rapid: 0.3, moderate: 0.7 };
        (_b = (_a = this._rankStatsCache) == null ? void 0 : _a.clear) == null ? void 0 : _b.call(_a);
      }
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

// src/Dungeons/corpse-tick-pipeline.js
var require_corpse_tick_pipeline = __commonJS({
  "src/Dungeons/corpse-tick-pipeline.js"(exports2, module2) {
    var SLEvents = require_event_bus();
    module2.exports = {
      _addToCorpsePile(channelKey, deadMob, isBoss = false) {
        if (!deadMob) return;
        const dungeon = this.activeDungeons.get(channelKey);
        if (!dungeon) return;
        if (dungeon._isDemonCastle) return;
        if (!dungeon.corpsePile) dungeon.corpsePile = [];
        const baseStats = deadMob.baseStats || {};
        dungeon.corpsePile.push({
          id: deadMob.id,
          rank: deadMob.rank,
          // Keep corpse payload compact and deterministic for large kill counts.
          baseStats: {
            strength: Number(baseStats.strength) || 0,
            agility: Number(baseStats.agility) || 0,
            intelligence: Number(baseStats.intelligence) || 0,
            vitality: Number(baseStats.vitality) || 0,
            perception: Number(baseStats.perception) || 0
          },
          strength: Number(deadMob.strength) || 0,
          isBoss
        });
        if (dungeon.corpsePile.length > 5e3) {
          dungeon.corpsePile = dungeon.corpsePile.slice(-5e3);
        }
      },
      async _processCorpsePile(channelKey, dungeon, pileSnapshot = null) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _i;
        const pile = pileSnapshot || (dungeon == null ? void 0 : dungeon.corpsePile);
        if (!pile || pile.length === 0) {
          this.debugLog(
            "ARISE",
            `Corpse pile EMPTY for ${channelKey} \u2014 no enemies to extract (deployed: ${dungeon == null ? void 0 : dungeon.shadowsDeployed}, mobs killed: ${((_a = dungeon == null ? void 0 : dungeon.mobs) == null ? void 0 : _a.killed) || 0})`
          );
          return { extracted: 0, attempted: 0 };
        }
        const shadowArmy = this.shadowArmy || this.validatePluginReference("ShadowArmy", "storageManager");
        if (!(shadowArmy == null ? void 0 : shadowArmy.attemptDungeonExtraction)) {
          this.debugLog(
            "ARISE",
            `ShadowArmy plugin not available \u2014 ${pile.length} corpses lost (${channelKey})`
          );
          return { extracted: 0, attempted: 0 };
        }
        if (typeof shadowArmy.checkShadowArmyCap === "function") {
          try {
            const capStatus = await shadowArmy.checkShadowArmyCap();
            if (capStatus.atCap) {
              this.debugLog(
                "ARISE",
                `Skipping corpse pile extraction \u2014 shadow army at cap (${capStatus.currentCount}/${capStatus.cap}). ${pile.length} corpses discarded.`
              );
              if (dungeon) dungeon.corpsePile = [];
              return { extracted: 0, attempted: 0 };
            }
          } catch (e) {
            this.debugLog("ARISE", "Cap pre-check failed, proceeding with extraction", e == null ? void 0 : e.message);
          }
        }
        if (!this.shadowArmy || this.shadowArmy._isStopped) {
          this.debugLog("ARISE", `ShadowArmy torn down before extraction could start \u2014 ${pile.length} corpses discarded (${channelKey})`);
          if (dungeon) dungeon.corpsePile = [];
          return { extracted: 0, attempted: 0 };
        }
        const userRank = ((_c = (_b = this.soloLevelingStats) == null ? void 0 : _b.settings) == null ? void 0 : _c.rank) || "E";
        const userLevel = ((_e = (_d = this.soloLevelingStats) == null ? void 0 : _d.settings) == null ? void 0 : _e.level) || 1;
        const userStats = ((_g = (_f = this.soloLevelingStats) == null ? void 0 : _f.getTotalEffectiveStats) == null ? void 0 : _g.call(_f)) || {};
        const beastFamilies = (dungeon == null ? void 0 : dungeon.beastFamilies) || [];
        const total = pile.length;
        let extracted = 0;
        let attempted = 0;
        let bossShadow = null;
        this.settings.debug && console.log(`[Dungeons] \u2694\uFE0F ARISE: Processing corpse pile \u2014 ${total} bodies awaiting extraction in ${channelKey}`);
        if (typeof shadowArmy.bulkDungeonExtraction === "function") {
          try {
            const result = await shadowArmy.bulkDungeonExtraction(
              pile,
              userRank,
              userLevel,
              userStats,
              beastFamilies
            );
            extracted = Number(result == null ? void 0 : result.extracted) || 0;
            attempted = Number(result == null ? void 0 : result.attempted) || 0;
            bossShadow = (result == null ? void 0 : result.bossShadow) || null;
          } catch (error) {
            this.errorLog("Bulk corpse extraction failed; falling back to sequential batches", error);
          }
        }
        if (attempted === 0 && extracted === 0) {
          const BATCH_SIZE = 12;
          for (let i = 0; i < total; i += BATCH_SIZE) {
            if (!this.shadowArmy || this.shadowArmy._isStopped) {
              this.debugLog("ARISE", `ShadowArmy torn down mid-fallback-batch \u2014 ${total - attempted} remaining corpses discarded (${channelKey})`);
              break;
            }
            const batch = pile.slice(i, i + BATCH_SIZE);
            attempted += batch.length;
            const results = await Promise.allSettled(
              batch.map(
                (corpse) => shadowArmy.attemptDungeonExtraction(
                  corpse.id,
                  userRank,
                  userLevel,
                  userStats,
                  corpse.rank,
                  corpse.baseStats,
                  corpse.strength,
                  beastFamilies,
                  corpse.isBoss
                )
              )
            );
            for (let ri = 0; ri < results.length; ri++) {
              const r = results[ri];
              if (r.status === "fulfilled" && ((_h = r.value) == null ? void 0 : _h.success)) {
                extracted++;
                if (!bossShadow && ((_i = batch[ri]) == null ? void 0 : _i.isBoss) && r.value.shadow) {
                  bossShadow = r.value.shadow;
                }
              }
            }
            if (i + BATCH_SIZE < total) {
              await new Promise((r) => setTimeout(r, 1));
            }
          }
        }
        if (dungeon) dungeon.corpsePile = [];
        this.settings.debug && console.log(`[Dungeons] \u2694\uFE0F ARISE COMPLETE: ${extracted}/${attempted} shadows extracted from corpse pile (${channelKey})`);
        if (extracted > 0 && SLEvents) {
          SLEvents.emit("ShadowArmy:batchExtractionComplete", { extracted, total: attempted, channelKey });
        }
        return { extracted, attempted, bossShadow };
      },
      async _mobSpawnLoopTick(isVisible = true) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
        const tickStartedAt = Date.now();
        const now = tickStartedAt;
        const desiredTickMs = this._getDesiredMobSpawnTickMs(isVisible);
        if (this._mobSpawnLoopNextAt && now < this._mobSpawnLoopNextAt) {
          return;
        }
        this._mobSpawnLoopNextAt = now + desiredTickMs;
        const adaptive = this._getAdaptiveLoadState();
        const MAX_QUEUE_FLUSH_PER_TICK = adaptive.maxEma >= 300 ? 1 : 2;
        const MAX_SPAWN_WAVES_PER_TICK = 1;
        try {
          if (this._mobSpawnQueueNextAt && this._mobSpawnQueueNextAt.size > 0) {
            let flushes = 0;
            for (const [channelKey, nextAt] of this._mobSpawnQueueNextAt.entries()) {
              if (flushes >= MAX_QUEUE_FLUSH_PER_TICK) break;
              if (now < nextAt) continue;
              this.settings.debug && console.log(`[Dungeons] MOB_SPAWN_TICK: FLUSHING queue for ${channelKey}, queuedMobs=${((_b = (_a = this._mobSpawnQueue) == null ? void 0 : _a.get(channelKey)) == null ? void 0 : _b.length) || 0}`);
              const queuedRemaining = this.processMobSpawnQueue(channelKey);
              if (queuedRemaining > 0) {
                const retryDelay = 500 + Math.random() * 500;
                this._mobSpawnQueueNextAt.set(channelKey, now + retryDelay);
              } else {
                this._mobSpawnQueueNextAt.delete(channelKey);
              }
              flushes++;
            }
          }
          if (this._mobSpawnNextAt && this._mobSpawnNextAt.size > 0) {
            let spawns = 0;
            for (const [channelKey, nextAt] of this._mobSpawnNextAt.entries()) {
              if (spawns >= MAX_SPAWN_WAVES_PER_TICK) break;
              if (now < nextAt) continue;
              const dungeon = this._getActiveDungeon(channelKey);
              if (!dungeon) {
                this.settings.debug && console.log(`[Dungeons] MOB_SPAWN_TICK: NO DUNGEON for ${channelKey} \u2014 cleaning up`);
                this._mobSpawnNextAt.delete(channelKey);
                (_d = (_c = this._mobSpawnQueueNextAt) == null ? void 0 : _c.delete) == null ? void 0 : _d.call(_c, channelKey);
                (_f = (_e = this._mobSpawnQueue) == null ? void 0 : _e.delete) == null ? void 0 : _f.call(_e, channelKey);
                continue;
              }
              const _preCheckCap = this._getMobActiveCap(dungeon);
              let _preCheckAlive = 0;
              const _pcCache = this._mobCleanupCache.get(channelKey);
              if (_pcCache && now - _pcCache.time < 1e3) {
                _preCheckAlive = _pcCache.alive || 0;
              } else {
                const _pcMobs = (_g = dungeon.mobs) == null ? void 0 : _g.activeMobs;
                if (_pcMobs) for (let _i2 = 0; _i2 < _pcMobs.length; _i2++) ((_h = _pcMobs[_i2]) == null ? void 0 : _h.hp) > 0 && _preCheckAlive++;
              }
              if (_preCheckAlive >= _preCheckCap) {
                this._mobSpawnNextAt.set(channelKey, now + 2500);
                continue;
              }
              this.settings.debug && console.log(`[Dungeons] MOB_SPAWN_TICK: SPAWNING wave for ${channelKey}, boss.hp=${(_i = dungeon.boss) == null ? void 0 : _i.hp}, activeMobs=${_preCheckAlive}/${_preCheckCap}, total=${((_j = dungeon.mobs) == null ? void 0 : _j.total) || 0}`);
              this.spawnMobs(channelKey);
              const nextDelay = this._computeNextMobSpawnDelayMs(dungeon);
              this._mobSpawnNextAt.set(channelKey, now + nextDelay);
              spawns++;
            }
          }
          const hasWork = this._mobSpawnNextAt && this._mobSpawnNextAt.size > 0 || this._mobSpawnQueueNextAt && this._mobSpawnQueueNextAt.size > 0;
          !hasWork && this._stopMobSpawnLoop();
        } finally {
          this._recordPerfMetric("mobSpawnTickEmaMs", Date.now() - tickStartedAt, 0.2);
        }
      },
      async _combatLoopTick() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m;
        const now = Date.now();
        const isWindowVisible = this.isWindowVisible();
        const desiredTickMs = this._getDesiredCombatTickMs(isWindowVisible);
        let activeDungeonCount = ((_a = this.activeDungeons) == null ? void 0 : _a.size) || 0;
        let processedDungeonCount = 0;
        let skippedDungeonCount = 0;
        if (this._combatLoopNextAt && now < this._combatLoopNextAt) {
          return;
        }
        this._combatLoopNextAt = now + desiredTickMs;
        this._combatTickCount = ((this._combatTickCount || 0) + 1) % 1e3;
        const tickStartedAt = now;
        try {
          if (isWindowVisible) {
            this.syncHPAndManaFromStats();
          }
          activeDungeonCount = Math.max(1, this.activeDungeons.size);
          const adaptive = this._getAdaptiveLoadState();
          const combatEntries = [];
          for (const [channelKey, dungeon] of this.activeDungeons.entries()) {
            if (!dungeon || dungeon.completed || dungeon.failed || dungeon._completing) {
              this.shadowAttackIntervals.has(channelKey) && this.stopShadowAttacks(channelKey);
              this.bossAttackTimers.has(channelKey) && this.stopBossAttacks(channelKey);
              this.mobAttackTimers.has(channelKey) && this.stopMobAttacks(channelKey);
              continue;
            }
            if (!dungeon.shadowsDeployed) {
              this.shadowAttackIntervals.has(channelKey) && this.stopShadowAttacks(channelKey);
              this.bossAttackTimers.has(channelKey) && this.stopBossAttacks(channelKey);
              this.mobAttackTimers.has(channelKey) && this.stopMobAttacks(channelKey);
              continue;
            }
            combatEntries.push([channelKey, dungeon]);
          }
          const schedulableDungeonCount = combatEntries.length;
          const processingCap = this._getCombatProcessingCap(
            schedulableDungeonCount,
            adaptive,
            isWindowVisible
          );
          const { selectedEntries, skippedCount } = this._selectCombatDungeonBatch(
            combatEntries,
            processingCap
          );
          processedDungeonCount = selectedEntries.length;
          skippedDungeonCount = skippedCount;
          if (this._perfTelemetry) {
            this._perfTelemetry.lastProcessedDungeonCount = processedDungeonCount;
            this._perfTelemetry.lastSkippedDungeonCount = skippedDungeonCount;
          }
          const configuredShadowBudget = Number.isFinite((_b = this.settings) == null ? void 0 : _b.maxSimulatedShadowsPerTick) && this.settings.maxSimulatedShadowsPerTick > 0 ? this.settings.maxSimulatedShadowsPerTick : 500;
          const pressureScale = activeDungeonCount >= 4 ? 0.65 : activeDungeonCount >= 2 ? 0.8 : 1;
          const visibilityScale = isWindowVisible ? 1 : 0.65;
          const adaptiveScale = this.clampNumber((adaptive == null ? void 0 : adaptive.budgetScale) ?? 1, 0.5, 1);
          const globalShadowBudget = Math.max(160, Math.floor(configuredShadowBudget * pressureScale * visibilityScale * adaptiveScale));
          const globalMobBudget = Math.max(320, Math.floor(800 * pressureScale * visibilityScale * adaptiveScale));
          const budgetDivisor = Math.max(1, processedDungeonCount);
          const perDungeonMobBudget = Math.max(50, Math.floor(globalMobBudget / budgetDivisor));
          const perDungeonShadowBudget = Math.max(100, Math.floor(globalShadowBudget / budgetDivisor));
          if (this.settings.debug && adaptive.maxEma >= 200 && (!((_c = this._perfTelemetry) == null ? void 0 : _c.lastAutotuneLogAt) || now - this._perfTelemetry.lastAutotuneLogAt >= 3e4)) {
            this._perfTelemetry.lastAutotuneLogAt = now;
            console.log(
              `[Dungeons] PERF AUTOTUNE combatEma=${Math.round(adaptive.combatEma)}ms spawnEma=${Math.round(adaptive.spawnEma)}ms tick=${desiredTickMs}ms scale=${adaptiveScale.toFixed(2)} budget=${globalShadowBudget}/${globalMobBudget}`
            );
          }
          if (this.settings.debug && skippedDungeonCount > 0 && adaptive.maxEma >= 200 && (!((_d = this._perfTelemetry) == null ? void 0 : _d.lastSchedulerLogAt) || now - this._perfTelemetry.lastSchedulerLogAt >= 3e4)) {
            this._perfTelemetry.lastSchedulerLogAt = now;
            console.log(
              `[Dungeons] PERF SCHEDULER active=${activeDungeonCount} scheduled=${processedDungeonCount}/${schedulableDungeonCount} skipped=${skippedDungeonCount} cap=${processingCap} ema=${Math.round(adaptive.maxEma)}ms`
            );
          }
          const forceRefresh = this._allocationDirty || this._isAllocationHardExpired(now) || this._hasDeployedDungeonMissingAllocation();
          if (forceRefresh && processedDungeonCount > 0) {
            await this.preSplitShadowArmy();
          }
          this._tickAllocationLock = false;
          if (processedDungeonCount > 1) {
            this._tickManaPool = this.settings.userMana || 0;
            this._tickManaBudgetPerDungeon = Math.floor(this._tickManaPool / processedDungeonCount);
            this._tickManaSpent = 0;
          } else {
            this._tickManaPool = void 0;
            this._tickManaBudgetPerDungeon = void 0;
          }
          const dungeonPromises = [];
          let dungeonIndex = 0;
          for (const [channelKey, dungeon] of selectedEntries) {
            dungeonPromises.push(this._processDungeonCombatTick(
              channelKey,
              dungeon,
              now,
              isWindowVisible,
              perDungeonMobBudget,
              perDungeonShadowBudget,
              dungeonIndex
            ));
            dungeonIndex++;
          }
          if (dungeonPromises.length > 0) {
            await Promise.all(dungeonPromises);
          }
          if (this._tickManaBudgetPerDungeon !== void 0) {
            let totalManaUsed = 0;
            for (const [, dungeon] of this.activeDungeons.entries()) {
              if (dungeon._tickManaUsed > 0) {
                totalManaUsed += dungeon._tickManaUsed;
                dungeon._tickManaUsed = 0;
              }
            }
            if (totalManaUsed > 0) {
              this.settings.userMana = Math.max(0, this._tickManaPool - totalManaUsed);
              this.pushManaToStats(false);
            }
            this._tickManaBudgetPerDungeon = void 0;
            this._tickManaPool = void 0;
          }
          if (this._combatTickCount % 30 === 0) {
            for (const [channelKey, dungeon] of this.activeDungeons.entries()) {
              if (!dungeon || dungeon.completed || dungeon.failed || !dungeon.shadowsDeployed) continue;
              const deadSet = this.deadShadows.get(channelKey);
              const permanentDeaths = (deadSet == null ? void 0 : deadSet.size) || 0;
              const totalRevives = dungeon.shadowRevives || 0;
              const totalDeaths = permanentDeaths + totalRevives;
              const assigned = ((_e = this.shadowAllocations.get(channelKey)) == null ? void 0 : _e.length) || 0;
              const alive = assigned - permanentDeaths;
              this.settings.debug && console.log(
                `[Dungeons] \u{1F4CA} COMBAT STATUS: ${dungeon.name} (${dungeon.rank}) | Mobs killed: ${((_f = dungeon.mobs) == null ? void 0 : _f.killed) || 0}/${((_g = dungeon.mobs) == null ? void 0 : _g.targetCount) || "?"} | Boss HP: ${((_i = (_h = dungeon.boss) == null ? void 0 : _h.hp) == null ? void 0 : _i.toLocaleString()) || 0}/${((_k = (_j = dungeon.boss) == null ? void 0 : _j.maxHp) == null ? void 0 : _k.toLocaleString()) || "?"} | Shadows: ${alive}/${assigned} alive | Deaths: ${totalDeaths} total (${permanentDeaths} still dead, ${totalRevives} resurrected)`
              );
            }
          }
        } finally {
          const tickEndedAt = Date.now();
          const tickMs = tickEndedAt - tickStartedAt;
          this._recordPerfMetric("combatTickEmaMs", tickMs, 0.15);
          (_l = this.flushCombatSettingsDirty) == null ? void 0 : _l.call(this, tickEndedAt);
          (_m = this._maybeLogPerfSpike) == null ? void 0 : _m.call(this, {
            now: tickEndedAt,
            tickMs,
            desiredTickMs,
            activeDungeonCount,
            processedDungeonCount,
            skippedDungeonCount,
            isWindowVisible
          });
        }
      },
      _getCombatProcessingCap(schedulableDungeonCount, adaptiveState = null, isWindowVisible = true) {
        const total = Number.isFinite(schedulableDungeonCount) ? Math.max(0, Math.floor(schedulableDungeonCount)) : 0;
        if (total <= 0) return 0;
        if (total <= 3) return total;
        const maxEma = Number(adaptiveState == null ? void 0 : adaptiveState.maxEma) || 0;
        let cap;
        if (!isWindowVisible) cap = 4;
        else if (maxEma >= 450) cap = 4;
        else if (maxEma >= 300) cap = 6;
        else if (maxEma >= 200) cap = 8;
        else cap = 12;
        return this.clampNumber(cap, 1, total);
      },
      _selectCombatDungeonBatch(entries, cap) {
        var _a;
        if (!Array.isArray(entries) || entries.length === 0) {
          return { selectedEntries: [], skippedCount: 0 };
        }
        const total = entries.length;
        const normalizedCap = this.clampNumber(Math.floor(cap || total), 1, total);
        if (total <= normalizedCap) {
          return { selectedEntries: entries, skippedCount: 0 };
        }
        const selectedEntries = [];
        const selectedKeys = /* @__PURE__ */ new Set();
        const addEntry = (entry) => {
          if (!entry || !Array.isArray(entry) || entry.length < 2) return false;
          const channelKey = entry[0];
          if (!channelKey || selectedKeys.has(channelKey)) return false;
          selectedEntries.push(entry);
          selectedKeys.add(channelKey);
          return true;
        };
        const priorityKeys = [
          ((_a = this.settings) == null ? void 0 : _a.userActiveDungeon) || null,
          this.currentChannelKey || null
        ].filter(Boolean);
        for (const key of priorityKeys) {
          if (selectedEntries.length >= normalizedCap) break;
          const entry = entries.find(([channelKey]) => channelKey === key);
          addEntry(entry);
        }
        let cursor = Number.isFinite(this._combatRoundRobinCursor) ? this._combatRoundRobinCursor : 0;
        cursor = (cursor % total + total) % total;
        let scanned = 0;
        while (selectedEntries.length < normalizedCap && scanned < total) {
          addEntry(entries[cursor]);
          cursor = (cursor + 1) % total;
          scanned++;
        }
        this._combatRoundRobinCursor = cursor;
        return { selectedEntries, skippedCount: Math.max(0, total - selectedEntries.length) };
      },
      async _processDungeonCombatTick(channelKey, dungeon, now, isWindowVisible, mobBudget, shadowBudget = 500, dungeonIndex = 0) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m;
        try {
          if (!dungeon.shadowsDeployed) return;
          const isActive = this.isActiveDungeon(channelKey);
          const cadenceTick = (this._combatTickCount + dungeonIndex) % 5 === 0;
          const needsDeployGuard = !dungeon._deploying && cadenceTick && ((_a = dungeon.boss) == null ? void 0 : _a.hp) > 0;
          const needsUiGuard = isActive && cadenceTick;
          const hasShadowTimer = this.shadowAttackIntervals.has(channelKey);
          const shadowActiveInterval = this._shadowActiveIntervalMs.get(channelKey) || 3e3;
          const shadowBackgroundInterval = this._shadowBackgroundIntervalMs.get(channelKey) || 5e3;
          const shadowIntervalTime = isActive ? shadowActiveInterval : shadowBackgroundInterval;
          const shadowLastTime = hasShadowTimer ? this._lastShadowAttackTime.get(channelKey) || now : now;
          const shadowElapsed = now - shadowLastTime;
          const shadowDue = hasShadowTimer && shadowElapsed >= shadowIntervalTime;
          const hasBossTimer = this.bossAttackTimers.has(channelKey);
          const bossActiveInterval = 1e3;
          const bossBackgroundInterval = this._bossBackgroundIntervalMs.get(channelKey) || 5e3;
          const bossIntervalTime = isActive ? bossActiveInterval : bossBackgroundInterval;
          const bossLastTime = hasBossTimer ? this._lastBossAttackTime.get(channelKey) || now : now;
          const bossElapsed = now - bossLastTime;
          const bossDue = hasBossTimer && ((_b = dungeon.boss) == null ? void 0 : _b.hp) > 0 && bossElapsed >= bossIntervalTime;
          const hasMobTimer = this.mobAttackTimers.has(channelKey);
          const mobActiveInterval = 1e3;
          const mobBackgroundInterval = this._mobBackgroundIntervalMs.get(channelKey) || 5e3;
          const mobIntervalTime = isActive ? mobActiveInterval : mobBackgroundInterval;
          const mobLastTime = hasMobTimer ? this._lastMobAttackTime.get(channelKey) || now : now;
          const mobElapsed = now - mobLastTime;
          const mobDue = hasMobTimer && mobElapsed >= mobIntervalTime;
          const statusDue = this.isCombatStatusTickDue(channelKey, now);
          const hasDots = dungeon.activeDots && Object.keys(dungeon.activeDots).length > 0;
          if (!needsDeployGuard && !needsUiGuard && !shadowDue && !bossDue && !mobDue && !statusDue && !hasDots) return;
          if (needsUiGuard) {
            const hpBar = this.bossHPBars.get(channelKey);
            if (hpBar && !hpBar.isConnected) {
              this.bossHPBars.delete(channelKey);
              (_d = (_c = this._bossBarCache) == null ? void 0 : _c.delete) == null ? void 0 : _d.call(_c, channelKey);
              this.queueHPBarUpdate(channelKey);
            }
            const cachedAriseBtn = (_e = this._ariseButtonRefs) == null ? void 0 : _e.get(channelKey);
            if (cachedAriseBtn && !cachedAriseBtn.isConnected) {
              this._ariseButtonRefs.delete(channelKey);
              this.defeatedBosses.has(channelKey) && this.showAriseButton(channelKey);
            }
          }
          if (needsDeployGuard) {
            const liveMobs = this._countLiveMobs(dungeon);
            const hasSpawnScheduled = this._mobSpawnNextAt.has(channelKey);
            const deployAge = dungeon.deployedAt ? now - dungeon.deployedAt : 0;
            if (liveMobs === 0 && !hasSpawnScheduled && deployAge > 5e3) {
              this._logSpawnPipelineGuard(
                channelKey,
                `stuck deploy heal: "${dungeon.name}" deployed ${Math.floor(deployAge / 1e3)}s ago with 0 mobs and no spawn schedule`
              );
              this.ensureDeployedSpawnPipeline(channelKey, "stuck_deploy_heal");
            }
          }
          if (dungeon.activeDots && Object.keys(dungeon.activeDots).length > 0) {
            this._processDotTicks(channelKey, dungeon, now);
          }
          if (statusDue) {
            await this.processCombatStatusEffects(channelKey, dungeon, now);
            if (!this._getActiveDungeon(channelKey)) return;
          }
          if (hasShadowTimer) {
            if ((this._combatTickCount + dungeonIndex) % 10 === 0) {
              const allocCount = (this.shadowAllocations.get(channelKey) || []).length;
              const mobCount = ((_g = (_f = dungeon.mobs) == null ? void 0 : _f.activeMobs) == null ? void 0 : _g.length) || 0;
              const bossHp = ((_h = dungeon.boss) == null ? void 0 : _h.hp) ?? "N/A";
              this.settings.debug && console.log(`[Dungeons] COMBAT_TRACE: Tick #${this._combatTickCount} \u2014 ch=${channelKey.slice(-8)}, shadows=${allocCount}, mobs=${mobCount}, bossHP=${bossHp}, elapsed=${shadowElapsed}ms, willFire=${shadowDue}`);
            }
            if (shadowDue) {
              const cyclesToProcess = isActive ? 1 : Math.max(1, Math.floor(shadowElapsed / shadowActiveInterval));
              const preAttackMobs = ((_j = (_i = dungeon.mobs) == null ? void 0 : _i.activeMobs) == null ? void 0 : _j.length) || 0;
              await this.processShadowAttacks(channelKey, cyclesToProcess, isWindowVisible, shadowBudget);
              const postAttackMobs = ((_l = (_k = dungeon.mobs) == null ? void 0 : _k.activeMobs) == null ? void 0 : _l.length) || 0;
              this._lastShadowAttackTime.set(channelKey, now);
              this.settings.debug && console.log(`[Dungeons] COMBAT_MOB_TRACE: ch=${channelKey.slice(-8)}, isActive=${isActive}, mobsBefore=${preAttackMobs}, mobsAfter=${postAttackMobs}, bossHP=${(_m = dungeon.boss) == null ? void 0 : _m.hp}, elapsed=${shadowElapsed}ms`);
              isActive && this.queueHPBarUpdate(channelKey);
            }
          }
          let _tickShadowByIdMap = null;
          const getTickShadowByIdMap = () => {
            if (_tickShadowByIdMap) return _tickShadowByIdMap;
            const tickAssigned = this.shadowAllocations.get(channelKey);
            if (!tickAssigned || tickAssigned.length === 0) return null;
            _tickShadowByIdMap = new Map(tickAssigned.map((s) => [this.getShadowIdValue(s), s]));
            return _tickShadowByIdMap;
          };
          if (bossDue) {
            const cyclesToProcess = isActive ? 1 : Math.max(1, Math.floor(bossElapsed / bossActiveInterval));
            await this.processBossAttacks(
              channelKey,
              cyclesToProcess,
              isWindowVisible,
              getTickShadowByIdMap()
            );
            this._lastBossAttackTime.set(channelKey, now);
          }
          if (mobDue) {
            const cyclesToProcess = isActive ? 1 : Math.max(1, Math.floor(mobElapsed / mobActiveInterval));
            await this.processMobAttacks(
              channelKey,
              cyclesToProcess,
              isWindowVisible,
              mobBudget,
              getTickShadowByIdMap()
            );
            this._lastMobAttackTime.set(channelKey, now);
          }
          this._applyShadowHealPass(channelKey, dungeon);
          this._processWarfrontTick(channelKey, dungeon, now);
        } catch (error) {
          this.errorLog("CRITICAL", "Error in parallel dungeon combat tick", { channelKey, error });
        }
      },
      errorLog(...args) {
        const first = args[0];
        const isBooleanForce = typeof first === "boolean";
        const tag = !isBooleanForce && typeof first === "string" && args.length > 1 ? first : null;
        const force = isBooleanForce ? first : tag === "CRITICAL";
        const payload = isBooleanForce ? args.slice(1) : tag ? args.slice(1) : args;
        const now = Date.now();
        const throttleMs = 3e4;
        this._errorLogLastAt || (this._errorLogLastAt = /* @__PURE__ */ new Map());
        const keyHead = String((payload == null ? void 0 : payload[0]) ?? "UNKNOWN");
        const key = tag ? `TAG:${tag}:${keyHead}` : `MSG:${keyHead}`;
        const lastAt = this._errorLogLastAt.get(key) || 0;
        const shouldLog = force || now - lastAt >= throttleMs;
        if (!shouldLog) return;
        this._errorLogLastAt.set(key, now);
        const prefix = tag ? `[Dungeons][${tag}]` : "[Dungeons]";
        console.error(prefix, ...payload);
      }
    };
  }
});

// src/shared/plugin-bridge.js
var require_plugin_bridge = __commonJS({
  "src/shared/plugin-bridge.js"(exports2, module2) {
    var _BRIDGE_TTL_MS = 3e3;
    var _instanceCache = /* @__PURE__ */ new Map();
    function getPluginInstance(pluginName) {
      var _a;
      const now = Date.now();
      const cached = _instanceCache.get(pluginName);
      if (cached && now - cached.ts < _BRIDGE_TTL_MS) {
        const inst = cached.instance;
        if (!inst || !(inst._stopped || inst._isStopped)) return inst;
      }
      let instance = null;
      try {
        if (BdApi.Plugins.isEnabled(pluginName)) {
          instance = ((_a = BdApi.Plugins.get(pluginName)) == null ? void 0 : _a.instance) || null;
        }
      } catch (_) {
        instance = null;
      }
      _instanceCache.set(pluginName, { instance, ts: now });
      return instance;
    }
    function invalidatePluginInstance(pluginName) {
      if (pluginName) _instanceCache.delete(pluginName);
      else _instanceCache.clear();
    }
    function getSkillTreeLevel(skillId) {
      try {
        const instance = getPluginInstance("SkillTree");
        if (!instance || typeof instance.getSkillLevel !== "function") return 0;
        return Number(instance.getSkillLevel(skillId)) || 0;
      } catch (_) {
        return 0;
      }
    }
    function getSoloLevelingData() {
      try {
        const instance = getPluginInstance("SoloLevelingStats");
        if (!instance) return null;
        if (typeof instance.getPublicAPI === "function") {
          return instance.getPublicAPI() || null;
        }
        const s = instance.settings;
        if (!s) return null;
        return { ...s, stats: { ...s.stats || {} } };
      } catch (_) {
        return null;
      }
    }
    module2.exports = { getPluginInstance, getSkillTreeLevel, getSoloLevelingData, invalidatePluginInstance };
  }
});

// src/Dungeons/lifecycle.js
var require_lifecycle = __commonJS({
  "src/Dungeons/lifecycle.js"(exports2, module2) {
    var SLEvents = require_event_bus();
    var { getPluginInstance } = require_plugin_bridge();
    module2.exports = {
      async start() {
        var _a, _b, _c, _d;
        if (this.started) {
          await this.stop();
        }
        this.started = true;
        const sessionToken = ++this._sessionToken;
        this.observerStartTime = Date.now();
        if (this.saveManager) {
          try {
            await this.saveManager.init();
            this.debugLog("START", "UnifiedSaveManager initialized (IndexedDB)");
          } catch (error) {
            this.errorLog("START", "Failed to initialize UnifiedSaveManager", error);
            this.saveManager = null;
          }
        }
        await this.loadSettings();
        this._buildRankLookupTables();
        this.injectCSS();
        this.startSettingsLayerTag();
        this.installDelegatedUiHandlers();
        this.loadPluginReferences();
        await this.initStorage();
        if (this._sessionToken !== sessionToken) return;
        this._recalculateManaTimeout = this._setTrackedTimeout(async () => {
          await this.recalculateUserMana();
        }, 2e3);
        this._setTrackedTimeout(() => {
          if (!this.toasts) this.loadPluginReferences();
        }, 1e3);
        this._setTrackedTimeout(() => {
          if (!this.toasts) this.loadPluginReferences();
        }, 3e3);
        this.startMessageObserver();
        this.startDungeonCleanupLoop();
        await this.restoreActiveDungeons();
        if (this._sessionToken !== sessionToken) return;
        this.validateActiveDungeonStatus();
        if (typeof this.initStoryMode === "function") {
          try {
            await this.initStoryMode();
          } catch (e) {
            (_a = this.errorLog) == null ? void 0 : _a.call(this, "STORY", "initStoryMode failed", e);
          }
        }
        this.setupChannelWatcher();
        (_b = this.startDungeonHeaderWidget) == null ? void 0 : _b.call(this);
        this._setTrackedTimeout(() => {
          this._preWarmShadowCache().catch(() => {
          });
        }, 3e3);
        this.startVisibilityTracking();
        this.startHPBarRestoration();
        this.startRegeneration();
        this.gcInterval = setInterval(() => {
          if (document.hidden) return;
          this.triggerGarbageCollection("periodic");
        }, 3e5);
        this._intervals.add(this.gcInterval);
        if (this._pluginToggleHandler && typeof ((_c = BdApi == null ? void 0 : BdApi.Events) == null ? void 0 : _c.off) === "function") {
          BdApi.Events.off("plugin-loaded", this._pluginToggleHandler);
          BdApi.Events.off("plugin-unloaded", this._pluginToggleHandler);
        }
        this._pluginToggleHandler = () => {
          var _a2;
          if (this._cache) {
            this._cache.pluginInstances = {};
            this._cache.pluginInstancesTime = {};
          }
          if (!((_a2 = this.soloLevelingStats) == null ? void 0 : _a2.settings)) {
            this.soloLevelingStats = this.validatePluginReference("SoloLevelingStats", "settings");
          }
          const saInstance = getPluginInstance("ShadowArmy");
          if (!saInstance) {
            this.shadowArmy = null;
            return;
          }
          if (!this.shadowArmy || this.shadowArmy !== saInstance) {
            this.shadowArmy = this.validatePluginReference("ShadowArmy", "storageManager");
            if (this.shadowArmy) {
              this.invalidateShadowCountCache();
              this.invalidateShadowsCache();
            }
          }
        };
        if (typeof ((_d = BdApi == null ? void 0 : BdApi.Events) == null ? void 0 : _d.on) === "function") {
          BdApi.Events.on("plugin-loaded", this._pluginToggleHandler);
          BdApi.Events.on("plugin-unloaded", this._pluginToggleHandler);
        }
      },
      async stop() {
        this.started = false;
        this.removeDelegatedUiHandlers();
        this.stopSettingsLayerTag();
        this._stopRuntimePipelines();
        this._clearStopCachesAndState();
        this._cleanupUiAndStyleStateOnStop();
        this._cleanupTrackedResourcesOnStop();
        await this._flushPendingMobWritesOnStop();
      },
      _stopRuntimePipelines() {
        var _a;
        this.stopRegeneration();
        if (this._recalculateManaTimeout) {
          clearTimeout(this._recalculateManaTimeout);
          this._timeouts.delete(this._recalculateManaTimeout);
          this._recalculateManaTimeout = null;
        }
        this.stopMessageObserver();
        this.stopAllShadowAttacks();
        this.stopAllBossAttacks();
        this.stopAllMobAttacks();
        this._stopCombatLoop();
        this.stopAllDungeonCleanup();
        this.removeAllIndicators();
        this.removeAllBossHPBars();
        (_a = this.stopDungeonHeaderWidget) == null ? void 0 : _a.call(this);
        if (this.channelLocks) {
          this.debugLog(`Releasing ${this.channelLocks.size} channel locks on plugin stop`);
          this.channelLocks.clear();
        }
        this._intervals.forEach((intervalId) => clearInterval(intervalId));
        this._intervals.clear();
        if (this._bossBarLayoutFrame) {
          cancelAnimationFrame(this._bossBarLayoutFrame);
          this._bossBarLayoutFrame = null;
        }
        this.stopHPBarRestoration();
        this.stopVisibilityTracking();
      },
      _clearStopCachesAndState() {
        var _a, _b, _c;
        if (this._cache) {
          this._cache.pluginInstances = {};
          this._cache.pluginInstancesTime = {};
          this._cache.userEffectiveStats = null;
          this._cache.userEffectiveStatsTime = 0;
        }
        if (this.gcInterval) {
          clearInterval(this.gcInterval);
          this.gcInterval = null;
        }
        if (this.shadowArmyCountCache) {
          this.shadowArmyCountCache.clear();
        }
        if (this._mobCapWarningShown) {
          this._mobCapWarningShown = {};
        }
        this._storyModeActive = false;
        this._demonCastle = null;
        this._dcPermits = 0;
        this._dcPermitsPendingFlush = 0;
        this.invalidateShadowCountCache();
        this.invalidateShadowsCache();
        if (this._shadowStatsCache) this._shadowStatsCache.clear();
        if (this._personalityCache) this._personalityCache.clear();
        if (this._memberWidthCache) this._memberWidthCache.clear();
        if (this._containerCache) this._containerCache.clear();
        if (this._mobSpawnQueue) this._mobSpawnQueue.clear();
        if (this.extractionEvents) this.extractionEvents.clear();
        if (this._mobGenerationCache) this._mobGenerationCache.clear();
        if (this._dungeonUiActionLocks) this._dungeonUiActionLocks.clear();
        (_a = this.clearCombatStatusState) == null ? void 0 : _a.call(this);
        if (this._pluginToggleHandler) {
          if (typeof ((_b = BdApi == null ? void 0 : BdApi.Events) == null ? void 0 : _b.off) === "function") {
            BdApi.Events.off("plugin-loaded", this._pluginToggleHandler);
            BdApi.Events.off("plugin-unloaded", this._pluginToggleHandler);
          }
          this._pluginToggleHandler = null;
        }
        if (this._shadowExtractedListener) {
          SLEvents.off("ShadowArmy:shadowExtracted", this._shadowExtractedListener);
          if (typeof document.removeEventListener === "function") {
            document.removeEventListener("shadowExtracted", this._shadowExtractedListener);
          }
          this._shadowExtractedListener = null;
        }
        if (this.deadShadows) this.deadShadows.clear();
        if (this._roleCombatStates) this._roleCombatStates.clear();
        if (this.defeatedBosses) this.defeatedBosses.clear();
        if (this.shadowAllocations) this.shadowAllocations.clear();
        if (this._pendingDungeonMobXPByBatch) this._pendingDungeonMobXPByBatch.clear();
        if (this._pendingDungeonMobKillsByBatch) this._pendingDungeonMobKillsByBatch.clear();
        if (this._deployRebalanceInFlight) this._deployRebalanceInFlight.clear();
        if (this._mobContributionMissLogState) this._mobContributionMissLogState.clear();
        this.allocationCache = null;
        this.allocationCacheTime = null;
        this._allocationSortedShadowsCache = null;
        this._allocationSortedShadowsCacheTime = null;
        this._allocationScoreCache = null;
        this._deployStarterPoolCache = null;
        this._deployStarterPoolCacheTime = null;
        this._deployStarterPoolCacheRank = null;
        this._deployStarterWarmInFlight = null;
        this._allocationDirty = true;
        this._allocationDirtyReason = "stop";
        this._allocationShadowSetDirty = true;
        this._restoringDungeons = false;
        if (this._lastShadowAttackTime) this._lastShadowAttackTime.clear();
        if (this._lastBossAttackTime) this._lastBossAttackTime.clear();
        if (this._lastMobAttackTime) this._lastMobAttackTime.clear();
        if (this._dungeonSaveTimers) {
          this._dungeonSaveTimers.forEach((timerId) => clearTimeout(timerId));
          this._dungeonSaveTimers.clear();
        }
        if (this._guildChannelCache) this._guildChannelCache.clear();
        if (this._spawnableChannelCache) this._spawnableChannelCache.clear();
        if (this.processedMessageIds) this.processedMessageIds.clear();
        if (this._saveSettingsTimer) {
          this._timeouts.delete(this._saveSettingsTimer);
          clearTimeout(this._saveSettingsTimer);
          this._saveSettingsTimer = null;
        }
        this.hiddenComments.forEach((_, channelKey) => {
          this.showChannelHeaderComments(channelKey);
        });
        this.hiddenComments.clear();
        (_c = this.stopChannelWatcher) == null ? void 0 : _c.call(this);
        this.currentChannelKey = null;
        if (this._hpBarUpdateQueue) this._hpBarUpdateQueue.clear();
        if (this._hpBarUpdateTimer) {
          this._timeouts.delete(this._hpBarUpdateTimer);
          clearTimeout(this._hpBarUpdateTimer);
          this._hpBarUpdateTimer = null;
        }
        this._hpBarUpdateScheduled = false;
        this._lastHPBarUpdate = {};
        this._settingsLayerOpenCache = null;
      },
      _cleanupUiAndStyleStateOnStop() {
        this.cleanupAllCSS();
        this.saveSettings(true);
      },
      _cleanupTrackedResourcesOnStop() {
        this._listeners.forEach((value, key) => {
          if (value instanceof Set) {
            value.forEach((handler) => {
              if (key === "popstate") {
                window.removeEventListener(key, handler);
              } else {
                document.removeEventListener(key, handler);
              }
            });
          } else if (value && typeof value === "object" && value.handler) {
            const target = value.target || document;
            target.removeEventListener(value.event || key, value.handler, !!value.capture);
          }
        });
        this._listeners.clear();
        this._observers.forEach((observer) => observer.disconnect());
        this._observers.clear();
        this._timeouts.forEach((timeoutId) => clearTimeout(timeoutId));
        this._timeouts.clear();
        if (this._popstateHandler) {
          window.removeEventListener("popstate", this._popstateHandler);
          this._popstateHandler = null;
        }
        if (this._onStatsChangedUnsubscribe && typeof this._onStatsChangedUnsubscribe === "function") {
          this._onStatsChangedUnsubscribe();
          this._onStatsChangedUnsubscribe = null;
        }
      },
      async _flushPendingMobWritesOnStop() {
        var _a, _b, _c, _d;
        if (this.storageManager && this.activeDungeons) {
          await Promise.all(
            Array.from(this.activeDungeons.values()).map(
              (dungeon) => this.storageManager.saveDungeon(dungeon).catch(
                (err) => this.errorLog("STOP", "Failed to flush active dungeon before storage close", err)
              )
            )
          );
        }
        (_b = (_a = this.storageManager) == null ? void 0 : _a.close) == null ? void 0 : _b.call(_a);
        (_d = (_c = this.mobBossStorageManager) == null ? void 0 : _c.close) == null ? void 0 : _d.call(_c);
      }
    };
  }
});

// src/shared/navigation.js
var require_navigation = __commonJS({
  "src/shared/navigation.js"(exports2, module2) {
    var { Webpack } = BdApi;
    var _cached = null;
    function getNavigationUtils() {
      if (_cached) return _cached;
      _cached = Webpack.getByKeys("transitionTo", "back", "forward") || Webpack.getModule((m) => m.transitionTo && m.back && m.forward) || null;
      return _cached;
    }
    module2.exports = { getNavigationUtils };
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
    function ensureTooltipCSS() {
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
    function showToolbarTooltip(icon, tooltipId, label) {
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
    function hideToolbarTooltip(tooltipId) {
      const tip = document.getElementById(tooltipId);
      if (tip) tip.classList.remove("sl-toolbar-tip--visible");
    }
    function removeToolbarTooltip(tooltipId) {
      const tip = document.getElementById(tooltipId);
      if (tip) tip.remove();
    }
    module2.exports = {
      showToolbarTooltip,
      hideToolbarTooltip,
      removeToolbarTooltip,
      ensureTooltipCSS
    };
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

// src/shared/channel-context.js
var require_channel_context = __commonJS({
  "src/shared/channel-context.js"(exports2, module2) {
    var { acquireDispatcher } = require_dispatcher();
    function _getStores() {
      try {
        const Webpack = BdApi == null ? void 0 : BdApi.Webpack;
        if (!Webpack) return null;
        const SelectedChannelStore = Webpack.getStore("SelectedChannelStore");
        const ChannelStore = Webpack.getStore("ChannelStore");
        if (!SelectedChannelStore || !ChannelStore) return null;
        return { SelectedChannelStore, ChannelStore };
      } catch (_) {
        return null;
      }
    }
    function getCurrentChannel() {
      var _a, _b, _c, _d;
      const stores = _getStores();
      if (!stores) return null;
      try {
        const channelId = (_b = (_a = stores.SelectedChannelStore).getChannelId) == null ? void 0 : _b.call(_a);
        if (!channelId) return null;
        return ((_d = (_c = stores.ChannelStore).getChannel) == null ? void 0 : _d.call(_c, channelId)) || null;
      } catch (_) {
        return null;
      }
    }
    function isVoiceChannelChat() {
      var _a, _b, _c;
      const Webpack = BdApi == null ? void 0 : BdApi.Webpack;
      let path1Resolved = false;
      try {
        const channel = getCurrentChannel();
        if (channel) {
          path1Resolved = true;
          const type = Number(channel.type);
          if (type === 2 || type === 13) return true;
        }
      } catch (_) {
      }
      let path2Resolved = false;
      try {
        if (typeof window !== "undefined" && window.location && Webpack) {
          const m = String(window.location.pathname || "").match(/^\/channels\/(?:@me|\d+)\/(\d+)/);
          if (m && m[1]) {
            const ChannelStore = Webpack.getStore("ChannelStore");
            const ch = (_a = ChannelStore == null ? void 0 : ChannelStore.getChannel) == null ? void 0 : _a.call(ChannelStore, m[1]);
            const t = Number(ch == null ? void 0 : ch.type);
            if (!Number.isNaN(t)) {
              path2Resolved = true;
              if (t === 2 || t === 13) return true;
            }
          }
        }
      } catch (_) {
      }
      if (path1Resolved && path2Resolved) return false;
      try {
        if (Webpack) {
          const VoiceStateStore = Webpack.getStore("VoiceStateStore");
          const UserStore = Webpack.getStore("UserStore");
          const SelectedChannelStore = Webpack.getStore("SelectedChannelStore");
          const userId = (_c = (_b = UserStore == null ? void 0 : UserStore.getCurrentUser) == null ? void 0 : _b.call(UserStore)) == null ? void 0 : _c.id;
          if (userId && (VoiceStateStore == null ? void 0 : VoiceStateStore.getVoiceStateForUser) && (SelectedChannelStore == null ? void 0 : SelectedChannelStore.getChannelId)) {
            const voiceState = VoiceStateStore.getVoiceStateForUser(userId);
            const voiceChannelId = voiceState == null ? void 0 : voiceState.channelId;
            const selectedId = SelectedChannelStore.getChannelId();
            if (voiceChannelId && selectedId && voiceChannelId === selectedId) return true;
          }
        }
      } catch (_) {
      }
      try {
        const vcMarkers = document.querySelectorAll(
          '[class*="voiceChannelChat"], [class*="voiceChannel_"][class*="chat_"]'
        );
        for (const el of vcMarkers) {
          if (el.offsetParent !== null) return true;
        }
      } catch (_) {
      }
      return false;
    }
    function debugVoiceChannelChat() {
      var _a, _b, _c, _d, _e;
      const Webpack = BdApi == null ? void 0 : BdApi.Webpack;
      const out = { final: null, paths: {} };
      try {
        const channel = getCurrentChannel();
        out.paths.selectedChannelType = {
          id: channel == null ? void 0 : channel.id,
          type: channel == null ? void 0 : channel.type,
          name: channel == null ? void 0 : channel.name,
          hit: channel && (channel.type === 2 || channel.type === 13)
        };
      } catch (e) {
        out.paths.selectedChannelType = { error: String(e) };
      }
      try {
        const path = String(window.location.pathname || "");
        const m = path.match(/^\/channels\/(?:@me|\d+)\/(\d+)/);
        const ChannelStore = Webpack == null ? void 0 : Webpack.getStore("ChannelStore");
        const ch = m && m[1] ? (_a = ChannelStore == null ? void 0 : ChannelStore.getChannel) == null ? void 0 : _a.call(ChannelStore, m[1]) : null;
        out.paths.urlBased = {
          url: path,
          extractedId: (m == null ? void 0 : m[1]) || null,
          type: ch == null ? void 0 : ch.type,
          name: ch == null ? void 0 : ch.name,
          hit: ch && (ch.type === 2 || ch.type === 13)
        };
      } catch (e) {
        out.paths.urlBased = { error: String(e) };
      }
      try {
        const VoiceStateStore = Webpack == null ? void 0 : Webpack.getStore("VoiceStateStore");
        const UserStore = Webpack == null ? void 0 : Webpack.getStore("UserStore");
        const SelectedChannelStore = Webpack == null ? void 0 : Webpack.getStore("SelectedChannelStore");
        const userId = (_c = (_b = UserStore == null ? void 0 : UserStore.getCurrentUser) == null ? void 0 : _b.call(UserStore)) == null ? void 0 : _c.id;
        const voiceState = userId ? (_d = VoiceStateStore == null ? void 0 : VoiceStateStore.getVoiceStateForUser) == null ? void 0 : _d.call(VoiceStateStore, userId) : null;
        const selectedId = (_e = SelectedChannelStore == null ? void 0 : SelectedChannelStore.getChannelId) == null ? void 0 : _e.call(SelectedChannelStore);
        out.paths.voiceStateMatch = {
          userId,
          voiceChannelId: voiceState == null ? void 0 : voiceState.channelId,
          selectedId,
          hit: (voiceState == null ? void 0 : voiceState.channelId) && selectedId && voiceState.channelId === selectedId
        };
      } catch (e) {
        out.paths.voiceStateMatch = { error: String(e) };
      }
      try {
        const vcMarkers = Array.from(document.querySelectorAll(
          '[class*="voiceChannelChat"], [class*="voiceChannel_"][class*="chat_"]'
        ));
        out.paths.domMarkers = {
          total: vcMarkers.length,
          visible: vcMarkers.filter((el) => el.offsetParent !== null).length,
          hit: vcMarkers.some((el) => el.offsetParent !== null)
        };
      } catch (e) {
        out.paths.domMarkers = { error: String(e) };
      }
      out.final = isVoiceChannelChat();
      return out;
    }
    var VC_BODY_ATTR = "data-sl-in-voice-chat";
    var FORUM_THREAD_BODY_ATTR = "data-sl-in-forum-or-thread";
    var DM_BODY_ATTR = "data-sl-in-dm";
    var HOME_BODY_ATTR = "data-sl-in-home";
    var READONLY_BODY_ATTR = "data-sl-channel-readonly";
    var CHAT_LAYER_BODY_ATTR = "data-sl-chat-layer";
    var _sendMessagesBit = null;
    function _getSendMessagesBit() {
      if (_sendMessagesBit !== null) return _sendMessagesBit;
      try {
        const Webpack = BdApi == null ? void 0 : BdApi.Webpack;
        const bits = Webpack.getModule((m) => m && typeof m === "object" && m.ADMINISTRATOR && m.VIEW_CHANNEL, { searchExports: true }) || Webpack.getByKeys("ADMINISTRATOR", "VIEW_CHANNEL");
        _sendMessagesBit = (bits == null ? void 0 : bits.SEND_MESSAGES) || 0n;
      } catch (_) {
        _sendMessagesBit = 0n;
      }
      return _sendMessagesBit;
    }
    function isChannelReadonly() {
      var _a;
      try {
        const ch = getCurrentChannel();
        if (!ch) return false;
        const t = Number(ch.type);
        if (t === 1 || t === 3) return false;
        const PermissionStore = (_a = BdApi == null ? void 0 : BdApi.Webpack) == null ? void 0 : _a.getStore("PermissionStore");
        const SEND = _getSendMessagesBit();
        if (!(PermissionStore == null ? void 0 : PermissionStore.can) || !SEND) return false;
        return !PermissionStore.can(SEND, ch);
      } catch (_) {
        return false;
      }
    }
    function isDmChannel() {
      var _a;
      try {
        const Webpack = BdApi == null ? void 0 : BdApi.Webpack;
        if (!Webpack || typeof window === "undefined" || !window.location) return false;
        const path = String(window.location.pathname || "");
        const m = path.match(/^\/channels\/@me\/(\d+)/);
        if (!m || !m[1]) return false;
        const ChannelStore = Webpack.getStore("ChannelStore");
        const ch = (_a = ChannelStore == null ? void 0 : ChannelStore.getChannel) == null ? void 0 : _a.call(ChannelStore, m[1]);
        const t = Number(ch == null ? void 0 : ch.type);
        if (Number.isNaN(t)) return true;
        return t === 1 || t === 3;
      } catch (_) {
        return false;
      }
    }
    function isHomeView() {
      try {
        if (typeof window === "undefined" || !window.location) return false;
        const path = String(window.location.pathname || "");
        if (path === "/channels/@me" || path === "/channels/@me/") return true;
        if (/^\/channels\/@me(\?|$)/.test(path)) return true;
        if (!path.startsWith("/channels/")) return true;
        return false;
      } catch (_) {
        return false;
      }
    }
    function isForumOrThreadChannel() {
      var _a;
      try {
        const Webpack = BdApi == null ? void 0 : BdApi.Webpack;
        if (!Webpack || typeof window === "undefined" || !window.location) return false;
        const m = String(window.location.pathname || "").match(/^\/channels\/(?:@me|\d+)\/(\d+)/);
        if (!m || !m[1]) return false;
        const ChannelStore = Webpack.getStore("ChannelStore");
        const ch = (_a = ChannelStore == null ? void 0 : ChannelStore.getChannel) == null ? void 0 : _a.call(ChannelStore, m[1]);
        const t = Number(ch == null ? void 0 : ch.type);
        return t === 10 || t === 11 || t === 12 || t === 15;
      } catch (_) {
        return false;
      }
    }
    var VC_HIDE_STYLE_ID = "sl-vc-icon-hiding";
    var VC_HIDE_CSS = `
/* Auto-injected by src/shared/channel-context.js \u2014 hides Solo-Leveling
   plugin toolbar icons when the user is viewing a voice-channel chat panel.
   Toggled via body[data-sl-in-voice-chat="true"]. */
body[data-sl-in-voice-chat="true"] #eq-header-icon,
body[data-sl-in-voice-chat="true"] #itemvault-header-icon,
body[data-sl-in-voice-chat="true"] #shadow-senses-header-icon,
body[data-sl-in-voice-chat="true"] #se-swirl-icon,
body[data-sl-in-voice-chat="true"] #dungeons-header-widget {
  display: none !important;
}
`;
    var _vcWatchInstalled = false;
    var _vcWatchInterval = null;
    var _vcWatchRefCount = 0;
    var _vcDispatcherUnsub = null;
    if (typeof window !== "undefined") {
      window.__SL_VcHideRefs = window.__SL_VcHideRefs || 0;
    }
    function _writeVcAttribute() {
      try {
        if (!document.body) return;
        const vcValue = isVoiceChannelChat() ? "true" : "false";
        if (document.body.getAttribute(VC_BODY_ATTR) !== vcValue) {
          document.body.setAttribute(VC_BODY_ATTR, vcValue);
        }
        const ftValue = isForumOrThreadChannel() ? "true" : "false";
        if (document.body.getAttribute(FORUM_THREAD_BODY_ATTR) !== ftValue) {
          document.body.setAttribute(FORUM_THREAD_BODY_ATTR, ftValue);
        }
        const dmValue = isDmChannel() ? "true" : "false";
        if (document.body.getAttribute(DM_BODY_ATTR) !== dmValue) {
          document.body.setAttribute(DM_BODY_ATTR, dmValue);
        }
        const homeValue = isHomeView() ? "true" : "false";
        if (document.body.getAttribute(HOME_BODY_ATTR) !== homeValue) {
          document.body.setAttribute(HOME_BODY_ATTR, homeValue);
        }
        const roValue = isChannelReadonly() ? "true" : "false";
        if (document.body.getAttribute(READONLY_BODY_ATTR) !== roValue) {
          document.body.setAttribute(READONLY_BODY_ATTR, roValue);
        }
      } catch (_) {
      }
    }
    function installVoiceChatBodyAttr() {
      var _a;
      _vcWatchRefCount++;
      if (typeof window !== "undefined") {
        window.__SL_VcHideRefs = (window.__SL_VcHideRefs || 0) + 1;
      }
      if (!_vcWatchInstalled) {
        _vcWatchInstalled = true;
        try {
          if ((_a = BdApi == null ? void 0 : BdApi.DOM) == null ? void 0 : _a.addStyle) {
            BdApi.DOM.addStyle(VC_HIDE_STYLE_ID, VC_HIDE_CSS);
          }
        } catch (_) {
        }
        _writeVcAttribute();
        try {
          const dispatcher = acquireDispatcher();
          if (dispatcher) {
            const handler = () => _writeVcAttribute();
            dispatcher.subscribe("CHANNEL_SELECT", handler);
            dispatcher.subscribe("VOICE_STATE_UPDATES", handler);
            _vcDispatcherUnsub = () => {
              try {
                dispatcher.unsubscribe("CHANNEL_SELECT", handler);
              } catch (_) {
              }
              try {
                dispatcher.unsubscribe("VOICE_STATE_UPDATES", handler);
              } catch (_) {
              }
            };
          }
        } catch (_) {
        }
        if (!_vcDispatcherUnsub) {
          _vcWatchInterval = setInterval(() => {
            if (document.hidden) return;
            _writeVcAttribute();
          }, 15e3);
        }
      }
      return function uninstallVoiceChatBodyAttr() {
        var _a2;
        _vcWatchRefCount = Math.max(0, _vcWatchRefCount - 1);
        const globalRefs = typeof window !== "undefined" ? Math.max(0, (window.__SL_VcHideRefs || 1) - 1) : 0;
        if (typeof window !== "undefined") window.__SL_VcHideRefs = globalRefs;
        if (_vcWatchRefCount === 0 && _vcWatchInstalled) {
          _vcWatchInstalled = false;
          if (_vcWatchInterval) {
            clearInterval(_vcWatchInterval);
            _vcWatchInterval = null;
          }
          if (_vcDispatcherUnsub) {
            _vcDispatcherUnsub();
            _vcDispatcherUnsub = null;
          }
          try {
            if (document.body) {
              document.body.removeAttribute(VC_BODY_ATTR);
              document.body.removeAttribute(FORUM_THREAD_BODY_ATTR);
              document.body.removeAttribute(DM_BODY_ATTR);
              document.body.removeAttribute(HOME_BODY_ATTR);
              document.body.removeAttribute(READONLY_BODY_ATTR);
            }
          } catch (_) {
          }
          if (globalRefs === 0) {
            try {
              if ((_a2 = BdApi == null ? void 0 : BdApi.DOM) == null ? void 0 : _a2.removeStyle) BdApi.DOM.removeStyle(VC_HIDE_STYLE_ID);
            } catch (_) {
            }
          }
        }
      };
    }
    var _chatLayerObserver = null;
    var _chatLayerRefCount = 0;
    var _chatLayerRafPending = false;
    var _chatLayerLastValue = null;
    function _writeChatLayerAttribute() {
      try {
        if (!document.body) return;
        const value = document.querySelector('div[class^="chatLayerWrapper_"]') ? "true" : "false";
        if (value === _chatLayerLastValue) return;
        _chatLayerLastValue = value;
        document.body.setAttribute(CHAT_LAYER_BODY_ATTR, value);
      } catch (_) {
      }
    }
    function _scheduleChatLayerWrite() {
      if (_chatLayerRafPending) return;
      _chatLayerRafPending = true;
      requestAnimationFrame(() => {
        _chatLayerRafPending = false;
        _writeChatLayerAttribute();
      });
    }
    function installChatLayerBodyAttr() {
      _chatLayerRefCount++;
      if (!_chatLayerObserver) {
        _writeChatLayerAttribute();
        const target = document.querySelector('[class*="layerContainer_"]') || document.querySelector('[class*="layers_"]') || document.body;
        if (target) {
          _chatLayerObserver = new MutationObserver(_scheduleChatLayerWrite);
          _chatLayerObserver.observe(target, { childList: true, subtree: true });
        }
      }
      return function uninstallChatLayerBodyAttr() {
        var _a;
        _chatLayerRefCount = Math.max(0, _chatLayerRefCount - 1);
        if (_chatLayerRefCount > 0) return;
        if (_chatLayerObserver) {
          _chatLayerObserver.disconnect();
          _chatLayerObserver = null;
        }
        _chatLayerRafPending = false;
        _chatLayerLastValue = null;
        try {
          (_a = document.body) == null ? void 0 : _a.removeAttribute(CHAT_LAYER_BODY_ATTR);
        } catch (_) {
        }
      };
    }
    module2.exports = {
      getCurrentChannel,
      isVoiceChannelChat,
      isForumOrThreadChannel,
      isDmChannel,
      isHomeView,
      isChannelReadonly,
      debugVoiceChannelChat,
      installVoiceChatBodyAttr,
      installChatLayerBodyAttr,
      VC_BODY_ATTR,
      CHAT_LAYER_BODY_ATTR,
      FORUM_THREAD_BODY_ATTR,
      DM_BODY_ATTR,
      HOME_BODY_ATTR,
      READONLY_BODY_ATTR
    };
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
    function watchToolbar(onChange) {
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
      watchToolbar
    };
  }
});

// src/shared/escape-html.js
var require_escape_html = __commonJS({
  "src/shared/escape-html.js"(exports2, module2) {
    function escapeHtml(value) {
      return String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    }
    module2.exports = { escapeHtml };
  }
});

// src/Dungeons/ui-header-widget.js
var require_ui_header_widget = __commonJS({
  "src/Dungeons/ui-header-widget.js"(exports2, module2) {
    var { getNavigationUtils } = require_navigation();
    var { showToolbarTooltip, hideToolbarTooltip, removeToolbarTooltip, ensureTooltipCSS } = require_toolbar_tooltip();
    var { isVoiceChannelChat } = require_channel_context();
    var { watchToolbar } = require_header_toolbar();
    var HEADER_WIDGET_ID = "dungeons-header-widget";
    var HEADER_POPUP_ID = "dungeons-header-popup";
    var HEADER_TOOLBAR_SELECTORS = [
      // Wildcards (proven, always correct)
      '[aria-label="Channel header"] [class*="toolbar_"]',
      '[class*="titleWrapper_"] [class*="toolbar_"]',
      'header [class*="toolbar_"]'
    ];
    var { escapeHtml } = require_escape_html();
    module2.exports = {
      startDungeonHeaderWidget() {
        if (this._unwatchToolbar) return;
        this._unwatchToolbar = watchToolbar(() => {
          if (!this.started) return;
          this.ensureDungeonHeaderWidget();
        });
        this._ensureDungeonHeaderWidgetLoop();
      },
      // PERF (R7): idempotent — safe to call from any site that may bring the widget
      // back to life (dungeon creation, story mode entry) after the loop self-stopped.
      // Mirrors runtime-visibility.js:startHPBarRestoration's restart-on-demand pattern.
      _ensureDungeonHeaderWidgetLoop() {
        if (this._dungeonHeaderWidgetLoop) return;
        const popupTick = () => {
          var _a;
          if (!this.started) return;
          const hasActiveDungeons = this.activeDungeons && this.activeDungeons.size > 0;
          const hasStoryMode = this._storyModeActive || this._demonCastle != null;
          const popupOpen = (_a = this._dungeonHeaderPopup) == null ? void 0 : _a.isConnected;
          if (!hasActiveDungeons && !hasStoryMode && !popupOpen) {
            this._stopDungeonHeaderWidgetLoop();
            return;
          }
          if (document.hidden) return;
          if (popupOpen) {
            this.renderDungeonHeaderPopup();
            this.queueDungeonHeaderPopupPosition();
          } else {
            this._updateDungeonHeaderWidgetBadge();
          }
        };
        this._dungeonHeaderWidgetLoop = setInterval(popupTick, 3e3);
        this._intervals.add(this._dungeonHeaderWidgetLoop);
      },
      _stopDungeonHeaderWidgetLoop() {
        if (this._dungeonHeaderWidgetLoop) {
          clearInterval(this._dungeonHeaderWidgetLoop);
          this._intervals.delete(this._dungeonHeaderWidgetLoop);
          this._dungeonHeaderWidgetLoop = null;
        }
      },
      stopDungeonHeaderWidget() {
        var _a;
        if (this._unwatchToolbar) {
          this._unwatchToolbar();
          this._unwatchToolbar = null;
        }
        this._stopDungeonHeaderWidgetLoop();
        this.closeDungeonHeaderPopup();
        if ((_a = this._dungeonHeaderWidgetButton) == null ? void 0 : _a.isConnected) {
          this._dungeonHeaderWidgetButton.remove();
        }
        this._dungeonHeaderWidgetButton = null;
        removeToolbarTooltip("sl-toolbar-tip-dn");
      },
      _getChannelHeaderToolbarForDungeonWidget() {
        for (const selector of HEADER_TOOLBAR_SELECTORS) {
          const toolbar = document.querySelector(selector);
          if (toolbar && toolbar.offsetParent !== null) return toolbar;
        }
        return null;
      },
      _isDungeonWidgetContextAllowed() {
        var _a, _b, _c, _d, _e, _f;
        try {
          if (isVoiceChannelChat()) return false;
        } catch (_) {
        }
        try {
          const path = String(((_a = window.location) == null ? void 0 : _a.pathname) || "");
          const m = path.match(/^\/channels\/(?:@me|\d+)\/(\d+)/);
          if (m) {
            const ch = (_e = (_d = (_c = (_b = BdApi == null ? void 0 : BdApi.Webpack) == null ? void 0 : _b.getStore) == null ? void 0 : _c.call(_b, "ChannelStore")) == null ? void 0 : _d.getChannel) == null ? void 0 : _e.call(_d, m[1]);
            const t = Number(ch == null ? void 0 : ch.type);
            if (t === 2 || t === 13) return false;
          }
        } catch (_) {
        }
        const channelInfo = (_f = this.getChannelInfo) == null ? void 0 : _f.call(this);
        return Boolean(channelInfo && channelInfo.guildId && channelInfo.guildId !== "DM");
      },
      _getActiveDungeonsForWidget() {
        var _a;
        if (!this.activeDungeons || this.activeDungeons.size === 0) return [];
        const rankOrder = ((_a = this.settings) == null ? void 0 : _a.dungeonRanks) || [];
        const rankIndex = (rank) => Math.max(0, rankOrder.indexOf(rank));
        return Array.from(this.activeDungeons.entries()).filter(([, dungeon]) => {
          var _a2;
          return dungeon && !dungeon.completed && !dungeon.failed && !dungeon._completing && // Demon Castle non-boss floors use sentinel bosses (hp:0) — don't filter those out
          (dungeon._isDemonCastle || (Number((_a2 = dungeon == null ? void 0 : dungeon.boss) == null ? void 0 : _a2.hp) || 0) > 0);
        }).sort((a, b) => {
          var _a2, _b, _c, _d;
          const aRank = rankIndex((_a2 = a[1]) == null ? void 0 : _a2.rank);
          const bRank = rankIndex((_b = b[1]) == null ? void 0 : _b.rank);
          if (aRank !== bRank) return bRank - aRank;
          return (Number((_c = b[1]) == null ? void 0 : _c.startTime) || 0) - (Number((_d = a[1]) == null ? void 0 : _d.startTime) || 0);
        });
      },
      _getWidgetMobMetrics(channelKey, dungeon) {
        var _a, _b, _c, _d;
        const mobsState = (dungeon == null ? void 0 : dungeon.mobs) || {};
        const activeList = Array.isArray(mobsState.activeMobs) ? mobsState.activeMobs : [];
        const cache = (_b = (_a = this._mobCleanupCache) == null ? void 0 : _a.get) == null ? void 0 : _b.call(_a, channelKey);
        const cacheAgeMs = cache ? Date.now() - (Number(cache.time) || 0) : Number.POSITIVE_INFINITY;
        const aliveFromCache = Number(cache == null ? void 0 : cache.alive);
        const aliveMobs = Number.isFinite(aliveFromCache) && cacheAgeMs <= 1200 ? Math.max(0, Math.floor(aliveFromCache)) : activeList.reduce((count, mob) => count + ((Number(mob == null ? void 0 : mob.hp) || 0) > 0 ? 1 : 0), 0);
        const queuedList = (_d = (_c = this._mobSpawnQueue) == null ? void 0 : _c.get) == null ? void 0 : _d.call(_c, channelKey);
        const queuedMobs = Array.isArray(queuedList) ? queuedList.length : Number.isFinite(Number(queuedList)) ? Math.max(0, Math.floor(Number(queuedList))) : 0;
        const mobsKilled = Math.max(0, Math.floor(Number(mobsState.killed) || 0));
        const mobsTarget = Math.max(0, Math.floor(Number(mobsState.targetCount) || 0));
        const mobsSpawned = Math.max(0, Math.floor(Number(mobsState.total) || 0));
        return {
          aliveMobs,
          queuedMobs,
          mobsKilled,
          mobsTarget,
          mobsSpawned
        };
      },
      _createDungeonHeaderWidgetButton() {
        var _a;
        if ((_a = this._dungeonHeaderWidgetButton) == null ? void 0 : _a.isConnected) return this._dungeonHeaderWidgetButton;
        const button = document.createElement("button");
        button.id = HEADER_WIDGET_ID;
        button.className = "dungeons-header-widget";
        button.type = "button";
        button.setAttribute("aria-label", "Active Dungeons");
        button.innerHTML = `
      <span class="dungeons-header-widget-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="20" height="20">
          <path fill="currentColor" d="M4.5 20A1.5 1.5 0 0 1 3 18.5V8a1 1 0 0 1 .293-.707l4-4A1 1 0 0 1 8 3h8a1 1 0 0 1 .707.293l4 4A1 1 0 0 1 21 8v10.5a1.5 1.5 0 0 1-1.5 1.5h-15Zm.5-2h14v-9.5L15.586 5H8.414L5 8.5V18Zm4-7h6a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2Zm0 3h6a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2Z"/>
        </svg>
      </span>
      <span class="dungeons-header-widget-count" aria-hidden="true"></span>
    `;
        ensureTooltipCSS();
        button.addEventListener("mouseenter", () => showToolbarTooltip(button, "sl-toolbar-tip-dn", "Active Dungeons"));
        button.addEventListener("mouseleave", () => hideToolbarTooltip("sl-toolbar-tip-dn"));
        this._dungeonHeaderWidgetButton = button;
        return button;
      },
      ensureDungeonHeaderWidget() {
        var _a;
        const activeDungeons = this._getActiveDungeonsForWidget();
        const hasActiveDungeons = activeDungeons.length > 0;
        const contextAllowed = this._isDungeonWidgetContextAllowed();
        const toolbar = this._getChannelHeaderToolbarForDungeonWidget();
        const hasStoryMode = this._storyModeActive || this._demonCastle != null;
        if (!hasActiveDungeons && !hasStoryMode || !contextAllowed || !toolbar) {
          if ((_a = this._dungeonHeaderWidgetButton) == null ? void 0 : _a.isConnected) {
            this._dungeonHeaderWidgetButton.remove();
          }
          this.closeDungeonHeaderPopup();
          return false;
        }
        const button = this._createDungeonHeaderWidgetButton();
        if (button.parentElement !== toolbar) {
          toolbar.appendChild(button);
        }
        this._updateDungeonHeaderWidgetBadge(activeDungeons.length);
        return true;
      },
      _updateDungeonHeaderWidgetBadge(forcedCount = null) {
        const button = this._dungeonHeaderWidgetButton;
        if (!button) return;
        const activeCount = Number.isFinite(forcedCount) ? forcedCount : this._getActiveDungeonsForWidget().length;
        const badge = button.querySelector(".dungeons-header-widget-count");
        if (badge) {
          if (activeCount > 0) {
            badge.textContent = String(Math.min(activeCount, 99));
            badge.classList.add("is-visible");
          } else {
            badge.textContent = "";
            badge.classList.remove("is-visible");
          }
        }
      },
      toggleDungeonHeaderPopup() {
        var _a;
        if ((_a = this._dungeonHeaderPopup) == null ? void 0 : _a.isConnected) {
          this.closeDungeonHeaderPopup();
        } else {
          this.openDungeonHeaderPopup();
        }
      },
      openDungeonHeaderPopup() {
        var _a, _b;
        if ((_a = this._dungeonHeaderPopup) == null ? void 0 : _a.isConnected) return;
        if (!this.ensureDungeonHeaderWidget()) return;
        if (!((_b = this._dungeonHeaderWidgetButton) == null ? void 0 : _b.isConnected)) return;
        const popup = document.createElement("div");
        popup.id = HEADER_POPUP_ID;
        popup.className = "dungeons-header-popup";
        document.body.appendChild(popup);
        this._dungeonHeaderPopup = popup;
        this.renderDungeonHeaderPopup();
        this._dungeonHeaderPopupDocClickHandler = (event) => {
          var _a2, _b2, _c, _d;
          const target = event.target;
          if (!target) return;
          const clickedPopup = (_b2 = (_a2 = this._dungeonHeaderPopup) == null ? void 0 : _a2.contains) == null ? void 0 : _b2.call(_a2, target);
          const clickedButton = (_d = (_c = this._dungeonHeaderWidgetButton) == null ? void 0 : _c.contains) == null ? void 0 : _d.call(_c, target);
          if (!clickedPopup && !clickedButton) {
            this.closeDungeonHeaderPopup();
          }
        };
        this._dungeonHeaderPopupResizeHandler = () => this.queueDungeonHeaderPopupPosition();
        this._dungeonHeaderPopupScrollHandler = () => this.queueDungeonHeaderPopupPosition();
        document.addEventListener("mousedown", this._dungeonHeaderPopupDocClickHandler, true);
        window.addEventListener("resize", this._dungeonHeaderPopupResizeHandler, { passive: true });
        window.addEventListener("scroll", this._dungeonHeaderPopupScrollHandler, { passive: true, capture: true });
      },
      closeDungeonHeaderPopup() {
        var _a;
        if (this._dungeonHeaderPopupPositionRaf) {
          cancelAnimationFrame(this._dungeonHeaderPopupPositionRaf);
          this._dungeonHeaderPopupPositionRaf = null;
        }
        if (this._dungeonHeaderPopupDocClickHandler) {
          document.removeEventListener("mousedown", this._dungeonHeaderPopupDocClickHandler, true);
          this._dungeonHeaderPopupDocClickHandler = null;
        }
        if (this._dungeonHeaderPopupResizeHandler) {
          window.removeEventListener("resize", this._dungeonHeaderPopupResizeHandler);
          this._dungeonHeaderPopupResizeHandler = null;
        }
        if (this._dungeonHeaderPopupScrollHandler) {
          window.removeEventListener("scroll", this._dungeonHeaderPopupScrollHandler, true);
          this._dungeonHeaderPopupScrollHandler = null;
        }
        if ((_a = this._dungeonHeaderPopup) == null ? void 0 : _a.isConnected) {
          this._dungeonHeaderPopup.remove();
        }
        this._dungeonHeaderPopup = null;
        this._lastPopupVersionKey = null;
      },
      queueDungeonHeaderPopupPosition() {
        if (this._dungeonHeaderPopupPositionRaf) return;
        if (typeof requestAnimationFrame !== "function") {
          this.positionDungeonHeaderPopup();
          return;
        }
        this._dungeonHeaderPopupPositionRaf = requestAnimationFrame(() => {
          this._dungeonHeaderPopupPositionRaf = null;
          this.positionDungeonHeaderPopup();
        });
      },
      positionDungeonHeaderPopup() {
        const popup = this._dungeonHeaderPopup;
        const button = this._dungeonHeaderWidgetButton;
        if (!popup || !button || !popup.isConnected || !button.isConnected) return;
        const buttonRect = button.getBoundingClientRect();
        const viewportWidth = window.innerWidth || 0;
        const viewportHeight = window.innerHeight || 0;
        const desiredWidth = Math.max(420, Math.min(560, viewportWidth - 24));
        const maxHeight = Math.max(300, viewportHeight - 80);
        const margin = 12;
        popup.style.width = `${desiredWidth}px`;
        popup.style.maxHeight = `${maxHeight}px`;
        let left = buttonRect.right - desiredWidth;
        left = Math.max(margin, Math.min(left, viewportWidth - desiredWidth - margin));
        let top = buttonRect.bottom + 10;
        if (top > viewportHeight - margin - 220) {
          top = Math.max(margin, buttonRect.top - Math.min(maxHeight, 500) - 10);
        }
        popup.style.left = `${left}px`;
        popup.style.top = `${Math.max(margin, top)}px`;
      },
      renderDungeonHeaderPopup() {
        const popup = this._dungeonHeaderPopup;
        if (!popup || !popup.isConnected) return;
        const rows = this._getActiveDungeonsForWidget();
        this._updateDungeonHeaderWidgetBadge(rows.length);
        const activeTab = this._storyModePopupTab || "dungeons";
        const popupVersionKey = activeTab + "|" + rows.map(([ck, d]) => {
          var _a;
          const { aliveMobs, queuedMobs, mobsKilled, mobsSpawned } = this._getWidgetMobMetrics(ck, d);
          const warBucket = (d == null ? void 0 : d.war) ? Math.floor((d.war.fallen || 0) / 500) : -1;
          return `${ck}:${Math.floor(((_a = d == null ? void 0 : d.boss) == null ? void 0 : _a.hp) || 0)}:${aliveMobs}:${queuedMobs}:${mobsKilled}:${mobsSpawned}:${d.shadowsDeployed ? 1 : 0}:${d.userParticipating ? 1 : 0}:${d._deploying ? 1 : 0}:${warBucket}`;
        }).join("|");
        if (popupVersionKey === this._lastPopupVersionKey) return;
        this._lastPopupVersionKey = popupVersionKey;
        const contentEl = popup.querySelector(".dungeons-header-popup-content");
        const savedScrollTop = contentEl ? contentEl.scrollTop : 0;
        const hasStoryTab = typeof this._getStoryModeTabHtml === "function";
        if (rows.length === 0 && activeTab === "dungeons" && !hasStoryTab) {
          popup.innerHTML = `
        <div class="dungeons-header-popup-surface">
          <div class="dungeons-header-popup-head">
            <div class="dungeons-header-popup-title">Active Dungeons</div>
            <button class="dungeon-widget-close-btn" type="button" aria-label="Close">\xD7</button>
          </div>
          <div class="dungeons-header-popup-empty">No active dungeons right now.</div>
        </div>
      `;
          this.queueDungeonHeaderPopupPosition();
          return;
        }
        const rowsHtml = rows.map(([channelKey, dungeon]) => {
          var _a;
          const channelName = escapeHtml(dungeon.channelName || "unknown-channel");
          const dungeonName = escapeHtml(dungeon.name || "Unknown Dungeon");
          const dungeonRank = escapeHtml(dungeon.rank || "?");
          const guildName = escapeHtml(dungeon.guildName || "Unknown Guild");
          const deployed = Boolean(dungeon.shadowsDeployed);
          const deploying = Boolean(dungeon._deploying);
          const joined = Boolean(dungeon.userParticipating);
          const bossHp = Math.max(0, Math.floor(Number((_a = dungeon == null ? void 0 : dungeon.boss) == null ? void 0 : _a.hp) || 0)).toLocaleString();
          const {
            aliveMobs,
            queuedMobs,
            mobsKilled,
            mobsSpawned
          } = this._getWidgetMobMetrics(channelKey, dungeon);
          const mobKillLine = mobsKilled.toLocaleString();
          const spawnLine = mobsSpawned.toLocaleString();
          return `
        <div class="dungeons-header-popup-row" data-channel-key="${channelKey}">
          <div class="dungeons-header-popup-row-top">
            <div class="dungeons-header-popup-row-name">${dungeonName}</div>
            <div class="dungeons-header-popup-row-rank">${dungeonRank}</div>
          </div>
          <div class="dungeons-header-popup-row-meta">
            <span>#${channelName}</span>
            <span>\u2022</span>
            <span>${guildName}</span>
          </div>
          ${dungeon.war && (dungeon.war.reserves > 0 || dungeon.war.fallen > 0) ? `
          <div class="dungeons-header-popup-row-meta" style="color:#c084fc;">
            <span>\u2694 Host: ${Math.max(0, dungeon.war.reserves).toLocaleString()}</span>
            <span>\u2022</span>
            <span>${(dungeon.war.fallen || 0).toLocaleString()} annihilated</span>
          </div>` : ""}
          <div class="dungeons-header-popup-row-stats">
            <span>Boss HP ${bossHp}</span>
            <span>\u2022</span>
            <span>Active ${aliveMobs.toLocaleString()}</span>
            <span>\u2022</span>
            <span>Queued ${queuedMobs.toLocaleString()}</span>
            <span>\u2022</span>
            <span>Spawned ${spawnLine}</span>
            <span>\u2022</span>
            <span>Killed ${mobKillLine}</span>
            <span class="dungeons-header-popup-state ${deploying ? "is-deploying" : deployed ? "is-deployed" : "is-waiting"}">
              ${deploying ? "DEPLOYING" : deployed ? "DEPLOYED" : "WAITING"}
            </span>
            <span class="dungeons-header-popup-state ${joined ? "is-joined" : "is-not-joined"}">
              ${joined ? "JOINED" : "NOT JOINED"}
            </span>
          </div>
          <div class="dungeons-header-popup-row-actions">
            <button class="dungeon-widget-action action-go" type="button" data-dungeon-action="goto" data-channel-key="${channelKey}">
              GO
            </button>
            <button class="dungeon-widget-action action-deploy${deploying ? " is-deploying" : ""}" type="button" data-dungeon-action="${deployed ? "recall" : "deploy"}" data-channel-key="${channelKey}"${deploying ? " disabled" : ""}>
              ${deploying ? "DEPLOYING\u2026" : deployed ? "RECALL" : "DEPLOY"}
            </button>
            <button class="dungeon-widget-action action-join" type="button" data-dungeon-action="${joined ? "leave" : "join"}" data-channel-key="${channelKey}">
              ${joined ? "LEAVE" : "JOIN"}
            </button>
          </div>
        </div>
      `;
        }).join("");
        const storyTabActive = activeTab === "story" || activeTab === "story-detail-dc";
        const tabsHtml = hasStoryTab ? `
      <div class="dungeons-popup-tabs">
        <button class="dungeons-tab-btn dungeon-widget-action ${activeTab === "dungeons" ? "is-active" : ""}"
                type="button" data-dungeon-action="tab-dungeons" data-channel-key="_tab">
          &#x2694; Dungeons${rows.length > 0 ? ` (${rows.length})` : ""}
        </button>
        <button class="dungeons-tab-btn dungeon-widget-action ${storyTabActive ? "is-active" : ""}"
                type="button" data-dungeon-action="tab-story" data-channel-key="_tab">
          &#x1F4D6; Story
        </button>
      </div>
    ` : `<div class="dungeons-header-popup-title">Active Dungeons (${rows.length})</div>`;
        let contentHtml;
        if (activeTab === "story-detail-dc" && typeof this._getDemonCastleDetailHtml === "function") {
          contentHtml = this._getDemonCastleDetailHtml();
        } else if (activeTab === "story" && hasStoryTab) {
          contentHtml = this._getStoryModeTabHtml();
        } else {
          contentHtml = rows.length > 0 ? rowsHtml : '<div class="dungeons-header-popup-empty">No active dungeons right now.</div>';
        }
        popup.innerHTML = `
      <div class="dungeons-header-popup-surface">
        <div class="dungeons-header-popup-head">
          ${tabsHtml}
          <button class="dungeon-widget-close-btn" type="button" aria-label="Close">\xD7</button>
        </div>
        <div class="dungeons-header-popup-content">
          ${contentHtml}
        </div>
      </div>
    `;
        if (savedScrollTop > 0) {
          const newContentEl = popup.querySelector(".dungeons-header-popup-content");
          if (newContentEl) newContentEl.scrollTop = savedScrollTop;
        }
        this.queueDungeonHeaderPopupPosition();
      },
      focusDungeonChannel(channelKey) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _i;
        const dungeon = (_b = (_a = this.activeDungeons) == null ? void 0 : _a.get) == null ? void 0 : _b.call(_a, channelKey);
        if (!dungeon) {
          this.showToast("Cannot open dungeon channel right now.", "error");
          return false;
        }
        let guildId = dungeon.guildId;
        let channelId = dungeon.channelId;
        if (!guildId || !channelId) {
          const key = String(channelKey || "");
          const splitIndex = key.indexOf("_");
          if (splitIndex > 0 && splitIndex < key.length - 1) {
            guildId ||= key.slice(0, splitIndex);
            channelId ||= key.slice(splitIndex + 1);
          }
        }
        if (!guildId || !channelId) {
          this.showToast("Cannot open dungeon channel right now.", "error");
          return false;
        }
        try {
          const guildSeg = guildId && guildId !== "DM" ? guildId : "@me";
          const path = `/channels/${guildSeg}/${channelId}`;
          if (((_d = (_c = this.soloLevelingStats) == null ? void 0 : _c.settings) == null ? void 0 : _d.rank) === "Shadow Monarch") {
            try {
              const senses = (_e = BdApi.Plugins.get("ShadowSenses")) == null ? void 0 : _e.instance;
              if (senses && typeof senses.teleportToPath === "function") {
                if (senses.teleportToPath(path, {}, null) !== false) return true;
              }
            } catch (_) {
            }
          }
          this._navigationUtils ||= getNavigationUtils();
          if ((_f = this._navigationUtils) == null ? void 0 : _f.transitionTo) {
            this._navigationUtils.transitionTo(path);
            return true;
          }
          const { Webpack } = BdApi;
          const nav = ((_g = Webpack == null ? void 0 : Webpack.getByKeys) == null ? void 0 : _g.call(Webpack, "transitionTo", "back", "forward")) || // Optional chaining INSIDE filters is banned (AGENTS.md).
          ((_h = Webpack == null ? void 0 : Webpack.getModule) == null ? void 0 : _h.call(Webpack, (m) => m && m.transitionTo && m.back && m.forward));
          if (nav == null ? void 0 : nav.transitionTo) {
            this._navigationUtils = nav;
            nav.transitionTo(path);
            return true;
          }
          if ((_i = window.history) == null ? void 0 : _i.pushState) {
            window.history.pushState({}, "", path);
            window.dispatchEvent(new PopStateEvent("popstate"));
            return true;
          }
        } catch (error) {
          this.errorLog("UI", "Failed to navigate to dungeon channel", { channelKey, error });
        }
        this.showToast("Could not navigate to dungeon channel.", "error");
        return false;
      }
    };
  }
});

// src/Dungeons/ui-delegation.js
var require_ui_delegation = __commonJS({
  "src/Dungeons/ui-delegation.js"(exports2, module2) {
    module2.exports = {
      ensureDelegatedUiStyles() {
        var _a;
        (_a = this.ensureBossHpBarCssInjected) == null ? void 0 : _a.call(this);
      },
      installDelegatedUiHandlers() {
        if (this._delegatedUiHandlersInstalled) return;
        this._delegatedUiHandlersInstalled = true;
        this.ensureDelegatedUiStyles();
        const refreshDungeonWidgetPopup = () => {
          var _a, _b, _c, _d;
          if ((_a = this._dungeonHeaderPopup) == null ? void 0 : _a.isConnected) {
            (_b = this.renderDungeonHeaderPopup) == null ? void 0 : _b.call(this);
            (_c = this.queueDungeonHeaderPopupPosition) == null ? void 0 : _c.call(this);
          } else {
            (_d = this._updateDungeonHeaderWidgetBadge) == null ? void 0 : _d.call(this);
          }
        };
        const runGuardedDungeonAction = (action, channelKey, runner) => {
          if (!action || !channelKey || typeof runner !== "function") return;
          this._dungeonUiActionLocks ||= /* @__PURE__ */ new Set();
          const lockKey = `${action}:${channelKey}`;
          if (this._dungeonUiActionLocks.has(lockKey)) return;
          this._dungeonUiActionLocks.add(lockKey);
          Promise.resolve().then(runner).catch(
            (error) => this.errorLog("UI", "Failed to process guarded dungeon action", { action, channelKey, error })
          ).finally(() => {
            var _a, _b;
            (_b = (_a = this._dungeonUiActionLocks) == null ? void 0 : _a.delete) == null ? void 0 : _b.call(_a, lockKey);
            refreshDungeonWidgetPopup();
          });
        };
        const runDungeonWidgetAction = (action, channelKey) => {
          var _a, _b, _c;
          switch (action) {
            case "goto":
              return (_a = this.focusDungeonChannel) == null ? void 0 : _a.call(this, channelKey);
            case "deploy":
              return this.deployShadows(channelKey);
            case "recall":
              return this.recallShadows(channelKey);
            case "join":
              return this.selectDungeon(channelKey);
            case "leave":
              return this.leaveDungeon(channelKey);
            // Story Mode tabs and actions
            case "tab-dungeons":
              this._storyModePopupTab = "dungeons";
              refreshDungeonWidgetPopup();
              return true;
            case "tab-story":
              this._storyModePopupTab = "story";
              refreshDungeonWidgetPopup();
              return true;
            case "story-detail-dc":
              this._storyModePopupTab = "story-detail-dc";
              refreshDungeonWidgetPopup();
              return true;
            case "story-back":
              this._storyModePopupTab = "story";
              refreshDungeonWidgetPopup();
              return true;
            case "story-enter":
              return (_b = this.enterDemonCastle) == null ? void 0 : _b.call(this);
            case "story-exit":
              return (_c = this.exitDemonCastle) == null ? void 0 : _c.call(this);
            default:
              return false;
          }
        };
        this._delegatedUiClickHandler = (e) => {
          var _a, _b, _c, _d, _e, _f, _g, _h;
          const target = (
            /** @type {HTMLElement|null} */
            e.target
          );
          if (!target) return;
          const dungeonWidgetToggle = (_a = target.closest) == null ? void 0 : _a.call(target, ".dungeons-header-widget");
          if (dungeonWidgetToggle) {
            e.preventDefault();
            e.stopPropagation();
            (_b = this.toggleDungeonHeaderPopup) == null ? void 0 : _b.call(this);
            return;
          }
          const dungeonWidgetClose = (_c = target.closest) == null ? void 0 : _c.call(target, ".dungeon-widget-close-btn");
          if (dungeonWidgetClose) {
            e.preventDefault();
            e.stopPropagation();
            (_d = this.closeDungeonHeaderPopup) == null ? void 0 : _d.call(this);
            return;
          }
          const dungeonWidgetAction = (_e = target.closest) == null ? void 0 : _e.call(target, ".dungeon-widget-action");
          if (dungeonWidgetAction) {
            e.preventDefault();
            e.stopPropagation();
            const action = dungeonWidgetAction.getAttribute("data-dungeon-action");
            const channelKey = dungeonWidgetAction.getAttribute("data-channel-key");
            if (!action || !channelKey) return;
            runGuardedDungeonAction(action, channelKey, () => runDungeonWidgetAction(action, channelKey));
            return;
          }
          const simpleActions = [
            [".dungeon-deploy-btn", "deploy", (key) => this.deployShadows(key)],
            [".dungeon-recall-btn", "recall", (key) => this.recallShadows(key)],
            [".dungeon-join-btn", "join", (key) => this.selectDungeon(key)],
            [".dungeon-leave-btn", "leave", (key) => this.leaveDungeon(key)]
          ];
          for (const [selector, action, runner] of simpleActions) {
            const btn = (_f = target.closest) == null ? void 0 : _f.call(target, selector);
            if (!btn) continue;
            e.preventDefault();
            e.stopPropagation();
            const channelKey = btn.getAttribute("data-channel-key");
            if (!channelKey) return;
            runGuardedDungeonAction(action, channelKey, () => runner(channelKey));
            return;
          }
          const combatSkillBtn = (_g = target.closest) == null ? void 0 : _g.call(target, ".dungeon-combat-skill-btn");
          if (combatSkillBtn) {
            e.preventDefault();
            e.stopPropagation();
            if (combatSkillBtn.hasAttribute("disabled")) return;
            const channelKey = combatSkillBtn.getAttribute("data-channel-key");
            const skillId = combatSkillBtn.getAttribute("data-skill-id");
            if (!channelKey || !skillId) return;
            runGuardedDungeonAction(
              `combat:${skillId}`,
              channelKey,
              () => this.castDungeonCombatSkill(channelKey, skillId)
            );
            return;
          }
          const ariseBtn = (_h = target.closest) == null ? void 0 : _h.call(target, ".dungeon-arise-button");
          if (ariseBtn) {
            e.preventDefault();
            e.stopPropagation();
            if (ariseBtn.dataset.ariseDisabled === "true") return;
            ariseBtn.dataset.ariseDisabled = "true";
            ariseBtn.style.opacity = "0.5";
            ariseBtn.style.pointerEvents = "none";
            ariseBtn.style.cursor = "not-allowed";
            const channelKey = ariseBtn.getAttribute("data-arise-button");
            if (!channelKey) return;
            runGuardedDungeonAction("arise", channelKey, () => this.attemptBossExtraction(channelKey));
            return;
          }
        };
        document.addEventListener("click", this._delegatedUiClickHandler, true);
        this._listeners.set("delegated_click", { target: document, event: "click", handler: this._delegatedUiClickHandler, capture: true });
      },
      removeDelegatedUiHandlers() {
        if (!this._delegatedUiHandlersInstalled) return;
        this._delegatedUiHandlersInstalled = false;
        if (this._delegatedUiClickHandler) {
          document.removeEventListener("click", this._delegatedUiClickHandler, true);
          this._delegatedUiClickHandler = null;
          this._listeners.delete("delegated_click");
        }
      }
    };
  }
});

// src/Dungeons/storage.js
var require_storage = __commonJS({
  "src/Dungeons/storage.js"(exports2, module2) {
    var { openIndexedDbDatabase } = require_bootstrap_runtime();
    var DungeonStorageManager = class {
      constructor(userId) {
        this.userId = userId || "default";
        this.dbName = `DungeonsDB_${this.userId}`;
        this.dbVersion = 3;
        this.storeName = "dungeons";
        this.archiveStoreName = "dungeons_archive";
        this.db = null;
      }
      async init() {
        if (this.db !== null) {
          return this.db;
        }
        this.db = await openIndexedDbDatabase({
          dbName: this.dbName,
          dbVersion: this.dbVersion,
          onUpgrade: (event) => {
            const db = event.target.result;
            const oldVersion = event.oldVersion;
            if (!db.objectStoreNames.contains(this.storeName)) {
              const objectStore = db.createObjectStore(this.storeName, { keyPath: "id" });
              objectStore.createIndex("channelKey", "channelKey", { unique: true });
              objectStore.createIndex("guildId", "guildId", { unique: false });
              objectStore.createIndex("channelId", "channelId", { unique: false });
              objectStore.createIndex("rank", "rank", { unique: false });
              objectStore.createIndex("startTime", "startTime", { unique: false });
            }
            if (oldVersion < 2) {
              const transaction = event.target.transaction;
              const objectStore = transaction.objectStore(this.storeName);
              if (!objectStore.indexNames.contains("type")) {
                objectStore.createIndex("type", "type", { unique: false });
              }
              if (!objectStore.indexNames.contains("completed")) {
                objectStore.createIndex("completed", "completed", { unique: false });
              }
              if (!objectStore.indexNames.contains("failed")) {
                objectStore.createIndex("failed", "failed", { unique: false });
              }
              if (!objectStore.indexNames.contains("userParticipating")) {
                objectStore.createIndex("userParticipating", "userParticipating", { unique: false });
              }
            }
            if (oldVersion < 3) {
              const transaction = event.target.transaction;
              if (!db.objectStoreNames.contains(this.archiveStoreName)) {
                const archiveStore = db.createObjectStore(this.archiveStoreName, { keyPath: "id" });
                archiveStore.createIndex("channelKey", "channelKey", { unique: true });
                archiveStore.createIndex("rank", "rank", { unique: false });
                archiveStore.createIndex("completedAt", "completedAt", { unique: false });
              }
              const objectStore = transaction.objectStore(this.storeName);
              if (!objectStore.indexNames.contains("status_rank")) {
                objectStore.createIndex("status_rank", ["completed", "rank"], { unique: false });
              }
              if (!objectStore.indexNames.contains("active_rank")) {
                objectStore.createIndex("active_rank", ["failed", "completed", "rank"], {
                  unique: false
                });
              }
              if (!objectStore.indexNames.contains("type_rank")) {
                objectStore.createIndex("type_rank", ["type", "rank"], { unique: false });
              }
            }
          },
          onBlocked: () => {
            var _a, _b;
            try {
              (_b = (_a = BdApi.UI) == null ? void 0 : _a.showToast) == null ? void 0 : _b.call(
                _a,
                "Dungeons: close other Discord tabs/windows to upgrade dungeon data.",
                { type: "warning", timeout: 8e3 }
              );
            } catch (_) {
            }
          }
        });
        return this.db;
      }
      async _withStore(mode, operation) {
        if (!this.db) await this.init();
        return new Promise((resolve, reject) => {
          const transaction = this.db.transaction([this.storeName], mode);
          const store = transaction.objectStore(this.storeName);
          operation(store, transaction, resolve, reject);
        });
      }
      async _getAllFromStore() {
        return this._withStore("readonly", (store, _tx, resolve, reject) => {
          const request = store.getAll();
          request.onsuccess = () => resolve(request.result || []);
          request.onerror = () => reject(request.error);
        });
      }
      async saveDungeon(dungeon) {
        if (!this.db) await this.init();
        const sanitizedDungeon = this.sanitizeDungeonForStorage(dungeon);
        return new Promise((resolve, reject) => {
          const transaction = this.db.transaction([this.storeName], "readwrite");
          const store = transaction.objectStore(this.storeName);
          let request;
          try {
            request = store.put(sanitizedDungeon);
          } catch (error) {
            try {
              request = store.put(this._jsonSanitizeFallback(sanitizedDungeon));
              console.warn("[Dungeons] structured clone rejected a dungeon value \u2014 used JSON fallback:", (error == null ? void 0 : error.name) || error);
            } catch (fallbackError) {
              reject(fallbackError);
              return;
            }
          }
          request.onsuccess = () => resolve({ success: true });
          request.onerror = () => reject(request.error);
        });
      }
      /**
       * Sanitize dungeon object for IndexedDB storage.
       * Removes Promises and other non-serializable values; ensures object is safe for IndexedDB storage.
       */
      sanitizeDungeonForStorage(dungeon) {
        const MAX_ACTIVE_MOBS_TO_STORE = 250;
        const prunedDungeon = (() => {
          if (!dungeon || typeof dungeon !== "object") return dungeon;
          const next = { ...dungeon };
          if (next.mobs && typeof next.mobs === "object") {
            next.mobs = { ...next.mobs };
            if (Array.isArray(next.mobs.activeMobs) && next.mobs.activeMobs.length > MAX_ACTIVE_MOBS_TO_STORE) {
              next.mobs.activeMobs = next.mobs.activeMobs.slice(-MAX_ACTIVE_MOBS_TO_STORE);
            }
          }
          delete next.shadowAllocation;
          delete next._completing;
          delete next._pooledMobDamageMap;
          if (Array.isArray(next.corpsePile) && next.corpsePile.length > 750) {
            next.corpsePile = next.corpsePile.slice(-750);
          }
          const MAX_SHADOW_STATE = 400;
          const hpIsMap = next.shadowHP instanceof Map;
          const cdIsMap = next.shadowCombatData instanceof Map;
          const hpKeys = hpIsMap ? [...next.shadowHP.keys()] : Object.keys(next.shadowHP || {});
          const keepIds = hpKeys.length > MAX_SHADOW_STATE ? new Set(hpKeys.slice(-MAX_SHADOW_STATE)) : null;
          if (hpIsMap || next.shadowHP) {
            const shadowHPObj = {};
            const src = hpIsMap ? next.shadowHP : new Map(Object.entries(next.shadowHP || {}));
            src.forEach((value, key) => {
              if (!keepIds || keepIds.has(key)) shadowHPObj[key] = value;
            });
            next.shadowHP = shadowHPObj;
          }
          if (cdIsMap || next.shadowCombatData) {
            const combatObj = {};
            const src = cdIsMap ? next.shadowCombatData : new Map(Object.entries(next.shadowCombatData || {}));
            src.forEach((value, key) => {
              if (!keepIds || keepIds.has(key)) combatObj[key] = value;
            });
            next.shadowCombatData = combatObj;
          }
          delete next._lastResurrectionAttempt;
          delete next._pooledMobRankGroups;
          delete next._shadowLastProcessed;
          if (next.shadowContributions && typeof next.shadowContributions === "object" && !next.shadowContributions._packed) {
            const src = next.shadowContributions;
            const ids = [], mobsKilled = [], bossDamage = [];
            for (const key of Object.keys(src)) {
              const e = src[key];
              if (!e) continue;
              ids.push(key);
              mobsKilled.push(Number(e.mobsKilled) || 0);
              bossDamage.push(Number(e.bossDamage) || 0);
            }
            next.shadowContributions = { _packed: 1, ids, mobsKilled, bossDamage };
          }
          return next;
        })();
        return prunedDungeon;
      }
      /** Last-resort JSON sanitize — only used if structured clone rejects a value. */
      _jsonSanitizeFallback(dungeon) {
        return JSON.parse(
          JSON.stringify(dungeon, (key, value) => {
            if (value instanceof Promise) return void 0;
            if (typeof value === "function") return void 0;
            if (value instanceof Map) {
              const obj = {};
              value.forEach((v, k) => {
                obj[k] = v;
              });
              return obj;
            }
            return value;
          })
        );
      }
      async getAllDungeons() {
        return this._getAllFromStore();
      }
      async deleteDungeon(channelKey) {
        if (!this.db) await this.init();
        return new Promise((resolve, reject) => {
          const transaction = this.db.transaction([this.storeName], "readwrite");
          const store = transaction.objectStore(this.storeName);
          const index = store.index("channelKey");
          const request = index.getKey(channelKey);
          request.onsuccess = () => {
            const key = request.result;
            if (key) {
              const deleteRequest = store.delete(key);
              deleteRequest.onsuccess = () => resolve({ success: true });
              deleteRequest.onerror = () => reject(deleteRequest.error);
            } else {
              resolve({ success: false, reason: "Not found" });
            }
          };
          request.onerror = () => reject(request.error);
        });
      }
      async clearCompletedDungeons() {
        if (!this.db) await this.init();
        return new Promise((resolve, reject) => {
          const transaction = this.db.transaction([this.storeName], "readwrite");
          const store = transaction.objectStore(this.storeName);
          let deleted = 0;
          const request = store.openCursor();
          request.onsuccess = (event) => {
            const cursor = event.target.result;
            if (!cursor) return;
            const d = cursor.value;
            if (d && (d.completed === true || d.failed === true)) {
              const deleteRequest = cursor.delete();
              deleteRequest.onerror = (delEvent) => {
                delEvent.preventDefault();
                delEvent.stopPropagation();
              };
              deleted++;
            }
            cursor.continue();
          };
          request.onerror = () => reject(request.error);
          transaction.oncomplete = () => resolve({ deleted });
          transaction.onerror = () => reject(transaction.error);
        });
      }
      close() {
        if (this.db) {
          this.db.close();
          this.db = null;
        }
      }
    };
    var MobBossStorageManager = class {
      constructor(userId) {
        this.userId = userId || "default";
        this.dbName = `MobBossDB_${this.userId}`;
        this.dbVersion = 2;
        this.bossStoreName = "bosses";
        this.db = null;
        this._lastBossSaveFraction = /* @__PURE__ */ new Map();
        this._logHandlers = {
          debug: null,
          warn: null,
          error: null
        };
        this._warnOnceKeys = /* @__PURE__ */ new Set();
      }
      setLogHandlers(handlers = {}) {
        if (!handlers || typeof handlers !== "object") return;
        if (typeof handlers.debug === "function") this._logHandlers.debug = handlers.debug;
        if (typeof handlers.warn === "function") this._logHandlers.warn = handlers.warn;
        if (typeof handlers.error === "function") this._logHandlers.error = handlers.error;
      }
      _logDebug(message, context = null) {
        const handler = this._logHandlers.debug;
        if (typeof handler === "function") {
          handler(message, context);
        }
      }
      _logWarn(message, context = null, onceKey = null) {
        if (onceKey && this._warnOnceKeys.has(onceKey)) return;
        onceKey && this._warnOnceKeys.add(onceKey);
        const handler = this._logHandlers.warn;
        if (typeof handler === "function") {
          handler(message, context);
          return;
        }
        console.warn(`[MobBossStorageManager] ${message}`, context || "");
      }
      _logError(message, context = null, error = null) {
        const handler = this._logHandlers.error;
        if (typeof handler === "function") {
          handler(message, context, error);
          return;
        }
        console.error(`[MobBossStorageManager] ${message}`, context || "", error || "");
      }
      async init() {
        if (this.db) return this.db;
        this.db = await openIndexedDbDatabase({
          dbName: this.dbName,
          dbVersion: this.dbVersion,
          onUpgrade: (event) => {
            const db = event.target.result;
            const oldVersion = event.oldVersion;
            if (!db.objectStoreNames.contains(this.bossStoreName)) {
              const bossStore = db.createObjectStore(this.bossStoreName, { keyPath: "id" });
              bossStore.createIndex("dungeonKey", "dungeonKey", { unique: true });
              bossStore.createIndex("rank", "rank", { unique: false });
              bossStore.createIndex("spawnedAt", "spawnedAt", { unique: false });
            }
          },
          onBlocked: () => {
            var _a, _b;
            try {
              (_b = (_a = BdApi.UI) == null ? void 0 : _a.showToast) == null ? void 0 : _b.call(
                _a,
                "Dungeons: close other Discord tabs/windows to upgrade mob/boss data.",
                { type: "warning", timeout: 8e3 }
              );
            } catch (_) {
            }
          }
        });
        return this.db;
      }
      async _withSingleStore(storeName, mode, operation) {
        if (!this.db) await this.init();
        return new Promise((resolve, reject) => {
          const transaction = this.db.transaction([storeName], mode);
          const store = transaction.objectStore(storeName);
          operation(store, transaction, resolve, reject);
        });
      }
      /**
       * Save boss to database
       */
      async saveBoss(boss, dungeonKey) {
        const bossData = {
          ...boss,
          id: boss.id || `boss_${dungeonKey}`,
          dungeonKey,
          cachedAt: Date.now()
        };
        const fraction = bossData.maxHp ? bossData.hp / bossData.maxHp : 1;
        const prevFraction = this._lastBossSaveFraction.get(bossData.id);
        if (prevFraction !== void 0 && Math.abs(prevFraction - fraction) < 0.1 && fraction < 1) {
          return { success: true, skipped: true, reason: "unchanged_threshold" };
        }
        return this._withSingleStore(
          this.bossStoreName,
          "readwrite",
          (store, _tx, resolve, reject) => {
            const request = store.put(bossData);
            request.onsuccess = () => {
              this._lastBossSaveFraction.set(bossData.id, fraction);
              resolve({ success: true, id: bossData.id });
            };
            request.onerror = () => reject(request.error);
          }
        );
      }
      close() {
        if (this.db) {
          this.db.close();
          this.db = null;
        }
      }
    };
    module2.exports = {
      DungeonStorageManager,
      MobBossStorageManager
    };
  }
});

// src/Dungeons/settings-persistence.js
var require_settings_persistence = __commonJS({
  "src/Dungeons/settings-persistence.js"(exports2, module2) {
    var { DungeonStorageManager, MobBossStorageManager } = require_storage();
    var RANK_KILL_MULT = Object.freeze({
      E: 0.4,
      D: 0.5,
      C: 0.75,
      B: 1.25,
      A: 2,
      S: 3,
      SS: 4,
      SSS: 5,
      "SSS+": 6.5,
      NH: 8,
      Monarch: 9,
      "Monarch+": 10
    });
    module2.exports = {
      async initStorage() {
        try {
          const userId = await this.getUserId();
          this.storageManager = new DungeonStorageManager(userId);
          await this.storageManager.init();
          this.mobBossStorageManager = new MobBossStorageManager(userId);
          this.mobBossStorageManager.setLogHandlers({
            debug: (message, context) => this.debugLog("MOB_BOSS_STORAGE", message, context),
            warn: (message, context) => this.debugLog("MOB_BOSS_STORAGE_WARN", message, context),
            error: (message, context, error) => this.errorLog("MOB_BOSS_STORAGE", message, context, error)
          });
          await this.mobBossStorageManager.init();
          this.debugLog("MobBossStorageManager initialized successfully");
        } catch (error) {
          this.errorLog("Failed to initialize storage", error);
          this.storageManager = null;
          this.mobBossStorageManager = null;
        }
      },
      async getUserId() {
        var _a, _b, _c, _d;
        try {
          if (window.Discord && window.Discord.user && window.Discord.user.id) {
            return window.Discord.user.id;
          }
          const UserStore = ((_b = (_a = BdApi.Webpack) == null ? void 0 : _a.getStore) == null ? void 0 : _b.call(_a, "UserStore")) || // Optional chaining INSIDE the filter is banned (AGENTS.md) —
          // BdApi's matcher silently returns null. Use `m && m.foo`.
          ((_d = (_c = BdApi.Webpack) == null ? void 0 : _c.getModule) == null ? void 0 : _d.call(_c, (m) => m && m.getCurrentUser));
          if (UserStore && UserStore.getCurrentUser) {
            const user = UserStore.getCurrentUser();
            if (user && user.id) return user.id;
          }
        } catch (error) {
          this.debugLog("Failed to get user ID", error);
        }
        return "default";
      },
      async _loadSettingsBackupFromIndexedDb() {
        if (!this.saveManager) return null;
        try {
          const [latestBackup] = await this.saveManager.getBackups("settings", 1);
          const backupData = (latestBackup == null ? void 0 : latestBackup.data) || null;
          if (!backupData) return null;
          this.debugLog("LOAD_SETTINGS", "Loaded from IndexedDB backup");
          try {
            await this.saveManager.save("settings", backupData);
            this.debugLog("LOAD_SETTINGS", "Restored backup to main");
          } catch (restoreError) {
            this.errorLog("LOAD_SETTINGS", "Failed to restore backup", restoreError);
          }
          return backupData;
        } catch (error) {
          this.errorLog("LOAD_SETTINGS", "IndexedDB backup load failed", error);
          return null;
        }
      },
      async loadSettings() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _i;
        try {
          let saved = null;
          if (this.saveManager) {
            try {
              saved = await this.saveManager.load("settings");
              if (saved) {
                this.debugLog("LOAD_SETTINGS", "Loaded from IndexedDB");
              }
            } catch (error) {
              this.errorLog("LOAD_SETTINGS", "IndexedDB load failed", error);
            }
          }
          if (!saved) {
            try {
              saved = BdApi.Data.load("Dungeons", "settings");
              if (saved) {
                this.debugLog("LOAD_SETTINGS", "Loaded from BdApi.Data (fallback)");
                if (this.saveManager) {
                  try {
                    await this.saveManager.save("settings", saved);
                    this.debugLog("LOAD_SETTINGS", "Migrated to IndexedDB");
                  } catch (migrateError) {
                    this.errorLog("LOAD_SETTINGS", "Migration to IndexedDB failed", migrateError);
                  }
                }
              }
            } catch (error) {
              this.errorLog("LOAD_SETTINGS", "BdApi.Data load failed", error);
            }
          }
          if (!saved) {
            saved = await this._loadSettingsBackupFromIndexedDb();
          }
          if (!saved) {
            try {
              saved = BdApi.Data.load("Dungeons", "settings_backup");
              if (saved) {
                this.debugLog("LOAD_SETTINGS", "Loaded from BdApi.Data backup");
                if (this.saveManager) {
                  try {
                    await this.saveManager.save("settings", saved);
                    this.debugLog("LOAD_SETTINGS", "Migrated backup to IndexedDB");
                  } catch (migrateError) {
                    this.errorLog("LOAD_SETTINGS", "Migration failed", migrateError);
                  }
                }
              }
            } catch (error) {
              this.errorLog("LOAD_SETTINGS", "BdApi.Data backup load failed", error);
            }
          }
          if (saved) {
            this.settings = { ...this.defaultSettings, ...saved };
            const preMigrationBackup = structuredClone(this.settings);
            try {
              const currentVersion = this.settings.settingsVersion || 0;
              if (currentVersion < 1) {
                this.settings.bossGateMinDurationMs ??= this.defaultSettings.bossGateMinDurationMs;
                this.settings.bossGateRequiredMobKills ??= this.defaultSettings.bossGateRequiredMobKills;
                this.settings.settingsVersion = 1;
              }
              if (currentVersion < 2) {
                const legacyMobCap = Number((_a = this.settings) == null ? void 0 : _a.mobMaxActiveCap);
                if (!Number.isFinite(legacyMobCap) || legacyMobCap <= 0 || legacyMobCap === 500) {
                  this.settings.mobMaxActiveCap = this.defaultSettings.mobMaxActiveCap;
                }
                this.settings.settingsVersion = 2;
              }
              if (currentVersion < 3) {
                const legacyMobCap = Number((_b = this.settings) == null ? void 0 : _b.mobMaxActiveCap);
                if (!Number.isFinite(legacyMobCap) || legacyMobCap <= 0 || legacyMobCap === 600) {
                  this.settings.mobMaxActiveCap = this.defaultSettings.mobMaxActiveCap;
                }
                this.settings.settingsVersion = 3;
              }
              if (currentVersion < 4) {
                const legacyMobCap = Number((_c = this.settings) == null ? void 0 : _c.mobMaxActiveCap);
                if (!Number.isFinite(legacyMobCap) || legacyMobCap <= 0 || legacyMobCap === 1e3) {
                  this.settings.mobMaxActiveCap = this.defaultSettings.mobMaxActiveCap;
                }
                this.settings.settingsVersion = 4;
              }
              if (currentVersion < 5) {
                if (Number((_d = this.settings) == null ? void 0 : _d.shadowMobTargetShare) === 0.25) {
                  this.settings.shadowMobTargetShare = this.defaultSettings.shadowMobTargetShare;
                }
                if (Number((_e = this.settings) == null ? void 0 : _e.bossGateMinDurationMs) === 18e4) {
                  this.settings.bossGateMinDurationMs = this.defaultSettings.bossGateMinDurationMs;
                }
                if (Number((_f = this.settings) == null ? void 0 : _f.bossGateRequiredMobKills) === 0) {
                  this.settings.bossGateRequiredMobKills = this.defaultSettings.bossGateRequiredMobKills;
                }
                this.settings.settingsVersion = 5;
              }
            } catch (migrationError) {
              (_g = this.errorLog) == null ? void 0 : _g.call(this, "SETTINGS", "Migration failed, restoring backup", migrationError);
              this.settings = preMigrationBackup;
            }
            const validKeys = new Set(Object.keys(this.defaultSettings));
            for (const key of Object.keys(this.settings)) {
              if (!validKeys.has(key)) {
                (_h = this.debugLog) == null ? void 0 : _h.call(this, "SETTINGS", `Removing unknown setting key: ${key}`);
                delete this.settings[key];
              }
            }
            await this.initializeUserStats();
          } else {
            await this.initializeUserStats();
          }
          const sanitizedKeys = this.sanitizeCriticalCombatSettings();
          if (sanitizedKeys.length > 0) {
            (_i = this.debugLog) == null ? void 0 : _i.call(this, "SETTINGS", "Sanitized combat setting keys", sanitizedKeys);
            this.saveSettings();
          }
        } catch (error) {
          this.errorLog("Failed to load settings", error);
          this.settings = { ...this.defaultSettings };
        }
      },
      sanitizeCriticalCombatSettings() {
        var _a, _b, _c, _d, _e, _f, _g;
        if (!this.settings || typeof this.settings !== "object") return [];
        const changedKeys = [];
        const isSameValue = (a, b) => {
          if (Array.isArray(a) && Array.isArray(b)) {
            if (a.length !== b.length) return false;
            for (let i = 0; i < a.length; i++) {
              if (a[i] !== b[i]) return false;
            }
            return true;
          }
          return a === b;
        };
        const setIfChanged = (key, value) => {
          if (isSameValue(this.settings[key], value)) return;
          this.settings[key] = value;
          changedKeys.push(key);
        };
        const bossGateEnabled = ((_a = this.settings) == null ? void 0 : _a.bossGateEnabled) !== false;
        setIfChanged("bossGateEnabled", bossGateEnabled);
        const bossGateMinDurationMsRaw = Number((_b = this.settings) == null ? void 0 : _b.bossGateMinDurationMs);
        const bossGateMinDurationMs = Number.isFinite(bossGateMinDurationMsRaw) && bossGateMinDurationMsRaw >= 5e3 ? Math.floor(bossGateMinDurationMsRaw) : this.defaultSettings.bossGateMinDurationMs;
        setIfChanged("bossGateMinDurationMs", bossGateMinDurationMs);
        const bossGateRequiredMobKillsRaw = Number((_c = this.settings) == null ? void 0 : _c.bossGateRequiredMobKills);
        const bossGateRequiredMobKills = Number.isFinite(bossGateRequiredMobKillsRaw) && bossGateRequiredMobKillsRaw >= 0 ? Math.floor(bossGateRequiredMobKillsRaw) : this.defaultSettings.bossGateRequiredMobKills;
        setIfChanged("bossGateRequiredMobKills", bossGateRequiredMobKills);
        const mobWaveBaseCountRaw = Number((_d = this.settings) == null ? void 0 : _d.mobWaveBaseCount);
        const mobWaveBaseCount = Number.isFinite(mobWaveBaseCountRaw) ? this.clampNumber(Math.floor(mobWaveBaseCountRaw), 1, 5e3) : this.defaultSettings.mobWaveBaseCount;
        setIfChanged("mobWaveBaseCount", mobWaveBaseCount);
        const mobWaveVariancePercentRaw = Number((_e = this.settings) == null ? void 0 : _e.mobWaveVariancePercent);
        const mobWaveVariancePercent = Number.isFinite(mobWaveVariancePercentRaw) ? this.clampNumber(mobWaveVariancePercentRaw, 0, 0.95) : this.defaultSettings.mobWaveVariancePercent;
        setIfChanged("mobWaveVariancePercent", mobWaveVariancePercent);
        const defaultRankList = Array.isArray((_f = this.defaultSettings) == null ? void 0 : _f.dungeonRanks) ? this.defaultSettings.dungeonRanks : ["E"];
        const incomingRankList = Array.isArray((_g = this.settings) == null ? void 0 : _g.dungeonRanks) ? this.settings.dungeonRanks : [];
        const normalizedRankList = [...new Set(
          incomingRankList.map((rank) => typeof rank === "string" ? rank.trim() : "").filter(Boolean)
        )];
        setIfChanged(
          "dungeonRanks",
          normalizedRankList.length > 0 ? normalizedRankList : [...defaultRankList]
        );
        return changedKeys;
      },
      getDungeonRankList() {
        var _a, _b;
        const settingsRanks = Array.isArray((_a = this.settings) == null ? void 0 : _a.dungeonRanks) ? this.settings.dungeonRanks : [];
        const normalizedSettingRanks = [...new Set(
          settingsRanks.map((rank) => typeof rank === "string" ? rank.trim() : "").filter(Boolean)
        )];
        if (normalizedSettingRanks.length > 0) return normalizedSettingRanks;
        const defaultRanks = Array.isArray((_b = this.defaultSettings) == null ? void 0 : _b.dungeonRanks) ? this.defaultSettings.dungeonRanks : [];
        if (defaultRanks.length > 0) return [...defaultRanks];
        return ["E"];
      },
      // Optional dungeonRank scales requiredMobKills by gate rank (lore pacing:
      // an E-gate is a den clear, a Monarch+ gate is a war campaign before the
      // general). settings.bossGateRequiredMobKills is the BASE (default 40);
      // with the default base: E 16 · C 30 · A 80 · S 120 · SSS 200 · Monarch+ 400.
      // Callers without a rank in scope get the unscaled base (multiplier 1).
      getBossGateRuntimeConfig(dungeonRank = null, mobCapacity = null) {
        var _a, _b, _c, _d;
        const minDurationRaw = Number((_a = this.settings) == null ? void 0 : _a.bossGateMinDurationMs);
        const requiredMobKillsRaw = Number((_b = this.settings) == null ? void 0 : _b.bossGateRequiredMobKills);
        const baseKills = Number.isFinite(requiredMobKillsRaw) && requiredMobKillsRaw >= 0 ? Math.floor(requiredMobKillsRaw) : this.defaultSettings.bossGateRequiredMobKills;
        const killMult = dungeonRank != null ? RANK_KILL_MULT[dungeonRank] ?? 1 : 1;
        let requiredMobKills = Math.max(0, Math.round(baseKills * killMult));
        const capacity = Number(mobCapacity);
        if (Number.isFinite(capacity) && capacity > 0) {
          const cullRaw = Number((_c = this.settings) == null ? void 0 : _c.warGateCullPercent);
          const cullPct = Number.isFinite(cullRaw) ? this.clampNumber(cullRaw, 0, 0.5) : this.defaultSettings.warGateCullPercent ?? 0.1;
          requiredMobKills = Math.max(requiredMobKills, Math.floor(capacity * cullPct));
        }
        return {
          enabled: ((_d = this.settings) == null ? void 0 : _d.bossGateEnabled) !== false,
          minDurationMs: Number.isFinite(minDurationRaw) && minDurationRaw >= 5e3 ? Math.floor(minDurationRaw) : this.defaultSettings.bossGateMinDurationMs,
          requiredMobKills
        };
      },
      getMobWaveRuntimeConfig() {
        var _a, _b;
        const baseSpawnRaw = Number((_a = this.settings) == null ? void 0 : _a.mobWaveBaseCount);
        const varianceRaw = Number((_b = this.settings) == null ? void 0 : _b.mobWaveVariancePercent);
        return {
          baseSpawnCount: Number.isFinite(baseSpawnRaw) ? this.clampNumber(Math.floor(baseSpawnRaw), 1, 5e3) : this.defaultSettings.mobWaveBaseCount,
          variancePercent: Number.isFinite(varianceRaw) ? this.clampNumber(varianceRaw, 0, 0.95) : this.defaultSettings.mobWaveVariancePercent
        };
      },
      saveSettings(immediate = false) {
        if (immediate) {
          if (this._saveSettingsTimer) {
            this._timeouts.delete(this._saveSettingsTimer);
            clearTimeout(this._saveSettingsTimer);
            this._saveSettingsTimer = null;
          }
          this._saveSettingsDirty = false;
          return this._saveSettingsImmediate();
        }
        this._saveSettingsDirty = true;
        if (this._saveSettingsTimer) return;
        this._saveSettingsTimer = setTimeout(() => {
          this._timeouts.delete(this._saveSettingsTimer);
          this._saveSettingsTimer = null;
          if (this._saveSettingsDirty) {
            this._saveSettingsDirty = false;
            this._saveSettingsImmediate();
          }
        }, 3e3);
        this._timeouts.add(this._saveSettingsTimer);
      },
      markCombatSettingsDirty(reason = null) {
        this._combatSettingsDirty = true;
        if (this._perfTelemetry) {
          this._perfTelemetry.combatDirtyMarkCount = (this._perfTelemetry.combatDirtyMarkCount || 0) + 1;
          if (reason) {
            this._perfTelemetry.lastCombatDirtyReason = String(reason);
          }
        }
        const combatLoopRunning = Boolean(this._combatLoopInterval || this._combatLoopInFlight);
        if (!combatLoopRunning) {
          this.saveSettings();
          return;
        }
        if (!this._combatSettingsFallbackFlushTimer && typeof this._setTrackedTimeout === "function") {
          this._combatSettingsFallbackFlushTimer = this._setTrackedTimeout(() => {
            this._combatSettingsFallbackFlushTimer = null;
            this.flushCombatSettingsDirty(Date.now(), true);
          }, 12e3);
        }
      },
      flushCombatSettingsDirty(now = Date.now(), force = false) {
        if (!this._combatSettingsDirty) return false;
        const flushIntervalMs = Number.isFinite(this._combatSettingsFlushIntervalMs) ? Math.max(500, this._combatSettingsFlushIntervalMs) : 1500;
        const lastFlushAt = Number(this._combatSettingsLastFlushAt) || 0;
        if (!force && now - lastFlushAt < flushIntervalMs) return false;
        this._combatSettingsLastFlushAt = now;
        this._combatSettingsDirty = false;
        if (this._combatSettingsFallbackFlushTimer) {
          this._timeouts.delete(this._combatSettingsFallbackFlushTimer);
          clearTimeout(this._combatSettingsFallbackFlushTimer);
          this._combatSettingsFallbackFlushTimer = null;
        }
        this.saveSettings();
        return true;
      },
      async _saveSettingsImmediate() {
        var _a;
        try {
          const now = Date.now();
          const shouldLog = ((_a = this.settings) == null ? void 0 : _a.debug) && (!this._lastSaveLogTime || now - this._lastSaveLogTime > 3e4);
          if (this.saveManager) {
            try {
              if (!this._settingsBackupCounter) this._settingsBackupCounter = 0;
              this._settingsBackupCounter++;
              const createBackup = this._settingsBackupCounter >= 10;
              if (createBackup) this._settingsBackupCounter = 0;
              await this.saveManager.save("settings", this.settings, createBackup);
              if (shouldLog) {
                this.debugLog("SAVE_SETTINGS", "Saved to IndexedDB", {
                  timestamp: (/* @__PURE__ */ new Date()).toISOString()
                });
              }
            } catch (error) {
              this.errorLog("SAVE_SETTINGS", "IndexedDB save failed", error);
            }
          }
          const settingsSnapshot = structuredClone(this.settings);
          setTimeout(() => {
            let saveSuccess = false;
            let lastError = null;
            for (let attempt = 0; attempt < 3; attempt++) {
              try {
                BdApi.Data.save("Dungeons", "settings", settingsSnapshot);
                saveSuccess = true;
                if (shouldLog) {
                  this.debugLog("SAVE_SETTINGS", "Saved to BdApi.Data", {
                    attempt: attempt + 1,
                    timestamp: (/* @__PURE__ */ new Date()).toISOString()
                  });
                }
                break;
              } catch (error) {
                lastError = error;
              }
            }
            if (!saveSuccess) {
              this.errorLog("SAVE_SETTINGS", "BdApi.Data save failed after 3 attempts", lastError);
            }
            try {
              BdApi.Data.save("Dungeons", "settings_backup", settingsSnapshot);
              if (shouldLog) {
                this.debugLog("SAVE_SETTINGS", "BdApi.Data backup saved");
              }
            } catch (backupError) {
              this.errorLog("SAVE_SETTINGS_BACKUP", "BdApi.Data backup save failed", backupError);
            }
          }, 0);
          if (shouldLog) {
            this._lastSaveLogTime = now;
          }
        } catch (error) {
          this.errorLog("Failed to save settings", error);
        }
      }
    };
  }
});

// src/Dungeons/stats-integration.js
var require_stats_integration = __commonJS({
  "src/Dungeons/stats-integration.js"(exports2, module2) {
    var SLEvents = require_event_bus();
    module2.exports = {
      async initializeUserStats() {
        var _a, _b;
        const totalStats = this.getUserEffectiveStats();
        const vitality = totalStats.vitality || 0;
        const intelligence = totalStats.intelligence || 0;
        const rank = ((_b = (_a = this.soloLevelingStats) == null ? void 0 : _a.settings) == null ? void 0 : _b.rank) || "E";
        const shadowCount = this.shadowArmy ? await this.getShadowCount() : 0;
        if (!Number.isFinite(this.settings.userMaxHP)) {
          const rankIndex = this.getRankIndexValue(rank);
          const baseHP = 100 + vitality * 10 + rankIndex * 50;
          const shadowArmyBonus = shadowCount * 25;
          this.settings.userMaxHP = baseHP + shadowArmyBonus;
          if (!Number.isFinite(this.settings.userHP)) {
            this.settings.userHP = this.settings.userMaxHP;
          }
        }
        if (!Number.isFinite(this.settings.userMaxMana)) {
          this.settings.userMaxMana = 100 + intelligence * 10 + 0;
          if (!Number.isFinite(this.settings.userMana)) {
            this.settings.userMana = this.settings.userMaxMana;
          }
        }
      },
      async getShadowCount() {
        var _a, _b, _c, _d;
        const now = Date.now();
        if (this._shadowCountCache && now - this._shadowCountCache.timestamp < 5e3) {
          return this._shadowCountCache.count;
        }
        try {
          if (!((_a = this.shadowArmy) == null ? void 0 : _a.storageManager)) {
            return ((_b = this._shadowCountCache) == null ? void 0 : _b.count) ?? 0;
          }
          let count = 0;
          if (typeof this.shadowArmy.storageManager.getTotalCount === "function") {
            count = await this.shadowArmy.storageManager.getTotalCount();
          } else {
            this.errorLog("CRITICAL", "storageManager.getTotalCount missing \u2014 using cached shadow count");
            count = ((_c = this._shadowCountCache) == null ? void 0 : _c.count) ?? 0;
          }
          this._shadowCountCache = { count, timestamp: now };
          return count;
        } catch (error) {
          this.errorLog("CRITICAL", "Failed to get shadow count from IndexedDB", error);
          const cached = (_d = this._shadowCountCache) == null ? void 0 : _d.count;
          if (typeof cached === "number" && cached >= 0) return cached;
        }
        return 0;
      },
      invalidateShadowCountCache() {
        this._shadowCountCache = null;
      },
      getSkillTreeBonuses() {
        const now = Date.now();
        if (this._cache.skillTreeBonuses !== null && this._cache.skillTreeBonusesTime && now - this._cache.skillTreeBonusesTime < this._cache.skillTreeBonusesTTL) {
          return this._cache.skillTreeBonuses;
        }
        try {
          let bonuses = null;
          if (this.soloLevelingStats && typeof this.soloLevelingStats.getSkillTreeBonuses === "function") {
            bonuses = bonuses || this.soloLevelingStats.getSkillTreeBonuses() || null;
          }
          if (!bonuses) {
            bonuses = BdApi.Data.load("SkillTree", "bonuses") || null;
          }
          this._cache.skillTreeBonuses = bonuses;
          this._cache.skillTreeBonusesTime = now;
          return bonuses;
        } catch (error) {
          this.debugLog("GET_SKILL_TREE_BONUSES", "Failed to load SkillTree bonuses", error);
          this._cache.skillTreeBonuses = null;
          this._cache.skillTreeBonusesTime = now;
          return null;
        }
      },
      getSkillTreeInstance() {
        return this.validatePluginReference("SkillTree") || null;
      },
      getUserCombatCritChanceBonus() {
        var _a, _b;
        const bonuses = this.getSkillTreeBonuses() || null;
        const raw = Math.max(0, Number((bonuses == null ? void 0 : bonuses.critBonus) || 0));
        if (((_b = (_a = this.soloLevelingStats) == null ? void 0 : _a.settings) == null ? void 0 : _b.rank) === "Shadow Monarch") {
          return Math.min(1, raw * 3);
        }
        return Math.min(0.35, raw);
      },
      getUserCritDamageBonus() {
        var _a, _b;
        const bonuses = this.getSkillTreeBonuses() || null;
        const raw = Math.max(0, Number((bonuses == null ? void 0 : bonuses.critDamageBonus) || 0));
        if (((_b = (_a = this.soloLevelingStats) == null ? void 0 : _a.settings) == null ? void 0 : _b.rank) === "Shadow Monarch") {
          return raw * 2;
        }
        return raw;
      },
      getUserAttackCooldownReduction() {
        var _a, _b;
        const bonuses = this.getSkillTreeBonuses() || null;
        const raw = Math.max(0, Number((bonuses == null ? void 0 : bonuses.attackCooldownReduction) || 0));
        if (((_b = (_a = this.soloLevelingStats) == null ? void 0 : _a.settings) == null ? void 0 : _b.rank) === "Shadow Monarch") {
          return 0.75;
        }
        return Math.min(0.35, raw);
      },
      getUserDaggerThrowDamageBonus() {
        const bonuses = this.getSkillTreeBonuses() || null;
        return Math.max(0, Number((bonuses == null ? void 0 : bonuses.daggerThrowDamageBonus) || 0));
      },
      rollSkillTreeCombatCrit() {
        const critChance = this.getUserCombatCritChanceBonus();
        return critChance > 0 && Math.random() < critChance;
      },
      applyEnhancedCritMultiplier(damage, baseMultiplier, critDamageBonus = null) {
        const numericDamage = Number(damage);
        if (!Number.isFinite(numericDamage) || numericDamage <= 0) return 0;
        const multiplier = Number(baseMultiplier);
        if (!Number.isFinite(multiplier) || multiplier <= 1) {
          return Math.max(1, Math.floor(numericDamage));
        }
        const bonus = critDamageBonus === null || critDamageBonus === void 0 ? this.getUserCritDamageBonus() : Math.max(0, Number(critDamageBonus) || 0);
        if (bonus <= 0) {
          return Math.max(1, Math.floor(numericDamage));
        }
        const adjustedMultiplier = 1 + (multiplier - 1) * (1 + bonus);
        const nonCritDamage = numericDamage / multiplier;
        return Math.max(1, Math.floor(nonCritDamage * adjustedMultiplier));
      },
      getEffectiveUserAttackCooldownMs(attackInterval, fallbackInterval = 1e3) {
        const fallback = Number.isFinite(Number(fallbackInterval)) && Number(fallbackInterval) > 0 ? Number(fallbackInterval) : 1e3;
        const candidate = Number(attackInterval);
        const baseCooldown = Number.isFinite(candidate) && candidate > 0 ? candidate : fallback;
        const reduction = this.getUserAttackCooldownReduction();
        const adjustedCooldown = baseCooldown * (1 - reduction);
        if (typeof this.getEffectiveAttackCooldownMs === "function") {
          return this.getEffectiveAttackCooldownMs(adjustedCooldown, fallback);
        }
        return Math.max(800, Math.floor(adjustedCooldown));
      },
      getDungeonCombatSkillHudState(channelKey) {
        var _a, _b;
        const dungeon = (_b = (_a = this.activeDungeons) == null ? void 0 : _a.get) == null ? void 0 : _b.call(_a, channelKey);
        if (!(dungeon == null ? void 0 : dungeon.userParticipating)) return [];
        const skillTree = this.getSkillTreeInstance();
        if (!skillTree || typeof skillTree.getAvailableDungeonCombatSkillSnapshots !== "function") {
          return [];
        }
        return skillTree.getAvailableDungeonCombatSkillSnapshots().filter((snapshot) => (snapshot == null ? void 0 : snapshot.def) && snapshot.unlocked).map((snapshot) => {
          var _a2, _b2, _c;
          const def = snapshot.def;
          const effectiveManaCost = Math.max(0, Number(snapshot.effectiveManaCost ?? def.manaCost) || 0);
          const currentMana = Math.max(0, Number((_a2 = snapshot.mana) == null ? void 0 : _a2.current) || 0);
          const hasMana = currentMana >= effectiveManaCost;
          const isOnCooldown = snapshot.cooldownRemaining > 0;
          const needsDeploy = !dungeon.shadowsDeployed;
          const bossAlive = Number(((_b2 = dungeon == null ? void 0 : dungeon.boss) == null ? void 0 : _b2.hp) || 0) > 0;
          const liveMobs = (((_c = dungeon.mobs) == null ? void 0 : _c.activeMobs) || []).some((m) => m && m.hp > 0);
          const noEnemies = !bossAlive && !liveMobs;
          const disabled = isOnCooldown || !hasMana || needsDeploy || dungeon.completed || dungeon.failed || noEnemies;
          let stateClass = "is-ready";
          const manaPart = effectiveManaCost > 0 ? `${effectiveManaCost} Mana \u2022 ` : "No Mana Cost \u2022 ";
          let titleText = `${def.name} \u2022 ${manaPart}${Math.ceil(snapshot.effectiveCooldownMs / 1e3)}s cooldown`;
          if (isOnCooldown) {
            stateClass = "is-cooldown";
            titleText = `${def.name} ready in ${Math.ceil(snapshot.cooldownRemaining / 1e3)}s`;
          } else if (!hasMana) {
            stateClass = "is-starved";
            titleText = `${def.name} requires ${effectiveManaCost} Mana`;
          } else if (needsDeploy) {
            stateClass = "is-blocked";
            titleText = `Deploy shadows before using ${def.name}.`;
          } else if (noEnemies) {
            stateClass = "is-blocked";
            titleText = "No enemies to target.";
          }
          return {
            ...snapshot,
            hasMana,
            needsDeploy,
            disabled,
            stateClass,
            buttonText: isOnCooldown ? `${def.buttonLabel || def.name.toUpperCase()} ${Math.ceil(snapshot.cooldownRemaining / 1e3)}s` : def.buttonLabel || def.name.toUpperCase(),
            titleText
          };
        });
      },
      validatePluginReference(pluginName, instanceProperty) {
        const now = Date.now();
        const cacheKey = `${pluginName}_${instanceProperty || "none"}`;
        const cachedInstance = this._cache.pluginInstances[cacheKey];
        if (cachedInstance && // Zombie protection (matches shared/plugin-bridge.js:getPluginInstance) -- never
        // serve a cached instance that has begun tearing down since it was cached.
        !(cachedInstance._stopped || cachedInstance._isStopped) && this._cache.pluginInstancesTime[cacheKey] && now - this._cache.pluginInstancesTime[cacheKey] < this._cache.pluginInstancesTTL) {
          return cachedInstance;
        }
        if (!BdApi.Plugins.isEnabled(pluginName)) {
          this._cache.pluginInstances[cacheKey] = null;
          this._cache.pluginInstancesTime[cacheKey] = now;
          return null;
        }
        const plugin = BdApi.Plugins.get(pluginName);
        if (!(plugin == null ? void 0 : plugin.instance)) {
          this.debugLogOnce(`PLUGIN_MISSING:${pluginName}`, `Plugin ${pluginName} not available`);
          this._cache.pluginInstances[cacheKey] = null;
          this._cache.pluginInstancesTime[cacheKey] = now;
          return null;
        }
        if (plugin.instance._stopped || plugin.instance._isStopped) {
          this.debugLogOnce(`PLUGIN_STOPPED:${pluginName}`, `Plugin ${pluginName} is stopped \u2014 refusing stale reference`);
          this._cache.pluginInstances[cacheKey] = null;
          this._cache.pluginInstancesTime[cacheKey] = now;
          return null;
        }
        if (instanceProperty) {
          if (instanceProperty === "storageManager") {
            this._cache.pluginInstances[cacheKey] = plugin.instance;
            this._cache.pluginInstancesTime[cacheKey] = now;
            return plugin.instance;
          } else if (!plugin.instance[instanceProperty]) {
            this.debugLogOnce(
              `PLUGIN_MISSING_PROP:${pluginName}:${instanceProperty}`,
              `Plugin ${pluginName} missing ${instanceProperty}`
            );
            this._cache.pluginInstances[cacheKey] = null;
            this._cache.pluginInstancesTime[cacheKey] = now;
            return null;
          }
        }
        this._cache.pluginInstances[cacheKey] = plugin.instance;
        this._cache.pluginInstancesTime[cacheKey] = now;
        return plugin.instance;
      },
      async loadPluginReferences() {
        var _a, _b;
        try {
          const detachShadowExtractedListener = () => {
            if (!this._shadowExtractedListener) return;
            SLEvents == null ? void 0 : SLEvents.off("ShadowArmy:shadowExtracted", this._shadowExtractedListener);
            if (typeof document.removeEventListener === "function") {
              document.removeEventListener("shadowExtracted", this._shadowExtractedListener);
            }
            this._shadowExtractedListener = null;
          };
          const soloPlugin = this.validatePluginReference("SoloLevelingStats", "settings");
          if (soloPlugin) {
            this.soloLevelingStats = soloPlugin;
            await this.initializeUserStats();
            if (typeof this.soloLevelingStats.on === "function") {
              (_a = this._onStatsChangedUnsubscribe) == null ? void 0 : _a.call(this);
              const callback = () => {
                this._cache.userEffectiveStats = null;
                this._cache.userEffectiveStatsTime = 0;
              };
              this._onStatsChangedUnsubscribe = this.soloLevelingStats.on("statsChanged", callback);
            }
          } else {
            this.debugLogOnce(
              "PLUGIN_REF_MISSING:SoloLevelingStats",
              "SoloLevelingStats plugin not available"
            );
          }
          const shadowPlugin = this.validatePluginReference("ShadowArmy", "storageManager");
          if (shadowPlugin) {
            this.shadowArmy = shadowPlugin;
            if (shadowPlugin.storageManager) {
              this.debugLog("ShadowArmy plugin loaded successfully with storageManager");
            } else {
              this.debugLog(
                "ShadowArmy plugin loaded (storageManager will be available after initialization)"
              );
            }
            detachShadowExtractedListener();
            this._shadowExtractedListener = (data) => {
              var _a2;
              const now = Date.now();
              if (this._lastShadowExtractedTs && now - this._lastShadowExtractedTs < 50) return;
              this._lastShadowExtractedTs = now;
              const { shadowId, shadowData, mobId, success } = (data == null ? void 0 : data.detail) || data || {};
              if (success && mobId) {
                this.extractionEvents.set(mobId, {
                  success: true,
                  shadowId,
                  timestamp: Date.now()
                });
                this.debugLog(
                  `[Event] Shadow extracted: ${(shadowData == null ? void 0 : shadowData.name) || "Unknown"} (${(shadowData == null ? void 0 : shadowData.rank) || "?"}-rank)`
                );
              }
              this.invalidateShadowCountCache();
              this.invalidateShadowsCache();
              if (shadowId) {
                this._removeExtractedShadowFromAllocations(shadowId);
              }
              const activeDungeonCount = ((_a2 = this.activeDungeons) == null ? void 0 : _a2.size) || 0;
              if (activeDungeonCount === 0) {
                return;
              }
              this.recalculateUserHP();
              this.recalculateUserMana();
            };
            SLEvents == null ? void 0 : SLEvents.on("ShadowArmy:shadowExtracted", this._shadowExtractedListener);
            document.addEventListener("shadowExtracted", this._shadowExtractedListener);
            this.debugLog("Subscribed to ShadowArmy:shadowExtracted and shadowExtracted DOM events");
          } else {
            detachShadowExtractedListener();
            this.shadowArmy = null;
            this.debugLogOnce("PLUGIN_REF_MISSING:ShadowArmy", "ShadowArmy plugin not available");
          }
          const toastsPlugin = BdApi.Plugins.isEnabled("SoloLevelingToasts") ? BdApi.Plugins.get("SoloLevelingToasts") : null;
          if (((_b = toastsPlugin == null ? void 0 : toastsPlugin.instance) == null ? void 0 : _b.toastEngineVersion) >= 2 && typeof toastsPlugin.instance.showToast === "function") {
            this.toasts = toastsPlugin.instance;
            this.debugLog("SoloLevelingToasts plugin loaded successfully");
          } else {
            this.debugLogOnce(
              "PLUGIN_REF_MISSING:SoloLevelingToasts",
              "SoloLevelingToasts plugin not available, using fallback notifications"
            );
          }
        } catch (error) {
          this.errorLog("PLUGIN_REF", "Error loading plugin references", error);
        }
      }
    };
  }
});

// src/shared/discord-classes.js
var require_discord_classes = __commonJS({
  "src/shared/discord-classes.js"(exports2, module2) {
    var { Webpack } = BdApi;
    var _resolved = false;
    var _cls = {};
    var _sel = {};
    var _fb = {};
    var DEFS = {
      // Layout / Panels
      chatContent: [["chatContent"], "chatContent", '[class*="chatContent_"]'],
      sidebar: [["sidebar"], "sidebar", '[class*="sidebar_"]'],
      sidebarList: [["sidebar", "sidebarList"], "sidebarList", '[class*="sidebar_"]'],
      membersWrap: [["membersWrap"], "membersWrap", '[class*="membersWrap_"]'],
      members: [["membersWrap"], "members", '[class*="members_"]'],
      container: [["membersWrap"], "container", '[class*="container_"]'],
      privateChannels: [["privateChannels"], "privateChannels", '[class*="privateChannels_"]'],
      userProfileOuter: [["userProfileOuter"], "userProfileOuter", '[class*="userProfileOuter_"]'],
      searchResultsWrap: [["searchResultsWrap"], "searchResultsWrap", '[class*="searchResultsWrap_"]'],
      // Scrolling
      scroller: [["scroller", "thin"], "scroller", '[class*="scroller_"]'],
      scrollerBase: [["scrollerBase"], "scrollerBase", '[class*="scrollerBase_"]'],
      thin: [["scroller", "thin"], "thin", '[class*="thin_"]'],
      // Messages
      messageListItem: [["messageListItem"], "messageListItem", '[class*="messageListItem_"]'],
      message: [["message", "groupStart"], "message", '[class*="message_"]'],
      groupStart: [["message", "groupStart"], "groupStart", '[class*="groupStart_"]'],
      cozy: [["message", "cozy"], "cozy", '[class*="cozy_"]'],
      messageContent: [["messageContent"], "messageContent", '[class*="messageContent_"]'],
      markup: [["markup"], "markup", '[class*="markup_"]'],
      mentioned: [["mentioned"], "mentioned", '[class*="mentioned_"]'],
      // Message parts
      author: [null, "author", '[class*="author_"]'],
      username: [["username"], "username", '[class*="username_"]'],
      timestamp: [["timestamp"], "timestamp", '[class*="timestamp_"]'],
      avatar: [["avatar", "wrapper"], "avatar", '[class*="avatar_"]'],
      repliedMessage: [["repliedMessage"], "repliedMessage", '[class*="repliedMessage_"]'],
      embed: [["embed"], "embed", '[class*="embed_"]'],
      attachment: [["attachment"], "attachment", '[class*="attachment_"]'],
      embedWrapper: [["embedWrapper"], "embedWrapper", '[class*="embedWrapper_"]'],
      botTag: [["botTag"], "botTag", '[class*="botTag_"]'],
      // Header / Toolbar
      toolbar: [["updateIconForeground", "search", "toolbar"], "toolbar", '[class*="toolbar_"]'],
      titleWrapper: [["titleWrapper"], "titleWrapper", '[class*="titleWrapper_"]'],
      title: [["title", "lineClamp"], "title", '[class*="title_"]'],
      channelHeader: [["channelHeader"], "channelHeader", '[class*="channelHeader_"]'],
      // Input / Composer
      channelTextArea: [["channelTextArea"], "channelTextArea", '[class*="channelTextArea_"]'],
      textContainer: [["textContainer"], "textContainer", '[class*="textContainer_"]'],
      slateContainer: [["slateContainer"], "slateContainer", '[class*="slateContainer_"]'],
      editor: [["editor"], "editor", '[class*="editor_"]'],
      channelBottomBarArea: [["channelBottomBarArea"], "channelBottomBarArea", '[class*="channelBottomBarArea_"]'],
      scrollableContainer: [["scrollableContainer"], "scrollableContainer", '[class*="scrollableContainer_"]'],
      inner: [["inner"], "inner", '[class*="inner_"]'],
      // User panel / profile
      user: [["user"], "user", '[class*="user_"]'],
      nameTag: [["nameTag"], "nameTag", '[class*="nameTag_"]'],
      withTagAsButton: [["withTagAsButton"], "withTagAsButton", '[class*="withTagAsButton_"]'],
      panelSubtextContainer: [["panelSubtextContainer"], "panelSubtextContainer", '[class*="panelSubtextContainer_"]'],
      panelTitleContainer: [["panelTitleContainer"], "panelTitleContainer", '[class*="panelTitleContainer_"]'],
      // App layout
      base: [["base", "content"], "base", '[class*="base_"]'],
      content: [["base", "content"], "content", '[class*="content_"]'],
      layers: [["layers"], "layers", '[class*="layers_"]'],
      chat: [["chat"], "chat", '[class*="chat_"]'],
      chatLayerWrapper: [["chatLayerWrapper"], "chatLayerWrapper", '[class*="chatLayerWrapper_"]'],
      layerContainer: [["layerContainer"], "layerContainer", '[class*="layerContainer_"]'],
      panels: [["panels"], "panels", '[class*="panels_"]'],
      // Settings
      userSettings: [["standardSidebarView"], "standardSidebarView", '[class*="userSettings_"]'],
      standardSidebarView: [["standardSidebarView"], "standardSidebarView", '[class*="standardSidebarView_"]'],
      settingsContainer: [["settingsContainer"], "settingsContainer", '[class*="settingsContainer_"]'],
      searchBar: [["searchBar"], "searchBar", '[class*="searchBar_"]'],
      privateChannelsHeaderContainer: [["privateChannelsHeaderContainer"], "privateChannelsHeaderContainer", '[class*="privateChannelsHeaderContainer_"]'],
      // Messages (extended)
      messageList: [["messageList"], "messageList", '[class*="messageList_"]'],
      messageContainer: [["messageContainer"], "messageContainer", '[class*="messageContainer_"]'],
      messageGroupWrapper: [["messageGroupWrapper"], "messageGroupWrapper", '[class*="messageGroupWrapper_"]'],
      messages: [["messages"], "messages", '[class*="messages_"]'],
      messagesWrapper: [["messagesWrapper"], "messagesWrapper", '[class*="messagesWrapper_"]'],
      scrollerInner: [["scrollerInner"], "scrollerInner", '[class*="scrollerInner_"]'],
      systemMessage: [["systemMessage"], "systemMessage", '[class*="systemMessage_"]'],
      headerText: [["headerText"], "headerText", '[class*="headerText_"]'],
      // Guilds / Dock
      guilds: [["guilds", "wrapper"], "guilds", '[class*="guilds_"]'],
      wrapper: [["guilds", "wrapper"], "wrapper", '[class*="wrapper_"]'],
      // Forms / Composer
      form: [["form"], "form", '[class*="form_"]'],
      textArea: [["textArea"], "textArea", '[class*="textArea_"]'],
      slateTextArea: [["slateTextArea"], "slateTextArea", '[class*="slateTextArea_"]'],
      // Alerts / Badges / UI
      button: [["button"], "button", '[class*="button_"]'],
      listItem: [["listItem"], "listItem", '[class*="listItem_"]'],
      numberBadge: [["numberBadge"], "numberBadge", '[class*="numberBadge_"]'],
      mentionsBadge: [["mentionsBadge"], "mentionsBadge", '[class*="mentionsBadge_"]'],
      pill: [["pill"], "pill", '[class*="pill_"]'],
      // Probed 2026-03-13 (8 new stems)
      app: [null, "app", '[class*="app_"]'],
      bot: [["bot"], "bot", '[class*="bot_"]'],
      botText: [["botText"], "botText", '[class*="botText_"]'],
      channel: [["channel"], "channel", '[class*="channel_"]'],
      header: [["header"], "header", '[class*="header_"]'],
      name: [null, "name", '[class*="name_"]'],
      text: [["text"], "text", '[class*="text_"]'],
      thread: [["thread"], "thread", '[class*="thread_"]']
    };
    function _resolve() {
      const moduleCache = /* @__PURE__ */ new Map();
      for (const [name, [filterKeys, prop, fallback]] of Object.entries(DEFS)) {
        _fb[name] = fallback;
        let mod;
        if (filterKeys === null) {
          try {
            mod = Webpack.getModule(
              (m) => (m == null ? void 0 : m[prop]) && typeof m[prop] === "string" && /^\w+_\w{4,}/.test(m[prop])
            ) || null;
          } catch (_) {
            mod = null;
          }
        } else {
          const cacheKey = filterKeys.join("|");
          mod = moduleCache.get(cacheKey);
          if (mod === void 0) {
            try {
              mod = Webpack.getByKeys(...filterKeys) || null;
            } catch (_) {
              mod = null;
            }
            moduleCache.set(cacheKey, mod);
          }
        }
        const cls2 = mod == null ? void 0 : mod[prop];
        if (cls2 && typeof cls2 === "string" && !cls2.includes(" ")) {
          _cls[name] = cls2;
          _sel[name] = `.${cls2}`;
        } else {
          _cls[name] = "";
          _sel[name] = fallback;
        }
      }
      _resolved = true;
    }
    var sel = new Proxy(_sel, {
      get(target, prop) {
        if (!_resolved) _resolve();
        return target[prop];
      }
    });
    var cls = new Proxy(_cls, {
      get(target, prop) {
        if (!_resolved) _resolve();
        return target[prop];
      }
    });
    var fb = new Proxy(_fb, {
      get(target, prop) {
        if (!_resolved) _resolve();
        return target[prop];
      }
    });
    function refresh() {
      _resolved = false;
      _resolve();
    }
    function isResolved(name) {
      if (!_resolved) _resolve();
      return !!_cls[name];
    }
    function cssSelector(name, prefix = "", suffix = "") {
      if (!_resolved) _resolve();
      return `${prefix}${_sel[name]}${suffix}`;
    }
    function query(root, name) {
      if (!_resolved) _resolve();
      if (_cls[name]) {
        const el = root.querySelector(`.${_cls[name]}`);
        if (el) return el;
      }
      return root.querySelector(_fb[name]);
    }
    function queryAll(root, name) {
      if (!_resolved) _resolve();
      if (_cls[name]) {
        const list = root.querySelectorAll(`.${_cls[name]}`);
        if (list.length) return list;
      }
      return root.querySelectorAll(_fb[name]);
    }
    module2.exports = { sel, cls, fb, refresh, isResolved, cssSelector, query, queryAll };
  }
});

// src/Dungeons/channel-discovery.js
var require_channel_discovery = __commonJS({
  "src/Dungeons/channel-discovery.js"(exports2, module2) {
    var dc = require_discord_classes();
    module2.exports = {
      getAllGuildChannels(guildId) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        try {
          const cached = (_a = this._guildChannelCache) == null ? void 0 : _a.get(guildId);
          if (cached && Date.now() - cached.ts < this._guildChannelCacheTTL) {
            return cached.channels;
          }
          const ChannelStore = ((_c = (_b = BdApi.Webpack) == null ? void 0 : _b.getStore) == null ? void 0 : _c.call(_b, "ChannelStore")) || // Optional chaining INSIDE filters is banned (AGENTS.md).
          ((_e = (_d = BdApi.Webpack) == null ? void 0 : _d.getModule) == null ? void 0 : _e.call(_d, (m) => m && m.getChannel));
          if (ChannelStore) {
            let allChannels = [];
            if (ChannelStore.getChannels) {
              const channelsObj = ChannelStore.getChannels();
              const values = Object.values(channelsObj || {});
              allChannels = values.filter(
                (ch) => ch && (ch.id || ch.guild_id || ch.guildId) && typeof ch.type !== "undefined"
              );
            }
            if (!allChannels.length) {
              const GuildChannelStore = (_g = (_f = BdApi.Webpack) == null ? void 0 : _f.getStore) == null ? void 0 : _g.call(_f, "GuildChannelStore");
              if (GuildChannelStore == null ? void 0 : GuildChannelStore.getChannels) {
                const guildChannels = GuildChannelStore.getChannels(guildId);
                if (guildChannels) {
                  const selectableChannels = guildChannels.SELECTABLE || [];
                  allChannels = selectableChannels.map((item) => item.channel).filter((ch) => ch != null);
                }
              }
            }
            const guildTextChannels = allChannels.filter((channel) => {
              const channelGuildId = channel.guild_id || channel.guildId;
              const channelType = channel.type;
              const matchesGuild = channelGuildId === guildId;
              const isTextChannel = channelType === 0 || channelType === "0";
              return matchesGuild && isTextChannel;
            });
            (_h = this._guildChannelCache) == null ? void 0 : _h.set(guildId, { ts: Date.now(), channels: guildTextChannels });
            return guildTextChannels;
          }
        } catch (e) {
          this.errorLog("Error getting guild channels", e);
        }
        return [];
      },
      pickSpawnChannel(channelInfo) {
        var _a, _b, _c, _d;
        if (!channelInfo || !channelInfo.guildId || channelInfo.guildId === "DM") {
          return {
            channelKey: channelInfo ? `${channelInfo.guildId}_${channelInfo.channelId}` : null,
            channelInfo,
            source: "dm-or-missing"
          };
        }
        const allChannels = this.getAllGuildChannels(channelInfo.guildId) || [];
        const guildId = channelInfo.guildId;
        if (!this._UserGuildSettingsStore) {
          try {
            this._UserGuildSettingsStore = ((_b = (_a = BdApi.Webpack) == null ? void 0 : _a.getStore) == null ? void 0 : _b.call(_a, "UserGuildSettingsStore")) || // Optional chaining INSIDE filters is banned (AGENTS.md).
            ((_d = (_c = BdApi.Webpack) == null ? void 0 : _c.getModule) == null ? void 0 : _d.call(_c, (m) => m && m.isChannelMuted && m.isMuted)) || null;
          } catch (_) {
            this._UserGuildSettingsStore = null;
          }
        }
        const muteStore = this._UserGuildSettingsStore;
        const textChannels = this._getSpawnableGuildChannels(guildId, allChannels, muteStore);
        const available = textChannels.filter((ch) => {
          const key = `${guildId}_${ch.id}`;
          return !this.channelLocks.has(key) && !this.activeDungeons.has(key);
        });
        const pool = available.length ? available : textChannels;
        if (!pool.length) {
          return {
            channelKey: `${channelInfo.guildId}_${channelInfo.channelId}`,
            channelInfo,
            source: "no-channels"
          };
        }
        const chosen = pool[Math.floor(Math.random() * pool.length)];
        return {
          channelKey: `${channelInfo.guildId}_${chosen.id}`,
          channelInfo: {
            guildId: channelInfo.guildId,
            channelId: chosen.id,
            channelName: chosen.name
          },
          source: available.length ? "available-random" : "any-random"
        };
      },
      _getSpawnableGuildChannels(guildId, allChannels, muteStore) {
        var _a, _b, _c, _d;
        const now = Date.now();
        const cached = (_b = (_a = this._spawnableChannelCache) == null ? void 0 : _a.get) == null ? void 0 : _b.call(_a, guildId);
        if (cached && Array.isArray(cached.channels) && now - cached.ts < (this._spawnableChannelCacheTTL || 1e4)) {
          return cached.channels;
        }
        const textChannels = (allChannels || []).filter((ch) => {
          var _a2;
          const type = ch == null ? void 0 : ch.type;
          const isTextLike = type === 0 || type === 5 || type === 11 || type === 12 || type === void 0;
          if (!ch || !ch.id || !isTextLike) return false;
          if (muteStore) {
            try {
              if ((_a2 = muteStore.isChannelMuted) == null ? void 0 : _a2.call(muteStore, guildId, ch.id)) return false;
            } catch (_) {
            }
          }
          return true;
        });
        (_d = (_c = this._spawnableChannelCache) == null ? void 0 : _c.set) == null ? void 0 : _d.call(_c, guildId, { ts: now, channels: textChannels });
        return textChannels;
      },
      getChannelInfo() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m;
        try {
          const pathMatch = window.location.pathname.match(/channels\/(\d+)\/(\d+)/);
          if (pathMatch) {
            return { guildId: pathMatch[1], channelId: pathMatch[2] };
          }
          try {
            const ChannelStore = ((_b = (_a = BdApi.Webpack) == null ? void 0 : _a.getStore) == null ? void 0 : _b.call(_a, "ChannelStore")) || // Optional chaining INSIDE filters is banned (AGENTS.md).
            ((_d = (_c = BdApi.Webpack) == null ? void 0 : _c.getModule) == null ? void 0 : _d.call(_c, (m) => m && m.getChannel));
            if (ChannelStore) {
              const selectedChannelId = (_e = ChannelStore.getChannelId) == null ? void 0 : _e.call(ChannelStore);
              const selectedChannel = (_f = ChannelStore.getChannel) == null ? void 0 : _f.call(ChannelStore, selectedChannelId);
              if (selectedChannel) {
                return {
                  guildId: selectedChannel.guild_id || "DM",
                  channelId: selectedChannel.id
                };
              }
            }
            const GuildStore = ((_h = (_g = BdApi.Webpack) == null ? void 0 : _g.getStore) == null ? void 0 : _h.call(_g, "GuildStore")) || // Optional chaining INSIDE filters is banned (AGENTS.md).
            ((_j = (_i = BdApi.Webpack) == null ? void 0 : _i.getModule) == null ? void 0 : _j.call(_i, (m) => m && m.getGuild));
            if (GuildStore && ChannelStore) {
              const selectedChannelId = (_k = ChannelStore.getChannelId) == null ? void 0 : _k.call(ChannelStore);
              const selectedChannel = (_l = ChannelStore.getChannel) == null ? void 0 : _l.call(ChannelStore, selectedChannelId);
              if (selectedChannel) {
                const guildId = selectedChannel.guild_id || "DM";
                return { guildId, channelId: selectedChannel.id };
              }
            }
          } catch (e) {
          }
          const channelElement = dc.query(document, "channel");
          if (channelElement) {
            const reactKey = Object.keys(channelElement).find(
              (key) => key.startsWith("__reactFiber") || key.startsWith("__reactInternalInstance")
            );
            if (reactKey) {
              let fiber = channelElement[reactKey];
              for (let i = 0; i < 20 && fiber; i++) {
                const channel = (_m = fiber.memoizedProps) == null ? void 0 : _m.channel;
                if (channel) return { guildId: channel.guild_id || "DM", channelId: channel.id };
                fiber = fiber.return;
              }
            }
          }
          return null;
        } catch (error) {
          this.errorLog("Error getting channel info", error);
          return null;
        }
      },
      generateDungeonName(rank, biome) {
        const biomeNames = {
          Forest: ["Ant Nest", "Beast Forest", "Ancient Forest", "Insect Hive", "Beast Den"],
          Arctic: ["Frozen Tundra", "Ice Cavern", "Ice Elf Domain", "Sealed Ice Gate", "Frozen Depths"],
          Cavern: ["Burial Grounds", "Mining Tunnels", "Spider Nest", "Golem Cavern", "Cursed Mines"],
          Swamp: ["Naga Marsh", "Serpent Bog", "Undead Marsh", "Venom Pit", "Ghoul Swamp"],
          Mountains: ["Giant's Domain", "Titan Ridge", "Giant's Ravine", "Wyvern Peak", "Titan's Fortress"],
          Volcano: ["Infernal Crater", "Demon Forge", "Magma Chamber", "Demon Castle", "Brimstone Gate"],
          "Ancient Ruins": [
            "Cartenon Temple",
            "Architect's Shrine",
            "Golem Ruins",
            "Fallen Kingdom",
            "Ancient Shrine"
          ],
          "Dark Abyss": ["Void Chasm", "Shadow Realm", "Demon Gate", "Monarch's Lair", "Dimensional Rift"],
          "Tribal Grounds": [
            "Orc Encampment",
            "Orc Stronghold",
            "Ogre Lair",
            "Raiding Camp",
            "Chieftain's Fortress"
          ]
        };
        const names = biomeNames[biome] || ["Ancient Dungeon"];
        const name = names[Math.floor(Math.random() * names.length)];
        return `[${rank}] ${name}`;
      },
      generateBossName(rank, biome) {
        const biomeBosses = {
          Forest: ["Beast King", "Insect Queen", "Spider Matriarch", "Dire Wolf", "Elder Beast"],
          Arctic: ["Frost Giant", "Yeti Lord", "Ice Wyrm", "Ice Elf Commander", "Frost Bear Lord"],
          Cavern: [
            "Stone Guardian",
            "Ghoul Patriarch",
            "Spider Queen",
            "Centipede Lord",
            "Golem Lord"
          ],
          Swamp: ["Serpent King", "Naga Empress", "Venom Serpent", "Ghoul Warlord", "Naga Sovereign"],
          Mountains: ["Titan King", "Giant Chieftain", "Storm Giant", "Wyvern Sovereign", "Colossal Titan"],
          Volcano: ["Demon Lord", "Infernal Tyrant", "Lava Dragon", "Arch Demon", "Infernal Dragon"],
          "Ancient Ruins": [
            "Construct Overlord",
            "Golem Keeper",
            "Ancient Guardian",
            "Fallen Monarch",
            "Architect's Guardian"
          ],
          "Dark Abyss": [
            "Void Dragon",
            "Demon Emperor",
            "Abyssal Demon",
            "Abyss Lord",
            "Void Monarch"
          ],
          "Tribal Grounds": [
            "Orc Warlord",
            "Ogre Chieftain",
            "High Orc King",
            "Berserker Ogre",
            "Orc Shaman"
          ]
        };
        const bosses = biomeBosses[biome] || ["Ancient Boss"];
        return bosses[Math.floor(Math.random() * bosses.length)];
      }
    };
  }
});

// src/Dungeons/message-observer.js
var require_message_observer = __commonJS({
  "src/Dungeons/message-observer.js"(exports2, module2) {
    var { acquireDispatcher, pollForDispatcher } = require_dispatcher();
    module2.exports = {
      startMessageObserver() {
        var _a;
        if (this._msgDispatcher || this._msgDispatcherPoll) return;
        try {
          const d = acquireDispatcher();
          if (d) {
            this._msgDispatcher = d;
            this._subscribeMessageDispatcher();
            return;
          }
          this._msgDispatcherPoll = pollForDispatcher({
            onAcquired: (dd) => {
              this._msgDispatcherPoll = null;
              if (!this.started) return;
              this._msgDispatcher = dd;
              this._subscribeMessageDispatcher();
            },
            onTimeout: () => {
              var _a2;
              this._msgDispatcherPoll = null;
              (_a2 = this.errorLog) == null ? void 0 : _a2.call(this, "MESSAGE_DISPATCHER", "FluxDispatcher unavailable after 30s \u2014 Dungeons will not react to messages");
            },
            onPoll: () => {
              var _a2, _b;
              if (!this.started) (_b = (_a2 = this._msgDispatcherPoll) == null ? void 0 : _a2.cancel) == null ? void 0 : _b.call(_a2);
            }
          });
        } catch (error) {
          (_a = this.errorLog) == null ? void 0 : _a.call(this, "MESSAGE_DISPATCHER", "init failed", error);
        }
      },
      _subscribeMessageDispatcher() {
        var _a;
        if (!this._msgDispatcher || this._msgCreateHandler) return;
        this._msgCreateHandler = (payload) => this._onMessageCreate(payload);
        try {
          this._msgDispatcher.subscribe("MESSAGE_CREATE", this._msgCreateHandler);
          this.debugLog("MESSAGE_DISPATCHER", "Subscribed to MESSAGE_CREATE");
        } catch (error) {
          this._msgCreateHandler = null;
          (_a = this.errorLog) == null ? void 0 : _a.call(this, "MESSAGE_DISPATCHER", "subscribe failed", error);
        }
      },
      stopMessageObserver() {
        var _a, _b;
        if (this._msgDispatcher && this._msgCreateHandler) {
          try {
            this._msgDispatcher.unsubscribe("MESSAGE_CREATE", this._msgCreateHandler);
          } catch (_) {
          }
        }
        this._msgCreateHandler = null;
        this._msgDispatcher = null;
        if (this._msgDispatcherPoll) {
          try {
            (_b = (_a = this._msgDispatcherPoll).cancel) == null ? void 0 : _b.call(_a);
          } catch (_) {
          }
          this._msgDispatcherPoll = null;
        }
      },
      _onMessageCreate(payload) {
        var _a, _b;
        try {
          if (!this.started || !((_a = this.settings) == null ? void 0 : _a.enabled)) return;
          if (typeof document !== "undefined" && document.hidden) return;
          const msg = payload && payload.message;
          if (!msg || !msg.id || !msg.channel_id || !msg.author || !msg.author.id) return;
          if (msg.author.bot || msg.webhook_id) return;
          if (msg.type !== 0 && msg.type !== 19) return;
          const viewedChannelId = this._getViewedChannelId();
          if (!viewedChannelId || msg.channel_id !== viewedChannelId) return;
          if (this.processedMessageIds.has(msg.id)) return;
          this.processedMessageIds.add(msg.id);
          if (this.processedMessageIds.size > 1e3) {
            const firstId = this.processedMessageIds.values().next().value;
            this.processedMessageIds.delete(firstId);
          }
          const ts = this._msgTimestampMs(msg.timestamp);
          if (ts && this.observerStartTime && ts < this.observerStartTime) return;
          this._processDungeonMessage(msg);
        } catch (error) {
          (_b = this.errorLog) == null ? void 0 : _b.call(this, "MESSAGE_CREATE", "handler failed", error);
        }
      },
      // Spawn + user-attack logic, driven by the message object (ported from the
      // old handleMessage). No DOM scraping — the element is fetched on demand only
      // for the crit bonus, below.
      _processDungeonMessage(msg) {
        var _a, _b;
        const channelInfo = this.getChannelInfo() || this.getChannelInfoFromLocation();
        if (!channelInfo) return;
        const now = Date.now();
        const userChannelKey = `${channelInfo.guildId}_${channelInfo.channelId}`;
        const isGuild = Boolean(channelInfo.guildId) && channelInfo.guildId !== "DM";
        if (isGuild) {
          const globalCooldownRaw = Number((_a = this.settings) == null ? void 0 : _a.globalSpawnCooldown);
          const globalCooldownDefault = Number((_b = this.defaultSettings) == null ? void 0 : _b.globalSpawnCooldown) || 6e4;
          const globalCooldown = Number.isFinite(globalCooldownRaw) && globalCooldownRaw >= 0 ? globalCooldownRaw : globalCooldownDefault;
          const inGlobalCooldown = this._lastGlobalSpawnTime && now - this._lastGlobalSpawnTime < globalCooldown;
          if (!inGlobalCooldown) {
            const spawnTarget = this.pickSpawnChannel(channelInfo);
            const channelKey = spawnTarget.channelKey || userChannelKey;
            const spawnChannelInfo = spawnTarget.channelInfo || channelInfo;
            this.checkDungeonSpawn(channelKey, spawnChannelInfo, { messageId: msg.id }).catch((err) => {
              this.errorLog("checkDungeonSpawn failed", err);
            });
          }
        }
        if (this.settings.userActiveDungeon === userChannelKey) {
          const userSlowMultiplier = this.getEntityAttackSlowMultiplier(userChannelKey, "user", "user", now);
          const effectiveUserAttackCooldown = this.getEffectiveUserAttackCooldownMs(
            (this.settings.userAttackCooldown || 2e3) * userSlowMultiplier,
            this.settings.userAttackCooldown || 2e3
          );
          if (now - this.lastUserAttackTime >= effectiveUserAttackCooldown) {
            this.lastUserAttackTime = now;
            if (this._isOwnAuthor(msg.author.id)) {
              this._setTrackedTimeout(() => {
                var _a2;
                if (!this.started || !((_a2 = this.settings) == null ? void 0 : _a2.enabled)) return;
                const el = this._findMessageElementById(msg.channel_id, msg.id);
                Promise.resolve(this.processUserAttack(userChannelKey, el)).catch((err) => {
                  this.errorLog("processUserAttack failed", err);
                });
              }, 120);
            } else {
              Promise.resolve(this.processUserAttack(userChannelKey, null)).catch((err) => {
                this.errorLog("processUserAttack failed", err);
              });
            }
          }
        }
      },
      // ── small helpers ──────────────────────────────────────────────────────────
      _msgTimestampMs(ts) {
        if (ts == null) return null;
        if (typeof ts === "number") return ts;
        if (typeof ts === "object" && typeof ts.valueOf === "function") {
          const v = ts.valueOf();
          return typeof v === "number" ? v : null;
        }
        const t = new Date(ts).getTime();
        return Number.isNaN(t) ? null : t;
      },
      // PERF (2026-07-15): store refs are MEMOIZED on the instance. This runs per
      // MESSAGE_CREATE (every message from every author), and BdApi.Webpack.getStore
      // is a module-registry lookup — not guaranteed cached. Flux stores are stable
      // for the app's lifetime, so resolve once and retry only while null.
      _getViewedChannelId() {
        var _a, _b, _c, _d;
        try {
          let store = this._selectedChannelStoreRef;
          if (!store) {
            store = (_b = (_a = BdApi.Webpack).getStore) == null ? void 0 : _b.call(_a, "SelectedChannelStore");
            if (!(store && typeof store.getChannelId === "function")) {
              store = (_d = (_c = BdApi.Webpack).getStore) == null ? void 0 : _d.call(_c, "ChannelStore");
            }
            if (store && typeof store.getChannelId === "function") {
              this._selectedChannelStoreRef = store;
            } else {
              return null;
            }
          }
          return store.getChannelId();
        } catch (_) {
        }
        return null;
      },
      _isOwnAuthor(authorId) {
        var _a, _b;
        try {
          let store = this._userStoreRef;
          if (!store) {
            store = (_b = (_a = BdApi.Webpack).getStore) == null ? void 0 : _b.call(_a, "UserStore");
            if (store && typeof store.getCurrentUser === "function") this._userStoreRef = store;
            else return false;
          }
          const me = store.getCurrentUser();
          return !!(me && me.id === authorId);
        } catch (_) {
          return false;
        }
      },
      // Exact lookup of a rendered message row by id. data-list-item-id is
      // "chat-messages-<channelId>-<messageId>". Returns the row (which carries or
      // contains CriticalHit's `.bd-crit-hit`), or null if not currently rendered.
      _findMessageElementById(channelId, messageId) {
        if (!messageId) return null;
        try {
          return document.querySelector(`[data-list-item-id="chat-messages-${channelId}-${messageId}"]`) || document.querySelector(`[data-list-item-id$="-${messageId}"]`) || null;
        } catch (_) {
          return null;
        }
      }
    };
  }
});

// src/Dungeons/sovereign-doctrines.js
var require_sovereign_doctrines = __commonJS({
  "src/Dungeons/sovereign-doctrines.js"(exports2, module2) {
    var SPECIES_DOCTRINES = Object.freeze({
      // ── Humanoid classes ────────────────────────────────────────────────────────
      knight: { name: "Igris's Discipline", killMult: 1.1, casualtyMult: 0.8, frontlineDmg: 0.1 },
      tank: { name: "Aegis Riposte", casualtyMult: 0.85, reflectPct: 0.5 },
      healer: { name: "Beru's Grace", casualtyMult: 0.75, healBoost: 0.5 },
      support: { name: "Battle Hymns", killMult: 1.08, casualtyMult: 0.85, healBoost: 0.25 },
      mage: { name: "Hellfire Doctrine", killMult: 1.15, bossDmgMult: 1.15 },
      assassin: { name: "Death's Whisper", executeBonus: 0.35, frontlineDmg: 0.15 },
      ranger: { name: "Marked Quarry", killMult: 1.05, executeBonus: 0.5 },
      berserker: { name: "Bloodrage", killMult: 1.3, casualtyMult: 1.15 },
      // ── Beast lines ─────────────────────────────────────────────────────────────
      ant: { name: "Devouring Swarm", killMult: 1.15, comboRamp: 0.03, comboMax: 0.3 },
      bear: { name: "Alpha's Maul", killMult: 1.1, frontlineDmg: 0.2 },
      wolf: { name: "Pack Momentum", comboRamp: 0.05, comboMax: 0.5 },
      spider: { name: "Broodmother's Web", casualtyMult: 0.85, executeBonus: 0.2 },
      centipede: { name: "Hundred-Fang Venom", burnAttrition: 0.15 },
      golem: { name: "Immovable Taunt", casualtyMult: 0.4, killMult: 0.95 },
      serpent: { name: "Constrictor's Coils", killMult: 1.05, bossSlow: 0.1 },
      naga: { name: "Tidal Hexes", killMult: 1.1, bossDmgMult: 1.1 },
      wyvern: { name: "Skyfire", burnAttrition: 0.25 },
      dragon: { name: "Dragonfire Tempest", burnAttrition: 0.2, bossDmgMult: 1.2 },
      titan: { name: "Seismic March", killMult: 1.2, casualtyMult: 0.9 },
      giant: { name: "Crushing Stride", killMult: 1.2 },
      elf: { name: "Ancient Volley", bossDmgMult: 1.1, essenceBonus: 0.2 },
      demon: { name: "Infernal Pact", killMult: 1.2, burnAttrition: 0.1 },
      ghoul: { name: "Carrion Feast", killMult: 1.05, essenceBonus: 0.3 },
      orc: { name: "Warchief's Roar", killMult: 1.15, frontlineDmg: 0.1 },
      ogre: { name: "Brute Rampage", frontlineDmg: 0.25 },
      yeti: { name: "Glacial Dominion", casualtyMult: 0.6, bossSlow: 0.2 }
    });
    var FALLBACK_OFFENSE = Object.freeze({ name: "Sovereign's Command", killMult: 1.2 });
    var FALLBACK_DEFENSE = Object.freeze({ name: "Sovereign's Ward", casualtyMult: 0.6 });
    module2.exports = {
      SPECIES_DOCTRINES,
      _getSovereignDoctrine(speciesKey, gmShadow) {
        const doctrine = SPECIES_DOCTRINES[String(speciesKey || "").toLowerCase()];
        if (doctrine) return doctrine;
        const archetype = this._getShadowArchetypeForRole ? this._getShadowArchetypeForRole(gmShadow) : "balanced";
        return archetype === "tank" || archetype === "support" ? FALLBACK_DEFENSE : FALLBACK_OFFENSE;
      },
      // Combine every fielded sovereign's doctrine into the tick's aggregate war
      // modifiers, weighted by each led species' share of the army. Also advances
      // per-war doctrine state (combo stacks, burn pool) kept on dungeon.war.
      // Pure arithmetic over intel.leaders — O(species), not O(army).
      _combineSovereignDoctrines(dungeon, intel, hostWounded) {
        const out = {
          killMult: 1,
          casualtyMult: 1,
          executeBonus: 0,
          reflectPct: 0,
          burnAttrition: 0,
          essenceBonus: 0,
          bossSlow: 0,
          healBoost: 0,
          names: []
        };
        if (!intel || !intel.leaders || intel.total <= 0) return out;
        if (!dungeon.war._doctrine) dungeon.war._doctrine = { combo: {}, burnPool: 0 };
        const state = dungeon.war._doctrine;
        for (const [species, led] of Object.entries(intel.leaders)) {
          const d = led.doctrine;
          if (!d) continue;
          const share = (intel.speciesTroops[species] || 0) / intel.total;
          if (!(share > 0)) continue;
          out.names.push(d.name);
          let killMult = d.killMult || 1;
          if (d.comboRamp) {
            const stacks = state.combo[species] || 0;
            killMult *= 1 + Math.min(d.comboMax || 0.5, stacks * d.comboRamp);
          }
          out.killMult *= 1 + (killMult - 1) * share;
          if (d.casualtyMult) out.casualtyMult *= 1 + (d.casualtyMult - 1) * share;
          if (d.executeBonus && hostWounded) out.executeBonus += d.executeBonus * share;
          if (d.reflectPct) out.reflectPct += d.reflectPct * share;
          if (d.burnAttrition) out.burnAttrition += d.burnAttrition * share;
          if (d.essenceBonus) out.essenceBonus += d.essenceBonus * share;
          if (d.bossSlow) out.bossSlow = Math.max(out.bossSlow, d.bossSlow);
          if (d.healBoost) out.healBoost = Math.max(out.healBoost, d.healBoost);
        }
        dungeon.war._sovereignBossSlow = out.bossSlow;
        dungeon.war._sovereignHealBoost = out.healBoost;
        return out;
      },
      _advanceDoctrineState(dungeon, intel, kills) {
        var _a, _b;
        const state = (_a = dungeon.war) == null ? void 0 : _a._doctrine;
        if (!state) return;
        for (const [species, led] of Object.entries(intel.leaders || {})) {
          if (!((_b = led.doctrine) == null ? void 0 : _b.comboRamp)) continue;
          state.combo[species] = kills > 0 ? (state.combo[species] || 0) + 1 : 0;
        }
      }
    };
  }
});

// src/Dungeons/spawn-core.js
var require_spawn_core = __commonJS({
  "src/Dungeons/spawn-core.js"(exports2, module2) {
    var C2 = require_constants();
    module2.exports = {
      getChannelInfoFromLocation() {
        var _a;
        try {
          const path = ((_a = window.location) == null ? void 0 : _a.pathname) || "";
          const parts = path.split("/").filter(Boolean);
          if (parts[0] !== "channels") return null;
          const rawGuildId = parts[1];
          const rawChannelId = parts[2];
          if (!rawChannelId) return null;
          const guildId = rawGuildId === "@me" ? "DM" : rawGuildId;
          return { guildId, channelId: rawChannelId };
        } catch (_) {
          return null;
        }
      },
      getServerChannelCount(guildId) {
        var _a, _b, _c, _d;
        if (!guildId || guildId === "DM") return null;
        try {
          const ChannelStore = ((_b = (_a = BdApi.Webpack) == null ? void 0 : _a.getStore) == null ? void 0 : _b.call(_a, "ChannelStore")) || // Optional chaining INSIDE filters is banned (AGENTS.md).
          ((_d = (_c = BdApi.Webpack) == null ? void 0 : _c.getModule) == null ? void 0 : _d.call(_c, (m) => m && m.getGuildChannels));
          if (ChannelStore) {
            if (typeof ChannelStore.getGuildChannels === "function") {
              const channels = ChannelStore.getGuildChannels(guildId);
              if (channels) {
                const textChannels = Object.values(channels).filter(
                  (c) => c.type === 0 || c.type === "GUILD_TEXT"
                );
                return textChannels.length;
              }
            }
            if (typeof ChannelStore.getAllChannels === "function") {
              const allChannels = ChannelStore.getAllChannels();
              if (allChannels) {
                const guildChannels = Object.values(allChannels).filter(
                  (c) => c.guild_id === guildId && (c.type === 0 || c.type === "GUILD_TEXT")
                );
                return guildChannels.length;
              }
            }
          }
        } catch (error) {
          this.debugLog("Error getting server channel count:", error);
        }
        return null;
      },
      getActiveDungeonCountForGuild(guildId) {
        let count = 0;
        this.activeDungeons.forEach((dungeon, key) => {
          if (dungeon && !dungeon.completed && !dungeon.failed && key.startsWith(guildId + "_")) {
            count++;
          }
        });
        return count;
      },
      getMaxDungeonsForGuild(guildId) {
        const channelCount = this.getServerChannelCount(guildId);
        const pct = this.settings.maxDungeonsPercentage || 0.15;
        const min = this.settings.minDungeonsAllowed || 3;
        const max = this.settings.maxDungeonsAllowed || 20;
        if (!channelCount) return min;
        return Math.max(min, Math.min(max, Math.floor(channelCount * pct)));
      },
      async checkDungeonSpawn(channelKey, channelInfo, context = {}) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (this.channelLocks.has(channelKey) || this.activeDungeons.has(channelKey)) return;
        const now = Date.now();
        const guildId = channelInfo == null ? void 0 : channelInfo.guildId;
        const channelId = channelInfo == null ? void 0 : channelInfo.channelId;
        if (guildId && channelId && this._UserGuildSettingsStore) {
          try {
            if ((_b = (_a = this._UserGuildSettingsStore).isChannelMuted) == null ? void 0 : _b.call(_a, guildId, channelId)) return;
          } catch (_) {
          }
        }
        const channelCooldownRaw = Number((_c = this.settings) == null ? void 0 : _c.channelSpawnCooldown);
        const channelCooldownDefault = Number((_d = this.defaultSettings) == null ? void 0 : _d.channelSpawnCooldown) || 3e5;
        const channelCooldown = Number.isFinite(channelCooldownRaw) && channelCooldownRaw >= 0 ? channelCooldownRaw : channelCooldownDefault;
        const lastEnd = (_e = this.settings.lastDungeonEndTime) == null ? void 0 : _e[channelKey];
        if (lastEnd && now - lastEnd < channelCooldown) return;
        const globalCooldownRaw = Number((_f = this.settings) == null ? void 0 : _f.globalSpawnCooldown);
        const globalCooldownDefault = Number((_g = this.defaultSettings) == null ? void 0 : _g.globalSpawnCooldown) || 6e4;
        const globalCooldown = Number.isFinite(globalCooldownRaw) && globalCooldownRaw >= 0 ? globalCooldownRaw : globalCooldownDefault;
        if (this._lastGlobalSpawnTime && now - this._lastGlobalSpawnTime < globalCooldown) return;
        if (guildId && guildId !== "DM") {
          const guildActive = this.getActiveDungeonCountForGuild(guildId);
          const guildMax = this.getMaxDungeonsForGuild(guildId);
          if (guildActive >= guildMax) return;
        }
        const spawnChancePercent = Number.isFinite((_h = this.settings) == null ? void 0 : _h.spawnChance) ? this.settings.spawnChance : 10;
        const spawnChance = Math.max(0, Math.min(1, spawnChancePercent / 100));
        if (Math.random() > spawnChance) return;
        const _previousGlobalSpawnTime = this._lastGlobalSpawnTime;
        this.channelLocks.add(channelKey);
        this._lastGlobalSpawnTime = Date.now();
        try {
          const dungeonRank = this.calculateDungeonRank();
          await this.createDungeon(channelKey, channelInfo, dungeonRank);
        } catch (error) {
          this.errorLog("CRITICAL", `Error creating dungeon in ${channelKey}:`, error);
          this.activeDungeons.delete(channelKey);
          this.channelLocks.delete(channelKey);
          this._lastGlobalSpawnTime = _previousGlobalSpawnTime;
        }
      },
      calculateDungeonRank() {
        var _a, _b;
        const rankList = this.getDungeonRankList();
        const userRank = ((_b = (_a = this.soloLevelingStats) == null ? void 0 : _a.settings) == null ? void 0 : _b.rank) || "E";
        const rankIndex = this.getRankIndexValue(userRank, rankList);
        const smIdx = rankList.indexOf("Shadow Monarch");
        const maxRankIndex = smIdx > 0 ? smIdx - 1 : rankList.length - 1;
        const weights = Array.from(
          { length: maxRankIndex + 1 },
          (_, i) => i <= rankIndex ? 10 - (rankIndex - i) : Math.max(1, 5 - (i - rankIndex))
        );
        const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
        let random = Math.random() * totalWeight;
        const selectedIndex = weights.findIndex((weight) => {
          random -= weight;
          return random <= 0;
        });
        return rankList[selectedIndex >= 0 ? selectedIndex : 0] || "E";
      },
      async createDungeon(channelKey, channelInfo, rank) {
        var _a, _b, _c, _d, _e, _f;
        if (this.activeDungeons.has(channelKey)) {
          this.debugLog(
            `CONFLICT DETECTED: Channel ${channelKey} already has active dungeon - forcing abort`
          );
          this.channelLocks.delete(channelKey);
          return;
        }
        const rankList = this.getDungeonRankList();
        const rankIndex = this.getRankIndexValue(rank, rankList);
        const dungeonBiomes = [
          {
            name: "Forest",
            description: "Dense woodland teeming with insects and beasts",
            mobMultiplier: 2.5,
            // Horde of insects
            beastFamilies: ["insect", "beast"]
            // Ants, spiders, centipedes, bears, wolves
          },
          {
            name: "Arctic",
            description: "Frozen wasteland of ice and snow",
            mobMultiplier: 1.2,
            // Fewer but tankier
            beastFamilies: ["ice", "beast"]
            // Yetis, bears, wolves
          },
          {
            name: "Cavern",
            description: "Underground tunnels filled with horrors",
            mobMultiplier: 2,
            // Many creatures
            beastFamilies: ["insect", "undead", "construct"]
            // Spiders, centipedes, ghouls, golems
          },
          {
            name: "Swamp",
            description: "Murky marshland of serpents and undead",
            mobMultiplier: 1.8,
            // Dense population
            beastFamilies: ["reptile", "undead"]
            // Serpents, nagas, ghouls
          },
          {
            name: "Mountains",
            description: "Rocky peaks inhabited by giants and wyverns",
            mobMultiplier: 0.8,
            // Fewer but stronger
            beastFamilies: ["giant", "dragon"]
            // Giants, titans (A+), wyverns (S+), dragons (NH+)
          },
          {
            name: "Volcano",
            description: "Molten hellscape of demons and dragons",
            mobMultiplier: 1,
            // Balanced
            beastFamilies: ["demon", "humanoid-beast", "dragon"]
            // Demons, ogres, dragons (NH+)
          },
          {
            name: "Ancient Ruins",
            description: "Mystical ruins guarded by constructs and elves",
            mobMultiplier: 1.2,
            // Moderate
            beastFamilies: ["construct", "ancient", "undead"]
            // Golems, elves, ghouls
          },
          {
            name: "Dark Abyss",
            description: "Void realm of demons and horrors",
            mobMultiplier: 1.5,
            // Many dark creatures
            beastFamilies: ["demon", "undead", "dragon"]
            // Demons, ghouls, dragons (NH+)
          },
          {
            name: "Tribal Grounds",
            description: "Savage lands of orcs and ogres",
            mobMultiplier: 2,
            // Large tribes
            beastFamilies: ["humanoid-beast", "giant"]
            // Orcs, ogres, giants
          }
        ];
        const dungeonBiome = dungeonBiomes[Math.floor(Math.random() * dungeonBiomes.length)];
        const dungeonType = dungeonBiome.name;
        const dungeonName = this.generateDungeonName(rank, dungeonType);
        const bossName = this.generateBossName(rank, dungeonType);
        const baseMobCount = C2.DUNGEON_MOB_CAPACITY_BY_RANK[rank] || 50 * Math.pow(2.5, rankIndex);
        const biomeMultiplier = dungeonBiome.mobMultiplier || 1;
        const totalMobCount = Math.floor(
          Math.max(50, baseMobCount * biomeMultiplier)
        );
        const totalShadowCount = await this.getShadowCount();
        const activeDungeonsList = Array.from(this.activeDungeons.values()).filter(
          (d) => !d.completed && !d.failed
        );
        const thisWeight = rankIndex + 1;
        const existingTotalWeight = activeDungeonsList.reduce((sum, d) => {
          const dRankIndex = this.getRankIndexValue(d.rank);
          return sum + (dRankIndex + 1);
        }, 0);
        const newTotalWeight = existingTotalWeight + thisWeight;
        const expectedShadowPortion = thisWeight / newTotalWeight * totalShadowCount;
        const expectedShadowCount = Math.max(1, Math.floor(expectedShadowPortion));
        const bossBeastType = this.selectMagicBeastType(
          dungeonBiome.beastFamilies,
          rank,
          rankList
        );
        const bossBaseStats = this.calculateBossBaseStats(rankIndex);
        const bossSpeciesW = ((_a = C2.BEAST_STAT_WEIGHTS) == null ? void 0 : _a[bossBeastType.type]) || { strength: 1, agility: 1, intelligence: 1, vitality: 1 };
        const bossStrength = Math.floor(bossBaseStats.strength * bossSpeciesW.strength);
        const bossAgility = Math.floor(bossBaseStats.agility * bossSpeciesW.agility);
        const bossIntelligence = Math.floor(bossBaseStats.intelligence * bossSpeciesW.intelligence);
        const bossVitality = Math.floor(bossBaseStats.vitality * bossSpeciesW.vitality);
        const bossPerception = bossBaseStats.perception;
        const rankBonus = ((_b = this._bossHPBonusTable) == null ? void 0 : _b[rankIndex]) || 0;
        const staticBossHpMultiplier = this.getStaticBossHpMultiplier(rankIndex);
        const armyMultiplier = C2.BOSS_HP_ARMY_MULTIPLIER || 8;
        const finalBossHP = Math.max(
          1,
          Math.floor((100 + bossBaseStats.vitality * 10 + rankBonus) * staticBossHpMultiplier * armyMultiplier)
        );
        const initialBossGate = this.getBossGateRuntimeConfig(rank, Math.max(200, totalMobCount));
        const dungeonStartTime = Date.now();
        const dungeonXPBatchKey = `${channelKey}:${dungeonStartTime}`;
        const dungeon = {
          id: channelKey,
          channelKey,
          rank,
          name: dungeonName,
          type: dungeonType,
          // Biome name (Forest, Arctic, etc.)
          biome: dungeonBiome,
          // Store complete biome data
          beastFamilies: dungeonBiome.beastFamilies,
          // Allowed beast families for this biome
          channelName: channelInfo.channelName || `Channel ${channelInfo.channelId}`,
          // Store channel name
          guildName: (() => {
            var _a2, _b2, _c2, _d2;
            try {
              const gs = (_b2 = (_a2 = BdApi.Webpack) == null ? void 0 : _a2.getStore) == null ? void 0 : _b2.call(_a2, "GuildStore");
              return ((_d2 = (_c2 = gs == null ? void 0 : gs.getGuild) == null ? void 0 : _c2.call(gs, channelInfo.guildId)) == null ? void 0 : _d2.name) || `Guild ${channelInfo.guildId}`;
            } catch (_) {
              return `Guild ${channelInfo.guildId}`;
            }
          })(),
          mobs: {
            total: 0,
            remaining: 0,
            killed: 0,
            targetCount: totalMobCount,
            // Target mob count for this dungeon
            spawnRate: 2 + rankIndex,
            activeMobs: [],
            // Array of mob objects with HP and stats
            // Per-dungeon mob capacity: Matches full target count (no hard ceiling).
            // Shadows kill mobs continuously; the adaptive combat budget system
            // (perDungeonMobBudget) already throttles per-tick iteration cost.
            mobCapacity: Math.max(200, totalMobCount)
          },
          // WARFRONT: the gate's war host. reserves = the mass army your surplus
          // shadows grind down in aggregate; fallen/shadowsFallen feed war reports.
          war: {
            reserves: Math.max(200, totalMobCount),
            fallen: 0,
            shadowsFallen: 0
          },
          boss: {
            id: `boss_${channelKey}`,
            name: bossName,
            hp: finalBossHP,
            maxHp: finalBossHP,
            rank,
            // MAGIC BEAST IDENTITY (for shadow extraction)
            beastType: bossBeastType.type,
            beastName: bossBeastType.name,
            beastFamily: bossBeastType.family,
            role: this.deriveMonsterRoleFromBeast(bossBeastType.type, bossBeastType.family),
            isMagicBeast: true,
            // Combat stats (for compatibility)
            strength: bossStrength,
            agility: bossAgility,
            intelligence: bossIntelligence,
            vitality: bossVitality,
            perception: bossPerception,
            // SHADOW-COMPATIBLE STATS (for extraction)
            baseStats: {
              strength: bossStrength,
              agility: bossAgility,
              intelligence: bossIntelligence,
              vitality: bossVitality,
              perception: bossPerception
            },
            lastAttackTime: 0,
            attackCooldown: 3e3,
            // Boss attacks every 3 seconds (stronger boss without HP scaling)
            expectedShadowCount,
            // Track expected shadow force
            // Description for display
            description: `${rank}-rank ${bossBeastType.name} Boss from ${dungeonBiome.name}`
          },
          startTime: dungeonStartTime,
          _xpBatchKey: dungeonXPBatchKey,
          pendingUserMobXP: 0,
          pendingUserMobKills: 0,
          channelId: channelInfo.channelId,
          guildId: channelInfo.guildId,
          userParticipating: null,
          shadowsDeployed: false,
          // Manual deploy: user must click "Deploy Shadows" to start combat
          deployedAt: null,
          // Canonical deploy timestamp used for boss gate timing
          corpsePile: [],
          // Dead mobs collected during combat for post-dungeon ARISE extraction (persisted to IDB)
          shadowAttacks: {},
          shadowContributions: {},
          // Track XP contributions: { shadowId: { mobsKilled: 0, bossDamage: 0 } }
          shadowHP: /* @__PURE__ */ new Map(),
          // Track shadow HP: Map<shadowId, { hp, maxHp }>
          shadowRevives: 0,
          // Track total revives for summary
          bossGate: {
            enabled: initialBossGate.enabled,
            minDurationMs: initialBossGate.minDurationMs,
            requiredMobKills: initialBossGate.requiredMobKills,
            deployedAt: null,
            // Set on first Deploy Shadows; boss vulnerability timer starts from deploy time
            unlockedAt: null
          },
          difficultyScale: {
            mobFactor: 1,
            bossFactor: 1,
            lastPower: 0,
            updatedAt: Date.now()
          },
          completed: false,
          failed: false
        };
        this.activeDungeons.set(channelKey, dungeon);
        this.startHPBarRestoration();
        this._ensureDungeonHeaderWidgetLoop();
        this.settings.lastSpawnTime[channelKey] = Date.now();
        this.saveSettings();
        this.settings.mobKillNotifications[channelKey] = { count: 0, lastNotification: Date.now() };
        if (this.storageManager) {
          try {
            await this.storageManager.saveDungeon(dungeon);
          } catch (error) {
            this.errorLog("Failed to save dungeon", error);
          }
        }
        if (this.mobBossStorageManager) {
          try {
            await this.mobBossStorageManager.saveBoss(dungeon.boss, channelKey);
            this.debugLog("BOSS_STORAGE", "Boss cached to database", {
              dungeonKey: channelKey,
              bossId: dungeon.boss.id,
              rank: dungeon.boss.rank
            });
          } catch (error) {
            this.errorLog("Failed to cache boss to database", error);
          }
        }
        this.saveSettings();
        this.showDungeonIndicator(channelKey, channelInfo);
        this.showToast(`${dungeonName} [${rank}] Spawned!`, "info");
        this.settings.debug && console.log(
          `[Dungeons] \u{1F3F0} SPAWN: "${dungeonName}" [${rank}] in #${dungeon.channelName} (${dungeon.guildName}) \u2014 Biome: ${dungeonType} | Boss: ${((_c = dungeon.boss) == null ? void 0 : _c.name) || "?"} [${(_d = dungeon.boss) == null ? void 0 : _d.rank}] | Mobs: ${(_f = (_e = dungeon.mobs) == null ? void 0 : _e.targetCount) == null ? void 0 : _f.toLocaleString()} | Key: ${channelKey}`
        );
        this.syncDungeonDifficultyScale(dungeon, channelKey);
        this._scheduleSpawnRankStarterWarm(channelKey, rank);
        this.startMobKillNotifications(channelKey);
        if (this.settings.autoDeploy !== false) {
          this._setTrackedTimeout(() => {
            if (this._isStopped) return;
            const d = this.activeDungeons.get(channelKey);
            if (!d || d.completed || d.failed || d._completing || d.shadowsDeployed || d._deploying) return;
            Promise.resolve(this.deployShadows(channelKey)).catch(
              (err) => this.errorLog("AUTO_DEPLOY", `Auto-deploy failed for ${channelKey}`, err)
            );
          }, 600);
        }
      },
      startMobSpawning(channelKey) {
        var _a, _b, _c;
        if (this.mobSpawnTimers.has(channelKey)) {
          const legacy = this.mobSpawnTimers.get(channelKey);
          legacy && clearTimeout(legacy);
          this.mobSpawnTimers.delete(channelKey);
        }
        if (this._mobSpawnNextAt.has(channelKey)) {
          this.settings.debug && console.log(`[Dungeons] MOB_SPAWN_TRACE: startMobSpawning SKIPPED \u2014 already scheduled for ${channelKey}`);
          this._ensureMobSpawnLoop();
          this.ensureDeployedSpawnPipeline(channelKey, "start_already_scheduled");
          return;
        }
        const dungeon = this._getActiveDungeon(channelKey);
        if (!dungeon) {
          this.settings.debug && console.log(`[Dungeons] MOB_SPAWN_TRACE: startMobSpawning SKIPPED \u2014 no dungeon for ${channelKey}`);
          return;
        }
        this.settings.debug && console.log(`[Dungeons] MOB_SPAWN_TRACE: startMobSpawning calling spawnMobs(${channelKey}), boss.hp=${(_a = dungeon.boss) == null ? void 0 : _a.hp}, activeMobs=${((_c = (_b = dungeon.mobs) == null ? void 0 : _b.activeMobs) == null ? void 0 : _c.length) || 0}`);
        this.spawnMobs(channelKey);
        const nextDelay = this._computeNextMobSpawnDelayMs(dungeon);
        this._mobSpawnNextAt.set(channelKey, Date.now() + nextDelay);
        this._ensureMobSpawnLoop();
      },
      stopMobSpawning(channelKey) {
        const timer = this.mobSpawnTimers.get(channelKey);
        timer && clearTimeout(timer);
        this.mobSpawnTimers.delete(channelKey);
        this._mobSpawnNextAt.delete(channelKey);
        this._mobSpawnQueueNextAt.delete(channelKey);
        if (this._mobSpawnQueue.has(channelKey)) {
          this.processMobSpawnQueue(channelKey);
          this._mobSpawnQueue.delete(channelKey);
        }
      },
      stopAllMobSpawning() {
        var _a;
        this.mobSpawnTimers.forEach((timer) => clearTimeout(timer));
        this.mobSpawnTimers.clear();
        this._mobSpawnNextAt && this._mobSpawnNextAt.clear();
        this._mobSpawnQueueNextAt && this._mobSpawnQueueNextAt.clear();
        (_a = this._stopMobSpawnLoop) == null ? void 0 : _a.call(this);
      },
      _countLiveMobs(dungeon) {
        var _a, _b;
        const mobs = (_a = dungeon == null ? void 0 : dungeon.mobs) == null ? void 0 : _a.activeMobs;
        if (!Array.isArray(mobs) || mobs.length === 0) return 0;
        let live = 0;
        for (let i = 0; i < mobs.length; i++) {
          if (((_b = mobs[i]) == null ? void 0 : _b.hp) > 0) live++;
        }
        return live;
      },
      _hasQueuedMobWave(channelKey) {
        var _a, _b;
        const queued = (_b = (_a = this._mobSpawnQueue) == null ? void 0 : _a.get) == null ? void 0 : _b.call(_a, channelKey);
        return Array.isArray(queued) && queued.length > 0;
      },
      _logSpawnPipelineGuard(channelKey, message, cooldownMs = 5e3) {
        const now = Date.now();
        const last = this._spawnPipelineGuardAt.get(channelKey) || 0;
        if (now - last < cooldownMs) return;
        this._spawnPipelineGuardAt.set(channelKey, now);
        this.debugLog("MOB_SPAWN_GUARD", `${message} | Key: ${channelKey}`);
      },
      ensureDeployedSpawnPipeline(channelKey, reason = "runtime_guard") {
        var _a, _b, _c, _d, _e, _f;
        const dungeon = this._getActiveDungeon(channelKey);
        if (!dungeon || !dungeon.shadowsDeployed || ((_a = dungeon.boss) == null ? void 0 : _a.hp) <= 0 && !((_b = dungeon.boss) == null ? void 0 : _b._isSentinel)) return false;
        if (!dungeon.mobs || typeof dungeon.mobs !== "object") dungeon.mobs = {};
        if (!Array.isArray(dungeon.mobs.activeMobs)) dungeon.mobs.activeMobs = [];
        if (!Number.isFinite(dungeon.mobs.total)) dungeon.mobs.total = 0;
        if (!Number.isFinite(dungeon.mobs.killed)) dungeon.mobs.killed = 0;
        if (!Number.isFinite(dungeon.mobs.targetCount)) dungeon.mobs.targetCount = 0;
        this._ensureMobSpawnLoop();
        const targetCount = Math.max(0, Math.floor(Number(dungeon.mobs.targetCount) || 0));
        const totalSpawned = Math.max(0, Math.floor(Number(dungeon.mobs.total) || 0));
        const liveMobsBefore = this._countLiveMobs(dungeon);
        const hasQueuedWave = this._hasQueuedMobWave(channelKey);
        const spawnExhausted = targetCount > 0 && totalSpawned >= targetCount;
        if (!spawnExhausted && !this._mobSpawnNextAt.has(channelKey)) {
          const nextDelay = this._computeNextMobSpawnDelayMs(dungeon);
          this._mobSpawnNextAt.set(channelKey, Date.now() + nextDelay);
        }
        if (spawnExhausted) return liveMobsBefore > 0 || hasQueuedWave;
        if (liveMobsBefore > 0 || hasQueuedWave) return true;
        this.spawnMobs(channelKey);
        if (this._hasQueuedMobWave(channelKey)) {
          const queuedRemaining = this.processMobSpawnQueue(channelKey);
          if (queuedRemaining > 0) {
            (_d = (_c = this._mobSpawnQueueNextAt) == null ? void 0 : _c.set) == null ? void 0 : _d.call(_c, channelKey, Date.now() + 500);
          } else {
            (_f = (_e = this._mobSpawnQueueNextAt) == null ? void 0 : _e.delete) == null ? void 0 : _f.call(_e, channelKey);
          }
        }
        const liveMobsAfter = this._countLiveMobs(dungeon);
        this._logSpawnPipelineGuard(
          channelKey,
          `rehydrated spawn pipeline (${reason}) | live ${liveMobsBefore} -> ${liveMobsAfter} | total=${dungeon.mobs.total}/${targetCount || "?"}`
        );
        return liveMobsAfter > 0;
      }
    };
  }
});

// src/Dungeons/spawn-wave-builders.js
var require_spawn_wave_builders = __commonJS({
  "src/Dungeons/spawn-wave-builders.js"(exports2, module2) {
    var C2 = require_constants();
    module2.exports = {
      getDefaultBeastFamilies() {
        return [
          "insect",
          "beast",
          "reptile",
          "ice",
          "dragon",
          "giant",
          "demon",
          "humanoid-beast",
          "undead",
          "construct",
          "ancient"
        ];
      },
      selectMagicBeastType(allowedFamilies, mobRank, allRanks) {
        var _a, _b;
        const safeFamilies = Array.isArray(allowedFamilies) && allowedFamilies.length > 0 ? allowedFamilies : this.getDefaultBeastFamilies();
        const safeRanks = Array.isArray(allRanks) && allRanks.length > 0 ? allRanks : ((_a = this.settings) == null ? void 0 : _a.dungeonRanks) || ((_b = this.defaultSettings) == null ? void 0 : _b.dungeonRanks) || [];
        const magicBeastTypes = {
          // Insect family
          ant: { type: "ant", name: "Ant", family: "insect", minRank: null },
          spider: { type: "spider", name: "Spider", family: "insect", minRank: null },
          centipede: { type: "centipede", name: "Centipede", family: "insect", minRank: null },
          // Beast family
          bear: { type: "bear", name: "Bear", family: "beast", minRank: null },
          wolf: { type: "wolf", name: "Wolf", family: "beast", minRank: null },
          // Reptile family
          naga: { type: "naga", name: "Naga", family: "reptile", minRank: null },
          serpent: { type: "serpent", name: "Serpent", family: "reptile", minRank: null },
          // Ice family
          yeti: { type: "yeti", name: "Yeti", family: "ice", minRank: null },
          // Dragon family (wyverns S+, dragons NH+)
          dragon: { type: "dragon", name: "Dragon", family: "dragon", minRank: "NH" },
          wyvern: { type: "wyvern", name: "Wyvern", family: "dragon", minRank: "S" },
          // Giant family
          giant: { type: "giant", name: "Giant", family: "giant", minRank: null },
          titan: { type: "titan", name: "Titan", family: "giant", minRank: "A" },
          // Demon family
          demon: { type: "demon", name: "Demon", family: "demon", minRank: "B" },
          // Humanoid-beast family
          ogre: { type: "ogre", name: "Ogre", family: "humanoid-beast", minRank: null },
          // Undead family
          ghoul: { type: "ghoul", name: "Ghoul", family: "undead", minRank: null },
          // Construct family
          golem: { type: "golem", name: "Golem", family: "construct", minRank: null },
          // Ancient family
          elf: { type: "elf", name: "Elf", family: "ancient", minRank: null },
          // Humanoid-beast family (orcs, etc.)
          orc: { type: "orc", name: "Orc", family: "humanoid-beast", minRank: null }
        };
        let availableBeasts = Object.values(magicBeastTypes).filter(
          (beast) => safeFamilies.includes(beast.family)
        );
        const mobRankIndex = safeRanks.indexOf(mobRank);
        availableBeasts = availableBeasts.filter((beast) => {
          if (!beast.minRank) return true;
          const minRankIndex = safeRanks.indexOf(beast.minRank);
          if (mobRankIndex < 0 || minRankIndex < 0) return true;
          return mobRankIndex >= minRankIndex;
        });
        if (availableBeasts.length === 0) {
          return { type: "beast", name: "Beast", family: "beast", minRank: null };
        }
        return availableBeasts[Math.floor(Math.random() * availableBeasts.length)];
      },
      _buildFallbackMobWave(dungeon, desiredCount = 1, context = "spawn_guard") {
        var _a;
        const rankList = this.getDungeonRankList();
        const mobRank = (dungeon == null ? void 0 : dungeon.rank) || rankList[0] || "E";
        const rankIndex = this.getRankIndexValue(mobRank, rankList);
        const baseStats = this.calculateMobBaseStats(rankIndex) || {};
        const baseStrength = Math.max(1, Math.floor(Number(baseStats.strength) || 100));
        const baseAgility = Math.max(0, Math.floor(Number(baseStats.agility) || 80));
        const baseIntelligence = Math.max(0, Math.floor(Number(baseStats.intelligence) || 60));
        const baseVitality = Math.max(1, Math.floor(Number(baseStats.vitality) || 150));
        const maxSpawn = this.clampNumber(Math.floor(Number(desiredCount) || 1), 1, 25);
        const safeFamilies = Array.isArray(dungeon == null ? void 0 : dungeon.beastFamilies) && dungeon.beastFamilies.length > 0 ? dungeon.beastFamilies : this.getDefaultBeastFamilies();
        const fallbackMobs = [];
        const spawnedAt = Date.now();
        for (let i = 0; i < maxSpawn; i++) {
          const beast = this.selectMagicBeastType(safeFamilies, mobRank, rankList);
          const role = this.deriveMonsterRoleFromBeast(beast.type, beast.family);
          const hpVariance = 0.7 + Math.random() * 0.3;
          const hp = Math.max(1, Math.floor((220 + baseVitality * 12 + rankIndex * 90) * hpVariance));
          fallbackMobs.push({
            id: `mob_fallback_${spawnedAt}_${i}_${Math.random().toString(36).slice(2, 8)}`,
            rank: mobRank,
            beastType: beast.type,
            beastName: beast.name,
            beastFamily: beast.family,
            role,
            isMagicBeast: true,
            hp,
            maxHp: hp,
            lastAttackTime: 0,
            attackCooldown: 1800 + Math.random() * 1200,
            mobTier: "normal",
            isElite: false,
            baseStats: {
              strength: baseStrength,
              agility: baseAgility,
              intelligence: baseIntelligence,
              vitality: baseVitality,
              perception: Math.max(10, Math.floor((baseStrength + baseAgility + baseIntelligence) * 0.25))
            },
            strength: baseStrength,
            agility: baseAgility,
            intelligence: baseIntelligence,
            vitality: baseVitality,
            traits: {
              strengthMod: 1,
              agilityMod: 1,
              intelligenceMod: 1,
              vitalityMod: 1,
              hpMod: hpVariance
            },
            extractionData: {
              dungeonRank: (dungeon == null ? void 0 : dungeon.rank) || mobRank,
              dungeonType: (dungeon == null ? void 0 : dungeon.type) || "Recovered",
              biome: ((_a = dungeon == null ? void 0 : dungeon.biome) == null ? void 0 : _a.name) || (dungeon == null ? void 0 : dungeon.type) || "Recovered",
              beastFamilies: safeFamilies,
              spawnedAt,
              context
            },
            description: `${mobRank}-rank ${beast.name} (fallback)`
          });
        }
        return fallbackMobs;
      },
      _getMobActiveCap(dungeon) {
        var _a, _b, _c;
        const dungeonMobCapacity = Number((_a = dungeon == null ? void 0 : dungeon.mobs) == null ? void 0 : _a.mobCapacity);
        const rankCap = Number.isFinite(dungeonMobCapacity) && dungeonMobCapacity > 0 ? Math.max(50, Math.floor(dungeonMobCapacity)) : 200;
        if (((_b = this.settings) == null ? void 0 : _b.performanceMode) !== false) {
          const perfCap = Number((_c = this.settings) == null ? void 0 : _c.performanceAliveMobCap);
          const ceiling = Number.isFinite(perfCap) && perfCap >= 100 ? Math.floor(perfCap) : 800;
          return Math.min(rankCap, ceiling);
        }
        return rankCap;
      },
      processMobSpawnQueue(channelKey) {
        var _a;
        const dungeon = this._getActiveDungeon(channelKey);
        if (!dungeon) {
          this.settings.debug && console.log(`[Dungeons] MOB_SPAWN_TRACE: processMobSpawnQueue(${channelKey}) \u2014 NO DUNGEON`);
          this._mobSpawnQueue.delete(channelKey);
          return 0;
        }
        if (!dungeon.mobs || typeof dungeon.mobs !== "object") dungeon.mobs = {};
        if (!Array.isArray(dungeon.mobs.activeMobs)) dungeon.mobs.activeMobs = [];
        const queuedMobs = this._mobSpawnQueue.get(channelKey);
        if (!queuedMobs || queuedMobs.length === 0) {
          this.settings.debug && console.log(`[Dungeons] MOB_SPAWN_TRACE: processMobSpawnQueue(${channelKey}) \u2014 EMPTY queue`);
          this._mobSpawnQueue.delete(channelKey);
          return 0;
        }
        let validQueuedMobs = [];
        for (let i = 0; i < queuedMobs.length; i++) {
          const mob = queuedMobs[i];
          if (!mob || typeof mob !== "object") continue;
          const hp = Number(mob.hp);
          const maxHp = Number(mob.maxHp);
          if (!Number.isFinite(hp) || hp <= 0 || !Number.isFinite(maxHp) || maxHp <= 0) continue;
          mob.hp = Math.max(1, Math.floor(hp));
          mob.maxHp = Math.max(mob.hp, Math.floor(maxHp));
          this.ensureMonsterRole(mob);
          validQueuedMobs.push(mob);
        }
        if (validQueuedMobs.length === 0) {
          const fallbackMobs = this._buildFallbackMobWave(
            dungeon,
            Math.max(1, Math.min(10, queuedMobs.length || 1)),
            "queue_invalid"
          );
          if (fallbackMobs.length > 0) {
            this._logSpawnPipelineGuard(
              channelKey,
              `queue invalid; substituting fallback wave (${fallbackMobs.length} mobs)`
            );
            validQueuedMobs = fallbackMobs;
          }
          if (validQueuedMobs.length === 0) {
            this.settings.debug && console.log(`[Dungeons] MOB_SPAWN_TRACE: processMobSpawnQueue(${channelKey}) \u2014 DROPPED invalid queued mobs (${queuedMobs.length})`);
            this._mobSpawnQueue.delete(channelKey);
            return 0;
          }
        }
        const mobCap = this._getMobActiveCap(dungeon);
        let aliveMobs = 0;
        for (let i = 0; i < dungeon.mobs.activeMobs.length; i++) {
          ((_a = dungeon.mobs.activeMobs[i]) == null ? void 0 : _a.hp) > 0 && aliveMobs++;
        }
        this._mobCleanupCache.set(channelKey, { alive: aliveMobs, time: Date.now() });
        const capacityRemaining = Math.max(0, mobCap - aliveMobs);
        if (capacityRemaining <= 0) {
          this._mobSpawnQueue.set(channelKey, validQueuedMobs);
          return validQueuedMobs.length;
        }
        const mobsToFlush = validQueuedMobs.slice(0, capacityRemaining);
        const queuedOverflow = validQueuedMobs.length > mobsToFlush.length ? validQueuedMobs.slice(mobsToFlush.length) : [];
        const beforeCount = dungeon.mobs.activeMobs.length;
        dungeon.mobs.activeMobs.push(...mobsToFlush);
        if (!dungeon._isDemonCastle) {
          dungeon.mobs.remaining += mobsToFlush.length;
          dungeon.mobs.total += mobsToFlush.length;
        }
        this.settings.debug && console.log(
          `[Dungeons] MOB_SPAWN_TRACE: processMobSpawnQueue(${channelKey}) \u2014 FLUSHED ${mobsToFlush.length} mobs (activeMobs: ${beforeCount} \u2192 ${dungeon.mobs.activeMobs.length}, total=${dungeon.mobs.total}, queuedLeft=${queuedOverflow.length})`
        );
        if (queuedOverflow.length > 0) {
          this._mobSpawnQueue.set(channelKey, queuedOverflow);
        } else {
          this._mobSpawnQueue.delete(channelKey);
        }
        this._mobCleanupCache.set(channelKey, {
          alive: aliveMobs + mobsToFlush.length,
          time: Date.now()
        });
        this.queueHPBarUpdate(channelKey);
        return queuedOverflow.length;
      },
      spawnMobs(channelKey) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _i;
        const dungeon = this._getActiveDungeon(channelKey);
        if (!dungeon) {
          this.settings.debug && console.log(`[Dungeons] MOB_SPAWN_TRACE: spawnMobs(${channelKey}) \u2014 NO DUNGEON, stopping`);
          this.stopMobSpawning(channelKey);
          return;
        }
        if (!dungeon.mobs || typeof dungeon.mobs !== "object") dungeon.mobs = {};
        if (!Array.isArray(dungeon.mobs.activeMobs)) dungeon.mobs.activeMobs = [];
        if (dungeon._isDemonCastle && (dungeon.mobs.remaining || 0) <= 0) {
          this.debugLog("MOB_SPAWN_TRACE", `spawnMobs(${channelKey}) \u2014 all ${dungeon.mobs.total} demons killed, stopping`);
          this.stopMobSpawning(channelKey);
        } else if (dungeon.boss.hp > 0 || dungeon.boss._isSentinel) {
          const dungeonRankIndex = this.getRankIndexValue(dungeon.rank);
          let _aliveMobs = 0;
          const _mobCacheEntry = this._mobCleanupCache.get(channelKey);
          if (_mobCacheEntry && Date.now() - _mobCacheEntry.time < 1e3) {
            _aliveMobs = _mobCacheEntry.alive || 0;
          } else {
            for (const mob of dungeon.mobs.activeMobs) {
              (mob == null ? void 0 : mob.hp) > 0 && _aliveMobs++;
            }
          }
          const activeMobCap = this._getMobActiveCap(dungeon);
          if (_aliveMobs >= activeMobCap) {
            if (!this._mobCapWarningShown[channelKey]) {
              this.debugLog("MOB_CAP", "Alive mobs at concurrent cap, waiting for kills", {
                channelKey,
                activeMobCap,
                alive: _aliveMobs,
                rank: dungeon.rank
              });
              this._mobCapWarningShown[channelKey] = true;
              this._setTrackedTimeout(() => {
                if (this._mobCapWarningShown) delete this._mobCapWarningShown[channelKey];
              }, 3e4);
            }
            return;
          }
          const { baseSpawnCount, variancePercent } = this.getMobWaveRuntimeConfig();
          const totalMobCapacity = Math.max(activeMobCap, Number((_a = dungeon.mobs) == null ? void 0 : _a.mobCapacity) || activeMobCap);
          const spawnFraction = 0.05 + dungeonRankIndex * 5e-3;
          const rankCapacityBase = Math.floor(totalMobCapacity * spawnFraction);
          const effectiveBase = Math.max(
            Number.isFinite(baseSpawnCount) && baseSpawnCount > 0 ? baseSpawnCount : 1,
            rankCapacityBase
          );
          const deficitRatio = activeMobCap > 0 ? this.clampNumber((activeMobCap - _aliveMobs) / activeMobCap, 0, 1) : 0;
          const deficitBoost = 0.8 + deficitRatio * 0.6;
          const rankSpawnCap = Math.max(10, Math.min(5e4, Math.floor(totalMobCapacity * 0.1)));
          const dynamicBaseSpawn = this.clampNumber(Math.floor(effectiveBase * deficitBoost), 1, rankSpawnCap);
          const variance = dynamicBaseSpawn * variancePercent;
          const plannedSpawn = this.clampNumber(
            Math.floor(dynamicBaseSpawn - variance + Math.random() * variance * 2),
            1,
            rankSpawnCap
          );
          const capacityRemaining = Math.max(0, activeMobCap - _aliveMobs);
          const actualSpawnCount = Math.max(1, Math.min(capacityRemaining, plannedSpawn));
          const floorScale = Number((_b = dungeon.difficultyScale) == null ? void 0 : _b.mobFactor) || 1;
          const pressureMobFactor = this.getShadowPressureMobFactor(dungeon) * floorScale;
          const pressureBucket = Math.round(pressureMobFactor * 100);
          const rankList = this.getDungeonRankList();
          const cacheKey = `${channelKey}_${dungeon.rank}_${actualSpawnCount}_${pressureBucket}`;
          const cached = this._mobGenerationCache.get(cacheKey);
          const now = Date.now();
          let newMobs;
          if (cached && now - cached.timestamp < this._mobCacheTTL) {
            const spawnedAt = Date.now();
            newMobs = [];
            for (let i = 0; i < cached.mobs.length; i++) {
              const mobTemplate = cached.mobs[i];
              if (!mobTemplate || typeof mobTemplate !== "object") continue;
              const hp = Number(mobTemplate.hp);
              const maxHp = Number(mobTemplate.maxHp);
              if (!Number.isFinite(hp) || hp <= 0 || !Number.isFinite(maxHp) || maxHp <= 0) continue;
              const mob = {
                ...mobTemplate,
                id: `mob_${spawnedAt}_${this._mobIdCounter++}`,
                // New unique ID (counter is faster than random+toString(36))
                spawnedAt
                // Update spawn time
              };
              mob.hp = Math.max(1, Math.floor(hp));
              mob.maxHp = Math.max(mob.hp, Math.floor(maxHp));
              this.ensureMonsterRole(mob);
              newMobs.push(mob);
            }
          } else {
            const spawnedAt = Date.now();
            newMobs = [];
            for (let i = 0; i < actualSpawnCount; i++) {
              const rankVariation = Math.floor(Math.random() * 3) - 1;
              const mobRankIndex = Math.max(
                0,
                Math.min(rankList.length - 1, dungeonRankIndex + rankVariation)
              );
              const mobRank = rankList[mobRankIndex] || dungeon.rank || rankList[0] || "E";
              const mobTier = this._rollMobTier();
              const tierMultipliers = this._getMobTierMultipliers(mobTier);
              const magicBeastType = this.selectMagicBeastType(
                dungeon.beastFamilies,
                mobRank,
                rankList
              );
              const speciesWeights = (_c = C2.BEAST_STAT_WEIGHTS) == null ? void 0 : _c[magicBeastType.type];
              const sw = speciesWeights || { strength: 1, agility: 1, intelligence: 1, vitality: 1 };
              const strengthVariance = this._varianceWide();
              const agilityVariance = this._varianceWide();
              const intelligenceVariance = this._varianceWide();
              const vitalityVariance = this._varianceWide();
              const mobBaseStats = this.calculateMobBaseStats(mobRankIndex);
              const mobStrength = Math.floor(mobBaseStats.strength * sw.strength * strengthVariance * tierMultipliers.statMultiplier);
              const mobAgility = Math.floor(mobBaseStats.agility * sw.agility * agilityVariance * tierMultipliers.statMultiplier);
              const mobIntelligence = Math.floor(
                mobBaseStats.intelligence * sw.intelligence * intelligenceVariance * tierMultipliers.statMultiplier
              );
              const mobVitality = Math.floor(mobBaseStats.vitality * sw.vitality * vitalityVariance * tierMultipliers.statMultiplier);
              const mobRankHpFactor = this.getMobRankHpFactorByIndex(mobRankIndex);
              const baseHP = (200 + mobBaseStats.vitality * 15 + mobRankIndex * 100) * mobRankHpFactor * tierMultipliers.hpMultiplier * pressureMobFactor;
              const hpVariance = 0.7 + Math.random() * 0.3;
              const mobHP = Math.floor(baseHP * hpVariance);
              const finalMobHP = Math.max(1, mobHP);
              if (!Number.isFinite(finalMobHP) || finalMobHP <= 0) {
                (_d = this.errorLog) == null ? void 0 : _d.call(this, "COMBAT", "Invalid mob HP \u2014 skipping mob spawn", { finalMobHP });
                continue;
              }
              const cooldownVariance = (2e3 + Math.random() * 2e3) * tierMultipliers.cooldownMultiplier;
              const mobRole = this.deriveMonsterRoleFromBeast(
                magicBeastType.type,
                magicBeastType.family
              );
              newMobs.push({
                // Core mob identity
                id: `mob_${spawnedAt}_${this._mobIdCounter++}`,
                rank: mobRank,
                // MAGIC BEAST IDENTITY (for shadow extraction)
                beastType: magicBeastType.type,
                // 'ant', 'dragon', 'naga', etc.
                beastName: magicBeastType.name,
                // 'Ant', 'Dragon', 'Naga', etc.
                beastFamily: magicBeastType.family,
                // 'insect', 'dragon', 'reptile', etc.
                role: mobRole,
                isMagicBeast: true,
                // All dungeon mobs are magic beasts
                // Combat stats (current HP)
                // HP calculated from vitality: 200 + VIT × 15 + rankIndex × 100 (with variance)
                hp: finalMobHP,
                maxHp: finalMobHP,
                lastAttackTime: 0,
                attackCooldown: cooldownVariance,
                mobTier,
                isElite: mobTier !== "normal",
                // SHADOW-COMPATIBLE STATS (directly transferable to shadow.baseStats)
                baseStats: {
                  strength: mobStrength,
                  agility: mobAgility,
                  intelligence: mobIntelligence,
                  vitality: mobVitality,
                  perception: Math.floor((50 + mobRankIndex * 20) * (sw.perception || 1) * this._varianceWide())
                },
                // Root-level stats for combat calculations (mirrors baseStats for direct access)
                strength: mobStrength,
                agility: mobAgility,
                intelligence: mobIntelligence,
                vitality: mobVitality,
                // Individual variance modifiers (preserved during extraction)
                traits: {
                  strengthMod: strengthVariance,
                  agilityMod: agilityVariance,
                  intelligenceMod: intelligenceVariance,
                  vitalityMod: vitalityVariance,
                  hpMod: hpVariance
                },
                // Extraction metadata (used when converting to shadow)
                extractionData: {
                  dungeonRank: dungeon.rank,
                  dungeonType: dungeon.type,
                  biome: ((_e = dungeon.biome) == null ? void 0 : _e.name) || dungeon.type || "Unknown",
                  beastFamilies: dungeon.beastFamilies,
                  spawnedAt
                },
                // Magic beast description (for display/debugging)
                description: `${mobRank}-rank ${magicBeastType.name} (${mobTier}) from ${((_f = dungeon.biome) == null ? void 0 : _f.name) || dungeon.type || "Unknown"}`
              });
            }
            if (newMobs.length === 0) {
              (_g = this.errorLog) == null ? void 0 : _g.call(this, "COMBAT", "Mob generation produced no valid mobs; skipping spawn wave", {
                channelKey,
                actualSpawnCount,
                pressureMobFactor
              });
            }
            const mobTemplates = newMobs.map((m) => ({
              ...m,
              id: void 0,
              // Remove ID for template
              spawnedAt: void 0
              // Remove timestamp for template
            }));
            this._mobGenerationCache.set(cacheKey, { mobs: mobTemplates, timestamp: now });
            if (this._mobGenerationCache.size > 50) {
              const firstKey = this._mobGenerationCache.keys().next().value;
              this._mobGenerationCache.delete(firstKey);
            }
          }
          if (!newMobs || newMobs.length === 0) {
            const fallbackMobs = this._buildFallbackMobWave(
              dungeon,
              Math.max(1, Math.min(actualSpawnCount || 1, 12)),
              "generation_empty"
            );
            if (fallbackMobs.length > 0) {
              this._logSpawnPipelineGuard(
                channelKey,
                `empty generation; injected fallback wave (${fallbackMobs.length})`
              );
              newMobs = fallbackMobs;
              if (cached) this._mobGenerationCache.delete(cacheKey);
            } else {
              (_h = this.errorLog) == null ? void 0 : _h.call(this, "COMBAT", "No valid mobs available after generation/cache pass; skipping spawn wave", {
                channelKey,
                cacheKey,
                fromCache: !!cached
              });
              if (cached) this._mobGenerationCache.delete(cacheKey);
              return;
            }
          }
          if (!this._mobSpawnQueue.has(channelKey)) {
            this._mobSpawnQueue.set(channelKey, []);
          }
          this._mobSpawnQueue.get(channelKey).push(...newMobs);
          if (!this._mobSpawnQueueNextAt.has(channelKey)) {
            const batchDelay = 250 + Math.random() * 250;
            this._mobSpawnQueueNextAt.set(channelKey, Date.now() + batchDelay);
            this._ensureMobSpawnLoop();
          }
          if (!dungeon.spawnWaveCount) dungeon.spawnWaveCount = 0;
          dungeon.spawnWaveCount++;
        } else {
          this.settings.debug && console.log(`[Dungeons] MOB_SPAWN_TRACE: spawnMobs(${channelKey}) \u2014 BOSS DEAD (hp=${(_i = dungeon.boss) == null ? void 0 : _i.hp}), stopping`);
          this.stopMobSpawning(channelKey);
        }
      }
    };
  }
});

// src/Dungeons/player-flow.js
var require_player_flow = __commonJS({
  "src/Dungeons/player-flow.js"(exports2, module2) {
    module2.exports = {
      /**
       * Force every dungeon's userParticipating flag to agree with
       * settings.userActiveDungeon, which is the single source of truth for where
       * the player is.
       *
       * Why this is needed: selectDungeon/leaveDungeon persist settings
       * SYNCHRONOUSLY but write the dungeon record fire-and-forget
       * (storageManager.saveDungeon(...).catch(...), four sites in this file). A
       * reload landing between the two leaves the pair disagreeing, in either
       * direction:
       *   - dungeon says participating, settings says nobody -> "ghost" attacks
       *     credited to a player who left, because processUserAttack only reads
       *     the dungeon flag.
       *   - settings names a dungeon whose record says not participating -> the
       *     one-dungeon-at-a-time check in selectDungeon sees a live previous
       *     dungeon and refuses every other join, locking the player out.
       *
       * Deriving the flag instead of trusting it fixes both without awaiting the
       * IDB write on a click handler.
       */
      _reconcileParticipation() {
        var _a;
        const active = this.settings.userActiveDungeon || null;
        const alive = this.settings.userHP === void 0 || this.settings.userHP > 0;
        if (!(this.activeDungeons instanceof Map)) return;
        for (const [key, dungeon] of this.activeDungeons) {
          if (!dungeon) continue;
          const shouldParticipate = key === active && !dungeon.completed && !dungeon.failed && alive;
          if (dungeon.userParticipating !== shouldParticipate) {
            (_a = this.debugLog) == null ? void 0 : _a.call(
              this,
              `Participation reconciled for ${key}: ${dungeon.userParticipating} -> ${shouldParticipate}`
            );
            dungeon.userParticipating = shouldParticipate;
          }
        }
      },
      validateActiveDungeonStatus() {
        this._reconcileParticipation();
        if (!this.settings.userActiveDungeon) {
          return true;
        }
        const channelKey = this.settings.userActiveDungeon;
        const dungeon = this.activeDungeons.get(channelKey);
        if (!dungeon || dungeon.completed || dungeon.failed) {
          this.debugLog(
            `Active dungeon ${channelKey} no longer exists or is completed/failed. Clearing active status.`
          );
          this.settings.userActiveDungeon = null;
          this._reconcileParticipation();
          this.saveSettings();
          return false;
        }
        const channelInfo = this.getChannelInfo();
        if (channelInfo) {
        }
        return true;
      },
      async selectDungeon(channelKey) {
        var _a, _b, _c, _d;
        this.validateActiveDungeonStatus();
        const dungeon = this.activeDungeons.get(channelKey);
        if (!dungeon) {
          this.showToast("No active dungeon here \u2014 it may have already been cleared.", "error");
          return;
        }
        if (dungeon.completed || dungeon.failed || dungeon._completing) {
          this.showToast("This dungeon has already been cleared.", "info");
          return;
        }
        if (dungeon.userParticipating) {
          this.showToast("Already in this dungeon!", "info");
          return;
        }
        const { hpSynced, manaSynced } = this.syncHPAndManaFromStats();
        if (hpSynced || manaSynced) {
          this.debugLog(
            `HP/Mana synced: ${this.settings.userHP}/${this.settings.userMaxHP} HP, ${this.settings.userMana}/${this.settings.userMaxMana} Mana`
          );
        }
        if (this.settings.userHP <= 0) {
          this.showToast("You need HP to join a dungeon! Wait for HP to regenerate.", "error");
          return;
        }
        if (this.settings.userActiveDungeon && this.settings.userActiveDungeon !== channelKey) {
          const prevDungeon = this.activeDungeons.get(this.settings.userActiveDungeon);
          const shouldClearPrev = !prevDungeon || prevDungeon.completed || prevDungeon.failed;
          if (shouldClearPrev) {
            this.settings.userActiveDungeon = null;
            this.saveSettings();
          }
          const isPrevActive = prevDungeon && !prevDungeon.completed && !prevDungeon.failed;
          if (isPrevActive) {
            this.showToast(`Already in ${prevDungeon.name}! Complete it first.`, "error");
            return;
          }
        }
        dungeon.userParticipating = true;
        dungeon.userJoined = true;
        this.settings.userActiveDungeon = channelKey;
        (_b = (_a = this._bossBarCache) == null ? void 0 : _a.delete) == null ? void 0 : _b.call(_a, channelKey);
        this.queueHPBarUpdate(channelKey);
        if (((_d = (_c = this.soloLevelingStats) == null ? void 0 : _c.settings) == null ? void 0 : _d.rank) === "Shadow Monarch") {
          this._playMonarchAdvent();
          this.showToast(`The Monarch enters ${dungeon.name}.`, "info");
        } else {
          this.showToast(`Joined ${dungeon.name}!`, "info");
        }
        this.saveSettings();
        if (this.storageManager) {
          this.storageManager.saveDungeon(dungeon).catch(
            (err) => this.errorLog("Failed to save dungeon after join", err)
          );
        }
      },
      leaveDungeon(channelKey, opts = {}) {
        var _a, _b;
        const { silent = false } = opts;
        const dungeon = this.activeDungeons.get(channelKey);
        if (!dungeon) {
          if (!silent) this.showToast("No active dungeon here.", "error");
          return false;
        }
        if (!dungeon.userParticipating) {
          if (!silent) this.showToast("You are not joined in this dungeon.", "info");
          return false;
        }
        dungeon.userParticipating = false;
        if (this.settings.userActiveDungeon === channelKey) {
          this.settings.userActiveDungeon = null;
        }
        (_b = (_a = this._bossBarCache) == null ? void 0 : _a.delete) == null ? void 0 : _b.call(_a, channelKey);
        this.queueHPBarUpdate(channelKey);
        if (!silent) {
          this.showToast(`Left ${dungeon.name}. You can now join other dungeons.`, "info");
        }
        this.saveSettings();
        if (this.storageManager) {
          this.storageManager.saveDungeon(dungeon).catch(
            (err) => this.errorLog("Failed to save dungeon after leave", err)
          );
        }
        return true;
      },
      async deployShadows(channelKey) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F;
        const dungeon = this.activeDungeons.get(channelKey);
        if (!dungeon) {
          this.showToast("No active dungeon here \u2014 it may have already been cleared.", "error");
          return;
        }
        if (dungeon.completed || dungeon.failed || dungeon._completing) {
          this.showToast("This dungeon has already been cleared.", "info");
          return;
        }
        if (dungeon.shadowsDeployed) {
          this.showToast("Shadows already deployed here!", "info");
          return;
        }
        if (dungeon._deploying) {
          this.showToast("Deploy in progress \u2014 please wait.", "info");
          return;
        }
        dungeon._deploying = true;
        let deployMutexReleased = false;
        (_b = (_a = this._bossBarCache) == null ? void 0 : _a.delete) == null ? void 0 : _b.call(_a, channelKey);
        this.queueHPBarUpdate(channelKey);
        this.validateActiveDungeonStatus();
        const { hpSynced, manaSynced } = this.syncHPAndManaFromStats();
        if (hpSynced || manaSynced) {
          this.debugLog(
            `HP/Mana synced: ${this.settings.userHP}/${this.settings.userMaxHP} HP, ${this.settings.userMana}/${this.settings.userMaxMana} Mana`
          );
        }
        if (this.settings.userHP <= 0) {
          dungeon._deploying = false;
          deployMutexReleased = true;
          (_d = (_c = this._bossBarCache) == null ? void 0 : _c.delete) == null ? void 0 : _d.call(_c, channelKey);
          this.queueHPBarUpdate(channelKey);
          this.showToast("You need HP to deploy shadows! Wait for HP to regenerate.", "error");
          return;
        }
        try {
          dungeon.shadowsDeployed = true;
          const bossGateConfig = this.getBossGateRuntimeConfig(dungeon.rank, (_e = dungeon.mobs) == null ? void 0 : _e.mobCapacity);
          if (!dungeon.bossGate || typeof dungeon.bossGate !== "object") {
            dungeon.bossGate = {
              enabled: bossGateConfig.enabled,
              minDurationMs: bossGateConfig.minDurationMs,
              requiredMobKills: bossGateConfig.requiredMobKills,
              deployedAt: null,
              unlockedAt: null
            };
          } else if (dungeon.bossGate.enabled !== false) {
            dungeon.bossGate.enabled = bossGateConfig.enabled;
            dungeon.bossGate.minDurationMs = bossGateConfig.minDurationMs;
            dungeon.bossGate.requiredMobKills = bossGateConfig.requiredMobKills;
          }
          const deployedAt = Date.now();
          dungeon.deployedAt = deployedAt;
          dungeon.bossGate.deployedAt = deployedAt;
          dungeon.bossGate.unlockedAt = null;
          this._markAllocationDirty("deploy-shadows");
          this._autoApplySovereignDomain(channelKey, dungeon);
        } catch (stateError) {
          dungeon._deploying = false;
          deployMutexReleased = true;
          dungeon.shadowsDeployed = false;
          dungeon.deployedAt = null;
          if (dungeon.bossGate && typeof dungeon.bossGate === "object") {
            dungeon.bossGate.deployedAt = null;
            dungeon.bossGate.unlockedAt = null;
          }
          this.errorLog("DEPLOY", "Failed to initialize deploy state \u2014 rolled back", { channelKey, error: stateError });
          (_g = (_f = this._bossBarCache) == null ? void 0 : _f.delete) == null ? void 0 : _g.call(_f, channelKey);
          this.queueHPBarUpdate(channelKey);
          this.showToast("Deploy failed to initialize. Try again.", "error");
          return;
        }
        const deployStartedAt = Date.now();
        let starterAllocationCount = 0;
        try {
          const starterShadows = this._buildDeployStarterAllocation(channelKey, dungeon);
          starterAllocationCount = this._applyDeployStarterAllocation(channelKey, dungeon, starterShadows);
        } catch (error) {
          this.errorLog("DEPLOY", "Failed to build starter allocation", { channelKey, error });
        }
        let selfHealAborted = false;
        if (starterAllocationCount === 0 && ((_h = this.shadowArmy) == null ? void 0 : _h.abortSelfHeal)) {
          this.shadowArmy.abortSelfHeal();
          selfHealAborted = true;
        }
        try {
          if (starterAllocationCount === 0) {
            this.debugLog("DEPLOY", "Starter allocation returned 0 \u2014 attempting recovery warmup", { channelKey });
            try {
              const recoveryWarmTarget = this._getDeployWarmTarget(dungeon.rank);
              const warmedPoolCount = await this._warmDeployStarterPool(
                {
                  dungeonRank: dungeon.rank,
                  targetCount: recoveryWarmTarget,
                  sampleLimit: Math.max(400, Math.floor(recoveryWarmTarget * 4))
                }
              );
              if (!dungeon.shadowsDeployed) {
                dungeon._deploying = false;
                deployMutexReleased = true;
                (_j = (_i = this._bossBarCache) == null ? void 0 : _i.delete) == null ? void 0 : _j.call(_i, channelKey);
                this.queueHPBarUpdate(channelKey);
                this.debugLog("DEPLOY", "Aborted \u2014 recalled during cache warm", { channelKey });
                return;
              }
              if (warmedPoolCount > 0) {
                this.debugLog("DEPLOY", `Starter pool warmed: ${warmedPoolCount} shadows available \u2014 retrying allocation`, { channelKey });
                const retryShadows = this._buildDeployStarterAllocation(channelKey, dungeon);
                starterAllocationCount = this._applyDeployStarterAllocation(channelKey, dungeon, retryShadows);
              }
              if (starterAllocationCount === 0) {
                const refreshedPoolCount = await this._warmDeployStarterPool({
                  dungeonRank: dungeon.rank,
                  targetCount: recoveryWarmTarget,
                  sampleLimit: Math.max(1200, Math.floor(recoveryWarmTarget * 8)),
                  forceRefresh: true
                });
                if (refreshedPoolCount > 0) {
                  this.debugLog("DEPLOY", `Starter pool force-refreshed: ${refreshedPoolCount} shadows \u2014 retrying allocation`, { channelKey });
                  const retryShadows = this._buildDeployStarterAllocation(channelKey, dungeon);
                  starterAllocationCount = this._applyDeployStarterAllocation(channelKey, dungeon, retryShadows);
                }
              }
              if (starterAllocationCount === 0) {
                const lastResortPoolCount = await this._lastResortRankBoundedStarterPool(dungeon.rank, recoveryWarmTarget);
                if (lastResortPoolCount > 0) {
                  this.debugLog("DEPLOY", `Last-resort bounded pool warmed: ${lastResortPoolCount} shadows found \u2014 retrying allocation`, { channelKey });
                  const retryShadows = this._buildDeployStarterAllocation(channelKey, dungeon);
                  starterAllocationCount = this._applyDeployStarterAllocation(channelKey, dungeon, retryShadows);
                }
              }
            } catch (error) {
              this.errorLog("DEPLOY", "Cold-cache recovery failed", { channelKey, error });
            }
          }
          let { assignedShadows } = this._getAssignedShadowsForDungeon(channelKey, dungeon);
          if (assignedShadows.length === 0 && starterAllocationCount === 0) {
            try {
              this._markAllocationDirty("deploy-starter-empty-force-full-split");
              await this.preSplitShadowArmy(true);
              ({ assignedShadows } = this._getAssignedShadowsForDungeon(channelKey, dungeon));
              if (assignedShadows.length > 0) {
                this.debugLog("DEPLOY", "Recovered deploy allocation via forced full split", {
                  channelKey,
                  assigned: assignedShadows.length
                });
              }
            } catch (error) {
              this.errorLog("DEPLOY", "Forced full split failed after empty starter allocation", { channelKey, error });
            }
          }
          if (assignedShadows.length === 0 && starterAllocationCount === 0) {
            dungeon._deploying = false;
            deployMutexReleased = true;
            dungeon.shadowsDeployed = false;
            dungeon.deployedAt = null;
            if (dungeon.bossGate) {
              dungeon.bossGate.deployedAt = null;
              dungeon.bossGate.unlockedAt = null;
            }
            dungeon.shadowAllocation = null;
            this.shadowAllocations.delete(channelKey);
            this._markAllocationDirty("deploy-aborted-no-shadows");
            (_k = this._invalidateDeployAssignedUnion) == null ? void 0 : _k.call(this);
            this.errorLog("DEPLOY", "Deploy aborted: 0 shadows available for starter allocation", {
              channelKey,
              dungeonName: dungeon.name,
              dungeonRank: dungeon.rank
            });
            (_m = (_l = this._bossBarCache) == null ? void 0 : _l.delete) == null ? void 0 : _m.call(_l, channelKey);
            this.queueHPBarUpdate(channelKey);
            this.showToast("No shadows available to deploy! Extract more shadows first.", "error");
            return;
          }
          const deployMode = starterAllocationCount > 0 ? "fast-start" : "async-full-split";
          if (this.settings.debug) {
            const gateSummary = ((_n = dungeon.bossGate) == null ? void 0 : _n.enabled) === false ? "disabled" : `${Math.floor((((_o = dungeon.bossGate) == null ? void 0 : _o.minDurationMs) || 0) / 1e3)}s + ${((_p = dungeon.bossGate) == null ? void 0 : _p.requiredMobKills) || 0} kills`;
            console.log(
              `[Dungeons] \u2694\uFE0F DEPLOY: "${dungeon.name}" [${dungeon.rank}] in #${dungeon.channelName || "?"} (${dungeon.guildName || "?"}) \u2014 ${assignedShadows.length} shadows deployed | Boss: ${(_q = dungeon.boss) == null ? void 0 : _q.name} [${(_r = dungeon.boss) == null ? void 0 : _r.rank}] HP: ${(_t = (_s = dungeon.boss) == null ? void 0 : _s.hp) == null ? void 0 : _t.toLocaleString()} | Gate: ${gateSummary} | Mode: ${deployMode} | Alloc: ${Date.now() - deployStartedAt}ms | Key: ${channelKey}`
            );
          }
          const now = Date.now();
          if (dungeon.boss && (!dungeon.boss.lastAttackTime || dungeon.boss.lastAttackTime === 0)) {
            dungeon.boss.lastAttackTime = now;
          }
          if ((_u = dungeon.mobs) == null ? void 0 : _u.activeMobs) {
            dungeon.mobs.activeMobs.forEach((mob) => {
              if (mob && (!mob.lastAttackTime || mob.lastAttackTime === 0)) {
                mob.lastAttackTime = now;
              }
            });
          }
          this.startMobSpawning(channelKey);
          if ((_w = (_v = this._mobSpawnQueue) == null ? void 0 : _v.has) == null ? void 0 : _w.call(_v, channelKey)) {
            const queuedRemaining = this.processMobSpawnQueue(channelKey);
            if (queuedRemaining > 0) {
              (_y = (_x = this._mobSpawnQueueNextAt) == null ? void 0 : _x.set) == null ? void 0 : _y.call(_x, channelKey, Date.now() + 500);
            } else {
              (_A = (_z = this._mobSpawnQueueNextAt) == null ? void 0 : _z.delete) == null ? void 0 : _A.call(_z, channelKey);
            }
          }
          this.ensureDeployedSpawnPipeline(channelKey, "deploy_initial");
          const liveMobsAfterDeployStart = this._countLiveMobs(dungeon);
          if (liveMobsAfterDeployStart <= 0) {
            this.ensureDeployedSpawnPipeline(channelKey, "deploy_initial_hard_guard");
          }
          this._setTrackedTimeout(() => {
            var _a2, _b2;
            try {
              const guardDungeon = this._getActiveDungeon(channelKey);
              if (!guardDungeon || !guardDungeon.shadowsDeployed || ((_a2 = guardDungeon.boss) == null ? void 0 : _a2.hp) <= 0 && !((_b2 = guardDungeon.boss) == null ? void 0 : _b2._isSentinel)) return;
              this.ensureDeployedSpawnPipeline(channelKey, "deploy_watchdog");
            } catch (error) {
              this.errorLog("MOB_SPAWN_GUARD", "Deploy watchdog failed", error);
            }
          }, 1e3);
          const deployedShadows = this.shadowAllocations.get(channelKey) || assignedShadows;
          const rankCounts = {};
          for (const s of deployedShadows) {
            const r = (s == null ? void 0 : s.rank) || "E";
            rankCounts[r] = (rankCounts[r] || 0) + 1;
          }
          const totalDeployed = deployedShadows.length;
          const rankOrder = ["Shadow Monarch", "Monarch+", "Monarch", "NH", "SSS+", "SSS", "SS", "S", "A", "B", "C", "D", "E"];
          const rankParts = rankOrder.filter((r) => rankCounts[r] > 0).map((r) => `${rankCounts[r]} ${r}`);
          const breakdownStr = rankParts.length > 0 ? ` (${rankParts.join(", ")})` : "";
          this.showToast(`${totalDeployed} shadows deployed to ${dungeon.name}!${breakdownStr}`, "success");
          dungeon._deploying = false;
          deployMutexReleased = true;
          this.saveSettings();
          if (this.storageManager) {
            this.storageManager.saveDungeon(dungeon).catch(
              (err) => this.errorLog("Failed to save dungeon after deploy", err)
            );
          }
          (_C = (_B = this._bossBarCache) == null ? void 0 : _B.delete) == null ? void 0 : _C.call(_B, channelKey);
          this.updateBossHPBar(channelKey);
          this._setTrackedTimeout(() => this.updateBossHPBar(channelKey), 34);
          await this.startShadowAttacks(channelKey, { allowBlockingReallocation: false });
          if (!dungeon.shadowsDeployed) {
            this.debugLog("DEPLOY", "Aborted \u2014 recalled during shadow attack init", { channelKey });
            return;
          }
          this.startBossAttacks(channelKey);
          this.startMobAttacks(channelKey);
          if (assignedShadows.length > 0) {
            await this.processShadowAttacks(channelKey, 1, this.isWindowVisible());
          }
          if (!dungeon.shadowsDeployed) return;
          dungeon._deployPendingFullAllocation = true;
          this._scheduleDeployRebalance(channelKey, deployStartedAt);
        } finally {
          if (selfHealAborted && ((_D = this.shadowArmy) == null ? void 0 : _D.resumeSelfHeal)) {
            this.shadowArmy.resumeSelfHeal(3e4);
          }
          if (!deployMutexReleased) {
            dungeon._deploying = false;
            (_F = (_E = this._bossBarCache) == null ? void 0 : _E.delete) == null ? void 0 : _F.call(_E, channelKey);
            this.queueHPBarUpdate(channelKey);
          }
        }
      },
      async recallShadows(channelKey) {
        var _a, _b, _c;
        const dungeon = this.activeDungeons.get(channelKey);
        if (!dungeon) {
          this.showToast("No active dungeon here.", "error");
          return;
        }
        if (!dungeon.shadowsDeployed) {
          this.showToast("No shadows deployed to recall.", "info");
          return;
        }
        if (dungeon.completed || dungeon.failed || dungeon._completing) {
          this.showToast("This dungeon has already been cleared.", "info");
          return;
        }
        dungeon._deploying = false;
        this.stopShadowAttacks(channelKey);
        this.stopBossAttacks(channelKey);
        this.stopMobAttacks(channelKey);
        this.stopMobSpawning(channelKey);
        dungeon.shadowsDeployed = false;
        dungeon.userParticipating = false;
        dungeon.deployedAt = null;
        if (dungeon.bossGate) {
          dungeon.bossGate.deployedAt = null;
          dungeon.bossGate.unlockedAt = null;
        }
        this.shadowAllocations.delete(channelKey);
        this._markAllocationDirty("recall-shadows");
        (_a = this._invalidateDeployAssignedUnion) == null ? void 0 : _a.call(this);
        dungeon._idleSince = Date.now();
        if (this.settings.userActiveDungeon === channelKey) {
          this.settings.userActiveDungeon = null;
        }
        this.settings.debug && console.log(
          `[Dungeons] RECALL: "${dungeon.name}" [${dungeon.rank}] \u2014 all shadows recalled from #${dungeon.channelName || "?"}`
        );
        this.showToast(`Shadows recalled from ${dungeon.name}!`, "info");
        this.saveSettings();
        if (this.storageManager) {
          this.storageManager.saveDungeon(dungeon).catch(
            (err) => this.errorLog("Failed to save dungeon after recall", err)
          );
        }
        (_c = (_b = this._bossBarCache) == null ? void 0 : _b.delete) == null ? void 0 : _c.call(_b, channelKey);
        this.queueHPBarUpdate(channelKey);
      },
      async processUserAttack(channelKey, messageElement = null) {
        const dungeon = this.activeDungeons.get(channelKey);
        if (!dungeon) return;
        if (dungeon.completed || dungeon.failed || dungeon._completing) return;
        if (!dungeon.shadowsDeployed || !dungeon.userParticipating) return;
        const bossUnlocked = this.ensureBossEngagementUnlocked(dungeon, channelKey);
        if (dungeon.boss.hp > 0 && bossUnlocked) {
          const attackResult = this._resolveUserBossDamage(dungeon, {
            messageElement
          });
          if (attackResult.damage > 0) {
            await this.applyDamageToBoss(
              channelKey,
              attackResult.damage,
              "user",
              null,
              attackResult.isCritical
            );
          }
        } else {
          await this.attackMobs(channelKey, "user", messageElement);
        }
      },
      _getBossCombatStats(dungeon) {
        var _a, _b, _c, _d, _e;
        return {
          strength: ((_a = dungeon == null ? void 0 : dungeon.boss) == null ? void 0 : _a.strength) || 0,
          agility: ((_b = dungeon == null ? void 0 : dungeon.boss) == null ? void 0 : _b.agility) || 0,
          intelligence: ((_c = dungeon == null ? void 0 : dungeon.boss) == null ? void 0 : _c.intelligence) || 0,
          vitality: ((_d = dungeon == null ? void 0 : dungeon.boss) == null ? void 0 : _d.vitality) || 0,
          perception: ((_e = dungeon == null ? void 0 : dungeon.boss) == null ? void 0 : _e.perception) || 0
        };
      },
      // SHADOW MONARCH PERK (Monarch's Domain -> Sovereign Territory, auto-cast):
      // at SM the domain is permanent and the manual cast was pointless friction —
      // the cast site's comment marked auto-apply-on-deploy as the follow-up
      // refinement. Envelops the dungeon the moment shadows deploy, matching the
      // manual cast's SM numbers exactly: base 1.50 + 0.05/passive-level
      // (SkillTree data.js shadowBuff) + the SM +1.0 bonus, permanent, shadows
      // status-immune. Gated on the Domain Expansion unlock (passive level >= 3,
      // same as casting it by hand).
      // MONARCH'S ADVENT: a brief purple aura burst when the Shadow Monarch joins
      // a fight. Self-contained overlay (own keyframes, fixed, pointer-events:none,
      // auto-removed) — pure flair, zero combat impact.
      _playMonarchAdvent() {
        try {
          if (typeof document === "undefined") return;
          if (document.getElementById("dungeon-monarch-advent")) return;
          const el = document.createElement("div");
          el.id = "dungeon-monarch-advent";
          const style = document.createElement("style");
          style.textContent = "@keyframes dg-monarch-advent{0%{opacity:0;transform:scale(.65)}22%{opacity:.9}100%{opacity:0;transform:scale(1.55)}}";
          el.appendChild(style);
          Object.assign(el.style, {
            position: "fixed",
            inset: "0",
            zIndex: "99999",
            pointerEvents: "none",
            background: "radial-gradient(circle at 50% 55%, rgba(138,43,226,0.38) 0%, rgba(88,28,135,0.20) 35%, transparent 68%)",
            animation: "dg-monarch-advent 900ms ease-out forwards"
          });
          document.body.appendChild(el);
          this._setTrackedTimeout(() => {
            try {
              el.remove();
            } catch (_) {
            }
          }, 1e3);
        } catch (_) {
        }
      },
      _autoApplySovereignDomain(channelKey, dungeon) {
        var _a, _b, _c, _d, _e, _f;
        try {
          if (!dungeon) return;
          if (((_b = (_a = this.soloLevelingStats) == null ? void 0 : _a.settings) == null ? void 0 : _b.rank) !== "Shadow Monarch") return;
          const existing = (_c = dungeon.activeBuffs) == null ? void 0 : _c.domain;
          if (existing && existing.expiresAt === Infinity) return;
          const st = (_d = this.getSkillTreeInstance) == null ? void 0 : _d.call(this);
          const passiveLevel = Math.max(0, ((_e = st == null ? void 0 : st.getSkillLevel) == null ? void 0 : _e.call(st, "domain_of_the_monarch")) || 0);
          if (passiveLevel < 3) return;
          const multiplier = 1.5 + 0.05 * (passiveLevel - 1) + 1;
          if (!dungeon.activeBuffs) dungeon.activeBuffs = {};
          dungeon.activeBuffs.domain = {
            expiresAt: Infinity,
            statMultiplier: multiplier,
            statusImmunity: true
          };
          (_f = this.queueHPBarUpdate) == null ? void 0 : _f.call(this, channelKey);
          this.showToast(
            `Sovereign Territory: your domain envelops ${dungeon.name} \u2014 shadows +${Math.round((multiplier - 1) * 100)}% stats.`,
            "success"
          );
        } catch (_) {
        }
      },
      /**
       * Apply a crit that was granted from OUTSIDE the damage roll.
       *
       * applyEnhancedCritMultiplier is a RE-BASER: it divides by `multiplier` first
       * because calculateDamageBreakdown has already done `damage *= critMultiplier`
       * for a natural crit. Handing it raw damage therefore divides the hit instead
       * of multiplying it — and when critDamageBonus is 0 (any player without the
       * skill-tree node) it early-returns the input untouched, so the crit did
       * literally nothing. That silently no-op'd the CriticalHit plugin bonus, the
       * skill-tree passive crit, Mutilation's forced crit and the Shadow Monarch
       * opening strike.
       *
       * Baking the multiplier in first puts the input in the form the re-baser
       * expects, so bonus=0 yields a clean `multiplier`x hit and bonus>0 scales it
       * the same way a natural crit scales.
       */
      _applyExternalCrit(damage, multiplier, critDamageBonus) {
        const base = Math.max(0, Number(damage) || 0);
        if (base <= 0) return 0;
        const mult = Number(multiplier);
        if (!Number.isFinite(mult) || mult <= 1) return Math.max(1, Math.floor(base));
        return this.applyEnhancedCritMultiplier(base * mult, mult, critDamageBonus);
      },
      _resolveUserBossDamage(dungeon, options = {}) {
        var _a, _b, _c, _d, _e, _f;
        const {
          messageElement = null,
          skillMultiplier = 1,
          passiveDamageBonusKey = null,
          executeThreshold = 0,
          executeMultiplier = 1,
          forceCritical = false,
          agilityScaling = null
        } = options || {};
        const bossStats = this._getBossCombatStats(dungeon);
        const breakdown = typeof this.calculateUserDamageBreakdown === "function" ? this.calculateUserDamageBreakdown(bossStats, dungeon.boss.rank) : {
          damage: this.calculateUserDamage(bossStats, dungeon.boss.rank),
          dodged: false,
          wasCrit: false,
          critMultiplier: 1
        };
        let damage = Math.max(0, Number(breakdown.damage) || 0);
        const critDamageBonus = ((_a = this.getUserCritDamageBonus) == null ? void 0 : _a.call(this)) || 0;
        let isCritical = forceCritical || Boolean(breakdown.wasCrit);
        if (breakdown.wasCrit && critDamageBonus > 0) {
          damage = this.applyEnhancedCritMultiplier(damage, breakdown.critMultiplier || 1, critDamageBonus);
        }
        if (forceCritical && !breakdown.wasCrit) {
          damage = this._applyExternalCrit(damage, 2.5, critDamageBonus);
        }
        const pluginCrit = Boolean(messageElement && this.checkCriticalHit(messageElement));
        const passiveCrit = !forceCritical && !pluginCrit && !isCritical && Boolean((_b = this.rollSkillTreeCombatCrit) == null ? void 0 : _b.call(this));
        if ((pluginCrit || passiveCrit) && !isCritical) {
          isCritical = true;
          damage = this._applyExternalCrit(damage, 2, critDamageBonus);
        }
        if (dungeon && !dungeon._smFirstStrikeDone && damage > 0 && ((_d = (_c = this.soloLevelingStats) == null ? void 0 : _c.settings) == null ? void 0 : _d.rank) === "Shadow Monarch") {
          if (!isCritical) {
            isCritical = true;
            damage = this._applyExternalCrit(damage, 2.5, critDamageBonus);
          }
          dungeon._smFirstStrikeDone = true;
        }
        const skillDamageMultiplier = Math.max(0.1, Number(skillMultiplier) || 1);
        if (skillDamageMultiplier !== 1 && damage > 0) {
          damage = Math.max(1, Math.floor(damage * skillDamageMultiplier));
        }
        if (agilityScaling && damage > 0) {
          const userStats = typeof this.getUserEffectiveStats === "function" ? this.getUserEffectiveStats() : {};
          const agility = Math.max(0, Number(userStats.agility) || 0);
          const perPoint = Number(agilityScaling.perPoint) || 0.015;
          const variance = Number(agilityScaling.variance) || 0.15;
          const agilityMult = 1 + agility * perPoint;
          const roll = 1 + (Math.random() * 2 - 1) * variance;
          damage = Math.max(1, Math.floor(damage * agilityMult * roll));
        }
        if (passiveDamageBonusKey === "daggerThrowDamageBonus" && damage > 0) {
          const throwBonus = ((_e = this.getUserDaggerThrowDamageBonus) == null ? void 0 : _e.call(this)) || 0;
          if (throwBonus > 0) {
            damage = Math.max(1, Math.floor(damage * (1 + throwBonus)));
          }
        }
        const threshold = Math.max(0, Number(executeThreshold) || 0);
        const finisherMultiplier = Math.max(1, Number(executeMultiplier) || 1);
        const bossHpRatio = Number((_f = dungeon == null ? void 0 : dungeon.boss) == null ? void 0 : _f.maxHp) > 0 ? Number(dungeon.boss.hp) / Number(dungeon.boss.maxHp) : 1;
        if (damage > 0 && threshold > 0 && bossHpRatio <= threshold && finisherMultiplier > 1) {
          damage = Math.max(1, Math.floor(damage * finisherMultiplier));
        }
        return {
          damage,
          isCritical,
          dodged: Boolean(breakdown.dodged),
          breakdown,
          pluginCrit,
          passiveCrit
        };
      },
      _notifyBossGateLocked(dungeon) {
        var _a, _b;
        if (!dungeon) return;
        const now = Date.now();
        const lastNoticeAt = dungeon._bossGateNoticeAt || 0;
        if (now - lastNoticeAt <= 15e3) return;
        dungeon._bossGateNoticeAt = now;
        const requiredKills = Number.isFinite((_a = dungeon == null ? void 0 : dungeon.bossGate) == null ? void 0 : _a.requiredMobKills) ? dungeon.bossGate.requiredMobKills : 25;
        const currentKills = Number.isFinite((_b = dungeon == null ? void 0 : dungeon.mobs) == null ? void 0 : _b.killed) ? dungeon.mobs.killed : 0;
        const remainingKills = Math.max(0, requiredKills - currentKills);
        this.showToast(`Boss sealed: clear ${remainingKills} more mobs to break the gate.`, "info");
      },
      async castDungeonCombatSkill(channelKey, skillId) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa;
        const dungeon = this.activeDungeons.get(channelKey);
        if (!dungeon) {
          this.showToast("No active dungeon here.", "error");
          return false;
        }
        if (!dungeon.userParticipating) {
          this.showToast("Join the dungeon before using combat skills.", "info");
          return false;
        }
        if (!dungeon.shadowsDeployed) {
          this.showToast("Deploy shadows before using combat skills.", "info");
          return false;
        }
        if (dungeon.completed || dungeon.failed) {
          this.showToast("The dungeon is over \u2014 no enemies remain.", "info");
          return false;
        }
        const skillTree = (_a = this.getSkillTreeInstance) == null ? void 0 : _a.call(this);
        if (!skillTree || typeof skillTree.useDungeonCombatSkill !== "function") {
          this.showToast("SkillTree combat skills are unavailable right now.", "error");
          return false;
        }
        const snapshot = typeof skillTree.getDungeonCombatSkillRuntimeSnapshot === "function" ? skillTree.getDungeonCombatSkillRuntimeSnapshot(skillId) : null;
        if (!(snapshot == null ? void 0 : snapshot.def)) {
          this.showToast("Unknown combat skill.", "error");
          return false;
        }
        if (!snapshot.unlocked) {
          this.showToast(`${snapshot.def.name} is not unlocked yet.`, "info");
          return false;
        }
        const bossAlive = Number(((_b = dungeon == null ? void 0 : dungeon.boss) == null ? void 0 : _b.hp) || 0) > 0;
        const liveMobs = ((_c = this._countLiveMobs) == null ? void 0 : _c.call(this, dungeon)) || 0;
        const bossTargetable = bossAlive && Boolean(
          ((_d = dungeon.bossGate) == null ? void 0 : _d.unlockedAt) && Number.isFinite(dungeon.bossGate.unlockedAt) && dungeon.bossGate.unlockedAt > 0
        );
        if (!bossAlive && liveMobs <= 0) {
          this.showToast("No enemies to target right now.", "info");
          return false;
        }
        const castResult = skillTree.useDungeonCombatSkill(skillId);
        if (!(castResult == null ? void 0 : castResult.success)) {
          const reason = (castResult == null ? void 0 : castResult.reason) || "Combat skill failed.";
          const toastType = /mana|unknown/i.test(reason) ? "error" : "info";
          this.showToast(reason, toastType);
          this.queueHPBarUpdate(channelKey);
          return false;
        }
        (_e = this.syncManaFromStats) == null ? void 0 : _e.call(this);
        const def = castResult.def || snapshot.def;
        const combatEffect = def.combatEffect || "damage";
        let passiveLevel = 1;
        const st = (_f = this.getSkillTreeInstance) == null ? void 0 : _f.call(this);
        if (Array.isArray((_g = def.unlock) == null ? void 0 : _g.passiveSkills) && st) {
          passiveLevel = Math.max(1, ...def.unlock.passiveSkills.map((sid) => {
            var _a2;
            return ((_a2 = st.getSkillLevel) == null ? void 0 : _a2.call(st, sid)) || 0;
          }));
        } else {
          passiveLevel = Math.max(1, ((_i = st == null ? void 0 : st.getSkillLevel) == null ? void 0 : _i.call(st, (_h = def.unlock) == null ? void 0 : _h.passiveSkill)) || 1);
        }
        const userRank = ((_k = (_j = this.soloLevelingStats) == null ? void 0 : _j.settings) == null ? void 0 : _k.rank) || "E";
        const userRankIdx = this.getRankIndexValue(userRank);
        const isShadowMonarch = userRank === "Shadow Monarch";
        const bossRankIdx = bossTargetable ? this.getRankIndexValue(((_l = dungeon.boss) == null ? void 0 : _l.rank) || "E") : 0;
        const bossRankDiff = Math.max(0, bossRankIdx - userRankIdx);
        let playerPenetration = 0;
        if (bossTargetable) {
          const pStats2 = typeof this.getUserEffectiveStats === "function" ? this.getUserEffectiveStats() : {};
          const totalPower = (Number(pStats2.strength) || 0) + (Number(pStats2.agility) || 0) + (Number(pStats2.intelligence) || 0) + (Number(pStats2.vitality) || 0);
          playerPenetration = Math.min(0.6, Math.sqrt(totalPower) / 50);
        }
        const rawDurationResist = Math.min(0.8, bossRankDiff * 0.15);
        const rawEffectResist = Math.min(0.8, bossRankDiff * 0.1);
        const effectiveDurationResist = rawDurationResist * (1 - playerPenetration);
        const effectiveEffectResist = rawEffectResist * (1 - playerPenetration);
        const bossDebuffResist = bossTargetable ? {
          durationMult: Math.max(0.2, 1 - effectiveDurationResist),
          effectMult: Math.max(0.2, 1 - effectiveEffectResist),
          resistPct: Math.round(effectiveDurationResist * 100),
          penetrationPct: Math.round(playerPenetration * 100)
        } : { durationMult: 1, effectMult: 1, resistPct: 0, penetrationPct: 0 };
        if (combatEffect === "debuff" && def.debuff) {
          const db = def.debuff;
          const baseDuration = db.disableAttacksDurationMs || 5e3;
          const fullDuration = db.durationScaling === "double_per_level" ? baseDuration * Math.pow(2, passiveLevel - 1) : baseDuration;
          const fullResistReduction = (db.damageResistReduction || 0) + (db.resistReductionPerLevel || 0) * (passiveLevel - 1);
          let mobPercent = Math.min(1, (db.mobTargetPercent || 0) + (db.mobTargetPercentPerLevel || 0) * (passiveLevel - 1));
          let bossDurMult = bossDebuffResist.durationMult;
          let bossEffMult = bossDebuffResist.effectMult;
          if (isShadowMonarch) {
            mobPercent = 1;
            bossDurMult = 1;
            bossEffMult = 1;
          }
          const mobDuration = fullDuration;
          const bossDuration = Math.floor(fullDuration * bossDurMult);
          const bossResistReduction = fullResistReduction * bossEffMult;
          if (!dungeon.activeDebuffs) dungeon.activeDebuffs = {};
          dungeon.activeDebuffs.rulers_force = {
            expiresAt: Date.now() + mobDuration,
            resistReduction: Math.min(0.9, bossTargetable ? bossResistReduction : fullResistReduction),
            mobDisablePercent: mobPercent,
            disableAttacksDurationMs: bossTargetable ? bossDuration : mobDuration
          };
          if (((_m = def.statusEffect) == null ? void 0 : _m.name) && Math.random() < Number(def.statusEffect.chance ?? 1)) {
            const userRank2 = ((_o = (_n = this.soloLevelingStats) == null ? void 0 : _n.settings) == null ? void 0 : _o.rank) || "E";
            const userStats = typeof this.getUserEffectiveStats === "function" ? this.getUserEffectiveStats() : {};
            const srcPower = (_p = this._computeSourcePower) == null ? void 0 : _p.call(this, userRank2, userStats);
            if (bossTargetable) {
              (_q = this._applyCombatStatusToEntity) == null ? void 0 : _q.call(this, {
                channelKey,
                targetType: "boss",
                targetId: "boss",
                effectName: def.statusEffect.name,
                stackDelta: Number(def.statusEffect.stacks || 1),
                now: Date.now(),
                sourcePower: srcPower
              });
            }
            const rawMobs = ((_r = dungeon.mobs) == null ? void 0 : _r.activeMobs) || [];
            const aliveMobCount = rawMobs.filter((m) => m && m.hp > 0).length;
            const disableCount = Math.max(1, Math.floor(aliveMobCount * mobPercent));
            let applied = 0;
            for (let i = 0; i < rawMobs.length && applied < disableCount; i++) {
              const mob = rawMobs[i];
              if (!mob || mob.hp <= 0) continue;
              const mobId = this.getEnemyKey(mob, "mob");
              if (mobId) {
                (_s = this._applyCombatStatusToEntity) == null ? void 0 : _s.call(this, {
                  channelKey,
                  targetType: "mob",
                  targetId: mobId,
                  effectName: def.statusEffect.name,
                  stackDelta: Number(def.statusEffect.stacks || 1),
                  now: Date.now(),
                  sourcePower: srcPower
                });
                applied++;
              }
            }
          }
          (_t = this.syncManaFromStats) == null ? void 0 : _t.call(this);
          this.queueHPBarUpdate(channelKey);
          const mobPct = Math.round(mobPercent * 100);
          const parts = [];
          if (bossTargetable) {
            const bossDurationSec = (bossDuration / 1e3).toFixed(1);
            const bossResistPct = Math.round(bossResistReduction * 100);
            let bossMsg = `Boss stunned ${bossDurationSec}s, -${bossResistPct}% resist`;
            if (bossDebuffResist.resistPct > 0) bossMsg += ` (${bossDebuffResist.resistPct}% resisted)`;
            parts.push(bossMsg);
          }
          parts.push(`${mobPct}% mobs disabled`);
          this.showToast(`${def.name}: ${parts.join(", ")}.`, "success");
          return true;
        }
        if (combatEffect === "shadow_buff" && def.shadowBuff) {
          const sb = def.shadowBuff;
          const duration = (sb.durationMs || 3e4) + (sb.durationPerLevel || 0) * (passiveLevel - 1);
          let multiplier = (sb.allStatMultiplier || 1.25) + (sb.allStatMultiplierPerLevel || 0) * (passiveLevel - 1);
          const isShadowMonarch2 = ((_v = (_u = this.soloLevelingStats) == null ? void 0 : _u.settings) == null ? void 0 : _v.rank) === "Shadow Monarch";
          if (isShadowMonarch2) multiplier += 1;
          if (!dungeon.activeBuffs) dungeon.activeBuffs = {};
          dungeon.activeBuffs.domain = {
            expiresAt: isShadowMonarch2 ? Infinity : Date.now() + duration,
            statMultiplier: multiplier,
            statusImmunity: isShadowMonarch2 ? true : Boolean(sb.statusImmunity)
            // Shadows immune to status effects in domain
          };
          (_w = this.syncManaFromStats) == null ? void 0 : _w.call(this);
          this.queueHPBarUpdate(channelKey);
          const durationSec = (duration / 1e3).toFixed(0);
          const buffPct = Math.round((multiplier - 1) * 100);
          this.showToast(
            `${def.name}: All shadows +${buffPct}% stats for ${durationSec}s!`,
            "success"
          );
          return true;
        }
        if (combatEffect === "fear" && def.fear) {
          const fr = def.fear;
          const mobDuration = (fr.baseDurationMs || 8e3) + (fr.durationPerLevel || 0) * (passiveLevel - 1);
          if (!dungeon.activeDebuffs) dungeon.activeDebuffs = {};
          dungeon.activeDebuffs.dragons_fear_mobs = {
            expiresAt: Date.now() + mobDuration
          };
          const bossToastParts = [];
          if (bossTargetable) {
            const bossDuration = isShadowMonarch ? mobDuration : Math.floor(mobDuration * (fr.bossDurationMultiplier || 0.4) * bossDebuffResist.durationMult);
            if (bossDuration > 500) {
              dungeon.activeDebuffs.dragons_fear_boss = {
                expiresAt: Date.now() + bossDuration
              };
              let msg = `Boss paralyzed ${(bossDuration / 1e3).toFixed(1)}s`;
              if (bossDebuffResist.resistPct > 0) msg += ` (${bossDebuffResist.resistPct}% resisted)`;
              bossToastParts.push(msg);
            } else {
              bossToastParts.push("Boss resisted");
            }
          }
          (_x = this.syncManaFromStats) == null ? void 0 : _x.call(this);
          this.queueHPBarUpdate(channelKey);
          const mobSec = (mobDuration / 1e3).toFixed(1);
          const suffix = bossToastParts.length ? ` ${bossToastParts.join(". ")}.` : "";
          this.showToast(
            `${def.name}: All mobs paralyzed ${mobSec}s!${suffix}`,
            "success"
          );
          return true;
        }
        if (combatEffect === "bloodlust" && def.bloodlust) {
          const bl = def.bloodlust;
          const mobDuration = (bl.baseDurationMs || 6e4) + (bl.durationPerLevel || 0) * (passiveLevel - 1);
          if (!dungeon.activeDebuffs) dungeon.activeDebuffs = {};
          dungeon.activeDebuffs.bloodlust_mobs = {
            expiresAt: Date.now() + mobDuration
          };
          const toastParts = [`All mobs paralyzed ${(mobDuration / 1e3).toFixed(0)}s`];
          if (bossTargetable) {
            const fullParalysisDuration = Math.floor(mobDuration * (bl.bossDurationMultiplier || 0.5));
            const bossParalysisDuration = Math.floor(fullParalysisDuration * bossDebuffResist.durationMult);
            const fullReduction = Math.min(0.8, (bl.bossStatReduction || 0.5) + (bl.bossStatReductionPerLevel || 0) * (passiveLevel - 1));
            const bossReduction = isShadowMonarch ? 0.8 : fullReduction * bossDebuffResist.effectMult;
            dungeon.activeDebuffs.bloodlust_boss = {
              expiresAt: Date.now() + bossParalysisDuration
            };
            dungeon.activeDebuffs.bloodlust_stats = {
              expiresAt: Date.now() + Math.floor(mobDuration * bossDebuffResist.durationMult),
              statReduction: bossReduction
            };
            const paralysisSec = (bossParalysisDuration / 1e3).toFixed(0);
            const reductionPct = Math.round(bossReduction * 100);
            let bossMsg = `Boss stunned ${paralysisSec}s, -${reductionPct}% stats`;
            if (bossDebuffResist.resistPct > 0) bossMsg += ` (${bossDebuffResist.resistPct}% resisted)`;
            toastParts.push(bossMsg);
          }
          if (isShadowMonarch) {
            const rawMobs = ((_y = dungeon.mobs) == null ? void 0 : _y.activeMobs) || [];
            for (const mob of rawMobs) {
              if (!mob || mob.hp <= 0 || mob._sovereignDebuffed) continue;
              mob.strength = Math.floor((mob.strength || 0) * 0.2);
              mob.agility = Math.floor((mob.agility || 0) * 0.2);
              mob.intelligence = Math.floor((mob.intelligence || 0) * 0.2);
              mob.vitality = Math.floor((mob.vitality || 0) * 0.2);
              mob._sovereignDebuffed = true;
            }
          }
          (_z = this.syncManaFromStats) == null ? void 0 : _z.call(this);
          this.queueHPBarUpdate(channelKey);
          this.showToast(`${def.name}: ${toastParts.join("! ")}!`, "success");
          return true;
        }
        if (combatEffect === "dot_aoe" && def.dot) {
          const dt = def.dot;
          const rulersLevel = Math.max(0, ((_C = (_B = (_A = this.getSkillTreeInstance) == null ? void 0 : _A.call(this)) == null ? void 0 : _B.getSkillLevel) == null ? void 0 : _C.call(_B, "rulers_authority")) || 0);
          const rulersBonus = rulersLevel * (dt.rulersAuthorityBonusPerLevel || 0.12);
          const baseDuration = ((dt.durationMs || 12e3) + (dt.durationPerLevel || 0) * (passiveLevel - 1)) * (isShadowMonarch ? 2 : 1);
          const baseDmgMult = (dt.damageMultiplier || 0.65) + (dt.damagePerLevel || 0) * (passiveLevel - 1);
          const dmgMultiplier = baseDmgMult * (1 + rulersBonus);
          const maxTargets = isShadowMonarch ? Math.max(500, (((_D = dungeon.mobs) == null ? void 0 : _D.activeMobs) || []).length) : Math.min(500, (dt.maxMobTargets || 150) + (dt.maxMobTargetsPerLevel || 0) * (passiveLevel - 1));
          const tickInterval = dt.tickIntervalMs || 2e3;
          const rawActiveMobs2 = ((_E = dungeon.mobs) == null ? void 0 : _E.activeMobs) || [];
          let burstMobs = [];
          for (let i = 0; i < rawActiveMobs2.length && burstMobs.length < maxTargets; i++) {
            if (((_F = rawActiveMobs2[i]) == null ? void 0 : _F.hp) > 0) burstMobs.push(rawActiveMobs2[i]);
          }
          let burstKills = 0;
          const burstMult = Math.max(0.8, dmgMultiplier * 1.5);
          for (const mob of burstMobs) {
            const mobStats = { strength: mob.strength || 0, agility: mob.agility || 0, intelligence: mob.intelligence || 0, vitality: mob.vitality || 0 };
            const breakdown = typeof this.calculateUserDamageBreakdown === "function" ? this.calculateUserDamageBreakdown(mobStats, mob.rank) : { damage: this.calculateUserDamage(mobStats, mob.rank) };
            let dmg = Math.max(1, Math.floor((Number(breakdown.damage) || 1) * burstMult));
            if (def.agilityScaling) {
              const agiStats = typeof this.getUserEffectiveStats === "function" ? this.getUserEffectiveStats() : {};
              const agiMult = 1 + (agiStats.agility || 0) * (def.agilityScaling.perPoint || 0.015);
              dmg = Math.max(1, Math.floor(dmg * agiMult * (0.85 + Math.random() * 0.3)));
            }
            const mobId = this.getEnemyKey(mob, "mob");
            const adjDmg = this.applyStatusAdjustedIncomingDamage(channelKey, "mob", mobId, dmg, Date.now());
            mob.hp = Math.max(0, mob.hp - adjDmg);
            if (mob.hp <= 0) {
              this._onMobKilled(channelKey, dungeon, mob.rank);
              this._addToCorpsePile(channelKey, mob, false);
              burstKills++;
            }
          }
          if (burstKills > 0 && ((_G = dungeon.mobs) == null ? void 0 : _G.activeMobs)) {
            dungeon.mobs.activeMobs = dungeon.mobs.activeMobs.filter((m) => m && m.hp > 0);
          }
          if (!dungeon.activeDots) dungeon.activeDots = {};
          dungeon.activeDots.dagger_rush = {
            expiresAt: Date.now() + baseDuration,
            nextTickAt: Date.now() + tickInterval,
            tickIntervalMs: tickInterval,
            damageMultiplier: dmgMultiplier,
            maxMobTargets: maxTargets,
            forceCritical: false,
            sourceSkillId: "dagger_rush",
            rulersLevel,
            hasDaggerThrowBonus: true,
            canCrit: true,
            statusEffect: isShadowMonarch && def.statusEffect ? { ...def.statusEffect, stacks: (def.statusEffect.stacks || 1) * 2, stacksPerTick: (def.statusEffect.stacksPerTick || 1) * 2 } : def.statusEffect || null
          };
          (_H = this.syncManaFromStats) == null ? void 0 : _H.call(this);
          this.queueHPBarUpdate(channelKey);
          const durationSec = (baseDuration / 1e3).toFixed(0);
          const burstText = burstKills > 0 ? `${burstKills} slain on impact! ` : "";
          this.showToast(
            `${def.name}: ${burstText}Blade storm active for ${durationSec}s on ${maxTargets} targets.`,
            "success"
          );
          return true;
        }
        if (combatEffect === "speed_boost" && def.speedBoost) {
          const sb = def.speedBoost;
          const duration = (sb.durationMs || 18e4) + (sb.durationPerLevel || 0) * (passiveLevel - 1);
          const reduction = isShadowMonarch ? 0.75 : Math.min(0.5, (sb.attackCooldownReduction || 0.2) + (sb.attackCooldownReductionPerLevel || 0) * (passiveLevel - 1));
          if (!dungeon.activeBuffs) dungeon.activeBuffs = {};
          dungeon.activeBuffs.sprint = {
            expiresAt: isShadowMonarch ? Infinity : Date.now() + duration,
            cooldownReduction: reduction
          };
          (_I = this.syncManaFromStats) == null ? void 0 : _I.call(this);
          this.queueHPBarUpdate(channelKey);
          const durationMin = (duration / 6e4).toFixed(1);
          const reductionPct = Math.round(reduction * 100);
          this.showToast(
            `${def.name}: Shadows attack ${reductionPct}% faster for ${durationMin}m!`,
            "success"
          );
          return true;
        }
        if (bossTargetable) {
          const attackResult = this._resolveUserBossDamage(dungeon, {
            skillMultiplier: def.damageMultiplier || 1,
            passiveDamageBonusKey: def.passiveDamageBonusKey || null,
            executeThreshold: def.executeThreshold || 0,
            executeMultiplier: def.executeMultiplier || 1,
            forceCritical: Boolean(def.forceCritical),
            agilityScaling: def.agilityScaling || null
          });
          if (attackResult.damage <= 0) {
            (_J = this.syncManaFromStats) == null ? void 0 : _J.call(this);
            this.showToast(`${def.name} was evaded.`, "info");
            this.queueHPBarUpdate(channelKey);
            return false;
          }
          await this.applyDamageToBoss(channelKey, attackResult.damage, "user", null, attackResult.isCritical);
          if ((_K = def.statusEffect) == null ? void 0 : _K.name) {
            const seChance = Number(def.statusEffect.chance ?? 1);
            if (Math.random() < seChance) {
              const userStats = typeof this.getUserEffectiveStats === "function" ? this.getUserEffectiveStats() : {};
              const userRank2 = ((_M = (_L = this.soloLevelingStats) == null ? void 0 : _L.settings) == null ? void 0 : _M.rank) || "E";
              (_O = this._applyCombatStatusToEntity) == null ? void 0 : _O.call(this, {
                channelKey,
                targetType: "boss",
                targetId: "boss",
                effectName: def.statusEffect.name,
                stackDelta: Number(def.statusEffect.stacks || 1),
                now: Date.now(),
                sourcePower: (_N = this._computeSourcePower) == null ? void 0 : _N.call(this, userRank2, userStats)
              });
            }
          }
          (_P = this.syncManaFromStats) == null ? void 0 : _P.call(this);
          this.queueHPBarUpdate(channelKey);
          const critText2 = attackResult.isCritical ? " Critical hit!" : "";
          this.showToast(
            `${def.name} dealt ${attackResult.damage.toLocaleString()} damage.${critText2}`,
            attackResult.isCritical ? "success" : "info"
          );
          return true;
        }
        const isPiercing = def.targeting === "piercing";
        const isSingleTarget = def.targeting === "single" && !(isShadowMonarch && def.id === "mutilation");
        const pStats = typeof this.getUserEffectiveStats === "function" ? this.getUserEffectiveStats() : {};
        const playerLevel = ((_R = (_Q = this.soloLevelingStats) == null ? void 0 : _Q.settings) == null ? void 0 : _R.level) || 1;
        const agility = Math.max(0, pStats.agility || 0);
        const basePierce = 50 + Math.floor(agility * 2) + Math.floor(playerLevel * 3);
        const piercingVariance = 0.8 + Math.random() * 0.4;
        const piercingCap = isPiercing ? Math.max(50, Math.floor(basePierce * piercingVariance)) : Infinity;
        let targetCap = isSingleTarget ? 1 : piercingCap;
        const isDaggerThrow = def.id === "dagger_throw" || def.passiveDamageBonusKey === "daggerThrowDamageBonus";
        if (isDaggerThrow) {
          const DAGGERS_BY_RANK = [10, 20, 35, 55, 80, 120, 170, 230, 300, 400, 550, 750];
          targetCap = userRankIdx >= 12 ? Infinity : DAGGERS_BY_RANK[userRankIdx] ?? 50;
        }
        let aliveMobs = [];
        const rawActiveMobs = ((_S = dungeon.mobs) == null ? void 0 : _S.activeMobs) || [];
        for (let i = 0; i < rawActiveMobs.length && aliveMobs.length < targetCap; i++) {
          const m = rawActiveMobs[i];
          if (m && m.hp > 0) aliveMobs.push(m);
        }
        if (!aliveMobs.length) {
          (_T = this.syncManaFromStats) == null ? void 0 : _T.call(this);
          this.showToast("No enemies to target.", "info");
          this.queueHPBarUpdate(channelKey);
          return false;
        }
        if (isSingleTarget) {
          aliveMobs.sort((a, b) => (b.maxHp || 0) - (a.maxHp || 0));
          aliveMobs = [aliveMobs[0]];
        }
        const skillMultiplier = Math.max(0.1, Number(def.damageMultiplier) || 1);
        const forceCrit = Boolean(def.forceCritical);
        let totalDamage = 0;
        let mobsHit = 0;
        let mobsKilled = 0;
        let anyCrit = false;
        let firstHit = true;
        for (const mob of aliveMobs) {
          const mobRankIdx = this.getRankIndexValue(mob.rank || "E");
          const rankAbove = Math.max(0, mobRankIdx - userRankIdx);
          const rankPenalty = Math.min(0.9, rankAbove * 0.25);
          const mobStats = {
            strength: mob.strength || 0,
            agility: mob.agility || 0,
            intelligence: mob.intelligence || 0,
            vitality: mob.vitality || 0
          };
          const breakdown = typeof this.calculateUserDamageBreakdown === "function" ? this.calculateUserDamageBreakdown(mobStats, mob.rank) : { damage: this.calculateUserDamage(mobStats, mob.rank), dodged: false, wasCrit: false, critMultiplier: 1 };
          let damage = Math.max(0, Number(breakdown.damage) || 0);
          let isCritical = forceCrit || Boolean(breakdown.wasCrit);
          if (isShadowMonarch && firstHit) isCritical = true;
          firstHit = false;
          if (isCritical) {
            const critDmgBonus = ((_U = this.getUserCritDamageBonus) == null ? void 0 : _U.call(this)) || 0;
            const critMult = forceCrit ? 2.5 : breakdown.critMultiplier || 1;
            damage = this.applyEnhancedCritMultiplier(damage, critMult, critDmgBonus);
            anyCrit = true;
          }
          damage = Math.max(1, Math.floor(damage * skillMultiplier));
          if (def.agilityScaling && damage > 0) {
            const agiStats = typeof this.getUserEffectiveStats === "function" ? this.getUserEffectiveStats() : {};
            const agility2 = Math.max(0, Number(agiStats.agility) || 0);
            const perPoint = Number(def.agilityScaling.perPoint) || 0.015;
            const variance = Number(def.agilityScaling.variance) || 0.15;
            const agilityMult = 1 + agility2 * perPoint;
            const roll = 1 + (Math.random() * 2 - 1) * variance;
            damage = Math.max(1, Math.floor(damage * agilityMult * roll));
          }
          if (def.passiveDamageBonusKey === "daggerThrowDamageBonus" && damage > 0) {
            const throwBonus = ((_V = this.getUserDaggerThrowDamageBonus) == null ? void 0 : _V.call(this)) || 0;
            if (throwBonus > 0) damage = Math.max(1, Math.floor(damage * (1 + throwBonus)));
            const armyCount = Number((_W = this._shadowCountCache) == null ? void 0 : _W.count) || 0;
            if (armyCount > 0) {
              const isSM = userRankIdx >= 12;
              const envelopMult = 1 + Math.min(isSM ? 5 : 1.5, armyCount / 100 * 0.01);
              if (envelopMult > 1) damage = Math.max(1, Math.floor(damage * envelopMult));
            }
          }
          const threshold = isShadowMonarch && def.id === "mutilation" ? Math.max(0.6, Number(def.executeThreshold) || 0) : Math.max(0, Number(def.executeThreshold) || 0);
          const finMult = Math.max(1, Number(def.executeMultiplier) || 1);
          if (threshold > 0 && finMult > 1 && mob.maxHp > 0 && mob.hp / mob.maxHp <= threshold) {
            damage = Math.max(1, Math.floor(damage * finMult));
          }
          if (rankPenalty > 0) damage = Math.max(1, Math.floor(damage * (1 - rankPenalty)));
          if (isShadowMonarch && isCritical && mobRankIdx <= userRankIdx && mob.hp > 0) {
            damage = Math.max(damage, mob.hp);
          }
          const mobId = this.getEnemyKey(mob, "mob");
          const adjDamage = this.applyStatusAdjustedIncomingDamage(channelKey, "mob", mobId, damage, Date.now());
          mob.hp = Math.max(0, mob.hp - adjDamage);
          totalDamage += adjDamage;
          mobsHit++;
          if (mob.hp > 0 && ((_X = def.statusEffect) == null ? void 0 : _X.name)) {
            const seChance = Number(def.statusEffect.chance ?? 1);
            if (Math.random() < seChance) {
              const userStats = typeof this.getUserEffectiveStats === "function" ? this.getUserEffectiveStats() : {};
              const userRank2 = ((_Z = (_Y = this.soloLevelingStats) == null ? void 0 : _Y.settings) == null ? void 0 : _Z.rank) || "E";
              (_$ = this._applyCombatStatusToEntity) == null ? void 0 : _$.call(this, {
                channelKey,
                targetType: "mob",
                targetId: mobId,
                effectName: def.statusEffect.name,
                stackDelta: Number(def.statusEffect.stacks || 1),
                now: Date.now(),
                sourcePower: (__ = this._computeSourcePower) == null ? void 0 : __.call(this, userRank2, userStats)
              });
            }
          }
          if (mob.hp <= 0) {
            this._onMobKilled(channelKey, dungeon, mob.rank);
            this._addToCorpsePile(channelKey, mob, false);
            mobsKilled++;
          }
        }
        dungeon.mobs.activeMobs = dungeon.mobs.activeMobs.filter((m) => m && m.hp > 0);
        (_aa = this.syncManaFromStats) == null ? void 0 : _aa.call(this);
        this.queueHPBarUpdate(channelKey);
        const critText = anyCrit ? " Critical!" : "";
        const killText = mobsKilled > 0 ? ` ${mobsKilled} slain.` : "";
        const verb = isSingleTarget ? "shredded" : "cleaved";
        this.showToast(
          `${def.name} ${verb} ${mobsHit} mob${mobsHit !== 1 ? "s" : ""} for ${totalDamage.toLocaleString()} damage.${killText}${critText}`,
          anyCrit ? "success" : "info"
        );
        return true;
      },
      // Combat buff/debuff helpers
      _getActiveDebuff(dungeon, key) {
        var _a;
        const debuff = (_a = dungeon == null ? void 0 : dungeon.activeDebuffs) == null ? void 0 : _a[key];
        if (!debuff) return null;
        if (Date.now() > debuff.expiresAt) {
          delete dungeon.activeDebuffs[key];
          return null;
        }
        return debuff;
      },
      _getActiveBuff(dungeon, key) {
        var _a;
        const buff = (_a = dungeon == null ? void 0 : dungeon.activeBuffs) == null ? void 0 : _a[key];
        if (!buff) return null;
        if (Date.now() > buff.expiresAt) {
          delete dungeon.activeBuffs[key];
          return null;
        }
        return buff;
      },
      _processDotTicks(channelKey, dungeon, now) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v;
        const dots = dungeon == null ? void 0 : dungeon.activeDots;
        if (!dots) return;
        const keysToRemove = [];
        for (const [dotKey, dot] of Object.entries(dots)) {
          if (now >= dot.expiresAt) {
            keysToRemove.push(dotKey);
            continue;
          }
          if (now < dot.nextTickAt) continue;
          dot.nextTickAt = now + dot.tickIntervalMs;
          const rawActiveMobs = ((_a = dungeon.mobs) == null ? void 0 : _a.activeMobs) || [];
          const maxTargets = dot.maxMobTargets || 150;
          const aliveMobs = [];
          for (let i = 0; i < rawActiveMobs.length && aliveMobs.length < maxTargets; i++) {
            const m = rawActiveMobs[i];
            if (m && m.hp > 0) aliveMobs.push(m);
          }
          if (aliveMobs.length === 0) continue;
          const userRank = ((_c = (_b = this.soloLevelingStats) == null ? void 0 : _b.settings) == null ? void 0 : _c.rank) || "E";
          const userRankIdx = this.getRankIndexValue(userRank);
          let totalDamage = 0;
          let mobsKilled = 0;
          for (const mob of aliveMobs) {
            const mobRankIdx = this.getRankIndexValue(mob.rank || "E");
            const rankAbove = Math.max(0, mobRankIdx - userRankIdx);
            const rankPenalty = Math.min(0.9, rankAbove * 0.25);
            const mobStats = {
              strength: mob.strength || 0,
              agility: mob.agility || 0,
              intelligence: mob.intelligence || 0,
              vitality: mob.vitality || 0
            };
            const breakdown = typeof this.calculateUserDamageBreakdown === "function" ? this.calculateUserDamageBreakdown(mobStats, mob.rank) : { damage: this.calculateUserDamage(mobStats, mob.rank), dodged: false, wasCrit: false };
            let damage = Math.max(0, Number(breakdown.damage) || 0);
            let dotCrit = Boolean(breakdown.wasCrit);
            if (!dotCrit && dot.canCrit) {
              dotCrit = Boolean((_d = this.rollSkillTreeCombatCrit) == null ? void 0 : _d.call(this));
            }
            if (dotCrit) {
              const critDmgBonus = ((_e = this.getUserCritDamageBonus) == null ? void 0 : _e.call(this)) || 0;
              damage = this.applyEnhancedCritMultiplier(damage, breakdown.critMultiplier || 2.5, critDmgBonus);
            }
            damage = Math.max(1, Math.floor(damage * dot.damageMultiplier));
            if (dot.hasDaggerThrowBonus && damage > 0) {
              const throwBonus = ((_f = this.getUserDaggerThrowDamageBonus) == null ? void 0 : _f.call(this)) || 0;
              if (throwBonus > 0) damage = Math.max(1, Math.floor(damage * (1 + throwBonus)));
            }
            const domainMultiplier = ((_g = this._getDomainShadowMultiplier) == null ? void 0 : _g.call(this, dungeon)) || 1;
            if (domainMultiplier > 1) {
              damage = Math.max(1, Math.floor(damage * domainMultiplier));
            }
            if (rankPenalty > 0) {
              damage = Math.max(1, Math.floor(damage * (1 - rankPenalty)));
            }
            const mobId = this.getEnemyKey(mob, "mob");
            const adjDamage = this.applyStatusAdjustedIncomingDamage(channelKey, "mob", mobId, damage, now);
            if (adjDamage >= mob.hp) {
              totalDamage += mob.hp;
              mob.hp = 0;
            } else {
              mob.hp = Math.max(0, mob.hp - adjDamage);
              totalDamage += adjDamage;
            }
            if (mob.hp > 0 && ((_h = dot.statusEffect) == null ? void 0 : _h.name)) {
              const seChance = Number(dot.statusEffect.chance ?? 1);
              if (Math.random() < seChance) {
                const dotUserRank = ((_j = (_i = this.soloLevelingStats) == null ? void 0 : _i.settings) == null ? void 0 : _j.rank) || "E";
                const dotUserStats = typeof this.getUserEffectiveStats === "function" ? this.getUserEffectiveStats() : {};
                (_l = this._applyCombatStatusToEntity) == null ? void 0 : _l.call(this, {
                  channelKey,
                  targetType: "mob",
                  targetId: mobId,
                  effectName: dot.statusEffect.name,
                  stackDelta: Number(dot.statusEffect.stacksPerTick || dot.statusEffect.stacks || 1),
                  now,
                  sourcePower: (_k = this._computeSourcePower) == null ? void 0 : _k.call(this, dotUserRank, dotUserStats)
                });
              }
            }
            if (mob.hp <= 0) {
              this._onMobKilled(channelKey, dungeon, mob.rank);
              this._addToCorpsePile(channelKey, mob, false);
              mobsKilled++;
            }
          }
          const bossAlive = Number(((_m = dungeon == null ? void 0 : dungeon.boss) == null ? void 0 : _m.hp) || 0) > 0;
          const bossTargetable = bossAlive && Boolean(
            ((_n = dungeon.bossGate) == null ? void 0 : _n.unlockedAt) && Number.isFinite(dungeon.bossGate.unlockedAt) && dungeon.bossGate.unlockedAt > 0
          );
          if (bossTargetable) {
            const bossResult = (_o = this._resolveUserBossDamage) == null ? void 0 : _o.call(this, dungeon, {
              skillMultiplier: dot.damageMultiplier,
              passiveDamageBonusKey: dot.hasDaggerThrowBonus ? "daggerThrowDamageBonus" : null,
              executeThreshold: 0,
              executeMultiplier: 1,
              forceCritical: false
            });
            if (bossResult && bossResult.damage > 0) {
              const domainMultiplier = ((_p = this._getDomainShadowMultiplier) == null ? void 0 : _p.call(this, dungeon)) || 1;
              const bossDotDmg = Math.max(1, Math.floor(bossResult.damage * domainMultiplier));
              this.applyDamageToBoss(channelKey, bossDotDmg, "user", null, bossResult.isCritical);
              totalDamage += bossDotDmg;
              if (dungeon.boss.hp > 0 && ((_q = dot.statusEffect) == null ? void 0 : _q.name)) {
                const seChance = Number(dot.statusEffect.chance ?? 1);
                if (Math.random() < seChance) {
                  const dotUserRank = ((_s = (_r = this.soloLevelingStats) == null ? void 0 : _r.settings) == null ? void 0 : _s.rank) || "E";
                  const dotUserStats = typeof this.getUserEffectiveStats === "function" ? this.getUserEffectiveStats() : {};
                  (_u = this._applyCombatStatusToEntity) == null ? void 0 : _u.call(this, {
                    channelKey,
                    targetType: "boss",
                    targetId: "boss",
                    effectName: dot.statusEffect.name,
                    stackDelta: Number(dot.statusEffect.stacksPerTick || dot.statusEffect.stacks || 1),
                    now,
                    sourcePower: (_t = this._computeSourcePower) == null ? void 0 : _t.call(this, dotUserRank, dotUserStats)
                  });
                }
              }
            }
          }
          if (mobsKilled > 0 && ((_v = dungeon.mobs) == null ? void 0 : _v.activeMobs)) {
            dungeon.mobs.activeMobs = dungeon.mobs.activeMobs.filter((m) => m && m.hp > 0);
          }
          if (totalDamage > 0) {
            this.debugLog(
              `DOT TICK [${dotKey}]: ${totalDamage.toLocaleString()} dmg to ${aliveMobs.length} mobs` + (mobsKilled > 0 ? ` (${mobsKilled} killed)` : "") + (bossTargetable ? " + boss" : "") + ` | ${Math.max(0, Math.ceil((dot.expiresAt - now) / 1e3))}s remaining`
            );
          }
        }
        for (const key of keysToRemove) {
          delete dots[key];
          this.debugLog(`DOT expired: ${key}`);
        }
        if (Object.keys(dots).length === 0) {
          delete dungeon.activeDots;
        }
      },
      _getDomainShadowMultiplier(dungeon) {
        const buff = this._getActiveBuff(dungeon, "domain");
        return buff ? buff.statMultiplier : 1;
      },
      _getRulersForceResistReduction(dungeon) {
        const debuff = this._getActiveDebuff(dungeon, "rulers_force");
        return debuff ? debuff.resistReduction : 0;
      },
      _getBloodlustStatReduction(dungeon) {
        const debuff = this._getActiveDebuff(dungeon, "bloodlust_stats");
        return (debuff == null ? void 0 : debuff.statReduction) || 0;
      },
      _getSprintCooldownReduction(dungeon) {
        const buff = this._getActiveBuff(dungeon, "sprint");
        return buff ? buff.cooldownReduction : 0;
      }
    };
  }
});

// src/Dungeons/story-constants.js
var require_story_constants = __commonJS({
  "src/Dungeons/story-constants.js"(exports2, module2) {
    module2.exports = {
      DEMON_CASTLE_KEY: "story_demon_castle",
      DEMON_CASTLE_FLOORS: 100,
      // 4 boss floors — updated ranks (S → SS → SSS → Monarch)
      DEMON_CASTLE_BOSSES: {
        1: { name: "Cerberus", title: "Gatekeeper", rank: "S", beastFamily: "demon", abilities: ["rage"] },
        50: { name: "Vulcan", title: "Ruler of the Lower Floors", rank: "SS", beastFamily: "demon", abilities: ["avaricious_rage"] },
        75: { name: "Metus", title: "Guide of the Departed Souls", rank: "SSS", beastFamily: "demon", abilities: ["necromancy"] },
        100: { name: "Baran", title: "King of Demons", rank: "Monarch", beastFamily: "demon", abilities: ["lightning_breath", "white_flames", "hells_army"] }
      },
      // Boss-specific stat multipliers (relative to normal boss of same rank)
      DEMON_CASTLE_BOSS_MULTIPLIERS: {
        1: { hpMult: 1.5, dmgMult: 1.2 },
        // Cerberus: tanky gatekeeper
        50: { hpMult: 3, dmgMult: 1.8 },
        // Vulcan: massive HP pool + rage buff
        75: { hpMult: 2.5, dmgMult: 1.5 },
        // Metus: moderate, relies on summons
        100: { hpMult: 5, dmgMult: 2.5 }
        // Baran: endgame, long multi-phase fight
      },
      // Demon type tiers by floor range — ranks match boss progression
      FLOOR_TIER_MAP: [
        { minFloor: 1, maxFloor: 49, rank: "A", name: "Normal Demon", eliteRank: "S", eliteName: "High-Grade Demon" },
        { minFloor: 50, maxFloor: 74, rank: "S", name: "Demon Knight", eliteRank: "SS", eliteName: "Elite Demon Knight" },
        { minFloor: 75, maxFloor: 99, rank: "SS", name: "Demon Noble", eliteRank: "SSS", eliteName: "Noble Demon Guard" },
        { minFloor: 100, maxFloor: 100, rank: "SSS", name: "Baran's Guard", eliteRank: "Monarch", eliteName: "Baran's Elite Guard" }
      ],
      // 1 million demons per floor
      DEMONS_PER_FLOOR: 1e6,
      getDemonCount(_floor) {
        return this.DEMONS_PER_FLOOR;
      },
      // Dungeon rank for the synthetic dungeon object — matches mob tier progression.
      // Mobs get slightly stronger per floor via getFloorScaling().
      getDungeonRankForFloor(floor) {
        if (floor <= 1) return "A";
        if (floor <= 49) return "A";
        if (floor <= 74) return "S";
        if (floor <= 99) return "SS";
        return "SSS";
      },
      // Floor tier lookup
      getFloorTier(floor) {
        return this.FLOOR_TIER_MAP.find((t) => floor >= t.minFloor && floor <= t.maxFloor) || this.FLOOR_TIER_MAP[0];
      },
      // Per-floor scaling — mobs get incrementally stronger within each tier.
      // Returns a multiplier 1.0 → ~1.5 across the tier range.
      // Floor 1 = 1.0x, floor 49 = ~1.48x, floor 50 = 1.0x (new tier resets), etc.
      getFloorScaling(floor) {
        const tier = this.getFloorTier(floor);
        const range = tier.maxFloor - tier.minFloor;
        if (range <= 0) return 1;
        const progress = (floor - tier.minFloor) / range;
        return 1 + progress * 0.5;
      },
      // Entry Permit: exactly 1 needed per floor, drops from killing demons.
      // Drop rate = 0.01% per kill → ~10,000 kills avg before permit drops.
      // Guaranteed drop on the very last demon if none dropped yet.
      ENTRY_PERMIT_DROP_RATE: 1e-4,
      getPermitDropRate(_floor) {
        return this.ENTRY_PERMIT_DROP_RATE;
      },
      // Shadow deployment: DC takes 70% of army, reserving 30% for regular dungeons.
      // On boss floors, deploy 85% (bosses need more firepower).
      DEPLOY_FRACTION: 0.7,
      DEPLOY_FRACTION_BOSS: 0.85,
      getDeployFraction(floor) {
        return this.isBossFloor(floor) ? this.DEPLOY_FRACTION_BOSS : this.DEPLOY_FRACTION;
      },
      // XP multipliers — Demon Castle is THE xp farm (3x mobs, 5x bosses)
      XP_MOB_MULTIPLIER: 3,
      XP_BOSS_MULTIPLIER: 5,
      // Essence multiplier (demons give more essence than normal dungeon mobs)
      ESSENCE_MULTIPLIER: 2,
      // Boss floor numbers for quick lookup
      BOSS_FLOORS: [1, 50, 75, 100],
      isBossFloor(floor) {
        return this.BOSS_FLOORS.includes(floor);
      },
      // Default state for a new Demon Castle save
      DEFAULT_STATE: {
        currentFloor: 1,
        highestFloor: 1,
        floorsCleared: [],
        totalDemonsKilled: 0,
        totalDemonSouls: 0,
        totalPermitsEarned: 0,
        totalBossesDefeated: 0,
        startedAt: null,
        lastEnteredAt: null,
        lastClearedFloor: null,
        completedAt: null
        // timestamp when floor 100 is cleared
      }
    };
  }
});

// src/Dungeons/player-sync-allocation.js
var require_player_sync_allocation = __commonJS({
  "src/Dungeons/player-sync-allocation.js"(exports2, module2) {
    var C2 = require_constants();
    module2.exports = {
      // Shared by _scheduleSpawnRankStarterWarm (below) and player-flow.js's cold-cache
      // recovery warm calls -- previously each computed this independently (one via a
      // WARM_MOB_CAP_BY_RANK local copy, the others via a flat _deployStarterShadowCap
      // fallback that ignored dungeon rank entirely). Centralizing here means every warm
      // call fetches enough candidates for the ACTUAL rank-scaled deploy target, not just
      // the generic 240-shadow starter floor.
      _getDeployWarmTarget(dungeonRank) {
        const rankIdx = dungeonRank ? Math.max(0, this.getRankIndexValue(dungeonRank)) : 0;
        const mobCap = dungeonRank && C2.DUNGEON_MOB_CAPACITY_BY_RANK[dungeonRank] || Math.round(50 * Math.pow(2.5, rankIdx));
        return Math.max(
          this._deployStarterShadowCap || 240,
          Math.ceil(mobCap * (C2.DEPLOY_MOB_RATIO || 1.5))
        );
      },
      syncHPFromStats() {
        var _a;
        if (!((_a = this.soloLevelingStats) == null ? void 0 : _a.settings)) return false;
        if (typeof this.soloLevelingStats.settings.userHP === "number" && !isNaN(this.soloLevelingStats.settings.userHP)) {
          this.settings.userHP = this.soloLevelingStats.settings.userHP;
          if (typeof this.soloLevelingStats.settings.userMaxHP === "number" && !isNaN(this.soloLevelingStats.settings.userMaxHP)) {
            this.settings.userMaxHP = this.soloLevelingStats.settings.userMaxHP;
          }
          return true;
        }
        return false;
      },
      syncManaFromStats() {
        var _a;
        if (!((_a = this.soloLevelingStats) == null ? void 0 : _a.settings)) return false;
        if (typeof this.soloLevelingStats.settings.userMana === "number" && !isNaN(this.soloLevelingStats.settings.userMana)) {
          this.settings.userMana = this.soloLevelingStats.settings.userMana;
          const incomingMaxMana = this.soloLevelingStats.settings.userMaxMana;
          if (typeof incomingMaxMana === "number" && Number.isFinite(incomingMaxMana) && incomingMaxMana > 0) {
            this.settings.userMaxMana = incomingMaxMana;
          }
          return true;
        }
        return false;
      },
      syncHPAndManaFromStats() {
        const now = Date.now();
        if (this._lastHPManaSync && now - this._lastHPManaSync < 250) {
          return { hpSynced: false, manaSynced: false };
        }
        this._lastHPManaSync = now;
        return {
          hpSynced: this.syncHPFromStats(),
          manaSynced: this.syncManaFromStats()
        };
      },
      pushHPToStats(saveImmediately = false) {
        var _a;
        if (!((_a = this.soloLevelingStats) == null ? void 0 : _a.settings)) return;
        this.soloLevelingStats.settings.userHP = this.settings.userHP;
        this.soloLevelingStats.settings.userMaxHP = this.settings.userMaxHP;
        if (typeof this.soloLevelingStats.updateChatUI === "function") {
          this.soloLevelingStats.updateChatUI();
        }
        if (saveImmediately && typeof this.soloLevelingStats.saveSettings === "function") {
          this.soloLevelingStats.saveSettings();
        }
      },
      pushManaToStats(saveImmediately = false) {
        var _a;
        if (!((_a = this.soloLevelingStats) == null ? void 0 : _a.settings)) return;
        this.soloLevelingStats.settings.userMana = this.settings.userMana;
        this.soloLevelingStats.settings.userMaxMana = this.settings.userMaxMana;
        if (typeof this.soloLevelingStats.updateChatUI === "function") {
          this.soloLevelingStats.updateChatUI();
        }
        if (saveImmediately && typeof this.soloLevelingStats.saveSettings === "function") {
          this.soloLevelingStats.saveSettings();
        }
      },
      updateStatsUI() {
        if (!this.soloLevelingStats) return;
        if (typeof this.soloLevelingStats.updateChatUI === "function") {
          this.soloLevelingStats.updateChatUI();
        }
      },
      async _warmDeployStarterPool(options = {}) {
        const {
          dungeonRank = null,
          targetCount = this._deployStarterShadowCap || 240,
          sampleLimit = 2e3,
          forceRefresh = false
        } = options || {};
        if (!this.started || !this.shadowArmy) return 0;
        const now = Date.now();
        const starterPoolFresh = Array.isArray(this._deployStarterPoolCache) && this._deployStarterPoolCache.length > 0 && this._deployStarterPoolCacheTime && now - this._deployStarterPoolCacheTime < this._deployStarterPoolCacheTTL;
        const sameRankHint = !dungeonRank || !this._deployStarterPoolCacheRank || this._deployStarterPoolCacheRank === dungeonRank;
        const minReusablePool = this.clampNumber(
          Number.isFinite(targetCount) ? Math.floor(targetCount) : this._deployStarterShadowCap || 240,
          24,
          5e4
        );
        if (!forceRefresh && starterPoolFresh && (sameRankHint || this._deployStarterPoolCache.length >= minReusablePool)) {
          return this._deployStarterPoolCache.length;
        }
        if (this._deployStarterWarmInFlight && !forceRefresh) {
          try {
            return await this._deployStarterWarmInFlight;
          } catch (_) {
            return 0;
          }
        }
        if (this._deployStarterWarmInFlight && forceRefresh) {
          try {
            await this._deployStarterWarmInFlight;
          } catch (_) {
          }
        }
        const warmPromise = (async () => {
          var _a, _b, _c, _d, _e, _f;
          const desiredCount = this.clampNumber(
            Math.max(
              200,
              Math.floor((Number.isFinite(targetCount) ? targetCount : this._deployStarterShadowCap || 240) * 4)
            ),
            200,
            1e5
          );
          const hardLimit = this.clampNumber(
            Math.max(desiredCount, Number.isFinite(sampleLimit) ? Math.floor(sampleLimit) : 2e3),
            200,
            1e5
          );
          const candidates = [];
          const seenIds = /* @__PURE__ */ new Set();
          const pushCandidates = (rows) => {
            if (!Array.isArray(rows) || rows.length === 0) return;
            for (let i = 0; i < rows.length; i++) {
              const raw = rows[i];
              let normalized = this.normalizeShadowId(raw);
              if ((!normalized || !this.getShadowIdValue(normalized)) && this.shadowArmy.getShadowData) {
                try {
                  const decoded = this.shadowArmy.getShadowData(raw);
                  normalized = this.normalizeShadowId(decoded) || decoded;
                } catch (_) {
                }
              }
              if (!normalized) continue;
              const sid = this.getShadowIdValue(normalized);
              if (!sid) continue;
              const idKey = String(sid);
              if (seenIds.has(idKey)) continue;
              seenIds.add(idKey);
              candidates.push(normalized);
              if (candidates.length >= hardLimit) break;
            }
          };
          const snapshot = ((_b = (_a = this.shadowArmy).getShadowSnapshotForDeploy) == null ? void 0 : _b.call(_a)) || ((_d = (_c = this.shadowArmy).getShadowSnapshot) == null ? void 0 : _d.call(_c));
          if (Array.isArray(snapshot) && snapshot.length > 0) {
            pushCandidates(snapshot);
            if (this.settings.debug && candidates.length < snapshot.length) {
              this.debugLog("DEPLOY", "Starter warmup snapshot dropped non-shadow entries", {
                snapshotSize: snapshot.length,
                usableCount: candidates.length,
                dropped: snapshot.length - candidates.length
              });
            }
            if (candidates.length >= minReusablePool) {
              this._deployStarterPoolCache = candidates.slice(0, hardLimit);
              this._deployStarterPoolCacheTime = Date.now();
              this._deployStarterPoolCacheRank = null;
              if (candidates.length === snapshot.length) {
                this._shadowsCache = {
                  shadows: this._deployStarterPoolCache.slice(),
                  timestamp: Date.now()
                };
              }
              return this._deployStarterPoolCache.length;
            }
          }
          const shadowStorage = this.shadowArmy.storageManager;
          if (!(shadowStorage == null ? void 0 : shadowStorage.getShadows)) {
            if (candidates.length > 0) {
              this._deployStarterPoolCache = candidates.slice(0, hardLimit);
              this._deployStarterPoolCacheTime = Date.now();
              this._deployStarterPoolCacheRank = dungeonRank || null;
              return this._deployStarterPoolCache.length;
            }
            return ((_e = this._deployStarterPoolCache) == null ? void 0 : _e.length) || 0;
          }
          let rankQueryCount = 0;
          const rankOrder = Array.isArray((_f = this.settings) == null ? void 0 : _f.dungeonRanks) ? this.settings.dungeonRanks : [];
          const rankHintIndex = dungeonRank && rankOrder.length > 0 ? this.getRankIndexValue(dungeonRank, rankOrder) : -1;
          const triedRankIndices = /* @__PURE__ */ new Set();
          if (rankHintIndex >= 0) {
            const rankOffsets = [0, 1, -1, 2, -2, 3, -3];
            const perRankLimit = this.clampNumber(
              Math.ceil(desiredCount / Math.max(1, rankOffsets.length)),
              80,
              1400
            );
            for (let i = 0; i < rankOffsets.length && candidates.length < desiredCount; i++) {
              const rankIdx = rankHintIndex + rankOffsets[i];
              if (rankIdx < 0 || rankIdx >= rankOrder.length) continue;
              triedRankIndices.add(rankIdx);
              const rank = rankOrder[rankIdx];
              const rows = shadowStorage.getShadowsByRankLimited ? await shadowStorage.getShadowsByRankLimited(rank, perRankLimit) : await shadowStorage.getShadows({ rank }, 0, perRankLimit);
              pushCandidates(rows);
              rankQueryCount++;
              if (rankQueryCount % 2 === 0) {
                await this._yieldToEventLoop();
                if (!this.started) return 0;
              }
            }
            if (candidates.length < desiredCount && shadowStorage.getShadowsByRankLimited) {
              const lowestTried = Math.min(rankHintIndex, ...Array.from(triedRankIndices));
              let cascadeSteps = 0;
              for (let rankIdx = lowestTried - 1; rankIdx >= 0 && candidates.length < desiredCount; rankIdx--) {
                if (triedRankIndices.has(rankIdx)) continue;
                triedRankIndices.add(rankIdx);
                const rank = rankOrder[rankIdx];
                if (!rank) continue;
                const remaining = desiredCount - candidates.length;
                try {
                  const rows = await shadowStorage.getShadowsByRankLimited(
                    rank,
                    this.clampNumber(remaining, 80, 1e5)
                  );
                  pushCandidates(rows);
                } catch (error) {
                  this.errorLog("DEPLOY", "Warm-pool fill-down cascade query failed", { rank, error });
                }
                cascadeSteps++;
                if (cascadeSteps % 2 === 0) {
                  await this._yieldToEventLoop();
                  if (!this.started) return 0;
                }
              }
              this.settings.debug && cascadeSteps > 0 && this.debugLog("DEPLOY", "Warm-pool fill-down cascade ran", {
                dungeonRank,
                desiredCount,
                candidatesAfterCascade: candidates.length,
                cascadeSteps
              });
            }
          }
          const minHealthyPool = this.clampNumber(
            Math.max(120, Math.floor((Number.isFinite(targetCount) ? targetCount : 240) * 1.5)),
            120,
            hardLimit
          );
          if (candidates.length < minHealthyPool) {
            const remaining = this.clampNumber(hardLimit - candidates.length, 0, hardLimit);
            if (remaining > 0) {
              const page = await shadowStorage.getShadowsByKeyPage(null, remaining);
              pushCandidates((page == null ? void 0 : page.shadows) || []);
            }
          }
          if (candidates.length === 0) {
            return 0;
          }
          const sortedCache = await this._buildSortedShadowCache(candidates, { yieldEvery: 2500 });
          if (!sortedCache) {
            return 0;
          }
          const sortedCandidates = sortedCache.sorted;
          if (sortedCandidates.length > hardLimit) {
            sortedCandidates.length = hardLimit;
          }
          this._deployStarterPoolCache = sortedCandidates;
          this._deployStarterPoolCacheTime = Date.now();
          this._deployStarterPoolCacheRank = dungeonRank || null;
          return sortedCandidates.length;
        })();
        this._deployStarterWarmInFlight = warmPromise;
        try {
          return await warmPromise;
        } finally {
          this._deployStarterWarmInFlight === warmPromise && (this._deployStarterWarmInFlight = null);
        }
      },
      // R1 CONFORMANCE (2026-07-12): replaces deployShadows()'s previous last-resort
      // getAllShadows(false) full-store scan (281k-record, 45-50s per PERF-CONVENTIONS.md
      // R1). Mirrors ShadowSenses/deployment-manager.js:getWeakestAvailableShadow's bounded
      // per-rank walk via ShadowArmy's 'rank' IDB index (getShadowsByRankLimited), but walks
      // outward from the DUNGEON'S rank using the same offset order _warmDeployStarterPool
      // already uses above — deploy wants rank-appropriate shadows, not the globally weakest.
      // Populates _deployStarterPoolCache (deploy's own pool) so the retry _buildDeployStarterAllocation
      // call picks candidates up through its normal deployStarterPoolCache source — it does
      // NOT touch _shadowsCache, which getAllShadows()'s many other call sites already keep warm.
      async _lastResortRankBoundedStarterPool(dungeonRank, targetCount = this._deployStarterShadowCap || 240) {
        var _a;
        if (!this.started || !this.shadowArmy) return 0;
        const shadowStorage = this.shadowArmy.storageManager;
        if (!(shadowStorage == null ? void 0 : shadowStorage.getShadowsByRankLimited)) return 0;
        const desiredCount = this.clampNumber(
          Math.max(200, Math.floor((Number.isFinite(targetCount) ? targetCount : this._deployStarterShadowCap || 240) * 4)),
          200,
          1e5
        );
        const rankOrder = Array.isArray((_a = this.settings) == null ? void 0 : _a.dungeonRanks) ? this.settings.dungeonRanks : [];
        const rankHintIndex = dungeonRank && rankOrder.length > 0 ? this.getRankIndexValue(dungeonRank, rankOrder) : -1;
        const rankOffsets = [0, 1, -1, 2, -2, 3, -3];
        const perRankLimit = this.clampNumber(Math.ceil(desiredCount / rankOffsets.length), 80, 4e3);
        const candidates = [];
        const seenIds = /* @__PURE__ */ new Set();
        const triedRankIndices = /* @__PURE__ */ new Set();
        const fetchRank = async (rank, limit) => {
          let rows;
          try {
            rows = await shadowStorage.getShadowsByRankLimited(rank, limit);
          } catch (error) {
            this.errorLog("DEPLOY", "Last-resort bounded rank query failed", { rank, error });
            return;
          }
          if (!Array.isArray(rows) || rows.length === 0) return;
          for (let j = 0; j < rows.length; j++) {
            let normalized = this.normalizeShadowId(rows[j]);
            if ((!normalized || !this.getShadowIdValue(normalized)) && this.shadowArmy.getShadowData) {
              try {
                const decoded = this.shadowArmy.getShadowData(rows[j]);
                normalized = this.normalizeShadowId(decoded) || decoded;
              } catch (_) {
              }
            }
            if (!normalized) continue;
            const sid = this.getShadowIdValue(normalized);
            if (!sid) continue;
            const idKey = String(sid);
            if (seenIds.has(idKey)) continue;
            seenIds.add(idKey);
            candidates.push(normalized);
          }
        };
        for (let i = 0; i < rankOffsets.length && candidates.length < desiredCount; i++) {
          const rankIdx = rankHintIndex >= 0 ? rankHintIndex + rankOffsets[i] : -1;
          const rank = rankIdx >= 0 && rankIdx < rankOrder.length ? rankOrder[rankIdx] : null;
          if (!rank) continue;
          triedRankIndices.add(rankIdx);
          await fetchRank(rank, perRankLimit);
          if (i % 2 === 1) {
            await this._yieldToEventLoop();
            if (!this.started) return 0;
          }
        }
        if (candidates.length < desiredCount && rankHintIndex >= 0 && rankOrder.length > 0) {
          const lowestTried = Math.min(rankHintIndex, ...Array.from(triedRankIndices));
          let cascadeSteps = 0;
          for (let rankIdx = lowestTried - 1; rankIdx >= 0 && candidates.length < desiredCount; rankIdx--) {
            if (triedRankIndices.has(rankIdx)) continue;
            triedRankIndices.add(rankIdx);
            const rank = rankOrder[rankIdx];
            if (!rank) continue;
            const remaining = desiredCount - candidates.length;
            await fetchRank(rank, this.clampNumber(remaining, perRankLimit, 1e5));
            cascadeSteps++;
            if (cascadeSteps % 2 === 0) {
              await this._yieldToEventLoop();
              if (!this.started) return 0;
            }
          }
          this.settings.debug && candidates.length > 0 && this.debugLog("DEPLOY", "Last-resort fill-down cascade ran", {
            dungeonRank,
            desiredCount,
            candidatesAfterCascade: candidates.length,
            cascadeSteps
          });
        }
        if (candidates.length === 0) return 0;
        this._deployStarterPoolCache = candidates;
        this._deployStarterPoolCacheTime = Date.now();
        this._deployStarterPoolCacheRank = dungeonRank || null;
        return candidates.length;
      },
      _scheduleSpawnRankStarterWarm(channelKey, dungeonRank) {
        if (!this.started || !this.shadowArmy || !channelKey) return;
        const ageMs = this._deployStarterPoolCacheTime ? Date.now() - this._deployStarterPoolCacheTime : Number.POSITIVE_INFINITY;
        const sameRankHint = !dungeonRank || !this._deployStarterPoolCacheRank || this._deployStarterPoolCacheRank === dungeonRank;
        const forceRefresh = !sameRankHint || ageMs > Math.max(3e4, Math.floor(this._deployStarterPoolCacheTTL * 0.5));
        const warmTarget = this._getDeployWarmTarget(dungeonRank);
        this._setTrackedTimeout(() => {
          Promise.resolve().then(async () => {
            const warmedPoolCount = await this._warmDeployStarterPool({
              dungeonRank: dungeonRank || null,
              targetCount: warmTarget,
              sampleLimit: Math.max(1200, Math.floor(warmTarget * 8)),
              forceRefresh
            });
            this.settings.debug && this.debugLog("DEPLOY", "Spawn rank warmup completed", {
              channelKey,
              dungeonRank: dungeonRank || null,
              warmTarget,
              warmedPoolCount,
              forceRefresh,
              cacheRank: this._deployStarterPoolCacheRank || null
            });
          }).catch((error) => {
            this.errorLog("DEPLOY", "Spawn rank warmup failed", { channelKey, dungeonRank, error });
          });
        }, 0);
      },
      // Cached union of shadow IDs assigned to ACTIVE dungeons, for deploy-time
      // "don't reuse another dungeon's shadows" filtering. Rebuilt lazily only when
      // invalidated (re-split / completion), and extended in-place as deploys pick
      // shadows — so a deploy storm across many dungeons rebuilds once instead of
      // O(dungeons × assigned) per deploy. Includes every active dungeon; callers
      // exclude the current dungeon's own IDs so re-deploys can reuse them.
      _getDeployAssignedUnion() {
        var _a, _b;
        if (this._deployAssignedUnion && this._deployAssignedUnionValid) {
          return this._deployAssignedUnion;
        }
        const union = /* @__PURE__ */ new Set();
        for (const [otherKey, assigned] of this.shadowAllocations.entries()) {
          if (!Array.isArray(assigned) || assigned.length === 0) continue;
          const d = this._getActiveDungeon(otherKey);
          if (!d || !d.shadowsDeployed || d._completing || (((_a = d.boss) == null ? void 0 : _a.hp) || 0) <= 0 && !((_b = d.boss) == null ? void 0 : _b._isSentinel)) continue;
          for (const shadow of assigned) {
            const sid = this.getShadowIdValue(shadow);
            sid && union.add(String(sid));
          }
        }
        this._deployAssignedUnion = union;
        this._deployAssignedUnionValid = true;
        return union;
      },
      // Force the next deploy to rebuild the assigned-ID union. Called when the
      // allocation wholesale changes (re-split) or a dungeon frees its shadows
      // (completion), since those aren't captured by the per-deploy incremental add.
      _invalidateDeployAssignedUnion() {
        this._deployAssignedUnionValid = false;
      },
      /**
       * How many shadows this dungeon may draw: the army minus the standing reserve,
       * minus what the OTHER active dungeons actually hold right now.
       *
       * @param {string} channelKey    dungeon being sized (excluded from the tally)
       * @param {number} armyCount     total shadows known to the allocation cache
       * @param {number} reserveFrac   fraction held back army-wide (e.g. 0.25)
       * @returns {number} cap, never below MIN_DEPLOY_FLOOR
       */
      _computeArmyAvailableCap(channelKey, armyCount, reserveFrac) {
        var _a, _b, _c;
        const MIN_DEPLOY_FLOOR = 24;
        const pool = Math.floor(Math.max(0, armyCount) * (1 - reserveFrac));
        let committedElsewhere = 0;
        const active = this.activeDungeons;
        if (active && typeof active[Symbol.iterator] === "function") {
          for (const [otherKey, other] of active) {
            if (otherKey === channelKey) continue;
            if (!other || other.completed || other.failed || !other.shadowsDeployed) continue;
            const held = Number((_b = (_a = other.shadowAllocation) == null ? void 0 : _a.shadows) == null ? void 0 : _b.length) || Number((_c = other.boss) == null ? void 0 : _c.expectedShadowCount) || 0;
            if (Number.isFinite(held) && held > 0) committedElsewhere += held;
          }
        }
        return Math.max(MIN_DEPLOY_FLOOR, pool - committedElsewhere);
      },
      _buildDeployStarterAllocation(channelKey, dungeon) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
        const MOB_CAP_BY_RANK = C2.DUNGEON_MOB_CAPACITY_BY_RANK;
        const RESERVE_FRACTION = 0.25;
        const DEPLOY_MOB_RATIO = C2.DEPLOY_MOB_RATIO || 1.5;
        const MAX_OVERRANK = 1;
        const DEFAULT_DEPLOY_CEIL = C2.DEPLOY_CEILING_ABSOLUTE || 2e5;
        const userCap = Number((_a = this.settings) == null ? void 0 : _a.deployStarterShadowCap);
        const hasUserCap = Number.isFinite(userCap) && userCap > 0;
        const deployCeiling = hasUserCap ? this.clampNumber(Math.floor(userCap), 24, DEFAULT_DEPLOY_CEIL) : DEFAULT_DEPLOY_CEIL;
        const scaleRaw = Number((_b = this.settings) == null ? void 0 : _b.deployScale);
        const deployScale = Number.isFinite(scaleRaw) && scaleRaw > 0 ? this.clampNumber(scaleRaw, 0.1, 5) : 1;
        const knownShadowCount = Number.isFinite((_c = this.allocationCache) == null ? void 0 : _c.count) ? Math.max(0, Math.floor(this.allocationCache.count)) : 0;
        const armyAvailableCap = knownShadowCount > 0 ? this._computeArmyAvailableCap(channelKey, knownShadowCount, RESERVE_FRACTION) : deployCeiling;
        let targetCount;
        if (dungeon._isDemonCastle && knownShadowCount > 0) {
          const DC = require_story_constants();
          const fraction = DC.getDeployFraction(dungeon._dcFloor || 1);
          targetCount = this.clampNumber(
            Math.min(Math.floor(knownShadowCount * fraction), armyAvailableCap),
            24,
            deployCeiling
          );
        } else {
          const rankIdx = Math.max(0, this.getRankIndexValue(dungeon.rank));
          const liveMobCap = Number((_d = dungeon.mobs) == null ? void 0 : _d.mobCapacity);
          const mobCap = Number.isFinite(liveMobCap) && liveMobCap > 0 ? liveMobCap : MOB_CAP_BY_RANK[dungeon.rank] || Math.round(50 * Math.pow(2.5, rankIdx));
          const mobTarget = Math.ceil(mobCap * DEPLOY_MOB_RATIO * deployScale);
          targetCount = this.clampNumber(
            Math.min(mobTarget, armyAvailableCap),
            24,
            deployCeiling
          );
        }
        const usedIds = this._getDeployAssignedUnion();
        const ownIds = /* @__PURE__ */ new Set();
        {
          const own = this.shadowAllocations.get(channelKey);
          if (Array.isArray(own)) {
            for (const shadow of own) {
              const sid = this.getShadowIdValue(shadow);
              sid && ownIds.add(String(sid));
            }
          }
        }
        const exchangeBlockedIds = /* @__PURE__ */ new Set();
        try {
          const exchange = this._getPluginSafe("ShadowExchange");
          const markedIds = (_e = exchange == null ? void 0 : exchange.getMarkedShadowIds) == null ? void 0 : _e.call(exchange);
          markedIds instanceof Set && markedIds.forEach((id) => id && exchangeBlockedIds.add(String(id)));
        } catch (err) {
          this.errorLog("DEPLOY", "ShadowExchange blocked-ID fetch failed (non-fatal)", err);
        }
        const sensesBlockedIds = this._getShadowSensesDeployedIds();
        const blockedIds = /* @__PURE__ */ new Set([...exchangeBlockedIds, ...sensesBlockedIds]);
        let candidatePool = Array.isArray(this._allocationSortedShadowsCache) && this._allocationSortedShadowsCache.length > 0 ? this._allocationSortedShadowsCache : null;
        let candidateSource = candidatePool ? "allocationSortedCache" : null;
        const starterPoolAvailable = Array.isArray(this._deployStarterPoolCache) && this._deployStarterPoolCache.length > 0 && this._deployStarterPoolCacheTime;
        const starterPoolAgeMs = starterPoolAvailable ? Date.now() - this._deployStarterPoolCacheTime : Number.POSITIVE_INFINITY;
        if (!candidatePool) {
          const starterPoolFresh = starterPoolAvailable && starterPoolAgeMs < this._deployStarterPoolCacheTTL;
          if (starterPoolFresh) {
            candidatePool = this._deployStarterPoolCache;
            candidateSource = "deployStarterPoolCache";
          }
        }
        if (!candidatePool) {
          const staleMaxAge = Number.isFinite(this._deployStarterPoolStaleMaxAge) ? this._deployStarterPoolStaleMaxAge : 9e5;
          const starterPoolStaleButUsable = starterPoolAvailable && starterPoolAgeMs < staleMaxAge;
          if (starterPoolStaleButUsable) {
            candidatePool = this._deployStarterPoolCache;
            candidateSource = "deployStarterPoolCacheStale";
          }
        }
        if (!candidatePool) {
          const snapshot = ((_g = (_f = this.shadowArmy) == null ? void 0 : _f.getShadowSnapshotForDeploy) == null ? void 0 : _g.call(_f)) || ((_i = (_h = this.shadowArmy) == null ? void 0 : _h.getShadowSnapshot) == null ? void 0 : _i.call(_h));
          if (Array.isArray(snapshot) && snapshot.length > 0) {
            candidatePool = snapshot;
            candidateSource = "shadowArmySnapshot";
          }
        }
        if (!candidatePool) {
          const cached = (_j = this._shadowsCache) == null ? void 0 : _j.shadows;
          if (Array.isArray(cached) && cached.length > 0) {
            candidatePool = cached;
            candidateSource = "shadowsCache";
          }
        }
        if (!Array.isArray(candidatePool) || candidatePool.length === 0) {
          return [];
        }
        const picked = [];
        const pickedIds = /* @__PURE__ */ new Set();
        const dungeonRankIndex = this.getRankIndexValue((dungeon == null ? void 0 : dungeon.rank) || "E");
        const normalizeCandidateShadow = (shadowLike) => {
          var _a2;
          let normalized = this.normalizeShadowId(shadowLike);
          if (normalized && this.getShadowIdValue(normalized)) {
            return normalized;
          }
          if ((_a2 = this.shadowArmy) == null ? void 0 : _a2.getShadowData) {
            try {
              const decoded = this.shadowArmy.getShadowData(shadowLike);
              normalized = this.normalizeShadowId(decoded) || decoded;
            } catch (_) {
            }
          }
          return normalized && this.getShadowIdValue(normalized) ? normalized : null;
        };
        const tryPickShadow = (shadow) => {
          const normalized = normalizeCandidateShadow(shadow);
          const shadowId = this.getShadowIdValue(normalized);
          if (!shadowId) return null;
          const sid = String(shadowId);
          if (usedIds.has(sid) && !ownIds.has(sid) || blockedIds.has(sid) || pickedIds.has(sid)) return null;
          pickedIds.add(sid);
          usedIds.add(sid);
          return normalized;
        };
        const tierATarget = Math.ceil(targetCount * 0.5);
        const tierBTarget = Math.ceil(targetCount * 0.35);
        const tierCTarget = targetCount - tierATarget - tierBTarget;
        const bucketA = [];
        const bucketB = [];
        const bucketC = [];
        const bucketOverkill = [];
        for (let i = 0; i < candidatePool.length; i++) {
          const normalized = normalizeCandidateShadow(candidatePool[i]);
          if (!normalized) continue;
          const sid = this.getShadowIdValue(normalized);
          if (!sid || usedIds.has(String(sid)) || blockedIds.has(String(sid))) continue;
          const signedDist = this.getRankIndexValue(normalized.rank || "E") - dungeonRankIndex;
          if (signedDist === 0) {
            bucketA.push(normalized);
          } else if (signedDist > MAX_OVERRANK) {
            bucketOverkill.push(normalized);
          } else if (signedDist >= -1) {
            bucketB.push(normalized);
          } else {
            bucketC.push(normalized);
          }
        }
        const pickFromBucket = (bucket, quota) => {
          let count = 0;
          for (let i = 0; i < bucket.length && count < quota; i++) {
            const accepted = tryPickShadow(bucket[i]);
            if (accepted) {
              picked.push(accepted);
              count++;
            }
          }
          return count;
        };
        const pickedA = pickFromBucket(bucketA, tierATarget);
        const shortfallA = tierATarget - pickedA;
        const pickedB = pickFromBucket(bucketB, tierBTarget + shortfallA);
        const shortfallB = tierBTarget + shortfallA - pickedB;
        pickFromBucket(bucketC, tierCTarget + shortfallB);
        if (picked.length < targetCount) {
          for (let i = 0; i < candidatePool.length && picked.length < targetCount; i++) {
            const normalized = normalizeCandidateShadow(candidatePool[i]);
            if (!normalized) continue;
            const sid = this.getShadowIdValue(normalized);
            if (!sid) continue;
            const signedDist = this.getRankIndexValue(normalized.rank || "E") - dungeonRankIndex;
            if (signedDist > MAX_OVERRANK) continue;
            const accepted = tryPickShadow(normalized);
            accepted && picked.push(accepted);
          }
        }
        if (picked.length < targetCount) {
          pickFromBucket(bucketOverkill, targetCount - picked.length);
        }
        if (picked.length === 0 && this.settings.debug) {
          let totalWithId = 0;
          let usedHits = 0;
          let exchangeBlockedHits = 0;
          let sensesBlockedHits = 0;
          let availableStrict = 0;
          for (let i = 0; i < candidatePool.length; i++) {
            const normalized = normalizeCandidateShadow(candidatePool[i]);
            const sidValue = this.getShadowIdValue(normalized);
            if (!sidValue) continue;
            totalWithId++;
            const sid = String(sidValue);
            if (usedIds.has(sid)) {
              usedHits++;
              continue;
            }
            if (exchangeBlockedIds.has(sid)) {
              exchangeBlockedHits++;
              continue;
            }
            if (sensesBlockedIds.has(sid)) {
              sensesBlockedHits++;
              continue;
            }
            availableStrict++;
          }
          this.debugLog("DEPLOY", "Starter allocation produced 0 candidates", {
            channelKey,
            dungeonRank: dungeon == null ? void 0 : dungeon.rank,
            candidateSource,
            starterPoolAgeMs: Number.isFinite(starterPoolAgeMs) ? Math.floor(starterPoolAgeMs) : null,
            poolSize: candidatePool.length,
            totalWithId,
            usedHits,
            exchangeBlockedHits,
            sensesBlockedHits,
            availableStrict,
            usedSetSize: usedIds.size,
            blockedSetSize: blockedIds.size,
            exchangeBlockedSetSize: exchangeBlockedIds.size,
            sensesBlockedSetSize: sensesBlockedIds.size
          });
        }
        if (this.settings.debug && picked.length > 0) {
          const rankTally = /* @__PURE__ */ new Map();
          for (let i = 0; i < picked.length; i++) {
            const r = ((_k = picked[i]) == null ? void 0 : _k.rank) || "E";
            rankTally.set(r, (rankTally.get(r) || 0) + 1);
          }
          const rankOrderForLog = Array.isArray((_l = this.settings) == null ? void 0 : _l.dungeonRanks) ? this.settings.dungeonRanks : [];
          const formatCount = (n) => {
            if (n >= 1e6) return (n % 1e6 === 0 ? n / 1e6 : (n / 1e6).toFixed(1)) + "M";
            if (n >= 1e3) return (n % 1e3 === 0 ? n / 1e3 : (n / 1e3).toFixed(1)) + "k";
            return String(n);
          };
          const orderedRanks = rankOrderForLog.length > 0 ? rankOrderForLog.filter((r) => rankTally.has(r)) : Array.from(rankTally.keys());
          const composition = orderedRanks.map((r) => `${r}:${formatCount(rankTally.get(r))}`).join(" ");
          this.debugLog("DEPLOY", `Deployed ${picked.length.toLocaleString()}: ${composition}`, {
            channelKey,
            dungeonRank: dungeon == null ? void 0 : dungeon.rank,
            targetCount,
            pickedCount: picked.length,
            rankBreakdown: Object.fromEntries(rankTally)
          });
        }
        return picked;
      },
      _applyDeployStarterAllocation(channelKey, dungeon, starterShadows) {
        var _a;
        if (!Array.isArray(starterShadows) || starterShadows.length === 0 || !dungeon) return 0;
        const assigned = [];
        const seen = /* @__PURE__ */ new Set();
        for (let i = 0; i < starterShadows.length; i++) {
          const normalized = this.normalizeShadowId(starterShadows[i]);
          if (!normalized) continue;
          const shadowId = this.getShadowIdValue(normalized);
          if (!shadowId) continue;
          const sid = String(shadowId);
          if (seen.has(sid)) continue;
          seen.add(sid);
          assigned.push(normalized);
        }
        if (assigned.length === 0) return 0;
        let totalPower = 0;
        for (let i = 0; i < assigned.length; i++) {
          totalPower += this.getShadowCombatScore(assigned[i]);
        }
        this.shadowAllocations.set(channelKey, assigned);
        dungeon.shadowAllocation = {
          shadows: assigned,
          totalPower,
          updatedAt: Date.now(),
          source: "deploy_starter"
        };
        if (dungeon.boss) {
          dungeon.boss.expectedShadowCount = assigned.length;
        }
        const existingCount = Number.isFinite((_a = this.allocationCache) == null ? void 0 : _a.count) ? this.allocationCache.count : 0;
        if (assigned.length > existingCount) {
          this.allocationCache = { count: assigned.length };
          this.allocationCacheTime = Date.now();
        }
        return assigned.length;
      },
      _scheduleDeployRebalance(channelKey, deployStartedAt = Date.now()) {
        if (!channelKey || this._deployRebalanceInFlight.has(channelKey)) return;
        this._deployRebalanceInFlight.add(channelKey);
        this._setTrackedTimeout(() => {
          Promise.resolve().then(async () => {
            var _a, _b, _c, _d;
            if (!this.started) return;
            const dungeon = this._getActiveDungeon(channelKey);
            if (!dungeon || !dungeon.shadowsDeployed || ((_a = dungeon.boss) == null ? void 0 : _a.hp) <= 0 && !((_b = dungeon.boss) == null ? void 0 : _b._isSentinel)) return;
            const beforeCount = (this.shadowAllocations.get(channelKey) || []).length;
            const rebalanceStartAt = Date.now();
            await this.preSplitShadowArmy();
            if (!this.started) return;
            const refreshedDungeon = this._getActiveDungeon(channelKey);
            if (!refreshedDungeon || !refreshedDungeon.shadowsDeployed) return;
            const afterCount = (this.shadowAllocations.get(channelKey) || []).length;
            this.ensureDeployedSpawnPipeline(channelKey, "deploy_async_rebalance");
            (_d = (_c = this._bossBarCache) == null ? void 0 : _c.delete) == null ? void 0 : _d.call(_c, channelKey);
            this.queueHPBarUpdate(channelKey);
            this.settings.debug && console.log(
              `[Dungeons] \u2694\uFE0F DEPLOY REBALANCE: "${refreshedDungeon.name}" [${refreshedDungeon.rank}] starter=${beforeCount} -> full=${afterCount} shadows | rebalance=${Date.now() - rebalanceStartAt}ms | total=${Date.now() - deployStartedAt}ms | Key: ${channelKey}`
            );
          }).catch((error) => this.errorLog("DEPLOY", "Async deploy rebalance failed", { channelKey, error })).finally(() => {
            const pendingDungeon = this._getActiveDungeon(channelKey);
            if (pendingDungeon) {
              pendingDungeon._deployPendingFullAllocation = false;
            }
            this._deployRebalanceInFlight.delete(channelKey);
          });
        }, 50);
      },
      _getAssignedShadowsForDungeon(channelKey, dungeon) {
        var _a;
        const assignedFromMap = this.shadowAllocations.get(channelKey) || [];
        const assignedFromDungeon = ((_a = dungeon.shadowAllocation) == null ? void 0 : _a.shadows) || [];
        const assignedShadows = assignedFromMap.length > 0 ? assignedFromMap : assignedFromDungeon;
        if (assignedFromMap.length > 0) {
          dungeon.shadowAllocation = {
            shadows: assignedFromMap,
            updatedAt: Date.now(),
            source: "shadowAllocations"
          };
        }
        return { assignedFromMap, assignedFromDungeon, assignedShadows };
      },
      _collectShadowsNeedingHPInit(assignedShadows, deadShadows) {
        const shadowsToInitialize = [];
        for (const shadow of assignedShadows) {
          const shadowId = this.getShadowIdValue(shadow);
          if (!shadowId) continue;
          deadShadows.has(shadowId) || shadowsToInitialize.push(shadow);
        }
        return shadowsToInitialize;
      },
      async _initializeShadowHPBatch(shadowsToInitialize, shadowHP, context) {
        for (const shadow of shadowsToInitialize) {
          try {
            const hpData = this.initializeShadowHPSync(shadow, shadowHP);
            const shadowId = this.getShadowIdValue(shadow);
            const isValidHpData = hpData && typeof hpData.hp === "number" && !isNaN(hpData.hp) && typeof hpData.maxHp === "number" && !isNaN(hpData.maxHp) && hpData.maxHp > 0 && hpData.hp >= 0;
            if (!isValidHpData) {
              this.debugLogOnce(`SHADOW_HP_INIT_INVALID:${shadowId}`, "SHADOW_HP", {
                shadowId,
                hpData,
                context
              });
              shadowHP.set(String(shadowId), { hp: 1, maxHp: 1 });
            }
          } catch (error) {
            this.errorLog(
              "SHADOW_INIT",
              `Failed to initialize shadow ${this.getShadowIdValue(shadow)} (${context})`,
              error
            );
          }
        }
      },
      _cleanupDungeonActiveMobs(dungeon) {
        var _a, _b;
        const mobs = (_a = dungeon == null ? void 0 : dungeon.mobs) == null ? void 0 : _a.activeMobs;
        if (!mobs) return;
        let writeIdx = 0;
        for (let readIdx = 0; readIdx < mobs.length; readIdx++) {
          const mob = mobs[readIdx];
          if (mob && mob.hp > 0) {
            if (writeIdx !== readIdx) mobs[writeIdx] = mobs[readIdx];
            writeIdx++;
          }
        }
        mobs.length = writeIdx;
        const dungeonCap = ((_b = this._getMobActiveCap) == null ? void 0 : _b.call(this, dungeon)) || 3e3;
        const maxSize = Math.max(3e3, dungeonCap);
        if (mobs.length > maxSize) {
          mobs.length = Math.max(500, Math.floor(maxSize * 0.8));
        }
      },
      _getActiveDungeon(channelKey) {
        const d = this.activeDungeons.get(channelKey);
        return d && !d.completed && !d.failed ? d : null;
      },
      _varianceWide() {
        return 0.85 + Math.random() * 0.3;
      },
      _varianceNarrow() {
        return 0.9 + Math.random() * 0.2;
      },
      _resolveSpawnTierShares() {
        var _a, _b, _c;
        const normal = Number.isFinite((_a = this.settings) == null ? void 0 : _a.mobTierNormalShare) ? this.settings.mobTierNormalShare : 0.7;
        const elite = Number.isFinite((_b = this.settings) == null ? void 0 : _b.mobTierEliteShare) ? this.settings.mobTierEliteShare : 0.25;
        const champion = Number.isFinite((_c = this.settings) == null ? void 0 : _c.mobTierChampionShare) ? this.settings.mobTierChampionShare : 0.05;
        const sum = Math.max(0.01, normal + elite + champion);
        return {
          normal: normal / sum,
          elite: elite / sum,
          champion: champion / sum
        };
      },
      _rollMobTier() {
        const shares = this._resolveSpawnTierShares();
        const roll = Math.random();
        if (roll < shares.normal) return "normal";
        if (roll < shares.normal + shares.elite) return "elite";
        return "champion";
      },
      _getMobTierMultipliers(tier) {
        switch (tier) {
          case "champion":
            return { statMultiplier: 1.7, hpMultiplier: 2.7, cooldownMultiplier: 0.9 };
          case "elite":
            return { statMultiplier: 1.35, hpMultiplier: 1.8, cooldownMultiplier: 0.95 };
          default:
            return { statMultiplier: 1, hpMultiplier: 1, cooldownMultiplier: 1 };
        }
      },
      _getShadowPressureScaleFromPower(totalPower, step, maxScale) {
        const safePower = Math.max(0, Number.isFinite(totalPower) ? totalPower : 0);
        const safeStep = Number.isFinite(step) ? step : 0;
        const safeMax = Number.isFinite(maxScale) ? maxScale : 2.75;
        if (safePower <= 0 || safeStep <= 0) return 1;
        const rawScale = 1 + safeStep * Math.log10(safePower + 1);
        return this.clampNumber(rawScale, 1, safeMax);
      },
      // GEOMETRIC, not linear (changed 2026-08-03). The old form was
      // `base + rankIndex * 0.14`, clamped to 12, and it could not deliver
      // rank-to-rank differentiation at the top of the ladder: boss HP is dominated
      // by bossVitality*10, and mob vitality grows QUADRATICALLY
      // (150 + 100i + 40i^2). A quadratic's consecutive-rank ratio decays toward 1,
      // so late ranks collapsed together — Monarch+ -> Shadow Monarch was only
      // 1.22x. Steepening the linear step does NOT fix that: raising it from 0.14
      // to 0.75 (5.4x steeper) moved the top step to just 1.26x. Only a multiplier
      // that itself grows geometrically can hold the ratio up.
      //
      // At 1.25^rank the top steps are ~1.47-1.54x and E -> Shadow Monarch spans
      // 774x. The ceiling is 60 because 2.3 * 1.25^12 = 33.5 and a lower cap would
      // flatten exactly the ranks this exists to separate (a cap of 12 re-created
      // the original bug, and 1.18^rank actually REGRESSED at the top because of it).
      //
      // Parity fight length is unaffected: the per-tick boss damage cap is a
      // PERCENTAGE of maxHP (6% at rank parity), so ticks-to-kill stays ~17 at
      // every rank no matter how large the pool is. Bigger HP only penalises
      // under-ranked armies, whose raw DPS rather than the cap is the binding
      // constraint — which is the intended differentiation.
      getStaticBossHpMultiplier(rankIndex) {
        var _a, _b;
        const safeRankIndex = Math.max(0, Number.isFinite(rankIndex) ? rankIndex : 0);
        const base = Number.isFinite((_a = this.settings) == null ? void 0 : _a.staticBossHpBaseMultiplier) ? this.settings.staticBossHpBaseMultiplier : 2.3;
        const rankGrowth = Number.isFinite((_b = this.settings) == null ? void 0 : _b.staticBossHpRankGrowth) ? this.settings.staticBossHpRankGrowth : 1.25;
        return this.clampNumber(base * Math.pow(rankGrowth, safeRankIndex), 1, 60);
      },
      getShadowPressureMobFactor(dungeon) {
        var _a, _b, _c, _d;
        if (((_a = this.settings) == null ? void 0 : _a.shadowPressureScalingEnabled) !== true) return 1;
        const totalPower = Number.isFinite((_b = dungeon == null ? void 0 : dungeon.shadowAllocation) == null ? void 0 : _b.totalPower) ? dungeon.shadowAllocation.totalPower : 0;
        const step = Number.isFinite((_c = this.settings) == null ? void 0 : _c.shadowPressureMobScaleStep) ? this.settings.shadowPressureMobScaleStep : 0.12;
        const maxScale = Number.isFinite((_d = this.settings) == null ? void 0 : _d.shadowPressureScaleMax) ? this.settings.shadowPressureScaleMax : 2.75;
        return this._getShadowPressureScaleFromPower(totalPower, step, maxScale);
      },
      getShadowPressureBossFactor(dungeon) {
        var _a, _b, _c, _d;
        if (((_a = this.settings) == null ? void 0 : _a.shadowPressureScalingEnabled) !== true) return 1;
        const totalPower = Number.isFinite((_b = dungeon == null ? void 0 : dungeon.shadowAllocation) == null ? void 0 : _b.totalPower) ? dungeon.shadowAllocation.totalPower : 0;
        const step = Number.isFinite((_c = this.settings) == null ? void 0 : _c.shadowPressureBossScaleStep) ? this.settings.shadowPressureBossScaleStep : 0.18;
        const maxScale = Number.isFinite((_d = this.settings) == null ? void 0 : _d.shadowPressureScaleMax) ? this.settings.shadowPressureScaleMax : 2.75;
        return this._getShadowPressureScaleFromPower(totalPower, step, maxScale);
      },
      syncDungeonDifficultyScale(dungeon, channelKey = null, { scaleExistingMobs = false } = {}) {
        var _a, _b, _c, _d;
        if (!(dungeon == null ? void 0 : dungeon.boss)) return false;
        if (!dungeon.difficultyScale || typeof dungeon.difficultyScale !== "object") {
          dungeon.difficultyScale = {
            mobFactor: 1,
            bossFactor: 1,
            lastPower: 0,
            updatedAt: Date.now()
          };
        }
        const prevMobFactor = Number.isFinite(dungeon.difficultyScale.mobFactor) ? dungeon.difficultyScale.mobFactor : 1;
        const prevBossFactor = Number.isFinite(dungeon.difficultyScale.bossFactor) ? dungeon.difficultyScale.bossFactor : 1;
        const scalingEnabled = ((_a = this.settings) == null ? void 0 : _a.shadowPressureScalingEnabled) === true;
        if (!scalingEnabled) {
          dungeon.difficultyScale = {
            mobFactor: 1,
            bossFactor: 1,
            lastPower: Number.isFinite((_b = dungeon == null ? void 0 : dungeon.shadowAllocation) == null ? void 0 : _b.totalPower) ? dungeon.shadowAllocation.totalPower : 0,
            updatedAt: Date.now()
          };
          return false;
        }
        const nextMobFactor = this.getShadowPressureMobFactor(dungeon);
        const nextBossFactor = this.getShadowPressureBossFactor(dungeon);
        const mobRatio = prevMobFactor > 0 ? nextMobFactor / prevMobFactor : nextMobFactor;
        const bossRatio = prevBossFactor > 0 ? nextBossFactor / prevBossFactor : nextBossFactor;
        const changedBoss = Math.abs(bossRatio - 1) >= 0.03;
        const changedMobs = Math.abs(mobRatio - 1) >= 0.03;
        if (changedBoss && Number.isFinite(dungeon.boss.maxHp) && dungeon.boss.maxHp > 0) {
          const hpRatio = Number.isFinite(dungeon.boss.hp) ? dungeon.boss.hp / dungeon.boss.maxHp : 1;
          const scaledMax = Math.max(1, Math.floor(dungeon.boss.maxHp * bossRatio));
          dungeon.boss.maxHp = scaledMax;
          if (Number.isFinite(dungeon.boss.hp) && dungeon.boss.hp > 0) {
            dungeon.boss.hp = Math.max(1, Math.min(scaledMax, Math.floor(scaledMax * hpRatio)));
          } else {
            dungeon.boss.hp = Math.max(0, Math.min(scaledMax, dungeon.boss.hp || 0));
          }
        }
        if (scaleExistingMobs && changedMobs && Array.isArray((_c = dungeon == null ? void 0 : dungeon.mobs) == null ? void 0 : _c.activeMobs)) {
          for (const mob of dungeon.mobs.activeMobs) {
            if (!mob || !Number.isFinite(mob.maxHp) || mob.maxHp <= 0) continue;
            const hpRatio = Number.isFinite(mob.hp) ? mob.hp / mob.maxHp : 1;
            const scaledMax = Math.max(1, Math.floor(mob.maxHp * mobRatio));
            mob.maxHp = scaledMax;
            if (Number.isFinite(mob.hp) && mob.hp > 0) {
              mob.hp = Math.max(1, Math.min(scaledMax, Math.floor(scaledMax * hpRatio)));
            } else {
              mob.hp = Math.max(0, Math.min(scaledMax, mob.hp || 0));
            }
          }
        }
        dungeon.difficultyScale = {
          mobFactor: nextMobFactor,
          bossFactor: nextBossFactor,
          lastPower: Number.isFinite((_d = dungeon == null ? void 0 : dungeon.shadowAllocation) == null ? void 0 : _d.totalPower) ? dungeon.shadowAllocation.totalPower : 0,
          updatedAt: Date.now()
        };
        if ((changedBoss || scaleExistingMobs && changedMobs) && channelKey) {
          this.debugLog("DIFFICULTY", "Updated dungeon pressure scaling", {
            channelKey,
            bossFactor: nextBossFactor,
            mobFactor: nextMobFactor,
            changedBoss,
            changedMobs: scaleExistingMobs ? changedMobs : false
          });
        }
        return changedBoss || scaleExistingMobs && changedMobs;
      },
      ensureBossEngagementUnlocked(dungeon, channelKey = null) {
        var _a, _b, _c, _d, _e, _f;
        if (!(dungeon == null ? void 0 : dungeon.boss)) return false;
        const bossGateConfig = this.getBossGateRuntimeConfig(dungeon == null ? void 0 : dungeon.rank, (_a = dungeon == null ? void 0 : dungeon.mobs) == null ? void 0 : _a.mobCapacity);
        if (!dungeon.bossGate || typeof dungeon.bossGate !== "object") {
          dungeon.bossGate = {
            enabled: bossGateConfig.enabled,
            minDurationMs: bossGateConfig.minDurationMs,
            requiredMobKills: bossGateConfig.requiredMobKills,
            deployedAt: null,
            unlockedAt: null
          };
        } else {
          if (typeof dungeon.bossGate.enabled !== "boolean") {
            dungeon.bossGate.enabled = bossGateConfig.enabled;
          }
          if (!Number.isFinite(dungeon.bossGate.minDurationMs) || dungeon.bossGate.minDurationMs < 5e3) {
            dungeon.bossGate.minDurationMs = bossGateConfig.minDurationMs;
          }
          if (!Number.isFinite(dungeon.bossGate.requiredMobKills) || dungeon.bossGate.requiredMobKills < 0) {
            dungeon.bossGate.requiredMobKills = bossGateConfig.requiredMobKills;
          }
        }
        if (!dungeon.shadowsDeployed) return false;
        const now = Date.now();
        const gateDeployedAt = Number(dungeon.bossGate.deployedAt);
        const dungeonDeployedAt = Number(dungeon.deployedAt);
        let deployedAt = Math.max(
          Number.isFinite(gateDeployedAt) ? gateDeployedAt : 0,
          Number.isFinite(dungeonDeployedAt) ? dungeonDeployedAt : 0
        );
        if (!Number.isFinite(deployedAt) || deployedAt <= 0 || deployedAt > now) {
          deployedAt = now;
          dungeon.bossGate.unlockedAt = null;
        }
        dungeon.deployedAt = deployedAt;
        dungeon.bossGate.deployedAt = deployedAt;
        const hasSpawnedMobs = this._countLiveMobs(dungeon) > 0 || Number.isFinite((_b = dungeon == null ? void 0 : dungeon.mobs) == null ? void 0 : _b.total) && dungeon.mobs.total > 0 || Number.isFinite((_c = dungeon == null ? void 0 : dungeon.mobs) == null ? void 0 : _c.killed) && dungeon.mobs.killed > 0;
        if (!hasSpawnedMobs && channelKey) {
          this.ensureDeployedSpawnPipeline(channelKey, "boss_gate_precheck");
        }
        if (dungeon.bossGate.enabled === false) {
          return hasSpawnedMobs;
        }
        if (!hasSpawnedMobs) return false;
        const elapsed = Math.max(0, now - deployedAt);
        const kills = Number.isFinite((_d = dungeon == null ? void 0 : dungeon.mobs) == null ? void 0 : _d.killed) ? dungeon.mobs.killed : 0;
        const minDurationMs = Math.max(
          0,
          Number.isFinite(dungeon.bossGate.minDurationMs) ? dungeon.bossGate.minDurationMs : 18e4
        );
        const requiredMobKills = Math.max(
          0,
          Number.isFinite(dungeon.bossGate.requiredMobKills) ? dungeon.bossGate.requiredMobKills : 0
        );
        const maxWaitRaw = Number((_e = this.settings) == null ? void 0 : _e.bossGateMaxWaitMs);
        const maxWaitMs = Number.isFinite(maxWaitRaw) && maxWaitRaw >= 6e4 ? Math.floor(maxWaitRaw) : ((_f = this.defaultSettings) == null ? void 0 : _f.bossGateMaxWaitMs) ?? 6e5;
        const killsSatisfied = kills >= requiredMobKills || elapsed >= maxWaitMs;
        const unlockedAt = Number(dungeon.bossGate.unlockedAt);
        const hasValidUnlockStamp = Number.isFinite(unlockedAt) && unlockedAt >= deployedAt;
        if (hasValidUnlockStamp) {
          if (elapsed >= minDurationMs && killsSatisfied) return true;
          dungeon.bossGate.unlockedAt = null;
        }
        if (elapsed < minDurationMs || !killsSatisfied) return false;
        dungeon.bossGate.unlockedAt = now;
        dungeon.boss.lastAttackTime = now;
        if (channelKey) {
          this.debugLog("BOSS_GATE", "Boss engagement unlocked", {
            channelKey,
            elapsed,
            kills,
            minDurationMs,
            requiredMobKills,
            deployedAt: dungeon.bossGate.deployedAt
          });
          this.showToast(`${dungeon.name}: Boss is now vulnerable!`, "success");
        }
        return true;
      },
      // Pure read-only predicate — checks boss gate status without mutating dungeon state.
      // Use this in simulation/offline paths (e.g. simulateShadowAttacks, simulateBossAttacks)
      // to avoid permanently unlocking the boss gate as a side effect of simulation.
      isBossGateUnlocked(dungeon) {
        var _a, _b, _c, _d, _e;
        if (!(dungeon == null ? void 0 : dungeon.boss) || !dungeon.shadowsDeployed) return false;
        if (!dungeon.bossGate || typeof dungeon.bossGate !== "object") return false;
        if (dungeon.bossGate.enabled === false) {
          const hasSpawnedMobs = this._countLiveMobs(dungeon) > 0 || Number.isFinite((_a = dungeon == null ? void 0 : dungeon.mobs) == null ? void 0 : _a.total) && dungeon.mobs.total > 0 || Number.isFinite((_b = dungeon == null ? void 0 : dungeon.mobs) == null ? void 0 : _b.killed) && dungeon.mobs.killed > 0;
          return hasSpawnedMobs;
        }
        const now = Date.now();
        const deployedAt = Math.max(
          Number.isFinite(Number(dungeon.bossGate.deployedAt)) ? Number(dungeon.bossGate.deployedAt) : 0,
          Number.isFinite(Number(dungeon.deployedAt)) ? Number(dungeon.deployedAt) : 0
        );
        if (deployedAt <= 0) return false;
        const elapsed = Math.max(0, now - deployedAt);
        const kills = Number.isFinite((_c = dungeon == null ? void 0 : dungeon.mobs) == null ? void 0 : _c.killed) ? dungeon.mobs.killed : 0;
        const minDurationMs = Number.isFinite(dungeon.bossGate.minDurationMs) ? dungeon.bossGate.minDurationMs : 18e4;
        const requiredMobKills = Number.isFinite(dungeon.bossGate.requiredMobKills) ? dungeon.bossGate.requiredMobKills : 0;
        const maxWaitRaw = Number((_d = this.settings) == null ? void 0 : _d.bossGateMaxWaitMs);
        const maxWaitMs = Number.isFinite(maxWaitRaw) && maxWaitRaw >= 6e4 ? Math.floor(maxWaitRaw) : ((_e = this.defaultSettings) == null ? void 0 : _e.bossGateMaxWaitMs) ?? 6e5;
        const killsSatisfied = kills >= requiredMobKills || elapsed >= maxWaitMs;
        const unlockedAt = Number(dungeon.bossGate.unlockedAt);
        if (Number.isFinite(unlockedAt) && unlockedAt >= deployedAt) {
          return elapsed >= minDurationMs && killsSatisfied;
        }
        return elapsed >= minDurationMs && killsSatisfied;
      }
    };
  }
});

// src/Dungeons/difficulty-contributions.js
var require_difficulty_contributions = __commonJS({
  "src/Dungeons/difficulty-contributions.js"(exports2, module2) {
    var SLEvents = require_event_bus();
    var C2 = require_constants();
    module2.exports = {
      _resolveDungeonXPBatchKey(channelKey, dungeonLike = null) {
        const explicit = typeof (dungeonLike == null ? void 0 : dungeonLike._xpBatchKey) === "string" ? dungeonLike._xpBatchKey.trim() : "";
        if (explicit) return explicit;
        const startTime = Number(dungeonLike == null ? void 0 : dungeonLike.startTime);
        if (Number.isFinite(startTime) && startTime > 0) {
          return `${channelKey}:${Math.floor(startTime)}`;
        }
        return `${channelKey}:legacy`;
      },
      _queuePendingDungeonMobXP(channelKey, dungeon, xpAmount, killCount = 1) {
        var _a, _b;
        const normalizedXP = Math.floor(Number(xpAmount) || 0);
        if (!dungeon || normalizedXP <= 0) return 0;
        const batchKey = this._resolveDungeonXPBatchKey(channelKey, dungeon);
        dungeon._xpBatchKey = batchKey;
        const currentXP = Number(dungeon.pendingUserMobXP);
        const safeCurrentXP = Number.isFinite(currentXP) && currentXP > 0 ? Math.floor(currentXP) : 0;
        const nextXP = safeCurrentXP + normalizedXP;
        dungeon.pendingUserMobXP = nextXP;
        const currentKills = Number(dungeon.pendingUserMobKills);
        const safeCurrentKills = Number.isFinite(currentKills) && currentKills > 0 ? Math.floor(currentKills) : 0;
        const normalizedKills = Math.max(1, Math.floor(Number(killCount) || 1));
        const nextKills = safeCurrentKills + normalizedKills;
        dungeon.pendingUserMobKills = nextKills;
        (_a = this._pendingDungeonMobXPByBatch) == null ? void 0 : _a.set(batchKey, nextXP);
        (_b = this._pendingDungeonMobKillsByBatch) == null ? void 0 : _b.set(batchKey, nextKills);
        return nextXP;
      },
      _consumePendingDungeonMobXP(batchKey, snapshot = null) {
        var _a, _b, _c, _d;
        const snapXP = Number(snapshot == null ? void 0 : snapshot.pendingUserMobXP);
        const queuedXP = Number((_a = this._pendingDungeonMobXPByBatch) == null ? void 0 : _a.get(batchKey));
        const pendingXP = Math.max(
          Number.isFinite(snapXP) && snapXP > 0 ? Math.floor(snapXP) : 0,
          Number.isFinite(queuedXP) && queuedXP > 0 ? Math.floor(queuedXP) : 0
        );
        const snapKills = Number(snapshot == null ? void 0 : snapshot.pendingUserMobKills);
        const queuedKills = Number((_b = this._pendingDungeonMobKillsByBatch) == null ? void 0 : _b.get(batchKey));
        const pendingKills = Math.max(
          Number.isFinite(snapKills) && snapKills > 0 ? Math.floor(snapKills) : 0,
          Number.isFinite(queuedKills) && queuedKills > 0 ? Math.floor(queuedKills) : 0
        );
        (_c = this._pendingDungeonMobXPByBatch) == null ? void 0 : _c.delete(batchKey);
        (_d = this._pendingDungeonMobKillsByBatch) == null ? void 0 : _d.delete(batchKey);
        return { pendingXP, pendingKills };
      },
      _discardPendingDungeonMobXP(batchKey) {
        var _a, _b;
        if (!batchKey) return;
        (_a = this._pendingDungeonMobXPByBatch) == null ? void 0 : _a.delete(batchKey);
        (_b = this._pendingDungeonMobKillsByBatch) == null ? void 0 : _b.delete(batchKey);
      },
      // Rank histogram of a dungeon's assigned shadows, cached against the
      // allocation array identity — recomputed only when the allocation is
      // replaced (re-split / deploy), so the per-tick warfront read is O(ranks),
      // not O(army). Compressed shadow records carry `rank` top-level (IDB index
      // field), so this works for both compressed and full records.
      _getShadowSpeciesKeyDg(s) {
        return String(
          (s == null ? void 0 : s.beastFamily) || (s == null ? void 0 : s.bf) || (s == null ? void 0 : s.beastType) || (s == null ? void 0 : s.bt) || (s == null ? void 0 : s.role) || (s == null ? void 0 : s.ro) || "shadow"
        );
      },
      // War intel for a dungeon's allocation, cached against allocation identity:
      // - counts: effective-rank histogram (rank + grade bump) for the war math
      // - leaders: species → sovereign specialization ('offense'/'defense') for
      //   every species whose GRAND MARSHAL is fielded in THIS dungeon
      // - speciesTroops / ledOffense / ledDefense: troop tallies for the buffs
      // Recomputed only when the allocation array is replaced — O(assigned) once,
      // O(1) per tick.
      _getWarIntel(dungeon, assigned) {
        const cache = dungeon._warIntel;
        if (cache && cache.ref === assigned) return cache;
        const GRADE_BUMP = { General: 0.5, Marshal: 1, "Grand Marshal": 2 };
        const counts = {};
        const speciesTroops = {};
        const leaders = {};
        if (Array.isArray(assigned)) {
          for (let i = 0; i < assigned.length; i++) {
            const s = assigned[i];
            const grade = (s == null ? void 0 : s.grade) || (s == null ? void 0 : s.gr) || "";
            const baseIdx = this.getRankIndexValue((s == null ? void 0 : s.rank) || "E");
            const key = (baseIdx + (GRADE_BUMP[grade] || 0)).toFixed(1);
            counts[key] = (counts[key] || 0) + 1;
            const species = this._getShadowSpeciesKeyDg(s);
            speciesTroops[species] = (speciesTroops[species] || 0) + 1;
            if (grade === "Grand Marshal") {
              leaders[species] = { doctrine: this._getSovereignDoctrine(species, s) };
            }
          }
        }
        let ledOffense = 0;
        let ledDefense = 0;
        for (const [species, led] of Object.entries(leaders)) {
          const d = led.doctrine || {};
          if ((d.casualtyMult || 1) < 1 || d.healBoost) ledDefense += speciesTroops[species] || 0;
          else ledOffense += speciesTroops[species] || 0;
        }
        const intel = {
          ref: assigned,
          counts,
          leaders,
          speciesTroops,
          ledOffense,
          ledDefense,
          total: Array.isArray(assigned) ? assigned.length : 0
        };
        dungeon._warIntel = intel;
        return intel;
      },
      // SOVEREIGN'S COMMAND (frontline): a shadow fighting under its species'
      // fielded Grand Marshal hits harder in the object-simulated skirmish too.
      // Returns { mob, boss } per-hit multipliers for a frontline shadow fighting
      // under its species' sovereign doctrine (both 1 when unled).
      _getShadowLeadershipMult(dungeon, shadow, assigned) {
        var _a, _b;
        try {
          if (((_a = this.settings) == null ? void 0 : _a.gmLeadershipEnabled) === false) return { mob: 1, boss: 1 };
          const intel = this._getWarIntel(dungeon, assigned);
          const led = (_b = intel == null ? void 0 : intel.leaders) == null ? void 0 : _b[this._getShadowSpeciesKeyDg(shadow)];
          if (!led || !led.doctrine) return { mob: 1, boss: 1 };
          const d = led.doctrine;
          const base = 1 + this.clampNumber(Number(d.frontlineDmg) || 0, 0, 1);
          return { mob: base, boss: base * this.clampNumber(Number(d.bossDmgMult) || 1, 1, 2) };
        } catch (_) {
          return { mob: 1, boss: 1 };
        }
      },
      // ── WARFRONT: aggregate army-vs-host battle (O(1) per tick) ────────────────
      // The object-simulated frontline stays small (performanceAliveMobCap); the
      // MASS battle happens here: shadows beyond the frontline's needs grind the
      // gate's war host (dungeon.war.reserves) down arithmetically. Kills flow
      // through _onMobKilled, so XP batching, essence batching, gate-kill credit,
      // and reserve depletion all reuse the existing pipeline. War-scale numbers
      // (thousands of kills a minute for a big army) with zero per-entity cost.
      _processWarfrontTick(channelKey, dungeon, now) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m;
        try {
          if (((_a = this.settings) == null ? void 0 : _a.warfrontEnabled) === false) return;
          if (!dungeon || !dungeon.shadowsDeployed || dungeon.completed || dungeon.failed || dungeon._completing) return;
          if ((((_b = dungeon.boss) == null ? void 0 : _b.hp) || 0) <= 0) return;
          if (dungeon._isDemonCastle) return;
          if (!dungeon.war || !Number.isFinite(dungeon.war.reserves)) {
            const cap = Number((_c = dungeon.mobs) == null ? void 0 : _c.mobCapacity) || 0;
            const killed = Number((_d = dungeon.mobs) == null ? void 0 : _d.killed) || 0;
            dungeon.war = { reserves: Math.max(0, cap - killed), fallen: killed, shadowsFallen: 0 };
          }
          if (dungeon.war.reserves <= 0) return;
          const assigned = this.shadowAllocations.get(channelKey);
          const armySize = Array.isArray(assigned) ? assigned.length : 0;
          const aliveCapRaw = Number((_e = this.settings) == null ? void 0 : _e.performanceAliveMobCap);
          const frontlineNeed = 2 * (Number.isFinite(aliveCapRaw) && aliveCapRaw >= 100 ? aliveCapRaw : 800);
          const surplus = Math.max(0, armySize - frontlineNeed);
          if (surplus <= 0) return;
          const rateRaw = Number((_f = this.settings) == null ? void 0 : _f.warfrontKillRatePerShadow);
          const rate = Number.isFinite(rateRaw) && rateRaw > 0 ? Math.min(rateRaw, 1) : 0.015;
          const intel = this._getWarIntel(dungeon, assigned);
          const hist = intel.counts;
          const hostIdx = this.getRankIndexValue(dungeon.rank);
          let effPower = 0;
          let casualtyWeight = 0;
          const surplusShare = armySize > 0 ? surplus / armySize : 0;
          let rankWeightedSum = 0;
          let engagedCount = 0;
          for (const effIdxKey in hist) {
            const count = hist[effIdxKey] * surplusShare;
            if (!(count > 0)) continue;
            const effIdx = parseFloat(effIdxKey);
            const diff = effIdx - hostIdx;
            effPower += count * this.clampNumber(Math.pow(10, diff), 1e-3, 100);
            casualtyWeight += count * this.clampNumber(Math.pow(10, -diff), 1e-3, 100);
            rankWeightedSum += count * effIdx;
            engagedCount += count;
          }
          const hostFractionRaw = Number((_g = this.settings) == null ? void 0 : _g.warfrontHostFractionPerTick);
          const hostFraction = Number.isFinite(hostFractionRaw) && hostFractionRaw > 0 ? Math.min(hostFractionRaw, 1) : C2.WARFRONT_HOST_FRACTION_PER_TICK || 0.02;
          const capFloorRaw = Number((_h = this.settings) == null ? void 0 : _h.warfrontMaxKillsPerTick);
          const capFloor = Number.isFinite(capFloorRaw) && capFloorRaw >= 100 ? Math.floor(capFloorRaw) : C2.WARFRONT_MIN_KILLS_PER_TICK || 5e3;
          const meanEffRank = engagedCount > 0 ? rankWeightedSum / engagedCount : hostIdx;
          const rankEdge = Math.max(0, meanEffRank - hostIdx);
          const edgeMult = this.clampNumber(
            Math.pow(C2.WARFRONT_CAP_RANK_GROWTH || 1.6, rankEdge),
            1,
            C2.WARFRONT_CAP_RANK_MAX || 8
          );
          const perTickCap = Math.max(
            capFloor,
            Math.floor(dungeon.war.reserves * hostFraction * edgeMult)
          );
          if (dungeon.userParticipating) {
            const bonusRaw = Number((_i = this.settings) == null ? void 0 : _i.userParticipationDamageBonus);
            effPower *= 1 + this.clampNumber(Number.isFinite(bonusRaw) ? bonusRaw : 0.25, 0, 2);
          }
          let doctrine = null;
          if (intel.total > 0 && ((_j = this.settings) == null ? void 0 : _j.gmLeadershipEnabled) !== false) {
            const hostWounded = dungeon.war.reserves < (Number((_k = dungeon.mobs) == null ? void 0 : _k.mobCapacity) || Infinity) * 0.5;
            doctrine = this._combineSovereignDoctrines(dungeon, intel, hostWounded);
            effPower *= doctrine.killMult * (1 + doctrine.executeBonus);
            casualtyWeight *= doctrine.casualtyMult;
          }
          const burnPool = Math.floor(((_l = dungeon.war._doctrine) == null ? void 0 : _l.burnPool) || 0);
          let kills = Math.min(
            dungeon.war.reserves,
            perTickCap,
            Math.floor(effPower * rate) + burnPool
          );
          if (doctrine && doctrine.reflectPct > 0) {
            const provisionalFallen = Math.floor(casualtyWeight * 3e-4);
            kills = Math.min(dungeon.war.reserves, kills + Math.floor(provisionalFallen * doctrine.reflectPct));
          }
          if (kills > 0) {
            this._onMobKilled(channelKey, dungeon, dungeon.rank, kills);
            if (doctrine && doctrine.essenceBonus > 0) {
              dungeon._pendingEssence = (dungeon._pendingEssence || 0) + Math.floor(kills * doctrine.essenceBonus);
            }
          }
          if (dungeon.war._doctrine) {
            dungeon.war._doctrine.burnPool = doctrine ? Math.max(0, Math.floor((kills - burnPool) * doctrine.burnAttrition)) : 0;
          }
          if (doctrine) this._advanceDoctrineState(dungeon, intel, kills);
          const fallen = Math.min(surplus, Math.floor(casualtyWeight * 3e-4));
          if (fallen > 0) {
            dungeon.war.shadowsFallen = (dungeon.war.shadowsFallen || 0) + fallen;
          }
          if (kills <= 0 && fallen <= 0) return;
          if (!dungeon.war._lastReportAt || now - dungeon.war._lastReportAt >= 6e4) {
            dungeon.war._lastReportAt = now;
            const fallen2 = (dungeon.war.fallen || 0).toLocaleString();
            const reserves = dungeon.war.reserves.toLocaleString();
            const lost = (dungeon.war.shadowsFallen || 0).toLocaleString();
            const sovereignCount = Object.keys(intel.leaders || {}).length;
            const led = sovereignCount > 0 ? ` ${sovereignCount} sovereign${sovereignCount > 1 ? "s" : ""} command the field.` : "";
            this.showToast(
              `\u2694 Warfront ${dungeon.name}: ${fallen2} of the host annihilated \u2014 ${reserves} remain. ${lost} shadows fell and rose again.${led}`,
              "info"
            );
          }
        } catch (error) {
          (_m = this.errorLog) == null ? void 0 : _m.call(this, "WARFRONT", "warfront tick failed", error);
        }
      },
      _onMobKilled(channelKey, dungeon, mobRank, killCount = 1) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (!dungeon || typeof dungeon !== "object") return;
        if (!Number.isFinite(killCount) || killCount <= 0) killCount = 1;
        if (!dungeon.mobs || typeof dungeon.mobs !== "object") {
          dungeon.mobs = { killed: 0, remaining: 0, activeMobs: [], total: 0 };
        }
        if (!Number.isFinite(dungeon.mobs.killed)) dungeon.mobs.killed = 0;
        if (!Number.isFinite(dungeon.mobs.remaining)) dungeon.mobs.remaining = 0;
        dungeon.mobs.killed += killCount;
        dungeon.mobs.remaining = Math.max(0, dungeon.mobs.remaining - killCount);
        if (dungeon.war && Number.isFinite(dungeon.war.reserves)) {
          dungeon.war.reserves = Math.max(0, dungeon.war.reserves - killCount);
          dungeon.war.fallen = (dungeon.war.fallen || 0) + killCount;
        }
        if (!this.settings.mobKillNotifications) this.settings.mobKillNotifications = {};
        if (!this.settings.mobKillNotifications[channelKey]) {
          this.settings.mobKillNotifications[channelKey] = { count: 0, lastNotification: Date.now() };
        }
        this.settings.mobKillNotifications[channelKey].count += killCount;
        const xpPerKill = this.calculateMobXP(mobRank, true, dungeon == null ? void 0 : dungeon.rank);
        if (xpPerKill > 0) {
          const totalMobXP = xpPerKill * killCount;
          this._queuePendingDungeonMobXP(channelKey, dungeon, totalMobXP, killCount);
        }
        if (!dungeon._pendingEssence) dungeon._pendingEssence = 0;
        dungeon._pendingEssence += killCount;
        if (dungeon._pendingEssence >= 10) {
          const essenceAmount = dungeon._pendingEssence;
          const resolvedMobRank = mobRank || dungeon.rank || "E";
          const perKill = ((_d = (_c = (_b = (_a = this.shadowArmy) == null ? void 0 : _a.settings) == null ? void 0 : _b.shadowEssence) == null ? void 0 : _c.essencePerMobKill) == null ? void 0 : _d[resolvedMobRank]) || ((_h = (_g = (_f = (_e = this.shadowArmy) == null ? void 0 : _e.defaultSettings) == null ? void 0 : _f.shadowEssence) == null ? void 0 : _g.essencePerMobKill) == null ? void 0 : _h[resolvedMobRank]) || 1;
          const itemVaultEssenceAmount = essenceAmount * perKill;
          dungeon._pendingEssence = 0;
          try {
            if (SLEvents) {
              SLEvents.emit("Dungeons:awardEssence", {
                amount: essenceAmount,
                mobRank: resolvedMobRank,
                source: "mob_kill"
              });
              SLEvents.emit("ItemVault:add", {
                itemId: "shadow_essence",
                amount: itemVaultEssenceAmount,
                source: "Dungeons",
                meta: { mobRank: resolvedMobRank, trigger: "mob_kill" }
              });
            }
          } catch (_) {
          }
        }
        if (dungeon._isDemonCastle) {
          if (this._demonCastle) {
            this._demonCastle.totalDemonSouls = (this._demonCastle.totalDemonSouls || 0) + killCount;
            this._demonCastle.totalDemonsKilled = (this._demonCastle.totalDemonsKilled || 0) + killCount;
          }
          try {
            SLEvents.emit("ItemVault:add", {
              itemId: "demon_soul",
              amount: killCount,
              source: "Dungeons",
              meta: { floor: dungeon._dcFloor }
            });
          } catch (_) {
          }
          if (typeof this._rollDemonCastlePermitDrop === "function") {
            this._rollDemonCastlePermitDrop(dungeon._dcFloor, killCount);
          }
          if (typeof this._checkDemonCastleFloorClear === "function") {
            this._checkDemonCastleFloorClear(channelKey, dungeon);
          }
        }
      },
      _grantUserDungeonXP(amount, source = "dungeon", context = {}) {
        const xpAmount = Math.floor(Number(amount) || 0);
        if (xpAmount <= 0) return false;
        if (!this.soloLevelingStats) return false;
        if (typeof this.soloLevelingStats.addXP === "function") {
          this.soloLevelingStats.addXP(xpAmount, {
            source,
            shareShadowXP: false
          });
          return true;
        }
        this.errorLog(true, "DUNGEON_XP_API_MISSING: SoloLevelingStats.addXP unavailable; XP not granted", {
          source,
          xpAmount,
          ...context
        });
        return false;
      },
      _getOrCreateShadowContributionEntry(dungeon, shadowId) {
        if (!dungeon || shadowId === null || shadowId === void 0) return null;
        const sid = String(shadowId).trim();
        if (!sid) return null;
        if (!dungeon.shadowContributions || typeof dungeon.shadowContributions !== "object") {
          dungeon.shadowContributions = {};
        }
        if (!dungeon.shadowContributions[sid] || typeof dungeon.shadowContributions[sid] !== "object") {
          dungeon.shadowContributions[sid] = { mobsKilled: 0, bossDamage: 0 };
        }
        const entry = dungeon.shadowContributions[sid];
        if (!Number.isFinite(entry.mobsKilled)) entry.mobsKilled = 0;
        if (!Number.isFinite(entry.bossDamage)) entry.bossDamage = 0;
        return entry;
      },
      _addShadowContribution(dungeon, shadowId, field, amount) {
        if (!(Number.isFinite(amount) && amount > 0)) return false;
        if (field !== "mobsKilled" && field !== "bossDamage") return false;
        const entry = this._getOrCreateShadowContributionEntry(dungeon, shadowId);
        if (!entry) return false;
        entry[field] += amount;
        return true;
      },
      _getMobContributionLedger(dungeon, createIfMissing = false) {
        if (!dungeon || typeof dungeon !== "object") return null;
        if (dungeon._mobContributionByMobId && typeof dungeon._mobContributionByMobId === "object" && !Array.isArray(dungeon._mobContributionByMobId)) {
          return dungeon._mobContributionByMobId;
        }
        if (!createIfMissing) return null;
        dungeon._mobContributionByMobId = /* @__PURE__ */ Object.create(null);
        return dungeon._mobContributionByMobId;
      },
      _recordShadowMobDamageContribution(dungeon, mobId, shadowId, damage) {
        if (!(Number.isFinite(damage) && damage > 0)) return false;
        if (!mobId || shadowId === null || shadowId === void 0) return false;
        const sid = String(shadowId).trim();
        if (!sid) return false;
        const ledger = this._getMobContributionLedger(dungeon, true);
        if (!ledger) return false;
        const mid = String(mobId);
        if (!ledger[mid] || typeof ledger[mid] !== "object") {
          ledger[mid] = /* @__PURE__ */ Object.create(null);
        }
        ledger[mid][sid] = (Number(ledger[mid][sid]) || 0) + damage;
        return true;
      },
      _applyMobKillContributionsFromLedger(dungeon, mobId, killCount = 1) {
        if (!mobId || !(Number.isFinite(killCount) && killCount > 0)) return false;
        const ledger = this._getMobContributionLedger(dungeon, false);
        if (!ledger) return false;
        const mid = String(mobId);
        const contributionEntry = ledger[mid];
        if (!contributionEntry || typeof contributionEntry !== "object") return false;
        const contributors = Object.entries(contributionEntry).map(([shadowId, dmg]) => [String(shadowId), Number(dmg)]).filter(([shadowId, dmg]) => shadowId && Number.isFinite(dmg) && dmg > 0);
        delete ledger[mid];
        if (contributors.length === 0) return false;
        const totalDamage = contributors.reduce((sum, [, dmg]) => sum + dmg, 0);
        if (!(totalDamage > 0)) return false;
        for (const [shadowId, damage] of contributors) {
          const killShare = damage / totalDamage * killCount;
          this._addShadowContribution(dungeon, shadowId, "mobsKilled", killShare);
        }
        return true;
      },
      _pruneShadowMobContributionLedger(dungeon) {
        var _a;
        const ledger = this._getMobContributionLedger(dungeon, false);
        if (!ledger) return;
        const activeMobIds = /* @__PURE__ */ new Set();
        const activeMobs = ((_a = dungeon == null ? void 0 : dungeon.mobs) == null ? void 0 : _a.activeMobs) || [];
        for (const mob of activeMobs) {
          if (!mob || mob.hp <= 0) continue;
          const mobId = this.getEnemyKey(mob, "mob");
          mobId && activeMobIds.add(String(mobId));
        }
        let remainingEntries = 0;
        for (const mobId of Object.keys(ledger)) {
          if (!activeMobIds.has(mobId)) {
            delete ledger[mobId];
          } else {
            remainingEntries++;
          }
        }
        if (remainingEntries === 0) {
          delete dungeon._mobContributionByMobId;
        }
      },
      _buildShadowContributionWeights(shadows = []) {
        const normalized = Array.isArray(shadows) ? shadows : [];
        const weights = [];
        let totalWeight = 0;
        for (const shadow of normalized) {
          const shadowId = this.getShadowIdValue(shadow);
          if (!shadowId) continue;
          const score = this.getShadowCombatScore(shadow);
          const weight = Number.isFinite(score) && score > 0 ? score : 1;
          weights.push({ shadowId: String(shadowId), weight });
          totalWeight += weight;
        }
        return { weights, totalWeight };
      },
      _distributeWeightedShadowContribution(dungeon, weights, totalWeight, field, totalAmount) {
        if (!(Number.isFinite(totalAmount) && totalAmount > 0)) return false;
        if (!Array.isArray(weights) || weights.length === 0) return false;
        const safeTotalWeight = Number.isFinite(totalWeight) && totalWeight > 0 ? totalWeight : weights.length;
        for (const entry of weights) {
          if (!entry || !entry.shadowId) continue;
          const weight = Number.isFinite(entry.weight) && entry.weight > 0 ? entry.weight : 1;
          const share = totalAmount * (weight / safeTotalWeight);
          this._addShadowContribution(dungeon, entry.shadowId, field, share);
        }
        return true;
      },
      _applyFallbackMobKillContribution(dungeon, assignedShadows = [], fallbackShadowId = null, killCount = 1) {
        const safeKillCount = Number.isFinite(killCount) && killCount > 0 ? Math.floor(killCount) : 1;
        if (fallbackShadowId && this._addShadowContribution(dungeon, fallbackShadowId, "mobsKilled", safeKillCount)) {
          return true;
        }
        const { weights, totalWeight } = this._buildShadowContributionWeights(assignedShadows);
        return this._distributeWeightedShadowContribution(
          dungeon,
          weights,
          totalWeight,
          "mobsKilled",
          safeKillCount
        );
      },
      _logMobContributionMiss(channelKey, mobId, extra = null) {
        const logKey = String(channelKey || "unknown");
        const now = Date.now();
        const cooldownMs = 15e3;
        const state = this._mobContributionMissLogState.get(logKey) || { lastAt: 0, suppressed: 0 };
        if (now - state.lastAt < cooldownMs) {
          state.suppressed += 1;
          this._mobContributionMissLogState.set(logKey, state);
          return;
        }
        this._mobContributionMissLogState.set(logKey, { lastAt: now, suppressed: 0 });
        this.errorLog(
          true,
          "MOB_CONTRIBUTION_MISS: Missing shadow damage attribution for mob kill",
          {
            channelKey,
            mobId,
            suppressedSinceLast: state.suppressed || 0,
            ...extra && typeof extra === "object" ? extra : {}
          }
        );
      },
      _getDungeonShadowCombatContext(channelKey, dungeon) {
        var _a;
        const assignedShadows = this.shadowAllocations.get(channelKey) || ((_a = dungeon.shadowAllocation) == null ? void 0 : _a.shadows) || [];
        const shadowHP = dungeon.shadowHP || (dungeon.shadowHP = /* @__PURE__ */ new Map());
        const deadShadows = this.deadShadows.get(channelKey) || /* @__PURE__ */ new Set();
        this.maybePruneDungeonShadowState({ dungeon, channelKey, assignedShadows, deadShadows });
        return { assignedShadows, shadowHP, deadShadows };
      },
      async _applyAccumulatedShadowAndUserDamage({
        shadowDamageMap,
        assignedShadows,
        shadowHP,
        deadShadows,
        channelKey,
        totalUserDamage,
        dungeon,
        userDamageToast = null,
        shadowByIdMap = null,
        // Optional pre-built Map for O(1) lookup (avoids O(N) .find per entry)
        damageAlreadyApplied = false
        // When true, HP already deducted (per-round processing); skip Phase 1 damage, only collect deaths
      }) {
        const shadowById = shadowByIdMap || new Map(
          assignedShadows.map((s) => [this.getShadowIdValue(s), s])
        );
        const newlyDead = [];
        for (const [shadowId, damage] of shadowDamageMap.entries()) {
          const targetShadow = shadowById.get(shadowId);
          const shadowHPData = shadowHP.get(shadowId);
          if (!targetShadow || !shadowHPData) continue;
          if (damageAlreadyApplied) {
            if (shadowHPData.hp <= 0) {
              newlyDead.push({ shadowId, targetShadow, shadowHPData });
            }
          } else {
            const oldHP = shadowHPData.hp;
            shadowHPData.hp = Math.max(0, shadowHPData.hp - damage);
            shadowHP.set(shadowId, shadowHPData);
            if (oldHP > 0 && shadowHPData.hp <= 0) {
              newlyDead.push({ shadowId, targetShadow, shadowHPData });
            }
          }
        }
        if (newlyDead.length > 0 && this.soloLevelingStats) {
          if (!(dungeon._lastResurrectionAttempt instanceof Map)) dungeon._lastResurrectionAttempt = /* @__PURE__ */ new Map();
          const now = Date.now();
          if (this._tickManaBudgetPerDungeon === void 0) {
            this.syncManaFromStats();
          }
          let manaPool = this._tickManaBudgetPerDungeon !== void 0 ? this._tickManaBudgetPerDungeon - (dungeon._tickManaUsed || 0) : this.settings.userMana || 0;
          const { getRankIndex } = require_rank_utils();
          newlyDead.sort((a, b) => getRankIndex(b.targetShadow.rank) - getRankIndex(a.targetShadow.rank));
          let resurrectedCount = 0;
          for (const { shadowId, targetShadow, shadowHPData } of newlyDead) {
            dungeon._lastResurrectionAttempt.set(shadowId, now);
            const cost = this.getResurrectionCost(targetShadow.rank || "E");
            if (manaPool >= cost) {
              manaPool -= cost;
              resurrectedCount++;
              if (!shadowHPData.maxHp || shadowHPData.maxHp <= 0) {
                const recalculatedHP = this.initializeShadowHPSync(targetShadow, shadowHP);
                if (recalculatedHP) shadowHPData.maxHp = recalculatedHP.maxHp;
              }
              shadowHPData.hp = shadowHPData.maxHp || 1;
              shadowHP.set(shadowId, { ...shadowHPData });
              deadShadows.delete(shadowId);
              dungeon._lastResurrectionAttempt.delete(shadowId);
            }
          }
          if (resurrectedCount > 0) {
            if (this._tickManaBudgetPerDungeon !== void 0) {
              const totalSpent = this._tickManaBudgetPerDungeon - (dungeon._tickManaUsed || 0) - manaPool;
              dungeon._tickManaUsed = (dungeon._tickManaUsed || 0) + Math.max(0, totalSpent);
            } else {
              this.settings.userMana = Math.max(0, manaPool);
              this.pushManaToStats(false);
            }
            dungeon.shadowRevives = (dungeon.shadowRevives || 0) + resurrectedCount;
            dungeon.successfulResurrections = (dungeon.successfulResurrections || 0) + resurrectedCount;
            this.markCombatSettingsDirty("batch-resurrection");
            this.startRegeneration();
          }
          if (dungeon._cachedAliveCount != null) {
            dungeon._cachedAliveCount = Math.max(0, dungeon._cachedAliveCount - newlyDead.length + resurrectedCount);
          }
        }
        if (totalUserDamage > 0) {
          const adjustedUserDamage = this.applyStatusAdjustedIncomingDamage(
            channelKey,
            "user",
            "user",
            totalUserDamage,
            Date.now()
          );
          this.syncHPFromStats();
          this.settings.userHP = this._applyUserHpFloor(this.settings.userHP - adjustedUserDamage);
          this.pushHPToStats(true);
          this.updateStatsUI();
          this.startRegeneration();
          if (userDamageToast && dungeon.userParticipating) {
            this.showToast(userDamageToast(adjustedUserDamage), "error");
          }
          if (this.settings.userHP <= 0) {
            await this.handleUserDefeat(channelKey);
          }
        }
      },
      _createBossHPBarInPreferredContainer(channelKey) {
        const channelHeader = this.findChannelHeader();
        if (channelHeader) {
          const headerContainer = channelHeader.parentElement || channelHeader;
          if (headerContainer.isConnected) {
            this.createBossHPBarInContainer(headerContainer, channelKey);
          }
        }
        let hpBar = this.bossHPBars.get(channelKey);
        if (!hpBar) {
          const channelContainer = this.findChannelContainer();
          if (channelContainer && channelContainer.isConnected) {
            this.createBossHPBarInContainer(channelContainer, channelKey);
            hpBar = this.bossHPBars.get(channelKey);
          }
        }
        return hpBar || null;
      }
    };
  }
});

// src/shared/safe-numbers.js
var require_safe_numbers = __commonJS({
  "src/shared/safe-numbers.js"(exports2, module2) {
    var STAT_KEYS = Object.freeze(["strength", "agility", "intelligence", "vitality", "perception"]);
    function safeNumber(value, fallback = 0) {
      const n = Number(value);
      return Number.isFinite(n) ? n : fallback;
    }
    function clampNumber(value, min, max) {
      const n = safeNumber(value, min);
      return Math.max(min, Math.min(max, n));
    }
    function createZeroStatBlock() {
      return { strength: 0, agility: 0, intelligence: 0, vitality: 0, perception: 0 };
    }
    module2.exports = { safeNumber, clampNumber, createZeroStatBlock, STAT_KEYS };
  }
});

// src/Dungeons/combat-primitives.js
var require_combat_primitives = __commonJS({
  "src/Dungeons/combat-primitives.js"(exports2, module2) {
    var C2 = require_constants();
    module2.exports = {
      calculateHPSync(vitality, rank = "E") {
        const safeVitalityRaw = Number(vitality);
        const safeVitality = Number.isFinite(safeVitalityRaw) ? Math.max(0, safeVitalityRaw) : 0;
        const rankIndex = this.getRankIndexValue(rank);
        const rankHpBonus = this.getUserRankHpBonusByIndex(rankIndex);
        return 100 + safeVitality * 10 + rankHpBonus;
      },
      getUserRankHpBonusByIndex(rankIndex) {
        var _a, _b;
        const safeRankIndex = Number.isFinite(rankIndex) ? Math.max(0, rankIndex) : 0;
        const linearStep = Number.isFinite((_a = this.settings) == null ? void 0 : _a.userRankHpLinearStep) ? this.settings.userRankHpLinearStep : 50;
        const curveStep = Number.isFinite((_b = this.settings) == null ? void 0 : _b.userRankHpCurveStep) ? this.settings.userRankHpCurveStep : 35;
        return Math.max(0, Math.floor(safeRankIndex * linearStep + safeRankIndex * safeRankIndex * curveStep));
      },
      calculateShadowArmyHpBonus(shadowCount, rank = "E") {
        var _a, _b, _c, _d;
        const safeShadowCountRaw = Number(shadowCount);
        const safeShadowCount = Number.isFinite(safeShadowCountRaw) ? Math.max(0, Math.floor(safeShadowCountRaw)) : 0;
        if (safeShadowCount <= 0) return 0;
        const rankIndex = this.getRankIndexValue(rank);
        const perShadowBase = Number.isFinite((_a = this.settings) == null ? void 0 : _a.userHpPerShadowBase) ? this.settings.userHpPerShadowBase : 8;
        const perShadowRankStep = Number.isFinite((_b = this.settings) == null ? void 0 : _b.userHpPerShadowRankStep) ? this.settings.userHpPerShadowRankStep : 0.6;
        const perShadowValue = Math.max(0, perShadowBase + rankIndex * perShadowRankStep);
        const softCapCount = Number.isFinite((_c = this.settings) == null ? void 0 : _c.userHpShadowSoftCapCount) ? Math.max(0, Math.floor(this.settings.userHpShadowSoftCapCount)) : 500;
        const tailMultiplier = Number.isFinite((_d = this.settings) == null ? void 0 : _d.userHpShadowSoftCapMultiplier) ? this.clampNumber(this.settings.userHpShadowSoftCapMultiplier, 0, 1) : 0.12;
        const primaryCount = Math.min(safeShadowCount, softCapCount);
        const overflowCount = Math.max(0, safeShadowCount - softCapCount);
        const primaryBonus = primaryCount * perShadowValue;
        const overflowBonus = overflowCount * perShadowValue * tailMultiplier;
        return Math.max(0, Math.floor(primaryBonus + overflowBonus));
      },
      async calculateHP(vitality, rank = "E", includeShadowBonus = false) {
        const baseHP = this.calculateHPSync(vitality, rank);
        if (includeShadowBonus) {
          const shadowCount = await this.getShadowCount();
          const shadowArmyBonus = this.calculateShadowArmyHpBonus(shadowCount, rank);
          return baseHP + shadowArmyBonus;
        }
        return baseHP;
      },
      async calculateMana(intelligence, flatMana = 0) {
        const safeIntelligence = Number(intelligence) || 0;
        const safeFlatMana = Math.max(0, Number(flatMana) || 0);
        return 100 + safeIntelligence * 10 + safeFlatMana;
      },
      async recalculateUserHP() {
        var _a;
        if (!this.soloLevelingStats) return;
        this.syncHPFromStats();
        const totalStats = this.getUserEffectiveStats();
        const vitality = totalStats.vitality || 0;
        const rank = ((_a = this.soloLevelingStats.settings) == null ? void 0 : _a.rank) || "E";
        await this.getShadowCount();
        const oldMaxHP = this.settings.userMaxHP || 0;
        this.settings.userMaxHP = await this.calculateHP(vitality, rank, true);
        if (this.settings.userMaxHP > oldMaxHP) {
          const hpIncrease = this.settings.userMaxHP - oldMaxHP;
          this.settings.userHP = Math.min(
            this.settings.userMaxHP,
            (this.settings.userHP || 0) + hpIncrease
          );
        }
        this.pushHPToStats(true);
        this.updateStatsUI();
      },
      // SHADOW MONARCH PERK (immortality, player-exclusive): the Shadow Monarch cannot
      // die. No damage source may drive HP below 1 — it never hits zero, so the
      // `userHP <= 0` defeat checks never fire. Every other rank keeps a floor of 0 and
      // normal death rules apply. All user-damage sinks (boss hits, mob hits, DoT) route
      // their post-damage HP through this instead of a hard `Math.max(0, ...)`.
      _applyUserHpFloor(proposedHp) {
        var _a, _b;
        const floor = ((_b = (_a = this.soloLevelingStats) == null ? void 0 : _a.settings) == null ? void 0 : _b.rank) === "Shadow Monarch" ? 1 : 0;
        return Math.max(floor, proposedHp);
      },
      async recalculateUserMana() {
        if (!this.soloLevelingStats) return;
        this.syncManaFromStats();
        const totalStats = this.getUserEffectiveStats();
        const intelligence = totalStats.intelligence || 0;
        const oldMaxMana = this.settings.userMaxMana || 0;
        let newMaxMana;
        if (this.soloLevelingStats && typeof this.soloLevelingStats.calculateMana === "function") {
          newMaxMana = this.soloLevelingStats.calculateMana(intelligence);
        } else {
          newMaxMana = await this.calculateMana(intelligence, 0);
        }
        this.settings.userMaxMana = newMaxMana;
        if (this.settings.userMaxMana > oldMaxMana) {
          const manaIncrease = this.settings.userMaxMana - oldMaxMana;
          this.settings.userMana = Math.min(
            this.settings.userMaxMana,
            (this.settings.userMana || 0) + manaIncrease
          );
        } else {
          this.settings.userMana = Math.min(this.settings.userMaxMana, this.settings.userMana || 0);
        }
        this.pushManaToStats(true);
        this.updateStatsUI();
        this.saveSettings();
      },
      calculateBossBaseStats(rankIndex) {
        const mobBase = this.calculateMobBaseStats(rankIndex);
        const multiplier = 2.2 + Math.random() * 0.8;
        const strength = Math.floor(mobBase.strength * multiplier);
        const agility = Math.floor(mobBase.agility * multiplier);
        const intelligence = Math.floor(mobBase.intelligence * multiplier);
        const vitality = Math.floor(mobBase.vitality * multiplier);
        const avgCore = (mobBase.strength + mobBase.agility + mobBase.intelligence) / 3;
        const perception = Math.floor(avgCore * multiplier * 0.5);
        return { strength, agility, intelligence, vitality, perception };
      },
      /**
       * Boss HP for a given rank. IMPLEMENTED 2026-07-30 — this method was
       * CALLED by story-mode-core (`this.calculateBossHP?.(rank, shadowCount)`)
       * but never existed anywhere in the codebase, so the optional-call always
       * returned undefined and Demon Castle bosses fell through to a flat 50000
       * HP. They have never rank-scaled.
       *
       * Mirrors the normal-dungeon formula in spawn-core.js (base + vitality*10 +
       * rank bonus, times the static rank multiplier and the army multiplier) so
       * story bosses scale on the same curve as everything else.
       *
       * `shadowCount` is accepted because the existing call site passes it, but
       * is deliberately NOT used as a multiplier: army size reaches 281k here, and
       * scaling boss HP by it would produce absurd values. Army pressure is
       * already represented by BOSS_HP_ARMY_MULTIPLIER.
       *
       * Floored at the historical 50000 so no existing floor gets EASIER than it
       * is today — this can only raise high-rank bosses, never nerf anything.
       */
      calculateBossHP(rank, shadowCount = 0) {
        var _a, _b, _c;
        const rankList = ((_a = this.getDungeonRankList) == null ? void 0 : _a.call(this)) || [];
        const idx = rankList.indexOf(rank);
        const rankIndex = idx >= 0 ? idx : 0;
        const base = this.calculateBossBaseStats(rankIndex);
        const vitality = Number(base == null ? void 0 : base.vitality) || 0;
        const rankBonus = ((_b = this._bossHPBonusTable) == null ? void 0 : _b[rankIndex]) || 0;
        const staticMult = ((_c = this.getStaticBossHpMultiplier) == null ? void 0 : _c.call(this, rankIndex)) ?? 1;
        const armyMult = C2.BOSS_HP_ARMY_MULTIPLIER || 8;
        const hp = Math.floor((100 + vitality * 10 + rankBonus) * staticMult * armyMult);
        return Math.max(5e4, Number.isFinite(hp) ? hp : 5e4);
      },
      calculateMobBaseStats(rankIndex) {
        var _a, _b;
        const i = Math.min(rankIndex, (((_b = (_a = this._mobStatTable) == null ? void 0 : _a.strength) == null ? void 0 : _b.length) || 12) - 1);
        if (this._mobStatTable) {
          return {
            strength: this._mobStatTable.strength[i],
            agility: this._mobStatTable.agility[i],
            intelligence: this._mobStatTable.intelligence[i],
            vitality: this._mobStatTable.vitality[i]
          };
        }
        return {
          strength: 100 + rankIndex * 50 + Math.floor(rankIndex * rankIndex * 15),
          agility: 80 + rankIndex * 40 + Math.floor(rankIndex * rankIndex * 12),
          intelligence: 60 + rankIndex * 30 + Math.floor(rankIndex * rankIndex * 8),
          vitality: 150 + rankIndex * 100 + Math.floor(rankIndex * rankIndex * 40)
        };
      },
      startRegeneration() {
        if (this.regenInterval) {
          this.debugLog("\u23F0 Regeneration interval already running");
          return;
        }
        this.debugLog("\u23F0 Regeneration interval started (auto-pauses when full)");
        this.regenInterval = setInterval(() => {
          if (!this.isWindowVisible()) return;
          this.regenerateHPAndMana();
        }, 3e3);
        this._intervals.add(this.regenInterval);
      },
      stopRegeneration() {
        if (this.regenInterval) {
          clearInterval(this.regenInterval);
          this.regenInterval = null;
          this._regenDebugShown = false;
          this.debugLog("\u23F8\uFE0F Regeneration paused (HP & Mana full)");
        }
      },
      _hasActiveDungeonCombat() {
        var _a, _b, _c, _d;
        if (!this.activeDungeons || this.activeDungeons.size === 0) return false;
        for (const dungeon of this.activeDungeons.values()) {
          if (!dungeon || dungeon.completed || dungeon.failed || !dungeon.shadowsDeployed) continue;
          const bossAlive = (((_a = dungeon == null ? void 0 : dungeon.boss) == null ? void 0 : _a.hp) || 0) > 0;
          const mobsRemaining = Number.isFinite((_b = dungeon == null ? void 0 : dungeon.mobs) == null ? void 0 : _b.remaining) ? dungeon.mobs.remaining : ((_d = (_c = dungeon == null ? void 0 : dungeon.mobs) == null ? void 0 : _c.activeMobs) == null ? void 0 : _d.length) || 0;
          if (bossAlive || mobsRemaining > 0) return true;
        }
        return false;
      },
      regenerateHPAndMana() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
        if (!this.soloLevelingStats) {
          this.debugLogOnce(
            "REGEN_SKIPPED:NO_STATS",
            "Regeneration skipped: SoloLevelingStats plugin not available"
          );
          return;
        }
        this.syncHPAndManaFromStats();
        const totalStats = this.getUserEffectiveStats();
        const vitality = totalStats.vitality || 0;
        const intelligence = totalStats.intelligence || 0;
        const level = ((_b = (_a = this.soloLevelingStats) == null ? void 0 : _a.settings) == null ? void 0 : _b.level) || 1;
        if (!this._regenDebugShown) {
          this.debugLog("Regeneration system active", {
            level,
            vitality,
            intelligence,
            currentHP: this.settings.userHP,
            maxHP: this.settings.userMaxHP,
            currentMana: this.settings.userMana,
            maxMana: this.settings.userMaxMana
          });
          this._regenDebugShown = true;
        }
        if (typeof this.settings.userHP !== "number" || isNaN(this.settings.userHP)) {
          this.settings.userHP = this.settings.userMaxHP || 100;
        }
        if (typeof this.settings.userMana !== "number" || isNaN(this.settings.userMana)) {
          this.settings.userMana = this.settings.userMaxMana || 100;
        }
        if (typeof this.settings.userMaxHP !== "number" || isNaN(this.settings.userMaxHP) || this.settings.userMaxHP <= 0) {
          this.settings.userMaxHP = 100;
        }
        if (typeof this.settings.userMaxMana !== "number" || isNaN(this.settings.userMaxMana) || this.settings.userMaxMana <= 0) {
          this.settings.userMaxMana = 100;
        }
        let hpChanged = false;
        let manaChanged = false;
        const skillBonuses = ((_c = this.getSkillTreeBonuses) == null ? void 0 : _c.call(this)) || {};
        const isShadowMonarch = ((_e = (_d = this.soloLevelingStats) == null ? void 0 : _d.settings) == null ? void 0 : _e.rank) === "Shadow Monarch";
        let smRegenMult = 1;
        if (isShadowMonarch) {
          let inCombat = false;
          if (((_f = this.activeDungeons) == null ? void 0 : _f.size) > 0) {
            for (const [, dg] of this.activeDungeons) {
              if (dg == null ? void 0 : dg.userParticipating) {
                inCombat = true;
                break;
              }
            }
          }
          if (!inCombat) {
            this.settings.userHP = this.settings.userMaxHP;
            this.settings.userMana = this.settings.userMaxMana;
            (_g = this.pushHPToStats) == null ? void 0 : _g.call(this, true);
            (_h = this.pushManaToStats) == null ? void 0 : _h.call(this, true);
            (_i = this.updateStatsUI) == null ? void 0 : _i.call(this);
            this.stopRegeneration();
            return;
          }
          smRegenMult = 2;
        }
        const hpRegenMultiplier = (1 + Math.max(0, Number(skillBonuses.hpRegenBonus || 0))) * smRegenMult;
        const manaRegenMultiplier = (1 + Math.max(0, Number(skillBonuses.manaRegenBonus || 0))) * smRegenMult;
        const needsHPRegen = this.settings.userHP < this.settings.userMaxHP;
        const needsManaRegen = this.settings.userMana < this.settings.userMaxMana;
        if (!needsHPRegen && !needsManaRegen) {
          this.stopRegeneration();
          return;
        }
        if (needsHPRegen) {
          const baseRate = 5e-3;
          const statRate = vitality / 50 * 5e-3;
          const levelRate = level / 10 * 2e-3;
          const totalRate = (baseRate + statRate + levelRate) * hpRegenMultiplier;
          let hpRegen = Math.max(1, Math.floor(this.settings.userMaxHP * totalRate));
          if (typeof this.getEntityHealReductionMultiplier === "function" && ((_j = this.activeDungeons) == null ? void 0 : _j.size) > 0) {
            for (const [ck, dg] of this.activeDungeons) {
              if (!(dg == null ? void 0 : dg.userParticipating)) continue;
              const healMult = this.getEntityHealReductionMultiplier(ck, "user", "user");
              if (healMult < 1) {
                hpRegen = Math.max(1, Math.floor(hpRegen * healMult));
                break;
              }
            }
          }
          const oldHP = this.settings.userHP;
          this.settings.userHP = Math.min(this.settings.userMaxHP, this.settings.userHP + hpRegen);
          if (!this._hpRegenCount) this._hpRegenCount = 0;
          if (this._hpRegenCount < 3 && this.settings.userHP !== oldHP) {
            this.debugLog(
              `HP Regen: +${hpRegen}/3s tick (${(totalRate * 100).toFixed(2)}% rate) | ${oldHP} -> ${this.settings.userHP} / ${this.settings.userMaxHP}`
            );
            this._hpRegenCount++;
          }
          hpChanged = this.settings.userHP !== oldHP;
          if (hpChanged) {
            this.pushHPToStats(false);
          }
          if (!this._hpRegenActive) {
            this._hpRegenActive = true;
          }
          if (this.settings.userHP >= this.settings.userMaxHP && this._hpRegenActive) {
            this._hpRegenActive = false;
          }
        } else {
          this._hpRegenActive = false;
        }
        if (needsManaRegen) {
          const inCombat = this._hasActiveDungeonCombat();
          const baseRate = inCombat ? 15e-4 : 8e-3;
          const statRate = inCombat ? Math.sqrt(intelligence) / 18 * 15e-4 : Math.sqrt(intelligence) / 12 * 7e-3;
          const levelRate = inCombat ? level / 20 * 5e-4 : level / 10 * 3e-3;
          const capRate = inCombat ? 0.02 : 0.1;
          const totalRate = Math.min(capRate, (baseRate + statRate + levelRate) * manaRegenMultiplier);
          const manaRegen = Math.max(1, Math.floor(this.settings.userMaxMana * totalRate));
          const oldMana = this.settings.userMana;
          this.settings.userMana = Math.min(
            this.settings.userMaxMana,
            this.settings.userMana + manaRegen
          );
          if (!this._manaRegenCount) this._manaRegenCount = 0;
          if (this._manaRegenCount < 3 && this.settings.userMana !== oldMana) {
            this.debugLog(
              `Mana Regen: +${manaRegen}/3s tick (${(totalRate * 100).toFixed(2)}% rate) | ${oldMana} -> ${this.settings.userMana} / ${this.settings.userMaxMana}`
            );
            this._manaRegenCount++;
          }
          manaChanged = this.settings.userMana !== oldMana;
          if (manaChanged) {
            this.pushManaToStats(false);
            this.updateStatsUI();
          }
          if (!this._manaRegenActive) this._manaRegenActive = true;
          if (this.settings.userMana >= this.settings.userMaxMana && this._manaRegenActive) {
            this._manaRegenActive = false;
          }
        } else {
          this._manaRegenActive = false;
        }
        if (hpChanged || manaChanged) {
          this.markCombatSettingsDirty("regen");
        }
        if (hpChanged || manaChanged) {
          if (!this._regenCycleCount) this._regenCycleCount = 0;
          this._regenCycleCount++;
          if (this._regenCycleCount >= 30) {
            if (typeof ((_k = this.soloLevelingStats) == null ? void 0 : _k.saveSettings) === "function") {
              this.soloLevelingStats.saveSettings();
            }
            this._regenCycleCount = 0;
          }
        }
      },
      async handleUserDefeat(channelKey) {
        var _a, _b, _c, _d;
        this.syncHPFromStats();
        if (this.settings.userHP > 0) {
          this.debugLog("DEFEAT_CHECK", "Defeat triggered but HP > 0, ignoring", {
            userHP: this.settings.userHP,
            userMaxHP: this.settings.userMaxHP,
            channelKey
          });
          return;
        }
        const dungeon = this.activeDungeons.get(channelKey);
        let shadowsWereAlive = false;
        if (dungeon) {
          const shadowHP = dungeon.shadowHP instanceof Map ? dungeon.shadowHP : /* @__PURE__ */ new Map();
          const deadShadows = this.deadShadows.get(channelKey) || /* @__PURE__ */ new Set();
          for (const [id, hpData] of shadowHP) {
            if (deadShadows.has(id)) continue;
            if ((hpData == null ? void 0 : hpData.hp) > 0) {
              shadowsWereAlive = true;
              break;
            }
          }
        }
        this.showToast("You were defeated!", "error");
        if (dungeon) {
          dungeon.userParticipating = false;
          if (dungeon.activeDots) dungeon.activeDots = {};
          const forfeited = Math.max(0, Math.floor(Number(dungeon.pendingUserMobXP) || 0));
          if (forfeited > 0) {
            dungeon.pendingUserMobXP = 0;
            dungeon.pendingUserMobKills = 0;
            const batchKey = dungeon._xpBatchKey;
            if (batchKey) {
              (_a = this._pendingDungeonMobXPByBatch) == null ? void 0 : _a.delete(batchKey);
              (_b = this._pendingDungeonMobKillsByBatch) == null ? void 0 : _b.delete(batchKey);
            }
            (_c = this.debugLog) == null ? void 0 : _c.call(this, "XP", `Death penalty: forfeited ${forfeited} unbanked dungeon XP`);
            (_d = this.showToast) == null ? void 0 : _d.call(this, `Defeated \u2014 ${forfeited.toLocaleString()} unclaimed XP lost.`, "error");
          }
        }
        this.settings.userActiveDungeon = null;
        if (shadowsWereAlive) {
          this.showToast("All shadows defeated. Rejoin when HP regenerates.", "info");
        }
        this.saveSettings();
      },
      getUserStats() {
        var _a, _b, _c;
        if (!((_a = this.soloLevelingStats) == null ? void 0 : _a.settings)) return null;
        return {
          stats: ((_c = (_b = this.soloLevelingStats).getTotalEffectiveStats) == null ? void 0 : _c.call(_b)) || this.soloLevelingStats.settings.stats || {},
          rank: this.soloLevelingStats.settings.rank || "E",
          level: this.soloLevelingStats.settings.level || 1,
          hp: this.soloLevelingStats.settings.userHP,
          maxHP: this.soloLevelingStats.settings.userMaxHP,
          mana: this.soloLevelingStats.settings.userMana,
          maxMana: this.soloLevelingStats.settings.userMaxMana
        };
      },
      getUserEffectiveStats() {
        var _a, _b, _c, _d, _e;
        const now = Date.now();
        if (this._cache.userEffectiveStats && this._cache.userEffectiveStatsTime && now - this._cache.userEffectiveStatsTime < this._cache.userEffectiveStatsTTL) {
          return this._cache.userEffectiveStats;
        }
        const result = ((_b = (_a = this.soloLevelingStats) == null ? void 0 : _a.getTotalEffectiveStats) == null ? void 0 : _b.call(_a)) || ((_d = (_c = this.soloLevelingStats) == null ? void 0 : _c.settings) == null ? void 0 : _d.stats) || ((_e = this.getUserStats()) == null ? void 0 : _e.stats) || {};
        this._cache.userEffectiveStats = result;
        this._cache.userEffectiveStatsTime = now;
        return result;
      },
      getShadowIdValue(shadow) {
        return (shadow == null ? void 0 : shadow.id) || (shadow == null ? void 0 : shadow.i) || null;
      },
      normalizeShadowId(shadow) {
        if (!shadow) return null;
        const stableId = this.getShadowIdValue(shadow);
        return stableId && !shadow.id ? { ...shadow, id: stableId } : shadow;
      },
      clampNumber(value, min, max) {
        return Math.max(min, Math.min(max, value));
      },
      _clampStat(value, min, max, label) {
        const clamped = Math.max(min, Math.min(max, value));
        if (clamped !== value && this.settings.debug) {
          this.debugLog("CLAMP", `Clamped ${label}: ${value} -> ${clamped}`);
        }
        return clamped;
      },
      normalizeRankLabel(rank, rankArray = ((_a) => (_a = this.settings) == null ? void 0 : _a.dungeonRanks)()) {
        const list = Array.isArray(rankArray) && rankArray.length ? rankArray : ["E"];
        if (rank == null) return list[0] || "E";
        const raw = String(rank).trim();
        if (!raw) return list[0] || "E";
        const normalizeKey = (value) => String(value || "").toLowerCase().replace(/[\s_-]+/g, " ").trim();
        const cacheKey = `${list.length}|${list.join(",")}`;
        if (this._normalizeRankCacheKey !== cacheKey) {
          this._normalizeRankCacheKey = cacheKey;
          this._normalizeRankCache = new Map(
            list.map((entry) => [normalizeKey(entry), String(entry)])
          );
        }
        const canonicalByNormalized = this._normalizeRankCache;
        const tryResolve = (candidate) => {
          const value = String(candidate || "").trim();
          if (!value) return null;
          if (list.includes(value)) return value;
          const normalizedMatch = canonicalByNormalized.get(normalizeKey(value));
          if (normalizedMatch) return normalizedMatch;
          const stripped = value.replace(/^\[+|\]+$/g, "").trim();
          if (!stripped) return null;
          if (list.includes(stripped)) return stripped;
          const strippedMatch = canonicalByNormalized.get(normalizeKey(stripped));
          if (strippedMatch) return strippedMatch;
          const upper = stripped.toUpperCase();
          if (list.includes(upper)) return upper;
          return canonicalByNormalized.get(normalizeKey(upper)) || null;
        };
        const candidates = [raw];
        const bracketMatch = raw.match(/\[([^[\]]+)\]/);
        (bracketMatch == null ? void 0 : bracketMatch[1]) && candidates.push(bracketMatch[1]);
        const rankSuffixMatch = raw.match(/([A-Za-z0-9+\s]+)\s*-?\s*rank/i);
        (rankSuffixMatch == null ? void 0 : rankSuffixMatch[1]) && candidates.push(rankSuffixMatch[1]);
        const firstToken = raw.split(/\s+/)[0];
        firstToken && candidates.push(firstToken);
        for (let i = 0; i < candidates.length; i++) {
          const resolved = tryResolve(candidates[i]);
          if (resolved) return resolved;
        }
        return null;
      },
      findRankIndex(rank, rankArray = ((_b) => (_b = this.settings) == null ? void 0 : _b.dungeonRanks)()) {
        const list = Array.isArray(rankArray) && rankArray.length ? rankArray : ["E"];
        const canonical = this.normalizeRankLabel(rank, list);
        return canonical ? list.indexOf(canonical) : -1;
      },
      getRankIndexValue(rank, rankArray = ((_c) => (_c = this.settings) == null ? void 0 : _c.dungeonRanks)()) {
        const idx = this.findRankIndex(rank, rankArray);
        return idx >= 0 ? idx : 0;
      },
      getRankPowerValue(rank) {
        var _a, _b;
        const step = ((_a = this.rankScaling) == null ? void 0 : _a.powerStep) ?? 1.35;
        const list = Array.isArray((_b = this.settings) == null ? void 0 : _b.dungeonRanks) ? this.settings.dungeonRanks : ["E"];
        const key = `${step}|${list.join(",")}`;
        if (this._rankPowerCacheKey !== key) {
          this._rankPowerCacheKey = key;
          this._rankPowerCache = /* @__PURE__ */ new Map();
        }
        const cacheKey = this.normalizeRankLabel(rank, list) || list[0] || "E";
        const cached = this._rankPowerCache.get(cacheKey);
        if (cached !== void 0) return cached;
        const computed = Math.pow(step, this.getRankIndexValue(cacheKey, list));
        this._rankPowerCache.set(cacheKey, computed);
        return computed;
      },
      getShadowCombatScore(shadow) {
        const stats = this.getShadowEffectiveStatsCached(shadow) || {};
        const sum = (stats.strength || 0) * 1 + (stats.intelligence || 0) * 0.8 + (stats.agility || 0) * 0.5 + (stats.vitality || 0) * 0.6 + (stats.perception || 0) * 0.2;
        return this.getRankPowerValue((shadow == null ? void 0 : shadow.rank) || "E") * (10 + sum);
      },
      getRankDamageMultiplier(attackerRank, defenderRank) {
        var _a, _b, _c, _d, _e;
        const exponent = ((_a = this.rankScaling) == null ? void 0 : _a.damageExponent) ?? 0.85;
        const min = ((_b = this.rankScaling) == null ? void 0 : _b.damageMin) ?? 0.35;
        const max = ((_c = this.rankScaling) == null ? void 0 : _c.damageMax) ?? 8;
        const list = Array.isArray((_d = this.settings) == null ? void 0 : _d.dungeonRanks) ? this.settings.dungeonRanks : ["E"];
        const key = `${exponent}|${min}|${max}|${((_e = this.rankScaling) == null ? void 0 : _e.powerStep) ?? 1.35}|${list.join(
          ","
        )}`;
        if (this._rankDamageCacheKey !== key) {
          this._rankDamageCacheKey = key;
          this._rankDamageCache = /* @__PURE__ */ new Map();
        }
        const a = attackerRank || "E";
        const d = defenderRank || "E";
        const pairKey = `${a}|${d}`;
        const cached = this._rankDamageCache.get(pairKey);
        if (cached !== void 0) return cached;
        const defenderPower = this.getRankPowerValue(d);
        const ratio = Number.isFinite(defenderPower) && defenderPower > 0 ? this.getRankPowerValue(a) / defenderPower : 1;
        const computed = this.clampNumber(Math.pow(ratio, exponent), min, max);
        this._rankDamageCache.set(pairKey, computed);
        return computed;
      },
      getMobRankHpFactorByIndex(rankIndex) {
        var _a, _b;
        const step = ((_a = this.rankScaling) == null ? void 0 : _a.mobHpStep) ?? 1.18;
        const maxFactor = ((_b = this.rankScaling) == null ? void 0 : _b.mobHpMaxFactor) ?? 12;
        return this.clampNumber(Math.pow(step, Math.max(0, rankIndex)), 1, maxFactor);
      },
      getShadowRankHpFactorByIndex(rankIndex) {
        var _a, _b, _c;
        const base = ((_a = this.rankScaling) == null ? void 0 : _a.shadowHpBaseFactor) ?? 0.9;
        const step = ((_b = this.rankScaling) == null ? void 0 : _b.shadowHpStep) ?? 0.05;
        const maxFactor = ((_c = this.rankScaling) == null ? void 0 : _c.shadowHpMaxFactor) ?? 1.5;
        return this.clampNumber(base + Math.max(0, rankIndex) * step, base, maxFactor);
      },
      getEnemyKey(enemy, fallbackType = "mob") {
        if (!enemy || typeof enemy !== "object") return null;
        const type = enemy.type || fallbackType;
        return enemy.id || enemy.name || (type === "boss" ? "boss" : null);
      },
      _normalizeCombatStatBlock(statsSource) {
        const { STAT_KEYS: statNames } = require_safe_numbers();
        return statNames.reduce((acc, statName) => {
          const rawValue = Number(statsSource == null ? void 0 : statsSource[statName]);
          acc[statName] = Number.isFinite(rawValue) ? rawValue : 0;
          return acc;
        }, {});
      },
      normalizeEnemyForCombat(enemy, fallbackType = "mob") {
        const safeEnemy = enemy && typeof enemy === "object" ? enemy : {};
        const entityType = safeEnemy.type || fallbackType;
        const id = this.getEnemyKey(safeEnemy, entityType);
        const rank = safeEnemy.rank || "E";
        const hp = Number.isFinite(safeEnemy.hp) ? safeEnemy.hp : 0;
        const maxHp = Number.isFinite(safeEnemy.maxHp) ? safeEnemy.maxHp : hp;
        const statsSource = safeEnemy.baseStats && typeof safeEnemy.baseStats === "object" ? safeEnemy.baseStats : safeEnemy;
        const normalizedStats = this._normalizeCombatStatBlock(statsSource);
        return {
          ...safeEnemy,
          id,
          type: entityType,
          rank,
          hp,
          maxHp: Math.max(maxHp, hp),
          ...normalizedStats
        };
      },
      resolveCombatStats({ entityType, entity, stats, rank, fallbackType = "mob" }) {
        var _a, _b, _c, _d;
        if (entityType === "shadow") {
          const normalizedShadow = this.normalizeShadowId(entity);
          const shadowRank = (normalizedShadow == null ? void 0 : normalizedShadow.rank) || rank || "E";
          const shadowStats = this.getShadowEffectiveStatsCached(normalizedShadow) || {};
          return {
            id: this.getShadowIdValue(normalizedShadow),
            type: "shadow",
            rank: shadowRank,
            stats: this._normalizeCombatStatBlock(shadowStats),
            hp: 0,
            maxHp: 0
          };
        }
        if (entityType === "user") {
          const userRank = rank || ((_b = (_a = this.soloLevelingStats) == null ? void 0 : _a.settings) == null ? void 0 : _b.rank) || "E";
          const userStats = stats || this.getUserEffectiveStats() || {};
          const hp = Number.isFinite((_c = this.settings) == null ? void 0 : _c.userHP) ? this.settings.userHP : 0;
          const maxHp = Number.isFinite((_d = this.settings) == null ? void 0 : _d.userMaxHP) ? this.settings.userMaxHP : 0;
          return {
            id: "user",
            type: "user",
            rank: userRank,
            stats: this._normalizeCombatStatBlock(userStats),
            hp,
            maxHp
          };
        }
        const normalizedEnemy = entity ? this.normalizeEnemyForCombat(entity, fallbackType) : null;
        const fallbackStats = this._normalizeCombatStatBlock(stats || {});
        return {
          id: (normalizedEnemy == null ? void 0 : normalizedEnemy.id) || null,
          type: (normalizedEnemy == null ? void 0 : normalizedEnemy.type) || fallbackType,
          rank: (normalizedEnemy == null ? void 0 : normalizedEnemy.rank) || rank || "E",
          stats: normalizedEnemy ? this._normalizeCombatStatBlock(normalizedEnemy) : fallbackStats,
          hp: (normalizedEnemy == null ? void 0 : normalizedEnemy.hp) ?? 0,
          maxHp: (normalizedEnemy == null ? void 0 : normalizedEnemy.maxHp) ?? 0
        };
      }
    };
  }
});

// src/Dungeons/combat-role-damage.js
var require_combat_role_damage = __commonJS({
  "src/Dungeons/combat-role-damage.js"(exports2, module2) {
    module2.exports = {
      buildDungeonCombatSnapshot({ dungeon, aliveMobs, bossAlive }) {
        const mobById = /* @__PURE__ */ new Map();
        if (aliveMobs) {
          for (const mob of aliveMobs) {
            const id = this.getEnemyKey(mob, "mob");
            if (id) mobById.set(id, mob);
          }
        }
        return { mobById, bossAlive: Boolean(bossAlive) };
      },
      applyDamageToEntityHp(entity, damage) {
        const oldHp = Number.isFinite(entity == null ? void 0 : entity.hp) ? entity.hp : 0;
        const applied = Number.isFinite(damage) ? damage : 0;
        const newHp = Math.max(0, oldHp - applied);
        entity && (entity.hp = newHp);
        return { oldHp, newHp, died: oldHp > 0 && newHp <= 0 };
      },
      getShadowBossTargetChance({ dungeon, aliveMobs, bossUnlocked = true }) {
        var _a, _b, _c, _d, _e, _f;
        if (!bossUnlocked || (((_a = dungeon == null ? void 0 : dungeon.boss) == null ? void 0 : _a.hp) || 0) <= 0) return 0;
        const mobCount = typeof aliveMobs === "number" ? aliveMobs : Array.isArray(aliveMobs) ? aliveMobs.length : 0;
        const maxHp = ((_b = dungeon == null ? void 0 : dungeon.boss) == null ? void 0 : _b.maxHp) || 0;
        const hp = ((_c = dungeon == null ? void 0 : dungeon.boss) == null ? void 0 : _c.hp) || 0;
        const bossFraction = maxHp > 0 ? hp / maxHp : 1;
        const shadowMobTargetShare = Number.isFinite((_d = this.settings) == null ? void 0 : _d.shadowMobTargetShare) ? this.settings.shadowMobTargetShare : 0.7;
        const baseBossShare = this.clampNumber(1 - shadowMobTargetShare, 0.05, 0.95);
        const lowHpThreshold = Number.isFinite((_e = this.settings) == null ? void 0 : _e.shadowBossFocusLowHpThreshold) ? this.settings.shadowBossFocusLowHpThreshold : 0.4;
        const lowHpBossShare = this.clampNumber(
          Number.isFinite((_f = this.settings) == null ? void 0 : _f.shadowBossTargetShareLowBossHp) ? this.settings.shadowBossTargetShareLowBossHp : 0.6,
          0.05,
          0.95
        );
        const mobPressurePenalty = mobCount >= 1500 ? 0.08 : mobCount >= 800 ? 0.05 : mobCount >= 400 ? 0.03 : 0;
        if (bossFraction <= lowHpThreshold) {
          return this.clampNumber(Math.max(lowHpBossShare, baseBossShare), 0.05, 0.95);
        }
        return this.clampNumber(baseBossShare - mobPressurePenalty, 0.05, 0.95);
      },
      isRoleCombatModelEnabled() {
        var _a, _b;
        const version = Number.isFinite((_a = this.settings) == null ? void 0 : _a.roleCombatModelVersion) ? this.settings.roleCombatModelVersion : 1;
        return ((_b = this.settings) == null ? void 0 : _b.roleCombatModelEnabled) !== false && version >= 1;
      },
      normalizeShadowRoleKey(role) {
        if (typeof role !== "string") return "";
        const normalized = role.trim().toLowerCase();
        if (!normalized) return "";
        if (normalized === "warrior") return "knight";
        if (normalized === "guardian") return "tank";
        if (normalized === "priest") return "healer";
        return normalized;
      },
      normalizeShadowPersonalityKey(personality) {
        if (typeof personality !== "string") return "";
        return personality.trim().toLowerCase();
      },
      deriveMonsterRoleFromBeast(beastType, beastFamily) {
        const normalizedType = this.normalizeShadowRoleKey(beastType);
        const normalizedFamily = typeof beastFamily === "string" ? beastFamily.trim().toLowerCase() : "";
        const familyFallbacks = {
          insect: "ant",
          beast: "wolf",
          reptile: "naga",
          ice: "yeti",
          dragon: "dragon",
          giant: "giant",
          demon: "demon",
          undead: "ghoul",
          construct: "golem",
          ancient: "elf",
          "humanoid-beast": "orc"
        };
        if (normalizedType && normalizedType !== "beast" && normalizedType !== "magic-beast") {
          return normalizedType;
        }
        const fallbackRole = familyFallbacks[normalizedFamily] || "";
        if (fallbackRole) return fallbackRole;
        if (normalizedType === "beast" || normalizedType === "magic-beast") {
          return "wolf";
        }
        return normalizedType || "balanced";
      },
      ensureMonsterRole(entity) {
        if (!entity || typeof entity !== "object") return "";
        const resolvedRole = this.deriveMonsterRoleFromBeast(
          entity.role || entity.beastType || entity.type || "",
          entity.beastFamily || entity.family || ""
        );
        if (resolvedRole && entity.role !== resolvedRole) {
          entity.role = resolvedRole;
        }
        return resolvedRole;
      },
      getMonsterOutgoingDamageMultiplier(monsterRole, beastFamily, targetType = "shadow") {
        if (!this.isRoleCombatModelEnabled()) return 1;
        const roleKey = this.deriveMonsterRoleFromBeast(monsterRole, beastFamily);
        const personalityKey = this.derivePersonalityKeyFromRole(roleKey);
        const archetype = this.getRoleCombatArchetype(roleKey, personalityKey);
        let multiplier = 1;
        switch (archetype) {
          case "tank":
            multiplier = targetType === "user" ? 0.93 : 0.88;
            break;
          case "support":
            multiplier = 0.95;
            break;
          case "caster":
            multiplier = targetType === "user" ? 1.12 : 1.04;
            break;
          case "striker":
            multiplier = targetType === "user" ? 1.09 : 1.14;
            break;
          case "ranger":
            multiplier = 1.06;
            break;
          default:
            multiplier = 1;
            break;
        }
        return this.clampNumber(multiplier, 0.8, 1.2);
      },
      derivePersonalityKeyFromRole(roleKey) {
        switch (roleKey) {
          case "tank":
          case "golem":
          case "yeti":
            return "tank";
          case "healer":
          case "support":
            return "supportive";
          case "mage":
          case "spider":
          case "centipede":
          case "serpent":
          case "naga":
          case "elf":
            return "strategic";
          case "ranger":
          case "wolf":
          case "wyvern":
            return "tactical";
          case "assassin":
          case "berserker":
          case "ant":
          case "bear":
          case "dragon":
          case "titan":
          case "giant":
          case "demon":
          case "ghoul":
          case "orc":
          case "ogre":
            return "aggressive";
          default:
            return "balanced";
        }
      },
      getRoleCombatArchetype(roleKey, personalityKey = "balanced") {
        switch (roleKey) {
          case "tank":
          case "golem":
          case "yeti":
            return "tank";
          case "healer":
          case "support":
            return "support";
          case "mage":
          case "spider":
          case "centipede":
          case "serpent":
          case "naga":
          case "elf":
            return "caster";
          case "assassin":
          case "berserker":
          case "ant":
          case "bear":
          case "dragon":
          case "titan":
          case "giant":
          case "demon":
          case "ghoul":
          case "orc":
          case "ogre":
            return "striker";
          case "ranger":
          case "wolf":
          case "wyvern":
            return "ranger";
          case "knight":
            return "balanced";
          default:
            break;
        }
        switch (personalityKey) {
          case "tank":
            return "tank";
          case "supportive":
            return "support";
          case "strategic":
            return "caster";
          case "aggressive":
            return "striker";
          case "tactical":
            return "ranger";
          default:
            return "balanced";
        }
      },
      _createRoleCombatState(now = Date.now()) {
        return {
          updatedAt: now,
          mark: 0,
          // Enemy vulnerability pressure from role coordination
          guard: 0,
          // Incoming damage mitigation from tanks/support
          weaken: 0,
          // Enemy output suppression from caster/support pressure
          heal: 0
          // Active shadow-HP restoration pressure from healers/support
        };
      },
      _decayRoleCombatStateInPlace(state, now = Date.now()) {
        if (!state || !Number.isFinite(state.updatedAt)) return;
        const elapsed = Math.max(0, now - state.updatedAt);
        if (elapsed <= 0) return;
        const decayWindowMs = 12e3;
        const decay = elapsed >= 6e4 ? 0 : Math.max(0, 1 - elapsed / decayWindowMs);
        state.mark *= decay;
        state.guard *= decay;
        state.weaken *= decay;
        if (Number.isFinite(state.heal)) state.heal *= decay;
        state.updatedAt = now;
      },
      getRoleCombatState(channelKey, now = Date.now()) {
        if (!channelKey || !this.isRoleCombatModelEnabled()) return null;
        let state = this._roleCombatStates.get(channelKey);
        if (!state) {
          state = this._createRoleCombatState(now);
          this._roleCombatStates.set(channelKey, state);
          return state;
        }
        this._decayRoleCombatStateInPlace(state, now);
        return state;
      },
      clearRoleCombatState(channelKey = null) {
        if (!this._roleCombatStates) return;
        if (channelKey) {
          this._roleCombatStates.delete(channelKey);
          return;
        }
        this._roleCombatStates.clear();
      },
      buildRolePressureBucket() {
        return {
          tank: 0,
          support: 0,
          caster: 0,
          striker: 0,
          ranger: 0,
          balanced: 0
        };
      },
      _resolveShadowRoleProfile(shadow, combatData = null) {
        const roleKey = this.normalizeShadowRoleKey(
          (shadow == null ? void 0 : shadow.role) || (shadow == null ? void 0 : shadow.roleName) || (shadow == null ? void 0 : shadow.ro) || ""
        );
        const explicitPersonality = this.normalizeShadowPersonalityKey(
          (shadow == null ? void 0 : shadow.personalityKey) || (shadow == null ? void 0 : shadow.personality) || (combatData == null ? void 0 : combatData.personality) || (combatData == null ? void 0 : combatData.behavior) || ""
        );
        const personalityKey = explicitPersonality || this.derivePersonalityKeyFromRole(roleKey);
        const archetype = this.getRoleCombatArchetype(roleKey, personalityKey);
        return {
          roleKey,
          personalityKey,
          archetype
        };
      },
      _getShadowArchetypeForRole(shadowRole = "", combatData = null) {
        const shadowSource = shadowRole && typeof shadowRole === "object" ? shadowRole : { role: shadowRole };
        const { archetype } = this._resolveShadowRoleProfile(shadowSource, combatData);
        return archetype || "balanced";
      },
      _addRolePressureSample(rolePressure, shadow, combatData, attacks, scaleFactor = 1) {
        if (!rolePressure || !Number.isFinite(attacks) || attacks <= 0) return;
        const { archetype } = this._resolveShadowRoleProfile(shadow, combatData);
        const weightedAttacks = attacks * Math.max(0.25, Number.isFinite(scaleFactor) ? scaleFactor : 1);
        rolePressure[archetype] = (rolePressure[archetype] || 0) + weightedAttacks;
      },
      updateRoleCombatStateFromPressure(channelKey, rolePressure) {
        if (!channelKey || !rolePressure || !this.isRoleCombatModelEnabled()) return null;
        const state = this.getRoleCombatState(channelKey, Date.now());
        if (!state) return null;
        const pressure = (value) => Math.log10(1 + Math.max(0, Number(value) || 0));
        const tankP = pressure(rolePressure.tank);
        const supportP = pressure(rolePressure.support);
        const casterP = pressure(rolePressure.caster);
        const strikerP = pressure(rolePressure.striker);
        const rangerP = pressure(rolePressure.ranger);
        const balancedP = pressure(rolePressure.balanced);
        state.mark = this.clampNumber(
          state.mark + strikerP * 0.95 + rangerP * 0.65 + casterP * 0.35,
          0,
          8
        );
        state.guard = this.clampNumber(
          state.guard + tankP * 0.05 + supportP * 0.04 + balancedP * 0.02,
          0,
          0.55
        );
        state.weaken = this.clampNumber(state.weaken + casterP * 0.04 + supportP * 0.03, 0, 0.35);
        state.heal = this.clampNumber((state.heal || 0) + supportP * 0.05, 0, 0.6);
        state.updatedAt = Date.now();
        return state;
      },
      getRoleCombatTickContext(channelKey) {
        if (!this.isRoleCombatModelEnabled() || !channelKey) {
          return {
            enabled: false,
            bossMarkMultiplier: 1,
            mobMarkMultiplier: 1,
            incomingDamageMultiplier: 1
          };
        }
        const state = this.getRoleCombatState(channelKey);
        if (!state) {
          return {
            enabled: false,
            bossMarkMultiplier: 1,
            mobMarkMultiplier: 1,
            incomingDamageMultiplier: 1
          };
        }
        const bossMarkMultiplier = this.clampNumber(1 + state.mark * 0.03, 1, 1.24);
        const mobMarkMultiplier = this.clampNumber(1 + state.mark * 0.015, 1, 1.12);
        const incomingReduction = state.guard * 0.45 + state.weaken * 0.55;
        const incomingDamageMultiplier = this.clampNumber(1 - incomingReduction, 0.55, 1);
        const shadowHealFraction = this.clampNumber((state.heal || 0) * 0.25, 0, 0.15);
        return {
          enabled: true,
          state,
          bossMarkMultiplier,
          mobMarkMultiplier,
          incomingDamageMultiplier,
          shadowHealFraction
        };
      },
      getRoleCombatOutgoingDamageMultiplier({
        shadow,
        combatData,
        targetType = "mob",
        bossHpFraction = 1,
        roleCombatContext = null
      }) {
        if (!this.isRoleCombatModelEnabled()) return 1;
        const { personalityKey, archetype } = this._resolveShadowRoleProfile(shadow, combatData);
        let multiplier = 1;
        switch (archetype) {
          case "tank":
            multiplier = 0.88;
            break;
          case "support":
            multiplier = 0.93;
            break;
          case "caster":
            multiplier = 1.1;
            break;
          case "striker":
            multiplier = 1.14;
            break;
          case "ranger":
            multiplier = 1.07;
            break;
          default:
            multiplier = 1;
            break;
        }
        switch (personalityKey) {
          case "aggressive":
            multiplier += 0.05;
            break;
          case "strategic":
            multiplier += 0.03;
            break;
          case "tactical":
            multiplier += 0.02;
            break;
          case "supportive":
            multiplier -= 0.03;
            break;
          case "tank":
            multiplier -= 0.02;
            break;
          default:
            break;
        }
        if (targetType === "boss" && archetype === "striker" && bossHpFraction <= 0.45) {
          multiplier += 0.08;
        } else if (targetType === "mob" && archetype === "ranger") {
          multiplier += 0.07;
        } else if (targetType === "mob" && archetype === "caster") {
          multiplier += 0.05;
        } else if (targetType === "boss" && archetype === "support") {
          multiplier -= 0.03;
        }
        const markMultiplier = (roleCombatContext == null ? void 0 : roleCombatContext.enabled) === true ? targetType === "boss" ? roleCombatContext.bossMarkMultiplier : roleCombatContext.mobMarkMultiplier : 1;
        return this.clampNumber(multiplier * markMultiplier, 0.7, 1.65);
      },
      getRoleCombatIncomingDamageMultiplier(channelKey, roleCombatContext = null) {
        if (!this.isRoleCombatModelEnabled()) return 1;
        if (roleCombatContext && Number.isFinite(roleCombatContext.incomingDamageMultiplier)) {
          return roleCombatContext.incomingDamageMultiplier;
        }
        const context = this.getRoleCombatTickContext(channelKey);
        return Number.isFinite(context == null ? void 0 : context.incomingDamageMultiplier) ? context.incomingDamageMultiplier : 1;
      },
      calculateDamageBreakdown(attackerStats, defenderStats, attackerRank, defenderRank, ignoreDefenseOnCrit = false) {
        const defenderPerception = defenderStats.perception || 0;
        const dodgeChance = Math.min(30, defenderPerception * 0.15);
        if (dodgeChance > 0 && Math.random() * 100 < dodgeChance) {
          return {
            damage: 0,
            dodged: true,
            wasCrit: false,
            critMultiplier: 1
          };
        }
        const attackerStrength = attackerStats.strength || 0;
        const attackerAgility = attackerStats.agility || 0;
        const attackerIntelligence = attackerStats.intelligence || 0;
        let damage = 15 + attackerStrength * 3;
        damage += attackerIntelligence * 2;
        if (attackerStats.attack) {
          damage += Number(attackerStats.attack) || 0;
        }
        damage *= this.getRankDamageMultiplier(attackerRank, defenderRank);
        const critChance = Math.min(40, attackerAgility * 0.3);
        const wasCrit = Math.random() * 100 < critChance;
        const equipmentCritDamage = Number(attackerStats.critDamage) || 0;
        const critMultiplier = wasCrit ? 2.5 + equipmentCritDamage : 1;
        if (wasCrit) damage *= critMultiplier;
        const defenderStrength = defenderStats.strength || 0;
        const defenderVitality = defenderStats.vitality || 0;
        let rawDefense = defenderStrength * 0.25 + defenderVitality * 0.15;
        if (defenderStats.defense) {
          rawDefense += Number(defenderStats.defense) || 0;
        }
        const defense = Math.sqrt(rawDefense) * 6;
        const defenseReduction = ignoreDefenseOnCrit && wasCrit ? 0 : Math.min(0.7, defense / (defense + 100));
        damage = damage * (1 - defenseReduction);
        return {
          damage: Math.max(1, Math.floor(damage)),
          dodged: false,
          wasCrit,
          critMultiplier
        };
      },
      calculateDamage(attackerStats, defenderStats, attackerRank, defenderRank) {
        return this.calculateDamageBreakdown(
          attackerStats,
          defenderStats,
          attackerRank,
          defenderRank
        ).damage;
      },
      calculateUserDamage(enemyStats, enemyRank) {
        return this.calculateUserDamageBreakdown(enemyStats, enemyRank).damage;
      },
      calculateUserDamageBreakdown(enemyStats, enemyRank) {
        var _a, _b, _c;
        if (!((_a = this.soloLevelingStats) == null ? void 0 : _a.settings)) {
          return this.calculateDamageBreakdown(
            { strength: 10, agility: 5, intelligence: 5 },
            enemyStats,
            "E",
            enemyRank
          );
        }
        const userStats = ((_c = (_b = this.soloLevelingStats).getTotalEffectiveStats) == null ? void 0 : _c.call(_b)) || this.soloLevelingStats.settings.stats || {};
        const userRank = this.soloLevelingStats.settings.rank || "E";
        return this.calculateDamageBreakdown(
          userStats,
          enemyStats,
          userRank,
          enemyRank,
          userRank === "Shadow Monarch"
        );
      },
      _getMobStatReferenceForRank(rankIndex) {
        const safeRankIndex = Number.isFinite(rankIndex) ? Math.max(0, rankIndex) : 0;
        const base = this.calculateMobBaseStats(safeRankIndex);
        const perceptionRef = Math.max(
          10,
          Math.floor(((base.strength || 0) + (base.agility || 0) + (base.intelligence || 0)) / 6)
        );
        return {
          strength: Math.max(10, Number(base.strength) || 10),
          agility: Math.max(10, Number(base.agility) || 10),
          intelligence: Math.max(10, Number(base.intelligence) || 10),
          vitality: Math.max(10, Number(base.vitality) || 10),
          perception: perceptionRef
        };
      },
      normalizeShadowCombatStatsByRank(stats, rank = "E") {
        var _a, _b;
        const safeStats = {
          strength: Number.isFinite(Number(stats == null ? void 0 : stats.strength)) ? Number(stats.strength) : 0,
          agility: Number.isFinite(Number(stats == null ? void 0 : stats.agility)) ? Number(stats.agility) : 0,
          intelligence: Number.isFinite(Number(stats == null ? void 0 : stats.intelligence)) ? Number(stats.intelligence) : 0,
          vitality: Number.isFinite(Number(stats == null ? void 0 : stats.vitality)) ? Number(stats.vitality) : 0,
          perception: Number.isFinite(Number(stats == null ? void 0 : stats.perception)) ? Number(stats.perception) : 0
        };
        const pivotScale = Number.isFinite((_a = this.settings) == null ? void 0 : _a.shadowCombatStatPivotScale) ? this.settings.shadowCombatStatPivotScale : 3.5;
        const compressionExp = Number.isFinite((_b = this.settings) == null ? void 0 : _b.shadowCombatStatCompressionExp) ? this.settings.shadowCombatStatCompressionExp : 0.68;
        if (pivotScale <= 0 || compressionExp >= 1) {
          return safeStats;
        }
        const rankIndex = this.getRankIndexValue(rank);
        const reference = this._getMobStatReferenceForRank(rankIndex);
        const compress = (value, pivot) => {
          const safeValue = Number.isFinite(value) ? Math.max(0, value) : 0;
          const safePivot = Math.max(1, Number.isFinite(pivot) ? pivot : 1);
          if (safeValue <= safePivot) return Math.floor(safeValue);
          return Math.floor(safePivot + Math.pow(safeValue - safePivot, compressionExp));
        };
        return {
          strength: compress(safeStats.strength, reference.strength * pivotScale),
          agility: compress(safeStats.agility, reference.agility * pivotScale),
          intelligence: compress(safeStats.intelligence, reference.intelligence * pivotScale),
          vitality: compress(safeStats.vitality, reference.vitality * pivotScale),
          perception: compress(safeStats.perception, reference.perception * pivotScale)
        };
      },
      getShadowEffectiveStatsCached(shadow) {
        const shadowId = this.getShadowIdValue(shadow);
        if (!shadowId) return null;
        const cacheKey = shadowId;
        const now = Date.now();
        if (this._shadowStatsCache && this._shadowStatsCache.has(cacheKey)) {
          const cached = this._shadowStatsCache.get(cacheKey);
          if (now - cached.timestamp < 3e3) {
            return cached.stats;
          }
        }
        let stats = {
          strength: shadow.strength || 0,
          agility: shadow.agility || 0,
          intelligence: shadow.intelligence || 0,
          vitality: shadow.vitality || 0,
          perception: shadow.perception || 0
        };
        if (this.shadowArmy && typeof this.shadowArmy.getShadowEffectiveStats === "function") {
          try {
            const effectiveStats = this.shadowArmy.getShadowEffectiveStats(shadow);
            if (effectiveStats) {
              stats = {
                strength: effectiveStats.strength ?? stats.strength,
                agility: effectiveStats.agility ?? stats.agility,
                intelligence: effectiveStats.intelligence ?? stats.intelligence,
                vitality: effectiveStats.vitality ?? stats.vitality,
                perception: effectiveStats.perception ?? stats.perception
              };
            }
          } catch (error) {
            this.errorLog("SHADOW_STATS", "Error getting effective stats from ShadowArmy", error);
          }
        }
        if (!this.shadowArmy || typeof this.shadowArmy.getShadowEffectiveStats !== "function") {
          const baseStats = shadow.baseStats || {};
          const growthStats = shadow.growthStats || {};
          const naturalGrowthStats = shadow.naturalGrowthStats || {};
          stats = {
            strength: (baseStats.strength || 0) + (growthStats.strength || 0) + (naturalGrowthStats.strength || 0) || (stats.strength || 0),
            agility: (baseStats.agility || 0) + (growthStats.agility || 0) + (naturalGrowthStats.agility || 0) || (stats.agility || 0),
            intelligence: (baseStats.intelligence || 0) + (growthStats.intelligence || 0) + (naturalGrowthStats.intelligence || 0) || (stats.intelligence || 0),
            vitality: (baseStats.vitality || 0) + (growthStats.vitality || 0) + (naturalGrowthStats.vitality || 0) || (stats.vitality || 0),
            perception: (baseStats.perception || 0) + (growthStats.perception || 0) + (naturalGrowthStats.perception || 0) || (stats.perception || 0)
          };
        }
        stats = this.normalizeShadowCombatStatsByRank(stats, (shadow == null ? void 0 : shadow.rank) || "E");
        if (this._shadowStatsCache) {
          this._shadowStatsCache.set(cacheKey, { stats, timestamp: now });
        }
        return stats;
      },
      // applyRole defaults true for standalone callers (e.g. runtime-visibility's
      // preview). The combat execution path passes false and instead applies role
      // via getRoleCombatOutgoingDamageMultiplier, which is the single source of
      // archetype + personality + context scaling — applying role here too would
      // double-count it (the fallback-path triple-stack bug, 2026-07-14).
      calculateShadowDamage(shadow, enemyStats, enemyRank, applyRole = true) {
        var _a;
        const attacker = this.resolveCombatStats({ entityType: "shadow", entity: shadow });
        const defender = this.resolveCombatStats({
          entityType: "enemy",
          stats: enemyStats,
          rank: enemyRank,
          fallbackType: "mob"
        });
        let damage = this.calculateDamage(attacker.stats, defender.stats, attacker.rank, defender.rank);
        if (applyRole) damage = this.applyRoleDamageMultiplier(shadow.role, damage);
        if (!Number.isFinite(damage) || damage < 0) {
          (_a = this.debugLog) == null ? void 0 : _a.call(this, "COMBAT", "NaN/invalid shadow damage, falling back to 1", { role: shadow == null ? void 0 : shadow.role });
          return 1;
        }
        return Math.max(1, Math.floor(damage));
      },
      calculateEnemyDamage(enemyStats, targetStats, enemyRank, targetRank) {
        const attacker = this.resolveCombatStats({
          entityType: "enemy",
          stats: enemyStats,
          rank: enemyRank,
          fallbackType: "mob"
        });
        const defender = this.resolveCombatStats({
          entityType: "enemy",
          stats: targetStats,
          rank: targetRank,
          fallbackType: "shadow"
        });
        return this.calculateDamage(attacker.stats, defender.stats, attacker.rank, defender.rank);
      }
    };
  }
});

// src/Dungeons/combat-status-effects.js
var require_combat_status_effects = __commonJS({
  "src/Dungeons/combat-status-effects.js"(exports2, module2) {
    var C2 = require_constants();
    var LONGEVITY_IMMUNE_EFFECTS = /* @__PURE__ */ new Set(["poison", "necrotic"]);
    var DEFAULT_STATUS_EFFECTS = C2.COMBAT_STATUS_EFFECTS || {
      poison: { maxStacks: 4, durationMs: 9e3, tickMs: 1e3, damagePctPerStack: 25e-4, maxDamagePct: 0.018 },
      armorBreak: { maxStacks: 3, durationMs: 7e3, damageAmpPerStack: 0.06, maxDamageAmp: 0.2 },
      slow: { maxStacks: 3, durationMs: 7e3, slowPerStack: 0.08, maxSlow: 0.3 },
      bleed: { maxStacks: 5, durationMs: 8e3, tickMs: 1e3, damagePctPerStack: 3e-3, maxDamagePct: 0.02 },
      burn: { maxStacks: 3, durationMs: 6e3, tickMs: 1e3, damagePctPerStack: 5e-3, maxDamagePct: 0.022 },
      frostbite: { maxStacks: 4, durationMs: 1e4, slowPerStack: 0.1, maxSlow: 0.4, rootAtMaxStacks: true, rootDurationMs: 3e3 },
      necrotic: { maxStacks: 3, durationMs: 9e3, tickMs: 1e3, damagePctPerStack: 2e-3, maxDamagePct: 0.012, healReductionPerStack: 0.15, maxHealReduction: 0.45 },
      enrage: { maxStacks: 2, durationMs: Infinity, damageBoostPerStack: 0.2, maxDamageBoost: 0.4, speedBoostPerStack: 0.15, maxSpeedBoost: 0.3 }
    };
    var DEFAULT_STATUS_LIMITS = C2.COMBAT_STATUS_LIMITS || {
      tickIntervalMs: 1e3,
      maxTrackedMobsPerDungeon: 600
    };
    module2.exports = {
      _isCombatStatusEffectsEnabled() {
        var _a;
        return ((_a = this.settings) == null ? void 0 : _a.combatStatusEffectsEnabled) !== false;
      },
      _ensureCombatStatusState(channelKey) {
        if (!channelKey) return null;
        this._combatStatusByChannel || (this._combatStatusByChannel = /* @__PURE__ */ new Map());
        let state = this._combatStatusByChannel.get(channelKey);
        if (!state) {
          state = {
            boss: {},
            user: {},
            mobs: /* @__PURE__ */ new Map(),
            nextTickAt: 0,
            lastPruneAt: 0,
            lastUserCleanseAt: 0,
            hasActive: false
          };
          this._combatStatusByChannel.set(channelKey, state);
          return state;
        }
        if (!(state.mobs instanceof Map)) {
          state.mobs = /* @__PURE__ */ new Map();
        }
        if (!state.boss || typeof state.boss !== "object") {
          state.boss = {};
        }
        if (!state.user || typeof state.user !== "object") {
          state.user = {};
        }
        if (!Number.isFinite(state.nextTickAt)) state.nextTickAt = 0;
        if (!Number.isFinite(state.lastPruneAt)) state.lastPruneAt = 0;
        if (!Number.isFinite(state.lastUserCleanseAt)) state.lastUserCleanseAt = 0;
        if (typeof state.hasActive !== "boolean") state.hasActive = false;
        return state;
      },
      clearCombatStatusState(channelKey = null) {
        if (!this._combatStatusByChannel) return;
        if (channelKey) {
          this._combatStatusByChannel.delete(channelKey);
          return;
        }
        this._combatStatusByChannel.clear();
      },
      _getStatusEffectConfig(effectName) {
        return (DEFAULT_STATUS_EFFECTS == null ? void 0 : DEFAULT_STATUS_EFFECTS[effectName]) || null;
      },
      _isShadowMagicBeast(shadow) {
        var _a, _b, _c;
        if (!shadow) return false;
        const roleKey = shadow.role || shadow.roleName || shadow.ro || "";
        const roles = ((_a = this.shadowArmy) == null ? void 0 : _a.shadowRoles) || ((_c = (_b = this.shadowArmy) == null ? void 0 : _b.constructor) == null ? void 0 : _c.SHADOW_ROLES);
        if (roles && roles[roleKey]) return !!roles[roleKey].isMagicBeast;
        const magicBeastRoles = /* @__PURE__ */ new Set([
          "ant",
          "bear",
          "wolf",
          "spider",
          "centipede",
          "golem",
          "serpent",
          "naga",
          "wyvern",
          "dragon",
          "titan",
          "giant",
          "elf",
          "demon",
          "ghoul",
          "orc",
          "ogre",
          "yeti"
        ]);
        return magicBeastRoles.has(roleKey);
      },
      _getShadowFamily(shadow) {
        var _a, _b, _c;
        if (!shadow) return null;
        if (shadow.family) return shadow.family;
        const roleKey = shadow.role || shadow.roleName || shadow.ro || "";
        const roles = ((_a = this.shadowArmy) == null ? void 0 : _a.shadowRoles) || ((_c = (_b = this.shadowArmy) == null ? void 0 : _b.constructor) == null ? void 0 : _c.SHADOW_ROLES);
        if (roles && roles[roleKey]) return roles[roleKey].family || null;
        const familyByRole = {
          ant: "insect",
          spider: "insect",
          centipede: "insect",
          bear: "beast",
          wolf: "beast",
          naga: "reptile",
          serpent: "reptile",
          yeti: "ice",
          dragon: "dragon",
          wyvern: "dragon",
          giant: "giant",
          titan: "giant",
          demon: "demon",
          ogre: "humanoid-beast",
          orc: "humanoid-beast",
          ghoul: "undead",
          golem: "construct",
          elf: "ancient"
        };
        return familyByRole[roleKey] || null;
      },
      _getDetoxificationStatusBonuses() {
        var _a;
        const bonuses = ((_a = this.getSkillTreeBonuses) == null ? void 0 : _a.call(this)) || null;
        return {
          debuffDurationReduction: this.clampNumber(
            Number((bonuses == null ? void 0 : bonuses.debuffDurationReduction) || 0),
            0,
            0.8
          ),
          debuffResistChance: this.clampNumber(
            Number((bonuses == null ? void 0 : bonuses.debuffResistChance) || 0),
            0,
            0.65
          ),
          debuffCleanseChance: this.clampNumber(
            Number((bonuses == null ? void 0 : bonuses.debuffCleanseChance) || 0),
            0,
            0.75
          )
        };
      },
      _getStatusEffectEntries(bucket, now = Date.now()) {
        if (!bucket || typeof bucket !== "object") return [];
        return Object.entries(bucket).map(([effectName, effect]) => ({ effectName, effect })).filter(({ effect }) => effect && (effect.expiresAt === Infinity || Number.isFinite(effect.expiresAt) && effect.expiresAt > now)).sort((a, b) => {
          var _a, _b, _c, _d;
          const stackDelta = Number(((_a = b.effect) == null ? void 0 : _a.stacks) || 0) - Number(((_b = a.effect) == null ? void 0 : _b.stacks) || 0);
          if (stackDelta !== 0) return stackDelta;
          const aExp = (_c = a.effect) == null ? void 0 : _c.expiresAt;
          const bExp = (_d = b.effect) == null ? void 0 : _d.expiresAt;
          if (aExp === Infinity && bExp === Infinity) return 0;
          if (aExp === Infinity) return 1;
          if (bExp === Infinity) return -1;
          return Number(aExp || 0) - Number(bExp || 0);
        });
      },
      _purgeCombatStatusEffect(channelKey, targetType, targetId, effectName = null, now = Date.now()) {
        var _a, _b, _c, _d, _e, _f, _g;
        const bucket = this._getStatusBucket(channelKey, targetType, targetId, false);
        if (!bucket) return null;
        let keyToDelete = effectName;
        if (!keyToDelete) {
          keyToDelete = ((_a = this._getStatusEffectEntries(bucket, now)[0]) == null ? void 0 : _a.effectName) || null;
        }
        if (!keyToDelete || !bucket[keyToDelete]) return null;
        const removed = bucket[keyToDelete];
        delete bucket[keyToDelete];
        if (targetType === "mob" && Object.keys(bucket).length === 0) {
          const state2 = (_c = (_b = this._combatStatusByChannel) == null ? void 0 : _b.get) == null ? void 0 : _c.call(_b, channelKey);
          (_e = (_d = state2 == null ? void 0 : state2.mobs) == null ? void 0 : _d.delete) == null ? void 0 : _e.call(_d, String(targetId));
        }
        const state = (_g = (_f = this._combatStatusByChannel) == null ? void 0 : _f.get) == null ? void 0 : _g.call(_f, channelKey);
        this._markCombatStatusHasActive(state);
        return { effectName: keyToDelete, effect: removed };
      },
      _attemptUserDetoxificationCleanse(channelKey, now = Date.now()) {
        var _a, _b;
        const state = (_b = (_a = this._combatStatusByChannel) == null ? void 0 : _a.get) == null ? void 0 : _b.call(_a, channelKey);
        if (!(state == null ? void 0 : state.user) || typeof state.user !== "object") return null;
        if (now - (state.lastUserCleanseAt || 0) < 2500) return null;
        const bonuses = this._getDetoxificationStatusBonuses();
        const cleanseChance = Number(bonuses.debuffCleanseChance || 0);
        if (cleanseChance <= 0) return null;
        const activeEntries = this._getStatusEffectEntries(state.user, now);
        if (activeEntries.length === 0) return null;
        if (Math.random() >= cleanseChance) return null;
        state.lastUserCleanseAt = now;
        return this._purgeCombatStatusEffect(channelKey, "user", "user", activeEntries[0].effectName, now);
      },
      _resolveEnemyStatusEffectProfile(attacker, attackerType = "mob") {
        if (!attacker || typeof attacker !== "object") return null;
        const role = this.ensureMonsterRole(attacker);
        const rankIndex = Math.max(0, this.getRankIndexValue(attacker.rank || "E"));
        const beastFamily = attacker.beastFamily || null;
        const familyMap = C2.FAMILY_STATUS_EFFECT_MAP || {};
        const familyEffect = beastFamily ? familyMap[beastFamily] : null;
        let effectName;
        let baseChance;
        if (familyEffect) {
          effectName = Math.random() < 0.7 ? familyEffect.primary : familyEffect.secondary;
          baseChance = familyEffect.chance;
        } else {
          const baseByRole = {
            tank: { effectName: "armorBreak", chance: 0.08 },
            support: { effectName: "slow", chance: 0.075 },
            caster: { effectName: "poison", chance: 0.09 },
            striker: { effectName: "armorBreak", chance: 0.1 },
            ranger: { effectName: "slow", chance: 0.11 },
            balanced: { effectName: "poison", chance: 0.065 }
          };
          const selected = baseByRole[role] || baseByRole.balanced;
          effectName = selected.effectName;
          baseChance = selected.chance;
        }
        let chance = baseChance + Math.min(0.08, rankIndex * 4e-3);
        if (attackerType === "boss") {
          chance += 0.12;
        }
        const stackDelta = attackerType === "boss" && rankIndex >= 6 ? 2 : 1;
        return {
          effectName,
          chance: this.clampNumber(chance, 0.02, 0.55),
          stackDelta
        };
      },
      _resolveEnemyStatusProcAttempts(attacksInSpan, attackerType = "mob") {
        const safeAttacks = Math.max(0, Math.floor(Number(attacksInSpan) || 0));
        if (safeAttacks <= 0) return 0;
        if (attackerType === "boss") {
          return Math.min(3, safeAttacks);
        }
        return Math.min(4, Math.max(1, Math.ceil(safeAttacks / 12)));
      },
      applyEnemyCombatStatusEffects({
        channelKey,
        attacker,
        attackerType = "mob",
        attacksInSpan = 0,
        targetType = "user",
        targetId = "user",
        now = Date.now()
      }) {
        var _a, _b;
        if (!this._isCombatStatusEffectsEnabled()) return null;
        if (!channelKey || targetType !== "user") return null;
        if (((_b = (_a = this.soloLevelingStats) == null ? void 0 : _a.settings) == null ? void 0 : _b.rank) === "Shadow Monarch") return null;
        const effectProfile = this._resolveEnemyStatusEffectProfile(attacker, attackerType);
        if (!effectProfile) return null;
        const attempts = this._resolveEnemyStatusProcAttempts(attacksInSpan, attackerType);
        if (attempts <= 0) return null;
        const procChance = 1 - Math.pow(1 - effectProfile.chance, attempts);
        if (Math.random() >= procChance) return null;
        const sourcePower = this._computeSourcePower(attacker == null ? void 0 : attacker.rank, attacker);
        return this._applyCombatStatusToEntity({
          channelKey,
          targetType,
          targetId,
          effectName: effectProfile.effectName,
          stackDelta: effectProfile.stackDelta,
          now,
          sourcePower
        });
      },
      _getCombatStatusTickMs() {
        var _a;
        const configured = Number((_a = this.settings) == null ? void 0 : _a.combatStatusTickMs);
        const base = Number.isFinite(configured) && configured > 0 ? configured : DEFAULT_STATUS_LIMITS.tickIntervalMs || 1e3;
        return this.clampNumber(Math.floor(base), 400, 2e3);
      },
      _getCombatStatusMaxTrackedMobs() {
        var _a;
        const configured = Number((_a = this.settings) == null ? void 0 : _a.combatStatusMaxTrackedMobs);
        const base = Number.isFinite(configured) && configured > 0 ? configured : DEFAULT_STATUS_LIMITS.maxTrackedMobsPerDungeon || 600;
        return this.clampNumber(Math.floor(base), 100, 1200);
      },
      _pruneStatusBucket(bucket, now) {
        if (!bucket || typeof bucket !== "object") return false;
        let changed = false;
        for (const effectName of Object.keys(bucket)) {
          const effect = bucket[effectName];
          if (!effect || effect.expiresAt !== Infinity && (!Number.isFinite(effect.expiresAt) || effect.expiresAt <= now)) {
            delete bucket[effectName];
            changed = true;
          }
        }
        return changed;
      },
      _markCombatStatusHasActive(state) {
        if (!state) return;
        const bossActive = state.boss && Object.keys(state.boss).length > 0;
        const userActive = state.user && Object.keys(state.user).length > 0;
        state.hasActive = bossActive || userActive || state.mobs instanceof Map && state.mobs.size > 0;
      },
      _pruneCombatStatusState(channelKey, dungeon = null, now = Date.now()) {
        var _a, _b, _c, _d;
        const state = (_b = (_a = this._combatStatusByChannel) == null ? void 0 : _a.get) == null ? void 0 : _b.call(_a, channelKey);
        if (!state) return;
        this._pruneStatusBucket(state.boss, now);
        this._pruneStatusBucket(state.user, now);
        if (state.mobs instanceof Map && state.mobs.size > 0) {
          let aliveMobIds = null;
          if ((_d = (_c = dungeon == null ? void 0 : dungeon.mobs) == null ? void 0 : _c.activeMobs) == null ? void 0 : _d.length) {
            aliveMobIds = /* @__PURE__ */ new Set();
            for (const mob of dungeon.mobs.activeMobs) {
              if (!mob || mob.hp <= 0) continue;
              const mobId = this.getEnemyKey(mob, "mob");
              if (mobId) aliveMobIds.add(String(mobId));
            }
          }
          for (const [mobId, bucket] of state.mobs.entries()) {
            const key = String(mobId);
            if (aliveMobIds && !aliveMobIds.has(key)) {
              state.mobs.delete(key);
              continue;
            }
            this._pruneStatusBucket(bucket, now);
            if (!bucket || Object.keys(bucket).length === 0) {
              state.mobs.delete(key);
            }
          }
        }
        state.lastPruneAt = now;
        this._markCombatStatusHasActive(state);
        if (!state.hasActive) {
          this._combatStatusByChannel.delete(channelKey);
        }
      },
      _getStatusBucket(channelKey, targetType, targetId, create = false) {
        const state = this._ensureCombatStatusState(channelKey);
        if (!state) return null;
        if (targetType === "boss") {
          return state.boss;
        }
        if (targetType === "user") {
          return state.user;
        }
        if (targetType !== "mob" || targetId == null) {
          return null;
        }
        const mobKey = String(targetId);
        let bucket = state.mobs.get(mobKey);
        if (bucket || !create) return bucket || null;
        if (state.mobs.size >= this._getCombatStatusMaxTrackedMobs()) {
          return null;
        }
        bucket = {};
        state.mobs.set(mobKey, bucket);
        return bucket;
      },
      // Compute a compact source power snapshot for DOT scaling
      // Higher sourceRankIndex + higher stats = more DOT damage
      _computeSourcePower(sourceRank, sourceStats) {
        var _a;
        const rankIndex = Math.max(0, ((_a = this.getRankIndexValue) == null ? void 0 : _a.call(this, sourceRank || "E")) || 0);
        const str = Math.max(0, Number(sourceStats == null ? void 0 : sourceStats.strength) || 0);
        const int = Math.max(0, Number(sourceStats == null ? void 0 : sourceStats.intelligence) || 0);
        const rankMult = (C2.RANK_MULTIPLIERS || {})[sourceRank] || Math.max(1, rankIndex + 1);
        return {
          rankIndex,
          rankMult,
          statPower: str + int * 0.5
          // STR-heavy for physical DOTs, INT contributes for magical
        };
      },
      // Calculate DOT scaling factor based on source power vs target rank
      // Returns a multiplier applied to base % damage (0.5 = half damage, 2.0 = double)
      _getDotSourceScaling(effect, targetRank) {
        var _a;
        if (!(effect == null ? void 0 : effect._sourcePower)) return 1;
        const source = effect._sourcePower;
        const targetRankIndex = Math.max(0, ((_a = this.getRankIndexValue) == null ? void 0 : _a.call(this, targetRank || "E")) || 0);
        const targetRankMult = (C2.RANK_MULTIPLIERS || {})[targetRank] || Math.max(1, targetRankIndex + 1);
        const rankRatio = this.clampNumber(source.rankMult / Math.max(1, targetRankMult), 0.3, 3);
        const statBonus = source.statPower > 0 ? this.clampNumber(Math.log2(1 + source.statPower / 500), 0.5, 2) : 0.5;
        return this.clampNumber(rankRatio * 0.7 + statBonus * 0.3, 0.25, 3);
      },
      /**
       * Rank-scaled ailment susceptibility (2026-08-05). Weaker enemies are MORE
       * prone to status ailments and suffer them longer; stronger enemies can
       * shrug them off entirely and shake the rest off faster.
       *   gap = source rank − target rank (from the ailment's _sourcePower):
       *     gap ≥ 0 (weaker/equal target): no resist roll, duration amplified
       *       +15% per rank of gap, capped at 2.0×.
       *     gap < 0 (stronger target): 12%/rank chance to fully resist the
       *       application (capped 60%), and duration shortened 15%/rank
       *       (floored at 0.2×).
       * Mob rank uses the dungeon's rank as proxy (same precedent as the XP
       * grant — mobs spawn at dungeon rank). Effect MAGNITUDE for DOTs is
       * already rank-scaled by _getDotSourceScaling (0.25–3.0× by rank ratio),
       * so this deliberately governs only proc + duration — scaling magnitude
       * here too would double-dip. Legacy applications without sourcePower get
       * gap 0 → fully neutral, so nothing existing changes behavior.
       */
      _getAilmentSusceptibility(channelKey, targetType, sourcePower) {
        var _a, _b, _c, _d, _e;
        const dungeon = (_b = (_a = this.activeDungeons) == null ? void 0 : _a.get) == null ? void 0 : _b.call(_a, channelKey);
        const targetRank = targetType === "user" ? ((_d = (_c = this.soloLevelingStats) == null ? void 0 : _c.settings) == null ? void 0 : _d.rank) || "E" : targetType === "boss" ? ((_e = dungeon == null ? void 0 : dungeon.boss) == null ? void 0 : _e.rank) || (dungeon == null ? void 0 : dungeon.rank) || "E" : (dungeon == null ? void 0 : dungeon.rank) || "E";
        const targetIdx = this.getRankIndexValue(targetRank);
        const sourceIdx = Number.isFinite(sourcePower == null ? void 0 : sourcePower.rankIndex) ? sourcePower.rankIndex : targetIdx;
        const gap = sourceIdx - targetIdx;
        if (gap >= 0) {
          return { resistChance: 0, durationMult: Math.min(2, 1 + 0.15 * gap) };
        }
        const up = -gap;
        return {
          resistChance: Math.min(0.6, 0.12 * up),
          durationMult: Math.max(0.2, 1 - 0.15 * up)
        };
      },
      _applyCombatStatusToEntity({ channelKey, targetType, targetId, effectName, stackDelta = 1, now = Date.now(), sourcePower = null }) {
        if (!this._isCombatStatusEffectsEnabled()) return null;
        const effectConfig = this._getStatusEffectConfig(effectName);
        if (!effectConfig) return null;
        if (targetType === "user") {
          if (LONGEVITY_IMMUNE_EFFECTS.has(effectName)) {
            return null;
          }
          const isPhysical = effectName === "bleed";
          if (!isPhysical) {
            const detox = this._getDetoxificationStatusBonuses();
            const resistChance = Number(detox.debuffResistChance || 0);
            if (resistChance > 0 && Math.random() < resistChance) {
              return null;
            }
          }
        }
        let ailmentDurationMult = 1;
        {
          const sus = this._getAilmentSusceptibility(channelKey, targetType, sourcePower);
          if (sus.resistChance > 0 && Math.random() < sus.resistChance) {
            return null;
          }
          ailmentDurationMult = sus.durationMult;
        }
        const bucket = this._getStatusBucket(channelKey, targetType, targetId, true);
        if (!bucket) return null;
        const existing = bucket[effectName];
        const maxStacks = Math.max(1, Math.floor(effectConfig.maxStacks || 1));
        const addedStacks = Math.max(1, Math.floor(Number(stackDelta) || 1));
        const currentStacks = Math.max(0, Math.floor((existing == null ? void 0 : existing.stacks) || 0));
        const nextStacks = this.clampNumber(currentStacks + addedStacks, 1, maxStacks);
        const isPhysicalEffect = effectName === "bleed";
        const durationReduction = targetType === "user" && !isPhysicalEffect ? Number(this._getDetoxificationStatusBonuses().debuffDurationReduction || 0) : 0;
        const isPermanent = effectConfig.durationMs === Infinity;
        const durationMs = isPermanent ? Infinity : Math.max(500, Math.floor(
          Math.max(500, Math.floor(effectConfig.durationMs || 3e3)) * (1 - durationReduction) * ailmentDurationMult
        ));
        const nextState = {
          stacks: nextStacks,
          appliedAt: now,
          expiresAt: isPermanent ? Infinity : now + durationMs,
          nextTickAt: effectName === "poison" || effectName === "bleed" || effectName === "burn" || effectName === "necrotic" ? now + Math.max(400, Math.floor(effectConfig.tickMs || 1e3)) : 0
        };
        if (sourcePower) {
          const existingPower = existing == null ? void 0 : existing._sourcePower;
          nextState._sourcePower = existingPower && existingPower.rankMult > sourcePower.rankMult ? existingPower : sourcePower;
        } else if (existing == null ? void 0 : existing._sourcePower) {
          nextState._sourcePower = existing._sourcePower;
        }
        bucket[effectName] = nextState;
        const state = this._ensureCombatStatusState(channelKey);
        this._markCombatStatusHasActive(state);
        return nextState;
      },
      _readActiveStatusEffect(channelKey, targetType, targetId, effectName, now = Date.now()) {
        var _a, _b, _c, _d;
        const bucket = this._getStatusBucket(channelKey, targetType, targetId, false);
        if (!bucket) return null;
        const effect = bucket[effectName];
        if (!effect) return null;
        if (effect.expiresAt !== Infinity && (!Number.isFinite(effect.expiresAt) || effect.expiresAt <= now)) {
          delete bucket[effectName];
          if (targetType === "mob" && Object.keys(bucket).length === 0) {
            const state = (_b = (_a = this._combatStatusByChannel) == null ? void 0 : _a.get) == null ? void 0 : _b.call(_a, channelKey);
            (_d = (_c = state == null ? void 0 : state.mobs) == null ? void 0 : _c.delete) == null ? void 0 : _d.call(_c, String(targetId));
          }
          return null;
        }
        return effect;
      },
      getEntityIncomingDamageMultiplier(channelKey, targetType, targetId, now = Date.now()) {
        if (!this._isCombatStatusEffectsEnabled()) return 1;
        const effect = this._readActiveStatusEffect(channelKey, targetType, targetId, "armorBreak", now);
        if (!effect) return 1;
        const config = this._getStatusEffectConfig("armorBreak");
        const amp = this.clampNumber(
          (effect.stacks || 0) * ((config == null ? void 0 : config.damageAmpPerStack) || 0),
          0,
          (config == null ? void 0 : config.maxDamageAmp) || 0.2
        );
        return this.clampNumber(1 + amp, 1, 1.35);
      },
      applyStatusAdjustedIncomingDamage(channelKey, targetType, targetId, damage, now = Date.now()) {
        var _a, _b, _c, _d, _e, _f, _g;
        const baseDamage = Math.max(0, Math.floor(Number(damage) || 0));
        if (baseDamage <= 0) return 0;
        const multiplier = this.getEntityIncomingDamageMultiplier(channelKey, targetType, targetId, now);
        let adjustedDamage = Math.max(1, Math.floor(baseDamage * multiplier));
        if (targetType === "user") {
          if (((_b = (_a = this.soloLevelingStats) == null ? void 0 : _a.settings) == null ? void 0 : _b.rank) === "Shadow Monarch" && Math.random() < 0.9) {
            return 0;
          }
          const bonuses = ((_c = this.getSkillTreeBonuses) == null ? void 0 : _c.call(this)) || {};
          let threshold = this.clampNumber(Number(bonuses.tenacityThreshold || 0), 0, 1);
          let damageReduction = this.clampNumber(Number(bonuses.tenacityDamageReduction || 0), 0, 0.99);
          if (((_e = (_d = this.soloLevelingStats) == null ? void 0 : _d.settings) == null ? void 0 : _e.rank) === "Shadow Monarch") {
            threshold = 1;
            damageReduction = Math.max(damageReduction, 0.99);
          }
          const currentHp = Number((_f = this.settings) == null ? void 0 : _f.userHP) || 0;
          const maxHp = Number((_g = this.settings) == null ? void 0 : _g.userMaxHP) || 0;
          if (threshold > 0 && damageReduction > 0 && maxHp > 0 && currentHp / maxHp <= threshold) {
            adjustedDamage = Math.max(1, Math.floor(adjustedDamage * (1 - damageReduction)));
          }
        }
        return adjustedDamage;
      },
      getEntityAttackSlowMultiplier(channelKey, targetType, targetId, now = Date.now()) {
        if (!this._isCombatStatusEffectsEnabled()) return 1;
        let totalSlow = 0;
        const slowEffect = this._readActiveStatusEffect(channelKey, targetType, targetId, "slow", now);
        if (slowEffect) {
          const slowConfig = this._getStatusEffectConfig("slow");
          totalSlow += this.clampNumber(
            (slowEffect.stacks || 0) * ((slowConfig == null ? void 0 : slowConfig.slowPerStack) || 0),
            0,
            (slowConfig == null ? void 0 : slowConfig.maxSlow) || 0.3
          );
        }
        const frostEffect = this._readActiveStatusEffect(channelKey, targetType, targetId, "frostbite", now);
        if (frostEffect) {
          const frostConfig = this._getStatusEffectConfig("frostbite");
          if ((frostConfig == null ? void 0 : frostConfig.rootAtMaxStacks) && (frostEffect.stacks || 0) >= ((frostConfig == null ? void 0 : frostConfig.maxStacks) || 4)) {
            const rootExpiry = frostEffect._rootExpiresAt || 0;
            if (now < rootExpiry) {
              return 100;
            }
          }
          totalSlow += this.clampNumber(
            (frostEffect.stacks || 0) * ((frostConfig == null ? void 0 : frostConfig.slowPerStack) || 0),
            0,
            (frostConfig == null ? void 0 : frostConfig.maxSlow) || 0.4
          );
        }
        if (totalSlow <= 0) return 1;
        return this.clampNumber(1 + totalSlow, 1, 2.5);
      },
      getEntityHealReductionMultiplier(channelKey, targetType, targetId, now = Date.now()) {
        if (!this._isCombatStatusEffectsEnabled()) return 1;
        const effect = this._readActiveStatusEffect(channelKey, targetType, targetId, "necrotic", now);
        if (!effect) return 1;
        const config = this._getStatusEffectConfig("necrotic");
        const reduction = this.clampNumber(
          (effect.stacks || 0) * ((config == null ? void 0 : config.healReductionPerStack) || 0),
          0,
          (config == null ? void 0 : config.maxHealReduction) || 0.45
        );
        return this.clampNumber(1 - reduction, 0.1, 1);
      },
      getEntityEnrageDamageMultiplier(channelKey, targetType, targetId, now = Date.now()) {
        if (!this._isCombatStatusEffectsEnabled()) return 1;
        const effect = this._readActiveStatusEffect(channelKey, targetType, targetId, "enrage", now);
        if (!effect) return 1;
        const config = this._getStatusEffectConfig("enrage");
        const boost = this.clampNumber(
          (effect.stacks || 0) * ((config == null ? void 0 : config.damageBoostPerStack) || 0),
          0,
          (config == null ? void 0 : config.maxDamageBoost) || 0.4
        );
        return this.clampNumber(1 + boost, 1, 1.5);
      },
      getEntityEnrageSpeedMultiplier(channelKey, targetType, targetId, now = Date.now()) {
        if (!this._isCombatStatusEffectsEnabled()) return 1;
        const effect = this._readActiveStatusEffect(channelKey, targetType, targetId, "enrage", now);
        if (!effect) return 1;
        const config = this._getStatusEffectConfig("enrage");
        const boost = this.clampNumber(
          (effect.stacks || 0) * ((config == null ? void 0 : config.speedBoostPerStack) || 0),
          0,
          (config == null ? void 0 : config.maxSpeedBoost) || 0.3
        );
        return this.clampNumber(1 - boost, 0.5, 1);
      },
      _resolveShadowStatusEffectProfile(profile, shadow = null) {
        const archetype = (profile == null ? void 0 : profile.archetype) || "balanced";
        const personalityKey = (profile == null ? void 0 : profile.personalityKey) || "balanced";
        const isMagicBeast = shadow && this._isShadowMagicBeast(shadow);
        if (isMagicBeast) {
          const family = this._getShadowFamily(shadow);
          const familyMap = C2.FAMILY_STATUS_EFFECT_MAP || {};
          const familyEffect = family ? familyMap[family] : null;
          if (familyEffect) {
            const effectName = Math.random() < 0.7 ? familyEffect.primary : familyEffect.secondary;
            let chance2 = familyEffect.chance * 0.3;
            switch (personalityKey) {
              case "aggressive":
                chance2 += 8e-3;
                break;
              case "strategic":
              case "tactical":
                chance2 += 6e-3;
                break;
              case "supportive":
              case "tank":
                chance2 -= 3e-3;
                break;
              default:
                break;
            }
            return {
              effectName,
              target: "both",
              chance: this.clampNumber(chance2, 5e-3, 0.08)
            };
          }
        }
        const baseByArchetype = {
          tank: { effectName: "armorBreak", target: "boss", chance: 0.012 },
          support: { effectName: "slow", target: "mob", chance: 0.018 },
          caster: { effectName: "poison", target: "both", chance: 0.024 },
          striker: { effectName: "armorBreak", target: "both", chance: 0.028 },
          ranger: { effectName: "slow", target: "both", chance: 0.03 },
          balanced: { effectName: "poison", target: "mob", chance: 0.014 }
        };
        const selected = baseByArchetype[archetype] || baseByArchetype.balanced;
        let chance = selected.chance;
        switch (personalityKey) {
          case "aggressive":
            chance += 8e-3;
            break;
          case "strategic":
          case "tactical":
            chance += 6e-3;
            break;
          case "supportive":
          case "tank":
            chance -= 3e-3;
            break;
          default:
            break;
        }
        return {
          effectName: selected.effectName,
          target: selected.target,
          chance: this.clampNumber(chance, 5e-3, 0.08)
        };
      },
      _pickAliveMobTargetForStatus(aliveMobs) {
        if (!Array.isArray(aliveMobs) || aliveMobs.length === 0) return null;
        const tries = Math.min(4, aliveMobs.length);
        for (let i = 0; i < tries; i++) {
          const mob = aliveMobs[Math.floor(Math.random() * aliveMobs.length)];
          if (mob && mob.hp > 0) return mob;
        }
        return null;
      },
      applyShadowCombatStatusEffects({
        channelKey,
        shadow,
        combatData,
        attacksInSpan = 0,
        bossAttacks = 0,
        mobAttacks = 0,
        aliveMobs = [],
        bossAlive = false,
        now = Date.now()
      }) {
        var _a;
        if (!this._isCombatStatusEffectsEnabled()) return;
        if (!channelKey || !shadow || attacksInSpan <= 0) return;
        const profile = this._resolveShadowRoleProfile(shadow, combatData);
        const effectProfile = this._resolveShadowStatusEffectProfile(profile, shadow);
        if (!(effectProfile == null ? void 0 : effectProfile.effectName)) return;
        const hasBossTarget = bossAlive && bossAttacks > 0 && (effectProfile.target === "boss" || effectProfile.target === "both");
        const hasMobTarget = mobAttacks > 0 && Array.isArray(aliveMobs) && aliveMobs.length > 0 && (effectProfile.target === "mob" || effectProfile.target === "both");
        if (!hasBossTarget && !hasMobTarget) return;
        const chance = this.clampNumber(
          1 - Math.pow(1 - effectProfile.chance, Math.max(1, Math.floor(attacksInSpan))),
          0,
          0.7
        );
        if (Math.random() >= chance) return;
        const stackDelta = attacksInSpan >= 8 ? 2 : 1;
        let targetType = null;
        let targetId = null;
        if (hasBossTarget && hasMobTarget) {
          const bossPreference = bossAttacks / Math.max(1, bossAttacks + mobAttacks);
          if (Math.random() < bossPreference) {
            targetType = "boss";
            targetId = "boss";
          } else {
            const mob = this._pickAliveMobTargetForStatus(aliveMobs);
            const mobId = mob ? this.getEnemyKey(mob, "mob") : null;
            if (mobId) {
              targetType = "mob";
              targetId = mobId;
            }
          }
        } else if (hasBossTarget) {
          targetType = "boss";
          targetId = "boss";
        } else if (hasMobTarget) {
          const mob = this._pickAliveMobTargetForStatus(aliveMobs);
          const mobId = mob ? this.getEnemyKey(mob, "mob") : null;
          if (mobId) {
            targetType = "mob";
            targetId = mobId;
          }
        }
        if (!targetType || targetId == null) return;
        const shadowStats = ((_a = this.getShadowEffectiveStatsCached) == null ? void 0 : _a.call(this, shadow)) || shadow;
        const sourcePower = this._computeSourcePower(shadow == null ? void 0 : shadow.rank, shadowStats);
        this._applyCombatStatusToEntity({
          channelKey,
          targetType,
          targetId,
          effectName: effectProfile.effectName,
          stackDelta,
          now,
          sourcePower
        });
      },
      isCombatStatusTickDue(channelKey, now = Date.now()) {
        var _a, _b;
        if (!this._isCombatStatusEffectsEnabled() || !channelKey) return false;
        const state = (_b = (_a = this._combatStatusByChannel) == null ? void 0 : _a.get) == null ? void 0 : _b.call(_a, channelKey);
        if (!state || !state.hasActive) return false;
        return now >= (state.nextTickAt || 0);
      },
      _DOT_EFFECTS: ["poison", "bleed", "burn", "necrotic"],
      _calculateDotTickDamage(effectName, effect, maxHp, targetRank = null) {
        const config = this._getStatusEffectConfig(effectName);
        if (!config) return 0;
        const basePct = this.clampNumber(
          (effect.stacks || 0) * (config.damagePctPerStack || 0),
          0,
          config.maxDamagePct || 0.02
        );
        const sourceScale = this._getDotSourceScaling(effect, targetRank);
        const scaledPct = this.clampNumber(basePct * sourceScale, 0, config.maxDamagePct * 3);
        return Math.max(1, Math.floor(maxHp * scaledPct));
      },
      _advanceDotTick(effect, effectName, now = Date.now()) {
        const config = this._getStatusEffectConfig(effectName);
        effect.nextTickAt = now + Math.max(400, Math.floor((config == null ? void 0 : config.tickMs) || 1e3));
      },
      _checkFrostbiteRoot(channelKey, targetType, targetId, now = Date.now()) {
        const effect = this._readActiveStatusEffect(channelKey, targetType, targetId, "frostbite", now);
        if (!effect) return;
        const config = this._getStatusEffectConfig("frostbite");
        if (!(config == null ? void 0 : config.rootAtMaxStacks)) return;
        if ((effect.stacks || 0) >= (config.maxStacks || 4) && !effect._rootExpiresAt) {
          effect._rootExpiresAt = now + (config.rootDurationMs || 3e3);
        }
      },
      async processCombatStatusEffects(channelKey, dungeon, now = Date.now()) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
        if (!this._isCombatStatusEffectsEnabled()) return;
        if (!channelKey || !dungeon) return;
        const state = (_b = (_a = this._combatStatusByChannel) == null ? void 0 : _a.get) == null ? void 0 : _b.call(_a, channelKey);
        if (!state || !state.hasActive) return;
        if (now - (state.lastPruneAt || 0) >= 2e3) {
          this._pruneCombatStatusState(channelKey, dungeon, now);
        }
        if (!state.hasActive) return;
        const tickMs = this._getCombatStatusTickMs();
        if (now < (state.nextTickAt || 0)) return;
        if (dungeon == null ? void 0 : dungeon.userParticipating) {
          this._attemptUserDetoxificationCleanse(channelKey, now);
        }
        if ((dungeon == null ? void 0 : dungeon.userParticipating) && Number((_c = this.settings) == null ? void 0 : _c.userHP) > 0) {
          const userRank = ((_e = (_d = this.soloLevelingStats) == null ? void 0 : _d.settings) == null ? void 0 : _e.rank) || "E";
          let userDefeated = false;
          for (const effectName of this._DOT_EFFECTS) {
            if (userDefeated) break;
            const effect = this._readActiveStatusEffect(channelKey, "user", "user", effectName, now);
            if (!effect) continue;
            if (Number.isFinite(effect.nextTickAt) && effect.nextTickAt > now) continue;
            const maxHp = Number(this.settings.userMaxHP) || Number(this.settings.userHP) || 1;
            const dotDamage = this.applyStatusAdjustedIncomingDamage(
              channelKey,
              "user",
              "user",
              this._calculateDotTickDamage(effectName, effect, maxHp, userRank),
              now
            );
            this.syncHPFromStats();
            this.settings.userHP = this._applyUserHpFloor(this.settings.userHP - dotDamage);
            this.pushHPToStats(true);
            this.startRegeneration();
            this._advanceDotTick(effect, effectName, now);
            if (this.settings.userHP <= 0) {
              await this.handleUserDefeat(channelKey);
              userDefeated = true;
            }
          }
          this._checkFrostbiteRoot(channelKey, "user", "user", now);
        }
        if (((_f = dungeon == null ? void 0 : dungeon.boss) == null ? void 0 : _f.hp) > 0) {
          for (const effectName of this._DOT_EFFECTS) {
            const effect = this._readActiveStatusEffect(channelKey, "boss", "boss", effectName, now);
            if (!effect) continue;
            if (Number.isFinite(effect.nextTickAt) && effect.nextTickAt > now) continue;
            const maxHp = Number(dungeon.boss.maxHp) || Number(dungeon.boss.hp) || 1;
            const dotDamage = this._calculateDotTickDamage(effectName, effect, maxHp, dungeon.boss.rank);
            await this.applyDamageToBoss(channelKey, dotDamage, "status");
            this._advanceDotTick(effect, effectName, now);
          }
          this._checkFrostbiteRoot(channelKey, "boss", "boss", now);
        }
        if (state.mobs instanceof Map && state.mobs.size > 0 && Array.isArray((_g = dungeon == null ? void 0 : dungeon.mobs) == null ? void 0 : _g.activeMobs)) {
          const liveMobById = /* @__PURE__ */ new Map();
          for (const mob of dungeon.mobs.activeMobs) {
            if (!mob || mob.hp <= 0) continue;
            const mobId = this.getEnemyKey(mob, "mob");
            if (mobId) liveMobById.set(String(mobId), mob);
          }
          const deadMobsFromStatus = [];
          for (const [mobId] of state.mobs.entries()) {
            const mob = liveMobById.get(String(mobId));
            if (!mob || mob.hp <= 0) {
              state.mobs.delete(String(mobId));
              continue;
            }
            for (const effectName of this._DOT_EFFECTS) {
              const effect = this._readActiveStatusEffect(channelKey, "mob", mobId, effectName, now);
              if (!effect) continue;
              if (Number.isFinite(effect.nextTickAt) && effect.nextTickAt > now) continue;
              const maxHp = Number(mob.maxHp) || Number(mob.hp) || 1;
              const dotDamage = this._calculateDotTickDamage(effectName, effect, maxHp, mob.rank);
              const beforeHp = mob.hp;
              this.applyDamageToEntityHp(mob, dotDamage);
              this._advanceDotTick(effect, effectName, now);
              if (beforeHp > 0 && mob.hp <= 0) {
                deadMobsFromStatus.push(mob);
                state.mobs.delete(String(mobId));
                break;
              }
            }
          }
          if (deadMobsFromStatus.length > 0) {
            const assignedShadows = this.shadowAllocations.get(channelKey) || ((_h = dungeon.shadowAllocation) == null ? void 0 : _h.shadows) || [];
            for (const mob of deadMobsFromStatus) {
              const fallbackAttributed = this._applyFallbackMobKillContribution(
                dungeon,
                assignedShadows,
                null,
                1
              );
              if (!fallbackAttributed) {
                this._logMobContributionMiss(channelKey, this.getEnemyKey(mob, "mob"), {
                  phase: "status-dot"
                });
              }
              this._onMobKilled(channelKey, dungeon, mob.rank);
              this._addToCorpsePile(channelKey, mob, false);
            }
            this._cleanupDungeonActiveMobs(dungeon);
            this._pruneShadowMobContributionLedger(dungeon);
            this.queueHPBarUpdate(channelKey);
          }
        }
        this._pruneCombatStatusState(channelKey, dungeon, now);
        const refreshed = (_j = (_i = this._combatStatusByChannel) == null ? void 0 : _i.get) == null ? void 0 : _j.call(_i, channelKey);
        if (refreshed && refreshed.hasActive) {
          refreshed.nextTickAt = now + tickMs;
        }
      }
    };
  }
});

// src/Dungeons/combat-shadow-allocation.js
var require_combat_shadow_allocation = __commonJS({
  "src/Dungeons/combat-shadow-allocation.js"(exports2, module2) {
    module2.exports = {
      _markAllocationDirty(reason = "unknown", { shadowSetChanged = false } = {}) {
        this._allocationDirty = true;
        this._allocationDirtyReason = reason || "unknown";
        if (shadowSetChanged) {
          this._allocationShadowSetDirty = true;
          this._allocationSortedShadowsCache = null;
          this._allocationSortedShadowsCacheTime = null;
          this._allocationScoreCache = null;
          this._deployStarterPoolCache = null;
          this._deployStarterPoolCacheTime = null;
          this._deployStarterPoolCacheRank = null;
        }
      },
      _removeExtractedShadowFromAllocations(extractedShadowId) {
        if (!extractedShadowId) return;
        const idStr = String(extractedShadowId);
        for (const [channelKey, allocation] of (this.shadowAllocations || /* @__PURE__ */ new Map()).entries()) {
          if (!Array.isArray(allocation)) continue;
          const idx = allocation.findIndex((s) => String(this.getShadowIdValue(s)) === idStr);
          if (idx !== -1) {
            allocation.splice(idx, 1);
            this.debugLog(`Removed extracted shadow ${idStr} from dungeon ${channelKey}`);
          }
        }
      },
      async _buildSortedShadowCache(shadows, { yieldEvery = 2500 } = {}) {
        if (!Array.isArray(shadows) || shadows.length === 0) {
          return { sorted: [], scoreCache: /* @__PURE__ */ new Map() };
        }
        const scoreCache = /* @__PURE__ */ new Map();
        const readScore = (shadow) => {
          const sid = this.getShadowIdValue(shadow);
          if (!sid) return this.getShadowCombatScore(shadow);
          const key = String(sid);
          if (scoreCache.has(key)) return scoreCache.get(key);
          const score = this.getShadowCombatScore(shadow);
          scoreCache.set(key, score);
          return score;
        };
        const decorated = [];
        const yieldStride = Number.isFinite(yieldEvery) && yieldEvery > 0 ? Math.floor(yieldEvery) : 2500;
        for (let i = 0; i < shadows.length; i++) {
          const normalized = this.normalizeShadowId(shadows[i]) || shadows[i];
          if (normalized) decorated.push([readScore(normalized), normalized]);
          if ((i + 1) % yieldStride === 0) {
            await this._yieldToEventLoop();
            if (!this.started) return null;
          }
        }
        decorated.sort((a, b) => b[0] - a[0]);
        return {
          sorted: decorated.map((d) => d[1]),
          scoreCache
        };
      },
      // Guarantee a minimum support+tank presence in the deployed (capped) set.
      // A pure strongest-first army cap can bench every support/tank shadow when
      // they score lower than strikers, silently zeroing the guard/weaken/heal
      // role-pressure mechanics. This swaps the WEAKEST deployed non-support/tank
      // shadows for the STRONGEST benched support/tank shadows, preserving the
      // deployed count and only touching up to `minSupportTankShare` of it.
      //
      // Bounded: classifies the `deployed` set (O(cap)) and scans only the top of
      // `benched` (strongest-first) up to a cap, so it stays cheap even for very
      // large armies. Gated by roleDiversityGuaranteeEnabled (default on).
      _applyRoleDiversityGuarantee(deployed, benched) {
        var _a, _b, _c;
        if (((_a = this.settings) == null ? void 0 : _a.roleDiversityGuaranteeEnabled) === false) return deployed;
        const cap = deployed.length;
        if (cap < 10 || !Array.isArray(benched) || benched.length === 0) return deployed;
        const minShare = this.clampNumber(
          Number.isFinite((_b = this.settings) == null ? void 0 : _b.minSupportTankShare) ? this.settings.minSupportTankShare : 0.12,
          0,
          0.5
        );
        const targetCount = Math.floor(cap * minShare);
        if (targetCount <= 0) return deployed;
        const isSupportOrTank = (s) => {
          const a = this._getShadowArchetypeForRole(s);
          return a === "support" || a === "tank";
        };
        let haveCount = 0;
        const swappableStrikerIdx = [];
        for (let i = 0; i < deployed.length; i++) {
          if (isSupportOrTank(deployed[i])) haveCount++;
          else swappableStrikerIdx.push(i);
        }
        if (haveCount >= targetCount || swappableStrikerIdx.length === 0) return deployed;
        let need = targetCount - haveCount;
        const result = deployed.slice();
        let swapCursor = swappableStrikerIdx.length - 1;
        const scanCap = Math.min(benched.length, Math.max(1e3, cap * 3));
        for (let b = 0; b < scanCap && need > 0 && swapCursor >= 0; b++) {
          if (!isSupportOrTank(benched[b])) continue;
          result[swappableStrikerIdx[swapCursor--]] = benched[b];
          need--;
        }
        if (need < targetCount - haveCount) {
          (_c = this.debugLog) == null ? void 0 : _c.call(this, "ALLOCATION", `Role-diversity guarantee: promoted ${targetCount - haveCount - need} support/tank shadow(s) into the deployed set`);
        }
        return result;
      },
      // In-flight guard (2026-07-15): overlapping calls — a deploy-storm across many
      // dungeons plus the combat tick's own refresh — must not each run the full
      // O(army) sort + O(combatPool) distribution concurrently (they interleave via
      // the sort's setTimeout(0) yields). Coalesce non-forced callers onto the
      // in-flight run; a forced recompute waits for it, then runs fresh so it never
      // rides stale/cached data.
      async preSplitShadowArmy(forceRecalculate = false) {
        var _a;
        if (this._preSplitInFlight) {
          if (!forceRecalculate) {
            const coalesced = await this._preSplitInFlight;
            if (!((_a = this._hasDeployedDungeonMissingAllocation) == null ? void 0 : _a.call(this))) {
              return coalesced;
            }
          } else {
            try {
              await this._preSplitInFlight;
            } catch (_) {
            }
          }
        }
        const run = (async () => {
          try {
            return await this._preSplitShadowArmyImpl(forceRecalculate);
          } finally {
            if (this._preSplitInFlight === run) this._preSplitInFlight = null;
          }
        })();
        this._preSplitInFlight = run;
        return run;
      },
      async _preSplitShadowArmyImpl(forceRecalculate = false) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
        const now = Date.now();
        const cacheFresh = this.allocationCacheTime && now - this.allocationCacheTime < this.allocationCacheTTL;
        if (!forceRecalculate && cacheFresh && !this._hasDeployedDungeonMissingAllocation()) {
          return;
        }
        if (!forceRecalculate && !this._allocationDirty && cacheFresh) {
          return;
        }
        const activeDungeonsList = Array.from(this.activeDungeons.values()).filter(
          (d) => !d.completed && !d.failed && (d.boss.hp > 0 || d.boss._isSentinel) && d.shadowsDeployed
        );
        if (activeDungeonsList.length === 0) {
          this.shadowAllocations.clear();
          this.shadowReserve = [];
          const cachedShadowCount = Array.isArray(this._allocationSortedShadowsCache) ? this._allocationSortedShadowsCache.length : ((_a = this.allocationCache) == null ? void 0 : _a.count) || 0;
          this.allocationCache = { count: cachedShadowCount };
          this.allocationCacheTime = now;
          this._allocationDirty = false;
          this._allocationDirtyReason = null;
          return;
        }
        const getRankIndex = (rank) => this.getRankIndexValue(rank);
        const getShadowId = (s) => {
          const id = this.getShadowIdValue(s);
          return id ? String(id) : null;
        };
        const getBossFraction = (d) => {
          var _a2, _b2;
          return ((_a2 = d == null ? void 0 : d.boss) == null ? void 0 : _a2.maxHp) && ((_b2 = d == null ? void 0 : d.boss) == null ? void 0 : _b2.hp) >= 0 ? d.boss.hp / d.boss.maxHp : 0;
        };
        const getMobFraction = (d) => {
          var _a2, _b2;
          return ((_a2 = d == null ? void 0 : d.mobs) == null ? void 0 : _a2.targetCount) && ((_b2 = d == null ? void 0 : d.mobs) == null ? void 0 : _b2.remaining) >= 0 ? d.mobs.remaining / d.mobs.targetCount : 0;
        };
        const getUrgency = (d) => {
          var _a2;
          const bossAlive = (((_a2 = d == null ? void 0 : d.boss) == null ? void 0 : _a2.hp) || 0) > 0;
          const bossUrgency = bossAlive ? 0.7 + getBossFraction(d) * 0.6 : 0.55;
          const mobUrgency = 0.6 + getMobFraction(d) * 0.5;
          return bossUrgency * mobUrgency;
        };
        const weightedDungeons = activeDungeonsList.map((d) => {
          const canonicalRank = this.normalizeRankLabel(d == null ? void 0 : d.rank) || "E";
          d.rank = canonicalRank;
          const rIdx = getRankIndex(canonicalRank);
          const weight = Math.pow(rIdx + 1, 1.25) * getUrgency(d);
          return { dungeon: d, channelKey: d.channelKey, rankIndex: rIdx, weight };
        }).sort((a, b) => b.weight - a.weight);
        const assignedIds = /* @__PURE__ */ new Set();
        let exchangeMarkedIds = /* @__PURE__ */ new Set();
        try {
          const seInstance = this._getPluginSafe("ShadowExchange");
          if (seInstance == null ? void 0 : seInstance.getMarkedShadowIds) {
            const rawMarked = seInstance.getMarkedShadowIds();
            if (rawMarked instanceof Set) {
              rawMarked.forEach((id) => id && exchangeMarkedIds.add(String(id)));
            }
          }
        } catch (_) {
          (_b = this.debugLog) == null ? void 0 : _b.call(this, "ERROR", "Failed to get ShadowExchange marked IDs", _);
        }
        const sensesDeployedIds = this._getShadowSensesDeployedIds();
        let shadowsSortedAll = this._allocationSortedShadowsCache;
        const sortedCacheTTL = Number.isFinite(this._allocationSortedShadowsCacheTTL) ? Math.max(0, this._allocationSortedShadowsCacheTTL) : this.allocationCacheTTL;
        const sortedCacheFresh = this._allocationSortedShadowsCacheTime ? sortedCacheTTL <= 0 || now - this._allocationSortedShadowsCacheTime < sortedCacheTTL : false;
        const canReuseSortedCache = !forceRecalculate && !this._allocationShadowSetDirty && Array.isArray(shadowsSortedAll) && this._allocationSortedShadowsCacheTime && sortedCacheFresh;
        if (!canReuseSortedCache) {
          const allShadows = await this.getAllShadows();
          if (!allShadows || allShadows.length === 0) {
            this.shadowAllocations.clear();
            this.shadowReserve = [];
            this.allocationCache = { count: 0 };
            this.allocationCacheTime = now;
            this._allocationDirty = false;
            this._allocationDirtyReason = null;
            this._allocationShadowSetDirty = false;
            this._allocationSortedShadowsCache = [];
            this._allocationSortedShadowsCacheTime = now;
            this._allocationScoreCache = /* @__PURE__ */ new Map();
            return;
          }
          const sortedCache = await this._buildSortedShadowCache(allShadows, { yieldEvery: 2500 });
          if (!sortedCache) return;
          shadowsSortedAll = sortedCache.sorted;
          this._allocationSortedShadowsCache = shadowsSortedAll;
          this._allocationSortedShadowsCacheTime = now;
          this._allocationScoreCache = sortedCache.scoreCache;
          this._allocationShadowSetDirty = false;
        }
        const allocationScoreCache = this._allocationScoreCache instanceof Map ? this._allocationScoreCache : /* @__PURE__ */ new Map();
        this._allocationScoreCache = allocationScoreCache;
        const getShadowScore = (shadow) => {
          const sid = getShadowId(shadow);
          if (!sid) return this.getShadowCombatScore(shadow);
          const key = String(sid);
          if (allocationScoreCache.has(key)) return allocationScoreCache.get(key);
          const score = this.getShadowCombatScore(shadow);
          allocationScoreCache.set(key, score);
          return score;
        };
        let shadowsSorted = shadowsSortedAll.filter((s) => {
          const id = getShadowId(s);
          return id && !exchangeMarkedIds.has(id) && !sensesDeployedIds.has(id);
        });
        let overCapBenched = [];
        if (this.shadowArmy && typeof this.shadowArmy.getShadowArmyCap === "function") {
          const soloData = (_d = (_c = this.shadowArmy).getSoloLevelingData) == null ? void 0 : _d.call(_c);
          const playerRank = (soloData == null ? void 0 : soloData.rank) || "E";
          const intelligence = ((_e = soloData == null ? void 0 : soloData.stats) == null ? void 0 : _e.intelligence) || 0;
          const cap = this.shadowArmy.getShadowArmyCap(playerRank, intelligence);
          if (Number.isFinite(cap) && shadowsSorted.length > cap) {
            const benchedCount = shadowsSorted.length - cap;
            this.debugLog("ALLOCATION", `Shadow army over capacity: deploying ${cap}/${shadowsSorted.length} (${benchedCount} benched)`, {
              playerRank,
              intelligence,
              cap,
              total: shadowsSorted.length,
              benchedCount
            });
            overCapBenched = shadowsSorted.slice(cap);
            shadowsSorted = shadowsSorted.slice(0, cap);
          }
        }
        const aRankIndex = getRankIndex("A");
        const allHighRank = activeDungeonsList.every((d) => getRankIndex(d.rank) >= aRankIndex);
        const reservePercent = allHighRank ? 0.05 : 0.1;
        const reserveCount = shadowsSorted.length <= 1 ? 0 : Math.min(shadowsSorted.length - 1, Math.max(1, Math.floor(shadowsSorted.length * reservePercent)));
        const reserveShadows = reserveCount > 0 ? shadowsSorted.slice(-reserveCount).map((s) => this.normalizeShadowId(s) || s) : [];
        const reserveIds = new Set(
          reserveShadows.map((s) => getShadowId(s)).filter(Boolean)
        );
        let combatPool = shadowsSorted.filter((s) => !reserveIds.has(getShadowId(s)));
        if (overCapBenched.length > 0) {
          combatPool = this._applyRoleDiversityGuarantee(combatPool, overCapBenched);
        }
        this.shadowReserve = reserveShadows;
        this.debugLog("ALLOCATION", "Reserve pool", {
          total: shadowsSorted.length,
          reserveCount,
          reservePercent: Math.round(reservePercent * 100) + "%",
          combatPool: combatPool.length,
          allHighRank
        });
        for (const id of reserveIds) {
          assignedIds.add(id);
        }
        const rankBuckets = /* @__PURE__ */ new Map();
        for (const s of combatPool) {
          const id = getShadowId(s);
          if (!id || assignedIds.has(id)) continue;
          const ri = getRankIndex(s.rank);
          if (!rankBuckets.has(ri)) rankBuckets.set(ri, []);
          rankBuckets.get(ri).push(s);
        }
        const DEPLOY_POOL_SHARE = this.clampNumber(
          Number.isFinite((_f = this.settings) == null ? void 0 : _f.rankAllocationDeployPoolShare) ? this.settings.rankAllocationDeployPoolShare : 0.8,
          0.05,
          1
        );
        const PREFERRED_PAIR_SHARE = this.clampNumber(
          Number.isFinite((_g = this.settings) == null ? void 0 : _g.rankAllocationPreferredPairShare) ? this.settings.rankAllocationPreferredPairShare : 0.85,
          0.5,
          1
        );
        const SAME_RANK_WITHIN_PAIR_SHARE = this.clampNumber(
          Number.isFinite((_h = this.settings) == null ? void 0 : _h.rankAllocationSameRankShare) ? this.settings.rankAllocationSameRankShare : 0.85,
          0.5,
          0.95
        );
        const MIN_DUNGEON_ASSIGNMENT = 3;
        const totalWeight = weightedDungeons.reduce((sum, d) => sum + d.weight, 0) || 1;
        const minDeployTarget = Math.min(
          combatPool.length,
          weightedDungeons.length * MIN_DUNGEON_ASSIGNMENT
        );
        const deployPoolTarget = Math.min(
          combatPool.length,
          Math.max(minDeployTarget, Math.floor(combatPool.length * DEPLOY_POOL_SHARE))
        );
        const bucketCursors = /* @__PURE__ */ new Map();
        const bucketAvailable = (ri) => {
          var _a2;
          return (((_a2 = rankBuckets.get(ri)) == null ? void 0 : _a2.length) || 0) - (bucketCursors.get(ri) || 0);
        };
        const pickFromBucket = (ri, count) => {
          const bucket = rankBuckets.get(ri);
          const picked = [];
          if (!bucket || count <= 0) return picked;
          let i = bucketCursors.get(ri) || 0;
          for (; i < bucket.length && picked.length < count; i++) {
            const s = bucket[i];
            const id = getShadowId(s);
            if (!id || assignedIds.has(id)) continue;
            assignedIds.add(id);
            picked.push(s);
          }
          bucketCursors.set(ri, i);
          return picked;
        };
        const pickFallbackNearest = (dungeonRI, neededCount) => {
          if (neededCount <= 0) return [];
          const picked = [];
          const rankIndices = Array.from(rankBuckets.keys());
          if (rankIndices.length === 0) return picked;
          const maxRI = Math.max(...rankIndices);
          for (let distance = 1; distance <= maxRI + 1 && picked.length < neededCount; distance++) {
            const lowerRI = dungeonRI - distance;
            if (lowerRI >= 0) {
              picked.push(...pickFromBucket(lowerRI, neededCount - picked.length));
            }
            if (picked.length >= neededCount) break;
            const upperRI = dungeonRI + distance;
            if (upperRI <= maxRI) {
              picked.push(...pickFromBucket(upperRI, neededCount - picked.length));
            }
          }
          return picked;
        };
        let remainingDeployBudget = deployPoolTarget;
        let remainingWeight = totalWeight;
        weightedDungeons.forEach((dw, idx) => {
          const previousAssigned = this.shadowAllocations.get(dw.channelKey);
          const previousCount = Array.isArray(previousAssigned) ? previousAssigned.length : 0;
          const selected = [];
          const dungeonRI = dw.rankIndex;
          const sameRankAvailable = bucketAvailable(dungeonRI);
          const higherRankAvailable = bucketAvailable(dungeonRI + 1);
          const pairAvailable = sameRankAvailable + higherRankAvailable;
          const dungeonsLeft = weightedDungeons.length - idx;
          const reservedForOthers = Math.max(0, (dungeonsLeft - 1) * MIN_DUNGEON_ASSIGNMENT);
          const maxForThis = Math.max(0, remainingDeployBudget - reservedForOthers);
          const weightedShare = remainingWeight > 0 ? Math.round(remainingDeployBudget * dw.weight / remainingWeight) : Math.floor(remainingDeployBudget / Math.max(1, dungeonsLeft));
          const baseTargetCount = Math.max(
            0,
            Math.min(maxForThis, Math.max(MIN_DUNGEON_ASSIGNMENT, weightedShare))
          );
          const maxTargetByPair = PREFERRED_PAIR_SHARE > 0 ? Math.floor(pairAvailable / PREFERRED_PAIR_SHARE) : baseTargetCount;
          const targetCount = maxTargetByPair > 0 ? Math.min(baseTargetCount, maxTargetByPair) : Math.min(baseTargetCount, MIN_DUNGEON_ASSIGNMENT);
          const pairTarget = Math.min(
            targetCount,
            Math.max(1, Math.floor(targetCount * PREFERRED_PAIR_SHARE))
          );
          const sameRankTarget = Math.floor(pairTarget * SAME_RANK_WITHIN_PAIR_SHARE);
          const higherRankTarget = Math.max(0, pairTarget - sameRankTarget);
          if (sameRankTarget > 0) {
            selected.push(...pickFromBucket(dungeonRI, sameRankTarget));
          }
          if (higherRankTarget > 0) {
            selected.push(...pickFromBucket(dungeonRI + 1, higherRankTarget));
          }
          if (selected.length < pairTarget) {
            selected.push(...pickFromBucket(dungeonRI, pairTarget - selected.length));
          }
          if (selected.length < pairTarget) {
            selected.push(...pickFromBucket(dungeonRI + 1, pairTarget - selected.length));
          }
          if (selected.length < targetCount) {
            selected.push(...pickFallbackNearest(dungeonRI, targetCount - selected.length));
          }
          const normalizedAssigned = selected.map((s) => this.normalizeShadowId(s)).filter(Boolean);
          this.shadowAllocations.set(dw.channelKey, normalizedAssigned);
          dw.dungeon.shadowAllocation = {
            shadows: normalizedAssigned,
            totalPower: normalizedAssigned.reduce((sum, s) => sum + getShadowScore(s), 0),
            updatedAt: Date.now(),
            source: "shadowAllocations"
          };
          if (dw.dungeon.boss) {
            dw.dungeon.boss.expectedShadowCount = normalizedAssigned.length;
          }
          if (normalizedAssigned.length !== previousCount) {
            dw.dungeon._cachedAliveCount = null;
            dw.dungeon.criticalHPWarningShown = false;
          }
          remainingDeployBudget = Math.max(0, remainingDeployBudget - normalizedAssigned.length);
          remainingWeight = Math.max(0, remainingWeight - dw.weight);
        });
        if ((_i = this.settings) == null ? void 0 : _i.debug) {
          this._allocationSummary = /* @__PURE__ */ new Map();
          const rankNames = this.settings.dungeonRanks || [];
          weightedDungeons.forEach((dw) => {
            const assigned = this.shadowAllocations.get(dw.channelKey) || [];
            const rankBreakdown = {};
            for (const s of assigned) {
              const r = (s == null ? void 0 : s.rank) || "E";
              rankBreakdown[r] = (rankBreakdown[r] || 0) + 1;
            }
            const avgRankIndex = assigned.reduce((sum, s) => sum + getRankIndex((s == null ? void 0 : s.rank) || "E"), 0) / Math.max(1, assigned.length);
            this._allocationSummary.set(dw.channelKey, {
              dungeonRank: dw.dungeon.rank,
              assignedCount: assigned.length,
              avgShadowRankIndex: avgRankIndex,
              rankBreakdown
            });
          });
          this.debugLog("ALLOCATION", "Rank-tiered allocation summary", {
            strategy: `${Math.round(PREFERRED_PAIR_SHARE * 100)}% preferred pair (same-rank ${Math.round(SAME_RANK_WITHIN_PAIR_SHARE * 100)}% / one-rank-higher ${Math.round((1 - SAME_RANK_WITHIN_PAIR_SHARE) * 100)}%)`,
            deployPoolShare: `${Math.round(DEPLOY_POOL_SHARE * 100)}%`,
            deployPoolTarget,
            rankBucketSizes: Object.fromEntries(
              Array.from(rankBuckets.entries()).map(([ri, arr]) => [rankNames[ri] || ri, arr.length])
            ),
            dungeons: Array.from(this._allocationSummary.entries()).map(([channelKey, meta]) => ({
              channelKey,
              ...meta
            }))
          });
        } else if ((_j = this._allocationSummary) == null ? void 0 : _j.size) {
          this._allocationSummary.clear();
        }
        this.allocationCache = { count: shadowsSortedAll.length };
        this.allocationCacheTime = now;
        this._allocationDirty = false;
        this._allocationDirtyReason = null;
        (_k = this._invalidateDeployAssignedUnion) == null ? void 0 : _k.call(this);
      },
      async startShadowAttacks(channelKey, options = {}) {
        var _a, _b, _c, _d, _e;
        const dungeon = this.activeDungeons.get(channelKey);
        if (!dungeon || dungeon.completed || dungeon.failed || dungeon._completing || !dungeon.shadowsDeployed || ((_a = dungeon.boss) == null ? void 0 : _a.hp) <= 0 && !((_b = dungeon.boss) == null ? void 0 : _b._isSentinel)) {
          this.shadowAttackIntervals.has(channelKey) && this.stopShadowAttacks(channelKey);
          return;
        }
        if (this.shadowAttackIntervals.has(channelKey)) return;
        const allowBlockingReallocation = (options == null ? void 0 : options.allowBlockingReallocation) !== false;
        let { assignedFromMap, assignedFromDungeon, assignedShadows } = this._getAssignedShadowsForDungeon(channelKey, dungeon);
        if (assignedShadows.length === 0 && allowBlockingReallocation) {
          try {
            this._markAllocationDirty("start-shadow-attacks-missing-allocation");
            await this.preSplitShadowArmy();
            assignedFromMap = this.shadowAllocations.get(channelKey) || [];
            assignedShadows = assignedFromMap.length > 0 ? assignedFromMap : assignedFromDungeon;
            assignedFromMap.length > 0 && ({ assignedShadows } = this._getAssignedShadowsForDungeon(channelKey, dungeon));
          } catch (error) {
            this.errorLog("DEPLOY", "Failed to reallocate shadows on startShadowAttacks", error);
          }
        }
        if (assignedShadows.length === 0) {
          this._deployWarnings ??= /* @__PURE__ */ new Map();
          const last = this._deployWarnings.get(channelKey) || 0;
          const nowWarn = Date.now();
          if (nowWarn - last > 3e4) {
            this._deployWarnings.set(channelKey, nowWarn);
            this.debugLog("DEPLOY", "No shadows allocated for dungeon at startShadowAttacks", {
              channelKey,
              dungeonRank: dungeon.rank,
              bossHp: (_c = dungeon.boss) == null ? void 0 : _c.hp,
              totalShadowsKnown: Number.isFinite((_d = this.allocationCache) == null ? void 0 : _d.count) ? this.allocationCache.count : void 0,
              hasShadowArmy: Boolean(this.shadowArmy),
              activeDungeons: ((_e = this.activeDungeons) == null ? void 0 : _e.size) ?? 0
            });
          }
        }
        if (assignedShadows.length > 0) {
          const wasShadowHPEmpty = !dungeon.shadowHP || dungeon.shadowHP.size === 0;
          const shadowHP = dungeon.shadowHP || (dungeon.shadowHP = /* @__PURE__ */ new Map());
          const deadShadows = this.deadShadows.get(channelKey) || /* @__PURE__ */ new Set();
          this.maybePruneDungeonShadowState({ dungeon, channelKey, assignedShadows, deadShadows });
          const shadowsToInitialize = this._collectShadowsNeedingHPInit(assignedShadows, deadShadows);
          await this._initializeShadowHPBatch(shadowsToInitialize, shadowHP, "before_combat");
          if (wasShadowHPEmpty) {
            for (const shadow of assignedShadows) {
              const shadowId = this.getShadowIdValue(shadow);
              if (!shadowId) continue;
              const hpData = shadowHP.get(shadowId);
              if (!hpData || typeof hpData.maxHp !== "number" || hpData.maxHp <= 0) continue;
              typeof hpData.hp === "number" && hpData.hp < hpData.maxHp && (hpData.hp = hpData.maxHp);
            }
          }
          dungeon.shadowHP = shadowHP;
        }
        let activeInterval = 3e3;
        if (this.shadowArmy && dungeon) {
          const assignedShadows2 = this.shadowAllocations.get(channelKey) || [];
          if (assignedShadows2.length > 0) {
            const sample = assignedShadows2.length > 200 ? assignedShadows2.filter((_, i) => i % Math.ceil(assignedShadows2.length / 200) === 0) : assignedShadows2;
            const intervals = sample.map((s) => this.computeShadowAttackIntervalMs(s)).filter((i) => i > 0);
            if (intervals.length > 0) {
              activeInterval = Math.round(intervals.reduce((sum, i) => sum + i, 0) / intervals.length / 100) * 100;
              activeInterval = Math.max(1e3, Math.min(5e3, activeInterval));
            }
          }
        }
        let backgroundInterval = 5e3 + Math.random() * 2e3;
        const isWindowVisible = this.isWindowVisible();
        if (!isWindowVisible) {
          backgroundInterval = 6e4 + Math.random() * 6e4;
        }
        this._lastShadowAttackTime.set(channelKey, Date.now());
        this._shadowActiveIntervalMs.set(channelKey, activeInterval);
        this._shadowBackgroundIntervalMs.set(channelKey, backgroundInterval);
        this.shadowAttackIntervals.set(channelKey, true);
        this.settings.debug && console.log(`[Dungeons] COMBAT_TRACE: startShadowAttacks \u2014 key=${channelKey}, shadows=${assignedShadows.length}, active=${activeInterval}ms, bg=${backgroundInterval}ms`);
        this._ensureCombatLoop();
      },
      stopShadowAttacks(channelKey) {
        this.shadowAttackIntervals.delete(channelKey);
        this._shadowActiveIntervalMs.delete(channelKey);
        this._shadowBackgroundIntervalMs.delete(channelKey);
        this.shadowAttackIntervals.size === 0 && this.bossAttackTimers.size === 0 && this.mobAttackTimers.size === 0 && this._stopCombatLoop();
      },
      stopAllShadowAttacks() {
        this.shadowAttackIntervals.clear();
        this._shadowActiveIntervalMs.clear();
        this._shadowBackgroundIntervalMs.clear();
        this.shadowAttackIntervals.size === 0 && this.bossAttackTimers.size === 0 && this.mobAttackTimers.size === 0 && this._stopCombatLoop();
      },
      startBossAttacks(channelKey) {
        var _a, _b;
        const dungeon = this.activeDungeons.get(channelKey);
        if (!dungeon || dungeon.completed || dungeon.failed || dungeon._completing || !dungeon.shadowsDeployed || // Demon Castle sentinel bosses start at hp:0 — don't block boss attacks
        ((_a = dungeon.boss) == null ? void 0 : _a.hp) <= 0 && !((_b = dungeon.boss) == null ? void 0 : _b._isSentinel)) {
          this.bossAttackTimers.has(channelKey) && this.stopBossAttacks(channelKey);
          return;
        }
        if (this.bossAttackTimers.has(channelKey)) return;
        const isWindowVisible = this.isWindowVisible();
        let backgroundInterval = 5e3 + Math.random() * 2e3;
        if (!isWindowVisible) {
          backgroundInterval = 6e4 + Math.random() * 6e4;
        }
        this._lastBossAttackTime.set(channelKey, Date.now());
        this._bossBackgroundIntervalMs.set(channelKey, backgroundInterval);
        this.bossAttackTimers.set(channelKey, true);
        this._ensureCombatLoop();
      },
      stopBossAttacks(channelKey) {
        this.bossAttackTimers.delete(channelKey);
        this._bossBackgroundIntervalMs.delete(channelKey);
        this.shadowAttackIntervals.size === 0 && this.bossAttackTimers.size === 0 && this.mobAttackTimers.size === 0 && this._stopCombatLoop();
      },
      stopAllBossAttacks() {
        this.bossAttackTimers.clear();
        this._bossBackgroundIntervalMs.clear();
        this.shadowAttackIntervals.size === 0 && this.bossAttackTimers.size === 0 && this.mobAttackTimers.size === 0 && this._stopCombatLoop();
      },
      startMobAttacks(channelKey) {
        var _a, _b;
        const dungeon = this.activeDungeons.get(channelKey);
        if (!dungeon || dungeon.completed || dungeon.failed || dungeon._completing || !dungeon.shadowsDeployed || ((_a = dungeon.boss) == null ? void 0 : _a.hp) <= 0 && !((_b = dungeon.boss) == null ? void 0 : _b._isSentinel)) {
          this.mobAttackTimers.has(channelKey) && this.stopMobAttacks(channelKey);
          return;
        }
        if (this.mobAttackTimers.has(channelKey)) return;
        const isWindowVisible = this.isWindowVisible();
        let backgroundInterval = 5e3 + Math.random() * 2e3;
        if (!isWindowVisible) {
          backgroundInterval = 6e4 + Math.random() * 6e4;
        }
        this._lastMobAttackTime.set(channelKey, Date.now());
        this._mobBackgroundIntervalMs.set(channelKey, backgroundInterval);
        this.mobAttackTimers.set(channelKey, true);
        this._ensureCombatLoop();
      },
      stopMobAttacks(channelKey) {
        this.mobAttackTimers.delete(channelKey);
        this._mobBackgroundIntervalMs.delete(channelKey);
        this.shadowAttackIntervals.size === 0 && this.bossAttackTimers.size === 0 && this.mobAttackTimers.size === 0 && this._stopCombatLoop();
      },
      stopAllMobAttacks() {
        this.mobAttackTimers.clear();
        this._mobBackgroundIntervalMs.clear();
        this.shadowAttackIntervals.size === 0 && this.bossAttackTimers.size === 0 && this.mobAttackTimers.size === 0 && this._stopCombatLoop();
      }
    };
  }
});

// src/Dungeons/combat-shadow-execution.js
var require_combat_shadow_execution = __commonJS({
  "src/Dungeons/combat-shadow-execution.js"(exports2, module2) {
    var C2 = require_constants();
    module2.exports = {
      async processShadowAttacks(channelKey, cyclesMultiplier = 1, isWindowVisible = null, tickBudget = 500) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y;
        try {
          if (isWindowVisible === null) isWindowVisible = this.isWindowVisible();
          if (!isWindowVisible) {
            cyclesMultiplier = Math.max(1, Math.floor(cyclesMultiplier * 0.25));
          }
          if (isWindowVisible && this._combatTickCount % 10 === 0) {
            this.validateActiveDungeonStatus();
          }
          const dungeon = this._getActiveDungeon(channelKey);
          if (!dungeon) {
            this.stopShadowAttacks(channelKey);
            if (this.settings.userActiveDungeon === channelKey) {
              this.settings.userActiveDungeon = null;
              this.saveSettings();
            }
            return;
          }
          if (dungeon.boss.hp <= 0 && ((_b = (_a = dungeon.mobs) == null ? void 0 : _a.activeMobs) == null ? void 0 : _b.length) === 0) {
            if (!dungeon._isDemonCastle || (((_c = dungeon.mobs) == null ? void 0 : _c.remaining) || 0) <= 0) {
              this.stopShadowAttacks(channelKey);
              return;
            }
          }
          if (!this.shadowArmy) {
            this.settings.debug && console.log(`[Dungeons] COMBAT_TRACE: processShadowAttacks \u2014 SKIP, no shadowArmy ref`);
            return;
          }
          try {
            if (!dungeon.shadowCombatData || !(dungeon.shadowCombatData instanceof Map)) {
              dungeon.shadowCombatData = /* @__PURE__ */ new Map();
            }
            if (!dungeon.shadowHP || !(dungeon.shadowHP instanceof Map)) {
              dungeon.shadowHP = /* @__PURE__ */ new Map();
              if (!dungeon.shadowAttacks || typeof dungeon.shadowAttacks !== "object") {
                dungeon.shadowAttacks = {};
                (_d = this.debugLog) == null ? void 0 : _d.call(this, "SHADOW_ATTACKS", "shadowAttacks reinitialized (was null/invalid)", {
                  channelKey
                });
              }
            }
            const hasAllocation = this.shadowAllocations.has(channelKey) && ((_e = this.shadowAllocations.get(channelKey)) == null ? void 0 : _e.length) > 0;
            const hardExpired = this._isAllocationHardExpired();
            const deployRebalancePending = (dungeon == null ? void 0 : dungeon._deployPendingFullAllocation) === true || ((_g = (_f = this._deployRebalanceInFlight) == null ? void 0 : _f.has) == null ? void 0 : _g.call(_f, channelKey));
            let didReallocate = false;
            if ((hardExpired || this._allocationDirty || !hasAllocation) && !this._tickAllocationLock) {
              if (deployRebalancePending) {
                !hasAllocation && this.ensureDeployedSpawnPipeline(channelKey, "combat_waiting_for_rebalance");
              } else {
                this._markAllocationDirty(hardExpired ? "combat-hard-refresh" : "combat-missing-allocation");
                this._tickAllocationLock = true;
                try {
                  await this.preSplitShadowArmy();
                  didReallocate = true;
                } finally {
                  this._tickAllocationLock = false;
                }
              }
            }
            const assignedShadows = this.shadowAllocations.get(channelKey);
            if (!assignedShadows || assignedShadows.length === 0) {
              this.settings.debug && console.log(`[Dungeons] COMBAT_TRACE: processShadowAttacks \u2014 NO shadows for ${channelKey}`);
              return;
            }
            this.syncDungeonDifficultyScale(dungeon, channelKey);
            if (!didReallocate && !deployRebalancePending) {
              const nowRebalance = Date.now();
              const lastRebalance = this._lastRebalanceAt.get(channelKey) || 0;
              const rebalanceAllowed = nowRebalance - lastRebalance >= this._rebalanceCooldownMs;
              if (rebalanceAllowed) {
                const dungeonRankIndex = this.getRankIndexValue(dungeon.rank);
                const avgAssignedRankIndex = assignedShadows.reduce((sum, s) => sum + this.getRankIndexValue((s == null ? void 0 : s.rank) || "E"), 0) / Math.max(1, assignedShadows.length);
                const expected = ((_h = dungeon == null ? void 0 : dungeon.boss) == null ? void 0 : _h.expectedShadowCount) || 1;
                const isBossAlive = (((_i = dungeon == null ? void 0 : dungeon.boss) == null ? void 0 : _i.hp) || 0) > 0;
                const bossFraction = ((_j = dungeon == null ? void 0 : dungeon.boss) == null ? void 0 : _j.maxHp) && ((_k = dungeon == null ? void 0 : dungeon.boss) == null ? void 0 : _k.hp) >= 0 ? dungeon.boss.hp / dungeon.boss.maxHp : 0;
                const needsRebalance = assignedShadows.length < Math.max(1, Math.floor(expected * 0.75)) || avgAssignedRankIndex < dungeonRankIndex - 0.9 || isBossAlive && bossFraction > 0.6 && assignedShadows.length < expected;
                if (needsRebalance && !this._tickAllocationLock) {
                  this._lastRebalanceAt.set(channelKey, nowRebalance);
                  this._markAllocationDirty("combat-rebalance");
                  this._tickAllocationLock = true;
                  try {
                    await this.preSplitShadowArmy();
                    this.syncDungeonDifficultyScale(dungeon, channelKey, { scaleExistingMobs: true });
                  } finally {
                    this._tickAllocationLock = false;
                  }
                }
              }
            }
            const deadShadows = this.deadShadows.get(channelKey) || /* @__PURE__ */ new Set();
            const shadowHP = dungeon.shadowHP || (dungeon.shadowHP = /* @__PURE__ */ new Map());
            this.maybePruneDungeonShadowState({ dungeon, channelKey, assignedShadows, deadShadows });
            if (!dungeon.shadowCombatData || !(dungeon.shadowCombatData instanceof Map)) {
              dungeon.shadowCombatData = /* @__PURE__ */ new Map();
            }
            for (const shadow of assignedShadows) {
              const shadowId = this.getShadowIdValue(shadow);
              if (!shadowId) continue;
              if (deadShadows.has(shadowId)) continue;
              if (shadowHP.has(shadowId)) continue;
              try {
                this.initializeShadowHPSync(shadow, shadowHP);
                !dungeon.shadowCombatData.has(shadowId) && dungeon.shadowCombatData.set(shadowId, this.initializeShadowCombatData(shadow));
              } catch (error) {
                this.errorLog("SHADOW_INIT", `Failed to initialize shadow ${shadowId}`, error);
              }
            }
            if (isWindowVisible) {
              if (!(dungeon._lastResurrectionAttempt instanceof Map)) dungeon._lastResurrectionAttempt = /* @__PURE__ */ new Map();
              const nowResurrection = Date.now();
              for (const shadow of assignedShadows) {
                const shadowId = this.getShadowIdValue(shadow);
                if (!shadowId) continue;
                if (!deadShadows.has(shadowId)) continue;
                const hpData = shadowHP.get(shadowId);
                if (!hpData || hpData.hp > 0) continue;
                const lastAttempt = dungeon._lastResurrectionAttempt.get(shadowId) || 0;
                if (nowResurrection - lastAttempt < 2e3) continue;
                dungeon._lastResurrectionAttempt.set(shadowId, nowResurrection);
                const resurrected = await this.attemptAutoResurrection(shadow, channelKey);
                if (resurrected) {
                  if (!hpData.maxHp || hpData.maxHp <= 0) {
                    const recalculated = this.initializeShadowHPSync(shadow, shadowHP);
                    hpData.maxHp = (recalculated == null ? void 0 : recalculated.maxHp) || 100;
                  }
                  hpData.hp = hpData.maxHp;
                  shadowHP.set(shadowId, { ...hpData });
                  deadShadows.delete(shadowId);
                  if (dungeon._cachedAliveCount != null) dungeon._cachedAliveCount++;
                  dungeon._lastResurrectionAttempt.delete(shadowId);
                } else {
                  break;
                }
              }
            }
            const bossStats = {
              strength: Number(dungeon.boss.strength) || 0,
              agility: Number(dungeon.boss.agility) || 0,
              intelligence: Number(dungeon.boss.intelligence) || 0,
              vitality: Number(dungeon.boss.vitality) || 0,
              perception: Number(dungeon.boss.perception) || 0
            };
            const dungeonMobCap = Number((_l = dungeon.mobs) == null ? void 0 : _l.mobCapacity) || 200;
            const scaledMobCap = Math.max(200, Math.min(5e3, Math.floor(dungeonMobCap * 0.1)));
            const maxMobsToProcess = isWindowVisible ? Math.max(120, scaledMobCap) : Math.max(80, Math.floor(scaledMobCap * 0.2));
            const aliveMobs = [];
            for (const m of dungeon.mobs.activeMobs) {
              if (aliveMobs.length >= maxMobsToProcess) break;
              m && m.hp > 0 && aliveMobs.push(m);
            }
            const bossAlive = dungeon.boss.hp > 0;
            const combatSnapshot = this.buildDungeonCombatSnapshot({ dungeon, aliveMobs, bossAlive });
            if (!dungeon.combatAnalytics) {
              dungeon.combatAnalytics = {
                totalBossDamage: 0,
                totalMobDamage: 0,
                shadowsAttackedBoss: 0,
                shadowsAttackedMobs: 0,
                mobsKilledThisWave: 0
              };
            }
            const analytics = dungeon.combatAnalytics;
            const now = Date.now();
            const activeInterval = this._shadowActiveIntervalMs && this._shadowActiveIntervalMs.get(channelKey) || 3e3;
            const TICK_BUDGET = Number.isFinite(tickBudget) && tickBudget > 0 ? Math.floor(tickBudget) : 500;
            const previewAssignedLen = assignedShadows.length;
            const rotationTicks = previewAssignedLen > 0 ? Math.ceil(previewAssignedLen / TICK_BUDGET) : 1;
            const rawRevisitSpan = rotationTicks * cyclesMultiplier * activeInterval;
            const revisitSpan = Math.min(
              rawRevisitSpan,
              5 * 60 * 1e3
              // 5-minute safety cap
            );
            if (!Number.isFinite(dungeon._rotationCursor)) dungeon._rotationCursor = 0;
            if (!(dungeon._shadowLastProcessed instanceof Map)) dungeon._shadowLastProcessed = /* @__PURE__ */ new Map();
            const shadowLastProcessed = dungeon._shadowLastProcessed;
            const { exchangeMarkedIds, sensesDeployedIds } = this._getCachedExclusionSets();
            const totalAssigned = assignedShadows.length;
            let aliveShadowCount = 0;
            const combatReadyShadows = [];
            if (totalAssigned > 0) {
              let scanned = 0;
              let cursorStart = dungeon._rotationCursor % totalAssigned;
              let scanPos = cursorStart;
              let collected = 0;
              while (scanned < totalAssigned && collected < TICK_BUDGET) {
                const shadow = assignedShadows[scanPos];
                scanPos = (scanPos + 1) % totalAssigned;
                scanned++;
                const shadowId = this.getShadowIdValue(shadow);
                if (!shadowId) continue;
                const shadowKey = String(shadowId);
                const isDead = deadShadows.has(shadowId) || deadShadows.has(shadowKey);
                if (isDead) continue;
                const hpData = shadowHP.get(shadowId) || shadowHP.get(shadowKey);
                if (!hpData || hpData.hp <= 0) continue;
                aliveShadowCount++;
                if (exchangeMarkedIds.has(shadowKey) || sensesDeployedIds.has(shadowKey)) continue;
                combatReadyShadows.push(shadow);
                collected++;
              }
              dungeon._rotationCursor = (cursorStart + scanned) % totalAssigned;
              if (scanned >= totalAssigned) {
                dungeon._cachedAliveCount = aliveShadowCount;
              } else {
                dungeon._cachedAliveCount = scanned > 0 ? Math.round(aliveShadowCount / scanned * totalAssigned) : dungeon._cachedAliveCount != null ? dungeon._cachedAliveCount : 0;
              }
            }
            if (dungeon._cachedAliveCount != null && dungeon._cachedAliveCount < assignedShadows.length * 0.25 && !dungeon.criticalHPWarningShown) {
              dungeon.criticalHPWarningShown = true;
              this.debugLog(
                `CRITICAL: Only ${dungeon._cachedAliveCount}/${assignedShadows.length} shadows alive (${Math.floor(dungeon._cachedAliveCount / assignedShadows.length * 100)}%)!`
              );
            }
            const maxShadowsToProcess = combatReadyShadows.length;
            const catchUpScale = revisitSpan > 0 ? rawRevisitSpan / revisitSpan : 1;
            const scaleFactor = ((_m = this.settings) == null ? void 0 : _m.rotationCatchUpScaling) === false ? 1 : this.clampNumber(catchUpScale, 1, C2.ROTATION_CATCHUP_SCALE_MAX || 64);
            let shadowDamageScalar = this.clampNumber(
              Number.isFinite((_n = this.settings) == null ? void 0 : _n.shadowDamageScalar) ? this.settings.shadowDamageScalar : 2,
              0.1,
              20
            );
            if (((_p = (_o = this.soloLevelingStats) == null ? void 0 : _o.settings) == null ? void 0 : _p.rank) === "Shadow Monarch") {
              const armyCount = Number((_q = this._shadowCountCache) == null ? void 0 : _q.count) || 0;
              if (armyCount > 5e5) {
                shadowDamageScalar *= 1 + Math.log2(armyCount / 5e5);
              }
              const joined = this.settings.userActiveDungeon;
              if (joined && joined !== channelKey) {
                shadowDamageScalar *= this.clampNumber(
                  Number.isFinite((_r = this.settings) == null ? void 0 : _r.monarchsWillMultiplier) ? this.settings.monarchsWillMultiplier : 1.25,
                  1,
                  3
                );
              }
            }
            if (this._combatTickCount % 10 === 0) {
              this.settings.debug && console.log(`[Dungeons] COMBAT_TRACE: assigned=${assignedShadows.length}, slice=${maxShadowsToProcess}, cursor=${dungeon._rotationCursor}, mobs=${aliveMobs.length}, bossHP=${dungeon.boss.hp}, scale=${scaleFactor.toFixed(2)}, cycles=${cyclesMultiplier}`);
            }
            const bossUnlocked = this.ensureBossEngagementUnlocked(dungeon, channelKey);
            const bossAliveNow = dungeon.boss.hp > 0 && bossUnlocked;
            const hasMobs = aliveMobs.length > 0;
            const bossChance = hasMobs ? this.getShadowBossTargetChance({ dungeon, aliveMobs, bossUnlocked }) : bossAliveNow ? 1 : 0;
            const bossHpFraction = ((_s = dungeon == null ? void 0 : dungeon.boss) == null ? void 0 : _s.maxHp) && ((_t = dungeon == null ? void 0 : dungeon.boss) == null ? void 0 : _t.maxHp) > 0 ? dungeon.boss.hp / dungeon.boss.maxHp : 1;
            const roleCombatContext = this.getRoleCombatTickContext(channelKey);
            const rolePressure = this.buildRolePressureBucket();
            const domainMultiplier = this._getDomainShadowMultiplier(dungeon);
            if (!(dungeon._pooledMobRankGroups instanceof Map)) dungeon._pooledMobRankGroups = /* @__PURE__ */ new Map();
            const mobRankGroups = dungeon._pooledMobRankGroups;
            for (const group of mobRankGroups.values()) {
              group.count = 0;
              group._sumStr = 0;
              group._sumAgi = 0;
              group._sumInt = 0;
              group._sumVit = 0;
              group._sumPer = 0;
              group.representative = null;
              group.fraction = 0;
              if (Array.isArray(group.mobsInGroup)) group.mobsInGroup.length = 0;
              else group.mobsInGroup = [];
            }
            if (hasMobs) {
              for (let m = 0; m < aliveMobs.length; m++) {
                const mob = aliveMobs[m];
                if (!mob || mob.hp <= 0) continue;
                const rank = mob.rank || dungeon.rank || "E";
                let group = mobRankGroups.get(rank);
                if (!group) {
                  group = {
                    count: 0,
                    _sumStr: 0,
                    _sumAgi: 0,
                    _sumInt: 0,
                    _sumVit: 0,
                    _sumPer: 0,
                    representative: null,
                    fraction: 0,
                    mobsInGroup: []
                  };
                  mobRankGroups.set(rank, group);
                }
                group.count++;
                group._sumStr += Number.isFinite(mob.strength) ? mob.strength : 0;
                group._sumAgi += Number.isFinite(mob.agility) ? mob.agility : 0;
                group._sumInt += Number.isFinite(mob.intelligence) ? mob.intelligence : 0;
                group._sumVit += Number.isFinite(mob.vitality) ? mob.vitality : 0;
                group._sumPer += Number.isFinite(mob.perception) ? mob.perception : 0;
                group.mobsInGroup.push(mob);
              }
              let totalMobCount = 0;
              for (const [rank, group] of mobRankGroups) {
                if (group.count === 0) continue;
                const n = group.count;
                totalMobCount += n;
                group.representative = {
                  type: "mob",
                  rank,
                  strength: Math.max(1, Math.floor(group._sumStr / n) || 10),
                  agility: Math.max(0, Math.floor(group._sumAgi / n)),
                  intelligence: Math.max(0, Math.floor(group._sumInt / n)),
                  vitality: Math.max(0, Math.floor(group._sumVit / n)),
                  perception: Math.max(0, Math.floor(group._sumPer / n))
                };
              }
              for (const [, group] of mobRankGroups) {
                if (group.count === 0) continue;
                group.fraction = totalMobCount > 0 ? group.count / totalMobCount : 0;
              }
            }
            let aggregatedBossDamage = 0;
            if (!(dungeon._pooledMobDamageMap instanceof Map)) dungeon._pooledMobDamageMap = /* @__PURE__ */ new Map();
            const mobDamageMap = dungeon._pooledMobDamageMap;
            mobDamageMap.clear();
            if (!dungeon.shadowContributions || typeof dungeon.shadowContributions !== "object") {
              dungeon.shadowContributions = {};
            }
            if (!dungeon.mobs) {
              dungeon.mobs = { killed: 0, remaining: 0, activeMobs: [], total: 0 };
            }
            for (let i = 0; i < combatReadyShadows.length && i < maxShadowsToProcess; i++) {
              const shadow = combatReadyShadows[i];
              const shadowId = this.getShadowIdValue(shadow);
              if (!shadowId) continue;
              const shadowHPData = shadowHP.get(shadowId);
              if (!shadowHPData || shadowHPData.hp <= 0) continue;
              let combatData = dungeon.shadowCombatData.get(shadowId);
              if (!combatData) {
                combatData = {
                  lastAttackTime: Date.now() - 2e3,
                  // Allow immediate attack
                  attackInterval: 2e3,
                  personality: "balanced",
                  behavior: "balanced",
                  attackCount: 0,
                  damageDealt: 0,
                  comboHits: 0,
                  lastTargetType: null
                };
                dungeon.shadowCombatData.set(shadowId, combatData);
              }
              const finalCombatData = combatData;
              const lastProcessedAt = shadowLastProcessed.get(String(shadowId)) || now - revisitSpan;
              const timeSinceLastAttack = Math.max(0, now - lastProcessedAt);
              let effectiveCooldown = this.getEffectiveAttackCooldownMs(
                finalCombatData.attackInterval || finalCombatData.cooldown || 2e3,
                activeInterval
              );
              const sprintReduction = this._getSprintCooldownReduction(dungeon);
              if (sprintReduction > 0) {
                effectiveCooldown = Math.max(800, Math.floor(effectiveCooldown * (1 - sprintReduction)));
              }
              const attacksInSpan = this.calculateAttacksInTimeSpan(
                timeSinceLastAttack,
                effectiveCooldown,
                revisitSpan
              );
              if (attacksInSpan <= 0) continue;
              this._addRolePressureSample(rolePressure, shadow, finalCombatData, attacksInSpan, scaleFactor);
              let totalBossDamage = 0;
              let totalMobDamage = 0;
              const half = Math.floor(attacksInSpan * bossChance);
              const bossAttacks = bossAliveNow && hasMobs ? half + (attacksInSpan % 2 && Math.random() < bossChance ? 1 : 0) : bossAliveNow ? attacksInSpan : 0;
              const mobAttacks = hasMobs ? Math.max(0, attacksInSpan - bossAttacks) : 0;
              const shadowVariance = this._varianceNarrow();
              const dominantTarget = bossAttacks >= mobAttacks ? "boss" : "mob";
              if (finalCombatData.lastTargetType === dominantTarget) {
                finalCombatData.comboHits = (finalCombatData.comboHits || 0) + attacksInSpan;
              } else {
                finalCombatData.comboHits = attacksInSpan;
                finalCombatData.lastTargetType = dominantTarget;
              }
              const shadowPerception = Number.isFinite((_u = finalCombatData == null ? void 0 : finalCombatData.effectiveStats) == null ? void 0 : _u.perception) ? finalCombatData.effectiveStats.perception : (this.getShadowEffectiveStatsCached(shadow) || {}).perception || 0;
              const comboMultiplier = Math.min(2, 1 + (finalCombatData.comboHits || 0) * shadowPerception * 2e-3);
              const leadershipMult = this._getShadowLeadershipMult ? this._getShadowLeadershipMult(dungeon, shadow, assignedShadows) : { mob: 1, boss: 1 };
              if (bossAliveNow && bossAttacks > 0) {
                const perHitBossRaw = this.calculateShadowDamage(shadow, bossStats, dungeon.boss.rank, false);
                const roleBossMultiplier = this.getRoleCombatOutgoingDamageMultiplier({
                  shadow,
                  combatData: finalCombatData,
                  targetType: "boss",
                  bossHpFraction,
                  roleCombatContext
                });
                const perHitBoss = Math.max(1, Math.floor(perHitBossRaw * roleBossMultiplier * shadowDamageScalar * leadershipMult.boss));
                totalBossDamage = Math.floor(bossAttacks * perHitBoss * shadowVariance * scaleFactor * comboMultiplier * domainMultiplier);
                const shadowBossReduction = C2.SHADOW_VS_BOSS_DAMAGE_MULT || 0.35;
                totalBossDamage = Math.max(1, Math.floor(totalBossDamage * shadowBossReduction));
                totalBossDamage > 0 && analytics.shadowsAttackedBoss++;
              }
              if (hasMobs && mobAttacks > 0 && mobRankGroups.size > 0) {
                let mobDamageApplied = false;
                for (const [, rankGroup] of mobRankGroups) {
                  const groupAttacks = Math.max(0, Math.round(mobAttacks * rankGroup.fraction));
                  if (groupAttacks <= 0) continue;
                  const perHitMobRaw = this.calculateShadowDamage(shadow, rankGroup.representative, rankGroup.representative.rank, false);
                  const roleMobMultiplier = this.getRoleCombatOutgoingDamageMultiplier({
                    shadow,
                    combatData: finalCombatData,
                    targetType: "mob",
                    bossHpFraction,
                    roleCombatContext
                  });
                  const perHitMob = Math.max(1, Math.floor(perHitMobRaw * roleMobMultiplier * shadowDamageScalar * leadershipMult.mob));
                  const unscaledDamage = Math.floor(groupAttacks * perHitMob * shadowVariance * comboMultiplier * domainMultiplier);
                  if (unscaledDamage <= 0) continue;
                  const totalScaledDamage = Math.floor(unscaledDamage * scaleFactor);
                  let remainingDamage = totalScaledDamage;
                  const groupMobs = rankGroup.mobsInGroup;
                  const groupLen = groupMobs.length;
                  if (rankGroup._rrIdx == null) rankGroup._rrIdx = 0;
                  const aoeTable = C2.SHADOW_AOE;
                  if (aoeTable && groupLen > 1) {
                    const shadowRole = ((_v = this.normalizeShadowRoleKey) == null ? void 0 : _v.call(
                      this,
                      (shadow == null ? void 0 : shadow.role) || (shadow == null ? void 0 : shadow.roleName) || (shadow == null ? void 0 : shadow.ro) || ""
                    )) || "";
                    const aoeAbility = aoeTable[shadowRole] || aoeTable._default;
                    if (aoeAbility && Math.random() < aoeAbility.chance) {
                      const aoeTargets = aoeAbility.targets || 2;
                      const aoeDmgFrac = aoeAbility.dmgFrac || 0.35;
                      const cleaveDmg = Math.max(1, Math.floor(perHitMob * aoeDmgFrac * shadowVariance * scaleFactor));
                      for (let aoeIdx = 0; aoeIdx < aoeTargets && aoeIdx < groupLen; aoeIdx++) {
                        const cleaveOffset = (rankGroup._rrIdx + aoeIdx + 1) % groupLen;
                        const cleaveMob = groupMobs[cleaveOffset];
                        if (!cleaveMob || cleaveMob.hp <= 0) continue;
                        const cleaveKey = this.getEnemyKey(cleaveMob, "mob");
                        if (!cleaveKey) continue;
                        const cleaveAccum = mobDamageMap.get(cleaveKey) || 0;
                        const cleaveEffHP = cleaveMob.hp - cleaveAccum;
                        if (cleaveEffHP <= 0) continue;
                        const toApply = Math.min(cleaveDmg, cleaveEffHP + 1);
                        mobDamageMap.set(cleaveKey, cleaveAccum + toApply);
                        this._recordShadowMobDamageContribution(dungeon, cleaveKey, shadowId, toApply);
                        totalMobDamage += toApply;
                      }
                      if (aoeAbility.hitBoss && bossAliveNow && dungeon.boss.hp > 0) {
                        const bossDmgReduction = C2.SHADOW_VS_BOSS_DAMAGE_MULT || 0.35;
                        const aoeBossDmg = Math.max(1, Math.floor(cleaveDmg * bossDmgReduction));
                        totalBossDamage += aoeBossDmg;
                      }
                    }
                  }
                  const maxIter = Math.min(groupLen, Math.max(Math.ceil(scaleFactor) * 2, Math.floor(groupLen * 0.1), 30));
                  let iter = 0;
                  let fullLoopWithoutHit = false;
                  while (remainingDamage > 0 && iter < maxIter && !fullLoopWithoutHit) {
                    iter++;
                    const idx = rankGroup._rrIdx % groupLen;
                    rankGroup._rrIdx = (rankGroup._rrIdx + 1) % groupLen;
                    const mob = groupMobs[idx];
                    if (!mob || mob.hp <= 0) {
                      if (iter >= groupLen) fullLoopWithoutHit = true;
                      continue;
                    }
                    const mobId = this.getEnemyKey(mob, "mob");
                    if (!mobId) continue;
                    const accumulatedDmg = mobDamageMap.get(mobId) || 0;
                    const effectiveHP = mob.hp - accumulatedDmg;
                    if (effectiveHP <= 0) {
                      if (iter >= groupLen) fullLoopWithoutHit = true;
                      continue;
                    }
                    const damageToApply = Math.min(remainingDamage, Math.ceil(effectiveHP));
                    mobDamageMap.set(mobId, accumulatedDmg + damageToApply);
                    this._recordShadowMobDamageContribution(dungeon, mobId, shadowId, damageToApply);
                    remainingDamage -= damageToApply;
                    totalMobDamage += damageToApply;
                  }
                  if (remainingDamage > 0 && groupLen > 0) {
                    const fallback = groupMobs[rankGroup._rrIdx % groupLen];
                    const fallbackId = this.getEnemyKey(fallback, "mob");
                    if (fallbackId) {
                      mobDamageMap.set(fallbackId, (mobDamageMap.get(fallbackId) || 0) + remainingDamage);
                      this._recordShadowMobDamageContribution(dungeon, fallbackId, shadowId, remainingDamage);
                      totalMobDamage += remainingDamage;
                    }
                  }
                  mobDamageApplied = true;
                }
                if (mobDamageApplied) analytics.shadowsAttackedMobs++;
              }
              this.applyShadowCombatStatusEffects({
                channelKey,
                shadow,
                combatData: finalCombatData,
                attacksInSpan,
                bossAttacks,
                mobAttacks,
                aliveMobs,
                bossAlive: bossAliveNow,
                now
              });
              if (totalBossDamage > 0) {
                aggregatedBossDamage += totalBossDamage;
                analytics.totalBossDamage += totalBossDamage;
                this._addShadowContribution(dungeon, shadowId, "bossDamage", totalBossDamage);
              }
              analytics.totalMobDamage += totalMobDamage;
              if (!dungeon.shadowCombatData || !(dungeon.shadowCombatData instanceof Map)) {
                dungeon.shadowCombatData = /* @__PURE__ */ new Map();
              }
              const combatDataToUpdate = dungeon.shadowCombatData.get(shadowId);
              if (!combatDataToUpdate) {
                if (shadow) {
                  dungeon.shadowCombatData.set(shadowId, this.initializeShadowCombatData(shadow));
                }
                continue;
              }
              combatDataToUpdate.attackCount += attacksInSpan;
              combatDataToUpdate.damageDealt += totalBossDamage + totalMobDamage;
              combatDataToUpdate.lastAttackTime = this.getPostAttackTimestamp(
                now,
                timeSinceLastAttack,
                effectiveCooldown,
                revisitSpan,
                attacksInSpan
              );
              shadowLastProcessed.set(String(shadowId), now);
              if (this._combatTickCount % 10 === 0) {
                const cooldownVariance = this._varianceNarrow();
                combatDataToUpdate.attackInterval = Math.max(
                  800,
                  Math.floor(this.computeShadowAttackIntervalMs(shadow) * cooldownVariance)
                );
              }
            }
            if (this.isRoleCombatModelEnabled()) {
              const updatedRoleState = this.updateRoleCombatStateFromPressure(channelKey, rolePressure);
              if (updatedRoleState && this.settings.debug && this._combatTickCount % 20 === 0) {
                console.log(
                  `[Dungeons] ROLE_COMBAT: key=${channelKey}, mark=${updatedRoleState.mark.toFixed(2)}, guard=${updatedRoleState.guard.toFixed(3)}, weaken=${updatedRoleState.weaken.toFixed(3)}`
                );
              }
            }
            if (aggregatedBossDamage > 0) {
              const isMonarchTier = this.getRankIndexValue(((_x = (_w = this.soloLevelingStats) == null ? void 0 : _w.settings) == null ? void 0 : _x.rank) || "E") >= this.getRankIndexValue("Monarch");
              const participationBonus = dungeon.userParticipating ? this.clampNumber(
                Number.isFinite((_y = this.settings) == null ? void 0 : _y.userParticipationDamageBonus) ? this.settings.userParticipationDamageBonus : isMonarchTier ? 0.5 : 0.25,
                0,
                2
              ) : 0;
              const finalBossDamage = Math.max(
                1,
                Math.floor(aggregatedBossDamage * (1 + participationBonus))
              );
              await this.applyDamageToBoss(channelKey, finalBossDamage, "shadow", null);
            }
            const deadMobsThisTick = [];
            if (mobDamageMap.size > 0) {
              const statusApplyTs = Date.now();
              this.batchApplyDamage(
                mobDamageMap,
                aliveMobs,
                (mob, damage) => {
                  const mobId = this.getEnemyKey(mob, "mob");
                  const adjustedDamage = this.applyStatusAdjustedIncomingDamage(
                    channelKey,
                    "mob",
                    mobId,
                    damage,
                    statusApplyTs
                  );
                  this.applyDamageToEntityHp(mob, adjustedDamage);
                },
                combatSnapshot.mobById
              );
              mobDamageMap.forEach((_damage, mobId) => {
                var _a2;
                const mob = combatSnapshot.mobById.get(mobId);
                if (!mob || mob.hp > 0) return;
                analytics.mobsKilledThisWave++;
                const killAttributed = this._applyMobKillContributionsFromLedger(dungeon, mobId, 1);
                if (!killAttributed) {
                  const fallbackAttributed = this._applyFallbackMobKillContribution(
                    dungeon,
                    this.shadowAllocations.get(channelKey) || ((_a2 = dungeon.shadowAllocation) == null ? void 0 : _a2.shadows) || [],
                    null,
                    1
                  );
                  if (!fallbackAttributed) {
                    this._logMobContributionMiss(channelKey, mobId, { phase: "processShadowAttacks" });
                  }
                }
                this._onMobKilled(channelKey, dungeon, mob.rank);
                deadMobsThisTick.push(mob);
              });
              if (deadMobsThisTick.length > 0) {
                this.settings.debug && console.log(`[Dungeons] COMBAT_TRACE: Fast-path \u2014 ${deadMobsThisTick.length} mobs killed (dmgMap=${mobDamageMap.size})`);
              }
              for (const mob of deadMobsThisTick) {
                this._addToCorpsePile(channelKey, mob, false);
              }
            }
            if (deadMobsThisTick.length > 0) {
              this._cleanupDungeonActiveMobs(dungeon);
              this._pruneShadowMobContributionLedger(dungeon);
            }
            this.queueHPBarUpdate(channelKey);
            this.deadShadows.set(channelKey, deadShadows);
          } catch (error) {
            this.errorLog("Error processing shadow attacks", error);
          }
        } catch (error) {
          this.errorLog("CRITICAL", "Fatal error in processShadowAttacks", { channelKey, error });
        }
      },
      async getAllShadows(useCache = true) {
        var _a, _b, _c, _d, _e, _f;
        if (useCache && this._shadowsCache) {
          const now = Date.now();
          if (now - this._shadowsCache.timestamp < 6e4) {
            return this._shadowsCache.shadows;
          }
        }
        if (!this.shadowArmy) return [];
        const snapshot = ((_b = (_a = this.shadowArmy).getShadowSnapshot) == null ? void 0 : _b.call(_a)) || ((_d = (_c = this.shadowArmy).getShadowSnapshotForDeploy) == null ? void 0 : _d.call(_c));
        if (snapshot) {
          snapshot.forEach((s) => {
            if (s && !s.id) s.id = s.i;
          });
          this._shadowsCache = { shadows: snapshot, timestamp: Date.now() };
          return snapshot;
        }
        if (!this.shadowArmy.storageManager) {
          return ((_e = this._shadowsCache) == null ? void 0 : _e.shadows) ?? [];
        }
        try {
          const shadows = typeof this.shadowArmy.storageManager.getAllShadowsRaw === "function" ? await this.shadowArmy.storageManager.getAllShadowsRaw() : await this.shadowArmy.storageManager.getShadows({}, 0, Infinity);
          if (!shadows || !Array.isArray(shadows)) {
            this.debugLog("GET_ALL_SHADOWS", "No shadows returned from storageManager");
            return [];
          }
          let decompressed = shadows;
          if (shadows.length > 0 && this.shadowArmy.getShadowData) {
            decompressed = shadows.map((s) => this.shadowArmy.getShadowData(s));
          }
          decompressed.forEach((s) => {
            if (!s) return;
            s.id || (s.id = s.i);
          });
          this._shadowsCache = { shadows: decompressed, timestamp: Date.now() };
          return decompressed;
        } catch (error) {
          this.errorLog("CRITICAL", "Error getting all shadows", error);
          const cached = (_f = this._shadowsCache) == null ? void 0 : _f.shadows;
          if (Array.isArray(cached) && cached.length > 0) {
            return cached;
          }
          return [];
        }
      },
      invalidateShadowsCache() {
        this._shadowsCache = null;
        this._deployStarterPoolCache = null;
        this._deployStarterPoolCacheTime = null;
        this._deployStarterPoolCacheRank = null;
        this._markAllocationDirty("invalidate-shadows-cache", { shadowSetChanged: true });
      },
      async _preWarmShadowCache() {
        if (!this.started || !this.shadowArmy) return;
        try {
          const shadowCount = await this.getShadowCount();
          if (shadowCount > 25e3) {
            const starterPoolCount = await this._warmDeployStarterPool({
              targetCount: this._deployStarterShadowCap || 240,
              sampleLimit: Math.max(1e3, Math.floor((this._deployStarterShadowCap || 240) * 6))
            });
            if (starterPoolCount > 0) {
              this.settings.debug && console.log(
                `[Dungeons] \u{1F525} PRE-WARM: Starter deploy pool ready \u2014 ${starterPoolCount} sampled shadows (shadowCount=${shadowCount.toLocaleString()})`
              );
            }
            return;
          }
          const allShadows = await this.getAllShadows(false);
          if (!this.started || !Array.isArray(allShadows) || allShadows.length === 0) return;
          if (!this._allocationSortedShadowsCache || this._allocationSortedShadowsCache.length === 0) {
            const sortedCache = await this._buildSortedShadowCache(allShadows, { yieldEvery: 2500 });
            if (!sortedCache) return;
            const normalized = sortedCache.sorted;
            if (!this._allocationSortedShadowsCache || this._allocationSortedShadowsCache.length === 0) {
              this._allocationSortedShadowsCache = normalized;
              this._allocationSortedShadowsCacheTime = Date.now();
              this._allocationScoreCache = sortedCache.scoreCache;
              this._allocationShadowSetDirty = false;
            }
            this.settings.debug && console.log(
              `[Dungeons] \u{1F525} PRE-WARM: Shadow cache ready \u2014 ${normalized.length} shadows sorted for instant deploy`
            );
          }
        } catch (error) {
          this.debugLog("PRE_WARM", "Shadow cache pre-warm failed (non-fatal)", { error: error == null ? void 0 : error.message });
        }
      }
    };
  }
});

// src/Dungeons/combat-shadow-support.js
var require_combat_shadow_support = __commonJS({
  "src/Dungeons/combat-shadow-support.js"(exports2, module2) {
    module2.exports = {
      /**
       * Per-shadow attack interval from EFFECTIVE agility (2026-08-05).
       *
       * This is the honest rebuild of the phantom
       * shadowArmy.calculateShadowAttackInterval the old code believed in: fast
       * shadows genuinely swing faster now. Curve: 2400 / (1 + agility/3000),
       * clamped [900, 2600] — agility 0 -> 2400ms, 3000 -> 1200ms, high rollers
       * bottom out at 900 (still above getEffectiveAttackCooldownMs's 800 floor,
       * so downstream pacing math is untouched). Uses the cached effective-stats
       * read, so it is cheap enough for init and the periodic refresh alike.
       */
      computeShadowAttackIntervalMs(shadow) {
        var _a;
        const stats = ((_a = this.getShadowEffectiveStatsCached) == null ? void 0 : _a.call(this, shadow)) || {};
        const agility = Math.max(0, Number(stats.agility) || Number(shadow == null ? void 0 : shadow.agility) || 0);
        return this.clampNumber(Math.round(2400 / (1 + agility / 3e3)), 900, 2600);
      },
      initializeShadowCombatData(shadow) {
        let personality = "balanced";
        let attackInterval = 2e3;
        let effectiveStats = null;
        if (this.shadowArmy) {
          if (this.shadowArmy.getShadowPersonalityKey) {
            const personalityKey = this.shadowArmy.getShadowPersonalityKey(shadow);
            personality = personalityKey || shadow.personality || "balanced";
          }
          attackInterval = this.computeShadowAttackIntervalMs(shadow);
          if (this.shadowArmy.getShadowEffectiveStats) {
            effectiveStats = this.shadowArmy.getShadowEffectiveStats(shadow);
          }
        }
        return {
          lastAttackTime: Date.now() - Math.random() * attackInterval,
          // Stagger initial attacks
          attackInterval,
          // Individual interval (from stored baseAttackInterval)
          personality,
          // Stored personality from ShadowArmy
          behavior: personality,
          // Legacy field kept in sync for old fallback paths
          effectiveStats: effectiveStats || {
            strength: shadow.strength || 0,
            agility: shadow.agility || 0,
            intelligence: shadow.intelligence || 0,
            vitality: shadow.vitality || 0
          },
          attackCount: 0,
          damageDealt: 0,
          // Combo tracking: consecutive hits on same target type scale damage via perception
          comboHits: 0,
          lastTargetType: null,
          // 'boss' | 'mob' — resets combo on switch
          // Store shadow ID for reference
          shadowId: this.getShadowIdValue(shadow)
        };
      },
      maybePruneDungeonShadowState({ dungeon, channelKey, assignedShadows, deadShadows }) {
        var _a;
        if (!dungeon || !Array.isArray(assignedShadows)) return false;
        const now = Date.now();
        const assignedCount = assignedShadows.length;
        const lastAssignedCount = dungeon._shadowStateAssignedCount || 0;
        const lastPruneAt = dungeon._shadowStateLastPruneAt || 0;
        const pruneDueToAllocationChange = assignedCount !== lastAssignedCount;
        const pruneDueToTime = now - lastPruneAt >= 6e4;
        if (!pruneDueToAllocationChange && !pruneDueToTime) return false;
        dungeon._shadowStateAssignedCount = assignedCount;
        dungeon._shadowStateLastPruneAt = now;
        const assignedIds = /* @__PURE__ */ new Set();
        for (const shadow of assignedShadows) {
          const shadowId = this.getShadowIdValue(shadow);
          shadowId && assignedIds.add(shadowId);
        }
        if (dungeon._lastResurrectionAttempt instanceof Map) {
          for (const shadowId of dungeon._lastResurrectionAttempt.keys()) {
            if (!assignedIds.has(shadowId)) {
              dungeon._lastResurrectionAttempt.delete(shadowId);
            }
          }
        }
        if (assignedIds.size === 0) {
          dungeon.shadowHP && (dungeon.shadowHP = /* @__PURE__ */ new Map());
          dungeon.shadowCombatData && (dungeon.shadowCombatData = /* @__PURE__ */ new Map());
          (_a = deadShadows == null ? void 0 : deadShadows.clear) == null ? void 0 : _a.call(deadShadows);
          this.deadShadows.set(channelKey, deadShadows || /* @__PURE__ */ new Set());
          return true;
        }
        if (dungeon.shadowHP instanceof Map) {
          for (const shadowId of dungeon.shadowHP.keys()) {
            assignedIds.has(shadowId) || dungeon.shadowHP.delete(shadowId);
          }
        }
        if (dungeon.shadowCombatData instanceof Map) {
          for (const shadowId of dungeon.shadowCombatData.keys()) {
            assignedIds.has(shadowId) || dungeon.shadowCombatData.delete(shadowId);
          }
        }
        if (deadShadows && typeof deadShadows.forEach === "function") {
          deadShadows.forEach((shadowId) => {
            assignedIds.has(shadowId) || deadShadows.delete(shadowId);
          });
          this.deadShadows.set(channelKey, deadShadows);
        }
        if (dungeon._shadowLastProcessed instanceof Map) {
          for (var sid of dungeon._shadowLastProcessed.keys()) {
            assignedIds.has(sid) || dungeon._shadowLastProcessed.delete(sid);
          }
        }
        return true;
      },
      getEffectiveAttackCooldownMs(attackInterval, fallbackInterval = 1e3) {
        const fallback = Number.isFinite(Number(fallbackInterval)) && Number(fallbackInterval) > 0 ? Number(fallbackInterval) : 1e3;
        const candidate = Number(attackInterval);
        const cooldown = Number.isFinite(candidate) && candidate > 0 ? candidate : fallback;
        return Math.max(800, Math.floor(cooldown));
      },
      getCappedAttackElapsedMs(timeSinceLastAttack, attackInterval, totalTimeSpan) {
        const effectiveCooldown = this.getEffectiveAttackCooldownMs(attackInterval, 1e3);
        const span = Number.isFinite(Number(totalTimeSpan)) && Number(totalTimeSpan) > 0 ? Number(totalTimeSpan) : 1e3;
        const MAX_CATCHUP_MS = 5 * 60 * 1e3;
        const maxCatchUp = Math.min(Math.max(span * 2, effectiveCooldown * 4), MAX_CATCHUP_MS);
        const elapsed = Number(timeSinceLastAttack);
        const safeElapsed = Number.isFinite(elapsed) ? elapsed : 0;
        return Math.min(Math.max(0, safeElapsed), maxCatchUp);
      },
      calculateAttacksInTimeSpan(timeSinceLastAttack, attackInterval, totalTimeSpan) {
        const effectiveCooldown = this.getEffectiveAttackCooldownMs(attackInterval, 1e3);
        const effectiveElapsed = this.getCappedAttackElapsedMs(
          timeSinceLastAttack,
          effectiveCooldown,
          totalTimeSpan
        );
        return Math.floor(effectiveElapsed / effectiveCooldown);
      },
      getPostAttackTimestamp(now, timeSinceLastAttack, attackInterval, totalTimeSpan, attacksProcessed) {
        const safeNow = Number.isFinite(Number(now)) ? Number(now) : Date.now();
        const effectiveCooldown = this.getEffectiveAttackCooldownMs(attackInterval, 1e3);
        const effectiveElapsed = this.getCappedAttackElapsedMs(
          timeSinceLastAttack,
          effectiveCooldown,
          totalTimeSpan
        );
        const processed = Math.max(0, Math.floor(Number(attacksProcessed) || 0));
        const consumedMs = processed * effectiveCooldown;
        const remainingElapsed = Math.max(0, effectiveElapsed - consumedMs);
        return safeNow - remainingElapsed;
      },
      batchApplyDamage(damageMap, targets, applyDamageCallback, targetIndex = null) {
        let totalDamage = 0;
        let targetsKilled = 0;
        const getTarget = targetIndex && typeof targetIndex.get === "function" ? (id) => targetIndex.get(id) : (id) => targets.find((t) => this.getEnemyKey(t, "mob") === id);
        damageMap.forEach((damage, targetId) => {
          const target = getTarget(targetId);
          if (!target || target.hp <= 0) return;
          const oldHP = target.hp;
          applyDamageCallback(target, damage);
          totalDamage += damage;
          if (oldHP > 0 && target.hp <= 0) {
            targetsKilled++;
          }
        });
        return { totalDamage, targetsKilled };
      },
      // Healer/support restoration pass. Runs once per combat tick after damage.
      // The "healer" role (and support archetype generally) now actively restores
      // shadow HP: healers/support build a `heal` accumulator in the role-combat
      // state (updateRoleCombatStateFromPressure), surfaced as shadowHealFraction
      // by getRoleCombatTickContext. Heals only ALIVE-but-damaged shadows (never
      // revives — that's the mana-gated resurrection path) and never overheals.
      // Rotation-budgeted like the attack path: at most HEAL_TICK_BUDGET entries
      // are visited per tick from a persistent cursor, so per-tick cost is constant
      // no matter how large shadowHP grows or how long the fight runs.
      _applyShadowHealPass(channelKey, dungeon) {
        var _a, _b, _c, _d;
        if (!dungeon) return;
        if (((_a = this.settings) == null ? void 0 : _a.shadowHealerRestorationEnabled) === false) return;
        const ctx = (_b = this.getRoleCombatTickContext) == null ? void 0 : _b.call(this, channelKey);
        let healFraction = ctx && ctx.enabled ? ctx.shadowHealFraction || 0 : 0;
        healFraction *= 1 + (Number((_c = dungeon.war) == null ? void 0 : _c._sovereignHealBoost) || 0);
        if (!(healFraction > 0)) return;
        const shadowHP = dungeon.shadowHP;
        if (!shadowHP || shadowHP.size === 0) return;
        const HEAL_TICK_BUDGET = 500;
        const size = shadowHP.size;
        const revisit = Math.max(1, Math.ceil(size / HEAL_TICK_BUDGET));
        const effectiveFraction = Math.min(0.5, healFraction * revisit);
        if (dungeon._healIterMap !== shadowHP || !dungeon._healIter) {
          dungeon._healIter = shadowHP.values();
          dungeon._healIterMap = shadowHP;
        }
        let scanned = 0;
        let healedCount = 0;
        let wrapped = false;
        while (scanned < HEAL_TICK_BUDGET) {
          const next = dungeon._healIter.next();
          if (next.done) {
            if (wrapped) break;
            dungeon._healIter = shadowHP.values();
            wrapped = true;
            continue;
          }
          scanned++;
          const hpData = next.value;
          if (!hpData) continue;
          const maxHp = Number(hpData.maxHp) || 0;
          const hp = Number(hpData.hp) || 0;
          if (maxHp <= 0 || hp <= 0 || hp >= maxHp) continue;
          hpData.hp = Math.min(maxHp, hp + Math.max(1, Math.floor(maxHp * effectiveFraction)));
          healedCount++;
        }
        if (healedCount > 0) {
          (_d = this.debugLog) == null ? void 0 : _d.call(
            this,
            "HEALER",
            `Restored ${healedCount} shadows in ${dungeon.name || channelKey} (frac=${healFraction.toFixed(3)})`
          );
        }
      },
      initializeShadowHPSync(shadow, shadowHP) {
        var _a, _b, _c;
        const shadowId = this.getShadowIdValue(shadow);
        if (!shadowId) return null;
        const existingHP = shadowHP.get(shadowId);
        if (existingHP && typeof existingHP.hp === "number" && !isNaN(existingHP.hp) && !(existingHP.hp instanceof Promise)) {
          return existingHP;
        }
        const effectiveStats = this.getShadowEffectiveStatsCached(shadow);
        let shadowVitality = (effectiveStats == null ? void 0 : effectiveStats.vitality) != null && !isNaN(effectiveStats.vitality) ? effectiveStats.vitality : (((_a = shadow.baseStats) == null ? void 0 : _a.vitality) || 0) + (((_b = shadow.growthStats) == null ? void 0 : _b.vitality) || 0) + (((_c = shadow.naturalGrowthStats) == null ? void 0 : _c.vitality) || 0);
        if (!shadowVitality || typeof shadowVitality !== "number" || isNaN(shadowVitality)) {
          shadowVitality = typeof shadow.vitality === "number" && shadow.vitality > 0 ? shadow.vitality : 50;
        }
        if (shadowVitality < 0) shadowVitality = 0;
        const shadowRank = shadow.rank || "E";
        const baseHP = this.calculateHPSync(shadowVitality, shadowRank);
        const shadowRankIndex = this.getRankIndexValue(shadowRank);
        const shadowRankHpFactor = this.getShadowRankHpFactorByIndex(shadowRankIndex);
        const shadowHpMultiplier = Math.min(0.85, 0.2 + shadowRankIndex * 0.05);
        const finalMaxHP = Math.max(1, Math.floor(baseHP * shadowHpMultiplier * shadowRankHpFactor));
        if (typeof finalMaxHP !== "number" || isNaN(finalMaxHP) || finalMaxHP <= 0) {
          const rankIndex = this.getRankIndexValue(shadowRank);
          const minHP = Math.max(1, Math.floor((100 + 50 * 10 + rankIndex * 50) * 0.1));
          const hpData2 = { hp: minHP, maxHp: minHP };
          shadowHP.set(shadowId, hpData2);
          return hpData2;
        }
        const hpData = { hp: finalMaxHP, maxHp: finalMaxHP };
        shadowHP.set(shadowId, hpData);
        return hpData;
      },
      _getCachedExclusionSets() {
        var _a, _b, _c, _d;
        const now = Date.now();
        if (this._exclusionCache && now - this._exclusionCache.ts < 5e3) {
          return this._exclusionCache;
        }
        const normalizeIdSet = (setLike) => {
          const normalized = /* @__PURE__ */ new Set();
          if (!(setLike instanceof Set)) return normalized;
          setLike.forEach((id) => id && normalized.add(String(id)));
          return normalized;
        };
        let exchangeMarkedIds = /* @__PURE__ */ new Set();
        const sensesDeployedIds = this._getShadowSensesDeployedIds();
        try {
          if (BdApi.Plugins.isEnabled("ShadowExchange")) {
            exchangeMarkedIds = normalizeIdSet(
              ((_c = (_b = (_a = BdApi.Plugins.get("ShadowExchange")) == null ? void 0 : _a.instance) == null ? void 0 : _b.getMarkedShadowIds) == null ? void 0 : _c.call(_b)) || /* @__PURE__ */ new Set()
            );
          }
        } catch (error) {
          (_d = this.errorLog) == null ? void 0 : _d.call(this, true, "Failed to read ShadowExchange exclusion set", error);
        }
        this._exclusionCache = { exchangeMarkedIds, sensesDeployedIds, ts: now };
        return this._exclusionCache;
      },
      getCombatReadyShadows(assignedShadows, deadShadows, shadowHP) {
        const { exchangeMarkedIds, sensesDeployedIds } = this._getCachedExclusionSets();
        const combatReady = [];
        for (const shadow of assignedShadows) {
          const shadowId = this.getShadowIdValue(shadow);
          if (!shadowId) continue;
          const shadowKey = String(shadowId);
          if (deadShadows.has(shadowId) || deadShadows.has(shadowKey)) continue;
          if (exchangeMarkedIds.has(shadowKey)) continue;
          if (sensesDeployedIds.has(shadowKey)) continue;
          const hpData = shadowHP.get(shadowId) || shadowHP.get(shadowKey);
          hpData && hpData.hp > 0 && combatReady.push(shadow);
        }
        return combatReady;
      }
    };
  }
});

// src/Dungeons/combat-damage-calc.js
var require_combat_damage_calc = __commonJS({
  "src/Dungeons/combat-damage-calc.js"(exports2, module2) {
    module2.exports = {
      applyBossDamageVariance(baseDamage) {
        const variance = 0.75 + Math.random() * 0.5;
        return Math.floor(baseDamage * variance);
      },
      applyMobDamageVariance(baseDamage) {
        const variance = 0.8 + Math.random() * 0.4;
        return Math.floor(baseDamage * variance);
      },
      calculateBossDamageToUser(bossStats, userStats, bossRank, userRank, bossRole = "", bossFamily = "") {
        let rawDamage = this.calculateEnemyDamage(bossStats, userStats, bossRank, userRank);
        rawDamage = this.applyBossDamageVariance(rawDamage);
        const roleMultiplier = this.getMonsterOutgoingDamageMultiplier(bossRole, bossFamily, "user");
        return Math.max(1, Math.floor(rawDamage * 0.9 * roleMultiplier));
      },
      calculateMobDamageToUser(mobStats, userStats, mobRank, userRank, mobRole = "", mobFamily = "") {
        let rawDamage = this.calculateEnemyDamage(mobStats, userStats, mobRank, userRank);
        rawDamage = this.applyMobDamageVariance(rawDamage);
        const roleMultiplier = this.getMonsterOutgoingDamageMultiplier(mobRole, mobFamily, "user");
        return Math.max(1, Math.floor(rawDamage * 0.85 * roleMultiplier));
      },
      calculateBossDamageToShadow(bossStats, shadowStats, bossRank, shadowRank, bossRole = "", shadowRole = "", bossFamily = "") {
        let damage = this.calculateEnemyDamage(bossStats, shadowStats, bossRank, shadowRank);
        damage = Math.floor(damage * 0.6);
        damage = this.applyBossDamageVariance(damage);
        const roleMultiplier = this.getMonsterOutgoingDamageMultiplier(bossRole, bossFamily, "shadow");
        const shadowArchetype = this._getShadowArchetypeForRole(shadowRole);
        const defenderMultiplier = shadowArchetype === "tank" ? 0.92 : shadowArchetype === "support" ? 0.96 : 1;
        return Math.max(1, Math.floor(damage * roleMultiplier * defenderMultiplier));
      },
      calculateMobDamageToShadow(mobStats, shadowStats, mobRank, shadowRank, mobRole = "", shadowRole = "", mobFamily = "") {
        let damage = this.calculateEnemyDamage(mobStats, shadowStats, mobRank, shadowRank);
        damage = Math.floor(damage * 0.5);
        damage = this.applyMobDamageVariance(damage);
        const roleMultiplier = this.getMonsterOutgoingDamageMultiplier(mobRole, mobFamily, "shadow");
        const shadowArchetype = this._getShadowArchetypeForRole(shadowRole);
        const defenderMultiplier = shadowArchetype === "tank" ? 0.9 : shadowArchetype === "support" ? 0.95 : 1;
        return Math.max(1, Math.floor(damage * roleMultiplier * defenderMultiplier));
      },
      buildShadowStats(shadow) {
        const effectiveStats = this.getShadowEffectiveStatsCached(shadow);
        if (effectiveStats) {
          return {
            strength: effectiveStats.strength || 0,
            agility: effectiveStats.agility || 0,
            intelligence: effectiveStats.intelligence || 0,
            vitality: effectiveStats.vitality || 0,
            perception: effectiveStats.perception || 0
          };
        }
        const baseStats = shadow.baseStats || {};
        const growthStats = shadow.growthStats || {};
        const naturalGrowthStats = shadow.naturalGrowthStats || {};
        return {
          strength: (baseStats.strength || 0) + (growthStats.strength || 0) + (naturalGrowthStats.strength || 0) || shadow.strength || 0,
          agility: (baseStats.agility || 0) + (growthStats.agility || 0) + (naturalGrowthStats.agility || 0) || 0,
          intelligence: (baseStats.intelligence || 0) + (growthStats.intelligence || 0) + (naturalGrowthStats.intelligence || 0) || 0,
          vitality: (baseStats.vitality || 0) + (growthStats.vitality || 0) + (naturalGrowthStats.vitality || 0) || shadow.vitality || 50,
          perception: (baseStats.perception || 0) + (growthStats.perception || 0) + (naturalGrowthStats.perception || 0) || 0
        };
      },
      checkCriticalHit(messageElement) {
        var _a, _b;
        if (!messageElement) return false;
        return ((_a = messageElement.classList) == null ? void 0 : _a.contains("bd-crit-hit")) || ((_b = messageElement.querySelector) == null ? void 0 : _b.call(messageElement, ".bd-crit-hit")) !== null;
      },
      calculateMobXP(mobRank, userParticipating = true, dungeonRank = null) {
        const rankIndex = Math.max(0, this.getRankIndexValue(mobRank));
        const baseXP = Math.max(8, Math.round(8 * Math.pow(1.5, rankIndex)));
        const dungeonRankIndex = dungeonRank != null ? Math.max(0, this.getRankIndexValue(dungeonRank)) : rankIndex;
        const dungeonBonus = 1 + dungeonRankIndex * 0.04;
        const xp = baseXP * dungeonBonus;
        return userParticipating ? Math.round(xp) : Math.floor(xp * 0.3);
      },
      calculateAttacksInSpan(timeSinceLastAttack, attackCooldown, cyclesMultiplier = 1) {
        const activeInterval = 1e3;
        const multiplier = Number.isFinite(Number(cyclesMultiplier)) && Number(cyclesMultiplier) > 0 ? Math.floor(Number(cyclesMultiplier)) : 1;
        const totalTimeSpan = multiplier * activeInterval;
        const effectiveCooldown = this.getEffectiveAttackCooldownMs ? this.getEffectiveAttackCooldownMs(attackCooldown, activeInterval) : Math.max(800, Number.isFinite(Number(attackCooldown)) && Number(attackCooldown) > 0 ? Number(attackCooldown) : activeInterval);
        const effectiveElapsed = this.getCappedAttackElapsedMs ? this.getCappedAttackElapsedMs(timeSinceLastAttack, effectiveCooldown, totalTimeSpan) : Math.min(
          Math.max(0, Number(timeSinceLastAttack) || 0),
          Math.max(totalTimeSpan * 2, effectiveCooldown * 4)
        );
        return Math.floor(effectiveElapsed / effectiveCooldown);
      },
      applyRoleDamageMultiplier(role, damage) {
        const archetype = this._getShadowArchetypeForRole(role);
        let multiplier = 1;
        switch (archetype) {
          case "tank":
            multiplier = 0.88;
            break;
          case "support":
            multiplier = 0.93;
            break;
          case "caster":
            multiplier = 1.1;
            break;
          case "striker":
            multiplier = 1.14;
            break;
          case "ranger":
            multiplier = 1.07;
            break;
          default:
            multiplier = 1;
            break;
        }
        return damage * multiplier;
      }
    };
  }
});

// src/Dungeons/combat-boss-mob.js
var require_combat_boss_mob = __commonJS({
  "src/Dungeons/combat-boss-mob.js"(exports2, module2) {
    var C2 = require_constants();
    var { getRankIndex } = require_rank_utils();
    var Dungeons3 = { RANK_MULTIPLIERS: C2.RANK_MULTIPLIERS };
    module2.exports = {
      _resolveShadowMapKey(shadowByIdMap, shadowId) {
        var _a, _b, _c;
        if (shadowId === null || shadowId === void 0) return null;
        if ((_a = shadowByIdMap == null ? void 0 : shadowByIdMap.has) == null ? void 0 : _a.call(shadowByIdMap, shadowId)) return shadowId;
        const shadowIdString = String(shadowId);
        if ((_b = shadowByIdMap == null ? void 0 : shadowByIdMap.has) == null ? void 0 : _b.call(shadowByIdMap, shadowIdString)) return shadowIdString;
        const numericId = Number(shadowIdString);
        if (Number.isFinite(numericId) && ((_c = shadowByIdMap == null ? void 0 : shadowByIdMap.has) == null ? void 0 : _c.call(shadowByIdMap, numericId))) return numericId;
        return null;
      },
      _getShadowHpDataByKey(shadowHP, shadowByIdMap, shadowId) {
        var _a, _b, _c;
        if (shadowId === null || shadowId === void 0) return null;
        const resolvedKey = this._resolveShadowMapKey(shadowByIdMap, shadowId) ?? shadowId;
        if ((_a = shadowHP == null ? void 0 : shadowHP.has) == null ? void 0 : _a.call(shadowHP, resolvedKey)) return shadowHP.get(resolvedKey);
        const keyString = String(resolvedKey);
        if ((_b = shadowHP == null ? void 0 : shadowHP.has) == null ? void 0 : _b.call(shadowHP, keyString)) return shadowHP.get(keyString);
        const numericId = Number(keyString);
        if (Number.isFinite(numericId) && ((_c = shadowHP == null ? void 0 : shadowHP.has) == null ? void 0 : _c.call(shadowHP, numericId))) return shadowHP.get(numericId);
        return null;
      },
      // Check boss HP thresholds and apply enrage stacks (family-scaled intensity)
      _checkBossEnrage(channelKey, dungeon, now = Date.now()) {
        var _a;
        if (!(dungeon == null ? void 0 : dungeon.boss) || dungeon.boss.hp <= 0) return;
        const maxHp = Number(dungeon.boss.maxHp) || Number(dungeon.boss.hp) || 1;
        const hpFraction = dungeon.boss.hp / maxHp;
        const bossFamily = dungeon.boss.beastFamily || null;
        const enrageIntensity = bossFamily ? (C2.BOSS_ENRAGE_INTENSITY || {})[bossFamily] || "medium" : "medium";
        if (enrageIntensity === "none") return;
        const thresholds = enrageIntensity === "high" ? { phase1: 0.6, phase2: 0.35 } : enrageIntensity === "low" ? { phase1: 0.4, phase2: 0.15 } : { phase1: 0.5, phase2: 0.25 };
        if (!dungeon.boss._enragePhases) dungeon.boss._enragePhases = { phase1: false, phase2: false };
        let stacksToApply = 0;
        if (hpFraction <= thresholds.phase1 && !dungeon.boss._enragePhases.phase1) {
          dungeon.boss._enragePhases.phase1 = true;
          stacksToApply += 1;
        }
        if (hpFraction <= thresholds.phase2 && !dungeon.boss._enragePhases.phase2) {
          dungeon.boss._enragePhases.phase2 = true;
          stacksToApply += 1;
        }
        if (stacksToApply <= 0) return;
        (_a = this._applyCombatStatusToEntity) == null ? void 0 : _a.call(this, {
          channelKey,
          targetType: "boss",
          targetId: "boss",
          effectName: "enrage",
          stackDelta: stacksToApply,
          now
        });
      },
      async processBossAttacks(channelKey, cyclesMultiplier = 1, isWindowVisible = null, prebuiltShadowByIdMap = null) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
        try {
          if (isWindowVisible === null) isWindowVisible = this.isWindowVisible();
          if (!isWindowVisible) {
            cyclesMultiplier = Math.max(1, Math.floor(cyclesMultiplier * 0.25));
          }
          const dungeon = this._getActiveDungeon(channelKey);
          if (!dungeon || !dungeon.boss || dungeon.boss.hp <= 0) {
            this.stopBossAttacks(channelKey);
            return;
          }
          const now = Date.now();
          if (this._getActiveDebuff(dungeon, "rulers_force") || this._getActiveDebuff(dungeon, "dragons_fear_boss") || this._getActiveDebuff(dungeon, "bloodlust_boss")) {
            dungeon.boss.lastAttackTime = now;
            return;
          }
          const bossRole = this.ensureMonsterRole(dungeon.boss);
          const bossUnlocked = this.ensureBossEngagementUnlocked(dungeon, channelKey);
          if (!bossUnlocked) {
            dungeon.boss.lastAttackTime = now;
            return;
          }
          this._checkBossEnrage(channelKey, dungeon, now);
          const activeInterval = 1e3;
          const totalTimeSpan = cyclesMultiplier * activeInterval;
          const bossSlowMultiplier = this.getEntityAttackSlowMultiplier(
            channelKey,
            "boss",
            "boss",
            now
          );
          const enrageSpeedMult = ((_a = this.getEntityEnrageSpeedMultiplier) == null ? void 0 : _a.call(this, channelKey, "boss", "boss", now)) || 1;
          const sovereignSlow = 1 + (Number((_b = dungeon.war) == null ? void 0 : _b._sovereignBossSlow) || 0);
          const bossCooldown = this.getEffectiveAttackCooldownMs(
            (dungeon.boss.attackCooldown || activeInterval) * bossSlowMultiplier * enrageSpeedMult * sovereignSlow,
            activeInterval
          );
          if (!dungeon.boss.lastAttackTime || dungeon.boss.lastAttackTime === 0) {
            dungeon.boss.lastAttackTime = now;
          }
          const timeSinceLastAttack = Math.max(0, now - dungeon.boss.lastAttackTime);
          const attacksInSpan = this.calculateAttacksInTimeSpan(
            timeSinceLastAttack,
            bossCooldown,
            totalTimeSpan
          );
          if (attacksInSpan <= 0) return;
          const roleCombatContext = this.getRoleCombatTickContext(channelKey);
          const _domainMitigation = ((_d = (_c = this.soloLevelingStats) == null ? void 0 : _c.settings) == null ? void 0 : _d.rank) === "Shadow Monarch" ? 0.7 : 1;
          const incomingDamageMultiplier = this.getRoleCombatIncomingDamageMultiplier(channelKey, roleCombatContext) * _domainMitigation;
          const bloodlustReduction = this._getBloodlustStatReduction(dungeon);
          const statMult = bloodlustReduction > 0 ? 1 - bloodlustReduction : 1;
          const enrageDamageMult = ((_e = this.getEntityEnrageDamageMultiplier) == null ? void 0 : _e.call(this, channelKey, "boss", "boss", now)) || 1;
          const combinedStatMult = statMult * enrageDamageMult;
          const bossStats = {
            strength: Math.floor(dungeon.boss.strength * combinedStatMult),
            agility: Math.floor(dungeon.boss.agility * statMult),
            // Agility not boosted by rage (raw power only)
            intelligence: Math.floor(dungeon.boss.intelligence * combinedStatMult),
            vitality: Math.floor(dungeon.boss.vitality * statMult)
            // Vitality unaffected
          };
          const { assignedShadows, shadowHP, deadShadows } = this._getDungeonShadowCombatContext(
            channelKey,
            dungeon
          );
          const aliveShadows = this.getCombatReadyShadows(assignedShadows, deadShadows, shadowHP);
          const shadowByIdMap = prebuiltShadowByIdMap || new Map(
            assignedShadows.map((s) => [this.getShadowIdValue(s), s])
          );
          const resolveShadowMapKey = (shadowId) => this._resolveShadowMapKey(shadowByIdMap, shadowId);
          const getShadowHpData = (shadowId) => this._getShadowHpDataByKey(shadowHP, shadowByIdMap, shadowId);
          let totalUserDamage = 0;
          const shadowDamageMap = /* @__PURE__ */ new Map();
          const rankIndexForFallback = typeof this.getRankIndexValue === "function" ? this.getRankIndexValue(((_f = dungeon.boss) == null ? void 0 : _f.rank) || "E") : 0;
          const fallbackAoeTargets = Math.max(1, Math.ceil((rankIndexForFallback + 1) * 1.5));
          const maxTargetsPerAttack = Dungeons3.RANK_MULTIPLIERS[(_g = dungeon.boss) == null ? void 0 : _g.rank] || fallbackAoeTargets;
          if (aliveShadows.length > 0) {
            const aliveSet = new Set(
              aliveShadows.map((shadow) => this.getShadowIdValue(shadow)).filter((shadowId) => shadowId !== null && shadowId !== void 0).map((shadowId) => String(shadowId))
            );
            const damageCache = /* @__PURE__ */ new Map();
            for (let atk = 0; atk < attacksInSpan; atk++) {
              const actualTargets = Math.min(maxTargetsPerAttack, aliveSet.size);
              if (actualTargets <= 0) break;
              const roundHits = /* @__PURE__ */ new Map();
              let picks = 0;
              let attempts = 0;
              const maxAttempts = actualTargets * 3;
              while (picks < actualTargets && attempts < maxAttempts) {
                attempts++;
                const target = aliveShadows[Math.floor(Math.random() * aliveShadows.length)];
                const targetId = this.getShadowIdValue(target);
                if (targetId === null || targetId === void 0) continue;
                const targetIdKey = String(targetId);
                if (!aliveSet.has(targetIdKey)) continue;
                const hpData = getShadowHpData(targetId);
                if (!hpData || hpData.hp <= 0) {
                  aliveSet.delete(targetIdKey);
                  continue;
                }
                roundHits.set(targetId, (roundHits.get(targetId) || 0) + 1);
                picks++;
              }
              const roundVariance = this._varianceWide();
              for (const [shadowId, hits] of roundHits) {
                const resolvedShadowId = resolveShadowMapKey(shadowId) ?? shadowId;
                const target = shadowByIdMap.get(resolvedShadowId);
                if (!target) continue;
                let baseDamage = damageCache.get(resolvedShadowId);
                if (baseDamage == null) {
                  const shadowStats = this.buildShadowStats(target);
                  const shadowRank = target.rank || "E";
                  const shadowRole = target.role || target.roleName || target.ro || this.normalizeShadowRoleKey(target.type);
                  baseDamage = this.calculateBossDamageToShadow(
                    bossStats,
                    shadowStats,
                    dungeon.boss.rank,
                    shadowRank,
                    bossRole,
                    shadowRole,
                    dungeon.boss.beastFamily
                  );
                  damageCache.set(resolvedShadowId, baseDamage);
                }
                const roundDamage = Math.floor(baseDamage * hits * roundVariance * incomingDamageMultiplier);
                if (roundDamage <= 0) continue;
                const hpData = getShadowHpData(resolvedShadowId);
                if (!hpData || hpData.hp <= 0) {
                  aliveSet.delete(String(resolvedShadowId));
                  continue;
                }
                hpData.hp = Math.max(0, hpData.hp - roundDamage);
                shadowHP.set(resolvedShadowId, hpData);
                shadowDamageMap.set(
                  resolvedShadowId,
                  (shadowDamageMap.get(resolvedShadowId) || 0) + roundDamage
                );
                if (hpData.hp <= 0) {
                  aliveSet.delete(String(resolvedShadowId));
                }
              }
            }
          } else if (dungeon.userParticipating) {
            const userStats = this.getUserEffectiveStats();
            const userRank = ((_i = (_h = this.soloLevelingStats) == null ? void 0 : _h.settings) == null ? void 0 : _i.rank) || "E";
            const baseDamage = this.calculateBossDamageToUser(
              bossStats,
              userStats,
              dungeon.boss.rank,
              userRank,
              bossRole,
              dungeon.boss.beastFamily
            );
            const aggregateVariance = this._varianceWide();
            totalUserDamage = Math.floor(
              baseDamage * attacksInSpan * aggregateVariance * incomingDamageMultiplier
            );
          }
          this.queueHPBarUpdate(channelKey);
          await this._applyAccumulatedShadowAndUserDamage({
            shadowDamageMap,
            assignedShadows,
            shadowHP,
            deadShadows,
            channelKey,
            totalUserDamage,
            dungeon,
            userDamageToast: (damage) => `Boss attacked you for ${damage} damage!`,
            shadowByIdMap,
            damageAlreadyApplied: true
            // Boss AOE applies damage per-round for accurate death tracking
          });
          if (dungeon.userParticipating && totalUserDamage > 0 && Number((_j = this.settings) == null ? void 0 : _j.userHP) > 0) {
            this.applyEnemyCombatStatusEffects({
              channelKey,
              attacker: dungeon.boss,
              attackerType: "boss",
              attacksInSpan,
              targetType: "user",
              targetId: "user",
              now
            });
          }
          dungeon.boss.lastAttackTime = this.getPostAttackTimestamp(
            now,
            timeSinceLastAttack,
            bossCooldown,
            totalTimeSpan,
            attacksInSpan
          );
          this.deadShadows.set(channelKey, deadShadows);
        } catch (error) {
          this.errorLog("CRITICAL", "Fatal error in processBossAttacks", { channelKey, error });
        }
      },
      async processMobAttacks(channelKey, cyclesMultiplier = 1, isWindowVisible = null, mobBudget = 500, prebuiltShadowByIdMap = null) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
        try {
          if (isWindowVisible === null) isWindowVisible = this.isWindowVisible();
          if (!isWindowVisible) {
            cyclesMultiplier = Math.max(1, Math.floor(cyclesMultiplier * 0.25));
          }
          const dungeon = this._getActiveDungeon(channelKey);
          if (!dungeon || !((_b = (_a = dungeon.mobs) == null ? void 0 : _a.activeMobs) == null ? void 0 : _b.length)) {
            this.stopMobAttacks(channelKey);
            return;
          }
          const now = Date.now();
          const activeInterval = 1e3;
          const totalTimeSpan = cyclesMultiplier * activeInterval;
          const { assignedShadows, shadowHP, deadShadows } = this._getDungeonShadowCombatContext(
            channelKey,
            dungeon
          );
          const aliveShadows = this.getCombatReadyShadows(assignedShadows, deadShadows, shadowHP);
          const shadowDamageMap = /* @__PURE__ */ new Map();
          let totalUserDamage = 0;
          if (!dungeon.mobs || !dungeon.mobs.activeMobs || dungeon.mobs.activeMobs.length === 0) {
            return;
          }
          const shadowByIdMap = prebuiltShadowByIdMap || new Map(
            assignedShadows.map((s) => [this.getShadowIdValue(s), s])
          );
          const resolveShadowMapKey = (shadowId) => this._resolveShadowMapKey(shadowByIdMap, shadowId);
          const getShadowHpData = (shadowId) => this._getShadowHpDataByKey(shadowHP, shadowByIdMap, shadowId);
          const userStats = dungeon.userParticipating ? this.getUserEffectiveStats() : null;
          const userRank = dungeon.userParticipating ? ((_d = (_c = this.soloLevelingStats) == null ? void 0 : _c.settings) == null ? void 0 : _d.rank) || "E" : "E";
          const roleCombatContext = this.getRoleCombatTickContext(channelKey);
          const _domainMitigation = ((_f = (_e = this.soloLevelingStats) == null ? void 0 : _e.settings) == null ? void 0 : _f.rank) === "Shadow Monarch" ? 0.7 : 1;
          const incomingDamageMultiplier = this.getRoleCombatIncomingDamageMultiplier(channelKey, roleCombatContext) * _domainMitigation;
          const allActiveMobs = dungeon.mobs.activeMobs;
          const maxMobsToSimulate = isWindowVisible ? mobBudget : Math.min(100, Math.floor(mobBudget * 0.2));
          const fearUserRankIdx = dungeon.userParticipating ? this.getRankIndexValue(userRank) : -1;
          const _fearRankIdxCache = /* @__PURE__ */ new Map();
          const mobAttackState = /* @__PURE__ */ new Map();
          let totalAliveMobs = 0;
          let totalAttacksAll = 0;
          for (let m = 0; m < allActiveMobs.length; m++) {
            const mob = allActiveMobs[m];
            if (!mob || mob.hp <= 0) continue;
            totalAliveMobs++;
            if (!mob.lastAttackTime || mob.lastAttackTime === 0) mob.lastAttackTime = now;
            const mobId = this.getEnemyKey(mob, "mob");
            const slowMultiplier = this.getEntityAttackSlowMultiplier(
              channelKey,
              "mob",
              mobId,
              now
            );
            const timeSince = Math.max(0, now - mob.lastAttackTime);
            const cooldown = this.getEffectiveAttackCooldownMs(
              (mob.attackCooldown || activeInterval) * slowMultiplier,
              activeInterval
            );
            let attacks = this.calculateAttacksInSpan(timeSince, cooldown, cyclesMultiplier);
            if (attacks > 0 && fearUserRankIdx >= 0) {
              const mobRankKey = mob.rank || "E";
              let mobRankIdx = _fearRankIdxCache.get(mobRankKey);
              if (mobRankIdx === void 0) {
                mobRankIdx = this.getRankIndexValue(mobRankKey);
                _fearRankIdxCache.set(mobRankKey, mobRankIdx);
              }
              const fearGap = fearUserRankIdx - mobRankIdx;
              if (fearGap >= 2) {
                const fearReduction = Math.min(0.5, 0.15 * (fearGap - 1));
                attacks = Math.round(attacks * (1 - fearReduction));
              }
            }
            mobAttackState.set(mob, { timeSince, cooldown, attacks });
            if (attacks > 0) totalAttacksAll += attacks;
          }
          const rulersDebuff = this._getActiveDebuff(dungeon, "rulers_force");
          if (rulersDebuff && rulersDebuff.mobDisablePercent > 0) {
            totalAttacksAll = Math.floor(totalAttacksAll * (1 - Math.min(1, rulersDebuff.mobDisablePercent)));
          }
          if (this._getActiveDebuff(dungeon, "dragons_fear_mobs") || this._getActiveDebuff(dungeon, "bloodlust_mobs")) {
            totalAttacksAll = 0;
          }
          const mobsToProcess = Math.min(totalAliveMobs, maxMobsToSimulate);
          const mobStride = mobsToProcess > 0 ? Math.max(1, Math.floor(totalAliveMobs / mobsToProcess)) : 1;
          const mobScaleFactor = totalAliveMobs > 0 && mobsToProcess > 0 ? Math.min(25, totalAliveMobs / mobsToProcess) : 1;
          if (aliveShadows.length > 0) {
            const rankGroups = /* @__PURE__ */ new Map();
            let aliveIdx = 0;
            let sampled = 0;
            for (let m = 0; m < allActiveMobs.length && sampled < mobsToProcess; m++) {
              const mob = allActiveMobs[m];
              if (!mob || mob.hp <= 0) continue;
              aliveIdx++;
              if ((aliveIdx - 1) % mobStride !== 0) continue;
              sampled++;
              const attackState = mobAttackState.get(mob);
              const attacksInSpan = (attackState == null ? void 0 : attackState.attacks) || 0;
              if (attacksInSpan <= 0) continue;
              const rank = mob.rank || "E";
              const mobRole = this.ensureMonsterRole(mob);
              const groupKey = `${rank}|${mobRole}`;
              const existing = rankGroups.get(groupKey);
              if (existing) {
                existing.totalHits += attacksInSpan;
                existing.mobCount++;
              } else {
                rankGroups.set(groupKey, {
                  rank,
                  role: mobRole,
                  totalHits: attacksInSpan,
                  mobCount: 1,
                  representativeMob: mob
                });
              }
            }
            let tankSoakFactor = 0;
            if (dungeon.userParticipating && ((_g = this.shadowArmy) == null ? void 0 : _g.getShadowPersonalityKey)) {
              const sampleN = Math.min(120, aliveShadows.length);
              let tankHits = 0;
              const useFullScan = aliveShadows.length <= sampleN;
              for (let i = 0; i < sampleN; i++) {
                const s = useFullScan ? aliveShadows[i] : aliveShadows[Math.random() * aliveShadows.length | 0];
                if (s) {
                  const pk = this.shadowArmy.getShadowPersonalityKey(s);
                  if (pk === "tank" || pk === "defensive") tankHits++;
                }
              }
              tankSoakFactor = Math.min(0.5, tankHits / Math.max(1, sampleN) * 3);
            }
            const LEAK_THROUGH_FACTOR = 0.25;
            const _userMaxHpForLeak = Number((_h = this.settings) == null ? void 0 : _h.userMaxHP) || 0;
            const leakCapThisTick = _userMaxHpForLeak > 0 ? Math.floor(_userMaxHpForLeak * 0.5) : Number.MAX_SAFE_INTEGER;
            let leakedThisTick = 0;
            for (const group of rankGroups.values()) {
              const rank = group.rank;
              const mobRole = group.role;
              const mob = group.representativeMob;
              const scaledHits = Math.ceil(group.totalHits * mobScaleFactor);
              const hitSimulationCap = isWindowVisible ? 1800 : 600;
              const simulatedHits = Math.max(1, Math.min(scaledHits, hitSimulationCap));
              const hitWeight = scaledHits > 0 ? scaledHits / simulatedHits : 1;
              const mobStatVariance = this._varianceNarrow();
              const mobStats = {
                strength: Math.floor(mob.strength * mobStatVariance),
                agility: Math.floor(mob.agility * mobStatVariance),
                intelligence: Math.floor(mob.intelligence * mobStatVariance),
                vitality: Math.floor(mob.vitality * mobStatVariance)
              };
              const useShadowArmyTargeting = !!((_i = this.shadowArmy) == null ? void 0 : _i.processMobAttackOnShadow);
              const hitsPerTarget = /* @__PURE__ */ new Map();
              for (let h = 0; h < simulatedHits; h++) {
                let targetId = null;
                if (useShadowArmyTargeting && h < group.totalHits) {
                  const attackResult = this.shadowArmy.processMobAttackOnShadow(mob, aliveShadows);
                  if (attackResult == null ? void 0 : attackResult.targetShadow) {
                    const rawId = this.getShadowIdValue(attackResult.targetShadow);
                    if (rawId !== null && rawId !== void 0) {
                      const resolved = resolveShadowMapKey(rawId) ?? rawId;
                      const hpData = getShadowHpData(resolved);
                      const queued = shadowDamageMap.get(resolved) || 0;
                      if (hpData && hpData.hp - queued > 0) targetId = resolved;
                    }
                  }
                }
                if (!targetId) {
                  for (let pick = 0; pick < 3; pick++) {
                    const target = aliveShadows[Math.floor(Math.random() * aliveShadows.length)];
                    if (!target) continue;
                    const rawTargetId = this.getShadowIdValue(target);
                    if (rawTargetId === null || rawTargetId === void 0) continue;
                    const resolvedTargetId = resolveShadowMapKey(rawTargetId) ?? rawTargetId;
                    const hpData = getShadowHpData(resolvedTargetId);
                    if (!hpData || hpData.hp <= 0) continue;
                    const accumulatedDmg = shadowDamageMap.get(resolvedTargetId) || 0;
                    if (hpData.hp - accumulatedDmg > 0) {
                      targetId = resolvedTargetId;
                      break;
                    }
                  }
                  if (!targetId) {
                    const target = aliveShadows[Math.floor(Math.random() * aliveShadows.length)];
                    if (target) {
                      const rawTargetId = this.getShadowIdValue(target);
                      if (rawTargetId !== null && rawTargetId !== void 0) {
                        const resolvedTargetId = resolveShadowMapKey(rawTargetId) ?? rawTargetId;
                        const hpData = getShadowHpData(resolvedTargetId);
                        if (hpData && hpData.hp > 0) targetId = resolvedTargetId;
                      }
                    }
                  }
                }
                if (targetId) {
                  hitsPerTarget.set(targetId, (hitsPerTarget.get(targetId) || 0) + 1);
                }
              }
              const _redistributionStatsCache = /* @__PURE__ */ new Map();
              let overflowHits = 0;
              for (const [shadowId, hits] of hitsPerTarget) {
                const resolvedShadowId = resolveShadowMapKey(shadowId) ?? shadowId;
                const target = shadowByIdMap.get(resolvedShadowId);
                if (!target) continue;
                const hpData = getShadowHpData(resolvedShadowId);
                if (!hpData || hpData.hp <= 0) continue;
                let shadowStats = _redistributionStatsCache.get(resolvedShadowId);
                if (!shadowStats) {
                  shadowStats = this.buildShadowStats(target);
                  _redistributionStatsCache.set(resolvedShadowId, shadowStats);
                }
                const shadowRole = target.role || target.roleName || target.ro || this.normalizeShadowRoleKey(target.type);
                const baseDamage = this.calculateMobDamageToShadow(
                  mobStats,
                  shadowStats,
                  rank,
                  target.rank || "E",
                  mobRole,
                  shadowRole,
                  mob.beastFamily
                );
                const aggregateVariance = this._varianceWide();
                const rawDamage = Math.floor(
                  baseDamage * hits * hitWeight * aggregateVariance * incomingDamageMultiplier
                );
                const accumulatedDmg = shadowDamageMap.get(resolvedShadowId) || 0;
                const effectiveHP = Math.max(0, hpData.hp - accumulatedDmg);
                if (effectiveHP <= 0) {
                  overflowHits += hits;
                  continue;
                }
                const cappedDamage = Math.min(rawDamage, effectiveHP + 1);
                shadowDamageMap.set(resolvedShadowId, accumulatedDmg + cappedDamage);
                if (rawDamage > cappedDamage && baseDamage > 0) {
                  const excessDamage = rawDamage - cappedDamage;
                  const effectiveDamagePerHit = Math.max(1, baseDamage * hitWeight);
                  overflowHits += Math.floor(excessDamage / effectiveDamagePerHit);
                }
              }
              let redistributedHits = 0;
              if (overflowHits > 0 && aliveShadows.length > 0) {
                const redistributionCap = Math.min(overflowHits, aliveShadows.length * 2);
                for (let r = 0; r < redistributionCap; r++) {
                  let found = false;
                  for (let pick = 0; pick < 3; pick++) {
                    const target = aliveShadows[Math.floor(Math.random() * aliveShadows.length)];
                    if (!target) continue;
                    const rawTargetId = this.getShadowIdValue(target);
                    if (rawTargetId === null || rawTargetId === void 0) continue;
                    const resolvedTargetId = resolveShadowMapKey(rawTargetId) ?? rawTargetId;
                    const hpData = getShadowHpData(resolvedTargetId);
                    if (!hpData || hpData.hp <= 0) continue;
                    const accDmg = shadowDamageMap.get(resolvedTargetId) || 0;
                    if (hpData.hp - accDmg <= 0) continue;
                    let shadowStats = _redistributionStatsCache.get(resolvedTargetId);
                    if (!shadowStats) {
                      shadowStats = this.buildShadowStats(target);
                      _redistributionStatsCache.set(resolvedTargetId, shadowStats);
                    }
                    const shadowRole = target.role || target.roleName || target.ro || this.normalizeShadowRoleKey(target.type);
                    const baseDmg = this.calculateMobDamageToShadow(
                      mobStats,
                      shadowStats,
                      rank,
                      target.rank || "E",
                      mobRole,
                      shadowRole,
                      mob.beastFamily
                    );
                    const effectiveHP = hpData.hp - accDmg;
                    const dmg = Math.min(
                      Math.floor(baseDmg * hitWeight * this._varianceWide() * incomingDamageMultiplier),
                      effectiveHP + 1
                    );
                    shadowDamageMap.set(resolvedTargetId, accDmg + dmg);
                    found = true;
                    redistributedHits++;
                    break;
                  }
                  if (!found) break;
                }
              }
              const unabsorbedHits = overflowHits - redistributedHits;
              if (unabsorbedHits > 0 && dungeon.userParticipating && userStats && leakedThisTick < leakCapThisTick) {
                const leakBase = this.calculateMobDamageToUser(
                  mobStats,
                  userStats,
                  rank,
                  userRank,
                  mobRole,
                  mob.beastFamily
                );
                let leaked = Math.floor(
                  leakBase * unabsorbedHits * hitWeight * LEAK_THROUGH_FACTOR * this._varianceWide() * incomingDamageMultiplier
                );
                leaked = Math.floor(leaked * (1 - tankSoakFactor));
                leaked = Math.min(leaked, leakCapThisTick - leakedThisTick);
                if (leaked > 0) {
                  leakedThisTick += leaked;
                  totalUserDamage += leaked;
                }
              }
            }
          } else if (dungeon.userParticipating && userStats) {
            if (totalAttacksAll > 0) {
              let representativeMob = null;
              for (const mob of allActiveMobs) {
                if (mob && mob.hp > 0) {
                  representativeMob = mob;
                  break;
                }
              }
              if (representativeMob) {
                const mobRole = this.ensureMonsterRole(representativeMob);
                const mobStatVariance = this._varianceNarrow();
                const mobStats = {
                  strength: Math.floor(representativeMob.strength * mobStatVariance),
                  agility: Math.floor(representativeMob.agility * mobStatVariance),
                  intelligence: Math.floor(representativeMob.intelligence * mobStatVariance),
                  vitality: Math.floor(representativeMob.vitality * mobStatVariance)
                };
                const baseDamage = this.calculateMobDamageToUser(
                  mobStats,
                  userStats,
                  representativeMob.rank,
                  userRank,
                  mobRole,
                  representativeMob.beastFamily
                );
                const aggregateVariance = this._varianceWide();
                totalUserDamage = Math.floor(
                  baseDamage * totalAttacksAll * aggregateVariance * incomingDamageMultiplier
                );
              }
            }
          }
          for (const mob of allActiveMobs) {
            if (!mob || mob.hp <= 0) continue;
            const attackState = mobAttackState.get(mob);
            if (!attackState || attackState.attacks <= 0) continue;
            mob.lastAttackTime = this.getPostAttackTimestamp(
              now,
              attackState.timeSince,
              attackState.cooldown,
              totalTimeSpan,
              attackState.attacks
            );
          }
          await this._applyAccumulatedShadowAndUserDamage({
            shadowDamageMap,
            assignedShadows,
            shadowHP,
            deadShadows,
            channelKey,
            totalUserDamage,
            dungeon,
            shadowByIdMap
          });
          if (dungeon.userParticipating && totalUserDamage > 0 && Number((_j = this.settings) == null ? void 0 : _j.userHP) > 0) {
            let representativeMob = null;
            for (const mob of allActiveMobs) {
              if (mob && mob.hp > 0) {
                representativeMob = mob;
                break;
              }
            }
            if (representativeMob) {
              this.applyEnemyCombatStatusEffects({
                channelKey,
                attacker: representativeMob,
                attackerType: "mob",
                attacksInSpan: totalAttacksAll,
                targetType: "user",
                targetId: "user",
                now
              });
            }
          }
          this.deadShadows.set(channelKey, deadShadows);
          this.queueHPBarUpdate(channelKey);
        } catch (error) {
          this.errorLog("CRITICAL", "Fatal error in processMobAttacks", { channelKey, error });
        }
      },
      /**
       * Externally-granted crit for ONE user attack, resolved once and reused for
       * every mob in the swing.
       *
       * The boss path (_resolveUserBossDamage) applies the CriticalHit-plugin crit
       * and the skill-tree passive crit on top of the natural roll; the mob path
       * never did, so equipment crit-damage, the passive, and the plugin bonus were
       * all inert for the whole mob phase. Natural per-mob crits already happen
       * inside calculateUserDamage — this only adds the external layer.
       *
       * @returns {{isCritical: boolean, apply: (damage:number)=>number}}
       */
      _resolveUserMobCrit(messageElement = null) {
        var _a, _b, _c;
        const critDamageBonus = ((_a = this.getUserCritDamageBonus) == null ? void 0 : _a.call(this)) || 0;
        const pluginCrit = Boolean(messageElement && ((_b = this.checkCriticalHit) == null ? void 0 : _b.call(this, messageElement)));
        const passiveCrit = !pluginCrit && Boolean((_c = this.rollSkillTreeCombatCrit) == null ? void 0 : _c.call(this));
        if (!pluginCrit && !passiveCrit) {
          return { isCritical: false, apply: (damage) => damage };
        }
        return {
          isCritical: true,
          apply: (damage) => this._applyExternalCrit(damage, 2, critDamageBonus)
        };
      },
      async attackMobs(channelKey, source, messageElement = null) {
        var _a, _b;
        const dungeon = this.activeDungeons.get(channelKey);
        if (!dungeon || !((_b = (_a = dungeon.mobs) == null ? void 0 : _a.activeMobs) == null ? void 0 : _b.length)) return;
        if (source === "user") {
          const userCrit = this._resolveUserMobCrit(messageElement);
          dungeon.mobs.activeMobs.filter((mob) => mob && mob.hp > 0).forEach((mob) => {
            const mobStats = {
              strength: mob.strength,
              agility: mob.agility,
              intelligence: mob.intelligence,
              vitality: mob.vitality
            };
            const userDamage = userCrit.apply(this.calculateUserDamage(mobStats, mob.rank));
            const mobId = this.getEnemyKey(mob, "mob");
            const adjustedUserDamage = this.applyStatusAdjustedIncomingDamage(
              channelKey,
              "mob",
              mobId,
              userDamage,
              Date.now()
            );
            mob.hp = Math.max(0, mob.hp - adjustedUserDamage);
            if (mob.hp <= 0) {
              this._onMobKilled(channelKey, dungeon, mob.rank);
              this._addToCorpsePile(channelKey, mob, false);
            }
          });
          this.queueHPBarUpdate(channelKey);
          const nextActiveMobs = [];
          for (const m of dungeon.mobs.activeMobs) {
            m && m.hp > 0 && nextActiveMobs.push(m);
          }
          dungeon.mobs.activeMobs = nextActiveMobs;
          return;
        }
        if (source === "shadows") {
          await this.processShadowAttacks(channelKey, 1, this.isWindowVisible());
          return;
        }
      },
      /**
       * Mean rank index of the shadows deployed to this dungeon, minus the boss's
       * rank index. 0 means "I sent an evenly-matched army"; +3 means the army
       * averages three whole ranks above the boss.
       *
       * Memoized on shadowAllocation.updatedAt: reallocation is rare, combat ticks
       * are not, and the roster can hold thousands of shadows.
       *
       * @returns {number} rank advantage, or 0 when the roster is unknown.
       */
      _getDeployedRankAdvantage(dungeon) {
        var _a, _b;
        const alloc = dungeon == null ? void 0 : dungeon.shadowAllocation;
        const roster = alloc == null ? void 0 : alloc.shadows;
        if (!Array.isArray(roster) || roster.length === 0) return 0;
        const key = `${dungeon.channelKey}:${alloc.updatedAt || 0}:${roster.length}`;
        if (((_a = this._bossCapRankCache) == null ? void 0 : _a.key) === key) return this._bossCapRankCache.value;
        let sum = 0;
        for (const s of roster) sum += getRankIndex((s == null ? void 0 : s.rank) || "E");
        const avgShadowRank = sum / roster.length;
        const bossRank = getRankIndex(((_b = dungeon == null ? void 0 : dungeon.boss) == null ? void 0 : _b.rank) || (dungeon == null ? void 0 : dungeon.rank) || "E");
        const value = avgShadowRank - bossRank;
        this._bossCapRankCache = { key, value };
        return value;
      },
      /**
       * Per-tick boss damage cap as a fraction of max HP.
       *
       * At parity (advantage <= 0) this returns BOSS_DAMAGE_CAP_PCT, preserving the
       * original guarantee that a boss survives at least 1/capPct ticks. Each full
       * rank of advantage multiplies the cap by BOSS_DAMAGE_CAP_RANK_GROWTH, so an
       * army that badly outclasses the gate eventually reaches 1.0 (uncapped) and
       * CAN one-shot it — which is the intended reward for overwhelming force.
       */
      _getBossDamageCapPct(dungeon) {
        var _a, _b;
        const base = Number.isFinite((_a = this.settings) == null ? void 0 : _a.bossDamageCapPct) ? this.settings.bossDamageCapPct : C2.BOSS_DAMAGE_CAP_PCT || 0.06;
        const growth = Number.isFinite((_b = this.settings) == null ? void 0 : _b.bossDamageCapRankGrowth) ? this.settings.bossDamageCapRankGrowth : C2.BOSS_DAMAGE_CAP_RANK_GROWTH || 1.6;
        const advantage = this._getDeployedRankAdvantage(dungeon);
        if (advantage <= 0) return base;
        return Math.min(1, base * Math.pow(growth, advantage));
      },
      async applyDamageToBoss(channelKey, damage, source, shadowId = null, isCritical = false, nowOverride = null) {
        var _a, _b, _c, _d, _e;
        const dungeon = this.activeDungeons.get(channelKey);
        if (!dungeon) return;
        const now = Date.now();
        const phaseShieldNow = nowOverride != null ? nowOverride : now;
        const bossUnlocked = this.ensureBossEngagementUnlocked(dungeon, channelKey);
        if (!bossUnlocked) {
          dungeon.shadowsDeployed && this.ensureDeployedSpawnPipeline(channelKey, "boss_damage_blocked");
          if (source === "user") {
            (_a = this._notifyBossGateLocked) == null ? void 0 : _a.call(this, dungeon);
          }
          return;
        }
        if (source !== "status") {
          damage = this.applyStatusAdjustedIncomingDamage(
            channelKey,
            "boss",
            "boss",
            damage,
            now
          );
        }
        if (nowOverride == null) {
          const shieldMsGuard = C2.BOSS_PHASE_SHIELD_MS || 2500;
          if (dungeon.boss._phaseShieldExpiresAt && dungeon.boss._phaseShieldExpiresAt > now + shieldMsGuard) {
            (_b = this.debugLog) == null ? void 0 : _b.call(this, `BOSS PHASE SHIELD watchdog: expiresAt was ${dungeon.boss._phaseShieldExpiresAt - now}ms ahead of real time (impossible) -- resetting`);
            dungeon.boss._phaseShieldExpiresAt = 0;
          }
        }
        if (dungeon.boss._phaseShieldExpiresAt && phaseShieldNow < dungeon.boss._phaseShieldExpiresAt) {
          return;
        }
        const bossResistance = (C2.BOSS_DAMAGE_RESISTANCE || {})[dungeon.boss.rank] || 0;
        if (bossResistance > 0) {
          damage = Math.max(1, Math.floor(damage * (1 - bossResistance)));
        }
        const capPct = this._getBossDamageCapPct(dungeon);
        const maxDamagePerHit = Math.max(1, Math.floor((dungeon.boss.maxHp || 1) * capPct));
        damage = Math.min(damage, maxDamagePerHit);
        const resistReduction = this._getRulersForceResistReduction(dungeon);
        if (damage > 0 && resistReduction > 0) {
          damage = Math.floor(damage * (1 / (1 - resistReduction)));
        }
        const hpBefore = dungeon.boss.hp;
        dungeon.boss.hp = Math.max(0, dungeon.boss.hp - damage);
        const thresholds = C2.BOSS_PHASE_THRESHOLDS || [0.75, 0.5, 0.25];
        const shieldMs = C2.BOSS_PHASE_SHIELD_MS || 2500;
        const maxHp = dungeon.boss.maxHp || 1;
        if (!dungeon.boss._phasesTriggered) dungeon.boss._phasesTriggered = [];
        for (const threshold of thresholds) {
          if (dungeon.boss._phasesTriggered.includes(threshold)) continue;
          const thresholdHp = maxHp * threshold;
          if (hpBefore > thresholdHp && dungeon.boss.hp <= thresholdHp && dungeon.boss.hp > 0) {
            dungeon.boss._phasesTriggered.push(threshold);
            dungeon.boss._phaseShieldExpiresAt = phaseShieldNow + shieldMs;
            (_c = this.debugLog) == null ? void 0 : _c.call(this, `BOSS PHASE SHIELD triggered at ${Math.round(threshold * 100)}% HP \u2014 ${shieldMs}ms invulnerability`);
            break;
          }
        }
        if (source === "shadow" && shadowId) {
          this._addShadowContribution(dungeon, shadowId, "bossDamage", damage);
        }
        if (source === "user") {
          if (!dungeon.userDamageDealt) dungeon.userDamageDealt = 0;
          if (!dungeon.userCriticalHits) dungeon.userCriticalHits = 0;
          dungeon.userDamageDealt += damage;
          if (isCritical) {
            dungeon.userCriticalHits++;
          }
          if (!dungeon.userAttackCount) dungeon.userAttackCount = 0;
          dungeon.userAttackCount++;
          if (dungeon.userAttackCount % 10 === 0) {
            const critText = dungeon.userCriticalHits > 0 ? ` (${dungeon.userCriticalHits} crits!)` : "";
            this.debugLog(
              `User dealt ${dungeon.userDamageDealt.toLocaleString()} total damage in ${dungeon.userAttackCount} attacks${critText}`
            );
          }
        }
        this.queueHPBarUpdate(channelKey);
        if (dungeon.boss.hp <= 0) {
          (_e = this.debugLog) == null ? void 0 : _e.call(this, `BOSS DEFEATED in ${dungeon.name} (${dungeon.rank}-rank) | Mobs killed: ${((_d = dungeon.mobs) == null ? void 0 : _d.killed) || 0} | User participating: ${dungeon.userParticipating} | Shadows deployed: ${dungeon.shadowsDeployed}`);
          dungeon.completed = true;
          this.removeBossHPBar(channelKey);
          document.querySelectorAll(`.dungeon-boss-hp-container[data-channel-key="${channelKey}"]`).forEach((el) => el.remove());
          this.completeDungeon(channelKey, "boss");
          if (this.storageManager) {
            this.storageManager.saveDungeon(dungeon).catch((err) => this.errorLog("Failed to save dungeon", err));
          }
          this.markCombatSettingsDirty("boss-defeated");
          return;
        }
        this._debounceDungeonSave(channelKey, dungeon);
      },
      /**
       * Mid-combat crash-recovery snapshot. NOT the completion save — completion
       * has its own path, so anything lost here costs progress, never correctness.
       *
       * CADENCE 5s -> 30s (2026-08-06). Measured: 191 saves at avg 1299ms (worst
       * 3062ms) = 248 SECONDS of main-thread blocking in one session, the single
       * largest attributed cost in the suite. The payload is dominated by
       * shadowContributions — one entry per shadow that ever landed a kill,
       * growing toward deploy size, re-packed and structured-cloned on every save
       * (storage.js sanitizeDungeonForStorage documents this field as
       * "effectively the whole payload").
       *
       * Raising the interval is the robust lever: it cuts total cost ~6x whether
       * the expense is the pack loop or the clone, without touching correctness.
       * The tradeoff is bounded and cheap — an unexpected crash now loses up to
       * 30s of kill attribution instead of 5s.
       */
      _debounceDungeonSave(channelKey, dungeon) {
        if (!this._dungeonSaveTimers) this._dungeonSaveTimers = /* @__PURE__ */ new Map();
        if (this._dungeonSaveTimers.has(channelKey)) return;
        const timerId = this._setTrackedTimeout(() => {
          this._dungeonSaveTimers.delete(channelKey);
          if (this.storageManager) {
            const t0 = this.settings.debug ? Date.now() : 0;
            const contribCount = this.settings.debug ? Object.keys((dungeon == null ? void 0 : dungeon.shadowContributions) || {}).length : 0;
            this.storageManager.saveDungeon(dungeon).then(() => {
              var _a;
              this.settings.debug && console.log(
                `[Dungeons] \u{1F4BE} DUNGEON SAVE: ${Date.now() - t0}ms | contributions=${contribCount.toLocaleString()} | corpses=${((dungeon == null ? void 0 : dungeon.corpsePile) || []).length} | mobs=${(((_a = dungeon == null ? void 0 : dungeon.mobs) == null ? void 0 : _a.activeMobs) || []).length}`
              );
            }).catch((err) => this.errorLog("Failed to save dungeon", err));
          }
          this.markCombatSettingsDirty("debounced-dungeon-save");
        }, 3e4);
        this._dungeonSaveTimers.set(channelKey, timerId);
      }
    };
  }
});

// src/Dungeons/resurrection-completion.js
var require_resurrection_completion = __commonJS({
  "src/Dungeons/resurrection-completion.js"(exports2, module2) {
    var SLEvents = require_event_bus();
    var DungeonConstants = require_constants();
    function rankScaledXP(base, rank) {
      var _a;
      const mult = (_a = DungeonConstants.RANK_MULTIPLIERS) == null ? void 0 : _a[rank];
      return Math.floor(base * (Number.isFinite(mult) && mult > 0 ? mult : 1));
    }
    module2.exports = {
      getResurrectionCost(shadowRank) {
        var _a, _b, _c, _d;
        const rankIndex = this.getRankIndexValue(shadowRank);
        const flatCost = ((_a = this._flatResCostTable) == null ? void 0 : _a[rankIndex]) ?? 10;
        const userRank = ((_c = (_b = this.soloLevelingStats) == null ? void 0 : _b.settings) == null ? void 0 : _c.rank) || "E";
        const userRankIndex = this.getRankIndexValue(userRank);
        const maxRankIndex = (((_d = this.settings.dungeonRanks) == null ? void 0 : _d.length) || 12) - 1;
        const ratio = maxRankIndex > 0 ? userRankIndex / maxRankIndex : 0;
        const discount = Math.pow(ratio, 0.6) * 0.92;
        return Math.max(1, Math.ceil(flatCost * (1 - discount)));
      },
      async attemptAutoResurrection(shadow, channelKey) {
        var _a, _b, _c;
        if (!shadow || !this.soloLevelingStats) return false;
        const shadowRank = shadow.rank || "E";
        const isShadowMonarch = ((_b = (_a = this.soloLevelingStats) == null ? void 0 : _a.settings) == null ? void 0 : _b.rank) === "Shadow Monarch";
        const manaCost = isShadowMonarch ? 0 : this.getResurrectionCost(shadowRank);
        if (!isShadowMonarch && (!manaCost || manaCost <= 0)) {
          this.errorLog(`Invalid resurrection cost for rank ${shadowRank}: ${manaCost}`);
          return false;
        }
        this.syncManaFromStats();
        if (typeof this.settings.userMana !== "number" || isNaN(this.settings.userMana)) {
          this.errorLog(`Invalid userMana value: ${this.settings.userMana}`);
          this.settings.userMana = this.settings.userMaxMana || 0;
        }
        let dungeon = this.activeDungeons.get(channelKey);
        const budgetAvailable = this._tickManaBudgetPerDungeon !== void 0 ? this._tickManaBudgetPerDungeon - ((dungeon == null ? void 0 : dungeon._tickManaUsed) || 0) : this.settings.userMana;
        if (budgetAvailable < manaCost) {
          if (dungeon) {
            if (!dungeon.failedResurrections) dungeon.failedResurrections = 0;
            dungeon.failedResurrections++;
            try {
              if (SLEvents) {
                SLEvents.emit("Dungeons:awardEssence", { amount: 1, source: "failed_resurrection" });
              }
            } catch (essenceError) {
              (_c = this.debugLog) == null ? void 0 : _c.call(this, `Failed to award shadow essence: ${essenceError.message}`);
            }
            if (!dungeon.lowManaWarningShown && this.settings.userMana === 0) {
              dungeon.lowManaWarningShown = true;
              const percent = Math.floor(this.settings.userMana / this.settings.userMaxMana * 100);
              this.debugLog(
                `Low mana: cannot resurrect shadows. Mana: ${this.settings.userMana}/${this.settings.userMaxMana} (${percent}%)`
              );
              this.showToast(`No mana: shadow resurrections paused until mana regenerates.`, "warning");
            }
          }
          return false;
        }
        if (dungeon && dungeon.lowManaWarningShown && this.settings.userMana >= manaCost) {
          dungeon.lowManaWarningShown = false;
        }
        const manaBefore = this.settings.userMana;
        if (this._tickManaBudgetPerDungeon !== void 0) {
          dungeon._tickManaUsed = (dungeon._tickManaUsed || 0) + manaCost;
        } else {
          this.settings.userMana -= manaCost;
        }
        let manaAfter = this.settings.userMana;
        if (this._tickManaBudgetPerDungeon !== void 0) {
          manaAfter = Math.max(0, manaBefore - manaCost);
        }
        if (this._tickManaBudgetPerDungeon === void 0 && this.settings.userMana < 0) {
          this.errorLog(
            `CRITICAL: Mana went negative! Resetting to 0. Before: ${manaBefore}, Cost: ${manaCost}`
          );
          this.settings.userMana = 0;
        }
        if (this._tickManaBudgetPerDungeon === void 0) {
          manaAfter = this.settings.userMana;
          const actualDeduction = manaBefore - manaAfter;
          if (actualDeduction !== manaCost) {
            this.debugLog(`Mana deduction mismatch! Expected: ${manaCost}, Actual: ${actualDeduction}`);
          }
        }
        if (this._tickManaBudgetPerDungeon === void 0) {
          this.pushManaToStats(false);
        }
        this.startRegeneration();
        if (dungeon) {
          dungeon.shadowRevives = (dungeon.shadowRevives || 0) + 1;
          if (!dungeon.successfulResurrections) dungeon.successfulResurrections = 0;
          dungeon.successfulResurrections++;
          if (dungeon.successfulResurrections % 100 === 0 || dungeon.successfulResurrections === 50 || dungeon.successfulResurrections === 200 || dungeon.successfulResurrections === 500) {
            const percent = Math.floor(manaAfter / this.settings.userMaxMana * 100);
            this.settings.debug && console.log(
              `[Dungeons] ${dungeon.successfulResurrections} shadows resurrected. Mana: ${manaAfter}/${this.settings.userMaxMana} (${percent}%)`
            );
          }
        }
        this.markCombatSettingsDirty("auto-resurrection");
        return true;
      },
      completeDungeon(channelKey, reason) {
        var _a, _b, _c, _d;
        const dungeon = this.activeDungeons.get(channelKey);
        if (!dungeon) return;
        if (dungeon._isDemonCastle && reason !== "timeout") {
          return this._completeDemonCastleFloor(channelKey, dungeon, reason);
        }
        if (dungeon._completing) return;
        dungeon._completing = true;
        dungeon._completingStartedAt = Date.now();
        (_a = this._invalidateDeployAssignedUnion) == null ? void 0 : _a.call(this);
        let hadShadowsDeployed = false;
        let corpsePileSnapshot = [];
        let dungeonSnapshot = null;
        let shadowDeathCount = 0;
        try {
          this.settings.lastDungeonEndTime || (this.settings.lastDungeonEndTime = {});
          this.settings.lastDungeonEndTime[channelKey] = Date.now();
          hadShadowsDeployed = Boolean(dungeon.shadowsDeployed);
          dungeon.completed = reason !== "timeout";
          dungeon.failed = reason === "timeout";
          const originalDeployedAt = dungeon.deployedAt;
          const originalBossGateDeployedAt = (_b = dungeon.bossGate) == null ? void 0 : _b.deployedAt;
          dungeon.shadowsDeployed = false;
          dungeon.deployedAt = null;
          if (dungeon.bossGate && typeof dungeon.bossGate === "object") {
            dungeon.bossGate.deployedAt = null;
            dungeon.bossGate.unlockedAt = null;
          }
          this.shadowAllocations.delete(channelKey);
          this._markAllocationDirty(`dungeon-complete:${reason}`);
          corpsePileSnapshot = dungeon.corpsePile || [];
          dungeon.corpsePile = [];
          dungeonSnapshot = {
            id: dungeon.id,
            name: dungeon.name,
            rank: dungeon.rank,
            _xpBatchKey: this._resolveDungeonXPBatchKey(channelKey, dungeon),
            channelName: dungeon.channelName,
            guildName: dungeon.guildName,
            userParticipating: dungeon.userParticipating,
            // ARISE eligibility (2026-08-05): userJoined is the permanent
            // "was ever in this dungeon" flag (player-flow.js join). It was
            // documented as the ARISE-eligibility flag from day one but never
            // read — the arise gates below checked userParticipating, which
            // player death flips to false (combat-primitives), so dying to
            // the boss silently voided the entire arise pass. Dying costs the
            // XP participation bonus (that check stays on userParticipating);
            // it does not un-join you from the dungeon you fought in.
            userJoined: Boolean(dungeon.userJoined || dungeon.userParticipating),
            shadowContributions: { ...dungeon.shadowContributions },
            boss: dungeon.boss ? { ...dungeon.boss } : null,
            bossGate: dungeon.bossGate ? { ...dungeon.bossGate, deployedAt: originalBossGateDeployedAt } : null,
            deployedAt: originalDeployedAt,
            startTime: dungeon.startTime,
            mobs: { killed: ((_c = dungeon.mobs) == null ? void 0 : _c.killed) || 0 },
            pendingUserMobXP: Number.isFinite(Number(dungeon.pendingUserMobXP)) ? Math.max(0, Math.floor(Number(dungeon.pendingUserMobXP))) : 0,
            pendingUserMobKills: Number.isFinite(Number(dungeon.pendingUserMobKills)) ? Math.max(0, Math.floor(Number(dungeon.pendingUserMobKills))) : 0,
            shadowRevives: dungeon.shadowRevives || 0,
            userDamageDealt: dungeon.userDamageDealt || 0,
            beastFamilies: dungeon.beastFamilies,
            combatAnalytics: dungeon.combatAnalytics ? { ...dungeon.combatAnalytics } : {},
            pendingEssence: dungeon._pendingEssence || 0,
            isDemonCastle: !!dungeon._isDemonCastle,
            dcFloor: dungeon._dcFloor || 0
          };
          shadowDeathCount = ((_d = this.deadShadows.get(channelKey)) == null ? void 0 : _d.size) || 0;
          this.stopShadowAttacks(channelKey);
          this.stopBossAttacks(channelKey);
          this.stopMobAttacks(channelKey);
          this.stopMobKillNotifications(channelKey);
          this.stopMobSpawning(channelKey);
          this.removeDungeonIndicator(channelKey);
          this.removeBossHPBar(channelKey);
          document.querySelectorAll(`.dungeon-boss-hp-container[data-channel-key="${channelKey}"]`).forEach((el) => {
            el.remove();
          });
          if (this.settings.userActiveDungeon === channelKey) {
            this.settings.userActiveDungeon = null;
          }
          this.channelLocks.delete(channelKey);
          this.activeDungeons.delete(channelKey);
          this._cleanupPerChannelRuntimeState(channelKey);
          this.saveSettings();
        } catch (phaseAError) {
          dungeon._completing = false;
          this.errorLog("CRITICAL", "Phase A of completeDungeon failed \u2014 dungeon may be in inconsistent state", {
            channelKey,
            reason,
            error: phaseAError
          });
          return;
        }
        this._completeDungeonBackground(
          channelKey,
          reason,
          dungeonSnapshot,
          corpsePileSnapshot,
          hadShadowsDeployed,
          shadowDeathCount
        ).catch((err) => {
          this.errorLog("Background dungeon completion failed", err);
          try {
            this.showToast("Dungeon processing error \u2014 XP/ARISE may be incomplete.", "error");
          } catch (_) {
          }
        });
      },
      _cleanupPerChannelRuntimeState(channelKey) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N;
        if (this.settings.mobKillNotifications) delete this.settings.mobKillNotifications[channelKey];
        (_b = (_a = this.deadShadows) == null ? void 0 : _a.delete) == null ? void 0 : _b.call(_a, channelKey);
        this.clearRoleCombatState(channelKey);
        (_c = this.clearCombatStatusState) == null ? void 0 : _c.call(this, channelKey);
        (_e = (_d = this.extractionInProgress) == null ? void 0 : _d.delete) == null ? void 0 : _e.call(_d, channelKey);
        (_g = (_f = this._lastShadowAttackTime) == null ? void 0 : _f.delete) == null ? void 0 : _g.call(_f, channelKey);
        (_i = (_h = this._lastBossAttackTime) == null ? void 0 : _h.delete) == null ? void 0 : _i.call(_h, channelKey);
        (_k = (_j = this._lastMobAttackTime) == null ? void 0 : _j.delete) == null ? void 0 : _k.call(_j, channelKey);
        (_m = (_l = this._ariseButtonRefs) == null ? void 0 : _l.delete) == null ? void 0 : _m.call(_l, channelKey);
        (_o = (_n = this._bossBarLayoutThrottle) == null ? void 0 : _n.delete) == null ? void 0 : _o.call(_n, channelKey);
        (_q = (_p = this._mobSpawnNextAt) == null ? void 0 : _p.delete) == null ? void 0 : _q.call(_p, channelKey);
        (_s = (_r = this._mobSpawnQueueNextAt) == null ? void 0 : _r.delete) == null ? void 0 : _s.call(_r, channelKey);
        (_u = (_t = this._spawnPipelineGuardAt) == null ? void 0 : _t.delete) == null ? void 0 : _u.call(_t, channelKey);
        (_w = (_v = this._mobContributionMissLogState) == null ? void 0 : _v.delete) == null ? void 0 : _w.call(_v, channelKey);
        (_y = (_x = this._lastRebalanceAt) == null ? void 0 : _x.delete) == null ? void 0 : _y.call(_x, channelKey);
        (_A = (_z = this._deployRebalanceInFlight) == null ? void 0 : _z.delete) == null ? void 0 : _A.call(_z, channelKey);
        (_C = (_B = this._allocationSummary) == null ? void 0 : _B.delete) == null ? void 0 : _C.call(_B, channelKey);
        (_E = (_D = this._mobCleanupCache) == null ? void 0 : _D.delete) == null ? void 0 : _E.call(_D, channelKey);
        (_F = this._lastHPBarUpdate) == null ? true : delete _F[channelKey];
        (_G = this._mobCapWarningShown) == null ? true : delete _G[channelKey];
        (_J = (_I = (_H = this.mobBossStorageManager) == null ? void 0 : _H._lastBossSaveFraction) == null ? void 0 : _I.delete) == null ? void 0 : _J.call(_I, `boss_${channelKey}`);
        if ((_L = (_K = this._dungeonSaveTimers) == null ? void 0 : _K.has) == null ? void 0 : _L.call(_K, channelKey)) {
          const timerId = this._dungeonSaveTimers.get(channelKey);
          (_N = (_M = this._timeouts) == null ? void 0 : _M.delete) == null ? void 0 : _N.call(_M, timerId);
          clearTimeout(timerId);
          this._dungeonSaveTimers.delete(channelKey);
        }
        if (this.extractionEvents) {
          const eventsToRemove = [];
          this.extractionEvents.forEach((_, key) => {
            key.includes(channelKey) && eventsToRemove.push(key);
          });
          eventsToRemove.forEach((key) => this.extractionEvents.delete(key));
        }
      },
      async _completeDungeonBackground(channelKey, reason, snap, corpsePileSnapshot, hadShadowsDeployed, shadowDeathCount) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (!this.started) return;
        const backgroundStartedAt = Date.now();
        const phaseTimings = {};
        const markPhase = (phaseKey, startedAt) => {
          phaseTimings[phaseKey] = Date.now() - startedAt;
        };
        const combatAnalytics = snap.combatAnalytics || {};
        const summaryStats = {
          dungeonName: snap.name,
          dungeonRank: snap.rank,
          userParticipated: snap.userParticipating,
          userXP: 0,
          shadowTotalXP: 0,
          shadowsLeveledUp: [],
          shadowsRankedUp: [],
          totalMobsKilled: snap.mobs.killed || 0,
          shadowDeaths: shadowDeathCount,
          shadowRevives: snap.shadowRevives || 0,
          reason,
          totalBossDamage: combatAnalytics.totalBossDamage || 0,
          totalMobDamage: combatAnalytics.totalMobDamage || 0,
          shadowsAttackedBoss: combatAnalytics.shadowsAttackedBoss || 0,
          shadowsAttackedMobs: combatAnalytics.shadowsAttackedMobs || 0
        };
        let phaseStartAt = Date.now();
        const xpBatchKey = this._resolveDungeonXPBatchKey(channelKey, snap);
        const { pendingXP: pendingMobXP, pendingKills: pendingMobKills } = this._consumePendingDungeonMobXP(xpBatchKey, snap);
        if (pendingMobXP > 0) {
          if (this._grantUserDungeonXP(pendingMobXP, "dungeon_mob_kill_batch", {
            channelKey,
            dungeonRank: snap.rank,
            reason,
            pendingMobKills
          })) {
            summaryStats.userXP += pendingMobXP;
          }
        }
        summaryStats.mobKillXP = pendingMobXP;
        summaryStats.mobKillsAwarded = pendingMobKills;
        markPhase("userMobBatchXpMs", phaseStartAt);
        phaseStartAt = Date.now();
        if (reason === "complete") {
          if (this.soloLevelingStats) {
            const completionXP = rankScaledXP(100, snap.rank);
            if (this._grantUserDungeonXP(completionXP, "dungeon_complete", {
              channelKey,
              dungeonRank: snap.rank,
              reason
            })) {
              summaryStats.userXP += completionXP;
            }
          }
          if (snap.pendingEssence > 0) {
            try {
              if (SLEvents) {
                SLEvents.emit("Dungeons:awardEssence", {
                  amount: snap.pendingEssence,
                  mobRank: snap.rank || "E",
                  source: "mob_kill_flush"
                });
              }
            } catch (_) {
            }
          }
        }
        if (reason === "boss") {
          const actualBossDamage = summaryStats.totalBossDamage || 0;
          const actualMobsKilled = summaryStats.totalMobsKilled || 0;
          const userDealtDamage = (snap.userDamageDealt || 0) > 0;
          if (actualBossDamage === 0 && actualMobsKilled === 0 && !userDealtDamage) {
            this.debugLog(
              "XP",
              `XP denied: "${snap.name}" [${snap.rank}] boss defeated with no user/shadow contribution`
            );
            this.showToast(`${snap.name}: No XP earned \u2014 no combat contribution.`, "info");
          } else if (this.soloLevelingStats) {
            const bossXP = rankScaledXP(200, snap.rank);
            if (this._grantUserDungeonXP(bossXP, "dungeon_boss_kill", {
              channelKey,
              dungeonRank: snap.rank,
              reason,
              userParticipating: snap.userParticipating
            })) {
              summaryStats.userXP += bossXP;
            }
          }
          try {
            const bossPayload = {
              amount: 1,
              bossRank: ((_a = snap.boss) == null ? void 0 : _a.rank) || snap.rank || "E",
              source: "boss_kill",
              bossName: ((_b = snap.boss) == null ? void 0 : _b.name) || null
            };
            if (snap.isDemonCastle) {
              bossPayload.isDemonCastle = true;
              bossPayload.dcFloor = snap.dcFloor;
            }
            SLEvents.emit("Dungeons:awardEssence", bossPayload);
          } catch (_) {
          }
          if (snap.pendingEssence > 0) {
            try {
              if (SLEvents) {
                SLEvents.emit("Dungeons:awardEssence", {
                  amount: snap.pendingEssence,
                  mobRank: snap.rank || "E",
                  source: "mob_kill_flush"
                });
              }
            } catch (_) {
            }
          }
          if (snap.userJoined && !this.shadowArmy) {
            this.defeatedBosses.set(channelKey, {
              boss: snap.boss,
              dungeon: snap,
              dungeonId: snap.id || snap.dungeonId,
              // BUGFIX LOGIC-5: Track which dungeon this boss belonged to
              timestamp: Date.now()
            });
            this.showAriseButton(channelKey);
          }
        }
        markPhase("userBaseXpAndBossUiMs", phaseStartAt);
        await this._yieldToEventLoop(0);
        phaseStartAt = Date.now();
        let extractionResults = { extracted: 0, attempted: 0 };
        const isShadowMonarch = ((_d = (_c = this.soloLevelingStats) == null ? void 0 : _c.settings) == null ? void 0 : _d.rank) === "Shadow Monarch";
        let arisePile = corpsePileSnapshot;
        if ((snap.userJoined || isShadowMonarch) && snap.boss && (reason === "boss" || reason === "complete") && this.shadowArmy && !arisePile.some((c) => c && c.isBoss)) {
          const b = snap.boss;
          const bs = b.baseStats || {};
          arisePile = arisePile.concat([
            {
              id: b.id,
              rank: b.rank,
              baseStats: {
                strength: Number(bs.strength) || 0,
                agility: Number(bs.agility) || 0,
                intelligence: Number(bs.intelligence) || 0,
                vitality: Number(bs.vitality) || 0,
                perception: Number(bs.perception) || 0
              },
              strength: Number(b.strength) || 0,
              isBoss: true
            }
          ]);
        }
        const pileSize = arisePile.length;
        if ((snap.userJoined || isShadowMonarch) && (reason === "boss" || reason === "complete" || reason === "timeout") && pileSize > 0) {
          this.settings.debug && console.log(`[Dungeons] \u2694\uFE0F ARISE TRIGGERED: "${snap.name}" [${snap.rank}] in #${snap.channelName || "?"} (${snap.guildName || "?"}) \u2014 ${reason}, ${pileSize} bodies awaiting extraction${snap.userParticipating ? "" : " (Monarch arise-anywhere)"}`);
          try {
            extractionResults = await this._processCorpsePile(channelKey, snap, arisePile);
            if (extractionResults.attempted > 0) {
              this.showToast(
                `ARISE: ${extractionResults.extracted} shadows from ${extractionResults.attempted} fallen enemies`,
                "info"
              );
            }
            if (extractionResults.bossShadow) {
              const bossShadow = extractionResults.bossShadow;
              const sa = this.shadowArmy;
              if ((sa == null ? void 0 : sa.triggerArise) && ((_f = (_e = sa == null ? void 0 : sa.settings) == null ? void 0 : _e.ariseAnimation) == null ? void 0 : _f.enabled)) {
                sa.triggerArise(bossShadow);
              } else {
                this.showAriseSuccessAnimation(bossShadow, snap.boss);
              }
              this.showToast(`ARISE! "${bossShadow.roleName || bossShadow.role}" extracted!`, "success");
            }
          } catch (error) {
            this.errorLog("Failed to process corpse pile extraction", error);
          }
        } else if (snap.userParticipating && pileSize === 0 && hadShadowsDeployed) {
          this.debugLog(
            "ARISE",
            `Corpse pile EMPTY for ${channelKey} \u2014 no enemies to extract (deployed: ${hadShadowsDeployed}, mobs killed: ${((_g = snap.mobs) == null ? void 0 : _g.killed) || 0})`
          );
        } else if (!snap.userParticipating) {
          this.settings.debug && console.log(`[Dungeons] \u2694\uFE0F ARISE SKIPPED: ${snap.name} \u2014 user was defeated, corpse pile cleaned up (${pileSize} bodies lost)`);
        }
        markPhase("corpseExtractionMs", phaseStartAt);
        phaseStartAt = Date.now();
        if (reason === "boss" || reason === "complete") {
          const contributionEntries = Object.values(snap.shadowContributions || {}).filter((entry) => {
            const mobsKilled = Number(entry == null ? void 0 : entry.mobsKilled) || 0;
            const bossDamage = Number(entry == null ? void 0 : entry.bossDamage) || 0;
            return mobsKilled > 0 || bossDamage > 0;
          });
          if (hadShadowsDeployed && (summaryStats.totalMobsKilled > 0 || summaryStats.totalBossDamage > 0) && contributionEntries.length === 0) {
            this.errorLog(
              true,
              "SHADOW_CONTRIBUTIONS_EMPTY: Expected shadow contribution records but found none at completion",
              {
                channelKey,
                reason,
                totalMobsKilled: summaryStats.totalMobsKilled,
                totalBossDamage: summaryStats.totalBossDamage
              }
            );
          }
          const shadowResults = await this.grantShadowDungeonXP(channelKey, snap);
          if (shadowResults) {
            summaryStats.shadowTotalXP = shadowResults.totalXP;
            summaryStats.shadowsLeveledUp = shadowResults.leveledUp;
            summaryStats.shadowsRankedUp = shadowResults.rankedUp;
            if (shadowResults.growthBanked) {
              this.showToast("Shadow growth banked \u2014 applying in background...", "info");
            }
          }
        }
        markPhase("shadowXpGrantMs", phaseStartAt);
        phaseStartAt = Date.now();
        if (summaryStats.shadowTotalXP > 0 && this.soloLevelingStats) {
          const shadowSharePercent = 1;
          const shadowShareXP = Math.floor(summaryStats.shadowTotalXP * shadowSharePercent);
          if (shadowShareXP > 0) {
            if (this._grantUserDungeonXP(shadowShareXP, "dungeon_shadow_share", {
              channelKey,
              dungeonRank: snap.rank,
              shadowTotalXP: summaryStats.shadowTotalXP,
              sharePercent: shadowSharePercent
            })) {
              summaryStats.userXP = (summaryStats.userXP || 0) + shadowShareXP;
              summaryStats.shadowShareXP = shadowShareXP;
            }
          }
        }
        markPhase("shadowShareUserXpMs", phaseStartAt);
        summaryStats.shadowsExtracted = extractionResults.extracted;
        summaryStats.extractionAttempts = extractionResults.attempted;
        if (this.settings.debug) {
          const duration = snap.startTime ? Math.round((Date.now() - snap.startTime) / 1e3) : 0;
          const durationStr = duration > 60 ? `${Math.floor(duration / 60)}m ${duration % 60}s` : `${duration}s`;
          console.log(
            `[Dungeons] \u{1F3F0} ${reason === "timeout" ? "FAILED" : "COMPLETE"}: "${snap.name}" [${snap.rank}] in #${snap.channelName || "?"} (${snap.guildName || "?"}) \u2014 ${durationStr} | Mobs: ${summaryStats.totalMobsKilled} | Deaths: ${summaryStats.totalShadowDeaths || 0} | Extracted: ${extractionResults.extracted}/${extractionResults.attempted} | Key: ${channelKey} | timings=${JSON.stringify({ ...phaseTimings, totalBackgroundMs: Date.now() - backgroundStartedAt })}`
          );
        }
        if (reason !== "timeout") {
          this.showDungeonCompletionSummary(summaryStats);
        } else {
          this.showToast(`${snap.name} Failed (Timeout)`, "error");
        }
        if (reason === "boss" && snap.userParticipating) {
          (_h = this._setTrackedTimeout) == null ? void 0 : _h.call(this, () => {
            var _a2, _b2;
            (_b2 = (_a2 = this.storageManager) == null ? void 0 : _a2.deleteDungeon) == null ? void 0 : _b2.call(_a2, channelKey);
          }, 3e4);
        } else {
          if (this.storageManager) {
            try {
              await this.storageManager.deleteDungeon(channelKey);
            } catch (error) {
              this.errorLog("Failed to delete dungeon from storage", error);
            }
          }
        }
      },
      showDungeonCompletionSummary(stats) {
        const lines = [];
        const status = stats.userParticipated ? "CLEARED!" : "SHADOWS CLEARED";
        lines.push(`${stats.dungeonName} [${stats.dungeonRank}] ${status}`);
        if (stats.totalMobsKilled > 0) {
          lines.push(`Killed: ${stats.totalMobsKilled.toLocaleString()} mobs`);
        }
        if (stats.shadowsExtracted !== void 0 && stats.extractionAttempts > 0) {
          lines.push(
            `Extracted: ${stats.shadowsExtracted} shadows from ${stats.extractionAttempts} mobs`
          );
        }
        if (stats.userXP > 0) {
          const fromShadows = Number(stats.shadowTotalXP) || 0;
          lines.push(
            fromShadows > 0 ? `You: +${stats.userXP.toLocaleString()} XP (${fromShadows.toLocaleString()} earned by your shadows)` : `You: +${stats.userXP.toLocaleString()} XP`
          );
        }
        this.showToast(lines.join("\n"), "success");
        if (stats.shadowsLeveledUp && stats.shadowsLeveledUp.length >= 3) {
          this._setTrackedTimeout(() => {
            if (!this.started) return;
            const levelUpLine = `${stats.shadowsLeveledUp.length} shadows leveled up!`;
            this.showToast(levelUpLine, "info");
          }, 750);
        }
      }
    };
  }
});

// src/Dungeons/arise-extraction.js
var require_arise_extraction = __commonJS({
  "src/Dungeons/arise-extraction.js"(exports2, module2) {
    var C2 = require_constants();
    var ARISE_SVG = C2.ARISE_SVG;
    module2.exports = {
      _getAriseButton(channelKey, scope = null) {
        var _a, _b, _c, _d;
        const cached = (_a = this._ariseButtonRefs) == null ? void 0 : _a.get(channelKey);
        if (cached == null ? void 0 : cached.isConnected) return cached;
        if (cached) (_b = this._ariseButtonRefs) == null ? void 0 : _b.delete(channelKey);
        const searchRoot = scope && typeof scope.querySelector === "function" ? scope : document;
        const found = ((_c = searchRoot.querySelector) == null ? void 0 : _c.call(searchRoot, `[data-arise-button="${channelKey}"]`)) || null;
        if (found == null ? void 0 : found.isConnected) {
          (_d = this._ariseButtonRefs) == null ? void 0 : _d.set(channelKey, found);
          return found;
        }
        return null;
      },
      _removeAriseButton(channelKey) {
        var _a;
        const button = this._getAriseButton(channelKey);
        button == null ? void 0 : button.remove();
        (_a = this._ariseButtonRefs) == null ? void 0 : _a.delete(channelKey);
      },
      async showAriseButton(channelKey) {
        var _a, _b;
        const bossData = this.defeatedBosses.get(channelKey);
        if (!bossData) return;
        try {
          const shadowArmy = this.shadowArmy;
          if (shadowArmy && typeof shadowArmy.checkShadowArmyCap === "function") {
            const capStatus = await shadowArmy.checkShadowArmyCap();
            if (capStatus.atCap) {
              this.debugLog("ARISE", `Suppressing ARISE button \u2014 shadow army at cap (${capStatus.currentCount}/${capStatus.cap})`);
              return;
            }
          }
        } catch (e) {
          this.debugLog("ARISE", "Cap check failed, showing button anyway", e == null ? void 0 : e.message);
        }
        const channelHeader = this.findChannelHeader();
        if (!(channelHeader == null ? void 0 : channelHeader.isConnected)) return;
        const existing = this._getAriseButton(channelKey, channelHeader);
        if (existing) return;
        (_a = channelHeader.querySelectorAll) == null ? void 0 : _a.call(channelHeader, ".dungeon-arise-button:not([data-arise-button])").forEach((btn) => btn.remove());
        const ariseBtn = document.createElement("button");
        ariseBtn.className = "dungeon-arise-button";
        ariseBtn.setAttribute("data-arise-button", channelKey);
        ariseBtn.innerHTML = `
      <div style="display: flex; align-items: center; gap: 8px;">
        <span style="font-size: 20px; font-weight: bold;">\u2191</span>
        <div>
          <div style="font-weight: bold;">ARISE</div>
          <div style="font-size: 11px; opacity: 0.8;">${bossData.boss.name}</div>
        </div>
      </div>
    `;
        ariseBtn.style.cssText = `
      position: relative;
      display: flex;
      align-items: center;
      gap: 8px;
      background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%);
      color: white;
      border: 1px solid rgba(138, 43, 226, 0.4);
      border-radius: 2px;
      padding: 12px 20px;
      font-family: 'Orbitron', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-size: 14px;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
      transition: all 0.3s ease;
      animation: pulse-glow 2s ease-in-out infinite;
      margin-left: 12px;
    `;
        if (!channelHeader.isConnected) return;
        channelHeader.appendChild(ariseBtn);
        (_b = this._ariseButtonRefs) == null ? void 0 : _b.set(channelKey, ariseBtn);
      },
      async attemptBossExtraction(channelKey) {
        var _a, _b, _c, _d, _e;
        const skillTree = (_a = this.getSkillTreeInstance) == null ? void 0 : _a.call(this);
        if (!skillTree || typeof skillTree.getSkillLevel !== "function" || !(Number(skillTree.getSkillLevel("shadow_extraction")) >= 1)) {
          this.showToast("Shadow Extraction skill not unlocked. Unlock it in the Skill Tree.", "error");
          this._reEnableAriseButton(channelKey);
          return;
        }
        if (this.extractionInProgress.has(channelKey)) return;
        const bossData = this.defeatedBosses.get(channelKey);
        if (!bossData) {
          this.showToast("Boss corpse has degraded. Extraction no longer possible.", "error");
          this._removeAriseButton(channelKey);
          return;
        }
        const bossName = (_b = bossData.boss) == null ? void 0 : _b.name;
        if (!bossName) {
          this.errorLog("Boss has no name \u2014 skipping extraction to prevent undefined arise", bossData.boss);
          this.showToast("Boss data corrupted \u2014 cannot extract.", "error");
          this._removeAriseButton(channelKey);
          this.defeatedBosses.delete(channelKey);
          return;
        }
        const bossId = `dungeon_${bossData.dungeon.id}_boss_${bossName.toLowerCase().replace(/\s+/g, "_")}`;
        if (this._arisedBossIds.has(bossId)) {
          this.showToast("Shadow already extracted from this boss.", "info");
          this._removeAriseButton(channelKey);
          return;
        }
        this.extractionInProgress.add(channelKey);
        if (!this.shadowArmy) {
          this.extractionInProgress.delete(channelKey);
          this.showToast("Shadow Army plugin not found. Cannot extract shadow.", "error");
          this._reEnableAriseButton(channelKey);
          return;
        }
        if (!this.soloLevelingStats) {
          this.extractionInProgress.delete(channelKey);
          this.showToast("Solo Leveling Stats plugin not found. Cannot extract shadow.", "error");
          this._reEnableAriseButton(channelKey);
          return;
        }
        const userStats = ((_c = this.soloLevelingStats.settings) == null ? void 0 : _c.stats) || {};
        const userRank = ((_d = this.soloLevelingStats.settings) == null ? void 0 : _d.rank) || "E";
        const userLevel = ((_e = this.soloLevelingStats.settings) == null ? void 0 : _e.level) || 1;
        const mobStats = bossData.boss.baseStats || {
          strength: bossData.boss.strength,
          agility: bossData.boss.agility,
          intelligence: bossData.boss.intelligence,
          vitality: bossData.boss.vitality,
          perception: Number.isFinite(bossData.boss.perception) && bossData.boss.perception > 0 ? bossData.boss.perception : 50
          // Default perception if not present
        };
        const mobStrength = mobStats.strength;
        const mobRank = bossData.boss.rank || bossData.dungeon.rank;
        this.showToast(`Attempting shadow extraction from ${bossData.boss.name}...`, "info");
        try {
          const result = await this.shadowArmy.attemptDungeonExtraction(
            bossId,
            userRank,
            userLevel,
            userStats,
            mobRank,
            mobStats,
            mobStrength,
            bossData.dungeon.beastFamilies,
            // Pass biome families for themed extraction
            true
            // isBoss=true: Bosses get 3 extraction attempts (worth retrying)
          );
          const extractionStatus = result.success && result.shadow ? "success" : result.error ? "error" : "fail";
          const extractionHandlers = {
            success: async () => {
              var _a2, _b2;
              this._arisedBossIds.add(bossId);
              this.defeatedBosses.delete(channelKey);
              this._removeAriseButton(channelKey);
              const sa = this.shadowArmy;
              if ((sa == null ? void 0 : sa.triggerArise) && ((_b2 = (_a2 = sa == null ? void 0 : sa.settings) == null ? void 0 : _a2.ariseAnimation) == null ? void 0 : _b2.enabled)) {
                sa.triggerArise(result.shadow);
              } else {
                this.showAriseSuccessAnimation(result.shadow, bossData.boss);
              }
              this.showToast(`ARISE! "${result.shadow.roleName || result.shadow.role}" extracted!`, "success");
              await this.recalculateUserMana();
            },
            error: () => {
              this.showAriseFailAnimation(bossData.boss, result.error);
              this.showToast(`${result.error}`, "error");
            },
            fail: () => {
              this.showAriseFailAnimation(bossData.boss, "Extraction failed");
              this.showToast(`Extraction failed. (${result.attemptsRemaining} left)`, "error");
            }
          };
          await (extractionHandlers[extractionStatus] || extractionHandlers.fail)();
          if (result.attemptsRemaining === 0 || result.success) {
            this._setTrackedTimeout(() => this.cleanupDefeatedBoss(channelKey), 3e3);
          } else {
            this._reEnableAriseButton(channelKey);
          }
        } catch (error) {
          this.errorLog("Failed to extract shadow", error);
          this.showToast("Extraction failed due to an error", "error");
          this.showAriseFailAnimation(bossData.boss, "System error");
          this._reEnableAriseButton(channelKey);
        } finally {
          this.extractionInProgress.delete(channelKey);
        }
      },
      _reEnableAriseButton(channelKey) {
        const ariseBtn = this._getAriseButton(channelKey);
        if (ariseBtn == null ? void 0 : ariseBtn.isConnected) {
          ariseBtn.dataset.ariseDisabled = "false";
          ariseBtn.style.opacity = "1";
          ariseBtn.style.pointerEvents = "auto";
          ariseBtn.style.cursor = "pointer";
        }
      },
      showAriseSuccessAnimation(shadow, enemy) {
        const overlay = document.createElement("div");
        overlay.className = "arise-animation-overlay";
        overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      z-index: 99999;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      animation: arise-fade-in 0.5s ease;
      pointer-events: none;
    `;
        const container = document.createElement("div");
        container.style.cssText = "text-align: center; animation: arise-rise 1s ease-out;";
        const arrow = document.createElement("div");
        arrow.style.cssText = "font-size: 80px; margin-bottom: 20px; animation: arise-glow 1.5s ease-in-out infinite; font-weight: bold;";
        arrow.textContent = "\u2191";
        const title = document.createElement("div");
        let _ariseSvgOk = false;
        try {
          const _svgStr = typeof ARISE_SVG === "string" ? ARISE_SVG : null;
          if (!_svgStr) throw new Error("ARISE_SVG constant not in scope");
          const parser = new DOMParser();
          const svgDoc = parser.parseFromString(_svgStr, "image/svg+xml");
          const parseErr = svgDoc.querySelector("parsererror");
          if (parseErr) throw new Error("SVG parse error: " + parseErr.textContent);
          const svgEl = svgDoc.documentElement;
          if (!svgEl || svgEl.tagName !== "svg") throw new Error("No <svg> root");
          title.style.cssText = "margin-bottom: 12px !important; text-align: center !important; position: relative !important;";
          const glowSvg = document.importNode(svgEl, true);
          glowSvg.style.cssText = "height: 180px !important; width: auto !important; position: absolute !important; top: 0 !important; left: 50% !important; transform: translateX(-50%) !important; filter: blur(18px) brightness(1.5) !important; opacity: 0.7 !important; pointer-events: none !important; z-index: 0 !important;";
          title.appendChild(glowSvg);
          const mainSvg = document.importNode(svgEl, true);
          mainSvg.style.cssText = "height: 180px !important; width: auto !important; display: inline-block !important; position: relative !important; z-index: 1 !important;";
          title.appendChild(mainSvg);
          _ariseSvgOk = true;
        } catch (e) {
          this.errorLog("UI", "ARISE SVG failed, using text fallback", (e == null ? void 0 : e.message) || e);
        }
        if (!_ariseSvgOk) {
          title.innerHTML = "";
          title.style.cssText = "font-size: 48px; font-weight: bold; color: #a78bfa; margin-bottom: 12px; text-shadow: 0 0 20px #8b5cf6;";
          title.textContent = "ARISE";
        }
        const shadowName = document.createElement("div");
        shadowName.style.cssText = "font-size: 32px; color: white; margin-bottom: 8px;";
        shadowName.textContent = (shadow == null ? void 0 : shadow.roleName) || (shadow == null ? void 0 : shadow.role) || "";
        const shadowRank = document.createElement("div");
        shadowRank.style.cssText = "font-size: 20px; color: #a78bfa; margin-bottom: 4px;";
        shadowRank.textContent = `${(shadow == null ? void 0 : shadow.rank) ?? ""} Rank ${(shadow == null ? void 0 : shadow.role) ?? ""}`.trim();
        const extractedInfo = document.createElement("div");
        extractedInfo.style.cssText = "font-size: 16px; color: #888;";
        extractedInfo.textContent = `Extracted from ${(enemy == null ? void 0 : enemy.name) ?? ""} [${(enemy == null ? void 0 : enemy.rank) ?? ""}]`.trim();
        container.appendChild(arrow);
        container.appendChild(title);
        container.appendChild(shadowName);
        container.appendChild(shadowRank);
        container.appendChild(extractedInfo);
        overlay.appendChild(container);
        document.body.appendChild(overlay);
        this._setTrackedTimeout(() => {
          if (!this.started) return;
          overlay.style.animation = "arise-fade-out 0.5s ease";
          this._setTrackedTimeout(() => {
            if (!this.started) return;
            overlay.remove();
          }, 500);
        }, 2500);
        this._setTrackedTimeout(() => {
          if (!this.started) return;
          overlay.remove();
        }, 4e3);
      },
      showAriseFailAnimation(boss, reason) {
        const overlay = document.createElement("div");
        overlay.className = "arise-fail-animation-overlay";
        overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      z-index: 99999;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      animation: arise-fade-in 0.5s ease;
      pointer-events: none;
    `;
        const failContainer = document.createElement("div");
        failContainer.style.cssText = "text-align: center; animation: arise-shake 0.5s ease;";
        const failIcon = document.createElement("div");
        failIcon.style.cssText = "font-size: 80px; margin-bottom: 20px; filter: grayscale(100%); font-weight: bold;";
        failIcon.textContent = "\xD7";
        const failTitle = document.createElement("div");
        failTitle.style.cssText = "font-size: 48px; font-weight: bold; color: #ef4444; margin-bottom: 12px; text-shadow: 0 0 20px #dc2626;";
        failTitle.textContent = "EXTRACTION FAILED";
        const bossName = document.createElement("div");
        bossName.style.cssText = "font-size: 24px; color: white; margin-bottom: 8px;";
        bossName.textContent = (boss == null ? void 0 : boss.name) ?? "";
        const failReason = document.createElement("div");
        failReason.style.cssText = "font-size: 16px; color: #888;";
        failReason.textContent = reason ?? "";
        failContainer.appendChild(failIcon);
        failContainer.appendChild(failTitle);
        failContainer.appendChild(bossName);
        failContainer.appendChild(failReason);
        overlay.appendChild(failContainer);
        document.body.appendChild(overlay);
        this._setTrackedTimeout(() => {
          if (!this.started) return;
          overlay.style.animation = "arise-fade-out 0.5s ease";
          this._setTrackedTimeout(() => {
            if (!this.started) return;
            overlay.remove();
          }, 500);
        }, 2e3);
        this._setTrackedTimeout(() => {
          if (!this.started) return;
          overlay.remove();
        }, 3500);
      },
      async cleanupDefeatedBoss(channelKey) {
        var _a, _b, _c;
        this._removeAriseButton(channelKey);
        const bossData = this.defeatedBosses.get(channelKey);
        const currentDungeon = this.activeDungeons.get(channelKey);
        const newDungeonStarted = Boolean(currentDungeon && (bossData == null ? void 0 : bossData.dungeonId) && currentDungeon.id !== bossData.dungeonId);
        if (((_a = bossData == null ? void 0 : bossData.boss) == null ? void 0 : _a.name) && ((_b = bossData == null ? void 0 : bossData.dungeon) == null ? void 0 : _b.id) && this._arisedBossIds) {
          const bossId = `dungeon_${bossData.dungeon.id}_boss_${bossData.boss.name.toLowerCase().replace(/\s+/g, "_")}`;
          this._arisedBossIds.delete(bossId);
        }
        this.defeatedBosses.delete(channelKey);
        this.extractionInProgress.delete(channelKey);
        if (newDungeonStarted) {
          this.debugLog(
            `cleanupDefeatedBoss: preserving active state for new dungeon ${currentDungeon.id} in ${channelKey}`
          );
          (_c = this.queueHPBarUpdate) == null ? void 0 : _c.call(this, channelKey);
          this.saveSettings();
          return;
        }
        if (this.storageManager) {
          try {
            await this.storageManager.deleteDungeon(channelKey);
          } catch (error) {
            this.errorLog("Failed to delete dungeon from storage", error);
          }
        }
        this.settings.lastDungeonEndTime || (this.settings.lastDungeonEndTime = {});
        this.settings.lastDungeonEndTime[channelKey] = Date.now();
        this.stopShadowAttacks(channelKey);
        this.stopBossAttacks(channelKey);
        this.stopMobAttacks(channelKey);
        this.stopMobKillNotifications(channelKey);
        this.stopMobSpawning(channelKey);
        this.removeDungeonIndicator(channelKey);
        this.removeBossHPBar(channelKey);
        document.querySelectorAll(`.dungeon-boss-hp-container[data-channel-key="${channelKey}"]`).forEach((el) => el.remove());
        this.activeDungeons.delete(channelKey);
        this.channelLocks.delete(channelKey);
        this.shadowAllocations.delete(channelKey);
        this._markAllocationDirty("dungeon-arise-cleanup");
        this._cleanupPerChannelRuntimeState(channelKey);
        this.saveSettings();
      },
      async grantShadowDungeonXP(channelKey, dungeon) {
        var _a, _b, _c, _d, _e, _f;
        if (!this.shadowArmy) return null;
        const contributions = dungeon.shadowContributions || {};
        const contributionEntries = Object.entries(contributions).filter(([, contribution]) => {
          const mobsKilled = Number(contribution == null ? void 0 : contribution.mobsKilled) || 0;
          const bossDamage = Number(contribution == null ? void 0 : contribution.bossDamage) || 0;
          return mobsKilled > 0 || bossDamage > 0;
        });
        if (contributionEntries.length === 0) return null;
        const dungeonRankIndex = this.getRankIndexValue(dungeon.rank);
        const dungeonRankMultiplier = 1 + dungeonRankIndex * 0.5;
        const baseMobXP = 10;
        const baseBossXP = 100;
        let totalXPGranted = 0;
        const xpByShadowId = {};
        const rawContributionByShadowId = {};
        const combatStartAt = ((_a = dungeon == null ? void 0 : dungeon.bossGate) == null ? void 0 : _a.deployedAt) || (dungeon == null ? void 0 : dungeon.deployedAt) || (dungeon == null ? void 0 : dungeon.startTime) || Date.now();
        const combatDuration = Math.max(0, Date.now() - combatStartAt);
        const combatHours = combatDuration / (1e3 * 60 * 60);
        const shadowRankMultiplier = 1 + dungeonRankIndex * 0.3;
        for (const [rawShadowId, contribution] of contributionEntries) {
          const shadowId = String(rawShadowId);
          const mobsKilled = Number(contribution == null ? void 0 : contribution.mobsKilled) || 0;
          const bossDamage = Number(contribution == null ? void 0 : contribution.bossDamage) || 0;
          const mobKillXP = mobsKilled * baseMobXP;
          const bossMaxHP = ((_b = dungeon.boss) == null ? void 0 : _b.maxHp) || ((_c = dungeon.boss) == null ? void 0 : _c.hp) || 1e3;
          const bossDamagePercent = Math.min(1, bossDamage / bossMaxHP);
          const bossDamageXP = bossDamagePercent * baseBossXP;
          const rawContribution = mobKillXP + bossDamageXP;
          const totalXP = Math.min(1e5, Math.round(
            (mobKillXP + bossDamageXP) * dungeonRankMultiplier * shadowRankMultiplier
          ));
          if (totalXP > 0) {
            xpByShadowId[shadowId] = totalXP;
            rawContributionByShadowId[shadowId] = rawContribution;
            totalXPGranted += totalXP;
          }
        }
        const xpTargetIds = Object.keys(xpByShadowId);
        const growthHoursByShadowId = {};
        const maxRawContribution = Math.max(
          0,
          ...xpTargetIds.map((sid) => Number(rawContributionByShadowId[sid]) || 0)
        );
        for (const sid of xpTargetIds) {
          if (combatHours <= 0 || maxRawContribution <= 0) {
            growthHoursByShadowId[sid] = 0;
            continue;
          }
          const ratio = (Number(rawContributionByShadowId[sid]) || 0) / maxRawContribution;
          const participationFactor = Math.max(0.15, Math.min(1, ratio));
          growthHoursByShadowId[sid] = combatHours * participationFactor;
        }
        if (xpTargetIds.length === 0) {
          return {
            totalXP: 0,
            leveledUp: [],
            rankedUp: []
          };
        }
        const grantStartedAt = Date.now();
        const growthBanked = Boolean((_e = (_d = this.shadowArmy).bankPendingGrowth) == null ? void 0 : _e.call(_d, growthHoursByShadowId));
        if (!growthBanked) {
          (_f = this.debugLog) == null ? void 0 : _f.call(this, "XP", "bankPendingGrowth unavailable or empty \u2014 shadow growth hours not banked this completion");
        }
        const elapsedMs = Date.now() - grantStartedAt;
        this.settings.debug && console.log(
          `[Dungeons] \u23F1\uFE0F SHADOW XP GRANT: "${(dungeon == null ? void 0 : dungeon.name) || channelKey}" [${(dungeon == null ? void 0 : dungeon.rank) || "?"}] | targets=${xpTargetIds.length} | totalXP=${totalXPGranted.toLocaleString()} | growthBanked=${growthBanked} | ${elapsedMs}ms`
        );
        return {
          totalXP: totalXPGranted,
          leveledUp: [],
          rankedUp: [],
          growthBanked
        };
      }
    };
  }
});

// src/Dungeons/story-mode-storage.js
var require_story_mode_storage = __commonJS({
  "src/Dungeons/story-mode-storage.js"(exports2, module2) {
    var { openIndexedDbDatabase } = require_bootstrap_runtime();
    var StoryModeStorage = class {
      constructor(userId) {
        this.userId = userId || "default";
        this.dbName = `StoryModeDB_${this.userId}`;
        this.dbVersion = 1;
        this.db = null;
      }
      async init() {
        if (this.db !== null) {
          return this.db;
        }
        this.db = await openIndexedDbDatabase({
          dbName: this.dbName,
          dbVersion: this.dbVersion,
          onUpgrade: (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains("progress")) {
              db.createObjectStore("progress", { keyPath: "id" });
            }
            if (!db.objectStoreNames.contains("permits")) {
              db.createObjectStore("permits", { keyPath: "id" });
            }
          },
          onBlocked: () => {
            var _a, _b;
            try {
              (_b = (_a = BdApi.UI) == null ? void 0 : _a.showToast) == null ? void 0 : _b.call(
                _a,
                "Dungeons: close other Discord tabs/windows to upgrade story-mode data.",
                { type: "warning", timeout: 8e3 }
              );
            } catch (_) {
            }
          }
        });
        return this.db;
      }
      _withStore(storeName, mode, callback) {
        return new Promise((resolve, reject) => {
          if (!this.db) {
            reject(new Error("StoryModeStorage: DB not initialized"));
            return;
          }
          const tx = this.db.transaction(storeName, mode);
          const store = tx.objectStore(storeName);
          const request = callback(store);
          if (request && typeof request.onsuccess !== "undefined") {
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
          } else {
            tx.oncomplete = () => resolve();
            tx.onerror = () => reject(tx.error);
          }
        });
      }
      async loadProgress(storyId) {
        if (!this.db) await this.init();
        const result = await this._withStore("progress", "readonly", (store) => store.get(storyId));
        return result || null;
      }
      async saveProgress(storyId, state) {
        if (!this.db) await this.init();
        return this._withStore(
          "progress",
          "readwrite",
          (store) => store.put({ id: storyId, ...state, _savedAt: Date.now() })
        );
      }
      async loadPermits(storyId) {
        if (!this.db) await this.init();
        const result = await this._withStore("permits", "readonly", (store) => store.get(storyId));
        return result || { count: 0 };
      }
      async savePermits(storyId, count) {
        if (!this.db) await this.init();
        return this._withStore(
          "permits",
          "readwrite",
          (store) => store.put({ id: storyId, count, _savedAt: Date.now() })
        );
      }
    };
    module2.exports = { StoryModeStorage };
  }
});

// src/Dungeons/story-mode-core.js
var require_story_mode_core = __commonJS({
  "src/Dungeons/story-mode-core.js"(exports2, module2) {
    var DC = require_story_constants();
    var { StoryModeStorage } = require_story_mode_storage();
    var SLEvents = require_event_bus();
    module2.exports = {
      // Called from lifecycle.js start()
      async initStoryMode() {
        var _a, _b, _c;
        const userId = ((_a = this.settings) == null ? void 0 : _a.userId) || ((_c = (_b = this.soloLevelingStats) == null ? void 0 : _b.settings) == null ? void 0 : _c.userId) || "default";
        this.storyModeStorage = new StoryModeStorage(userId);
        try {
          await this.storyModeStorage.init();
          const saved = await this.storyModeStorage.loadProgress("demon_castle");
          this._demonCastle = saved ? { ...DC.DEFAULT_STATE, ...saved } : { ...DC.DEFAULT_STATE };
          const permits = await this.storyModeStorage.loadPermits("demon_castle");
          this._dcPermits = (permits == null ? void 0 : permits.count) || 0;
          this.debugLog("STORY", "Story mode initialized", {
            floor: this._demonCastle.currentFloor,
            highest: this._demonCastle.highestFloor,
            permits: this._dcPermits,
            totalDemonSouls: this._demonCastle.totalDemonSouls
          });
          try {
            const Events = require_event_bus();
            const souls = this._demonCastle.totalDemonSouls || 0;
            if (souls > 0) {
              Events.emit("ItemVault:set", { itemId: "demon_soul", amount: souls, source: "Dungeons" });
            }
            const permits2 = this._demonCastle.totalPermitsEarned || 0;
            if (permits2 > 0) {
              Events.emit("ItemVault:set", { itemId: "entry_permit", amount: permits2, source: "Dungeons" });
            }
          } catch (_) {
          }
        } catch (error) {
          this.errorLog("STORY", "Failed to init story mode storage", error);
          this._demonCastle = { ...DC.DEFAULT_STATE };
          this._dcPermits = 0;
        }
      },
      // Main entry point — called from UI or auto-advance
      async enterDemonCastle() {
        var _a;
        if (this._storyModeActive) {
          this.showToast("Demon Castle already active", "warning");
          return;
        }
        const state = this._demonCastle;
        if (!state) {
          this.showToast("Story mode not initialized", "error");
          return;
        }
        const floor = state.currentFloor || 1;
        this._dcAutoAdvancing = false;
        this._storyModeActive = true;
        state.lastEnteredAt = Date.now();
        if (!state.startedAt) state.startedAt = Date.now();
        const dungeon = this._createDemonCastleFloor(floor);
        this.activeDungeons.set(DC.DEMON_CASTLE_KEY, dungeon);
        this.channelLocks.add(DC.DEMON_CASTLE_KEY);
        this.showToast(`Entering Demon Castle \u2014 Floor ${floor}`, "info");
        this.debugLog("STORY", `Entering Demon Castle floor ${floor}`, {
          isBoss: DC.isBossFloor(floor),
          demonCount: DC.getDemonCount(floor),
          permits: this._dcPermits
        });
        try {
          await this.deployShadows(DC.DEMON_CASTLE_KEY);
        } catch (error) {
          this.errorLog("STORY", "Failed to deploy shadows in Demon Castle", error);
        }
        this._ensureDungeonHeaderWidgetLoop();
        this.ensureDungeonHeaderWidget();
        (_a = this.renderDungeonHeaderPopup) == null ? void 0 : _a.call(this);
        this._saveDemonCastleState();
      },
      // Exit without completing the floor
      async exitDemonCastle() {
        var _a, _b;
        if (!this._storyModeActive) return;
        const dungeon = this.activeDungeons.get(DC.DEMON_CASTLE_KEY);
        if (dungeon) {
          try {
            this.stopShadowAttacks(DC.DEMON_CASTLE_KEY);
          } catch (_) {
          }
          try {
            this.stopBossAttacks(DC.DEMON_CASTLE_KEY);
          } catch (_) {
          }
          try {
            this.stopMobAttacks(DC.DEMON_CASTLE_KEY);
          } catch (_) {
          }
          try {
            this.stopMobSpawning(DC.DEMON_CASTLE_KEY);
          } catch (_) {
          }
          try {
            this.removeBossHPBar(DC.DEMON_CASTLE_KEY);
          } catch (_) {
          }
          try {
            this.removeDungeonIndicator(DC.DEMON_CASTLE_KEY);
          } catch (_) {
          }
          const pendingEssence = (dungeon == null ? void 0 : dungeon._pendingEssence) || 0;
          if (pendingEssence > 0 && SLEvents) {
            SLEvents.emit("Dungeons:awardEssence", { amount: pendingEssence, source: "mob_kill_flush", dungeonKey: DC.DEMON_CASTLE_KEY });
          }
          dungeon._pendingEssence = 0;
          this.activeDungeons.delete(DC.DEMON_CASTLE_KEY);
          this.channelLocks.delete(DC.DEMON_CASTLE_KEY);
          (_a = this._invalidateDeployAssignedUnion) == null ? void 0 : _a.call(this);
          this._cleanupPerChannelRuntimeState(DC.DEMON_CASTLE_KEY);
        }
        this._storyModeActive = false;
        this.showToast("Exited Demon Castle \u2014 Progress saved.", "info");
        await this._saveDemonCastleState();
        this._flushDcPermits();
        this.ensureDungeonHeaderWidget();
        (_b = this.renderDungeonHeaderPopup) == null ? void 0 : _b.call(this);
      },
      // Build the synthetic dungeon object for a floor
      _createDemonCastleFloor(floor) {
        var _a, _b, _c, _d;
        const isBossFloor = DC.isBossFloor(floor);
        const tier = DC.getFloorTier(floor);
        const dungeonRank = DC.getDungeonRankForFloor(floor);
        const rankIndex = ((_a = this.getRankIndexValue) == null ? void 0 : _a.call(this, dungeonRank)) || 0;
        const demonCount = DC.getDemonCount(floor);
        let boss;
        if (isBossFloor) {
          const bossConfig = DC.DEMON_CASTLE_BOSSES[floor];
          const bossMult = DC.DEMON_CASTLE_BOSS_MULTIPLIERS[floor] || { hpMult: 1, dmgMult: 1 };
          const baseStats = ((_b = this.calculateBossBaseStats) == null ? void 0 : _b.call(this, rankIndex)) || {
            strength: 500 + rankIndex * 200,
            agility: 400 + rankIndex * 150,
            intelligence: 300 + rankIndex * 100,
            vitality: 800 + rankIndex * 400,
            perception: 200 + rankIndex * 100
          };
          baseStats.strength = Math.floor(baseStats.strength * bossMult.dmgMult);
          baseStats.agility = Math.floor(baseStats.agility * bossMult.dmgMult);
          baseStats.intelligence = Math.floor(baseStats.intelligence * bossMult.dmgMult);
          const shadowCount = ((_c = this._shadowCountCache) == null ? void 0 : _c.count) ?? 100;
          const bossHp = Math.floor((((_d = this.calculateBossHP) == null ? void 0 : _d.call(this, bossConfig.rank, shadowCount)) || 5e4) * bossMult.hpMult);
          boss = {
            id: `dc_boss_${floor}_${Date.now()}`,
            name: bossConfig.name,
            rank: bossConfig.rank,
            beastType: "demon",
            beastFamily: "demon",
            role: "boss",
            hp: bossHp,
            maxHp: bossHp,
            ...baseStats,
            baseStats: { ...baseStats },
            lastAttackTime: 0,
            attackCooldown: 2e3,
            expectedShadowCount: shadowCount,
            _enragePhases: [],
            _phasesTriggered: [],
            _phaseShieldExpiresAt: 0,
            _dcTitle: bossConfig.title,
            _dcAbilities: bossConfig.abilities || []
          };
        } else {
          boss = {
            id: `dc_sentinel_${floor}_${Date.now()}`,
            name: `Floor ${floor} Gate`,
            rank: dungeonRank,
            beastType: "demon",
            beastFamily: "demon",
            role: "boss",
            hp: 0,
            maxHp: 1,
            strength: 0,
            agility: 0,
            intelligence: 0,
            vitality: 0,
            perception: 0,
            baseStats: { strength: 0, agility: 0, intelligence: 0, vitality: 0, perception: 0 },
            lastAttackTime: Infinity,
            attackCooldown: Infinity,
            expectedShadowCount: 0,
            _isSentinel: true,
            _enragePhases: [],
            _phasesTriggered: [],
            _phaseShieldExpiresAt: 0
          };
        }
        return {
          id: DC.DEMON_CASTLE_KEY,
          channelKey: DC.DEMON_CASTLE_KEY,
          rank: dungeonRank,
          name: `Demon Castle \u2014 Floor ${floor}`,
          type: "Demon Castle",
          biome: { name: "Demon Castle", description: "A burning fortress of demons", mobMultiplier: 1, beastFamilies: ["demon"] },
          beastFamilies: ["demon"],
          channelName: "Demon Castle",
          guildName: "Story Mode",
          guildId: null,
          channelId: null,
          mobs: {
            total: demonCount,
            remaining: demonCount,
            killed: 0,
            targetCount: demonCount,
            mobCapacity: Math.min(demonCount, 500),
            spawnRate: 1,
            activeMobs: []
          },
          boss,
          startTime: Date.now(),
          _xpBatchKey: `dc_floor_${floor}_${Date.now()}`,
          pendingUserMobXP: 0,
          pendingUserMobKills: 0,
          userParticipating: true,
          shadowsDeployed: false,
          deployedAt: null,
          corpsePile: [],
          shadowAttacks: {},
          shadowContributions: {},
          shadowHP: /* @__PURE__ */ new Map(),
          shadowRevives: 0,
          bossGate: { enabled: false },
          // Per-floor scaling: mobs get stronger as you progress within each tier (1.0x → 1.5x)
          difficultyScale: { mobFactor: DC.getFloorScaling(floor), bossFactor: 1, lastPower: 0, updatedAt: Date.now() },
          completed: false,
          failed: false,
          // Demon Castle specific flags
          _isDemonCastle: true,
          _dcFloor: floor,
          _dcIsBossFloor: isBossFloor,
          _dcTier: tier,
          _pendingEssence: 0,
          _dcPermitsPendingFlush: 0
        };
      },
      // Called from modified completeDungeon() when _isDemonCastle is true
      _completeDemonCastleFloor(channelKey, dungeon, reason) {
        var _a, _b, _c, _d, _e, _f;
        const floor = dungeon._dcFloor || 1;
        const isBossFloor = dungeon._dcIsBossFloor;
        this.debugLog("STORY", `Completing DC floor ${floor}`, { reason, isBossFloor });
        try {
          this.stopShadowAttacks(channelKey);
        } catch (_) {
        }
        try {
          this.stopBossAttacks(channelKey);
        } catch (_) {
        }
        try {
          this.stopMobAttacks(channelKey);
        } catch (_) {
        }
        try {
          this.stopMobSpawning(channelKey);
        } catch (_) {
        }
        try {
          this.removeBossHPBar(channelKey);
        } catch (_) {
        }
        try {
          this.removeDungeonIndicator(channelKey);
        } catch (_) {
        }
        this.activeDungeons.delete(channelKey);
        this.channelLocks.delete(channelKey);
        (_a = this._invalidateDeployAssignedUnion) == null ? void 0 : _a.call(this);
        this._cleanupPerChannelRuntimeState(channelKey);
        this._storyModeActive = false;
        if (reason === "exit") {
          this._saveDemonCastleState();
          this._flushDcPermits();
          return;
        }
        const state = this._demonCastle;
        if (!state) return;
        const mobsKilled = ((_b = dungeon.mobs) == null ? void 0 : _b.killed) || 0;
        const pendingXp = dungeon.pendingUserMobXP || 0;
        if (pendingXp > 0) {
          const xpGain = Math.floor(pendingXp * DC.XP_MOB_MULTIPLIER);
          this._grantUserDungeonXP(xpGain, "demon_castle_mobs", { floor, mobsKilled });
        }
        if (isBossFloor) {
          const bossConfig = DC.DEMON_CASTLE_BOSSES[floor];
          const rankIndex = ((_c = this.getRankIndexValue) == null ? void 0 : _c.call(this, (bossConfig == null ? void 0 : bossConfig.rank) || "B")) || 0;
          const bossXp = Math.floor((200 + rankIndex * 100) * DC.XP_BOSS_MULTIPLIER);
          this._grantUserDungeonXP(bossXp, "demon_castle_boss", { floor, bossName: bossConfig == null ? void 0 : bossConfig.name });
          state.totalBossesDefeated = (state.totalBossesDefeated || 0) + 1;
        }
        const residualEssence = dungeon._pendingEssence || 0;
        if (residualEssence > 0) {
          const dungeonRank = DC.getDungeonRankForFloor(floor);
          try {
            SLEvents.emit("Dungeons:awardEssence", {
              amount: residualEssence,
              mobRank: dungeonRank,
              source: "mob_kill_flush"
            });
          } catch (_) {
          }
          dungeon._pendingEssence = 0;
        }
        if (isBossFloor && SLEvents) {
          try {
            SLEvents.emit("Dungeons:awardEssence", {
              amount: 1,
              bossRank: ((_d = DC.DEMON_CASTLE_BOSSES[floor]) == null ? void 0 : _d.rank) || "B",
              source: "boss_kill"
            });
          } catch (_) {
          }
        }
        if (!state.floorsCleared.includes(floor)) {
          state.floorsCleared.push(floor);
        }
        state.lastClearedFloor = floor;
        if (floor > (state.highestFloor || 0)) {
          state.highestFloor = floor;
        }
        if (floor >= DC.DEMON_CASTLE_FLOORS) {
          state.completedAt = Date.now();
          this.showToast("Demon Castle CLEARED! Baran has been defeated!", "success");
          this._saveDemonCastleState();
          this._flushDcPermits();
          this.ensureDungeonHeaderWidget();
          (_e = this.renderDungeonHeaderPopup) == null ? void 0 : _e.call(this);
        } else {
          state.currentFloor = floor + 1;
          const nextBoss = DC.isBossFloor(floor + 1);
          const bossStr = nextBoss ? ` \u2014 Boss: ${(_f = DC.DEMON_CASTLE_BOSSES[floor + 1]) == null ? void 0 : _f.name}` : "";
          this.showToast(`Floor ${floor} Cleared! Auto-advancing to Floor ${floor + 1}${bossStr}`, "success");
          this._saveDemonCastleState();
          this._flushDcPermits();
          this._dcAutoAdvancing = true;
          this._setTrackedTimeout(() => {
            this.enterDemonCastle().catch(
              (err) => this.errorLog("STORY", "Auto-advance failed", err)
            );
          }, 1500);
        }
      },
      // Roll entry permit drop on demon kills — permit = floor clear trigger on non-boss floors
      _rollDemonCastlePermitDrop(floor, killCount) {
        var _a, _b, _c;
        if (killCount <= 0) return;
        if (DC.isBossFloor(floor)) return;
        const dungeon = (_a = this.activeDungeons) == null ? void 0 : _a.get(DC.DEMON_CASTLE_KEY);
        if (!dungeon || dungeon.completed) return;
        const dropRate = DC.getPermitDropRate(floor);
        const remaining = ((_b = dungeon.mobs) == null ? void 0 : _b.remaining) || 0;
        const totalKilled = ((_c = dungeon.mobs) == null ? void 0 : _c.killed) || 0;
        for (let i = 0; i < killCount; i++) {
          const isLastDemon = remaining - i <= 1;
          if (isLastDemon || Math.random() < dropRate) {
            if (this._demonCastle) {
              this._demonCastle.totalPermitsEarned = (this._demonCastle.totalPermitsEarned || 0) + 1;
            }
            try {
              SLEvents.emit("ItemVault:add", {
                itemId: "entry_permit",
                amount: 1,
                source: "Dungeons",
                meta: { floor, kills: totalKilled + i + 1, guaranteed: isLastDemon }
              });
              SLEvents.emit("ItemVault:spend", {
                itemId: "entry_permit",
                amount: 1,
                source: "Dungeons",
                reason: `advance_floor_${floor}_to_${floor + 1}`
              });
            } catch (_) {
            }
            this.showToast(`Entry Permit obtained! Advancing to next floor...`, "success");
            this.debugLog("STORY", `Permit dropped on floor ${floor} after ${totalKilled + i + 1} kills${isLastDemon ? " (guaranteed last kill)" : ""}`);
            this.completeDungeon(DC.DEMON_CASTLE_KEY, "complete");
            return;
          }
        }
      },
      // Flush accumulated permit writes to IDB
      _flushDcPermits() {
        if (!this.storyModeStorage) return;
        this.storyModeStorage.savePermits("demon_castle", this._dcPermits).catch(() => {
        });
      },
      // Save DC state to IDB
      async _saveDemonCastleState() {
        if (!this.storyModeStorage || !this._demonCastle) return;
        try {
          await this.storyModeStorage.saveProgress("demon_castle", this._demonCastle);
        } catch (error) {
          this.errorLog("STORY", "Failed to save DC state", error);
        }
      },
      // Non-boss floors: permit drop handles advancement (see _rollDemonCastlePermitDrop)
      // Boss floors: boss kill triggers completeDungeon via normal combat flow
      _checkDemonCastleFloorClear(_channelKey, _dungeon) {
      }
    };
  }
});

// src/Dungeons/story-mode-ui.js
var require_story_mode_ui = __commonJS({
  "src/Dungeons/story-mode-ui.js"(exports2, module2) {
    var DC = require_story_constants();
    module2.exports = {
      // Story tab: list of available story modes
      _getStoryModeTabHtml() {
        var _a;
        const state = this._demonCastle;
        if (!state) {
          return '<div style="padding:20px;text-align:center;color:rgba(255,255,255,0.35);font-size:12px;">Story mode initializing...</div>';
        }
        const floor = state.currentFloor || 1;
        const cleared = ((_a = state.floorsCleared) == null ? void 0 : _a.length) || 0;
        const isCompleted = Boolean(state.completedAt);
        const isActive = this._storyModeActive;
        const progressPct = Math.min(100, (floor - 1) / DC.DEMON_CASTLE_FLOORS * 100).toFixed(1);
        let statusBadge;
        if (isActive) {
          statusBadge = '<span style="font-size:10px;font-weight:700;background:rgba(255,107,53,0.2);color:#ff6b35;padding:2px 8px;border-radius:2px;border:1px solid rgba(255,107,53,0.35);">IN PROGRESS</span>';
        } else if (isCompleted) {
          statusBadge = '<span style="font-size:10px;font-weight:700;background:rgba(251,191,36,0.15);color:#fbbf24;padding:2px 8px;border-radius:2px;border:1px solid rgba(251,191,36,0.3);">CLEARED</span>';
        } else if (floor > 1) {
          statusBadge = `<span style="font-size:10px;font-weight:700;background:rgba(52,211,153,0.15);color:#34d399;padding:2px 8px;border-radius:2px;border:1px solid rgba(52,211,153,0.3);">Floor ${floor}</span>`;
        } else {
          statusBadge = '<span style="font-size:10px;font-weight:700;background:rgba(255,255,255,0.07);color:rgba(255,255,255,0.45);padding:2px 8px;border-radius:2px;border:1px solid rgba(255,255,255,0.1);">NEW</span>';
        }
        return `
      <div style="padding:12px 14px 16px;">
        <div style="font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.35);margin:0 0 8px;padding:0 2px;">Available Modes</div>

        <button class="dungeon-widget-action story-mode-list-card" type="button"
                data-dungeon-action="story-detail-dc" data-channel-key="_story"
                style="display:flex !important;align-items:center;gap:12px;width:100%;padding:14px;
                       background:rgba(255,107,53,0.05);border:1px solid rgba(255,107,53,0.18);
                       border-radius:2px;cursor:pointer;text-align:left;
                       transition:transform 0.15s ease,background 0.15s ease,border-color 0.15s ease,box-shadow 0.15s ease;">
          <span style="font-size:32px;line-height:1;flex-shrink:0;">&#x1F3F0;</span>
          <div style="flex:1;min-width:0;">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:3px;">
              <span style="color:#ff9f43;font-size:14px;font-weight:700;">Demon Castle</span>
              ${statusBadge}
            </div>
            <div style="color:rgba(255,255,255,0.38);font-size:10px;margin-bottom:6px;">
              Kandiaru&#x27;s Trial &mdash; 100 Floors &bull; ${cleared} cleared
            </div>
            <div style="background:rgba(255,255,255,0.06);border-radius:2px;height:4px;overflow:hidden;">
              <div style="height:100%;background:linear-gradient(90deg,#dc3545,#ff6b35,#ff9f43);border-radius:2px;width:${progressPct}%;transition:width 0.4s;"></div>
            </div>
          </div>
          <div style="display:flex;flex-direction:column;align-items:flex-end;gap:2px;flex-shrink:0;">
            <span style="color:#dcddde;font-size:14px;font-weight:700;">${floor}</span>
            <span style="color:rgba(255,255,255,0.35);font-size:10px;">${progressPct}%</span>
            <span style="color:rgba(255,255,255,0.3);font-size:18px;margin-top:2px;">&#x276F;</span>
          </div>
        </button>

        <div style="text-align:center;color:rgba(255,255,255,0.2);font-size:10px;margin-top:14px;font-style:italic;">
          More story modes coming soon...
        </div>
      </div>
    `;
      },
      // Demon Castle detail view — full stats, floor info, boss roster, enter/exit
      _getDemonCastleDetailHtml() {
        var _a, _b, _c, _d, _e, _f, _g;
        const state = this._demonCastle;
        if (!state) {
          return '<div style="padding:20px;text-align:center;color:rgba(255,255,255,0.35);font-size:12px;">Story mode initializing...</div>';
        }
        const floor = state.currentFloor || 1;
        const cleared = ((_a = state.floorsCleared) == null ? void 0 : _a.length) || 0;
        const permits = this._dcPermits || 0;
        const totalKills = (state.totalDemonsKilled || 0).toLocaleString();
        const totalSouls = (state.totalDemonSouls || 0).toLocaleString();
        const bossesDefeated = state.totalBossesDefeated || 0;
        const isCompleted = Boolean(state.completedAt);
        const isActive = this._storyModeActive;
        const activeDungeon = (_b = this.activeDungeons) == null ? void 0 : _b.get(DC.DEMON_CASTLE_KEY);
        const progressPct = Math.min(100, (floor - 1) / DC.DEMON_CASTLE_FLOORS * 100).toFixed(1);
        const isBoss = DC.isBossFloor(floor);
        const bossInfo = isBoss ? DC.DEMON_CASTLE_BOSSES[floor] : null;
        const demonCount = DC.getDemonCount(floor).toLocaleString();
        const tier = DC.getFloorTier(floor);
        let activeHtml = "";
        if (isActive && activeDungeon) {
          const mobsKilled = (((_c = activeDungeon.mobs) == null ? void 0 : _c.killed) || 0).toLocaleString();
          const mobsRemaining = Math.max(0, ((_d = activeDungeon.mobs) == null ? void 0 : _d.remaining) || 0).toLocaleString();
          const aliveMobs = (((_f = (_e = activeDungeon.mobs) == null ? void 0 : _e.activeMobs) == null ? void 0 : _f.length) || 0).toLocaleString();
          const floorSouls = (((_g = activeDungeon.mobs) == null ? void 0 : _g.killed) || 0).toLocaleString();
          const bossHp = activeDungeon.boss && !activeDungeon.boss._isSentinel ? `${Math.max(0, activeDungeon.boss.hp).toLocaleString()} / ${activeDungeon.boss.maxHp.toLocaleString()}` : null;
          activeHtml = `
        <div style="background:rgba(220,53,69,0.08);border:1px solid rgba(220,53,69,0.4);border-radius:2px;padding:12px;margin-top:12px;animation:dcCombatPulse 2s ease-in-out infinite;">
          <div style="font-size:12px;font-weight:700;color:#ff6b35;margin-bottom:8px;letter-spacing:0.02em;">&#x2694;&#xFE0F; IN COMBAT &mdash; Floor ${floor}</div>
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;">
            <div style="text-align:center;">
              <div style="font-size:9px;color:rgba(255,255,255,0.35);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:2px;">Killed</div>
              <div style="font-size:14px;font-weight:700;color:#34d399;">${mobsKilled}</div>
            </div>
            <div style="text-align:center;">
              <div style="font-size:9px;color:rgba(255,255,255,0.35);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:2px;">Remaining</div>
              <div style="font-size:14px;font-weight:700;color:#ef4444;">${mobsRemaining}</div>
            </div>
            <div style="text-align:center;">
              <div style="font-size:9px;color:rgba(255,255,255,0.35);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:2px;">Active</div>
              <div style="font-size:14px;font-weight:700;color:#fbbf24;">${aliveMobs}</div>
            </div>
            <div style="text-align:center;">
              <div style="font-size:9px;color:rgba(255,255,255,0.35);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:2px;">Souls</div>
              <div style="font-size:14px;font-weight:700;color:#8a2be2;">${floorSouls}</div>
            </div>
          </div>
          ${bossHp ? `<div style="text-align:center;color:rgba(255,255,255,0.4);font-size:10px;margin-top:8px;">Boss HP: <span style="color:#ef4444;font-weight:700;">${bossHp}</span></div>` : ""}
          <button class="dungeon-widget-action" type="button"
                  data-dungeon-action="story-exit" data-channel-key="${DC.DEMON_CASTLE_KEY}"
                  style="appearance:none;width:100%;padding:8px;margin-top:8px;background:rgba(220,53,69,0.2);border:1px solid rgba(220,53,69,0.5);border-radius:2px;color:#ff6b6b;font-size:12px;font-weight:700;cursor:pointer;transition:background 0.15s ease;">
            EXIT DEMON CASTLE
          </button>
        </div>
      `;
        }
        let enterBtnHtml = "";
        if (!isActive) {
          let enterLabel;
          if (isBoss) {
            enterLabel = `&#x2694;&#xFE0F; ENTER &mdash; ${bossInfo.name}`;
          } else if (isCompleted) {
            enterLabel = `&#x1F504; RE-ENTER FLOOR ${floor}`;
          } else {
            enterLabel = `&#x2694;&#xFE0F; ENTER FLOOR ${floor}`;
          }
          enterBtnHtml = `
        <button class="dungeon-widget-action dc-enter-btn" type="button"
                data-dungeon-action="story-enter" data-channel-key="${DC.DEMON_CASTLE_KEY}"
                style="appearance:none;width:100%;height:44px;margin-top:12px;background:linear-gradient(135deg,#dc3545 0%,#ff6b35 100%);border:none;border-radius:2px;color:#dcddde;font-size:13px;font-weight:700;letter-spacing:0.04em;cursor:pointer;box-shadow:0 4px 14px rgba(220,53,69,0.35);transition:filter 0.15s ease,transform 0.15s ease,box-shadow 0.15s ease;">
          ${enterLabel}
        </button>
      `;
        }
        const rankColors = { "B": "#8ec5ff", "A": "#fbbf24", "S": "#f87171", "Monarch": "#a78bfa" };
        const rankBgAlpha = { "B": "142,197,255", "A": "251,191,36", "S": "248,113,113", "Monarch": "167,139,250" };
        const bossRosterHtml = DC.BOSS_FLOORS.map((bossFloor) => {
          var _a2, _b2;
          const boss = DC.DEMON_CASTLE_BOSSES[bossFloor];
          if (!boss) return "";
          const isDefeated = Boolean((_b2 = (_a2 = state.floorsCleared) == null ? void 0 : _a2.includes) == null ? void 0 : _b2.call(_a2, bossFloor));
          const rc = rankColors[boss.rank] || "#b5bac1";
          const rba = rankBgAlpha[boss.rank] || "181,186,193";
          const defeatedStyle = isDefeated ? "opacity:0.55;background:rgba(52,211,153,0.04);border-color:rgba(52,211,153,0.15);" : "";
          return `
        <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:2px;padding:10px;${defeatedStyle}">
          <div style="font-size:12px;font-weight:700;color:${isDefeated ? "#34d399" : "#f2f3f5"};margin-bottom:1px;">${isDefeated ? "&#x2713; " : ""}${boss.name}</div>
          <div style="font-size:9px;color:rgba(255,255,255,0.38);margin-bottom:6px;line-height:1.3;">${boss.title}</div>
          <div style="display:flex;align-items:center;justify-content:space-between;gap:4px;">
            <span style="font-size:10px;font-weight:700;padding:1px 6px;border-radius:2px;color:${rc};background:rgba(${rba},0.12);">${boss.rank}</span>
            <span style="font-size:9px;color:rgba(255,255,255,0.3);">Floor ${bossFloor}</span>
          </div>
        </div>
      `;
        }).join("");
        const permitIndicator = floor > 1 ? `<span style="margin-left:6px;color:${permits > 0 ? "#34d399" : "#ef4444"};">Permit: ${permits > 0 ? "&#x2713;" : "&#x2717;"} ${permits > 0 ? "(" + permits + ")" : ""}</span>` : "";
        const floorBoxBorder = isBoss ? "border-left:3px solid #dc3545;background:rgba(220,53,69,0.06);border-color:rgba(220,53,69,0.2);" : "border-left:3px solid #ff6b35;";
        return `
      <div style="padding:16px;">

        <!-- Header row -->
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;">
          <button class="dungeon-widget-action" type="button"
                  data-dungeon-action="story-back" data-channel-key="_story"
                  style="appearance:none;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:2px;color:rgba(255,255,255,0.6);font-size:16px;line-height:1;width:28px;height:28px;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;"
                  title="Back to Story Modes">&#x276E;</button>
          <span style="font-size:22px;line-height:1;flex-shrink:0;">&#x1F3F0;</span>
          <div style="flex:1;min-width:0;">
            <div style="color:#ff9f43;font-size:15px;font-weight:700;line-height:1.2;">Demon Castle</div>
            <div style="color:rgba(255,255,255,0.38);font-size:10px;margin-top:1px;">Kandiaru&#x27;s Trial &mdash; 100 Floors</div>
          </div>
          <div style="text-align:right;flex-shrink:0;">
            <div style="color:#dcddde;font-size:16px;font-weight:700;line-height:1.2;">Floor ${floor}</div>
            <div style="color:rgba(255,255,255,0.38);font-size:10px;margin-top:1px;">${progressPct}% Complete</div>
          </div>
        </div>

        <!-- Progress bar -->
        <div style="height:6px;background:rgba(255,255,255,0.06);border-radius:2px;overflow:hidden;">
          <div class="story-mode-floor-bar-fill" style="height:100%;width:${progressPct}%;background:linear-gradient(90deg,#dc3545,#ff6b35,#ff9f43,#ff6b35,#dc3545);background-size:200% auto;border-radius:2px;transition:width 0.4s ease;animation:dcProgressShimmer 3s linear infinite;"></div>
        </div>
        <div style="color:rgba(255,255,255,0.35);font-size:10px;margin-top:5px;text-align:center;">
          Floor ${floor} of ${DC.DEMON_CASTLE_FLOORS} &mdash; ${progressPct}% Complete
        </div>

        <!-- Stats overview -->
        <div style="font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.35);margin:14px 0 6px;padding:0 2px;">Overview</div>
        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px;">
          <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:2px;padding:10px;text-align:center;">
            <div style="font-size:20px;font-weight:700;color:#ff9f43;line-height:1.1;margin-bottom:3px;">${cleared}</div>
            <div style="font-size:9px;font-weight:600;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:0.06em;">Floors Cleared</div>
          </div>
          <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:2px;padding:10px;text-align:center;">
            <div style="font-size:20px;font-weight:700;color:#34d399;line-height:1.1;margin-bottom:3px;">${totalKills}</div>
            <div style="font-size:9px;font-weight:600;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:0.06em;">Demons Slain</div>
          </div>
          <div style="background:rgba(138,43,226,0.04);border:1px solid rgba(138,43,226,0.12);border-radius:2px;padding:10px;text-align:center;">
            <div style="font-size:20px;font-weight:700;color:#8a2be2;line-height:1.1;margin-bottom:3px;">${totalSouls}</div>
            <div style="font-size:9px;font-weight:600;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:0.06em;">Demon Souls</div>
          </div>
          <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:2px;padding:10px;text-align:center;">
            <div style="font-size:20px;font-weight:700;color:#ef4444;line-height:1.1;margin-bottom:3px;">${bossesDefeated}/4</div>
            <div style="font-size:9px;font-weight:600;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:0.06em;">Bosses Defeated</div>
          </div>
        </div>

        <!-- Current floor info -->
        <div style="font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.35);margin:14px 0 6px;padding:0 2px;">Current Floor</div>
        <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);${floorBoxBorder}border-radius:0 2px 2px 0;padding:10px 12px;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;">
            <span style="color:#ff9f43;font-size:13px;font-weight:700;">Floor ${floor}</span>
            ${isBoss ? '<span style="color:#ef4444;font-size:10px;font-weight:700;background:rgba(220,53,69,0.2);padding:1px 8px;border-radius:2px;border:1px solid rgba(220,53,69,0.35);">&#x26A0; BOSS FLOOR</span>' : ""}
          </div>
          ${isBoss ? `<div style="color:#ef4444;font-size:12px;font-weight:600;margin-bottom:5px;">${bossInfo.name} &mdash; ${bossInfo.title}</div>` : ""}
          <div style="color:rgba(255,255,255,0.5);font-size:11px;line-height:1.7;">
            Demons: <span style="color:#dcddde;font-weight:600;">${demonCount}</span>
            &nbsp;&bull;&nbsp;
            Rank: <span style="color:#dcddde;font-weight:600;">${tier.rank}</span>
            &nbsp;&bull;&nbsp;
            Type: <span style="color:#dcddde;font-weight:600;">${tier.name}</span>
            ${permitIndicator}
          </div>
        </div>

        <!-- Demon Lords (boss roster) -->
        <div style="font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.35);margin:14px 0 6px;padding:0 2px;">Demon Lords</div>
        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px;">
          ${bossRosterHtml}
        </div>

        <!-- Active combat -->
        ${activeHtml}

        <!-- Enter button -->
        ${enterBtnHtml}

        <!-- Completion banner -->
        ${isCompleted ? '<div style="text-align:center;color:#fbbf24;font-size:11px;font-weight:600;padding:8px 0 0;">&#x1F3C6; Castle Cleared &mdash; Baran Defeated</div>' : ""}
      </div>
    `;
      }
    };
  }
});

// src/Dungeons/ui-indicators.js
var require_ui_indicators = __commonJS({
  "src/Dungeons/ui-indicators.js"(exports2, module2) {
    module2.exports = {
      findChannelElementForIndicator(channelInfo) {
        if (!(channelInfo == null ? void 0 : channelInfo.channelId)) return null;
        const channelId = String(channelInfo.channelId);
        const byListId = document.querySelector(`[data-list-item-id="channels___${channelId}"]`);
        if (byListId) return byListId;
        const byHref = document.querySelector(`a[href$="/${channelId}"]`) || document.querySelector(`a[href*="/channels/"][href*="/${channelId}"]`);
        if (byHref) {
          return byHref.closest(`[data-list-item-id="channels___${channelId}"]`) || byHref.closest('[data-list-item-id^="channels___"]') || byHref.closest("li") || byHref;
        }
        return null;
      },
      showDungeonIndicator(channelKey, channelInfo) {
        const channelElement = this.findChannelElementForIndicator(channelInfo);
        if (!channelElement) return;
        this.removeDungeonIndicator(channelKey);
        channelElement.setAttribute("data-dungeon-active", channelKey);
        this.dungeonIndicators.set(channelKey, channelElement);
      },
      removeDungeonIndicator(channelKey) {
        const channelElement = this.dungeonIndicators.get(channelKey);
        if (channelElement == null ? void 0 : channelElement.isConnected) {
          channelElement.removeAttribute("data-dungeon-active");
        }
        this.dungeonIndicators.delete(channelKey);
      },
      removeAllIndicators() {
        this.dungeonIndicators.forEach((channelElement) => {
          if (channelElement == null ? void 0 : channelElement.isConnected) {
            channelElement.removeAttribute("data-dungeon-active");
          }
        });
        this.dungeonIndicators.clear();
      }
    };
  }
});

// src/Dungeons/ui-bossbar.js
var require_ui_bossbar = __commonJS({
  "src/Dungeons/ui-bossbar.js"(exports2, module2) {
    var dc = require_discord_classes();
    var { escapeHtml } = require_escape_html();
    module2.exports = {
      _buildBossBarCombatSkillButtonHtml(skillState, channelKey) {
        if (!(skillState == null ? void 0 : skillState.skillId)) return "";
        const titleText = String(skillState.titleText || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        const disabledAttr = skillState.disabled ? " disabled" : "";
        return `
      <button
        class="dungeon-combat-skill-btn ${skillState.stateClass || ""}"
        data-channel-key="${channelKey}"
        data-skill-id="${skillState.skillId}"
        data-dungeon-tip="${titleText}"${disabledAttr}
      >${skillState.buttonText || skillState.skillId.toUpperCase()}</button>
    `;
      },
      _buildBossBarCombatSkillsRow(channelKey) {
        var _a;
        const skillStates = ((_a = this.getDungeonCombatSkillHudState) == null ? void 0 : _a.call(this, channelKey)) || [];
        if (!skillStates.length) return "";
        const buttonsHtml = skillStates.map((skillState) => this._buildBossBarCombatSkillButtonHtml(skillState, channelKey)).join("");
        return `
      <div class="boss-bar-combat-row">
        <span class="boss-bar-combat-label">Skills:</span>
        <div class="boss-bar-combat-actions">${buttonsHtml}</div>
      </div>
    `;
      },
      // Status ailment icon/label/color definitions for boss combat effects
      _STATUS_AILMENT_DISPLAY: {
        poison: { icon: "\u2620", label: "Poison", cls: "effect-badge-ailment-dot" },
        // ☠
        bleed: { icon: "\u{1FA78}", label: "Bleed", cls: "effect-badge-ailment-dot" },
        // 🩸
        burn: { icon: "\u{1F525}", label: "Burn", cls: "effect-badge-ailment-dot" },
        // 🔥
        necrotic: { icon: "\u{1F480}", label: "Necrotic", cls: "effect-badge-ailment-dot" },
        // 💀
        armorBreak: { icon: "\u{1F6E1}", label: "Armor Break", cls: "effect-badge-ailment-amp" },
        // 🛡 (with crack connotation)
        slow: { icon: "\u{1F422}", label: "Slow", cls: "effect-badge-ailment-slow" },
        // 🐢
        frostbite: { icon: "\u2744", label: "Frostbite", cls: "effect-badge-ailment-slow" },
        // ❄
        enrage: { icon: "\u{1F4A2}", label: "Enrage", cls: "effect-badge-ailment-enrage" }
        // 💢
      },
      _buildActiveEffectsRow(dungeon) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
        const now = Date.now();
        const effects = [];
        const domain = (_a = dungeon.activeBuffs) == null ? void 0 : _a.domain;
        if (domain && domain.expiresAt > now) {
          const sec = Math.ceil((domain.expiresAt - now) / 1e3);
          const pct = Math.round((domain.statMultiplier - 1) * 100);
          effects.push({ icon: "\u{1F451}", label: `Domain +${pct}%`, time: sec, type: "buff" });
        }
        const sprint = (_b = dungeon.activeBuffs) == null ? void 0 : _b.sprint;
        if (sprint && sprint.expiresAt > now) {
          const sec = Math.ceil((sprint.expiresAt - now) / 1e3);
          const pct = Math.round(sprint.cooldownReduction * 100);
          effects.push({ icon: "\u26A1", label: `Sprint -${pct}% CD`, time: sec, type: "buff" });
        }
        const rulers = (_c = dungeon.activeDebuffs) == null ? void 0 : _c.rulers_force;
        if (rulers && rulers.expiresAt > now) {
          const sec = Math.ceil((rulers.expiresAt - now) / 1e3);
          effects.push({ icon: "\u270A", label: "Stunned", time: sec, type: "debuff" });
        }
        const fearMobs = (_d = dungeon.activeDebuffs) == null ? void 0 : _d.dragons_fear_mobs;
        if (fearMobs && fearMobs.expiresAt > now) {
          const sec = Math.ceil((fearMobs.expiresAt - now) / 1e3);
          effects.push({ icon: "\u{1F409}", label: "Fear", time: sec, type: "debuff" });
        }
        const fearBoss = (_e = dungeon.activeDebuffs) == null ? void 0 : _e.dragons_fear_boss;
        if (fearBoss && fearBoss.expiresAt > now) {
          const sec = Math.ceil((fearBoss.expiresAt - now) / 1e3);
          effects.push({ icon: "\u{1F409}", label: "Boss Fear", time: sec, type: "debuff" });
        }
        const blMobs = (_f = dungeon.activeDebuffs) == null ? void 0 : _f.bloodlust_mobs;
        if (blMobs && blMobs.expiresAt > now) {
          const sec = Math.ceil((blMobs.expiresAt - now) / 1e3);
          effects.push({ icon: "\u{1F480}", label: "Bloodlust", time: sec, type: "debuff" });
        }
        const blBoss = (_g = dungeon.activeDebuffs) == null ? void 0 : _g.bloodlust_boss;
        if (blBoss && blBoss.expiresAt > now) {
          const sec = Math.ceil((blBoss.expiresAt - now) / 1e3);
          effects.push({ icon: "\u{1F480}", label: "Boss Paralyzed", time: sec, type: "debuff" });
        }
        const blStats = (_h = dungeon.activeDebuffs) == null ? void 0 : _h.bloodlust_stats;
        if (blStats && blStats.expiresAt > now) {
          const sec = Math.ceil((blStats.expiresAt - now) / 1e3);
          const pct = Math.round((blStats.statReduction || 0.5) * 100);
          effects.push({ icon: "\u{1F53B}", label: `-${pct}% Stats`, time: sec, type: "debuff" });
        }
        const channelKey = dungeon.channelKey;
        const statusState = (_j = (_i = this._combatStatusByChannel) == null ? void 0 : _i.get) == null ? void 0 : _j.call(_i, channelKey);
        if ((statusState == null ? void 0 : statusState.boss) && statusState.hasActive) {
          const bossBucket = statusState.boss;
          for (const [effectName, effect] of Object.entries(bossBucket)) {
            if (!effect || typeof effect !== "object") continue;
            const isActive = effect.expiresAt === Infinity || Number.isFinite(effect.expiresAt) && effect.expiresAt > now;
            if (!isActive) continue;
            const display = this._STATUS_AILMENT_DISPLAY[effectName];
            if (!display) continue;
            const stacks = Math.max(1, Number(effect.stacks) || 1);
            const sec = effect.expiresAt === Infinity ? null : Math.ceil((effect.expiresAt - now) / 1e3);
            const stackStr = stacks > 1 ? ` x${stacks}` : "";
            effects.push({
              icon: display.icon,
              label: `${display.label}${stackStr}`,
              time: sec,
              type: "ailment",
              cls: display.cls
            });
          }
        }
        if ((statusState == null ? void 0 : statusState.mobs) && statusState.mobs.size > 0) {
          const cache = statusState._mobAilmentTallyCache;
          let mobAilmentCounts;
          if (cache && cache.computedAt && now - cache.computedAt < 500) {
            mobAilmentCounts = cache.counts;
          } else {
            mobAilmentCounts = {};
            for (const [, mobBucket] of statusState.mobs) {
              if (!mobBucket || typeof mobBucket !== "object") continue;
              for (const [effectName, effect] of Object.entries(mobBucket)) {
                if (!effect || typeof effect !== "object") continue;
                const isActive = effect.expiresAt === Infinity || Number.isFinite(effect.expiresAt) && effect.expiresAt > now;
                if (!isActive) continue;
                mobAilmentCounts[effectName] = (mobAilmentCounts[effectName] || 0) + 1;
              }
            }
            statusState._mobAilmentTallyCache = { counts: mobAilmentCounts, computedAt: now };
          }
          for (const [effectName, count] of Object.entries(mobAilmentCounts)) {
            const display = this._STATUS_AILMENT_DISPLAY[effectName];
            if (!display || count === 0) continue;
            effects.push({
              icon: display.icon,
              label: `${count} Mobs ${display.label}`,
              time: null,
              type: "ailment-mob",
              cls: "effect-badge-ailment-mob"
            });
          }
        }
        if ((statusState == null ? void 0 : statusState.user) && statusState.hasActive) {
          const userBucket = statusState.user;
          for (const [effectName, effect] of Object.entries(userBucket)) {
            if (!effect || typeof effect !== "object") continue;
            const isActive = effect.expiresAt === Infinity || Number.isFinite(effect.expiresAt) && effect.expiresAt > now;
            if (!isActive) continue;
            const display = this._STATUS_AILMENT_DISPLAY[effectName];
            if (!display) continue;
            const stacks = Math.max(1, Number(effect.stacks) || 1);
            const sec = effect.expiresAt === Infinity ? null : Math.ceil((effect.expiresAt - now) / 1e3);
            const stackStr = stacks > 1 ? ` x${stacks}` : "";
            effects.push({
              icon: display.icon,
              label: `${display.label}${stackStr} (You)`,
              time: sec,
              type: "ailment-self",
              cls: "effect-badge-ailment-self"
            });
          }
        }
        if (!effects.length) return "";
        const groupOrder = ["buff", "debuff", "ailment", "ailment-mob", "ailment-self"];
        const groups = {};
        for (const e of effects) {
          const groupKey = e.type;
          (groups[groupKey] || (groups[groupKey] = [])).push(e);
        }
        const renderBadge = (e) => {
          let cls;
          if (e.cls) {
            cls = e.cls;
          } else if (e.type === "buff") {
            cls = "effect-badge-buff";
          } else {
            cls = "effect-badge-debuff";
          }
          let displayStr;
          let titleTime;
          if (e.type === "ailment-mob") {
            displayStr = e.label.replace(/^(\d+)\s+Mobs\s+.*/, "$1");
            titleTime = e.label;
          } else if (e.time === null) {
            displayStr = "\u221E";
            titleTime = "permanent";
          } else if (e.time >= 60) {
            displayStr = `${Math.floor(e.time / 60)}m${e.time % 60}s`;
            titleTime = displayStr;
          } else {
            displayStr = `${e.time}s`;
            titleTime = displayStr;
          }
          return `<span class="dungeon-effect-badge ${cls}" data-dungeon-tip="${escapeHtml(e.label)} (${titleTime})">${e.icon} ${displayStr}</span>`;
        };
        const sections = [];
        for (const key of groupOrder) {
          const group = groups[key];
          if (!group || group.length === 0) continue;
          sections.push(group.map(renderBadge).join(""));
        }
        const separator = '<span class="effect-row-separator"></span>';
        return `<div class="dungeon-active-effects-row">${sections.join(separator)}</div>`;
      },
      _updateActiveEffectsRow(hpBar, dungeon) {
        let row = hpBar.querySelector(".dungeon-active-effects-row");
        const html = this._buildActiveEffectsRow(dungeon);
        if (!html) {
          if (row) row.remove();
          return;
        }
        if (row) {
          row.outerHTML = html;
        } else {
          const combatRow = hpBar.querySelector(".boss-bar-combat-row");
          const statsRow = hpBar.querySelector(".boss-bar-stats");
          const anchor = combatRow || statsRow;
          if (anchor) {
            anchor.insertAdjacentHTML("afterend", html);
          }
        }
      },
      _updateGateTimerFastPath(hpBar, dungeon) {
        var _a, _b, _c, _d, _e, _f;
        const timerEl = hpBar.querySelector(".boss-gate-timer");
        if (!timerEl) return;
        const bossAlive = Number(((_a = dungeon == null ? void 0 : dungeon.boss) == null ? void 0 : _a.hp) || 0) > 0;
        const gateUnlocked = Boolean(
          ((_b = dungeon.bossGate) == null ? void 0 : _b.unlockedAt) && Number.isFinite(dungeon.bossGate.unlockedAt) && dungeon.bossGate.unlockedAt > 0
        );
        if (!bossAlive || gateUnlocked) {
          timerEl.remove();
          return;
        }
        const deployedAt = Number(((_c = dungeon.bossGate) == null ? void 0 : _c.deployedAt) || dungeon.deployedAt || 0);
        const minDuration = Number(((_d = dungeon.bossGate) == null ? void 0 : _d.minDurationMs) || 18e4);
        const elapsed = Math.max(0, Date.now() - deployedAt);
        const remaining = Math.max(0, minDuration - elapsed);
        const kills = Number(((_e = dungeon.mobs) == null ? void 0 : _e.killed) || 0);
        const reqKills = Number(((_f = dungeon.bossGate) == null ? void 0 : _f.requiredMobKills) || 25);
        const killsLeft = Math.max(0, reqKills - kills);
        const countdownEl = timerEl.querySelector(".boss-gate-countdown");
        if (countdownEl) {
          countdownEl.textContent = remaining > 0 ? `${Math.floor(remaining / 6e4)}:${String(Math.floor(remaining % 6e4 / 1e3)).padStart(2, "0")}` : "READY";
        }
        const killsEl = timerEl.querySelector(".boss-gate-kills");
        if (killsEl) {
          killsEl.textContent = killsLeft > 0 ? `${killsLeft} kills needed` : "kills done";
        }
      },
      _updateBossBarCombatSkillButtons(hpBar, channelKey) {
        var _a;
        const skillStates = ((_a = this.getDungeonCombatSkillHudState) == null ? void 0 : _a.call(this, channelKey)) || [];
        if (!skillStates.length) return;
        skillStates.forEach((skillState) => {
          const button = hpBar.querySelector(
            `.dungeon-combat-skill-btn[data-skill-id="${skillState.skillId}"]`
          );
          if (!button) return;
          button.textContent = skillState.buttonText || skillState.skillId.toUpperCase();
          button.setAttribute("data-dungeon-tip", skillState.titleText || "");
          button.className = `dungeon-combat-skill-btn ${skillState.stateClass || ""}`;
          if (skillState.disabled) {
            button.setAttribute("disabled", "disabled");
          } else {
            button.removeAttribute("disabled");
          }
        });
      },
      _getCurrentChannelKeyFast() {
        if (typeof this.currentChannelKey === "string" && this.currentChannelKey.includes("_")) {
          return this.currentChannelKey;
        }
        const currentChannelInfo = this.getChannelInfo() || this.getChannelInfoFromLocation();
        if (!(currentChannelInfo == null ? void 0 : currentChannelInfo.channelId)) return null;
        const channelKey = `${currentChannelInfo.guildId}_${currentChannelInfo.channelId}`;
        this.currentChannelKey = channelKey;
        return channelKey;
      },
      updateBossHPBar(channelKey) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B;
        try {
          if (!this.isWindowVisible()) {
            return;
          }
          (_a = this.ensureBossHpBarCssInjected) == null ? void 0 : _a.call(this);
          if (this.isSettingsLayerOpen()) {
            this.removeBossHPBar(channelKey);
            this.showChannelHeaderComments(channelKey);
            return;
          }
          const dungeon = this.activeDungeons.get(channelKey);
          const bossAlive = dungeon && Number(((_b = dungeon.boss) == null ? void 0 : _b.hp) || 0) > 0;
          const liveMobs = ((_d = (_c = dungeon == null ? void 0 : dungeon.mobs) == null ? void 0 : _c.activeMobs) == null ? void 0 : _d.some((m) => m && m.hp > 0)) || false;
          if (!dungeon || dungeon.completed || dungeon.failed || dungeon._completing || !bossAlive && !liveMobs) {
            this.removeBossHPBar(channelKey);
            (_f = (_e = this._bossBarCache) == null ? void 0 : _e.delete) == null ? void 0 : _f.call(_e, channelKey);
            this.showChannelHeaderComments(channelKey);
            return;
          }
          const currentChannelKey = this._getCurrentChannelKeyFast();
          if (!currentChannelKey) {
            this.queueHPBarUpdate(channelKey);
            return;
          }
          const isCurrentChannel = currentChannelKey === channelKey;
          if (!isCurrentChannel) {
            const existingBar2 = this.bossHPBars.get(channelKey);
            if (existingBar2) {
              this.removeBossHPBar(channelKey);
              (_h = (_g = this._bossBarCache) == null ? void 0 : _g.delete) == null ? void 0 : _h.call(_g, channelKey);
              this.showChannelHeaderComments(channelKey);
            }
            return;
          }
          this.syncHPAndManaFromStats();
          const existingBar = this.bossHPBars.get(channelKey);
          if (existingBar) {
            const barConnected = existingBar.isConnected;
            const container = existingBar.closest(".dungeon-boss-hp-container");
            const containerConnected = container && container.isConnected;
            if (!barConnected || !containerConnected) {
              this.bossHPBars.delete(channelKey);
              (_j = (_i = this._bossBarCache) == null ? void 0 : _i.delete) == null ? void 0 : _j.call(_i, channelKey);
              if (container && !containerConnected) {
                try {
                  container.remove();
                } catch (e) {
                }
              }
            }
          }
          this.hideChannelHeaderComments(channelKey);
          const hpPercent = bossAlive ? dungeon.boss.hp / dungeon.boss.maxHp * 100 : 0;
          let hpBar = this.bossHPBars.get(channelKey);
          if (!hpBar) {
            hpBar = this._createBossHPBarInPreferredContainer(channelKey);
            if (!hpBar) {
              this.queueHPBarUpdate(channelKey);
              return;
            }
          } else {
            const container = hpBar.closest(".dungeon-boss-hp-container");
            if (!container || !container.isConnected) {
              this.bossHPBars.delete(channelKey);
              (_l = (_k = this._bossBarCache) == null ? void 0 : _k.delete) == null ? void 0 : _l.call(_k, channelKey);
              hpBar = this._createBossHPBarInPreferredContainer(channelKey);
            }
          }
          const now = Date.now();
          let aliveMobs = 0;
          const totalMobs = ((_m = dungeon.mobs) == null ? void 0 : _m.targetCount) || 0;
          const lastCleanup = this._mobCleanupCache.get(channelKey);
          const shouldCleanup = !lastCleanup || now - lastCleanup.time > 500;
          if (shouldCleanup) {
            if ((_n = dungeon.mobs) == null ? void 0 : _n.activeMobs) {
              const alive = [];
              for (let i = 0; i < dungeon.mobs.activeMobs.length; i++) {
                const m = dungeon.mobs.activeMobs[i];
                if (m && m.hp > 0) alive.push(m);
              }
              dungeon.mobs.activeMobs = alive;
              aliveMobs = alive.length;
            }
            this._mobCleanupCache.set(channelKey, { time: now, alive: aliveMobs });
          } else {
            aliveMobs = lastCleanup.alive || 0;
          }
          const currentBossHP = ((_o = dungeon.boss) == null ? void 0 : _o.hp) || 0;
          const currentBossMaxHP = ((_p = dungeon.boss) == null ? void 0 : _p.maxHp) || 0;
          const combatSkillStates = ((_q = this.getDungeonCombatSkillHudState) == null ? void 0 : _q.call(this, channelKey)) || [];
          const combatSignature = combatSkillStates.map((skillState) => skillState.skillId).join("|");
          const gateUnlocked = Boolean(
            ((_r = dungeon.bossGate) == null ? void 0 : _r.unlockedAt) && Number.isFinite(dungeon.bossGate.unlockedAt) && dungeon.bossGate.unlockedAt > 0
          );
          const hpFloor = Math.floor(currentBossHP);
          const maxHpFloor = Math.floor(currentBossMaxHP);
          const hpPctRound = Math.floor(hpPercent * 10) / 10;
          const prev = this._bossBarCache.get(channelKey);
          const deploying = Boolean(dungeon._deploying);
          const structuralUnchanged = prev && prev.part === dungeon.userParticipating && prev.dep === dungeon.shadowsDeployed && prev.deploying === deploying && prev.type === dungeon.type && prev.rank === dungeon.rank && prev.name === dungeon.name && prev.combatSig === combatSignature && prev.gateUnlocked === gateUnlocked;
          if (hpBar && structuralUnchanged) {
            const hpCont = hpBar.closest(".dungeon-boss-hp-container");
            if (hpCont) {
              hpCont.style.setProperty("--boss-hp-percent", `${hpPercent}%`);
              hpCont.setAttribute("data-hp-percent", hpPercent);
            }
            const SELECTORS = {
              text: ".hp-bar-text",
              hpCurrent: ".boss-hp-current",
              hpMax: ".boss-hp-max",
              mobAlive: ".mob-alive",
              mobTotal: ".mob-total",
              shadowAlive: ".shadow-alive",
              shadowTotal: ".shadow-total",
              shadowDead: ".shadow-dead"
            };
            let cachedEls = hpBar._cachedEls;
            const cacheStale = !cachedEls || Object.keys(SELECTORS).some((key) => {
              const el = cachedEls[key];
              return el && !el.isConnected;
            });
            if (cacheStale) {
              cachedEls = {};
              for (const key of Object.keys(SELECTORS)) {
                cachedEls[key] = hpBar.querySelector(SELECTORS[key]);
              }
              hpBar._cachedEls = cachedEls;
            }
            const textEl = cachedEls.text;
            if (textEl) textEl.textContent = `${Math.floor(hpPercent)}%`;
            const hpCurrentEl = cachedEls.hpCurrent;
            if (hpCurrentEl) hpCurrentEl.textContent = Math.floor(currentBossHP).toLocaleString();
            const hpMaxEl = cachedEls.hpMax;
            if (hpMaxEl) hpMaxEl.textContent = currentBossMaxHP.toLocaleString();
            const mobAliveEl = cachedEls.mobAlive;
            if (mobAliveEl) mobAliveEl.textContent = aliveMobs.toLocaleString();
            const mobTotalEl = cachedEls.mobTotal;
            if (mobTotalEl) mobTotalEl.textContent = totalMobs.toLocaleString();
            if (!deploying && dungeon.shadowsDeployed) {
              const allocated = this.shadowAllocations.get(channelKey) || ((_s = dungeon.shadowAllocation) == null ? void 0 : _s.shadows) || [];
              const deadSet = (_t = this.deadShadows) == null ? void 0 : _t.get(channelKey);
              const deadCount = (deadSet == null ? void 0 : deadSet.size) || 0;
              const aliveCount = Math.max(0, allocated.length - deadCount);
              let shadowAliveEl = cachedEls.shadowAlive;
              if (!shadowAliveEl) shadowAliveEl = cachedEls.shadowAlive = hpBar.querySelector(".shadow-alive");
              if (shadowAliveEl) shadowAliveEl.textContent = aliveCount.toLocaleString();
              let shadowTotalEl = cachedEls.shadowTotal;
              if (!shadowTotalEl) shadowTotalEl = cachedEls.shadowTotal = hpBar.querySelector(".shadow-total");
              if (shadowTotalEl) shadowTotalEl.textContent = allocated.length.toLocaleString();
              let shadowDeadEl = cachedEls.shadowDead;
              if (!shadowDeadEl) shadowDeadEl = cachedEls.shadowDead = hpBar.querySelector(".shadow-dead");
              if (shadowDeadEl) {
                shadowDeadEl.textContent = deadCount > 0 ? `(${deadCount} dead)` : "";
                shadowDeadEl.style.display = deadCount > 0 ? "" : "none";
              }
            }
            this._updateBossBarCombatSkillButtons(hpBar, channelKey);
            this._updateActiveEffectsRow(hpBar, dungeon);
            this._updateGateTimerFastPath(hpBar, dungeon);
            this._bossBarCache.set(channelKey, {
              hp: hpFloor,
              maxHp: maxHpFloor,
              hpPct: hpPctRound,
              alive: aliveMobs,
              total: totalMobs,
              part: dungeon.userParticipating,
              dep: dungeon.shadowsDeployed,
              deploying,
              type: dungeon.type,
              rank: dungeon.rank,
              name: dungeon.name,
              combatSig: combatSignature,
              gateUnlocked
            });
            this.scheduleBossBarLayout(hpBar.parentElement);
            return;
          }
          this._bossBarCache.set(channelKey, {
            hp: hpFloor,
            maxHp: maxHpFloor,
            hpPct: hpPctRound,
            alive: aliveMobs,
            total: totalMobs,
            part: dungeon.userParticipating,
            dep: dungeon.shadowsDeployed,
            deploying,
            type: dungeon.type,
            rank: dungeon.rank,
            name: dungeon.name,
            combatSig: combatSignature,
            gateUnlocked
          });
          const hpContainer = hpBar == null ? void 0 : hpBar.closest(".dungeon-boss-hp-container");
          if (hpContainer) {
            hpContainer.setAttribute("data-hp-percent", hpPercent);
            hpContainer.style.setProperty("--boss-hp-percent", `${hpPercent}%`);
          }
          const participationBadge = dungeon._deploying ? '<span class="boss-bar-badge-deploying">DEPLOYING</span>' : !dungeon.shadowsDeployed ? '<span class="boss-bar-badge-waiting">WAITING</span>' : dungeon.userParticipating ? ((_v = (_u = this.soloLevelingStats) == null ? void 0 : _u.settings) == null ? void 0 : _v.rank) === "Shadow Monarch" ? '<span class="boss-bar-badge-fighting">\u{1F451} MONARCH</span>' : '<span class="boss-bar-badge-fighting">FIGHTING</span>' : '<span class="boss-bar-badge-deployed">DEPLOYED</span>';
          const deployButtonHTML = dungeon._deploying ? `<button class="dungeon-deploy-btn is-deploying" data-channel-key="${channelKey}" disabled>DEPLOYING\u2026</button>` : !dungeon.shadowsDeployed ? `<button class="dungeon-deploy-btn" data-channel-key="${channelKey}">DEPLOY SHADOWS</button>` : `<button class="dungeon-recall-btn" data-channel-key="${channelKey}">RECALL SHADOWS</button>`;
          const joinButtonHTML = !dungeon.userParticipating ? `<button class="dungeon-join-btn" data-channel-key="${channelKey}">JOIN</button>` : "";
          const leaveButtonHTML = dungeon.userParticipating ? `<button class="dungeon-leave-btn" data-channel-key="${channelKey}">LEAVE</button>` : "";
          const combatSkillsRowHTML = this._buildBossBarCombatSkillsRow(channelKey);
          const activeEffectsRowHTML = this._buildActiveEffectsRow(dungeon);
          const showBossSection = bossAlive && gateUnlocked;
          let gateTimerHTML = "";
          if (bossAlive && !gateUnlocked && dungeon.shadowsDeployed) {
            const deployedAt = Number(((_w = dungeon.bossGate) == null ? void 0 : _w.deployedAt) || dungeon.deployedAt || 0);
            const minDuration = Number(((_x = dungeon.bossGate) == null ? void 0 : _x.minDurationMs) || 18e4);
            const elapsed = Math.max(0, Date.now() - deployedAt);
            const remaining = Math.max(0, minDuration - elapsed);
            const kills = Number(((_y = dungeon.mobs) == null ? void 0 : _y.killed) || 0);
            const reqKills = Number(((_z = dungeon.bossGate) == null ? void 0 : _z.requiredMobKills) || 25);
            const killsLeft = Math.max(0, reqKills - kills);
            if (remaining > 0 || killsLeft > 0) {
              const timeStr = remaining > 0 ? `${Math.floor(remaining / 6e4)}:${String(Math.floor(remaining % 6e4 / 1e3)).padStart(2, "0")}` : "READY";
              const killStr = killsLeft > 0 ? `${killsLeft} kills needed` : "kills done";
              gateTimerHTML = `
            <div class="boss-gate-timer">
              <span class="boss-gate-icon">\u{1F512}</span>
              <span class="boss-gate-label">Boss Sealed</span>
              <span class="boss-gate-countdown">${timeStr}</span>
              <span class="boss-gate-separator">|</span>
              <span class="boss-gate-kills">${killStr}</span>
            </div>`;
            }
          }
          const bossStatsHTML = showBossSection ? `<div>
            <span class="boss-bar-stat-label">Boss:</span>
            <span class="boss-hp-current">${Math.floor(currentBossHP).toLocaleString()}</span>
            <span class="boss-bar-stat-separator">/</span>
            <span class="boss-hp-max">${currentBossMaxHP.toLocaleString()}</span>
          </div>` : "";
          const hpBarHTML = showBossSection ? `<div class="hp-bar-container">
            <div class="hp-bar-fill"></div>
            <div class="hp-bar-text">${Math.floor(hpPercent)}%</div>
          </div>` : "";
          let shadowInfoHTML = "";
          if (dungeon._deploying) {
            shadowInfoHTML = `
          <div class="boss-bar-shadow-info is-deploying">
            <span class="boss-bar-stat-label">Shadows:</span>
            <span class="shadow-pending">\u2026</span>
          </div>`;
          } else if (dungeon.shadowsDeployed) {
            const allocated = this.shadowAllocations.get(channelKey) || ((_A = dungeon.shadowAllocation) == null ? void 0 : _A.shadows) || [];
            const deadSet = (_B = this.deadShadows) == null ? void 0 : _B.get(channelKey);
            const deadCount = (deadSet == null ? void 0 : deadSet.size) || 0;
            const aliveCount = Math.max(0, allocated.length - deadCount);
            const rc = {};
            for (const s of allocated) {
              const r = (s == null ? void 0 : s.rank) || "E";
              rc[r] = (rc[r] || 0) + 1;
            }
            const rankOrder = ["Shadow Monarch", "Monarch+", "Monarch", "NH", "SSS+", "SSS", "SS", "S", "A", "B", "C", "D", "E"];
            const parts = rankOrder.filter((r) => rc[r] > 0).map((r) => `${rc[r]} ${r}`);
            const rankStr = parts.length > 0 ? parts.join(" ") : "";
            shadowInfoHTML = `
          <div class="boss-bar-shadow-info">
            <span class="boss-bar-stat-label">Shadows:</span>
            <span class="shadow-alive">${aliveCount.toLocaleString()}</span>
            <span class="boss-bar-stat-separator">/</span>
            <span class="shadow-total">${allocated.length.toLocaleString()}</span>
            ${deadCount > 0 ? `<span class="shadow-dead" style="color:#ef4444;margin-left:4px;">(${deadCount} dead)</span>` : ""}
            ${rankStr ? `<span class="shadow-ranks" style="opacity:0.7;margin-left:6px;font-size:11px;">[${rankStr}]</span>` : ""}
          </div>`;
          }
          hpBar.innerHTML = `
      <div class="boss-bar-layout">
        <div class="boss-bar-header">
          <div class="boss-bar-info">
            <div class="boss-bar-name">
              ${participationBadge} | ${escapeHtml(dungeon.name)} [${escapeHtml(dungeon.rank)}]
            </div>
            ${deployButtonHTML}
            ${joinButtonHTML}
            ${leaveButtonHTML}
          </div>
          <div class="boss-bar-type">
            ${escapeHtml(dungeon.type)}
          </div>
        </div>
        ${gateTimerHTML}
        <div class="boss-bar-stats">
          ${bossStatsHTML}
          <div>
            <span class="boss-bar-stat-label">Mobs:</span>
            <span class="mob-alive">${aliveMobs.toLocaleString()}</span>
            <span class="boss-bar-stat-separator">/</span>
            <span class="mob-total">${totalMobs.toLocaleString()}</span>
          </div>
          ${shadowInfoHTML}
        </div>
        ${combatSkillsRowHTML}
        ${activeEffectsRowHTML}
      </div>
      ${hpBarHTML}
    `;
          this.scheduleBossBarLayout(hpBar.parentElement);
        } catch (error) {
          this.errorLog("CRITICAL", "Error updating boss HP bar", { channelKey, error });
        }
      },
      findChannelHeader() {
        var _a;
        const cacheKey = "channelHeader";
        const now = Date.now();
        const cached = this._containerCache.get(cacheKey);
        if (cached && now - cached.timestamp < 2e3) {
          if ((_a = cached.value) == null ? void 0 : _a.isConnected) {
            return cached.value;
          }
        }
        let header = document.querySelector('section[aria-label="Channel header"]') || document.querySelector('section[aria-label*="Channel header"]');
        if (!header) {
          header = document.querySelector(`${dc.sel.title}${dc.sel.container}`) || document.querySelector(dc.sel.channelHeader);
        }
        if (!header) {
          header = document.querySelector('[class*="title_"][class*="container_"]') || document.querySelector('[class*="channelHeader_"]');
        }
        if (header) {
          this._containerCache.set(cacheKey, { value: header, timestamp: now });
        }
        return header;
      },
      findChannelContainer() {
        var _a;
        const cacheKey = "channelContainer";
        const now = Date.now();
        const cached = this._containerCache.get(cacheKey);
        if (cached && now - cached.timestamp < 2e3) {
          if ((_a = cached.value) == null ? void 0 : _a.isConnected) {
            return cached.value;
          }
        }
        let container = document.querySelector('main[aria-label*="Chat"]') || document.querySelector('[class*="chat"][class*="container"]') || document.querySelector('[class*="chatContainer"]');
        if (!container) {
          const messageList = document.querySelector(dc.sel.messageList) || document.querySelector(dc.sel.messages);
          if (messageList) {
            container = messageList.closest(dc.sel.container) || messageList.parentElement;
          }
        }
        if (!container) {
          container = document.querySelector(`${dc.sel.channel} ${dc.sel.content}`) || document.querySelector(`${dc.sel.chat} ${dc.sel.content}`);
        }
        if (!container) {
          container = document.querySelector('[class*="channel_"] [class*="content_"]') || document.querySelector('[class*="chat_"] [class*="content_"]') || document.querySelector('[class*="chatContent_"]');
        }
        if (container) {
          this._containerCache.set(cacheKey, { value: container, timestamp: now });
        }
        return container;
      },
      createBossHPBarInContainer(container, channelKey) {
        var _a, _b;
        if (!container) {
          this.errorLog("Cannot create boss HP bar: container is null", { channelKey });
          return;
        }
        if (!container.isConnected) {
          this.debugLog("HP_BAR_CREATE", "Container not in DOM, will retry", { channelKey });
          this.queueHPBarUpdate(channelKey);
          return;
        }
        try {
          (_a = this.ensureBossHpBarCssInjected) == null ? void 0 : _a.call(this);
          document.querySelectorAll(`.dungeon-boss-hp-container[data-channel-key="${channelKey}"]`).forEach((el) => {
            try {
              const hasBar = el.querySelector(".dungeon-boss-hp-bar");
              if (!hasBar || !el.isConnected) {
                el.remove();
              }
            } catch {
            }
          });
          let bossHpContainer = container.querySelector(
            '.dungeon-boss-hp-container[data-channel-key="' + channelKey + '"]'
          );
          const otherContainers = container.querySelectorAll(".dungeon-boss-hp-container");
          otherContainers.forEach((el) => {
            const elChannelKey = el.getAttribute("data-channel-key");
            if (elChannelKey && elChannelKey !== channelKey) {
              try {
                el.remove();
              } catch (e) {
              }
            }
          });
          if (!bossHpContainer) {
            bossHpContainer = document.createElement("div");
            bossHpContainer.className = "dungeon-boss-hp-container";
            bossHpContainer.setAttribute("data-channel-key", channelKey);
            bossHpContainer.style.zIndex = "99";
            const dungeon = (_b = this.activeDungeons) == null ? void 0 : _b.get(channelKey);
            const initHpPercent = (dungeon == null ? void 0 : dungeon.boss) ? dungeon.boss.hp / dungeon.boss.maxHp * 100 : 100;
            bossHpContainer.style.setProperty("--boss-hp-percent", `${initHpPercent}%`);
            if (!container.isConnected) {
              this.debugLog("HP_BAR_CREATE", "Container removed from DOM during creation, will retry", {
                channelKey
              });
              this.queueHPBarUpdate(channelKey);
              return;
            }
            if (container.firstChild) {
              container.insertBefore(bossHpContainer, container.firstChild);
            } else {
              container.appendChild(bossHpContainer);
            }
          } else {
            bossHpContainer.innerHTML = "";
          }
          const hpBar = document.createElement("div");
          hpBar.className = "dungeon-boss-hp-bar";
          hpBar.setAttribute("data-dungeon-boss-hp-bar", channelKey);
          bossHpContainer.appendChild(hpBar);
          this.scheduleBossBarLayout(bossHpContainer);
          this.bossHPBars.set(channelKey, hpBar);
        } catch (error) {
          this.errorLog("CRITICAL", "Error creating boss HP bar in container", { channelKey, error });
        }
      },
      hideChannelHeaderComments(channelKey) {
        if (this.hiddenComments.has(channelKey)) return;
        const channelHeader = this.findChannelHeader();
        if (!channelHeader) return;
        const allButtons = channelHeader.querySelectorAll(`button${dc.sel.button}`);
        const commentElements = [];
        allButtons.forEach((button) => {
          const ariaLabel = (button.getAttribute("aria-label") || "").toLowerCase();
          const className = (button.className || "").toLowerCase();
          const textContent = (button.textContent || "").toLowerCase();
          const isCommentButton = ariaLabel.includes("comment") || ariaLabel.includes("thread") || ariaLabel.includes("reply") || className.includes("comment") || className.includes("thread") || className.includes("reply") || textContent.includes("comment") || textContent.includes("thread");
          const hasIcon = button.querySelector("svg");
          const isInToolbar = button.closest(dc.sel.toolbar);
          if (isCommentButton || hasIcon && isInToolbar && ariaLabel) {
            commentElements.push(button);
          }
        });
        if (commentElements.length > 0) {
          this.hiddenComments.set(channelKey, commentElements.map((el) => ({
            element: el,
            originalDisplay: el.style.display || "",
            originalVisibility: el.style.visibility || ""
          })));
        }
      },
      showChannelHeaderComments(channelKey) {
        const hidden = this.hiddenComments.get(channelKey);
        if (!hidden) return;
        hidden.forEach(({ element, originalDisplay, originalVisibility }) => {
          if (element && element.parentNode) {
            element.style.display = originalDisplay || "";
            if (originalVisibility) {
              element.style.visibility = originalVisibility;
            }
          }
        });
        this.hiddenComments.delete(channelKey);
      },
      removeBossHPBar(channelKey) {
        var _a, _b, _c;
        const hpBar = this.bossHPBars.get(channelKey);
        if (hpBar == null ? void 0 : hpBar.parentNode) {
          const container = hpBar.parentNode;
          hpBar.parentNode.removeChild(hpBar);
          if (container.classList.contains("dungeon-boss-hp-container") && container.children.length === 0) {
            (_a = container.parentNode) == null ? void 0 : _a.removeChild(container);
          }
        }
        this.bossHPBars.delete(channelKey);
        (_c = (_b = this._bossBarCache) == null ? void 0 : _b.delete) == null ? void 0 : _c.call(_b, channelKey);
        this.showChannelHeaderComments(channelKey);
      },
      removeAllBossHPBars() {
        var _a, _b, _c, _d;
        this.bossHPBars.forEach((hpBar) => {
          var _a2;
          if (hpBar == null ? void 0 : hpBar.parentNode) {
            const container = hpBar.parentNode;
            hpBar.parentNode.removeChild(hpBar);
            if (container.classList.contains("dungeon-boss-hp-container") && container.children.length === 0) {
              (_a2 = container.parentNode) == null ? void 0 : _a2.removeChild(container);
            }
          }
        });
        this.bossHPBars.clear();
        (_b = (_a = this._bossBarCache) == null ? void 0 : _a.clear) == null ? void 0 : _b.call(_a);
        (_d = (_c = this._ariseButtonRefs) == null ? void 0 : _c.clear) == null ? void 0 : _d.call(_c);
        document.querySelectorAll(".dungeon-boss-hp-container").forEach((container) => {
          if (container.children.length === 0) {
            container.remove();
          }
        });
      },
      isElementVisible(el) {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
      },
      isSettingsLayerOpen() {
        const now = Date.now();
        const cached = this._settingsLayerOpenCache;
        if (cached && now - cached.ts < 250) return cached.value;
        const value = Boolean(
          document.querySelector("nav[aria-label*='Settings' i]") || document.querySelector(dc.sel.userSettings) || document.querySelector(dc.sel.settingsContainer)
        );
        this._settingsLayerOpenCache = { value, ts: now };
        return value;
      },
      adjustBossBarLayout(container) {
        if (!container) return;
        const memberWrap = document.querySelector("aside[aria-label*='Members' i]") || document.querySelector(dc.sel.membersWrap);
        const memberVisible = this.isElementVisible(memberWrap);
        let memberWidth = 0;
        const cacheKey = "memberWidth";
        const now = Date.now();
        const cached = this._memberWidthCache.get(cacheKey);
        if (cached && now - cached.timestamp < 400) {
          memberWidth = cached.width;
        } else if (memberVisible && memberWrap) {
          memberWidth = memberWrap.getBoundingClientRect().width || memberWrap.offsetWidth || 0;
          this._memberWidthCache.set(cacheKey, { width: memberWidth, timestamp: now });
        }
        if (memberVisible && memberWidth > 0) {
          container.style.maxWidth = `calc(100% - ${memberWidth}px)`;
          container.style.marginRight = `${memberWidth}px`;
          container.style.alignSelf = "flex-start";
        } else {
          container.style.maxWidth = "100%";
          container.style.marginRight = "0";
          container.style.alignSelf = "stretch";
        }
      },
      scheduleBossBarLayout(container) {
        if (!container) return;
        const containerId = container.getAttribute("data-channel-key") || "default";
        const now = Date.now();
        const lastLayout = this._bossBarLayoutThrottle.get(containerId) || 0;
        const throttleDelay = 120;
        if (now - lastLayout < throttleDelay) {
          return;
        }
        if (this._bossBarLayoutFrame) {
          cancelAnimationFrame(this._bossBarLayoutFrame);
        }
        this._bossBarLayoutFrame = requestAnimationFrame(() => {
          this.adjustBossBarLayout(container);
          this._bossBarLayoutThrottle.set(containerId, Date.now());
          this._bossBarLayoutFrame = null;
        });
      }
    };
  }
});

// src/Dungeons/runtime-visibility.js
var require_runtime_visibility = __commonJS({
  "src/Dungeons/runtime-visibility.js"(exports2, module2) {
    var { _PluginUtils } = require_bootstrap_runtime();
    var C2 = require_constants();
    var Dungeons3 = { RANK_MULTIPLIERS: C2.RANK_MULTIPLIERS };
    module2.exports = {
      isActiveDungeon(channelKey) {
        const dungeon = this.activeDungeons.get(channelKey);
        if (!dungeon) return false;
        if (dungeon.completed || dungeon.failed || dungeon._completing) return false;
        if (dungeon.userParticipating) return true;
        if (this.currentChannelKey === channelKey) return true;
        return false;
      },
      startHPBarRestoration() {
        if (this._hpBarRestoreInterval) return;
        this._hpBarRestoreInterval = setInterval(() => {
          var _a;
          if (!this.activeDungeons || this.activeDungeons.size === 0) {
            this.stopHPBarRestoration();
            return;
          }
          if (!this.isWindowVisible()) {
            return;
          }
          (_a = this.ensureBossHpBarCssInjected) == null ? void 0 : _a.call(this);
          const currentChannelInfo = this.getChannelInfo() || this.getChannelInfoFromLocation();
          if (!currentChannelInfo) return;
          this.activeDungeons.forEach((dungeon, channelKey) => {
            const isCurrentChannel = currentChannelInfo.channelId === dungeon.channelId && currentChannelInfo.guildId === dungeon.guildId;
            if (!isCurrentChannel || !dungeon || dungeon.completed || dungeon.failed || dungeon._completing || !dungeon.boss || dungeon.boss.hp <= 0) {
              return;
            }
            const existingBar = this.bossHPBars.get(channelKey);
            const container = existingBar == null ? void 0 : existingBar.closest(".dungeon-boss-hp-container");
            const barInDOM = existingBar && existingBar.isConnected;
            const containerInDOM = container && container.isConnected;
            if (!existingBar || !barInDOM || !containerInDOM) {
              if (this.isSettingsLayerOpen()) return;
              this.updateBossHPBar(channelKey);
            }
          });
        }, 2e3);
        this._intervals.add(this._hpBarRestoreInterval);
      },
      stopHPBarRestoration() {
        if (this._hpBarRestoreInterval) {
          clearInterval(this._hpBarRestoreInterval);
          this._intervals.delete(this._hpBarRestoreInterval);
          this._hpBarRestoreInterval = null;
        }
      },
      startVisibilityTracking() {
        if (this._visibilityChangeHandler) return;
        this._isWindowVisible = !document.hidden;
        this._visibilityChangeHandler = () => {
          const wasVisible = this._isWindowVisible;
          this._isWindowVisible = !document.hidden;
          if (this._isWindowVisible === wasVisible) return;
          if (this._visibilityDebounceTimer) {
            clearTimeout(this._visibilityDebounceTimer);
            this._visibilityDebounceTimer = null;
          }
          if (!this._isWindowVisible) {
            this.debugLog("PERF", "Discord window hidden - pausing dungeon processing");
            this.pauseAllDungeonProcessing();
          } else {
            this._visibilityDebounceTimer = this._setTrackedTimeout(() => {
              this._visibilityDebounceTimer = null;
              if (!document.hidden) {
                if (this._windowHiddenTime && this._pausedIntervals.size > 0) {
                  this.debugLog("PERF", "Discord window visible - simulating elapsed time and resuming");
                }
                this.resumeDungeonProcessingWithSimulation();
              }
            }, 500);
          }
        };
        document.addEventListener("visibilitychange", this._visibilityChangeHandler);
        this._listeners.set("visibility_doc", { target: document, event: "visibilitychange", handler: this._visibilityChangeHandler });
      },
      stopVisibilityTracking() {
        if (this._visibilityDebounceTimer) {
          clearTimeout(this._visibilityDebounceTimer);
          this._visibilityDebounceTimer = null;
        }
        if (this._visibilityChangeHandler) {
          document.removeEventListener("visibilitychange", this._visibilityChangeHandler);
          this._visibilityChangeHandler = null;
          this._listeners.delete("visibility_doc");
        }
        this._isWindowVisible = true;
      },
      isWindowVisible() {
        return this._isWindowVisible;
      },
      pauseAllDungeonProcessing() {
        this._pausedIntervals.clear();
        this.activeDungeons.forEach((dungeon, channelKey) => {
          if (dungeon.completed || dungeon.failed) return;
          const pausedState = {
            shadow: this.shadowAttackIntervals.has(channelKey),
            boss: this.bossAttackTimers.has(channelKey),
            mob: this.mobAttackTimers.has(channelKey),
            lastShadowTime: this._lastShadowAttackTime.get(channelKey) || Date.now(),
            lastBossTime: this._lastBossAttackTime.get(channelKey) || Date.now(),
            lastMobTime: this._lastMobAttackTime.get(channelKey) || Date.now()
          };
          this.stopShadowAttacks(channelKey);
          this.stopBossAttacks(channelKey);
          this.stopMobAttacks(channelKey);
          this._pausedIntervals.set(channelKey, pausedState);
        });
        const pausedCount = this._pausedIntervals.size;
        this._windowHiddenTime = pausedCount > 0 ? Date.now() : null;
        this.debugLog("PERF", `Paused ${pausedCount} dungeon(s)`);
      },
      async resumeDungeonProcessingWithSimulation() {
        if (!this._windowHiddenTime) {
          this.resumeAllDungeonProcessing();
          return;
        }
        if (this._pausedIntervals.size === 0) {
          this.resumeAllDungeonProcessing();
          this._windowHiddenTime = null;
          return;
        }
        const elapsedTime = Date.now() - this._windowHiddenTime;
        this.debugLog("PERF", `Simulating ${Math.floor(elapsedTime / 1e3)}s of dungeon combat`);
        for (const [channelKey, pausedState] of this._pausedIntervals.entries()) {
          const dungeon = this._getActiveDungeon(channelKey);
          if (!dungeon) continue;
          if (!dungeon.shadowsDeployed) continue;
          const hadAnyCombatTimer = Boolean(pausedState == null ? void 0 : pausedState.shadow) || Boolean(pausedState == null ? void 0 : pausedState.boss) || Boolean(pausedState == null ? void 0 : pausedState.mob);
          if (!hadAnyCombatTimer) continue;
          try {
            await this.simulateDungeonCombat(channelKey, elapsedTime, pausedState);
          } catch (error) {
            this.errorLog("CRITICAL", "Error simulating dungeon combat", { channelKey, error });
          }
        }
        this.resumeAllDungeonProcessing();
        this._windowHiddenTime = null;
        this._pausedIntervals.clear();
      },
      async simulateShadowAttacks(channelKey, cycles, attackIntervalMs = 3e3) {
        var _a, _b, _c;
        const dungeon = this._getActiveDungeon(channelKey);
        if (!dungeon) return;
        const shadowHP = dungeon.shadowHP || (dungeon.shadowHP = /* @__PURE__ */ new Map());
        const deadShadows = this.deadShadows.get(channelKey) || /* @__PURE__ */ new Set();
        const assignedShadows = this.shadowAllocations.get(channelKey) || [];
        const aliveShadows = this.getCombatReadyShadows(assignedShadows, deadShadows, shadowHP);
        if (aliveShadows.length === 0) return;
        const { weights: contributionWeights, totalWeight: contributionTotalWeight } = this._buildShadowContributionWeights(aliveShadows);
        const bossStats = {
          strength: dungeon.boss.strength,
          agility: dungeon.boss.agility,
          intelligence: dungeon.boss.intelligence,
          vitality: dungeon.boss.vitality
        };
        let totalBossDamage = 0;
        const sampleSize = Math.min(10, aliveShadows.length);
        for (let i = 0; i < sampleSize; i++) {
          const shadow = aliveShadows[i];
          const shadowDamage = this.calculateShadowDamage(shadow, bossStats, dungeon.boss.rank);
          totalBossDamage += shadowDamage;
        }
        const avgBossDamagePerShadow = totalBossDamage / sampleSize;
        const avgMobDamagePerShadow = avgBossDamagePerShadow * 0.7;
        let aliveMobCount = 0;
        if ((_a = dungeon.mobs) == null ? void 0 : _a.activeMobs) {
          for (const mob of dungeon.mobs.activeMobs) {
            mob && mob.hp > 0 && aliveMobCount++;
          }
        }
        const hasMobs = aliveMobCount > 0;
        const bossUnlocked = this.isBossGateUnlocked(dungeon);
        const bossAlive = (((_b = dungeon.boss) == null ? void 0 : _b.hp) || 0) > 0 && bossUnlocked;
        const bossShare = bossAlive && hasMobs ? this.getShadowBossTargetChance({ dungeon, aliveMobs: aliveMobCount, bossUnlocked }) : bossAlive ? 1 : 0;
        const mobShare = hasMobs ? 1 - bossShare : 0;
        const shadowsPerCycle = Math.floor(aliveShadows.length * 0.5);
        const totalBossDamageOverTime = Math.floor(
          avgBossDamagePerShadow * shadowsPerCycle * cycles * bossShare
        );
        const totalMobDamageOverTime = Math.floor(
          avgMobDamagePerShadow * shadowsPerCycle * cycles * mobShare
        );
        if (totalBossDamageOverTime > 0) {
          this._distributeWeightedShadowContribution(
            dungeon,
            contributionWeights,
            contributionTotalWeight,
            "bossDamage",
            totalBossDamageOverTime
          );
          const maxBossDamageApplications = 20;
          const numBossDamageApplications = Math.min(cycles, maxBossDamageApplications);
          const baseDamagePerApplication = Math.floor(totalBossDamageOverTime / numBossDamageApplications);
          let remainingBossDamage = totalBossDamageOverTime;
          const catchUpStartNow = Date.now();
          const simulatedChunkSpanMs = numBossDamageApplications > 0 ? attackIntervalMs * cycles / numBossDamageApplications : 0;
          for (let i = 0; i < numBossDamageApplications; i++) {
            const isLastApplication = i === numBossDamageApplications - 1;
            const damageThisApplication = isLastApplication ? remainingBossDamage : baseDamagePerApplication;
            remainingBossDamage -= damageThisApplication;
            if (damageThisApplication <= 0) continue;
            const simulatedNow = catchUpStartNow + i * simulatedChunkSpanMs;
            await this.applyDamageToBoss(channelKey, damageThisApplication, "shadow-simulated", null, false, simulatedNow);
            const liveDungeon = this._getActiveDungeon(channelKey);
            if (!liveDungeon || liveDungeon.completed || liveDungeon.failed || liveDungeon.boss.hp <= 0) {
              return;
            }
          }
          if (dungeon.boss._phaseShieldExpiresAt) {
            dungeon.boss._phaseShieldExpiresAt = Math.min(dungeon.boss._phaseShieldExpiresAt, Date.now());
          }
        }
        if (totalMobDamageOverTime > 0 && ((_c = dungeon.mobs) == null ? void 0 : _c.activeMobs)) {
          let aliveCount = 0;
          for (const mob of dungeon.mobs.activeMobs) {
            mob && mob.hp > 0 && aliveCount++;
          }
          if (aliveCount > 0) {
            const damagePerMob = Math.floor(totalMobDamageOverTime / aliveCount);
            const nextActiveMobs = [];
            let simulatedMobKills = 0;
            for (const mob of dungeon.mobs.activeMobs) {
              if (!mob || mob.hp <= 0) continue;
              mob.hp = Math.max(0, mob.hp - damagePerMob);
              if (mob.hp > 0) nextActiveMobs.push(mob);
              else {
                this._onMobKilled(channelKey, dungeon, mob.rank);
                this._addToCorpsePile(channelKey, mob, false);
                simulatedMobKills++;
              }
            }
            dungeon.mobs.activeMobs = nextActiveMobs;
            if (simulatedMobKills > 0) {
              this._distributeWeightedShadowContribution(
                dungeon,
                contributionWeights,
                contributionTotalWeight,
                "mobsKilled",
                simulatedMobKills
              );
            }
          }
        }
        this._pruneShadowMobContributionLedger(dungeon);
        if (!dungeon.combatAnalytics) dungeon.combatAnalytics = {};
        dungeon.combatAnalytics.totalBossDamage = (dungeon.combatAnalytics.totalBossDamage || 0) + totalBossDamageOverTime;
        dungeon.combatAnalytics.totalMobDamage = (dungeon.combatAnalytics.totalMobDamage || 0) + totalMobDamageOverTime;
      },
      async simulateBossAttacks(channelKey, cycles) {
        var _a, _b, _c, _d, _e;
        const dungeon = this._getActiveDungeon(channelKey);
        if (!dungeon || dungeon.boss.hp <= 0 && !dungeon.boss._isSentinel) return;
        const bossRole = this.ensureMonsterRole(dungeon.boss);
        const bossUnlocked = this.isBossGateUnlocked(dungeon);
        if (!bossUnlocked) return;
        const shadowHP = dungeon.shadowHP || (dungeon.shadowHP = /* @__PURE__ */ new Map());
        const deadShadows = this.deadShadows.get(channelKey) || /* @__PURE__ */ new Set();
        const assignedShadows = this.shadowAllocations.get(channelKey) || [];
        const aliveShadows = this.getCombatReadyShadows(assignedShadows, deadShadows, shadowHP);
        const bossStats = {
          strength: dungeon.boss.strength,
          agility: dungeon.boss.agility,
          intelligence: dungeon.boss.intelligence,
          vitality: dungeon.boss.vitality
        };
        const maxTargetsPerAttack = Dungeons3.RANK_MULTIPLIERS[(_a = dungeon.boss) == null ? void 0 : _a.rank] || 1;
        const roleCombatContext = this.getRoleCombatTickContext(channelKey);
        const _domainMitigation = ((_c = (_b = this.soloLevelingStats) == null ? void 0 : _b.settings) == null ? void 0 : _c.rank) === "Shadow Monarch" ? 0.7 : 1;
        const incomingDamageMultiplier = this.getRoleCombatIncomingDamageMultiplier(channelKey, roleCombatContext) * _domainMitigation;
        let totalShadowDamage = 0;
        let totalUserDamage = 0;
        if (aliveShadows.length > 0) {
          const sampleShadow = aliveShadows[Math.floor(aliveShadows.length / 2)];
          const shadowStats = this.buildShadowStats(sampleShadow);
          const shadowRank = sampleShadow.rank || "E";
          const shadowRole = sampleShadow.role || sampleShadow.roleName || sampleShadow.ro || this.normalizeShadowRoleKey(sampleShadow.type);
          const avgShadowDamage = this.calculateBossDamageToShadow(
            bossStats,
            shadowStats,
            dungeon.boss.rank,
            shadowRank,
            bossRole,
            shadowRole,
            dungeon.boss.beastFamily
          );
          const targetsPerAttack = Math.min(maxTargetsPerAttack, aliveShadows.length);
          totalShadowDamage = Math.floor(
            avgShadowDamage * targetsPerAttack * cycles * incomingDamageMultiplier
          );
        } else if (dungeon.userParticipating) {
          const userStats = this.getUserEffectiveStats();
          const userRank = ((_e = (_d = this.soloLevelingStats) == null ? void 0 : _d.settings) == null ? void 0 : _e.rank) || "E";
          const avgUserDamage = this.calculateBossDamageToUser(
            bossStats,
            userStats,
            dungeon.boss.rank,
            userRank,
            bossRole,
            dungeon.boss.beastFamily
          );
          totalUserDamage = Math.floor(avgUserDamage * cycles * incomingDamageMultiplier);
        }
        if (totalShadowDamage > 0 && aliveShadows.length > 0) {
          const damagePerShadow = Math.floor(totalShadowDamage / aliveShadows.length);
          aliveShadows.forEach((shadow) => {
            const shadowId = this.getShadowIdValue(shadow);
            const hpData = shadowId ? shadowHP.get(shadowId) : null;
            if (hpData) {
              hpData.hp = Math.max(0, hpData.hp - damagePerShadow);
              shadowHP.set(shadowId, hpData);
            }
          });
        }
        if (totalUserDamage > 0 && dungeon.userParticipating) {
          const adjustedUserDamage = this.applyStatusAdjustedIncomingDamage(
            channelKey,
            "user",
            "user",
            totalUserDamage,
            Date.now()
          );
          this.syncHPFromStats();
          this.settings.userHP = this._applyUserHpFloor(this.settings.userHP - adjustedUserDamage);
          this.pushHPToStats(true);
          this.startRegeneration();
          if (Number(this.settings.userHP) > 0) {
            this.applyEnemyCombatStatusEffects({
              channelKey,
              attacker: dungeon.boss,
              attackerType: "boss",
              attacksInSpan: cycles,
              targetType: "user",
              targetId: "user",
              now: Date.now()
            });
          }
          if (this.settings.userHP <= 0) {
            await this.handleUserDefeat(channelKey);
          }
        }
        dungeon.boss.lastAttackTime = Date.now();
      },
      async simulateMobAttacks(channelKey, cycles) {
        var _a, _b, _c, _d;
        const dungeon = this._getActiveDungeon(channelKey);
        if (!dungeon || !((_a = dungeon.mobs) == null ? void 0 : _a.activeMobs)) return;
        const shadowHP = dungeon.shadowHP || (dungeon.shadowHP = /* @__PURE__ */ new Map());
        const deadShadows = this.deadShadows.get(channelKey) || /* @__PURE__ */ new Set();
        const assignedShadows = this.shadowAllocations.get(channelKey) || [];
        const aliveShadows = this.getCombatReadyShadows(assignedShadows, deadShadows, shadowHP);
        let aliveMobCount = 0;
        const sampleMobs = [];
        for (const mob of dungeon.mobs.activeMobs) {
          if (!mob || mob.hp <= 0) continue;
          aliveMobCount++;
          sampleMobs.length < 10 && sampleMobs.push(mob);
        }
        if (aliveMobCount === 0) return;
        const sampleSize = sampleMobs.length;
        let totalShadowDamage = 0;
        let totalUserDamage = 0;
        if (aliveShadows.length > 0) {
          const sampleShadow = aliveShadows[Math.floor(aliveShadows.length / 2)];
          const shadowStats = this.buildShadowStats(sampleShadow);
          const shadowRank = sampleShadow.rank || "E";
          for (const mob of sampleMobs) {
            const mobRole = this.ensureMonsterRole(mob);
            const mobStats = {
              strength: mob.strength,
              agility: mob.agility,
              intelligence: mob.intelligence,
              vitality: mob.vitality
            };
            const shadowRole = sampleShadow.role || sampleShadow.roleName || sampleShadow.ro || this.normalizeShadowRoleKey(sampleShadow.type);
            const avgShadowDamage = this.calculateMobDamageToShadow(
              mobStats,
              shadowStats,
              mob.rank,
              shadowRank,
              mobRole,
              shadowRole,
              mob.beastFamily
            );
            totalShadowDamage += avgShadowDamage;
          }
          const avgShadowDamagePerMob = totalShadowDamage / sampleSize;
          totalShadowDamage = Math.floor(avgShadowDamagePerMob * aliveMobCount * cycles);
        } else if (dungeon.userParticipating) {
          const userStats = this.getUserEffectiveStats();
          const userRank = ((_c = (_b = this.soloLevelingStats) == null ? void 0 : _b.settings) == null ? void 0 : _c.rank) || "E";
          for (const mob of sampleMobs) {
            const mobRole = this.ensureMonsterRole(mob);
            const mobStats = {
              strength: mob.strength,
              agility: mob.agility,
              intelligence: mob.intelligence,
              vitality: mob.vitality
            };
            const avgUserDamage = this.calculateMobDamageToUser(
              mobStats,
              userStats,
              mob.rank,
              userRank,
              mobRole,
              mob.beastFamily
            );
            totalUserDamage += avgUserDamage;
          }
          const avgUserDamagePerMob = totalUserDamage / sampleSize;
          totalUserDamage = Math.floor(avgUserDamagePerMob * aliveMobCount * cycles);
        }
        if (totalShadowDamage > 0 && aliveShadows.length > 0) {
          const damagePerShadow = Math.floor(totalShadowDamage / aliveShadows.length);
          aliveShadows.forEach((shadow) => {
            const shadowId = this.getShadowIdValue(shadow);
            const hpData = shadowId ? shadowHP.get(shadowId) : null;
            if (hpData) {
              hpData.hp = Math.max(0, hpData.hp - damagePerShadow);
              shadowHP.set(shadowId, hpData);
            }
          });
        }
        if (totalUserDamage > 0 && dungeon.userParticipating) {
          const adjustedUserDamage = this.applyStatusAdjustedIncomingDamage(
            channelKey,
            "user",
            "user",
            totalUserDamage,
            Date.now()
          );
          this.syncHPFromStats();
          this.settings.userHP = this._applyUserHpFloor(this.settings.userHP - adjustedUserDamage);
          this.pushHPToStats(true);
          this.startRegeneration();
          const representativeMob = sampleMobs[0] || null;
          if (representativeMob && Number(this.settings.userHP) > 0) {
            this.applyEnemyCombatStatusEffects({
              channelKey,
              attacker: representativeMob,
              attackerType: "mob",
              attacksInSpan: aliveMobCount * cycles,
              targetType: "user",
              targetId: "user",
              now: Date.now()
            });
          }
          if (this.settings.userHP <= 0) {
            await this.handleUserDefeat(channelKey);
          }
        }
        if ((_d = dungeon.mobs) == null ? void 0 : _d.activeMobs) {
          const now = Date.now();
          dungeon.mobs.activeMobs.forEach((mob) => {
            if (mob && mob.hp > 0) {
              mob.lastAttackTime = now;
            }
          });
        }
      },
      resumeAllDungeonProcessing() {
        this.activeDungeons.forEach((dungeon, channelKey) => {
          if (!dungeon || dungeon.completed || dungeon.failed || dungeon._completing) {
            this.shadowAttackIntervals.has(channelKey) && this.stopShadowAttacks(channelKey);
            this.bossAttackTimers.has(channelKey) && this.stopBossAttacks(channelKey);
            this.mobAttackTimers.has(channelKey) && this.stopMobAttacks(channelKey);
            return;
          }
          if (!dungeon.shadowsDeployed) {
            this.shadowAttackIntervals.has(channelKey) && this.stopShadowAttacks(channelKey);
            this.bossAttackTimers.has(channelKey) && this.stopBossAttacks(channelKey);
            this.mobAttackTimers.has(channelKey) && this.stopMobAttacks(channelKey);
            return;
          }
          const pausedState = this._pausedIntervals.get(channelKey);
          if (pausedState) {
            if (pausedState.shadow) this.startShadowAttacks(channelKey);
            if (pausedState.boss) this.startBossAttacks(channelKey);
            if (pausedState.mob) this.startMobAttacks(channelKey);
          }
          dungeon.shadowsDeployed && this.ensureDeployedSpawnPipeline(channelKey, "resume_visibility");
        });
        this._pausedIntervals.clear();
      },
      async simulateDungeonCombat(channelKey, elapsedTime, pausedState) {
        const dungeon = this._getActiveDungeon(channelKey);
        if (!dungeon || !dungeon.shadowsDeployed || dungeon.boss.hp <= 0 && !dungeon.boss._isSentinel) return;
        this.syncHPAndManaFromStats();
        const shadowInterval = 3e3;
        const bossInterval = 1e3;
        const mobInterval = 1e3;
        const shadowCycles = Math.floor(elapsedTime / shadowInterval);
        const bossCycles = Math.floor(elapsedTime / bossInterval);
        const mobCycles = Math.floor(elapsedTime / mobInterval);
        if (shadowCycles > 0) {
          await this.simulateShadowAttacks(channelKey, shadowCycles, shadowInterval);
          const postShadowDungeon = this._getActiveDungeon(channelKey);
          if (!postShadowDungeon || postShadowDungeon.completed || postShadowDungeon.failed) return;
        }
        if (bossCycles > 0) {
          await this.simulateBossAttacks(channelKey, bossCycles);
        }
        if (mobCycles > 0) {
          await this.simulateMobAttacks(channelKey, mobCycles);
        }
        this._lastShadowAttackTime.set(channelKey, Date.now());
        this._lastBossAttackTime.set(channelKey, Date.now());
        this._lastMobAttackTime.set(channelKey, Date.now());
        this.saveSettings();
        if (this.isWindowVisible()) {
          this.updateBossHPBar(channelKey);
        }
        this.debugLog(
          "PERF",
          `Simulated ${shadowCycles} shadow, ${bossCycles} boss, ${mobCycles} mob cycles for ${channelKey} (${Math.floor(
            elapsedTime / 1e3
          )}s elapsed)`
        );
      },
      queueHPBarUpdate(channelKey) {
        if (!this._hpBarUpdateQueue) this._hpBarUpdateQueue = /* @__PURE__ */ new Set();
        if (!this._lastHPBarUpdate) this._lastHPBarUpdate = {};
        const now = Date.now();
        const lastUpdate = this._lastHPBarUpdate[channelKey] || 0;
        if (now - lastUpdate < 250) {
          this._hpBarUpdateQueue.add(channelKey);
        } else {
          this._lastHPBarUpdate[channelKey] = now;
          this.updateBossHPBar(channelKey);
        }
        if (!this._hpBarUpdateScheduled && this._hpBarUpdateQueue.size > 0) {
          this._hpBarUpdateScheduled = true;
          this._hpBarUpdateTimer = this._setTrackedTimeout(() => {
            this._hpBarUpdateTimer = null;
            this.processHPBarUpdateQueue();
          }, 250);
        }
      },
      processHPBarUpdateQueue() {
        if (!this._hpBarUpdateQueue || this._hpBarUpdateQueue.size === 0) {
          this._hpBarUpdateScheduled = false;
          return;
        }
        const now = Date.now();
        const queued = this._hpBarUpdateQueue;
        this._hpBarUpdateQueue = /* @__PURE__ */ new Set();
        let earliestRetry = Infinity;
        for (const channelKey of queued) {
          const lastUpdate = this._lastHPBarUpdate[channelKey] || 0;
          const elapsed = now - lastUpdate;
          if (elapsed >= 250) {
            this._lastHPBarUpdate[channelKey] = now;
            this.updateBossHPBar(channelKey);
          } else {
            this._hpBarUpdateQueue.add(channelKey);
            const remaining = 250 - elapsed;
            if (remaining < earliestRetry) earliestRetry = remaining;
          }
        }
        if (this._hpBarUpdateQueue.size > 0) {
          this._hpBarUpdateTimer = this._setTrackedTimeout(() => {
            this._hpBarUpdateTimer = null;
            this.processHPBarUpdateQueue();
          }, earliestRetry);
        } else {
          this._hpBarUpdateScheduled = false;
        }
      },
      setupChannelWatcher() {
        var _a, _b;
        let lastChannelKey = null;
        let checkScheduled = false;
        let lastIndicatorRefreshAt = 0;
        const checkChannel = () => {
          var _a2, _b2, _c, _d;
          const channelInfo = this.getChannelInfo() || this.getChannelInfoFromLocation();
          if (!channelInfo) return;
          const currentChannelKey = `${channelInfo.guildId}_${channelInfo.channelId}`;
          if (currentChannelKey !== lastChannelKey) {
            const prevChannelKey = lastChannelKey;
            lastChannelKey = currentChannelKey;
            this.currentChannelKey = currentChannelKey;
            this.validateActiveDungeonStatus();
            this.removeAllBossHPBars();
            (_b2 = (_a2 = this._bossBarCache) == null ? void 0 : _a2.clear) == null ? void 0 : _b2.call(_a2);
            (_c = this.ensureBossHpBarCssInjected) == null ? void 0 : _c.call(this);
            this.updateAllIndicators();
            this.activeDungeons.forEach((dungeon, channelKey) => {
              if (!dungeon || dungeon.completed || dungeon.failed) return;
              if (!dungeon.shadowsDeployed) {
                this.shadowAttackIntervals.has(channelKey) && this.stopShadowAttacks(channelKey);
                this.bossAttackTimers.has(channelKey) && this.stopBossAttacks(channelKey);
                this.mobAttackTimers.has(channelKey) && this.stopMobAttacks(channelKey);
                return;
              }
              const wasActive = dungeon.userParticipating || prevChannelKey === channelKey;
              const isNowActive = dungeon.userParticipating || currentChannelKey === channelKey;
              if (wasActive === isNowActive) return;
              this.shadowAttackIntervals.has(channelKey) && (this.stopShadowAttacks(channelKey), this.startShadowAttacks(channelKey));
              this.bossAttackTimers.has(channelKey) && (this.stopBossAttacks(channelKey), this.startBossAttacks(channelKey));
              this.mobAttackTimers.has(channelKey) && (this.stopMobAttacks(channelKey), this.startMobAttacks(channelKey));
            });
            this.activeDungeons.forEach((dungeon, channelKey) => {
              if (!dungeon || dungeon.completed || dungeon.failed || !dungeon.shadowsDeployed) return;
              this.ensureDeployedSpawnPipeline(channelKey, "channel_switch");
            });
            this.activeDungeons.forEach((dungeon, channelKey) => {
              const isCurrentChannel = (dungeon == null ? void 0 : dungeon.channelId) === channelInfo.channelId && (dungeon == null ? void 0 : dungeon.guildId) === channelInfo.guildId;
              isCurrentChannel && this.updateBossHPBar(channelKey);
            });
            const currentDungeon = this.activeDungeons.get(currentChannelKey);
            if (currentDungeon) {
              this._hpBarUpdateQueue || (this._hpBarUpdateQueue = /* @__PURE__ */ new Set());
              this._hpBarUpdateQueue.add(currentChannelKey);
              (_d = this.processHPBarUpdateQueue) == null ? void 0 : _d.call(this);
            }
          }
          const now = Date.now();
          if (this.activeDungeons && this.activeDungeons.size > 0 && now - lastIndicatorRefreshAt >= 2e3) {
            this.updateAllIndicators();
            lastIndicatorRefreshAt = now;
          }
        };
        const scheduleCheckChannel = () => {
          if (checkScheduled) return;
          checkScheduled = true;
          this._setTrackedTimeout(() => {
            checkScheduled = false;
            checkChannel();
          }, 150);
        };
        checkChannel();
        if (_PluginUtils == null ? void 0 : _PluginUtils.NavigationBus) {
          this._navBusUnsub = _PluginUtils.NavigationBus.subscribe(() => scheduleCheckChannel());
        }
        this.channelWatcher = {};
        try {
          const SelectedChannelStore = (_b = (_a = BdApi.Webpack).getStore) == null ? void 0 : _b.call(_a, "SelectedChannelStore");
          if (SelectedChannelStore && typeof SelectedChannelStore.addChangeListener === "function") {
            this._channelWatcherStoreListener = () => {
              if (!this.isWindowVisible()) return;
              if (!this.activeDungeons || this.activeDungeons.size === 0) return;
              scheduleCheckChannel();
            };
            SelectedChannelStore.addChangeListener(this._channelWatcherStoreListener);
            this._channelWatcherStore = SelectedChannelStore;
          }
        } catch (_) {
        }
      },
      stopChannelWatcher() {
        this.channelWatcher = null;
        if (this._channelWatcherStore && this._channelWatcherStoreListener) {
          try {
            this._channelWatcherStore.removeChangeListener(this._channelWatcherStoreListener);
          } catch (_) {
          }
          this._channelWatcherStore = null;
          this._channelWatcherStoreListener = null;
        }
        if (this._navBusUnsub) {
          this._navBusUnsub();
          this._navBusUnsub = null;
        }
      },
      updateAllIndicators() {
        this.activeDungeons.forEach((dungeon, channelKey) => {
          if (dungeon.completed || dungeon.failed) return;
          const cached = this.dungeonIndicators.get(channelKey);
          if ((cached == null ? void 0 : cached.isConnected) && cached.hasAttribute("data-dungeon-active")) return;
          const channelInfo = { channelId: dungeon.channelId, guildId: dungeon.guildId };
          this.removeDungeonIndicator(channelKey);
          this.showDungeonIndicator(channelKey, channelInfo);
        });
      }
    };
  }
});

// src/Dungeons/notifications-cleanup.js
var require_notifications_cleanup = __commonJS({
  "src/Dungeons/notifications-cleanup.js"(exports2, module2) {
    module2.exports = {
      startMobKillNotifications(channelKey) {
        this._mobKillChannels || (this._mobKillChannels = /* @__PURE__ */ new Set());
        this._mobKillChannels.add(channelKey);
        if (!this._mobKillGlobalTimer) {
          this._mobKillGlobalTimer = setInterval(() => {
            if (!this.isWindowVisible()) return;
            if (!this._mobKillChannels || this._mobKillChannels.size === 0) {
              clearInterval(this._mobKillGlobalTimer);
              this._mobKillGlobalTimer = null;
              return;
            }
            this._mobKillChannels.forEach((ck) => this.showMobKillSummary(ck));
          }, Math.max(1e3, this.settings.mobKillNotificationInterval || 1e4));
          this._intervals.add(this._mobKillGlobalTimer);
        }
      },
      stopMobKillNotifications(channelKey) {
        if (this._mobKillChannels) this._mobKillChannels.delete(channelKey);
        if (this._mobKillChannels && this._mobKillChannels.size === 0 && this._mobKillGlobalTimer) {
          clearInterval(this._mobKillGlobalTimer);
          this._intervals.delete(this._mobKillGlobalTimer);
          this._mobKillGlobalTimer = null;
        }
      },
      stopAllDungeonCleanup() {
        if (this._mobKillChannels) this._mobKillChannels.clear();
        if (this._mobKillGlobalTimer) {
          clearInterval(this._mobKillGlobalTimer);
          this._intervals.delete(this._mobKillGlobalTimer);
          this._mobKillGlobalTimer = null;
        }
        this.stopAllMobSpawning();
        if (this.dungeonCleanupInterval) {
          clearInterval(this.dungeonCleanupInterval);
          this._intervals.delete(this.dungeonCleanupInterval);
          this.dungeonCleanupInterval = null;
        }
      },
      showMobKillSummary(channelKey) {
        const notification = this.settings.mobKillNotifications[channelKey];
        if (!notification || notification.count === 0) return;
        const dungeon = this.activeDungeons.get(channelKey);
        if (!dungeon) return;
        notification.count = 0;
        notification.lastNotification = Date.now();
      },
      startDungeonCleanupLoop() {
        if (this.dungeonCleanupInterval) return;
        this.dungeonCleanupInterval = setInterval(() => {
          if (document.hidden) return;
          this.cleanupExpiredDungeons();
        }, 6e4);
        this._intervals.add(this.dungeonCleanupInterval);
      },
      cleanupExpiredDungeons() {
        var _a, _b, _c;
        const now = Date.now();
        const expiredChannels = [];
        const NEVER_ENGAGED_EXPIRY_MS = 6e4;
        const DISENGAGED_EXPIRY_MS = 18e4;
        this.activeDungeons.forEach((dungeon, channelKey) => {
          if (dungeon.completed || dungeon.failed) return;
          if (dungeon._completing) {
            const strandedAge = now - (dungeon._completingStartedAt || now);
            if (strandedAge > 3e4) {
              dungeon._completing = false;
              expiredChannels.push(channelKey);
            }
            return;
          }
          if (dungeon.shadowsDeployed || dungeon.userParticipating) {
            dungeon._idleSince = null;
            return;
          }
          if (!dungeon._idleSince) {
            dungeon._idleSince = now;
          }
          const wasEverEngaged = dungeon.deployedAt != null;
          const expiryMs = wasEverEngaged ? DISENGAGED_EXPIRY_MS : NEVER_ENGAGED_EXPIRY_MS;
          if (now - dungeon._idleSince >= expiryMs) {
            expiredChannels.push(channelKey);
          }
        });
        expiredChannels.forEach((channelKey) => {
          this.completeDungeon(channelKey, "timeout");
        });
        if (this.defeatedBosses && this.defeatedBosses.size > 0) {
          const expiredBossKeys = [];
          for (const [channelKey, bossData] of this.defeatedBosses.entries()) {
            const ts = (bossData == null ? void 0 : bossData.timestamp) || 0;
            now - ts >= 5 * 60 * 1e3 && expiredBossKeys.push(channelKey);
          }
          const MAX_BOSS_CLEANUPS_PER_TICK = 3;
          expiredBossKeys.slice(0, MAX_BOSS_CLEANUPS_PER_TICK).forEach((channelKey) => {
            this.cleanupDefeatedBoss(channelKey);
          });
        }
        const cooldownRaw = Number((_a = this.settings) == null ? void 0 : _a.channelSpawnCooldown);
        const pruneAgeMs = Number.isFinite(cooldownRaw) && cooldownRaw > 0 ? cooldownRaw : 36e5;
        [(_b = this.settings) == null ? void 0 : _b.lastSpawnTime, (_c = this.settings) == null ? void 0 : _c.lastDungeonEndTime].forEach((map) => {
          if (!map || typeof map !== "object") return;
          for (const channelKey of Object.keys(map)) {
            const ts = Number(map[channelKey]);
            if (!Number.isFinite(ts) || now - ts >= pruneAgeMs) {
              delete map[channelKey];
            }
          }
        });
      }
    };
  }
});

// src/shared/toast.js
var require_toast = __commonJS({
  "src/shared/toast.js"(exports2, module2) {
    function createToast() {
      return (message, type = "info", timeout) => {
        const opts = { type: type === "level-up" ? "info" : type };
        if (typeof timeout === "number" && timeout > 0) opts.timeout = timeout;
        BdApi.UI.showToast(message, opts);
      };
    }
    module2.exports = { createToast };
  }
});

// src/Dungeons/restore-gc-toast.js
var require_restore_gc_toast = __commonJS({
  "src/Dungeons/restore-gc-toast.js"(exports2, module2) {
    var C2 = require_constants();
    module2.exports = {
      async restoreActiveDungeons() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m;
        if (!this.storageManager) return;
        if (this._restoringDungeons) return;
        this._restoringDungeons = true;
        const orphans = document.querySelectorAll(".dungeon-boss-hp-bar, .dungeon-boss-hp-container");
        if (orphans.length > 0) {
          orphans.forEach((el) => el.remove());
          this.debugLog(`Cleaned up ${orphans.length} orphaned HP bars from previous session`);
        }
        try {
          const savedDungeons = await this.storageManager.getAllDungeons();
          if (this.settings.userActiveDungeon) {
            const activeDungeonExists = savedDungeons.some(
              (d) => d.channelKey === this.settings.userActiveDungeon && !d.completed && !d.failed
            );
            if (!activeDungeonExists) {
              this.settings.userActiveDungeon = null;
              this.saveSettings();
              this.debugLog("Cleared stale userActiveDungeon reference on restore");
            }
          }
          if (!this.started) {
            (_a = this.debugLog) == null ? void 0 : _a.call(this, "restoreActiveDungeons aborted \u2014 plugin stopped during IDB read");
            return;
          }
          savedDungeons.forEach((dungeon) => {
            var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j2, _k2, _l2, _m2, _n;
            try {
              const elapsed = Date.now() - dungeon.startTime;
              if (elapsed < this.settings.dungeonDuration && !dungeon.completed && !dungeon.failed) {
                if (!dungeon.mobs || typeof dungeon.mobs !== "object") {
                  dungeon.mobs = {
                    total: 0,
                    remaining: 0,
                    killed: 0,
                    targetCount: 0,
                    spawnRate: 1,
                    activeMobs: [],
                    mobCapacity: 200
                  };
                } else if (!Array.isArray(dungeon.mobs.activeMobs)) {
                  dungeon.mobs.activeMobs = [];
                }
                if (!dungeon.shadowHP) {
                  dungeon.shadowHP = /* @__PURE__ */ new Map();
                } else if (!(dungeon.shadowHP instanceof Map)) {
                  const loaded = dungeon.shadowHP;
                  dungeon.shadowHP = new Map(Object.entries(loaded));
                }
                if (!dungeon.shadowCombatData) {
                  dungeon.shadowCombatData = /* @__PURE__ */ new Map();
                } else if (!(dungeon.shadowCombatData instanceof Map)) {
                  const loaded = dungeon.shadowCombatData;
                  dungeon.shadowCombatData = new Map(Object.entries(loaded));
                }
                if ((_a2 = dungeon.shadowContributions) == null ? void 0 : _a2._packed) {
                  const p = dungeon.shadowContributions;
                  const obj = {};
                  const n = Array.isArray(p.ids) ? p.ids.length : 0;
                  for (let i = 0; i < n; i++) {
                    obj[p.ids[i]] = {
                      mobsKilled: Number((_b2 = p.mobsKilled) == null ? void 0 : _b2[i]) || 0,
                      bossDamage: Number((_c2 = p.bossDamage) == null ? void 0 : _c2[i]) || 0
                    };
                  }
                  dungeon.shadowContributions = obj;
                }
                if (!Array.isArray(dungeon.beastFamilies) || dungeon.beastFamilies.length === 0) {
                  if (Array.isArray((_d2 = dungeon.biome) == null ? void 0 : _d2.beastFamilies) && dungeon.biome.beastFamilies.length > 0) {
                    dungeon.beastFamilies = [...new Set(dungeon.biome.beastFamilies.filter(Boolean))];
                  } else {
                    dungeon.beastFamilies = this.getDefaultBeastFamilies();
                  }
                }
                if (!dungeon.biome || typeof dungeon.biome !== "object") {
                  dungeon.biome = {
                    name: dungeon.type || "Recovered Biome",
                    description: "Recovered legacy dungeon metadata",
                    mobMultiplier: 1,
                    beastFamilies: [...dungeon.beastFamilies]
                  };
                } else if (!Array.isArray(dungeon.biome.beastFamilies) || dungeon.biome.beastFamilies.length === 0) {
                  dungeon.biome.beastFamilies = [...dungeon.beastFamilies];
                }
                if (dungeon.boss && dungeon.rank) {
                  this.ensureMonsterRole(dungeon.boss);
                  const rankIndex = this.findRankIndex(dungeon.rank);
                  if (rankIndex >= 0) {
                    const expectedBossStats = this.calculateBossBaseStats(rankIndex);
                    const {
                      strength: expStr,
                      agility: expAgi,
                      intelligence: expInt,
                      vitality: expVit,
                      perception: expPerception
                    } = expectedBossStats;
                    const bossSpeciesW = ((_e2 = C2.BEAST_STAT_WEIGHTS) == null ? void 0 : _e2[dungeon.boss.beastType]) || { strength: 1, agility: 1, intelligence: 1, vitality: 1 };
                    const range = (bossStatValue, speciesW) => ({
                      min: Math.floor(bossStatValue * Math.min(speciesW, 1) * 0.8),
                      max: Math.ceil(bossStatValue * Math.max(speciesW, 1) * 1.2)
                    });
                    const strRange = range(expStr, bossSpeciesW.strength);
                    const agiRange = range(expAgi, bossSpeciesW.agility);
                    const intRange = range(expInt, bossSpeciesW.intelligence);
                    const vitRange = range(expVit, bossSpeciesW.vitality);
                    const perceptionBase = (expStr + expAgi + expInt) / 3 * 0.5;
                    const perceptionRange = { min: Math.floor(perceptionBase * 0.5), max: Math.ceil(perceptionBase * 2) };
                    if (!dungeon.boss.strength || dungeon.boss.strength < strRange.min || dungeon.boss.strength > strRange.max) {
                      dungeon.boss.strength = this._clampStat(expStr, strRange.min, strRange.max, "boss.strength");
                      if (dungeon.boss.baseStats) dungeon.boss.baseStats.strength = dungeon.boss.strength;
                    }
                    if (!dungeon.boss.agility || dungeon.boss.agility < agiRange.min || dungeon.boss.agility > agiRange.max) {
                      dungeon.boss.agility = this._clampStat(expAgi, agiRange.min, agiRange.max, "boss.agility");
                      if (dungeon.boss.baseStats) dungeon.boss.baseStats.agility = dungeon.boss.agility;
                    }
                    if (!dungeon.boss.intelligence || dungeon.boss.intelligence < intRange.min || dungeon.boss.intelligence > intRange.max) {
                      dungeon.boss.intelligence = this._clampStat(expInt, intRange.min, intRange.max, "boss.intelligence");
                      if (dungeon.boss.baseStats)
                        dungeon.boss.baseStats.intelligence = dungeon.boss.intelligence;
                    }
                    if (!dungeon.boss.vitality || dungeon.boss.vitality < vitRange.min || dungeon.boss.vitality > vitRange.max) {
                      dungeon.boss.vitality = this._clampStat(expVit, vitRange.min, vitRange.max, "boss.vitality");
                      if (dungeon.boss.baseStats) dungeon.boss.baseStats.vitality = dungeon.boss.vitality;
                    }
                    if (!dungeon.boss.perception || dungeon.boss.perception < perceptionRange.min || dungeon.boss.perception > perceptionRange.max) {
                      dungeon.boss.perception = this._clampStat(expPerception, perceptionRange.min, perceptionRange.max, "boss.perception");
                      if (dungeon.boss.baseStats)
                        dungeon.boss.baseStats.perception = dungeon.boss.perception;
                    }
                    const rankBonus = ((_f2 = this._bossHPBonusTable) == null ? void 0 : _f2[rankIndex]) || 0;
                    const staticBossHpMult = this.getStaticBossHpMultiplier(rankIndex);
                    const armyMult = C2.BOSS_HP_ARMY_MULTIPLIER || 8;
                    const correctMaxHP = Math.max(
                      1,
                      Math.floor((100 + expVit * 10 + rankBonus) * staticBossHpMult * armyMult)
                    );
                    if (dungeon.boss.maxHp && dungeon.boss.maxHp > correctMaxHP * 1.15) {
                      const hpRatio = dungeon.boss.hp / dungeon.boss.maxHp;
                      dungeon.boss.maxHp = correctMaxHP;
                      dungeon.boss.hp = Math.max(1, Math.floor(correctMaxHP * hpRatio));
                    }
                  }
                }
                if (dungeon.mobs && dungeon.mobs.activeMobs && Array.isArray(dungeon.mobs.activeMobs)) {
                  dungeon.mobs.activeMobs.forEach((mob) => {
                    var _a3;
                    this.ensureMonsterRole(mob);
                    if (mob.rank) {
                      const mobRankIndex = this.findRankIndex(mob.rank);
                      if (mobRankIndex >= 0) {
                        const expectedMobStats = this.calculateMobBaseStats(mobRankIndex);
                        const mobSpeciesW = ((_a3 = C2.BEAST_STAT_WEIGHTS) == null ? void 0 : _a3[mob.beastType]) || { strength: 1, agility: 1, intelligence: 1, vitality: 1 };
                        const tierMult = mob.mobTier === "champion" ? 1.7 : mob.mobTier === "elite" ? 1.35 : 1;
                        const expectedBaseStrength = expectedMobStats.strength * mobSpeciesW.strength * tierMult;
                        const expectedBaseAgility = expectedMobStats.agility * mobSpeciesW.agility * tierMult;
                        const expectedBaseIntelligence = expectedMobStats.intelligence * mobSpeciesW.intelligence * tierMult;
                        const expectedBaseVitality = expectedMobStats.vitality * mobSpeciesW.vitality * tierMult;
                        const minStrength = expectedBaseStrength * 0.75;
                        const maxStrength = expectedBaseStrength * 1.25;
                        const minAgility = expectedBaseAgility * 0.75;
                        const maxAgility = expectedBaseAgility * 1.25;
                        const minIntelligence = expectedBaseIntelligence * 0.75;
                        const maxIntelligence = expectedBaseIntelligence * 1.25;
                        const minVitality = expectedBaseVitality * 0.75;
                        const maxVitality = expectedBaseVitality * 1.25;
                        if (!mob.strength || mob.strength < minStrength || mob.strength > maxStrength) {
                          const variance = this._varianceWide();
                          mob.strength = Math.floor(expectedBaseStrength * variance);
                          if (mob.baseStats) mob.baseStats.strength = mob.strength;
                        }
                        if (!mob.agility || mob.agility < minAgility || mob.agility > maxAgility) {
                          const variance = this._varianceWide();
                          mob.agility = Math.floor(expectedBaseAgility * variance);
                          if (mob.baseStats) mob.baseStats.agility = mob.agility;
                        }
                        if (!mob.intelligence || mob.intelligence < minIntelligence || mob.intelligence > maxIntelligence) {
                          const variance = this._varianceWide();
                          mob.intelligence = Math.floor(expectedBaseIntelligence * variance);
                          if (mob.baseStats) mob.baseStats.intelligence = mob.intelligence;
                        }
                        if (!mob.vitality || mob.vitality < minVitality || mob.vitality > maxVitality) {
                          const variance = this._varianceWide();
                          mob.vitality = Math.floor(expectedBaseVitality * variance);
                          if (mob.baseStats) mob.baseStats.vitality = mob.vitality;
                          const baseHP = 200 + mob.vitality * 15 + mobRankIndex * 100;
                          const hpVariance = 0.7 + Math.random() * 0.3;
                          const newHP = Math.max(1, Math.floor(baseHP * hpVariance));
                          const prevMaxHp = mob.maxHp || newHP;
                          mob.maxHp = newHP;
                          if (mob.hp > 0 && prevMaxHp) {
                            const hpRatio = mob.hp / prevMaxHp;
                            mob.hp = Math.max(1, Math.floor(newHP * hpRatio));
                          } else {
                            mob.hp = newHP;
                          }
                        }
                      }
                    }
                  });
                }
                delete dungeon._completing;
                dungeon._xpBatchKey = this._resolveDungeonXPBatchKey(dungeon.channelKey, dungeon);
                dungeon.pendingUserMobXP = Number.isFinite(Number(dungeon.pendingUserMobXP)) ? Math.max(0, Math.floor(Number(dungeon.pendingUserMobXP))) : 0;
                dungeon.pendingUserMobKills = Number.isFinite(Number(dungeon.pendingUserMobKills)) ? Math.max(0, Math.floor(Number(dungeon.pendingUserMobKills))) : 0;
                if (dungeon.pendingUserMobXP > 0) {
                  (_g2 = this._pendingDungeonMobXPByBatch) == null ? void 0 : _g2.set(dungeon._xpBatchKey, dungeon.pendingUserMobXP);
                }
                if (dungeon.pendingUserMobKills > 0) {
                  (_h2 = this._pendingDungeonMobKillsByBatch) == null ? void 0 : _h2.set(dungeon._xpBatchKey, dungeon.pendingUserMobKills);
                }
                if (!dungeon.bossGate || typeof dungeon.bossGate !== "object") {
                  dungeon.bossGate = {
                    enabled: ((_i2 = this.settings) == null ? void 0 : _i2.bossGateEnabled) !== false,
                    minDurationMs: this.getBossGateRuntimeConfig(dungeon == null ? void 0 : dungeon.rank, (_j2 = dungeon == null ? void 0 : dungeon.mobs) == null ? void 0 : _j2.mobCapacity).minDurationMs,
                    requiredMobKills: this.getBossGateRuntimeConfig(dungeon == null ? void 0 : dungeon.rank, (_k2 = dungeon == null ? void 0 : dungeon.mobs) == null ? void 0 : _k2.mobCapacity).requiredMobKills,
                    deployedAt: null,
                    unlockedAt: null
                  };
                } else {
                  dungeon.bossGate.minDurationMs = this.getBossGateRuntimeConfig(dungeon == null ? void 0 : dungeon.rank, (_l2 = dungeon == null ? void 0 : dungeon.mobs) == null ? void 0 : _l2.mobCapacity).minDurationMs;
                  dungeon.bossGate.requiredMobKills = this.getBossGateRuntimeConfig(dungeon == null ? void 0 : dungeon.rank, (_m2 = dungeon == null ? void 0 : dungeon.mobs) == null ? void 0 : _m2.mobCapacity).requiredMobKills;
                }
                if (dungeon.shadowsDeployed) {
                  if (!Number.isFinite(dungeon.bossGate.deployedAt) || dungeon.bossGate.deployedAt <= 0) {
                    dungeon.bossGate.deployedAt = Date.now();
                    dungeon.bossGate.unlockedAt = null;
                  }
                  dungeon.deployedAt = dungeon.bossGate.deployedAt;
                } else {
                  dungeon.deployedAt = null;
                  dungeon.bossGate.deployedAt = null;
                  dungeon.bossGate.unlockedAt = null;
                }
                if (((_n = dungeon.mobs) == null ? void 0 : _n.targetCount) && dungeon.mobs.mobCapacity) {
                  const correctCap = Math.floor(Math.max(200, Math.min(2e3, dungeon.mobs.targetCount)));
                  if (dungeon.mobs.mobCapacity < correctCap) {
                    dungeon.mobs.mobCapacity = correctCap;
                  }
                }
                this.activeDungeons.set(dungeon.channelKey, dungeon);
                this.startHPBarRestoration();
                this._ensureDungeonHeaderWidgetLoop();
                const channelInfo = { channelId: dungeon.channelId, guildId: dungeon.guildId };
                this.showDungeonIndicator(dungeon.channelKey, channelInfo);
                return;
              }
              this.debugLog(
                `[Dungeons] Cleaning up expired/old dungeon: ${dungeon.name} [${dungeon.rank}]`
              );
              this.removeBossHPBar(dungeon.channelKey);
              document.querySelectorAll(`.dungeon-boss-hp-container[data-channel-key="${dungeon.channelKey}"]`).forEach((el) => el.remove());
              this.channelLocks.delete(dungeon.channelKey);
              this.shadowAllocations.delete(dungeon.channelKey);
              this._discardPendingDungeonMobXP(this._resolveDungeonXPBatchKey(dungeon.channelKey, dungeon));
              this._markAllocationDirty("restore-cleanup-stale-dungeon");
              this.storageManager.deleteDungeon(dungeon.channelKey);
              this.activeDungeons.delete(dungeon.channelKey);
            } catch (error) {
              this.errorLog("RESTORE", "Failed to restore dungeon record", {
                channelKey: dungeon == null ? void 0 : dungeon.channelKey,
                dungeonName: dungeon == null ? void 0 : dungeon.name,
                error
              });
            }
          });
          if (!this.started) {
            (_b = this.debugLog) == null ? void 0 : _b.call(this, "restoreActiveDungeons aborted \u2014 plugin stopped during dungeon hydration");
            return;
          }
          if (this.activeDungeons.size > 0) {
            this.settings.debug && console.log(`[Dungeons] INIT_TRACE: restoreActiveDungeons \u2014 ${this.activeDungeons.size} dungeons restored`);
            this.debugLog(`Restored ${this.activeDungeons.size} active dungeons`);
            const deployedCount = [...this.activeDungeons.values()].filter((d) => d.shadowsDeployed).length;
            if (deployedCount > 0) {
              this._markAllocationDirty("restore-active-dungeons");
              await this.preSplitShadowArmy();
            }
            for (const [channelKey] of this.activeDungeons) {
              const dg = this.activeDungeons.get(channelKey);
              this.startMobKillNotifications(channelKey);
              this.updateBossHPBar(channelKey);
              if (dg == null ? void 0 : dg.channelId) {
                this.showDungeonIndicator(channelKey, { channelId: dg.channelId, guildId: dg.guildId });
              }
              if (dg == null ? void 0 : dg.shadowsDeployed) {
                if (this.settings.debug) {
                  const allocCount = (this.shadowAllocations.get(channelKey) || []).length;
                  console.log(
                    `[Dungeons] \u{1F3F0} RESTORE: "${dg.name}" [${dg.rank}] in #${dg.channelName || "?"} (${dg.guildName || "?"}) \u2014 Shadows: ${allocCount} | Boss HP: ${(_d = (_c = dg.boss) == null ? void 0 : _c.hp) == null ? void 0 : _d.toLocaleString()}/${(_f = (_e = dg.boss) == null ? void 0 : _e.maxHp) == null ? void 0 : _f.toLocaleString()} | Mobs killed: ${((_g = dg.mobs) == null ? void 0 : _g.killed) || 0}/${((_i = (_h = dg.mobs) == null ? void 0 : _h.targetCount) == null ? void 0 : _i.toLocaleString()) || "?"} | Key: ${channelKey}`
                  );
                }
                this.startMobSpawning(channelKey);
                this.ensureDeployedSpawnPipeline(channelKey, "restore_deployed");
                await this.startShadowAttacks(channelKey);
                this.startBossAttacks(channelKey);
                this.startMobAttacks(channelKey);
              } else {
                this.settings.debug && console.log(
                  `[Dungeons] \u{1F3F0} RESTORE (idle): "${dg == null ? void 0 : dg.name}" [${dg == null ? void 0 : dg.rank}] in #${(dg == null ? void 0 : dg.channelName) || "?"} (${(dg == null ? void 0 : dg.guildName) || "?"}) \u2014 Boss HP: ${(_k = (_j = dg == null ? void 0 : dg.boss) == null ? void 0 : _j.hp) == null ? void 0 : _k.toLocaleString()}/${(_m = (_l = dg == null ? void 0 : dg.boss) == null ? void 0 : _l.maxHp) == null ? void 0 : _m.toLocaleString()} | Key: ${channelKey}`
                );
              }
            }
          }
        } catch (error) {
          this.errorLog("Failed to restore dungeons", error);
        } finally {
          this._restoringDungeons = false;
        }
      },
      async triggerGarbageCollection(trigger = "manual") {
        var _a, _b, _c, _d;
        this.debugLog(`Triggering garbage collection (${trigger})`);
        if (this.storageManager) {
          try {
            await this.storageManager.clearCompletedDungeons();
          } catch (error) {
            this.errorLog("Failed to cleanup completed dungeons", error);
          }
        }
        const now = Date.now();
        if (this.allocationCacheTime && now - this.allocationCacheTime > this._allocationHardRefreshTTL) {
          this.allocationCache = null;
          this.allocationCacheTime = null;
          this.debugLog("Cleared expired allocation cache");
        }
        const cacheCleanupTime = now;
        if (((_a = this._personalityCache) == null ? void 0 : _a.size) > 0) {
          for (const [key, val] of this._personalityCache) {
            if (cacheCleanupTime - ((val == null ? void 0 : val.timestamp) || 0) > 3e4) this._personalityCache.delete(key);
          }
        }
        if (((_b = this._memberWidthCache) == null ? void 0 : _b.size) > 0) {
          for (const [key, val] of this._memberWidthCache) {
            if (cacheCleanupTime - ((val == null ? void 0 : val.timestamp) || 0) > 3e4) this._memberWidthCache.delete(key);
          }
        }
        if (((_c = this._containerCache) == null ? void 0 : _c.size) > 0) {
          for (const [key, val] of this._containerCache) {
            if (cacheCleanupTime - ((val == null ? void 0 : val.timestamp) || 0) > 3e4) this._containerCache.delete(key);
          }
        }
        if (((_d = this._shadowStatsCache) == null ? void 0 : _d.size) > 0) {
          for (const [key, val] of this._shadowStatsCache) {
            if (cacheCleanupTime - ((val == null ? void 0 : val.timestamp) || 0) > 3e4) this._shadowStatsCache.delete(key);
          }
        }
        if (this.extractionEvents && this.extractionEvents.size > 500) {
          const entries = Array.from(this.extractionEvents.entries());
          this.extractionEvents.clear();
          entries.slice(-500).forEach(([k, v]) => this.extractionEvents.set(k, v));
          this.debugLog(`Trimmed extraction events: ${entries.length} \u2192 500`);
        }
        if (this.shadowArmyCountCache && this.shadowArmyCountCache.size > 100) {
          this.shadowArmyCountCache.clear();
          this.debugLog("Cleared shadow army count cache");
        }
        [this._lastShadowAttackTime, this._lastBossAttackTime, this._lastMobAttackTime].forEach(
          (map) => {
            if (map && map.size > 50) {
              const activeDungeonKeys = new Set(this.activeDungeons.keys());
              map.forEach((value, key) => {
                if (!activeDungeonKeys.has(key)) {
                  map.delete(key);
                }
              });
            }
          }
        );
        if (this._roleCombatStates && this._roleCombatStates.size > 0) {
          const activeDungeonKeys = new Set(this.activeDungeons.keys());
          this._roleCombatStates.forEach((_value, key) => {
            if (!activeDungeonKeys.has(key)) this._roleCombatStates.delete(key);
          });
        }
      },
      showToast(message, type = "info") {
        var _a;
        if (!this.isWindowVisible() && type !== "error") {
          return;
        }
        if (!this.toasts) {
          const toastsInstance = this._getPluginSafe("SoloLevelingToasts");
          if (toastsInstance) {
            this.toasts = toastsInstance;
          }
        }
        if ((_a = this.toasts) == null ? void 0 : _a.showToast) {
          try {
            return this.toasts.showToast(message, type, null, {
              callerId: "dungeons",
              maxPerMinute: 15
            });
          } catch (error) {
            this.errorLog("Error showing toast via engine:", error);
          }
        }
        const { createToast } = require_toast();
        createToast()(message, type);
      }
    };
  }
});

// src/Dungeons/settings-layer-tag.js
var require_settings_layer_tag = __commonJS({
  "src/Dungeons/settings-layer-tag.js"(exports2, module2) {
    var dc = require_discord_classes();
    var ATTR = "data-sl-dg-settings";
    var observer = null;
    var rafPending = false;
    var lastValue = null;
    function isSettingsLayerOpen() {
      return Boolean(
        document.querySelector("nav[aria-label*='Settings' i]") || document.querySelector(dc.sel.userSettings) || document.querySelector(dc.sel.settingsContainer) || document.querySelector(dc.sel.standardSidebarView)
      );
    }
    function applyTag() {
      var _a;
      const open = isSettingsLayerOpen();
      const next = open ? "1" : "0";
      if (next === lastValue) return;
      lastValue = next;
      (_a = document.body) == null ? void 0 : _a.setAttribute(ATTR, next);
    }
    function scheduleApply() {
      if (rafPending) return;
      rafPending = true;
      requestAnimationFrame(() => {
        rafPending = false;
        applyTag();
      });
    }
    function resolveLayerContainer() {
      return document.querySelector(dc.sel.layerContainer) || document.querySelector(dc.sel.layers) || document.body;
    }
    module2.exports = {
      startSettingsLayerTag() {
        this.stopSettingsLayerTag();
        applyTag();
        const target = resolveLayerContainer();
        if (!target) return;
        observer = new MutationObserver(scheduleApply);
        observer.observe(target, { childList: true, subtree: true });
      },
      stopSettingsLayerTag() {
        var _a;
        if (observer) {
          observer.disconnect();
          observer = null;
        }
        rafPending = false;
        lastValue = null;
        (_a = document.body) == null ? void 0 : _a.removeAttribute(ATTR);
      }
    };
  }
});

// src/Dungeons/build-styles.js
var require_build_styles = __commonJS({
  "src/Dungeons/build-styles.js"(exports2, module2) {
    var dc = require_discord_classes();
    function buildCSS() {
      const sel = dc.sel;
      return `/* \u2500\u2500 Font Override \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.dungeon-boss-hp-container,
.dungeon-boss-hp-container *,
.dungeons-plugin-button,
.dungeons-header-widget,
.dungeons-header-widget * {
  font-family: 'Friend or Foe BB', sans-serif !important;
}

/* ARISE Animation Keyframes */
@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 4px 12px rgba(138, 43, 226, 0.4);
  }
  50% {
    box-shadow: 0 6px 20px rgba(138, 43, 226, 0.8);
  }
}

@keyframes arise-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes arise-fade-out {
  from { opacity: 1; }
  to { opacity: 0; }
}

@keyframes arise-rise {
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes arise-glow {
  0%, 100% {
    text-shadow: 0 0 20px #8a2be2, 0 0 40px #8a2be2;
  }
  50% {
    text-shadow: 0 0 30px #8a2be2, 0 0 60px #8a2be2;
  }
}

@keyframes arise-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
}

/* Hide comment/thread buttons when dungeon HP bar active \u2014 dual selector for reliability */
.dungeon-boss-hp-container ~ ${sel.toolbar} [class*="comment"],
.dungeon-boss-hp-container ~ ${sel.toolbar} ${sel.thread},
.dungeon-boss-hp-container ~ ${sel.toolbar} [class*="reply"],
.dungeon-boss-hp-container ~ [class*="toolbar_"] [class*="comment"],
.dungeon-boss-hp-container ~ [class*="toolbar_"] ${sel.thread},
.dungeon-boss-hp-container ~ [class*="toolbar_"] [class*="reply"] {
  display: none !important;
}

.dungeon-indicator { cursor: pointer; }

/* CSS-based dungeon channel indicator \u2014 SVG icon inside channel name (survives React re-renders) */
[data-dungeon-active] ${sel.name} {
  display: flex !important;
  align-items: center !important;
  gap: 8px;
}
[data-dungeon-active] ${sel.name}::before {
  content: '';
  display: inline-block;
  flex-shrink: 0;
  width: 14px;
  height: 14px;
  /* SVG dungeon gate icon \u2014 two pillars with arch, no emoji */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none'%3E%3Crect x='1' y='4' width='3' height='11' rx='0.5' fill='%238a2be2'/%3E%3Crect x='12' y='4' width='3' height='11' rx='0.5' fill='%238a2be2'/%3E%3Cpath d='M2.5 4 C2.5 1.5 8 0 8 0 C8 0 13.5 1.5 13.5 4' stroke='%238a2be2' stroke-width='1.5' fill='none'/%3E%3Crect x='6' y='8' width='4' height='7' rx='0.5' fill='%238a2be2' opacity='0.7'/%3E%3Ccircle cx='8' cy='3' r='1.2' fill='%238a2be2' opacity='0.9'/%3E%3C/svg%3E");
  background-size: contain;
  background-repeat: no-repeat;
  margin-right: 6px;
  animation: dungeonIconPulse 2.5s ease-in-out infinite;
}
@keyframes dungeonIconPulse {
  0%, 100% { opacity: 0.85; filter: drop-shadow(0 0 2px rgba(138, 43, 226, 0.6)); }
  50% { opacity: 1; filter: drop-shadow(0 0 5px rgba(138, 43, 226, 0.9)) drop-shadow(0 0 10px rgba(138, 43, 226, 0.4)); }
}
.dungeons-plugin-button {
  width: 32px;
  height: 32px;
  background: transparent;
  border: none;
  border-radius: 2px;
  cursor: pointer;
  color: var(--interactive-normal, #b9bbbe);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  margin: 0 2px;
  flex-shrink: 0;
  padding: 6px;
  box-sizing: border-box;
}
.dungeons-plugin-button svg {
  width: 20px;
  height: 20px;
  transition: all 0.2s ease;
  display: block;
}
.dungeons-plugin-button:hover {
  background: var(--background-modifier-hover, rgba(4, 4, 5, 0.6));
  color: var(--interactive-hover, #dcddde);
}
.dungeons-plugin-button:hover svg {
  transform: scale(1.1);
}

/* Dungeons Header Widget (quick dungeon switch/deploy panel) */
.dungeons-header-widget {
  appearance: none;
  width: 24px;
  height: 24px;
  margin: 0 2px;
  padding: 0;
  border: none;
  background: transparent;
  border-radius: 2px;
  color: var(--interactive-normal, #b5bac1);
  opacity: 0.85;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  transition: opacity 0.15s ease, background 0.15s ease, color 0.15s ease;
}

.dungeons-header-widget:hover {
  opacity: 1;
  background: rgba(138, 43, 226, 0.15);
  color: var(--interactive-hover, #dcddde);
}

.dungeons-header-widget:active {
  transform: translateY(1px);
}

.dungeons-header-widget:focus-visible {
  outline: 2px solid rgba(114, 137, 218, 0.65);
  outline-offset: 2px;
  border-radius: 2px;
}

.dungeons-header-widget-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.dungeons-header-widget-icon svg {
  width: 20px;
  height: 20px;
}

.dungeons-header-widget-count {
  position: absolute;
  top: -3px;
  right: -5px;
  min-width: 14px;
  height: 14px;
  padding: 0 3px;
  border-radius: 2px;
  background: #ed4245;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  line-height: 14px;
  text-align: center;
  opacity: 0;
  transform: scale(0.8);
  transition: opacity 0.12s ease, transform 0.12s ease;
  pointer-events: none;
}

.dungeons-header-widget-count.is-visible {
  opacity: 1;
  transform: scale(1);
}

.dungeons-header-popup {
  position: fixed;
  z-index: 10050;
  pointer-events: auto;
}

.dungeons-header-popup-surface {
  background: linear-gradient(165deg, rgba(22, 18, 32, 0.97) 0%, rgba(13, 12, 20, 0.97) 55%, rgba(10, 10, 16, 0.98) 100%);
  border: 1px solid rgba(138, 43, 226, 0.32);
  border-radius: 2px;
  box-shadow: 0 20px 52px rgba(0, 0, 0, 0.6), 0 0 30px rgba(138, 43, 226, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.06), inset 0 0 0 1px rgba(138, 43, 226, 0.06);
  overflow: hidden;
  scrollbar-width: thin;
  scrollbar-color: rgba(138, 43, 226, 0.85) rgba(8, 8, 13, 0.55);
}

.dungeons-header-popup-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 10px 12px;
  border-bottom: 1px solid rgba(120, 120, 145, 0.25);
}

.dungeons-header-popup-title {
  font-size: 13px;
  font-weight: 700;
  color: #f2f3f5;
}

.dungeon-widget-close-btn {
  appearance: none;
  border: none;
  background: transparent;
  color: #b5bac1;
  font-size: 20px;
  line-height: 1;
  width: 24px;
  height: 24px;
  border-radius: 2px;
  cursor: pointer;
}

.dungeon-widget-close-btn:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
}

.dungeons-header-popup-content {
  max-height: min(65vh, 540px);
  overflow-y: auto;
}

/* SL-themed scrollbar \u2014 thin, sharp, purple-gradient thumb */
.dungeons-header-popup-content::-webkit-scrollbar {
  width: 9px;
}
.dungeons-header-popup-content::-webkit-scrollbar-track {
  background: rgba(8, 8, 13, 0.6);
}
.dungeons-header-popup-content::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, rgba(138, 43, 226, 0.6) 0%, rgba(138, 43, 226, 0.38) 100%);
  border: 1px solid rgba(138, 43, 226, 0.35);
  border-radius: 2px;
}
.dungeons-header-popup-content::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, rgba(186, 85, 211, 0.75) 0%, rgba(138, 43, 226, 0.5) 100%);
}

.dungeons-header-popup-empty {
  padding: 14px 12px 16px;
  color: #b5bac1;
  font-size: 12px;
}

.dungeons-header-popup-row {
  padding: 10px 12px 12px;
  border-bottom: 1px solid rgba(120, 120, 145, 0.2);
}

.dungeons-header-popup-row:last-child {
  border-bottom: none;
}

.dungeons-header-popup-row-top {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
}

.dungeons-header-popup-row-name {
  font-size: 13px;
  font-weight: 700;
  color: #f2f3f5;
}

.dungeons-header-popup-row-rank {
  font-size: 11px;
  font-weight: 700;
  color: #ffd76f;
}

.dungeons-header-popup-row-meta {
  margin-top: 3px;
  display: flex;
  align-items: center;
  gap: 6px;
  color: #a3a6aa;
  font-size: 11px;
}

.dungeons-header-popup-row-stats {
  margin-top: 6px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
  font-size: 11px;
  color: #d5d7db;
}

.dungeons-header-popup-state {
  display: inline-flex;
  align-items: center;
  padding: 1px 6px;
  border-radius: 2px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.dungeons-header-popup-state.is-deployed {
  background: rgba(67, 181, 129, 0.2);
  color: #5de89a;
}

.dungeons-header-popup-state.is-deploying {
  background: rgba(255, 204, 114, 0.2);
  color: #ffcc72;
}

.dungeons-header-popup-state.is-waiting {
  background: rgba(250, 166, 26, 0.2);
  color: #ffcc72;
}

.dungeons-header-popup-state.is-joined {
  background: rgba(88, 166, 255, 0.2);
  color: #8ec5ff;
}

.dungeons-header-popup-state.is-not-joined {
  background: rgba(170, 170, 190, 0.2);
  color: #d8dae0;
}

.dungeons-header-popup-row-actions {
  margin-top: 9px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.dungeon-widget-action {
  appearance: none;
  border: 1px solid rgba(130, 130, 155, 0.35);
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.04);
  color: #f2f3f5;
  font-size: 10px;
  font-weight: 700;
  line-height: 1;
  padding: 6px 8px;
  cursor: pointer;
  transition: background 0.14s ease, border-color 0.14s ease, color 0.14s ease;
}

.dungeon-widget-action:hover {
  background: rgba(255, 255, 255, 0.11);
  border-color: rgba(170, 170, 200, 0.65);
}

.dungeon-widget-action.action-go {
  color: #8ec5ff;
}

.dungeon-widget-action.action-deploy {
  color: #5de89a;
}

.dungeon-widget-action.action-deploy.is-deploying {
  color: #ffcc72;
  opacity: 0.6;
  cursor: not-allowed;
}
.dungeon-widget-action.action-deploy.is-deploying:hover {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(130, 130, 155, 0.35);
}

.dungeon-widget-action.action-join {
  color: #ffdca0;
}

/* Boss HP Bar Container (sits below channel header, no overlap!) */
.dungeon-boss-hp-container {
  display: block !important;
  position: relative !important;
  width: 100% !important;
  max-width: 100% !important;
  padding: 12px 16px !important;
  margin: 0 !important;
  background: linear-gradient(180deg, rgba(20, 20, 30, 0.95) 0%, rgba(15, 15, 25, 0.98) 100%) !important;
  border-bottom: 1px solid rgba(138, 43, 226, 0.4) !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(138, 43, 226, 0.1) !important;
  z-index: 100 !important;
  backdrop-filter: blur(8px) !important;
  visibility: visible !important;
  opacity: 1 !important;
  overflow: hidden !important;
  box-sizing: border-box !important;
}

/* Hide boss HP bar when settings/modals are open.
   The six :has() forms these replace (body:has / [class*='layer']:has) made
   the style engine re-test <body> on every document mutation; settings-layer-tag.js
   now stamps the state as an attribute. See DKB bd-has-selector-to-data-attr-tagging.
   The sibling-layer rule below needs no JS and stays as-is. */
body[data-sl-dg-settings='1'] .dungeon-boss-hp-container,
[class*='layer'][class*='baseLayer'] ~ [class*='layer'] .dungeon-boss-hp-container {
  display: none !important;
  visibility: hidden !important;
}

.dungeon-boss-hp-container {
  pointer-events: auto !important;
}

${sel.userSettings},
${sel.settingsContainer} {
  z-index: 1000 !important;
}

.dungeon-boss-hp-bar {
  display: flex !important;
  flex-direction: column !important;
  gap: 6px !important;
  padding: 12px 14px !important;
  width: 100% !important;
  max-width: 100% !important;
  margin: 0 auto !important;
  font-family: 'Orbitron', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
  background: rgba(30, 30, 45, 0.85) !important;
  border: 1px solid rgba(138, 43, 226, 0.4) !important;
  border-radius: 2px !important;
  backdrop-filter: blur(6px) !important;
  box-shadow: 0 2px 8px rgba(138, 43, 226, 0.15) !important;
  box-sizing: border-box !important;
  overflow: hidden !important;
}

.dungeon-boss-hp-bar .boss-info {
  color: #8a2be2 !important;
  font-weight: 700 !important;
  font-size: 12px !important;
  text-shadow: 0 0 8px rgba(138, 43, 226, 0.8), 0 2px 4px rgba(0, 0, 0, 0.5) !important;
  line-height: 1.4 !important;
  width: 100% !important;
  max-width: 100% !important;
}

.dungeon-deploy-btn {
  padding: 4px 12px !important;
  background: linear-gradient(135deg, #8a2be2 0%, #6a0dad 100%) !important;
  color: white !important;
  border: none !important;
  border-radius: 2px !important;
  font-size: 11px !important;
  font-weight: 700 !important;
  cursor: pointer !important;
  transition: all 0.2s !important;
  box-shadow: 0 2px 6px rgba(138, 43, 226, 0.5) !important;
  text-shadow: 0 0 6px rgba(138, 43, 226, 0.8) !important;
  pointer-events: auto !important;
  display: inline-block !important;
  visibility: visible !important;
  opacity: 1 !important;
}
.dungeon-deploy-btn:hover {
  transform: scale(1.05) !important;
  box-shadow: 0 4px 12px rgba(138, 43, 226, 0.7) !important;
  text-shadow: 0 0 10px rgba(138, 43, 226, 1) !important;
}

.dungeon-deploy-btn.is-deploying {
  background: linear-gradient(135deg, #55507a 0%, #3f3a5c 100%) !important;
  cursor: not-allowed !important;
  opacity: 0.75 !important;
  box-shadow: none !important;
}
.dungeon-deploy-btn.is-deploying:hover {
  transform: none !important;
  box-shadow: none !important;
  text-shadow: none !important;
}

.dungeon-join-btn {
  padding: 4px 12px !important;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
  color: white !important;
  border: none !important;
  border-radius: 2px !important;
  font-size: 11px !important;
  font-weight: 700 !important;
  cursor: pointer !important;
  transition: all 0.2s !important;
  box-shadow: 0 2px 6px rgba(16, 185, 129, 0.4) !important;
  pointer-events: auto !important;
  display: inline-block !important;
  visibility: visible !important;
  opacity: 1 !important;
}
.dungeon-join-btn:hover {
  transform: scale(1.05) !important;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.6) !important;
}

.dungeon-leave-btn {
  padding: 4px 12px !important;
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%) !important;
  color: white !important;
  border: none !important;
  border-radius: 2px !important;
  font-size: 11px !important;
  font-weight: 700 !important;
  cursor: pointer !important;
  transition: all 0.2s !important;
  box-shadow: 0 2px 6px rgba(239, 68, 68, 0.4) !important;
  pointer-events: auto !important;
  display: inline-block !important;
  visibility: visible !important;
  opacity: 1 !important;
}
.dungeon-leave-btn:hover {
  transform: scale(1.05) !important;
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.6) !important;
}

.dungeon-recall-btn {
  padding: 4px 12px !important;
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%) !important;
  color: white !important;
  border: none !important;
  border-radius: 2px !important;
  font-size: 11px !important;
  font-weight: 700 !important;
  cursor: pointer !important;
  transition: all 0.2s !important;
  box-shadow: 0 2px 6px rgba(220, 38, 38, 0.5) !important;
  text-shadow: 0 0 6px rgba(239, 68, 68, 0.8) !important;
  pointer-events: auto !important;
  display: inline-block !important;
  visibility: visible !important;
  opacity: 1 !important;
}
.dungeon-recall-btn:hover {
  transform: scale(1.05) !important;
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.7) !important;
  text-shadow: 0 0 10px rgba(239, 68, 68, 1) !important;
}

.dungeon-arise-button:hover {
  transform: scale(1.05) !important;
  box-shadow: 0 6px 16px rgba(138, 43, 226, 0.6) !important;
}

/* Boss bar layout (inline styles extracted to classes) */
.boss-bar-layout {
  display: flex !important;
  flex-direction: column !important;
  gap: 6px !important;
  width: 100% !important;
}

.boss-bar-header {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  width: 100% !important;
  gap: 12px !important;
}

.boss-bar-info {
  display: flex !important;
  align-items: center !important;
  gap: 10px !important;
  flex: 1 !important;
  min-width: 0 !important;
}

.boss-bar-name {
  color: #8a2be2 !important;
  font-weight: 700 !important;
  font-size: 13px !important;
  text-shadow: 0 0 8px rgba(138, 43, 226, 0.8) !important;
  white-space: nowrap !important;
}

.boss-bar-type {
  color: #d4a5ff !important;
  font-size: 11px !important;
  font-weight: 600 !important;
  flex-shrink: 0 !important;
}

.boss-bar-stats {
  display: grid !important;
  grid-template-columns: 1fr 1fr !important;
  gap: 8px !important;
  font-size: 11px !important;
  color: #c4b5fd !important;
}

.boss-bar-combat-row {
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
  flex-wrap: wrap !important;
}

.boss-bar-combat-label {
  color: #94a3b8 !important;
  font-size: 11px !important;
  font-weight: 700 !important;
  letter-spacing: 0.08em !important;
  text-transform: uppercase !important;
}

.boss-bar-combat-actions {
  display: flex !important;
  gap: 8px !important;
  flex-wrap: wrap !important;
  align-items: center !important;
}

.dungeon-combat-skill-btn {
  padding: 5px 11px !important;
  border-radius: 2px !important;
  border: 1px solid rgba(138, 43, 226, 0.45) !important;
  background: linear-gradient(135deg, rgba(34, 12, 58, 0.96) 0%, rgba(67, 24, 116, 0.92) 100%) !important;
  color: #f5ebff !important;
  font-family: 'Orbitron', 'Segoe UI', sans-serif !important;
  font-size: 10px !important;
  font-weight: 700 !important;
  letter-spacing: 0.06em !important;
  cursor: pointer !important;
  transition: all 0.18s ease !important;
  box-shadow:
    0 0 10px rgba(138, 43, 226, 0.24),
    inset 0 0 14px rgba(138, 43, 226, 0.12) !important;
  text-shadow: 0 0 6px rgba(138, 43, 226, 0.55) !important;
}

.dungeon-combat-skill-btn:hover:not([disabled]) {
  transform: translateY(-1px) !important;
  border-color: rgba(186, 85, 211, 0.8) !important;
  box-shadow:
    0 0 16px rgba(138, 43, 226, 0.42),
    inset 0 0 18px rgba(186, 85, 211, 0.18) !important;
}

.dungeon-combat-skill-btn.is-cooldown {
  background: linear-gradient(135deg, rgba(33, 16, 58, 0.95) 0%, rgba(52, 28, 92, 0.92) 100%) !important;
  color: #c4b5fd !important;
  border-color: rgba(124, 58, 237, 0.34) !important;
}

.dungeon-combat-skill-btn.is-starved {
  background: linear-gradient(135deg, rgba(44, 28, 12, 0.95) 0%, rgba(92, 57, 20, 0.9) 100%) !important;
  color: #fbbf24 !important;
  border-color: rgba(245, 158, 11, 0.5) !important;
  text-shadow: 0 0 6px rgba(245, 158, 11, 0.35) !important;
}

.dungeon-combat-skill-btn.is-blocked {
  background: linear-gradient(135deg, rgba(17, 24, 39, 0.96) 0%, rgba(30, 41, 59, 0.92) 100%) !important;
  color: #cbd5e1 !important;
  border-color: rgba(100, 116, 139, 0.4) !important;
  text-shadow: none !important;
}

.dungeon-combat-skill-btn[disabled] {
  opacity: 0.78 !important;
  cursor: not-allowed !important;
  transform: none !important;
}

.dungeon-active-effects-row {
  display: flex !important;
  gap: 4px !important;
  flex-wrap: wrap !important;
  align-items: center !important;
  margin-top: 4px !important;
  row-gap: 3px !important;
}

.effect-row-separator {
  display: inline-block !important;
  width: 1px !important;
  height: 14px !important;
  background: rgba(255, 255, 255, 0.15) !important;
  margin: 0 2px !important;
  flex-shrink: 0 !important;
  align-self: center !important;
}

.dungeon-effect-badge {
  display: inline-flex !important;
  align-items: center !important;
  gap: 3px !important;
  padding: 1px 6px !important;
  border-radius: 2px !important;
  font-family: 'Orbitron', 'Segoe UI', sans-serif !important;
  font-size: 10px !important;
  font-weight: 700 !important;
  letter-spacing: 0.04em !important;
  white-space: nowrap !important;
  line-height: 16px !important;
  min-height: 18px !important;
  animation: effectPulse 2s ease-in-out infinite !important;
}

.effect-badge-buff {
  background: linear-gradient(135deg, rgba(6, 78, 59, 0.92) 0%, rgba(16, 185, 129, 0.28) 100%) !important;
  color: #6ee7b7 !important;
  border: 1px solid rgba(52, 211, 153, 0.5) !important;
  text-shadow: 0 0 6px rgba(52, 211, 153, 0.45) !important;
  box-shadow: 0 0 8px rgba(16, 185, 129, 0.2) !important;
}

.effect-badge-debuff {
  background: linear-gradient(135deg, rgba(127, 29, 29, 0.92) 0%, rgba(239, 68, 68, 0.28) 100%) !important;
  color: #fca5a5 !important;
  border: 1px solid rgba(248, 113, 113, 0.5) !important;
  text-shadow: 0 0 6px rgba(248, 113, 113, 0.45) !important;
  box-shadow: 0 0 8px rgba(239, 68, 68, 0.2) !important;
}

/* Status Ailment: DOT effects (poison, bleed, burn, necrotic) \u2014 sickly green-purple */
.effect-badge-ailment-dot {
  background: linear-gradient(135deg, rgba(88, 28, 135, 0.92) 0%, rgba(168, 85, 247, 0.28) 100%) !important;
  color: #d8b4fe !important;
  border: 1px solid rgba(168, 85, 247, 0.5) !important;
  text-shadow: 0 0 6px rgba(168, 85, 247, 0.45) !important;
  box-shadow: 0 0 8px rgba(168, 85, 247, 0.2) !important;
}

/* Status Ailment: Damage amplification (armorBreak) \u2014 amber/orange */
.effect-badge-ailment-amp {
  background: linear-gradient(135deg, rgba(120, 53, 15, 0.92) 0%, rgba(245, 158, 11, 0.28) 100%) !important;
  color: #fcd34d !important;
  border: 1px solid rgba(245, 158, 11, 0.5) !important;
  text-shadow: 0 0 6px rgba(245, 158, 11, 0.45) !important;
  box-shadow: 0 0 8px rgba(245, 158, 11, 0.2) !important;
}

/* Status Ailment: Slow effects (slow, frostbite) \u2014 icy blue */
.effect-badge-ailment-slow {
  background: linear-gradient(135deg, rgba(12, 74, 110, 0.92) 0%, rgba(56, 189, 248, 0.28) 100%) !important;
  color: #7dd3fc !important;
  border: 1px solid rgba(56, 189, 248, 0.5) !important;
  text-shadow: 0 0 6px rgba(56, 189, 248, 0.45) !important;
  box-shadow: 0 0 8px rgba(56, 189, 248, 0.2) !important;
}

/* Status Ailment: Enrage (boss permanent buff) \u2014 angry crimson */
.effect-badge-ailment-enrage {
  background: linear-gradient(135deg, rgba(153, 27, 27, 0.95) 0%, rgba(239, 68, 68, 0.35) 100%) !important;
  color: #fecaca !important;
  border: 1px solid rgba(248, 113, 113, 0.6) !important;
  text-shadow: 0 0 8px rgba(239, 68, 68, 0.6) !important;
  box-shadow: 0 0 10px rgba(239, 68, 68, 0.3) !important;
  animation: enragePulse 1.5s ease-in-out infinite !important;
}

/* Status Ailment: Mob summary counts \u2014 muted teal (informational, not alarming) */
.effect-badge-ailment-mob {
  background: linear-gradient(135deg, rgba(17, 94, 89, 0.88) 0%, rgba(20, 184, 166, 0.22) 100%) !important;
  color: #5eead4 !important;
  border: 1px solid rgba(45, 212, 191, 0.4) !important;
  text-shadow: 0 0 5px rgba(45, 212, 191, 0.35) !important;
  box-shadow: 0 0 6px rgba(20, 184, 166, 0.15) !important;
  font-size: 9px !important;
  line-height: 16px !important;
  min-height: 18px !important;
  opacity: 0.85 !important;
  animation: none !important;
}

/* Status Ailment: Self (debuffs on YOU) \u2014 dark red warning */
.effect-badge-ailment-self {
  background: linear-gradient(135deg, rgba(153, 27, 27, 0.92) 0%, rgba(220, 38, 38, 0.28) 100%) !important;
  color: #fca5a5 !important;
  border: 1px solid rgba(220, 38, 38, 0.6) !important;
  text-shadow: 0 0 6px rgba(220, 38, 38, 0.45) !important;
  box-shadow: 0 0 8px rgba(220, 38, 38, 0.25), inset 0 0 4px rgba(220, 38, 38, 0.1) !important;
}

/* Custom dungeon tooltips \u2014 black bg + purple border, replaces native title */
[data-dungeon-tip] {
  position: relative !important;
}

[data-dungeon-tip]:hover::after {
  content: attr(data-dungeon-tip) !important;
  position: absolute !important;
  bottom: calc(100% + 8px) !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
  padding: 6px 12px !important;
  background: rgba(8, 4, 16, 0.97) !important;
  border: 1.5px solid rgba(138, 43, 226, 0.75) !important;
  border-radius: 2px !important;
  color: #e2d4f0 !important;
  font-family: 'Orbitron', 'Segoe UI', sans-serif !important;
  font-size: 11px !important;
  font-weight: 600 !important;
  letter-spacing: 0.03em !important;
  white-space: nowrap !important;
  z-index: 10000 !important;
  pointer-events: none !important;
  box-shadow:
    0 0 12px rgba(138, 43, 226, 0.35),
    0 4px 16px rgba(0, 0, 0, 0.7),
    inset 0 0 8px rgba(138, 43, 226, 0.08) !important;
  text-shadow: 0 0 4px rgba(138, 43, 226, 0.4) !important;
  animation: dungeonTipFadeIn 0.12s ease-out !important;
}

/* Tooltip arrow */
[data-dungeon-tip]:hover::before {
  content: '' !important;
  position: absolute !important;
  bottom: calc(100% + 2px) !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
  border: 5px solid transparent !important;
  border-top-color: rgba(138, 43, 226, 0.75) !important;
  z-index: 10001 !important;
  pointer-events: none !important;
  animation: dungeonTipFadeIn 0.12s ease-out !important;
}

[data-dungeon-tip=""]:hover::after,
[data-dungeon-tip=""]:hover::before {
  display: none !important;
}

@keyframes dungeonTipFadeIn {
  from { opacity: 0; transform: translateX(-50%) translateY(3px); }
  to   { opacity: 1; transform: translateX(-50%) translateY(0); }
}

@keyframes effectPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.75; }
}

@keyframes enragePulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.85; transform: scale(1.03); }
}

/* Boss gate timer \u2014 sealed boss countdown */
.boss-gate-timer {
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
  padding: 6px 12px !important;
  margin: 4px 0 !important;
  background: linear-gradient(135deg, rgba(88, 28, 135, 0.35) 0%, rgba(30, 27, 75, 0.6) 100%) !important;
  border: 1px solid rgba(138, 43, 226, 0.4) !important;
  border-radius: 2px !important;
  font-family: 'Orbitron', 'Segoe UI', sans-serif !important;
  animation: gateTimerPulse 2.5s ease-in-out infinite !important;
}

.boss-gate-icon {
  font-size: 14px !important;
  filter: drop-shadow(0 0 4px rgba(138, 43, 226, 0.6)) !important;
}

.boss-gate-label {
  color: #c4b5fd !important;
  font-size: 11px !important;
  font-weight: 700 !important;
  letter-spacing: 0.08em !important;
  text-transform: uppercase !important;
  text-shadow: 0 0 8px rgba(138, 43, 226, 0.5) !important;
}

.boss-gate-countdown {
  color: #f9a8d4 !important;
  font-size: 13px !important;
  font-weight: 800 !important;
  letter-spacing: 0.1em !important;
  text-shadow: 0 0 6px rgba(236, 72, 153, 0.6) !important;
  font-variant-numeric: tabular-nums !important;
}

.boss-gate-separator {
  color: #64748b !important;
  font-size: 10px !important;
}

.boss-gate-kills {
  color: #94a3b8 !important;
  font-size: 10px !important;
  font-weight: 600 !important;
  letter-spacing: 0.04em !important;
}

@keyframes gateTimerPulse {
  0%, 100% {
    border-color: rgba(138, 43, 226, 0.4);
    box-shadow: 0 0 8px rgba(138, 43, 226, 0.15);
  }
  50% {
    border-color: rgba(138, 43, 226, 0.7);
    box-shadow: 0 0 16px rgba(138, 43, 226, 0.3);
  }
}

.boss-bar-stat-label {
  color: #94a3b8 !important;
}

.boss-bar-stat-separator {
  color: #64748b !important;
}

.boss-hp-current {
  color: #f87171 !important;
  font-weight: 700 !important;
}

.boss-hp-max {
  color: #fbbf24 !important;
}

.mob-alive {
  color: #34d399 !important;
  font-weight: 700 !important;
}

.mob-total {
  color: #94a3b8 !important;
}

.boss-bar-shadow-info.is-deploying .shadow-pending {
  color: #ffcc72 !important;
  font-weight: 700 !important;
}

.boss-bar-badge-waiting {
  color: #8a2be2 !important;
  font-weight: 700 !important;
}

.boss-bar-badge-fighting {
  color: #10b981 !important;
  font-weight: 700 !important;
}

.boss-bar-badge-deployed {
  color: #f59e0b !important;
  font-weight: 700 !important;
}

.boss-bar-badge-deploying {
  color: #ffcc72 !important;
  font-weight: 700 !important;
}

/* HP bar \u2014 inline styles extracted + CSS-only properties preserved */
.dungeon-boss-hp-bar .hp-bar-container,
.hp-bar-container {
  height: 14px !important;
  width: 100% !important;
  max-width: 100% !important;
  background: linear-gradient(180deg, rgba(15, 15, 25, 0.9), rgba(20, 20, 30, 0.95)) !important;
  border-radius: 2px !important;
  overflow: hidden !important;
  position: relative !important;
  border: 1px solid rgba(138, 43, 226, 0.5) !important;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3) !important;
  box-sizing: border-box !important;
  margin-top: 4px !important;
}

.dungeon-boss-hp-bar .hp-bar-fill,
.hp-bar-fill {
  width: var(--boss-hp-percent, 0%) !important;
  height: 100% !important;
  background: linear-gradient(90deg, #8b5cf6 0%, #7c3aed 40%, #ec4899 80%, #f97316 100%) !important;
  border-radius: 2px !important;
  transition: width 0.5s ease !important;
  box-shadow:
    0 0 12px rgba(139, 92, 246, 0.6),
    inset 0 0 20px rgba(236, 72, 153, 0.4),
    0 2px 8px rgba(249, 115, 22, 0.3) !important;
  animation: bossHpPulse 2s ease-in-out infinite !important;
}

@keyframes bossHpPulse {
  0%, 100% { box-shadow: 0 0 12px rgba(139, 92, 246, 0.6), inset 0 0 20px rgba(236, 72, 153, 0.4); }
  50% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.8), inset 0 0 25px rgba(236, 72, 153, 0.6); }
}

.dungeon-boss-hp-bar .hp-bar-text,
.hp-bar-text {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  color: white !important;
  font-size: 10px !important;
  font-weight: 800 !important;
  text-shadow:
    0 0 6px rgba(0, 0, 0, 1),
    0 2px 4px rgba(0, 0, 0, 0.9),
    0 0 3px rgba(138, 43, 226, 0.5) !important;
  pointer-events: none !important;
  letter-spacing: 0.8px !important;
}

.dungeon-user-hp-bar {
  font-family: 'Orbitron', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
`;
    }
    module2.exports = { buildCSS };
  }
});

// src/Dungeons/css-management.js
var require_css_management = __commonJS({
  "src/Dungeons/css-management.js"(exports2, module2) {
    var { buildCSS } = require_build_styles();
    module2.exports = {
      removeCSSById(styleId) {
        var _a, _b;
        if (!styleId) {
          (_a = this.errorLog) == null ? void 0 : _a.call(this, "CSS", "Invalid CSS removal: missing styleId");
          return false;
        }
        try {
          if ((_b = BdApi == null ? void 0 : BdApi.DOM) == null ? void 0 : _b.removeStyle) {
            BdApi.DOM.removeStyle(styleId);
          } else {
            const style = document.getElementById(styleId);
            if (style && style.parentNode) {
              style.parentNode.removeChild(style);
            }
          }
          if (this._injectedStyles) {
            this._injectedStyles.delete(styleId);
          }
          if (this.debugLog) {
            this.debugLog("CSS", `CSS removed: ${styleId}`);
          }
          return true;
        } catch (error) {
          if (this.errorLog) {
            this.errorLog("CSS", `Failed to remove CSS: ${styleId}`, error);
          }
          return false;
        }
      },
      cleanupAllCSS() {
        if (!this._injectedStyles) return;
        this._injectedStyles.forEach((styleId) => {
          this.removeCSSById(styleId);
        });
        this._injectedStyles.clear();
        if (this.debugLog) {
          this.debugLog("CSS", "All injected CSS cleaned up");
        }
      },
      injectCSS() {
        var _a, _b, _c, _d;
        const styleId = "dungeons-plugin-styles";
        const cssContent = buildCSS();
        if (!cssContent.trim()) {
          (_a = this.errorLog) == null ? void 0 : _a.call(this, "CSS", "buildCSS() returned empty string; skipping style injection");
          return;
        }
        try {
          if ((_b = BdApi == null ? void 0 : BdApi.DOM) == null ? void 0 : _b.addStyle) {
            BdApi.DOM.addStyle(styleId, cssContent);
          } else {
            const style = document.createElement("style");
            style.id = styleId;
            style.textContent = cssContent;
            document.head.appendChild(style);
          }
        } catch (error) {
          (_c = this.errorLog) == null ? void 0 : _c.call(this, "CSS", `Failed to inject CSS: ${styleId}`, error);
          if (!document.getElementById(styleId)) {
            try {
              const style = document.createElement("style");
              style.id = styleId;
              style.textContent = cssContent;
              document.head.appendChild(style);
            } catch (fallbackError) {
              (_d = this.errorLog) == null ? void 0 : _d.call(this, "CSS", `Fallback CSS injection also failed: ${styleId}`, fallbackError);
            }
          }
        }
        if (!this._injectedStyles) {
          this._injectedStyles = /* @__PURE__ */ new Set();
        }
        this._injectedStyles.add(styleId);
      },
      ensureBossHpBarCssInjected() {
        var _a, _b, _c, _d, _e;
        const styleId = "dungeons-plugin-styles";
        const styleEl = document.getElementById(styleId);
        const styleInHead = Boolean(styleEl && ((_a = document.head) == null ? void 0 : _a.contains(styleEl)));
        const styleInBody = Boolean(styleEl && ((_b = document.body) == null ? void 0 : _b.contains(styleEl)) && !styleInHead);
        const styleHasContent = Boolean((_c = styleEl == null ? void 0 : styleEl.textContent) == null ? void 0 : _c.trim().length);
        let hasValidStyle = styleInHead && styleHasContent;
        if (styleEl && styleInBody) {
          try {
            (_d = styleEl.parentNode) == null ? void 0 : _d.removeChild(styleEl);
            (_e = document.head) == null ? void 0 : _e.appendChild(styleEl);
            hasValidStyle = styleHasContent;
          } catch (_) {
            hasValidStyle = false;
          }
        }
        if (!styleEl || !hasValidStyle) {
          this.injectCSS();
        }
      },
      getSettingsPanel() {
        const React = BdApi.React;
        const self = this;
        const SettingsPanel = () => {
          var _a, _b;
          const [isDebugEnabled, setIsDebugEnabled] = React.useState(Boolean((_a = self.settings) == null ? void 0 : _a.debug));
          const [isAutoDeploy, setIsAutoDeploy] = React.useState(((_b = self.settings) == null ? void 0 : _b.autoDeploy) !== false);
          return React.createElement(
            "div",
            {
              style: {
                padding: "24px",
                background: "rgba(10, 10, 16, 0.98)",
                borderRadius: "2px",
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }
            },
            React.createElement(
              "h3",
              {
                style: {
                  margin: "0 0 20px 0",
                  color: "#cdd6f4",
                  fontSize: "18px",
                  fontWeight: "600",
                  borderBottom: "1px solid #45475a",
                  paddingBottom: "12px"
                }
              },
              "Dungeons Settings"
            ),
            React.createElement(
              "label",
              {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  cursor: "pointer",
                  padding: "12px 16px",
                  background: "#181825",
                  borderRadius: "2px",
                  border: "1px solid #45475a",
                  transition: "border-color 0.2s",
                  color: "#cdd6f4",
                  fontSize: "14px"
                }
              },
              React.createElement("input", {
                type: "checkbox",
                checked: isDebugEnabled,
                onChange: (e) => {
                  const next = Boolean(e.target.checked);
                  setIsDebugEnabled(next);
                  self.settings.debug = next;
                  self.saveSettings();
                },
                style: {
                  accentColor: "#b4befe",
                  width: "18px",
                  height: "18px",
                  cursor: "pointer"
                }
              }),
              React.createElement(
                "span",
                null,
                "Debug Mode",
                React.createElement(
                  "span",
                  {
                    style: {
                      display: "block",
                      fontSize: "12px",
                      color: "#a6adc8",
                      marginTop: "2px"
                    }
                  },
                  "Enables verbose console logging"
                )
              )
            ),
            React.createElement(
              "label",
              {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  cursor: "pointer",
                  padding: "12px 16px",
                  marginTop: "12px",
                  background: "#181825",
                  borderRadius: "2px",
                  border: "1px solid #45475a",
                  color: "#cdd6f4",
                  fontSize: "14px"
                }
              },
              React.createElement("input", {
                type: "checkbox",
                checked: isAutoDeploy,
                onChange: (e) => {
                  const next = Boolean(e.target.checked);
                  setIsAutoDeploy(next);
                  self.settings.autoDeploy = next;
                  self.saveSettings();
                },
                style: {
                  accentColor: "#b4befe",
                  width: "18px",
                  height: "18px",
                  cursor: "pointer"
                }
              }),
              React.createElement(
                "span",
                null,
                "Auto-Deploy Shadows",
                React.createElement(
                  "span",
                  {
                    style: {
                      display: "block",
                      fontSize: "12px",
                      color: "#a6adc8",
                      marginTop: "2px"
                    }
                  },
                  "Automatically deploy your army when a dungeon spawns (no manual join)"
                )
              )
            )
          );
        };
        return React.createElement(SettingsPanel, null);
      }
    };
  }
});

// src/Dungeons/index.js
var C = require_constants();
var Dungeons = class Dungeons2 {
  static RANK_MULTIPLIERS = C.RANK_MULTIPLIERS;
  constructor() {
    this._initDefaults();
    this._initTimers();
    this._initCaches();
    this._initState();
    this._initUI();
  }
};
Object.assign(
  Dungeons.prototype,
  require_init_state(),
  require_corpse_tick_pipeline(),
  require_lifecycle(),
  require_ui_header_widget(),
  require_ui_delegation(),
  require_settings_persistence(),
  require_stats_integration(),
  require_channel_discovery(),
  require_message_observer(),
  require_sovereign_doctrines(),
  require_spawn_core(),
  require_spawn_wave_builders(),
  require_player_flow(),
  require_player_sync_allocation(),
  require_difficulty_contributions(),
  require_combat_primitives(),
  require_combat_role_damage(),
  require_combat_status_effects(),
  require_combat_shadow_allocation(),
  require_combat_shadow_execution(),
  require_combat_shadow_support(),
  require_combat_damage_calc(),
  require_combat_boss_mob(),
  require_resurrection_completion(),
  require_arise_extraction(),
  require_story_mode_core(),
  require_story_mode_ui(),
  require_ui_indicators(),
  require_ui_bossbar(),
  require_runtime_visibility(),
  require_notifications_cleanup(),
  require_restore_gc_toast(),
  require_settings_layer_tag(),
  require_css_management()
);
module.exports = Dungeons;
