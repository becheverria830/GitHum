import React, { Component } from "react";
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
                <input
                  id="submit"
                  type="submit"
                  value="Send Password Reset"
                ></input>
              </div>
            </form>
            <p> Don't have an account?</p>
            <a href="#"> Sign Up </a>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default PasswordReset;
