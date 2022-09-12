import styled from 'styled-components';

export default function ToolBox() {
  return (
    <StyledWrapper>
      <StyledButtonRound>volume slider</StyledButtonRound>
      <StyledButtonRound>mute</StyledButtonRound>
      <StyledButtonRound>Menu Gears</StyledButtonRound>
    </StyledWrapper>
  );
};

const StyledWrapper = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
`;

const StyledButtonRound = styled('button')`
  border-radius: 50%;
  overflow: hidden;
  width: 3em;
  height: 3em;
`;