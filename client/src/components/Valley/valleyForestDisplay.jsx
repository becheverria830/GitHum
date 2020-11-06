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

  render() {
    return (
      <React.Fragment>
        <Row>
          {
            this.state.forests.map(forest => (
              <Col md="6" sm="12" className="valley-forest-holder-container">
                <Link to={"/forest/"+forest.id}>
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

export default ValleyForestDisplay;
