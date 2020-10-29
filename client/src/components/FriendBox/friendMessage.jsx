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
import "./friendMessage.css";
import Message from "../../assets/comment.svg";

function FriendMessageButton() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <input
        type="image"
        className="message-button"
        src={Message}
        onClick={handleShow}
      ></input>

      <Modal show={show} onHide={handleClose}>
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
              <p id="msg-address">@jerrherr</p>
            </Col>
          </Row>
          <Row>
            <Container className="friend-msg-container">
              <Row>
                <Table className="friend-msg-results">
                  <tbody>
                    <tr className="friend-msg-item">
                      <td>@becheverria830: Hey</td>
                    </tr>
                    <tr className="friend-msg-item">
                      <td>@jerrherr: Yo</td>
                    </tr>
                    <tr className="friend-msg-item">
                      <td>@becheverria830: Do you like Justin Bieber?</td>
                    </tr>
                    <tr className="friend-msg-item">
                      <td>@jerrherr: I'm a big fan</td>
                    </tr>
                    <tr className="friend-msg-item">
                      <td>@becheverria830: Lol</td>
                    </tr>
                    <tr className="friend-msg-item">
                      <td>@jerrherr: : ( </td>
                    </tr>
                    <tr className="friend-msg-item">
                      <td>@becheverria830: :^) </td>
                    </tr>
                  </tbody>
                </Table>
              </Row>
            </Container>
            <Container>
              <Row>
                <Col lg="12" md="12" sm="12" xs="12">
                  <Form inline>
                    <FormControl
                      type="text"
                      placeholder="Type your message here"
                      className="ml-sm-2"
                      id="msg-input-bar"
                    />
                  </Form>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button id="friend-msg-send-button"> Send </Button>
                </Col>
              </Row>
            </Container>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default FriendMessageButton;

class FriendMessage extends Component {
  state = {};
  render() {
    return <FriendMessageButton />;
  }
}
