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
import PropTypes from "prop-types";

/* Importing All Resources & Custom CSS */
import "./friendMessage.css";
import Message from "../../assets/comment.svg";

class FriendMessageButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      message: "",
      messageList: [],
    };

    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  handleMessageChange(event) {
    this.setState({message: event.target.value});
  }

  sendMessage(event) {
    event.preventDefault();
    const url = "http://localhost:9000/user/messages/create";
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
        sender: this.props.current_user.id,
        receiver: this.props.other_user._id,
        message: this.state.message
      }),
    };
    fetch(url, options)
      .then((res) => {
        if(res.status != 200) {
          alert("Please complete the form and try again!");
        } else {
          this.setState({'message':''});
        }
      })
      .catch((err) => err);
  }

  showModal = (e) => {
    this.setState({
      show: !this.state.show,
    });

    if(this.state.show) {
      clearInterval(this.interval);
    } else {
      this.interval = setInterval(() => {
        fetch("http://localhost:9000/user/messages/"+this.props.current_user.id+"/"+this.props.other_user._id)
          .then(res => res.json())
          .then(res => {
            this.setState({messageList: res});
            // console.log(this.state.messageList);
          })
          .catch(err => err);
      }, 1000);
    }
  };

  onClose = (e) => {
    this.props.onClose && this.props.onClose(e);
  };

  componentDidMount() {
    fetch("http://localhost:9000/user/messages/"+this.props.current_user.id+"/"+this.props.other_user._id)
      .then(res => res.json())
      .then(res => {
        this.setState({messageList: res});
        // console.log(this.state.messageList);
      })
      .catch(err => err);
  }

  render() {
    return (
      <div>
        <input
          type="image"
          className="message-button"
          src={Message}
          onClick={(e) => {
            this.showModal();
          }}
        ></input>

        <Modal show={this.state.show} onHide={this.showModal}>
          <Modal.Header
            closeButton
            id="friend-msg-modal-header"
            className="text-center"
          >
            <Modal.Title id="friend-msg-modal-title">
              {" "}
              Message Friends{" "}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body id="friend-msg-modal-body">
            <Row>
              <Col lg="12" md="12" sm="12" xs="12">
                <p id="msg-address">@{this.props.other_user.username}</p>
              </Col>
            </Row>
            <Row>
              <Container className="friend-msg-container">
                <Row>
                  <Table className="friend-msg-results">
                    <tbody>
                      {this.state.messageList.map((message) => (
                        <tr className="friend-msg-item">
                          <td>@{message.from_user[0].username}: {message.content}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Row>
              </Container>
              <Container>
                <Row>
                  <Col lg="12" md="12" sm="12" xs="12">
                    <Form inline onSubmit={this.sendMessage}>
                      <FormControl
                        type="text"
                        value={this.state.message}
                        onChange={this.handleMessageChange}
                        placeholder="Type your message here"
                        className="ml-sm-2"
                        id="msg-input-bar"
                      />
                    </Form>
                  </Col>
                </Row>
                <Row>
                  <Col
                    lg="12"
                    md="12"
                    sm="12"
                    xs="12"
                    className="friend-msg-send-col"
                  >
                    <Button onClick={this.sendMessage} id="friend-msg-send-button"> Send </Button>
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

FriendMessageButton.propTypes = {
  current_user: PropTypes.object.isRequired,
  other_user: PropTypes.object.isRequired,
};

export default FriendMessageButton;
