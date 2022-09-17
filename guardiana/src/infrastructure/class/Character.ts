import * as I from '../../utils/types';

export class Character {
    public positionOnTV: { x: number, y: number };
    private size: any;
    private sprite: any;
    private spriteGrid: any;
    private lastUpdate: any;
    private animate: { isAnimated: boolean, animationFlag: boolean };
    public currentLocation: { x: number, y: number };
    public currentSquareID: string;

    constructor(spawnLocation: { name: string, x: number, y: number }, spriteSheet: any, animate: boolean = true) {

        this.animate = {
            isAnimated: animate,
            animationFlag: false
        }

        this.positionOnTV = {
            x: spawnLocation.x * I.PIXEL.BLOCK * I.SCALE,
            y: spawnLocation.y * I.PIXEL.BLOCK * I.SCALE
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
        this.sprite.src = spriteSheet;
    }

    face(direction: I.DIRECTION) {
        try {
            switch (direction) {
                case I.DIRECTION.DOWN:
                    this.spriteGrid.x = 0;
                    this.animate.animationFlag = false;
                    break;
                case I.DIRECTION.UP:
                    this.spriteGrid.x = I.PIXEL.BLOCK * 4;
                    this.animate.animationFlag = false;
                    break;
                case I.DIRECTION.LEFT:
                    this.spriteGrid.x = I.PIXEL.BLOCK * 2;
                    this.animate.animationFlag = false;
                    break;
                case I.DIRECTION.RIGHT:
                    this.spriteGrid.x = I.PIXEL.BLOCK * 6;
                    this.animate.animationFlag = false;
                    break;
                default:
                    break;
            }
        } finally {
            this.Update();
        }
    }

    updateSquareID() {
        this.currentSquareID = `${this.currentLocation.x}${this.currentLocation.y}`;
    }

    move(direction: I.DIRECTION) {
        try {
            switch (direction) {
                case I.DIRECTION.DOWN:
                    this.currentLocation.y++;
                    this.positionOnTV.y += I.PIXEL.BLOCK * I.SCALE;
                    break;
                case I.DIRECTION.UP:
                    this.currentLocation.y--;
                    this.positionOnTV.y -= I.PIXEL.BLOCK * I.SCALE;
                    break;
                case I.DIRECTION.LEFT:
                    this.currentLocation.x--;
                    this.positionOnTV.x -= I.PIXEL.BLOCK * I.SCALE;
                    break;
                case I.DIRECTION.RIGHT:
                    this.currentLocation.x++;
                    this.positionOnTV.x += I.PIXEL.BLOCK * I.SCALE;
                    break;
                default:
                    break;
            }
        } finally {
            this.Update();
        }

    }

    animation() {
        if (this.animate.isAnimated && this.lastUpdate + 500 <= Date.now()) {

            this.lastUpdate = Date.now();


            if (this.animate.animationFlag) {
                this.spriteGrid.x -= I.PIXEL.BLOCK;
            } else {
                this.spriteGrid.x += I.PIXEL.BLOCK;
            };

            this.animate.animationFlag = !this.animate.animationFlag;
        }
    }

    draw() {

        this.animation()

        const spriteFinalSizeInPixels = {
            x: I.PIXEL.BLOCK * I.SCALE,
            y: I.PIXEL.BLOCK * I.SCALE
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