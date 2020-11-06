/* Importing React & Router */
import React, { Component } from "react";
import { withRouter } from "react-router-dom";

/* Importing All Bootstrap Components */
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

/* Importing All Resources & Custom CSS */
import "./search.css";
import MainNavBar from "../MainNavBar/mainNavBar";
import NowPlaying from "../NowPlaying/nowPlaying";
import SongList from "../SongList/songList";

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ""
    }
    this.songListElement = React.createRef();
  }

  getSearchResults() {
    fetch("http://localhost:9000/search?query=" + this.props.match.params.query)
      .then(res => res.json())
      .then(res => {
        console.log("song list:");
        console.log(res);
        this.songListElement.current.updateState(res.songs);
      })
      .catch(err => err);
  }

  componentDidMount() {
    this.getSearchResults();
  }

  render() {
    return (
      <React.Fragment>
        <MainNavBar/>
        <Row>
          <Col xl="8" lg="8" md="8" sm="12" xs="12">
            <Row>
              <Col id="search-text-div">
                <h1 id="searching-for-text">Search Results For: </h1>
                <h4 id="search-input"><b>{this.state.query}</b></h4>
              </Col>
            </Row>
            <Row>
              <Col id="song-list-div">
                <div id="song-container">
                  <SongList ref={this.songListElement}/>
                </div>
              </Col>
            </Row>
          </Col>
          <Col xl="4" lg="4" md="4" sm="12" xs="12">
            <Row>
              <Col id="filter-by-div">
                <h3 id="filter-by-header">Filter By:</h3>
                <Button id="search-action-1" className="filter-by-button"> By Keyword </Button>
                <br/>
                <Button id="search-action-2" className="filter-by-button"> By Most Popular </Button>
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

export default withRouter(SearchPage);
