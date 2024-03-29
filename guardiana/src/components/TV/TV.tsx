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
    let heroCharacters: Character[] = [new Character(Max, Background.heroStartLocations[0], Background.cameraLocation, 9000)];
    let Player: Character = heroCharacters[0]; // TODO this should be a target and not always who is in slot 0
    const [enemyRoster, setEnemyRoster]: [I.Character[], Function] = useState(useSelector((state: { enemyRoster: I.Character[] }) => state.enemyRoster));
    let enemyCharacters: Character[] = [];
    let currentFocused: number = 0;
    let initiative: Character[] = [] //TODO use Initiative to identify whos next in combat.
    let npcCharacters: Character[] = [];

    enemyCharacters = Background.enemyStartLocations.map((startLocation: { name: string, x: number, y: number }, index: number) => {
        const newEnemy = new Character(enemyRoster[index], startLocation, Background.cameraLocation, index);
        return newEnemy;
    });

    heroCharacters = Background.heroStartLocations.filter((_, index: number) => heroRoster[index] !== undefined).map((startLocation: { name: string, x: number, y: number }, index: number) => {
        const newCharacter = new Character(heroRoster[index], startLocation, Background.cameraLocation, index);
        console.log(`Spawn In: ${newCharacter.characterName}`);

        return newCharacter;
    });

    npcCharacters = Background.npcStartLocations.map((startLocationInfo: { name: string, info: I.Character, x: number, y: number }, index: number) => {
        const newNpc = new Character(startLocationInfo.info, startLocationInfo, Background.cameraLocation, index);
        console.log(`Spawn In: ${newNpc.characterName}`);
        return newNpc;
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

        // if (Player.alignment !== I.ALIGNMENT.EVIL) {
        //     Player = initiative[currentFocused]; //heroCharacters[currentFocused] ?? heroCharacters[0];
        // } else {
        //     Player = initiative[currentFocused//enemyCharacters[currentFocused] ?? heroCharacters[0];
        // }
        Player = initiative[currentFocused];

        const layer1_el: any = document.getElementById('layer-1');
        const layer2_el: any = document.getElementById('layer-2');

        const layer1 = layer1_el.getContext('2d');
        const layer2 = layer2_el.getContext('2d');


        try {

            layer1.clearRect(0, 0, layer1_el.width, layer1_el.height);
            layer2.clearRect(0, 0, layer2_el.width, layer2_el.height);

            Background.draw();

            npcCharacters.forEach((npc: Character) => {
                npc.update();
            });

            enemyCharacters.forEach((enemy: Character) => {
                enemy.update();
                // TODO enemy updates on wrong layer.
            })

            heroCharacters.forEach((hero: Character) => {
                hero.update(); // TODO heros updates on wrong layer.
            });

            if (initiative[currentFocused] !== undefined) {
                initiative[currentFocused].update()
            };

        } finally {

            setTimeout(() => {
                requestAnimationFrame(Update);
            }, 1000 / fps)

        };
    };

    const moveMap = (
        backgroundDirection: I.DIRECTION
    ) => {

        // update the background
        Background.move(backgroundDirection);

        // placeholder variable for opposite direction
        let objectDirection: I.DIRECTION;
        let axis: string;
        let incriment: string; // up or down

        // identify what direction is the opposite and fill the placeholder
        switch (backgroundDirection) {
            case I.DIRECTION.UP:
                objectDirection = I.DIRECTION.DOWN
                axis = 'y';
                incriment = 'down';
                break;
            case I.DIRECTION.DOWN:
                objectDirection = I.DIRECTION.UP
                axis = 'y';
                incriment = 'up';
                break;
            case I.DIRECTION.LEFT:
                objectDirection = I.DIRECTION.LEFT
                axis = 'x';
                incriment = 'up';
                break;
            case I.DIRECTION.RIGHT:
                objectDirection = I.DIRECTION.RIGHT
                axis = 'x';
                incriment = 'down';
                break;
            default:
                // log when stuff breaks
                console.log('Something broke in the movment math. IDK how or why so you get this message.');
                break;
        }

        // Move all spawned objects 
        [...npcCharacters, ...enemyCharacters, ...heroCharacters].forEach((objectOnLayer: Character) => {

            incriment === 'up' ? objectOnLayer.currentLocationOnGrid[axis === 'y' ? 'y' : 'x']++ : objectOnLayer.currentLocationOnGrid[axis === 'y' ? 'y' : 'x']--;

            if (objectOnLayer.characterID === Player.characterID) { return };

            objectOnLayer.move(objectDirection);
        });

        // update the player last so they are always on top
        Player.update();
    };

    // ================ //
    // === MOVEMENT === //
    // ================ //
    const movement = ({ keyCode }: any) => {
        //console.log(keyCode);

        switch (keyCode) {
            case 13: // enter
                // This can be used to exicute actions
                // EXAMPLE: you press enter then it checks the next space over for events.
                {
                    if (Player.facing === I.DIRECTION.UP) {
                        console.log('facing up');
                    };

                    if (Player.facing === I.DIRECTION.LEFT) {
                        console.log('facing left');
                    };

                    if (Player.facing === I.DIRECTION.DOWN) {
                        console.log('facing down');
                    };

                    if (Player.facing === I.DIRECTION.RIGHT) {
                        console.log('facing right');
                    };

                }
                break;
            case 49: //1
                {
                    currentFocused = initiative[currentFocused + 1] !== undefined ? currentFocused + 1 : 0;
                    Player.face(I.DIRECTION.DOWN);
                    Player = initiative[currentFocused] ?? heroCharacters[0];
                    console.log(`current focus set to ${initiative[currentFocused].characterName}`);
                    // TODO: Find out how to center a character based on the I.SCALE. These magic numbers dont work well.
                    cameraToTarget(Player.currentLocationOnGrid.x - 6, Player.currentLocationOnGrid.y - 5);
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
                    if (Player.positionOnTV.y <= 3 * (I.PIXEL.BLOCK * I.SCALE)) {
                        moveMap(I.DIRECTION.UP);
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
                    if (Player.positionOnTV.y >= tv.height - (I.PIXEL.BLOCK * I.SCALE * 4)) {
                        moveMap(I.DIRECTION.DOWN);
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
                    if (Player.positionOnTV.x <= I.PIXEL.BLOCK * 3 * I.SCALE) {
                        moveMap(I.DIRECTION.RIGHT);
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

                    if (Player.positionOnTV.x >= tv.width - (I.PIXEL.BLOCK * I.SCALE * 4)) {
                        moveMap(I.DIRECTION.LEFT)
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

        rollInitiative();
        cameraToTarget(initiative[0].currentLocationOnGrid.x - 6, initiative[0].currentLocationOnGrid.y - 5);

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
        //console.log(`path from ${Background.cameraLocation.x},${Background.cameraLocation.y} to ${x},${y}`);
        const xStart = Background.cameraLocation.x
        const yStart = Background.cameraLocation.y
        const xEnd = x
        const yEnd = y

        if (xStart === xEnd && yStart === yEnd) { return };

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

                npcCharacters.forEach((objectOnLayer: Character) => {
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

                npcCharacters.forEach((objectOnLayer: Character) => {
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

    const initiativeRoll = (min: number, max: number) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const canvasOnClickHandler = (event: any) => {
        console.log(event);
    }

    const rollInitiative = () => {
        const result: Character[] = []

        enemyCharacters.forEach((enemy: Character) => {

            // roll
            const roll = initiativeRoll(0, 20) + (enemy.stats.speed ? enemy.stats.speed : 0);
            // set initiative
            enemy.initiative = roll;
            // add to list of characters
            result.push(enemy);

            // // add them to that part of the array
            // result.splice(roll, 0, enemy)
            // console.log(`${enemy.characterName} initiative ${roll}`);
        })

        heroCharacters.forEach((hero: Character) => {

            const roll = initiativeRoll(0, 20) + (hero.stats.speed ? hero.stats.speed : 0);
            hero.initiative = roll;
            result.push(hero);
            // const roll = initiativeRoll(0, result.length);
            // result.splice(roll, 0, hero)
            // console.log(`${hero.characterName} initiative ${roll}`);
        });

        // take the highest initiative roll and put them first
        function compare(a: Character, b: Character) {
            if (a.initiative < b.initiative) {
                return 1;
            }
            if (a.initiative > b.initiative) {
                return -1;
            }
            return 0;
        }

        result.sort(compare);

        // example: initiative = [heroCharacters[0], enemyCharacters[0], heroCharacters[1], enemyCharacters[4], enemyCharacters[3]]
        initiative = result
        //console.log(initiative);
    };

    // ============== //
    // === RETURN === //
    // ============== //
    return (
        <StyledTVWrapper>
            <StyledTV id="layer-0" />
            <StyledTV id="layer-1" />
            <StyledTV id="layer-2" onClick={(event: any) => canvasOnClickHandler(event)} />
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