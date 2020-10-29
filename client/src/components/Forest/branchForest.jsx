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
import "./branchForest.css";

function BranchForestButton() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button
        className="button forest-action-button"
        id="branch-forest-button"
        onClick={handleShow}
      >
        Branch from Forest
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header
          closeButton
          id="branch-forest-modal-header"
          className="text-center"
        >
          <Modal.Title id="branch-forest-modal-title">
            Branch from Forest
          </Modal.Title>
        </Modal.Header>
        <Modal.Body id="branch-forest-modal-body">
          <Row>
            <Col lg="12" md="12" sm="12" xs="12">
              <Form inline>
                <FormControl
                  type="text"
                  placeholder="Give the Branched Forest a name!"
                  className="ml-sm-2"
                  id="branch-forest-name-bar"
                />
                <Link to="/forest/1">
                  <input
                    id="branch-forest-create-link"
                    type="submit"
                    value="Create"
                    onClick={handleClose}
                  ></input>
                </Link>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default BranchForestButton;

class BranchForest extends Component {
  state = {};
  render() {
    return <BranchForestButton />;
  }
}
