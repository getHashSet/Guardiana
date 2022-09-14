import styled from 'styled-components';

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
    background-color: ${props => props.theme.palette.blue};
`;
