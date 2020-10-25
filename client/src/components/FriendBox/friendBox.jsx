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
import "./friendBox.css";
import ForestDefaultIcon from "../../assets/forest.svg";

class FriendBox extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Col lg="4" md="4" sm="4" xs="4">
          <Container
            className="container container-fluid"
            id="friend-action-container"
          >
            <Row>
              <Col lg="12" md="12" sm="12" xs="12">
                <Table className="friend-list-table">
                  <tbody>
                    <tr className="friend-list-item">Somebody</tr>
                    <tr className="friend-list-item">Somebody2</tr>
                    <tr className="friend-list-item">Somebody3</tr>
                    <tr className="friend-list-item">Somebody4</tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
            <Row>
              <Col lg="6" md="6" sm="6" xs="6">
                <Button className="friend-list-action-button">
                  Add Friend
                </Button>
              </Col>
              <Col lg="6" md="6" sm="6" xs="6">
                <Button className="friend-list-action-button">
                  Friend Requests
                </Button>
              </Col>
            </Row>
          </Container>
        </Col>
      </React.Fragment>
    );
  }
}

export default FriendBox;
