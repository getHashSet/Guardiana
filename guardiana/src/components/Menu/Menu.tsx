import styled from 'styled-components';
import { useState, useEffect } from 'react';
import FourSquareWindow from './FourSquareWindow';
import TextWindow from './TextWindow';
import FaceWindow from './FaceWindow';
import HeroWindow from './HeroWindow';
import GoldWindow from './GoldWindow';
import InfoBox from './InfoBox';

enum MenuState {
    Closed,
    Open
}

// TODO: If a menu is open then disable player movement; Something like LockPlayerOptions during important moments.

export default function Menu() {
    // ============= //
    // === HOOKS === //
    // ============= //
    const [menu, setMenu]: [MenuState, Function] = useState(MenuState.Closed);
    const [fieldMenu, setFieldMenu]: [boolean, Function] = useState(false);

    // ================= //
    // === FUNCTIONS === //
    // ================= //
    const onClickHandler = () => {
        if (menu === MenuState.Closed) {
            setMenu(MenuState.Open);
        }
        else {
            setMenu(MenuState.Closed);
        }
    }

    const toggleFieldMenu = () => {
        setFieldMenu(!fieldMenu);
        setMenu(MenuState.Closed);
    }

    const cleanup = () => {
        // Close all menus.
        setFieldMenu(false);
        setMenu(MenuState.Closed);
    }

    const listenForKeyDown = ({keyCode}: any) => {
        cleanup();

        if (keyCode === 77) {
            toggleFieldMenu();
        };
    }

    // =============== //
    // === ON LOAD === //
    // =============== //
    useEffect(() => {

        // ================ //
        // === CLEAN UP === //
        // ================ //
      return () => {
        window.removeEventListener('keydown', listenForKeyDown);
      }
    }, [])
    

    // ======================= //
    // === EVENT LISTENERS === //
    // ======================= //
    window.addEventListener('keydown', listenForKeyDown);

    // ============== //
    // === RETURN === //
    // ============== //
    return (
        <StyledMenuFrame>

            {Number(menu) === Number(!MenuState.Closed) ? null : null}

            {fieldMenu ? <FourSquareWindow /> : null}
            {fieldMenu ? <HeroWindow /> : null}
            {fieldMenu ? <GoldWindow /> : null}
            {fieldMenu ? <InfoBox /> : null}

            {Number(menu) === Number(!MenuState.Closed) ? <FaceWindow /> : null}

            {Number(menu) === Number(!MenuState.Closed) ? <TextWindow text={"Shining Force"} /> : null}


        </StyledMenuFrame>
    )
}

// ============== //
// === STYLES === //
// ============== //
const StyledMenuFrame = styled('div')`
    position: absolute;
    top: 0;
    left: 50%;
    width: 100vw;
    max-width: 1400px;
    height: 100vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items:  center;
    overflow: hidden;
    transform: translateX(-50%);
    z-index: 9;
`;
