import * as I from '../../../utils/types'
import sprite_base from './sprite-dark_dwarf.png';
import sprite_combat from './sprite-combat-dark_dwarf.png';

export const DarkDwarf: I.Character = {
    characterName: 'Dark Dwarf',
    class: 'DWF',
    spriteSheet: [sprite_base],
    faceSpriteSheet: [],
    combatSpriteSheet: [
        sprite_combat
    ],
    weaponSpriteSheet: {
    },
    level: 2,
    experience: 0,
    hitPoints: 32,
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
        usesStamina: false,
        staminaPoints: 0,
        staminaPointsUsed: 0,
        ability: []
    },
    stats: {
        attack: 5,
        defense: 3,
        magicResistance: 5,
        move: 5,
    },
    items: {
        slot_top: I.ITEM.NONE,
        slot_right: I.ITEM.HERB,
        slot_left: I.ITEM.NONE,
        slot_bottom: I.ITEM.AXE,
    },
    equip: {
        slot: [I.ITEM_SLOT.BOTTOM],
    },
}

export default DarkDwarf
