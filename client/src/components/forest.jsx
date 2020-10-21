/* Importing React & Router */
import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";

/* Importing All Bootstrap Components */
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

/* Importing All Resources & Custom CSS */
import "./forest.css";
import MainNavBar from "./mainNavBar";

class Forest extends Component {
  state = {
    owner: 0,
  };
  render() {
    return (
      <React.Fragment>
        <MainNavBar></MainNavBar>
        <div>
          <Row>
            <Col md="8">
              <Container
                className="container-fluid"
                id="forest-title-container"
              >
                <Col md="4">
                  <img
                    id="forest-pic"
                    src="https://picsum.photos/200/300"
                  ></img>
                </Col>
                <Col md="8">
                  <h1>Forest Title</h1>
                </Col>
              </Container>
            </Col>
            <Col xs lg="2"></Col>
          </Row>
          <Row>
            <Col md="8">
              <Container
                className="container-fluid"
                id="forest-button-toggle-container"
              >
                <p>Toggle Buttons</p>
              </Container>
            </Col>
            <Col xs lg="2"></Col>
          </Row>
          <Row>
            <Col md="8">
              <Container className="container-fluid" id="forest-song-display">
                <p>Songs here</p>
              </Container>
            </Col>
            <Col xs lg="2">
              3 of 3
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default Forest;
