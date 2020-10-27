/* Importing React & Router */
import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";

/* Importing All Bootstrap Components */
import Table from "react-bootstrap/Table";

/* Importing All Resources & Custom CSS */
import "./songList.css";

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
              <td>PLAY</td>
              <td>{song.song_name}</td>
              <td>{song.artist_name}</td>
              <td>TREE</td>
              <td>FLOWER</td>
            </tr>
          ))
        }
        {
          this.state.songs.map(song => (
            <tr>
              <td>PLAY</td>
              <td>{song.song_name}</td>
              <td>{song.artist_name}</td>
              <td>TREE</td>
              <td>FLOWER</td>
            </tr>
          ))
        }
        {
          this.state.songs.map(song => (
            <tr>
              <td>PLAY</td>
              <td>{song.song_name}</td>
              <td>{song.artist_name}</td>
              <td>TREE</td>
              <td>FLOWER</td>
            </tr>
          ))
        }
        {
          this.state.songs.map(song => (
            <tr>
              <td>PLAY</td>
              <td>{song.song_name}</td>
              <td>{song.artist_name}</td>
              <td>TREE</td>
              <td>FLOWER</td>
            </tr>
          ))
        }
        {
          this.state.songs.map(song => (
            <tr>
              <td>PLAY</td>
              <td>{song.song_name}</td>
              <td>{song.artist_name}</td>
              <td>TREE</td>
              <td>FLOWER</td>
            </tr>
          ))
        }
        {
          this.state.songs.map(song => (
            <tr>
              <td>PLAY</td>
              <td>{song.song_name}</td>
              <td>{song.artist_name}</td>
              <td>TREE</td>
              <td>FLOWER</td>
            </tr>
          ))
        }{
          this.state.songs.map(song => (
            <tr>
              <td>PLAY</td>
              <td>{song.song_name}</td>
              <td>{song.artist_name}</td>
              <td>TREE</td>
              <td>FLOWER</td>
            </tr>
          ))
        }
        {
          this.state.songs.map(song => (
            <tr>
              <td>PLAY</td>
              <td>{song.song_name}</td>
              <td>{song.artist_name}</td>
              <td>TREE</td>
              <td>FLOWER</td>
            </tr>
          ))
        }
        {
          this.state.songs.map(song => (
            <tr>
              <td>PLAY</td>
              <td>{song.song_name}</td>
              <td>{song.artist_name}</td>
              <td>TREE</td>
              <td>FLOWER</td>
            </tr>
          ))
        }
        {
          this.state.songs.map(song => (
            <tr>
              <td>PLAY</td>
              <td>{song.song_name}</td>
              <td>{song.artist_name}</td>
              <td>TREE</td>
              <td>FLOWER</td>
            </tr>
          ))
        }
        {
          this.state.songs.map(song => (
            <tr>
              <td>PLAY</td>
              <td>{song.song_name}</td>
              <td>{song.artist_name}</td>
              <td>TREE</td>
              <td>FLOWER</td>
            </tr>
          ))
        }
        {
          this.state.songs.map(song => (
            <tr>
              <td>PLAY</td>
              <td>{song.song_name}</td>
              <td>{song.artist_name}</td>
              <td>TREE</td>
              <td>FLOWER</td>
            </tr>
          ))
        }
        {
          this.state.songs.map(song => (
            <tr>
              <td>PLAY</td>
              <td>{song.song_name}</td>
              <td>{song.artist_name}</td>
              <td>TREE</td>
              <td>FLOWER</td>
            </tr>
          ))
        }
        </tbody>
      </Table>
    );
  }
}

export default SongList;
