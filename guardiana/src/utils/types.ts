// ============================= //
// === ENUMS & GLOBAL VALUES === //
// ============================= //

// Scale pixel images by this number.
export const SCALE: number = 2

export enum PIXEL {
    BLOCK = 24 // the size of each block in the game as pixels
}

export enum ACTIONS {
    SET_MAP = 'SET_MAP',
    SET_HERO_ROSTER = 'SET_HERO_ROSTER',
    SET_ENEMY_ROSTER = 'SET_ENEMY_ROSTER',
    SET_TARGET = 'SET_TARGET',
    TEST = 'TEST'
}

export enum DIRECTION {
    LEFT = 'LEFT',
    RIGHT = 'RIGHT',
    UP = 'UP',
    DOWN = 'DOWN'
}

export enum ALIGNMENT {
    GOOD = 'GOOD',
    NEUTRAL = 'NEUTRAL',
    EVIL = 'EVIL'
}

export enum TARGET {
    SINGLE,
    AOE_3_WIDE,
    AOE_5_WIDE,
    AOE_7_WIDE,
    LINE_2_LONG,
    LINE_3_LONG,
    LINE_4_LONG,
    LINE_5_LONG
}

export interface SPELL {
    name: string;   // spell name
    cost: number;   // MP cost
    level: number;  // number of levels into this spell
    damage: number; // damage roll
    target: TARGET; // shape of the attack
    range: number;  // how many squares away you can target
    icon: string;   // the icon displayed on the square
}

export enum MAGIC {
    NONE = 'NONE',

    BLAZE = 'BLAZE',
    BLAZE2 = 'BLAZE2',
    BLAZE3 = 'BLAZE3',
    BLAZE4 = 'BLAZE4',

    MUDDLE = 'MUDDLE',

    SLEEP = 'SLEEP',

    DESOL = 'DESOL',
}

export enum ITEM {
    NONE = 'NONE',

    // === WEAPONS === //
    SHORT_SWORD = 'SHORT_SWORD',
    LANCE = 'LANCE',
    SPEAR = 'SPEAR',
    AXE = 'AXE',
    STAFF = 'STAFF',

    // === ITEMS === //
    HERB = 'HERB',
    HEALING_SEED = 'HEALING_SEED',

    // === MISC === //
    BIKINI = 'BIKINI'
}

export enum ITEM_SLOT {
    TOP = 'TOP',
    LEFT = 'LEFT',
    RIGHT = 'RIGHT',
    BOTTOM = 'BOTTOM'
}

export enum BATTLE {
    CLIFFSIDE_RUINS = 'Cliff Side Ruins',
}

export interface STATS {
    attack: number;
    defense: number;
    magicResistance: number;
    move: number;
    speed?: number;
}

// ================== //
// === INTERFACES === //
// ================== //
export interface Character {
    characterName: string;
    class: string;
    spriteSheet: string[];
    faceSpriteSheet: string[];
    combatSpriteSheet: string[];
    weaponSpriteSheet: any; // I need to resolve weapon lists being un typed
    level: number;
    experience: number;
    hitPoints: number;
    damageTaken: number;
    isPromoted: boolean | null;
    alignment: ALIGNMENT;
    isAnimated?: boolean;
    magic: {
        usesMagic: boolean;
        magicPoints: number;
        magicPointsUsed: number;
        magicSpells: MAGIC[] | null[]
    };
    stamina: {
        usesStamina: boolean;
        staminaPoints: number; // Stamina regenerates on each turn when no action was taken and no movement happened.
        staminaPointsUsed: number;
        ability: any; // TODO not sure how I want to address special abilities yet. (ie steal, secondary weapon, charge attack);
    }
    stats: STATS
    items: {
        slot_top: ITEM;
        slot_right: ITEM;
        slot_left: ITEM;
        slot_bottom: ITEM;
    }
    equip: {
        slot: ITEM_SLOT[] | null[];
    }
}

export interface Item {
    name: string;
    globalAbility: boolean; // some items provide added stats or abilities.
    buy: number;            // cost to purchase
    sell: number;           // value gained when sold
}

export interface Map {
    name: string;

    isABattleMap: boolean;

    /* === Layer 0 for the map. This will be behind everything.
    NOTE this is the only layer that can be a jpg. === */
    // example: "/asset/map/city/Loom.png";
    imageBottom: string;

    // === Layer 8 for the map. This will be over everything. Including over the player === //
    imageTop: string | null;

    // === Map size in squares === //
    // example: { x: 10, y: 20 } would make a 240px by 480px map
    mapDimentions: { x: number, y: number };

    // === the block grid === //
    //  grid: [
    //      [0,0,0,0];
    //      [0,9,9,0];
    //      [0,9,9,0];
    //      [0,0,0,0];
    // ]
    // use case: map.grid[1][3] === 0? doneMove() : move();
    // KEY:
    // 0 = blocked
    // 9 = open
    // 8 = open FRIENDLY
    // 7 = blocking WATER
    // 6 = blocked SHRUBS or OBSTRUCTION (can fly over)
    // 5 = open but if you stop an action happens (interactionIfStoppedID)
    // 4 = blocked
    // 3 = blocked NON_FRIENDLY
    // 2 = blocked
    // 1 = blocked
    grid: number[][];

    // === This shifts the map but not the grid the player stands on. === //
    pixelOffset: { x: number, y: number };

    // === The location of the camera when the game loads === //
    // NOTE: this may be removed in the future when I get focus to work. 
    cameraStartLocation: { x: number, y: number };

    // === The location of party assets. === //
    heroStartLocations: { name: string, x: number, y: number }[];

    // === The location of NPC assets. === //
    npcStartLocations: { name: string, info: Character, x: number, y: number }[];

    // === The location of Enemy assets === //
    enemyStartLocations: { name: string, x: number, y: number }[];

    events: any;
}