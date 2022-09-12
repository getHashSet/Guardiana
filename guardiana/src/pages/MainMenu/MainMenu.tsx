import { Page } from '../../styles';
import Tv from '../../components/Tv/Tv';

function MainMenu() {
  return (
    <Page>
      <Tv />
      <div>
        <h1>main menu</h1>
        <button>Start</button>
      </div>
    </Page>
  );
}

export default MainMenu;
