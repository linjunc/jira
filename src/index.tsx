/*
 * @Author: 林俊丞
 * @Date: 2021-09-20 13:21:38
 * @LastEditors: 林俊丞
 * @LastEditTime: 2021-09-20 21:55:39
 * @Description:  
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { loadDevTools } from 'jira-dev-tool'

loadDevTools(() => ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
