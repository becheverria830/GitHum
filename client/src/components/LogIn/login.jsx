import React, { Component } from "react";
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
              <input id="submit" type="submit" value="Log In"></input>
            </div>
          </form>
          <a href="#"> Forgot Password? </a>
          <br></br>
          <p> Don't have an account?</p>
          <a href="#"> Sign Up </a>
        </div>
      </React.Fragment>
    );
  }
}

export default LogIn;
