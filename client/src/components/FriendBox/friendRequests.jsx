/* Importing React & Router */
import React, { Component } from "react";
import { withRouter } from "react-router-dom";

/* Importing All Bootstrap Components */
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";

import PropTypes from "prop-types";
import { connect } from "react-redux";

/* Importing All Resources & Custom CSS */
import "./friendRequests.css";

class FriendRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      showIncoming: true,
      showOutgoing: false,
      userMain: props.auth.user.id,
      userOther: [],
      userOtherName: "",
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
      userOther: [],
      userOtherName: "",
    });
  }

  displayOutgoing() {
    this.setState({
      showIncoming: false,
      showOutgoing: true,
      userOther: [],
      userOtherName: "",
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
    this.setState({ userOther: request._id, userOtherName: request.username });
    console.log(request._id);
  }

  acceptRequest(event) {
    //delete incoming request from user main and outgoing request from user other. Add user other id to user main's and user other's friends list
    if (this.state.userOther == "") {
      console.log("No user selected");
      return;
    } else {
      const url = "http://localhost:9000/user/friends/request/accept";
      const options = {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userMain: this.state.userMain,
          userOther: this.state.userOther,
        }),
      };
      fetch(url, options)
        .then((res) => [res.status, res.json()])
        .then((response) => {
          console.log(response);
          if (response[0] == 200) {
          } else {
            alert(response[1].message);
          }
        });
      alert("Friend Request Accepted!");
    }
  }

  declineRequest(event) {
    //delete incoming request from user main and outgoing request from user other
    if (this.state.userOther == "") {
      console.log("No user selected");
      return;
    } else {
      const url = "http://localhost:9000/user/friends/request/decline";
      const options = {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userMain: this.state.userMain,
          userOther: this.state.userOther,
        }),
      };
      fetch(url, options)
        .then((res) => [res.status, res.json()])
        .then((response) => {
          console.log(response);
          if (response[0] == 200) {
          } else {
            alert(response[1].message);
          }
        });
      alert("Friend Request Declined!");
    }
  }

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
              <Col>
                <Container className="friend-requests-container">
                  <Row>
                    <Col>
                      <div>
                        <h2
                          className={this.state.showIncoming ? null : "hide"}
                          id="currently-selected-req"
                        >
                          Selected: {this.state.userOtherName}
                        </h2>
                        {/* <h2
                          className={this.state.showOutgoing ? null : "hide"}
                          id="currently-selected-req"
                        >
                          Selected: {this.state.userOtherName}
                        </h2> */}
                      </div>
                    </Col>
                  </Row>
                  <Row className="friend-requests-items">
                    <div className={this.state.showOutgoing ? null : "hidden"}>
                      <Table className="friend-requests-results">
                        <tbody>
                          {this.state.friends.requests.sent.map(
                            (outgoingRes) => (
                              <tr className="friend-requests-item">
                                <td
                                  value={outgoingRes.username}
                                  onClick={(event) => {
                                    this.handleSelectedRequest(
                                      event,
                                      outgoingRes
                                    );
                                  }}
                                >
                                  {outgoingRes.username}
                                </td>
                              </tr>
                            )
                          )}
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
                      <Button
                        id="friend-requests-accept-button"
                        onClick={() => {
                          this.acceptRequest();
                        }}
                      >
                        Accept
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
                        id="friend-requests-decline-button"
                        onClick={() => {
                          this.declineRequest();
                        }}
                      >
                        Decline
                      </Button>
                    </Col>
                  </Row>
                </Container>
              </Col>
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
