import styled from 'styled-components';
import * as I from '../../utils/types';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import spriteSheet_max from '../../assets/characters/Max/base/max-sprite.png';

class Map {
    private pixels: { width: number, height: number }; // total pixels width and height
    private scale: number;
    private bottomImage: any; //
    private topImage: any;
    private cameraPosition: { x: number, y: number };
    private pixelOffset: { x: number, y: number };
    public grid: number[][];
    public heroStartLocations: { name: string, x: number, y: number }[];
    public enemyStartLocations: { name: string, x: number, y: number }[] | null[];
    public npcStartLocations: { name: string, x: number, y: number }[] | null[];

    constructor(map: I.Map) {

        // === Images === //
        this.bottomImage = new Image()
        this.topImage = new Image()
        this.bottomImage.src = map.imageBottom
        this.topImage.src = map.imageTop

        this.heroStartLocations = map.heroStartLocations
        this.enemyStartLocations = map.enemyStartLocations
        this.npcStartLocations = map.enemyStartLocations

        this.grid = map.grid

        this.scale = 3 // TODO GET THIS FROM SETTINGS

        this.pixelOffset = map.pixelOffset

        this.grid = map.grid

        this.cameraPosition = map.cameraStartLocation

        this.pixels = {
            width: map.mapDimentions.x * I.PIXEL.BLOCK,
            height: map.mapDimentions.y * I.PIXEL.BLOCK
        }

    }

    move(direction: Direction) {
        switch (direction) {
            case Direction.DOWN:
                this.cameraPosition.y -= (I.PIXEL.BLOCK * this.scale);
                break;
            case Direction.UP:
                this.cameraPosition.y += (I.PIXEL.BLOCK * this.scale);
                break;
            case Direction.LEFT:
                this.cameraPosition.x -= (I.PIXEL.BLOCK * this.scale);
                break;
            case Direction.RIGHT:
                this.cameraPosition.x += (I.PIXEL.BLOCK * this.scale);
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
            this.bottomImage,
            this.pixelOffset.x, // TODO: Why is the map loading 4 pixels off?
            this.pixelOffset.y,
            this.pixels.height,
            this.pixels.width,
            this.cameraPosition.x,
            this.cameraPosition.y,
            this.pixels.width * this.scale,
            this.pixels.height * this.scale
        );
    }

    drawMapTop() {
        const canvas: any = document.getElementById('layer-0');
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = false;

        ctx.drawImage(
            this.topImage,
            this.pixelOffset.x, // TODO: Why is the map loading 4 pixels off?
            this.pixelOffset.y,
            this.pixels.height,
            this.pixels.width,
            this.cameraPosition.x,
            this.cameraPosition.y,
            this.pixels.width * this.scale,
            this.pixels.height * this.scale
        );
    }

    cameraToTarget(targetLocation: { x: number, y: number }) {
        this.cameraPosition = targetLocation;
    }

}

enum Direction {
    LEFT,
    RIGHT,
    UP,
    DOWN
}

class Item {
    constructor() {

    }
}

class Character {
    public positionOnTV: { x: number, y: number };
    private size: any;
    private sprite: any;
    private spriteGrid: any;
    private lastUpdate: any;
    private scale: number; //TODO pull from settings
    public currentLocation: { x: number, y: number };
    public currentSquareID: string;

    constructor(spawnLocation: { name: string, x: number, y: number }) {
        this.scale = 3;

        this.positionOnTV = {
            x: spawnLocation.x * I.PIXEL.BLOCK * this.scale,
            y: spawnLocation.y * I.PIXEL.BLOCK * this.scale
        } // your location on the 576x480 canvus 

        this.currentLocation = {
            x: spawnLocation.x,
            y: spawnLocation.y
        }; // You place on the map.

        this.currentSquareID = `${this.currentLocation.x}${this.currentLocation.y}`;

        this.size = {
            width: I.PIXEL.BLOCK,
            height: I.PIXEL.BLOCK
        } // the size of your sprite from left to right

        this.spriteGrid = {
            x: 0,
            y: 0
        }; // the full size of the sprite grid

        this.lastUpdate = Date.now();

        this.sprite = new Image();
        this.sprite.src = spriteSheet_max;
    }

    face(direction: Direction) {
        try {
            switch (direction) {
                case Direction.DOWN:
                    this.spriteGrid.y = 0;
                    break;
                case Direction.UP:
                    this.spriteGrid.y = I.PIXEL.BLOCK;
                    break;
                case Direction.LEFT:
                    this.spriteGrid.y = I.PIXEL.BLOCK * 2;
                    break;
                case Direction.RIGHT:
                    this.spriteGrid.y = I.PIXEL.BLOCK * 3;
                    break;
                default:
                    console.log('Bad direction detected.');
                    break;
            }
        } finally {
            this.Update();
        }
    }

    updateSquareID() {
        this.currentSquareID = `${this.currentLocation.x}${this.currentLocation.y}`;
    }

    move(direction: Direction) {
        try {
            switch (direction) {
                case Direction.DOWN:
                    this.currentLocation.y++;
                    this.positionOnTV.y += I.PIXEL.BLOCK * this.scale;
                    break;
                case Direction.UP:
                    this.currentLocation.y--;
                    this.positionOnTV.y -= I.PIXEL.BLOCK * this.scale;
                    break;
                case Direction.LEFT:
                    this.currentLocation.x--;
                    this.positionOnTV.x -= I.PIXEL.BLOCK * this.scale;
                    break;
                case Direction.RIGHT:
                    this.currentLocation.x++;
                    this.positionOnTV.x += I.PIXEL.BLOCK * this.scale;
                    break;
                default:
                    console.log('Bad direction detected.');
                    break;
            }
        } finally {
            this.Update();
        }

    }

    draw() {
        if (this.lastUpdate + 500 <= Date.now()) {
            this.lastUpdate = Date.now();
            if (this.spriteGrid.x === I.PIXEL.BLOCK) {
                this.spriteGrid.x = 0;
            } else {
                this.spriteGrid.x = I.PIXEL.BLOCK;
            };
        }

        const spriteFinalSizeInPixels = {
            x: I.PIXEL.BLOCK * this.scale,
            y: I.PIXEL.BLOCK * this.scale
        }

        let ctx: any = document.getElementById('layer-0');
        ctx = ctx.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(
            this.sprite,
            this.spriteGrid.x,
            this.spriteGrid.y,
            this.size.width,
            this.size.height,
            this.positionOnTV.x,
            this.positionOnTV.y,
            spriteFinalSizeInPixels.x,
            spriteFinalSizeInPixels.y);
    }

    Update() {
        this.draw();
        this.updateSquareID();
    }
}

export default function Tv() {
    let mounted: boolean = true;
    const map: I.Map = useSelector((state: { map: I.Map }) => state.map);
    const Background = new Map(map);
    const Player = new Character(Background.heroStartLocations[0]);
    const scale = 3;

    const Update = () => {
        if (!mounted) { return };

        let ctx: any = document.getElementById('layer-0')
        ctx = ctx.getContext('2d');
        Background.drawMapBottom();
        Player.draw();
        Background.drawMapTop();
        //}

        requestAnimationFrame(Update);
    };

    window.addEventListener('keydown', ({ keyCode }) => {

        switch (keyCode) {
            case 87: //W //UP
                {
                    Player.face(Direction.UP);

                    // check for blocks

                    const nextSquare: number = Background.grid[Player.currentLocation.y - 1][Player.currentLocation.x];
                    if (nextSquare <= 7) {
                        console.log(`boop`);
                        return;
                    };

                    // check if camera update is needed
                    if (Player.positionOnTV.y <= I.PIXEL.BLOCK * 2 * scale) {
                        Background.move(Direction.UP);
                        Player.currentLocation.y--;
                        Player.Update();
                    } else {
                        Player.move(Direction.UP);
                    };

                    console.table(`Current Block: ${Player.currentLocation.x}${[Player.currentLocation.y]}`);
                    break;
                }
            case 83: //S
                {
                    Player.face(Direction.DOWN);

                    const nextSquare: number = Background.grid[Player.currentLocation.y + 1][Player.currentLocation.x];
                    if (nextSquare <= 7) {
                        console.log(`boop`);
                        return;
                    };

                    // camera update
                    console.log(Player.positionOnTV.y);
                    if (Player.positionOnTV.y >= I.PIXEL.BLOCK * 4 * scale) {
                        // move camera with player.
                        Background.move(Direction.DOWN);
                        Player.currentLocation.y++;
                        Player.Update();
                    }
                    else {
                        Player.move(Direction.DOWN);
                    };

                    console.table(`Current Block: ${Player.currentLocation.x}${[Player.currentLocation.y]}`);
                    break;
                }
            case 65: //A
                {
                    Player.face(Direction.LEFT);

                    const nextSquare: number = Background.grid[Player.currentLocation.y][Player.currentLocation.x - 1];
                    if (nextSquare <= 7) {
                        console.log(`boop`);
                        return;
                    };

                    // check if we need to move the camera
                    if (Player.positionOnTV.x <= I.PIXEL.BLOCK * 3 * scale) {
                        Background.move(Direction.RIGHT);
                        Player.currentLocation.x--;
                        Player.Update();
                    } else {
                        Player.move(Direction.LEFT);
                    }

                    console.table(`Current Block: ${Player.currentLocation.x}${[Player.currentLocation.y]}`);
                    break;
                }
            case 68: //D
                {
                    Player.face(Direction.RIGHT);

                    const nextSquare: number = Background.grid[Player.currentLocation.y][Player.currentLocation.x + 1];
                    if (nextSquare <= 7) {
                        console.log(`boop`);
                        return;
                    };

                    if (Player.positionOnTV.x >= I.PIXEL.BLOCK * 5 * scale) {
                        Background.move(Direction.LEFT);
                        Player.currentLocation.x++;
                        Player.Update();
                    } else {
                        Player.move(Direction.RIGHT);
                    }

                    console.table(`Current Block: ${Player.currentLocation.x}${[Player.currentLocation.y]}`);
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
