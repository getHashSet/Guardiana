import styled from 'styled-components';
import background from '../../assets/maps/battleMaps/battle01/map.png';
import { useEffect } from 'react';
import spriteSheet_max from '../../assets/characters/Max/normal/max-sprite.png';
import spriteSheet_goblin from '../../assets/enemies/Goblin/goblin-sprite.png';

class Background {
    private size: { width: number, height: number };
    private position: { x: number, y: number };
    private scale: number;
    private sprite: any;

    move(direction: Direction) {
        switch (direction) {
            case Direction.DOWN:
                this.position.y -= (20 * this.scale);
                break;
            case Direction.UP:
                this.position.y += (20 * this.scale);
                break;
            case Direction.LEFT:
                this.position.x -= (20 * this.scale);
                break;
            case Direction.RIGHT:
                this.position.x += (20 * this.scale);
                break;
            default:
                break;
        }
    }

    constructor() {
        this.size = {
            width: 640,
            height: 420
        }

        this.position = {
            x: -320,
            y: -320
        }

        this.sprite = new Image();
        this.sprite.src = background;

        this.scale = 2.5; // TODO GET THIS FROM SETTINGS
    }

    draw() {
        const canvas: any = document.getElementById('layer-0');
        canvas.setAttribute('width', this.size.width);
        canvas.setAttribute('height', this.size.height);
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(
            this.sprite, // Image
            this.position.x,  // X location
            this.position.y,  // Y location
            this.size.height * this.scale,
            this.size.width * this.scale
        );

    }
}

enum Direction {
    LEFT,
    RIGHT,
    UP,
    DOWN
}

class Character {
    public position: { x: number, y: number };
    private velocity: any;
    private size: any;
    private sprite: any;
    private spriteGrid: any;
    private lastUpdate: any;

    constructor() {
        this.position = {
            x: 256,
            y: 32
        }

        this.velocity = {
            x: 0,
            y: 0
        }

        this.size = {
            width: 32,
            height: 32
        }

        this.spriteGrid = {
            x: 32,
            y: 96
        };

        this.velocity = 18 * 2.5; // TODO pull scale from settings

        this.lastUpdate = Date.now();

        this.sprite = new Image();
        this.sprite.src = spriteSheet_max;
    }

    face(direction: Direction) {
        switch (direction) {
            case Direction.DOWN:
                this.spriteGrid.y = 96;
                break;
            case Direction.UP:
                this.spriteGrid.y = 64;
                break;
            case Direction.LEFT:
                this.spriteGrid.y = 0;
                break;
            case Direction.RIGHT:
                this.spriteGrid.y = 32;
                break;
            default:
                console.log('Bad direction detected.');
                break;
        }
    }

    move(direction: Direction) {
        switch (direction) {
            case Direction.DOWN:
                if (this.position.y + this.velocity >= 420) { break; }
                this.position.y += this.velocity;
                break;
            case Direction.UP:
                if (this.position.y <= 0) { break; }
                this.position.y -= this.velocity;
                break;
            case Direction.LEFT:
                if (this.position.x <= 0) { break; }
                this.position.x -= this.velocity;
                break;
            case Direction.RIGHT:
                if (this.position.x + (this.velocity * 2) >= 640) { break; }
                this.position.x += this.velocity;
                break;
            default:
                console.log('Bad direction detected.');
                break;
        }
    }

    draw() {

        if (this.lastUpdate + 500 <= Date.now()) {
            this.lastUpdate = Date.now();
            if (this.spriteGrid.x === 32) {
                this.spriteGrid.x = 0;
            } else {
                this.spriteGrid.x = 32;
            };
        }

        let ctx: any = document.getElementById('layer-0');
        ctx = ctx.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(this.sprite, this.spriteGrid.x, this.spriteGrid.y, this.size.width, this.size.height, this.position.x, this.position.y, 32 * 2.5, 32 * 2.5);
    }

    update() {
        this.draw();
    }
}

export default function Tv() {

    const player = new Character();
    const background = new Background();

    const Update = () => {
        let ctx: any = document.getElementById('layer-0')
        ctx = ctx.getContext('2d');
        //ctx.clearRect(0, 0, 640, 420); THIS IS CAUSING A FLICKER!

        if (player.position.y >= 320) {
            background.move(Direction.DOWN);
            player.move(Direction.UP);
        } else if (player.position.y <= 0) {
            background.move(Direction.UP);
            player.move(Direction.DOWN);
        } else if (player.position.x < 32) {
            background.move(Direction.RIGHT);
            player.move(Direction.RIGHT);
        } else if (player.position.x > 520) {
            background.move(Direction.LEFT);
            player.move(Direction.LEFT);
        } else {
            background.draw();
            player.update();
        }

        requestAnimationFrame(Update);
    };

    window.addEventListener('keydown', ({ keyCode }) => {
        switch (keyCode) {
            case 87:
                //console.log("w");
                player.move(Direction.UP);
                player.face(Direction.UP);
                break;
            case 65:
                //console.log("a");
                player.move(Direction.LEFT);
                player.face(Direction.LEFT);
                break;
            case 83:
                //console.log("s");
                player.move(Direction.DOWN);
                player.face(Direction.DOWN);
                break;
            case 68:
                //console.log("d");
                player.move(Direction.RIGHT);
                player.face(Direction.RIGHT);
                break;
            default:
                break;
        }
    });

    useEffect(() => {
        Update();
    }, [Update]);

    return (
        <>
            <StyledTv id="layer-0" />
        </>
    );
};


const StyledTv = styled('canvas')`
    width: 90vw;
    max-width: 1080px;
    height: auto;
    overflow: hidden;
    background: black;
    border: 5px solid #0a0a0a;
    background-color: black;
    border-radius: 2em;
    image-rendering: -moz-crisp-edges;
    image-rendering: -webkit-crisp-edges;
    image-rendering: pixelated;
    image-rendering: crisp-edges;
`;
