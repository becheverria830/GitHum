/* Importing React & Router */
import React, { Component } from "react";
import { withRouter } from "react-router-dom";

/* Importing All Bootstrap Components */
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

import PropTypes from "prop-types";
import { connect } from "react-redux";

/* Importing All Resources & Custom CSS */
import "./forest.css";
import MainNavBar from "../MainNavBar/mainNavBar";
import NowPlaying from "../NowPlaying/nowPlaying";
import ForestInfo from "./forestInfo";
import SongList from "../SongList/songList";
import Deforest from "./deforest";
import BranchForest from "./branchForest";
import ForestSettings from "./forestSettings";
import ShareForest from "./shareForest";

class ForestPage extends Component {
  constructor(props) {
    super(props);
    this.songListElement = React.createRef();
    this.forestInfoElement = React.createRef();

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
    this.saveForest = this.saveForest.bind(this);
  }

  displaySongs() {
    this.setState({
      showSongList: true,
      showForestInfo: false,
    });
  }

  displayInfo() {
    this.setState({
      showSongList: false,
      showForestInfo: true,
    });
  }

  getForestData() {
    fetch("http://localhost:9000/user/forests/" + this.props.match.params.forestid)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          forest: res.forests,
        });
        this.songListElement.current.updateState(res.forests.songs);
        this.forestInfoElement.current.updateForestInfo(res.forests);
      })
      .catch((err) => err);
  }

  getHierarchyData() {
    fetch("http://localhost:9000/user/forests/" + this.props.match.params.forestid + "/hierarchy")
      .then((res) => res.json())
      .then((res) => {
        console.log("HIERARCHY");
        console.log(res.hierarchy);
        this.forestInfoElement.current.updateHierarchy(res.hierarchy);
      })
      .catch((err) => err);
  }

  saveForest(event) {
    console.log(this.state);
    const url = "http://localhost:9000/user/forests/save";
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
        forestid: this.state.forest._id,
        fcreator: "",
        userid: this.props.auth.user.id,
      }),
    };
    fetch(url, options)
      .then((res) => [res.status, res.json()])
      .then((response) => {
        console.log(response);
        if (response[0] == 200) {
        } else {
          alert(response[1].message);
        }
      });
    alert("Forest Saved!");
  }

  componentDidMount() {
    console.log("inside componentDidMount of ForestPage in forest.jsx");
    this.getForestData();
    this.getHierarchyData();
  }

  render() {
    return (
      <React.Fragment>
        <MainNavBar />
        <Row>
          <Col xl="8" lg="8" md="8" sm="12" xs="12">
            <Row>
              <Col
                xl="2"
                lg="2"
                md="2"
                sm="2"
                xs="2"
                className="forest-title-div"
              >
                <Image
                  className="forest-icon"
                  src={this.state.forest.icon}
                ></Image>
              </Col>
              <Col
                xl="6"
                lg="6"
                md="6"
                sm="6"
                xs="6"
                className="forest-title-play-col"
              >
                <Row>
                  <Col>
                    <h2>{this.state.forest.name} </h2>
                  </Col>
                </Row>
                <Row>
                  <Col xl="6" lg="6" md="6" sm="6" xs="6">
                    <Button className="forest-play-button"> PLAY </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col className="forest-info-song-actions">
                <Button
                  onClick={this.displaySongs}
                  className="button forest-info-song-buttons"
                >
                  Songs
                </Button>
                <Button
                  onClick={this.displayInfo}
                  className="button forest-info-song-buttons"
                >
                  Info
                </Button>
              </Col>
            </Row>
            <Row>
              <Col id="song-list-div">
                <div id="song-container">
                  <div className={this.state.showSongList ? null : "hidden"}>
                    <SongList
                      ref={this.songListElement}
                      user={this.props.auth.user}
                    />
                  </div>
                  <div className={this.state.showForestInfo ? null : "hidden"}>
                    <ForestInfo ref={this.forestInfoElement} />
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
          <Col xl="4" lg="4" md="4" sm="12" xs="12">
            <Row>
              <Col className="forest-options-div">
                <Row>
                  <Col md="12">
                    <ShareForest forest_id={this.state.forest._id} />
                  </Col>
                  <Col md="12">
                    <BranchForest forest_id={this.state.forest._id} />
                  </Col>
                  <Col md="12">
                    <div className={this.props.myForest ? null : "hidden"}>
                      <ForestSettings />
                    </div>
                  </Col>
                  <Col md="12">
                    {this.props.myForest ? (
                      <Deforest />
                    ) : (
                      <Button
                        className="button forest-action-button"
                        onClick={this.saveForest}
                      >
                        Save Forest
                      </Button>
                    )}
                  </Col>
                </Row>
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

ForestPage.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(withRouter(ForestPage));
