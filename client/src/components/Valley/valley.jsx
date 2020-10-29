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
import SongList from "../SongList/songList";

import ForestDefaultIcon from "../../assets/forest.svg";
import ForestList from "../ForestList/forestList"

import Forest from "../../assets/forest.svg";
import Flower from "../../assets/flower.svg";


class ValleyPage extends Component {

  constructor(props) {
    super(props);
    this.songListElement = React.createRef();
    this.forestElement = React.createRef();
    this.savedForestElement = React.createRef();

    this.displaySongs = this.displaySongs.bind(this);
    this.displayForests = this.displayForests.bind(this);
    this.displaySavedForests = this.displaySavedForests.bind(this);

    this.state = {
      showSongs: true,
      showForests: false,
      showSavedForests: false
    };
  }

  displaySongs() {
    this.setState({
      showSongs: true,
      showForests: false,
      showSavedForests: false
    });
  }

  displayForests() {
    this.setState({
      showSongs: false,
      showForests: true,
      showSavedForests: false
    });
  }

  displaySavedForests() {
    this.setState({
      showSongs: false,
      showForests: false,
      showSavedForests: true
    });
  }

  getFavoriteSongs() {
    fetch("http://localhost:9000/user/favorites/songs")
      .then((res) => res.json())
      .then((res) => {
        this.songListElement.current.updateState(res.songs);
        this.setState({
          forest: res,
        });
      })
      .catch((err) => err);
  }

  componentDidMount() {
    this.getFavoriteSongs();
  }

  render() {
    return (
      <React.Fragment>
        <MainNavBar/>
        <Row>
          <Col xl="8" lg="8" md="8" sm="12" xs="12">
            <Row>
              <Container className="container-fluid" id="valley-title-container">
                <Col lg="1" >
                  <Image id="valley-githum-logo" src={Logo}></Image>
                </Col>
                <Col lg="3" md="3" sm="3" xs="3">
                  <p id="valley-username">@becheverria830</p>
                  <br></br>
                  <h1 id="valley-title">Britney's Valley</h1>
                </Col>
                <Col lg="6" md="6" sm="6" xs="6"></Col>
              </Container>
            </Row>
            <Row className="valley-toggle-button-container-div">
              <Col md="4" className="valley-toggle-button-container">
                <Button onClick={this.displaySongs} className="valley-toggle-button"> Favorites <span><Image className="icon" src={Flower}></Image></span></Button>
              </Col>
              <Col md="4" className="valley-toggle-button-container">
                <Button onClick={this.displayForests} className="valley-toggle-button"> My Forests <span><Image className="icon" src={Forest}></Image></span></Button>
              </Col>
              <Col md="4" className="valley-toggle-button-container">
                <Button onClick={this.displaySavedForests} className="valley-toggle-button"> Saved Forests <span><Image className="icon" src={Forest}></Image></span></Button>
              </Col>
            </Row>
            <Row>
              <Col id="valley-content-div">
                <div id="valley-content-container">
                  <div className={this.state.showSongs ? null : "hidden"}>
                    <SongList ref={this.songListElement}/>
                  </div>
                  <div className={this.state.showForests ? null : "hidden"}>
                    <ValleyForestDisplay/>
                  </div>
                  <div className={this.state.showSavedForests ? null : "hidden"}>
                    <ValleyForestDisplay/>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
          <Col xl="4" lg="4" md="4" sm="12" xs="12">
            <Row>
              <Col>
                { this.props.myValley ? <FriendBox ref={this.friendListElement}/> : <FriendBox ref={this.friendListElement}/>}
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

export default ValleyPage;
