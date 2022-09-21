import baseSprite from './sprite-tao.png';
import promotedSprite from './sprite-tao2.png';
import altSprite from './sprite-tao3.png';

interface ICharacterProps {
    characterName: string,
    spriteSheet: string[]
}

export const Toa: ICharacterProps = {
    characterName: 'Toa',
    spriteSheet: [
        baseSprite,
        promotedSprite,
        altSprite
    ]
};

export default Toa;
