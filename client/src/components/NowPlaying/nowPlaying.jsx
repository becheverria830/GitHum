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
import ForestDefaultIcon from "../../assets/forest.svg";
import FastForwardIcon from "../../assets/fast_forward.svg";
import FastRewindIcon from "../../assets/fast_rewind.svg";
import PlayCircleIcon from "../../assets/play_circle.svg";
import LoopIcon from "../../assets/loop.svg";
import ShuffleIcon from "../../assets/shuffle.svg";

class NowPlaying extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queue: {
        songs: [],
        index: -1,
      },
    };
  }

  getQueueData() {
    fetch("http://localhost:9000/user/queue")
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          queue: res,
        });
        console.log(this.state);
      })
      .catch((err) => err);
  }

  componentDidMount() {
    this.getQueueData();
  }

  render() {
    return (
      <React.Fragment>
        <div id="now-playing-master-div">
          <Container className="now-playing">
            <Container id="now-playing-forest-title-container">
              <Row className="now-playing-forest-title">
                <Col lg="4" md="4" sm="4" xs="4">
                  <Image
                    id="now-playing-forest-default-icon"
                    src={ForestDefaultIcon}
                  />
                </Col>
                <Col lg="8" md="8" sm="8" xs="8">
                  <h2 id="now-playing-forest-title"> Disney Bops </h2>
                </Col>
              </Row>
            </Container>
            <Row>
              <Col>
                <Image
                  id="now-playing-album-art"
                  src={
                    this.state.queue.songs.length != 0 &&
                    this.state.queue.index != -1 &&
                    this.state.queue.songs[this.state.queue.index].album_art
                  }
                />
              </Col>
            </Row>
            <Row className="now-playing-song">
              <Col>
                <h4 id="now-playing-song-title">Let it Go</h4>
              </Col>
            </Row>
            <Row>
              <Col>
                <h5 id="now-playing-song-artist">Indina Menzel </h5>
              </Col>
            </Row>
            <Row className="">
              <Col lg="4" md="4" sm="4" xs="4">
                <Image
                  className="now-playing-top-music-icons"
                  src={FastRewindIcon}
                  id="fast-rewind-button"
                />
              </Col>
              <Col lg="4" md="4" sm="4" xs="4">
                <Image
                  className="now-playing-top-music-icons"
                  src={PlayCircleIcon}
                  id="play-circle-button"
                />
              </Col>
              <Col lg="4" md="4" sm="4" xs="4">
                <Image
                  className="now-playing-top-music-icons"
                  src={FastForwardIcon}
                  id="fast-forward-button"
                />
              </Col>
            </Row>
            <Row>
              <Col lg="1" md="1" sm="1" xs="1">
                <Image
                  className="now-playing-bottom-music-icons"
                  src={ShuffleIcon}
                  id="shuffle-button"
                />
              </Col>
              <Col lg="10" md="10" sm="10" xs="10"></Col>
              <Col lg="1" md="1" sm="1" xs="1">
                <Image
                  className="now-playing-bottom-music-icons"
                  src={LoopIcon}
                  id="loop-button"
                />
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default NowPlaying;
