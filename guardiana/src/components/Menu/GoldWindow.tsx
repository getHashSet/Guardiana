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
    left: .5em;
    width: 7em;
    height: 3em;
    display: flex;
    flex-wrap: wrap;
    font-size: 2em;
    text-transform: uppercase;
    
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