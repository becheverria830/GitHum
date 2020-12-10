/* Importing React & Router */
import React, { Component } from "react";
import { Link, Route, Switch, withRouter } from "react-router-dom";

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
import PauseCircleIcon from "../../assets/pause_circle.svg";
import LoopIcon from "../../assets/loop.svg";
import ShuffleIcon from "../../assets/shuffle.svg";

import PropTypes from "prop-types";
import { connect } from "react-redux";

class NowPlaying extends Component {
  constructor(props) {
    super(props);
    /* Get your access token here: https://developer.spotify.com/documentation/web-playback-sdk/quick-start/# */
    this.state = {
      playing: false,
    };

    //TEMP STATIC FOREST TO ALLOW USER TO VISIT THEIR FOREST FROM NOW PLAYING
    this.current_forest_id = {
      _id: "5fae5aeb48d08f64ae32db6c",
      name: "My Current Forest!",
    };

    this.onPrevClick = this.onPrevClick.bind(this);
    this.onPlayClick = this.onPlayClick.bind(this);
    this.onNextClick = this.onNextClick.bind(this);
    this.onShuffleClick = this.onShuffleClick.bind(this);

    window.MyVars.player.setNowPlaying(this);
  }

  onPrevClick() {
    const url = "http://localhost:9000/user/queue/rewind";
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
        userid: this.props.auth.user.id,
      }),
    };
    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        window.MyVar.player.updateQueue(res.queue);
        window.MyVar.player.playCurrentSong();
      });
  }

  onPlayClick() {
    window.MyVar.player.togglePlay();
    this.setState({'playing': window.MyVar.player.isPlaying()});
  }

  onNextClick() {
    const url = "http://localhost:9000/user/queue/skip";
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
        userid: this.props.auth.user.id,
      }),
    };
    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        window.MyVar.player.updateQueue(res.queue);
        window.MyVar.player.playCurrentSong();
      });
  }

  onShuffleClick() {
    const url = "http://localhost:9000/user/queue/shuffle";
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
        userid: this.props.auth.user.id,
      }),
    };
    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        window.MyVar.player.updateQueue(res.queue);
        window.MyVar.player.playCurrentSong();
      });
  }

  render() {
    return (
      <React.Fragment>
        <div className="component">
          <Row>
            <Col className="now-playing-header-div">
              <h3 className="now-playing-header">
                <b>Now Playing</b>
              </h3>
            </Col>
          </Row>
          <Row className="now-playing-container">
            {this.current_forest_id != null && (
              <Col md="12" className="playlist-name-div">
                <Link to={"/forests/" + this.current_forest_id._id}>
                  <h3 className="playlist-name-header">
                    <span>
                      <Image
                        className="playlist-icon"
                        src={ForestDefaultIcon}
                      />
                      {this.current_forest_id.name}
                    </span>
                  </h3>
                </Link>
              </Col>
            )}
            <Col md="12" className="song-container">
              <img
                className="song-album-art-icon"
                src={
                  this.state.queue.index != -1 &&
                  this.state.queue.song_list[this.state.queue.index].album_art
                }
              ></img>
              <h3 className="song-name-header">
                {this.state.queue.index != -1 &&
                  this.state.queue.song_list[this.state.queue.index].name}
              </h3>
              <h3 className="artist-name-header">
                {this.state.queue.index != -1 &&
                  this.state.queue.song_list[this.state.queue.index]
                    .artist_name}
              </h3>
            </Col>
            <Col md="12" className="actions-div">
              <input
                type="image"
                className="now-playing-icon"
                src={ShuffleIcon}
                onClick={() => this.onShuffleClick()}
              ></input>
              <input
                type="image"
                className="now-playing-icon"
                src={FastRewindIcon}
                onClick={() => this.onPrevClick()}
              ></input>
              <input
                type="image"
                className="now-playing-icon"
                src={this.state.playing ? PauseCircleIcon : PlayCircleIcon}
                onClick={() => this.onPlayClick()}
              ></input>
              <input
                type="image"
                className="now-playing-icon"
                src={FastForwardIcon}
                onClick={() => this.onNextClick()}
              ></input>
              <input
                type="image"
                className="now-playing-icon"
                src={LoopIcon}
              ></input>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

NowPlaying.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(withRouter(NowPlaying));
