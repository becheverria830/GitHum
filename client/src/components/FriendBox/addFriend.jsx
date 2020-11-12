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
import "./addFriend.css";
import MainNavBar from "../MainNavBar/mainNavBar";
import NowPlaying from "../NowPlaying/nowPlaying";
import SearchIcon from "../../assets/search.svg";
import AddIcon from "../../assets/add.svg";

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
      userMain: [],
      userOther: [],
      searchResults: [],
      selectedResult: [],
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSelectedResult = this.handleSelectedResult.bind(this);
  }

  search = (e) => {
    e.preventDefault();
    fetch("http://localhost:9000/user/friends/search/" + this.state.search)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.setState({
          searchResults: res.users,
        });
      })
      .catch((err) => err);
  };

  handleSearchChange(event) {
    this.setState({ search: event.target.value });
  }

  handleSelectedResult(event) {
    this.setState({ selectedResult: event.target.value });
  }

  sendFriendRequest(event) {
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
    // fetch(url, options)
    //   .then(res => [res.status, res.json()])
    //   .then(response => {
    //     console.log(response);
    //     if(response[0] == 200) {
    //       window.location.href = "http://localhost:3000/feed"
    //     } else {
    //       alert(response[1].message);
    //     }
    //   });
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
              <Container className="add-friend-search-container">
                <Row className="add-friend-search-items">
                  <Table className="add-friend-search-results">
                    <tbody>
                      {this.state.searchResults.map((searchRes) => (
                        <tr className="add-friend-search-item">
                          <td
                            onClick={this.handleSelectedResult}
                            value={searchRes.username}
                          >
                            {searchRes.username}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Row>
                <Row>
                  <Col
                    lg="12"
                    md="12"
                    sm="12"
                    xs="12"
                    className="center-button"
                  >
                    <Button id="add-friend-request-button">
                      {" "}
                      Send Request{" "}
                    </Button>
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

export default AddFriendButton;
