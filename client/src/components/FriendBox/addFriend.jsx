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

function AddFriendButton() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button className="friend-button" onClick={handleShow}>
        Add Friend
        <Image src={AddIcon} id="add-icon"></Image>
      </Button>

      <Modal show={show} onHide={handleClose}>
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
                  placeholder="Search by username"
                  className="ml-sm-2"
                  id="add-friend-search-bar"
                />
                <Button variant="dark" className="add-friend-search-icon-button">
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
                    <tr className="add-friend-search-item">
                      <td>John_Doe</td>
                    </tr>
                    <tr className="add-friend-search-item">
                      <td>Joe_Doe</td>
                    </tr>
                    <tr className="add-friend-search-item">
                      <td>Jake_Doe</td>
                    </tr>
                    <tr className="add-friend-search-item">
                      <td>Justin_Doe</td>
                    </tr>
                    <tr className="add-friend-search-item">
                      <td>Jeremy_Doe</td>
                    </tr>
                    <tr className="add-friend-search-item">
                      <td>Jae_Doe</td>
                    </tr>
                    <tr className="add-friend-search-item">
                      <td>Jonn_Doe</td>
                    </tr>
                  </tbody>
                </Table>
              </Row>
              <Row>
                <Col lg="12" md="12" sm="12" xs="12" className="center-button">
                  <Button id="add-friend-request-button"> Send Request </Button>
                </Col>
                
              </Row>
            </Container>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
}

// render(<Example />);

export default AddFriendButton;

class AddFriend extends Component {
  state = {};
  render() {
    return <AddFriendButton />;
  }
}
