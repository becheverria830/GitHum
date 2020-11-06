/* Importing React & Router */
import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";

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

class SongList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      songs: []
    };
  }

  updateState(state) {
    this.setState({
      songs: state
    });
  }

  render() {
    return (
      <Table id="songTable">
        <tbody>
        {
          this.state.songs.map(song => (
            <tr>
              <td><Image src={Play}></Image></td>
              <td>{song.song_name}</td>
              <td>{song.artist_name}</td>
              <td><Image src={Queue}></Image></td>
              <td><Image src={Tree}></Image></td>
              <td><Image src={Flower}></Image></td>
            </tr>
          ))
        }
        </tbody>
      </Table>
    );
  }
}

export default SongList;
