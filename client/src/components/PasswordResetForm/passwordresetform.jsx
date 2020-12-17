import React, { Component } from "react";
import { Link, Route, Switch, withRouter } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";

import Row from "react-bootstrap/esm/Row";
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import Logo from "../../assets/githum-tree.svg";

import "./passwordresetform.css";

class PasswordReset extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      token: '',
      password: ''
    }

    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
  }

  componentDidMount() {
    this.setState({
      id: this.props.match.params.id,
      token: this.props.match.params.token
    })
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  resetPassword(event) {
    event.preventDefault();

    const url = 'http://104.131.160.216:9000/user/credentials/passwordreset';
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
        id: this.state.id,
        token: this.state.token,
        password: this.state.password
      })
    };
    fetch(url, options)
      .then(res => res.json())
      .then(res => {
        if(res.status == 200){
          this.props.history.push("/login");
        } else {
          alert(res.message);
        }
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
                <label for="password"></label>
                <input type="password" id="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}></input>
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

export default withRouter(PasswordReset);
