/* Importing React & Router */
import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";

/* Importing All Bootstrap Components */
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

/* Importing All Resources & Custom CSS */
import "./forestInfo.css";

class ForestInfo extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Container
          className="container container-fluid"
          id="forest-info-container"
        >
          <Row>
            <Col>
              <Container className="forest-info-panel" id="owner-panel">
                <Row>
                  <Col>
                    <h3>Forest Owner</h3>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p>becheverria830</p>
                  </Col>
                </Row>
                <Row></Row>
              </Container>
            </Col>
            <Col>
              <Container
                className="forest-info-panel"
                id="number-branched-panel"
              >
                <Row>
                  <Col>
                    <h3>Number of Branched Forests</h3>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p>12</p>
                  </Col>
                </Row>
                <Row></Row>
              </Container>
            </Col>
            <Col>
              <Container
                className="forest-info-panel"
                id="original-forest-panel"
              >
                <Row>
                  <Col>
                    <h3> Root Forest Owner </h3>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p>forest_master_5000</p>
                  </Col>
                </Row>
                <Row></Row>
              </Container>
            </Col>
            <Col>
              <Container
                className="forest-info-panel"
                id="number-saved-panel"
              >
                <Row>
                  <Col>
                    <h3>Number of Times Saved</h3>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p>12</p>
                  </Col>
                </Row>
                <Row></Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default ForestInfo;
