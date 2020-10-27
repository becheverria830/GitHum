import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

/* Importing The Application's Router File */
import App from "./app";

/* Importing All Global CSS Files */
import "bootstrap/dist/css/bootstrap.css";
import "./global.css"

ReactDOM.render(
  <Router>
    <App/>
  </Router>,
  document.getElementById("root")
);
