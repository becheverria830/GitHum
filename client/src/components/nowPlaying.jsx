/* Importing React & Router */
import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";

/* Importing All Bootstrap Components */
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

/* Importing All Resources & Custom CSS */
import "./nowPlaying.css";
import ForestDefaultIcon from "../assets/forest.svg";
import FastForwardIcon from "../assets/fast_forward.svg";
import FastRewindIcon from "../assets/fast_rewind.svg";
import PlayCircleIcon from "../assets/play_circle.svg";
import LoopIcon from "../assets/loop.svg";
import ShuffleIcon from "../assets/shuffle.svg";

class NowPlaying extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div id="now-playing-master-div">
          <Container className="now-playing">
            <Container id="now-playing-forest-title-container">
              <Row className="now-playing-forest-title">
                <Col lg="4">
                  <Image
                    id="now-playing-forest-default-icon"
                    src={ForestDefaultIcon}
                  />
                </Col>
                <Col lg="8">
                  <h2 id="now-playing-forest-title"> Disney Bops </h2>
                </Col>
              </Row>
            </Container>
            <Row>
              <Image
                id="now-playing-album-art"
                src="https://picsum.photos/200/300"
              />
            </Row>
            <Row className="now-playing-song">
              <h4 id="now-playing-song-title">Let it Go</h4>
            </Row>
            <Row>
              <h5 id="now-playing-song-artist">Indina Menzel </h5>
            </Row>
            <Row className="">
              <Col>
                <Image
                  className="now-playing-music-icons"
                  src={FastRewindIcon}
                />
              </Col>
              <Col>
                <Image
                  className="now-playing-music-icons"
                  src={PlayCircleIcon}
                />
              </Col>
              <Col>
                <Image
                  className="now-playing-music-icons"
                  src={FastForwardIcon}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Image className="now-playing-music-icons" src={ShuffleIcon} />
              </Col>
              <Col>
                <Image className="now-playing-music-icons" src={LoopIcon} />
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default NowPlaying;
