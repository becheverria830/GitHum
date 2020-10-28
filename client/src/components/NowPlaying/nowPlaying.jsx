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
    return(
      <React.Fragment>
        <div className="component">
          <Row>
            <Col className="now-playing-header-div">
              <h3 className="now-playing-header"><b>Now Playing</b></h3>
            </Col>
          </Row>
          <Row className="now-playing-container">
            <Col md="12" className="playlist-name-div">
              <h3 className="playlist-name-header"><span><Image className="playlist-icon" src={ForestDefaultIcon}/></span> Disney Bops </h3>
            </Col>
            <Col md="12" className="song-container">
              <img className="song-album-art-icon"
                src={ this.state.queue.songs.length != 0
                   && this.state.queue.index != -1
                   && this.state.queue.songs[this.state.queue.index].album_art }></img>
              <h3 className="song-name-header">
                    { this.state.queue.songs.length != 0
                   && this.state.queue.index != -1
                   && this.state.queue.songs[this.state.queue.index].song_name }</h3>
              <h3 className="artist-name-header">
                    { this.state.queue.songs.length != 0
                   && this.state.queue.index != -1
                   && this.state.queue.songs[this.state.queue.index].artist_name }</h3>
            </Col>
            <Col md="12" className="actions-div">
              <Image
                className="now-playing-icon"
                src={ShuffleIcon}/>
              <Image
                className="now-playing-icon"
                src={FastRewindIcon}/>
              <Image
                className="now-playing-icon"
                src={PlayCircleIcon}/>
              <Image
                className="now-playing-icon"
                src={FastForwardIcon}/>
              <Image
                className="now-playing-icon"
                src={LoopIcon}/>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default NowPlaying;
