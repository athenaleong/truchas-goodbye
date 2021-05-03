import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import './index.css';
import { Helmet } from 'react-helmet';

ReactDOM.render(
  <React.StrictMode>
    <Helmet>
      <title>Tale of Truchas</title>
    </Helmet>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

