import styled from 'styled-components';
import * as I from '../../utils/types';
import { useSelector, useDispatch } from 'react-redux';
import { setMap } from '../../redux/actions';
import { useEffect } from 'react';
import { Character } from '../../infrastructure/class/Character';
import { Map } from '../../infrastructure/class/Map';

// ============ //
// === TEMP === //
// ============ //
import Max from '../../assets/characters/Max';
import Tao from '../../assets/characters/Tao';
import Adam from '../../assets/characters/Adam';

// ================= //
// === COMPONENT === //
// ================= //
export default function Tv() {
    const dispatch = useDispatch();
    const fps = 30;
    let mounted: boolean = true;
    const map: I.Map = useSelector((state: { map: I.Map }) => state.map);
    const Background = new Map(map);
    const Player = new Character(Max.characterName, Background.heroStartLocations[0], Background.cameraLocation, Max.spriteSheet[0], true);
    const Player2 = new Character(Tao.characterName, Background.heroStartLocations[1], Background.cameraLocation, Tao.spriteSheet[0], true);
    const Player3 = new Character(Adam.characterName,Background.heroStartLocations[2], Background.cameraLocation, Adam.spriteSheet[0], true);
    const objectsOnLayer1 = [Player, Player2, Player3];

    const updateMap = (nextMap: I.Map) => {
        setTimeout(() => {
            dispatch(setMap(nextMap));
        }, 200);
    };

    const mapEvents = (eventID: number) => {
        switch (eventID) {
            case 41: // update map exit 1
                {
                    const nextMap = Background.events.getMap(eventID);
                    updateMap(nextMap);
                }
                break;
            case 42: // update map exit 2
                {
                    const nextMap = Background.events.getMap(eventID);
                    updateMap(nextMap);
                }
                break;
            case 43: // update map exit 3
                {
                    const nextMap = Background.events.getMap(eventID);
                    updateMap(nextMap);
                }
                break;
            default:
                console.log('bad map event in Game.tsx');
                break;
        }
    };

    // ============== //
    // === UPDATE === //
    // ============== //
    const Update = () => {

        if (!mounted) { return };

        const layer1_el: any = document.getElementById('layer-1');
        const layer2_el: any = document.getElementById('layer-2');
        const layer1 = layer1_el.getContext('2d');
        const layer2 = layer2_el.getContext('2d');


        try {

            layer1.clearRect(0, 0, layer1_el.width, layer1_el.height);
            layer2.clearRect(0, 0, layer2_el.width, layer2_el.height);

            Background.draw();
            objectsOnLayer1.forEach((objectOnCanvasLayer1: Character) => {
                objectOnCanvasLayer1.draw();
            });

        } finally {

            setTimeout(() => {
                requestAnimationFrame(Update);
            }, 1000 / fps)

        };
    };

    // ================ //
    // === MOVEMENT === //
    // ================ //
    const movement = ({ keyCode }: any) => {

        switch (keyCode) {
            case 87: //W //UP
                {
                    Player.face(I.DIRECTION.UP);

                    // check for blocks

                    const nextSquare: number = Background.grid[Player.currentLocationOnGrid.y - 1][Player.currentLocationOnGrid.x];
                    if (nextSquare <= 7) {
                        console.log(`boop`);
                        return;
                    };

                    // check if camera update is needed
                    if (Player.positionOnTV.y <= 2 * (I.PIXEL.BLOCK * I.SCALE)) {
                        Background.move(I.DIRECTION.UP);
                        objectsOnLayer1.forEach((objectOnLayer: Character) => {
                            objectOnLayer.currentLocationOnGrid.y--;
                            if (objectOnLayer.characterName === Player.characterName) { return };
                            objectOnLayer.move(I.DIRECTION.DOWN);
                        });
                        Player.update();
                    } else {
                        Player.move(I.DIRECTION.UP);
                    };

                    const currentSquareEventID: number = Background.grid[Player.currentLocationOnGrid.y][Player.currentLocationOnGrid.x];

                    // check for triggered events
                    if (currentSquareEventID >= 40) {
                        mapEvents(currentSquareEventID);
                    };

                    console.table(`Current Block: [${Player.currentLocationOnGrid.x},${[Player.currentLocationOnGrid.y]}]`);
                    break;
                }
            case 83: //S
                {
                    Player.face(I.DIRECTION.DOWN);

                    const nextSquare: number = Background.grid[Player.currentLocationOnGrid.y + 1][Player.currentLocationOnGrid.x];
                    if (nextSquare <= 7) {
                        console.log(`boop`);
                        return;
                    };

                    const tv: any = document.getElementById('layer-1');

                    // camera update
                    if (Player.positionOnTV.y >= tv.height - (I.PIXEL.BLOCK * I.SCALE * 3)) {
                        Background.move(I.DIRECTION.DOWN);
                        objectsOnLayer1.forEach((objectOnLayer: Character) => {
                            objectOnLayer.currentLocationOnGrid.y++;
                            if (objectOnLayer.characterName === Player.characterName) { return };
                            objectOnLayer.move(I.DIRECTION.UP);
                        });
                        Player.update();
                    }
                    else {
                        Player.move(I.DIRECTION.DOWN);
                    };

                    const currentSquareEventID: number = Background.grid[Player.currentLocationOnGrid.y][Player.currentLocationOnGrid.x];

                    // check for triggered events
                    if (currentSquareEventID >= 40) {
                        mapEvents(currentSquareEventID);
                    };

                    console.table(`Current Block: [${Player.currentLocationOnGrid.x},${[Player.currentLocationOnGrid.y]}]`);
                    break;
                }
            case 65: //A
                {
                    Player.face(I.DIRECTION.LEFT);

                    const nextSquare: number = Background.grid[Player.currentLocationOnGrid.y][Player.currentLocationOnGrid.x - 1];
                    if (nextSquare <= 7) {
                        console.log(`boop`);
                        return;
                    };

                    // check if we need to move the camera
                    if (Player.positionOnTV.x <= I.PIXEL.BLOCK * 2 * I.SCALE) {
                        Background.move(I.DIRECTION.RIGHT);
                        objectsOnLayer1.forEach((objectOnLayer: Character) => {
                            objectOnLayer.currentLocationOnGrid.x--;
                            if (objectOnLayer.characterName === Player.characterName) { return };
                            objectOnLayer.move(I.DIRECTION.RIGHT);
                            console.log(`${objectOnLayer.characterName}: Current Block: [${objectOnLayer.currentLocationOnGrid.x},${objectOnLayer.currentLocationOnGrid.y}]`)
                        });
                        Player.update();
                    } else {
                        Player.move(I.DIRECTION.LEFT);
                    }

                    const currentSquareEventID: number = Background.grid[Player.currentLocationOnGrid.y][Player.currentLocationOnGrid.x];

                    // check for triggered events
                    if (currentSquareEventID >= 40) {
                        mapEvents(currentSquareEventID);
                    };

                    console.table(`Current Block: [${Player.currentLocationOnGrid.x},${[Player.currentLocationOnGrid.y]}]`);
                    break;
                }
            case 68: //D
                {
                    Player.face(I.DIRECTION.RIGHT);

                    const nextSquare: number = Background.grid[Player.currentLocationOnGrid.y][Player.currentLocationOnGrid.x + 1];
                    if (nextSquare <= 7) {
                        console.log(`boop`);
                        return;
                    };

                    const tv: any = document.getElementById('layer-1');

                    if (Player.positionOnTV.x >= tv.width - (I.PIXEL.BLOCK * I.SCALE * 3)) {
                        Background.move(I.DIRECTION.LEFT);
                        objectsOnLayer1.forEach((objectOnLayer: Character) => {
                            objectOnLayer.currentLocationOnGrid.x++;
                            if (objectOnLayer.characterName === Player.characterName) { return };
                            objectOnLayer.move(I.DIRECTION.LEFT);
                        });
                        Player.update();
                    } else {
                        Player.move(I.DIRECTION.RIGHT);
                    }

                    const currentSquareEventID: number = Background.grid[Player.currentLocationOnGrid.y][Player.currentLocationOnGrid.x];

                    // check for triggered events
                    if (currentSquareEventID >= 40) {
                        mapEvents(currentSquareEventID);
                    };

                    console.table(`Current Block: [${Player.currentLocationOnGrid.x},${[Player.currentLocationOnGrid.y]}]`);
                    break;
                }
            case 67:
                {
                    Background.cameraToTarget({ x: Player.currentLocationOnGrid.x, y: Player.currentLocationOnGrid.y })
                }
                break;
            default:
                break;
        }
    };

    window.addEventListener('keydown', movement);

    useEffect(() => {
        mounted = true;

        const canvas_layer_1: any = document.getElementById('layer-1');
        canvas_layer_1.setAttribute('width', 576);
        canvas_layer_1.setAttribute('height', 480);

        const canvas_layer_2: any = document.getElementById('layer-2');
        canvas_layer_2.setAttribute('width', 576);
        canvas_layer_2.setAttribute('height', 480);

        const canvas_layer_0: any = document.getElementById('layer-0');
        canvas_layer_0.setAttribute('width', 576);
        canvas_layer_0.setAttribute('height', 480);

        console.log('TV mounted');
        Update();

        return () => {
            mounted = false;
            console.log('TV Unmounted');
            window.removeEventListener("keydown", movement);
        }

    }, [Update]);

    return (
        <StyledTvWrapper>
            <StyledTv id="layer-0" />
            <StyledTv id="layer-1" />
            <StyledTv id="layer-2" />
        </StyledTvWrapper>
    );
};

// ============== //
// === STYLES === //
// ============== //
const StyledTvWrapper = styled('section')`
    position: relative;
    width: 90vw;
    max-width: 1080px;
    height: 100vh;
`;

const StyledTv = styled('canvas')`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    height: auto;
    overflow: hidden;
    border: 5px solid #0a0a0a;
    background-color: transparent;
    border-radius: 2em;
    image-rendering: -moz-crisp-edges;
    image-rendering: -webkit-crisp-edges;
    image-rendering: pixelated;
    image-rendering: crisp-edges;
`;
