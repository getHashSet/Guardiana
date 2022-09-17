import styled from 'styled-components';
import frame from './frame.png';

export default function GoldWindow() {
    return (

        <StyledGoldBlock>
            <h3>Gold</h3>
            <p>0</p>
        </StyledGoldBlock>
    )
}

const StyledGoldBlock = styled('div')`
    position: absolute;
    top: 2em;
    left: 2em;
    width: 13em;
    height: 6em;
    display: flex;
    flex-wrap: wrap;
    border: 24px solid yellow;
    border-radius: 1em;
    background-color: darkblue;
    border-image-source: url(${frame});
    border-image-slice: 12 12;
    border-image-repeat: round;
    border-image-outset: 0;
    
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