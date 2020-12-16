/* Importing React & Router */
import React, { Component } from "react";
import { Link, Route, Switch, withRouter } from "react-router-dom";

/* Importing All Bootstrap Components */
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/authActions";


/* Importing All Resources & Custom CSS */
import "./feed.css";
import ForestDefaultIcon from "../../assets/forest.svg";
import MainNavBar from "../MainNavBar/mainNavBar";
import NowPlaying from "../NowPlaying/nowPlaying";
import FriendBox from "../FriendBox/friendBox";
import ForestList from "../ForestList/forestList";

class FeedPage extends Component {
  constructor(props) {
    super(props);
    this.forestListElement = React.createRef();
    this.friendListElement = React.createRef();
  }

  getFriendsForests() {
    fetch("http://104.141.160.216:9000/user/forests/friends/" + this.props.auth.user.id)
      .then(res => res.json())
      .then(res => {
        this.forestListElement.current.updateState(res.forests);
      })
      .catch(err => err);
  }

  getFriendInformation() {
    fetch("http://104.141.160.216:9000/user/friends")
      .then(res => res.json())
      .then(res => {
        this.friendListElement.current.updateState(res);
      })
      .catch(err => err);
  }

  componentDidMount() {
    this.getFriendsForests();
    this.getFriendInformation();
  }

  render() {
    return (
      <React.Fragment>
        <MainNavBar/>
        <Row>
          <Col xl="8" lg="8" md="8" sm="12" xs="12">
            <Row id="search-text-div">
              <Col>
                <h1 id="searching-for-text">Your Friends' Forests <span><img id="forest-icon" src={ForestDefaultIcon}></img></span></h1>
              </Col>
            </Row>
            <Row id="friend-forest-list-div">
              <Col>
                <div id="friend-forest-list-container">
                  <ForestList ref={this.forestListElement} />
                </div>
              </Col>
            </Row>
          </Col>
          <Col xl="4" lg="4" md="4" sm="12" xs="12">
            <Row>
              <Col>
                <FriendBox ref={this.friendListElement}/>
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

FeedPage.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps
)(withRouter(FeedPage));
