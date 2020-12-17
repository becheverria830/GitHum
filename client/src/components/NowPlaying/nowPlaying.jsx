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
import ShuffleIcon from "../../assets/shuffle.svg";
import QueueBox from "./queueBox.jsx";

import PropTypes from "prop-types";
import { connect } from "react-redux";

class NowPlaying extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
      forest: {
        _id: "5fae5aeb48d08f64ae32db6c",
        name: "My Current Forest!",
      },
      song: null,
    }

    this.onPrevClick = this.onPrevClick.bind(this);
    this.onToggleClick = this.onToggleClick.bind(this);
    this.onNextClick = this.onNextClick.bind(this);
    this.onShuffleClick = this.onShuffleClick.bind(this);
  }

  setSongState(state) {
    console.log("state for song:");
    console.log(state);
    this.setState({
      song: state.song
    });
  }

  setPlayingState(state) {
    this.setState({
      isPlaying: state.isPlaying
    });
  }

  onPrevClick() {
    const url = "http://104.131.160.216:9000/user/queue/rewind";
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
        console.log(res.queue);
        window.SpotifyPlayerVar.player.setQueue(res.queue);
        window.SpotifyPlayerVar.player.playCurrentSong();
      });
  }

  onToggleClick() {
    window.SpotifyPlayerVar.player.togglePlay();
  }

  onNextClick() {
    const url = "http://104.131.160.216:9000/user/queue/skip";
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
        window.SpotifyPlayerVar.player.setQueue(res.queue);
        window.SpotifyPlayerVar.player.playCurrentSong();
      });
  }

  onShuffleClick() {
    const url = "http://104.131.160.216:9000/user/queue/shuffle";
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
        window.SpotifyPlayerVar.player.setQueue(res.queue);
        window.SpotifyPlayerVar.player.playCurrentSong();
      });
  }

  componentDidMount() {
    window.SpotifyPlayerVar.player.setNowPlaying(this);
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
              <img className="song-album-art-icon"
                   src={
                     this.state.song != null &&
                     this.state.song.album_art
                   }>
              </img>
              <h3 className="song-name-header">
                {
                  this.state.song != null &&
                  this.state.song.name
                }
              </h3>
              <h3 className="artist-name-header">
                {
                  this.state.song != null &&
                  this.state.song.artist_name
                }
              </h3>
            </Col>
            <Col md="12" className="actions-div">
              <Row>
                <Col>
                  <input
                  type="image"
                  className="now-playing-icon"
                  src={ShuffleIcon}
                  onClick={() => this.onShuffleClick()}
                ></input>
                </Col>
                <Col>
                  <input
                  type="image"
                  className="now-playing-icon"
                  src={FastRewindIcon}
                  onClick={() => this.onPrevClick()}
                ></input>
                </Col>
                <Col>
                  <input
                  type="image"
                  className="now-playing-icon"
                  src={this.state.isPlaying ? PauseCircleIcon : PlayCircleIcon}
                  onClick={() => this.onToggleClick()}
                ></input>
                </Col>
                <Col>
                  <input
                  type="image"
                  className="now-playing-icon"
                  src={FastForwardIcon}
                  onClick={() => this.onNextClick()}
                ></input>
                </Col>
                <Col>
                  <QueueBox className="now-playing-icon"></QueueBox>
                </Col>
              </Row>
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
