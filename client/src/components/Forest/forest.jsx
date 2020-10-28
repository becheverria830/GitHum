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
    this.songListElement = React.createRef();

    this.displaySongs = this.displaySongs.bind(this);
    this.displayInfo = this.displayInfo.bind(this);

    this.state = {
      showSongList: true,
      showForestInfo: false,
      forest: {
        id: -1,
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

  displaySongs() {
    this.setState({
      showSongList: true,
      showForestInfo: false
    });
    console.log(this.songListElement)
  }

  displayInfo() {
    this.setState({
      showSongList: false,
      showForestInfo: true
    });
  }

  getForestData() {
    fetch("http://localhost:9000/user/forests/1")
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
    this.getForestData();
  }

  render() {
    return (
      <React.Fragment>
        <MainNavBar/>
        <Row>
          <Col xl="8" lg="8" md="8" sm="12" xs="12">
            <Row>
              <Col className="forest-title-div">
                <h1 className="forest-title-text"><span><Image className="forest-icon" src={this.state.forest.icon}></Image></span>{this.state.forest.name}</h1>
              </Col>
            </Row>
            <Row>
              <Col className="forest-info-song-actions">
                <Button onClick={this.displaySongs} className="button forest-info-song-buttons">Songs</Button>
                <Button onClick={this.displayInfo} className="button forest-info-song-buttons">Info</Button>
              </Col>
            </Row>
            <Row>
              <Col id="song-list-div">
                <div id="song-container">
                  <div className={this.state.showSongList ? null : "hidden"}>
                    <SongList ref={this.songListElement}/>
                  </div>
                  <div className={this.state.showForestInfo ? null : "hidden"}>
                    <ForestInfo/>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
          <Col xl="4" lg="4" md="4" sm="12" xs="12">
            <Row className="forest-options-div">
              <Col md="12">
                <Button className="button forest-settings-button"> Share Forest </Button>
              </Col>
              <Col md="12">
                {
                  this.props.myForest
                  ? <Button className="button forest-settings-button"> Forest Settings </Button>
                  : <Button className="button forest-settings-button"> Branch From Forest </Button>
                }
              </Col>
              <Col md="12">
                {
                  this.props.myForest
                  ? <Button className="button forest-settings-button"> Deforest </Button>
                  : <Button className="button forest-settings-button"> Save Forest </Button>
                }
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

export default ForestPage;
