import React from "react";
import { Switch, Route, Link } from "react-router-dom";

import LandingPage from "./landing";
import SignUpPage from "./signup";
import LogInPage from "./login";
import PasswordResetPage from "./passwordreset";

export default function App() {
  return (
    <Switch>
      <Route exact path="/">
        <LandingPage/>
      </Route>
      <Route path="/signup">
        <SignUpPage/>
      </Route>
      <Route path="/login">
        <LogInPage/>
      </Route>
      <Route path="/resetpassword">
        <PasswordResetPage/>
      </Route>
    </Switch>
  );
}
