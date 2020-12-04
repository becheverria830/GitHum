/* Importing React & Router */
import React, { Component } from "react";
import { withRouter } from "react-router-dom";

/* Importing All Bootstrap Components */
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import PropTypes from "prop-types";
import { connect } from "react-redux";

/* Importing All Resources & Custom CSS */
import "./search.css";
import MainNavBar from "../MainNavBar/mainNavBar";
import NowPlaying from "../NowPlaying/nowPlaying";
import SongList from "../SongList/songList";

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'songs_popularity_sorted': [],
      'songs_date_sorted': []
    }
    this.songListElement = React.createRef();
  }

  getSearchResults() {
    if(this.props.match.params.query == undefined) {
      this.songListElement.current.updateState([]);
    } else {
      fetch("http://localhost:9000/search?query=" + this.props.match.params.query)
        .then(res => res.json())
        .then(res => {
          var songs_popularity_sorted = JSON.parse(JSON.stringify(res.songs));
          var songs_date_sorted = JSON.parse(JSON.stringify(res.songs));
          songs_popularity_sorted.sort(function(x, y) { return y.popularity - x.popularity; });
          songs_date_sorted.sort(function(x, y) { return Date.parse(y.release_date) - Date.parse(x.release_date); });
          this.setState({
            'songs_popularity_sorted': songs_popularity_sorted,
            'songs_date_sorted': songs_date_sorted
          });
          this.songListElement.current.updateState(songs_popularity_sorted);
        })
        .catch(err => err);
    }
  }

  componentDidMount() {
    this.getSearchResults();
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps == undefined) {
      return false;
    }
    if(JSON.stringify(prevProps.match.params) == JSON.stringify(this.props.match.params)) {
      return false;
    }
    this.getSearchResults();
  }

  displayPopular = e => {
    e.preventDefault();
    this.songListElement.current.updateState(this.state.songs_popularity_sorted);
  };

  displayReleaseDate = e => {
    e.preventDefault();
    this.songListElement.current.updateState(this.state.songs_date_sorted);
  };

  render() {
    return (
      <React.Fragment>
        <MainNavBar/>
        <Row>
          <Col xl="8" lg="8" md="8" sm="12" xs="12">
            <Row>
              <Col id="search-text-div">
                <h1 id="searching-for-text">Search Results For: </h1>
                <h4 id="search-input"><b>{this.props.match.params.query}</b></h4>
              </Col>
            </Row>
            <Row>
              <Col id="song-list-div">
                <div id="song-container">
                  <SongList ref={this.songListElement} user={this.props.auth.user} />
                </div>
              </Col>
            </Row>
          </Col>
          <Col xl="4" lg="4" md="4" sm="12" xs="12">
            <Row>
              <Col id="filter-by-div">
                <h3 id="filter-by-header">Filter By:</h3>
                <Button id="search-action-1" className="filter-by-button" onClick={this.displayPopular}> By Popularity </Button>
                <br/>
                <Button id="search-action-2" className="filter-by-button" onClick={this.displayReleaseDate}> By Release Date </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <NowPlaying/>
              </Col>
            </Row>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}


SearchPage.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps
)(withRouter(SearchPage));
