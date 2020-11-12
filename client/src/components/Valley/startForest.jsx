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
import "./startForest.css";
import MainNavBar from "../MainNavBar/mainNavBar";
import NowPlaying from "../NowPlaying/nowPlaying";
import SearchIcon from "../../assets/search.svg";
import AddIcon from "../../assets/add.svg";

class StartForest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      show: false,
    };

    this.newForest = this.newForest.bind(this);
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

    const forestData = {
      name: document.getElementById("start-forest-search-bar"),
    };

    const url = "http://localhost:9000/forests/create";
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
      }),
    };
    fetch(url, options)
      .then((res) => [res.status, res.json()])
      .then((response) => {
        console.log(response);
        if (response[0] == 200) {
          window.location.href = "http://localhost:3000/valley";
        } else {
          alert(response[1].message);
        }
      });
  }

  createNewForest(event) {
    this.setState({ name: event.target.value });
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
                <Form inline onSubmit={StartForest.newForest}>
                  <FormControl
                    type="text"
                    placeholder="Give your Forest a name!"
                    className="ml-sm-2"
                    id="start-forest-search-bar"
                    onChange={StartForest.createNewForest}
                  />
                  <Link to="/forest/create">
                    <input
                      id="start-forest-create-link"
                      type="submit"
                      value="Create"
                    ></input>
                  </Link>
                </Form>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default StartForest;
