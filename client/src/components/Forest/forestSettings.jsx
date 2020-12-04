/* Importing React & Router */
import React, { Component, useState } from "react";
import { Link, Route, Switch, withRouter} from "react-router-dom";

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
import { connect } from "react-redux";


/* Importing All Resources & Custom CSS */
import "./forestSettings.css";

class ForestSettings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      setShow: false,
      privacy: ""
    };

    this.ForestSettingsExample = this.ForestSettingsExample.bind(this);
    this.updatePrivacy = this.updatePrivacy.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
  }

  updatePrivacy(event) {
    this.setState({ privacy: event.target.value});
  }

  handleClose() {
    this.state.show = false;
  }

  handleShow() {
    this.state.show = true;
  }

  ForestSettingsExample(event) {
    /*
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    */

    return (
      <div>
        <Button className="button forest-action-button" onClick={this.handleShow}>
          Forest Settings
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
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
                        <td>
                          <Form.Control inline as="select" onSelect={this.updatePrivacy} defaultValue="Public" className="visibility-dropdown">
                            <option className="visibility-dropdown" >Public</option>
                            <option className="visibility-dropdown">Unlisted</option>
                            <option className="visibility-dropdown">Private</option>
                          </Form.Control>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Row>
                <Row>
                  <Col lg="12" md="12" sm="12" xs="12">
                    <Button
                      id="forest-settings-save-button"
                      onClick={this.handleClose}
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

  render() {
    return <this.ForestSettingsExample />;
  }
}

ForestSettings.propTypes = {
  auth: PropTypes.object.isRequired,
  forest_id: PropTypes.string.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
)(withRouter(ForestSettings));

