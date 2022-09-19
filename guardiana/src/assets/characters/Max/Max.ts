import * as I from '../../../utils/types'
import sprite_max from './base/sprite-max.png';
import sprite_max_promoted from './promoted/sprite-max2.png';
import face_max from './base/sprite-face-max.png';
import shortSword from './base/weapons/short_sword-max.png';
import combat_sprite_max from './base/sprite-combat-max.png';

export const Max: I.Character = {
    characterName: 'Max',
    class: 'FTR',
    spriteSheet: [sprite_max, sprite_max_promoted],
    faceSpriteSheet: [face_max],
    combatSpriteSheet: [
        combat_sprite_max
    ],
    weaponSpriteSheet: {
        shortSword: [shortSword]
    },
    level: 1,
    experience: 0,
    hitPoints: 25,
    damageTaken: 0,
    isPromoted: false,
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
    },
    items: {
        slot_top:    I.ITEM.SHORT_SWORD,
        slot_right:  I.ITEM.NONE,
        slot_left:   I.ITEM.NONE,
        slot_bottom: I.ITEM.NONE,
    },
    equip: {
        isEquip: false,
        slot: -1,
    },
}

export default Max
