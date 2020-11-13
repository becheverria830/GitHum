/* Importing React & Router */
import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
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

class SongList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [],
    };
  }

  updateState(state) {
    console.log(state);
    this.setState({
      songs: state,
    });
  }

  songListPlayTrack(song) {
    this.np.playTrack(song.id);
  }

  addFavorite(event) {
    event.preventDefault();
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
        songlink: song._id,
        userid: this.props.auth.user.id
      }),
    };
    fetch(url, options)
      .then((res) => res.json())
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
                <td>{song.artist_id}</td>
                <td>
                  <input type="image" className="" src={Queue}></input>
                </td>
                <td>
                  <input type="image" className="" src={Tree}></input>
                </td>
                <td>
                  <input type="image" className="" src={Flower}
                    onClick={this.addFavorite}
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

export default SongList;
