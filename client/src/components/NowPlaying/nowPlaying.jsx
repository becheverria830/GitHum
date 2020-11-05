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
      token: "INSERT YOUR TOKEN HERE :)",
      queue: {
        songs: [],
        index: -1,
      },
      deviceId: "",
      trackName: "Track Name",
      artistName: "Artist Name",
      albumName: "Album Name",
      playing: false,
      position: 0,
      duration: 1,
    };
  }

  // when we receive a new update from the player
  onStateChanged(state) {
    console.log("state changed");
    // // only update if we got a real state
    // if (state !== null) {
    //   const {
    //     current_track: currentTrack,
    //     position,
    //     duration,
    //   } = state.track_window;
    //   const trackName = currentTrack.name;
    //   const albumName = currentTrack.album.name;
    //   const artistName = currentTrack.artists
    //     .map(artist => artist.name)
    //     .join(", ");
    //   const playing = !state.paused;
    //   this.setState({
    //     position,
    //     duration,
    //     trackName,
    //     albumName,
    //     artistName,
    //     playing
    //   });
    // } else {
    //   // state was null, user might have swapped to another device
    //   this.setState({ error: "Looks like you might have swapped to another device?" });
    // }
  }

  checkForPlayer() {
    const { token } = this.state;
    // if the Spotify SDK has loaded
    if (window.Spotify !== undefined) {
      // cancel the interval
      clearInterval(this.playerCheckInterval);
      // create a new player
      this.player = new window.Spotify.Player({
        name: "GitHum",
        getOAuthToken: (cb) => {
          cb(token);
        },
      });
      // problem setting up the player
      this.player.on("initialization_error", (e) => {
        console.error(e);
      });
      // problem authenticating the user.
      // either the token was invalid in the first place,
      // or it expired (it lasts one hour)
      this.player.on("authentication_error", (e) => {
        console.error(e);
      });
      // currently only premium accounts can use the API
      this.player.on("account_error", (e) => {
        console.error(e);
      });
      // loading/playing the track failed for some reason
      this.player.on("playback_error", (e) => {
        console.error(e);
      });

      // Playback status updates
      this.player.on("player_state_changed", (state) =>
        this.onStateChanged(state)
      );

      // Ready
      this.player.on("ready", async (data) => {
        let { device_id } = data;
        console.log("Let the music play on!");
        // set the deviceId variable, then let's try
        // to swap music playback to *our* player!
        await this.setState({ deviceId: device_id });
        this.transferPlaybackHere();
      });

      // finally, connect!
      this.player.connect();
    }
  }

  onPrevClick() {
    console.log("prev");
    this.player.previousTrack();
  }

  onPlayClick() {
    console.log("play");
    this.player.togglePlay();
  }

  onNextClick() {
    console.log("next`");
    this.player.nextTrack();
  }

  transferPlaybackHere() {
    const { deviceId, token } = this.state;
    // https://beta.developer.spotify.com/documentation/web-api/reference/player/transfer-a-users-playback/
    fetch("https://api.spotify.com/v1/me/player", {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        device_ids: [deviceId],
        // true: start playing music if it was paused on the other device
        // false: paused if paused on other device, start playing music otherwise
        play: true,
      }),
    });
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
    this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 1000);
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
            <Col md="12" className="playlist-name-div">
              <h3 className="playlist-name-header">
                <span>
                  <Image className="playlist-icon" src={ForestDefaultIcon} />
                </span>{" "}
                Disney Bops{" "}
              </h3>
            </Col>
            <Col md="12" className="song-container">
              <img
                className="song-album-art-icon"
                src={
                  this.state.queue.songs.length != 0 &&
                  this.state.queue.index != -1 &&
                  this.state.queue.songs[this.state.queue.index].album_art
                }
              ></img>
              <h3 className="song-name-header">
                {this.state.queue.songs.length != 0 &&
                  this.state.queue.index != -1 &&
                  this.state.queue.songs[this.state.queue.index].song_name}
              </h3>
              <h3 className="artist-name-header">
                {this.state.queue.songs.length != 0 &&
                  this.state.queue.index != -1 &&
                  this.state.queue.songs[this.state.queue.index].artist_name}
              </h3>
            </Col>
            <Col md="12" className="actions-div">
              <input
                type="image"
                className="now-playing-icon"
                src={ShuffleIcon}
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
                src={PlayCircleIcon}
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

export default NowPlaying;
