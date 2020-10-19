import React, { Component } from "react";
import "./landing.css";
import Logo from "../assets/githum-tree.svg";

class Landing extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row main-title">
            <div className="col">
              <img className="logo" src={Logo} />
            </div>
            <div className="col title">
              <h2> GitHum </h2>
            </div>
          </div>
          <div className="row buttons-container">
            <button id="login-button"> Log In </button>
            <button id="signup-button"> Sign Up </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Landing;
