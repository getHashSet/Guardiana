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

// ================= //
// === COMPONENT === //
// ================= //
export default function Tv() {
    const dispatch = useDispatch();
    let mounted: boolean = true;
    const map: I.Map = useSelector((state: { map: I.Map }) => state.map);
    const Background = new Map(map);
    const Player = new Character(Max.characterName, Background.heroStartLocations[0], Background.cameraLocation, Max.spriteSheet[0], true);

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
            default:
                console.log('bad event in worldMap, Chapter 01');
                break;
        }
    };

    const Update = () => {
        if (!mounted) { return };
        Background.drawMapBottom();
        Player.draw();
        Background.drawMapTop();

        requestAnimationFrame(Update);
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
                        Player.currentLocationOnGrid.y--;
                        Player.Update();
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

                    const tv: any = document.getElementById('tv');

                    // camera update
                    if (Player.positionOnTV.y >= tv.height - (I.PIXEL.BLOCK * I.SCALE * 3)) {
                        // move camera with player.
                        Background.move(I.DIRECTION.DOWN);
                        Player.currentLocationOnGrid.y++;
                        Player.Update();
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
                        Player.currentLocationOnGrid.x--;
                        Player.Update();
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

                    const tv: any = document.getElementById('tv');

                    if (Player.positionOnTV.x >= tv.width - (I.PIXEL.BLOCK * I.SCALE * 3)) {
                        Background.move(I.DIRECTION.LEFT);
                        Player.currentLocationOnGrid.x++;
                        Player.Update();
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
        const canvas: any = document.getElementById('tv');
        canvas.setAttribute('width', 576);
        canvas.setAttribute('height', 480);
        console.log('TV mounted');
        Update();

        return () => {
            mounted = false;
            console.log('TV Unmounted');
            window.removeEventListener("keydown", movement);
        }

    }, [Update]);

    return (
        <StyledTv id="tv" />
    );
};

// ============== //
// === STYLES === //
// ============== //
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
