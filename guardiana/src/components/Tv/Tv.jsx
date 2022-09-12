import styled from 'styled-components';
import background from '../../assets/maps/battleMaps/battle01/map.png';
import goblin from '../../assets/enemies/Goblin/goblin-sprite.png';
import { useEffect } from 'react';

export default function Tv() {
    useEffect(() => {
        const canvas = document.getElementById('tv');
        canvas.setAttribute('width', 640);
        canvas.setAttribute('height', 420);
        const ctx = canvas.getContext('2d');

        const img1 = new Image();
        const img2 = new Image();

        const scale = 2.5;
        const width = 32;
        const height = 32;
        const scaledWidth = scale * width;
        const scaledHight = scale * height;

        img1.onload = () => {
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(img1, 64, 96, 640, 420, 0, 0, 640 * scale, 420 * scale);
            ctx.drawImage(img2, 0, 96, width, height, 226, 256, scaledWidth, scaledHight);
            ctx.drawImage(img2, 0, 96, width, height, 288, 256, scaledWidth, scaledHight);
        }

        img1.src = background;
        img2.src = goblin;
    });

    return (
        <StyledTv id="tv" />
    );
};

const StyledTv = styled('canvas')`
    width: 90vw;
    height: fit-content;
    margin-top: 2em;
    overflow: hidden;
    border: 5px solid #0a0a0a;
    background-color: #1e272e;
    border-radius: 2em;
    image-rendering: -moz-crisp-edges;
    image-rendering: -webkit-crisp-edges;
    image-rendering: pixelated;
    image-rendering: crisp-edges;
`;
