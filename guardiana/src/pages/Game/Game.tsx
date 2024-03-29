import Menu from '../../components/Menu/Menu';
import TV from '../../components/TV/TV';
import styled from 'styled-components';

// ================= //
// === COMPONENT === //
// ================= //
export default function Game() {
    return (
        <StyledGameWrapper>
            <Menu />
            <TV />
        </StyledGameWrapper>
    )
}

const StyledGameWrapper = styled('section')`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;
