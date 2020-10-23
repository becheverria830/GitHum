import React, { Component } from "react";
import "./signup.css";

class SignUp extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="signup-box">
          <h1> Sign Up </h1>
          <form>
            <div className="signup-fields">
              <label for="fname"></label>
              <input
                type="text"
                id="fname"
                name="fname"
                value="First Name"
              ></input>
              <br></br>
              <label for="lname"></label>
              <input
                type="text"
                id="lname"
                name="lname"
                value="Last Name"
              ></input>
              <br></br>
              <label for="email"></label>
              <input
                type="text"
                id="email"
                name="email"
                value="Email Address"
              ></input>
              <br></br>
              <label for="username"></label>
              <input
                type="text"
                id="username"
                name="username"
                value="Create a Username"
              ></input>
              <br></br>
              <label for="password"></label>
              <input
                type="text"
                id="password"
                name="password"
                value="Create a Password"
              ></input>
              <br></br>
              <input id="submit" type="submit" value="Sign Up"></input>
            </div>
          </form>
          <p> Already have an account?</p>
          <a href="#"> Log In </a>
        </div>
      </React.Fragment>
    );
  }
}

export default SignUp;
