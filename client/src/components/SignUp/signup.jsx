import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import Logo from "../../assets/githum-tree.svg";
import "./signup.css";

class SignUp extends Component {
  state = {};
  render() {
    return (
      <Container fluid className="signup-div">

      <Row className="justify-content-md-center clear">
        <Col md={{span: 8}} lg={{ span: 4 }} className="signup-box">

          <Col lg={{span: 12}}>
              <Image className="logo" src={Logo}/>
          </Col>
          <Col lg={{span: 12}}>
            <h1> Sign Up </h1>
          </Col>

          <Col lg={{span: 10, offset: 1}}>
            <form>
              <div className="signup-fields">
                <br></br>
                <label for="fname"></label>
              <input
                type="text"
                id="fname"
                name="fname"
                placeholder="First Name"
              ></input>
              <br></br>
              <label for="lname"></label>
              <input
                type="text"
                id="lname"
                name="lname"
                placeholder="Last Name"
              ></input>
              <br></br>
              <label for="email"></label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Email Address"
              ></input>
              <br></br>
              <label for="username"></label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Create a Username"
              ></input>
              <br></br>
              <label for="password"></label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Create a Password"
              ></input>
              <br></br>
              <Link to="/feed"><input id="submit" type="submit" value="Sign Up"></input></Link>
              </div>
            </form>
          </Col>

          <p> Already have an account? </p>
          <Link to="/login"><a> Log In </a></Link>
          <br></br>
          <br></br>

        </Col>
      </Row>

  </Container>
    );
  }
}

export default SignUp;
