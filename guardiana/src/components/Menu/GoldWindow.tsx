import styled from 'styled-components';
import * as S from '../../styles';

export default function GoldWindow() {
    return (
        <StyledGoldBlock>
            <h3>Gold</h3>
            <p>0</p>
        </StyledGoldBlock>
    )
}

const StyledGoldBlock = styled(S.Window)`
    position: absolute;
    top: 2em;
    left: 2em;
    width: 13em;
    height: 6em;
    display: flex;
    flex-wrap: wrap;
    
    h3 {
        display: block;
        width: 100%;
    }
    
    p {
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        text-align: right;
        width: 100%;
    }
`;