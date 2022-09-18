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
    bottom: 2em;
    margin: auto;
    width: 90vw;
    max-width: 1000px;
    height: 15em;
`;
