import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import Logo from "../../assets/githum-tree.svg";

import "./passwordreset.css";

class PasswordReset extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
    }

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  resetPassword(event) {
    event.preventDefault();

    const resetPasswordData = {
      email: this.state.email,
    };
    const url = 'http://localhost:9000/user/credentials/resetpassword';
    const options = {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email
      })
    };
    fetch(url, options)
      .then(res => res.json())
      .then(res => {
        alert(res.message);
      });
  }

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
            <form onSubmit={this.resetPassword}>
              <div className="pwdreset-fields">
                <br></br>
                <label for="email"></label>
                <input type="text" id="email" name="email" placeholder="Email Address" value={this.state.email} onChange={this.handleEmailChange}></input>
                <br></br>
                <input id="submit" type="submit" value="Send Reset"></input>
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
