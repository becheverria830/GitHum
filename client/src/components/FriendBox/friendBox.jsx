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
        <div className="component">
          <Row>
            <Col md="12" className="friends-header-div">
              <h3 className="friends-header"><b>Friends</b></h3>
            </Col>
          </Row>
          <Row className="friend-container">
            <Col md="12">
              <Row className="friend-table">
                <Col md="12">
                  <Table>
                    <tbody>
                      <tr className="friend-table-row">
                        <td>Somebody</td>
                      </tr>
                      <tr className="friend-table-row">
                        <td>Somebody</td>
                      </tr>
                      <tr className="friend-table-row">
                        <td>Somebody</td>
                      </tr>
                      <tr className="friend-table-row">
                        <td>Somebody</td>
                      </tr>
                      <tr className="friend-table-row">
                        <td>Somebody</td>
                      </tr>
                      <tr className="friend-table-row">
                        <td>Somebody</td>
                      </tr>
                      <tr className="friend-table-row">
                        <td>Somebody</td>
                      </tr>
                      <tr className="friend-table-row">
                        <td>Somebody</td>
                      </tr>
                      <tr className="friend-table-row">
                        <td>Somebody</td>
                      </tr>
                      <tr className="friend-table-row">
                        <td>Somebody</td>
                      </tr>
                      <tr className="friend-table-row">
                        <td>Somebody</td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
              <Row className="friend-buttons">
                <Col lg="6" md="6" sm="6" xs="6">
                  <Button className="friend-button">
                    Add Friend
                  </Button>
                </Col>
                <Col lg="6" md="6" sm="6" xs="6">
                  <Button className="friend-button">
                    Friend Requests
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>


      </React.Fragment>
    );
  }
}

export default FriendBox;
