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
      <Route path="/feed">
        <FeedPage />
      </Route>
      <Route path="/valley/1">
        <ValleyPage myValley={true}/>
      </Route>
      <Route path="/valley/2">
        <ValleyPage myValley={false}/>
      </Route>
      <Route path="/forest/1">
        <ForestPage myForest={true}/>
      </Route>
      <Route path="/forest/2">
        <ForestPage myForest={false}/>
      </Route>
      <Route path="/search">
        <SearchPage />
      </Route>
    </Switch>
  );
}
