import styled from 'styled-components';
import Square from './Square';
import attack from '../../assets/icons/attack.png';
import magic from '../../assets/icons/magic.png';
import item from '../../assets/icons/item.jpg';
import stay from '../../assets/icons/stay.png';

export default function FourSquareWindow() {

  return (
    <StyledFieldOptions>
      <div>
        <Square icon={magic} />
      </div>
      <div>
        <Square icon={attack} />
        <Square icon={stay} />
      </div>
      <div>
        <Square icon={item} />
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
