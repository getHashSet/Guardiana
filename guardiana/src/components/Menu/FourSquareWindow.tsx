import styled from 'styled-components';

export default function FourSquareWindow() {
  return (
    <StyledFieldOptions>
      <div>
        <StyledBlock />
      </div>
      <div>
        <StyledBlock />
        <StyledBlock />
      </div>
      <div>
        <StyledBlock />
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
  }
`;

const StyledBlock = styled('button')`
    text-decoration: none;
    border: none;
    width: 5em;
    height: 7em;
    margin-bottom: 1em;
    border-radius: 1em;
    background-color: orange;
`;