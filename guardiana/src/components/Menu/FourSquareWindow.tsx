import styled from 'styled-components';
import Square from './Square';

export default function FourSquareWindow() {
  return (
    <StyledFieldOptions>
      <div>
        <Square />
      </div>
      <div>
        <Square />
        <Square />
      </div>
      <div>
        <Square />
      </div>
    </StyledFieldOptions>
  )
}

const StyledFieldOptions = styled('div')`
  position: absolute;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  bottom: 5em;
  z-index: 9;

  div {
    display: block;
    width:  5em;

    &:nth-child(2) {
      margin: .5em;
    }
  }

`;
