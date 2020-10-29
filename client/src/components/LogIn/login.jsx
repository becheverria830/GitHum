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
      <Container fluid className="master-div">
        <React.Fragment>
          <Row className="justify-content-md-center clear">
            <Col className="login-box" md={{span: 8}} lg={{ span: 4 }}>
              <Col md={{span: 4}} lg={{span: 12}}>
                <Image className="logo" src={Logo}/>
              </Col>
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
                  <Link to="/feed"><input id="submit" type="submit" value="Log In"></input></Link>
                </div>
              </form>
              <Link to="/resetpassword"><a> Forgot Password? </a></Link>
              <br></br>
              <p> Don't have an account?</p>
              <Link to="/signup"><a> Sign Up </a></Link>
            </Col> 
          </Row>
        </React.Fragment>
      </Container>
    );
  }
}

export default LogIn;
