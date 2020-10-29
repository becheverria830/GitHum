import React, { Component } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { Link, Route, Switch } from "react-router-dom";
import "./login.css";
import Logo from "../../assets/githum-tree.svg";

import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

class LogIn extends Component {
  state = {};
  render() {
    return (
      <Container fluid className="login-div">

          <Row className="justify-content-md-center clear">
            <Col md={{span: 8}} lg={{ span: 4 }} className="login-box">
              
              <Col lg={{span: 12}}>
                  <Image className="loginLogo" src={Logo}/>
              </Col>
              <Col lg={{span: 12}}>
                <h1> Log In </h1>
              </Col>

              <Col lg={{span: 10, offset: 1}}>
                <form>
                  <div className="login-fields">
                    <br></br>
                    <label for="email"></label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      placeholder="Email Address"
                    ></input>
                    <br></br>
                    <label for="password"></label>
                    <input
                      type="text"
                      id="password"
                      name="password"
                      placeholder="Password"
                    ></input>
                    <br></br>
                    <Link to="/feed"><input id="submit" type="submit" value="Log In"></input></Link>
                  </div>
                </form>
              </Col>

              <Link to="/resetpassword">Forgot Password?</Link>
              <br></br>
              <p> Don't have an account? </p>
              <Link to="/signup">Sign Up</Link>
              <br></br>
              <br></br>

            </Col> 
          </Row>

      </Container>
    );
  }
}

export default LogIn;
