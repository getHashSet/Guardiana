import defaultBlock from '../../assets/icons/speed.png';
import styled from 'styled-components';

const idkLogIt = () => {
    console.log('Idk what to do here. Error in Square.tsx');
}

export default function Square({ icon, onClickEvent }: { icon?: string, onClickEvent?: React.MouseEventHandler<HTMLButtonElement> }) {
    return (
        <Block onClick={onClickEvent ?? idkLogIt}>
            <img src={icon ?? defaultBlock} alt="defautl block" />
        </Block>
    )
}

const Block = styled('button')`
    position: relative;
    text-decoration: none;
    border: none;
    margin-bottom: 1em;
    border-radius: 1em;
    width: 84px;
    height: 84px;
    background-color: orange;
    overflow: hidden;
    image-rendering: pixelated;
    cursor: pointer;
    outline: none;

    img {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
    }
    
    &:hover,
    &:focus {
        img {
            animation: gif .7s infinite;
        }
    }

    @keyframes gif {
    0% {
        left: 0;
    }
    100% {
        left: unset;
        right: 0;
    }
}
`;
