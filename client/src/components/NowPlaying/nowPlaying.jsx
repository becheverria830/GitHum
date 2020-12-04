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

// For playTrack(songId)
var play = ({
  spotify_uri,
  playerInstance: {
    _options: { getOAuthToken, id },
  },
}) => {
  getOAuthToken((access_token) => {
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
      method: "PUT",
      body: JSON.stringify({ uris: [spotify_uri] }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
  });
};
// // // // // // // // // // // // // // // // // // // // // // // // // // // // //

class NowPlaying extends Component {
  constructor(props) {
    super(props);
    /* Get your access token here: https://developer.spotify.com/documentation/web-playback-sdk/quick-start/# */
    this.state = {
      token:
        "BQC61-PMa4FdaHkrOyTvrczzEvxTvHCAcYTn26TgsN4NlgaLeshMEuyhq8Sz0b1hZeYMXT52d9FSrrUlkXJfkozM3ITfkVQT9YdcOE9GrXwOKa_7IjBRZV0j7l2Qi0mINlb1KSVRdgTmZdMfMQXA4BQvCGZ5odN7L_kV0vydo40Vf_tI6phhzA0",
      queue: {
        song_list: [],
        index: -1,
        current_forest_id: null,
      },
      deviceId: "",
      playing: false,
      position: 0,
      duration: 1,
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
  }

  playSong(spotifyId) {
    play({
      playerInstance: this.player,
      spotify_uri: spotifyId,
    });
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
        this.setState({
          queue: res.queue,
        });
        this.playSong(res.queue.song_list[res.queue.index].spotify_uri);
      });
  }

  onPlayClick() {
    this.player.togglePlay();
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
        this.setState({
          queue: res.queue,
        });
        this.playSong(res.queue.song_list[res.queue.index].spotify_uri);
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
        this.setState({
          queue: res.queue,
        });
        this.playSong(res.queue.song_list[res.queue.index].spotify_uri);
      });
  }

  getCurrentQueue() {
    const url = "http://localhost:9000/user/queue/" + this.props.auth.user.id;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          queue: res.queue,
        });
      });
  }

  transferPlayback() {
    const { deviceId, token } = this.state;

    fetch("https://api.spotify.com/v1/me/player", {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        device_ids: [deviceId],
        play: false,
      }),
    });
  }

  checkForPlayer() {
    const { token } = this.state;

    // If the Spotify SDK has loaded
    if (window.Spotify !== undefined) {
      // Cancel the periodic checking and make a new player
      clearInterval(this.playerCheckInterval);
      this.player = new window.Spotify.Player({
        name: "GitHum",
        getOAuthToken: (cb) => {
          cb(token);
        },
      });

      //Adding event handlers
      this.player.on("initialization_error", (e) => {
        //If there was a problem setting up the player
        console.error(e);
      });

      this.player.on("authentication_error", (e) => {
        //If there was a problem authenticating the user(Token was invalid / expired)
        console.error(e);
      });

      this.player.on("account_error", (e) => {
        //??
        console.error(e);
      });

      this.player.on("playback_error", (e) => {
        //If playing a track failed for some reason
        console.error(e);
      });

      this.player.on("player_state_changed", (state) => {
        //If there are any changes to the player state
        // console.log(state);
        // if (
        //     this.state
        //     && state.track_window.previous_tracks.find(x => x.id === state.track_window.current_track.id)
        //     && !this.state.paused
        //     && state.paused
        //     ) {
        //     this.onNextClick();
        //   }
        // this.state = state;
      });

      this.player.on("ready", async (data) => {
        //Making the player
        let { device_id } = data;
        await this.setState({ deviceId: device_id });

        this.transferPlayback();
      });

      //Connecting!
      this.player.connect();
    }
  }

  componentDidMount() {
    if (this.player == null) {
      this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 1000);
    }
    this.getCurrentQueue();
  }

  /*
  // Prevents overlapping music but makes it choppy when going to different pages
  componentWillUnmount() {
    this.player.disconnect();
  }
  */

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
