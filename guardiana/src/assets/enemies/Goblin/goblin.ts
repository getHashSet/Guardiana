import * as I from '../../../utils/types'
import sprite_base from './sprite-goblin.png';
import sprite_combat from './sprite-combat-goblin.png';

export const Goblin: I.Character = {
    characterName: 'Goblin',
    class: 'GBN',
    spriteSheet: [sprite_base],
    faceSpriteSheet: [],
    combatSpriteSheet: [
        sprite_combat
    ],
    weaponSpriteSheet: {
    },
    level: 1,
    experience: 0,
    hitPoints: 18,
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
        slot_top: I.ITEM.SHORT_SWORD,
        slot_right: I.ITEM.HERB,
        slot_left: I.ITEM.NONE,
        slot_bottom: I.ITEM.NONE,
    },
    equip: {
        slot: [I.ITEM_SLOT.TOP],
    },
}

export default Goblin
