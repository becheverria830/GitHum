/* Importing React & Router */
import React, { Component } from "react";
import { Link, Route, Switch, withRouter } from "react-router-dom";

/* Importing All Bootstrap Components */
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/authActions";

/* Importing All Resources & Custom CSS */
import "./friendBox.css";
import ForestDefaultIcon from "../../assets/forest.svg";
import Message from "../../assets/comment.svg";
import DeleteIcon from "../../assets/delete.svg";
import FriendMessageButton from "./friendMessage";
import AddFriendButton from "./addFriend";
import FriendRequestsButton from "./friendRequests";

class FriendBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userMain: props.auth.user.id,
      userOther: [],
      friends: {
        current_friends: [],
        requests: {
          received: [],
          sent: [],
        },
      },
    };
    this.handleSelectedFriend = this.handleSelectedFriend.bind(this);
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
        // console.log(res);
      })
      .catch((err) => err);
  }

  handleSelectedFriend(event, request) {
    const url = "http://localhost:9000/user/friends/remove";
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
        userOther: request._id
      }),
    };
    fetch(url, options)
      .then((response) => {
        window.location.reload();
      });
  }

  componentDidMount() {
    this.getFriends();
  }

  render() {
    return (
      <React.Fragment>
        <div className="component">
          <Row>
            <Col md="12" className="friends-header-div">
              <h3 className="friends-header">
                <b>Friends</b>
              </h3>
            </Col>
          </Row>
          <Row className="friend-container">
            <Col md="12">
              <Row className="friend-table">
                <Col md="12">
                  <Table>
                    <tbody>
                      {this.state.friends.current_friends.map((friend) => (
                        <tr className="friend-table-row">
                          <td>
                            <h3 className="friend-name-text">
                              {friend.first_name} {friend.last_name}
                            </h3>
                          </td>
                          <td>
                            <Link to={"/valley/" + friend._id}>
                              <Button className="friend-visit-valley">
                                Visit
                              </Button>
                            </Link>
                          </td>
                          <td>
                            <FriendMessageButton
                              current_user={this.props.auth.user}
                              other_user={friend}
                            />
                          </td>
                          <td>
                            <input
                              type="image"
                              className="delete-friend-button"
                              src={DeleteIcon}
                              onClick={(event) => {
                                this.handleSelectedFriend(event, friend); //need to make a promise for this?? is remove friend being called too early?
                              }}
                            ></input>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
              </Row>
              <Row className="friend-buttons">
                <Col lg="6" md="6" sm="6" xs="6">
                  <AddFriendButton />
                </Col>
                <Col lg="6" md="6" sm="6" xs="6">
                  <FriendRequestsButton />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

FriendBox.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(withRouter(FriendBox));
