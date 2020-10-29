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
import "./forestSettings.css";

function ForestSettingsExample() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button className="button forest-settings-button" onClick={handleShow}>
        Forest Settings
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header
          closeButton
          id="forest-settings-modal-header"
          className="text-center"
        >
          <Modal.Title id="forest-settings-modal-title">
            Forest Settings
          </Modal.Title>
        </Modal.Header>
        <Modal.Body id="forest-settings-modal-body">
          <Row>
            <Col lg="12" md="12" sm="12" xs="12"></Col>
          </Row>
          <Row>
            <Container className="forest-settings-container">
              <Row>
                <Table className="forest-settings-table">
                  <tbody>
                    <tr className="forest-settings-item">
                      <td>Forest Name: </td>
                      <td>Meme Songs</td>
                      <td>
                        <Button className="forest-settings-change-button">
                          {" "}
                          Change{" "}
                        </Button>
                      </td>
                    </tr>
                    <tr className="forest-settings-item">
                      <td>Visibility: </td>
                      <td>Public</td>
                      <td>
                        <Button> Change </Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Row>
              <Row>
                <Button id="forest-settings-save-button">Save Changes</Button>
              </Row>
            </Container>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ForestSettingsExample;

class ForestSettings extends Component {
  state = {};
  render() {
    return <ForestSettingsExample />;
  }
}
