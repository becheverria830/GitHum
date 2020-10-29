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
import UCorner from "../../assets/corner_test.svg";
import BCorner from "../../assets/cornerBottom.svg";

export default function Landing() {
  return (
    <Container fluid className="landing-div">
        <Row className="align-items-start">
          <Col md={{span: 1, offset: 11}} lg={{span: 2, offset: 10}}>
            <Image className="corner" src={UCorner}/>
          </Col>
        </Row>
        <Row className="justify-content-md-center clear landing-box">
          <Col md={{span: 8}} lg={{span: 6}}>
          <Col lg={{span: 12}}>
              <Image className="logo" src={Logo}/>
            </Col>
            <Col lg={{span: 12}}>
              <h2 className="header-text">GitHum</h2>
            </Col>
            <Col lg={{ span: 8, offset: 2}}>
              <Link to="/login"><Button> Log In </Button></Link>
            </Col>
            <Col lg={{ span: 8, offset: 2}}>
              <Link to="/signup"><Button> Sign Up </Button></Link>
            </Col>
          </Col>
        </Row>
        <Row className="align-items-end">
          <Col md={{span: 1, offset: 0}} lg={{span: 2, offset: 0}}>
            <Image className="corner" src={BCorner}/>
          </Col>
        </Row>
    </Container>
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
