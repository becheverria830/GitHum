/* Importing React & Router */
import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";

/* Importing All Bootstrap Components */
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

/* Importing All Resources & Custom CSS */
import "./forestList.css";

class ForestList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      forests: []
    };
  }

  updateState(state) {
    // console.log(state);
    this.setState({
      forests: state
    });
  }

  renderSong(song) {
    return (
      <Col md="4" sm="12" className="song-container">
        <img className="song-album-art-icon" src={song.album_art}></img>
        <h3 className="song-name-header">{song.song_name}</h3>
        <h3 className="artist-name-header">{song.artist_name}</h3>
      </Col>
    )
  }

  render() {
    return (
      <div>
        {
          this.state.forests.map(forest => (
            <div className="forest-container">
              <Row>
                <Col>
                  <h3 className="forest-container-header">{forest.creator[0].first_name} {forest.creator[0].last_name} is listening to <i><b>{forest.name}</b></i></h3>
                </Col>
              </Row>
              <Row>
                { forest.songs.length >= 1 && this.renderSong(forest.songs[0]) }
                { forest.songs.length >= 2 && this.renderSong(forest.songs[1]) }
                { forest.songs.length >= 3 && this.renderSong(forest.songs[2]) }
              </Row>
              <Row>
                <Col>
                  <Link to={"/forests/" + forest._id}><Button className="explore-forest-button">Explore This Forest</Button></Link>
                </Col>
              </Row>
            </div>
          ))
        }
      </div>
    );
  }
}

export default ForestList;
