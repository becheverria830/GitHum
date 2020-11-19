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

import Tree from 'react-d3-tree';

class HierarchyButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hierarchy: {},
      show: false
    };
  }

  showModal = (e) => {
    this.setState({
      show: !this.state.show,
    });
  };
  onClose = (e) => {
    this.props.onClose && this.props.onClose(e);
  };

  updateState(state) {
    this.setState({
      hierarchy: state
    });
  }

  render() {
    return (
      <div>
        <Button variant="primary" onClick={(e) => { this.showModal(); }} id="hierarchy-button">
          SEE<br/>HIERARCHY
        </Button>

        <Modal show={this.state.show} onHide={this.showModal} id="hierarchy-modal">
          <Modal.Header closeButton id="hierarchy-modal-header" className="text-center" >
            <Modal.Title id="hierarchy-modal-title">Hierarchy</Modal.Title>
          </Modal.Header>
          <Modal.Body id="hierarchy-modal-body">
            <Row>
              <Col lg="12" md="12" sm="12" xs="12">
                <p id="hierarchy-forest-title">Meme Songs</p>
              </Col>
            </Row>
            <div id="treeWrapper" style={{width: '100%', height: '100%'}}>
              <Tree data={this.state.hierarchy} />
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default HierarchyButton;
