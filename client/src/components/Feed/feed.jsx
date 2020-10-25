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
import "./feed.css";
import ForestDefaultIcon from "../../assets/forest.svg";
import MainNavBar from "../MainNavBar/mainNavBar";
import NowPlaying from "../NowPlaying/nowPlaying";

class FeedPage extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <MainNavBar></MainNavBar>
        <div>
          <Row>
            <Col lg="8" md="8" sm="8" xs="8">
              <Row>
                <Container
                  className="container-fluid"
                  id="feed-title-container"
                >
                  <Row>
                    <Col lg="3" md="3" sm="3" xs="3">
                      <h1 id="forest-forest-title">Your Friends' Forests</h1>
                    </Col>
                    <Col lg="4" md="4" sm="4" xs="4"></Col>
                    <Col lg="2" md="2" sm="2" xs="2" id="forest-icon-col">
                      <img id="forest-icon" src={ForestDefaultIcon}></img>
                    </Col>
                  </Row>
                </Container>
              </Row>
            </Col>
            <Col lg="4" md="4" sm="4" xs="4">
              <Container
                className="container container-fluid"
                id="friend-action-container"
              >
                <Row>
                  <Col lg="12" md="12" sm="12" xs="12">
                    <Table className="friend-list-table">
                      <tbody>
                        <tr className="friend-list-item">Somebody</tr>
                        <tr className="friend-list-item">Somebody2</tr>
                      </tbody>
                    </Table>
                  </Col>
                </Row>
                <Row>
                  <Col lg="6" md="6" sm="6" xs="6">
                    <Button className="friend-list-action-button">
                      Add Friend
                    </Button>
                  </Col>
                  <Col lg="6" md="6" sm="6" xs="6">
                    <Button className="friend-list-action-button">
                      Friend Requests
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
          <Row>
            <Col lg="8" md="8" sm="8" xs="8">
              <Container className="" id="feed-display-container">
                <Table id="feed-display">
                  <tbody>
                    <tr>
                      <td>
                        <Container className="feed-forest-display">
                          <tr>
                            <p className="friend-name">Jeremy Herrmann</p>
                            <p> is listening to </p>
                            <p className="friend-forest-name"> Meme Songs </p>
                          </tr>
                          <tr>
                            <td className="feed-song-display">
                              <tr>
                                <img
                                  className="feed-album-art"
                                  src="https://picsum.photos/200"
                                ></img>
                              </tr>
                              <tr>
                                <td className="feed-song-title">
                                  Mii Channel Remix
                                </td>
                              </tr>
                              <tr>
                                <td className="feed-song-artist">Nintendo</td>
                              </tr>
                            </td>
                            <td className="feed-song-display">
                              <tr>
                                <img
                                  className="feed-album-art"
                                  src="https://picsum.photos/200"
                                ></img>
                              </tr>
                              <tr>
                                <td>Carameldansen</td>
                              </tr>
                              <tr>
                                <td>Anime Chick</td>
                              </tr>
                            </td>
                            <td className="feed-song-display">
                              <tr>
                                <img
                                  className="feed-album-art"
                                  src="https://picsum.photos/200"
                                ></img>
                              </tr>
                              <tr>
                                <td>WAP</td>
                              </tr>
                              <tr>
                                <td>Cardi B</td>
                              </tr>
                            </td>
                          </tr>
                          <tr>
                            <Button className="explore-forest-button">
                              Explore This Forest
                            </Button>
                          </tr>
                        </Container>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Container className="feed-forest-display"></Container>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Container>
            </Col>
            <Col lg="4" md="4" sm="4" xs="4">
              <Container className="container" id="feed-now-playing-container">
                <NowPlaying></NowPlaying>
              </Container>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default FeedPage;
