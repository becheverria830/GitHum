/* Importing React & Router */
import React from "react";
import { Link, Route, Switch } from "react-router-dom";

/* Importing All Bootstrap Components */
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

/* Importing All Resources & Custom CSS */
import "./landing.css";
import Logo from "../../assets/githum-tree.svg";
import USmall from "../../assets/upper_small.svg";
import ULarge from "../../assets/upper_large.svg";
import UCorner from "../../assets/corner_test.svg";

export default function Landing() {
  return (
    <div className="master-div container-fluid">
      <div class="float-right">
        <Image className="corner" src={UCorner}/>
      </div>
      <Container>
        <Row>
          <Col md={12}>
            <Image className="logo" src={Logo}/>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <h2 className="header-text">GitHum</h2>
          </Col>
        </Row>
        <Row className="justify-content-md-center clear">
          <Col xs lg="2">
            <Button className=""><Link to="/login"> Log In </Link></Button>
          </Col>
          <Col md="auto">
          <div className="spacer"></div>
          </Col>
          <Col xs lg="2">
            <Button className=""><Link to="/signup"> Sign Up </Link></Button>
          </Col>
        </Row>
      </Container>
    </div>
    //
    //
    // <div className="container">
    //   <div className="row main-title">
    //     <div className="col">
    //       <img className="logo" src={Logo} />
    //     </div>
    //     <div className="col title">
    //       <h2> GitHum </h2>
    //     </div>
    //   </div>
    //   <div className="row buttons-container">
    //     <button id="login-button"><Link to="/login"> Log In </Link></button>
    //     <button id="signup-button"><Link to="/signup"> Sign Up </Link></button>
    //   </div>
    //
    // </div>
  );
}
