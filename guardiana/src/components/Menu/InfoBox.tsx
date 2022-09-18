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
    right: 3em;
    bottom: 5em;
    min-width: 10em;
    min-height: 3em;
`;
