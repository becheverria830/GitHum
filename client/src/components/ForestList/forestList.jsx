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
      forests: [],
      forest_feed_info : []
    };
    this.getFeedInfo = this.getFeedInfo.bind(this);
  }

  updateState(state) {
    this.getFeedInfo(state);
    this.setState({
      forests: state,
    });
  }

  getFeedInfo(forests){
    var forest_feed_info = [];
    forests.forEach(f => {

      // Get 0 - 3 Songs
      var f_songs = [];
      if(f.songs.length === 0 ){ var f_songs = [];}
      else if(f.songs.length === 1){var f_songs = f.songs.splice(0,1);}
      else if(f.songs.length === 2){var f_songs = f.songs.splice(0,2);}
      else if(f.songs.length === 3){var f_songs = f.songs.splice(0,3);}
        // if more than 3 songs, try to get 3 unique IDs
      else {
        var arr = f.songs;
        var unique_arr = arr.filter(function(value, index, self) {
          return self.indexOf(value) === index;
        });
        console.log(unique_arr);
        if(unique_arr.length === 1){var f_songs = unique_arr.splice(0,1);}
        else if(unique_arr.length === 2){var f_songs = unique_arr.splice(0,2);}
        else{
          var f_songs = unique_arr.splice(0,3);
        }
      }

      // Fetch Song Objects
      const url = "http://104.141.160.216:9000/songs/manySongs";
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
          songids: f_songs
        }),
      };
      fetch(url, options)
        .then((res) => res.json())
        .then((res) => {
          var songs = res;

          // Get the rest of the information
          var f_id = f._id;
          var f_creator = f.creator;
          var f_privacy = f.settings.privacy;
          var f_name = f.name;

          // Push to State
          var f_all_info = [f_id, f_name, f_creator, f_privacy, songs];
          forest_feed_info.push(f_all_info);
          this.setState({forest_feed_info : forest_feed_info});
        });
    });

  }

  render() {
    return (
      <div>
        {
          this.state.forest_feed_info/*.filter(forest_feed_info => forest_feed_info.f_privacy == 0)*/.map(f_info => (
            <div className={f_info[3] === 1 || f_info[4].length === 0 ? "hidden" : "forest-container"}>
              <Row>
                <Col>
                  <h3 className="forest-container-header">{f_info[2][0].first_name} {f_info[2][0].last_name} is listening to <i><b>{f_info[1]}</b></i></h3>
                </Col>
              </Row>
              <Row>
                { f_info[4].length >= 1 &&
                  <Col md="4" sm="12" className="song-container">
                  <img className="song-album-art-icon" src={f_info[4][0].album_art}></img>
                  <h3 className="song-name-header">{f_info[4][0].name}</h3>
                  <h3 className="artist-name-header">{f_info[4][0].artist_name}</h3>
                </Col>
                }
                { f_info[4].length >= 2 &&
                  <Col md="4" sm="12" className="song-container">
                  <img className="song-album-art-icon" src={f_info[4][1].album_art}></img>
                  <h3 className="song-name-header">{f_info[4][1].name}</h3>
                  <h3 className="artist-name-header">{f_info[4][1].artist_name}</h3>
                  </Col>
                }
                { f_info[4].length >= 3 &&
                  <Col md="4" sm="12" className="song-container">
                  <img className="song-album-art-icon" src={f_info[4][2].album_art}></img>
                  <h3 className="song-name-header">{f_info[4][2].name}</h3>
                  <h3 className="artist-name-header">{f_info[4][2].artist_name}</h3>
                </Col>
                }
              </Row>
              <Row>
                <Col>
                  <Link to={"/forests/" + f_info[0]}><Button className="explore-forest-button">Explore This Forest</Button></Link>
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
