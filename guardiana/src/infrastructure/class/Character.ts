import * as I from '../../utils/types';

export class Character {
    public characterID: string;
    public characterName: string;
    public positionOnTV: { x: number, y: number };
    private size: any;
    public sprite: any;
    private spriteGrid: any;
    private lastUpdate: any;
    private animate: { isAnimated: boolean, animationFlag: boolean };
    public currentLocationOnGrid: { x: number, y: number };

    // === Hero specific 
    public alignment: I.ALIGNMENT;
    public stepsTaken: number;
    public stats: I.STATS;
    public initiative: number;
    public facing: I.DIRECTION;

    constructor(character: I.Character, spawnLocation: { x: number, y: number }, cameraPosition: { x: number, y: number }, index: number) {

        this.alignment = character.alignment ?? I.ALIGNMENT.NEUTRAL

        spawnLocation = spawnLocation ?? {x: 0, y: 0}

        this.stats = character.stats

        this. initiative = 0

        this.characterName = character.characterName

        this.facing = I.DIRECTION.DOWN;

        this.characterID = `${character.characterName}${index}${character.alignment}`

        this.animate = {
            isAnimated: character.isAnimated ?? true,
            animationFlag: false
        }

        this.positionOnTV = {
            x: (spawnLocation.x - cameraPosition.x) * I.PIXEL.BLOCK * I.SCALE,
            y: (spawnLocation.y - cameraPosition.y) * I.PIXEL.BLOCK * I.SCALE
        }

        this.currentLocationOnGrid = {
            x: spawnLocation.x,
            y: spawnLocation.y
        }; // You place on the map.

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

        this.sprite.src = character.spriteSheet[0];

        this.stepsTaken = 0;
    }

    face(direction: I.DIRECTION) {
        try {
            switch (direction) {
                case I.DIRECTION.DOWN:
                    this.spriteGrid.x = 0;
                    this.animate.animationFlag = false;
                    this.facing = I.DIRECTION.DOWN;
                    break;
                case I.DIRECTION.UP:
                    this.spriteGrid.x = I.PIXEL.BLOCK * 4;
                    this.animate.animationFlag = false;
                    this.facing = I.DIRECTION.UP;
                    break;
                case I.DIRECTION.LEFT:
                    this.spriteGrid.x = I.PIXEL.BLOCK * 2;
                    this.animate.animationFlag = false;
                    this.facing = I.DIRECTION.LEFT;
                    break;
                case I.DIRECTION.RIGHT:
                    this.spriteGrid.x = I.PIXEL.BLOCK * 6;
                    this.animate.animationFlag = false;
                    this.facing = I.DIRECTION.RIGHT;
                    break;
                default:
                    console.log('Something broke in the face() function. No clue how.')
                    break;
            }
        } finally {
            this.update();
        }
    }

    move(direction: I.DIRECTION) {
        
        try {
            switch (direction) {
                case I.DIRECTION.DOWN:
                    this.currentLocationOnGrid.y++;
                    this.positionOnTV.y += I.PIXEL.BLOCK * I.SCALE;
                    break;
                case I.DIRECTION.UP:
                    this.currentLocationOnGrid.y--;
                    this.positionOnTV.y -= I.PIXEL.BLOCK * I.SCALE;
                    break;
                case I.DIRECTION.LEFT:
                    this.currentLocationOnGrid.x--;
                    this.positionOnTV.x -= I.PIXEL.BLOCK * I.SCALE;
                    break;
                case I.DIRECTION.RIGHT:
                    this.currentLocationOnGrid.x++;
                    this.positionOnTV.x += I.PIXEL.BLOCK * I.SCALE;
                    break;
                default:
                    break;
            }
        } finally {
            this.update();
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

        if (this.characterName === "Rune Knight") {
            //console.log(spriteFinalSizeInPixels)
        }
        let ctx: any = document.getElementById('layer-1');
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

    update() {
        this.draw();
    }
}