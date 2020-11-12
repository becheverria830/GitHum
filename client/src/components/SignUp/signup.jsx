import React, { Component } from "react";
import { Link, Route, Switch, withRouter } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../redux/actions/authActions";


import Logo from "../../assets/githum-tree.svg";
import "./signup.css";

class SignUp extends Component {

  componentWillReceiveProps(nextProps) {
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
      fname: '',
      lname: '',
      email: '',
      username: '',
      password: ''
    }

    this.handleFnameChange = this.handleFnameChange.bind(this);
    this.handleLnameChange = this.handleLnameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  handleFnameChange(event) {
    this.setState({fname: event.target.value});
  }
  handleLnameChange(event) {
    this.setState({lname: event.target.value});
  }
  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }
  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }
  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  signUp(event) {
    event.preventDefault();

    const newUser = {
      fname: this.state.fname,
      lname: this.state.lname,
      email: this.state.email,
      username: this.state.username,
      password: this.state.password
    };
    this.props.registerUser(newUser, this.props.history);
    // const url = 'http://localhost:9000/user/credentials/signup';
    // const options = {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json;charset=UTF-8'
    //   },
    //   body: JSON.stringify({
    //     fname: this.state.fname,
    //     lname: this.state.lname,
    //     email: this.state.email,
    //     username: this.state.username,
    //     password: this.state.password
    //   })
    // };
    // fetch(url, options)
    //   .then(res => res.json())
    //   .then(res => {
    //     console.log(res);
    //     if(res.status == 200) {
    //       // window.location.href = "http://localhost:3000/login"
    //     } else {
    //       alert(res.message);
    //     }
    //   });
  }

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
            <form onSubmit={this.signUp}>
              <div className="signup-fields">
                <br></br>
                <label for="fname"></label>
                <input type="text" id="fname" name="fname" placeholder="First Name" value={this.state.fname} onChange={this.handleFnameChange}></input>
                <br></br>
                <label for="lname"></label>
                <input type="text" id="lname" name="lname" placeholder="Last Name" value={this.state.lname} onChange={this.handleLnameChange}></input>
                <br></br>
                <label for="email"></label>
                <input type="text" id="email" name="email" placeholder="Email Address" value={this.state.email} onChange={this.handleEmailChange}></input>
                <br></br>
                <label for="username"></label>
                <input type="text" id="username" name="username" placeholder="Create a Username" value={this.state.username} onChange={this.handleUsernameChange}></input>
                <br></br>
                <label for="password"></label>
                <input type="password" id="password" name="password" placeholder="Create a Password" value={this.state.password} onChange={this.handlePasswordChange}></input>
                <br></br>
                <input id="submit" type="submit" value="Sign Up"></input>
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

SignUp.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(SignUp));
