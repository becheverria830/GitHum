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
import "./valley.css";
import Logo from "../../assets/githum-tree.svg";
import MainNavBar from "../MainNavBar/mainNavBar";
import NowPlaying from "../NowPlaying/nowPlaying";
import FriendBox from "../FriendBox/friendBox";
import ValleyForestDisplay from "./valleyForestDisplay";

class ValleyPage extends Component {
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
                  id="valley-title-container"
                >
                  <Col>
                    <Image id="valley-githum-logo" src={Logo}></Image>
                  </Col>
                  <Col lg="3" md="3" sm="3" xs="3">
                    {this.props.myValley && <p id="valley-username">@becheverria830</p>}
                    <br></br>
                    <h1 id="valley-title">Britney's Valley</h1>
                  </Col>
                  <Col lg="6" md="6" sm="6" xs="6"></Col>
                </Container>
              </Row>
              <Row>
                <Container
                  className="container-fluid"
                  id="forest-button-toggle-container"
                >
                  <Button className="valley-toggle-buttons">Favorites</Button>
                  <Button className="valley-toggle-buttons">My Forests</Button>
                  <Button className="valley-toggle-buttons">
                    Saved Forests
                  </Button>
                </Container>
              </Row>
            </Col>
            <Col lg="4" md="4" sm="4" xs="4">
              <FriendBox></FriendBox>
            </Col>
          </Row>
          <Row>
            <Col lg="8" md="8" sm="8" xs="8">
              <Container
                className="container-fluid"
                id="forest-song-display-container"
              >
                <div class="song-container">
                  {/* <ValleyForestDisplay></ValleyForestDisplay> */}
                  {/* <Table id="songTable">
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
                  </Table> */}
                </div>
              </Container>
            </Col>
            <Col lg="4" md="4" sm="4" xs="4">
              <Container
                className="container"
                id="valley-now-playing-container"
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

export default ValleyPage;
