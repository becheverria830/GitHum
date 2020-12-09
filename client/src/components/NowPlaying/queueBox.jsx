/* Importing React & Router */
import React, { Component, useState } from "react";
import { withRouter } from "react-router-dom";

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
import QueueIcon from "../../assets/queue.svg";
import "./queueBox.css";

import PropTypes from "prop-types";
import { connect } from "react-redux";

class QueueBox extends Component {
  state = {
    show: false,
  };
  showModal = (e) => {
    this.setState({
      show: !this.state.show,
    });
  };
  onClose = (e) => {
    this.props.onClose && this.props.onClose(e);
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  getQueue(){
      
  }

  render() {
    return (
      <div>
        <input
            type="image"
            className="now-playing-icon actions-div"
            id= "queue-button-np button"
            src={QueueIcon}
            onClick={(e) => {
                this.showModal();
              }}
         ></input>

        <Modal show={this.state.show} onHide={this.showModal}>
          <Modal.Header
            closeButton
            id="queue-box-modal-header"
            className="text-center"
          >
            <Modal.Title id="queue-box-modal-title">Your Queue</Modal.Title>
          </Modal.Header>
          <Modal.Body id="queue-box-modal-body">
            <Row>
              <Col>
                <Container className="queue-box-search-container">
                  <Row>
                    <Col
                      lg="12"
                      md="12"
                      sm="12"
                      xs="12"
                      className="center-button"
                    >
                      <Button
                        id="queue-box-request-button"
                      >
                        {" "}
                        Send Request{" "}
                      </Button>
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

QueueBox.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(withRouter(QueueBox));
