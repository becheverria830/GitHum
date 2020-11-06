import React, { Component } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { Link, Route, Switch, withRouter } from "react-router-dom";
import "./login.css";
import Logo from "../../assets/githum-tree.svg";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../redux/actions/authActions";

import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

class Login extends Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/feed"); // push user to dashboard when they login
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/feed");
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.logIn = this.logIn.bind(this);
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }
  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  logIn(event) {
    event.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData);
    // const url = 'http://localhost:9000/user/credentials/login';
    // const options = {
    //   method: 'POST',
    //   mode: 'cors',
    //   cache: 'no-cache',
    //   credentials: 'same-origin',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     email: this.state.email,
    //     password: this.state.password
    //   })
    // };
    // fetch(url, options)
    //   .then(res => [res.status, res.json()])
    //   .then(response => {
    //     console.log(response);
    //     if(response[0] == 200) {
    //       window.location.href = "http://localhost:3000/feed"
    //     } else {
    //       alert(response[1].message);
    //     }
    //   });
  }

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
                <form onSubmit={this.logIn}>
                  <div className="login-fields">
                    <br></br>
                    <label for="email"></label>
                    <input type="text" id="email" name="email" placeholder="Email Address" value={this.state.email} onChange={this.handleEmailChange}></input>
                    <br></br>
                    <label for="password"></label>
                    <input type="password" id="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}></input>
                    <br></br>
                    <input id="submit" type="submit" value="Log In"></input>
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));
