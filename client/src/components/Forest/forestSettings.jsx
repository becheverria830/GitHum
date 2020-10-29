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
      <Button className="button forest-action-button" onClick={handleShow}>
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
                      <td>
                        <Form inline>
                          <FormControl
                            type="text"
                            placeholder="My First Forest"
                            className="ml-sm-2"
                            id="forest-settings-name-bar"
                          />
                        </Form>
                      </td>
                    </tr>
                    <tr className="forest-settings-item">
                      <td>Visibility: </td>
                      <div class="dropdown">
                        <button
                          class="btn dropdown-toggle visibility-button"
                          type="button"
                          data-toggle="dropdown"
                        >
                          Public
                          <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu">
                          <li>
                            <a href="#">Public</a>
                          </li>
                          <li>
                            <a href="#">Unlisted</a>
                          </li>
                          <li>
                            <a href="#">Private</a>
                          </li>
                        </ul>
                      </div>
                    </tr>
                  </tbody>
                </Table>
              </Row>
              <Row>
                <Col lg="12" md="12" sm="12" xs="12">
                  <Button
                    id="forest-settings-save-button"
                    onClick={handleClose}
                  >
                    Save Changes
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

export default ForestSettingsExample;

class ForestSettings extends Component {
  state = {};
  render() {
    return <ForestSettingsExample />;
  }
}
