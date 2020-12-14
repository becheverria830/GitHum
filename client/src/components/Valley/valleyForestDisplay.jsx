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
import "./valleyForestDisplay.css";
import ForestDefaultIcon from "../../assets/forest.svg";

class ValleyForestDisplay extends Component {

  constructor(props) {
    super(props);
    this.state = {
      forests: []
    };
  }

  updateState(state) {
    this.setState({
      forests: state
    });
  }

  filterForests(forests) {
    //this.setState({ id : this.props.auth.user.id})
  }

  render() {
    return (
      <React.Fragment>
        <Row>
          {
            this.state.forests.filter(forest => 
              forest.settings.privacy == 0 || (forest.settings.privacy == 1 && forest.creator == this.props.userid))
            .map(forest => (
              <Col md="6" sm="12" className="valley-forest-holder-container">
                <Link to={"/forests/"+forest._id}>
                  <div className="valley-forest-holder">
                    <Row>
                      <Col className="valley-forest-icon-holder">
                        <Image className="valley-forest-icon" src={forest.icon}></Image>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="valley-forest-title-holder">
                        <h3 className="valley-forest-title">{forest.name}</h3>
                      </Col>
                    </Row>
                  </div>
                </Link>
              </Col>
            ))
          }
        </Row>
      </React.Fragment>
    );
  }
}
/*
ValleyForestDisplay.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(withRouter(ValleyForestDisplay));
*/
export default ValleyForestDisplay;