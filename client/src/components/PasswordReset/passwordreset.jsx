import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import "./passwordreset.css";

class PasswordReset extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div>
          <div className="passwordreset-box">
            <h1> Password Reset </h1>
            <form>
              <div className="passwordreset-fields">
                <label for="email"></label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value="Enter your Email Address"
                ></input>
                <br></br>
                <Link to="/"> <input
                  id="submit"
                  type="submit"
                  value="Send Password Reset"
                /></Link>
              </div>
            </form>
            <p> Don't have an account?</p>
            <Link to="/signup"><a> Sign Up </a></Link>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default PasswordReset;
