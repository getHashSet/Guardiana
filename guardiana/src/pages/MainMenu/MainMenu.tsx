import { Page } from '../../styles';
import titleScreen from '../../assets/misc/simon_body.png';
import { Link } from 'react-router-dom';

function MainMenu() {
  return (
    <Page>
      <div>
        <img src={titleScreen} alt="title screen" />
        <h1>Shining Force</h1>
        <button>
          <Link to='/game'>
            Press Any Key
          </Link>
        </button>
      </div>
    </Page>
  );
}

export default MainMenu;
