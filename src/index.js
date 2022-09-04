import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from "react-router-dom";
import { rootReducer } from './store/root-reducer';


import { App } from './App';
import './assets/style/main.scss';


const container = document.getElementById('root');
const root = createRoot(container);


root.render(
  <Provider store={rootReducer}>
    <Router>
      <App />
    </Router>
  </Provider>
);
