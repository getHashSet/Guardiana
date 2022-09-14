import styled from 'styled-components';

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
    background-color: ${props => props.theme.palette.blue};
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