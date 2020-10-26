/* Importing React & Router */
import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";

/* Importing All Bootstrap Components */
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

/* Importing All Resources & Custom CSS */
import "./search.css";
import MainNavBar from "../MainNavBar/mainNavBar";
import NowPlaying from "../NowPlaying/nowPlaying";

class SearchPage extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <MainNavBar></MainNavBar>
        <div>
          {/* <Container> */}
          <Row>
            <Col lg="8" md="8" sm="8">
              <Row>
                <Container
                  className="container-fluid"
                  id="search-title-container"
                >
                  <Col lg="3" md="3" sm="3">
                    <h1 id="searching-for-text">Searching for: </h1>
                    <h4 id="search-input">Just Can't Wait to be King</h4>
                  </Col>
                  <Col lg="6" md="6" sm="6"></Col>
                </Container>
              </Row>
            </Col>
            <Col lg="4" md="4" sm="4">
              <Container
                className="container container-fluid"
                id="search-action-container"
              >
                <Col lg="1" md="1" sm="1"></Col>
                <Col lg="10" md="10" sm="10">
                  <Row>
                    <h3>Filter By:</h3>
                  </Row>
                  <Row>
                    <Button
                      id="search-action-1"
                      className="search-action-buttons"
                    >
                      By Keyword
                    </Button>
                  </Row>
                  <br></br>
                  <Row>
                    <Button
                      id="search-action-2"
                      className="search-action-buttons"
                    >
                      By Most Popular
                    </Button>
                  </Row>
                  <br></br>
                </Col>
                <Col lg="1" md="1" sm="1"></Col>
              </Container>
            </Col>
          </Row>
          <Row>
            <Col lg="8" md="8" sm="8">
              <Container
                className="container-fluid"
                id="forest-song-display-container"
              >
                {/* <div class="song-container">
                  <Table id="songTable">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Song Name</th>
                        <th>Last Name</th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    {this.state.forest.songs.map((song) => (
                      <tbody>
                        <tr>
                          <td></td>
                          <td>{song.song_name}</td>
                          <td>{song.artist_name}</td>
                          <td></td>
                          <td></td>
                        </tr>
                      </tbody>
                    ))}
                  </Table>
                </div> */}
              </Container>
            </Col>
            <Col lg="4" md="4" sm="4">
              <Container
                className="container"
                id="search-now-playing-container"
              >
                <NowPlaying></NowPlaying>
              </Container>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default SearchPage;
