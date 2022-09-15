import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default function ToolBox() {
  return (
    <StyledWrapper>
      <StyledButtonRound>
        Menu
      </StyledButtonRound>
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