import React from 'react';
import { render } from 'react-dom';

import { store } from 'app/store';
import Providers from 'providers';

import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';

render(
  <React.StrictMode>
    <Providers store={store}>
      <App />
    </Providers>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
