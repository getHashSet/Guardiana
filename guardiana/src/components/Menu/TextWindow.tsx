import styled from 'styled-components';
import frame from './frame.png';

export default function TextWindow({ text }: { text: string }) {
    return (
        <StyledTextBlock>
            {text}
        </StyledTextBlock>
    )
}

const StyledTextBlock = styled('div')`
    position: absolute;
    bottom: 2em;
    margin: auto;
    background-color: ${props => props.theme.palette.blue};
    width: 90vw;
    max-width: 1000px;
    height: 15em;
    border: 24px solid yellow;
    border-radius: 1em;
    background-color: darkblue;
    border-image-source: url(${frame});
    border-image-slice: 12 12;
    border-image-repeat: round;
    border-image-outset: 0;
`;
