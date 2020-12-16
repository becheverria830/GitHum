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
      hasNameChanged: false,
      uploadedFile: null,
      base_icon: null,
      errors: 'Forest Name must be between 1 and 30 characters long!'
    };

    this.ForestSettingsExample = this.ForestSettingsExample.bind(this);
    this.updateForestSettings = this.updateForestSettings.bind(this);
    this.makeChange = this.makeChange.bind(this);
    this.changeForestIcon = this.changeForestIcon.bind(this);
  }

  updatePrivacy = (event) => {
    this.setState({ pri: event.target.value });
  };

  updateName = (event) => {
    this.setState({hasNameChanged : true});

    let errors = this.state.errors;

    errors = event.target.value.length < 1 || event.target.value.length > 30 ? 'Forest Name must be between 1 and 30 characters long!' : '';

    this.setState({ name: event.target.value });
    this.setState({ errors : errors });
  };

  updateFile = (event) => {
    this.setState({ uploadedFile: event.target.files[0] });
  };

  updateForestSettings(state) {
    this.setState({
      pri: state.settings.privacy,
      name: state.name,
      forest: state,
    });
  }

  showModal = (e) => {
    this.setState({
      show: !this.state.show,
    });
  }
  
  changeForestIcon(event) {
    var res;
    var base64;
    var forest_id_out = this.state.forest._id;

    const reader = new FileReader();
    if(this.state.uploadedFile instanceof File) {
      if(this.state.uploadedFile.size > 1000000) {
        let message = 'File Size must be below 1MB.';
        alert(message);
        //let errors = this.state.errors.icon;
        //this.setState({errors : message});
        return;
      }
      reader.readAsDataURL(this.state.uploadedFile);
    }

    reader.onload = function () {
      res = reader.result;//base64encoded string
      
      const url = "http://104.141.160.216:9000/user/forests/update_icon";
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
          forest_id: forest_id_out,
          base_icon: res
        }),
      };
      fetch(url, options)
        .then((res) => res.json())
        .catch((err) => err);
    };
  }

  getDataUrl(img) {
    const reader = new FileReader();
    if(img instanceof Blob) {
      const result = reader.readAsDataURL(img);
      return result;
    }
    else {
      return null;
    }

    /*
    // Create canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    // Set width and height
    canvas.width = img.width;
    canvas.height = img.height;
    // Draw the image
    ctx.drawImage(img, 0, 0);
    return canvas.toDataURL('image/jpeg');
    */
 }

  makeChange(event) {
    event.preventDefault();

    if (this.state.errors.length > 0 && this.state.hasNameChanged) {
      alert(this.state.errors);
      return;
    }

    const url = "http://104.141.160.216:9000/user/forests/update_information";
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
                              placeholder={this.state.forest.name}
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
                          <select onChange={this.updatePrivacy} value={this.state.pri} id="forest-settings-privacy-align" className="visibility-dropdown">
                            <option className="visibility-dropdown" value="0">Public</option>
                            <option className="visibility-dropdown" value="1">Private</option>
                          </select>
                        </td>
                      </tr>
                      <tr className="forest-settings-item">
                        <td>Forest Icon: </td>
                        <td>
                          <FormControl
                            type="file"
                            accept="image/png"
                            className="ml-sm-2"
                            id="forest-settings-forest-icon"
                            //value={this.state.uploadedFile}
                            onChange={this.updateFile}
                          />
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
                        this.changeForestIcon();
                        this.makeChange(e);
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

