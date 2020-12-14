/* Importing React & Router */
import React, { Component } from "react";
import { Link, Route, Switch, withRouter } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";

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
import MutualFriendBox from "../FriendBox/mutualFriendBox";
import ValleyForestDisplay from "./valleyForestDisplay";
import SongList from "../SongList/songList";
import StartForest from "./startForest";

import ForestDefaultIcon from "../../assets/forest.svg";
import ForestList from "../ForestList/forestList";

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
      myValley: false,
      showSongs: false,
      showForests: true,
      showSavedForests: false,
      userid: "",
      user_information: {
        username: "",
        firstname: "",
      },
      toggle: 0,
    };
  }

  displaySongs() {
    this.setState({
      showSongs: true,
      showForests: false,
      showSavedForests: false,
      toggle: 0,
    });
  }

  displayForests() {
    this.setState({
      showSongs: false,
      showForests: true,
      showSavedForests: false,
      toggle: 1,
    });
  }

  displaySavedForests() {
    this.setState({
      showSongs: false,
      showForests: false,
      showSavedForests: true,
      toggle: 2,
    });
  }

  getSavedForests(userid) {
    console.log(userid);
    fetch("http://localhost:9000/user/forests/saved/" + userid)
      .then((res) => res.json())
      .then((res) => {
        this.savedForestElement.current.updateState(res.forests);
      })
      .catch((err) => err);
  }

  getFavoriteSongs(userid) {
    fetch("http://localhost:9000/user/favorites/songs/" + userid)
      .then((res) => res.json())
      .then((res) => {
        console.log("test");
        console.log(res);
        this.songListElement.current.updateState(res.songs);
      })
      .catch((err) => err);
  }

  getForests(userid) {
    fetch("http://localhost:9000/user/forests/forests/" + userid)
      .then((res) => res.json())
      .then((res) => {
        this.forestElement.current.updateState(res.forests);
      })
      .catch((err) => err);

    
  }

  getValleyInformation(userid) {
    console.log(this.props.auth.user.id);
    fetch("http://localhost:9000/user/credentials/" + userid)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          user_information: res.user,
        });

        if (userid === this.props.auth.user.id) {
          this.setState({
            userid: userid,
            myValley: true,
            showSongs: true,
            showForests: false,
            showSavedForests: false,
          });
        }
      })
      .catch((err) => err);
  }

  componentDidMount() {
    this.getFavoriteSongs(this.props.match.params.userid);
    this.getForests(this.props.match.params.userid);
    this.getValleyInformation(this.props.match.params.userid);
    this.getSavedForests(this.props.match.params.userid);
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps == undefined) {
      return false;
    }
    if(JSON.stringify(prevProps.match.params) == JSON.stringify(this.props.match.params)) {
      return false;
    }
    window.location.reload();
  }

  render() {
    return (
      <React.Fragment>
        <MainNavBar />
        <Row>
          <Col xl="8" lg="8" md="8" sm="12" xs="12">
            <Row>
              <Container
                className="container-fluid"
                id="valley-title-container"
              >
                <Col lg="1">
                  <Image id="valley-githum-logo" src={Logo}></Image>
                </Col>
                <Col lg="3" md="3" sm="3" xs="3">
                  <p id="valley-username">
                    @{this.state.user_information.username}
                  </p>
                  <br></br>
                  <h1 id="valley-title">
                    {this.state.user_information.first_name}'s Valley
                  </h1>
                </Col>
                <Col lg="6" md="6" sm="6" xs="6"></Col>
              </Container>
            </Row>
            <Row className="valley-toggle-button-container-div">
              {this.state.myValley && (
                <Col md="4" className= "valley-toggle-button-container">
                  <Button
                    onClick={this.displaySongs}
                    className={this.state.toggle === 0 ? "valley-toggle-button-toggled" :"valley-toggle-button"}
                  >
                    {" "}
                    Favorites{" "}
                    <span>
                      <Image className="icon" src={Flower}></Image>
                    </span>
                  </Button>
                </Col>
              )}
              <Col md="4" className="valley-toggle-button-container">
                <Button
                  onClick={this.displayForests}
                  className={this.state.toggle === 1 ? "valley-toggle-button-toggled" :"valley-toggle-button"}
                >
                  {" "}
                  Created Forests{" "}
                  <span>
                    <Image className="icon" src={Forest}></Image>
                  </span>
                </Button>
              </Col>
              <Col md="4" className="valley-toggle-button-container">
                <Button
                  onClick={this.displaySavedForests}
                  className={this.state.toggle === 2 ? "valley-toggle-button-toggled" :"valley-toggle-button"}
                >
                  {" "}
                  Saved Forests{" "}
                  <span>
                    <Image className="icon" src={Forest}></Image>
                  </span>
                </Button>
              </Col>
              {!this.state.myValley && <Col md="4" />}
            </Row>
            <Row>
              <Col id="valley-content-div">
                <div id="valley-content-container">
                  <div className={this.state.showSongs ? null : "hidden"}>
                    <SongList
                      ref={this.songListElement}
                      user={this.props.auth.user}
                    />
                  </div>
                  <div className={this.state.showForests ? null : "hidden"}>
                    <ValleyForestDisplay ref={this.forestElement} />
                  </div>
                  <div
                    className={this.state.showSavedForests ? null : "hidden"}
                  >
                    <ValleyForestDisplay ref={this.savedForestElement} />
                  </div>
                </div>
                <div className={this.state.showForests && this.state.myValley ? null : "invisible"}>
                  <Row>
                    <Col md="12" className="start-forest-button">
                      <StartForest />
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Col>
          <Col xl="4" lg="4" md="4" sm="12" xs="12">
            <Row>
              <Col>
                {this.state.myValley ? (
                  <FriendBox ref={this.friendListElement} />
                ) : (
                  <MutualFriendBox
                    ref={this.friendListElement}
                    userOther={this.props.match.params.userid}
                  />
                )}
              </Col>
            </Row>
            <Row>
              <Col>
                <NowPlaying />
              </Col>
            </Row>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

ValleyPage.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(withRouter(ValleyPage));
