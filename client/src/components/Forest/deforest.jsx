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
import "./deforest.css";

function DeforestButton() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button
        className="button forest-action-button danger"
        id="deforest-button"
        onClick={handleShow}
      >
        Deforest
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header
          closeButton
          id="deforest-modal-header"
          className="text-center"
        >
          <Modal.Title id="deforest-modal-title">Deforest</Modal.Title>
        </Modal.Header>
        <Modal.Body id="deforest-modal-body">
          <Row>
            <Col lg="12" md="12" sm="12" xs="12">
              <Container id="deforest-warning-container">
                <h1> Are you sure you want to delete this Forest? </h1>
                <h6>
                  Once your Forest is deleted, you will no longer have access to
                  its contents, but it's name will remain in the hierarchy.
                </h6>
                <Link to="/feed" class="btn forest-action-button deforest-link-button" role="button">Deforest</Link>
              </Container>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default DeforestButton;

class Deforest extends Component {
  state = {};
  render() {
    return <DeforestButton />;
  }
}
