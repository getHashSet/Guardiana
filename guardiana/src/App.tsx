import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Error from './pages/Error/Error';
import MainMenu from './pages/MainMenu/MainMenu';
import ToolBox from './components/ToolBox/ToolBox';

export default function App() {

  // ============== //
  // === RETURN === //
  // ============== //
  return (
    <>
    <ToolBox/>

    <BrowserRouter>
      <Routes>

        <Route path='/' element={<MainMenu />} />

        {/* DO NOT CODE BELOW THIS LINE */}
        <Route element={<Error />} />

      </Routes>
    </BrowserRouter>
    </>
  );
}
