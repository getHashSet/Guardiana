import styled from 'styled-components';
import * as S from '../../styles';

export default function TextWindow({ text }: { text: string }) {
    return (
        <StyledTextBlock>
            {text}
        </StyledTextBlock>
    )
}

const StyledTextBlock = styled(S.Window)`
    position: absolute;
    font-size: 2em;
    bottom: 2em;
    margin: auto;
    width: 90vw;
    max-width: 768px;
    padding: .5em;
    height: 7em;

    @media (max-width: ${props => props.theme.breakpoint.mobile}) {
        font-size: 1em;
        padding: .5em;
        max-width: 100vw;
        height: 45vh;
        width: calc(100vw - 48px - 2em); // width - border size - padding;
        margin: auto;
    }
`;
