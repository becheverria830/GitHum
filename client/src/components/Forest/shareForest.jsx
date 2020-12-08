/* Importing React & Router */
import React, { Component } from "react";
import { withRouter } from "react-router-dom";

/* Importing All Bootstrap Components */
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

import {
  FacebookShareButton,
  RedditShareButton,
  TwitterShareButton,
} from "react-share";
import { FacebookIcon, RedditIcon, TwitterIcon } from "react-share";

import PropTypes from "prop-types";
import { connect } from "react-redux";

/* Importing All Resources & Custom CSS */
import "./shareForest.css";

class ShareForest extends Component {
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
      copySuccess: "",
      url: "",
    };
  }

  copyToClipboard = (e) => {
    this.textArea.select();
    document.execCommand("copy");
    e.target.focus();
    this.setState({ copySuccess: "Copied!" });
  };

  setUrl() {
    var url = "http://localhost:3000/forests/" + this.props.forest_id;
    console.log(this.props.forest_id);
    this.setState({ url: url });
  }

  render() {
    return (
      <div>
        <Button
          className="button forest-action-button"
          onClick={(e) => {
            this.showModal();
            this.setUrl();
          }}
        >
          Share Forest
        </Button>

        <Modal show={this.state.show} onHide={this.showModal}>
          <Modal.Header
            closeButton
            id="share-forest-modal-header"
            className="text-center"
          >
            <Modal.Title id="share-forest-modal-title">
              Share Forest
            </Modal.Title>
          </Modal.Header>
          <Modal.Body id="share-forest-modal-body">
            <Row>
              <Col>
                <Container className="share-forest-container">
                  <Row>
                    <Col>
                      <div>
                        <h2 id="share-forest-blurb">
                          Share this Forest with your friends!
                        </h2>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form inline>
                        <FormControl
                          type="textarea"
                          value={this.state.url}
                          id="url-text"
                          ref={(textarea) => (this.textArea = textarea)}
                        />
                        <Button
                          onClick={this.copyToClipboard}
                          variant="dark"
                          className="share-forest-copy-button"
                        >
                          Copy
                        </Button>
                      </Form>
                    </Col>
                  </Row>
                  <Row className="social-media-row">
                    {/* <Col
                      lg="4"
                      md="4"
                      sm="4"
                      xs="4"
                      className="social-media-button"
                    >
                      <FacebookShareButton
                        url="https://www.youtube.com/"
                        quote={
                          "Listening to this playlist on GitHum! Check it out!"
                        }
                        hashtag="#githum"
                      >
                        <FacebookIcon size={65} />
                      </FacebookShareButton>
                    </Col> */}
                    <Col
                      lg="6"
                      md="6"
                      sm="6"
                      xs="6"
                      className="social-media-button"
                    >
                      <RedditShareButton
                        url={this.state.url}
                        title="Listening to this playlist on GitHum! Check it out!"
                      >
                        <RedditIcon size={65} />
                      </RedditShareButton>
                    </Col>
                    <Col
                      lg="6"
                      md="6"
                      sm="6"
                      xs="6"
                      className="social-media-button"
                    >
                      <TwitterShareButton
                        url={this.state.url}
                        title="Listening to this playlist on GitHum! Check it out!"
                        via=""
                      >
                        <TwitterIcon size={65} />
                      </TwitterShareButton>
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

ShareForest.propTypes = {
  auth: PropTypes.object.isRequired,
  forest_id: PropTypes.string.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(withRouter(ShareForest));
