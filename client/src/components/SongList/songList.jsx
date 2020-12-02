/* Importing React & Router */
import React, { Component } from "react";

/* Importing All Bootstrap Components */
import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/Image";
import Dropdown from "react-bootstrap/Dropdown";

/* Importing All Resources & Custom CSS */
import "./songList.css";
import Tree from "../../assets/tree.svg";
import Play from "../../assets/play.svg";
import Queue from "../../assets/queue.svg";
import Flower from "../../assets/flower.svg";
import NowPlaying from "../NowPlaying/nowPlaying";

import PropTypes from "prop-types";

class SongList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [],
      myForests: [],
      selectedForest: "",
    };

    this.addFavorite = this.addFavorite.bind(this);
    this.getForests = this.getForests.bind(this);
    this.addToForest = this.addToForest.bind(this);
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
        this.setState({ myForests: res.forests });
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
    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => err);
  }

  addToForest(song, forest) {
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
        forest_id: forest._id,
      }),
    };
    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {})
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

  componentDidMount() {
    this.getForests(this.props.user.id);
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
                  <input
                    type="image"
                    className=""
                    src={Queue}
                    onClick={() => this.queueSong(song)}
                  ></input>
                </td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle type="image" src={Tree}>
                      <Image src={Tree}></Image>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {this.state.myForests.map((forest) => {
                        return (
                          <Dropdown.Item
                            onClick={() => {
                              this.addToForest(song, forest);
                            }}
                          >
                            {forest.name}
                          </Dropdown.Item>
                        );
                      })}
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

export default SongList;
