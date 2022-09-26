import * as I from '../../../utils/types';
import baseSprite from './base/sprite-tao.png';
import promotedSprite from './promoted/sprite-tao2.png';
import altSprite from './z/sprite-tao3.png';
import placeholder1 from '../Max/base/sprite-face-max.png';
import placeholder2 from '../Max/base/sprite-combat-max.png';

const Tao: I.Character = {
    characterName: 'Tao',
    class: 'MAG',
    spriteSheet: [baseSprite, promotedSprite, altSprite],
    faceSpriteSheet: [placeholder1],
    combatSpriteSheet: [
        placeholder2
    ],
    weaponSpriteSheet: {
    },
    level: 1,
    experience: 0,
    hitPoints: 14,
    damageTaken: 0,
    isPromoted: false,
    alignment: I.ALIGNMENT.GOOD,
    magic: {
        usesMagic: true,
        magicPoints: 0,
        magicPointsUsed: 0,
        magicSpells: [I.MAGIC.BLAZE, I.MAGIC.SLEEP]
    },
    stamina: {
        usesStamina: false,
        staminaPoints: 5,
        staminaPointsUsed: 0,
        ability: []
    },
    stats: {
        attack: 3,
        defense: 1,
        magicResistance: 8,
        move: 5,
        speed: 3
    },
    items: {
        slot_top: I.ITEM.STAFF,
        slot_right: I.ITEM.HERB,
        slot_left: I.ITEM.NONE,
        slot_bottom: I.ITEM.NONE,
    },
    equip: {
        slot: [],
    },
}

export default Tao;