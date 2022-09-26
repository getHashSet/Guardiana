import * as I from '../../../utils/types';
import baseSprite from './base/sprite-adam.png';
import promotedSprite from './promoted/sprite-adam_west.png';
import placeholder1 from '../Max/base/sprite-face-max.png';
import placeholder2 from '../Max/base/sprite-combat-max.png';

const Adam: I.Character = {
    characterName: 'Adam',
    class: 'RBT',
    spriteSheet: [baseSprite, promotedSprite],
    faceSpriteSheet: [placeholder1],
    combatSpriteSheet: [
        placeholder2
    ],
    weaponSpriteSheet: {
    },
    level: 1,
    experience: 0,
    hitPoints: 25,
    damageTaken: 0,
    isPromoted: false,
    alignment: I.ALIGNMENT.GOOD,
    magic: {
        usesMagic: false,
        magicPoints: 0,
        magicPointsUsed: 0,
        magicSpells: []
    },
    stamina: {
        usesStamina: true,
        staminaPoints: 5,
        staminaPointsUsed: 0,
        ability: []
    },
    stats: {
        attack: 5,
        defense: 3,
        magicResistance: 3,
        move: 7,
        speed: 5
    },
    items: {
        slot_top: I.ITEM.NONE,
        slot_right: I.ITEM.NONE,
        slot_left: I.ITEM.NONE,
        slot_bottom: I.ITEM.NONE,
    },
    equip: {
        slot: [],
    },
}

export default Adam;