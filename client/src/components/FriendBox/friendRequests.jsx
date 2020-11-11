/* Importing React & Router */
import React, { Component, useState } from "react";
import { Link, Route, Switch } from "react-router-dom";

/* Importing All Bootstrap Components */
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

/* Importing All Resources & Custom CSS */
import "./friendRequests.css";
import MainNavBar from "../MainNavBar/mainNavBar";
import NowPlaying from "../NowPlaying/nowPlaying";
import SearchIcon from "../../assets/search.svg";

class FriendRequestsButton extends Component {
  state = {
    show: false,
  };
  showModal = (e) => {
    this.setState({
      show: !this.state.show,
    });
  };
  onClose = (e) => {
    this.props.onClose && this.props.onClose(e);
  };

  constructor(props) {
    super(props);
    this.state = {
      // userUsername: "",
      // otherUsername: "",
    };
  }

  render() {
    return (
      <div>
        <Button
          className="friend-button"
          onClick={(e) => {
            this.showModal();
          }}
        >
          Friend Requests
        </Button>

        <Modal show={this.state.show} onHide={this.showModal}>
          <Modal.Header
            closeButton
            id="friend-requests-modal-header"
            className="text-center"
          >
            <Modal.Title id="friend-requests-modal-title">
              Friend Requests
            </Modal.Title>
          </Modal.Header>
          <Modal.Body id="friend-requests-modal-body">
            <Row>
              <Col
                lg="6"
                md="6"
                sm="6"
                xs="6"
                className="friend-requests-toggle-button-column"
              >
                <Button className="friend-requests-toggle-buttons">
                  Incoming Requests
                </Button>
              </Col>
              <Col
                lg="6"
                md="6"
                sm="6"
                xs="6"
                className="friend-requests-toggle-button-column"
              >
                <Button className="friend-requests-toggle-buttons">
                  Outgoing Requests
                </Button>
              </Col>
            </Row>
            <Row>
              <Container className="friend-requests-container">
                <Row className="friend-requests-items">
                  <Table className="friend-requests-results">
                    <tbody>
                      <tr className="friend-requests-item">
                        <td> PrincessDaisy </td>
                      </tr>
                      <tr className="friend-requests-item">
                        <td> PrincessPeach </td>
                      </tr>
                      <tr className="friend-requests-item">
                        <td> Mario_Br0 </td>
                      </tr>
                      <tr className="friend-requests-item">
                        <td> Gooooonbas </td>
                      </tr>
                      <tr className="friend-requests-item">
                        <td> Toadette123 </td>
                      </tr>
                    </tbody>
                  </Table>
                </Row>

                <Row>
                  <Col
                    lg="6"
                    md="6"
                    sm="6"
                    xs="6"
                    className="friend-requests-toggle-button-column"
                  >
                    <Button id="friend-requests-accept-button">Accept</Button>
                  </Col>
                  <Col
                    lg="6"
                    md="6"
                    sm="6"
                    xs="6"
                    className="friend-requests-toggle-button-column"
                  >
                    <Button id="friend-requests-decline-button">Decline</Button>
                  </Col>
                </Row>
              </Container>
            </Row>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default FriendRequestsButton;
