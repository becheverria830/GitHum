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
import "./startForest.css";
import MainNavBar from "../MainNavBar/mainNavBar";
import NowPlaying from "../NowPlaying/nowPlaying";
import SearchIcon from "../../assets/search.svg";
import AddIcon from "../../assets/add.svg";
import x from "./blankForestIcon";
import Tree from "../../assets/tree.svg"

class StartForest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      show: false,
      icon: Tree,
      errors: 'New Forest Name must be between 1 and 30 characters long!'
    };

    this.newForest = this.newForest.bind(this);
    this.createNewForest = this.createNewForest.bind(this);
  }
  showModal = (e) => {
    this.setState({
      show: !this.state.show,
    });
  };
  onClose = (e) => {
    this.props.onClose && this.props.onClose(e);
  };

  newForest(event) {
    event.preventDefault();

    if (this.state.errors.length > 0) {
      alert(this.state.errors);
      return;
    }

    const url = "http://localhost:9000/user/forests/create";
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
        name: this.state.name,
        icon: this.state.icon,
        userid: this.props.auth.user.id
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
      .catch((err) => err);
  }

  createNewForest(event) {
    let errors = this.state.errors;

    errors = event.target.value.length < 1 || event.target.value.length > 30 ? 'New Forest Name must be between 1 and 30 characters long!' : '';
    
    this.setState({ name: event.target.value });
    this.setState({ errors : errors });
  }

  render() {
    return (
      <div>
        <Button
          id="start-forest-button"
          onClick={(e) => {
            this.showModal();
          }}
        >
          Start a Forest
        </Button>

        <Modal show={this.state.show} onHide={this.showModal}>
          <Modal.Header
            closeButton
            id="start-forest-modal-header"
            className="text-center"
          >
            <Modal.Title id="start-forest-modal-title">
              Start a Forest
            </Modal.Title>
          </Modal.Header>
          <Modal.Body id="start-forest-modal-body">
            <Row>
              <Col lg="12" md="12" sm="12" xs="12">
                <Form inline>
                  <FormControl
                    type="text"
                    placeholder="Give your Forest a name!"
                    className="ml-sm-2"
                    id="start-forest-search-bar"
                    value = {this.state.name}
                    onChange={this.createNewForest}
                  />
                    <input
                      onClick={this.newForest}
                      id="start-forest-create-link"
                      type="submit"
                      value="Create"
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


StartForest.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
)(withRouter(StartForest));
