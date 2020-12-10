import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

/* Importing The Application's Router File */
import App from "./app";

/* Importing The Redux Store */
import store from "./redux/store";

/* Importing All Global CSS Files */
import "bootstrap/dist/css/bootstrap.css";
import "./global.css"

import jwt_decode from "jwt-decode";
import setAuthToken from "./redux/utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./redux/actions/authActions";

// Check for token to keep user logged in
window.CurrentUserID = null;
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  window.CurrentUserID = decoded['id'];
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    window.CurrentUserID = null;
    // Redirect to login
    window.location.href = "./login";
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App/>
    </Router>
  </Provider>,
  document.getElementById("root")
);
