/* Importing React & Router */
import React, { Component, useState } from "react";
import { Link, Route, Switch, withRouter } from "react-router-dom";

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

import PropTypes from "prop-types";
import { connect } from "react-redux";

/* Importing All Resources & Custom CSS */
import "./friendRequests.css";
import MainNavBar from "../MainNavBar/mainNavBar";
import NowPlaying from "../NowPlaying/nowPlaying";
import SearchIcon from "../../assets/search.svg";

class FriendRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      showIncoming: true,
      showOutgoing: false,
      selectedRequest: [],
      friends: {
        current_friends: [],
        requests: {
          received: [],
          sent: [],
        },
      },
    };
    this.displayIncoming = this.displayIncoming.bind(this);
    this.displayOutgoing = this.displayOutgoing.bind(this);
    this.handleSelectedRequest = this.handleSelectedRequest.bind(this);
    this.handleAcceptRequest = this.handleAcceptRequest.bind(this);
    this.handleDeclineRequest = this.handleDeclineRequest.bind(this);
  }

  showModal = (e) => {
    this.setState({
      show: !this.state.show,
    });
  };
  onClose = (e) => {
    this.props.onClose && this.props.onClose(e);
  };

  displayIncoming() {
    this.setState({
      showIncoming: true,
      showOutgoing: false,
    });
  }

  displayOutgoing() {
    this.setState({
      showIncoming: false,
      showOutgoing: true,
    });
  }

  getFriends() {
    fetch("http://localhost:9000/user/friends/" + this.props.auth.user.id)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          friends: {
            current_friends: res.list,
            requests: {
              received: res.incoming_requests,
              sent: res.outgoing_requests,
            },
          },
        });
        console.log(res);
      })
      .catch((err) => err);
    console.log(this.state.friends.requests.sent);
  }

  handleSelectedRequest(event, request) {
    this.setState({ selectedRequest: request._id });
  }

  handleAcceptRequest(event) {}

  handleDeclineRequest(event) {}

  render() {
    return (
      <div>
        <Button
          className="friend-button"
          onClick={(e) => {
            this.showModal();
            this.getFriends();
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
                <Button
                  className="friend-requests-toggle-buttons"
                  onClick={this.displayIncoming}
                >
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
                <Button
                  className="friend-requests-toggle-buttons"
                  onClick={this.displayOutgoing}
                >
                  Outgoing Requests
                </Button>
              </Col>
            </Row>
            <Row>
              <Container className="friend-requests-container">
                <Row className="friend-requests-items">
                  <div className={this.state.showOutgoing ? null : "hidden"}>
                    <Table className="friend-requests-results">
                      <tbody>
                        {this.state.friends.requests.sent.map((outgoingRes) => (
                          <tr className="friend-requests-item">
                            <td
                              value={outgoingRes.username}
                              onClick={(event) => {
                                this.handleSelectedRequest(event, outgoingRes);
                              }}
                            >
                              {outgoingRes.username}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                  <div className={this.state.showIncoming ? null : "hidden"}>
                    <Table className="friend-requests-results">
                      <tbody>
                        {this.state.friends.requests.received.map(
                          (incomingRes) => (
                            <tr className="friend-requests-item">
                              <td
                                value={incomingRes.username}
                                onClick={(event) => {
                                  this.handleSelectedRequest(
                                    event,
                                    incomingRes
                                  );
                                }}
                              >
                                {incomingRes.username}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </Table>
                  </div>
                </Row>

                <Row className={this.state.showIncoming ? null : "hidden"}>
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

FriendRequests.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(withRouter(FriendRequests));
