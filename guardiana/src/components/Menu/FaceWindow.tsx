import { useEffect } from 'react';
import styled from 'styled-components';
import face from '../../assets/characters/Max/base/max-face.png'

class Face {
    public position: { x: number, y: number };
    private size: any;
    private sprite: any;
    private spriteGrid: any;

    constructor() {

        // Where on the x y grid the art will go
        this.position = {
            x: 0,
            y: 0
        }

        // size of the image slice
        this.size = {
            width: 48,
            height: 64
        }

        // what sprite block you are using on the sheet
        this.spriteGrid = {
            x: 0,
            y: 0
        };

        this.sprite = new Image();
        this.sprite.src = face;
    }

    blink() {
        if (this.spriteGrid.x !== 48) {
            this.spriteGrid.x = 48;
        } else {
            this.spriteGrid.x = 0;
        };

        this.update();
    }

    talk() {
        if (this.spriteGrid.x < 96) {
            const blink = this.randomNumber(1, 10) > 8;
            this.spriteGrid.x = blink ? 144 : 96;
        } else {
            this.spriteGrid.x = 0;
        };

        this.update();
        console.log('talky talky');
    }

    randomNumber (min: number, max: number) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    draw() {
        let ctx: any = document.getElementById('face');
        if (!ctx) { return };
        ctx = ctx.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(this.sprite, this.spriteGrid.x, this.spriteGrid.y, this.size.width, this.size.height, this.position.x, this.position.y, 300, 150);
    }

    update() {
        this.draw();
    }
}

export default function FaceWindow() {

    let lastUpdate: number = Date.now();
    let animationTimeout: number = 0;
    let componentMounted: boolean = true;
    let isTalking: boolean = true;

    function getRandomArbitrary(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }

    const Update = () => {

        // Without this cleanup then the function runs forever in the background and will impact the only view we have!
        // TODO: This might need to be added to the Tv.
        if (!componentMounted) { return };

        if (animationTimeout === 0) {

            animationTimeout = 50;
            _face.draw();

        } else if (isTalking && lastUpdate + animationTimeout <= Date.now()) {
            lastUpdate = Date.now();
            animationTimeout = getRandomArbitrary(50, 300);
            _face.talk();
        } else if (lastUpdate + animationTimeout <= Date.now()) {
            lastUpdate = Date.now();
            animationTimeout = animationTimeout === 200 ? 3000 : 200;

            _face.blink();
        };

        // Unless we "returned" out of this function. CALL IT AGAIN!
        requestAnimationFrame(Update);

    };

    useEffect(() => {
        Update();
        componentMounted = true;

        return () => {
            componentMounted = false;
        }
    }, [Update]);

    const _face = new Face();

    return (
        <StyledFaceBlock>
            <canvas id="face" />
        </StyledFaceBlock>
    )
}

const StyledFaceBlock = styled('div')`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 2em;
    left: 2em;
    background-color: ${props => props.theme.palette.black};
    overflow: hidden;
    width: 13em;
    height: 17em;

    canvas {
        width: 192px;
        height: 256px;
        background: yellow;
    }
`;
