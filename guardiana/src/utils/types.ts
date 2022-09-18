// ============= //
// === ENUMS === //
// ============= //
export enum ACTIONS {
    SET_MAP = 'SET_MAP',
    TEST = 'TEST'
}

export enum PIXEL {
    BLOCK = 24 // the size of each block in the game as pixels
}

export enum DIRECTION {
    LEFT,
    RIGHT,
    UP,
    DOWN
}

// Scale pixel images by this number.
export const SCALE: number = 3;


// ================== //
// === INTERFACES === //
// ================== //
export interface Character {
    name: string;
    class: string;
    spriteSheet: any;       // JPG
    faceSpriteSheet: any;   // JPG
    combatSpriteSheet: any; // JPG
    weaponSpriteSheet: any; // JPG
    level: number;
    experience: number;
    hitPoints: number;
    damageTaken: number;
    magic: {
        usesMagic: boolean;
        magicPoints: number;
        magicPointsUsed: number;
        magicSpells: [
            Spell,
            Spell,
            Spell,
            Spell
        ]
    };
    stamina: {
        usesStamina: boolean;
        staminaPoints: number; // Stamina regenerates on each turn when no action was taken and no movement happened.
        staminaPointsUsed: number;
        ability: any; // TODO not sure how I want to address special abilities yet. (ie steal, secondary weapon, charge attack);
    }
    stats: {
        attack: number;
        defense: number;
        magicResistance: number;
        move: number;
    }
    items: {
        slot_1: Item;
        slot_2: Item;
        slot_3: Item;
        slot_4: Item;
    }
    equip: {
        isEquip: boolean;
        slot: number;
    }
}

export interface Spell {
    name: string;               // Blank is a spell type that has all empty values
}

export interface Item {
    name: string;
    globalAbility: boolean; // some items provide added stats or abilities.
    buy: number;            // cost to purchase
    sell: number;           // value gained when sold
}

export interface Map {
    name: string;

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
    npcStartLocations: { name: string, x: number, y: number }[] | null[];

    // === The location of Enemy assets === //
    enemyStartLocations: { name: string, x: number, y: number }[] | null[];

    events: any;
}