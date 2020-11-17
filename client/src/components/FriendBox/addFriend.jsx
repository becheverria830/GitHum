/* Importing React & Router */
import React, { Component, useState } from "react";
import { withRouter } from "react-router-dom";

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
import "./addFriend.css";
import SearchIcon from "../../assets/search.svg";
import AddIcon from "../../assets/add.svg";

import PropTypes from "prop-types";
import { connect } from "react-redux";

class AddFriendButton extends Component {
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
      search: "",
      userMain: props.auth.user.id,
      userOther: [],
      userOtherName: "",
      searchResults: [],
      friends: {
        current_friends: [],
        requests: {
          received: [],
          sent: [],
        },
      },
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSelectedResult = this.handleSelectedResult.bind(this);
  }

  // getFriends() {
  //   console.log("GetFriends called");
  //   fetch("http://localhost:9000/user/friends/" + this.props.auth.user.id)
  //     .then((res) => res.json())
  //     .then((res) => {
  //       console.log("Res: " + res);
  //       this.setState({
  //         friends: {
  //           current_friends: res.list,
  //           requests: {
  //             received: res.incoming_requests,
  //             sent: res.outgoing_requests,
  //           },
  //         },
  //       });
  //       console.log(res);
  //     })
  //     .catch((err) => err);
  // }

  search = (e) => {
    e.preventDefault();
    if (this.state.search == "") {
      return;
    } else {
      fetch("http://localhost:9000/user/friends/search/" + this.state.search)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          this.setState({
            searchResults: res.users,
          });
        })
        .catch((err) => err);
    }
  };

  handleSearchChange(event) {
    this.setState({ search: event.target.value });
  }

  handleSelectedResult(event, searchRes) {
    this.setState({
      userOther: searchRes._id,
      userOtherName: searchRes.username,
    });
    console.log(searchRes._id);
  }

  displayError(error_message) {}

  sendFriendRequest(event) {
    // getFriend()
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

        // CHECK if request is to yourself
        if (this.state.userOther == "") {
          alert("Please select a username for the friend request!");
          return;
        }
        // CHECK if request is to yourself
        if (this.state.userMain === this.state.userOther) {
          alert("You can't send a friend request to yourself!");
          return;
        } else {
          // CHECK if request has been sent already
          var outgoing_reqs = this.state.friends.requests.sent;
          var error_bool = false;
          outgoing_reqs.forEach((req) => {
            if (req._id == this.state.userOther) {
              error_bool = true;
            }
          });
          if (error_bool) {
            alert("You have sent this user a friend request already!");
            return;
          }

          error_bool = false;
          // CHECK if request has been received already
          var incoming_reqs = this.state.friends.requests.received;
          incoming_reqs.forEach((req) => {
            if (req._id == this.state.userOther) {
              error_bool = true;
            }
          });
          if (error_bool) {
            alert("This user has already sent you a friend request!");
            return;
          }

          error_bool = false;
          // CHECK if the user is your friend already
          var current_friends = this.state.friends.current_friends;
          current_friends.forEach((friend) => {
            if (friend._id == this.state.userOther) {
              error_bool = true;
              return;
            }
          });
          if (error_bool) {
            alert("This user is your friend already!");
            return;
          }
          // Send Friend Request
          const url = "http://localhost:9000/user/friends/add";
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
                console.log("good.");
              } else {
                alert(response[1].message);
              }
            });
          alert("Friend Request Sent!");
        }
      })
      .catch((err) => err);
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
          Add Friend
          <Image src={AddIcon} id="add-icon"></Image>
        </Button>

        <Modal show={this.state.show} onHide={this.showModal}>
          <Modal.Header
            closeButton
            id="add-friend-modal-header"
            className="text-center"
          >
            <Modal.Title id="add-friend-modal-title">Add Friend</Modal.Title>
          </Modal.Header>
          <Modal.Body id="add-friend-modal-body">
            <Row>
              <Col lg="12" md="12" sm="12" xs="12">
                <Form inline>
                  <FormControl
                    type="text"
                    value={this.state.search}
                    onChange={this.handleSearchChange}
                    placeholder="Search by username"
                    className="ml-sm-2"
                    id="add-friend-search-bar"
                  />
                  <Button
                    onClick={this.search}
                    variant="dark"
                    className="add-friend-search-icon-button"
                  >
                    <Image className="search-button" src={SearchIcon} />
                  </Button>
                </Form>
              </Col>
            </Row>
            <Row>
              <Col>
                <Container className="add-friend-search-container">
                  <Row>
                    <Col>
                      <h2 id="currently-selected">
                        Selected: {this.state.userOtherName}
                      </h2>
                    </Col>
                  </Row>
                  <Row className="add-friend-search-items">
                    <Col>
                      <Table className="add-friend-search-results">
                        <tbody>
                          {this.state.searchResults.map((searchRes) => (
                            <tr className="add-friend-search-item">
                              <td
                                onClick={(event) => {
                                  this.handleSelectedResult(event, searchRes);
                                }}
                                value={searchRes.username}
                              >
                                {searchRes.username}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                  <Row>
                    <Col
                      lg="12"
                      md="12"
                      sm="12"
                      xs="12"
                      className="center-button"
                    >
                      <Button
                        id="add-friend-request-button"
                        onClick={() => {
                          this.sendFriendRequest();
                        }}
                      >
                        {" "}
                        Send Request{" "}
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

AddFriendButton.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(withRouter(AddFriendButton));
