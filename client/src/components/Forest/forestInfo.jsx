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
import HierarchyButton from "../Hierarchy/hierarchy";

class ForestInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      creator_information: {
        id: -1,
        username: ""
      },
      forest: {
        id: -1,
        name: "",
        icon: "",
        active: 1,
        depth: 1,
        songs: [],
        times_saved: 0,
        children: [],
        parent: -1,
        settings: {
          privacy: 1,
        },
        children: []
      },
    };

    this.hierarchyref = React.createRef();
  }

  getUserData(id) {
    fetch("http://104.141.160.216:9000/user/credentials/" + id)
      .then((res) => res.json())
      .then((res) => {
        console.log("user");
        console.log(res);
        this.setState({
          creator_information: {
            id: id,
            username: res.user.username
          }
        });
      })
      .catch((err) => err);
  }

  updateForestInfo(state) {
    this.setState({
      forest: state,
    });
    this.getUserData(state.creator);
    this.hierarchyref.current.updateForest(state);
  }

  updateHierarchy(state) {
    this.setState({
      hierarchy: state
    });
    this.hierarchyref.current.updateHierarchy(state);
  }

  render() {
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
                    <b>{this.state.forest.children.length}</b>
                  </h3>
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
                    <b> {this.state.forest.times_saved} </b>
                  </h3>
                </Col>
              </Row>
            </div>
          </Col>
          <Col md="6" sm="12" className="info-holder-container">
            <div className="hierarchy-holder">
              <Row>
                <Col className="valley-forest-title-holder">
                  <h3 className="valley-forest-title"><HierarchyButton ref={this.hierarchyref}/></h3>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}


export default ForestInfo;
