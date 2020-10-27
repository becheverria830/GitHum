import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import "./login.css";

class LogIn extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="login-box">
          <h1> Log In </h1>
          <form>
            <div className="login-fields">
              <br></br>
              <label for="email"></label>
              <input
                type="text"
                id="email"
                name="email"
                value="Email Address"
              ></input>
              <br></br>
              <label for="password"></label>
              <input
                type="text"
                id="password"
                name="password"
                value="Password"
              ></input>
              <br></br>
              <Link to="/feed"><input id="submit" type="submit" value="Log In"></input>
</Link>
            </div>
          </form>
          <Link to="/resetpassword"><a> Forgot Password? </a></Link>
          <br></br>
          <p> Don't have an account?</p>
          <Link to="/signup"><a> Sign Up </a></Link>
        </div>
      </React.Fragment>
    );
  }
}

export default LogIn;
