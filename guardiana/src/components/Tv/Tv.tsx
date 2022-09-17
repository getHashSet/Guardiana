import styled from 'styled-components';
import * as I from '../../utils/types';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import spriteSheet_max from '../../assets/characters/Max/base/sprite-max.png';
import { Character } from '../../infrastructure/class/Character';
import { Map } from '../../infrastructure/class/Map';
import battle01 from '../../assets/maps/battleMaps/battle01/';

// ================= //
// === COMPONENT === //
// ================= //
export default function Tv() {
    let mounted: boolean = true;
    const map: I.Map = useSelector((state: { map: I.Map }) => state.map);
    const Background = new Map(battle01);
    const Player = new Character(Background.heroStartLocations[0], Background.cameraLocation, spriteSheet_max);

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
    window.addEventListener('keydown', ({ keyCode }) => {

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
                    if (Player.positionOnTV.y <= I.PIXEL.BLOCK * 2 * I.SCALE) {
                        Background.move(I.DIRECTION.UP);
                        Player.currentLocationOnGrid.y--;
                        Player.Update();
                    } else {
                        Player.move(I.DIRECTION.UP);
                    };

                    console.table(`Current Block: ${Player.currentLocationOnGrid.x}${[Player.currentLocationOnGrid.y]}`);
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

                    // camera update
                    if (Player.positionOnTV.y >= I.PIXEL.BLOCK * 4 * I.SCALE) {
                        // move camera with player.
                        Background.move(I.DIRECTION.DOWN);
                        Player.currentLocationOnGrid.y++;
                        Player.Update();
                    }
                    else {
                        Player.move(I.DIRECTION.DOWN);
                    };

                    console.table(`Current Block: ${Player.currentLocationOnGrid.x}${[Player.currentLocationOnGrid.y]}`);
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
                        Background.move(I.DIRECTION.RIGHT);
                        Player.currentLocationOnGrid.x--;
                        Player.Update();
                    } else {
                        Player.move(I.DIRECTION.LEFT);
                    }

                    console.table(`Current Block: ${Player.currentLocationOnGrid.x}${[Player.currentLocationOnGrid.y]}`);
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

                    if (Player.positionOnTV.x >= I.PIXEL.BLOCK * 5 * I.SCALE) {
                        Background.move(I.DIRECTION.LEFT);
                        Player.currentLocationOnGrid.x++;
                        Player.Update();
                    } else {
                        Player.move(I.DIRECTION.RIGHT);
                    }

                    console.table(`Current Block: ${Player.currentLocationOnGrid.x}${[Player.currentLocationOnGrid.y]}`);
                    break;
                }
            default:
                break;
        }
    });

    useEffect(() => {

        const canvas: any = document.getElementById('tv');
        canvas.setAttribute('width', 576);
        canvas.setAttribute('height', 480);
        console.log('TV mounted');
        Update();


        return () => {
            mounted = false;
            console.log('TV Unmounted')
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
