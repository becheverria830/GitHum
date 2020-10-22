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
import NowPlaying from "./nowPlaying";

class Forest extends Component {
  state = {
    owner: 0,
  };
  render() {
    return (
      <React.Fragment>
        <MainNavBar></MainNavBar>
        <div>
          {/* <Container> */}
          <Row>
            <Col lg="8">
              <Row>
                <Container
                  className="container-fluid"
                  id="forest-title-container"
                >
                  <Col lg="4" className="">
                    <img
                      id="forest-pic"
                      src="https://picsum.photos/200/300"
                    ></img>
                  </Col>
                  <Col lg="8">
                    <h1>Forest Title</h1>
                  </Col>
                </Container>
              </Row>
              <Row>
                <Container
                  className="container-fluid"
                  id="forest-button-toggle-container"
                >
                  <p>Toggle Buttons</p>
                </Container>
              </Row>
            </Col>
            <Col lg="4">
              <Container
                className="container container-fluid"
                id="forest-action-container"
              >
                <p>Forest Options Here</p>
              </Container>
            </Col>
          </Row>
          <Row>
            <Col lg="8">
              <Container
                className="container-fluid"
                id="forest-song-display-container"
              >
                <p>Songs here</p>
              </Container>
            </Col>
            <Col lg="4">
              <Container
                className="container"
                id="forest-now-playing-container"
              >
                <NowPlaying></NowPlaying>
              </Container>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default Forest;
