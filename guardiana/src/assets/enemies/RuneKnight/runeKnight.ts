import * as I from '../../../utils/types'
import sprite_base from './sprite-rune_knight.png';
import sprite_combat from './sprite-combat-rune_knight.png';

const RuneKnight: I.Character = {
    characterName: 'Rune Knight',
    class: 'KGT',
    spriteSheet: [sprite_base],
    faceSpriteSheet: [],
    combatSpriteSheet: [
        sprite_combat
    ],
    weaponSpriteSheet: {
    },
    level: 3,
    experience: 0,
    hitPoints: 41,
    damageTaken: 0,
    isPromoted: false,
    alignment: I.ALIGNMENT.EVIL,
    magic: {
        usesMagic: false,
        magicPoints: 0,
        magicPointsUsed: 0,
        magicSpells: []
    },
    stamina: {
        usesStamina: true,
        staminaPoints: 7,
        staminaPointsUsed: 0,
        ability: []
    },
    stats: {
        attack: 6,
        defense: 5,
        magicResistance: 1,
        move: 9,
    },
    items: {
        slot_top:    I.ITEM.LANCE,
        slot_right:  I.ITEM.SPEAR,
        slot_left:   I.ITEM.NONE,
        slot_bottom: I.ITEM.NONE,
    },
    equip: {
        slot: [I.ITEM_SLOT.TOP, I.ITEM_SLOT.LEFT],
    },
}

export default RuneKnight
