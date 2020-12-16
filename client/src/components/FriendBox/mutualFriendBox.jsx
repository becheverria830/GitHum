/* Importing React & Router */
import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";

/* Importing All Bootstrap Components */
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

import PropTypes from "prop-types";
import { connect } from "react-redux";

/* Importing All Resources & Custom CSS */
import "./friendBox.css";
import Message from "../../assets/comment.svg";
import FriendMessageButton from "./friendMessage";
import AddFriendButton from "./addFriend";
import FriendRequestsButton from "./friendRequests";

class MutualFriendBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userMain: props.auth.user.id,
      userOther: "",
      mutualFriends: [],
    };
  }

  getMutualFriends() {
    // Get Mutual Friends
    const url = "http://localhost:9000/user/friends/mutualFriends";
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
        userOther: this.props.userOther,
      }),
    };
    fetch(url, options)
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        this.setState({ mutualFriends: response.mutualFriends });
      });
  }

  componentDidMount() {
    this.getMutualFriends();
  }

  render() {
    return (
      <React.Fragment>
        <div className="component">
          <Row>
            <Col md="12" className="friends-header-div">
              <h3 className="friends-header">
                <b>Mutual Friends</b>
              </h3>
            </Col>
          </Row>
          <Row className="friend-container">
            <Col md="12">
              <Row className="friend-table">
                <Col md="12">
                  <Table>
                    <tbody>
                      {this.state.mutualFriends.map((friend) => (
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
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

MutualFriendBox.propTypes = {
  auth: PropTypes.object.isRequired,
  userOther: PropTypes.string.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(withRouter(MutualFriendBox));
