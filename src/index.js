// import React from 'react';
// import ReactDOM from 'react-dom';
// import 'semantic-ui-css/semantic.min.css';
// import './index.css';
// import App from './pages/App/App';
// import * as serviceWorker from './serviceWorker';
// import { BrowserRouter as Router } from 'react-router-dom';

// ReactDOM.render(
//   <Router><App/></Router>,
//   document.getElementById('root')
// );
// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "react-alice-carousel/lib/alice-carousel.css";
import CryptoContext from "./CryptoContext";

ReactDOM.render(
  <React.StrictMode>
    <CryptoContext>
      <App />
    </CryptoContext>
  </React.StrictMode>,
  document.getElementById("root")
);
