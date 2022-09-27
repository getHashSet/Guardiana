import * as I from '../../utils/types';
import { Character } from './Character';

export class Map {
    private pixels: { width: number, height: number }; // total pixels width and height
    private bottomImage: any;
    private topImage: any;
    private pixelOffset: { x: number, y: number };
    private cameraPosition: { x: number, y: number };
    public cameraLocation: { x: number, y: number };
    public grid: number[][];
    public heroStartLocations: { name: string, x: number, y: number }[];
    public enemyStartLocations: { name: string, x: number, y: number }[];
    public npcStartLocations: { name: string, info: I.Character, x: number, y: number }[];
    private hasTopImage: boolean;
    public events: any; // TODO Type this beast
    public name: string;
    public isABattleMap: boolean;

    constructor(map: I.Map) {
        this.name = map.name;

        // === Images === //
        this.bottomImage = new Image()
        this.bottomImage.src = map.imageBottom

        this.hasTopImage = map.imageTop !== null;

        if (!map.imageTop) {
            this.hasTopImage = false;
        } else {
            this.topImage = new Image()
            this.topImage.src = map.imageTop
        }

        this.heroStartLocations = map.heroStartLocations
        this.enemyStartLocations = map.enemyStartLocations
        this.npcStartLocations = map.npcStartLocations

        this.grid = map.grid

        this.pixelOffset = map.pixelOffset

        this.grid = map.grid

        this.cameraLocation = map.cameraStartLocation;

        this.cameraPosition = {
            x: map.cameraStartLocation.x * I.PIXEL.BLOCK * I.SCALE * -1,
            y: map.cameraStartLocation.y * I.PIXEL.BLOCK * I.SCALE * -1
        }

        this.pixels = {
            width: map.mapDimentions.x * I.PIXEL.BLOCK,
            height: map.mapDimentions.y * I.PIXEL.BLOCK
        }

        this.isABattleMap = map.isABattleMap;

        // === EVENTS === //
        this.events = map.events;

    }

    move(direction: I.DIRECTION) {
        switch (direction) {
            case I.DIRECTION.DOWN:
                this.cameraPosition.y -= (I.PIXEL.BLOCK * I.SCALE)
                this.cameraLocation.y++
                break;
            case I.DIRECTION.UP:
                this.cameraPosition.y += (I.PIXEL.BLOCK * I.SCALE)
                this.cameraLocation.y--
                break;
            case I.DIRECTION.LEFT:
                this.cameraPosition.x -= (I.PIXEL.BLOCK * I.SCALE)
                this.cameraLocation.x++
                break;
            case I.DIRECTION.RIGHT:
                this.cameraPosition.x += (I.PIXEL.BLOCK * I.SCALE)
                this.cameraLocation.x--
                break;
            default:
                break;
        }
    }

    //Make anything outside the map black.
    Oblivion() {
        const canvas: any = document.getElementById('layer-0');
        const ctx = canvas.getContext('2d');
        ctx.rect(-24, -24, canvas.offsetWidth, canvas.offsetHeight);
        ctx.fill();
    }

    draw() {
        this.drawMapBottom();
        this.drawMapTop();
    }

    drawMapBottom() {
        const canvas: any = document.getElementById('layer-0');
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = false;

        this.Oblivion();

        ctx.drawImage(
            this.bottomImage,           // Image that will be painted to the canvas
            this.pixelOffset.x,         // Moves the image but not the grid: ;
            this.pixelOffset.y,         // Moves the image but not the grid: ;
            this.pixels.width,          // stretch image to canvas
            this.pixels.height,         // stretch image to canvas
            this.cameraPosition.x,      // Moves the image but not the grid: ;
            this.cameraPosition.y,      // Moves the image but not the grid: ;
            this.pixels.width * I.SCALE,// idk
            this.pixels.height * I.SCALE// idk
        );
    }

    drawMapTop() {

        if (!this.hasTopImage) { return };

        const canvas: any = document.getElementById('layer-2');
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = false;

        ctx.drawImage(
            this.topImage,
            this.pixelOffset.x,
            this.pixelOffset.y,
            this.pixels.width,
            this.pixels.height,
            this.cameraPosition.x,
            this.cameraPosition.y,
            this.pixels.width * I.SCALE,
            this.pixels.height * I.SCALE
        );
    }
}