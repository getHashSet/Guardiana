import styled from 'styled-components';
import * as I from '../../utils/types';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import spriteSheet_max from '../../assets/characters/Max/base/max-sprite.png';

class Background {
    private pixels: { width: number, height: number };
    private position: { x: number, y: number };
    private scale: number;
    private bottom: any;
    private top: any;
    public playerStartPosition: [number, number];
    private pixelOffset: { x: number, y: number };
    public blocked: string[];

    constructor(map: I.Map) {
        this.scale = 3; // TODO GET THIS FROM SETTINGS

        this.pixelOffset = map.pixelOffset;

        this.blocked = map.blocked;

        this.playerStartPosition = map.startingLocation;

        this.position = {
            x: 0 - this.playerStartPosition[0] * 24,
            y: 0 - this.playerStartPosition[1] * 24
        }

        this.pixels = {
            width: map.grid[0] * 24,
            height: map.grid[1] * 24
        }

        this.bottom = new Image();
        this.top = new Image();
        this.bottom.src = map.imageBottom;
        this.top.src = map.imageTop
    }

    move(direction: Direction) {
        switch (direction) {
            case Direction.DOWN:
                this.position.y -= (24 * this.scale);
                break;
            case Direction.UP:
                this.position.y += (24 * this.scale);
                break;
            case Direction.LEFT:
                this.position.x -= (24 * this.scale);
                break;
            case Direction.RIGHT:
                this.position.x += (24 * this.scale);
                break;
            default:
                break;
        }
    }

    drawMapBottom() {
        const canvas: any = document.getElementById('layer-0');
        // canvas.setAttribute('width', 576);
        // canvas.setAttribute('height', 480);
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = false;

        ctx.drawImage(
            this.bottom,
            this.pixelOffset.x, // TODO: Why is the map loading 4 pixels off?
            this.pixelOffset.y,
            this.pixels.height,
            this.pixels.width,
            this.position.x,
            this.position.y,
            this.pixels.width * this.scale,
            this.pixels.height * this.scale
        );

        // ctx.drawImage(
        //     this.top,
        //     -4, // TODO: Why is the map loading 4 pixels off?
        //     0,
        //     this.pixels.height,
        //     this.pixels.width,
        //     this.position.x,
        //     this.position.y,
        //     this.pixels.width * this.scale,
        //     this.pixels.height * this.scale
        // );
    }

    drawMapTop() {
        const canvas: any = document.getElementById('layer-0');
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = false;

        ctx.drawImage(
            this.top,
            this.pixelOffset.x, // TODO: Why is the map loading 4 pixels off?
            this.pixelOffset.y,
            this.pixels.height,
            this.pixels.width,
            this.position.x,
            this.position.y,
            this.pixels.width * this.scale,
            this.pixels.height * this.scale
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
    private size: any;
    private sprite: any;
    private spriteGrid: any;
    private lastUpdate: any;
    private scale: number; //TODO pull from settings
    public square: [number, number];

    constructor() {
        this.scale = 3;

        this.position = {
            x: 0 * 24 * this.scale,
            y: 0 * 24 * this.scale
        } // your location on the 576x480 canvus 

        this.square = [0, 0]; // You place on the map.

        this.size = {
            width: 24,
            height: 24
        } // the size of your sprite from left to right

        this.spriteGrid = {
            x: 24,
            y: 96
        }; // the full size of the sprite grid

        this.lastUpdate = Date.now();

        this.sprite = new Image();
        this.sprite.src = spriteSheet_max;
    }

    face(direction: Direction) {
        switch (direction) {
            case Direction.DOWN:
                this.spriteGrid.y = 0;
                break;
            case Direction.UP:
                this.spriteGrid.y = 24;
                break;
            case Direction.LEFT:
                this.spriteGrid.y = 48;
                break;
            case Direction.RIGHT:
                this.spriteGrid.y = 72;
                break;
            default:
                console.log('Bad direction detected.');
                break;
        }
    }

    move(direction: Direction) {
        switch (direction) {
            case Direction.DOWN:
                this.square[1]++;
                this.position.y += 24 * this.scale;
                console.log('pos update');
                break;
            case Direction.UP:
                this.square[1]--;
                this.position.y -= 24 * this.scale;
                console.log('pos update');
                break;
            case Direction.LEFT:
                this.square[0]--;
                this.position.x -= 24 * this.scale;
                break;
            case Direction.RIGHT:
                this.square[0]++;
                this.position.x += 24 * this.scale;
                break;
            default:
                console.log('Bad direction detected.');
                break;
        }
    }

    draw() {
        if (this.lastUpdate + 500 <= Date.now()) {
            this.lastUpdate = Date.now();
            if (this.spriteGrid.x === 24) {
                this.spriteGrid.x = 0;
            } else {
                this.spriteGrid.x = 24;
            };
        }

        const spriteFinalSizeInPixels = {
            x: 24 * this.scale,
            y: 24 * this.scale
        }

        let ctx: any = document.getElementById('layer-0');
        ctx = ctx.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(this.sprite,
            this.spriteGrid.x,
            this.spriteGrid.y,
            this.size.width,
            this.size.height,
            this.position.x,
            this.position.y,
            spriteFinalSizeInPixels.x,
            spriteFinalSizeInPixels.y);
    }

    update() {
        this.draw();
    }
}

export default function Tv() {
    let mounted: boolean = true;
    const map: I.Map = useSelector((state: { map: I.Map }) => state.map);
    const background = new Background(map);
    const player = new Character();

    const Update = () => {
        if (!mounted) { return };

        let ctx: any = document.getElementById('layer-0')
        ctx = ctx.getContext('2d');
        background.drawMapBottom();
        player.draw();
        background.drawMapTop();
        //}

        requestAnimationFrame(Update);
    };

    window.addEventListener('keydown', ({ keyCode }) => {

        switch (keyCode) {
            case 87: //W //UP
                {
                    player.face(Direction.UP);

                    const nextSquare = `${player.square[0]}${player.square[1] - 1}`;
                    if (background.blocked.includes(nextSquare)) {
                        console.log(`boop: ${nextSquare} is blocked`);
                        return;
                    };

                    // camera update
                    // console.table(player.position);
                    // console.log('currentSquare: ' + player.square);
                    if (player.position.y <= 72) {
                        background.move(Direction.UP);
                        player.square[1]--;
                        player.draw();
                    } else {
                        player.move(Direction.UP);
                    };

                    console.table(player.position);
                    console.log('currentSquare: ' + player.square);

                    break;
                }
            case 83: //S
                player.face(Direction.DOWN);

                const nextSquare = `${player.square[0]}${player.square[1] + 1}`;
                if (background.blocked.includes(nextSquare)) {
                    console.log(`boop: ${nextSquare} is blocked`);
                    return;
                };

                // camera update
                if (player.position.y >= 300) {
                    // move camera with player.
                    background.move(Direction.DOWN);
                    player.square[1]++;
                    player.draw();
                }
                else {
                    player.move(Direction.DOWN);
                };

                console.table(player.position);
                console.log('currentSquare: ' + player.square);

                break;
            case 65: //A
                {
                    player.face(Direction.LEFT);

                    const nextSquare = `${player.square[0] - 1}${player.square[1]}`;
                    if (background.blocked.includes(nextSquare)) {
                        console.log(`boop: ${nextSquare} is blocked`);
                        return;
                    };
                    if (player.position.x <= 72) {
                        background.move(Direction.RIGHT);
                        player.square[0]++;
                        player.draw();
                    } else {
                        player.move(Direction.LEFT);
                    }
                    break;
                }

            case 68: //D
                {
                    player.face(Direction.RIGHT);

                    const nextSquare = `${player.square[0] + 1}${player.square[1]}`;
                    if (background.blocked.includes(nextSquare)) {
                        console.log(`boop: ${nextSquare} is blocked`);
                        return;
                    };

                    if (player.position.x >= 432) {
                        background.move(Direction.LEFT);
                        player.square[0]++;
                        player.draw();
                    } else {
                        player.move(Direction.RIGHT);
                    }

                    break;
                }
            default:
                break;
        }
    });

    useEffect(() => {

        const canvas: any = document.getElementById('layer-0');
        canvas.setAttribute('width', 576);
        canvas.setAttribute('height', 480);
        console.log('TV mounted');
        Update();

        return () => {
            mounted = false;
            console.log('Unmounted TV');
        }
    }, [Update, mounted]);

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
    border: 5px solid #0a0a0a;
    background-color: slategrey;
    border-radius: 2em;
    image-rendering: -moz-crisp-edges;
    image-rendering: -webkit-crisp-edges;
    image-rendering: pixelated;
    image-rendering: crisp-edges;
`;
