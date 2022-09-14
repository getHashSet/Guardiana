import styled from 'styled-components';

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
`;
