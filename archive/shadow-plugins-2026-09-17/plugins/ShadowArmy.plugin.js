/**
 * @name ShadowArmy
 * @author matthewqilanthompson
 * @description Solo Leveling Shadow Army system - Extract and collect shadows with ranks, roles, and abilities
 * @version 3.6.1
 * @source https://github.com/matthewqilanthompson/betterdiscord-assets
 */
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

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

// src/shared/arise-svg.js
var require_arise_svg = __commonJS({
  "src/shared/arise-svg.js"(exports2, module2) {
    var ARISE_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 781 405"><g fill="#ffffff"><path d="M 235.77 232.52 C 232.56 235.89 228.78 236.99 223.88 238.88 Q 222.15 239.55 220.54 242.74 A 1.90 1.90 0.0 0 0 220.35 243.69 C 220.60 247.17 220.52 253.64 220.05 258.40 C 219.24 266.51 218.73 275.42 217.60 282.89 Q 216.62 289.36 216.49 294.21 C 216.37 298.98 215.39 302.83 215.20 307.32 C 214.95 312.97 213.91 318.00 213.08 324.71 Q 211.80 335.13 208.11 349.83 Q 207.37 352.79 205.51 355.08 A 1.08 1.08 0.0 0 1 203.78 355.01 C 202.22 352.76 202.21 348.42 202.11 343.94 C 201.98 338.18 201.93 327.50 202.34 319.03 Q 202.87 308.36 202.78 304.69 C 202.58 296.54 204.85 289.54 204.49 280.84 Q 204.38 278.12 204.87 270.31 C 205.41 261.60 205.17 253.67 205.19 244.38 A 0.80 0.79 10.9 0 0 204.68 243.64 Q 203.23 243.08 201.73 243.45 Q 193.08 245.55 188.10 246.70 C 181.97 248.12 175.32 248.17 169.05 249.95 A 6.43 6.21 -53.6 0 1 167.69 250.18 Q 165.89 250.29 161.99 250.98 C 156.92 251.88 156.10 254.16 153.40 259.09 C 139.93 283.59 131.76 299.13 118.83 317.84 C 116.74 320.87 114.95 324.49 110.54 323.64 A 1.91 1.91 0.0 0 1 108.99 321.73 Q 109.07 316.73 109.30 314.51 Q 109.64 311.35 112.19 301.88 C 114.30 294.01 117.95 285.82 120.49 277.74 C 122.23 272.20 125.71 265.39 127.33 260.06 C 128.10 257.54 130.90 255.37 127.42 253.33 C 122.83 250.64 118.28 251.07 115.27 245.88 A 2.81 2.80 -42.6 0 1 115.40 242.86 L 118.74 238.09 A 1.71 1.57 -0.6 0 1 119.22 237.64 L 125.13 233.88 A 4.75 4.60 -70.4 0 1 126.08 233.41 Q 136.02 229.86 138.21 228.98 Q 140.15 228.19 141.35 225.62 Q 144.19 219.57 156.49 190.96 Q 159.92 182.97 166.30 168.87 Q 175.87 147.72 180.95 137.44 C 181.92 135.48 182.80 132.56 183.96 130.41 Q 185.52 127.49 187.97 122.42 Q 192.23 113.56 196.85 106.58 C 200.29 101.37 204.64 98.36 211.07 100.43 Q 212.35 100.84 213.58 102.31 A 2.20 2.16 -75.4 0 1 214.01 103.06 C 218.09 114.51 218.74 124.03 220.65 139.50 C 221.33 144.94 221.48 150.25 221.98 156.00 Q 223.84 177.44 223.41 214.99 A 4.26 4.19 -32.1 0 1 222.98 216.80 C 221.42 219.99 220.95 224.56 224.38 226.94 A 1.81 1.78 -26.0 0 0 225.34 227.26 Q 231.45 227.55 235.74 231.58 A 0.67 0.66 43.5 0 1 235.77 232.52 Z M 204.33 224.37 A 1.34 1.32 80.2 0 0 205.16 223.18 Q 205.50 209.55 204.15 194.55 Q 203.97 192.64 202.26 178.45 C 201.99 176.20 202.10 173.95 202.06 171.25 C 202.02 168.06 197.68 164.09 195.52 168.67 Q 189.99 180.38 184.31 195.13 Q 183.16 198.12 181.46 201.73 C 178.77 207.46 177.99 209.66 175.27 214.57 Q 173.26 218.21 172.46 221.26 A 2.00 2.00 0.0 0 0 173.27 223.41 Q 174.62 224.32 177.01 224.32 Q 187.58 224.27 196.89 224.33 C 199.42 224.35 202.04 225.29 204.33 224.37 Z"/><path d="M 295.03 236.35 A 0.40 0.40 0.0 0 0 295.15 236.99 C 301.66 240.07 307.69 245.72 312.83 250.96 C 319.14 257.39 324.26 262.45 328.37 269.13 Q 329.47 270.91 334.59 279.27 C 340.39 288.74 343.92 298.47 347.56 309.31 Q 348.43 311.91 348.58 313.72 C 350.21 333.22 328.03 305.90 326.12 303.45 C 324.30 301.11 321.41 298.52 319.05 295.61 C 313.17 288.36 305.21 282.46 297.93 278.57 Q 287.68 273.09 286.00 271.83 Q 284.74 270.88 280.22 268.54 Q 277.41 267.08 272.88 263.70 Q 271.33 262.55 268.87 262.96 A 0.96 0.96 0.0 0 0 268.18 263.49 L 266.52 267.07 A 3.07 2.98 -25.7 0 0 266.37 267.48 C 261.42 284.42 258.51 300.07 255.14 319.66 C 254.52 323.29 253.30 327.99 252.18 331.93 Q 251.45 334.50 250.69 335.46 A 1.85 1.85 0.0 0 1 247.81 335.47 Q 245.66 332.82 245.40 329.27 Q 242.95 295.23 248.08 262.76 Q 248.29 261.41 248.74 249.53 C 248.94 244.41 248.07 239.23 248.14 234.38 A 4.06 4.04 -24.6 0 1 249.10 231.82 C 253.31 226.82 254.47 220.18 255.97 212.24 Q 261.68 181.83 264.92 169.38 Q 265.63 166.67 266.22 165.48 A 1.24 1.23 42.3 0 0 266.16 164.27 Q 264.31 161.27 261.14 161.94 C 257.22 162.76 252.80 163.33 249.77 160.87 A 1.08 1.07 -70.1 0 1 249.39 160.05 L 249.39 153.69 A 1.50 1.48 -24.9 0 1 249.75 152.72 Q 254.12 147.61 255.60 146.34 Q 260.36 142.23 262.36 140.14 C 265.85 136.49 270.73 133.63 274.36 131.37 C 277.46 129.44 280.11 122.53 281.30 119.49 C 282.32 116.88 284.18 113.84 285.45 111.45 C 287.42 107.71 290.97 102.55 295.59 101.82 A 2.53 2.53 0.0 0 1 297.77 102.53 L 300.87 105.62 A 1.41 1.40 23.0 0 1 301.27 106.60 L 301.27 111.07 A 2.00 1.98 -60.6 0 0 301.55 112.09 L 302.87 114.39 A 2.72 2.70 70.8 0 0 305.60 115.72 C 309.21 115.20 312.29 113.40 315.66 112.40 C 323.72 110.03 330.63 107.61 338.34 106.22 Q 343.13 105.36 347.90 104.35 A 11.34 11.03 38.0 0 1 350.11 104.11 Q 364.70 103.99 377.49 104.14 Q 379.13 104.16 384.69 105.70 C 394.10 108.29 401.01 114.11 404.81 123.25 C 408.39 131.87 406.80 139.22 404.39 147.78 Q 399.18 166.26 385.55 180.78 Q 375.03 191.99 367.43 198.14 Q 358.51 205.37 347.40 212.51 Q 337.45 218.91 325.63 223.98 Q 310.73 230.39 298.37 234.35 Q 296.26 235.03 295.03 236.35 Z M 278.36 222.64 Q 281.88 225.13 284.98 223.92 Q 300.62 217.81 304.56 216.33 Q 305.96 215.80 309.48 213.44 C 313.86 210.49 320.20 207.81 323.16 205.91 Q 341.68 194.04 357.57 179.57 Q 368.86 169.29 376.35 157.37 C 378.96 153.20 382.12 145.72 380.19 141.30 C 378.70 137.88 376.71 136.09 372.81 135.45 C 368.70 134.78 365.75 134.81 359.41 134.85 C 355.88 134.88 352.92 135.71 349.82 135.61 Q 346.60 135.52 342.76 136.60 C 338.38 137.84 333.30 138.22 328.82 139.68 Q 319.19 142.81 309.56 146.06 C 306.95 146.94 296.47 150.82 295.62 154.40 Q 292.61 166.99 291.02 175.29 Q 289.77 181.81 279.99 218.02 Q 279.14 221.19 278.33 221.87 A 0.49 0.48 43.0 0 0 278.36 222.64 Z"/><path d="M 408.33 347.47 Q 412.15 341.07 417.67 337.66 Q 440.21 323.68 443.57 321.32 Q 446.93 318.97 453.77 312.73 Q 459.52 307.48 462.79 302.89 Q 469.74 293.13 473.31 281.31 Q 481.27 254.91 468.02 232.51 C 462.95 223.92 452.72 211.32 447.54 203.75 C 442.44 196.28 439.41 187.46 440.29 177.85 Q 441.39 165.81 444.58 155.06 Q 445.99 150.29 447.93 146.68 Q 459.11 125.89 479.41 114.65 C 486.70 110.61 496.55 108.43 505.01 106.62 A 10.23 10.21 -51.1 0 1 506.97 106.41 Q 521.11 106.33 530.49 106.45 Q 531.82 106.47 534.18 108.03 A 1.08 1.08 0.0 0 1 534.66 108.93 L 534.66 113.09 A 1.67 1.67 0.0 0 1 534.22 114.22 Q 530.22 118.61 528.56 119.56 Q 526.40 120.79 524.27 122.27 Q 523.23 123.00 519.78 124.58 Q 510.56 128.80 505.96 130.66 C 488.91 137.54 472.56 149.63 469.18 168.67 C 468.18 174.32 471.43 183.42 474.59 188.49 Q 478.70 195.09 483.53 201.23 Q 484.93 203.02 489.92 211.18 Q 490.77 212.57 493.65 217.34 Q 502.47 231.93 502.51 249.26 Q 502.52 253.32 502.08 259.64 C 500.95 275.91 493.92 292.75 483.07 305.05 C 478.55 310.18 475.39 314.98 470.49 319.19 Q 459.30 328.82 446.94 335.93 Q 445.59 336.71 431.43 344.06 C 427.50 346.10 424.17 347.27 420.17 348.87 C 416.58 350.30 411.68 350.80 408.48 348.27 A 0.62 0.61 34.9 0 1 408.33 347.47 Z"/><path d="M 395.84 330.99 C 392.86 328.92 391.60 324.45 391.18 320.81 Q 390.21 312.36 389.79 302.45 C 389.37 292.46 390.21 282.15 390.36 271.69 Q 390.43 266.92 391.20 259.37 Q 395.63 215.81 404.17 172.92 Q 404.82 169.65 406.48 163.72 Q 408.98 154.78 413.25 139.46 Q 416.12 129.19 421.70 120.73 C 425.12 115.55 429.06 110.39 435.15 111.37 C 437.90 111.81 438.92 114.18 439.83 116.59 A 3.86 3.84 34.5 0 1 440.07 117.87 Q 440.12 123.24 440.11 127.23 C 440.10 131.77 438.94 135.74 438.53 140.49 Q 438.37 142.34 437.61 145.76 Q 433.11 166.13 432.08 173.03 Q 430.23 185.51 428.58 192.31 Q 422.98 215.36 414.45 250.64 Q 409.68 270.31 407.07 284.96 Q 403.99 302.19 402.57 319.77 C 402.32 322.89 401.62 327.84 399.60 330.39 A 2.82 2.76 -53.4 0 1 395.84 330.99 Z"/><path d="M 615.68 281.33 C 612.43 288.28 607.88 293.87 601.49 299.73 Q 587.41 312.65 571.37 322.10 Q 560.36 328.58 546.55 331.13 Q 541.56 332.05 537.05 331.21 Q 530.71 330.02 528.06 327.97 C 522.46 323.63 518.29 318.76 515.93 311.56 Q 511.02 296.60 511.96 281.00 Q 513.02 263.20 514.95 248.53 C 515.26 246.22 516.10 243.81 516.36 242.30 A 3.11 3.11 0.0 0 0 515.21 239.33 C 513.17 237.72 510.64 236.32 509.38 234.04 A 1.34 1.33 -52.3 0 1 509.26 233.07 Q 510.45 228.46 512.16 227.16 C 515.72 224.44 518.62 222.95 520.32 219.57 C 521.84 216.55 522.53 212.30 523.85 208.07 Q 531.84 182.37 541.77 157.78 Q 542.39 156.23 544.09 153.44 A 0.69 0.69 0.0 0 0 543.95 152.56 C 541.25 150.16 538.50 150.11 534.28 149.43 Q 532.87 149.20 530.48 146.74 A 1.65 1.61 -67.7 0 1 530.02 145.60 L 530.02 141.29 A 2.35 2.31 -29.7 0 1 530.36 140.08 Q 533.93 134.22 538.34 131.57 C 546.95 126.40 557.91 122.29 566.33 120.59 Q 576.01 118.63 578.29 118.04 Q 580.72 117.40 583.76 117.41 C 586.35 117.42 588.63 116.66 591.11 116.67 Q 595.95 116.69 601.98 115.39 A 10.66 10.44 -49.4 0 1 604.48 115.17 C 610.33 115.36 615.57 114.30 621.16 114.32 Q 632.20 114.37 650.50 114.33 Q 651.87 114.32 653.82 114.73 A 2.06 1.95 12.5 0 1 655.43 117.11 Q 655.25 117.91 654.11 118.88 C 648.72 123.45 641.43 125.38 632.75 127.75 C 625.38 129.76 616.22 131.89 606.32 135.01 Q 601.93 136.39 593.87 138.86 C 586.53 141.12 578.96 142.71 572.18 144.94 C 568.59 146.13 566.56 149.41 566.59 153.39 C 566.60 155.48 565.50 157.17 564.94 159.64 Q 560.22 180.36 553.66 201.98 C 552.93 204.36 552.73 206.27 551.57 208.25 A 1.97 1.97 0.0 0 0 552.87 211.17 C 560.87 212.82 568.79 209.53 576.78 209.16 Q 580.29 209.01 593.47 207.08 Q 597.33 206.52 604.41 205.97 Q 609.60 205.57 615.26 204.27 Q 617.14 203.84 619.53 204.72 A 0.96 0.96 0.0 0 1 620.15 205.43 Q 620.64 207.65 618.71 209.49 Q 613.13 214.82 604.13 218.88 Q 589.15 225.62 573.61 230.81 Q 562.57 234.50 547.88 237.74 Q 545.02 238.37 544.50 238.89 C 542.48 240.89 542.29 242.45 542.07 245.44 A 4.21 3.91 58.8 0 1 541.85 246.50 C 539.51 253.19 538.57 263.37 537.71 267.65 C 536.57 273.29 536.74 278.44 535.71 284.19 Q 534.70 289.82 535.37 293.97 Q 536.29 299.68 538.05 304.08 A 3.06 3.02 -81.8 0 0 538.92 305.26 Q 545.08 310.24 552.73 310.46 A 7.11 6.95 -50.2 0 0 554.59 310.27 Q 564.04 308.04 572.62 304.36 C 577.63 302.22 584.72 298.37 590.23 294.42 Q 601.50 286.34 609.26 280.77 Q 611.66 279.06 614.97 279.86 A 1.06 1.05 19.5 0 1 615.68 281.33 Z"/></g></svg>';
    module2.exports = { ARISE_SVG };
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

// src/ShadowArmy/constants.js
var require_constants = __commonJS({
  "src/ShadowArmy/constants.js"(exports2, module2) {
    var SHADOW_PERSONALITY_ROLE_MAP = {
      tank: "tank",
      healer: "supportive",
      support: "supportive",
      mage: "strategic",
      ranger: "tactical",
      assassin: "aggressive",
      berserker: "aggressive",
      knight: "balanced",
      ant: "aggressive",
      bear: "aggressive",
      wolf: "tactical",
      spider: "strategic",
      centipede: "strategic",
      golem: "tank",
      serpent: "strategic",
      naga: "strategic",
      wyvern: "tactical",
      dragon: "aggressive",
      titan: "aggressive",
      giant: "aggressive",
      elf: "strategic",
      demon: "aggressive",
      ghoul: "aggressive",
      orc: "aggressive",
      ogre: "aggressive",
      yeti: "tank"
    };
    var { STAT_KEYS } = require_safe_numbers();
    var SHADOW_GRADES = ["Common", "Elite", "Knight", "Elite Knight", "General", "Marshal", "Grand Marshal"];
    function normalizeShadowPersonalityValue(value) {
      if (typeof value !== "string") return "";
      return value.trim().toLowerCase();
    }
    function deriveShadowPersonalityFromRole(role) {
      const normalizedRole = normalizeShadowPersonalityValue(role);
      if (!normalizedRole) return "";
      return SHADOW_PERSONALITY_ROLE_MAP[normalizedRole] || "balanced";
    }
    var ARISE_SVG = require_arise_svg().ARISE_SVG;
    var DEFAULT_SETTINGS = {
      enabled: true,
      // Per-extraction "Shadow Extracted" toasts. Default OFF (2026-07-13) —
      // they fire on every extraction and the army widget already shows the
      // live count. ARISE summaries / warnings / errors toast regardless.
      extractionToasts: false,
      shadows: [],
      // DEPRECATED: Shadows stored in IndexedDB, kept for migration compat
      totalShadowsExtracted: 0,
      lastExtractionTime: null,
      cachedTotalPower: 0,
      cachedTotalPowerTimestamp: 0,
      cachedTotalPowerShadowCount: 0,
      cachedTotalPowerVersion: 1,
      extractionConfig: {
        minBaseChance: 0.01,
        chancePerInt: 0.01,
        maxExtractionChance: 0.3,
        maxExtractionsPerMinute: 20,
        messageQueueInitialDelayMs: 120,
        messageQueueIntervalMs: 450,
        messageQueueMaxPending: 20,
        specialBaseChance: 0.01,
        specialIntMultiplier: 3e-3,
        specialLuckMultiplier: 2e-3,
        specialMaxChance: 0.3,
        specialMaxPerDay: 5,
        maxBossAttemptsPerDay: 3,
        bossAttemptResetHour: 0
      },
      // rankPromotionConfig REMOVED 2026-07-30. minLevelByRank died with the XP
      // write path (levels stopped advancing); a minDaysByRank replacement was
      // tried and dropped — rank is gated on STATS, per design preference. The
      // gate now reads a shadow's INTRINSIC stats (base + combat growth +
      // veterancy) instead of its Monarch-scaled combat stats, which is what makes
      // the stat gate real. See progression.js getRankUpEligibility.
      dungeonExtractionAttempts: {},
      specialArise: {
        lastDate: null,
        countToday: 0
      },
      shadowEssence: {
        enabled: true,
        essence: 0,
        // --- Earning ---
        // Mob kills: base essence per kill, scaled by mob rank
        essencePerMobKill: {
          E: 1,
          D: 2,
          C: 4,
          B: 8,
          A: 16,
          S: 32,
          SS: 64,
          SSS: 128,
          "SSS+": 256,
          NH: 512,
          Monarch: 1024,
          "Monarch+": 2048,
          "Shadow Monarch": 4096
        },
        // Boss kills: lump sum reward on dungeon completion
        essencePerBossKill: {
          E: 50,
          D: 100,
          C: 200,
          B: 400,
          A: 800,
          S: 1600,
          SS: 3200,
          SSS: 6400,
          "SSS+": 12800,
          NH: 25600,
          Monarch: 51200,
          "Monarch+": 102400,
          "Shadow Monarch": 204800
        },
        // --- Spending: Grade Promotion Costs ---
        // Shadows have a GRADE (manhwa lore) separate from rank (game power tier).
        // Grade: Common → Elite → Knight → Elite Knight → General → Marshal → Grand Marshal
        // Lore: "Shadows cannot advance to higher grades without direct
        // authorization from the Shadow Monarch." Essence = Monarch's mana.
        gradePromotionCost: {
          Elite: 100,
          // Common → Elite: quick early progression
          Knight: 500,
          // Elite → Knight: can now be "named" (lore)
          "Elite Knight": 2e3,
          // Knight → Elite Knight: S-rank equivalent
          General: 8e3,
          // Elite Knight → General: can now speak (lore)
          Marshal: 5e4,
          // General → Marshal: highest evolution (Igris, Beru)
          "Grand Marshal": 5e5
          // Marshal → Grand Marshal: Bellion-tier, legendary
        },
        // --- Spending: RANK promotion costs (added 2026-07-30) ---
        // Rank (E → D → ... → Monarch+) is the power tier, separate from grade.
        // Rank-up used to be free, gated on shadow LEVEL + stats. The army-wide XP
        // broadcast that raised levels is gone (see progression.js veterancy), so
        // most shadows never level again and the level gate would freeze the
        // ladder. Essence replaces it as the scarce resource.
        // Priced below the grade table at equivalent tiers: every shadow climbs the
        // rank ladder, while only chosen few are promoted through grades.
        // 'Shadow Monarch' is intentionally absent — that rank is player-exclusive
        // and already blocked in attemptAutoRankUp.
        rankPromotionCost: {
          D: 50,
          C: 150,
          B: 500,
          A: 1500,
          S: 5e3,
          SS: 15e3,
          SSS: 5e4,
          "SSS+": 15e4,
          NH: 5e5,
          Monarch: 15e5,
          "Monarch+": 5e6
        },
        // Grade stat multipliers — higher grade = proportionally stronger shadow.
        // Applied as a multiplier to all effective stats during combat.
        gradeStatMultiplier: {
          Common: 1,
          Elite: 1.15,
          Knight: 1.35,
          "Elite Knight": 1.6,
          General: 2,
          Marshal: 2.5,
          "Grand Marshal": 3.5
        },
        // COMMAND HIERARCHY (lore: one sovereign per species — Igris leads the
        // knights, Beru the ants, Bellion above all). Officer grades are capped
        // PER SPECIES (species = beastFamily || beastType || role):
        //   Grand Marshal: 1  — the species' supreme commander
        //   Marshal:       4  — co-commanders (vanguard/rear/left/right)
        //   General:       1 per 50 troops of the species (min 5) — officer corps
        //   Elite Knight and below: uncapped rank-and-file.
        // Enforced in autoPromoteGrades; reconcileGradeHierarchy() restructures an
        // existing over-promoted army once (keeps the highest rank+stats holder of
        // each slot, demotes the rest down the ladder, refunds the essence
        // difference in full).
        gradeHierarchy: {
          enabled: true,
          grandMarshalPerSpecies: 1,
          marshalPerSpecies: 4,
          generalPerTroops: 50,
          generalMinPerSpecies: 5
        },
        // Auto-promote: process up to N shadows per cycle (prevents IDB storm)
        autoPromoteBatchSize: 50,
        autoPromoteIntervalMs: 3e4
        // Check every 30s
      },
      shadowCompression: {
        enabled: true,
        eliteThreshold: 100,
        compressionVersion: 1,
        lastCompressionTime: null,
        compressionIntervalHours: 1
      },
      ariseAnimation: {
        enabled: true,
        animationDuration: 2500,
        scale: 1,
        showRankAndRole: true,
        minGapMs: 900,
        animationFont: "Speedy Space Goat Oddity",
        useLocalFonts: true
      }
    };
    var VETERANCY_RATE = 0.02;
    var { RANK_ORDER: SHADOW_RANKS } = require_rank_utils();
    var SHADOW_ROLES = {
      // Humanoid roles (extracted from regular messages)
      tank: {
        name: "Tank",
        description: "High defense, protects your messages",
        buffs: { vitality: 0.1, strength: 0.05 },
        effect: "Message Protection"
      },
      healer: {
        name: "Healer",
        description: "Restores HP and provides support",
        buffs: { vitality: 0.15, perception: 0.1 },
        effect: "HP Regeneration"
      },
      mage: {
        name: "Mage",
        description: "Powerful magic attacks, boosts XP",
        buffs: { intelligence: 0.15, agility: 0.05 },
        effect: "XP Amplification"
      },
      assassin: {
        name: "Assassin",
        description: "High crit chance and stealth",
        buffs: { agility: 0.2, strength: 0.05 },
        effect: "Crit Enhancement"
      },
      ranger: {
        name: "Ranger",
        description: "Long-range attacks, boosts collection",
        buffs: { agility: 0.1, intelligence: 0.1 },
        effect: "Collection Boost"
      },
      knight: {
        name: "Knight",
        description: "Balanced warrior, all-around buffs",
        buffs: { strength: 0.1, agility: 0.1, vitality: 0.1 },
        effect: "Balanced Power"
      },
      berserker: {
        name: "Berserker",
        description: "High damage, low defense",
        buffs: { strength: 0.2, vitality: -0.05 },
        effect: "Damage Boost"
      },
      support: {
        name: "Support",
        description: "Buffs allies and provides utility",
        buffs: { perception: 0.15, intelligence: 0.1 },
        effect: "Perception Amplification"
      },
      // Magic Beast roles (dungeon-only extraction)
      ant: {
        name: "Ant",
        description: "Insect-type beast - High numbers, coordinated attacks",
        buffs: { strength: 0.12, agility: 0.12 },
        effect: "Swarm Tactics",
        isMagicBeast: true,
        family: "insect"
      },
      bear: {
        name: "Bear",
        description: "Beast-type - Raw power and endurance",
        buffs: { strength: 0.18, vitality: 0.12 },
        effect: "Berserker Rage",
        isMagicBeast: true,
        family: "beast"
      },
      wolf: {
        name: "Wolf",
        description: "Pack hunter - Speed and coordination",
        buffs: { agility: 0.15, strength: 0.1 },
        effect: "Pack Hunter",
        isMagicBeast: true,
        family: "beast"
      },
      spider: {
        name: "Spider",
        description: "Arachnid-type - Web traps and venom",
        buffs: { agility: 0.13, intelligence: 0.12 },
        effect: "Web Trap",
        isMagicBeast: true,
        family: "insect"
      },
      centipede: {
        name: "Centipede",
        description: "Multi-legged horror - Poison and speed",
        buffs: { agility: 0.15, intelligence: 0.1 },
        effect: "Poison Sting",
        isMagicBeast: true,
        family: "insect"
      },
      golem: {
        name: "Golem",
        description: "Stone construct - Extreme defense, slow",
        buffs: { vitality: 0.25, strength: 0.08 },
        effect: "Stone Skin",
        isMagicBeast: true,
        family: "construct"
      },
      serpent: {
        name: "Serpent",
        description: "Snake-type - Venom and cunning",
        buffs: { intelligence: 0.14, agility: 0.12 },
        effect: "Venom Strike",
        isMagicBeast: true,
        family: "reptile"
      },
      naga: {
        name: "Naga",
        description: "Serpent humanoid - Magic and agility",
        buffs: { intelligence: 0.15, agility: 0.13 },
        effect: "Water Magic",
        isMagicBeast: true,
        family: "reptile"
      },
      wyvern: {
        name: "Wyvern",
        description: "Flying beast - Aerial superiority",
        buffs: { agility: 0.16, strength: 0.14 },
        effect: "Aerial Strike",
        isMagicBeast: true,
        family: "dragon",
        minRank: "S"
      },
      dragon: {
        name: "Dragon",
        description: "Apex predator - Supreme in all aspects",
        buffs: { strength: 0.15, intelligence: 0.15, agility: 0.1 },
        effect: "Dragon Dominance",
        isMagicBeast: true,
        family: "dragon",
        minRank: "NH"
      },
      titan: {
        name: "Titan",
        description: "Ancient giant - Colossal power and endurance",
        buffs: { strength: 0.2, vitality: 0.18 },
        effect: "Titan Force",
        isMagicBeast: true,
        family: "giant",
        minRank: "A"
      },
      giant: {
        name: "Giant",
        description: "Massive humanoid - Overwhelming size and strength",
        buffs: { strength: 0.17, vitality: 0.14 },
        effect: "Giant Slam",
        isMagicBeast: true,
        family: "giant"
      },
      elf: {
        name: "Elf",
        description: "Ancient race - Magic mastery and precision",
        buffs: { intelligence: 0.16, agility: 0.14, perception: 0.1 },
        effect: "Ancient Magic",
        isMagicBeast: true,
        family: "ancient"
      },
      demon: {
        name: "Demon",
        description: "Dark entity - Chaos and destruction",
        buffs: { strength: 0.16, intelligence: 0.16 },
        effect: "Dark Power",
        isMagicBeast: true,
        family: "demon",
        minRank: "B"
      },
      ghoul: {
        name: "Ghoul",
        description: "Undead horror - Life drain and regeneration",
        buffs: { vitality: 0.14, intelligence: 0.11 },
        effect: "Life Drain",
        isMagicBeast: true,
        family: "undead"
      },
      orc: {
        name: "Orc",
        description: "Brutal warrior - Savage strength and ferocity",
        buffs: { strength: 0.16, vitality: 0.1 },
        effect: "Savage Fury",
        isMagicBeast: true,
        family: "humanoid-beast"
      },
      ogre: {
        name: "Ogre",
        description: "Brute monster - Raw strength, low intelligence",
        buffs: { strength: 0.19, vitality: 0.13 },
        effect: "Crushing Blow",
        isMagicBeast: true,
        family: "humanoid-beast"
      },
      yeti: {
        name: "Yeti",
        description: "Ice beast - Frozen fury and endurance",
        buffs: { strength: 0.15, vitality: 0.15 },
        effect: "Frost Aura",
        isMagicBeast: true,
        family: "ice"
      }
    };
    var SHADOW_ROLE_STAT_WEIGHTS = {
      tank: { strength: 0.9, agility: 0.3, intelligence: 0.2, vitality: 1.5, perception: 0.3 },
      healer: { strength: 0.2, agility: 0.4, intelligence: 1.3, vitality: 1.1, perception: 1 },
      mage: { strength: 0.15, agility: 0.5, intelligence: 1.6, vitality: 0.4, perception: 0.6 },
      assassin: { strength: 0.7, agility: 1.7, intelligence: 0.5, vitality: 0.3, perception: 0.8 },
      ranger: { strength: 0.6, agility: 1.3, intelligence: 1, vitality: 0.5, perception: 0.8 },
      knight: { strength: 1.1, agility: 0.9, intelligence: 0.6, vitality: 1.1, perception: 0.5 },
      berserker: { strength: 1.8, agility: 0.7, intelligence: 0.15, vitality: 0.5, perception: 0.4 },
      support: { strength: 0.25, agility: 0.6, intelligence: 1.2, vitality: 0.7, perception: 1.4 },
      // Magic Beast stat weights — tuned to Solo Leveling monster biology
      ant: { strength: 1.2, agility: 1.3, intelligence: 0.3, vitality: 1, perception: 0.7 },
      // Jeju ants: strong mandibles, fast swarmers, tough exoskeletons, keen chemical senses
      bear: { strength: 1.6, agility: 0.4, intelligence: 0.3, vitality: 1.4, perception: 0.5 },
      // Red Gate ice bears (Tank's origin): slow devastators, near-indestructible
      wolf: { strength: 1, agility: 1.5, intelligence: 0.6, vitality: 0.7, perception: 1 },
      // Pack hunters: fast, coordinated, apex trackers with keen senses
      spider: { strength: 0.6, agility: 1.4, intelligence: 1, vitality: 0.5, perception: 1 },
      // Ambush predators: web-spinners, agile, fragile, excellent vibration sensing
      golem: { strength: 1.3, agility: 0.2, intelligence: 0.1, vitality: 1.9, perception: 0.3 },
      // Stone constructs: near-indestructible, mindless, immovable
      wyvern: { strength: 1.4, agility: 1.6, intelligence: 0.5, vitality: 1, perception: 0.9 },
      // Lesser dragons: fastest fliers, bestial intelligence, sharp aerial eyesight
      serpent: { strength: 0.8, agility: 1.4, intelligence: 0.8, vitality: 0.7, perception: 1 },
      // Venomous strikers: fast lunges, instinctual, heat/vibration sensing
      dragon: { strength: 1.7, agility: 1.4, intelligence: 1.5, vitality: 1.6, perception: 1.2 },
      // Apex predators (Kamish-tier): supreme in all stats, can strategize and speak
      orc: { strength: 1.5, agility: 0.8, intelligence: 0.7, vitality: 1.2, perception: 0.5 },
      // Tribal warriors (Tusk/Kargalgan): brute force + organized warfare, shamans, strategy
      naga: { strength: 0.8, agility: 1.3, intelligence: 1.4, vitality: 0.9, perception: 1 },
      // Half-serpent magic users: water/poison magic, intelligent, good senses
      titan: { strength: 1.8, agility: 0.3, intelligence: 0.4, vitality: 1.7, perception: 0.6 },
      // Japan Gate colossi: absolute physical power, glacially slow, bestial
      giant: { strength: 1.6, agility: 0.4, intelligence: 0.5, vitality: 1.5, perception: 0.5 },
      // Japan Gate: very strong, slow, some crude weapon use
      elf: { strength: 0.5, agility: 1.5, intelligence: 1.6, vitality: 0.6, perception: 1.3 },
      // Ice elves (Baruka): agile magic users, coordinated military, keen senses
      demon: { strength: 1.5, agility: 1.2, intelligence: 1.4, vitality: 1.1, perception: 1 },
      // Demon Castle (Baran): strong, fast, intelligent magic users, magical senses
      ghoul: { strength: 1, agility: 0.8, intelligence: 0.3, vitality: 1.6, perception: 0.4 },
      // Mindless undead: relentless, hard to kill, no strategy, dead senses
      ogre: { strength: 1.7, agility: 0.3, intelligence: 0.2, vitality: 1.4, perception: 0.4 },
      // Massive brutes: strongest physical, extremely slow, very dumb
      centipede: { strength: 1, agility: 1.4, intelligence: 0.5, vitality: 1.1, perception: 0.7 },
      // Armored segments: fast, venomous, decent durability
      yeti: { strength: 1.4, agility: 0.8, intelligence: 0.6, vitality: 1.5, perception: 0.7 }
      // Arctic predators: strong, durable thick fur, bestial
    };
    var SHADOW_ARMY_CAPACITY = {
      // cap = base + floor(sqrt(INT) × intScale)
      // "Typical INT" figures use the empirical growth from live play,
      // INT ≈ 2.85 × level at the rank's entry level (measured from a real
      // save: INT 4702 at level 1649) — the old comments assumed 2-3× less
      // INT than players actually have.
      // SS and above steepened 2026-08-05: the top end now climbs ~2.4-2.5×
      // per rank with a deliberate 3.7× leap into Monarch+ (~half a million
      // at entry), so the last mortal rank reads as "approaching limitless"
      // rather than a hard wall a large army is already past.
      //                     base      intScale   // @ typical INT → effective cap
      E: { base: 0, intScale: 0 },
      // No Shadow Extraction skill yet
      D: { base: 15, intScale: 3 },
      // Job Change arc          — INT 28 → ~31
      C: { base: 40, intScale: 8 },
      // Growing power           — INT 71 → ~107
      B: { base: 80, intScale: 15 },
      // Mid-tier hunter         — INT 142 → ~259
      A: { base: 200, intScale: 30 },
      // Post-Igris              — INT 285 → ~706
      S: { base: 500, intScale: 50 },
      // Jeju Island arc         — INT 570 → ~1,693
      SS: { base: 1200, intScale: 100 },
      // Late S-rank power       — INT 855 → ~4,124
      SSS: { base: 3500, intScale: 200 },
      // Beyond ch.227's army    — INT 1140 → ~10,252
      "SSS+": { base: 8e3, intScale: 400 },
      // Approaching Monarch     — INT 1425 → ~23,099
      NH: { base: 2e4, intScale: 800 },
      // National Hunter level   — INT 1995 → ~55,732
      Monarch: { base: 6e4, intScale: 1500 },
      // Partial Ashborn         — INT 2850 → ~140,078
      "Monarch+": { base: 25e4, intScale: 4e3 },
      // Beyond ch.240's 130k    — INT 4275 → ~511,533
      "Shadow Monarch": { base: Infinity, intScale: 0 }
      // Full Ashborn power — limitless
    };
    var RANK_PROBABILITY_MULTIPLIERS = {
      E: 10,
      D: 5,
      C: 2.5,
      B: 1,
      A: 0.5,
      S: 0.2,
      SS: 0.1,
      SSS: 0.05,
      "SSS+": 0.02,
      NH: 0.01,
      Monarch: 5e-3,
      "Monarch+": 1e-3,
      "Shadow Monarch": 1e-4
    };
    var RANK_STAT_MULTIPLIERS = {
      E: 1,
      D: 1.35,
      C: 1.8225,
      B: 2.460375,
      A: 3.32150625,
      S: 4.4840334375,
      SS: 6.053445140625,
      SSS: 8.17215093984375,
      "SSS+": 11.032403768789065,
      NH: 14.893745087865238,
      Monarch: 20.10655586861807,
      "Monarch+": 27.143850422634397,
      "Shadow Monarch": 36.64419807055644
    };
    var HEAL_VERSION = 1;
    var STYLE_ID_EXTRACTION = "shadow-army-extraction-styles";
    var STYLE_ID_ARISE = "shadow-army-arise-styles";
    var STYLE_ID_WIDGET = "shadow-army-widget-styles";
    var STYLE_ID_SETTINGS = "shadow-army-settings-styles";
    module2.exports = {
      // Personality helpers
      SHADOW_PERSONALITY_ROLE_MAP,
      STAT_KEYS,
      // Grade system (manhwa lore)
      SHADOW_GRADES,
      normalizeShadowPersonalityValue,
      deriveShadowPersonalityFromRole,
      // Animation
      ARISE_SVG,
      // Settings
      DEFAULT_SETTINGS,
      // Rank system
      SHADOW_RANKS,
      VETERANCY_RATE,
      SHADOW_ROLES,
      SHADOW_ROLE_STAT_WEIGHTS,
      RANK_PROBABILITY_MULTIPLIERS,
      RANK_STAT_MULTIPLIERS,
      SHADOW_ARMY_CAPACITY,
      // Self-heal
      HEAL_VERSION,
      // CSS style IDs
      STYLE_ID_EXTRACTION,
      STYLE_ID_ARISE,
      STYLE_ID_WIDGET,
      STYLE_ID_SETTINGS
    };
  }
});

// src/ShadowArmy/storage.js
var require_storage = __commonJS({
  "src/ShadowArmy/storage.js"(exports2, module2) {
    var {
      normalizeShadowPersonalityValue,
      deriveShadowPersonalityFromRole
    } = require_constants();
    var ShadowStorageManager2 = class {
      // CONSTRUCTOR & CONFIGURATION
      /**
       * Initialize ShadowStorageManager with user ID
       * @param {string} userId - Discord user ID for database naming
       * @param {Function} debugLogFn - Debug logging function from parent plugin
       * @param {Function} debugErrorFn - Error logging function from parent plugin
       */
      constructor(userId, debugLogFn = null, debugErrorFn = null) {
        this.userId = userId || "default";
        this.dbName = `ShadowArmyDB_${this.userId}`;
        this.dbVersion = 3;
        this.storeName = "shadows";
        this.db = null;
        this.debugLog = debugLogFn || (() => {
        });
        this.debugError = debugErrorFn || ((tag, msg, err) => {
          console.error(`[ShadowStorageManager:${tag}]`, msg, err);
        });
        this.recentCache = /* @__PURE__ */ new Map();
        this.cacheLimit = 100;
        this.cachedBuffs = null;
        this.cachedBuffsTime = null;
        try {
          const persistedMigration = BdApi.Data.load("ShadowArmy", "migrationCompleted");
          this.migrationCompleted = persistedMigration === true;
          this.debugLog("STORAGE", "Migration status loaded", { completed: this.migrationCompleted });
        } catch (error) {
          this.debugError("STORAGE", "Failed to load migration flag from BdApi.Data", error);
          this.migrationCompleted = false;
        }
        this.personalityMigrationFlagKey = `personalityKeyMigrationCompleted_${this.userId}`;
        try {
          this.personalityKeyMigrationCompleted = BdApi.Data.load("ShadowArmy", this.personalityMigrationFlagKey) === true;
        } catch (error) {
          this.debugError("STORAGE", "Failed to load personality migration flag", error);
          this.personalityKeyMigrationCompleted = false;
        }
      }
      // CACHE MANAGEMENT
      getCacheKey(shadow) {
        if (!shadow) return null;
        return shadow.id || shadow.i || null;
      }
      normalizePersonalityValue(value) {
        return normalizeShadowPersonalityValue(value);
      }
      derivePersonalityKeyFromRole(role) {
        return deriveShadowPersonalityFromRole(role);
      }
      getNormalizedPersonalityKey(shadow) {
        if (!shadow || typeof shadow !== "object") return "";
        const explicitKey = this.normalizePersonalityValue(shadow.personalityKey || shadow.pk);
        if (explicitKey) return explicitKey;
        const explicitPersonality = this.normalizePersonalityValue(shadow.personality);
        if (explicitPersonality) return explicitPersonality;
        const role = shadow.role || shadow.ro || "";
        return this.derivePersonalityKeyFromRole(role);
      }
      ensurePersonalityKey(shadow) {
        if (!shadow || typeof shadow !== "object") return { shadow, changed: false };
        const normalizedKey = this.getNormalizedPersonalityKey(shadow);
        const currentKey = this.normalizePersonalityValue(shadow.personalityKey);
        const currentPersonality = this.normalizePersonalityValue(shadow.personality);
        let changed = false;
        if (currentKey !== normalizedKey) {
          shadow.personalityKey = normalizedKey;
          changed = true;
        } else if (!Object.prototype.hasOwnProperty.call(shadow, "personalityKey")) {
          shadow.personalityKey = normalizedKey;
          changed = true;
        }
        if (!currentPersonality && normalizedKey) {
          shadow.personality = normalizedKey;
          changed = true;
        } else if (currentPersonality && shadow.personality !== currentPersonality) {
          shadow.personality = currentPersonality;
          changed = true;
        }
        if ((shadow._c === 1 || shadow._c === 2) && this.normalizePersonalityValue(shadow.pk) !== normalizedKey) {
          shadow.pk = normalizedKey;
          changed = true;
        }
        return { shadow, changed };
      }
      invalidateCache(shadow) {
        if (!shadow) return;
        const id = shadow.id || shadow.i;
        if (id) this.recentCache.delete(id);
        if (shadow.id && shadow.i && shadow.id !== shadow.i) {
          this.recentCache.delete(shadow.i);
        }
      }
      updateCache(shadow, oldShadow = null) {
        const shadowId = this.getCacheKey(shadow);
        if (!shadow || !shadowId) return;
        if (oldShadow) {
          this.invalidateCache(oldShadow);
        }
        this.recentCache.delete(shadowId);
        this.recentCache.set(shadowId, shadow);
        if (this.recentCache.size > this.cacheLimit) {
          const firstKey = this.recentCache.keys().next().value;
          this.recentCache.delete(firstKey);
        }
      }
      clearCache() {
        this.recentCache.clear();
        this.debugLog("CACHE", "Recent cache cleared");
      }
      // SHADOW DATA HELPERS
      /**
       * Get shadow in correct format (decompress if needed).
       * decompressShadow/decompressShadowUltra are wired up externally.
       */
      getShadowData(shadow) {
        if (!shadow) return null;
        const decompressors = {
          1: this.decompressShadow,
          2: this.decompressShadowUltra
        };
        const decompressor = decompressors[shadow._c];
        return typeof decompressor === "function" ? decompressor.call(this, shadow) : shadow;
      }
      // DATABASE INITIALIZATION
      async init() {
        return new Promise((resolve, reject) => {
          if (!window.indexedDB) {
            const error = new Error("IndexedDB not supported");
            this.debugError("INIT", "IndexedDB not supported, falling back to localStorage", error);
            reject(error);
            return;
          }
          this.debugLog("INIT", "Opening IndexedDB", { dbName: this.dbName, version: this.dbVersion });
          const request = indexedDB.open(this.dbName, this.dbVersion);
          request.onerror = () => {
            this.debugError("INIT", "Failed to open database", request.error);
            reject(request.error);
          };
          request.onblocked = () => {
            this.debugError("INIT", "Database upgrade blocked \u2014 close other Discord windows");
            reject(new Error("ShadowArmy IDB blocked by another window"));
          };
          request.onsuccess = () => {
            this.db = request.result;
            this.db.onversionchange = () => {
              this.debugLog("INIT", "Database version changed in another window \u2014 closing connection");
              this.db.close();
              this.db = null;
            };
            this.debugLog("INIT", "Database opened successfully", { dbName: this.dbName });
            resolve(this.db);
          };
          request.onupgradeneeded = (event) => {
            const db = event.target.result;
            const oldVersion = event.oldVersion;
            this.debugLog("INIT", "Database upgrade needed", { oldVersion, newVersion: this.dbVersion });
            if (!db.objectStoreNames.contains(this.storeName)) {
              const objectStore = db.createObjectStore(this.storeName, { keyPath: "id" });
              objectStore.createIndex("rank", "rank", { unique: false });
              objectStore.createIndex("role", "role", { unique: false });
              objectStore.createIndex("level", "level", { unique: false });
              objectStore.createIndex("strength", "strength", { unique: false });
              objectStore.createIndex("extractedAt", "extractedAt", { unique: false });
              objectStore.createIndex("rank_role", ["rank", "role"], { unique: false });
              objectStore.createIndex("personality", "personality", { unique: false });
              objectStore.createIndex("personalityKey", "personalityKey", { unique: false });
              this.debugLog("INIT", "Created object store and indexes", { storeName: this.storeName });
            }
            if (oldVersion < 2) {
              const transaction = event.target.transaction;
              const objectStore = transaction.objectStore(this.storeName);
              if (!objectStore.indexNames.contains("lastNaturalGrowth")) {
                objectStore.createIndex("lastNaturalGrowth", "lastNaturalGrowth", { unique: false });
              }
              if (!objectStore.indexNames.contains("totalCombatTime")) {
                objectStore.createIndex("totalCombatTime", "totalCombatTime", { unique: false });
              }
              if (!objectStore.indexNames.contains("personality")) {
                objectStore.createIndex("personality", "personality", { unique: false });
              }
              this.debugLog("INIT", "Added v2 indexes for natural growth", { oldVersion });
            }
            if (oldVersion < 3) {
              const transaction = event.target.transaction;
              const objectStore = transaction.objectStore(this.storeName);
              if (!objectStore.indexNames.contains("personalityKey")) {
                objectStore.createIndex("personalityKey", "personalityKey", { unique: false });
              }
              this.debugLog("INIT", "Added v3 index for personality key normalization", { oldVersion });
            }
          };
        });
      }
      /**
       * Execute a function within an IndexedDB transaction.
       * Eliminates boilerplate for db init check, transaction creation, error handling.
       */
      async _withStore(mode, fn) {
        try {
          const callers = window.__SA_STORE_CALLERS ||= /* @__PURE__ */ new Map();
          const lines = (new Error().stack || "").split("\n");
          const names = [];
          for (let i = 2; i < lines.length && names.length < 3; i++) {
            const fm = /\bat\s+(?:async\s+)?([\w$.<>[\]]+)/.exec(lines[i] || "");
            if (fm && fm[1] !== "Object.<anonymous>") names.push(fm[1]);
          }
          const key = `${names.length ? names.join("<") : "(anon)"} [${mode}]`;
          callers.set(key, (callers.get(key) || 0) + 1);
          this.__saLastCaller = key;
        } catch (_) {
        }
        if (!this.db) await this.init();
        if (!this.db) throw new Error("ShadowArmy: Database not initialized");
        return new Promise((resolve, reject) => {
          const transaction = this.db.transaction([this.storeName], mode, { durability: "relaxed" });
          try {
            transaction.__saCaller = this.__saLastCaller;
          } catch (_) {
          }
          const store = transaction.objectStore(this.storeName);
          transaction.onerror = () => reject(transaction.error);
          fn(store, transaction, resolve, reject);
        });
      }
      // MIGRATION FROM LOCALSTORAGE
      async migrateFromLocalStorage() {
        if (this.migrationCompleted) {
          this.debugLog("MIGRATION", "Migration already completed, skipping");
          return { migrated: false, reason: "Already migrated" };
        }
        try {
          this.debugLog("MIGRATION", "Starting migration from localStorage to IndexedDB");
          const oldData = BdApi.Data.load("ShadowArmy", "settings");
          if (!oldData || !oldData.shadows || !Array.isArray(oldData.shadows) || oldData.shadows.length === 0) {
            this.migrationCompleted = true;
            BdApi.Data.save("ShadowArmy", "migrationCompleted", true);
            this.debugLog("MIGRATION", "No data to migrate");
            return { migrated: false, reason: "No data to migrate" };
          }
          this.debugLog("MIGRATION", "Found shadows to migrate", { count: oldData.shadows.length });
          if (!this.db) {
            await this.init();
          }
          const { completed: migrated } = await this.saveShadowsBatch(oldData.shadows);
          this.migrationCompleted = true;
          BdApi.Data.save("ShadowArmy", "migrationCompleted", true);
          this.debugLog("MIGRATION", "Migration completed successfully", {
            migrated,
            total: oldData.shadows.length
          });
          return {
            migrated: true,
            count: migrated,
            shadows: oldData.shadows.length
          };
        } catch (error) {
          this.debugError("MIGRATION", "Migration failed", error);
          return { migrated: false, error: error.message };
        }
      }
      /**
       * Backfill personalityKey for all existing IndexedDB shadow records in batches.
       */
      async migratePersonalityKeys({ batchSize = 1e3 } = {}) {
        if (!this.db) await this.init();
        const safeBatchSize = Math.max(100, Math.floor(batchSize) || 1e3);
        const MAX_BATCHES = 500;
        let scanned = 0;
        let updated = 0;
        let errors = 0;
        let batches = 0;
        let lastKey = null;
        while (batches < MAX_BATCHES) {
          const batchResult = await new Promise((resolve, reject) => {
            const tx = this.db.transaction([this.storeName], "readwrite");
            const store = tx.objectStore(this.storeName);
            const range = lastKey == null ? null : IDBKeyRange.lowerBound(lastKey, true);
            let localScanned = 0;
            let localUpdated = 0;
            let localErrors = 0;
            let nextKey = null;
            let cursorFinished = false;
            const request = range ? store.openCursor(range) : store.openCursor();
            request.onsuccess = (event) => {
              const cursor = event.target.result;
              if (!cursor) {
                cursorFinished = true;
                return;
              }
              localScanned++;
              const shadow = cursor.value;
              const { shadow: normalizedShadow, changed } = this.ensurePersonalityKey(shadow);
              const shouldContinue = localScanned < safeBatchSize;
              nextKey = cursor.key;
              if (!changed) {
                if (shouldContinue) cursor.continue();
                return;
              }
              const updateRequest = cursor.update(normalizedShadow);
              updateRequest.onsuccess = () => {
                localUpdated++;
              };
              updateRequest.onerror = (event2) => {
                event2.preventDefault();
                event2.stopPropagation();
                localErrors++;
              };
              if (shouldContinue) cursor.continue();
            };
            request.onerror = () => reject(request.error);
            tx.oncomplete = () => {
              resolve({ scanned: localScanned, updated: localUpdated, errors: localErrors, nextKey, cursorFinished });
            };
            tx.onerror = () => reject(tx.error);
          });
          scanned += batchResult.scanned;
          updated += batchResult.updated;
          errors += batchResult.errors;
          batches++;
          if (batchResult.cursorFinished || batchResult.scanned === 0) break;
          if (batchResult.nextKey == null) break;
          lastKey = batchResult.nextKey;
          await new Promise((resolve) => setTimeout(resolve, 0));
        }
        if (batches >= MAX_BATCHES) {
          this.debugError("MIGRATION", "migratePersonalityKeys: hit MAX_BATCHES cap \u2014 migration may be incomplete; scanned=" + scanned + " batches=" + batches, null);
        }
        return { scanned, updated, errors, batches };
      }
      async ensurePersonalityKeyMigration(force = false) {
        if (!force && this.personalityKeyMigrationCompleted) {
          return { migrated: false, reason: "Already migrated", scanned: 0, updated: 0, errors: 0 };
        }
        const result = await this.migratePersonalityKeys({ batchSize: 1e3 });
        if (result.errors === 0) {
          this.personalityKeyMigrationCompleted = true;
          try {
            BdApi.Data.save("ShadowArmy", this.personalityMigrationFlagKey, true);
          } catch (error) {
            this.debugError("MIGRATION", "Failed to persist personality key migration flag", error);
          }
        }
        return { migrated: true, ...result };
      }
      // SHADOW CRUD OPERATIONS
      async saveShadow(shadow) {
        if (!shadow || !this.getCacheKey(shadow)) {
          throw new Error("Invalid shadow object: missing id or i");
        }
        if (!shadow._c) {
          if (!shadow.rank) {
            this.debugError("STORAGE", "saveShadow: missing rank, defaulting to E", { id: this.getCacheKey(shadow) });
            shadow.rank = "E";
          }
          if (!shadow.baseStats || typeof shadow.baseStats !== "object") {
            this.debugError("STORAGE", "saveShadow: missing baseStats, applying defaults", { id: this.getCacheKey(shadow) });
            shadow.baseStats = { strength: 10, agility: 10, intelligence: 10, vitality: 10, perception: 10 };
          }
        }
        const { shadow: normalizedShadow } = this.ensurePersonalityKey(shadow);
        return this._withStore("readwrite", (store, _tx, resolve, reject) => {
          const request = store.put(normalizedShadow);
          request.onsuccess = () => {
            this.updateCache(normalizedShadow);
            resolve({ success: true, shadow: normalizedShadow });
          };
          request.onerror = () => reject(request.error);
        });
      }
      async saveShadowsBatch(shadows) {
        if (!shadows || !Array.isArray(shadows) || shadows.length === 0) {
          return { completed: 0, failedIndices: [] };
        }
        return this._withStore("readwrite", (store, tx, resolve, reject) => {
          let completed = 0;
          const failedIndices = [];
          tx.oncomplete = () => resolve({ completed, failedIndices });
          tx.onabort = () => reject(tx.error || new Error("saveShadowsBatch transaction aborted"));
          shadows.forEach((shadow, index) => {
            const shadowId = this.getCacheKey(shadow);
            if (!shadow || !shadowId) {
              this.debugError("BATCH_SAVE", `Invalid shadow at index ${index}`, { index });
              failedIndices.push(index);
              return;
            }
            const { shadow: normalizedShadow } = this.ensurePersonalityKey(shadow);
            const request = store.put(normalizedShadow);
            request.onsuccess = () => {
              completed++;
            };
            request.onerror = (event) => {
              event.preventDefault();
              event.stopPropagation();
              failedIndices.push(index);
              this.debugError("BATCH_SAVE", `Failed to save shadow at index ${index}`, {
                index,
                id: shadowId,
                error: request.error
              });
            };
          });
        });
      }
      /**
       * Chunked batch save — writes shadows in sequential IDB transactions with
       * event-loop yields between chunks to keep the UI responsive.
       *
       * Default raised 10 -> 100 (2026-07-30, burst capture): at 10 per chunk a
       * 500-shadow combat growth save cost FIFTY transactions, and the profiler
       * measured 369 saveShadowsBatch transactions in 3 minutes (~123/min) with
       * 3 dungeons active — the top storage caller in the suite. Every other
       * batch path here already uses 200-400 per transaction (getShadowsByIds
       * 200, transformShadowsBatch 200, compression tiering 400), so 10 was an
       * outlier, not a considered limit. Records are ~1KB, so 100/txn is well
       * inside safe territory and the inter-chunk yield is preserved.
       */
      async saveShadowsChunked(shadows, chunkSize = 100) {
        if (!shadows || !Array.isArray(shadows) || shadows.length === 0) {
          return { completed: 0, failedIndices: [] };
        }
        if (shadows.length <= chunkSize) {
          return this.saveShadowsBatch(shadows);
        }
        let totalCompleted = 0;
        const failedIndices = [];
        for (let i = 0; i < shadows.length; i += chunkSize) {
          const chunk = shadows.slice(i, i + chunkSize);
          const { completed, failedIndices: chunkFailedIndices } = await this.saveShadowsBatch(chunk);
          totalCompleted += completed;
          chunkFailedIndices.forEach((idx) => failedIndices.push(i + idx));
          if (i + chunkSize < shadows.length) {
            await new Promise((r) => setTimeout(r, 0));
          }
        }
        return { completed: totalCompleted, failedIndices };
      }
      /**
       * Get a page of shadows via primary-key cursor resume (keyset pagination).
       * Unlike getShadows()'s offset pagination — which costs O(offset) cursor
       * steps to skip to a position, growing to O(N) near the end of a large
       * store — this resumes directly from lastKey via IDBKeyRange, so each call
       * costs O(limit) regardless of how far through the store it is. Same
       * resume-cursor pattern as migratePersonalityKeys() above.
       * @param {string|null} lastKey - primary key ('id') to resume after, or null to start from the beginning
       * @param {number} limit - max records to return
       * @returns {Promise<{shadows: Array, lastKey: string|null, exhausted: boolean}>}
       */
      async getShadowsByKeyPage(lastKey, limit) {
        const safeLimit = Math.max(1, Math.floor(Number(limit) || 1));
        return this._withStore("readonly", (store, _tx, resolve, reject) => {
          const range = lastKey == null ? null : IDBKeyRange.lowerBound(lastKey, true);
          const request = store.getAll(range, safeLimit);
          request.onsuccess = () => {
            var _a;
            const results = request.result || [];
            if (results.length === 0) {
              resolve({ shadows: results, lastKey: null, exhausted: true });
              return;
            }
            if (results.length < safeLimit) {
              resolve({ shadows: results, lastKey: null, exhausted: true });
              return;
            }
            resolve({
              shadows: results,
              lastKey: ((_a = results[results.length - 1]) == null ? void 0 : _a.id) ?? null,
              exhausted: false
            });
          };
          request.onerror = () => reject(request.error);
        });
      }
      /**
       * Keyset page of shadow IDs only (2026-07-30).
       *
       * store.getAllKeys returns primary keys without materialising the records,
       * which is what an id-only enumeration actually needs. getShadowsByKeyPage
       * would deserialise every record in the slice just to read `.id` off it —
       * fine when the caller wants the records, pure waste when it does not.
       *
       * One request per page, same keyset contract as getShadowsByKeyPage:
       * `{ ids, lastKey, exhausted }`, lastKey null once the range is drained.
       */
      async getShadowKeyPage(lastKey, limit) {
        const safeLimit = Math.max(1, Math.floor(Number(limit) || 1));
        return this._withStore("readonly", (store, _tx, resolve, reject) => {
          const range = lastKey == null ? null : IDBKeyRange.lowerBound(lastKey, true);
          const request = store.getAllKeys(range, safeLimit);
          request.onsuccess = () => {
            const keys = request.result || [];
            if (keys.length === 0) {
              resolve({ ids: [], lastKey: null, exhausted: true });
              return;
            }
            if (keys.length < safeLimit) {
              resolve({ ids: keys, lastKey: null, exhausted: true });
              return;
            }
            resolve({ ids: keys, lastKey: keys[keys.length - 1], exhausted: false });
          };
          request.onerror = () => reject(request.error);
        });
      }
      /**
       * Get shadows with pagination and filters (optimized with indexes).
       */
      async getShadows(filters = {}, offset = 0, limit = 50, sortBy = "extractedAt", sortOrder = "desc") {
        if (offset < 0) offset = 0;
        if (limit !== Infinity && (!Number.isFinite(limit) || limit < 1)) limit = 50;
        const wantsUnlimited = limit === Infinity || !Number.isFinite(limit);
        const cursorDirection = sortOrder === "asc" ? "next" : "prev";
        const hasFilters = !!(filters.rank || filters.role || filters.minLevel || filters.maxLevel || filters.minStrength);
        return this._withStore("readonly", (store, _tx, resolve, reject) => {
          if (!hasFilters && !wantsUnlimited && Number.isFinite(limit) && limit > 0) {
            let source = store;
            let canUseCursorPage = true;
            if (sortBy && sortBy !== "id") {
              try {
                source = store.index(sortBy);
              } catch (_) {
                source = store;
                canUseCursorPage = false;
              }
            }
            if (canUseCursorPage) {
              const request2 = source.openCursor(null, cursorDirection);
              const results2 = [];
              let scanned = 0;
              request2.onsuccess = (event) => {
                const cursor = event.target.result;
                if (!cursor) {
                  resolve(results2);
                  return;
                }
                if (scanned < offset) {
                  scanned++;
                  cursor.continue();
                  return;
                }
                results2.push(cursor.value);
                if (results2.length >= limit) {
                  resolve(results2);
                  return;
                }
                cursor.continue();
              };
              request2.onerror = () => reject(request2.error);
              return;
            }
          }
          let index = store;
          if (filters.rank && filters.role) {
            try {
              index = store.index("rank_role");
            } catch (e) {
            }
          } else if (filters.rank) {
            try {
              index = store.index("rank");
            } catch (e) {
            }
          } else if (filters.role) {
            try {
              index = store.index("role");
            } catch (e) {
            }
          }
          const results = [];
          const request = index.openCursor();
          request.onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor) {
              const shadow = cursor.value;
              let matches = true;
              if (filters.rank && shadow.rank !== filters.rank) matches = false;
              if (filters.role && shadow.role !== filters.role) matches = false;
              if (filters.minLevel && (shadow.level || 1) < filters.minLevel) matches = false;
              if (filters.maxLevel && (shadow.level || 1) > filters.maxLevel) matches = false;
              if (filters.minStrength && (shadow.strength || 0) < filters.minStrength) matches = false;
              if (matches) results.push(shadow);
              cursor.continue();
            } else {
              results.sort((a, b) => {
                const aVal = a[sortBy] || 0;
                const bVal = b[sortBy] || 0;
                return sortOrder === "desc" ? bVal - aVal : aVal - bVal;
              });
              if (wantsUnlimited) {
                resolve(results.slice(offset));
              } else {
                resolve(results.slice(offset, offset + limit));
              }
            }
          };
          request.onerror = () => reject(request.error);
        });
      }
      /**
       * UNORDERED full-store stream using paged getAll() on the PRIMARY key
       * (unique → keyset-safe, no boundary loss). ~batchSize records per IDB
       * event instead of ONE per record: openCursor/continue costs 281k
       * onsuccess callbacks per walk at army scale (AAPerfSentinel 2026-07-29
       * measured 370M callbacks/2.5h across all walkers — the "idle churn").
       * Use for anything order-insensitive: tallies, sums, censuses, power
       * accumulation. onBatch must be synchronous (runs in the live txn).
       */
      async forEachShadowBatchPaged(onBatch, { batchSize = 500 } = {}) {
        if (typeof onBatch !== "function") {
          throw new Error("forEachShadowBatchPaged requires an onBatch callback");
        }
        const size = Math.max(50, Math.floor(batchSize) || 500);
        let scanned = 0;
        let batches = 0;
        return this._withStore("readonly", (store, _tx, resolve, reject) => {
          const issue = (lastId) => {
            const range = lastId === null ? null : IDBKeyRange.lowerBound(lastId, true);
            const req = store.getAll(range, size);
            req.onsuccess = () => {
              var _a, _b;
              const page = req.result || [];
              if (page.length > 0) {
                try {
                  onBatch(page);
                } catch (error) {
                  reject(error);
                  return;
                }
                scanned += page.length;
                batches++;
              }
              if (page.length < size) {
                resolve({ scanned, batches });
                return;
              }
              const lastId2 = (_a = page[page.length - 1]) == null ? void 0 : _a.id;
              if (lastId2 === void 0 || lastId2 === null) {
                (_b = this.debugError) == null ? void 0 : _b.call(
                  this,
                  "STORAGE",
                  `forEachShadowBatchPaged: record without an id after ${scanned} scanned \u2014 stopping walk early`,
                  null
                );
                resolve({ scanned, batches, truncated: true });
                return;
              }
              try {
                issue(lastId2);
              } catch (error) {
                reject(error);
              }
            };
            req.onerror = () => reject(req.error);
          };
          issue(null);
        });
      }
      /**
       * Stream shadows in fixed-size batches without materializing the whole table.
       * IMPORTANT: onBatch must be synchronous (no awaits) — runs inside live IDB transaction.
       * NOTE: per-record cursor iteration (1 IDB event per record). Prefer
       * forEachShadowBatchPaged when ordering doesn't matter.
       */
      async forEachShadowBatch(onBatch, { batchSize = 200, sortBy = "extractedAt", sortOrder = "desc" } = {}) {
        if (typeof onBatch !== "function") {
          throw new Error("forEachShadowBatch requires an onBatch callback");
        }
        const safeBatchSize = Math.max(25, Math.floor(batchSize) || 200);
        const cursorDirection = sortOrder === "asc" ? "next" : "prev";
        let scanned = 0;
        let batches = 0;
        await this._withStore("readonly", (store, _tx, resolve, reject) => {
          let source = store;
          if (sortBy && sortBy !== "id") {
            try {
              source = store.index(sortBy);
            } catch (_) {
              source = store;
            }
          }
          const request = source.openCursor(null, cursorDirection);
          let batch = [];
          const emitBatch = () => {
            if (batch.length === 0) return true;
            try {
              const maybePromise = onBatch(batch);
              if (maybePromise && typeof maybePromise.then === "function") {
                reject(new Error("forEachShadowBatch callback must be synchronous"));
                return false;
              }
              batches++;
              batch = [];
              return true;
            } catch (error) {
              reject(error);
              return false;
            }
          };
          request.onsuccess = (event) => {
            const cursor = event.target.result;
            if (!cursor) {
              emitBatch();
              resolve({ scanned, batches });
              return;
            }
            batch.push(cursor.value);
            scanned++;
            if (batch.length >= safeBatchSize && !emitBatch()) return;
            cursor.continue();
          };
          request.onerror = () => reject(request.error);
        });
        return { scanned, batches };
      }
      /**
       * Collect every shadow via the bounded batch cursor (forEachShadowBatch)
       * instead of getShadows({}, 0, Infinity)'s FILTERED PATH, which opens an
       * unindexed store cursor then does a full in-memory Array.sort over the
       * entire result — wasted work when the caller needs the whole army anyway
       * (order already comes out correct from the index-ordered cursor below).
       * Returns raw records as stored (no auto-decompression) — same contract
       * as the getShadows() call sites this replaces.
       */
      async getAllShadowsRaw({ batchSize = 500 } = {}) {
        const collected = [];
        await this.forEachShadowBatchPaged(
          (batch) => {
            for (let i = 0; i < batch.length; i++) collected.push(batch[i]);
          },
          { batchSize }
        );
        return collected;
      }
      async getTotalCount() {
        return this._withStore("readonly", (store, _tx, resolve, reject) => {
          const request = store.count();
          request.onsuccess = () => resolve(request.result);
          request.onerror = () => reject(request.error || new Error("IDB count failed"));
        });
      }
      /**
       * Fetch a targeted set of shadows by ID in bounded chunks.
       */
      async getShadowsByIds(ids = [], { chunkSize = 200 } = {}) {
        if (!Array.isArray(ids) || ids.length === 0) return [];
        const uniqueIds = Array.from(
          new Set(
            ids.map((id) => id === null || id === void 0 ? "" : String(id).trim()).filter(Boolean)
          )
        );
        if (uniqueIds.length === 0) return [];
        const safeChunkSize = Math.max(25, Math.floor(chunkSize) || 200);
        const results = [];
        for (let i = 0; i < uniqueIds.length; i += safeChunkSize) {
          const idChunk = uniqueIds.slice(i, i + safeChunkSize);
          const chunkResults = await this._withStore("readonly", (store, _tx, resolve) => {
            const found = [];
            let remaining = idChunk.length;
            if (remaining === 0) {
              resolve(found);
              return;
            }
            const finalize = () => {
              remaining -= 1;
              if (remaining <= 0) resolve(found);
            };
            idChunk.forEach((id) => {
              const request = store.get(id);
              request.onsuccess = () => {
                request.result && found.push(request.result);
                finalize();
              };
              request.onerror = (event) => {
                var _a;
                event.preventDefault();
                event.stopPropagation();
                (_a = this.debugError) == null ? void 0 : _a.call(this, "IDB", "getShadowsByIds: request error", { id, error: request.error });
                finalize();
              };
            });
          });
          chunkResults.length > 0 && results.push(...chunkResults);
        }
        return results;
      }
      async deleteShadow(id) {
        if (!id) throw new Error("Invalid shadow ID: missing id");
        return this._withStore("readwrite", (store, _tx, resolve, reject) => {
          const request = store.delete(id);
          request.onsuccess = () => {
            const cachedShadow = this.recentCache.get(id);
            if (cachedShadow) {
              this.invalidateCache(cachedShadow);
            } else {
              this.recentCache.delete(id);
            }
            resolve({ success: true });
          };
          request.onerror = () => reject(request.error);
        });
      }
      // BATCH OPERATIONS
      async updateShadowsBatch(shadows) {
        if (!shadows || !Array.isArray(shadows) || shadows.length === 0) return 0;
        return this._withStore("readwrite", (store, tx, resolve, reject) => {
          let completed = 0;
          tx.oncomplete = () => resolve(completed);
          tx.onabort = () => reject(tx.error || new Error("updateShadowsBatch transaction aborted"));
          shadows.forEach((shadow, index) => {
            if (!shadow) {
              return;
            }
            const idForStore = this.getCacheKey(shadow);
            if (!idForStore) {
              this.debugError("BATCH_UPDATE", `Invalid shadow at index ${index}`, {
                index,
                hasI: !!shadow.i,
                hasId: !!shadow.id
              });
              return;
            }
            shadow.id || (shadow.id = idForStore);
            const { shadow: normalizedShadow } = this.ensurePersonalityKey(shadow);
            const request = store.put(normalizedShadow);
            request.onsuccess = () => {
              completed++;
              const oldShadow = this.recentCache.get(this.getCacheKey(normalizedShadow));
              if (oldShadow) this.invalidateCache(oldShadow);
              this.updateCache(normalizedShadow, oldShadow);
            };
            request.onerror = (event) => {
              event.preventDefault();
              event.stopPropagation();
              this.debugError("BATCH_UPDATE", `Failed to update shadow at index ${index}`, {
                index,
                id: this.getCacheKey(normalizedShadow),
                error: request.error
              });
            };
          });
        });
      }
      /**
       * Merge-on-write batch transform — chunked readwrite transactions where
       * each id is `get`-ed FRESH inside the transaction, passed to `transformFn`,
       * and the returned record is `put` back in the SAME transaction. Fixes the
       * ShadowArmy lost-update class (self-heal / hourly compression tiering /
       * autoPromoteGrades / XP grant-flush all used to read one full-army
       * snapshot, mutate in memory across several `await`s, then batch-`put`
       * stale full records — silently reverting whatever any other pass wrote
       * to the same shadow in between). See
       * memory/scratch/arch-sa-concurrency-2026-07-12.md for the audit.
       *
       * `transformFn` MUST be synchronous — no `await` inside it. IndexedDB
       * transactions auto-commit once the microtask queue empties; an `await`
       * inside transformFn yields control back to the event loop, the browser
       * closes the transaction underneath the pending `get`/`put` calls, and
       * every subsequent request in that chunk fails with
       * TransactionInactiveError. Do all async work (fetching related data,
       * yielding between chunks) OUTSIDE transformFn, before calling this.
       *
       * @param {Array<string>} ids - primary keys ('id') to transform.
       * @param {(freshRecord: object) => (object|null|undefined)} transformFn -
       *   receives the FRESH record read inside this transaction. Return the
       *   record to `put()`, or null/undefined to skip the write for that id
       *   (e.g. the id no longer exists, or nothing changed).
       * @param {Object} [opts]
       * @param {number} [opts.chunkSize=200] - ids per IDB readwrite transaction.
       * @returns {Promise<{completed: number, skipped: number, failedIds: Array<string>}>}
       *
       * Field ownership (which pass writes which field — audited 2026-07-12,
       * memory/scratch/arch-sa-concurrency-2026-07-12.md). Callers rewired to
       * this primitive derive every written field from the FRESH record passed
       * into transformFn, never from a captured snapshot, so this table only
       * needs to call out fields two DIFFERENT passes both touch:
       *   beastType, beastFamily          -> self-heal only (role-derived)
       *   baseStats                       -> self-heal only (full recompute)
       *   growthStats                     -> self-heal (init-if-missing only),
       *                                       progression (level-up append)
       *   naturalGrowthStats              -> self-heal (init-if-missing only)
       *   level, xp                       -> self-heal (init-if-missing only),
       *                                       progression (grant/level-up/rank carry)
       *   rank                            -> progression (attemptAutoRankUp) only
       *   strength                        -> self-heal (recalc from fresh
       *                                       base+growth stats) AND progression
       *                                       (level/rank-up recalc) — the one
       *                                       TRUE same-field race, but both
       *                                       derive strength from the SAME fresh
       *                                       baseStats/growthStats via
       *                                       getShadowEffectiveStats(), so
       *                                       whichever write lands last is still
       *                                       self-consistent with what's on the
       *                                       record at that moment
       *   grade / gr                      -> compression.autoPromoteGrades only;
       *                                       self-heal and compression-tiering
       *                                       pass it through unchanged from the
       *                                       fresh record
       *   _c + compressed representation  -> compression tiering only (self-heal,
       *                                       when it heals a dirty record, always
       *                                       writes an uncompressed record
       *                                       regardless of prior tier —
       *                                       pre-existing behavior, unchanged)
       *   _healV / hv                     -> self-heal only (always stamped);
       *                                       compression/progression carry the
       *                                       existing value through unchanged
       *   totalCombatTime, lastNaturalGrowth,
       *   growthVarianceSeed, roleName    -> self-heal (init-if-missing only)
       *
       * migrations.js (Phase-1 backfill/recalc) is deliberately NOT rewired to
       * this primitive — those passes are one-time, version-gated (run once per
       * install/upgrade, never concurrently with themselves or with each other),
       * lower priority than the four recurring passes above. They still
       * snapshot-then-batch-put; tolerated because nothing else runs
       * concurrently during a one-time migration gate.
       */
      async transformShadowsBatch(ids, transformFn, opts = {}) {
        if (!Array.isArray(ids) || ids.length === 0) return { completed: 0, skipped: 0, failedIds: [] };
        if (typeof transformFn !== "function") {
          throw new Error("transformShadowsBatch requires a synchronous transformFn");
        }
        const chunkSize = Math.max(1, Math.floor(opts.chunkSize) || 200);
        let completed = 0;
        let skipped = 0;
        const failedIds = [];
        const ERR_LOG_CAP = 5;
        const errCounts = { threw: 0, get: 0, put: 0, abort: 0 };
        let lastErrorName = null;
        for (let i = 0; i < ids.length; i += chunkSize) {
          const rawChunk = ids.slice(i, i + chunkSize);
          const uniqueChunkIds = Array.from(
            new Set(rawChunk.map((id) => id === null || id === void 0 ? "" : String(id)).filter(Boolean))
          );
          if (uniqueChunkIds.length > 0) {
            try {
              await this._withStore("readwrite", (store, tx, resolve, reject) => {
                tx.oncomplete = () => resolve();
                tx.onabort = () => reject(tx.error || new Error("transformShadowsBatch transaction aborted"));
                uniqueChunkIds.forEach((id) => {
                  const getRequest = store.get(id);
                  getRequest.onsuccess = () => {
                    const freshRecord = getRequest.result;
                    if (!freshRecord) {
                      skipped++;
                      return;
                    }
                    let transformed;
                    try {
                      transformed = transformFn(freshRecord);
                    } catch (error) {
                      if (++errCounts.threw <= ERR_LOG_CAP) {
                        this.debugError("TRANSFORM_BATCH", `transformFn threw for id ${id}`, error);
                      }
                      failedIds.push(id);
                      return;
                    }
                    if (transformed === null || transformed === void 0) {
                      skipped++;
                      return;
                    }
                    transformed.id || (transformed.id = this.getCacheKey(transformed));
                    if (!transformed.id) {
                      skipped++;
                      return;
                    }
                    const { shadow: normalizedShadow } = this.ensurePersonalityKey(transformed);
                    const putRequest = store.put(normalizedShadow);
                    putRequest.onsuccess = () => {
                      completed++;
                      const oldShadow = this.recentCache.get(this.getCacheKey(normalizedShadow));
                      if (oldShadow) this.invalidateCache(oldShadow);
                      this.updateCache(normalizedShadow, oldShadow);
                    };
                    putRequest.onerror = (event) => {
                      var _a, _b, _c;
                      event.preventDefault();
                      event.stopPropagation();
                      failedIds.push(id);
                      lastErrorName = ((_a = putRequest.error) == null ? void 0 : _a.name) || lastErrorName;
                      if (++errCounts.put <= ERR_LOG_CAP) {
                        this.debugError("TRANSFORM_BATCH", `Failed to put transformed record ${id}`, {
                          name: ((_b = putRequest.error) == null ? void 0 : _b.name) || null,
                          message: ((_c = putRequest.error) == null ? void 0 : _c.message) || null
                        });
                      }
                    };
                  };
                  getRequest.onerror = (event) => {
                    var _a, _b, _c;
                    event.preventDefault();
                    event.stopPropagation();
                    failedIds.push(id);
                    lastErrorName = ((_a = getRequest.error) == null ? void 0 : _a.name) || lastErrorName;
                    if (++errCounts.get <= ERR_LOG_CAP) {
                      this.debugError("TRANSFORM_BATCH", `Failed to get record ${id} for transform`, {
                        name: ((_b = getRequest.error) == null ? void 0 : _b.name) || null,
                        message: ((_c = getRequest.error) == null ? void 0 : _c.message) || null
                      });
                    }
                  };
                });
              });
            } catch (error) {
              uniqueChunkIds.forEach((id) => failedIds.push(id));
              lastErrorName = (error == null ? void 0 : error.name) || lastErrorName;
              if (++errCounts.abort <= ERR_LOG_CAP) {
                this.debugError("TRANSFORM_BATCH", `Chunk transaction aborted (${uniqueChunkIds.length} ids)`, {
                  name: (error == null ? void 0 : error.name) || null,
                  message: (error == null ? void 0 : error.message) || null
                });
              }
            }
          }
          if (i + chunkSize < ids.length) {
            await new Promise((r) => setTimeout(r, 0));
          }
        }
        const totalErrs = errCounts.threw + errCounts.get + errCounts.put + errCounts.abort;
        if (totalErrs > ERR_LOG_CAP) {
          this.debugError(
            "TRANSFORM_BATCH",
            `Batch finished with ${failedIds.length}/${ids.length} failed ids (per-class error lines capped at ${ERR_LOG_CAP})`,
            { errorCounts: errCounts, lastErrorName }
          );
        }
        return { completed, skipped, failedIds };
      }
      async deleteShadowsBatch(shadowIds) {
        if (!shadowIds || !Array.isArray(shadowIds) || shadowIds.length === 0) return 0;
        return this._withStore("readwrite", (store, tx, resolve, reject) => {
          let completed = 0;
          tx.oncomplete = () => resolve(completed);
          tx.onabort = () => reject(tx.error || new Error("deleteShadowsBatch transaction aborted"));
          shadowIds.forEach((id, index) => {
            if (!id) {
              return;
            }
            const request = store.delete(id);
            request.onsuccess = () => {
              completed++;
              const cachedShadow = this.recentCache.get(id);
              if (cachedShadow) {
                this.invalidateCache(cachedShadow);
              } else {
                this.recentCache.delete(id);
              }
            };
            request.onerror = (event) => {
              event.preventDefault();
              event.stopPropagation();
              this.debugError("BATCH_DELETE", `Failed to delete shadow at index ${index}`, {
                index,
                id,
                error: request.error
              });
            };
          });
        });
      }
      async getCountByRank(rank) {
        return this._withStore("readonly", (store, _tx, resolve) => {
          const request = store.index("rank").count(rank);
          request.onsuccess = () => resolve(request.result || 0);
          request.onerror = () => resolve(0);
        });
      }
      /**
       * Fetch up to `limit` shadows of a single rank via the 'rank' index.
       * Bounded read — avoids a full-store scan when only a small sample of
       * one rank is needed (e.g. deployment's weakest-available-shadow lookup).
       */
      async getShadowsByRankLimited(rank, limit = 500) {
        if (!rank) return [];
        const safeLimit = Math.max(1, Math.floor(limit) || 500);
        return this._withStore("readonly", (store, _tx, resolve, reject) => {
          const request = store.index("rank").getAll(rank, safeLimit);
          request.onsuccess = () => resolve(request.result || []);
          request.onerror = () => reject(request.error || new Error("getShadowsByRankLimited failed"));
        });
      }
      // DATABASE CLEANUP
      close() {
        if (this.db) {
          this.db.close();
          this.db = null;
          this.debugLog("CLOSE", "Database connection closed");
        }
        this.clearCache();
      }
    };
    module2.exports = ShadowStorageManager2;
  }
});

// src/ShadowArmy/components.js
var require_components = __commonJS({
  "src/ShadowArmy/components.js"(exports2, module2) {
    function buildWidgetComponents2(pluginInstance) {
      const React = BdApi.React;
      const ce = React.createElement;
      const { RANK_ORDER: _RO } = require_rank_utils();
      const { SHADOW_GRADES } = require_constants();
      const RANKS = [..._RO].filter((r) => r !== "Shadow Monarch").reverse();
      const RANK_COLORS = {
        "Monarch+": "#ff6b2b",
        Monarch: "#ff4500",
        NH: "#e040fb",
        "SSS+": "#f50057",
        SSS: "#ec4899",
        SS: "#ef4444",
        S: "#f59e0b",
        A: "#8a2be2",
        B: "#3b82f6",
        C: "#22c55e",
        D: "#a0a0a0",
        E: "#999"
      };
      const RANK_LABELS = { "Monarch+": "M+", Monarch: "M", NH: "NH", "SSS+": "SSS+" };
      const ELITE_RANKS = /* @__PURE__ */ new Set(["Monarch+", "Monarch", "NH", "SSS+"]);
      const GRADE_COLORS = {
        Common: "#888",
        Elite: "#22c55e",
        Knight: "#3b82f6",
        "Elite Knight": "#8a2be2",
        General: "#f59e0b",
        Marshal: "#ef4444",
        "Grand Marshal": "#ff6b2b"
      };
      const GRADE_ABBREV = {
        Common: "C",
        Elite: "E",
        Knight: "K",
        "Elite Knight": "EK",
        General: "G",
        Marshal: "M",
        "Grand Marshal": "GM"
      };
      function formatPower(raw) {
        if (!raw) return "0";
        if (raw >= 1e6) return (raw / 1e6).toFixed(1) + "M";
        if (raw >= 1e3) return (raw / 1e3).toFixed(1) + "K";
        return String(Math.floor(raw));
      }
      function RankBox({ rank, count, color, isElite }) {
        const label = RANK_LABELS[rank] || rank;
        const boxStyle = {
          textAlign: "center",
          padding: isElite ? "3px 2px" : "4px",
          background: isElite ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.4)",
          borderRadius: "0",
          border: `1px solid ${color}${isElite ? "60" : "40"}`,
          boxShadow: isElite && count > 0 ? `0 0 6px ${color}30` : void 0,
          transition: "all 0.2s ease"
        };
        const labelStyle = {
          color,
          fontSize: isElite ? "8px" : "10px",
          fontWeight: "bold",
          textShadow: isElite && count > 0 ? `0 0 4px ${color}` : "none"
        };
        const countStyle = {
          color: count > 0 ? "#fff" : "#555",
          fontSize: isElite ? "12px" : "14px",
          fontWeight: "bold"
        };
        return ce(
          "div",
          { className: "rank-box", style: boxStyle },
          ce("div", { className: "rank-label", style: labelStyle }, label),
          ce("div", { className: "rank-count", style: countStyle }, count)
        );
      }
      function ShadowArmyWidget() {
        var _a;
        const [data, setData] = React.useState(null);
        const [refreshCounter, setRefreshCounter] = React.useState(0);
        const fetchIdRef = React.useRef(0);
        React.useEffect(() => {
          const origForceUpdate = pluginInstance._widgetForceUpdate;
          pluginInstance._widgetForceUpdate = () => setRefreshCounter((c) => c + 1);
          return () => {
            pluginInstance._widgetForceUpdate = origForceUpdate;
          };
        }, []);
        React.useEffect(() => {
          const id = ++fetchIdRef.current;
          (async () => {
            var _a2, _b;
            try {
              let tallyGrades2 = function(shadowsArr) {
                const map = {};
                for (const s of shadowsArr) {
                  const g = s.grade || "Common";
                  map[g] = (map[g] || 0) + 1;
                }
                return map;
              };
              var tallyGrades = tallyGrades2;
              let rankCounts2, totalCount2, gradeCounts2;
              const sm = pluginInstance.storageManager;
              if (sm == null ? void 0 : sm.getCountByRank) {
                try {
                  const counts = await Promise.all(
                    RANKS.map(async (rank) => ({
                      rank,
                      count: await sm.getCountByRank(rank),
                      color: RANK_COLORS[rank] || "#999"
                    }))
                  );
                  totalCount2 = await sm.getTotalCount() || counts.reduce((s, r) => s + r.count, 0);
                  rankCounts2 = counts;
                  const GRADE_CACHE_TTL = 6e4;
                  const now = Date.now();
                  if (pluginInstance._cachedGradeCounts && now - (pluginInstance._gradeCacheTs || 0) < GRADE_CACHE_TTL) {
                    gradeCounts2 = pluginInstance._cachedGradeCounts;
                  } else if (sm.forEachShadowBatch) {
                    const gradeMap = {};
                    const stream = sm.forEachShadowBatchPaged ? sm.forEachShadowBatchPaged.bind(sm) : sm.forEachShadowBatch.bind(sm);
                    await stream((batch) => {
                      for (const s of batch) {
                        const g = s.grade || "Common";
                        gradeMap[g] = (gradeMap[g] || 0) + 1;
                      }
                    });
                    pluginInstance._cachedGradeCounts = gradeMap;
                    pluginInstance._gradeCacheTs = now;
                    gradeCounts2 = gradeMap;
                  } else {
                    gradeCounts2 = tallyGrades2(pluginInstance.settings.shadows || []);
                  }
                } catch (err) {
                  (_a2 = pluginInstance.debugError) == null ? void 0 : _a2.call(pluginInstance, "WIDGET", "IDB shadow stream failed \u2014 falling back to settings.shadows (likely empty post-migration)", err);
                  const shadows = pluginInstance.settings.shadows || [];
                  totalCount2 = shadows.length;
                  const map = shadows.reduce((c, s) => {
                    c[s.rank || "E"] = (c[s.rank || "E"] || 0) + 1;
                    return c;
                  }, {});
                  rankCounts2 = RANKS.map((rank) => ({ rank, count: map[rank] || 0, color: RANK_COLORS[rank] || "#999" }));
                  gradeCounts2 = tallyGrades2(shadows);
                }
              } else {
                const shadows = pluginInstance.settings.shadows || [];
                totalCount2 = shadows.length;
                const map = shadows.reduce((c, s) => {
                  c[s.rank || "E"] = (c[s.rank || "E"] || 0) + 1;
                  return c;
                }, {});
                rankCounts2 = RANKS.map((rank) => ({ rank, count: map[rank] || 0, color: RANK_COLORS[rank] || "#999" }));
                gradeCounts2 = tallyGrades2(shadows);
              }
              let freshPower = pluginInstance.settings.cachedTotalPower || 0;
              if (typeof pluginInstance.getTotalShadowPower === "function") {
                try {
                  freshPower = await pluginInstance.getTotalShadowPower();
                } catch (_) {
                }
              }
              if (id === fetchIdRef.current) setData({ rankCounts: rankCounts2, totalCount: totalCount2, gradeCounts: gradeCounts2, totalPower: freshPower });
            } catch (err) {
              (_b = pluginInstance.debugError) == null ? void 0 : _b.call(pluginInstance, "WIDGET", "Error fetching widget data", err);
            }
          })();
        }, [refreshCounter]);
        if (!data) return null;
        const { rankCounts, totalCount, gradeCounts = {}, totalPower: rawTotalPower = 0 } = data;
        const totalPower = formatPower(rawTotalPower);
        const essence = (((_a = pluginInstance.settings.shadowEssence) == null ? void 0 : _a.essence) || 0).toLocaleString();
        const eliteRanks = rankCounts.filter((r) => ELITE_RANKS.has(r.rank));
        const standardRanks = rankCounts.filter((r) => !ELITE_RANKS.has(r.rank));
        if (totalCount === 0) {
          return ce(
            React.Fragment,
            null,
            ce(
              "div",
              { className: "widget-header", style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" } },
              ce("div", { className: "widget-title", style: { color: "#8a2be2", fontSize: "12px", fontWeight: "bold" } }, "MY SHADOW ARMY"),
              ce("div", { className: "widget-total", style: { color: "#999", fontSize: "11px" } }, "0 Total")
            ),
            ce("div", { style: { textAlign: "center", padding: "20px", color: "#999", fontSize: "11px" } }, "No shadows yet")
          );
        }
        return ce(
          React.Fragment,
          null,
          // Header
          ce(
            "div",
            { className: "widget-header", style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" } },
            ce("div", { className: "widget-title", style: { color: "#8a2be2", fontSize: "12px", fontWeight: "bold", textShadow: "0 0 8px rgba(138, 43, 226, 0.8)" } }, "MY SHADOW ARMY"),
            ce("div", { className: "widget-total", style: { color: "#999", fontSize: "11px" } }, totalCount + " Total")
          ),
          // Power bar (with essence)
          ce(
            "div",
            { className: "widget-power", style: { display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "8px", padding: "6px 8px", background: "rgba(0, 0, 0, 0.8)", border: "1px solid rgba(138, 43, 226, 0.5)", borderRadius: "0", flexWrap: "wrap" } },
            ce("span", { style: { color: "#8a2be2", fontSize: "11px", fontWeight: "600", textShadow: "0 0 4px rgba(138, 43, 226, 0.6)", fontFamily: "'Orbitron', sans-serif" } }, "\u2694 Power: " + totalPower),
            ce("span", { style: { color: "rgba(138, 43, 226, 0.4)", fontSize: "10px" } }, "|"),
            ce("span", { style: { color: "#9370db", fontSize: "11px", fontWeight: "600" } }, "\u2726 Essence: " + essence)
          ),
          // Elite ranks grid
          ce(
            "div",
            { className: "elite-rank-grid", style: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "4px", marginBottom: "6px" } },
            eliteRanks.map(({ rank, count, color }) => ce(RankBox, { key: rank, rank, count, color, isElite: true }))
          ),
          // Standard ranks grid
          ce(
            "div",
            { className: "rank-grid", style: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "4px", marginBottom: "6px" } },
            standardRanks.map(({ rank, count, color }) => ce(RankBox, { key: rank, rank, count, color, isElite: false }))
          ),
          // Grade distribution bar
          ce(
            "div",
            { className: "grade-bar", style: { display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "2px", marginBottom: "4px" } },
            SHADOW_GRADES.map((grade) => {
              const count = gradeCounts[grade] || 0;
              const color = GRADE_COLORS[grade];
              const abbrev = GRADE_ABBREV[grade];
              return ce(
                "div",
                {
                  key: grade,
                  title: grade,
                  style: {
                    textAlign: "center",
                    padding: "2px 1px",
                    background: count > 0 ? `rgba(0,0,0,0.5)` : "rgba(0,0,0,0.2)",
                    border: `1px solid ${color}${count > 0 ? "50" : "20"}`,
                    borderRadius: "0"
                  }
                },
                ce("div", { style: { color, fontSize: "7px", fontWeight: "bold", lineHeight: "1.2" } }, abbrev),
                ce("div", { style: { color: count > 0 ? "#fff" : "#444", fontSize: "9px", fontWeight: "bold" } }, count)
              );
            })
          ),
          // Divider line (bottom edge)
          ce("div", { style: { marginTop: "4px", borderTop: "1px solid rgba(138, 43, 226, 0.2)" } })
        );
      }
      return { ShadowArmyWidget, RankBox };
    }
    module2.exports = { buildWidgetComponents: buildWidgetComponents2 };
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

// src/ShadowArmy/watchers.js
var require_watchers = __commonJS({
  "src/ShadowArmy/watchers.js"(exports2, module2) {
    var dc = require_discord_classes();
    var _ALLOWED_CHANNEL_TYPES = /* @__PURE__ */ new Set([0, 5, 10, 11, 12, 15]);
    module2.exports = {
      // CHANNEL & MEMBER LIST WATCHERS
      /**
       * Setup channel watcher for URL changes (event-based, no polling).
       * Ensures button and widget persist across guild/channel switches.
       */
      setupChannelWatcher() {
        var _a;
        let lastUrl = window.location.href;
        const handleUrlChange = () => {
          var _a2, _b;
          if (this._isStopped) return;
          const currentUrl = window.location.href;
          if (currentUrl === lastUrl) return;
          lastUrl = currentUrl;
          if (this._navChangeTimeout) {
            clearTimeout(this._navChangeTimeout);
            this._retryTimeouts.delete(this._navChangeTimeout);
          }
          const navTimeoutId = setTimeout(() => {
            var _a3, _b2;
            (_b2 = (_a3 = this._retryTimeouts) == null ? void 0 : _a3.delete) == null ? void 0 : _b2.call(_a3, navTimeoutId);
            if (this._isStopped) return;
            if (this._navChangeTimeout === navTimeoutId) {
              this._navChangeTimeout = null;
            }
            requestAnimationFrame(() => {
              if (this._isStopped) return;
              this.setupMemberListWatcher();
            });
          }, 200);
          this._navChangeTimeout = navTimeoutId;
          (_b = (_a2 = this._retryTimeouts) == null ? void 0 : _a2.add) == null ? void 0 : _b.call(_a2, navTimeoutId);
        };
        if ((_a = this._PluginUtils) == null ? void 0 : _a.NavigationBus) {
          if (typeof this._navBusUnsub === "function") {
            this._navBusUnsub();
            this._navBusUnsub = null;
          }
          this._navBusUnsub = this._PluginUtils.NavigationBus.subscribe(() => handleUrlChange());
        }
        this.setupMemberListWatcher();
      },
      getCurrentChannelRouteInfo() {
        var _a;
        if (typeof window === "undefined") return null;
        const pathname = ((_a = window.location) == null ? void 0 : _a.pathname) || "";
        const threadMatch = pathname.match(/^\/channels\/(\d+)\/(\d+)\/threads\/(\d+)$/);
        if (threadMatch) {
          return {
            routeType: "thread",
            serverId: threadMatch[1],
            parentChannelId: threadMatch[2],
            rawChannelId: threadMatch[3]
          };
        }
        const serverMatch = pathname.match(/^\/channels\/(\d+)\/(\d+)$/);
        if (serverMatch) {
          return {
            routeType: "server",
            serverId: serverMatch[1],
            rawChannelId: serverMatch[2]
          };
        }
        return null;
      },
      getChannelStoreModule() {
        var _a;
        let ChannelStore = (_a = this.webpackModules) == null ? void 0 : _a.ChannelStore;
        if (!(ChannelStore == null ? void 0 : ChannelStore.getChannel)) {
          try {
            ChannelStore = BdApi.Webpack.getStore("ChannelStore");
          } catch (_) {
            ChannelStore = null;
          }
          if (ChannelStore) this.webpackModules.ChannelStore = ChannelStore;
        }
        return ChannelStore || null;
      },
      _findMainChatContainer() {
        const cc = dc.sel.chatContent;
        const selectors = [
          `main${cc}`,
          `section${cc}[role="main"]`,
          `div${cc}:not([role="complementary"])`,
          `div${dc.sel.chat}:not(${dc.sel.chatLayerWrapper})`
        ];
        for (const selector of selectors) {
          const container = document.querySelector(selector);
          if (container) return container;
        }
        return null;
      },
      _findMessageInputArea(mainChat) {
        var _a, _b;
        if (!mainChat) return null;
        return mainChat.querySelector(dc.sel.channelTextArea) || ((_a = mainChat.querySelector(dc.sel.textArea)) == null ? void 0 : _a.parentElement) || ((_b = mainChat.querySelector(dc.sel.slateTextArea)) == null ? void 0 : _b.parentElement) || null;
      },
      _isWritableEditor(editor) {
        if (!editor) return false;
        const blockedByAria = editor.getAttribute("aria-disabled") === "true";
        const blockedByFlags = editor.hasAttribute("disabled") || editor.hasAttribute("readonly") || editor.getAttribute("contenteditable") === "false";
        return !(blockedByAria || blockedByFlags);
      },
      hasWritableMessageInputInMainChat() {
        var _a;
        const mainChat = this._findMainChatContainer();
        const inputArea = this._findMessageInputArea(mainChat);
        if (!inputArea) return false;
        if (((_a = inputArea.matches) == null ? void 0 : _a.call(inputArea, '[aria-disabled="true"]')) || inputArea.closest('[aria-disabled="true"]')) {
          return false;
        }
        const editorCandidates = [
          '[role="textbox"]',
          "textarea",
          '[contenteditable="true"]',
          dc.sel.slateTextArea
        ];
        const editor = editorCandidates.map((selector) => inputArea.querySelector(selector)).find(Boolean);
        return this._isWritableEditor(editor);
      },
      hasViewAndSendPermissions(channel) {
        var _a, _b;
        if (!channel) return this.hasWritableMessageInputInMainChat();
        let PermissionStore = (_a = this.webpackModules) == null ? void 0 : _a.PermissionStore;
        if (!(PermissionStore == null ? void 0 : PermissionStore.can)) {
          try {
            PermissionStore = BdApi.Webpack.getStore("PermissionStore");
          } catch (_) {
            PermissionStore = null;
          }
          if (PermissionStore) this.webpackModules.PermissionStore = PermissionStore;
        }
        let Permissions = (_b = this.webpackModules) == null ? void 0 : _b.Permissions;
        if (!Permissions || Permissions.VIEW_CHANNEL == null || Permissions.SEND_MESSAGES == null) {
          try {
            Permissions = BdApi.Webpack.getModule(
              (m) => m && Object.prototype.hasOwnProperty.call(m, "VIEW_CHANNEL") && Object.prototype.hasOwnProperty.call(m, "SEND_MESSAGES")
            );
          } catch (_) {
            Permissions = null;
          }
          if (Permissions) this.webpackModules.Permissions = Permissions;
        }
        if ((PermissionStore == null ? void 0 : PermissionStore.can) && (Permissions == null ? void 0 : Permissions.VIEW_CHANNEL) != null && (Permissions == null ? void 0 : Permissions.SEND_MESSAGES) != null) {
          const canView = !!PermissionStore.can(Permissions.VIEW_CHANNEL, channel);
          const canSend = !!PermissionStore.can(Permissions.SEND_MESSAGES, channel);
          return canView && canSend;
        }
        return this.hasWritableMessageInputInMainChat();
      },
      canInjectWidgetInCurrentView() {
        if (typeof window === "undefined" || typeof document === "undefined") return false;
        const routeInfo = this.getCurrentChannelRouteInfo();
        if (!routeInfo || routeInfo.routeType !== "server" && routeInfo.routeType !== "thread") return false;
        const ChannelStore = this.getChannelStoreModule();
        const channel = (ChannelStore == null ? void 0 : ChannelStore.getChannel) ? ChannelStore.getChannel(routeInfo.rawChannelId) : null;
        if (channel) {
          const channelType = Number(channel.type);
          if (!_ALLOWED_CHANNEL_TYPES.has(channelType)) return false;
          return this.hasViewAndSendPermissions(channel);
        }
        return this.hasWritableMessageInputInMainChat();
      },
      getMemberListElements() {
        if (typeof document === "undefined") return null;
        const allCandidates = document.querySelectorAll(dc.sel.membersWrap);
        const membersWrap = Array.from(allCandidates).find((candidate) => {
          if (!(candidate == null ? void 0 : candidate.isConnected)) return false;
          if (candidate.closest('[id^="chat-messages-"]')) return false;
          const style = candidate.style;
          if ((style == null ? void 0 : style.display) === "none") return false;
          if (candidate.offsetParent === null) return false;
          return true;
        });
        if (!membersWrap) return null;
        const membersList = membersWrap.querySelector(`:scope > ${dc.sel.members}`) || membersWrap.querySelector(dc.sel.members);
        if (!membersList || membersList.closest('[id^="chat-messages-"]')) return null;
        const membersContent = membersList.querySelector(`:scope > ${dc.sel.content}`) || membersList.querySelector(dc.sel.content);
        return { membersWrap, membersList, membersContent };
      },
      isWidgetInValidMemberList(widget) {
        if (!widget || typeof widget.closest !== "function") return false;
        if (widget.closest('[id^="chat-messages-"]')) return false;
        return !!widget.closest(dc.sel.membersWrap);
      },
      _scheduleWatcherRetry(callback, delayMs = 0) {
        var _a, _b;
        const retryId = setTimeout(() => {
          var _a2, _b2;
          (_b2 = (_a2 = this._retryTimeouts) == null ? void 0 : _a2.delete) == null ? void 0 : _b2.call(_a2, retryId);
          if (this._isStopped) return;
          if (typeof callback === "function") callback();
        }, Math.max(0, Number(delayMs) || 0));
        (_b = (_a = this._retryTimeouts) == null ? void 0 : _a.add) == null ? void 0 : _b.call(_a, retryId);
        return retryId;
      },
      _scheduleMemberListSetupRetry(delayMs = 0) {
        var _a, _b;
        if (this._memberListSetupRetryTimeout) {
          clearTimeout(this._memberListSetupRetryTimeout);
          (_b = (_a = this._retryTimeouts) == null ? void 0 : _a.delete) == null ? void 0 : _b.call(_a, this._memberListSetupRetryTimeout);
          this._memberListSetupRetryTimeout = null;
        }
        this._memberListSetupRetryTimeout = this._scheduleWatcherRetry(() => {
          this._memberListSetupRetryTimeout = null;
          this.setupMemberListWatcher();
        }, delayMs);
      },
      setupMemberListWatcher() {
        var _a, _b, _c;
        if (this.memberListObserver) {
          this.memberListObserver.disconnect();
        }
        if (!this.canInjectWidgetInCurrentView()) {
          (_a = document.getElementById("shadow-army-widget")) == null ? void 0 : _a.remove();
          if (typeof this._navBusUnsub !== "function") {
            this._scheduleMemberListSetupRetry(1500);
          }
          return;
        }
        const memberElements = this.getMemberListElements();
        const memberRoot = (memberElements == null ? void 0 : memberElements.membersWrap) || null;
        const chatContent = this._findMainChatContainer();
        const observeRoot = memberRoot || (chatContent == null ? void 0 : chatContent.parentElement) || null;
        if (!observeRoot) {
          this._scheduleMemberListSetupRetry(1200);
          return;
        }
        if (this._memberListSetupRetryTimeout) {
          clearTimeout(this._memberListSetupRetryTimeout);
          (_c = (_b = this._retryTimeouts) == null ? void 0 : _b.delete) == null ? void 0 : _c.call(_b, this._memberListSetupRetryTimeout);
          this._memberListSetupRetryTimeout = null;
        }
        this._lastMemberListWatchCheck = 0;
        this._memberListRetryCount = 0;
        let wasMemberListAbsent = false;
        const onMemberListMutated = (mutations = null) => {
          var _a2, _b2, _c2, _d, _e, _f, _g, _h;
          if (this._isStopped) return;
          if (document.hidden) return;
          const now = Date.now();
          if (now - this._lastMemberListWatchCheck < 150) return;
          const mutationList = Array.isArray(mutations) ? mutations : null;
          let hasMemberListMutation = false;
          if (mutationList && mutationList.length > 0) {
            for (let i = 0; i < mutationList.length; i++) {
              const target = (_a2 = mutationList[i]) == null ? void 0 : _a2.target;
              if (target == null ? void 0 : target.classList) {
                const cn = target.className;
                if (typeof cn === "string" && (cn.includes("membersWrap") || cn.includes("members_"))) {
                  hasMemberListMutation = true;
                  break;
                }
              }
              if (!hasMemberListMutation && ((_b2 = target == null ? void 0 : target.closest) == null ? void 0 : _b2.call(target, dc.sel.membersWrap))) {
                hasMemberListMutation = true;
                break;
              }
            }
          } else {
            hasMemberListMutation = true;
          }
          if (!hasMemberListMutation) return;
          this._lastMemberListWatchCheck = now;
          if (!this.canInjectWidgetInCurrentView()) {
            (_c2 = document.getElementById("shadow-army-widget")) == null ? void 0 : _c2.remove();
            return;
          }
          const memberElements2 = this.getMemberListElements();
          if (!(memberElements2 == null ? void 0 : memberElements2.membersList)) {
            (_d = document.getElementById("shadow-army-widget")) == null ? void 0 : _d.remove();
            wasMemberListAbsent = true;
            if (this._memberListRetryCount >= 5) {
              this._memberListRetryCount = 0;
            }
            if (this._memberListRetryCount < 5) {
              this._memberListRetryCount++;
              this._scheduleWatcherRetry(() => onMemberListMutated(null), 300);
            }
            return;
          }
          this._memberListRetryCount = 0;
          if (wasMemberListAbsent) {
            wasMemberListAbsent = false;
            if (this.widgetReinjectionTimeout) {
              clearTimeout(this.widgetReinjectionTimeout);
              (_f = (_e = this._retryTimeouts) == null ? void 0 : _e.delete) == null ? void 0 : _f.call(_e, this.widgetReinjectionTimeout);
            }
            this.widgetReinjectionTimeout = this._scheduleWatcherRetry(
              () => this.injectShadowRankWidget(),
              250
            );
            return;
          }
          const widget = document.getElementById("shadow-army-widget");
          if (widget && this.isWidgetInValidMemberList(widget)) return;
          widget && widget.remove();
          if (this.widgetReinjectionTimeout) {
            clearTimeout(this.widgetReinjectionTimeout);
            (_h = (_g = this._retryTimeouts) == null ? void 0 : _g.delete) == null ? void 0 : _h.call(_g, this.widgetReinjectionTimeout);
          }
          this.widgetReinjectionTimeout = this._scheduleWatcherRetry(
            () => this.injectShadowRankWidget(),
            150
          );
        };
        if (this._memberListDebounceTimer) {
          clearTimeout(this._memberListDebounceTimer);
          this._memberListDebounceTimer = null;
        }
        let _memberListPendingMutations = [];
        const _classNameLooksLikeMembers = (target) => {
          if (!(target == null ? void 0 : target.classList)) return false;
          const cn = target.className;
          if (typeof cn !== "string") return false;
          return cn.includes("membersWrap") || cn.includes("members_") || cn.includes("member_");
        };
        this.memberListObserver = new MutationObserver((mutations) => {
          var _a2;
          let hasRelevant = false;
          for (let i = 0; i < mutations.length; i++) {
            if (_classNameLooksLikeMembers((_a2 = mutations[i]) == null ? void 0 : _a2.target)) {
              hasRelevant = true;
              break;
            }
          }
          if (!hasRelevant) return;
          for (let i = 0; i < mutations.length; i++) {
            _memberListPendingMutations.push(mutations[i]);
          }
          if (this._memberListDebounceTimer) return;
          this._memberListDebounceTimer = setTimeout(() => {
            this._memberListDebounceTimer = null;
            if (this._isStopped) return;
            const drained = _memberListPendingMutations;
            _memberListPendingMutations = [];
            onMemberListMutated(drained);
          }, 80);
        });
        this.memberListObserver.observe(observeRoot, {
          childList: true,
          subtree: true,
          attributes: false,
          characterData: false
        });
        if (this._memberListHealthCheck) clearInterval(this._memberListHealthCheck);
        this._memberListHealthCheck = setInterval(() => {
          var _a2;
          if (this._isStopped) {
            clearInterval(this._memberListHealthCheck);
            this._memberListHealthCheck = null;
            return;
          }
          if (document.hidden) return;
          const currentMembersWrap = ((_a2 = this.getMemberListElements()) == null ? void 0 : _a2.membersWrap) || null;
          const onFallbackButPanelNowOpen = currentMembersWrap && observeRoot !== currentMembersWrap;
          if (!observeRoot.isConnected || onFallbackButPanelNowOpen) {
            clearInterval(this._memberListHealthCheck);
            this._memberListHealthCheck = null;
            this.setupMemberListWatcher();
          }
        }, 3e3);
        this.injectShadowRankWidget({ canInject: true, memberElements });
      }
    };
  }
});

// src/ShadowArmy/extraction.js
var require_extraction = __commonJS({
  "src/ShadowArmy/extraction.js"(exports2, module2) {
    var C2 = require_constants();
    var SLEvents2 = require_event_bus();
    var { getPluginInstance, getSkillTreeLevel } = require_plugin_bridge();
    module2.exports = {
      // SHADOW ARMY CAPACITY — Lore-Accurate Cap Enforcement
      /**
       * Calculate shadow army capacity for a given player rank + intelligence.
       * Formula: cap = baseCap + floor(sqrt(intelligence) × intScale)
       * Shadow Monarch = Infinity (limitless). E-rank = 0 (no extraction skill).
       */
      getShadowArmyCap(playerRank, intelligence = 0) {
        var _a;
        const entry = (_a = this.shadowArmyCapacity) == null ? void 0 : _a[playerRank];
        if (!entry) return 0;
        const base = entry.base;
        if (base === Infinity) return Infinity;
        if (!Number.isFinite(base)) return 0;
        const intScale = Number(entry.intScale) || 0;
        const safeInt = Math.max(0, Number(intelligence) || 0);
        return base + Math.floor(Math.sqrt(safeInt) * intScale);
      },
      /**
       * Check if the army is at or over capacity for the current player rank + INT.
       * Returns { atCap, currentCount, cap, overBy }.
       * Grandfathered shadows (existing over-cap) are NOT deleted — only new extractions are blocked.
       */
      async checkShadowArmyCap() {
        var _a;
        const soloData = this.getSoloLevelingData();
        const playerRank = (soloData == null ? void 0 : soloData.rank) || "E";
        const intelligence = ((_a = soloData == null ? void 0 : soloData.stats) == null ? void 0 : _a.intelligence) || 0;
        const cap = this.getShadowArmyCap(playerRank, intelligence);
        if (cap === Infinity) {
          return { atCap: false, currentCount: 0, cap: Infinity, overBy: 0 };
        }
        const now = Date.now();
        if (this._capCountCache !== void 0 && this._capCountCacheTime && now - this._capCountCacheTime < 5e3) {
          const currentCount2 = this._capCountCache;
          const overBy2 = Math.max(0, currentCount2 - cap);
          return { atCap: currentCount2 >= cap, currentCount: currentCount2, cap, overBy: overBy2 };
        }
        let currentCount = 0;
        if (this.storageManager && typeof this.storageManager.getTotalCount === "function") {
          try {
            currentCount = await this.storageManager.getTotalCount();
            this._capCountCache = currentCount;
            this._capCountCacheTime = Date.now();
          } catch (e) {
            this.debugError("CAP_CHECK", "Failed to get shadow count", e);
            return { atCap: true, currentCount: 0, cap, overBy: 0 };
          }
        }
        const overBy = Math.max(0, currentCount - cap);
        return { atCap: currentCount >= cap, currentCount, cap, overBy };
      },
      /** Invalidate the cap-count cache. Call after any IDB write that changes the shadow count. */
      _invalidateCapCountCache() {
        this._capCountCache = void 0;
        this._capCountCacheTime = 0;
      },
      // SOLO LEVELING INTEGRATION
      integrateWithSoloLeveling() {
        try {
          this.soloPlugin = getPluginInstance("SoloLevelingStats");
          if (!this.soloPlugin) {
            this.debugLog("INTEGRATION", "SoloLevelingStats plugin not enabled or not found");
          }
        } catch (error) {
          this.debugError(
            "INTEGRATION",
            "Failed to integrate with SoloLevelingStats via BdApi.Plugins",
            error
          );
          this.soloPlugin = null;
        }
      },
      getSoloLevelingData() {
        var _a;
        const now = Date.now();
        if (this._soloDataCache && this._soloDataCacheTime && now - this._soloDataCacheTime < this._soloDataCacheTTL) {
          return this._soloDataCache;
        }
        if (!this.soloPlugin) {
          this.integrateWithSoloLeveling();
        }
        if (!this.soloPlugin) {
          this._soloDataCache = null;
          this._soloDataCacheTime = 0;
          return null;
        }
        const instance = this.soloPlugin;
        if (!instance || !instance.settings) {
          this._soloDataCache = null;
          this._soloDataCacheTime = 0;
          return null;
        }
        const soloData = {
          rank: instance.settings.rank || "E",
          level: instance.settings.level || 1,
          stats: instance.settings.stats || {},
          intelligence: ((_a = instance.settings.stats) == null ? void 0 : _a.intelligence) || 0
        };
        this._soloDataCache = soloData;
        this._soloDataCacheTime = now;
        return soloData;
      },
      // SKILLTREE GATING
      /**
       * Check if a SkillTree passive skill is unlocked (level >= 1).
       * @param {string} skillId - Skill ID to check
       * @returns {boolean}
       */
      _isSkillTreeSkillUnlocked(skillId) {
        return getSkillTreeLevel(skillId) >= 1;
      },
      _getSkillTreeBonuses() {
        try {
          const instance = getPluginInstance("SkillTree");
          if (!instance || typeof instance.calculateSkillBonuses !== "function") return null;
          return instance.calculateSkillBonuses();
        } catch {
          return null;
        }
      },
      _hasGuaranteedArise() {
        const bonuses = this._getSkillTreeBonuses();
        return bonuses && bonuses.ariseChanceOverride >= 1;
      },
      /**
       * Get the Shadow Monarch's (user's) combat strength.
       * Used to cap shadow growth — no shadow may exceed the monarch.
       * Mirrors calculateShadowStrength: sum of all stats.
       * @returns {number} Monarch strength, or 0 if unavailable
       */
      _getMonarchStrength() {
        const soloData = this.getSoloLevelingData();
        if (!soloData || !soloData.stats) return 0;
        const stats = soloData.stats;
        const total = (stats.strength || 0) + (stats.agility || 0) + (stats.intelligence || 0) + (stats.vitality || 0) + (stats.perception || 0);
        return Math.floor(total);
      },
      // SHADOW EXTRACTION PIPELINE
      /**
       * Message-based extraction (humanoid shadows only, no magic beasts).
       * Rate-limited, checks SoloLevelingStats data, up to 3 attempts.
       * @returns {Object|null} Extracted shadow or null
       */
      async attemptShadowExtraction() {
        var _a;
        if (!this._isSkillTreeSkillUnlocked("shadow_extraction")) return null;
        const soloData = this.getSoloLevelingData();
        if (!soloData) return null;
        const capStatus = await this.checkShadowArmyCap();
        if (capStatus.atCap) {
          this.debugLog("EXTRACTION", "Shadow army at capacity, extraction blocked", {
            current: capStatus.currentCount,
            cap: capStatus.cap,
            overBy: capStatus.overBy
          });
          return null;
        }
        const { rank, level, stats } = soloData;
        const intelligence = stats.intelligence || 0;
        const perception = stats.perception || 0;
        const strength = stats.strength || 0;
        const now = Date.now();
        const cfg = this.settings.extractionConfig || this.defaultSettings.extractionConfig;
        const maxPerMinute = cfg.maxExtractionsPerMinute || 3;
        const isShadowMonarch = ((_a = this.getSoloLevelingData()) == null ? void 0 : _a.rank) === "Shadow Monarch";
        if (!this._extractionTimestamps) {
          this._extractionTimestamps = [];
        }
        this._extractionTimestamps = this._extractionTimestamps.filter(
          (timestamp) => now - timestamp < 6e4
        );
        if (!isShadowMonarch && this._extractionTimestamps.length >= maxPerMinute) {
          return null;
        }
        const rankIndex = this.shadowRanks.indexOf(rank);
        const smIdx = this.shadowRanks.indexOf("Shadow Monarch");
        const rankCeil = smIdx > 0 ? smIdx : this.shadowRanks.length;
        const availableRanks = this.shadowRanks.slice(
          0,
          Math.min(rankIndex + 2, rankCeil)
        );
        const targetRank = this._pickRandom(availableRanks) || rank;
        const targetRankMultiplier = this.rankStatMultipliers[targetRank] || 1;
        const targetBaselineStats = this.getRankBaselineStats(targetRank, targetRankMultiplier);
        const estimatedTargetStrength = this.calculateShadowStrength(targetBaselineStats, 1);
        const extractionChancePreview = this.calculateExtractionChance(
          rank,
          stats,
          targetRank,
          estimatedTargetStrength,
          intelligence,
          perception,
          strength,
          false
        );
        this.debugLog("MESSAGE_EXTRACTION", "Message extraction preflight", {
          extractionChancePreview: (extractionChancePreview * 100).toFixed(2) + "%",
          intelligence,
          perception,
          strength,
          rank,
          targetRank,
          estimatedTargetStrength
        });
        const extractedShadow = await this.attemptExtractionWithRetries(
          rank,
          level,
          stats,
          targetRank,
          null,
          null,
          false,
          // skipCap
          false,
          // fromDungeon
          null,
          // beastFamilies
          3
          // maxAttempts
        );
        if (extractedShadow) {
          this._extractionTimestamps.push(now);
          this.debugLog("MESSAGE_EXTRACTION", "Shadow extracted from message", {
            rank: extractedShadow.rank,
            role: extractedShadow.role,
            strength: extractedShadow.strength,
            id: extractedShadow.id
          });
        }
        return extractedShadow;
      },
      _getAvailableDungeonBeastRoles(rank, beastFamilies = null) {
        if (!this._allBeastRoleKeys) {
          this._allBeastRoleKeys = Object.keys(this.shadowRoles).filter((k) => this.shadowRoles[k].isMagicBeast);
          this._baseBeastRoleKeys = this._allBeastRoleKeys.filter((k) => !this.shadowRoles[k].minRank);
        }
        let availableBeastRoles = this._allBeastRoleKeys;
        if (beastFamilies && beastFamilies.length > 0) {
          availableBeastRoles = availableBeastRoles.filter((key) => {
            const beast = this.shadowRoles[key];
            return beastFamilies.includes(beast.family);
          });
        }
        const rankIndex = this.shadowRanks.indexOf(rank);
        availableBeastRoles = availableBeastRoles.filter((key) => {
          const beast = this.shadowRoles[key];
          if (!beast.minRank) return true;
          const minRankIndex = this.shadowRanks.indexOf(beast.minRank);
          return rankIndex >= minRankIndex;
        });
        if (availableBeastRoles.length === 0) {
          availableBeastRoles = this._baseBeastRoleKeys;
        }
        return availableBeastRoles;
      },
      async _persistShadowToSettingsFallback(shadow, attemptNum, reasonLabel) {
        var _a, _b, _c;
        (_a = this._invalidateCapCountCache) == null ? void 0 : _a.call(this);
        const shadowId = shadow ? ((_b = this.getCacheKey) == null ? void 0 : _b.call(this, shadow)) || shadow.id || shadow.i : null;
        this.debugError("STORAGE", "Shadow extraction cannot persist without Shadow Preservation storage", {
          attemptNum,
          reasonLabel,
          shadowId,
          shadowRank: shadow == null ? void 0 : shadow.rank,
          shadowRole: shadow == null ? void 0 : shadow.role
        });
        try {
          (_c = this._toast) == null ? void 0 : _c.call(this, "Shadow extraction failed: Shadow Preservation storage unavailable.", "error");
        } catch (_) {
        }
        return null;
      },
      /**
       * Attempt extraction with retry logic.
       * Generates shadow, calculates chance, rolls RNG up to maxAttempts times.
       * If successful, saves to IDB (or falls back to settings).
       */
      async attemptExtractionWithRetries(userRank, userLevel, userStats, targetRank, targetStats = null, targetStrength = null, skipCap = false, fromDungeon = false, beastFamilies = null, maxAttempts = 3, showAnimation = true, guaranteedExtraction = false, sameRankBoost = false, corpse = null) {
        const getShadowKey = (shadow2) => typeof this.getCacheKey === "function" ? this.getCacheKey(shadow2) : (shadow2 == null ? void 0 : shadow2.id) || (shadow2 == null ? void 0 : shadow2.i) || null;
        let shadow;
        if (targetStats && targetStrength != null) {
          let roleKey;
          if (fromDungeon) {
            const availableBeastRoles = this._getAvailableDungeonBeastRoles(targetRank, beastFamilies);
            roleKey = this._pickRandom(availableBeastRoles);
          } else {
            const humanoidRoles = Object.keys(this.shadowRoles).filter(
              (key) => !this.shadowRoles[key].isMagicBeast
            );
            roleKey = this._pickRandom(humanoidRoles);
          }
          if (!roleKey) {
            roleKey = this._pickRandom(Object.keys(this.shadowRoles)) || "knight";
          }
          const role = this.shadowRoles[roleKey] || this.shadowRoles.knight || { name: roleKey };
          const calculatedStrength = targetStrength || (targetStats ? this.calculateShadowPower(targetStats, 1) : 0);
          shadow = {
            id: `shadow_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            rank: targetRank,
            role: roleKey,
            roleName: role.name,
            beastType: (corpse == null ? void 0 : corpse.beastType) || null,
            beastFamily: (corpse == null ? void 0 : corpse.beastFamily) || null,
            strength: calculatedStrength,
            extractedAt: Date.now(),
            level: 1,
            xp: 0,
            baseStats: targetStats,
            growthStats: this.createZeroStatBlock(),
            naturalGrowthStats: this.createZeroStatBlock(),
            totalCombatTime: 0,
            lastNaturalGrowth: Date.now(),
            ownerLevelAtExtraction: userLevel,
            growthVarianceSeed: Math.random(),
            // Stamp clean-by-construction — self-heal.js Phase 2 skip-flag relies
            // on every creation path stamping (see self-heal.js HEAL_VERSION doc).
            _healV: C2.HEAL_VERSION
          };
        } else {
          shadow = this.generateShadow(targetRank, userLevel, userStats);
          targetStrength = shadow.strength;
          targetStats = shadow.baseStats;
        }
        if (!shadow) {
          this.debugError("EXTRACTION_RETRIES", "Shadow generation failed - shadow is null/undefined", {
            targetRank,
            userLevel,
            hasUserStats: !!userStats
          });
          return null;
        }
        const intelligence = (userStats == null ? void 0 : userStats.intelligence) || 0;
        const perception = (userStats == null ? void 0 : userStats.perception) || 0;
        const strength = (userStats == null ? void 0 : userStats.strength) || 0;
        for (let attemptNum = 1; attemptNum <= maxAttempts; attemptNum++) {
          this.debugLog("EXTRACTION_RETRIES", `Attempt ${attemptNum}/${maxAttempts} - Starting extraction`, {
            attemptNum,
            maxAttempts,
            targetRank,
            targetStrength,
            userRank,
            skipCap,
            intelligence,
            perception,
            strength
          });
          const monarchGuaranteed = guaranteedExtraction || this._hasGuaranteedArise();
          if (monarchGuaranteed) {
            this.debugLog("EXTRACTION_RETRIES", `Attempt ${attemptNum} - Guaranteed extraction (user outranks mob)`, {
              attemptNum,
              targetRank,
              guaranteedExtraction: true
            });
          } else {
            const extractionChance = this.calculateExtractionChance(
              userRank,
              userStats,
              targetRank,
              targetStrength,
              intelligence,
              perception,
              strength,
              skipCap
            );
            const effectiveChance = sameRankBoost ? Math.max(0.85, extractionChance) : extractionChance;
            const roll = Math.random();
            this.debugLog("EXTRACTION_RETRIES", `Attempt ${attemptNum} - Extraction roll`, {
              attemptNum,
              baseChance: (extractionChance * 100).toFixed(2) + "%",
              effectiveChance: (effectiveChance * 100).toFixed(2) + "%",
              sameRankBoost,
              roll: (roll * 100).toFixed(2) + "%",
              success: roll < effectiveChance
            });
            if (roll >= effectiveChance) {
              this.debugLog(
                "EXTRACTION_RETRIES",
                `Attempt ${attemptNum} - Roll failed${sameRankBoost ? " (same-rank boosted)" : ""}, trying next attempt`,
                { attemptNum, sameRankBoost }
              );
              continue;
            }
          }
          {
            this.debugLog("EXTRACTION_RETRIES", `Attempt ${attemptNum} - Roll succeeded, attempting to save shadow`, {
              attemptNum,
              shadowExists: !!shadow,
              shadowId: getShadowKey(shadow),
              shadowRank: shadow == null ? void 0 : shadow.rank,
              shadowRole: shadow == null ? void 0 : shadow.role
            });
            if (!shadow) {
              this.debugError("EXTRACTION_RETRIES", `Attempt ${attemptNum} - Shadow is null/undefined`, { attemptNum });
              continue;
            }
            const shadowId = getShadowKey(shadow);
            if (this.storageManager && this._isSkillTreeSkillUnlocked("shadow_preservation")) {
              try {
                if (!shadow.strength || shadow.strength === 0) {
                  const decompressed = this.getShadowData(shadow);
                  const effective = this.getShadowEffectiveStats(decompressed);
                  if (effective) {
                    shadow.strength = this.calculateShadowPower(effective, 1);
                    this.debugLog("EXTRACTION", "Calculated missing strength before save", {
                      shadowId,
                      calculatedStrength: shadow.strength
                    });
                  }
                }
                const shadowToSave = this.prepareShadowForSave(shadow);
                await this.storageManager.saveShadow(shadowToSave);
                this._invalidateSnapshot();
                this._invalidateCapCountCache();
                await this.incrementTotalPower(shadowToSave);
                this.debugLog("EXTRACTION", "Shadow saved to IndexedDB", {
                  shadowId,
                  rank: shadow.rank,
                  role: shadow.role,
                  strength: shadow.strength,
                  shadowToSaveStrength: shadowToSave.strength
                });
                let newCount = 0;
                if (this.storageManager && typeof this.storageManager.getTotalCount === "function") {
                  try {
                    newCount = await this.storageManager.getTotalCount();
                  } catch (countError) {
                    this.debugError("EXTRACTION", "Failed to get total count after save", countError);
                  }
                }
                this.debugLog("EXTRACTION", "Shadow saved successfully", {
                  totalCount: newCount,
                  shadowId: getShadowKey(shadow),
                  shadowRank: shadow.rank,
                  shadowRole: shadow.role
                });
                const eventData = {
                  shadowId: getShadowKey(shadow),
                  shadowCount: newCount,
                  shadowRank: shadow.rank,
                  shadowRole: shadow.role,
                  timestamp: Date.now()
                };
                try {
                  SLEvents2.emit("ShadowArmy:shadowExtracted", eventData);
                } catch (error) {
                  this.debugError("EXTRACTION", "Failed to emit event", error);
                }
                if (typeof window !== "undefined" && typeof window.dispatchEvent === "function") {
                  try {
                    const domEvent = new CustomEvent("shadowExtracted", {
                      detail: eventData,
                      bubbles: true
                    });
                    document.dispatchEvent(domEvent);
                  } catch (error) {
                    this.debugError("EXTRACTION", "Failed to emit DOM event", error);
                  }
                }
                if (this.settings.extractionToasts) {
                  this._toast(
                    `Shadow Extracted: ${shadow.rank}-Rank ${shadow.roleName || shadow.role}`,
                    "success"
                  );
                }
                this._widgetDirty = true;
                this.scheduleWidgetRefresh({ reason: "single_extraction", delayMs: 300 });
                if (showAnimation) {
                  this.showExtractionAnimation(shadow);
                }
                const now = Date.now();
                this.settings.totalShadowsExtracted++;
                this.settings.lastExtractionTime = now;
                this.saveSettings();
                if (this._shadowPowerCache) {
                  this.invalidateShadowPowerCache(shadowToSave);
                }
                this.debugLog("TOTAL_POWER_UPDATE", "Invalidated full stats cache after extraction");
                this.debugLog("EXTRACTION_RETRIES", `Attempt ${attemptNum} - Shadow extraction completed successfully`, {
                  attemptNum,
                  shadowId: this.getCacheKey(shadow),
                  shadowRank: shadow.rank,
                  shadowRole: shadow.role,
                  shadowStrength: shadow.strength,
                  totalPowerRecalculated: true,
                  cacheInvalidated: true
                });
                this.updateUI();
                return shadow;
              } catch (error) {
                this.debugError("EXTRACTION_RETRIES", `Attempt ${attemptNum} - Failed to save shadow to IndexedDB`, error);
                return this._persistShadowToSettingsFallback(shadow, attemptNum, "IndexedDB save failed");
              }
            } else {
              this.debugError("EXTRACTION_RETRIES", "Shadow extraction blocked because durable storage is unavailable", {
                attemptNum,
                shadowId: this.getCacheKey(shadow)
              });
              return this._persistShadowToSettingsFallback(shadow, attemptNum, "Storage manager or Shadow Preservation unavailable");
            }
          }
        }
        return null;
      },
      // DUNGEON EXTRACTION
      /**
       * Attempt shadow extraction from dungeon mob or boss.
       * Bosses: 3 retries. Mobs: 1 attempt (or guaranteed if user outranks).
       */
      async attemptDungeonExtraction(bossId, userRank, userLevel, userStats, mobRank, mobStats, mobStrength, beastFamilies = null, isBoss = true) {
        if (!this._isSkillTreeSkillUnlocked("shadow_extraction")) {
          return { success: false, shadow: null, error: "Shadow Extraction skill not unlocked" };
        }
        const capStatus = await this.checkShadowArmyCap();
        if (capStatus.atCap) {
          const capLabel = capStatus.cap === Infinity ? "unlimited" : capStatus.cap.toLocaleString();
          return {
            success: false,
            shadow: null,
            error: `Shadow army at capacity (${capStatus.currentCount.toLocaleString()}/${capLabel}). Rank up or release shadows.`
          };
        }
        if (isBoss) {
          const canExtract = this.canExtractFromBoss(bossId);
          if (!canExtract.allowed) {
            return {
              success: false,
              shadow: null,
              error: canExtract.reason,
              attemptsRemaining: canExtract.attemptsRemaining
            };
          }
        }
        const userRankIdx = this.shadowRanks.indexOf(userRank);
        const mobRankIdx = this.shadowRanks.indexOf(mobRank);
        const rankDiff = mobRankIdx - userRankIdx;
        let dungeonAutoArise = false;
        let maxAttempts = 1;
        if (isBoss) {
          dungeonAutoArise = false;
          maxAttempts = 3;
        } else if (rankDiff < 0) {
          dungeonAutoArise = true;
          maxAttempts = 1;
        } else if (rankDiff === 0) {
          dungeonAutoArise = false;
          maxAttempts = 2;
        } else {
          dungeonAutoArise = false;
          maxAttempts = 1;
        }
        this.debugLog("DUNGEON_EXTRACTION", `Rank comparison: User[${userRank}] vs Mob[${mobRank}]`, {
          userRankIdx,
          mobRankIdx,
          rankDiff,
          dungeonAutoArise,
          maxAttempts,
          isBoss,
          tier: dungeonAutoArise ? "GUARANTEED" : rankDiff === 0 ? "SAME_RANK_BOOSTED" : rankDiff > 0 ? "HIGHER_MOB_RNG" : "BOSS_RNG"
        });
        const extractedShadow = await this.attemptExtractionWithRetries(
          userRank,
          userLevel,
          userStats,
          mobRank,
          mobStats,
          mobStrength,
          true,
          // skipCap
          true,
          // fromDungeon
          beastFamilies,
          maxAttempts,
          isBoss,
          // showAnimation
          dungeonAutoArise,
          // guaranteedExtraction
          rankDiff === 0 && !isBoss
          // sameRankBoost
        );
        if (isBoss) {
          this.recordBossExtractionAttempt(bossId, extractedShadow !== null);
        }
        return {
          success: extractedShadow !== null,
          shadow: extractedShadow,
          error: extractedShadow ? null : "Extraction failed",
          attemptsRemaining: isBoss ? this.getBossAttemptsRemaining(bossId) : 0
        };
      },
      /**
       * Streaming bulk extraction for dungeon corpse piles.
       * Processes corpses in bounded chunks with tiny IDB write batches.
       * Peak memory stays flat regardless of pile size.
       */
      async bulkDungeonExtraction(corpsePile, userRank, userLevel, userStats, beastFamilies = []) {
        var _a, _b, _c;
        if (!this._isSkillTreeSkillUnlocked("shadow_extraction")) {
          return { extracted: 0, attempted: 0, error: "Shadow Extraction skill not unlocked" };
        }
        if (!corpsePile || corpsePile.length === 0) {
          return { extracted: 0, attempted: 0 };
        }
        const capStatus = await this.checkShadowArmyCap();
        if (capStatus.atCap) {
          this.debugLog("ARISE", "Shadow army at capacity, bulk extraction blocked", capStatus);
          (_a = this._toast) == null ? void 0 : _a.call(
            this,
            `Shadow army at capacity (${capStatus.currentCount.toLocaleString()}/${capStatus.cap.toLocaleString()}). Rank up or release shadows to extract more.`,
            "warning"
          );
          return { extracted: 0, attempted: 0, error: "Shadow army at capacity" };
        }
        const remainingSlots = capStatus.cap === Infinity ? corpsePile.length : Math.max(0, capStatus.cap - capStatus.currentCount);
        if (remainingSlots < corpsePile.length) {
          this.debugLog("ARISE", `Capping bulk extraction to ${remainingSlots} remaining slots (${corpsePile.length} corpses available)`);
          corpsePile = corpsePile.slice(0, remainingSlots);
        }
        const total = corpsePile.length;
        const tuning = (() => {
          if (total >= 2e4) {
            return { corpseChunkSize: 12, writeChunkSize: 4, chunkYieldMs: 3, profile: "extreme_safe" };
          }
          if (total >= 1e4) {
            return { corpseChunkSize: 18, writeChunkSize: 6, chunkYieldMs: 2, profile: "high_safe" };
          }
          if (total >= 5e3) {
            return { corpseChunkSize: 25, writeChunkSize: 8, chunkYieldMs: 1, profile: "balanced" };
          }
          return { corpseChunkSize: 35, writeChunkSize: 10, chunkYieldMs: 0, profile: "fast" };
        })();
        const CORPSE_CHUNK_SIZE = tuning.corpseChunkSize;
        const WRITE_CHUNK_SIZE = tuning.writeChunkSize;
        const CHUNK_YIELD_MS = tuning.chunkYieldMs;
        let totalExtracted = 0;
        let totalAttempted = 0;
        let totalPowerDelta = 0;
        const rankCounts = {};
        const extractedShadowIds = [];
        let bossShadowExtracted = null;
        const userRankIdx = this.shadowRanks.indexOf(userRank);
        const intelligence = (userStats == null ? void 0 : userStats.intelligence) || 0;
        const perception = (userStats == null ? void 0 : userStats.perception) || 0;
        const strength = (userStats == null ? void 0 : userStats.strength) || 0;
        this.debugLog("ARISE", `ARISE STREAM: Starting extraction of ${total} corpses (profile=${tuning.profile}, corpseChunk=${CORPSE_CHUNK_SIZE}, writeChunk=${WRITE_CHUNK_SIZE}, yield=${CHUNK_YIELD_MS}ms)`);
        for (let i = 0; i < total; i += CORPSE_CHUNK_SIZE) {
          if (this._isStopped) {
            this.debugLog("ARISE", `ARISE STREAM aborted: plugin stopped at chunk ${Math.floor(i / CORPSE_CHUNK_SIZE) + 1}`);
            break;
          }
          const chunkCapStatus = await this.checkShadowArmyCap();
          if (chunkCapStatus.atCap) {
            this.debugLog("ARISE", `ARISE STREAM stopped early: army reached capacity mid-pass at chunk ${Math.floor(i / CORPSE_CHUNK_SIZE) + 1}`, chunkCapStatus);
            break;
          }
          const chunkRemainingSlots = chunkCapStatus.cap === Infinity ? Infinity : Math.max(0, chunkCapStatus.cap - chunkCapStatus.currentCount);
          const chunkEnd = Number.isFinite(chunkRemainingSlots) ? Math.min(i + CORPSE_CHUNK_SIZE, total, i + chunkRemainingSlots) : Math.min(i + CORPSE_CHUNK_SIZE, total);
          const chunk = corpsePile.slice(i, chunkEnd);
          if (chunk.length === 0) break;
          const chunkShadows = [];
          const chunkBossEntries = [];
          for (const corpse of chunk) {
            totalAttempted++;
            const mobRank = corpse.rank || "E";
            const mobRankIdx = this.shadowRanks.indexOf(mobRank);
            const rankDiff = mobRankIdx - userRankIdx;
            const isBoss = !!corpse.isBoss;
            if (isBoss) {
              const canExtract = this.canExtractFromBoss(corpse.id);
              if (!canExtract.allowed) continue;
            }
            let guaranteedExtraction = false;
            let maxAttempts = 1;
            let sameRankBoost = false;
            if (isBoss) {
              maxAttempts = 3;
            } else if (rankDiff < 0) {
              guaranteedExtraction = true;
            } else if (rankDiff === 0) {
              maxAttempts = 2;
              sameRankBoost = true;
            }
            let shadow;
            if (corpse.baseStats && corpse.strength != null) {
              const availableBeastRoles = this._getAvailableDungeonBeastRoles(mobRank, beastFamilies);
              const roleKey = this._pickRandom(availableBeastRoles) || "wolf";
              const role = this.shadowRoles[roleKey] || this.shadowRoles.knight || { name: roleKey };
              const calculatedStrength = corpse.strength || (corpse.baseStats ? this.calculateShadowPower(corpse.baseStats, 1) : 0);
              const _now = Date.now();
              shadow = {
                id: `shadow_${_now}_${Math.random().toString(36).substring(2, 11)}`,
                rank: mobRank,
                role: roleKey,
                roleName: role.name,
                beastType: corpse.beastType || null,
                beastFamily: corpse.beastFamily || null,
                strength: calculatedStrength,
                extractedAt: _now,
                level: 1,
                xp: 0,
                baseStats: corpse.baseStats,
                growthStats: this.createZeroStatBlock(),
                naturalGrowthStats: this.createZeroStatBlock(),
                totalCombatTime: 0,
                lastNaturalGrowth: _now,
                ownerLevelAtExtraction: userLevel,
                growthVarianceSeed: Math.random(),
                // Stamp clean-by-construction — self-heal.js Phase 2 skip-flag
                // relies on every creation path stamping (see self-heal.js doc).
                _healV: C2.HEAL_VERSION
              };
            } else {
              shadow = this.generateShadow(mobRank, userLevel, userStats);
            }
            if (!shadow) continue;
            const monarchOverride = guaranteedExtraction || this._hasGuaranteedArise();
            let extracted = false;
            for (let attempt = 0; attempt < maxAttempts; attempt++) {
              if (monarchOverride) {
                extracted = true;
                break;
              }
              const extractionChance = this.calculateExtractionChance(
                userRank,
                userStats,
                mobRank,
                shadow.strength || corpse.strength,
                intelligence,
                perception,
                strength,
                true
              );
              const effectiveChance = sameRankBoost ? Math.max(0.85, extractionChance) : extractionChance;
              if (Math.random() < effectiveChance) {
                extracted = true;
                break;
              }
            }
            if (!extracted) continue;
            if (!shadow.strength || shadow.strength === 0) {
              const decompressed = this.getShadowData(shadow);
              const effective = this.getShadowEffectiveStats(decompressed);
              if (effective) shadow.strength = this.calculateShadowPower(effective, 1);
            }
            const shadowToSave = this.prepareShadowForSave(shadow);
            chunkShadows.push(shadowToSave);
            if (isBoss) {
              this.recordBossExtractionAttempt(corpse.id, true);
              chunkBossEntries.push({ index: chunkShadows.length - 1, shadow });
            }
          }
          if (chunkShadows.length > 0 && this.storageManager && this._isSkillTreeSkillUnlocked("shadow_preservation")) {
            try {
              let saveResult;
              if (typeof this.storageManager.saveShadowsChunked === "function") {
                saveResult = await this.storageManager.saveShadowsChunked(
                  chunkShadows,
                  WRITE_CHUNK_SIZE
                );
              } else {
                saveResult = await this.storageManager.saveShadowsBatch(chunkShadows);
              }
              const failedIndices = new Set(
                Array.isArray(saveResult == null ? void 0 : saveResult.failedIndices) ? saveResult.failedIndices : []
              );
              const effectiveSavedCount = Number.isFinite(saveResult == null ? void 0 : saveResult.completed) ? saveResult.completed : Math.max(0, chunkShadows.length - failedIndices.size);
              totalExtracted += effectiveSavedCount;
              if (effectiveSavedCount > 0) {
                if (this._capCountCache !== void 0) {
                  this._capCountCache += effectiveSavedCount;
                  this._capCountCacheTime = Date.now();
                }
              }
              const savedShadows = failedIndices.size > 0 ? chunkShadows.filter((_, idx) => !failedIndices.has(idx)) : chunkShadows;
              for (const be of chunkBossEntries) {
                if (!bossShadowExtracted && !failedIndices.has(be.index)) {
                  bossShadowExtracted = be.shadow;
                }
              }
              for (const savedShadow of savedShadows) {
                totalPowerDelta += savedShadow.strength || savedShadow.s || 0;
                const r = savedShadow.rank || savedShadow.r || "?";
                rankCounts[r] = (rankCounts[r] || 0) + 1;
                const extractedShadowId = (savedShadow == null ? void 0 : savedShadow.id) || (savedShadow == null ? void 0 : savedShadow.i);
                if (extractedShadowId) extractedShadowIds.push(String(extractedShadowId));
              }
            } catch (e) {
              this.debugError(
                "BULK_EXTRACTION",
                `Chunk ${Math.floor(i / CORPSE_CHUNK_SIZE) + 1} save failed`,
                e
              );
            }
          } else if (chunkShadows.length > 0) {
            this.debugError("BULK_EXTRACTION", "Bulk extraction skipped because durable storage is unavailable", {
              attemptedChunkSize: chunkShadows.length,
              hasStorageManager: Boolean(this.storageManager),
              hasShadowPreservation: this._isSkillTreeSkillUnlocked("shadow_preservation")
            });
            try {
              (_b = this._toast) == null ? void 0 : _b.call(this, "ARISE failed: Shadow Preservation storage unavailable.", "error");
            } catch (_) {
            }
          }
          if (i + CORPSE_CHUNK_SIZE < total) {
            await new Promise((r) => setTimeout(r, CHUNK_YIELD_MS));
            if (this._isStopped) {
              this.debugLog("ARISE", `ARISE STREAM aborted after yield at chunk ${Math.floor(i / CORPSE_CHUNK_SIZE) + 1}`);
              break;
            }
          }
        }
        this.debugLog("ARISE", `ARISE STREAM COMPLETE: ${totalExtracted}/${totalAttempted} extracted from ${total} corpses`);
        if (totalExtracted > 0) {
          try {
            this._invalidateSnapshot();
            if (totalPowerDelta > 0) {
              try {
                await this._applyTotalPowerDelta({ strength: totalPowerDelta }, "increment");
              } catch (e) {
                this.debugError("BULK_EXTRACTION", "Failed to update power cache", e);
              }
            }
            this.settings.totalShadowsExtracted = (this.settings.totalShadowsExtracted || 0) + totalExtracted;
            this.settings.lastExtractionTime = Date.now();
            this.saveSettings();
            this._shadowPowerCache = /* @__PURE__ */ new Map();
            const eventData = {
              shadowCount: totalExtracted,
              rankCounts,
              timestamp: Date.now(),
              source: "dungeon_bulk"
            };
            SLEvents2.emit("ShadowArmy:batchExtractionComplete", eventData);
            if (typeof (window == null ? void 0 : window.dispatchEvent) === "function") {
              document.dispatchEvent(new CustomEvent("shadowExtracted", { detail: eventData, bubbles: true }));
            }
            if ((_c = BdApi == null ? void 0 : BdApi.UI) == null ? void 0 : _c.showToast) {
              const rankSummary = Object.entries(rankCounts).map(([r, c]) => `${c}x ${r}`).join(", ");
              this._toast(`ARISE: ${totalExtracted} shadows extracted (${rankSummary})`, "success", 4e3);
            }
            this._widgetDirty = true;
            this.scheduleWidgetRefresh({ reason: "bulk_extraction", delayMs: 300 });
            this.updateUI();
          } catch (error) {
            this.debugError("BULK_EXTRACTION", "Post-extraction bookkeeping failed", error);
          }
        }
        return { extracted: totalExtracted, attempted: totalAttempted, bossShadow: bossShadowExtracted };
      },
      // BOSS ATTEMPT TRACKING
      /**
       * Check if can extract from boss (max 3 attempts per corpse per day).
       */
      canExtractFromBoss(bossId) {
        if (!this.settings.dungeonExtractionAttempts) {
          this.settings.dungeonExtractionAttempts = {};
        }
        const cfg = this.settings.extractionConfig || this.defaultSettings.extractionConfig;
        const maxAttempts = cfg.maxBossAttemptsPerDay || 3;
        const today = (/* @__PURE__ */ new Date()).toDateString();
        const attempts = this.settings.dungeonExtractionAttempts[bossId];
        if (!attempts || attempts.lastReset !== today) {
          return { allowed: true, reason: null, attemptsRemaining: maxAttempts };
        }
        if (attempts.count >= maxAttempts) {
          return {
            allowed: false,
            reason: `Maximum extraction attempts reached (${maxAttempts}/${maxAttempts}). Boss corpse has degraded. Try again tomorrow.`,
            attemptsRemaining: 0
          };
        }
        return { allowed: true, reason: null, attemptsRemaining: maxAttempts - attempts.count };
      },
      recordBossExtractionAttempt(bossId, success) {
        if (!this.settings.dungeonExtractionAttempts) {
          this.settings.dungeonExtractionAttempts = {};
        }
        const today = (/* @__PURE__ */ new Date()).toDateString();
        const attempts = this.settings.dungeonExtractionAttempts[bossId];
        const attemptHandlers = {
          update: () => {
            attempts.count++;
            attempts.lastAttempt = Date.now();
            attempts.lastSuccess = success;
          },
          add: () => {
            this.settings.dungeonExtractionAttempts[bossId] = {
              count: 1,
              lastAttempt: Date.now(),
              lastReset: today,
              lastSuccess: success
            };
          }
        };
        const handler = attempts && attempts.lastReset === today ? attemptHandlers.update : attemptHandlers.add;
        handler();
        this.cleanupOldBossAttempts();
        this.saveSettings();
      },
      getBossAttemptsRemaining(bossId) {
        var _a;
        if (!this.settings.dungeonExtractionAttempts) {
          return ((_a = this.settings.extractionConfig) == null ? void 0 : _a.maxBossAttemptsPerDay) || 3;
        }
        const cfg = this.settings.extractionConfig || this.defaultSettings.extractionConfig;
        const maxAttempts = cfg.maxBossAttemptsPerDay || 3;
        const today = (/* @__PURE__ */ new Date()).toDateString();
        const attempts = this.settings.dungeonExtractionAttempts[bossId];
        if (!attempts || attempts.lastReset !== today) {
          return maxAttempts;
        }
        return Math.max(0, maxAttempts - attempts.count);
      },
      cleanupOldBossAttempts() {
        if (!this.settings.dungeonExtractionAttempts) return;
        const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1e3;
        const attempts = this.settings.dungeonExtractionAttempts;
        Object.keys(attempts).filter((bossId) => attempts[bossId].lastAttempt < sevenDaysAgo).forEach((bossId) => delete attempts[bossId]);
      }
    };
  }
});

// src/ShadowArmy/extraction-queue.js
var require_extraction_queue = __commonJS({
  "src/ShadowArmy/extraction-queue.js"(exports2, module2) {
    module2.exports = {
      setupMessageListener() {
        var _a;
        if (!this.soloPlugin) {
          this.integrateWithSoloLeveling();
        }
        if (!this.soloPlugin) {
          this.debugLog(
            "MESSAGE_LISTENER",
            "SoloLevelingStats not available, message extraction disabled"
          );
          return;
        }
        const instance = this.soloPlugin.instance || this.soloPlugin;
        if (!instance || !instance.processMessageSent) {
          this.debugLog(
            "MESSAGE_LISTENER",
            "processMessageSent not found, message extraction disabled"
          );
          return;
        }
        if (((_a = instance.processMessageSent) == null ? void 0 : _a.__shadowArmyWrapped) === true) {
          this.debugLog("MESSAGE_LISTENER", "processMessageSent already wrapped by ShadowArmy");
          return;
        }
        if (this._setupInProgress) return;
        this._setupInProgress = true;
        const currentProcessMessage = instance.processMessageSent;
        if (typeof currentProcessMessage !== "function") {
          this.debugLog(
            "MESSAGE_LISTENER",
            "processMessageSent is not callable, message extraction disabled"
          );
          this._setupInProgress = false;
          return;
        }
        this.originalProcessMessage = currentProcessMessage;
        const self = this;
        const wrappedProcessMessage = function(messageText) {
          const result = currentProcessMessage.call(this, messageText);
          self.debugLog("MESSAGE_LISTENER", "Message received, attempting extraction", {
            messageLength: (messageText == null ? void 0 : messageText.length) || 0,
            messagePreview: (messageText == null ? void 0 : messageText.substring(0, 30)) || "N/A"
          });
          self.queueMessageExtraction(messageText);
          return result;
        };
        wrappedProcessMessage.__shadowArmyWrapped = true;
        wrappedProcessMessage.__shadowArmyPrevious = currentProcessMessage;
        this._messageProcessWrapper = wrappedProcessMessage;
        this._setupInProgress = false;
        instance.processMessageSent = wrappedProcessMessage;
        this.debugLog("MESSAGE_LISTENER", "Message listener setup complete", {
          hasOriginalFunction: !!this.originalProcessMessage,
          hasInstance: !!instance,
          hasProcessMessageSent: !!instance.processMessageSent
        });
      },
      getMessageQueueInitialDelayMs() {
        var _a;
        const cfg = ((_a = this.settings) == null ? void 0 : _a.extractionConfig) || this.defaultSettings.extractionConfig;
        const value = Number(cfg == null ? void 0 : cfg.messageQueueInitialDelayMs);
        return Number.isFinite(value) ? Math.max(50, value) : 120;
      },
      getMessageQueueIntervalMs() {
        var _a;
        const cfg = ((_a = this.settings) == null ? void 0 : _a.extractionConfig) || this.defaultSettings.extractionConfig;
        const value = Number(cfg == null ? void 0 : cfg.messageQueueIntervalMs);
        return Number.isFinite(value) ? Math.max(150, value) : 450;
      },
      getMessageQueueMaxPending() {
        var _a;
        const cfg = ((_a = this.settings) == null ? void 0 : _a.extractionConfig) || this.defaultSettings.extractionConfig;
        const fallback = Number(cfg == null ? void 0 : cfg.maxExtractionsPerMinute) || 20;
        const value = Number(cfg == null ? void 0 : cfg.messageQueueMaxPending);
        return Number.isFinite(value) ? Math.max(1, Math.floor(value)) : Math.max(1, fallback);
      },
      queueMessageExtraction(messageText = "") {
        if (this._isStopped) return;
        const maxPending = this.getMessageQueueMaxPending();
        if ((this._pendingMessageExtractionCount || 0) >= maxPending) {
          this.debugLog("MESSAGE_QUEUE", "Message extraction queue full, dropping event", {
            maxPending
          });
          return;
        }
        this._pendingMessageExtractionCount = (this._pendingMessageExtractionCount || 0) + 1;
        this.debugLog("MESSAGE_QUEUE", "Queued message extraction", {
          pendingQueue: this._pendingMessageExtractionCount,
          messageLength: (messageText == null ? void 0 : messageText.length) || 0
        });
        const initialDelay = this.getMessageQueueInitialDelayMs();
        this.scheduleMessageQueueDrain(initialDelay);
      },
      scheduleMessageQueueDrain(delayMs = 0) {
        var _a;
        if (this._isStopped) return;
        if (this._isProcessingMessageExtractionQueue) return;
        if (this._messageExtractionQueueTimeout) return;
        if ((this._pendingMessageExtractionCount || 0) <= 0) return;
        const safeDelay = Math.max(0, Number(delayMs) || 0);
        const queueTimeoutId = setTimeout(() => {
          var _a2;
          (_a2 = this._retryTimeouts) == null ? void 0 : _a2.delete(queueTimeoutId);
          this._messageExtractionQueueTimeout = null;
          this.drainMessageExtractionQueue();
        }, safeDelay);
        this._messageExtractionQueueTimeout = queueTimeoutId;
        (_a = this._retryTimeouts) == null ? void 0 : _a.add(queueTimeoutId);
      },
      drainMessageExtractionQueue() {
        if (this._isStopped) return;
        if (this._isProcessingMessageExtractionQueue) return;
        const pendingCount = this._pendingMessageExtractionCount || 0;
        if (pendingCount <= 0) return;
        this._isProcessingMessageExtractionQueue = true;
        this._pendingMessageExtractionCount = pendingCount - 1;
        this.attemptShadowExtraction().then((shadow) => {
          if (shadow) {
            const shadowId = this.getCacheKey(shadow);
            this.debugLog("MESSAGE_EXTRACTION", "SUCCESS: Shadow extracted from message", {
              rank: shadow.rank,
              role: shadow.role,
              id: shadowId,
              pendingQueue: this._pendingMessageExtractionCount || 0
            });
          } else {
            this.debugLog("MESSAGE_EXTRACTION", "No shadow extracted (returned null)");
          }
        }).catch((error) => {
          this.debugError("MESSAGE_EXTRACTION", "Error during message extraction", error);
        }).finally(() => {
          this._isProcessingMessageExtractionQueue = false;
          if (this._isStopped) return;
          if ((this._pendingMessageExtractionCount || 0) > 0) {
            this.scheduleMessageQueueDrain(this.getMessageQueueIntervalMs());
          }
        });
      },
      removeMessageListener() {
        var _a;
        if (this.soloPlugin && this.originalProcessMessage) {
          const instance = this.soloPlugin.instance || this.soloPlugin;
          if (instance && instance.processMessageSent && // Only restore if the CURRENT function is still our wrapper (tag check).
          // If SLS reloaded and replaced processMessageSent with a new function,
          // that function won't carry __shadowArmyWrapped — skip the restore to
          // avoid clobbering SLS's fresh binding with our stale originalProcessMessage.
          instance.processMessageSent.__shadowArmyWrapped === true) {
            instance.processMessageSent = this.originalProcessMessage;
          }
        }
        this.originalProcessMessage = null;
        this._messageProcessWrapper = null;
        if (this._messageExtractionQueueTimeout) {
          clearTimeout(this._messageExtractionQueueTimeout);
          (_a = this._retryTimeouts) == null ? void 0 : _a.delete(this._messageExtractionQueueTimeout);
          this._messageExtractionQueueTimeout = null;
        }
        this._pendingMessageExtractionCount = 0;
        this._isProcessingMessageExtractionQueue = false;
      }
    };
  }
});

// src/ShadowArmy/combat-stats.js
var require_combat_stats = __commonJS({
  "src/ShadowArmy/combat-stats.js"(exports2, module2) {
    var C2 = require_constants();
    module2.exports = {
      // SHADOW GENERATION & STATS
      _pickRandom(items) {
        if (!Array.isArray(items) || items.length === 0) return null;
        const idx = Math.floor(Math.random() * items.length);
        return items[idx] ?? null;
      },
      generateShadow(shadowRank, userLevel, userStats, fromDungeon = false, beastFamilies = null) {
        const roleSelectors = {
          dungeon: () => {
            const availableBeastRoles = this._getAvailableDungeonBeastRoles(shadowRank, beastFamilies);
            return this._pickRandom(availableBeastRoles);
          },
          message: () => {
            const humanoidRoles = Object.keys(this.shadowRoles).filter(
              (key) => !this.shadowRoles[key].isMagicBeast
            );
            return this._pickRandom(humanoidRoles);
          }
        };
        let roleKey = roleSelectors[fromDungeon ? "dungeon" : "message"]();
        if (!roleKey) {
          roleKey = "knight";
        }
        const role = this.shadowRoles[roleKey] || this.shadowRoles.knight || { name: roleKey };
        const rankMultiplier = this.rankStatMultipliers[shadowRank] || 1;
        const growthVarianceSeed = Math.random();
        const baseStats = this.generateShadowBaseStats(
          userStats,
          roleKey,
          shadowRank,
          rankMultiplier,
          growthVarianceSeed
        );
        const baseStrength = this.calculateShadowPower(baseStats, 1);
        const shadow = {
          id: `shadow_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          rank: shadowRank,
          role: roleKey,
          roleName: role.name,
          strength: baseStrength,
          extractedAt: Date.now(),
          level: 1,
          xp: 0,
          baseStats,
          growthStats: this.createZeroStatBlock(),
          naturalGrowthStats: this.createZeroStatBlock(),
          totalCombatTime: 0,
          lastNaturalGrowth: Date.now(),
          ownerLevelAtExtraction: userLevel,
          growthVarianceSeed,
          // Stamp clean-by-construction so self-heal.js Phase 2 can skip this
          // shadow forever (its skip-flag relies on every creation path stamping).
          _healV: C2.HEAL_VERSION
        };
        return shadow;
      },
      calculateExtractionChance(userRank, userStats, targetRank, targetStrength, intelligence, perception, strength, skipCap = false) {
        var _a, _b;
        if (((_b = (_a = this.getSoloLevelingData) == null ? void 0 : _a.call(this)) == null ? void 0 : _b.rank) === "Shadow Monarch") return 1;
        const usingLegacySignature = typeof userRank === "number" && typeof userStats === "number" && typeof targetRank === "number" && typeof targetStrength === "string";
        if (usingLegacySignature) {
          intelligence = userRank;
          perception = userStats;
          strength = targetRank;
          const legacyRank = targetStrength;
          userRank = legacyRank;
          targetRank = legacyRank;
          targetStrength = 0;
          userStats = {
            strength: Number.isFinite(strength) ? strength : 0,
            agility: 0,
            intelligence: Number.isFinite(intelligence) ? intelligence : 0,
            vitality: 0,
            perception: Number.isFinite(perception) ? perception : 0
          };
        }
        const numericOrZero = (value) => {
          const parsed = Number(value);
          return Number.isFinite(parsed) ? parsed : 0;
        };
        const safeUserStats = userStats && typeof userStats === "object" ? {
          strength: numericOrZero(userStats.strength),
          agility: numericOrZero(userStats.agility),
          intelligence: numericOrZero(userStats.intelligence),
          vitality: numericOrZero(userStats.vitality),
          perception: numericOrZero(userStats.perception)
        } : { strength: 0, agility: 0, intelligence: 0, vitality: 0, perception: 0 };
        const safeIntelligence = numericOrZero(intelligence || safeUserStats.intelligence);
        const safePerception = numericOrZero(perception || safeUserStats.perception);
        const safeStrength = numericOrZero(strength || safeUserStats.strength);
        const safeTargetStrength = numericOrZero(targetStrength);
        const safeUserRank = this.shadowRanks.includes(userRank) ? userRank : "E";
        const safeTargetRank = this.shadowRanks.includes(targetRank) ? targetRank : safeUserRank;
        const userRankIndex = this.shadowRanks.indexOf(safeUserRank);
        const targetRankIndex = this.shadowRanks.indexOf(safeTargetRank);
        const rankDiff = targetRankIndex - userRankIndex;
        if (rankDiff > 1) {
          this.debugLog(
            "EXTRACTION_RANK_CHECK",
            `Extracting [${safeTargetRank}] shadow is extremely difficult (User: ${safeUserRank}, gap: +${rankDiff})`
          );
        }
        const cfg = this.settings.extractionConfig || this.defaultSettings.extractionConfig;
        const baseChance = Math.max(
          cfg.minBaseChance || 0.01,
          safeIntelligence * (cfg.chancePerInt || 0.01)
        );
        const totalStats = this.calculateUserStrength(safeUserStats);
        const statsMultiplier = 1 + (safeIntelligence * 0.01 + safePerception * 5e-3 + safeStrength * 3e-3 + totalStats / 1e3 * 0.01);
        const rankMultiplier = this.rankProbabilityMultipliers[safeTargetRank] || 1;
        let rankPenalty = 1;
        if (rankDiff > 0) {
          rankPenalty = 0.5;
          if (rankDiff > 1) {
            rankPenalty *= Math.pow(0.1, rankDiff - 1);
          }
        }
        const userStrength = this.calculateUserStrength(safeUserStats);
        const resistanceCalculators = {
          strengthBased: () => {
            const strengthRatio = Math.min(1, safeTargetStrength / Math.max(1, userStrength));
            return Math.min(0.9, strengthRatio * 0.7);
          },
          rankBased: () => {
            return Math.min(0.9, (targetRankIndex + 1) / ((userRankIndex + 1) * 2));
          }
        };
        const targetResistance = safeTargetStrength > 0 ? resistanceCalculators.strengthBased() : resistanceCalculators.rankBased();
        const rawChance = baseChance * statsMultiplier * rankMultiplier * rankPenalty * (1 - targetResistance);
        if (!Number.isFinite(rawChance)) return 0;
        const capMap = {
          capped: () => {
            const maxChance = cfg.maxExtractionChance || 0.15;
            return Math.max(0, Math.min(maxChance, rawChance));
          },
          uncapped: () => Math.max(0, Math.min(1, rawChance))
        };
        return capMap[skipCap ? "uncapped" : "capped"]();
      },
      calculateUserStrength(userStats) {
        if (!userStats) return 0;
        const statKeys = C2.STAT_KEYS;
        return statKeys.reduce((sum, key) => sum + (userStats[key] || 0), 0);
      },
      getRankBaselineStats(shadowRank, rankMultiplier) {
        var _a;
        if (!shadowRank) {
          const defaultBaseline = 10;
          const statKeys2 = C2.STAT_KEYS;
          return statKeys2.reduce((stats, key) => {
            stats[key] = defaultBaseline;
            return stats;
          }, {});
        }
        const rankIndex = Math.max(0, this.shadowRanks.indexOf(shadowRank));
        const resolvedMultiplier = (Number.isFinite(rankMultiplier) && rankMultiplier > 0 ? rankMultiplier : null) || (Number.isFinite((_a = this.rankStatMultipliers) == null ? void 0 : _a[shadowRank]) && this.rankStatMultipliers[shadowRank] > 0 ? this.rankStatMultipliers[shadowRank] : Math.pow(1.35, rankIndex));
        const baselineValue = Math.max(
          10,
          Math.round(10 + 150 * (Math.pow(resolvedMultiplier, 1.05) - 1))
        );
        const statKeys = C2.STAT_KEYS;
        return statKeys.reduce((stats, key) => {
          stats[key] = baselineValue;
          return stats;
        }, {});
      },
      generateShadowBaseStats(userStats, roleKey, shadowRank, rankMultiplier, growthVarianceSeed = null) {
        if (!roleKey || !shadowRank) {
          const statKeys2 = C2.STAT_KEYS;
          return statKeys2.reduce((stats, key) => {
            stats[key] = 10;
            return stats;
          }, {});
        }
        const weights = this.shadowRoleStatWeights[roleKey] || this.shadowRoleStatWeights.knight;
        const statKeys = C2.STAT_KEYS;
        const rankBaselines = this.getRankBaselineStats(shadowRank, rankMultiplier);
        if (!rankBaselines) {
          return statKeys.reduce((stats, key) => {
            stats[key] = 10;
            return stats;
          }, {});
        }
        return statKeys.reduce((baseStats, stat, s) => {
          const roleWeight = weights[stat] || 1;
          const rankBaseline = rankBaselines[stat] || 10;
          const variance = growthVarianceSeed != null ? 0.9 + (growthVarianceSeed * 7 + s * 13) % 100 / 500 : 0.9 + Math.random() * 0.2;
          const shadowStat = rankBaseline * roleWeight * variance;
          baseStats[stat] = Math.max(1, Math.round(shadowStat));
          return baseStats;
        }, {});
      },
      calculateShadowStrength(stats, multiplier = 1) {
        if (!stats) return 0;
        if (multiplier <= 0) return 0;
        const statKeys = C2.STAT_KEYS;
        const totalStats = statKeys.reduce((sum, key) => sum + (stats[key] || 0), 0);
        return Math.floor(totalStats * multiplier);
      },
      // POWER CALCULATION & CACHING
      calculateShadowPower(effectiveStats, multiplier = 1) {
        return this.calculateShadowStrength(effectiveStats, multiplier);
      },
      _setShadowPowerCacheValue(cacheKey, powerValue) {
        if (!cacheKey) return;
        if (!this._shadowPowerCache) {
          this._shadowPowerCache = /* @__PURE__ */ new Map();
        }
        if (this._shadowPowerCache.size >= this._shadowPowerCacheLimit) {
          const firstKey = this._shadowPowerCache.keys().next().value;
          this._shadowPowerCache.delete(firstKey);
        }
        this._shadowPowerCache.set(cacheKey, powerValue);
      },
      calculateShadowPowerCached(shadow, preDecompressedShadow = null) {
        if (!this.getCacheKey(shadow)) {
          this.debugLog("POWER_CALC", "Invalid shadow object", {
            hasShadow: !!shadow,
            hasId: !!(shadow && shadow.id),
            hasI: !!(shadow && shadow.i)
          });
          return 0;
        }
        const shadowId = this.getCacheKey(shadow);
        if (!shadowId) return 0;
        const cacheKey = `power_${shadowId}`;
        if (this._shadowPowerCache && this._shadowPowerCache.has(cacheKey)) {
          return this._shadowPowerCache.get(cacheKey);
        }
        const decompressed = preDecompressedShadow || this.getShadowData(shadow);
        if (!decompressed) {
          this.debugLog("POWER_CALC", "Failed to decompress shadow", {
            shadowId,
            isCompressed: !!(shadow._c === 1 || shadow._c === 2)
          });
          return 0;
        }
        if (decompressed.strength && decompressed.strength > 0) {
          this._setShadowPowerCacheValue(cacheKey, decompressed.strength);
          return decompressed.strength;
        }
        const effective = this.getShadowEffectiveStats(decompressed);
        if (!effective) {
          this.debugLog("POWER_CALC", "No effective stats available", {
            shadowId,
            hasDecompressed: !!decompressed,
            hasBaseStats: !!(decompressed == null ? void 0 : decompressed.baseStats)
          });
          return 0;
        }
        const power = this.calculateShadowPower(effective, 1);
        if (power === 0) {
          this.debugLog("POWER_CALC", "Calculated power is 0", {
            shadowId,
            effectiveStats: effective,
            hasStrength: !!decompressed.strength,
            decompressedStrength: decompressed.strength
          });
        }
        this._setShadowPowerCacheValue(cacheKey, power);
        return power;
      },
      processShadowsWithPower(shadows, useCache = true) {
        if (!shadows || shadows.length === 0) return [];
        return shadows.map((shadow) => {
          const decompressed = this.getShadowData(shadow);
          const effective = this.getShadowEffectiveStats(decompressed);
          const power = useCache ? this.calculateShadowPowerCached(shadow, decompressed) : this.calculateShadowStrength(effective, 1);
          return {
            shadow,
            decompressed,
            effective,
            power,
            compressionLevel: shadow._c || 0
          };
        });
      },
      clearShadowPowerCache() {
        if (this._shadowPowerCache) {
          this._shadowPowerCache.clear();
          this.debugLog("CACHE", "Shadow power cache cleared");
        }
      },
      clearCombatCache() {
        this.clearShadowPowerCache();
        this._soloDataCache = null;
        this._soloDataCacheTime = 0;
        this._snapshotCache = null;
        this._snapshotTimestamp = 0;
        this._topGeneralsCache = null;
        this._topGeneralsCacheKey = null;
        this._topGeneralsCacheTime = 0;
        this._armyStatsCache = null;
        this._armyStatsCacheTime = null;
        this._armyStatsCacheKey = null;
        this._widgetDirty = true;
      },
      getCacheKey(shadow) {
        if (!shadow) return null;
        return shadow.id || shadow.i || null;
      },
      getAllCacheKeys(shadow) {
        var _a, _b;
        if (!shadow) return [];
        const keys = /* @__PURE__ */ new Set();
        const add = (value) => {
          if (value === null || value === void 0) return;
          const normalized = String(value).trim();
          normalized && keys.add(normalized);
        };
        add(shadow.id);
        add(shadow.i);
        add((_a = shadow.extractedData) == null ? void 0 : _a.id);
        add((_b = shadow.extractedData) == null ? void 0 : _b.i);
        if (keys.size === 0 && typeof this.decompressShadow === "function") {
          try {
            const decompressed = this.decompressShadow(shadow);
            add(decompressed == null ? void 0 : decompressed.id);
            add(decompressed == null ? void 0 : decompressed.i);
          } catch (error) {
            this.debugError("CACHE", "Failed to derive cache keys from compressed shadow payload", error);
          }
        }
        return [...keys];
      },
      invalidateShadowPowerCache(shadow) {
        if (!shadow || !this._shadowPowerCache) return;
        const keys = this.getAllCacheKeys ? this.getAllCacheKeys(shadow) : [this.getCacheKey(shadow)].filter(Boolean);
        keys.forEach((key) => {
          const powerCacheKey = `power_${key}`;
          if (this._shadowPowerCache.has(powerCacheKey)) {
            this._shadowPowerCache.delete(powerCacheKey);
            this.debugLog("CACHE", "Invalidated power cache", { key: powerCacheKey });
          }
        });
      },
      getArmyStatsCacheKey() {
        var _a, _b, _c;
        const ts = ((_a = this.settings) == null ? void 0 : _a.cachedTotalPowerTimestamp) || 0;
        const count = ((_b = this.settings) == null ? void 0 : _b.cachedTotalPowerShadowCount) || 0;
        const version = ((_c = this.settings) == null ? void 0 : _c.cachedTotalPowerVersion) || 0;
        return `${ts}_${count}_${version}`;
      },
      createEmptyArmyStats() {
        return {
          totalShadows: 0,
          totalPower: 0,
          totalStats: this.createZeroStatBlock(),
          byRank: {},
          byRole: {},
          avgLevel: 0
        };
      },
      createZeroStatBlock() {
        return C2.STAT_KEYS.reduce((stats, key) => {
          stats[key] = 0;
          return stats;
        }, {});
      },
      /**
       * Personality-based mob target selection — BUILT 2026-08-05.
       *
       * Dungeons called this method for months as its "personality-based
       * targeting" path, but it never existed (the phantom-API audit removed the
       * dead call). This is the honest build of what that code believed in:
       * mobs preferentially strike shadows whose personality puts them in harm's
       * way. Tanks draw aggro — that is their job — while the strategic/supportive
       * backline gets hit least.
       *
       * PERF CONTRACT: called per simulated hit (capped at 1,800/tick by the
       * caller), so it must stay O(K) with zero allocations beyond the loop.
       * K=6 weighted sampling over random candidates approximates full weighted
       * selection closely at army scale without touching the whole roster.
       *
       * @returns {{ targetShadow: object }|null} shape the Dungeons caller expects.
       */
      processMobAttackOnShadow(mob, aliveShadows) {
        if (!Array.isArray(aliveShadows) || aliveShadows.length === 0) return null;
        const AGGRO = {
          tank: 3,
          // frontline wall — actively draws attacks
          defensive: 2.5,
          // holds the line beside tanks (2026-08-05: army-db
          // export found 2,772 shadows with this key silently
          // falling to the 1.0 default, plus berserker/assassin/
          // support below — all real stored personalities the
          // table never knew)
          aggressive: 2,
          // in melee, exposed
          berserker: 2.2,
          // deeper in melee than aggressive, heedless
          balanced: 1,
          tactical: 0.8,
          // mobile skirmishers
          assassin: 0.7,
          // strikes and vanishes
          strategic: 0.6,
          // backline casters
          supportive: 0.5,
          // protected by the line
          support: 0.5
          // stored alias of supportive
        };
        const n = aliveShadows.length;
        const K = Math.min(6, n);
        let chosen = null;
        let total = 0;
        for (let i = 0; i < K; i++) {
          const candidate = aliveShadows[Math.random() * n | 0];
          if (!candidate) continue;
          const key = this.getShadowPersonalityKey(candidate) || "balanced";
          const weight = AGGRO[key] || 1;
          total += weight;
          if (Math.random() * total < weight) chosen = candidate;
        }
        return chosen ? { targetShadow: chosen } : null;
      }
    };
  }
});

// src/ShadowArmy/army-stats.js
var require_army_stats = __commonJS({
  "src/ShadowArmy/army-stats.js"(exports2, module2) {
    var C2 = require_constants();
    module2.exports = {
      // DUNGEON COMBAT OPTIMIZATION HELPERS
      _getShadowPowerValue(shadow) {
        const indexedStrength = Number(shadow == null ? void 0 : shadow.strength);
        if (Number.isFinite(indexedStrength) && indexedStrength > 0) {
          return indexedStrength;
        }
        let decompressed = shadow;
        if (this.getShadowData && typeof this.getShadowData === "function") {
          decompressed = this.getShadowData(shadow) || shadow;
        }
        const decompressedStrength = Number(decompressed == null ? void 0 : decompressed.strength);
        if (Number.isFinite(decompressedStrength) && decompressedStrength > 0) {
          return decompressedStrength;
        }
        const effective = this.getShadowEffectiveStats(decompressed);
        if (effective) {
          const power = this.calculateShadowPower(effective, 1);
          if (power > 0) return power;
        }
        return 0;
      },
      _accumulateShadowPower(shadow, totals) {
        try {
          const power = this._getShadowPowerValue(shadow);
          if (power > 0) {
            totals.totalPower += power;
            totals.processedCount += 1;
          }
        } catch (shadowError) {
          this.debugLog("POWER", "Failed to calculate power for shadow", {
            shadowId: this.getCacheKey(shadow),
            error: shadowError == null ? void 0 : shadowError.message
          });
        }
      },
      _persistTotalPowerCache(totalPower, currentCount) {
        this.settings.cachedTotalPower = totalPower;
        this.settings.cachedTotalPowerShadowCount = currentCount;
        this.settings.cachedTotalPowerTimestamp = Date.now();
        this.settings.cachedTotalPowerVersion = (this.settings.cachedTotalPowerVersion || 0) + 1;
        this.saveSettings();
      },
      async _applyTotalPowerDelta(shadow, direction) {
        const shadowPower = this._getShadowPowerValue(shadow);
        if (!(shadowPower > 0)) return null;
        this._applyTotalPowerDeltaChain = (this._applyTotalPowerDeltaChain || Promise.resolve()).then(async () => {
          var _a;
          const currentCount = await ((_a = this.storageManager) == null ? void 0 : _a.getTotalCount()) || 0;
          const currentPower = this.settings.cachedTotalPower || 0;
          const newPower = direction === "decrement" ? Math.max(0, currentPower - shadowPower) : currentPower + shadowPower;
          this.settings.cachedTotalPower = newPower;
          this.settings.cachedTotalPowerShadowCount = currentCount;
          this.settings.cachedTotalPowerTimestamp = Date.now();
          this.settings.cachedTotalPowerVersion = (this.settings.cachedTotalPowerVersion || 0) + 1;
          this.saveSettings();
          this._armyWriteGen = (this._armyWriteGen || 0) + 1;
          return { shadowPower, currentPower, newPower, currentCount };
        }).catch((err) => {
          this.debugError("POWER", "_applyTotalPowerDelta chain error", err);
          return null;
        });
        return this._applyTotalPowerDeltaChain;
      },
      async getTotalShadowPower(forceRecalculate = false) {
        var _a, _b, _c;
        if (!forceRecalculate && this.storageManager && this.settings.cachedTotalPowerTimestamp) {
          let currentCount = 0;
          try {
            currentCount = await this.storageManager.getTotalCount() || 0;
          } catch (error) {
            this.debugError("POWER", "getTotalCount failed on the cache-check path \u2014 recalculating", error);
            currentCount = -1;
          }
          const cachedCount = this.settings.cachedTotalPowerShadowCount || 0;
          if (currentCount === cachedCount) {
            const cachedPower = this.settings.cachedTotalPower || 0;
            this.debugLog("POWER", "Using incremental cache", { cachedPower, shadowCount: currentCount });
            return cachedPower;
          }
        }
        this.debugLog("POWER", "Recalculating total power from all shadows", {
          forceRecalculate,
          cachedPower: this.settings.cachedTotalPower,
          cachedCount: this.settings.cachedTotalPowerShadowCount || 0
        });
        const totals = { totalPower: 0, processedCount: 0 };
        if (this.storageManager) {
          try {
            const streamPower = this.storageManager.forEachShadowBatchPaged ? this.storageManager.forEachShadowBatchPaged.bind(this.storageManager) : this.storageManager.forEachShadowBatch.bind(this.storageManager);
            const streamResult = await streamPower(
              (batch) => {
                for (let i = 0; i < batch.length; i++) {
                  this._accumulateShadowPower(batch[i], totals);
                }
              },
              { batchSize: 500 }
            );
            const currentCount = await ((_a = this.storageManager) == null ? void 0 : _a.getTotalCount()) || 0;
            this._persistTotalPowerCache(totals.totalPower, currentCount);
            this.debugLog("POWER", "Total power calculated", {
              totalPower: totals.totalPower,
              processedShadows: totals.processedCount,
              scannedShadows: (streamResult == null ? void 0 : streamResult.scanned) || 0,
              streamBatches: (streamResult == null ? void 0 : streamResult.batches) || 0,
              totalShadows: currentCount,
              cacheUpdated: true
            });
            return totals.totalPower;
          } catch (error) {
            this.debugError("POWER", "Failed to calculate total power", error);
            const cached = this.settings.cachedTotalPower ?? 0;
            if (cached === 0 && !this._totalPowerFailureToastShown) {
              this._totalPowerFailureToastShown = true;
              try {
                (_c = (_b = BdApi.UI) == null ? void 0 : _b.showToast) == null ? void 0 : _c.call(
                  _b,
                  "ShadowArmy: failed to compute total power and no cache available. Army buffs may be wrong.",
                  { type: "error", timeout: 8e3 }
                );
              } catch (_) {
              }
            }
            return cached;
          }
        }
        return 0;
      },
      async incrementTotalPower(shadow) {
        try {
          const result = await this._applyTotalPowerDelta(shadow, "increment");
          if (result) {
            this.debugLog("POWER", "Incremented total power cache", {
              shadowPower: result.shadowPower,
              previousPower: result.currentPower,
              newPower: result.newPower,
              shadowCount: result.currentCount
            });
            return result.newPower;
          }
        } catch (error) {
          this.debugError("POWER", "Failed to increment total power", error);
        }
        return this.settings.cachedTotalPower || 0;
      },
      // ARMY STATS AGGREGATION
      logShadowAggregationSamples(allShadows) {
        this.debugLog("COMBAT", "Retrieved shadows for aggregation", {
          shadowCount: allShadows.length,
          firstShadowSample: allShadows[0] ? {
            id: allShadows[0].id || allShadows[0].i,
            rank: allShadows[0].rank,
            hasStrength: !!allShadows[0].strength,
            strength: allShadows[0].strength,
            hasBaseStats: !!allShadows[0].baseStats,
            baseStats: allShadows[0].baseStats,
            isCompressed: !!(allShadows[0]._c === 1 || allShadows[0]._c === 2)
          } : null
        });
        if (allShadows.length > 0) {
          const sampleShadow = allShadows[0];
          let decompressed = sampleShadow;
          if (this.getShadowData && typeof this.getShadowData === "function") {
            decompressed = this.getShadowData(sampleShadow) || sampleShadow;
          }
          const effective = this.getShadowEffectiveStats(decompressed);
          const power = this.calculateShadowPower(effective, 1);
          this.debugLog("COMBAT", "Sample shadow power calculation", {
            shadowId: sampleShadow.id || sampleShadow.i,
            hasGetShadowData: !!this.getShadowData,
            hasDecompressed: !!decompressed,
            hasEffective: !!effective,
            effectiveStats: effective,
            calculatedPower: power,
            storedStrength: sampleShadow.strength,
            decompressedStrength: decompressed == null ? void 0 : decompressed.strength,
            hasBaseStats: !!(decompressed == null ? void 0 : decompressed.baseStats),
            baseStats: decompressed == null ? void 0 : decompressed.baseStats
          });
        }
      },
      createArmyStatsAccumulator(statKeys) {
        const keys = Array.isArray(statKeys) ? statKeys : C2.STAT_KEYS;
        return {
          totalShadows: 0,
          totalPower: 0,
          totalLevel: 0,
          totalStats: this.createZeroStatsBucket(keys),
          byRank: {},
          byRole: {}
        };
      },
      createZeroStatsBucket(statKeys) {
        const keys = Array.isArray(statKeys) ? statKeys : C2.STAT_KEYS;
        return keys.reduce((stats, key) => {
          stats[key] = 0;
          return stats;
        }, {});
      },
      _accumulateArmyStatsForShadow(acc, shadow, statKeys) {
        let decompressed = shadow;
        if (this.getShadowData && typeof this.getShadowData === "function") {
          decompressed = this.getShadowData(shadow);
        }
        if (!decompressed) decompressed = shadow;
        if (!decompressed || !decompressed.id && !decompressed.i) {
          const shadowId = this.getCacheKey(shadow);
          this.debugLog("COMBAT", "Invalid shadow data, skipping", {
            shadowId,
            hasGetShadowData: !!this.getShadowData
          });
          return;
        }
        const effective = this.getShadowEffectiveStats(decompressed);
        if (!effective) {
          this.debugLog("COMBAT", "Cannot calculate effective stats, skipping shadow", {
            shadowId: this.getCacheKey(decompressed),
            hasBaseStats: !!decompressed.baseStats,
            hasGrowthStats: !!decompressed.growthStats,
            hasNaturalGrowthStats: !!decompressed.naturalGrowthStats
          });
          return;
        }
        const totalEffectiveStats = statKeys.reduce((sum, key) => sum + (effective[key] || 0), 0);
        if (totalEffectiveStats === 0) {
          const fallbackStrength = decompressed.strength || shadow.strength || 0;
          if (fallbackStrength > 0) {
            this.debugLog("COMBAT", "Using stored strength as fallback (effective stats are all 0)", {
              shadowId: this.getCacheKey(decompressed),
              storedStrength: fallbackStrength,
              effectiveStats: effective,
              baseStats: decompressed.baseStats
            });
            const power2 = fallbackStrength;
            acc.totalShadows++;
            acc.totalPower += power2;
            acc.totalLevel += decompressed.level || 1;
            const fallbackShare = Math.floor(power2 / 5);
            for (let k = 0; k < statKeys.length; k++) {
              acc.totalStats[statKeys[k]] += fallbackShare;
            }
          } else {
            this.debugLog("COMBAT", "Skipping shadow with no valid stats or strength", {
              shadowId: this.getCacheKey(decompressed),
              effectiveStats: effective,
              storedStrength: fallbackStrength,
              baseStats: decompressed.baseStats,
              rank: decompressed == null ? void 0 : decompressed.rank
            });
          }
          return;
        }
        const power = this.calculateShadowPower(effective, 1);
        if (power === 0 && acc.totalShadows < 3) {
          this.debugLog("COMBAT", "Power is 0 despite having effective stats", {
            shadowId: this.getCacheKey(decompressed),
            effectiveStats: effective,
            totalEffectiveStats,
            baseStats: decompressed.baseStats,
            growthStats: decompressed.growthStats,
            naturalGrowthStats: decompressed.naturalGrowthStats,
            rank: decompressed == null ? void 0 : decompressed.rank,
            level: decompressed == null ? void 0 : decompressed.level,
            calculatedPower: power
          });
        }
        acc.totalShadows++;
        acc.totalPower += power;
        acc.totalLevel += decompressed.level || 1;
        for (let k = 0; k < statKeys.length; k++) {
          const stat = statKeys[k];
          acc.totalStats[stat] += effective[stat] || 0;
        }
        const rank = decompressed.rank || "E";
        if (!acc.byRank[rank]) {
          acc.byRank[rank] = { count: 0, totalPower: 0, totalStats: this.createZeroStatsBucket(statKeys) };
        }
        acc.byRank[rank].count++;
        acc.byRank[rank].totalPower += power;
        const rankStats = acc.byRank[rank].totalStats;
        for (let k = 0; k < statKeys.length; k++) {
          const stat = statKeys[k];
          rankStats[stat] += effective[stat] || 0;
        }
        const role = decompressed.role || decompressed.roleName || "Unknown";
        if (!acc.byRole[role]) {
          acc.byRole[role] = { count: 0, totalPower: 0, totalStats: this.createZeroStatsBucket(statKeys) };
        }
        acc.byRole[role].count++;
        acc.byRole[role].totalPower += power;
        const roleStats = acc.byRole[role].totalStats;
        for (let k = 0; k < statKeys.length; k++) {
          const stat = statKeys[k];
          roleStats[stat] += effective[stat] || 0;
        }
      },
      aggregateShadowsForArmyStats(allShadows) {
        const statKeys = C2.STAT_KEYS;
        const aggregatedData = this.createArmyStatsAccumulator(statKeys);
        const safeShadows = Array.isArray(allShadows) ? allShadows : [];
        for (let i = 0; i < safeShadows.length; i++) {
          this._accumulateArmyStatsForShadow(aggregatedData, safeShadows[i], statKeys);
        }
        return aggregatedData;
      },
      async aggregateShadowsForArmyStatsStreamed(batchSize = 200) {
        var _a;
        const statKeys = C2.STAT_KEYS;
        const aggregatedData = this.createArmyStatsAccumulator(statKeys);
        let sampleShadow = null;
        if (!((_a = this.storageManager) == null ? void 0 : _a.forEachShadowBatch)) {
          return { aggregatedData, sampleShadow, scanned: 0, batches: 0 };
        }
        const streamStats = this.storageManager.forEachShadowBatchPaged ? this.storageManager.forEachShadowBatchPaged.bind(this.storageManager) : this.storageManager.forEachShadowBatch.bind(this.storageManager);
        const streamResult = await streamStats(
          (batch) => {
            if (!sampleShadow && batch.length > 0) sampleShadow = batch[0];
            for (let i = 0; i < batch.length; i++) {
              this._accumulateArmyStatsForShadow(aggregatedData, batch[i], statKeys);
            }
          },
          { batchSize: Math.max(batchSize, 500) }
        );
        return {
          aggregatedData,
          sampleShadow,
          scanned: (streamResult == null ? void 0 : streamResult.scanned) || aggregatedData.totalShadows,
          batches: (streamResult == null ? void 0 : streamResult.batches) || 0
        };
      },
      async finalizeAggregatedArmyStats({ aggregatedData, allShadowsLength }) {
        const avgLevel = aggregatedData.totalShadows > 0 ? Math.floor(aggregatedData.totalLevel / aggregatedData.totalShadows) : 0;
        const totalShadowsCount = aggregatedData.totalShadows;
        const fallbackPower = aggregatedData.totalPower;
        let finalPower = fallbackPower;
        if (totalShadowsCount > 0 && !(fallbackPower > 0)) {
          try {
            const directPower = await this.getTotalShadowPower(false);
            if (directPower > 0) finalPower = directPower;
            this.debugLog("GET_AGGREGATED_ARMY_STATS", "Stream produced 0 \u2014 used cached power", {
              directPower,
              totalShadows: totalShadowsCount,
              finalPower
            });
          } catch (powerError) {
            this.debugError("GET_AGGREGATED_ARMY_STATS", "Failed to get cached power fallback", powerError);
          }
        }
        const aggregated = { ...aggregatedData, avgLevel, totalPower: finalPower };
        if (typeof aggregated.totalPower !== "number" || isNaN(aggregated.totalPower)) {
          this.debugError("GET_AGGREGATED_ARMY_STATS", "Invalid totalPower calculated", {
            totalPower: aggregated.totalPower,
            totalShadows: aggregated.totalShadows,
            shadowCount: allShadowsLength
          });
          return { aggregated: { ...aggregated, totalPower: 0 }, shouldCache: false };
        }
        const avgPower = aggregated.totalShadows > 0 ? Math.floor(aggregated.totalPower / aggregated.totalShadows) : 0;
        this.debugLog("GET_AGGREGATED_ARMY_STATS", "Army stats aggregated successfully", {
          totalShadows: aggregated.totalShadows,
          totalPower: aggregated.totalPower,
          shadowCount: allShadowsLength,
          avgPower,
          avgLevel: aggregated.avgLevel,
          byRankCounts: Object.keys(aggregated.byRank).map((rank) => ({
            rank,
            count: aggregated.byRank[rank].count,
            power: aggregated.byRank[rank].totalPower
          })),
          totalStatsSum: Object.values(aggregated.totalStats).reduce((sum, val) => sum + (val || 0), 0)
        });
        if (aggregated.totalShadows > 0 && aggregated.totalPower === 0) {
          this.debugError("GET_AGGREGATED_ARMY_STATS", "WARNING: Shadows exist but totalPower is 0!", {
            totalShadows: aggregated.totalShadows,
            shadowCount: allShadowsLength,
            totalStats: aggregated.totalStats,
            byRank: aggregated.byRank,
            possibleCauses: [
              "Shadows have no baseStats",
              "Effective stats calculation is returning all zeros",
              "Power calculation is failing",
              "Shadows are compressed incorrectly"
            ]
          });
        }
        return { aggregated, shouldCache: true };
      },
      /**
       * @param {boolean} [forceRecalculate=false] bypass the cache entirely.
       *   ADDED 2026-07-30: two callers in SoloLevelingStats/achievements.js
       *   (:407, :455) have always passed `true` here expecting a forced refresh,
       *   but the function accepted no parameters, so the argument was silently
       *   discarded and they got whatever was cached. Those are last-resort paths
       *   that run precisely when the cached figure looked wrong, so ignoring them
       *   defeated their purpose. Honouring it also keeps the stale-tolerant fast
       *   path below safe: anything that genuinely needs current numbers can ask.
       */
      async getAggregatedArmyStats(forceRecalculate = false) {
        var _a, _b, _c;
        const STALE_OK_MS = 3e5;
        const now = Date.now();
        const currentCacheKey = this.getArmyStatsCacheKey();
        if (!forceRecalculate && this._armyStatsCache && this._armyStatsCacheTime && now - this._armyStatsCacheTime < STALE_OK_MS) {
          this._armyStatsCacheKey = currentCacheKey;
          return this._armyStatsCache;
        }
        try {
          const totalCount = this.storageManager ? await this.storageManager.getTotalCount() : 0;
          if (!totalCount || totalCount <= 0) {
            this.debugLog("COMBAT", "No shadows found in storage", {
              hasStorageManager: !!this.storageManager,
              dbInitialized: !!((_a = this.storageManager) == null ? void 0 : _a.db),
              settingsShadowsCount: (this.settings.shadows || []).length,
              storageManagerDbName: (_b = this.storageManager) == null ? void 0 : _b.dbName
            });
            if (this.storageManager) {
              this.debugLog("COMBAT", "IndexedDB total count check", {
                totalCount,
                dbName: ((_c = this.storageManager) == null ? void 0 : _c.dbName) || "unknown"
              });
            }
            return this.createEmptyArmyStats();
          }
          const snapshot = this.getShadowSnapshot();
          let aggregatedData;
          if (snapshot && snapshot.length > 0 && snapshot.length === totalCount) {
            this.debugLog("COMBAT", "Using snapshot cache for aggregation", {
              snapshotSize: snapshot.length,
              totalCount
            });
            this.logShadowAggregationSamples(snapshot);
            aggregatedData = this.aggregateShadowsForArmyStats(snapshot);
          } else {
            const streamed = await this.aggregateShadowsForArmyStatsStreamed(200);
            aggregatedData = streamed.aggregatedData;
            this.debugLog("COMBAT", "Streamed shadow aggregation complete", {
              scanned: streamed.scanned,
              batches: streamed.batches,
              totalCount,
              sampleShadow: streamed.sampleShadow ? {
                id: streamed.sampleShadow.id || streamed.sampleShadow.i,
                rank: streamed.sampleShadow.rank,
                hasStrength: !!streamed.sampleShadow.strength
              } : null
            });
          }
          const { aggregated, shouldCache } = await this.finalizeAggregatedArmyStats({
            aggregatedData,
            allShadowsLength: totalCount
          });
          if (shouldCache) {
            this._armyStatsCache = aggregated;
            this._armyStatsCacheTime = Date.now();
            this._armyStatsCacheKey = this.getArmyStatsCacheKey();
            this._armyStatsCacheCount = aggregated.totalShadows;
          }
          return aggregated;
        } catch (error) {
          this.debugError("COMBAT", "Failed to aggregate army stats", error);
          if (this._armyStatsCache && this._armyStatsCache.totalPower > 0) {
            this.debugLog("COMBAT", "Returning previous cache due to error", {
              previousTotalPower: this._armyStatsCache.totalPower,
              previousTotalShadows: this._armyStatsCache.totalShadows
            });
            return this._armyStatsCache;
          }
          return this.createEmptyArmyStats();
        }
      }
    };
  }
});

// src/ShadowArmy/army-export.js
var require_army_export = __commonJS({
  "src/ShadowArmy/army-export.js"(exports2, module2) {
    module2.exports = {
      _getArmyExportPath() {
        try {
          const pathModule = require("path");
          const appSupport = pathModule.resolve(BdApi.Plugins.folder, "..", "..");
          const exportDir = pathModule.join(appSupport, "discord", "SoloLevelingBackups");
          require("fs").mkdirSync(exportDir, { recursive: true });
          return pathModule.join(exportDir, "army-database.ndjson");
        } catch {
          return null;
        }
      },
      /**
       * Flatten one stored record into an analysis-friendly row.
       * Decompresses first (stored records use short field names), then reads
       * every progression axis separately so per-rank stat curves can be
       * checked against base vs growth vs effective independently.
       */
      _buildArmyExportRow(record) {
        const s = this.getShadowData ? this.getShadowData(record) || record : record;
        const base = s.baseStats || {};
        const growth = s.growthStats || {};
        const natural = s.naturalGrowthStats || {};
        let effective = null;
        try {
          effective = this.getShadowEffectiveStats ? this.getShadowEffectiveStats(s) : null;
        } catch (_) {
          effective = null;
        }
        let personality = null;
        try {
          personality = this.getShadowPersonalityKey ? this.getShadowPersonalityKey(s) : null;
        } catch (_) {
        }
        return {
          id: s.id ?? s.i ?? null,
          rank: s.rank ?? s.r ?? null,
          level: s.level ?? s.l ?? null,
          role: s.role ?? s.ro ?? null,
          roleName: s.roleName ?? null,
          beastType: s.beastType ?? null,
          beastFamily: s.beastFamily ?? null,
          grade: s.grade ?? s.gr ?? "Common",
          personality,
          strength: Number(s.strength) || 0,
          base_str: Number(base.strength) || 0,
          base_agi: Number(base.agility) || 0,
          base_int: Number(base.intelligence) || 0,
          base_vit: Number(base.vitality) || 0,
          base_per: Number(base.perception) || 0,
          grow_str: Number(growth.strength) || 0,
          grow_agi: Number(growth.agility) || 0,
          grow_int: Number(growth.intelligence) || 0,
          grow_vit: Number(growth.vitality) || 0,
          grow_per: Number(growth.perception) || 0,
          nat_str: Number(natural.strength) || 0,
          nat_agi: Number(natural.agility) || 0,
          nat_int: Number(natural.intelligence) || 0,
          nat_vit: Number(natural.vitality) || 0,
          nat_per: Number(natural.perception) || 0,
          eff_str: effective ? Number(effective.strength) || 0 : null,
          eff_agi: effective ? Number(effective.agility) || 0 : null,
          eff_int: effective ? Number(effective.intelligence) || 0 : null,
          eff_vit: effective ? Number(effective.vitality) || 0 : null,
          eff_per: effective ? Number(effective.perception) || 0 : null,
          totalCombatTime: Number(s.totalCombatTime) || 0,
          extractedAt: s.extractedAt ?? null,
          healV: s._healV ?? null
        };
      },
      /**
       * Stream the whole army to NDJSON. Safe to call from the settings panel;
       * re-entry guarded, progress toasts every 50k records.
       * @returns {Promise<{count: number, path: string}|null>}
       */
      async exportArmyDatabase() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (this._armyExportInProgress) {
          (_a = this._toast) == null ? void 0 : _a.call(this, "Army export already running\u2026", "info");
          return null;
        }
        if (!this.storageManager || typeof this.storageManager.forEachShadowBatchPaged !== "function") {
          (_b = this._toast) == null ? void 0 : _b.call(this, "Army export unavailable: storage not ready.", "error");
          return null;
        }
        const filePath = this._getArmyExportPath();
        if (!filePath) {
          (_c = this._toast) == null ? void 0 : _c.call(this, "Army export unavailable: cannot resolve export path.", "error");
          return null;
        }
        this._armyExportInProgress = true;
        const startedAt = Date.now();
        const fs = require("fs");
        const canAppend = typeof fs.appendFileSync === "function";
        const headerLine = JSON.stringify({ _meta: "shadow-army-export", startedAt, version: 1 }) + "\n";
        const buffered = canAppend ? null : [headerLine];
        let count = 0;
        let nextProgressToast = 5e4;
        try {
          if (canAppend) {
            fs.writeFileSync(filePath, headerLine, "utf8");
          }
          await this.storageManager.forEachShadowBatchPaged((batch) => {
            var _a2;
            if (this._isStopped) throw new Error("EXPORT_ABORTED");
            const lines = [];
            for (const record of batch) {
              try {
                lines.push(JSON.stringify(this._buildArmyExportRow(record)));
              } catch (e) {
                lines.push(JSON.stringify({ _error: String((e == null ? void 0 : e.message) || e), id: (record == null ? void 0 : record.id) ?? (record == null ? void 0 : record.i) ?? null }));
              }
            }
            count += batch.length;
            const chunk = lines.join("\n") + "\n";
            if (canAppend) {
              fs.appendFileSync(filePath, chunk, "utf8");
            } else {
              buffered.push(chunk);
            }
            if (count >= nextProgressToast) {
              nextProgressToast += 5e4;
              (_a2 = this._toast) == null ? void 0 : _a2.call(this, `Army export: ${count.toLocaleString()} shadows collected\u2026`, "info");
            }
          }, { batchSize: 500 });
          const elapsedS = Math.round((Date.now() - startedAt) / 1e3);
          const footerLine = JSON.stringify({ _meta: "end", count, elapsedS }) + "\n";
          if (canAppend) {
            fs.appendFileSync(filePath, footerLine, "utf8");
          } else {
            buffered.push(footerLine);
            fs.writeFileSync(filePath, buffered.join(""), "utf8");
            buffered.length = 0;
          }
          (_d = this._toast) == null ? void 0 : _d.call(this, `Army database exported: ${count.toLocaleString()} shadows in ${elapsedS}s`, "success", 6e3);
          (_e = this.debugLog) == null ? void 0 : _e.call(this, "EXPORT", "Army database export complete", { count, elapsedS, filePath });
          return { count, path: filePath };
        } catch (e) {
          if (String(e == null ? void 0 : e.message) === "EXPORT_ABORTED") {
            (_f = this.debugLog) == null ? void 0 : _f.call(this, "EXPORT", `Army export aborted by plugin stop after ${count.toLocaleString()} rows`);
            return null;
          }
          (_g = this.debugError) == null ? void 0 : _g.call(this, "EXPORT", "Army database export failed", e);
          try {
            fs.writeFileSync(
              filePath.replace(/\.ndjson$/, ".error.log"),
              `${(/* @__PURE__ */ new Date()).toISOString()} export failed after ${count} rows
${(e == null ? void 0 : e.stack) || (e == null ? void 0 : e.message) || String(e)}
`,
              "utf8"
            );
          } catch (_) {
          }
          (_h = this._toast) == null ? void 0 : _h.call(this, "Army export failed \u2014 error saved to SoloLevelingBackups/army-database.error.log", "error", 6e3);
          return null;
        } finally {
          this._armyExportInProgress = false;
        }
      }
    };
  }
});

// src/ShadowArmy/progression.js
var require_progression = __commonJS({
  "src/ShadowArmy/progression.js"(exports2, module2) {
    var C2 = require_constants();
    var SHADOW_SCALE_FACTOR_BY_RANK = {
      E: 0.5,
      D: 0.55,
      C: 0.6,
      B: 0.65,
      A: 0.7,
      S: 0.75,
      SS: 0.8,
      SSS: 0.84,
      "SSS+": 0.88,
      NH: 0.91,
      "National Level": 0.91,
      Monarch: 0.94,
      "Monarch+": 0.97
    };
    module2.exports = {
      // SHADOW GROWTH & LEVELING SYSTEM
      /**
       * Army-wide XP broadcast — NO-OP since 2026-07-30, kept as a stable entry
       * point for its external callers (SoloLevelingStats chat/quest XP).
       *
       * This never targeted specific shadows: every call meant "give XP to all
       * 281,345 of them". Even fully coalesced into a 10-minute accumulator, each
       * flush had to decompress, mutate and recompress the entire store — ~562,000
       * IDB callbacks and ~29 SECONDS of CPU per flush, 87% of all IDB traffic in
       * the suite (AAPerfSentinel, 2026-07-30).
       *
       * Army-wide growth is now DERIVED instead of written: see
       * _getVeterancyMultiplier, which scales every shadow's stats by time since
       * extraction at read time, for zero writes. Veterans stay ahead, newer
       * shadows accrue at the same rate, nobody's progress was erased.
       *
       * TARGETED XP still works and is unaffected — grantShadowXP(amount, reason,
       * ids) is bounded by the id list, so Dungeons combat XP and extraction XP
       * continue to level the specific shadows that earned it. Only the
       * everybody-gets-some broadcast is gone.
       */
      shareShadowXP(_xpAmount, _source = "message") {
        return { updatedShadows: [] };
      },
      /** BdApi.Data key for the persisted pending-shared-XP counter (user-scoped). */
      _pendingSharedXpDataKey() {
        return this.userId ? `pendingSharedXp_${this.userId}` : "pendingSharedXp";
      },
      /** Restore the pending shared-XP counter at startup (crash loses at most one flush window). */
      _restorePendingSharedXp() {
        try {
          const stored = BdApi.Data.load("ShadowArmy", this._pendingSharedXpDataKey());
          this._pendingSharedXp = Math.max(0, Math.floor(Number(stored) || 0));
        } catch (error) {
          this.debugError("SHADOW_XP_SHARE", "Failed to restore pending shared XP", error);
          this._pendingSharedXp = 0;
        }
      },
      /** Persist the pending shared-XP counter. Called only from flush/stop — never per message. */
      _persistPendingSharedXp() {
        try {
          BdApi.Data.save("ShadowArmy", this._pendingSharedXpDataKey(), this._pendingSharedXp || 0);
        } catch (error) {
          this.debugError("SHADOW_XP_SHARE", "Failed to persist pending shared XP", error);
        }
      },
      /**
       * NO-OP since 2026-07-30 (kept: called by a timer in index.js and by stop()).
       *
       * Formerly applied the accumulated army-wide XP by walking all 281k shadows.
       * That work is replaced by derived veterancy (_getVeterancyMultiplier), which
       * needs no flush, no accumulator, and no writes. The lap-rotation scheme that
       * briefly split this walk into slices is gone with it — there is nothing left
       * to slice.
       */
      async flushPendingSharedXp() {
        return { updatedShadows: [] };
      },
      // ── PENDING NATURAL GROWTH (banked dungeon combat hours, drained in background) ──
      //
      // Dungeons banks participation-weighted combat hours per shadow id at
      // completion (bankPendingGrowth) instead of fetching every contributor
      // record at that moment — a 200k-shadow deploy made that fetch ~51k chunked
      // IDB gets per completion, 95% of ShadowArmy's IDB traffic (sentinel
      // 2026-07-31). The drain interval (index.js) applies banked hours in small
      // merge-on-write batches: transformShadowsBatch reads the FRESH record
      // inside its own transaction, so autoPromote/self-heal writes land safely
      // in between. Hours for the same shadow merge additively — one
      // applyNaturalGrowth(h1+h2) equals two smaller applications up to
      // per-application rounding, so banking is the same growth, later.
      /** BdApi.Data key for the persisted pending-growth map (user-scoped). */
      _pendingGrowthDataKey() {
        return this.userId ? `pendingGrowthHours_${this.userId}` : "pendingGrowthHours";
      },
      /** Restore banked growth hours at startup (persisted once, on stop()). */
      _restorePendingGrowth() {
        this._pendingGrowthHours = {};
        try {
          const stored = BdApi.Data.load("ShadowArmy", this._pendingGrowthDataKey());
          if (stored && typeof stored === "object") {
            for (const [sid, hours] of Object.entries(stored)) {
              const h = Number(hours);
              if (h > 0 && sid) this._pendingGrowthHours[sid] = h;
            }
          }
        } catch (error) {
          this.debugError("GROWTH", "Failed to restore pending growth hours", error);
        }
      },
      /**
       * Persist banked hours. Called from stop() only — the map can hold one
       * entry per deployed shadow (hundreds of thousands), so per-completion
       * persistence would reintroduce a multi-MB serialize on the very path this
       * accumulator exists to unburden. A hard crash loses only in-flight banked
       * hours (bounded, passive system) — same tradeoff as pendingSharedXp.
       */
      _persistPendingGrowth() {
        try {
          BdApi.Data.save("ShadowArmy", this._pendingGrowthDataKey(), this._pendingGrowthHours || {});
        } catch (error) {
          this.debugError("GROWTH", "Failed to persist pending growth hours", error);
        }
      },
      /** Bank combat hours per shadow id ({ id: hours }). Returns true if anything banked. */
      /**
       * A bankable key must look like a real shadow id: `shadow_<ts>_<suffix>`.
       * Anything else can never match a stored record, so banking it wedges the
       * drain queue forever (see the incident note on drainPendingGrowth).
       * Deliberately lenient on suffix length — observed ids run 8-9 chars.
       */
      _isBankableShadowId(key) {
        return typeof key === "string" && /^shadow_\d{10,}_[A-Za-z0-9]+$/.test(key);
      },
      bankPendingGrowth(hoursByShadowId) {
        var _a;
        if (!hoursByShadowId || typeof hoursByShadowId !== "object") return false;
        const pending = this._pendingGrowthHours || (this._pendingGrowthHours = {});
        let banked = 0;
        let rejected = 0;
        let firstRejected = null;
        for (const [sid, hours] of Object.entries(hoursByShadowId)) {
          const h = Number(hours);
          if (!(h > 0)) continue;
          const key = String(sid).trim();
          if (!key) continue;
          if (!this._isBankableShadowId(key)) {
            rejected++;
            if (!firstRejected) firstRejected = key;
            continue;
          }
          pending[key] = (pending[key] || 0) + h;
          banked++;
        }
        if (rejected > 0) {
          (_a = this.debugError) == null ? void 0 : _a.call(this, "GROWTH", `bankPendingGrowth rejected ${rejected} malformed shadow id(s)`, {
            firstRejected,
            rejected
          });
        }
        return banked > 0;
      },
      /**
       * Apply banked growth for up to maxShadows ids. Runs on a 30s interval
       * (index.js), hidden-gated like autoPromoteGrades — the backlog just
       * accumulates hours until the next visible tick. Ids whose record no
       * longer exists (extracted/deleted) are consumed, not retried.
       */
      async drainPendingGrowth(maxShadows = 500) {
        var _a, _b, _c, _d, _e;
        if (this._pendingGrowthDrainInFlight) return 0;
        const pending = this._pendingGrowthHours;
        if (!pending || !((_a = this.storageManager) == null ? void 0 : _a.transformShadowsBatch)) return 0;
        let purged = 0;
        for (const key of Object.keys(pending)) {
          if (!this._isBankableShadowId(key)) {
            delete pending[key];
            purged++;
          }
        }
        if (purged > 0) {
          (_b = this.debugLog) == null ? void 0 : _b.call(this, "GROWTH", `Purged ${purged} unresolvable id(s) from the growth queue`);
          (_c = this._persistPendingGrowth) == null ? void 0 : _c.call(this);
        }
        const ids = Object.keys(pending).slice(0, Math.max(1, maxShadows));
        if (ids.length === 0) return 0;
        const hoursSnapshot = {};
        for (const id of ids) {
          const h = Number(pending[id]);
          if (h > 0) hoursSnapshot[id] = h;
        }
        this._pendingGrowthDrainInFlight = true;
        let applied = 0;
        let netPowerDelta = 0;
        try {
          this._batchXpInProgress = true;
          try {
            const CHUNK = 250;
            for (let i = 0; i < ids.length; i += CHUNK) {
              const chunk = ids.slice(i, i + CHUNK);
              const { failedIds } = await this.storageManager.transformShadowsBatch(
                chunk,
                (freshRecord) => {
                  var _a2, _b2;
                  const shadow = this.getShadowData(freshRecord);
                  if (!shadow) return null;
                  const sid = String(shadow.id || shadow.i || "");
                  const hours = hoursSnapshot[sid];
                  if (!(hours > 0)) return null;
                  const prevPower = ((_a2 = this._getShadowPowerValue) == null ? void 0 : _a2.call(this, shadow)) ?? (Number(shadow.strength) || 0);
                  if (!this.applyNaturalGrowth(shadow, hours)) return null;
                  this.attemptAutoRankUp(shadow);
                  const newPower = ((_b2 = this._getShadowPowerValue) == null ? void 0 : _b2.call(this, shadow)) ?? (Number(shadow.strength) || 0);
                  netPowerDelta += newPower - prevPower;
                  this.invalidateShadowPowerCache(shadow);
                  applied++;
                  return this.prepareShadowForSave(shadow) ?? null;
                },
                { chunkSize: chunk.length }
              );
              const failedSet = new Set((failedIds || []).map((id) => String(id)));
              for (const id of chunk) {
                if (failedSet.has(String(id))) continue;
                const remaining = (Number(pending[id]) || 0) - (hoursSnapshot[id] || 0);
                if (remaining > 1e-4) pending[id] = remaining;
                else delete pending[id];
              }
              if (i + CHUNK < ids.length) await new Promise((r) => setTimeout(r, 0));
            }
          } finally {
            this._batchXpInProgress = false;
          }
          if (applied > 0) {
            (_d = this._invalidateSnapshot) == null ? void 0 : _d.call(this);
            this._armyWriteGen = (this._armyWriteGen || 0) + 1;
            if (netPowerDelta !== 0 && typeof this._applyTotalPowerDelta === "function") {
              await this._applyTotalPowerDelta(
                { strength: Math.abs(netPowerDelta) },
                netPowerDelta > 0 ? "increment" : "decrement"
              );
            }
          }
          return applied;
        } catch (error) {
          this.debugError("GROWTH", "Pending-growth drain failed", error);
          return applied;
        } finally {
          this._pendingGrowthDrainInFlight = false;
          try {
            (_e = this._persistPendingGrowth) == null ? void 0 : _e.call(this);
          } catch (_) {
          }
        }
      },
      async grantShadowXP(baseAmount, reason = "message", shadowIds = null, options = {}) {
        var _a, _b;
        const perShadowAmounts = options && typeof options === "object" && options.perShadowAmounts && typeof options.perShadowAmounts === "object" ? options.perShadowAmounts : null;
        const skipPowerRecalc = Boolean(options == null ? void 0 : options.skipPowerRecalc);
        const targetFetchChunkSize = Math.max(25, Math.floor(Number(options == null ? void 0 : options.fetchChunkSize) || 300));
        if (baseAmount <= 0 && !perShadowAmounts) return { updatedShadows: [] };
        if ((!Array.isArray(shadowIds) || shadowIds.length === 0) && !perShadowAmounts) {
          this.debugLog(
            "SHADOW_XP",
            `grantShadowXP called with no target ids (amount=${baseAmount}, reason=${reason}) \u2014 ignored; army-wide XP is derived now`
          );
          return { updatedShadows: [] };
        }
        let hasPersistedUpdates = false;
        const allUpdatedShadows = [];
        const targetShadowIds = Array.isArray(shadowIds) && shadowIds.length > 0 ? shadowIds : perShadowAmounts ? Object.keys(perShadowAmounts) : null;
        const MAX_LEVEL = 9999;
        const perShadow = baseAmount;
        const processXpBatch = async (ids) => {
          var _a2;
          if (!Array.isArray(ids) || ids.length === 0) return 0;
          if (!((_a2 = this.storageManager) == null ? void 0 : _a2.transformShadowsBatch)) {
            this.debugError("STORAGE", "grantShadowXP: transformShadowsBatch unavailable \u2014 skipping batch", null);
            return 0;
          }
          const chunkUpdated = [];
          const { completed, failedIds } = await this.storageManager.transformShadowsBatch(
            ids,
            (freshRecord) => {
              const shadow = this.getShadowData(freshRecord);
              if (!shadow) return null;
              const shadowId = shadow.id || shadow.i;
              const xpOverride = perShadowAmounts && shadowId != null ? Number(perShadowAmounts[String(shadowId)]) || 0 : null;
              const xpGrant = xpOverride != null ? xpOverride : perShadow;
              if (!(xpGrant > 0)) return null;
              shadow.xp = (shadow.xp || 0) + xpGrant;
              let level = shadow.level || 1;
              const shadowRank = shadow.rank || "E";
              let leveledUp = false;
              while (shadow.xp >= this.getShadowXpForNextLevel(level, shadowRank) && level < MAX_LEVEL) {
                shadow.xp -= this.getShadowXpForNextLevel(level, shadowRank);
                level += 1;
                shadow.level = level;
                this.applyShadowLevelUpStats(shadow);
                leveledUp = true;
                const effectiveStats = this.getShadowEffectiveStats(shadow);
                shadow.strength = this.calculateShadowStrength(effectiveStats, 1);
              }
              if (leveledUp) {
                const rankUpResult = this.attemptAutoRankUp(shadow);
                if (rankUpResult.success) {
                  this.debugLog(
                    "RANK_UP",
                    `AUTO RANK-UP: ${shadow.roleName || shadow.role || shadow.name || "Shadow"} promoted ${rankUpResult.oldRank} -> ${rankUpResult.newRank}!`
                  );
                }
              }
              this.invalidateShadowPowerCache(shadow);
              const toSave = this.prepareShadowForSave(shadow);
              if (toSave) chunkUpdated.push(toSave);
              return toSave;
            },
            { chunkSize: ids.length }
          );
          if (failedIds.length > 0) {
            this.debugError("STORAGE", `Failed to batch-save shadow XP updates to IndexedDB (${failedIds.length} ids)`, { failedIds });
            const failedSet = new Set(failedIds.map((id) => String(id)));
            for (const s of chunkUpdated) {
              const sid = String(s.id || s.i || "");
              if (!failedSet.has(sid)) allUpdatedShadows.push(s);
            }
          } else {
            for (const s of chunkUpdated) allUpdatedShadows.push(s);
          }
          if (completed > 0) hasPersistedUpdates = true;
          return completed;
        };
        this._batchXpInProgress = true;
        try {
          if (targetShadowIds && targetShadowIds.length > 0 && ((_a = this.storageManager) == null ? void 0 : _a.getShadowsByIds)) {
            const uniqueTargetIds = Array.from(
              new Set(
                targetShadowIds.map((id) => id === null || id === void 0 ? "" : String(id).trim()).filter(Boolean)
              )
            );
            if (uniqueTargetIds.length === 0) return { updatedShadows: [] };
            for (let i = 0; i < uniqueTargetIds.length; i += targetFetchChunkSize) {
              const idChunk = uniqueTargetIds.slice(i, i + targetFetchChunkSize);
              await processXpBatch(idChunk);
              if (i + targetFetchChunkSize < uniqueTargetIds.length) {
                await new Promise((r) => setTimeout(r, 0));
              }
            }
          } else {
            let allIds = [];
            try {
              const allShadowsRaw = await ((_b = this.storageManager) == null ? void 0 : _b.getAllShadowsRaw());
              allIds = (allShadowsRaw || []).map((s) => {
                var _a2;
                return (_a2 = this.storageManager) == null ? void 0 : _a2.getCacheKey(s);
              }).filter(Boolean);
            } catch (error) {
              this.debugError("STORAGE", "Failed to enumerate shadow ids for XP grant", error);
              return { updatedShadows: [] };
            }
            if (targetShadowIds && targetShadowIds.length > 0) {
              if (!this._getShadowsByIdsFallbackWarned) {
                this._getShadowsByIdsFallbackWarned = true;
                this.debugError("XP_PERF", "grantShadowXP: getShadowsByIds unavailable, falling back to full IDB scan \u2014 check storageManager wiring", null);
              }
              const targetIds = new Set(targetShadowIds.map((id) => String(id)));
              allIds = allIds.filter((id) => targetIds.has(String(id)));
            }
            if (!allIds.length) return { updatedShadows: [] };
            for (let i = 0; i < allIds.length; i += targetFetchChunkSize) {
              const idChunk = allIds.slice(i, i + targetFetchChunkSize);
              await processXpBatch(idChunk);
              if (i + targetFetchChunkSize < allIds.length) {
                await new Promise((r) => setTimeout(r, 0));
              }
            }
          }
        } finally {
          this._batchXpInProgress = false;
        }
        if (!hasPersistedUpdates) return { updatedShadows: [] };
        this._invalidateSnapshot();
        this.settings.cachedTotalPowerShadowCount = 0;
        this.clearShadowPowerCache();
        this._armyWriteGen = (this._armyWriteGen || 0) + 1;
        if (!skipPowerRecalc) {
          this.getTotalShadowPower(true).catch((error) => {
            this.debugError("POWER_CALC", "Failed to refresh total shadow power after XP grant", error);
          });
        }
        this.saveSettings();
        return { updatedShadows: allUpdatedShadows };
      },
      getShadowXpForNextLevel(level, shadowRank = "E") {
        if (level < 1) return 25;
        const baseXP = 25 + level * level * 5;
        const rankMultiplier = this.rankStatMultipliers[shadowRank] || 1;
        const rankXPModifier = 1 + (rankMultiplier - 1) * 0.3;
        return Math.round(baseXP * rankXPModifier);
      },
      _applyRankPromotionProgressCarry(shadow, oldRank, newRank) {
        if (!shadow) return;
        const currentLevel = Math.max(1, Math.floor(Number(shadow.level) || 1));
        const currentXp = Math.max(0, Number(shadow.xp) || 0);
        const oldReq = Math.max(1, this.getShadowXpForNextLevel(currentLevel, oldRank));
        const newReq = Math.max(1, this.getShadowXpForNextLevel(currentLevel, newRank));
        const progress = Math.max(0, Math.min(0.99, currentXp / oldReq));
        const carriedXp = Math.floor(newReq * progress);
        shadow.level = currentLevel;
        shadow.xp = Math.max(0, Math.min(newReq - 1, carriedXp));
      },
      getShadowEffectiveStats(shadow, options = null) {
        var _a, _b, _c, _d, _e, _f;
        const intrinsicOnly = (options == null ? void 0 : options.intrinsic) === true;
        if (!shadow) return this.createZeroStatBlock();
        if (shadow._c === 1 || shadow._c === 2) {
          shadow = this.getShadowData(shadow);
        }
        if (!shadow) return ((_a = this.createZeroStatBlock) == null ? void 0 : _a.call(this)) || { strength: 0, agility: 0, intelligence: 0, vitality: 0, perception: 0 };
        const base = shadow.baseStats || {};
        const growth = shadow.growthStats || {};
        const naturalGrowth = shadow.naturalGrowthStats || {};
        const statKeys = C2.STAT_KEYS;
        const effective = statKeys.reduce((stats, stat) => {
          stats[stat] = (base[stat] || 0) + (growth[stat] || 0) + (naturalGrowth[stat] || 0);
          return stats;
        }, {});
        const totalStats = statKeys.reduce((sum, stat) => sum + (effective[stat] || 0), 0);
        if (totalStats === 0 && shadow.level) {
          const shadowLevel = shadow.level || 1;
          const rankMultiplier = this.rankStatMultipliers[shadow.rank] || 1;
          const minStatValue = Math.max(1, Math.floor(shadowLevel * 5 * rankMultiplier));
          statKeys.forEach((stat) => {
            effective[stat] = minStatValue;
          });
          this.debugLog("STATS", "Shadow had 0 stats, applied fallback minimum stats", {
            shadowId: shadow.id,
            level: shadowLevel,
            rank: shadow.rank,
            minStatValue
          });
        }
        const grade = shadow.grade || "Common";
        const gradeMultipliers = ((_c = (_b = this.settings) == null ? void 0 : _b.shadowEssence) == null ? void 0 : _c.gradeStatMultiplier) || ((_e = (_d = this.defaultSettings) == null ? void 0 : _d.shadowEssence) == null ? void 0 : _e.gradeStatMultiplier);
        const gradeMult = (gradeMultipliers == null ? void 0 : gradeMultipliers[grade]) || 1;
        if (gradeMult !== 1) {
          statKeys.forEach((stat) => {
            effective[stat] = Math.floor(effective[stat] * gradeMult);
          });
        }
        const vetMultiplier = this._getVeterancyMultiplier(shadow);
        let monarchScaled = false;
        const soloData = intrinsicOnly ? null : (_f = this.getSoloLevelingData) == null ? void 0 : _f.call(this);
        if ((soloData == null ? void 0 : soloData.rank) === "Shadow Monarch") {
          const playerStats = soloData.stats || {};
          const factor = SHADOW_SCALE_FACTOR_BY_RANK[shadow.rank] ?? 0.5;
          const vetFactor = vetMultiplier > 1 ? 1 - (1 - factor) / vetMultiplier : factor;
          statKeys.forEach((stat) => {
            effective[stat] = Math.floor((Number(playerStats[stat]) || 0) * vetFactor);
          });
          monarchScaled = true;
        }
        if (shadow.customName) {
          statKeys.forEach((stat) => {
            effective[stat] = Math.floor(effective[stat] * 1.05);
          });
        }
        if (!monarchScaled && vetMultiplier > 1) {
          statKeys.forEach((stat) => {
            effective[stat] = Math.floor(effective[stat] * vetMultiplier);
          });
        }
        return effective;
      },
      /**
       * Veterancy multiplier from time since extraction. Pure function of the
       * clock — nothing is written, ever.
       *
       * This replaces the XP grant path, which cost ~29s of CPU and ~562k IDB
       * callbacks per flush because it decompressed, mutated and recompressed all
       * 281k shadows to add a number. Age already sits on every record
       * (`extractedAt`, indexed, survives both compression levels), so the same
       * "shadows get stronger over time" behaviour comes free at read time.
       *
       * sqrt curve: growth is real but decelerating, so an old shadow stays ahead
       * without a new one being hopeless. Linear would make a 1-year shadow 365x a
       * 1-day shadow. At the default rate (0.02):
       *     1 day ~ +2%   |  100 days ~ +20%  |  400 days ~ +40%  |  4 years ~ +78%
       *
       * Veterans keep their edge permanently (age only grows), and newer shadows
       * accrue at the same rate from their own extraction date, so there is no
       * permanent caste split between shadows raised before and after this change.
       */
      _getVeterancyMultiplier(shadow) {
        var _a;
        const extractedAt = Number(shadow == null ? void 0 : shadow.extractedAt) || 0;
        if (!extractedAt) return 1;
        const ageMs = Date.now() - extractedAt;
        if (!(ageMs > 0)) return 1;
        const rate = Number(((_a = this.settings) == null ? void 0 : _a.veterancyRate) ?? C2.VETERANCY_RATE);
        if (!Number.isFinite(rate) || rate <= 0) return 1;
        return 1 + rate * Math.sqrt(ageMs / 864e5);
      },
      getRoleRankUpThresholdFactor(roleKey) {
        var _a, _b;
        const stats = C2.STAT_KEYS;
        const roleWeights = ((_a = this.shadowRoleStatWeights) == null ? void 0 : _a[roleKey]) || ((_b = this.shadowRoleStatWeights) == null ? void 0 : _b.knight);
        if (!roleWeights) return 1;
        if (!Number.isFinite(this._avgRoleWeightSum) || this._avgRoleWeightSum <= 0) {
          const allRoleWeights = Object.values(this.shadowRoleStatWeights || {});
          const sums = allRoleWeights.map((weights) => stats.reduce((sum, stat) => sum + (Number(weights == null ? void 0 : weights[stat]) || 0), 0)).filter((sum) => Number.isFinite(sum) && sum > 0);
          this._avgRoleWeightSum = sums.length > 0 ? sums.reduce((sum, v) => sum + v, 0) / sums.length : 1;
        }
        const roleSum = stats.reduce((sum, stat) => sum + (Number(roleWeights == null ? void 0 : roleWeights[stat]) || 0), 0);
        if (!Number.isFinite(roleSum) || roleSum <= 0) return 1;
        const rawFactor = roleSum / this._avgRoleWeightSum;
        const softened = 1 + (rawFactor - 1) * 0.5;
        return Math.max(0.8, Math.min(1.2, softened));
      },
      // AUTO RANK-UP SYSTEM
      /**
       * Can this shadow rank up on STATS alone? (essence is charged by the caller)
       *
       * Extracted 2026-07-30 so the essence pre-check in autoPromoteGrades and the
       * promotion itself run the identical gate. Two copies of this test would
       * drift, and the failure mode is silent: essence charged for a promotion the
       * transform then declines, i.e. the player pays for nothing.
       *
       * The old LEVEL gate is gone. Levels still advance for shadows that earn
       * TARGETED xp (Dungeons combat, extraction), but the army-wide broadcast that
       * levelled everyone else is derived now, so the vast majority of shadows will
       * never gain another level. A level requirement would therefore be
       * permanently unsatisfiable for them and would freeze the rank ladder for the
       * whole army except the handful that happen to see combat. Stats carry the
       * gate instead, and they keep growing for everyone: veterancy
       * (_getVeterancyMultiplier) raises effective stats with age.
       *
       * @returns {{eligible: boolean, nextRank?: string, reason?: string}}
       */
      getRankUpEligibility(shadow) {
        if (!shadow || !shadow.rank) return { eligible: false, reason: "no_shadow" };
        const currentRankIndex = this.shadowRanks.indexOf(shadow.rank);
        const nextRank = this.shadowRanks[currentRankIndex + 1];
        if (!nextRank) return { eligible: false, reason: "max_rank" };
        if (nextRank === "Shadow Monarch") return { eligible: false, reason: "monarch_locked" };
        const effectiveStats = this.getShadowEffectiveStats(shadow, { intrinsic: true });
        const nextRankMultiplier = this.rankStatMultipliers[nextRank] || 1;
        const baselineForNextRank = this.getRankBaselineStats(nextRank, nextRankMultiplier);
        const statKeys = C2.STAT_KEYS;
        const totalBaseline = statKeys.reduce((sum, stat) => sum + (baselineForNextRank[stat] || 0), 0);
        const totalEffective = statKeys.reduce((sum, stat) => sum + (effectiveStats[stat] || 0), 0);
        const roleThresholdFactor = this.getRoleRankUpThresholdFactor(shadow.role);
        const requiredTotal = totalBaseline * 0.8 * roleThresholdFactor;
        if (totalEffective < requiredTotal) {
          return { eligible: false, reason: "stats_gate", nextRank };
        }
        return { eligible: true, nextRank };
      },
      attemptAutoRankUp(shadow) {
        var _a, _b, _c, _d;
        const gate = this.getRankUpEligibility(shadow);
        if (!gate.eligible) return { success: false, reason: gate.reason };
        const nextRank = gate.nextRank;
        const currentRank = shadow.rank;
        const oldLevel = Math.max(1, Math.floor(Number(shadow.level) || 1));
        const oldXp = Math.max(0, Number(shadow.xp) || 0);
        const prevPower = ((_a = this._getShadowPowerValue) == null ? void 0 : _a.call(this, shadow)) ?? (Number(shadow.strength) || 0);
        shadow.rank = nextRank;
        this._applyRankPromotionProgressCarry(shadow, currentRank, nextRank);
        const newEffectiveStats = this.getShadowEffectiveStats(shadow);
        shadow.strength = this.calculateShadowStrength(newEffectiveStats, 1);
        this.invalidateShadowPowerCache(shadow);
        this.clearShadowPowerCache();
        this._armyWriteGen = (this._armyWriteGen || 0) + 1;
        if (!this._batchXpInProgress) {
          const newPower = ((_b = this._getShadowPowerValue) == null ? void 0 : _b.call(this, shadow)) ?? (Number(shadow.strength) || 0);
          const powerDelta = newPower - prevPower;
          if (powerDelta !== 0 && typeof this._applyTotalPowerDelta === "function") {
            (_d = (_c = this._applyTotalPowerDelta({ strength: Math.abs(powerDelta) }, powerDelta > 0 ? "increment" : "decrement")).catch) == null ? void 0 : _d.call(_c, (error) => {
              this.debugError("POWER_CALC", "Failed to apply rank-up power delta", error);
            });
          }
        }
        return {
          success: true,
          oldRank: currentRank,
          newRank: nextRank,
          oldLevel,
          newLevel: shadow.level || oldLevel,
          oldXp,
          newXp: shadow.xp || 0
        };
      },
      // NATURAL GROWTH SYSTEM
      applyNaturalGrowth(shadow, combatTimeHours = 0) {
        if (!shadow) return false;
        const shadowRank = shadow.rank || "E";
        const roleKey = shadow.role || "knight";
        const rankMultiplier = this.rankStatMultipliers[shadowRank] || 1;
        const roleWeights = this.shadowRoleStatWeights[roleKey] || this.shadowRoleStatWeights.knight;
        if (!shadow.naturalGrowthStats) {
          shadow.naturalGrowthStats = { strength: 0, agility: 0, intelligence: 0, vitality: 0, perception: 0 };
        }
        if (!shadow.totalCombatTime) shadow.totalCombatTime = 0;
        if (!shadow.lastNaturalGrowth) shadow.lastNaturalGrowth = Date.now();
        if (!shadow.growthVarianceSeed) shadow.growthVarianceSeed = Math.random();
        const bonuses = typeof this._getSkillTreeBonuses === "function" ? this._getSkillTreeBonuses() : null;
        const growthMult = bonuses && bonuses.shadowGrowthMultiplier > 1 ? bonuses.shadowGrowthMultiplier : 1;
        const baseGrowthPerHour = rankMultiplier * 10 * growthMult;
        if (combatTimeHours <= 0) return false;
        const stats = C2.STAT_KEYS;
        const individualVariance = 0.8 + shadow.growthVarianceSeed * 0.4;
        stats.reduce((naturalGrowth, stat) => {
          const roleWeight = roleWeights[stat] || 1;
          const statGrowth = baseGrowthPerHour * combatTimeHours * roleWeight * individualVariance;
          const roundedGrowth = Math.max(0, Math.round(statGrowth));
          naturalGrowth[stat] = (naturalGrowth[stat] || 0) + roundedGrowth;
          return naturalGrowth;
        }, shadow.naturalGrowthStats);
        shadow.totalCombatTime += combatTimeHours;
        shadow.lastNaturalGrowth = Date.now();
        const effectiveStats = this.getShadowEffectiveStats(shadow);
        shadow.strength = this.calculateShadowStrength(effectiveStats, 1);
        if (growthMult > 1) {
          const monarchStrength = this._getMonarchStrength();
          if (monarchStrength > 0 && shadow.strength > monarchStrength) {
            shadow.strength = monarchStrength;
          }
        }
        return true;
      },
      applyShadowLevelUpStats(shadow) {
        const roleKey = shadow.role;
        const roleWeights = this.shadowRoleStatWeights[roleKey] || this.shadowRoleStatWeights.knight;
        const shadowRank = shadow.rank || "E";
        const rankMultiplier = this.rankStatMultipliers[shadowRank] || 1;
        const rankGrowthMultiplier = 1 + (rankMultiplier - 1) * 0.15;
        if (!shadow.growthStats) {
          shadow.growthStats = { strength: 0, agility: 0, intelligence: 0, vitality: 0, perception: 0 };
        }
        if (!shadow.growthVarianceSeed) {
          shadow.growthVarianceSeed = Math.random();
        }
        const bonuses = typeof this._getSkillTreeBonuses === "function" ? this._getSkillTreeBonuses() : null;
        const growthMult = bonuses && bonuses.shadowGrowthMultiplier > 1 ? bonuses.shadowGrowthMultiplier : 1;
        const stats = C2.STAT_KEYS;
        const baseGrowthMap = [
          [(w) => w >= 1.5, 5],
          [(w) => w >= 1.2, 4],
          [(w) => w >= 0.8, 3],
          [(w) => w >= 0.5, 2],
          [(w) => w >= 0.3, 1],
          [() => true, 0.5]
        ];
        const getBaseGrowth = (roleWeight) => {
          const [, growth] = baseGrowthMap.find(([predicate]) => predicate(roleWeight));
          return growth;
        };
        const seedVariance = 0.8 + shadow.growthVarianceSeed * 0.4;
        stats.reduce((growthStats, stat) => {
          const roleWeight = roleWeights[stat] || 1;
          const baseGrowth = getBaseGrowth(roleWeight);
          const levelVariance = 0.9 + Math.random() * 0.2;
          const growth = baseGrowth * rankGrowthMultiplier * seedVariance * levelVariance * growthMult;
          const roundedGrowth = Math.max(0, Math.round(growth));
          growthStats[stat] = (growthStats[stat] || 0) + roundedGrowth;
          return growthStats;
        }, shadow.growthStats);
        if (growthMult > 1) {
          const effectiveStats = this.getShadowEffectiveStats(shadow);
          const currentStrength = this.calculateShadowStrength(effectiveStats, 1);
          const monarchStrength = typeof this._getMonarchStrength === "function" ? this._getMonarchStrength() : 0;
          if (monarchStrength > 0 && currentStrength > monarchStrength) {
            shadow.strength = monarchStrength;
          }
        }
      }
    };
  }
});

// src/ShadowArmy/migrations.js
var require_migrations = __commonJS({
  "src/ShadowArmy/migrations.js"(exports2, module2) {
    var C2 = require_constants();
    module2.exports = {
      // DATA MIGRATIONS
      async _loadShadowsForMigration() {
        let allShadows = [];
        if (this.storageManager) {
          try {
            allShadows = await this.storageManager.getAllShadowsRaw();
          } catch (error) {
            this.debugError("MIGRATION", "Error getting shadows from IndexedDB", error);
          }
        }
        if (this.settings.shadows && this.settings.shadows.length > 0) {
          const dbShadowIds = new Set(
            allShadows.map((shadow) => (shadow == null ? void 0 : shadow.id) || (shadow == null ? void 0 : shadow.i) || null).filter(Boolean)
          );
          const localStorageShadows = this.settings.shadows.filter((shadow) => {
            const shadowId = (shadow == null ? void 0 : shadow.id) || (shadow == null ? void 0 : shadow.i) || null;
            return shadowId && !dbShadowIds.has(shadowId);
          });
          allShadows = allShadows.concat(localStorageShadows);
        }
        return allShadows;
      },
      async fixShadowBaseStatsToRankBaselines() {
        try {
          const migrationKey = "shadowArmy_baseStats_v4";
          if (BdApi.Data.load("ShadowArmy", migrationKey)) return;
          this.debugLog("MIGRATION", "Fixing shadow base stats to match rank baselines...");
          const allShadows = await this._loadShadowsForMigration();
          this.debugLog("MIGRATION", `Found ${allShadows.length} shadows to fix`);
          if (allShadows.length === 0) {
            this.debugLog("MIGRATION", "No shadows to fix");
            BdApi.Data.save("ShadowArmy", migrationKey, true);
            return;
          }
          let fixed = 0;
          const batchSize = 50;
          for (let i = 0; i < allShadows.length; i += batchSize) {
            if (this._isStopped) {
              this.debugLog("MIGRATION", "Base stats migration aborted (plugin stopped)");
              return;
            }
            const batch = allShadows.slice(i, i + batchSize);
            for (const shadow of batch) {
              if (this._isStopped) {
                this.debugLog("MIGRATION", "Base stats migration aborted (plugin stopped)");
                return;
              }
              try {
                const shadowRank = shadow.rank || "E";
                const rankMultiplier = this.rankStatMultipliers[shadowRank] || 1;
                const roleKey = shadow.role || "knight";
                const role = this.shadowRoles[roleKey];
                if (!role) continue;
                const rankBaseline = this.getRankBaselineStats(shadowRank, rankMultiplier);
                const roleWeights = this.shadowRoleStatWeights[roleKey] || this.shadowRoleStatWeights.knight;
                const statKeys = C2.STAT_KEYS;
                const newBaseStats = statKeys.reduce((stats, stat) => {
                  const roleWeight = roleWeights[stat] || 1;
                  const variance = 0.9 + Math.random() * 0.2;
                  stats[stat] = Math.max(1, Math.round(rankBaseline[stat] * roleWeight * variance));
                  return stats;
                }, {});
                const existingGrowthStats = shadow.growthStats || { strength: 0, agility: 0, intelligence: 0, vitality: 0, perception: 0 };
                const existingNaturalGrowthStats = shadow.naturalGrowthStats || { strength: 0, agility: 0, intelligence: 0, vitality: 0, perception: 0 };
                shadow.baseStats = newBaseStats;
                shadow.growthStats = existingGrowthStats;
                shadow.naturalGrowthStats = existingNaturalGrowthStats;
                shadow.level = shadow.level || 1;
                shadow.xp = shadow.xp || 0;
                shadow.totalCombatTime = shadow.totalCombatTime || 0;
                shadow.lastNaturalGrowth = shadow.lastNaturalGrowth || Date.now();
                const effectiveStats = this.getShadowEffectiveStats(shadow);
                shadow.strength = this.calculateShadowStrength(effectiveStats, 1);
                if (this.storageManager) {
                  await this.storageManager.saveShadow(this.prepareShadowForSave(shadow));
                }
                const localIndex = (this.settings.shadows || []).findIndex((s) => s.id === shadow.id);
                if (localIndex !== -1) {
                  this.settings.shadows[localIndex] = shadow;
                }
                fixed++;
              } catch (error) {
                this.debugError("MIGRATION", `Error fixing shadow ${shadow.id}`, error);
              }
            }
            if (allShadows.length > 100) {
              this.debugLog("MIGRATION", `Fixed ${Math.min(i + batchSize, allShadows.length)}/${allShadows.length} shadows...`);
            }
          }
          BdApi.Data.save("ShadowArmy", "settings", this.settings);
          BdApi.Data.save("ShadowArmy", migrationKey, true);
          this.debugLog("MIGRATION", `Fixed ${fixed} shadows to proper rank baselines!`);
          this.debugLog("MIGRATION", "SSS shadows now have SSS-level base stats!");
          this.cachedBuffs = null;
          this.cachedBuffsTime = null;
        } catch (error) {
          this.debugError("MIGRATION", "Error in fixShadowBaseStatsToRankBaselines", error);
          throw error;
        }
      },
      async runDataMigrations() {
        var _a, _b;
        const MIGRATIONS = [
          { version: 3, key: "shadowArmy_recalculated_v3", run: () => this.recalculateAllShadows() },
          { version: 4, key: "shadowArmy_baseStats_v4", run: () => this.fixShadowBaseStatsToRankBaselines() },
          { version: 5, key: "shadowArmy_backfill_v5", run: () => this.backfillMissingFields() },
          { version: 6, key: "shadowArmy_selfHeal_v6", run: () => this.selfHealShadowStats() }
        ];
        for (const migration of MIGRATIONS) {
          if (BdApi.Data.load("ShadowArmy", migration.key)) continue;
          try {
            this.debugLog("MIGRATION", `Running migration v${migration.version}: ${migration.key}`);
            await migration.run();
            BdApi.Data.save("ShadowArmy", migration.key, { completedAt: (/* @__PURE__ */ new Date()).toISOString() });
            this.debugLog("MIGRATION", `Migration v${migration.version} complete`);
          } catch (error) {
            this.debugError("MIGRATION", `Migration v${migration.version} failed: ${migration.key}`, error);
            const toastKey = `_migrationToastShown_v${migration.version}`;
            if (!this[toastKey]) {
              this[toastKey] = true;
              try {
                (_b = (_a = BdApi.UI) == null ? void 0 : _a.showToast) == null ? void 0 : _b.call(
                  _a,
                  `ShadowArmy: migration v${migration.version} failed \u2014 see console for details. Will retry next load.`,
                  { type: "error", timeout: 1e4 }
                );
              } catch (_) {
              }
            }
          }
        }
      },
      async backfillMissingFields() {
        var _a, _b;
        if (!this.storageManager) return;
        const allShadows = await this._loadShadowsForMigration();
        if (allShadows.length === 0) return;
        const zeroStats = { strength: 0, agility: 0, intelligence: 0, vitality: 0, perception: 0 };
        let updated = 0;
        for (const shadow of allShadows) {
          if (shadow._c) continue;
          let dirty = false;
          if (!shadow.growthVarianceSeed || shadow.growthVarianceSeed === 0) {
            shadow.growthVarianceSeed = Math.random();
            dirty = true;
          }
          if (!shadow.naturalGrowthStats || typeof shadow.naturalGrowthStats !== "object") {
            shadow.naturalGrowthStats = { ...zeroStats };
            dirty = true;
          }
          if (!shadow.growthStats || typeof shadow.growthStats !== "object") {
            shadow.growthStats = { ...zeroStats };
            dirty = true;
          }
          if (shadow.totalCombatTime === void 0 || shadow.totalCombatTime === null) {
            shadow.totalCombatTime = 0;
            dirty = true;
          }
          if (!shadow.lastNaturalGrowth) {
            shadow.lastNaturalGrowth = shadow.extractedAt || Date.now();
            dirty = true;
          }
          if (!shadow.role) {
            shadow.role = "knight";
            dirty = true;
          }
          if (!shadow.level || shadow.level < 1) {
            shadow.level = 1;
            dirty = true;
          }
          if (shadow.xp === void 0 || shadow.xp === null) {
            shadow.xp = 0;
            dirty = true;
          }
          if ((!shadow.strength || shadow.strength === 0) && shadow.baseStats) {
            const effective = (_a = this.getShadowEffectiveStats) == null ? void 0 : _a.call(this, shadow);
            if (effective) {
              shadow.strength = ((_b = this.calculateShadowStrength) == null ? void 0 : _b.call(this, effective, 1)) || 0;
              dirty = true;
            }
          }
          if (dirty) {
            try {
              await this.storageManager.saveShadow(shadow);
              updated++;
            } catch (error) {
              this.debugError("MIGRATION", `Failed to backfill shadow ${shadow.id}`, error);
            }
          }
        }
        this.debugLog("MIGRATION", `v5 backfill complete`, {
          total: allShadows.length,
          updated,
          skippedCompressed: allShadows.filter((s) => s._c).length
        });
      },
      async recalculateAllShadows() {
        try {
          const migrationKey = "shadowArmy_recalculated_v3";
          if (BdApi.Data.load("ShadowArmy", migrationKey)) return;
          this.debugLog("MIGRATION", "Recalculating all shadows with user stat capping formula...");
          const allShadows = await this._loadShadowsForMigration();
          this.debugLog("MIGRATION", `Found ${allShadows.length} shadows in migration scan`);
          if (allShadows.length === 0) {
            this.debugLog("MIGRATION", "No shadows to recalculate");
            BdApi.Data.save("ShadowArmy", migrationKey, true);
            return;
          }
          let recalculated = 0;
          const batchSize = 50;
          for (let i = 0; i < allShadows.length; i += batchSize) {
            if (this._isStopped) {
              this.debugLog("MIGRATION", "Recalculate migration aborted (plugin stopped)");
              return;
            }
            const batch = allShadows.slice(i, i + batchSize);
            for (const shadow of batch) {
              if (this._isStopped) {
                this.debugLog("MIGRATION", "Recalculate migration aborted (plugin stopped)");
                return;
              }
              try {
                const shadowRank = shadow.rank || "E";
                const rankMultiplier = this.rankStatMultipliers[shadowRank] || 1;
                const roleKey = shadow.role || "knight";
                const soloData = this.getSoloLevelingData();
                const currentUserStats = (soloData == null ? void 0 : soloData.stats) || {
                  strength: 0,
                  agility: 0,
                  intelligence: 0,
                  vitality: 0,
                  perception: 0
                };
                const newBaseStats = this.generateShadowBaseStats(currentUserStats, roleKey, shadowRank, rankMultiplier);
                const existingGrowthStats = shadow.growthStats || {
                  strength: 0,
                  agility: 0,
                  intelligence: 0,
                  vitality: 0,
                  perception: 0
                };
                shadow.baseStats = newBaseStats;
                shadow.growthStats = existingGrowthStats;
                const effectiveStats = this.getShadowEffectiveStats(shadow);
                shadow.strength = this.calculateShadowStrength(effectiveStats, 1);
                if (this.storageManager) {
                  try {
                    await this.storageManager.saveShadow(this.prepareShadowForSave(shadow));
                  } catch (error) {
                    this.debugError("MIGRATION", `Failed to save shadow ${shadow.id}`, error);
                    const index = (this.settings.shadows || []).findIndex((s) => s.id === shadow.id);
                    if (index !== -1) this.settings.shadows[index] = shadow;
                  }
                } else {
                  const index = (this.settings.shadows || []).findIndex((s) => s.id === shadow.id);
                  if (index !== -1) this.settings.shadows[index] = shadow;
                }
                recalculated++;
              } catch (error) {
                this.debugError("MIGRATION", `Error recalculating shadow ${shadow.id}`, error);
              }
            }
            this.saveSettings();
          }
          BdApi.Data.save("ShadowArmy", migrationKey, true);
          this.debugLog("MIGRATION", `Recalculated ${recalculated} shadows with new exponential formula`);
        } catch (error) {
          this.debugError("MIGRATION", "Error recalculating shadows", error);
        }
      },
      updateUI() {
        if (this._isStopped) return;
        this._widgetDirty = true;
        if (typeof this.scheduleWidgetRefresh === "function") {
          this.scheduleWidgetRefresh({ reason: "update_ui", delayMs: 150 });
        }
      }
    };
  }
});

// src/ShadowArmy/self-heal.js
var require_self_heal = __commonJS({
  "src/ShadowArmy/self-heal.js"(exports2, module2) {
    var C2 = require_constants();
    var HEAL_VERSION = C2.HEAL_VERSION;
    var SELF_HEAL_CLEAN_KEY = "selfHealCleanV";
    module2.exports = {
      /**
       * Phase 1: Full migration (runs once via runDataMigrations v6).
       * Scans and heals every shadow in IDB.
       */
      async selfHealShadowStats() {
        const migrationKey = "shadowArmy_selfHeal_v6";
        if (BdApi.Data.load("ShadowArmy", migrationKey)) return;
        this.debugLog("SELF-HEAL", "Phase 1: Full IDB scan starting...");
        const result = await this._healShadowBatch(null);
        BdApi.Data.save("ShadowArmy", migrationKey, { completedAt: (/* @__PURE__ */ new Date()).toISOString() });
        this.debugLog("SELF-HEAL", `Phase 1 complete: ${result.healed} healed, ${result.skipped} skipped out of ${result.total}`);
      },
      /**
       * Phase 2: Continuous integrity check (runs every plugin start).
       * Only touches shadows missing _healV or with _healV < HEAL_VERSION.
       */
      async selfHealOnStart() {
        if (!this.storageManager) return;
        const cleanVersion = BdApi.Data.load("ShadowArmy", SELF_HEAL_CLEAN_KEY) || 0;
        if (cleanVersion >= HEAL_VERSION) {
          this.debugLog("SELF-HEAL", `Phase 2: skipped (army already clean at v${cleanVersion})`);
          return;
        }
        this.debugLog("SELF-HEAL", `Phase 2: Integrity check (heal version ${HEAL_VERSION})...`);
        const result = await this._healShadowBatch(HEAL_VERSION);
        if (result.aborted) {
          this.debugLog("SELF-HEAL", `Phase 2 aborted before completion (${result.healed} healed so far)`);
          return;
        }
        BdApi.Data.save("ShadowArmy", SELF_HEAL_CLEAN_KEY, HEAL_VERSION);
        if (result.healed > 0) {
          this.debugLog("SELF-HEAL", `Phase 2 complete: healed ${result.healed} shadows`);
        } else {
          this.debugLog("SELF-HEAL", "Phase 2: All shadows healthy");
        }
      },
      /**
       * Pure per-record heal computation. Shared by the snapshot scan below
       * (which decides WHICH ids are candidates for healing — a cheap
       * version-check hint) and the merge-on-write transform passed to
       * storageManager.transformShadowsBatch() (which re-runs this against the
       * FRESH record at write time). Re-deriving from the fresh record — not
       * the stale snapshot `shadow` — means a concurrent XP grant, rank-up, or
       * grade promotion landing mid-pass is preserved: self-heal never touches
       * rank/grade, only initializes level/xp/growthStats/naturalGrowthStats
       * when MISSING (never overwrites an existing value), and recalculates
       * strength from whatever baseStats/growthStats are on the fresh record
       * (so a concurrent level-up's growth contribution is included, not lost).
       * @param {object} rawShadow - possibly-compressed record as stored in IDB.
       * @param {number|null} healVersion - skip if _healV/hv >= this. null = heal everything (Phase 1).
       * @returns {{record: object|null, healed: boolean, skip: boolean}|null}
       *   null = shadow missing/malformed, do not write.
       *   {skip: true} = already healed at this version, do not write.
       *   {record, healed: true} = dirty, healed, write this record.
       *   {record, healed: false} = not dirty, only the heal-version stamp changed.
       */
      _computeHealedShadow(rawShadow, healVersion) {
        var _a, _b, _c, _d, _e, _f;
        if (!rawShadow) return null;
        try {
          if (healVersion !== null) {
            const rawHealV = rawShadow._healV ?? rawShadow.hv ?? null;
            if (rawHealV != null && rawHealV >= healVersion) {
              return { record: null, healed: false, skip: true };
            }
          }
          let working;
          if (rawShadow._c === 2) {
            working = this.decompressShadowUltra(rawShadow);
          } else if (rawShadow._c === 1) {
            working = this.decompressShadow(rawShadow);
          } else {
            working = rawShadow;
          }
          if (!working || !working.id) return null;
          if (healVersion !== null && working._healV >= healVersion) {
            return { record: null, healed: false, skip: true };
          }
          let dirty = false;
          const roleKey = working.role || "knight";
          const role = this.shadowRoles[roleKey];
          if (!working.beastType && (role == null ? void 0 : role.isMagicBeast)) {
            working.beastType = roleKey;
            working.beastFamily = role.family || null;
            dirty = true;
          }
          if (working.beastType === void 0) {
            working.beastType = null;
            dirty = true;
          }
          if (working.beastFamily === void 0) {
            working.beastFamily = null;
            dirty = true;
          }
          const shadowRank = working.rank || "E";
          const rankMultiplier = ((_a = this.rankStatMultipliers) == null ? void 0 : _a[shadowRank]) || 1;
          const roleWeights = ((_b = this.shadowRoleStatWeights) == null ? void 0 : _b[roleKey]) || ((_c = this.shadowRoleStatWeights) == null ? void 0 : _c.knight);
          const rankBaseline = (_d = this.getRankBaselineStats) == null ? void 0 : _d.call(this, shadowRank, rankMultiplier);
          if (rankBaseline && roleWeights && working.baseStats) {
            const statKeys = C2.STAT_KEYS;
            const seed = working.growthVarianceSeed || 0.5;
            const newBaseStats = {};
            for (let s = 0; s < statKeys.length; s++) {
              const stat = statKeys[s];
              const roleWeight = roleWeights[stat] || 1;
              const statVariance = 0.9 + (seed * 7 + s * 13) % 100 / 500;
              newBaseStats[stat] = Math.max(1, Math.round(rankBaseline[stat] * roleWeight * statVariance));
            }
            working.baseStats = newBaseStats;
            dirty = true;
          }
          if (dirty && working.baseStats) {
            if (!working.growthStats) {
              working.growthStats = C2.STAT_KEYS.reduce((o, k) => {
                o[k] = 0;
                return o;
              }, {});
            }
            if (!working.naturalGrowthStats) {
              working.naturalGrowthStats = C2.STAT_KEYS.reduce((o, k) => {
                o[k] = 0;
                return o;
              }, {});
            }
            const effectiveStats = (_e = this.getShadowEffectiveStats) == null ? void 0 : _e.call(this, working);
            if (effectiveStats) {
              if (typeof this.calculateShadowStrength === "function") {
                working.strength = this.calculateShadowStrength(effectiveStats, 1);
              } else {
                (_f = this.debugError) == null ? void 0 : _f.call(this, "SELF-HEAL", "calculateShadowStrength missing \u2014 strength not recalculated");
              }
            }
          }
          if (!working.level || working.level < 1) {
            working.level = 1;
            dirty = true;
          }
          if (working.xp === void 0 || working.xp === null) {
            working.xp = 0;
            dirty = true;
          }
          if (!working.totalCombatTime && working.totalCombatTime !== 0) {
            working.totalCombatTime = 0;
            dirty = true;
          }
          if (!working.lastNaturalGrowth) {
            working.lastNaturalGrowth = working.extractedAt || Date.now();
            dirty = true;
          }
          if (!working.growthVarianceSeed) {
            working.growthVarianceSeed = Math.random();
            dirty = true;
          }
          if (!working.roleName && role) {
            working.roleName = role.name;
            dirty = true;
          }
          working._healV = HEAL_VERSION;
          if (dirty) {
            const toSave = this.prepareShadowForSave(working);
            return toSave ? { record: toSave, healed: true, skip: false } : null;
          }
          const stamped = rawShadow._c ? { ...rawShadow, hv: HEAL_VERSION } : this.prepareShadowForSave(working);
          return { record: stamped, healed: false, skip: false };
        } catch (error) {
          this.debugError("SELF-HEAL", `Error healing shadow ${rawShadow.id || rawShadow.i}`, error);
          return null;
        }
      },
      /**
       * Core heal logic shared by Phase 1 and Phase 2.
       * @param {number|null} healVersion - If set, skip shadows where _healV >= this value.
       *                                    If null, heal everything (Phase 1).
       */
      async _healShadowBatch(healVersion) {
        const allShadows = await this._loadShadowsForMigration();
        const result = { total: allShadows.length, healed: 0, skipped: 0 };
        if (allShadows.length === 0) return result;
        const batchSize = 50;
        let idBatch = [];
        const flushIdBatch = async () => {
          if (idBatch.length === 0) return;
          const ids = idBatch;
          idBatch = [];
          const { failedIds } = await this.storageManager.transformShadowsBatch(
            ids,
            (freshRecord) => {
              const outcome = this._computeHealedShadow(freshRecord, healVersion);
              if (!outcome || outcome.skip) {
                result.skipped++;
                return null;
              }
              if (outcome.healed) result.healed++;
              else result.skipped++;
              return outcome.record;
            },
            { chunkSize: batchSize }
          );
          if (failedIds.length > 0) {
            this.debugError("SELF-HEAL", `transformShadowsBatch: ${failedIds.length} record(s) failed to heal`, { failedIds });
          }
        };
        for (let i = 0; i < allShadows.length; i += batchSize) {
          if (this._isStopped || this._selfHealAborted) {
            this.debugLog("SELF-HEAL", `Aborted (${this._isStopped ? "plugin stopped" : "deployment requested IDB"})`);
            await flushIdBatch();
            result.aborted = true;
            return result;
          }
          const batch = allShadows.slice(i, i + batchSize);
          for (const shadow of batch) {
            if (this._isStopped || this._selfHealAborted) {
              await flushIdBatch();
              result.aborted = true;
              return result;
            }
            const id = (shadow == null ? void 0 : shadow.id) || (shadow == null ? void 0 : shadow.i);
            if (!id) {
              result.skipped++;
              continue;
            }
            if (healVersion !== null) {
              const rawHealV = shadow._healV ?? shadow.hv ?? null;
              if (rawHealV != null && rawHealV >= healVersion) {
                result.skipped++;
                continue;
              }
            }
            idBatch.push(id);
          }
          if (idBatch.length >= batchSize) {
            await flushIdBatch();
            await new Promise((r) => setTimeout(r, 50));
            if (this._selfHealAborted) {
              this.debugLog("SELF-HEAL", "Aborted after flush (deployment requested IDB)");
              result.aborted = true;
              return result;
            }
          }
          if (allShadows.length > 200 && (i + batchSize) % 500 < batchSize) {
            this.debugLog("SELF-HEAL", `Progress: ${Math.min(i + batchSize, allShadows.length)}/${allShadows.length} scanned, ${result.healed} healed`);
          }
        }
        await flushIdBatch();
        if (result.healed > 0) {
          this.cachedBuffs = null;
          this.cachedBuffsTime = null;
          this._totalPowerCache = null;
          this._totalPowerCacheTime = null;
          if (this._shadowPowerCache) this._shadowPowerCache.clear();
          this._armyWriteGen = (this._armyWriteGen || 0) + 1;
        }
        return result;
      },
      /**
       * Abort any running self-heal scan. Called by Dungeons before IDB-heavy
       * deployment reads so self-heal writes don't starve the read queue.
       * Self-heal can be rescheduled later via resumeSelfHeal().
       */
      abortSelfHeal() {
        var _a;
        this._selfHealAborted = true;
        (_a = this.debugLog) == null ? void 0 : _a.call(this, "SELF-HEAL", "Abort signal set (deployment priority)");
      },
      /**
       * Reschedule self-heal after deployment finishes.
       * Defers 30s so deployment + early combat don't compete with IDB writes.
       */
      resumeSelfHeal(delayMs = 3e4) {
        this._selfHealAborted = false;
        if (this._selfHealResumeTimer) clearTimeout(this._selfHealResumeTimer);
        this._selfHealResumeTimer = setTimeout(() => {
          if (this._isStopped || this._selfHealAborted) return;
          this.selfHealOnStart().catch((error) => {
            var _a;
            (_a = this.debugError) == null ? void 0 : _a.call(this, "SELF-HEAL", "Resumed self-heal failed", error);
          });
        }, delayMs);
      }
    };
  }
});

// src/ShadowArmy/shadow-management.js
var require_shadow_management = __commonJS({
  "src/ShadowArmy/shadow-management.js"(exports2, module2) {
    var C2 = require_constants();
    module2.exports = {
      // SHADOW QUERY & MANAGEMENT
      /**
       * Get all shadows from storage.
       * Decompresses transparently and updates snapshot cache.
       */
      async getAllShadows() {
        if (!this.storageManager) {
          return this.settings.shadows || [];
        }
        try {
          let shadows = await this.storageManager.getAllShadowsRaw();
          if (shadows && shadows.length > 0) {
            shadows = shadows.map((s) => this.getShadowData(s));
          }
          this._updateSnapshot(shadows);
          return shadows;
        } catch (error) {
          this.debugError("STORAGE", "Failed to get all shadows from IndexedDB", error);
          return this.settings.shadows || [];
        }
      },
      /**
       * Returns cached shadow snapshot if <2s old, null otherwise.
       * Cross-plugin consumers call this FIRST before falling back to getAllShadows().
       * @returns {Array|null} Cached shadow array or null if stale/missing
       */
      getShadowSnapshot() {
        if (this._snapshotCache && Date.now() - this._snapshotTimestamp < 2e3) {
          return this._snapshotCache;
        }
        return null;
      },
      /**
       * Returns cached snapshot with relaxed 60s TTL for deployment use.
       * Deployment reads are large IDB operations — a slightly stale snapshot is
       * far better than blocking on IDB while self-heal is writing.
       * @returns {Array|null}
       */
      getShadowSnapshotForDeploy() {
        if (this._snapshotCache && this._snapshotCache.length > 0 && Date.now() - this._snapshotTimestamp < 6e4) {
          return this._snapshotCache;
        }
        return null;
      },
      /** @private */
      _updateSnapshot(shadows) {
        this._snapshotCache = shadows;
        this._snapshotTimestamp = Date.now();
      },
      /** @private */
      _invalidateSnapshot() {
        this._snapshotCache = null;
        this._snapshotTimestamp = 0;
      },
      // TOP GENERALS
      /**
       * Get top 7 generals (strongest shadows by total power).
       * Automatic selection — no manual favorites.
       * STALE-TOLERANT cache: STALE_OK_MS = 300000 (5 minutes), not a
       * per-tick cache. Deliberate — see the note in the body; re-walking
       * 281k records to re-pick the same 7 shadows was the cost being avoided.
       */
      async getTopGenerals() {
        var _a;
        try {
          const now = Date.now();
          const cacheKey = this.getArmyStatsCacheKey();
          const STALE_OK_MS = 3e5;
          if (this._topGeneralsCache && this._topGeneralsCacheTime && now - this._topGeneralsCacheTime < STALE_OK_MS) {
            this._topGeneralsCacheKey = cacheKey;
            return this._topGeneralsCache;
          }
          const TOP_K = 7;
          const top = [];
          const insertTop = (shadow, strength) => {
            if (!(strength > 0) || !shadow) return;
            if (top.length < TOP_K) {
              top.push({ shadow, strength });
              top.sort((a, b) => a.strength - b.strength);
              return;
            }
            if (strength <= top[0].strength) return;
            top[0] = { shadow, strength };
            top.sort((a, b) => a.strength - b.strength);
          };
          if ((_a = this.storageManager) == null ? void 0 : _a.forEachShadowBatchPaged) {
            try {
              await this.storageManager.forEachShadowBatchPaged(
                (batch) => {
                  for (let i = 0; i < batch.length; i++) {
                    const sourceShadow = batch[i];
                    const shadow = this.getShadowData(sourceShadow) || sourceShadow;
                    const strength = this.calculateShadowPowerCached(sourceShadow, shadow);
                    insertTop(shadow, strength);
                  }
                },
                { batchSize: 500 }
              );
            } catch (error) {
              this.debugError("STORAGE", "Failed to stream shadows for top generals", error);
            }
          } else {
            const shadows = this.settings.shadows || [];
            for (let i = 0; i < shadows.length; i++) {
              const sourceShadow = shadows[i];
              const shadow = this.getShadowData(sourceShadow) || sourceShadow;
              const strength = this.calculateShadowPowerCached(sourceShadow, shadow);
              insertTop(shadow, strength);
            }
          }
          top.sort((a, b) => b.strength - a.strength);
          const generals = top.map((x) => x.shadow);
          this._topGeneralsCache = generals;
          this._topGeneralsCacheKey = cacheKey;
          this._topGeneralsCacheTime = Date.now();
          return generals;
        } catch (error) {
          this.debugError("STORAGE", "Error getting top generals", error);
          return [];
        }
      },
      // BUFF MODEL
      getShadowBuffModelConfig() {
        if (!this._buffModelConfig) {
          this._buffModelConfig = Object.freeze({
            generalDuplicateDiminishStep: 0.22,
            roleMixPowerExponent: 0.5,
            roleMixBaseWeight: 0.08,
            aggregatedBuffScale: 0.01,
            aggregatedBuffPowerDivisor: 1e4,
            aggregatedBaseBuffMax: 0.42,
            diversityMinRolePower: 500,
            diversityPerRoleBonus: 0.03,
            diversityMaxBonus: 0.18,
            statSoftCaps: Object.freeze({
              strength: Object.freeze({ soft: 0.5, hard: 0.72 }),
              agility: Object.freeze({ soft: 0.5, hard: 0.72 }),
              intelligence: Object.freeze({ soft: 0.54, hard: 0.76 }),
              vitality: Object.freeze({ soft: 0.56, hard: 0.8 }),
              perception: Object.freeze({ soft: 0.48, hard: 0.68 })
            }),
            minBuff: -0.15
          });
        }
        return this._buffModelConfig;
      },
      getRoleBuffWeightVector(roleKey) {
        var _a;
        const statKeys = C2.STAT_KEYS;
        const role = (_a = this.shadowRoles) == null ? void 0 : _a[roleKey];
        const buffs = (role == null ? void 0 : role.buffs) || null;
        const vector = this.createZeroStatsBucket(statKeys);
        if (!buffs) return vector;
        for (let i = 0; i < statKeys.length; i++) {
          const key = statKeys[i];
          const value = Number(buffs[key] || 0);
          if (value > 0) {
            vector[key] = value;
          }
        }
        return vector;
      },
      calculateRoleMixFromPowerMap(rolePowerMap) {
        const statKeys = C2.STAT_KEYS;
        const config = this.getShadowBuffModelConfig();
        const safeMap = rolePowerMap && typeof rolePowerMap === "object" ? rolePowerMap : {};
        const weightedTotals = this.createZeroStatsBucket(statKeys);
        let totalRoleWeight = 0;
        const entries = Object.entries(safeMap);
        for (let i = 0; i < entries.length; i++) {
          const [roleKey, powerValue] = entries[i];
          const power = Math.max(0, Number(powerValue) || 0);
          if (!(power > 0)) continue;
          const roleWeight = Math.pow(power, config.roleMixPowerExponent);
          const roleVector = this.getRoleBuffWeightVector(roleKey);
          totalRoleWeight += roleWeight;
          for (let j = 0; j < statKeys.length; j++) {
            const stat = statKeys[j];
            weightedTotals[stat] += roleWeight * (config.roleMixBaseWeight + (roleVector[stat] || 0));
          }
        }
        if (!(totalRoleWeight > 0)) {
          return {
            strength: 1,
            agility: 1,
            intelligence: 1,
            vitality: 1,
            perception: 1
          };
        }
        const averages = this.createZeroStatsBucket(statKeys);
        let averageOfAverages = 0;
        for (let i = 0; i < statKeys.length; i++) {
          const stat = statKeys[i];
          averages[stat] = weightedTotals[stat] / totalRoleWeight;
          averageOfAverages += averages[stat];
        }
        averageOfAverages = averageOfAverages / statKeys.length;
        if (!(averageOfAverages > 0)) {
          return {
            strength: 1,
            agility: 1,
            intelligence: 1,
            vitality: 1,
            perception: 1
          };
        }
        const mix = this.createZeroStatsBucket(statKeys);
        for (let i = 0; i < statKeys.length; i++) {
          const stat = statKeys[i];
          mix[stat] = averages[stat] / averageOfAverages;
        }
        return mix;
      },
      calculateShadowArmyDiversityMultiplier(rolePowerMap) {
        const config = this.getShadowBuffModelConfig();
        const entries = Object.entries(rolePowerMap || {});
        let activeRoles = 0;
        for (let i = 0; i < entries.length; i++) {
          const power = Math.max(0, Number(entries[i][1]) || 0);
          if (power >= config.diversityMinRolePower) {
            activeRoles++;
          }
        }
        if (activeRoles <= 1) return 1;
        const bonus = Math.min(
          config.diversityMaxBonus,
          (activeRoles - 1) * config.diversityPerRoleBonus
        );
        return 1 + bonus;
      },
      applyShadowBuffSoftCaps(buffs) {
        if (!buffs || typeof buffs !== "object") return;
        const config = this.getShadowBuffModelConfig();
        const caps = config.statSoftCaps || {};
        const statKeys = C2.STAT_KEYS;
        for (let i = 0; i < statKeys.length; i++) {
          const stat = statKeys[i];
          const rawValue = Number(buffs[stat] || 0);
          const cap = caps[stat];
          if (!cap) {
            buffs[stat] = Math.max(config.minBuff, rawValue);
            continue;
          }
          if (rawValue <= cap.soft) {
            buffs[stat] = Math.max(config.minBuff, rawValue);
            continue;
          }
          const gap = Math.max(1e-4, cap.hard - cap.soft);
          const overflow = rawValue - cap.soft;
          const compressed = cap.soft + gap * (1 - Math.exp(-overflow / gap));
          buffs[stat] = Math.max(config.minBuff, Math.min(cap.hard, compressed));
        }
      },
      // TOTAL BUFF CALCULATION
      /**
       * Calculate total buffs from all shadows.
       * Top 7 strongest (generals) preserve role identity; remaining army
       * contributes through role-weighted aggregation for scalable performance.
       */
      async calculateTotalBuffs() {
        var _a, _b;
        const statKeys = C2.STAT_KEYS;
        const config = this.getShadowBuffModelConfig();
        const buffs = {
          strength: 0,
          agility: 0,
          intelligence: 0,
          vitality: 0,
          perception: 0
        };
        const generals = await this.getTopGenerals();
        const generalRoleCounts = {};
        const generalRolePowerMap = {};
        generals.reduce((accBuffs, shadow) => {
          const decompressed = this.getShadowData(shadow) || shadow;
          const roleKey = (decompressed == null ? void 0 : decompressed.role) || (decompressed == null ? void 0 : decompressed.roleName) || null;
          if (!roleKey) return accBuffs;
          const role = this.shadowRoles[roleKey];
          if (!role || !role.buffs) return accBuffs;
          const roleCount = (generalRoleCounts[roleKey] || 0) + 1;
          generalRoleCounts[roleKey] = roleCount;
          const roleDiminish = 1 / (1 + config.generalDuplicateDiminishStep * (roleCount - 1));
          const effective = this.getShadowEffectiveStats(decompressed);
          const power = effective ? this.calculateShadowStrength(effective, 1) : 0;
          if (power > 0) {
            generalRolePowerMap[roleKey] = (generalRolePowerMap[roleKey] || 0) + power;
          }
          Object.keys(role.buffs).reduce((stats, stat) => {
            const amount = (role.buffs[stat] || 0) * roleDiminish;
            stats[stat] = (stats[stat] || 0) + amount;
            return stats;
          }, accBuffs);
          return accBuffs;
        }, buffs);
        if (this.storageManager) {
          try {
            const armyStats = await this.getAggregatedArmyStats();
            const rolePowerMap = {};
            const roleEntries = Object.entries((armyStats == null ? void 0 : armyStats.byRole) || {});
            for (let i = 0; i < roleEntries.length; i++) {
              const [roleKey, data] = roleEntries[i];
              const totalPower = Math.max(0, Number((data == null ? void 0 : data.totalPower) || 0));
              const generalPower = Math.max(0, Number(generalRolePowerMap[roleKey] || 0));
              const nonGeneralPower = Math.max(0, totalPower - generalPower);
              if (nonGeneralPower > 0) {
                rolePowerMap[roleKey] = nonGeneralPower;
              }
            }
            const totalRolePower = Object.values(rolePowerMap).reduce(
              (sum, value) => sum + (Number(value) || 0),
              0
            );
            if (totalRolePower > 0) {
              const baseAggregatedBuff = Math.sqrt(
                totalRolePower / config.aggregatedBuffPowerDivisor
              ) * config.aggregatedBuffScale;
              const isLegionActive = ((_b = (_a = this.getSoloLevelingData) == null ? void 0 : _a.call(this)) == null ? void 0 : _b.rank) === "Shadow Monarch";
              const cappedAggregatedBuff = isLegionActive ? baseAggregatedBuff : Math.min(config.aggregatedBaseBuffMax, baseAggregatedBuff);
              const roleMix = this.calculateRoleMixFromPowerMap(rolePowerMap);
              const diversityMultiplier = this.calculateShadowArmyDiversityMultiplier(rolePowerMap);
              for (let i = 0; i < statKeys.length; i++) {
                const stat = statKeys[i];
                const mixFactor = Math.max(0.4, Number(roleMix[stat] || 1));
                const weighted = cappedAggregatedBuff * mixFactor * diversityMultiplier;
                buffs[stat] = (buffs[stat] || 0) + weighted;
              }
              this.debugLog("BUFFS", "Role-weighted army buffs applied", {
                generals: generals.length,
                totalRolePower,
                baseAggregatedBuff: Number(baseAggregatedBuff.toFixed(4)),
                cappedAggregatedBuff: Number(cappedAggregatedBuff.toFixed(4)),
                legion: isLegionActive,
                diversityMultiplier: Number(diversityMultiplier.toFixed(3)),
                roleMix
              });
            }
          } catch (error) {
            this.debugError("STORAGE", "Failed to calculate role-weighted buffs", error);
          }
        }
        if (buffs.perception == null) {
          buffs.perception = 0;
        }
        this.applyShadowBuffSoftCaps(buffs);
        this.cachedBuffs = buffs;
        this.cachedBuffsTime = Date.now();
        return buffs;
      },
      // ── MONARCH'S NAMING — "Arise, Igris." ─────────────────────────────────────
      // SHADOW MONARCH PERK: the Monarch names his generals. SM-only, and only for
      // top-grade shadows (Marshal / Grand Marshal — the generals). A named general
      // carries the Monarch's favor: +5% effective stats (getShadowEffectiveStats)
      // and appears BY NAME in dungeon/senses reporting. Persisted via the `cn`
      // compressed field so the name survives compression round-trips.
      async renameShadow(shadow, rawName) {
        var _a, _b, _c, _d;
        try {
          if (((_b = (_a = this.getSoloLevelingData) == null ? void 0 : _a.call(this)) == null ? void 0 : _b.rank) !== "Shadow Monarch") {
            this._toast("Only the Shadow Monarch may name his generals.", "error");
            return false;
          }
          const full = shadow && shadow._c ? this.decompressShadow(shadow) : shadow;
          const id = (full == null ? void 0 : full.id) || (full == null ? void 0 : full.i);
          if (!id) return false;
          const grade = full.grade || "Common";
          if (grade !== "Marshal" && grade !== "Grand Marshal") {
            this._toast("Only Marshal-grade and above may receive a name.", "warning");
            return false;
          }
          const name = String(rawName == null ? "" : rawName).replace(/[\u0000-\u001f\u007f]/g, "").replace(/\s+/g, " ").trim().slice(0, 24);
          full.customName = name || null;
          const compressed = this.compressShadow(full) || full;
          await this.storageManager.saveShadow(compressed);
          (_c = this._invalidateSnapshot) == null ? void 0 : _c.call(this);
          this._toast(
            name ? `"Arise, ${name}." \u2014 the Monarch has named a general.` : "The general\u2019s name has been withdrawn.",
            "success"
          );
          return true;
        } catch (error) {
          (_d = this.debugError) == null ? void 0 : _d.call(this, "RENAME", "Failed to name shadow", error);
          this._toast("Naming failed \u2014 see console.", "error");
          return false;
        }
      }
    };
  }
});

// src/ShadowArmy/compression.js
var require_compression = __commonJS({
  "src/ShadowArmy/compression.js"(exports2, module2) {
    var C2 = require_constants();
    var SLEvents2 = require_event_bus();
    module2.exports = {
      // PERSONALITY HELPERS (wrappers around constants.js)
      normalizePersonalityValue(value) {
        return C2.normalizeShadowPersonalityValue(value);
      },
      derivePersonalityFromRole(role) {
        return C2.deriveShadowPersonalityFromRole(role);
      },
      getShadowPersonalityKey(shadow) {
        var _a;
        if (!shadow || typeof shadow !== "object") return "";
        if ((_a = this.storageManager) == null ? void 0 : _a.getNormalizedPersonalityKey) {
          return this.storageManager.getNormalizedPersonalityKey(shadow);
        }
        const explicitKey = this.normalizePersonalityValue(shadow.personalityKey || shadow.pk);
        if (explicitKey) return explicitKey;
        const explicitPersonality = this.normalizePersonalityValue(shadow.personality);
        if (explicitPersonality) return explicitPersonality;
        return this.derivePersonalityFromRole(shadow.role || shadow.ro || "");
      },
      // COMPRESSION (regular _c:1 — ~37% serialized, ~13% heap; see file header)
      /**
       * Compress shadow data. Measured ~36.9% smaller serialized
       * (713 B → 450 B on a veteran record), ~13% off retained heap.
       */
      compressShadow(shadow) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o;
        if (!shadow || !shadow.id) return null;
        return {
          _c: 1,
          // Compression marker
          i: shadow.id,
          r: shadow.rank,
          ro: shadow.role,
          bt: shadow.beastType || null,
          bf: shadow.beastFamily || null,
          pk: this.getShadowPersonalityKey(shadow),
          l: shadow.level || 1,
          x: shadow.xp || 0,
          b: [
            ((_a = shadow.baseStats) == null ? void 0 : _a.strength) || 0,
            ((_b = shadow.baseStats) == null ? void 0 : _b.agility) || 0,
            ((_c = shadow.baseStats) == null ? void 0 : _c.intelligence) || 0,
            ((_d = shadow.baseStats) == null ? void 0 : _d.vitality) || 0,
            ((_e = shadow.baseStats) == null ? void 0 : _e.perception) || 0
          ],
          g: [
            ((_f = shadow.growthStats) == null ? void 0 : _f.strength) || 0,
            ((_g = shadow.growthStats) == null ? void 0 : _g.agility) || 0,
            ((_h = shadow.growthStats) == null ? void 0 : _h.intelligence) || 0,
            ((_i = shadow.growthStats) == null ? void 0 : _i.vitality) || 0,
            ((_j = shadow.growthStats) == null ? void 0 : _j.perception) || 0
          ],
          n: [
            ((_k = shadow.naturalGrowthStats) == null ? void 0 : _k.strength) || 0,
            ((_l = shadow.naturalGrowthStats) == null ? void 0 : _l.agility) || 0,
            ((_m = shadow.naturalGrowthStats) == null ? void 0 : _m.intelligence) || 0,
            ((_n = shadow.naturalGrowthStats) == null ? void 0 : _n.vitality) || 0,
            ((_o = shadow.naturalGrowthStats) == null ? void 0 : _o.perception) || 0
          ],
          c: Math.round((shadow.totalCombatTime || 0) * 10) / 10,
          e: shadow.extractedAt,
          lng: shadow.lastNaturalGrowth || shadow.extractedAt,
          s: Math.round((shadow.growthVarianceSeed || Math.random()) * 100) / 100,
          ol: shadow.ownerLevelAtExtraction || 1,
          hv: shadow._healV || 0,
          gr: shadow.grade || "Common",
          // Shadow grade (manhwa lore tier)
          cn: shadow.customName || null,
          // Monarch's Naming — custom general name
          // IDB index fields — full-name properties so compressed shadows
          // remain visible to IndexedDB secondary indexes
          rank: shadow.rank,
          role: shadow.role,
          level: shadow.level || 1,
          strength: shadow.strength || 0,
          extractedAt: shadow.extractedAt
        };
      },
      // ULTRA-COMPRESSION (_c:2 — ~52% serialized, ~51% heap; see file header)
      /**
       * Ultra-compress shadow data. Measured ~52% smaller serialized
       * (713 B → 342 B) and ~51% off retained heap.
       * Used for shadows beyond top 1,000 (cold data).
       */
      compressShadowUltra(shadow) {
        if (!shadow || !shadow.id) return null;
        const effectiveStats = this.getShadowEffectiveStats(shadow);
        const statKeys = C2.STAT_KEYS;
        const totalStats = statKeys.reduce((sum, stat) => sum + (effectiveStats[stat] || 0), 0);
        const totalGrowth = statKeys.reduce(
          (sum, stat) => {
            var _a;
            return sum + (((_a = shadow.growthStats) == null ? void 0 : _a[stat]) || 0);
          },
          0
        );
        const totalNatGrowth = statKeys.reduce(
          (sum, stat) => {
            var _a;
            return sum + (((_a = shadow.naturalGrowthStats) == null ? void 0 : _a[stat]) || 0);
          },
          0
        );
        return {
          _c: 2,
          // Ultra-compression marker
          i: shadow.id,
          r: shadow.rank || "E",
          ro: shadow.role || "unknown",
          bt: shadow.beastType || null,
          bf: shadow.beastFamily || null,
          pk: this.getShadowPersonalityKey(shadow),
          p: Math.round((shadow.strength || 0) / 10),
          l: shadow.level || 1,
          x: shadow.xp || 0,
          e: Math.floor((shadow.extractedAt || Date.now()) / 864e5),
          s: Math.floor(totalStats / 100),
          gt: Math.round(totalGrowth),
          nt: Math.round(totalNatGrowth),
          vs: Math.round((shadow.growthVarianceSeed || Math.random()) * 100) / 100,
          ol: shadow.ownerLevelAtExtraction || 1,
          hv: shadow._healV || 0,
          gr: shadow.grade || "Common",
          cn: shadow.customName || null,
          // IDB index fields
          rank: shadow.rank || "E",
          role: shadow.role || "unknown",
          level: shadow.level || 1,
          strength: shadow.strength || 0,
          extractedAt: shadow.extractedAt || Date.now()
        };
      },
      // DECOMPRESSION
      /**
       * Decompress ultra-compressed shadow (_c:2) back to usable format.
       * Note: Some data is approximated (stats are reconstructed).
       */
      decompressShadowUltra(compressed) {
        var _a, _b;
        if (!compressed || compressed._c !== 2) {
          return compressed;
        }
        const statKeys = C2.STAT_KEYS;
        const totalGrowth = compressed.gt || 0;
        const totalNatGrowth = compressed.nt || 0;
        const perStatGrowth = Math.floor(totalGrowth / 5);
        const perStatNatGrowth = Math.floor(totalNatGrowth / 5);
        const totalEffective = compressed.s * 100;
        const perStatBase = Math.max(0, Math.floor((totalEffective - totalGrowth - totalNatGrowth) / 5));
        const baseStats = statKeys.reduce((stats, stat) => {
          stats[stat] = perStatBase;
          return stats;
        }, {});
        const growthStats = statKeys.reduce((stats, stat) => {
          stats[stat] = perStatGrowth;
          return stats;
        }, {});
        const naturalGrowthStats = statKeys.reduce((stats, stat) => {
          stats[stat] = perStatNatGrowth;
          return stats;
        }, {});
        const role = compressed.ro || "unknown";
        return {
          id: compressed.i,
          rank: compressed.r,
          role,
          beastType: compressed.bt || null,
          beastFamily: compressed.bf || null,
          roleName: ((_b = (_a = this.shadowRoles) == null ? void 0 : _a[role]) == null ? void 0 : _b.name) || role,
          personalityKey: this.normalizePersonalityValue(compressed.pk),
          personality: this.normalizePersonalityValue(compressed.pk),
          level: compressed.l,
          xp: compressed.x || 0,
          strength: compressed.p * 10,
          baseStats,
          growthStats,
          naturalGrowthStats,
          totalCombatTime: 0,
          extractedAt: compressed.e * 864e5,
          growthVarianceSeed: compressed.vs || Math.random(),
          ownerLevelAtExtraction: compressed.ol || 1,
          lastNaturalGrowth: compressed.e * 864e5,
          _healV: compressed.hv || 0,
          grade: compressed.gr || "Common",
          customName: compressed.cn || null
        };
      },
      /**
       * Decompress regular compressed shadow (_c:1) back to full format.
       */
      decompressShadow(compressed) {
        var _a;
        if (!compressed || !compressed._c) {
          return compressed;
        }
        const statKeys = C2.STAT_KEYS;
        const baseStats = statKeys.reduce((stats, stat, index) => {
          stats[stat] = compressed.b[index] || 0;
          return stats;
        }, {});
        const growthStats = statKeys.reduce((stats, stat, index) => {
          stats[stat] = compressed.g[index] || 0;
          return stats;
        }, {});
        const naturalGrowthStats = statKeys.reduce((stats, stat, index) => {
          stats[stat] = compressed.n[index] || 0;
          return stats;
        }, {});
        return {
          id: compressed.i,
          rank: compressed.r,
          role: compressed.ro,
          beastType: compressed.bt || null,
          beastFamily: compressed.bf || null,
          roleName: ((_a = this.shadowRoles[compressed.ro]) == null ? void 0 : _a.name) || compressed.ro,
          personalityKey: this.normalizePersonalityValue(compressed.pk) || this.derivePersonalityFromRole(compressed.ro),
          personality: this.normalizePersonalityValue(compressed.pk) || this.derivePersonalityFromRole(compressed.ro),
          level: compressed.l,
          xp: compressed.x,
          baseStats,
          growthStats,
          naturalGrowthStats,
          totalCombatTime: compressed.c,
          extractedAt: compressed.e,
          growthVarianceSeed: compressed.s || Math.random(),
          ownerLevelAtExtraction: compressed.ol || 1,
          lastNaturalGrowth: compressed.lng || compressed.e,
          strength: 0,
          _healV: compressed.hv || 0,
          grade: compressed.gr || "Common",
          customName: compressed.cn || null
        };
      },
      // CACHE INVALIDATION & BATCH DELETE
      _invalidateShadowStateCaches(oldShadow) {
        var _a, _b;
        if (!oldShadow) return;
        (_b = (_a = this.storageManager) == null ? void 0 : _a.invalidateCache) == null ? void 0 : _b.call(_a, oldShadow);
        this.invalidateShadowPowerCache(oldShadow);
        const oldId = this.getCacheKey(oldShadow);
        const oldI = oldShadow.i;
        if (!this._shadowPersonalityCache) return;
        oldId && this._shadowPersonalityCache.delete(`personality_${oldId}`);
        oldI && oldI !== oldId && this._shadowPersonalityCache.delete(`personality_${oldI}`);
      },
      async _deleteShadowsByIds(shadowIds, scope = "ESSENCE") {
        var _a, _b;
        if (!Array.isArray(shadowIds) || shadowIds.length === 0) return true;
        if (!((_a = this.storageManager) == null ? void 0 : _a.deleteShadowsBatch)) return false;
        try {
          await this.storageManager.deleteShadowsBatch(shadowIds);
          this.clearShadowPowerCache();
          this._invalidateSnapshot();
          (_b = this._invalidateCapCountCache) == null ? void 0 : _b.call(this);
          this._armyWriteGen = (this._armyWriteGen || 0) + 1;
          return true;
        } catch (error) {
          this.debugError(scope, "Batch delete error", error);
          return false;
        }
      },
      // TIERED COMPRESSION PIPELINE
      /**
       * Process shadow compression — compress weak shadows to save memory.
       * Runs periodically (every hour) alongside natural growth.
       *
       * Tier 1: Top 1,000 — Full format (Elite Force)
       * Tier 2: Next 9,000 — Regular compression (~37% serialized)
       * Tier 3: Rest — Ultra-compression (~52% serialized)
       */
      async processShadowCompression() {
        var _a, _b, _c;
        try {
          const config = this.settings.shadowCompression || this.defaultSettings.shadowCompression;
          if (!config.enabled) {
            return;
          }
          const currentGen = this._armyWriteGen || 0;
          if (this._lastCompressionGen !== void 0 && currentGen === this._lastCompressionGen) {
            this.debugLog("COMPRESSION", "Army unchanged since last pass, skipping full scan");
            return;
          }
          let allShadows = [];
          if (this.storageManager) {
            try {
              allShadows = await this.storageManager.getAllShadowsRaw();
            } catch (error) {
              this.debugError("COMPRESSION", "Error getting shadows", error);
              return;
            }
          }
          if (allShadows.length <= 1e3) {
            this.debugLog("COMPRESSION", "Army too small, skipping");
            this._lastCompressionGen = this._armyWriteGen || 0;
            return;
          }
          const shadowsWithPower = this.processShadowsWithPower(allShadows, true).map(
            ({ shadow, decompressed: decompressed2, power, compressionLevel }) => ({
              shadow: decompressed2,
              power,
              isCompressed: compressionLevel > 0,
              compressionLevel
            })
          );
          shadowsWithPower.sort((a, b) => b.power - a.power);
          const eliteThreshold = 1e3;
          const warmThreshold = 1e4;
          const elites = shadowsWithPower.slice(0, eliteThreshold);
          const warm = shadowsWithPower.slice(eliteThreshold, warmThreshold);
          const cold = shadowsWithPower.slice(warmThreshold);
          const counters = { compressed: 0, ultraCompressed: 0, decompressed: 0 };
          let anyTierWriteFailed = false;
          const coldIds = cold.filter(({ compressionLevel }) => compressionLevel !== 2).map(({ shadow }) => this.getCacheKey(shadow)).filter(Boolean);
          let coldUpdated = 0;
          if (coldIds.length > 0 && ((_a = this.storageManager) == null ? void 0 : _a.transformShadowsBatch)) {
            try {
              const { completed, failedIds } = await this.storageManager.transformShadowsBatch(
                coldIds,
                (freshRecord) => {
                  if (freshRecord._c === 2) return null;
                  const decompressedFresh = this.getShadowData(freshRecord);
                  if (!decompressedFresh) return null;
                  const oldShadow = { ...freshRecord };
                  const ultraCompressedShadow = this.compressShadowUltra(decompressedFresh);
                  if (!ultraCompressedShadow || !this.getCacheKey(ultraCompressedShadow)) return null;
                  this._invalidateShadowStateCaches(oldShadow);
                  return ultraCompressedShadow;
                }
              );
              coldUpdated = completed;
              if (failedIds.length > 0) anyTierWriteFailed = true;
            } catch (error) {
              this.debugError("COMPRESSION", "Ultra-compression: batch transform error", error);
              anyTierWriteFailed = true;
            }
          }
          counters.ultraCompressed = coldUpdated;
          const warmIds = warm.filter(({ compressionLevel }) => compressionLevel !== 1).map(({ shadow }) => this.getCacheKey(shadow)).filter(Boolean);
          let warmUpdated = 0;
          if (warmIds.length > 0 && ((_b = this.storageManager) == null ? void 0 : _b.transformShadowsBatch)) {
            try {
              const { completed, failedIds } = await this.storageManager.transformShadowsBatch(
                warmIds,
                (freshRecord) => {
                  if (freshRecord._c === 1) return null;
                  const decompressedFresh = this.getShadowData(freshRecord);
                  if (!decompressedFresh) return null;
                  const oldShadow = { ...freshRecord };
                  const compressedShadow = this.compressShadow(decompressedFresh);
                  if (!compressedShadow || !this.getCacheKey(compressedShadow)) return null;
                  this._invalidateShadowStateCaches(oldShadow);
                  return compressedShadow;
                }
              );
              warmUpdated = completed;
              if (failedIds.length > 0) anyTierWriteFailed = true;
            } catch (error) {
              this.debugError("COMPRESSION", "Compression: batch transform error", error);
              anyTierWriteFailed = true;
            }
          }
          const downgradeCount = warm.filter(({ compressionLevel }) => compressionLevel === 2).length;
          counters.compressed = warmUpdated;
          counters.ultraCompressed -= downgradeCount;
          const eliteIds = elites.filter(({ compressionLevel }) => compressionLevel !== 0).map(({ shadow }) => this.getCacheKey(shadow)).filter(Boolean);
          let elitesUpdated = 0;
          if (eliteIds.length > 0 && ((_c = this.storageManager) == null ? void 0 : _c.transformShadowsBatch)) {
            try {
              const { completed, failedIds } = await this.storageManager.transformShadowsBatch(
                eliteIds,
                (freshRecord) => {
                  if (!freshRecord._c) return null;
                  const oldShadow = { ...freshRecord };
                  const decompressedForSave = this.prepareShadowForSave(this.getShadowData(freshRecord));
                  if (!decompressedForSave || !this.getCacheKey(decompressedForSave)) return null;
                  this._invalidateShadowStateCaches(oldShadow);
                  return decompressedForSave;
                }
              );
              elitesUpdated = completed;
              if (failedIds.length > 0) anyTierWriteFailed = true;
            } catch (error) {
              this.debugError("COMPRESSION", "Decompression: batch transform error", error);
              anyTierWriteFailed = true;
            }
          }
          counters.decompressed = elitesUpdated;
          if (coldUpdated > 0 || warmUpdated > 0 || elitesUpdated > 0) {
            this.clearShadowPowerCache();
            this.settings.cachedTotalPowerShadowCount = 0;
          }
          const { compressed, ultraCompressed, decompressed } = counters;
          if (!this.settings.shadowCompression) {
            this.settings.shadowCompression = { ...config };
          }
          this.settings.shadowCompression.lastCompressionTime = Date.now();
          this.saveSettings();
          if (!anyTierWriteFailed) {
            this._lastCompressionGen = this._armyWriteGen || 0;
          } else {
            this.debugLog("COMPRESSION", "One or more tier writes failed \u2014 _lastCompressionGen NOT advanced, next tick will retry");
          }
          if (compressed > 0 || ultraCompressed > 0 || decompressed > 0) {
            this.debugLog(
              "COMPRESSION",
              `Compression: ${compressed} compressed, ${ultraCompressed} ultra-compressed, ${decompressed} decompressed`
            );
            this.debugLog(
              "COMPRESSION",
              `Elite: ${elites.length} (full) | Warm: ${warm.length} (compressed) | Cold: ${cold.length} (ultra)`
            );
            const savings = Math.floor((compressed * 0.8 * 500 + ultraCompressed * 0.95 * 500) / 1024);
            this.debugLog("COMPRESSION", `Memory Savings: ~${savings} KB`);
          }
        } catch (error) {
          this.debugError("COMPRESSION", "Error processing", error);
        }
      },
      // ESSENCE CONVERSION
      /**
       * Convert shadows to essence by rank and quantity.
       * Selects weakest shadows of the given rank.
       * @param {string} rank - Rank of shadows to convert
       * @param {number} quantity - Number of shadows to convert
       * @returns {Promise<Object>} Conversion result
       */
      // SHADOW GRADE AUTO-PROMOTION
      // Promotes shadows through manhwa lore grades (Common→Elite→Knight→...→Grand Marshal)
      // using accumulated shadow essence. Runs automatically on a timer.
      async autoPromoteGrades() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u;
        const essenceConfig = ((_a = this.settings) == null ? void 0 : _a.shadowEssence) || this.defaultSettings.shadowEssence;
        if ((essenceConfig == null ? void 0 : essenceConfig.enabled) === false) return { promoted: 0 };
        const localEssence = (essenceConfig == null ? void 0 : essenceConfig.essence) || 0;
        if (localEssence <= 0) return { promoted: 0 };
        let vaultBalance = null;
        if (SLEvents2) {
          SLEvents2.emit("ItemVault:query", {
            itemId: "shadow_essence",
            callback: (result) => {
              vaultBalance = (result == null ? void 0 : result.amount) ?? 0;
            }
          });
        }
        const currentEssence = vaultBalance != null ? Math.min(localEssence, vaultBalance) : localEssence;
        if (currentEssence <= 0) return { promoted: 0 };
        const cooldownUntil = this._essenceSpendCooldownUntil || 0;
        if (Date.now() < cooldownUntil && currentEssence < (this._essenceSpendCooldownAmount || 0)) {
          return { promoted: 0 };
        }
        const gradeOrder = C2.SHADOW_GRADES;
        const isShadowMonarch = ((_c = (_b = this.getSoloLevelingData) == null ? void 0 : _b.call(this)) == null ? void 0 : _c.rank) === "Shadow Monarch";
        const maxGradeIndex = isShadowMonarch ? gradeOrder.length - 1 : gradeOrder.length - 2;
        const promotionCosts = (essenceConfig == null ? void 0 : essenceConfig.gradePromotionCost) || this.defaultSettings.shadowEssence.gradePromotionCost;
        let totalCount = 0;
        try {
          totalCount = await ((_e = (_d = this.storageManager) == null ? void 0 : _d.getTotalCount) == null ? void 0 : _e.call(_d)) || 0;
        } catch (_) {
        }
        const configuredBatch = (essenceConfig == null ? void 0 : essenceConfig.autoPromoteBatchSize) || 50;
        const batchSize = Math.min(500, Math.max(configuredBatch, Math.ceil(totalCount / 600)));
        const windowSize = batchSize * 4;
        if (this._gradePromoteLastKey === void 0) this._gradePromoteLastKey = null;
        let shadows = [];
        if ((_f = this.storageManager) == null ? void 0 : _f.getShadowsByKeyPage) {
          try {
            const page = await this.storageManager.getShadowsByKeyPage(this._gradePromoteLastKey, windowSize);
            shadows = page.shadows;
            this._gradePromoteLastKey = page.exhausted ? null : page.lastKey;
          } catch (error) {
            this.debugError("GRADE", "Failed to load shadows for grade promotion", error);
            return { promoted: 0 };
          }
        }
        if (shadows.length === 0) return { promoted: 0 };
        const rankOrder = this.shadowRanks || C2.SHADOW_RANKS || [];
        const withLevel = shadows.map((s) => {
          const grade = (s == null ? void 0 : s.grade) || (s == null ? void 0 : s.gr) || "Common";
          const rank = (s == null ? void 0 : s.r) || (s == null ? void 0 : s.rank) || "E";
          return {
            raw: s,
            level: (s == null ? void 0 : s.l) || (s == null ? void 0 : s.level) || 1,
            rankIndex: rankOrder.indexOf(rank),
            grade,
            gradeIndex: gradeOrder.indexOf(grade)
          };
        });
        const promotable = withLevel.filter((e) => e.gradeIndex >= 0 && e.gradeIndex < maxGradeIndex);
        if (promotable.length === 0) return { promoted: 0 };
        promotable.sort((a, b) => {
          if (a.gradeIndex !== b.gradeIndex) return a.gradeIndex - b.gradeIndex;
          if (b.rankIndex !== a.rankIndex) return b.rankIndex - a.rankIndex;
          return b.level - a.level;
        });
        let promoted = 0;
        let essenceSpent = 0;
        const essenceCostById = /* @__PURE__ */ new Map();
        let remainingEssence = currentEssence;
        const idsToPromote = [];
        for (let i = 0; i < promotable.length && promoted < batchSize; i++) {
          const entry = promotable[i];
          const currentGrade = entry.grade;
          const gradeIndex = gradeOrder.indexOf(currentGrade);
          if (gradeIndex < 0 || gradeIndex >= maxGradeIndex) continue;
          const nextGrade = gradeOrder[gradeIndex + 1];
          const cost = (promotionCosts == null ? void 0 : promotionCosts[nextGrade]) || 0;
          if (cost <= 0 || remainingEssence < cost) continue;
          const hierarchyCfg = this._getGradeHierarchyConfig();
          if (!this._officerSlotAvailable(entry.raw, nextGrade, hierarchyCfg)) continue;
          remainingEssence -= cost;
          essenceSpent += cost;
          promoted++;
          this._recordOfficerPromotion(entry.raw, entry.grade, nextGrade);
          const id = ((_g = this.getCacheKey) == null ? void 0 : _g.call(this, entry.raw)) || ((_h = entry.raw) == null ? void 0 : _h.id) || ((_i = entry.raw) == null ? void 0 : _i.i);
          if (id) {
            idsToPromote.push(id);
            essenceCostById.set(String(id), cost);
          }
        }
        if (promoted > 0) {
          essenceConfig.essence = Math.max(0, (essenceConfig.essence || 0) - essenceSpent);
          if (SLEvents2 && essenceSpent > 0) {
            let spendFailed = false;
            const onSpendFailed = (data) => {
              if ((data == null ? void 0 : data.itemId) === "shadow_essence") spendFailed = true;
            };
            SLEvents2.on("ItemVault:spendFailed", onSpendFailed);
            SLEvents2.emit("ItemVault:spend", {
              itemId: "shadow_essence",
              amount: essenceSpent,
              source: "ShadowArmy",
              reason: "grade_promotion"
            });
            SLEvents2.off("ItemVault:spendFailed", onSpendFailed);
            if (spendFailed) {
              this._essenceSpendCooldownUntil = Date.now() + 5 * 60 * 1e3;
              this._essenceSpendCooldownAmount = essenceSpent;
            }
          }
          await new Promise((r) => setTimeout(r, 0));
          if (((_j = this.storageManager) == null ? void 0 : _j.transformShadowsBatch) && idsToPromote.length > 0) {
            const { failedIds } = await this.storageManager.transformShadowsBatch(
              idsToPromote,
              (freshRecord) => {
                const isCompressed = !!freshRecord._c;
                const freshGrade = isCompressed ? freshRecord.gr || "Common" : freshRecord.grade || "Common";
                const freshGradeIndex = gradeOrder.indexOf(freshGrade);
                if (freshGradeIndex < 0 || freshGradeIndex >= maxGradeIndex) return null;
                const freshNextGrade = gradeOrder[freshGradeIndex + 1];
                if (isCompressed) {
                  freshRecord.gr = freshNextGrade;
                } else {
                  freshRecord.grade = freshNextGrade;
                }
                return freshRecord;
              }
            );
            if (failedIds.length > 0) {
              this.debugError("GRADE", `transformShadowsBatch: ${failedIds.length} promoted shadow(s) failed to save`, { failedIds });
              let refund = 0;
              for (const failedId of failedIds) {
                refund += Number(essenceCostById.get(String(failedId))) || 0;
              }
              if (refund > 0) {
                essenceConfig.essence = (essenceConfig.essence || 0) + refund;
                essenceSpent = Math.max(0, essenceSpent - refund);
                if (SLEvents2) {
                  try {
                    SLEvents2.emit("ItemVault:add", {
                      itemId: "shadow_essence",
                      amount: refund,
                      source: "ShadowArmy",
                      reason: "grade_promotion_refund"
                    });
                  } catch (_) {
                  }
                }
                (_k = this.debugLog) == null ? void 0 : _k.call(this, "GRADE", `Refunded ${refund} essence for ${failedIds.length} failed promotion(s)`);
              }
            }
          }
          (_l = this._invalidateSnapshot) == null ? void 0 : _l.call(this);
          this._gradeCacheTs = 0;
          this.saveSettings();
          (_m = this.debugLog) == null ? void 0 : _m.call(this, "GRADE", `Auto-promoted ${promoted} shadows (${essenceSpent.toLocaleString()} essence spent, ${remainingEssence.toLocaleString()} remaining)`);
        }
        const rankResult = { rankUps: 0, rankEssenceSpent: 0 };
        try {
          const rankCosts = (essenceConfig == null ? void 0 : essenceConfig.rankPromotionCost) || ((_o = (_n = this.defaultSettings) == null ? void 0 : _n.shadowEssence) == null ? void 0 : _o.rankPromotionCost);
          if (rankCosts && remainingEssence > 0 && promotable.length > 0) {
            const idsToRankUp = [];
            for (let i = 0; i < promotable.length && rankResult.rankUps < batchSize; i++) {
              const raw = (_p = promotable[i]) == null ? void 0 : _p.raw;
              if (!raw) continue;
              const gate = (_q = this.getRankUpEligibility) == null ? void 0 : _q.call(this, this.getShadowData(raw) || raw);
              if (!(gate == null ? void 0 : gate.eligible)) continue;
              const cost = Number(rankCosts[gate.nextRank]) || 0;
              if (cost <= 0 || remainingEssence < cost) continue;
              remainingEssence -= cost;
              rankResult.rankEssenceSpent += cost;
              rankResult.rankUps++;
              const id = ((_r = this.getCacheKey) == null ? void 0 : _r.call(this, raw)) || (raw == null ? void 0 : raw.id) || (raw == null ? void 0 : raw.i);
              if (id) idsToRankUp.push(id);
            }
            if (idsToRankUp.length > 0 && ((_s = this.storageManager) == null ? void 0 : _s.transformShadowsBatch)) {
              const { failedIds } = await this.storageManager.transformShadowsBatch(
                idsToRankUp,
                (freshRecord) => {
                  const shadow = this.getShadowData(freshRecord);
                  if (!shadow) return null;
                  const res = this.attemptAutoRankUp(shadow);
                  if (!(res == null ? void 0 : res.success)) return null;
                  return this.prepareShadowForSave(shadow);
                }
              );
              if (failedIds.length > 0) {
                this.debugError("RANK_UP", `transformShadowsBatch: ${failedIds.length} rank-up(s) failed to save`, { failedIds });
              }
            }
            if (rankResult.rankEssenceSpent > 0) {
              essenceConfig.essence = Math.max(0, (essenceConfig.essence || 0) - rankResult.rankEssenceSpent);
              (_t = this._invalidateSnapshot) == null ? void 0 : _t.call(this);
              this.saveSettings();
              (_u = this.debugLog) == null ? void 0 : _u.call(
                this,
                "RANK_UP",
                `Auto-ranked ${rankResult.rankUps} shadows (${rankResult.rankEssenceSpent.toLocaleString()} essence spent)`
              );
            }
          }
        } catch (error) {
          this.debugError("RANK_UP", "Rank promotion pass failed", error);
        }
        return {
          promoted,
          essenceSpent: essenceSpent + rankResult.rankEssenceSpent,
          remainingEssence,
          rankUps: rankResult.rankUps
        };
      },
      // DATA ACCESS & SAVE PREP
      /**
       * Get shadow in correct format (decompress if needed).
       * Used throughout plugin to handle both formats transparently.
       */
      getShadowData(shadow) {
        if (!shadow) return null;
        const decompressors = {
          1: this.decompressShadow,
          2: this.decompressShadowUltra
        };
        const decompressor = decompressors[shadow._c];
        return typeof decompressor === "function" ? decompressor.call(this, shadow) : shadow;
      },
      /**
       * Prepare shadow for saving to IndexedDB.
       * Removes compression markers and ensures clean save.
       * Compression system will re-compress weak shadows on next hourly run.
       */
      prepareShadowForSave(shadow) {
        if (!shadow) return null;
        if (shadow._c === 1 || shadow._c === 2) {
          const personalityKey = this.getShadowPersonalityKey(shadow);
          if (shadow.pk === personalityKey) {
            return shadow;
          }
          return {
            ...shadow,
            pk: personalityKey
          };
        }
        const {
          _compressed: _ignoredCompressed,
          _ultraCompressed: _ignoredUltra,
          ...shadowToSave
        } = shadow;
        const defaultStats = typeof this.createZeroStatBlock === "function" ? this.createZeroStatBlock() : C2.STAT_KEYS.reduce((stats, key) => {
          stats[key] = 0;
          return stats;
        }, {});
        shadowToSave.baseStats = shadowToSave.baseStats || { ...defaultStats };
        shadowToSave.growthStats = shadowToSave.growthStats || { ...defaultStats };
        shadowToSave.naturalGrowthStats = shadowToSave.naturalGrowthStats || { ...defaultStats };
        shadowToSave.personalityKey = this.getShadowPersonalityKey(shadowToSave);
        if (!shadowToSave.personality && shadowToSave.personalityKey) {
          shadowToSave.personality = shadowToSave.personalityKey;
        }
        if ((!shadowToSave.strength || shadowToSave.strength === 0) && typeof this.calculateShadowPower === "function") {
          const decompressed = this.getShadowData ? this.getShadowData(shadowToSave) : shadowToSave;
          const effective = typeof this.getShadowEffectiveStats === "function" ? this.getShadowEffectiveStats(decompressed) : null;
          if (effective) {
            shadowToSave.strength = this.calculateShadowPower(effective, 1);
          } else if (decompressed == null ? void 0 : decompressed.baseStats) {
            shadowToSave.strength = this.calculateShadowPower(decompressed.baseStats, 1);
          }
        }
        return shadowToSave;
      },
      // ── COMMAND HIERARCHY ───────────────────────────────────────────────────────
      // One Grand Marshal per species, a handful of Marshal co-commanders, a
      // proportional officer corps of Generals — the Igris/Beru/Bellion structure.
      _getShadowSpeciesKey(s) {
        return String(
          (s == null ? void 0 : s.beastFamily) || (s == null ? void 0 : s.bf) || (s == null ? void 0 : s.beastType) || (s == null ? void 0 : s.bt) || (s == null ? void 0 : s.role) || (s == null ? void 0 : s.ro) || "shadow"
        );
      },
      _getGradeHierarchyConfig() {
        var _a, _b, _c, _d;
        const cfg = ((_b = (_a = this.settings) == null ? void 0 : _a.shadowEssence) == null ? void 0 : _b.gradeHierarchy) || ((_d = (_c = this.defaultSettings) == null ? void 0 : _c.shadowEssence) == null ? void 0 : _d.gradeHierarchy) || {};
        return {
          enabled: cfg.enabled !== false,
          grandMarshalPerSpecies: Math.max(1, Math.floor(cfg.grandMarshalPerSpecies ?? 1)),
          marshalPerSpecies: Math.max(1, Math.floor(cfg.marshalPerSpecies ?? 4)),
          generalPerTroops: Math.max(10, Math.floor(cfg.generalPerTroops ?? 50)),
          generalMinPerSpecies: Math.max(1, Math.floor(cfg.generalMinPerSpecies ?? 5))
        };
      },
      _generalCapForSpecies(total, cfg) {
        return Math.max(cfg.generalMinPerSpecies, Math.floor(total / cfg.generalPerTroops));
      },
      // Species/grade census: { species: { total, officers: {General,Marshal,'Grand Marshal'} } }.
      // Streamed in batches off the raw store (compressed-field reads only), cached
      // 5 min, and kept consistent cycle-locally by the promote loop's own updates.
      async _buildSpeciesGradeCensus(force = false) {
        const now = Date.now();
        if (!force && this._speciesCensus && now - (this._speciesCensusTime || 0) < 3e5) {
          return this._speciesCensus;
        }
        if (!force && this._speciesCensus && (this._armyWriteGen || 0) === (this._speciesCensusGen || 0)) {
          this._speciesCensusTime = now;
          return this._speciesCensus;
        }
        if (this._speciesCensusInFlight) return this._speciesCensusInFlight;
        const genAtStart = this._armyWriteGen || 0;
        const run = (async () => {
          var _a;
          const census = {};
          const bump = (s) => {
            const key = this._getShadowSpeciesKey(s);
            const grade = (s == null ? void 0 : s.grade) || (s == null ? void 0 : s.gr) || "Common";
            const entry = census[key] || (census[key] = { total: 0, officers: { General: 0, Marshal: 0, "Grand Marshal": 0 } });
            entry.total++;
            if (entry.officers[grade] !== void 0) entry.officers[grade]++;
          };
          try {
            if ((_a = this.storageManager) == null ? void 0 : _a.forEachShadowBatchPaged) {
              await this.storageManager.forEachShadowBatchPaged(
                (batch) => {
                  for (let i = 0; i < batch.length; i++) bump(batch[i]);
                },
                { batchSize: 500 }
              );
            } else {
              for (const s of this.settings.shadows || []) bump(s);
            }
            this._speciesCensus = census;
            this._speciesCensusTime = Date.now();
            this._speciesCensusGen = genAtStart;
            return census;
          } finally {
            this._speciesCensusInFlight = null;
          }
        })();
        this._speciesCensusInFlight = run;
        return run;
      },
      // Synchronous slot check for the promote loop. Census may still be building
      // on the very first cycle — officer promotions simply wait for it (lower
      // grades keep flowing). The loop passes its own cycle-local increments via
      // the census object itself (we mutate counts on grant).
      _officerSlotAvailable(raw, nextGrade, cfg) {
        if (!cfg.enabled) return true;
        if (nextGrade !== "General" && nextGrade !== "Marshal" && nextGrade !== "Grand Marshal") return true;
        const census = this._speciesCensus;
        if (!census) {
          this._buildSpeciesGradeCensus().catch((error) => {
            var _a;
            (_a = this.debugError) == null ? void 0 : _a.call(
              this,
              "GRADE",
              "Species-grade census build failed \u2014 officer promotions stay deferred until it succeeds",
              error
            );
          });
          return false;
        }
        const key = this._getShadowSpeciesKey(raw);
        const entry = census[key];
        if (!entry) return false;
        if (nextGrade === "Grand Marshal") return entry.officers["Grand Marshal"] < cfg.grandMarshalPerSpecies;
        if (nextGrade === "Marshal") return entry.officers.Marshal < cfg.marshalPerSpecies;
        return entry.officers.General < this._generalCapForSpecies(entry.total, cfg);
      },
      _recordOfficerPromotion(raw, fromGrade, toGrade) {
        const census = this._speciesCensus;
        if (!census) return;
        const entry = census[this._getShadowSpeciesKey(raw)];
        if (!entry) return;
        if (entry.officers[fromGrade] !== void 0) entry.officers[fromGrade] = Math.max(0, entry.officers[fromGrade] - 1);
        if (entry.officers[toGrade] !== void 0) entry.officers[toGrade]++;
      },
      // One-shot army restructure: enforce the hierarchy on an army that was
      // promoted before the caps existed. Per species, the best officer (rank,
      // then strength, then level) holds each slot: 1 Grand Marshal, then the
      // Marshal co-commanders, then the General corps; every displaced officer
      // steps down to the next tier below, overflow landing at Elite Knight.
      // The FULL essence difference between old and new grade is refunded —
      // the Monarch reorganizes his army, he does not squander it.
      async reconcileGradeHierarchy() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _i;
        const cfg = this._getGradeHierarchyConfig();
        if (!cfg.enabled) return { changed: 0 };
        const gradeOrder = C2.SHADOW_GRADES;
        const costs = ((_b = (_a = this.settings) == null ? void 0 : _a.shadowEssence) == null ? void 0 : _b.gradePromotionCost) || this.defaultSettings.shadowEssence.gradePromotionCost;
        const gradeCost = (grade) => {
          let sum = 0;
          for (let i = 1; i <= gradeOrder.indexOf(grade); i++) sum += costs[gradeOrder[i]] || 0;
          return sum;
        };
        const species = {};
        const { getRankIndex } = require_rank_utils();
        const rankFixes = [];
        const collect = (s) => {
          const shadowRank = (s == null ? void 0 : s.rank) || (s == null ? void 0 : s.r);
          if (shadowRank === "Shadow Monarch") {
            if (s.rank !== void 0 || !s._c) s.rank = "Monarch+";
            if (s.r !== void 0 || s._c) s.r = "Monarch+";
            rankFixes.push(s);
          }
          const key = this._getShadowSpeciesKey(s);
          const entry = species[key] || (species[key] = { total: 0, officers: [] });
          entry.total++;
          const grade = (s == null ? void 0 : s.grade) || (s == null ? void 0 : s.gr) || "Common";
          const gradeIdx = gradeOrder.indexOf(grade);
          if (gradeIdx >= gradeOrder.indexOf("General")) {
            entry.officers.push({
              raw: s,
              gradeIdx,
              rankIdx: getRankIndex((s == null ? void 0 : s.rank) || (s == null ? void 0 : s.r) || "E"),
              str: Number(s == null ? void 0 : s.strength) || 0,
              level: Number((s == null ? void 0 : s.level) || (s == null ? void 0 : s.l)) || 1
            });
          }
        };
        if ((_c = this.storageManager) == null ? void 0 : _c.forEachShadowBatchPaged) {
          await this.storageManager.forEachShadowBatchPaged(
            (batch) => {
              for (let i = 0; i < batch.length; i++) collect(batch[i]);
            },
            { batchSize: 500 }
          );
        } else {
          for (const s of this.settings.shadows || []) collect(s);
        }
        const toSave = [];
        let refund = 0;
        let demoted = 0;
        const best = (a, b) => b.rankIdx - a.rankIdx || b.str - a.str || b.level - a.level;
        const idxOf = (g) => gradeOrder.indexOf(g);
        const applyGrade = (o, targetGrade) => {
          const currentGrade = gradeOrder[o.gradeIdx];
          if (idxOf(targetGrade) >= o.gradeIdx) return;
          refund += Math.max(0, gradeCost(currentGrade) - gradeCost(targetGrade));
          if (o.raw.grade !== void 0 || !o.raw._c) o.raw.grade = targetGrade;
          if (o.raw.gr !== void 0 || o.raw._c) o.raw.gr = targetGrade;
          toSave.push(o.raw);
          demoted++;
        };
        for (const [, entry] of Object.entries(species)) {
          if (entry.officers.length === 0) continue;
          const gmCap = cfg.grandMarshalPerSpecies;
          const marshalCap = cfg.marshalPerSpecies;
          const generalCap = this._generalCapForSpecies(entry.total, cfg);
          const gms = entry.officers.filter((o) => o.gradeIdx === idxOf("Grand Marshal")).sort(best);
          const gmOverflow = gms.slice(gmCap);
          const marshals = entry.officers.filter((o) => o.gradeIdx === idxOf("Marshal"));
          const marshalPool = marshals.concat(gmOverflow).sort(best);
          const marshalKeep = new Set(marshalPool.slice(0, marshalCap));
          const marshalOverflow = marshalPool.slice(marshalCap);
          for (const o of marshalPool) {
            if (marshalKeep.has(o)) {
              if (o.gradeIdx !== idxOf("Marshal")) applyGrade(o, "Marshal");
            }
          }
          const generals = entry.officers.filter((o) => o.gradeIdx === idxOf("General"));
          const generalPool = generals.concat(marshalOverflow).sort(best);
          const generalKeep = new Set(generalPool.slice(0, generalCap));
          for (const o of generalPool) {
            if (generalKeep.has(o)) {
              if (o.gradeIdx !== idxOf("General")) applyGrade(o, "General");
            } else applyGrade(o, "Elite Knight");
          }
        }
        for (const s of rankFixes) {
          if (!toSave.includes(s)) toSave.push(s);
        }
        if (rankFixes.length > 0) {
          (_d = this.debugLog) == null ? void 0 : _d.call(this, "GRADE", `Purged Shadow Monarch rank from ${rankFixes.length} shadow(s) \u2192 Monarch+`);
        }
        if (toSave.length > 0) {
          const CHUNK = 400;
          for (let i = 0; i < toSave.length; i += CHUNK) {
            const chunk = toSave.slice(i, i + CHUNK);
            try {
              if ((_e = this.storageManager) == null ? void 0 : _e.saveShadowsBatch) await this.storageManager.saveShadowsBatch(chunk);
              else for (const s of chunk) await ((_g = (_f = this.storageManager) == null ? void 0 : _f.saveShadow) == null ? void 0 : _g.call(_f, s));
            } catch (error) {
              this.debugError("GRADE", "Hierarchy restructure save chunk failed", error);
            }
          }
          if (refund > 0) {
            const essenceConfig = ((_h = this.settings) == null ? void 0 : _h.shadowEssence) || this.defaultSettings.shadowEssence;
            essenceConfig.essence = Math.max(0, (essenceConfig.essence || 0) + refund);
            try {
              SLEvents2 == null ? void 0 : SLEvents2.emit("ItemVault:add", {
                itemId: "shadow_essence",
                amount: refund,
                source: "grade_restructure"
              });
            } catch (_) {
            }
            this.saveSettings();
          }
          (_i = this._invalidateSnapshot) == null ? void 0 : _i.call(this);
          this._gradeCacheTs = 0;
          this._speciesCensus = null;
          this._toast(
            `Army restructured: ${demoted} officers stepped down across ${Object.keys(species).length} species \u2014 ${refund.toLocaleString()} essence returned to the Monarch.`,
            "success"
          );
        }
        return { changed: demoted, refund, species: Object.keys(species).length };
      }
    };
  }
});

// src/ShadowArmy/styles.css
var require_styles = __commonJS({
  "src/ShadowArmy/styles.css"(exports2, module2) {
    module2.exports = `/* Font override \u2014 all text in this plugin uses Friend or Foe BB
   EXCLUDES: .shadow-extraction-title (Speedy Space Goat Oddity)
             .sa-arise-* (font set dynamically by animation.js) */
.shadow-army-settings,
.shadow-army-settings *,
.shadow-extraction-content .shadow-extraction-info,
.shadow-extraction-content .shadow-rank,
.shadow-extraction-content .shadow-role {
  font-family: 'Friend or Foe BB', sans-serif !important;
}

/* ShadowArmy \u2014 Static CSS
 * Extraction animation, ARISE animation, settings panel, widget button.
 * Imported as text string by esbuild (loader: { ".css": "text" }).
 *
 * NOTE: .sa-arise-text font-family is dynamic (settings-dependent).
 *       animation.js overrides it at injection time via template literal.
 */

/* \u2500\u2500 Extraction Animation \u2500\u2500 */

.shadow-army-extraction-animation {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10000;
  pointer-events: none;
  animation: shadowExtract 2s ease-out;
}

.shadow-extraction-content {
  background: rgba(0, 0, 0, 0.9);
  border: 2px solid #8a2be2;
  border-radius: 2px;
  padding: 20px 30px;
  text-align: center;
  box-shadow: 0 0 20px rgba(138, 43, 226, 0.6);
}

.shadow-extraction-title {
  font-family: 'Speedy Space Goat Oddity', 'Orbitron', sans-serif !important;
  font-size: 32px;
  font-weight: 700;
  color: #9370db;
  text-shadow: 0 0 10px rgba(138, 43, 226, 0.8);
  margin-bottom: 10px;
  animation: glow 1s ease-in-out infinite alternate;
}

.shadow-extraction-info {
  color: #d4a5ff;
  font-size: 16px;
}

.shadow-rank {
  font-weight: 700;
  margin-bottom: 5px;
}

.shadow-role {
  font-size: 14px;
  opacity: 0.8;
}

@keyframes shadowExtract {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.5);
  }
  20% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.1);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1);
  }
}

@keyframes glow {
  from {
    text-shadow: 0 0 10px rgba(138, 43, 226, 0.8);
  }
  to {
    text-shadow: 0 0 20px rgba(138, 43, 226, 1), 0 0 30px rgba(138, 43, 226, 0.6);
  }
}

.shadow-army-extraction-animation.fade-out {
  animation: fadeOut 0.5s ease-out forwards;
}

@keyframes fadeOut {
  to {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.8);
  }
}

/* \u2500\u2500 ARISE Animation \u2500\u2500 */

.sa-animation-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 999999;
}

.sa-arise-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  animation: sa-arise-float var(--sa-duration, 2.5s) ease-out forwards;
}

.sa-arise-text {
  /* font-family is set dynamically by animation.js (settings-dependent) */
  font-weight: 700;
  font-size: 42px;
  line-height: 1.12;
  letter-spacing: 0.12em;
  text-transform: none; /* Preserve "ARiSe" casing */
  color: #ffffff;
  text-shadow:
    0 0 6px rgba(138, 43, 226, 0.9),
    0 0 14px rgba(138, 43, 226, 0.7),
    0 0 28px rgba(138, 43, 226, 0.5),
    0 0 42px rgba(75, 0, 130, 0.4);
  animation: sa-arise-glow 0.7s ease-in-out infinite alternate;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

.sa-arise-text .sa-small-s {
  font-size: 0.8em !important;
  display: inline-block !important;
}

.sa-arise-text .sa-small-r {
  font-size: 0.72em !important;
  display: inline-block !important;
}

.sa-arise-text .sa-mid-i {
  font-size: 0.9em !important;
  display: inline-block !important;
}

.sa-arise-text .sa-mid-e {
  font-size: 1em !important;
  display: inline-block !important;
}

.sa-arise-meta {
  margin-top: calc(4px + (var(--sa-scale, 1) - 1) * 4px);
  font-family: 'Orbitron', system-ui, sans-serif;
  font-size: 16px;
  font-weight: 900;
  line-height: 1.25;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  background: linear-gradient(180deg, #d8b4fe 0%, #7e22ce 58%, #09060d 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 1px rgba(147, 51, 234, 0.9);
  text-shadow:
    0 0 4px rgba(147, 51, 234, 0.9),
    0 0 10px rgba(147, 51, 234, 0.65),
    0 0 18px rgba(45, 15, 65, 0.45);
}

.sa-arise-particle {
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 999px;
  background: radial-gradient(circle, #9333ea 0%, rgba(75, 0, 130, 0) 70%);
  animation: sa-arise-particle-fade var(--sa-duration, 2.5s) ease-out forwards;
}

@keyframes sa-arise-float {
  0% {
    opacity: 0;
    transform: translate(-50%, -40%) scale(calc(0.6 * var(--sa-scale, 1)));
  }
  15% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(calc(1.1 * var(--sa-scale, 1)));
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -70%) scale(calc(0.9 * var(--sa-scale, 1)));
  }
}

@keyframes sa-arise-glow {
  from {
    filter:
      drop-shadow(0 0 8px rgba(138, 43, 226, 0.8))
      drop-shadow(0 0 16px rgba(75, 0, 130, 0.6));
  }
  to {
    filter:
      drop-shadow(0 0 14px rgba(138, 43, 226, 1))
      drop-shadow(0 0 30px rgba(147, 51, 234, 0.8));
  }
}

@keyframes sa-arise-particle-fade {
  0% {
    opacity: 1;
    transform: translate(0, 0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(var(--sa-particle-x, 0px), var(--sa-particle-y, -140px)) scale(0);
  }
}

/* \u2500\u2500 Settings Panel \u2500\u2500 */

.shadow-army-settings {
  padding: 10px;
  color: #d4a5ff;
  max-width: 600px;
  width: 100%;
  box-sizing: border-box;
  background: rgba(10, 10, 16, 0.98);
  border-radius: 2px;
}

.shadow-army-settings h2,
.shadow-army-settings h3 {
  margin: 4px 0;
}

.shadow-army-stats > div,
.shadow-army-config > div {
  margin: 2px 0;
}
`;
  }
});

// src/ShadowArmy/animation.js
var require_animation = __commonJS({
  "src/ShadowArmy/animation.js"(exports2, module2) {
    var STATIC_CSS = require_styles();
    var C2 = require_constants();
    module2.exports = {
      // FONT LOADING
      /**
       * Load font for ARISE animation (Speedy Space Goat Oddity).
       * Delegates to CriticalHit's font loader if available, with retry.
       */
      loadAriseAnimationFont() {
        var _a, _b;
        const fontName = ((_b = (_a = this.settings) == null ? void 0 : _a.ariseAnimation) == null ? void 0 : _b.animationFont) || "Speedy Space Goat Oddity";
        const fontStyleId = `cha-font-${fontName.replace(/\s+/g, "-").toLowerCase()}`;
        if (document.getElementById(fontStyleId)) {
          this.debugLog("FONT_LOADER", "Font already loaded (likely by CriticalHit plugin)", {
            fontName,
            fontStyleId
          });
          return true;
        }
        let retryCount = 0;
        const maxRetries = 3;
        const retryDelay = 500;
        const attemptLoad = () => {
          var _a2, _b2, _c;
          if (this._isStopped) return false;
          try {
            if (!BdApi.Plugins.isEnabled("CriticalHit")) return false;
            const criticalHitPlugin = BdApi.Plugins.get("CriticalHit");
            if (criticalHitPlugin) {
              const instance = criticalHitPlugin.instance || criticalHitPlugin;
              if (instance && typeof instance.loadLocalFont === "function") {
                const loaded2 = instance.loadLocalFont(fontName);
                if (loaded2) {
                  if (document.getElementById(fontStyleId)) {
                    this.debugLog("FONT_LOADER", "Font loaded via CriticalHit plugin", {
                      fontName,
                      fontStyleId
                    });
                    return true;
                  }
                  const verifyTimeoutId = setTimeout(() => {
                    var _a3;
                    (_a3 = this._retryTimeouts) == null ? void 0 : _a3.delete(verifyTimeoutId);
                    if (this._isStopped) return;
                    if (document.getElementById(fontStyleId)) {
                      this.debugLog(
                        "FONT_LOADER",
                        "Font loaded via CriticalHit plugin (verified after delay)",
                        { fontName, fontStyleId }
                      );
                    } else {
                      this.debugLog(
                        "FONT_LOADER",
                        "CriticalHit.loadLocalFont returned true but font style not found after delay",
                        { fontName, fontStyleId }
                      );
                    }
                  }, 100);
                  (_a2 = this._retryTimeouts) == null ? void 0 : _a2.add(verifyTimeoutId);
                  return true;
                }
                const alternativeNames = [
                  "Speedy Space Goat Oddity",
                  "SpeedySpaceGoatOddity",
                  "speedy space goat oddity"
                ];
                for (const altName of alternativeNames) {
                  if (altName !== fontName && instance.loadLocalFont(altName)) {
                    const altStyleId = `cha-font-${altName.replace(/\s+/g, "-").toLowerCase()}`;
                    if (document.getElementById(altStyleId) || document.getElementById(fontStyleId)) {
                      this.debugLog(
                        "FONT_LOADER",
                        "Font loaded via CriticalHit with alternative name",
                        { originalName: fontName, loadedName: altName }
                      );
                      return true;
                    }
                    return true;
                  }
                }
              } else if (retryCount < maxRetries) {
                retryCount++;
                this.debugLog("FONT_LOADER", "CriticalHit not ready, retrying...", {
                  fontName,
                  retryCount,
                  maxRetries
                });
                const retryTimeoutId = setTimeout(() => {
                  var _a3;
                  (_a3 = this._retryTimeouts) == null ? void 0 : _a3.delete(retryTimeoutId);
                  if (this._isStopped) return;
                  attemptLoad();
                }, retryDelay);
                (_b2 = this._retryTimeouts) == null ? void 0 : _b2.add(retryTimeoutId);
                return false;
              }
            } else if (retryCount < maxRetries) {
              retryCount++;
              this.debugLog("FONT_LOADER", "CriticalHit plugin not found, retrying...", {
                fontName,
                retryCount,
                maxRetries
              });
              const retryTimeoutId = setTimeout(() => {
                var _a3;
                (_a3 = this._retryTimeouts) == null ? void 0 : _a3.delete(retryTimeoutId);
                if (this._isStopped) return;
                attemptLoad();
              }, retryDelay);
              (_c = this._retryTimeouts) == null ? void 0 : _c.add(retryTimeoutId);
              return false;
            }
          } catch (error) {
            this.debugError("FONT_LOADER", "Error loading font via CriticalHit", {
              fontName,
              error: error == null ? void 0 : error.message,
              retryCount
            });
          }
          return false;
        };
        const loaded = attemptLoad();
        if (loaded) return true;
        this.debugLog("FONT_LOADER", "Font not yet loaded, will use fallback until available", {
          fontName,
          fontStyleId,
          retryCount,
          note: "If CriticalHit plugin is enabled, it will load this font automatically."
        });
        return false;
      },
      // CSS INJECTION / REMOVAL
      /**
       * Inject all static CSS + dynamic font-family override for .sa-arise-text.
       */
      injectCSS() {
        var _a, _b;
        const styleId = "shadow-army-styles";
        if (!this._injectedStyles) {
          this._injectedStyles = /* @__PURE__ */ new Set();
        }
        const fontName = ((_b = (_a = this.settings) == null ? void 0 : _a.ariseAnimation) == null ? void 0 : _b.animationFont) || "Speedy Space Goat Oddity";
        const dynamicFontOverride = `
.sa-arise-text {
  font-family: '${fontName}', 'Orbitron', system-ui, sans-serif !important;
}`;
        const cssContent = STATIC_CSS + "\n" + dynamicFontOverride;
        try {
          BdApi.DOM.addStyle(styleId, cssContent);
        } catch (error) {
          const style = document.createElement("style");
          style.id = styleId;
          style.textContent = cssContent;
          document.head.appendChild(style);
          this.debugError("CSS", "BdApi.DOM.addStyle failed, using fallback for main CSS", error);
        }
      },
      /**
       * Remove injected CSS styles.
       */
      removeCSS() {
        const styleId = "shadow-army-styles";
        this.removeCSSById(styleId);
      },
      // ARISE ANIMATION SYSTEM
      /**
       * Initialize ARISE animation system.
       * Webpack modules → React injection → DOM fallback container.
       */
      initializeAriseAnimationSystem() {
        var _a, _b;
        if (!((_b = (_a = this.settings) == null ? void 0 : _a.ariseAnimation) == null ? void 0 : _b.enabled)) {
          this.debugLog("ARISE_ANIMATION", "ARISE animation disabled in settings");
          return;
        }
        this.initializeWebpackModules();
        if (this.webpackModuleAccess) {
          this.tryReactInjection();
        }
        this.getContainer();
      },
      /**
       * Cleanup ARISE animation system.
       */
      cleanupAriseAnimationSystem() {
        if (this.reactInjectionActive) {
          try {
            BdApi.Patcher.unpatchAll("ShadowArmy-AriseAnimation");
            this.reactInjectionActive = false;
            this.debugLog("ARISE_ANIMATION", "Webpack patches and React injection removed");
          } catch (error) {
            this.debugError("ARISE_ANIMATION", "Error during cleanup", error);
          }
        }
        this.webpackModules = {
          UserStore: null,
          ChannelStore: null,
          PermissionStore: null,
          Permissions: null
        };
        this.webpackModuleAccess = false;
        this.removeAllAnimations();
      },
      /**
       * Initialize Webpack modules for better Discord integration.
       */
      initializeWebpackModules() {
        try {
          const { Webpack } = BdApi;
          this.webpackModules.UserStore = Webpack.getStore("UserStore");
          this.webpackModules.ChannelStore = Webpack.getStore("ChannelStore");
          const { UserStore, ChannelStore } = this.webpackModules;
          this.webpackModuleAccess = Boolean(UserStore && ChannelStore);
          this.debugLog("ARISE_ANIMATION", "Webpack module access initialized", {
            hasUserStore: Boolean(UserStore),
            hasChannelStore: Boolean(ChannelStore),
            access: this.webpackModuleAccess
          });
        } catch (error) {
          this.debugError("ARISE_ANIMATION", "Webpack initialization error", error);
          this.webpackModuleAccess = false;
        }
      },
      /**
       * Attempt React injection of animation container into Discord's React tree.
       */
      tryReactInjection() {
        try {
          const _mcStrings = ["baseLayer", "appMount", "app-mount"];
          let MainContent = null, _mcKey = "Z";
          if (typeof BdApi.Webpack.getWithKey === "function") {
            for (const s of _mcStrings) {
              try {
                const r = BdApi.Webpack.getWithKey(
                  (m) => typeof m === "function" && m.toString().includes(s)
                );
                if (r && r[0]) {
                  MainContent = r[0];
                  _mcKey = r[1];
                  break;
                }
              } catch (_) {
              }
            }
          }
          if (!MainContent) {
            for (const s of _mcStrings) {
              try {
                const mod = BdApi.Webpack.getByStrings(s, { defaultExport: false });
                if (mod) {
                  for (const k of ["Z", "ZP", "default"]) {
                    if (typeof mod[k] === "function") {
                      MainContent = mod;
                      _mcKey = k;
                      break;
                    }
                  }
                  if (!MainContent) {
                    const k = Object.keys(mod).find((k2) => typeof mod[k2] === "function");
                    if (k) {
                      MainContent = mod;
                      _mcKey = k;
                    }
                  }
                  if (MainContent) break;
                }
              } catch (_) {
              }
            }
          }
          if (!MainContent) {
            this.debugLog(
              "ARISE_ANIMATION",
              "MainContent component not found (all strategies exhausted), using DOM fallback"
            );
            return;
          }
          const React = BdApi.React;
          const pluginInstance = this;
          BdApi.Patcher.after(
            "ShadowArmy-AriseAnimation",
            MainContent,
            _mcKey,
            (thisObject, args, returnValue) => {
              var _a;
              try {
                const bodyPath = BdApi.Utils.findInTree(
                  returnValue,
                  (node) => node && node.props && node.props.children && node.props.className
                );
                if (!bodyPath || !bodyPath.props || !bodyPath.props.children) return;
                const hasContainer = BdApi.Utils.findInTree(
                  bodyPath.props.children,
                  (node) => node && node.props && node.props.className === "sa-animation-container"
                );
                if (hasContainer) return;
                const containerElement = React.createElement("div", {
                  className: "sa-animation-container",
                  key: "sa-animation-container"
                });
                if (Array.isArray(bodyPath.props.children)) {
                  bodyPath.props.children.push(containerElement);
                } else {
                  bodyPath.props.children = [bodyPath.props.children, containerElement];
                }
                const containerRefTimeoutId = setTimeout(() => {
                  var _a2;
                  (_a2 = pluginInstance._retryTimeouts) == null ? void 0 : _a2.delete(containerRefTimeoutId);
                  if (pluginInstance._isStopped) return;
                  const domContainer = document.querySelector(".sa-animation-container");
                  if (domContainer) {
                    pluginInstance.animationContainer = domContainer;
                    pluginInstance.debugLog(
                      "ARISE_ANIMATION",
                      "Animation container injected successfully"
                    );
                  }
                }, 100);
                (_a = pluginInstance._retryTimeouts) == null ? void 0 : _a.add(containerRefTimeoutId);
              } catch (error) {
                pluginInstance.debugError("ARISE_ANIMATION", "React injection error", error);
              }
            }
          );
          this.reactInjectionActive = true;
          this.debugLog("ARISE_ANIMATION", "React injection setup complete");
        } catch (error) {
          this.debugError("ARISE_ANIMATION", "React injection setup error", error);
          this.createContainerDOM();
        }
      },
      /**
       * Get or create animation container element.
       */
      getContainer() {
        var _a;
        if (this.animationContainer) return this.animationContainer;
        if (this.webpackModuleAccess && !this.reactInjectionActive) {
          this.tryReactInjection();
          const reactFallbackTimeoutId = setTimeout(() => {
            var _a2;
            (_a2 = this._retryTimeouts) == null ? void 0 : _a2.delete(reactFallbackTimeoutId);
            if (this._isStopped) return;
            if (!this.animationContainer) {
              this.createContainerDOM();
            }
          }, 200);
          (_a = this._retryTimeouts) == null ? void 0 : _a.add(reactFallbackTimeoutId);
          return this.animationContainer;
        }
        this.createContainerDOM();
        return this.animationContainer;
      },
      /**
       * Create animation container using DOM (fallback method).
       */
      createContainerDOM() {
        const existing = document.querySelector(".sa-animation-container");
        if (existing) {
          this.animationContainer = existing;
          return;
        }
        const container = document.createElement("div");
        container.className = "sa-animation-container";
        document.body.appendChild(container);
        this.animationContainer = container;
        this.debugLog("ARISE_ANIMATION", "Created animation container via DOM fallback");
      },
      /**
       * Remove all animations and clean up container.
       */
      removeAllAnimations() {
        var _a;
        ((_a = this.animationContainer) == null ? void 0 : _a.parentNode) && (this.animationContainer.parentNode.removeChild(this.animationContainer), this.animationContainer = null);
      },
      // EXTRACTION ANIMATION (Simple fallback when ARISE disabled)
      /**
       * Show extraction animation for a shadow.
       * Uses ARISE animation if enabled, otherwise simple inline fallback.
       */
      showExtractionAnimation(shadow) {
        var _a, _b, _c;
        if (!shadow) return;
        if (this._isStopped) return;
        if ((_b = (_a = this.settings) == null ? void 0 : _a.ariseAnimation) == null ? void 0 : _b.enabled) {
          this.queueAriseAnimation(shadow);
          return;
        }
        const animation = document.createElement("div");
        animation.className = "shadow-army-extraction-animation";
        const content = document.createElement("div");
        content.className = "shadow-extraction-content";
        const title = document.createElement("div");
        title.className = "shadow-extraction-title";
        title.textContent = "ARISE";
        const info = document.createElement("div");
        info.className = "shadow-extraction-info";
        const rank = document.createElement("div");
        rank.className = "shadow-rank";
        rank.textContent = shadow.rank || "";
        const role = document.createElement("div");
        role.className = "shadow-role";
        role.textContent = shadow.roleName || shadow.role || "";
        info.appendChild(rank);
        info.appendChild(role);
        content.appendChild(title);
        content.appendChild(info);
        animation.appendChild(content);
        document.body.appendChild(animation);
        const fadeOutId = setTimeout(() => {
          var _a2, _b2;
          (_a2 = this._retryTimeouts) == null ? void 0 : _a2.delete(fadeOutId);
          animation.classList.add("fade-out");
          const removeId = setTimeout(() => {
            var _a3;
            (_a3 = this._retryTimeouts) == null ? void 0 : _a3.delete(removeId);
            animation.remove();
          }, 500);
          (_b2 = this._retryTimeouts) == null ? void 0 : _b2.add(removeId);
        }, 2e3);
        (_c = this._retryTimeouts) == null ? void 0 : _c.add(fadeOutId);
      },
      // ARISE QUEUE / THROTTLE
      getAriseAnimationMinGapMs() {
        var _a;
        const ariseConfig = ((_a = this.settings) == null ? void 0 : _a.ariseAnimation) || this.defaultSettings.ariseAnimation;
        const value = Number(ariseConfig == null ? void 0 : ariseConfig.minGapMs);
        return Number.isFinite(value) ? Math.max(250, value) : 900;
      },
      queueAriseAnimation(shadow) {
        if (!shadow) return;
        if (this._isStopped) return;
        const minGapMs = this.getAriseAnimationMinGapMs();
        const elapsed = Date.now() - (this._lastAriseAnimationAt || 0);
        if (!this._ariseDrainTimeout && elapsed >= minGapMs) {
          this.triggerAriseNow(shadow);
          return;
        }
        this._pendingAriseShadow = shadow;
        this.schedulePendingAriseAnimation();
      },
      schedulePendingAriseAnimation() {
        var _a;
        if (this._isStopped) return;
        if (!this._pendingAriseShadow) return;
        if (this._ariseDrainTimeout) return;
        const minGapMs = this.getAriseAnimationMinGapMs();
        const elapsed = Date.now() - (this._lastAriseAnimationAt || 0);
        const waitMs = Math.max(0, minGapMs - elapsed);
        const queueTimeoutId = setTimeout(() => {
          var _a2;
          (_a2 = this._retryTimeouts) == null ? void 0 : _a2.delete(queueTimeoutId);
          this._ariseDrainTimeout = null;
          if (this._isStopped) return;
          const nextShadow = this._pendingAriseShadow;
          this._pendingAriseShadow = null;
          if (nextShadow) {
            this.triggerAriseNow(nextShadow);
          }
        }, waitMs);
        this._ariseDrainTimeout = queueTimeoutId;
        (_a = this._retryTimeouts) == null ? void 0 : _a.add(queueTimeoutId);
      },
      triggerAriseNow(shadow) {
        if (!shadow) return;
        try {
          this.triggerArise(shadow);
          this._lastAriseAnimationAt = Date.now();
        } catch (error) {
          this.debugError("ANIMATION", "Error triggering ARISE animation", error);
        }
      },
      // ARISE ANIMATION — triggerArise (SVG + styled text fallback + particles)
      /**
       * Trigger ARISE animation for a given shadow.
       * SVG-first with styled text fallback, particle effects, font verification.
       */
      triggerArise(shadow) {
        var _a, _b, _c, _d;
        if (!((_b = (_a = this.settings) == null ? void 0 : _a.ariseAnimation) == null ? void 0 : _b.enabled)) return;
        if (typeof document === "undefined") return;
        const container = this.getContainer();
        const ariseSettings = this.settings.ariseAnimation;
        const durationMs = ariseSettings.animationDuration || 2500;
        const fontName = ariseSettings.animationFont || "Speedy Space Goat Oddity";
        if (!document.getElementById(`cha-font-${fontName.replace(/\s+/g, "-").toLowerCase()}`)) {
          this.loadAriseAnimationFont();
        }
        if (this.debug.enabled && document.fonts && document.fonts.check) {
          const fontLoaded = document.fonts.check(`16px '${fontName}'`);
          this.debugLog("ARISE_ANIMATION", "Font verification check", {
            fontName,
            fontLoaded,
            note: fontLoaded ? "Font is loaded and ready" : "Font may not be loaded - will use fallback"
          });
        }
        const wrapper = document.createElement("div");
        wrapper.className = "sa-arise-wrapper";
        wrapper.style.setProperty("--sa-duration", `${durationMs}ms`);
        const scale = ariseSettings.scale || 1;
        wrapper.style.setProperty("--sa-scale", String(scale));
        const title = document.createElement("div");
        title.className = "sa-arise-text";
        let _svgOk = false;
        try {
          if (typeof C2.ARISE_SVG === "string" && C2.ARISE_SVG.length > 100) {
            const parser = new DOMParser();
            const svgDoc = parser.parseFromString(C2.ARISE_SVG, "image/svg+xml");
            if (!svgDoc.querySelector("parsererror")) {
              const svgEl = svgDoc.documentElement;
              title.style.cssText = "text-align: center !important; display: flex !important; justify-content: center !important; align-items: center !important; position: relative !important;";
              const glowSvg = document.importNode(svgEl, true);
              glowSvg.style.cssText = "height: 180px !important; width: auto !important; position: absolute !important; top: 0 !important; left: 50% !important; transform: translateX(-50%) !important; filter: blur(18px) brightness(1.5) !important; opacity: 0.7 !important; pointer-events: none !important; z-index: 0 !important;";
              title.appendChild(glowSvg);
              const mainSvg = document.importNode(svgEl, true);
              mainSvg.style.cssText = "height: 180px !important; width: auto !important; display: inline-block !important; position: relative !important; z-index: 1 !important;";
              title.appendChild(mainSvg);
              _svgOk = true;
            }
          }
        } catch (e) {
          this.debugError("ARISE_SVG", "ARISE SVG failed", (e == null ? void 0 : e.message) || e);
        }
        if (!_svgOk) {
          title.style.fontFamily = `'${fontName}', 'Orbitron', system-ui, sans-serif`;
          title.innerHTML = 'A<span class="sa-small-r">R</span><span class="sa-mid-i">i</span><span class="sa-small-s">S</span><span class="sa-mid-e">e</span>';
        }
        wrapper.appendChild(title);
        this.debugLog("ARISE_ANIMATION", "Triggering ARISE animation", {
          shadowRank: shadow == null ? void 0 : shadow.rank,
          shadowRole: (shadow == null ? void 0 : shadow.roleName) || (shadow == null ? void 0 : shadow.role),
          fontName,
          duration: durationMs,
          scale,
          showRankAndRole: ariseSettings.showRankAndRole
        });
        ariseSettings.showRankAndRole && shadow && (() => {
          const meta = document.createElement("div");
          meta.className = "sa-arise-meta";
          const rankText = shadow.rank ? `${shadow.rank}-Rank` : "";
          const roleText = shadow.roleName || shadow.role || "";
          meta.textContent = [rankText, roleText].filter(Boolean).join(" \u2022 ");
          wrapper.appendChild(meta);
        })();
        const particleCount = 22;
        Array.from({ length: particleCount }, () => {
          const p = document.createElement("div");
          p.className = "sa-arise-particle";
          const angle = Math.random() * Math.PI * 2;
          const radius = 40 + Math.random() * 80;
          const dx = Math.cos(angle) * radius;
          const dy = -Math.abs(Math.sin(angle) * radius);
          p.style.setProperty("--sa-particle-x", `${dx}px`);
          p.style.setProperty("--sa-particle-y", `${dy}px`);
          p.style.left = "50%";
          p.style.top = "50%";
          wrapper.appendChild(p);
          return p;
        });
        container.appendChild(wrapper);
        if (this.debug.enabled) {
          const fontVerifyTimeoutId = setTimeout(() => {
            var _a2, _b2;
            (_a2 = this._retryTimeouts) == null ? void 0 : _a2.delete(fontVerifyTimeoutId);
            if (this._isStopped) return;
            const computedStyle = window.getComputedStyle(title);
            const appliedFont = computedStyle.fontFamily;
            const fontLoaded = (_b2 = document.fonts) == null ? void 0 : _b2.check(`16px '${fontName}'`);
            this.debugLog("ARISE_ANIMATION", "Font verification after render", {
              fontName,
              appliedFontFamily: appliedFont,
              fontLoaded,
              matchesExpected: appliedFont.includes(fontName),
              note: appliedFont.includes(fontName) ? "Font is correctly applied to ARISE animation" : `Font may not be applied - using fallback. Expected: '${fontName}', Got: ${appliedFont}`
            });
          }, 100);
          (_c = this._retryTimeouts) == null ? void 0 : _c.add(fontVerifyTimeoutId);
        }
        const wrapperRemoveId = setTimeout(() => {
          var _a2;
          (_a2 = this._retryTimeouts) == null ? void 0 : _a2.delete(wrapperRemoveId);
          wrapper.remove();
        }, durationMs + 200);
        (_d = this._retryTimeouts) == null ? void 0 : _d.add(wrapperRemoveId);
      },
      // CSS MANAGEMENT HELPERS — Theme Integration
      /**
       * Inject or update CSS with automatic theme variable integration.
       */
      injectOrUpdateCSS(styleId, cssContent, options = {}) {
        const { forceUpdate = false, useThemeVars = true, priority = 100 } = options;
        if (!styleId || !cssContent) {
          this.debugError("CSS", "Invalid CSS injection parameters", {
            styleId,
            hasContent: !!cssContent
          });
          return false;
        }
        try {
          const existingStyle = document.getElementById(styleId);
          if (existingStyle && !forceUpdate) {
            this.debugLog("CSS", `Style ${styleId} already exists, skipping injection`);
            return true;
          }
          let finalCSS = cssContent;
          if (useThemeVars) {
            finalCSS = this.mergeCSSWithThemeVars(cssContent);
          }
          const priorityCSS = `/* Priority: ${priority} */
${finalCSS}`;
          if (BdApi && BdApi.DOM && BdApi.DOM.addStyle) {
            try {
              BdApi.DOM.addStyle(styleId, priorityCSS);
            } catch (error) {
              this.debugError("CSS", `BdApi.DOM.addStyle failed for ${styleId}, using fallback`, error);
              const style = document.createElement("style");
              style.id = styleId;
              style.textContent = priorityCSS;
              style.setAttribute("data-priority", priority);
              document.head.appendChild(style);
            }
          } else {
            const style = document.createElement("style");
            style.id = styleId;
            style.textContent = priorityCSS;
            style.setAttribute("data-priority", priority);
            document.head.appendChild(style);
          }
          if (!this._injectedStyles) {
            this._injectedStyles = /* @__PURE__ */ new Set();
          }
          this._injectedStyles.add(styleId);
          this.debugLog("CSS", `CSS injected/updated: ${styleId}`, { priority, useThemeVars });
          return true;
        } catch (error) {
          this.debugError("CSS", `Failed to inject CSS: ${styleId}`, error);
          return false;
        }
      },
      /**
       * Remove CSS by style ID.
       */
      removeCSSById(styleId) {
        if (!styleId) {
          this.debugError("CSS", "Invalid CSS removal: missing styleId");
          return false;
        }
        try {
          if (BdApi && BdApi.DOM && BdApi.DOM.removeStyle) {
            try {
              BdApi.DOM.removeStyle(styleId);
            } catch (error) {
              this.debugError(
                "CSS",
                `BdApi.DOM.removeStyle failed for ${styleId}, using fallback`,
                error
              );
              const style = document.getElementById(styleId);
              if (style && style.parentNode) {
                style.parentNode.removeChild(style);
              }
            }
          } else {
            const style = document.getElementById(styleId);
            if (style && style.parentNode) {
              style.parentNode.removeChild(style);
            }
          }
          if (this._injectedStyles) {
            this._injectedStyles.delete(styleId);
          }
          this.debugLog("CSS", `CSS removed: ${styleId}`);
          return true;
        } catch (error) {
          this.debugError("CSS", `Failed to remove CSS: ${styleId}`, error);
          return false;
        }
      },
      /**
       * Detect active theme and extract CSS variables.
       */
      detectThemeVariables() {
        try {
          const root = document.documentElement;
          const computedStyle = window.getComputedStyle(root);
          const themeVars = {};
          const commonVars = [
            "--background-primary",
            "--background-secondary",
            "--background-tertiary",
            "--background-accent",
            "--text-normal",
            "--text-muted",
            "--text-link",
            "--interactive-normal",
            "--interactive-hover",
            "--interactive-active",
            "--brand-experiment",
            "--header-primary",
            "--header-secondary"
          ];
          commonVars.forEach((varName) => {
            const value = computedStyle.getPropertyValue(varName).trim();
            if (value) {
              themeVars[varName] = value;
            }
          });
          const themeMeta = document.querySelector('meta[name="theme"]');
          const themeName = (themeMeta == null ? void 0 : themeMeta.content) || root.getAttribute("data-theme") || "default";
          return {
            name: themeName,
            variables: themeVars,
            hasVariables: Object.keys(themeVars).length > 0
          };
        } catch (error) {
          this.debugError("CSS", "Failed to detect theme variables", error);
          return { name: "default", variables: {}, hasVariables: false };
        }
      },
      /**
       * Merge CSS content with theme variables.
       */
      mergeCSSWithThemeVars(cssContent) {
        const theme = this.detectThemeVariables();
        if (!theme.hasVariables) return cssContent;
        const varMap = {
          "--bg-primary": theme.variables["--background-primary"] || "rgba(32, 34, 37, 1)",
          "--bg-secondary": theme.variables["--background-secondary"] || "rgba(24, 25, 28, 1)",
          "--bg-tertiary": theme.variables["--background-tertiary"] || "rgba(18, 19, 22, 1)",
          "--text-normal": theme.variables["--text-normal"] || "rgba(220, 221, 222, 1)",
          "--text-muted": theme.variables["--text-muted"] || "rgba(142, 146, 151, 1)",
          "--brand-color": theme.variables["--brand-experiment"] || "rgba(88, 101, 242, 1)",
          "--interactive-normal": theme.variables["--interactive-normal"] || "rgba(185, 187, 190, 1)",
          "--interactive-hover": theme.variables["--interactive-hover"] || "rgba(220, 221, 222, 1)"
        };
        let mergedCSS = cssContent;
        Object.entries(varMap).forEach(([placeholder, value]) => {
          const regex = new RegExp(`\\$\\{${placeholder}\\}`, "g");
          mergedCSS = mergedCSS.replace(regex, value);
        });
        if (!mergedCSS.includes(":root") && theme.hasVariables) {
          const themeVarsCSS = `:root {
  ${Object.entries(varMap).map(([key, value]) => `${key}: ${value};`).join("\n  ")}
}

`;
          mergedCSS = themeVarsCSS + mergedCSS;
        }
        return mergedCSS;
      },
      /**
       * Cleanup all injected CSS styles.
       */
      cleanupAllCSS() {
        if (!this._injectedStyles) return;
        this._injectedStyles.forEach((styleId) => {
          this.removeCSSById(styleId);
        });
        this._injectedStyles.clear();
        this.debugLog("CSS", "All injected CSS cleaned up");
      }
    };
  }
});

// src/ShadowArmy/ui-settings.js
var require_ui_settings = __commonJS({
  "src/ShadowArmy/ui-settings.js"(exports2, module2) {
    var dc = require_discord_classes();
    module2.exports = {
      // USER ID DETECTION
      /**
       * Get Discord user ID for storage isolation.
       * 1. Try BetterDiscord Webpack UserStore (PRIMARY)
       * 2. Try window.Discord (fallback)
       * 3. Try React fiber traversal (fallback)
       * 4. Fallback to 'default'
       */
      async getUserId() {
        var _a, _b;
        try {
          const UserStore = BdApi.Webpack.getStore("UserStore");
          if (UserStore && typeof UserStore.getCurrentUser === "function") {
            try {
              const currentUser = UserStore.getCurrentUser();
              if (currentUser && currentUser.id) {
                this.debugLog("USER_ID", "Got user ID from BdApi.Webpack.UserStore", {
                  userId: currentUser.id
                });
                return currentUser.id;
              }
            } catch (webpackError) {
              this.debugError("USER_ID", "Error calling UserStore.getCurrentUser()", webpackError);
            }
          }
          if (window.Discord && window.Discord.user && window.Discord.user.id) {
            this.debugLog("USER_ID", "Got user ID from window.Discord (fallback)", {
              userId: window.Discord.user.id
            });
            return window.Discord.user.id;
          }
          try {
            const userElement = document.querySelector(dc.sel.avatar) || document.querySelector(dc.sel.user);
            if (userElement) {
              const reactKey = Object.keys(userElement).find(
                (key) => key.startsWith("__reactFiber") || key.startsWith("__reactInternalInstance")
              );
              if (reactKey) {
                let fiber = userElement[reactKey];
                for (let i = 0; i < 10 && fiber; i++) {
                  if ((_b = (_a = fiber.memoizedProps) == null ? void 0 : _a.user) == null ? void 0 : _b.id) {
                    this.debugLog("USER_ID", "Got user ID from React fiber (fallback)", {
                      userId: fiber.memoizedProps.user.id
                    });
                    return fiber.memoizedProps.user.id;
                  }
                  fiber = fiber.return;
                }
              }
            }
          } catch (fiberError) {
            this.debugError("USER_ID", "Error in React fiber traversal", fiberError);
          }
        } catch (error) {
          this.debugError("USER_ID", "Failed to get user ID", error);
        }
        this.debugLog("USER_ID", "Using default user ID (fallback)", { reason: "All methods failed" });
        return "default";
      },
      // SETTINGS MANAGEMENT
      /**
       * Load settings from all 3 tiers, picking the newest valid candidate.
       * Tiers: (1) IndexedDB via UnifiedSaveManager, (2) BdApi.Data, (3) File backup
       * Uses _metadata.lastSave timestamp to pick newest; tie-breaks by tier priority.
       */
      async loadSettings() {
        try {
          this.debugLog("LOAD_SETTINGS", "Attempting to load settings from all tiers...");
          const getSavedTimestamp = (data) => {
            var _a;
            const iso = (_a = data == null ? void 0 : data._metadata) == null ? void 0 : _a.lastSave;
            const ts = iso ? Date.parse(iso) : NaN;
            return Number.isFinite(ts) ? ts : 0;
          };
          const candidates = [];
          try {
            const fileSaved = this.readFileBackup();
            if (fileSaved && typeof fileSaved === "object") {
              candidates.push({ source: "file", data: fileSaved, ts: getSavedTimestamp(fileSaved) });
            }
          } catch (error) {
            this.debugError("LOAD_SETTINGS", "File backup load failed", error);
          }
          if (this.saveManager) {
            try {
              const idbSaved = await this.saveManager.load("settings");
              if (idbSaved && typeof idbSaved === "object") {
                candidates.push({ source: "indexeddb", data: idbSaved, ts: getSavedTimestamp(idbSaved) });
              }
            } catch (error) {
              this.debugError("LOAD_SETTINGS", "IndexedDB load failed", error);
            }
          }
          try {
            const storageKey = this.userId ? `settings_${this.userId}` : "settings";
            const bdSaved = BdApi.Data.load("ShadowArmy", storageKey);
            if (bdSaved && typeof bdSaved === "object") {
              candidates.push({ source: "bdapi", data: bdSaved, ts: getSavedTimestamp(bdSaved) });
            }
          } catch (error) {
            this.debugError("LOAD_SETTINGS", "BdApi.Data load failed", error);
          }
          const sourcePriority = { indexeddb: 3, file: 2, bdapi: 1 };
          const best = candidates.reduce(
            (acc, cur) => {
              const hasNewer = cur.ts > acc.ts;
              const isTie = cur.ts === acc.ts;
              const hasHigherPriority = (sourcePriority[cur.source] ?? 0) >= (sourcePriority[acc.source] ?? 0);
              return hasNewer || isTie && hasHigherPriority ? cur : acc;
            },
            { source: null, data: null, ts: 0 }
          );
          if (best.data) {
            this.debugLog("LOAD_SETTINGS", `Selected settings candidate`, {
              source: best.source,
              ts: best.ts ? new Date(best.ts).toISOString() : "none",
              candidateCount: candidates.length,
              sources: candidates.map((c) => `${c.source}(${c.ts})`).join(", ")
            });
            this.settings = { ...this.defaultSettings, ...best.data };
          } else {
            this.settings = { ...this.defaultSettings };
          }
          if (!Array.isArray(this.settings.shadows)) {
            this.settings.shadows = [];
          } else if (this.settings.shadows.length > 0 && this.storageManager) {
            this.debugLog("LOAD_SETTINGS", "Clearing old shadows from settings (should be in IndexedDB)", {
              shadowsInSettings: this.settings.shadows.length
            });
            this.settings.shadows = [];
          }
          if (!this.settings.extractionConfig) {
            this.settings.extractionConfig = { ...this.defaultSettings.extractionConfig };
          } else {
            this.settings.extractionConfig = {
              ...this.defaultSettings.extractionConfig,
              ...this.settings.extractionConfig
            };
          }
          if (!this.settings.shadowEssence || typeof this.settings.shadowEssence !== "object") {
            this.settings.shadowEssence = { ...this.defaultSettings.shadowEssence };
          } else {
            const savedEssence = this.settings.shadowEssence.essence || 0;
            this.settings.shadowEssence = {
              ...this.defaultSettings.shadowEssence,
              ...this.settings.shadowEssence,
              // Deep-merge nested objects so new rank keys aren't lost
              essencePerMobKill: {
                ...this.defaultSettings.shadowEssence.essencePerMobKill,
                ...this.settings.shadowEssence.essencePerMobKill || {}
              },
              essencePerBossKill: {
                ...this.defaultSettings.shadowEssence.essencePerBossKill,
                ...this.settings.shadowEssence.essencePerBossKill || {}
              },
              gradePromotionCost: {
                ...this.defaultSettings.shadowEssence.gradePromotionCost,
                ...this.settings.shadowEssence.gradePromotionCost || {}
              },
              gradeStatMultiplier: {
                ...this.defaultSettings.shadowEssence.gradeStatMultiplier,
                ...this.settings.shadowEssence.gradeStatMultiplier || {}
              },
              // Preserve accumulated essence but ensure enabled
              essence: savedEssence,
              enabled: true
            };
            delete this.settings.shadowEssence.essencePerShadow;
            delete this.settings.shadowEssence.lastConversionTime;
            delete this.settings.shadowEssence.conversionIntervalHours;
            delete this.settings.shadowEssence.weakShadowThreshold;
            delete this.settings.shadowEssence.minShadowsToKeep;
            delete this.settings.shadowEssence.promotionCost;
          }
          if (!this.settings.rankPromotionConfig || typeof this.settings.rankPromotionConfig !== "object") {
            this.settings.rankPromotionConfig = {
              ...this.defaultSettings.rankPromotionConfig,
              minLevelByRank: { ...this.defaultSettings.rankPromotionConfig.minLevelByRank }
            };
          } else {
            const loadedMinLevelByRank = this.settings.rankPromotionConfig.minLevelByRank && typeof this.settings.rankPromotionConfig.minLevelByRank === "object" ? this.settings.rankPromotionConfig.minLevelByRank : {};
            this.settings.rankPromotionConfig = {
              ...this.defaultSettings.rankPromotionConfig,
              ...this.settings.rankPromotionConfig,
              minLevelByRank: {
                ...this.defaultSettings.rankPromotionConfig.minLevelByRank,
                ...loadedMinLevelByRank
              }
            };
          }
          if (!this.settings.specialArise) {
            this.settings.specialArise = { ...this.defaultSettings.specialArise };
          }
          if (!this.settings.dungeonExtractionAttempts) {
            this.settings.dungeonExtractionAttempts = {};
          }
          if (!this.settings.ariseAnimation) {
            this.settings.ariseAnimation = { ...this.defaultSettings.ariseAnimation };
          } else {
            this.settings.ariseAnimation = {
              ...this.defaultSettings.ariseAnimation,
              ...this.settings.ariseAnimation
            };
          }
          if (this.settings.cachedTotalPower === void 0) {
            this.settings.cachedTotalPower = 0;
            this.settings.cachedTotalPowerTimestamp = 0;
          }
          this.debug.enabled = this.settings.debugMode === true;
        } catch (error) {
          this.debugError("SETTINGS", "Error loading settings", error);
          this.settings = { ...this.defaultSettings };
          this.debug.enabled = this.settings.debugMode === true;
        }
      },
      // FILE BACKUP (Tier 3)
      // Stored OUTSIDE BetterDiscord folder so it survives BD reinstall/repair
      _getFileBackupPath() {
        try {
          const pathModule = require("path");
          const appSupport = pathModule.resolve(BdApi.Plugins.folder, "..", "..");
          const backupDir = pathModule.join(appSupport, "discord", "SoloLevelingBackups");
          require("fs").mkdirSync(backupDir, { recursive: true });
          return pathModule.join(backupDir, "ShadowArmy.json");
        } catch {
          return null;
        }
      },
      readFileBackup() {
        const filePath = this._getFileBackupPath();
        if (!filePath) return null;
        try {
          const fs = require("fs");
          if (!fs.existsSync(filePath)) return null;
          return JSON.parse(fs.readFileSync(filePath, "utf8"));
        } catch (error) {
          this.debugError("LOAD_SETTINGS_FILE", error);
          return null;
        }
      },
      writeFileBackup(data) {
        const filePath = this._getFileBackupPath();
        if (!filePath) return false;
        try {
          const fs = require("fs");
          fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8", (err) => {
            if (err) this.debugError("SAVE_SETTINGS_FILE", err);
            else this.debugLog("SAVE_SETTINGS", "Saved file backup", { path: filePath });
          });
          return true;
        } catch (error) {
          this.debugError("SAVE_SETTINGS_FILE", error);
          return false;
        }
      },
      /**
       * Debounced save — coalesces rapid saveSettings() calls into one write.
       * All 17+ call sites hit this; actual I/O happens after 3s of quiet.
       */
      saveSettings() {
        this._settingsDirty = true;
        if (this._saveSettingsTimer) return;
        this._saveSettingsTimer = setTimeout(() => {
          this._saveSettingsTimer = null;
          if (this._settingsDirty) {
            this._settingsDirty = false;
            this._saveSettingsImmediate();
          }
        }, 3e3);
      },
      async _saveSettingsImmediate() {
        try {
          if (this.settings.debugMode !== this.debug.enabled) {
            this.settings.debugMode = this.debug.enabled;
          }
          const settingsToSave = { ...this.settings };
          if (settingsToSave.shadows && Array.isArray(settingsToSave.shadows)) {
            delete settingsToSave.shadows;
          }
          delete settingsToSave._snapshotCache;
          delete settingsToSave._snapshotTimestamp;
          settingsToSave._metadata = { lastSave: (/* @__PURE__ */ new Date()).toISOString(), version: "3.5.0" };
          if (this.saveManager) {
            try {
              await this.saveManager.save("settings", settingsToSave, true);
              this.debugLog("SAVE_SETTINGS", "Saved to IndexedDB");
            } catch (error) {
              this.debugError("SAVE_SETTINGS", "IndexedDB save failed", error);
            }
          }
          queueMicrotask(() => {
            try {
              const storageKey = this.userId ? `settings_${this.userId}` : "settings";
              BdApi.Data.save("ShadowArmy", storageKey, settingsToSave);
              this.debugLog("SAVE_SETTINGS", "Saved to BdApi.Data");
            } catch (error) {
              this.debugError("SETTINGS", "Error saving settings to BdApi.Data", error);
            }
          });
          this.writeFileBackup(settingsToSave);
        } catch (error) {
          this.debugError("SETTINGS", "Error saving settings", error);
        }
      },
      // SETTINGS PANEL
      detachShadowArmySettingsPanelHandlers() {
        const root = this._shadowArmySettingsPanelRoot;
        const handlers = this._shadowArmySettingsPanelHandlers;
        if (root && handlers) {
          try {
            root.removeEventListener("click", handlers.click);
            root.removeEventListener("change", handlers.change);
          } catch (error) {
            this.debugError("SETTINGS_PANEL", "Error detaching settings panel handlers", error);
          }
        }
        this._shadowArmySettingsPanelRoot = null;
        this._shadowArmySettingsPanelHandlers = null;
      },
      /**
       * Generate settings panel HTML for BetterDiscord settings UI.
       * MUST be synchronous — async work happens inside delegated handlers.
       */
      getSettingsPanel() {
        var _a, _b;
        const shadowsForDisplay = this.settings.shadows || [];
        const localCacheCount = shadowsForDisplay.length;
        const cachedIndexedDbCount = typeof ((_a = this.settings) == null ? void 0 : _a.cachedTotalPowerShadowCount) === "number" ? this.settings.cachedTotalPowerShadowCount : null;
        const shadowsWithPower = localCacheCount > 0 ? shadowsForDisplay.map((shadow) => {
          const effective = this.getShadowEffectiveStats(shadow);
          const strength = this.calculateShadowStrength(effective, 1);
          return { shadow, strength };
        }) : [];
        shadowsWithPower.sort((a, b) => b.strength - a.strength);
        const storageInfo = this.storageManager ? '<div style="color: #34d399; font-size: 11px; margin-top: 4px;">Primary storage: IndexedDB</div>' : '<div style="color: #facc15; font-size: 11px; margin-top: 4px;">Primary storage: localStorage</div>';
        const generalsCount = Math.min(7, shadowsWithPower.length);
        const indexedDbCountLabel = cachedIndexedDbCount === null ? "Unknown (click diagnostic)" : cachedIndexedDbCount.toLocaleString();
        const html = `
      <div class="shadow-army-settings">
        <h2>Shadow Army</h2>
        ${storageInfo}

        <div class="shadow-army-stats">
          <div>Local cache (settings): ${localCacheCount.toLocaleString()}</div>
          <div>Cached IndexedDB count: ${indexedDbCountLabel}</div>
          <div>Total Extracted: ${(this.settings.totalShadowsExtracted || 0).toLocaleString()}</div>
          <div style="color: #8a2be2; font-weight: bold;">Generals: ${generalsCount} / 7 (Auto-selected strongest)</div>
          <div style="font-size: 11px; opacity: 0.8; margin-top: 4px;">Generals provide full buffs \u2022 Other shadows provide diminishing returns</div>
        </div>

        <div style="margin-top: 12px; padding: 8px; background: rgba(138, 43, 226, 0.1); border-radius: 2px;">
          <button type="button" data-sa-action="diagnostic" style="padding: 6px 12px; background: #8a2be2; color: white; border: none; border-radius: 2px; cursor: pointer; font-size: 12px; font-weight: 600;">
            Check Actual Storage (Diagnostic)
          </button>
          <div style="font-size: 10px; opacity: 0.7; margin-top: 4px;">Click to check IndexedDB for actual shadow count</div>
          <div id="shadow-army-diagnostic-result" style="margin-top: 8px; font-size: 11px; color: #9370db;"></div>
        </div>

        <div style="margin-top: 12px; padding: 8px; background: rgba(138, 43, 226, 0.1); border-radius: 2px;">
          <button type="button" data-sa-action="test-arise" style="padding: 6px 12px; background: #6d28d9; color: white; border: none; border-radius: 2px; cursor: pointer; font-size: 12px; font-weight: 600;">
            Test ARISE Animation
          </button>
          <div style="font-size: 10px; opacity: 0.7; margin-top: 4px;">Triggers a test ARISE animation with a dummy shadow to verify font & styling</div>
        </div>

        <div style="margin-top: 12px; padding: 8px; background: rgba(138, 43, 226, 0.1); border-radius: 2px;">
          <button type="button" data-sa-action="export-db" style="padding: 6px 12px; background: #7c3aed; color: white; border: none; border-radius: 2px; cursor: pointer; font-size: 12px; font-weight: 600;">
            Export Army Database
          </button>
          <div style="font-size: 10px; opacity: 0.7; margin-top: 4px;">Streams every shadow to SoloLevelingBackups/army-database.ndjson for external analysis. Progress toasts every 50k.</div>
        </div>

        <div class="shadow-army-config" style="margin-top: 16px;">
          <label style="display:flex;align-items:center;gap:8px;cursor:pointer;margin-bottom:8px;">
            <input type="checkbox" id="sa-debug-mode" ${((_b = this.settings) == null ? void 0 : _b.debugMode) === true ? "checked" : ""}>
            <span>Debug Mode (Console logs for font verification & animation)</span>
          </label>
          <div style="margin-top: 8px; padding: 8px; background: rgba(138, 43, 226, 0.1); border-radius: 2px; font-size: 11px; color: rgba(255, 255, 255, 0.7);">
            <strong style="color: #8a2be2;">Debug Mode:</strong> Enable to see detailed console logs for:
            <ul style="margin: 4px 0; padding-left: 20px;">
              <li>Font loading status (FONT_LOADER)</li>
              <li>Font verification when ARISE animation triggers</li>
              <li>Computed font-family after render</li>
              <li>Animation container creation</li>
              <li>Webpack/React injection status</li>
            </ul>
          </div>
        </div>
      </div>
    `;
        const container = document.createElement("div");
        container.innerHTML = html;
        this.detachShadowArmySettingsPanelHandlers();
        const clickHandlers = {
          "test-arise": () => {
            var _a2, _b2, _c, _d;
            const testShadow = {
              id: "test-arise-preview",
              name: "Igris",
              rank: "S",
              role: "knight",
              roleName: "Knight",
              level: 100,
              baseStats: { attack: 999, defense: 999, speed: 999 }
            };
            const wasEnabled = (_b2 = (_a2 = this.settings) == null ? void 0 : _a2.ariseAnimation) == null ? void 0 : _b2.enabled;
            if ((_c = this.settings) == null ? void 0 : _c.ariseAnimation) this.settings.ariseAnimation.enabled = true;
            this.triggerArise(testShadow);
            if (((_d = this.settings) == null ? void 0 : _d.ariseAnimation) && wasEnabled === false) {
              this.settings.ariseAnimation.enabled = wasEnabled;
            }
          },
          "export-db": () => {
            var _a2;
            (_a2 = this.exportArmyDatabase) == null ? void 0 : _a2.call(this);
          },
          diagnostic: async () => {
            const resultDiv = container.querySelector("#shadow-army-diagnostic-result");
            if (!resultDiv) return;
            resultDiv.textContent = "Checking storage...";
            try {
              const diagnostic = typeof this.diagnoseStorage === "function" ? await this.diagnoseStorage() : null;
              if (!diagnostic) {
                resultDiv.textContent = "Diagnostic not available.";
                return;
              }
              const safe = (v) => this.escapeHtml(v);
              const statusColor = diagnostic.counts.indexedDB > 0 ? "#34d399" : diagnostic.errors.length > 0 ? "#ef4444" : "#facc15";
              const errorHtml = diagnostic.errors.length > 0 ? `<div style="margin-top: 8px; padding: 6px; background: rgba(239, 68, 68, 0.1); border-radius: 2px; font-size: 10px; color: #ef4444;">
                   <strong>Errors:</strong><br>
                   ${diagnostic.errors.map((e) => safe(`- ${e}`)).join("<br>")}
                 </div>` : "";
              const sampleHtml = diagnostic.sampleShadow ? `<div style="margin-top: 8px; padding: 6px; background: rgba(52, 211, 153, 0.1); border-radius: 2px; font-size: 10px;">
                 <strong>Sample Shadow Found:</strong><br>
                 ID: ${safe(diagnostic.sampleShadow.id)}<br>
                 Rank: ${safe(diagnostic.sampleShadow.rank)}, Role: ${safe(
                diagnostic.sampleShadow.role
              )}<br>
                 Strength: ${safe(diagnostic.sampleShadow.strength)}
               </div>` : "";
              const noteHtml = diagnostic.counts.indexedDB > 0 && diagnostic.counts.localStorage === 0 ? `<div style="margin-top: 8px; padding: 6px; background: rgba(138, 43, 226, 0.2); border-radius: 2px; font-size: 10px; color: #9370db;">
                   <strong>Note:</strong> Shadows are in IndexedDB (${safe(
                diagnostic.counts.indexedDB
              )}) but not in local settings cache. IndexedDB is the primary storage.
                 </div>` : "";
              resultDiv.innerHTML = `
            <div style="background: rgba(138, 43, 226, 0.15); padding: 12px; border-radius: 2px; margin-top: 8px; border: 1px solid rgba(138, 43, 226, 0.3);">
              <div style="font-weight: bold; margin-bottom: 8px; color: #9370db;">Storage Diagnostic Results:</div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px; font-size: 11px;">
                <div>Local cache:</div>
                <div style="font-weight: bold;">${safe(
                diagnostic.counts.localStorage
              )} shadows</div>
                <div>IndexedDB:</div>
                <div style="font-weight: bold; color: ${statusColor};">${safe(
                diagnostic.counts.indexedDB
              )} shadows</div>
                <div>Storage Manager:</div>
                <div style="font-weight: bold;">${safe(
                diagnostic.storageManager.exists ? "Exists" : "Missing"
              )}</div>
                <div>DB Initialized:</div>
                <div style="font-weight: bold;">${safe(
                diagnostic.storageManager.initialized ? "Yes" : "No"
              )}</div>
                <div>DB Connection:</div>
                <div style="font-weight: bold;">${safe(
                diagnostic.storageManager.dbOpen ? "Open" : "Closed"
              )}</div>
                <div>Database Name:</div>
                <div style="font-weight: bold; font-size: 10px;">${safe(
                diagnostic.storageManager.dbName
              )}</div>
                <div>User ID:</div>
                <div style="font-weight: bold; font-size: 10px;">${safe(diagnostic.userId)}</div>
              </div>
              ${sampleHtml}
              ${errorHtml}
              ${noteHtml}
            </div>
          `;
            } catch (error) {
              resultDiv.textContent = `Error: ${(error == null ? void 0 : error.message) || String(error)}`;
            }
          }
        };
        const clickHandler = (e) => {
          var _a2, _b2, _c, _d;
          if (this._isStopped) return;
          const btn = (_b2 = (_a2 = e.target) == null ? void 0 : _a2.closest) == null ? void 0 : _b2.call(_a2, "[data-sa-action]");
          const action = (_c = btn == null ? void 0 : btn.getAttribute) == null ? void 0 : _c.call(btn, "data-sa-action");
          if (!action || !clickHandlers[action]) return;
          (_d = e.preventDefault) == null ? void 0 : _d.call(e);
          clickHandlers[action]();
        };
        const changeHandlers = {
          "sa-debug-mode": (target) => {
            this.settings.debugMode = !!target.checked;
            this.debug.enabled = !!target.checked;
            this.saveSettings();
          }
        };
        const changeHandler = (e) => {
          if (this._isStopped) return;
          const target = e == null ? void 0 : e.target;
          const handler = (target == null ? void 0 : target.id) ? changeHandlers[target.id] : null;
          if (!handler) return;
          handler(target);
        };
        container.addEventListener("click", clickHandler);
        container.addEventListener("change", changeHandler);
        this._shadowArmySettingsPanelRoot = container;
        this._shadowArmySettingsPanelHandlers = { click: clickHandler, change: changeHandler };
        return container;
      },
      // DEBUG SYSTEM
      debugLog(tag, message, data = null) {
        if (!this.debug.enabled) return;
        const throttleKey = `${tag}:${message}`;
        const now = Date.now();
        const lastLogTime = this.debug.lastLogTimes[throttleKey] || 0;
        const throttleMs = 1e3;
        if (now - lastLogTime < throttleMs) return;
        this.debug.lastLogTimes[throttleKey] = now;
        this.debug.operationCounts[tag] = (this.debug.operationCounts[tag] || 0) + 1;
        const prefix = `[ShadowArmy:${tag}]`;
        if (data !== null) {
          console.log(prefix, message, data);
        } else {
          console.log(prefix, message);
        }
      },
      debugError(tag, message, error = null) {
        this.debug.errorCount++;
        this.debug.lastError = { tag, message, error, timestamp: Date.now() };
        const prefix = `[ShadowArmy:${tag}]`;
        if (error !== null) {
          console.error(prefix, message, error);
        } else {
          console.error(prefix, message);
        }
      },
      // DIAGNOSTIC TOOLS
      async diagnoseStorage() {
        var _a;
        const diagnostic = {
          timestamp: Date.now(),
          userId: this.userId || "unknown",
          storageManager: {
            exists: !!this.storageManager,
            initialized: false,
            dbOpen: false,
            dbName: null
          },
          counts: {
            localStorage: (this.settings.shadows || []).length,
            indexedDB: 0
          },
          errors: [],
          sampleShadow: null
        };
        if (this.storageManager) {
          diagnostic.storageManager.dbName = ((_a = this.storageManager) == null ? void 0 : _a.dbName) || "unknown";
          diagnostic.storageManager.initialized = this.storageManager.db !== null;
          diagnostic.storageManager.dbOpen = this.storageManager.db !== null;
          try {
            diagnostic.counts.indexedDB = await this.storageManager.getTotalCount();
          } catch (error) {
            diagnostic.errors.push(`getTotalCount failed: ${error.message}`);
          }
          try {
            const sampleShadows = await this.storageManager.getShadows({}, 0, 1);
            if (sampleShadows.length > 0) {
              diagnostic.sampleShadow = {
                id: sampleShadows[0].id,
                rank: sampleShadows[0].rank,
                role: sampleShadows[0].role,
                strength: sampleShadows[0].strength
              };
            }
          } catch (error) {
            diagnostic.errors.push(`getShadows failed: ${error.message}`);
          }
        } else {
          diagnostic.errors.push("Storage manager not initialized");
        }
        return diagnostic;
      }
    };
  }
});

// src/shared/warn-once.js
var require_warn_once = __commonJS({
  "src/shared/warn-once.js"(exports2, module2) {
    function createWarnOnce() {
      const warned = /* @__PURE__ */ new Set();
      return (key, message, detail = null) => {
        if (warned.has(key)) return;
        warned.add(key);
        detail !== null ? console.warn(message, detail) : console.warn(message);
      };
    }
    module2.exports = { createWarnOnce };
  }
});

// src/shared/react-dom.js
var require_react_dom = __commonJS({
  "src/shared/react-dom.js"(exports2, module2) {
    function getCreateRoot() {
      var _a;
      if ((_a = BdApi.ReactDOM) == null ? void 0 : _a.createRoot) {
        return BdApi.ReactDOM.createRoot.bind(BdApi.ReactDOM);
      }
      return null;
    }
    function getLegacyReactDOM() {
      return BdApi.ReactDOM || BdApi.Webpack.getModule((m) => m && m.render && m.unmountComponentAtNode) || null;
    }
    function renderToContainer(container, element) {
      const createRoot = getCreateRoot();
      if (createRoot) {
        const root = createRoot(container);
        root.render(element);
        return () => root.unmount();
      }
      const legacyDOM = getLegacyReactDOM();
      if (legacyDOM == null ? void 0 : legacyDOM.render) {
        legacyDOM.render(element, container);
        return () => {
          if (legacyDOM.unmountComponentAtNode) {
            legacyDOM.unmountComponentAtNode(container);
          }
        };
      }
      const { createWarnOnce } = require_warn_once();
      const warnOnce = createWarnOnce();
      warnOnce("react-dom-unavailable", "[shared/react-dom] Neither createRoot nor ReactDOM.render available");
      return () => {
      };
    }
    module2.exports = { getCreateRoot, renderToContainer };
  }
});

// src/ShadowArmy/widget.js
var require_widget = __commonJS({
  "src/ShadowArmy/widget.js"(exports2, module2) {
    var { getCreateRoot } = require_react_dom();
    module2.exports = {
      // WIDGET MANAGEMENT
      /**
       * Inject CSS for shadow rank widget (using BdApi.DOM for persistence)
       */
      injectWidgetCSS() {
        const cssContent = `
      #shadow-army-widget {
        background: linear-gradient(135deg, rgba(20, 10, 30, 0.95), rgba(10, 10, 20, 0.95)) !important;
        border: 1px solid rgba(138, 43, 226, 0.4) !important;
        border-radius: 0 !important;
        padding: 12px !important;
        margin: 8px !important;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4), 0 0 20px rgba(138, 43, 226, 0.15) !important;
        cursor: pointer !important;
        transition: all 0.3s ease !important;
      }

      #shadow-army-widget:hover {
        border-color: rgba(138, 43, 226, 0.6) !important;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5), 0 0 24px rgba(138, 43, 226, 0.25) !important;
      }

      #shadow-army-widget .widget-header {
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        margin-bottom: 8px !important;
      }

      #shadow-army-widget .widget-title {
        color: #8a2be2 !important;
        font-size: 12px !important;
        font-weight: bold !important;
        text-shadow: 0 0 8px rgba(138, 43, 226, 0.8) !important;
      }

      #shadow-army-widget .widget-total {
        color: #999 !important;
        font-size: 11px !important;
      }

      #shadow-army-widget .rank-grid {
        display: grid !important;
        grid-template-columns: repeat(4, 1fr) !important;
        gap: 6px !important;
      }

      #shadow-army-widget .rank-box {
        text-align: center !important;
        padding: 4px !important;
        background: rgba(0, 0, 0, 0.4) !important;
        border-radius: 0 !important;
        transition: all 0.2s ease !important;
      }

      #shadow-army-widget .rank-label {
        font-size: 10px !important;
        font-weight: bold !important;
      }

      #shadow-army-widget .rank-count {
        color: #fff !important;
        font-size: 14px !important;
        font-weight: bold !important;
      }

      #shadow-army-widget * {
        border-radius: 0 !important;
      }
    `;
        const widgetStyleId = "shadow-army-widget-styles";
        this.injectOrUpdateCSS(widgetStyleId, cssContent, {
          forceUpdate: false,
          useThemeVars: false,
          priority: 100
        });
      },
      removeWidgetCSS() {
        const styleId = "shadow-army-widget-styles";
        this.removeCSSById(styleId);
      },
      /**
       * Inject shadow rank widget into member list sidebar.
       * Fast injection with smart retry logic.
       */
      // `hints` (optional): { canInject: true, memberElements } — passed by
      // setupMemberListWatcher, which computed BOTH in the same tick.
      // canInjectWidgetInCurrentView/getMemberListElements read offsetParent
      // (forced layout flush); on channel switches the duplicated pair ran the
      // flush twice mid-Discord-rebuild (profiler 2026-07-29: 76ms avg / 468ms
      // worst per URL change). Same-tick reuse is state-identical.
      async injectShadowRankWidget(hints = null) {
        var _a;
        if (this._isStopped) return;
        if (!this._isSkillTreeSkillUnlocked("shadow_extraction") || !this._isSkillTreeSkillUnlocked("shadow_preservation")) {
          this.removeShadowRankWidget();
          return;
        }
        if (!((hints == null ? void 0 : hints.canInject) === true || this.canInjectWidgetInCurrentView())) {
          this.removeShadowRankWidget();
          return;
        }
        const existingWidget = document.getElementById("shadow-army-widget");
        if (existingWidget && this.isWidgetInValidMemberList(existingWidget)) {
          (_a = this._widgetForceUpdate) == null ? void 0 : _a.call(this);
          return;
        }
        existingWidget && this.removeShadowRankWidget();
        const memberElements = (hints == null ? void 0 : hints.memberElements) || this.getMemberListElements();
        const membersList = (memberElements == null ? void 0 : memberElements.membersList) || null;
        if (!membersList) return;
        try {
          const spacer = document.createElement("div");
          spacer.id = "shadow-army-widget-spacer";
          spacer.style.cssText = "height: 16px; flex-shrink: 0;";
          const widget = document.createElement("div");
          widget.id = "shadow-army-widget";
          widget.addEventListener("click", () => this.openShadowArmyUI());
          const membersContent = (memberElements == null ? void 0 : memberElements.membersContent) || null;
          if (membersContent == null ? void 0 : membersContent.firstChild) {
            membersContent.insertBefore(widget, membersContent.firstChild);
            membersContent.insertBefore(spacer, widget);
          } else if (membersList.firstChild) {
            membersList.insertBefore(widget, membersList.firstChild);
            membersList.insertBefore(spacer, widget);
          } else {
            membersList.appendChild(spacer);
            membersList.appendChild(widget);
          }
          if (this._widgetReactRoot) {
            try {
              this._widgetReactRoot.unmount();
            } catch (_) {
            }
            this._widgetReactRoot = null;
          }
          const createRoot = this._getCreateRoot();
          if (createRoot) {
            const root = createRoot(widget);
            this._widgetReactRoot = root;
            const components = this._widgetComponents;
            if (!components) return;
            const { ShadowArmyWidget } = components;
            root.render(BdApi.React.createElement(ShadowArmyWidget));
            this.debugLog("WIDGET", "Widget mounted (React)");
          } else {
            this.debugError("WIDGET", "createRoot unavailable \u2014 widget will not render");
          }
        } catch (error) {
          this.debugError("WIDGET", "Error injecting shadow rank widget", error);
        }
      },
      updateShadowRankWidget() {
        var _a;
        if (this._isStopped) return;
        if (!document.getElementById("shadow-army-widget")) return;
        if (!this.canInjectWidgetInCurrentView()) {
          this.removeShadowRankWidget();
          return;
        }
        (_a = this._widgetForceUpdate) == null ? void 0 : _a.call(this);
      },
      scheduleWidgetRefresh({ reason = "unknown", delayMs = 250 } = {}) {
        this._widgetDirty = true;
        if (this._isStopped) return;
        if (this._widgetRefreshTimer) {
          return;
        }
        const now = Date.now();
        const elapsed = now - (this._lastWidgetRefreshAt || 0);
        const minWait = Math.max(0, (this._widgetRefreshMinIntervalMs || 0) - elapsed);
        const waitMs = Math.max(0, delayMs || 0, minWait);
        this._widgetRefreshTimer = setTimeout(() => {
          this._widgetRefreshTimer = null;
          this._runScheduledWidgetRefresh(reason).catch((error) => {
            this.debugError("WIDGET", "Scheduled refresh failed", error);
          });
        }, waitMs);
      },
      async _runScheduledWidgetRefresh(reason = "unknown") {
        if (this._isStopped) return;
        if (!this._widgetDirty) return;
        if (this._widgetRefreshInFlight) {
          this._widgetRefreshQueued = true;
          return;
        }
        this._widgetRefreshInFlight = true;
        try {
          this._widgetDirty = false;
          await Promise.resolve(this.updateShadowRankWidget());
          this._lastWidgetRefreshAt = Date.now();
          this.debugLog("WIDGET", "Coalesced widget refresh complete", {
            reason,
            refreshedAt: this._lastWidgetRefreshAt
          });
        } catch (error) {
          this._widgetDirty = true;
          this.debugError("WIDGET", "Coalesced widget refresh error", { reason, error });
        } finally {
          this._widgetRefreshInFlight = false;
          if (this._widgetRefreshQueued && !this._isStopped) {
            this._widgetRefreshQueued = false;
            this.scheduleWidgetRefresh({ reason: "queued_followup", delayMs: this._widgetRefreshMinIntervalMs });
          }
        }
      },
      removeShadowRankWidget() {
        if (this._widgetReactRoot) {
          this._widgetReactRoot.unmount();
          this._widgetReactRoot = null;
        }
        this._widgetForceUpdate = null;
        const spacer = document.getElementById("shadow-army-widget-spacer");
        if (spacer) spacer.remove();
        const widget = document.getElementById("shadow-army-widget");
        if (widget) widget.remove();
        this.removeWidgetCSS();
      },
      /**
       * Resolve React 18 createRoot across BdApi versions and Webpack exports.
       */
      _getCreateRoot() {
        return getCreateRoot();
      }
    };
  }
});

// src/ShadowArmy/modal.js
var require_modal = __commonJS({
  "src/ShadowArmy/modal.js"(exports2, module2) {
    var C2 = require_constants();
    var { SHADOW_GRADES } = C2;
    var _GRADE_INDEX = Object.freeze(
      SHADOW_GRADES.reduce((m, g, i) => {
        m[g] = i;
        return m;
      }, {})
    );
    var SHADOW_ARMY_MODAL_LOAD_LIMIT = 2500;
    module2.exports = {
      // UI HELPERS
      /**
       * Format combat time dynamically (seconds, minutes, or hours)
       */
      formatCombatHours(hours) {
        if (!hours || hours === 0) return "0s";
        const totalSeconds = hours * 3600;
        const timeFormatters = [
          [(s) => s < 60, (s) => `${Math.floor(s)}s`],
          [(s) => s < 3600, (s) => `${Math.floor(s / 60)}m`],
          [(s) => hours < 10, () => `${hours.toFixed(1)}h`],
          [() => true, () => `${Math.floor(hours)}h`]
        ];
        const [, formatter] = timeFormatters.find(([predicate]) => predicate(totalSeconds));
        return formatter(totalSeconds);
      },
      /**
       * ARMY-WIDE aggregates for the modal (2026-07-30).
       *
       * The modal loads at most SHADOW_ARMY_MODAL_LOAD_LIMIT (2,500) shadows, and
       * getShadows returns them ordered by power — so the loaded set is the TOP
       * 2,500, not a random sample. Deriving the rank/grade distributions from it
       * reported "E: 0, D: 0, C: 0 ... SSS: 754 (30.2%)" for an army of 235,280,
       * which is not a rounding error: every low rank reads exactly 0 because none
       * of them are strong enough to be in the top 2,500. Percentages were of
       * 2,500 too, so they summed to 100% of the wrong denominator.
       *
       * Counts come from the rank INDEX (cheap: one count() per rank, no records
       * read). The grade tally needs a walk, so it reuses the same
       * _cachedGradeCounts / _gradeCacheTs pair the header widget already
       * maintains — opening the modal within the 60s TTL costs nothing extra, and
       * a modal-triggered tally is reused by the widget in turn.
       */
      async _loadArmyAggregates() {
        var _a, _b;
        const sm = this.storageManager;
        if (!(sm == null ? void 0 : sm.getCountByRank)) return null;
        try {
          const ranks = C2.SHADOW_RANKS;
          const counts = await Promise.all(ranks.map((rank) => sm.getCountByRank(rank)));
          const rankCounts = ranks.reduce((acc, rank, i) => {
            acc[rank] = Number(counts[i]) || 0;
            return acc;
          }, {});
          const totalCount = await ((_a = sm.getTotalCount) == null ? void 0 : _a.call(sm)) || ranks.reduce((sum, rank) => sum + rankCounts[rank], 0);
          const GRADE_CACHE_TTL = 6e4;
          const now = Date.now();
          let gradeCounts = this._cachedGradeCounts;
          if (!gradeCounts || now - (this._gradeCacheTs || 0) >= GRADE_CACHE_TTL) {
            const stream = sm.forEachShadowBatchPaged ? sm.forEachShadowBatchPaged.bind(sm) : (_b = sm.forEachShadowBatch) == null ? void 0 : _b.bind(sm);
            if (stream) {
              const gradeMap = {};
              await stream((batch) => {
                for (const s of batch) {
                  const g = s.grade || s.gr || "Common";
                  gradeMap[g] = (gradeMap[g] || 0) + 1;
                }
              });
              this._cachedGradeCounts = gradeMap;
              this._gradeCacheTs = now;
              gradeCounts = gradeMap;
            }
          }
          return { totalCount, rankCounts, gradeCounts: gradeCounts || null };
        } catch (error) {
          this.debugError("UI", "Failed to load army-wide aggregates for modal", error);
          return null;
        }
      },
      computeShadowArmyUiData(shadows) {
        if (this._uiDataCacheShadows === shadows && this._uiDataCacheResult) {
          return this._uiDataCacheResult;
        }
        const safeShadows = Array.isArray(shadows) ? shadows : [];
        const withPower = safeShadows.map((shadow) => {
          const power = this.calculateShadowPowerCached(shadow);
          const shadowId = this.getCacheKey(shadow);
          return { shadow, power, id: shadowId };
        });
        const sortedByPower = [...withPower].sort((a, b) => (b.power || 0) - (a.power || 0));
        const generals = sortedByPower.slice(0, 7).map((x) => x.shadow);
        const totalArmyPower = withPower.reduce((sum, { power }) => sum + (power || 0), 0);
        const statKeys = C2.STAT_KEYS;
        const roleStats = safeShadows.reduce((stats, shadow) => {
          var _a, _b;
          const role = (shadow == null ? void 0 : shadow.role) || (shadow == null ? void 0 : shadow.roleName) || "Unknown";
          if (!stats[role]) {
            stats[role] = {
              count: 0,
              totalStats: statKeys.reduce((acc, key) => {
                acc[key] = 0;
                return acc;
              }, {}),
              totalLevel: 0,
              totalVetDays: 0,
              isMagicBeast: ((_b = (_a = this.shadowRoles) == null ? void 0 : _a[role]) == null ? void 0 : _b.isMagicBeast) || false,
              gradeCounts: {},
              highestRank: "E"
            };
          }
          stats[role].count++;
          const effective = this.getShadowEffectiveStats(shadow);
          statKeys.reduce((totalStats, key) => {
            totalStats[key] += (effective == null ? void 0 : effective[key]) || 0;
            return totalStats;
          }, stats[role].totalStats);
          stats[role].totalLevel += (shadow == null ? void 0 : shadow.level) || 1;
          stats[role].totalVetDays += (shadow == null ? void 0 : shadow.extractedAt) ? Math.max(0, (Date.now() - shadow.extractedAt) / 864e5) : 0;
          const grade = (shadow == null ? void 0 : shadow.grade) || "Common";
          stats[role].gradeCounts[grade] = (stats[role].gradeCounts[grade] || 0) + 1;
          const shadowRank = (shadow == null ? void 0 : shadow.rank) || "E";
          const rankIdx = C2.SHADOW_RANKS.indexOf(shadowRank);
          const curIdx = C2.SHADOW_RANKS.indexOf(stats[role].highestRank);
          if (rankIdx > curIdx) stats[role].highestRank = shadowRank;
          return stats;
        }, {});
        const roleStatsWithAverages = Object.entries(roleStats).reduce((acc, [role, data]) => {
          const count = data.count || 1;
          acc[role] = {
            ...data,
            avgStats: statKeys.reduce((avgStats, key) => {
              var _a;
              avgStats[key] = Math.floor((((_a = data.totalStats) == null ? void 0 : _a[key]) || 0) / count);
              return avgStats;
            }, {}),
            avgLevel: Math.floor((data.totalLevel || 0) / count),
            avgVetDays: Math.floor((data.totalVetDays || 0) / count)
          };
          acc[role].avgPower = Math.floor(
            statKeys.reduce((sum, key) => {
              var _a;
              return sum + (((_a = acc[role].avgStats) == null ? void 0 : _a[key]) || 0);
            }, 0) / statKeys.length
          );
          return acc;
        }, {});
        const sortedRoles = Object.entries(roleStatsWithAverages).sort(
          (a, b) => {
            var _a, _b;
            return (((_a = b == null ? void 0 : b[1]) == null ? void 0 : _a.count) || 0) - (((_b = a == null ? void 0 : a[1]) == null ? void 0 : _b.count) || 0);
          }
        );
        const result = { generals, totalArmyPower, sortedRoles };
        this._uiDataCacheShadows = shadows;
        this._uiDataCacheResult = result;
        return result;
      },
      escapeHtml(value) {
        const str = value === null || value === void 0 ? "" : String(value);
        return str.replace(/[&<>"']/g, (ch) => {
          const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
          return map[ch] || ch;
        });
      },
      // SHADOW ARMY MODAL
      /**
       * Cached React component factory for the Shadow Army Generals Modal.
       * Uses React.createElement (no JSX) with hooks for state & auto-refresh.
       */
      getShadowArmyModalComponent() {
        if (this.__ShadowArmyModalCached) return this.__ShadowArmyModalCached;
        const pluginRef = this;
        const React = BdApi.React;
        const { useState, useEffect, useCallback, useRef } = React;
        const ce = React.createElement;
        const { RANK_ORDER } = require_rank_utils();
        const RANKS_SA = RANK_ORDER;
        const RANK_COLORS_SA = {
          E: "#999",
          D: "#a0a0a0",
          C: "#22c55e",
          B: "#3b82f6",
          A: "#8a2be2",
          S: "#f59e0b",
          SS: "#ef4444",
          SSS: "#ec4899",
          "SSS+": "#f50057",
          NH: "#e040fb",
          Monarch: "#ff4500",
          "Monarch+": "#ff6b2b",
          "Shadow Monarch": "#8a2be2"
        };
        const StatCard = ({ value, label, color }) => ce(
          "div",
          { style: { textAlign: "center" } },
          ce("div", { style: { color, fontSize: "20px", fontWeight: "bold" } }, value),
          ce("div", { style: { color: "#b5bac1", fontSize: "11px" } }, label)
        );
        const GRADE_COLORS_SA = {
          Common: "#888",
          Elite: "#22c55e",
          Knight: "#3b82f6",
          "Elite Knight": "#8a2be2",
          General: "#f59e0b",
          Marshal: "#ef4444",
          "Grand Marshal": "#ff6b2b"
        };
        const RankCell = ({ rank, count, total }) => {
          const color = RANK_COLORS_SA[rank] || "#999";
          const pct = total > 0 ? (count / total * 100).toFixed(1) : "0";
          return ce(
            "div",
            { style: { textAlign: "center", padding: "6px", background: "rgba(0, 0, 0, 0.3)", borderRadius: "2px", border: `1px solid ${color}40` } },
            ce("div", { style: { color, fontSize: "14px", fontWeight: "bold" } }, rank),
            ce("div", { style: { color: "#dcddde", fontSize: "16px", fontWeight: "bold", margin: "2px 0" } }, count),
            ce("div", { style: { color: "#888", fontSize: "9px" } }, `${pct}%`)
          );
        };
        const GradeCell = ({ grade, count, total }) => {
          const color = GRADE_COLORS_SA[grade] || "#999";
          const pct = total > 0 ? (count / total * 100).toFixed(1) : "0";
          return ce(
            "div",
            { style: { textAlign: "center", padding: "6px", background: "rgba(0, 0, 0, 0.3)", borderRadius: "2px", border: `1px solid ${color}40` } },
            ce("div", { style: { color, fontSize: "11px", fontWeight: "bold" } }, grade),
            ce("div", { style: { color: "#dcddde", fontSize: "16px", fontWeight: "bold", margin: "2px 0" } }, count),
            ce("div", { style: { color: "#888", fontSize: "9px" } }, `${pct}%`)
          );
        };
        const RoleCard = ({ role, data }) => {
          var _a, _b;
          const gradeEntries = Object.entries(data.gradeCounts || {}).filter(([, c]) => c > 0).sort((a, b) => {
            const ai = _GRADE_INDEX[a[0]] ?? -1;
            const bi = _GRADE_INDEX[b[0]] ?? -1;
            return bi - ai;
          });
          const highestRankColor = RANK_COLORS_SA[data.highestRank] || "#999";
          return ce(
            "div",
            { style: { background: "rgba(138, 43, 226, 0.1)", borderRadius: "2px", padding: "8px" } },
            ce(
              "div",
              { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" } },
              ce(
                "div",
                { style: { display: "flex", gap: "6px", alignItems: "center" } },
                ce("span", { style: { color: data.isMagicBeast ? "#f59e0b" : "#8a2be2", fontSize: "12px", fontWeight: "bold" } }, role),
                data.highestRank && data.highestRank !== "E" ? ce("span", { style: { color: highestRankColor, fontSize: "9px", fontWeight: "600", padding: "1px 3px", border: `1px solid ${highestRankColor}40`, borderRadius: "2px" } }, data.highestRank) : null
              ),
              ce("span", { style: { color: "#34d399", fontSize: "11px", fontWeight: "bold" } }, data.count)
            ),
            ce(
              "div",
              { style: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "4px", fontSize: "9px", color: "#b5bac1", marginBottom: "4px" } },
              ce("div", null, "Served: ", ce("span", { style: { color: "#34d399" } }, `${data.avgVetDays ?? 0}d`)),
              ce("div", null, "Pwr: ", ce("span", { style: { color: "#8a2be2" } }, data.avgPower)),
              ce("div", null, "STR: ", ce("span", { style: { color: "#ef4444" } }, ((_a = data.avgStats) == null ? void 0 : _a.strength) ?? 0)),
              ce("div", null, "INT: ", ce("span", { style: { color: "#3b82f6" } }, ((_b = data.avgStats) == null ? void 0 : _b.intelligence) ?? 0))
            ),
            gradeEntries.length > 0 && !(gradeEntries.length === 1 && gradeEntries[0][0] === "Common") ? ce(
              "div",
              { style: { display: "flex", gap: "4px", flexWrap: "wrap", marginTop: "2px" } },
              gradeEntries.map(
                ([grade, count]) => ce("span", {
                  key: grade,
                  style: {
                    color: GRADE_COLORS_SA[grade] || "#888",
                    fontSize: "8px",
                    fontWeight: "600",
                    padding: "1px 3px",
                    background: "rgba(0,0,0,0.3)",
                    borderRadius: "2px"
                  }
                }, count + " " + grade)
              )
            ) : null
          );
        };
        const GeneralCard = ({ shadow, index }) => {
          var _a, _b, _c, _d, _e;
          const safeShadow = shadow || {};
          const generalRank = (index || 0) + 1;
          const rawId = String(safeShadow.id || safeShadow.i || "");
          const shortId = rawId.slice(-8);
          const effectiveStats = pluginRef.getShadowEffectiveStats(safeShadow);
          const level = Number.isFinite(safeShadow.level) ? safeShadow.level : parseInt(safeShadow.level, 10) || 1;
          const totalPower = typeof pluginRef.calculateShadowStrength === "function" ? pluginRef.calculateShadowStrength(effectiveStats, level) : typeof pluginRef.calculateShadowPower === "function" ? pluginRef.calculateShadowPower(effectiveStats, 1) : 0;
          const vetMultiplier = ((_a = pluginRef._getVeterancyMultiplier) == null ? void 0 : _a.call(pluginRef, safeShadow)) ?? 1;
          const vetPercent = Math.round((vetMultiplier - 1) * 1e3) / 10;
          const vetDays = safeShadow.extractedAt ? Math.max(0, Math.floor((Date.now() - safeShadow.extractedAt) / 864e5)) : 0;
          const vetProgress = Math.max(0, Math.min(100, Math.sqrt(vetDays) / Math.sqrt(365) * 100));
          const combatTime = pluginRef.formatCombatHours(safeShadow.totalCombatTime || 0);
          const role = safeShadow.role || safeShadow.roleName || "Unknown";
          const isMagicBeast = ((_c = (_b = pluginRef.shadowRoles) == null ? void 0 : _b[role]) == null ? void 0 : _c.isMagicBeast) || false;
          const roleColor = isMagicBeast ? "#f59e0b" : "#fff";
          const statEntries = [
            { label: "STR", color: "#ef4444", value: effectiveStats.strength || 0 },
            { label: "AGI", color: "#22c55e", value: effectiveStats.agility || 0 },
            { label: "INT", color: "#3b82f6", value: effectiveStats.intelligence || 0 },
            { label: "VIT", color: "#a855f7", value: effectiveStats.vitality || 0 },
            { label: "PER", color: "#fbbf24", value: effectiveStats.perception || 0 }
          ];
          return ce(
            "div",
            {
              className: "sa-general-card",
              "data-shadow-id": shortId,
              style: {
                background: "rgba(251, 191, 36, 0.15)",
                border: "1px solid #fbbf24",
                borderRadius: "2px",
                padding: "14px",
                marginBottom: "12px",
                boxShadow: "0 0 15px rgba(251, 191, 36, 0.3)",
                overflow: "hidden"
              }
            },
            ce(
              "div",
              { style: { display: "flex", gap: "12px" } },
              ce("div", {
                style: {
                  background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                  color: "#000",
                  fontSize: "20px",
                  fontWeight: "bold",
                  padding: "8px",
                  borderRadius: "2px",
                  width: "48px",
                  height: "48px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)"
                }
              }, ce("div", { style: { fontSize: "10px" } }, `#${generalRank}`)),
              ce(
                "div",
                { style: { flex: 1, minWidth: 0, overflow: "hidden" } },
                ce(
                  "div",
                  { style: { display: "flex", gap: "8px", alignItems: "center", marginBottom: "8px" } },
                  ce("span", { style: { color: "#8a2be2", fontWeight: "bold", fontSize: "14px", flexShrink: 0 } }, `[${safeShadow.rank || "E"}]`),
                  ce("span", { style: { color: GRADE_COLORS_SA[safeShadow.grade || "Common"] || "#888", fontSize: "12px", fontWeight: "600", flexShrink: 0 } }, safeShadow.grade || "Common"),
                  // Monarch's Naming: a named general leads with its given name (gold),
                  // role shown after. Unnamed generals show the role as before.
                  ce(
                    "span",
                    { style: { color: safeShadow.customName ? "#fbbf24" : roleColor, fontSize: "14px", fontWeight: "bold", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } },
                    safeShadow.customName ? `${safeShadow.customName} \u2014 ${role}` : role
                  ),
                  ((_e = (_d = pluginRef.getSoloLevelingData) == null ? void 0 : _d.call(pluginRef)) == null ? void 0 : _e.rank) === "Shadow Monarch" && (safeShadow.grade === "Marshal" || safeShadow.grade === "Grand Marshal") ? ce("button", {
                    title: "Name this general (Monarch's Naming)",
                    onClick: () => {
                      let value = safeShadow.customName || "";
                      BdApi.UI.showConfirmationModal(
                        "Name Your General",
                        ce(
                          "div",
                          {},
                          ce(
                            "div",
                            { style: { marginBottom: "8px", color: "#b5bac1", fontSize: "13px" } },
                            "The Monarch names his generals. Named generals carry +5% stats and report by name. Leave empty to withdraw the name."
                          ),
                          ce("input", {
                            type: "text",
                            defaultValue: value,
                            maxLength: 24,
                            placeholder: "e.g. Igris",
                            style: { width: "100%", padding: "6px 8px", background: "rgba(0,0,0,0.4)", border: "1px solid #8a2be2", borderRadius: "3px", color: "#fff" },
                            onChange: (e) => {
                              value = e.target.value;
                            }
                          })
                        ),
                        {
                          confirmText: "Arise",
                          cancelText: "Cancel",
                          onConfirm: () => {
                            var _a2;
                            (_a2 = pluginRef.renameShadow) == null ? void 0 : _a2.call(pluginRef, safeShadow, value);
                          }
                        }
                      );
                    },
                    style: { background: "none", border: "1px solid #8a2be2", borderRadius: "3px", color: "#fbbf24", cursor: "pointer", fontSize: "11px", padding: "1px 6px", flexShrink: 0 }
                  }, "\u270E") : null,
                  ce("span", { style: { color: "#34d399", marginLeft: "auto", fontSize: "14px", fontWeight: "bold", flexShrink: 0 } }, Math.floor(totalPower || 0).toLocaleString())
                ),
                // VETERANCY replaces the Level / XP bar (2026-07-30). Army-wide XP
                // no longer exists — shadows grow from time served instead, so an
                // XP bar would sit frozen and a level would never move. Age is the
                // number that actually drives their stats now.
                ce(
                  "div",
                  { style: { marginBottom: "8px" } },
                  ce(
                    "div",
                    { style: { display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#b5bac1", marginBottom: "2px" } },
                    ce("span", null, `Veterancy ${vetDays.toLocaleString()}d`),
                    ce("span", { style: { color: "#fbbf24" } }, `+${vetPercent}% stats`)
                  ),
                  ce(
                    "div",
                    { style: { background: "rgba(0,0,0,0.3)", height: "6px", borderRadius: "2px", overflow: "hidden" } },
                    ce("div", { style: { background: "linear-gradient(90deg, #fbbf24, #f59e0b)", width: `${vetProgress}%`, height: "100%", transition: "width 0.3s" } })
                  )
                ),
                ce(
                  "div",
                  { style: { background: "rgba(0, 0, 0, 0.3)", borderRadius: "2px", padding: "8px", marginBottom: "8px" } },
                  ce(
                    "div",
                    { style: { display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "4px" } },
                    statEntries.map(
                      (stat) => ce(
                        "div",
                        { key: stat.label, style: { textAlign: "center" } },
                        ce("div", { style: { color: stat.color, fontSize: "9px", fontWeight: "600", marginBottom: "2px", textTransform: "uppercase", letterSpacing: "0.5px" } }, stat.label),
                        ce("div", { style: { color: "#dcddde", fontSize: "16px", fontWeight: "bold", lineHeight: "1.2" } }, stat.value.toLocaleString())
                      )
                    )
                  )
                ),
                ce(
                  "div",
                  { style: { display: "flex", gap: "12px", fontSize: "11px" } },
                  ce("div", { style: { color: "#34d399" } }, `${combatTime} Combat`),
                  ce("div", { style: { color: "#8a2be2" } }, `${vetDays.toLocaleString()}d served`),
                  ce("div", { style: { color: "#fbbf24", marginLeft: "auto" } }, `ID: ${shortId}`)
                )
              )
            )
          );
        };
        const ShadowArmyModal = ({ initialShadows, onClose }) => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _i;
          const [shadows, setShadows] = useState(initialShadows || []);
          const refreshInFlightRef = useRef(false);
          useEffect(() => {
            const handleKey = (e) => {
              if (e.key === "Escape") {
                e.preventDefault();
                e.stopPropagation();
                onClose();
              }
            };
            document.addEventListener("keydown", handleKey);
            return () => document.removeEventListener("keydown", handleKey);
          }, [onClose]);
          useEffect(() => {
            const refresh = async () => {
              var _a2, _b2;
              if (document.hidden) return;
              if (refreshInFlightRef.current) return;
              if (!pluginRef._widgetDirty) return;
              try {
                refreshInFlightRef.current = true;
                pluginRef._widgetDirty = false;
                if ((_a2 = pluginRef.storageManager) == null ? void 0 : _a2.getShadows) {
                  const totalCount = await pluginRef.storageManager.getTotalCount() || 0;
                  if (totalCount <= 0) {
                    setShadows([]);
                  } else if (totalCount > SHADOW_ARMY_MODAL_LOAD_LIMIT) {
                    pluginRef.debugLog("UI", "Modal auto-refresh skipped for large army", {
                      totalCount
                    });
                  } else {
                    const freshShadows = ((_b2 = await pluginRef.storageManager.getShadowsByKeyPage(null, totalCount)) == null ? void 0 : _b2.shadows) || [];
                    if (freshShadows && freshShadows.length > 0) {
                      setShadows(freshShadows.map((s) => pluginRef.getShadowData(s)));
                    }
                  }
                }
              } catch (error) {
                pluginRef.debugError("UI", "Error refreshing UI", error);
              } finally {
                refreshInFlightRef.current = false;
              }
            };
            const bus = pluginRef._widgetBus;
            if (bus) bus.addEventListener("dirty", refresh);
            return () => {
              if (bus) bus.removeEventListener("dirty", refresh);
            };
          }, []);
          const handleOverlayClick = useCallback((e) => {
            if (e.target === e.currentTarget) onClose();
          }, [onClose]);
          if (!shadows || shadows.length === 0) {
            return ce(
              "div",
              {
                className: "shadow-army-modal",
                onClick: handleOverlayClick,
                style: {
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "rgba(0, 0, 0, 0.85)",
                  zIndex: 10002,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backdropFilter: "blur(5px)"
                }
              },
              ce(
                "div",
                { style: { width: "90%", maxWidth: "900px", background: "rgba(10, 10, 16, 0.98)", border: "1px solid rgba(138,43,226,0.4)", borderRadius: "2px", padding: "20px" } },
                ce(
                  "div",
                  { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" } },
                  ce("h2", { style: { color: "#8a2be2", margin: 0 } }, "Shadow Army Command"),
                  ce("button", { onClick: onClose, style: { background: "transparent", border: "none", color: "#b5bac1", fontSize: "24px", cursor: "pointer", padding: 0, width: "30px", height: "30px" } }, "\xD7")
                ),
                ce("div", { style: { textAlign: "center", padding: "40px", color: "#b5bac1" } }, "No shadows in army yet. Extract shadows from dungeons!")
              )
            );
          }
          const { generals, totalArmyPower, sortedRoles } = pluginRef.computeShadowArmyUiData(shadows);
          const totalCombatTime = pluginRef.formatCombatHours(
            shadows.reduce((sum, shadow) => sum + (shadow.totalCombatTime || 0), 0)
          );
          const currentEssence = ((_a = pluginRef.settings.shadowEssence) == null ? void 0 : _a.essence) || 0;
          const essenceTotal = currentEssence.toLocaleString();
          const totalExtractions = (pluginRef.settings.totalShadowsExtracted || 0).toLocaleString();
          const nowMs = Date.now();
          const totalVetDays = shadows.reduce(
            (sum, s) => sum + ((s == null ? void 0 : s.extractedAt) ? Math.max(0, (nowMs - s.extractedAt) / 864e5) : 0),
            0
          );
          const avgVetDays = shadows.length > 0 ? Math.floor(totalVetDays / shadows.length) : 0;
          const armySizeForCapacity = ((_b = pluginRef._modalAggregates) == null ? void 0 : _b.totalCount) || shadows.length;
          let capacityStr = "\u2014";
          try {
            const soloData = (_c = pluginRef.getSoloLevelingData) == null ? void 0 : _c.call(pluginRef);
            if (soloData) {
              const cap = (_e = pluginRef.getShadowArmyCap) == null ? void 0 : _e.call(pluginRef, soloData.rank || "E", ((_d = soloData.stats) == null ? void 0 : _d.intelligence) || 0);
              if (cap === Infinity) {
                capacityStr = armySizeForCapacity.toLocaleString() + " / \u221E";
              } else if (typeof cap === "number" && cap > 0) {
                capacityStr = armySizeForCapacity.toLocaleString() + " / " + cap.toLocaleString();
              }
            }
          } catch (_) {
          }
          const agg = pluginRef._modalAggregates || null;
          const sampleSuffix = shadows.length < ((agg == null ? void 0 : agg.totalCount) || shadows.length);
          const cachedArmyPower = Number((_f = pluginRef.settings) == null ? void 0 : _f.cachedTotalPower) || 0;
          const displayTotalPower = cachedArmyPower > totalArmyPower ? cachedArmyPower : totalArmyPower;
          const isSampled = !agg;
          const armyTotal = (agg == null ? void 0 : agg.totalCount) || shadows.length;
          const rankCounts = (agg == null ? void 0 : agg.rankCounts) || shadows.reduce((counts, shadow) => {
            const r = shadow.rank || "E";
            counts[r] = (counts[r] || 0) + 1;
            return counts;
          }, {});
          const gradeCounts = (agg == null ? void 0 : agg.gradeCounts) || shadows.reduce((counts, shadow) => {
            const g = shadow.grade || "Common";
            counts[g] = (counts[g] || 0) + 1;
            return counts;
          }, {});
          let promotionsAffordable = 0;
          let nextPromotionGrade = null;
          const gradeOrder = SHADOW_GRADES;
          const promotionCosts = ((_g = pluginRef.settings.shadowEssence) == null ? void 0 : _g.gradePromotionCost) || ((_i = (_h = pluginRef.defaultSettings) == null ? void 0 : _h.shadowEssence) == null ? void 0 : _i.gradePromotionCost) || {};
          let remainingEssence = currentEssence;
          for (let gi = 0; gi < gradeOrder.length - 1; gi++) {
            const grade = gradeOrder[gi];
            const nextGrade = gradeOrder[gi + 1];
            const cost = promotionCosts[nextGrade];
            if (cost && (gradeCounts[grade] || 0) > 0 && remainingEssence >= cost) {
              if (!nextPromotionGrade) nextPromotionGrade = nextGrade;
              const affordable = Math.min(gradeCounts[grade], Math.floor(remainingEssence / cost));
              promotionsAffordable += affordable;
              remainingEssence -= affordable * cost;
            }
          }
          return ce(
            "div",
            {
              className: "shadow-army-modal",
              onClick: handleOverlayClick,
              style: {
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0, 0, 0, 0.85)",
                zIndex: 10002,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(5px)"
              }
            },
            ce(
              "div",
              {
                style: {
                  width: "90%",
                  maxWidth: "900px",
                  maxHeight: "80vh",
                  background: "rgba(10, 10, 16, 0.98)",
                  border: "1px solid rgba(138,43,226,0.4)",
                  borderRadius: "2px",
                  padding: "20px",
                  overflowY: "auto",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)"
                }
              },
              ce(
                "div",
                { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" } },
                ce("h2", { style: { color: "#8a2be2", margin: 0 } }, "Shadow Army Command"),
                ce("button", {
                  onClick: onClose,
                  style: { background: "transparent", border: "none", color: "#b5bac1", fontSize: "24px", cursor: "pointer", padding: 0, width: "30px", height: "30px" }
                }, "\xD7")
              ),
              ce(
                "div",
                {
                  style: {
                    background: "linear-gradient(135deg, rgba(138, 43, 226, 0.15), rgba(138, 43, 226, 0.1))",
                    border: "1px solid rgba(138,43,226,0.4)",
                    borderRadius: "2px",
                    padding: "12px",
                    marginBottom: "16px"
                  }
                },
                ce(
                  "div",
                  { style: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px", marginBottom: "12px" } },
                  ce(StatCard, { value: capacityStr, label: "Army Capacity", color: "#8a2be2" }),
                  ce(StatCard, { value: displayTotalPower.toLocaleString(), label: "Total Power", color: "#fbbf24" }),
                  ce(StatCard, { value: essenceTotal, label: "Essence", color: "#9370db" }),
                  ce(StatCard, { value: totalExtractions, label: "Extracted", color: "#34d399" })
                ),
                ce(
                  "div",
                  { style: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px", marginBottom: "12px" } },
                  ce(StatCard, { value: `${avgVetDays}d`, label: sampleSuffix ? "Avg Served*" : "Avg Served", color: "#22c55e" }),
                  ce(StatCard, { value: totalCombatTime, label: sampleSuffix ? "Total Combat*" : "Total Combat", color: "#ef4444" }),
                  ce(StatCard, { value: promotionsAffordable > 0 ? promotionsAffordable : "\u2014", label: sampleSuffix ? "Promotions Ready*" : "Promotions Ready", color: "#f59e0b" }),
                  ce(StatCard, { value: Object.keys(gradeCounts).filter((g) => g !== "Common" && (gradeCounts[g] || 0) > 0).length + " / " + (gradeOrder.length - 1), label: "Grades Unlocked", color: "#ff6b2b" })
                ),
                sampleSuffix ? ce("div", {
                  style: { color: "#72767d", fontSize: "10px", textAlign: "center", marginTop: "-6px", marginBottom: "10px" }
                }, `* measured from the strongest ${shadows.length.toLocaleString()} shadows loaded, not all ${armyTotal.toLocaleString()}`) : null,
                ce(
                  "div",
                  { style: { background: "rgba(20, 20, 40, 0.6)", border: "1px solid rgba(138, 43, 226, 0.3)", borderRadius: "2px", padding: "12px", marginBottom: "12px" } },
                  ce("div", { style: { color: "#8a2be2", fontSize: "13px", fontWeight: "bold", marginBottom: "8px", textAlign: "center" } }, isSampled ? `Shadow Rank Distribution (top ${shadows.length.toLocaleString()} only)` : "Shadow Rank Distribution"),
                  ce(
                    "div",
                    { style: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px" } },
                    RANKS_SA.map((rank) => ce(RankCell, { key: rank, rank, count: rankCounts[rank] || 0, total: armyTotal }))
                  )
                ),
                ce(
                  "div",
                  { style: { background: "rgba(20, 20, 40, 0.6)", border: "1px solid rgba(138, 43, 226, 0.3)", borderRadius: "2px", padding: "12px", marginBottom: "12px" } },
                  ce("div", { style: { color: "#8a2be2", fontSize: "13px", fontWeight: "bold", marginBottom: "8px", textAlign: "center" } }, isSampled ? `Shadow Grade Distribution (top ${shadows.length.toLocaleString()} only)` : "Shadow Grade Distribution"),
                  ce(
                    "div",
                    { style: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px" } },
                    SHADOW_GRADES.map((grade) => ce(GradeCell, { key: grade, grade, count: gradeCounts[grade] || 0, total: armyTotal }))
                  )
                ),
                ce(
                  "div",
                  { style: { background: "rgba(20, 20, 40, 0.6)", border: "1px solid rgba(138, 43, 226, 0.3)", borderRadius: "2px", padding: "12px" } },
                  ce("div", { style: { color: "#8a2be2", fontSize: "13px", fontWeight: "bold", marginBottom: "8px", textAlign: "center" } }, `Army Composition by Role/Class${shadows.length < armyTotal ? ` \u2014 strongest ${shadows.length.toLocaleString()} of ${armyTotal.toLocaleString()}` : ""}`),
                  ce(
                    "div",
                    { style: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "6px" } },
                    sortedRoles.map(([role, data]) => ce(RoleCard, { key: role, role, data }))
                  )
                )
              ),
              ce(
                "div",
                { style: { marginBottom: "12px" } },
                ce("h3", { style: { color: "#fbbf24", fontSize: "16px", marginBottom: "12px", textAlign: "center", textShadow: "0 0 10px rgba(251, 191, 36, 0.5)" } }, "Shadow Generals")
              ),
              ce(
                "div",
                { style: { maxHeight: "35vh", overflowY: "auto" } },
                generals.length === 0 ? ce("div", { style: { textAlign: "center", padding: "40px", color: "#b5bac1" } }, "No shadows in army yet. Extract shadows from dungeons!") : generals.map((shadow, i) => ce(GeneralCard, { key: pluginRef.getCacheKey(shadow) || i, shadow, index: i }))
              )
            )
          );
        };
        this.__ShadowArmyModalCached = ShadowArmyModal;
        return ShadowArmyModal;
      },
      /**
       * Open Shadow Army Generals Modal (React 18 createRoot).
       */
      async openShadowArmyUI() {
        var _a, _b;
        if (this._armyModalOpen) {
          this.closeShadowArmyModal();
          return;
        }
        this._armyModalOpen = true;
        const openToken = (this._armyModalToken || 0) + 1;
        this._armyModalToken = openToken;
        const isStaleOpen = () => this._isStopped || !this._armyModalOpen || this._armyModalToken !== openToken;
        let container = null;
        let root = null;
        try {
          let shadows = [];
          if ((_a = this.storageManager) == null ? void 0 : _a.getShadows) {
            try {
              const totalCount = typeof this.storageManager.getTotalCount === "function" ? await this.storageManager.getTotalCount() || 0 : SHADOW_ARMY_MODAL_LOAD_LIMIT;
              const loadCount = totalCount > 0 ? Math.min(totalCount, SHADOW_ARMY_MODAL_LOAD_LIMIT) : SHADOW_ARMY_MODAL_LOAD_LIMIT;
              if (totalCount > SHADOW_ARMY_MODAL_LOAD_LIMIT) {
                this.debugLog("UI", "Modal initial load capped for large army", {
                  totalCount,
                  loaded: loadCount
                });
              }
              shadows = ((_b = await this.storageManager.getShadowsByKeyPage(null, loadCount)) == null ? void 0 : _b.shadows) || [];
              this._modalAggregates = await this._loadArmyAggregates();
            } catch (err) {
              this.debugError("UI", "Could not get shadows from IndexedDB", err);
              shadows = this.settings.shadows || [];
            }
          } else {
            shadows = this.settings.shadows || [];
          }
          if (isStaleOpen()) return;
          shadows = shadows.map((s) => this.getShadowData(s));
          if (isStaleOpen()) return;
          container = document.createElement("div");
          container.id = "shadow-army-modal-root";
          container.style.display = "contents";
          document.body.appendChild(container);
          this.shadowArmyModal = container;
          const createRoot = this._getCreateRoot();
          if (!createRoot) {
            container.remove();
            this._armyModalOpen = false;
            this.shadowArmyModal = null;
            this.debugError("UI", "createRoot not available for shadow army modal");
            return;
          }
          if (isStaleOpen()) {
            container.remove();
            this.shadowArmyModal = null;
            return;
          }
          root = createRoot(container);
          if (isStaleOpen()) {
            try {
              root.unmount();
            } catch (_) {
            }
            container.remove();
            this.shadowArmyModal = null;
            return;
          }
          this._armyModalRoot = root;
          const React = BdApi.React;
          root.render(React.createElement(this.getShadowArmyModalComponent(), {
            pluginInstance: this,
            initialShadows: shadows,
            onClose: () => this.closeShadowArmyModal()
          }));
        } catch (error) {
          if (root && this._armyModalRoot === root) {
            try {
              root.unmount();
            } catch (_) {
            }
            this._armyModalRoot = null;
          }
          if (container == null ? void 0 : container.parentNode) {
            container.parentNode.removeChild(container);
          }
          if (this.shadowArmyModal === container) {
            this.shadowArmyModal = null;
          }
          this.debugError("UI", "Failed to open UI", error);
          if (this._armyModalToken === openToken) {
            this._armyModalOpen = false;
          }
        }
      },
      closeShadowArmyModal() {
        var _a;
        this._armyModalToken = (this._armyModalToken || 0) + 1;
        this._armyModalOpen = false;
        if (this._armyModalRoot) {
          try {
            this._armyModalRoot.unmount();
          } catch (error) {
            this.debugError("UI", "Failed to unmount army modal React root", error);
          }
          this._armyModalRoot = null;
        }
        (_a = document.getElementById("shadow-army-modal-root")) == null ? void 0 : _a.remove();
        this.shadowArmyModal = null;
        try {
          Array.from(document.querySelectorAll(".shadow-army-modal")).forEach((modal) => {
            if (modal == null ? void 0 : modal.parentNode) modal.parentNode.removeChild(modal);
          });
        } catch (error) {
          this.debugError("UI", "Error during modal cleanup", error);
        }
      }
    };
  }
});

// src/ShadowArmy/index.js
var C = require_constants();
var ShadowStorageManager = require_storage();
var { buildWidgetComponents } = require_components();
var SLEvents = require_event_bus();
var { getPluginInstance: _getPluginInstance } = require_plugin_bridge();
var _bdLoad = (f) => {
  try {
    const m = { exports: {} };
    new Function("module", "exports", require("fs").readFileSync(require("path").join(BdApi.Plugins.folder, f), "utf8"))(m, m.exports);
    return typeof m.exports === "function" || Object.keys(m.exports).length ? m.exports : null;
  } catch (e) {
    return null;
  }
};
var _shadowArmyStartupWarn = (...args) => {
  try {
    if (typeof window !== "undefined" && window.__SHADOW_ARMY_DEBUG_STARTUP__) {
      console.warn(...args);
    }
  } catch (_) {
  }
};
var UnifiedSaveManager;
try {
  if (typeof window !== "undefined" && typeof window.UnifiedSaveManager === "function") {
    UnifiedSaveManager = window.UnifiedSaveManager;
  } else {
    UnifiedSaveManager = _bdLoad("UnifiedSaveManager.js") || window.UnifiedSaveManager || null;
    if (UnifiedSaveManager && !window.UnifiedSaveManager) window.UnifiedSaveManager = UnifiedSaveManager;
  }
} catch (error) {
  _shadowArmyStartupWarn("[ShadowArmy] Failed to load UnifiedSaveManager:", error);
  UnifiedSaveManager = typeof window !== "undefined" ? window.UnifiedSaveManager || null : null;
}
var _ReactUtils;
try {
  _ReactUtils = _bdLoad("BetterDiscordReactUtils.js");
} catch (_) {
  _ReactUtils = null;
}
var _PluginUtils;
try {
  _PluginUtils = _bdLoad("BetterDiscordPluginUtils.js");
} catch (_) {
  _PluginUtils = null;
}
var ShadowArmy = class ShadowArmy2 {
  // CONSTRUCTOR & INITIALIZATION
  constructor() {
    this.defaultSettings = C.DEFAULT_SETTINGS;
    this.settings = structuredClone(this.defaultSettings);
    this.saveManager = null;
    if (typeof UnifiedSaveManager === "function") {
      try {
        this.saveManager = new UnifiedSaveManager("ShadowArmy");
      } catch (e) {
        console.warn("[ShadowArmy] UnifiedSaveManager initialization failed:", e.message);
      }
    }
    this.shadowRanks = C.SHADOW_RANKS;
    this.shadowRoles = C.SHADOW_ROLES;
    this.shadowRoleStatWeights = C.SHADOW_ROLE_STAT_WEIGHTS;
    this.rankProbabilityMultipliers = C.RANK_PROBABILITY_MULTIPLIERS;
    this.rankStatMultipliers = C.RANK_STAT_MULTIPLIERS;
    this.shadowArmyCapacity = C.SHADOW_ARMY_CAPACITY;
    this.storageManager = null;
    this.userId = null;
    this._sessionToken = 0;
    this._shadowPowerCache = /* @__PURE__ */ new Map();
    this._shadowPowerCacheLimit = 1e3;
    this._pendingSharedXp = 0;
    this._sharedXpFlushInterval = null;
    this._pendingGrowthHours = {};
    this._pendingGrowthDrainInterval = null;
    this._soloDataCache = null;
    this._soloDataCacheTime = 0;
    this._soloDataCacheTTL = 500;
    this._injectedStyles = /* @__PURE__ */ new Set();
    this.soloPlugin = null;
    this.originalProcessMessage = null;
    this._messageProcessWrapper = null;
    this._extractionTimestamps = [];
    this._pendingMessageExtractionCount = 0;
    this._isProcessingMessageExtractionQueue = false;
    this._messageExtractionQueueTimeout = null;
    this.shadowArmyModal = null;
    this.animationContainer = null;
    this._lastAriseAnimationAt = 0;
    this._pendingAriseShadow = null;
    this._ariseDrainTimeout = null;
    this.webpackModules = {
      UserStore: null,
      ChannelStore: null,
      PermissionStore: null,
      Permissions: null
    };
    this.webpackModuleAccess = false;
    this.reactInjectionActive = false;
    this._retryTimeouts = /* @__PURE__ */ new Set();
    this._memberListSetupRetryTimeout = null;
    this._isStopped = true;
    this._widgetBus = new EventTarget();
    this.__widgetDirty = true;
    Object.defineProperty(this, "_widgetDirty", {
      get() {
        return this.__widgetDirty;
      },
      set(value) {
        const wasFalsy = !this.__widgetDirty;
        this.__widgetDirty = !!value;
        if (this.__widgetDirty && wasFalsy && this._widgetBus) {
          this._widgetBus.dispatchEvent(new Event("dirty"));
        }
      },
      configurable: true,
      enumerable: true
    });
    this._widgetRefreshTimer = null;
    this._widgetRefreshInFlight = false;
    this._widgetRefreshQueued = false;
    this._lastWidgetRefreshAt = 0;
    this._widgetRefreshMinIntervalMs = 800;
    this._navBusUnsub = null;
    this._navChangeTimeout = null;
    this.widgetReinjectionTimeout = null;
    this._discordMediaUnhandledRejectionHandler = null;
    this._discordMediaErrorHandlerAdded = false;
    this._widgetReactRoot = null;
    this._widgetForceUpdate = null;
    this._widgetComponents = null;
    this._dungeonEssenceListener = null;
    this._batchExtractionListener = null;
    this._ReactUtils = _ReactUtils;
    this._PluginUtils = _PluginUtils;
    this.debug = {
      enabled: false,
      errorCount: 0,
      lastError: null,
      operationCounts: {},
      lastLogTimes: {}
    };
  }
  // PLUGIN LIFECYCLE
  async start() {
    var _a, _b, _c, _d, _e, _f;
    if (!this._isStopped) {
      this.stop();
    }
    this._toast = ((_a = _PluginUtils == null ? void 0 : _PluginUtils.createToastHelper) == null ? void 0 : _a.call(_PluginUtils, "shadowArmy")) || ((msg, type = "info") => BdApi.UI.showToast(msg, { type: type === "level-up" ? "info" : type }));
    this._isStopped = false;
    const sessionToken = ++this._sessionToken;
    this._snapshotCache = null;
    this._snapshotTimestamp = 0;
    this._pendingMessageExtractionCount = 0;
    this._isProcessingMessageExtractionQueue = false;
    this._messageExtractionQueueTimeout = null;
    this._lastAriseAnimationAt = 0;
    this._pendingAriseShadow = null;
    this._ariseDrainTimeout = null;
    this._widgetResourcesActive = false;
    this._setupDiscordMediaErrorSuppression();
    this.userId = await this.getUserId();
    if (this._sessionToken !== sessionToken) return;
    this._restorePendingSharedXp();
    this._restorePendingGrowth();
    try {
      this.storageManager = new ShadowStorageManager(
        this.userId,
        (tag, msg, data) => this.debugLog(tag, msg, data),
        (tag, msg, err) => this.debugError(tag, msg, err)
      );
      this.storageManager.decompressShadow = (shadow) => this.decompressShadow(shadow);
      this.storageManager.decompressShadowUltra = (shadow) => this.decompressShadowUltra(shadow);
      await this.storageManager.init();
      if (this.saveManager) {
        try {
          await this.saveManager.init();
          this.debugLog("START", "UnifiedSaveManager initialized (IndexedDB)");
        } catch (error) {
          this.debugError("START", "Failed to initialize UnifiedSaveManager", error);
          this.saveManager = null;
        }
      }
      const migrationResult = await this.storageManager.migrateFromLocalStorage();
      if (migrationResult && migrationResult.migrated > 0) {
        this.debugLog(
          "MIGRATION",
          `Migrated ${migrationResult.migrated} shadows from localStorage to IndexedDB`,
          { migrated: migrationResult.migrated, total: migrationResult.total }
        );
      }
      try {
        const personalityMigration = await this.storageManager.ensurePersonalityKeyMigration(false);
        if (personalityMigration == null ? void 0 : personalityMigration.migrated) {
          this.debugLog("MIGRATION", "Personality key migration completed", {
            scanned: personalityMigration.scanned || 0,
            updated: personalityMigration.updated || 0,
            errors: personalityMigration.errors || 0,
            batches: personalityMigration.batches || 0
          });
        }
      } catch (error) {
        this.debugError("MIGRATION", "Personality key migration failed", error);
      }
      const initialCount = await this.storageManager.getTotalCount();
      this.debugLog("STORAGE", `IndexedDB initialized successfully`, {
        indexedDBShadows: initialCount,
        userId: this.userId,
        dbName: ((_b = this.storageManager) == null ? void 0 : _b.dbName) || "unknown",
        migrationCompleted: (migrationResult == null ? void 0 : migrationResult.migrated) > 0
      });
      if (initialCount > 0) {
        this.debugLog("STORAGE", "IndexedDB initialized with shadows", { shadowCount: initialCount });
        this.getTotalShadowPower(true).then((power) => {
          if (power > 0) {
            this.debugLog("STORAGE", "Recalculated total power after IndexedDB init", {
              totalPower: power,
              shadowCount: initialCount
            });
          }
        }).catch((error) => {
          this.debugError("STORAGE", "Failed to recalculate total power after IndexedDB init", error);
        });
      }
    } catch (error) {
      this.debugError("STORAGE", "IndexedDB initialization failed, using localStorage fallback", error);
      this.storageManager = null;
    }
    await this.loadSettings();
    if (this._sessionToken !== sessionToken) return;
    try {
      const essence = ((_d = (_c = this.settings) == null ? void 0 : _c.shadowEssence) == null ? void 0 : _d.essence) || 0;
      if (essence > 0) {
        const currentVaultBalance = ((_f = (_e = window.ItemVault) == null ? void 0 : _e.getBalance) == null ? void 0 : _f.call(_e, "shadow_essence")) ?? 0;
        if (currentVaultBalance === 0) {
          const Events = require_event_bus();
          Events.emit("ItemVault:set", { itemId: "shadow_essence", amount: Math.floor(essence), source: "ShadowArmy" });
        }
      }
    } catch (_) {
    }
    this.injectCSS();
    this.integrateWithSoloLeveling();
    this._extractionResourcesActive = false;
    if (this._isSkillTreeSkillUnlocked("shadow_extraction")) {
      this._activateExtractionResources();
    } else {
      this.debugLog("START", "shadow_extraction skill not unlocked \u2014 extraction resources deferred");
    }
    const _bothShadowSkillsUnlocked = () => this._isSkillTreeSkillUnlocked("shadow_extraction") && this._isSkillTreeSkillUnlocked("shadow_preservation");
    if (_bothShadowSkillsUnlocked()) {
      this._activateWidgetResources();
    } else {
      this.debugLog("START", "Shadow skills not fully unlocked \u2014 widget resources deferred");
    }
    this._onSkillLevelChanged = (event) => {
      if (this._isStopped) return;
      const { skillId, level } = event.detail || {};
      if (skillId === "shadow_extraction") {
        if (level >= 1 && !this._extractionResourcesActive) {
          this.debugLog("SKILL_GATE", "shadow_extraction unlocked \u2014 activating extraction resources");
          this._activateExtractionResources();
        } else if (level < 1 && this._extractionResourcesActive) {
          this.debugLog("SKILL_GATE", "shadow_extraction reset \u2014 tearing down extraction resources");
          this._deactivateExtractionResources();
        }
      }
      if (skillId === "shadow_extraction" || skillId === "shadow_preservation") {
        if (_bothShadowSkillsUnlocked() && !this._widgetResourcesActive) {
          this.debugLog("SKILL_GATE", "Both shadow skills unlocked \u2014 activating widget resources");
          this._activateWidgetResources();
        } else if (!_bothShadowSkillsUnlocked() && this._widgetResourcesActive) {
          this.debugLog("SKILL_GATE", "Shadow skill reset \u2014 tearing down widget resources");
          this._deactivateWidgetResources();
        }
      }
    };
    document.addEventListener("SkillTree:skillLevelChanged", this._onSkillLevelChanged);
    try {
      await this.runDataMigrations();
    } catch (error) {
      this.debugError("MIGRATION", "Data migration runner failed", error);
    }
    this.startNaturalGrowthInterval();
    const startupSelfHealToken = sessionToken;
    const startupSelfHealTimer = setTimeout(() => {
      this._retryTimeouts.delete(startupSelfHealTimer);
      if (this._startupSelfHealTimer === startupSelfHealTimer) {
        this._startupSelfHealTimer = null;
      }
      if (this._isStopped || this._sessionToken !== startupSelfHealToken) return;
      this.selfHealOnStart().catch((error) => {
        this.debugError("SELF-HEAL", "Phase 2 self-heal failed", error);
      });
    }, 5e3);
    this._startupSelfHealTimer = startupSelfHealTimer;
    this._retryTimeouts.add(startupSelfHealTimer);
  }
  /**
   * Activate extraction-only resources (message listener, ARISE animation).
   * Called immediately if shadow_extraction is already unlocked, or deferred
   * until the SkillTree:skillLevelChanged event fires.
   */
  _activateExtractionResources() {
    if (this._extractionResourcesActive) return;
    this._extractionResourcesActive = true;
    this.loadAriseAnimationFont();
    this.initializeAriseAnimationSystem();
    this.setupMessageListener();
    this.debugLog("SKILL_GATE", "Extraction resources activated (message listener + ARISE)");
  }
  /**
   * Tear down extraction resources when shadow_extraction skill is reset.
   * Removes message listener and ARISE animation to free resources.
   */
  _deactivateExtractionResources() {
    if (!this._extractionResourcesActive) return;
    this._extractionResourcesActive = false;
    this.removeMessageListener();
    this.cleanupAriseAnimationSystem();
    this.debugLog("SKILL_GATE", "Extraction resources deactivated (skill reset)");
  }
  /**
   * Activate widget resources (React components, CSS, channel watcher, refresh interval).
   * Deferred until both shadow_extraction AND shadow_preservation are unlocked.
   */
  _activateWidgetResources() {
    if (this._widgetResourcesActive) return;
    this._widgetResourcesActive = true;
    this._widgetComponents = buildWidgetComponents(this);
    this.injectWidgetCSS();
    this.setupChannelWatcher();
    const widgetStartupTimeoutId = setTimeout(() => {
      this._retryTimeouts.delete(widgetStartupTimeoutId);
      if (this._isStopped) return;
      this.injectShadowRankWidget();
    }, 100);
    this._retryTimeouts.add(widgetStartupTimeoutId);
    if (this._widgetDirtyHandler) {
      this._widgetBus.removeEventListener("dirty", this._widgetDirtyHandler);
    }
    this._widgetDirtyHandler = () => {
      if (this._isStopped) return;
      if (document.hidden) return;
      if (!this._widgetDirty) return;
      this.scheduleWidgetRefresh({ reason: "event", delayMs: 0 });
    };
    this._widgetBus.addEventListener("dirty", this._widgetDirtyHandler);
    if (this._widgetDirty && !document.hidden) {
      this.scheduleWidgetRefresh({ reason: "initial", delayMs: 0 });
    }
    this.debugLog("SKILL_GATE", "Widget resources activated (components + CSS + watchers + interval)");
  }
  /**
   * Tear down widget resources when shadow skills are reset.
   * Removes widget, CSS, watchers, and refresh interval.
   */
  _deactivateWidgetResources() {
    var _a;
    if (!this._widgetResourcesActive) return;
    this._widgetResourcesActive = false;
    this.removeShadowRankWidget();
    if (this._widgetDirtyHandler) {
      try {
        (_a = this._widgetBus) == null ? void 0 : _a.removeEventListener("dirty", this._widgetDirtyHandler);
      } catch (_) {
      }
      this._widgetDirtyHandler = null;
    }
    if (this.memberListObserver) {
      this.memberListObserver.disconnect();
      this.memberListObserver = null;
    }
    if (this._memberListHealthCheck) {
      clearInterval(this._memberListHealthCheck);
      this._memberListHealthCheck = null;
    }
    if (this._memberListDebounceTimer) {
      clearTimeout(this._memberListDebounceTimer);
      this._memberListDebounceTimer = null;
    }
    if (typeof this._navBusUnsub === "function") {
      this._navBusUnsub();
      this._navBusUnsub = null;
    }
    this.removeWidgetCSS();
    this._widgetComponents = null;
    this.debugLog("SKILL_GATE", "Widget resources deactivated (skill reset)");
  }
  // NATURAL GROWTH INTERVAL & WIDGET TIMERS
  /**
   * Is a dungeon running right now? Used to back the growth drain off while
   * combat needs the same IDB store (see the drain interval).
   *
   * getPluginInstance is TTL-cached (3s in plugin-bridge) and this is called
   * once per 30s drain tick, so the cross-plugin reach is effectively free.
   * Fails CLOSED — any error or missing Dungeons reads as "no dungeon", which
   * keeps the original full-rate drain rather than silently throttling
   * forever if the probe ever breaks.
   */
  _hasActiveDungeon() {
    try {
      const dungeons = _getPluginInstance("Dungeons");
      const active = dungeons == null ? void 0 : dungeons.activeDungeons;
      if (!active || typeof active.size !== "number" || active.size === 0) return false;
      for (const d of active.values()) {
        if (d && !d.completed && !d.failed && !d._completing) return true;
      }
      return false;
    } catch (_) {
      return false;
    }
  }
  startNaturalGrowthInterval() {
    var _a, _b, _c, _d;
    if (this.naturalGrowthInterval) {
      clearInterval(this.naturalGrowthInterval);
    }
    const compressionTimeoutId = setTimeout(() => {
      this._retryTimeouts.delete(compressionTimeoutId);
      if (this._isStopped) return;
      this.processShadowCompression();
    }, 6e5);
    this._retryTimeouts.add(compressionTimeoutId);
    this.naturalGrowthInterval = setInterval(() => {
      this.processShadowCompression();
    }, 60 * 60 * 1e3);
    if (this._gradePromoteInterval) {
      clearInterval(this._gradePromoteInterval);
    }
    if (!((_b = (_a = this.settings) == null ? void 0 : _a.shadowEssence) == null ? void 0 : _b.hierarchyReconciledV1)) {
      setTimeout(() => {
        if (this._isStopped) return;
        this.reconcileGradeHierarchy().then(() => {
          var _a2;
          if ((_a2 = this.settings) == null ? void 0 : _a2.shadowEssence) {
            this.settings.shadowEssence.hierarchyReconciledV1 = true;
            this.saveSettings();
          }
        }).catch((error) => {
          var _a2;
          console.error("[ShadowArmy] Hierarchy restructure failed (will retry next start):", error);
          this.debugError("GRADE", "Hierarchy restructure failed", error);
          try {
            if ((_a2 = this.settings) == null ? void 0 : _a2.shadowEssence) {
              this.settings.shadowEssence.hierarchyReconcileError = {
                message: String((error == null ? void 0 : error.message) || error).slice(0, 300),
                at: (/* @__PURE__ */ new Date()).toISOString()
              };
              this.saveSettings();
            }
          } catch (_) {
          }
        });
      }, 15e3);
    }
    const gradePromoteInterval = ((_d = (_c = this.settings) == null ? void 0 : _c.shadowEssence) == null ? void 0 : _d.autoPromoteIntervalMs) ?? 3e4;
    this._gradePromoteInterval = setInterval(() => {
      if (this._isStopped) return;
      if (document.hidden) return;
      this.autoPromoteGrades().catch((error) => {
        this.debugError("GRADE", "Auto-promote cycle failed", error);
      });
    }, gradePromoteInterval);
    if (this._sharedXpFlushInterval) {
      clearInterval(this._sharedXpFlushInterval);
      this._sharedXpFlushInterval = null;
    }
    if (this._pendingGrowthDrainInterval) {
      clearInterval(this._pendingGrowthDrainInterval);
    }
    this._pendingGrowthDrainInterval = setInterval(() => {
      if (this._isStopped) return;
      const backlog = Object.keys(this._pendingGrowthHours || {}).length;
      if (backlog === 0) return;
      let batch = document.hidden ? Math.min(5e3, Math.max(1e3, Math.ceil(backlog / 10))) : Math.min(2e3, Math.max(500, Math.ceil(backlog / 50)));
      if (this._hasActiveDungeon()) {
        batch = Math.max(100, Math.floor(Math.min(batch, 2e3) / 4));
      } else {
        batch = Math.min(batch, 1500);
      }
      this.drainPendingGrowth(batch).catch((error) => {
        this.debugError("GROWTH", "Pending-growth drain tick failed", error);
      });
    }, 3e4);
    {
      if (this._dungeonEssenceListener) {
        SLEvents.off("Dungeons:awardEssence", this._dungeonEssenceListener);
        this._dungeonEssenceListener = null;
      }
      this._dungeonEssenceListener = (data) => {
        var _a2, _b2, _c2, _d2, _e;
        if (!((_a2 = this.settings) == null ? void 0 : _a2.shadowEssence)) return;
        const essenceConfig = this.settings.shadowEssence;
        if (essenceConfig.enabled === false) return;
        const source = (data == null ? void 0 : data.source) || "unknown";
        const rawAmount = Math.max(0, Math.floor(Number(data == null ? void 0 : data.amount) || 0));
        if (rawAmount <= 0) return;
        let essenceGain = 0;
        if (source === "mob_kill" || source === "mob_kill_flush") {
          const mobRank = (data == null ? void 0 : data.mobRank) || "E";
          const perKill = ((_b2 = essenceConfig.essencePerMobKill) == null ? void 0 : _b2[mobRank]) || ((_c2 = this.defaultSettings.shadowEssence.essencePerMobKill) == null ? void 0 : _c2[mobRank]) || 1;
          essenceGain = rawAmount * perKill;
        } else if (source === "boss_kill") {
          const bossRank = (data == null ? void 0 : data.bossRank) || (data == null ? void 0 : data.mobRank) || "E";
          essenceGain = ((_d2 = essenceConfig.essencePerBossKill) == null ? void 0 : _d2[bossRank]) || ((_e = this.defaultSettings.shadowEssence.essencePerBossKill) == null ? void 0 : _e[bossRank]) || 50;
        } else {
          essenceGain = rawAmount;
        }
        if (essenceGain > 0) {
          essenceConfig.essence = (essenceConfig.essence || 0) + essenceGain;
          const now = Date.now();
          if (!this._lastEssenceSaveTime || now - this._lastEssenceSaveTime > 5e3) {
            this._lastEssenceSaveTime = now;
            this.saveSettings();
          }
          if (SLEvents && source !== "mob_kill") {
            SLEvents.emit("ItemVault:add", {
              itemId: "shadow_essence",
              amount: essenceGain,
              source: source || "dungeon"
            });
          }
        }
      };
      SLEvents.on("Dungeons:awardEssence", this._dungeonEssenceListener);
      if (this._batchExtractionListener) {
        SLEvents.off("ShadowArmy:batchExtractionComplete", this._batchExtractionListener);
        this._batchExtractionListener = null;
      }
      this._batchExtractionListener = async (data) => {
        if ((data == null ? void 0 : data.extracted) > 0 && typeof this.updateShadowRankWidget === "function") {
          this.scheduleWidgetRefresh({ reason: "batch_extraction_event", delayMs: 250 });
        }
      };
      SLEvents.on("ShadowArmy:batchExtractionComplete", this._batchExtractionListener);
    }
  }
  // DISCORD MEDIA ERROR SUPPRESSION
  _setupDiscordMediaErrorSuppression() {
    if (typeof window === "undefined" || this._discordMediaErrorHandlerAdded) return;
    this._discordMediaErrorHandlerAdded = true;
    this._discordMediaUnhandledRejectionHandler = (event) => {
      if (this._isStopped) return;
      const error = event.reason;
      const errorMessage = (error == null ? void 0 : error.message) || (error == null ? void 0 : error.toString()) || "";
      const errorStack = (error == null ? void 0 : error.stack) || "";
      if (errorMessage.includes("Cannot find module 'discord_media'") || errorMessage.includes("discord_media") || errorStack.includes("discord_media") || errorStack.includes("nativeModules.js") || // Discord's own <video>/GIFV autoplay handler only swallows
      // NotAllowedError, so it rethrows this benign AbortError whenever a
      // play() promise is interrupted by pause() (e.g. scrolling fast past
      // GIFVs). Not caused by any plugin — suppress the console spam.
      (error == null ? void 0 : error.name) === "AbortError" && errorMessage.includes("The play() request was interrupted")) {
        event.preventDefault();
      }
    };
    window.addEventListener("unhandledrejection", this._discordMediaUnhandledRejectionHandler);
  }
  // STOP — CLEANUP
  // async: BD does not await stop() (see the settings-flush comment below), but
  // this lets us await the pending shared-XP flush before storageManager.close()
  // without racing the IDB connection teardown at the end of this function.
  async stop() {
    var _a, _b, _c, _d, _e, _f, _g;
    this._isStopped = true;
    if (this._onSkillLevelChanged) {
      document.removeEventListener("SkillTree:skillLevelChanged", this._onSkillLevelChanged);
      this._onSkillLevelChanged = null;
    }
    this._extractionResourcesActive = false;
    this._widgetResourcesActive = false;
    if (this._saveSettingsTimer) {
      clearTimeout(this._saveSettingsTimer);
      this._saveSettingsTimer = null;
    }
    if (this._settingsDirty) {
      this._settingsDirty = false;
      try {
        const saveResult = this._saveSettingsImmediate();
        if (saveResult && typeof saveResult.then === "function") {
          saveResult.catch((e) => console.error("[ShadowArmy] Final save failed:", e));
        }
      } catch (e) {
        console.error("[ShadowArmy] Final save failed:", e);
      }
    }
    this.cleanupAriseAnimationSystem();
    this.removeMessageListener();
    this.soloPlugin = null;
    this.detachShadowArmySettingsPanelHandlers();
    this.removeCSS();
    this.removeWidgetCSS();
    this.cleanupAllCSS();
    this.clearCombatCache();
    this.closeShadowArmyModal();
    this.__ShadowArmyModalCached = null;
    if (this._discordMediaUnhandledRejectionHandler) {
      window.removeEventListener("unhandledrejection", this._discordMediaUnhandledRejectionHandler);
      this._discordMediaUnhandledRejectionHandler = null;
      this._discordMediaErrorHandlerAdded = false;
    }
    this._retryTimeouts.forEach((timeoutId) => clearTimeout(timeoutId));
    this._retryTimeouts.clear();
    this._startupSelfHealTimer = null;
    this._messageExtractionQueueTimeout = null;
    this._ariseDrainTimeout = null;
    this._pendingMessageExtractionCount = 0;
    this._isProcessingMessageExtractionQueue = false;
    this._pendingAriseShadow = null;
    this._lastAriseAnimationAt = 0;
    if (this.naturalGrowthInterval) {
      clearInterval(this.naturalGrowthInterval);
      this.naturalGrowthInterval = null;
    }
    if (this._gradePromoteInterval) {
      clearInterval(this._gradePromoteInterval);
      this._gradePromoteInterval = null;
    }
    if (this._sharedXpFlushInterval) {
      clearInterval(this._sharedXpFlushInterval);
      this._sharedXpFlushInterval = null;
    }
    if (this._pendingGrowthDrainInterval) {
      clearInterval(this._pendingGrowthDrainInterval);
      this._pendingGrowthDrainInterval = null;
    }
    if (this._selfHealResumeTimer) {
      clearTimeout(this._selfHealResumeTimer);
      this._selfHealResumeTimer = null;
    }
    if (this._navBusUnsub) {
      this._navBusUnsub();
      this._navBusUnsub = null;
    }
    if (this._widgetDirtyHandler) {
      try {
        (_a = this._widgetBus) == null ? void 0 : _a.removeEventListener("dirty", this._widgetDirtyHandler);
      } catch (_) {
      }
      this._widgetDirtyHandler = null;
    }
    if (this.autoRefreshInterval) {
      clearInterval(this.autoRefreshInterval);
      this.autoRefreshInterval = null;
    }
    if (this._widgetRefreshTimer) {
      clearTimeout(this._widgetRefreshTimer);
      this._widgetRefreshTimer = null;
    }
    this._widgetRefreshInFlight = false;
    this._widgetRefreshQueued = false;
    if (this._memberListHealthCheck) {
      clearInterval(this._memberListHealthCheck);
      this._memberListHealthCheck = null;
    }
    if (this.widgetReinjectionTimeout) {
      clearTimeout(this.widgetReinjectionTimeout);
      (_c = (_b = this._retryTimeouts) == null ? void 0 : _b.delete) == null ? void 0 : _c.call(_b, this.widgetReinjectionTimeout);
      this.widgetReinjectionTimeout = null;
    }
    if (this._memberListSetupRetryTimeout) {
      clearTimeout(this._memberListSetupRetryTimeout);
      (_e = (_d = this._retryTimeouts) == null ? void 0 : _d.delete) == null ? void 0 : _e.call(_d, this._memberListSetupRetryTimeout);
      this._memberListSetupRetryTimeout = null;
    }
    if (this._navChangeTimeout) {
      clearTimeout(this._navChangeTimeout);
      (_g = (_f = this._retryTimeouts) == null ? void 0 : _f.delete) == null ? void 0 : _g.call(_f, this._navChangeTimeout);
      this._navChangeTimeout = null;
    }
    this.webpackModules = { UserStore: null, ChannelStore: null, PermissionStore: null, Permissions: null };
    this.webpackModuleAccess = false;
    if (this.cachedBuffs) this.cachedBuffs = null;
    this.cachedBuffsTime = null;
    if (this._extractionTimestamps) {
      this._extractionTimestamps.length = 0;
      this._extractionTimestamps = null;
    }
    if (this.memberListObserver) {
      this.memberListObserver.disconnect();
      this.memberListObserver = null;
    }
    this.removeShadowRankWidget();
    this._widgetComponents = null;
    this._soloDataCache = null;
    this._soloDataCacheTime = 0;
    if (this._dungeonEssenceListener) {
      SLEvents.off("Dungeons:awardEssence", this._dungeonEssenceListener);
      this._dungeonEssenceListener = null;
    }
    if (this._batchExtractionListener) {
      SLEvents.off("ShadowArmy:batchExtractionComplete", this._batchExtractionListener);
      this._batchExtractionListener = null;
    }
    try {
      this._persistPendingSharedXp();
    } catch (error) {
      console.error("[ShadowArmy] Failed to persist pending shared XP on stop:", error);
    }
    try {
      this._persistPendingGrowth();
    } catch (error) {
      console.error("[ShadowArmy] Failed to persist pending growth hours on stop:", error);
    }
    if (this.storageManager) {
      this.storageManager.close();
      this.storageManager = null;
    }
  }
};
Object.assign(
  ShadowArmy.prototype,
  require_watchers(),
  require_extraction(),
  require_extraction_queue(),
  require_combat_stats(),
  require_army_stats(),
  require_army_export(),
  require_progression(),
  require_migrations(),
  require_self_heal(),
  require_shadow_management(),
  require_compression(),
  require_animation(),
  require_ui_settings(),
  require_widget(),
  require_modal()
);
module.exports = ShadowArmy;
