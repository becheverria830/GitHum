/* Importing React & Router */
import React, { Component } from "react";
import { Link, Route, Switch, withRouter, useState } from "react-router-dom";
// import ReactDOM from "react-dom";

/* Importing All Bootstrap Components */
import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

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
    
    this.forestElement = React.createRef();
    
    
    this.state = {
      songs: [],
    };

    this.addFavorite = this.addFavorite.bind(this);
    this.getForests = this.getForests.bind(this);
  }

  updateState(state) {
    this.setState({
      songs: state,
    });
  }

  songListPlayTrack(song) {
    this.np.playTrack(song.spotify_uri);
  }

  getForests(userid) {
    fetch("http://localhost:9000/user/forests/forests/" + userid)
      .then((res) => res.json())
      .then((res) => {
        this.forestElement.current.updateState(res.forests);
      })
      .catch((err) => err);
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
        userid: this.props.user.id,
        songid: song._id,
      }),
    };
    console.log(this.props.user.id);
    console.log(song._id);
    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => err);
  }

  addToForest(song) {
    const url = "http://localhost:9000/user/forests/addToForest";
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
        song_id: song._id,
        forest_id: "",
      }),
    };
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
        userid: this.props.user.id,
        songid: song._id,
      }),
    };
    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {})
      .catch((err) => err);
  }
  /*
  componentDidMount() {
    this.getForests(this.props.auth.user.id);
  }
  */
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
                  <input
                    type="image"
                    className=""
                    src={Queue}
                    onClick={() => this.queueSong(song)}
                  ></input>
                </td>
                <td>
                  {/* <input type="image" className="" src={Tree}></input> */}
                  <Dropdown>
                    <Dropdown.Toggle type="image" src={Tree}>
                      <Image src={Tree}></Image>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">Forest 1</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">
                        Forest 2
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-3">
                        Forest 3
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
                <td>
                  <input
                    type="image"
                    className=""
                    src={Flower}
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
  user: PropTypes.object.isRequired,
};

/*
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
)(withRouter(SongList));
*/

export default SongList;
