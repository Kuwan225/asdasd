import React from "react";
import ReactDOM from "react-dom";
import App from "./pages/App/Index";
import reportWebVitals from "./reportWebVitals";
import firebase from "./config/firebase";
import { BrowserRouter } from "react-router-dom";

console.log("ini database", firebase);

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    ,
  </BrowserRouter>,

  document.getElementById("root")
);

reportWebVitals();
