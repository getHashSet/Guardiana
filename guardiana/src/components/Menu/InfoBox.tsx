import styled from 'styled-components';
import frame from './frame.png';

export default function InfoBox() {
  return (
    <InfoBlock>InfoBox</InfoBlock>
  )
}

const InfoBlock = styled('div')`
    position: absolute;
    right: 3em;
    bottom: 5em;
    min-width: 10em;
    min-height: 3em;
    border: 24px solid yellow;
    border-radius: 1em;
    background-color: darkblue;
    border-image-source: url(${frame});
    border-image-slice: 12 12;
    border-image-repeat: round;
    border-image-outset: 0;
`;
