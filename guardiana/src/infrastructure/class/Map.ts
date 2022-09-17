import * as I from '../../utils/types';

export class Map {
    private pixels: { width: number, height: number }; // total pixels width and height
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

        this.pixelOffset = map.pixelOffset

        this.grid = map.grid

        this.cameraPosition = map.cameraStartLocation

        this.pixels = {
            width: map.mapDimentions.x * I.PIXEL.BLOCK,
            height: map.mapDimentions.y * I.PIXEL.BLOCK
        }

    }

    move(direction: I.DIRECTION) {
        switch (direction) {
            case I.DIRECTION.DOWN:
                this.cameraPosition.y -= (I.PIXEL.BLOCK * I.SCALE);
                break;
            case I.DIRECTION.UP:
                this.cameraPosition.y += (I.PIXEL.BLOCK * I.SCALE);
                break;
            case I.DIRECTION.LEFT:
                this.cameraPosition.x -= (I.PIXEL.BLOCK * I.SCALE);
                break;
            case I.DIRECTION.RIGHT:
                this.cameraPosition.x += (I.PIXEL.BLOCK * I.SCALE);
                break;
            default:
                break;
        }
    }

    // Make anything outside the map black.
    Oblivion() {
        const canvas: any = document.getElementById('layer-0');
        const ctx = canvas.getContext('2d');
        ctx.rect(-24, -24, canvas.offsetWidth, canvas.offsetHeight);
        ctx.fill();
    }

    drawMapBottom() {
        const canvas: any = document.getElementById('layer-0');
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = false;

        this.Oblivion();

        ctx.drawImage(
            this.bottomImage,
            this.pixelOffset.x, // TODO: Why is the map loading 4 pixels off?
            this.pixelOffset.y,
            this.pixels.width,
            this.pixels.height,
            this.cameraPosition.x,
            this.cameraPosition.y,
            this.pixels.width * I.SCALE,
            this.pixels.height * I.SCALE
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
            this.pixels.width,
            this.pixels.height,
            this.cameraPosition.x,
            this.cameraPosition.y,
            this.pixels.width * I.SCALE,
            this.pixels.height * I.SCALE
        );
    }

    cameraToTarget(targetLocation: { x: number, y: number }) {
        this.cameraPosition = targetLocation;
    }

}