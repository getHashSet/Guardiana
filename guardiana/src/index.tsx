import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import allReducers from './redux/reducers';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Theme from './styles/Theme.jsx';
import { Reset } from './styles/styled/reset.style';
import { composeWithDevTools } from 'redux-devtools-extension';

// ============= //
// === STORE === //
// ============= //

const store = createStore(allReducers, composeWithDevTools());

// ================ //
// === THE SITE === //
// ================ //
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Theme>
        <Reset>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </Reset>
      </Theme>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
