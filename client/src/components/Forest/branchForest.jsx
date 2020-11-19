/* Importing React & Router */
import React, { Component, useState } from "react";
import { withRouter } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";

/* Importing All Bootstrap Components */
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

/* Importing All Resources & Custom CSS */
import "./branchForest.css";

class BranchForest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: props.auth.user.id,
      branch_name_input: "",
      show: false,
      forestid: -1,
    };
    this.handleCreateBranch = this.handleCreateBranch.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  showModal = (e) => {
    this.setState({
      show: !this.state.show,
    });
  };
  onClose = (e) => {
    this.props.onClose && this.props.onClose(e);
  };

  handleNameChange(event) {
    this.setState({ branch_name_input: event.target.value });
  }

  handleCreateBranch(event) {
    event.preventDefault();

    // AJAX
    const url = "http://localhost:9000/user/forests/branchForest";

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
        branch_forest_name: this.state.branch_name_input,
        parent_forest_id: this.props.forest_id,
        user_id: this.state.user_id,
      }),
    };
    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        if(res.forest == null) {
          alert("Please complete the form and try again!");
        } else {
          this.props.history.push("/forests/" + res.forest._id);
          window.location.reload(false);
        }
      })
  }

  updateState(state) {
    this.setState({
      forestid: state,
    });
  }

  render() {
    return (
      <div>
        <Button
          className="button forest-action-button"
          id="branch-forest-button"
          onClick={(e) => {
            this.showModal();
          }}
        >
          Branch from Forest
        </Button>

        <Modal show={this.state.show} onHide={this.showModal}>
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
                    onChange={this.handleNameChange}
                  />
                  <input
                    id="branch-forest-create-link"
                    type="submit"
                    value="Create"
                    onClick={this.handleCreateBranch}
                  ></input>
                </Form>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

BranchForest.propTypes = {
  auth: PropTypes.object.isRequired,
  forest_id: PropTypes.string.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(withRouter(BranchForest));
