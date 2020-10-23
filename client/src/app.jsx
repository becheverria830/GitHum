import React from "react";
import { Switch, Route, Link } from "react-router-dom";

import LandingPage from "./components/Landing/landing";
import SignUpPage from "./components/SignUp/signup";
import LogInPage from "./components/LogIn/login";
import PasswordResetPage from "./components/PasswordReset/passwordreset";

export default function App() {
  return (
    <Switch>
      <Route exact path="/">
        <LandingPage />
      </Route>
      <Route path="/signup">
        <SignUpPage />
      </Route>
      <Route path="/login">
        <LogInPage />
      </Route>
      <Route path="/resetpassword">
        <PasswordResetPage />
      </Route>
    </Switch>
  );
}
