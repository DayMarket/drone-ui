import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import App from './app';
import './styles/app.scss';

ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  document.getElementById('root'),
);
