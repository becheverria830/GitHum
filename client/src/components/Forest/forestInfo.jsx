/* Importing React & Router */
import React, { Component } from "react";
import { Link, Route, Switch, withRouter } from "react-router-dom";

/* Importing All Bootstrap Components */
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

import PropTypes from "prop-types";
import { connect } from "react-redux";

/* Importing All Resources & Custom CSS */
import "./forestInfo.css";
import HierarchyButtom from "../Hierarchy/hierarchy";



class ForestInfo extends Component {
  constructor(props) {
    super(props);

    //this.getForestData = this.getForestData.bind(this);
    //this.getUserData = this.getUserData.bind(this);


    this.state = {
      creator_information: {
        username: ''
      },
      creatorId: -1,
      forest: {
        id: -1,
        name: "",
        icon: "",
        active: 1,
        depth: 1,
        songs: [],
        settings: {
          privacy: 1,
        },
      },
    };
  }
  
  getForestData() {
    console.log(
      this.props.location.pathname.substr(
        this.props.location.pathname.lastIndexOf("/") + 1
      )
    );
    fetch(
      "http://localhost:9000/user/forests/" +
        this.props.location.pathname.substr(
          this.props.location.pathname.lastIndexOf("/") + 1
        )
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          forest: res.forests,
          creatorId: res.forests.creator
        });
      })
      .catch((err) => err);
  }

  getUserData() {
    console.log(this.state.creatorId);
    if (this.state.creatorId != -1) {
      console.log("inside the if: " + this.state.creatorId);
      fetch(
        "http://localhost:9000/user/credentials/" + this.state.creatorId
      )
        .then((res) => res.json())
        .then((res) => {
          this.setState({
            creator_information: res.user
          });
        })
        .catch((err) => err);
        console.log(this.state.creator_information);
    }
  }

  componentDidMount() {
    this.getForestData();
    this.getUserData();
  }
  
  render() {

    if (this.state.creator_information.username == '') {
      this.getUserData();
    }

    return (
      <React.Fragment>
        <Row>
          <Col md="6" sm="12" className="info-holder-container">
            <div className="info-holder">
              <Row>
                <Col className="valley-forest-title-holder">
                  <h3 className="valley-forest-title">Forest Owner</h3>
                </Col>
              </Row>
              <Row>
                <Col className="valley-forest-title-holder">
                  <h3 className="valley-forest-title">
                    {this.state.creator_information.username}
                  </h3>
                </Col>
              </Row>
            </div>
          </Col>
          <Col md="6" sm="12" className="info-holder-container">
            <div className="info-holder">
              <Row>
                <Col className="valley-forest-title-holder">
                  <h3 className="valley-forest-title">
                    Number Of Branched Forests
                  </h3>
                </Col>
              </Row>
              <Row>
                <Col className="valley-forest-title-holder">
                  <h3 className="valley-forest-title">
                    <b>24</b>
                  </h3>
                </Col>
              </Row>
            </div>
          </Col>
          <Col md="6" sm="12" className="info-holder-container">
            <div className="info-holder">
              <Row>
                <Col className="valley-forest-title-holder">
                  <h3 className="valley-forest-title">
                    This is an Original Forest
                  </h3>
                </Col>
              </Row>
              <Row>
                <Col className="valley-forest-title-holder">
                  <h3 className="valley-forest-title"></h3>
                </Col>
              </Row>
            </div>
          </Col>
          <Col md="6" sm="12" className="info-holder-container">
            <div className="info-holder">
              <Row>
                <Col className="valley-forest-title-holder">
                  <h3 className="valley-forest-title">Number of Times Saved</h3>
                </Col>
              </Row>
              <Row>
                <Col className="valley-forest-title-holder">
                  <h3 className="valley-forest-title">
                    <b>36</b>
                  </h3>
                </Col>
              </Row>
            </div>
          </Col>
          <Col
            md="6"
            sm="12"
            className="offset-md-3 offset-sm-0 info-holder-container"
          >
            <div className="info-holder">
              <Row>
                <Col className="valley-forest-title-holder">
                  <HierarchyButtom/>
                  {/* <h3 className="valley-forest-title">
                    {" "}
                    S E E <br></br> H I E R A R C H Y
                  </h3> */}
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}


ForestInfo.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(withRouter(ForestInfo));
