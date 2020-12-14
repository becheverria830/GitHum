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
    this.forestSettingsElement = React.createRef();

    this.displaySongs = this.displaySongs.bind(this);
    this.displayInfo = this.displayInfo.bind(this);

    this.state = {
      showSongList: true,
      showForestInfo: false,
      myForest: false,
      forest: {
        id: -1,
        name: "",
        icon: "",
        active: 1,
        creator: [],
        times_saved: -1,
        songs: [],
        settings: {
          privacy: 1,
        },
      },
      toggle: 0,
      saved: false,
    };
    this.saveForest = this.saveForest.bind(this);
    this.unsaveForest = this.unsaveForest.bind(this);
    this.playForest = this.playForest.bind(this);
    this.changeForestIcon = this.changeForestIcon(this);
    // this.getDataUrl = this.getDataUrl(this);
    // this.getSavedForests = this.getSavedForests.bind(this);
  }

  displaySongs() {
    this.setState({
      showSongList: true,
      showForestInfo: false,
      toggle: 0
    });
  }

  displayInfo() {
    this.setState({
      showSongList: false,
      showForestInfo: true,
      toggle: 1
    });
  }

  /*Think about improvements*/
  queueSong(song) {
    const url = "http://localhost:9000/user/queue/add_song";
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
        userid: this.props.user.id,
        songid: song._id,
      }),
    };
    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        window.MyVars.player.updateQueue(res.queue);
      })
      .catch((err) => err);
  }

  getForestData() {
    fetch(
      "http://localhost:9000/user/forests/" + this.props.match.params.forestid
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          forest: res.forests,
        });
        this.songListElement.current.updateState(res.forests.songs);
        this.forestInfoElement.current.updateForestInfo(res.forests);
        this.forestSettingsElement.current.updateForestSettings(res.forests);

        // set myForest
        if (this.props.auth.user.id === res.forests.creator) {
          this.setState({ myForest: true });
        } else {
          // Check if its been saved before

          fetch("http://localhost:9000/user/forests/saved/" + this.props.auth.user.id)
            .then((res) => res.json())
            .then((res) => {
              console.log(res.forests);
              var saved_bool = false;
              for (var i = 0; i < res.forests.length; i++) {
                if (res.forests[i]._id === this.state.forest._id) {
                  saved_bool = true;
                }
              }
              this.setState({ myForest: false, saved: saved_bool});
            });

        }
      })
      .catch((err) => err);
      console.log("within get forest data?");
      console.log(this.state.forest.icon);
  }

  getHierarchyData() {
    fetch(
      "http://localhost:9000/user/forests/" +
        this.props.match.params.forestid +
        "/hierarchy"
    )
      .then((res) => res.json())
      .then((res) => {
        console.log("HIERARCHY");
        console.log(res.hierarchy);
        this.forestInfoElement.current.updateHierarchy(res.hierarchy);
      })
      .catch((err) => err);
  }

  getSavedForests(userid) {
    fetch("http://localhost:9000/user/forests/saved/" + userid)
      .then((res) => res.json())
      .then((res) => {
        console.log(res.forests);
        return res.forests;
      })
      .catch((err) => err);
  }

  changeForestIcon(event) {
    console.log("Icon Image Uploaded! ! !");
    console.log(document.getElementById("forestIconFile"));

    
  }

  getDataUrl(img) {
    // Create canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    // Set width and height
    canvas.width = img.width;
    canvas.height = img.height;
    // Draw the image
    ctx.drawImage(img, 0, 0);
    return canvas.toDataURL('image/jpeg');
 }

  playForest(event) {
    // Need: forestid, userid, and index
    // Operating as if index means starting at the very first song
    // This would indicate 0 

    event.preventDefault();
    const url = "http://localhost:9000/user/queue/play_forest";
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
        forestid: this.props.match.params.forestid,
        userid: this.props.auth.user.id,
        index: 0
      }),
    };
    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        if(res.queue == null) {
          alert("Forest failed to play!");
        } else {
          /* NOTE TO SELF: Here's where queueSong should be applied */
          /* Go through queue while there's still songs left */
          this.props.history.push("/forests/" + this.props.match.params.forestid);
        }
      })
      .catch((err) => err);
  }

  saveForest(event) {
    console.log(this.state);
    // Check if forest / user id is non-null
    if (this.state.forest._id === null || this.props.auth.user.id === null) {
      console.log("Null forest or user");
    }
    // Check if user id == creator id
    else if (this.props.auth.user.id === this.state.forest.creator) {
      alert("You own this Forest!");
    }
    // Check if it has been saved already
    else {
      fetch(
        "http://localhost:9000/user/forests/saved/" + this.props.auth.user.id
      )
        .then((res) => res.json())
        .then((res) => {
          console.log(res.forests);
          for (var i = 0; i < res.forests.length; i++) {
            if (res.forests[i]._id === this.state.forest._id) {
              alert("You saved this Forest already!");
              return;
            }
          }
          // Save Forest
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
              forest_id: this.state.forest._id,
              forest_creator: this.state.forest.creator,
              user_id: this.props.auth.user.id,
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
        })
        .catch((err) => err);
    }
  }

  unsaveForest(){

    // Check if forest / user id is non-null
    if (this.state.forest._id === null || this.props.auth.user.id === null) {
      console.log("Null forest or user");
    }
   
    // Check if it has been unsaved already
    else {

      fetch("http://localhost:9000/user/forests/saved/" + this.props.auth.user.id)
        .then((res) => res.json())
        .then((res) => {
          console.log(res.forests);
          var checkSaved = false;
          for (var i = 0; i < res.forests.length; i++) {
            if (res.forests[i]._id === this.state.forest._id) {
              checkSaved = true;    
            }
          }
          if (checkSaved){
            // Unsave Forest
            const url = "http://localhost:9000/user/forests/unsave";
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
                forest_id: this.state.forest._id,
                user_id: this.props.auth.user.id,
              }),
            };
            fetch(url, options)
              .then((res) => [res.status, res.json()])
              .then((response) => {
                console.log(response);
                if (response[0] == 200) {
                  this.setState = {saved: false}
                } else {
                  alert(response[1].message);
                }
              });
            alert("Removed from Saved Forests");
          }
          else{
            alert("You have unsaved this forest already");
            return;
          }
        })
        .catch((err) => err);
    }
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
        <div className={this.state.forest.settings.privacy === 1 && this.state.myForest === false ? "hidden" : null}>
        <Row>
          <Col xl="8" lg="8" md="8" sm="12" xs="12">
            <Row>
              <Col xl="2" lg="2" md="2" sm="2" xs="2"
                className="forest-title-div"
              >
                <Image
                  className="forest-icon"
                  src={this.state.forest.icon}
                ></Image>
              </Col>
              <Col xl="6" lg="6" md="6" sm="6" xs="6"
                className="forest-title-play-col"
              >
                <Row>
                  <Col>
                    <h2>{this.state.forest.name} </h2>
                  </Col>
                </Row>
                <Row>
                  <Col xl="6" lg="6" md="6" sm="6" xs="6">
                    <Button className="forest-play-button" onClick={this.playForest}> PLAY </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col className="forest-info-song-actions">
                <Button
                  onClick={this.displaySongs}
                  // className="button forest-info-song-buttons"
                  className={this.state.toggle === 0 ? "button forest-info-song-buttons-toggled" :"button forest-info-song-buttons"}
                >
                  Songs
                </Button>
                <Button
                  onClick={this.displayInfo}
                  className={this.state.toggle === 1 ? "button forest-info-song-buttons-toggled" :"button forest-info-song-buttons"}
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
                    <div>
                      <BranchForest forest_id={this.state.forest._id} />
                    </div>
                  </Col>
                  <Col md="12">
                    <div className={this.state.myForest ? null : "hidden"}>
                      <ForestSettings ref={this.forestSettingsElement}/>
                    </div>
                  </Col>
                  <Col md="12">
                    {this.state.myForest ? ( <Deforest /> ) : null}
                    {(this.state.saved === false) && (this.state.myForest === false) ? 
                    ( <Button className="button forest-action-button" onClick={this.saveForest}>
                        Save Forest
                      </Button> ) 
                    : null}

                    {this.state.saved && (this.state.myForest === false) ? ( 
                      <Button className="button forest-action-button" onClick={this.unsaveForest}>
                        Unsave Forest 
                      </Button> ) 
                    : null}
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
        </div>
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
