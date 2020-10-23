import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./components/app";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import Forest from "./components/forest";
import NowPlaying from "./components/nowPlaying";

// ReactDOM.render(
//   <Router>
//     <App />
//   </Router>,
//   document.getElementById("root")
// );

ReactDOM.render(<Forest />, document.getElementById("root"));
