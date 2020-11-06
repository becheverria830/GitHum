import React from "react";
import { Switch, Route, Link } from "react-router-dom";

import LandingPage from "./components/Landing/landing";
import SignUpPage from "./components/SignUp/signup";
import LogInPage from "./components/LogIn/login";
import PasswordResetPage from "./components/PasswordReset/passwordreset";
import FeedPage from "./components/Feed/feed";
import ValleyPage from "./components/Valley/valley";
import ForestPage from "./components/Forest/forest";
import SearchPage from "./components/Search/search";
import PrivateRoute from "./components/PrivateRoute/privateRoute";

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
      <PrivateRoute exact path="/feed" component={FeedPage} />
      <PrivateRoute exact path="/valley/1" component={ValleyPage} myValley={true} />
      <PrivateRoute exact path="/valley/2" component={ValleyPage} myValley={false} />
      <PrivateRoute exact path="/forest/1" component={ForestPage} myForest={true} />
      <PrivateRoute exact path="/forest/2" component={ForestPage} myForest={false} />
      <PrivateRoute exact path="/search" component={SearchPage} />
    </Switch>
  );
}
