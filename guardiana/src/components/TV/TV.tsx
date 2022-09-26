import styled from 'styled-components';
import * as I from '../../utils/types';
import { useSelector, useDispatch } from 'react-redux';
import { setMap, setHeroRoster } from '../../redux/actions';
import { useEffect, useState } from 'react';
import { Character } from '../../infrastructure/class/Character';
import { Map } from '../../infrastructure/class/Map';
import Max from '../../assets/characters/Max';
import Adam from '../../assets/characters/Adam';

// ================= //
// === COMPONENT === //
// ================= //
export default function Tv() {
    const dispatch = useDispatch();
    const fps = 30;
    let mounted: boolean;
    const map: I.Map = useSelector((state: { map: I.Map }) => state.map); // TODO this is refreshing the whole component and not just the map
    const Background: Map = new Map(map);
    const [heroRoster, setHeroRoster]: [I.Character[], Function] = useState(useSelector((state: { heroRoster: I.Character[] }) => state.heroRoster)); // TODO this is refreshing the whole component and not just the roster
    let heroCharacters: Character[] = [new Character(Max.characterName, Background.heroStartLocations[0], Background.cameraLocation, Max.spriteSheet[0], true)];
    let Player: Character = heroCharacters[0]; // TODO this should be a target and not always who is in slot 0
    const [enemyRoster, setEnemyRoster]: [I.Character[], Function] = useState(useSelector((state: { enemyRoster: I.Character[] }) => state.enemyRoster));
    let enemyCharacters: Character[] = [];
    let currentFocused: number = 0;

    enemyCharacters = Background.enemyStartLocations.map((startLocation: { name: string, x: number, y: number }, index: number) => {
        const newEnemy = new Character(enemyRoster[index].characterName, startLocation, Background.cameraLocation, enemyRoster[index].spriteSheet[0], true);
        return newEnemy;
    });

    heroCharacters = Background.heroStartLocations.filter((_, index: number) => heroRoster[index] !== undefined).map((startLocation: { name: string, x: number, y: number }, index: number) => {
        const newCharacter = new Character(heroRoster[index].characterName, startLocation, Background.cameraLocation, heroRoster[index].spriteSheet[0], true);
        return newCharacter;
    });

    const updateMap = (nextMap: I.Map) => {
        setTimeout(() => {
            dispatch(setMap(nextMap));
        }, 200);
    };

    const setNewHeroRoster = (newRoster: I.Character[]) => {
        dispatch(setHeroRoster(newRoster));
    };

    // ================== //
    // === GAME EVENTS == //
    // ================== //
    const mapEvents = (eventID: number) => {
        switch (eventID) {
            case 99: // DEV ONLY 
                {
                    const newRoster: I.Character[] = [Adam, Max];
                    setNewHeroRoster(newRoster);
                }
                break;
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

        Player = heroCharacters[currentFocused] ?? heroCharacters[0];

        const layer1_el: any = document.getElementById('layer-1');
        const layer2_el: any = document.getElementById('layer-2');

        const layer1 = layer1_el.getContext('2d');
        const layer2 = layer2_el.getContext('2d');


        try {

            layer1.clearRect(0, 0, layer1_el.width, layer1_el.height);
            layer2.clearRect(0, 0, layer2_el.width, layer2_el.height);

            Background.draw();

            enemyCharacters.forEach((enemy: Character, index: number) => {
                enemy.update();
            })

            heroCharacters.forEach((hero: Character, index: number) => {
                if (index !== 0) {
                    hero.update();
                }
            });

            heroCharacters[0].update();

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
            case 49: //1
                {
                    currentFocused = 0
                    Player = heroCharacters[currentFocused] ?? heroCharacters[0];
                    // TODO: Find out how to center a character based on the I.SCALE. These magic numbers dont work well.
                    cameraToTarget( Player.currentLocationOnGrid.x - 6, Player.currentLocationOnGrid.y - 4);
                }
                break;
            case 50: //2
                {
                    currentFocused = 1
                    Player = heroCharacters[1] ?? heroCharacters[0];
                    // TODO: Find out how to center a character based on the I.SCALE. These magic numbers dont work well.
                    cameraToTarget( Player.currentLocationOnGrid.x - 6, Player.currentLocationOnGrid.y - 4);
                }
                break;
            case 51: // 3
                {
                    currentFocused = 2
                    Player = heroCharacters[2] ?? heroCharacters[0];
                    // TODO: Find out how to center a character based on the I.SCALE. These magic numbers dont work well.
                    cameraToTarget( Player.currentLocationOnGrid.x - 6, Player.currentLocationOnGrid.y - 4);
                }
                break;
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
                        heroCharacters.forEach((objectOnLayer: Character) => {
                            objectOnLayer.currentLocationOnGrid.y--;
                            if (objectOnLayer.characterName === Player.characterName) { return };
                            objectOnLayer.move(I.DIRECTION.DOWN);
                        });

                        enemyCharacters.forEach((objectOnLayer: Character) => {
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
                        heroCharacters.forEach((objectOnLayer: Character) => {
                            objectOnLayer.currentLocationOnGrid.y++;
                            if (objectOnLayer.characterName === Player.characterName) { return };
                            objectOnLayer.move(I.DIRECTION.UP);
                        });
                        enemyCharacters.forEach((objectOnLayer: Character) => {
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
                        heroCharacters.forEach((objectOnLayer: Character) => {
                            objectOnLayer.currentLocationOnGrid.x--;
                            if (objectOnLayer.characterName === Player.characterName) { return };
                            objectOnLayer.move(I.DIRECTION.RIGHT);
                            console.log(`${objectOnLayer.characterName}: Current Block: [${objectOnLayer.currentLocationOnGrid.x},${objectOnLayer.currentLocationOnGrid.y}]`)
                        });
                        enemyCharacters.forEach((objectOnLayer: Character) => {
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
                        heroCharacters.forEach((objectOnLayer: Character) => {
                            objectOnLayer.currentLocationOnGrid.x++;
                            if (objectOnLayer.characterName === Player.characterName) { return };
                            objectOnLayer.move(I.DIRECTION.LEFT);
                        });
                        enemyCharacters.forEach((objectOnLayer: Character) => {
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
            default:
                break;
        }
    };

    window.addEventListener('keydown', movement);

    // =============== //
    // === ON LOAD === //
    // =============== //
    useEffect(() => {

        // Set mounted to true. This is used in the update loop.
        mounted = true;

        // Set TV size in pixels for Layers 0 through 2
        const canvas_layer_0: any = document.getElementById('layer-0');
        canvas_layer_0.setAttribute('width', 576);
        canvas_layer_0.setAttribute('height', 480);

        const canvas_layer_1: any = document.getElementById('layer-1');
        canvas_layer_1.setAttribute('width', 576);
        canvas_layer_1.setAttribute('height', 480);

        const canvas_layer_2: any = document.getElementById('layer-2');
        canvas_layer_2.setAttribute('width', 576);
        canvas_layer_2.setAttribute('height', 480);

        // Identify that the game has started in the logs
        console.log(`Game Started: ${Date.now()}`);
        Update();

        return () => {
            mounted = false;
            console.log(`Game Ended: ${Date.now()}`);
            window.removeEventListener("keydown", movement);
        }

    }, [Update]);

    // ================= //
    // === FUNCTIONS === //
    // ================= //
    const cameraToTarget = (x: number, y: number) => {
        console.log(`path from ${Background.cameraLocation.x},${Background.cameraLocation.y} to ${x},${y}`);
        const xStart = Background.cameraLocation.x
        const yStart = Background.cameraLocation.y
        const xEnd = x
        const yEnd = y

        if (xStart === xEnd && yStart === yEnd) {return};

        setTimeout(() => {
            const yDirection = yStart > yEnd ? I.DIRECTION.UP : I.DIRECTION.DOWN;
            const xDirection = xStart > xEnd ? I.DIRECTION.RIGHT : I.DIRECTION.LEFT;
            const yOtherObjects = yStart > yEnd ? I.DIRECTION.DOWN : I.DIRECTION.UP;
            const xOtherObjects = xStart > xEnd ? I.DIRECTION.RIGHT : I.DIRECTION.LEFT;

            if (yStart !== yEnd) {
                Background.move(yDirection);
                
                heroCharacters.forEach((objectOnLayer: Character) => {
                    if (yDirection === I.DIRECTION.DOWN) {
                        objectOnLayer.currentLocationOnGrid.y++;
                    } else {
                        objectOnLayer.currentLocationOnGrid.y--;
                    };

                    objectOnLayer.move(yOtherObjects);
                });

                enemyCharacters.forEach((objectOnLayer: Character) => {
                    if (yDirection === I.DIRECTION.DOWN) {
                        objectOnLayer.currentLocationOnGrid.y++;
                    } else {
                        objectOnLayer.currentLocationOnGrid.y--;
                    };
                    
                    objectOnLayer.move(yOtherObjects);
                });
            }

            if (xStart !== xEnd) {
                Background.move(xDirection);

                heroCharacters.forEach((objectOnLayer: Character) => {
                    if (xDirection === I.DIRECTION.RIGHT) {
                        objectOnLayer.currentLocationOnGrid.x--;
                    } else {
                        objectOnLayer.currentLocationOnGrid.x++;
                    };

                    objectOnLayer.move(xOtherObjects);
                });

                enemyCharacters.forEach((objectOnLayer: Character) => {
                    if (xDirection === I.DIRECTION.RIGHT) {
                        objectOnLayer.currentLocationOnGrid.x--;
                    } else {
                        objectOnLayer.currentLocationOnGrid.x++;
                    };
                    
                    objectOnLayer.move(xOtherObjects);
                });
            }

            // LOOP IT! TODO: This can probably go infinit... so figure out a good catch for this biz
            cameraToTarget(x, y);
        }, 50);
    };

    // ============== //
    // === RETURN === //
    // ============== //
    return (
        <StyledTVWrapper>
            <StyledTV id="layer-0" />
            <StyledTV id="layer-1" />
            <StyledTV id="layer-2" />
        </StyledTVWrapper>
    );
};

// ============== //
// === STYLES === //
// ============== //
const StyledTVWrapper = styled('section')`
    position: relative;
    width: 90vw;
    max-width: 1080px;
    height: 100vh;
`;

const StyledTV = styled('canvas')`
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