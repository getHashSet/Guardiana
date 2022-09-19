import baseSprite from './sprite-toa.png';
import promotedSprite from './sprite-toa2.png';
import altSprite from './sprite-toa3.png';

interface ICharacterProps {
    characterName: string,
    spriteSheets: string[]
}

export const Toa: ICharacterProps = {
    characterName: 'Toa',
    spriteSheets: [
        baseSprite,
        promotedSprite,
        altSprite
    ]
};

export default Toa;
