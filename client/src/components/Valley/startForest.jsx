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

function StartForestButton() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button id="start-forest-button" onClick={handleShow}>
        Start a Forest
      </Button>

      <Modal show={show} onHide={handleClose}>
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
                />
                <Link to="/forest/1">
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

export default StartForestButton;

class StartForest extends Component {
  state = {};
  render() {
    return <StartForestButton />;
  }
}
