import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { loadDevTools } from 'jira-dev-tool'
// 在 jira-dev-tool 之后
import 'antd/dist/antd.less'
import { AppProviders } from './context/index';

loadDevTools(() => ReactDOM.render(
  <React.StrictMode>
    {/* 采用 provider 来包裹 app，实现全局共享 */}
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById('root')
))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
