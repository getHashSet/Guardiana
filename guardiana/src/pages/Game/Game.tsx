import Menu from '../../components/Menu/Menu';
import Tv from '../../components/Game/Game';
import styled from 'styled-components';

export default function Game() {
    return (
        <StyledGameWrapper>
            <Menu />
            <Tv />
        </StyledGameWrapper>
    )
}

const StyledGameWrapper = styled('section')`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;
