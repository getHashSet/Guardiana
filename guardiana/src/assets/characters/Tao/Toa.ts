import { Character } from "../../../infrastructure/class/Character";
import * as I from '../../../utils/types';
import baseSprite from './sprite-toa.png';
import promotedSprite from './sprite-toa2.png';
import altSprite from './sprite-toa3.png';

// TODO: Add code splitting to sprites to prevent importing un-used sprites for the character. This includes spells, attack animations, and weapon animations.

interface IProps {
    spawnLocation: { x: number, y: number },
    cameraPosition: { x: number, y: number },
    animate: boolean,
    characterInfo: I.Character
}

export const Toa = (props: IProps) => {
    const { spawnLocation, cameraPosition, animate, characterInfo } = props;
    const spriteSheet = (): string => {

        if (Object.values(characterInfo.items).map(item => item.name === 'Bikini')) {
            return altSprite;
        } else if (characterInfo.isPromoted) {
            return promotedSprite;
        };

        return baseSprite;
    }
    const characterName = "Toa";

    return new Character(characterName, spawnLocation, cameraPosition, animate);
}
