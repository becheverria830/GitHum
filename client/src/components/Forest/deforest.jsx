/* Importing React & Router */
import React, { Component, useState } from "react";
import { Link, Route, Switch, withRouter } from "react-router-dom";

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
import "./deforest.css";

class Deforest extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      forestid: -1
    };

    this.deforestButton = this.deforestButton.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  onConfirm(event) {
    event.preventDefault();

    console.log(this.props.match.params.forestid);

    const url = "http://localhost:9000/user/forests/deforest";
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
        forest_id: this.props.match.params.forestid,
        //userid: this.props.auth.user.id
      }),
    };
    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        this.props.history.push("/forests/:userid" + this.props.auth.user.id);
      })
      .catch((err) => err);
  };

  deforestButton() {
    
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
                  <Link to="/feed" class="btn forest-action-button deforest-link-button" onClick={this.onConfirm} role="button">Deforest</Link>
                </Container>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      </div>
    );
  };

  render() {
    return <this.deforestButton />;
  }
}

Deforest.propTypes = {
  auth: PropTypes.object.isRequired,
  forest_id: PropTypes.string.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
)(withRouter(Deforest));

