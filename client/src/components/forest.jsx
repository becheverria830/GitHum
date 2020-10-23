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
            <Col lg="8" md="8" sm="8">
              <Row>
                <Container
                  className="container-fluid"
                  id="forest-title-container"
                >
                  <Col lg="3" md="3" sm="3" className="">
                    <img
                      id="forest-pic"
                      src="https://picsum.photos/200/300"
                    ></img>
                  </Col>
                  <Col lg="3" md="3" sm="3">
                    <h1 id="forest-forest-title">Forest Title</h1>
                  </Col>
                  <Col lg="6" md="6" sm="6"></Col>
                </Container>
              </Row>
              <Row>
                <Container
                  className="container-fluid"
                  id="forest-button-toggle-container"
                >
                  <Button className="forest-toggle-buttons">Songs</Button>
                  <Button className="forest-toggle-buttons">Info</Button>
                </Container>
              </Row>
            </Col>
            <Col lg="4" md="4" sm="4">
              <Container
                className="container container-fluid"
                id="forest-action-container"
              >
                <Col lg="1" md="1" sm="1"></Col>
                <Col lg="10" md="10" sm="10">
                  <Row>
                    <Button
                      id="forest-action-1"
                      className="forest-action-buttons"
                    >
                      Forest Settings
                    </Button>
                  </Row>
                  <br></br>
                  <Row>
                    <Button
                      id="forest-action-2"
                      className="forest-action-buttons"
                    >
                      Share Forest
                    </Button>
                  </Row>
                  <br></br>
                  <Row>
                    <Button
                      id="forest-action-3"
                      className="forest-action-buttons"
                    >
                      Branch from Forest
                    </Button>
                  </Row>
                  <br></br>
                  <Row>
                    <Button
                      type="Danger"
                      id="forest-action-4"
                      className="forest-action-buttons"
                    >
                      Deforest
                    </Button>
                  </Row>
                  <br></br>
                </Col>
                <Col lg="1" md="1" sm="1"></Col>
              </Container>
            </Col>
          </Row>
          <Row>
            <Col lg="8" md="8" sm="8">
              <Container
                className="container-fluid"
                id="forest-song-display-container"
              >
                <p>Songs here</p>
              </Container>
            </Col>
            <Col lg="4" md="4" sm="4">
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
