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
      queue_list: [],
    };

    this.getQueue = this.getQueue.bind(this);
  }

  getQueue() {
    fetch("http://localhost:9000/user/queue/" + this.props.auth.user.id)
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        // console.log(res.song_list);
        // console.log(res.queue);
        // console.log(res.queue.song_list)
        // console.log(res.queue[0]);
        this.setState({ queue_list: res.queue.song_list });
      })
      .catch((err) => err);
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
                this.getQueue();
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
                  <Col>
                    <p id="buffer-space">BUFFER</p>
                  </Col>
                </Row>
                <Row className="queue-box-items">
                  <Col>
                  <Table className="queue-box-results">
                      <tbody>
                        {this.state.queue_list.map(
                          (song) => (
                            <tr className="queue-box-item">
                              <td>
                                {song.name}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </Table>
                  </Col> 
                </Row>
                <Row>
                  <Col lg="12" md="12" sm="12" xs="12" className="center-button">
                    <Button
                      id="queue-box-clear-button"
                    >
                      CLEAR
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
