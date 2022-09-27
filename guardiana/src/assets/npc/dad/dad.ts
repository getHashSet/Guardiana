import * as I from "../../../utils/types";
import sprite_dad from './sprite-dad.png';

const Dad: I.Character = {
    characterName: 'Dad',
    class: 'DAD',
    spriteSheet: [sprite_dad],
    faceSpriteSheet: [],
    combatSpriteSheet: [],
    weaponSpriteSheet: {},
    level: 1,
    experience: 0,
    hitPoints: 1,
    damageTaken: 0,
    isPromoted: false,
    alignment: I.ALIGNMENT.NEUTRAL,
    magic: {
        usesMagic: false,
        magicPoints: 0,
        magicPointsUsed: 0,
        magicSpells: []
    },
    stamina: {
        usesStamina: false,
        staminaPoints: 0,
        staminaPointsUsed: 0,
        ability: []
    },
    stats: {
        attack: 0,
        defense: 1,
        magicResistance: 9,
        move: 3,
        speed: 0
    },
    items: {
        slot_top:    I.ITEM.NONE,
        slot_right:  I.ITEM.NONE,
        slot_left:   I.ITEM.NONE,
        slot_bottom: I.ITEM.NONE,
    },
    equip: {
        slot: [],
    },
}

export default Dad;