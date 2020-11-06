import React from "react";
import { Switch, Route, Link } from "react-router-dom";

import LandingPage from "./components/Landing/landing";
import SignUpPage from "./components/SignUp/signup";
import LogInPage from "./components/LogIn/login";
import PasswordResetPage from "./components/PasswordReset/passwordreset";
import PasswordResetFormPage from "./components/PasswordResetForm/passwordresetform";
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
      <Route path="/passwordreset/:id/:token">
        <PasswordResetFormPage />
      </Route>
      <PrivateRoute exact path="/feed" component={FeedPage} />
      <PrivateRoute exact path="/valley/:userid" component={ValleyPage} />
      <PrivateRoute exact path="/forest/1" component={ForestPage} myForest={true} />
      <PrivateRoute exact path="/forest/2" component={ForestPage} myForest={false} />
      <PrivateRoute exact path="/search/:query" component={SearchPage} />
    </Switch>
  );
}
