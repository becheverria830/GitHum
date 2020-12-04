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
      pri: 0,
      name: "",
      forest: {
        id: -1,
        name: "",
        icon: "",
        active: 1,
        depth: 1,
        songs: [],
        times_saved: 0,
        children: [],
        parent: -1,
        settings: {
          privacy: 0,
        },
        children: []
      },
    };

    this.ForestSettingsExample = this.ForestSettingsExample.bind(this);
    this.updateForestSettings = this.updateForestSettings.bind(this);
    this.makeChange = this.makeChange.bind(this);
  }

  updatePrivacy = (event) => {
    this.setState({ pri: event.target.value });
  };

  updateName = (event) => {
    this.setState({ name: event.target.value });
  };

  updateForestSettings(state) {
    this.setState({
      pri: state.settings.privacy,
      name: state.name,
      forest: state,
    });
    console.log(state);
    console.log(state);
  }

  showModal = (e) => {
    this.setState({
      show: !this.state.show,
    });
  }
  
  makeChange(event) {
    console.log("in makeChange");
    const url = "http://localhost:9000/user/forests/update_information";
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
        forest_id: this.state.forest._id,
        name: this.state.name,
        privacy: this.state.pri
      }),
    };
    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => err);
      console.log("after make change");
  }



  ForestSettingsExample(event) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    
  }

  render() {
    return (
      <div>
        <Button className="button forest-action-button"
        onClick={(e) => {
            this.showModal();
            console.log("aaaaaaa");
            console.log(this.state);
          }}>
          Forest Settings
        </Button>

        <Modal show={this.state.show} onHide={this.showModal}>
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
                              value={this.state.name}
                              onChange={this.updateName}
                            />
                          </Form>
                        </td>
                      </tr>
                      <tr className="forest-settings-item">
                        <td>Visibility: </td>
                        <td>
                          <select onChange={this.updatePrivacy} value={this.state.pri} className="visibility-dropdown">
                            <option className="visibility-dropdown" value="0">Public</option>
                            <option className="visibility-dropdown" value="1">Private</option>
                          </select>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Row>
                <Row>
                  <Col lg="12" md="12" sm="12" xs="12">
                    <Button
                      id="forest-settings-save-button"
                      onClick={(e) => {
                        this.makeChange();
                        this.showModal();
                      }}
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
}


export default ForestSettings;

