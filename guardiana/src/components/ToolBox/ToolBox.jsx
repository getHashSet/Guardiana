import styled from 'styled-components';

export default function ToolBox() {
  return (
    <StyledWrapper>
      <StyledButtonRound>menu</StyledButtonRound>
    </StyledWrapper>
  );
};

const StyledWrapper = styled('div')`
  position: absolute;
  bottom: 0;
  right: 0;
`;

const StyledButtonRound = styled('button')`
  border-radius: 50%;
  overflow: hidden;
  width: 3em;
  height: 3em;
`;