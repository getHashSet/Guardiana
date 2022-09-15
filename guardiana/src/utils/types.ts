// ============= //
// === ENUMS === //
// ============= //
export enum ACTIONS {
    SET_MAP = 'SET_MAP',
    TEST = 'TEST'
}


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
    imageBottom: string;
    imageTop: string;
    blocked: string[];
    grid: [number, number];
    startingLocation: [number, number];
    pixelOffset: {x: number, y: number};
}