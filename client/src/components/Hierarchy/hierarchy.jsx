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
import "./hierarchy.css";
import HierarchySample from "../../assets/hierarchy-pic.png";

function HierarchyExample() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Launch Hierarchy Modal
      </Button>

      <Modal show={show} onHide={handleClose} id="hierarchy-modal">
        <Modal.Header
          closeButton
          id="hierarchy-modal-header"
          className="text-center"
        >
          <Modal.Title id="hierarchy-modal-title">Hierarchy</Modal.Title>
        </Modal.Header>
        <Modal.Body id="hierarchy-modal-body">
          <Row>
            <Col lg="12" md="12" sm="12" xs="12">
              <p id="hierarchy-forest-title">Meme Songs</p>
            </Col>
          </Row>
          <Row>
            <Container className="hierarchy-container">
              <Row>
                <Col lg="12" md="12" sm="12" xs="12">
                  <Image id="hierarchy-view" src={HierarchySample}></Image>
                </Col>
              </Row>
            </Container>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default HierarchyExample;

class Hierarchy extends Component {
  state = {};
  render() {
    return <HierarchyExample />;
  }
}
