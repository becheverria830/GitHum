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
import Message from "../../assets/comment.svg";
import FriendMessageButton from "./friendMessage";
import AddFriendButton from "./addFriend";
import FriendRequestsButton from "./friendRequests";

class FriendBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: {
        current_friends: [],
        requests: {
          received: [],
          sent: [],
        },
      },
    };
  }

  getFriends() {
    fetch("http://localhost:9000/user/friends")
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          friends: res,
        });
        console.log(res);
      })
      .catch((err) => err);
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
                              {friend.firstname} {friend.lastname}
                            </h3>
                          </td>
                          <td>
                            <Link to="/valley/2">
                              <Button className="friend-visit-valley">
                                Visit
                              </Button>
                            </Link>
                          </td>
                          <td>
                            <FriendMessageButton />
                          </td>
                        </tr>
                      ))}
                      {this.state.friends.current_friends.map((friend) => (
                        <tr className="friend-table-row">
                          <td>
                            <h3 className="friend-name-text">
                              {friend.firstname} {friend.lastname}
                            </h3>
                          </td>
                          <td>
                            <Button className="friend-visit-valley">
                              Visit
                            </Button>
                          </td>
                          <td>
                            <FriendMessageButton />
                          </td>
                        </tr>
                      ))}
                      {this.state.friends.current_friends.map((friend) => (
                        <tr className="friend-table-row">
                          <td>
                            <h3 className="friend-name-text">
                              {friend.firstname} {friend.lastname}
                            </h3>
                          </td>
                          <td>
                            <Button className="friend-visit-valley">
                              Visit
                            </Button>
                          </td>
                          <td>
                            <FriendMessageButton />
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

export default FriendBox;
