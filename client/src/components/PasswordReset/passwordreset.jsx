import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import Logo from "../../assets/githum-tree.svg";

import "./passwordreset.css";

class PasswordReset extends Component {
  state = {};
  render() {
    return (
      <Container fluid className="pwdreset-div">

      <Row className="justify-content-md-center clear">
        <Col md={{span: 8}} lg={{ span: 4 }} className="pwdreset-box">

          <Col lg={{span: 12}}>
              <Image className="logo" src={Logo}/>
          </Col>
          <Col lg={{span: 12}}>
            <h1> Password Reset </h1>
          </Col>

          <Col lg={{span: 10, offset: 1}}>
            <form action="http://localhost:9000/user/credentials/resetpassword" method="POST">
              <div className="pwdreset-fields">
                <br></br>
                <label for="email"></label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Email Address"
                ></input>
                <br></br>
                <br></br>
                <Link to="/"> <input
                  id="submit"
                  type="submit"
                  value="Send Reset"
                /></Link>
              </div>
            </form>
          </Col>

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

export default PasswordReset;
