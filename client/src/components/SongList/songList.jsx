/* Importing React & Router */
import React, { Component } from "react";
import { Link, Route, Switch, withRouter} from "react-router-dom";
// import ReactDOM from "react-dom";

/* Importing All Bootstrap Components */
import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

/* Importing All Resources & Custom CSS */
import "./songList.css";
import Tree from "../../assets/tree.svg";
import Play from "../../assets/play.svg";
import Queue from "../../assets/queue.svg";
import Flower from "../../assets/flower.svg";
import NowPlaying from "../NowPlaying/nowPlaying";

import PropTypes from "prop-types";
import { connect } from "react-redux";

class SongList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [],
    };

    this.addFavorite = this.addFavorite.bind(this);

  }

  updateState(state) {
    this.setState({
      songs: state,
    });
  }

  songListPlayTrack(song) {
    this.np.playTrack(song.spotify_uri);
  }

  addFavorite(song) {
    const url = "http://localhost:9000/user/favorites/songs/add";
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
        songid: song._id,
      }),
    };
    console.log(this.props.auth.user.id);
    console.log(song._id);
    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => err);
  }

  queueSong(song) {
    const url = "http://localhost:9000/user/queue/add_song";
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
        songid: song._id,
      }),
    };
    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
      })
      .catch((err) => err);
  }

  render() {
    return (
      <React.Fragment>
        <div className="invisible">
          <NowPlaying ref={(np) => (this.np = np)} />
        </div>

        <Table id="songTable">
          <tbody>
            {this.state.songs.map((song) => (
              <tr>
                <td>
                  <input
                    type="image"
                    className=""
                    src={Play}
                    onClick={() => this.songListPlayTrack(song)}
                  ></input>
                </td>
                <td>{song.name}</td>
                <td>{song.artist_name}</td>
                <td>
                  <input type="image" className="" src={Queue}
                    onClick={() => this.queueSong(song)}
                  ></input>
                </td>
                <td>
                  <input type="image" className="" src={Tree}></input>
                </td>
                <td>
                  <input type="image" className="" src={Flower}
                    onClick={() => this.addFavorite(song)}
                  ></input>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </React.Fragment>
    );
  }
}

SongList.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
)(withRouter(SongList));