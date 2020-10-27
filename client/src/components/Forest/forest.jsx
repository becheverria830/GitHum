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
import "./forest.css";
import MainNavBar from "../MainNavBar/mainNavBar";
import NowPlaying from "../NowPlaying/nowPlaying";
import ForestInfo from "./forestInfo";
import SongList from "../SongList/songList";

class ForestPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forest: {
        id: 1,
        name: "",
        icon: "",
        active: 1,
        songs: [],
        settings: {
          privacy: 1,
        },
      },
    };
  }

  getForestData() {
    fetch("http://localhost:9000/user/forests/1")
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          forest: res,
        });
      })
      .catch((err) => err);
  }

  componentDidMount() {
    this.getForestData();
  }

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
                  id="forest-title-container"
                >
                  <Col lg="3" md="3" sm="3" className="">
                    <img id="forest-pic" src={this.state.forest.icon}></img>
                  </Col>
                  <Col lg="3" md="3" sm="3">
                    <h1 id="forest-forest-title">Forest Title</h1>
                  </Col>
                  <Col lg="6" md="6" sm="6"></Col>
                </Container>
              </Row>
              <Row>
                <Container
                  className="container-fluid"
                  id="forest-button-toggle-container"
                >
                  <Button className="forest-toggle-buttons">Songs</Button>
                  <Button className="forest-toggle-buttons">Info</Button>
                </Container>
              </Row>
            </Col>
            <Col lg="4" md="4" sm="4">
              <Container
                className="container container-fluid"
                id="forest-action-container"
              >
                <Col lg="1" md="1" sm="1"></Col>
                <Col lg="10" md="10" sm="10">
                  <Row>
                    <Button
                      id="forest-action-1"
                      className="forest-action-buttons"
                    >
                      Forest Settings
                    </Button>
                  </Row>
                  <br></br>
                  <Row>
                    <Button
                      id="forest-action-2"
                      className="forest-action-buttons"
                    >
                      Share Forest
                    </Button>
                  </Row>
                  <br></br>
                  <Row>
                    <Button
                      id="forest-action-3"
                      className="forest-action-buttons"
                    >
                      Branch from Forest
                    </Button>
                  </Row>
                  <br></br>
                  <Row>
                    <Button
                      type="Danger"
                      id="forest-action-4"
                      className="forest-action-buttons"
                    >
                      Deforest
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
                // <ForestInfo />
                <SongList />
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
                id="forest-now-playing-container"
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

export default ForestPage;
