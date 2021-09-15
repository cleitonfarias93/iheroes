import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import reportWebVitals from 'reportWebVitals';

// Application configs
import 'i18n';

// Router config
import Routes from 'routes';

// Application core styles
import 'styles/index.scss';
import 'antd/dist/antd.css';

ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
