import styled from 'styled-components';
import * as S from '../../styles';

export default function InfoBox() {
  return (
    <InfoBlock>
      Information
    </InfoBlock>
  )
}

const InfoBlock = styled(S.Window)`
    position: absolute;
    font-size: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    right: .5em;
    bottom: 4em;
    min-width: 10em;
`;
