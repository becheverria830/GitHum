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
  state = {};
  render() {
    return (
      <React.Fragment>
        <Col lg="8" md="8" sm="8" xs="8">
          <Container
            className="container-fluid"
            id="valley-forest-display-container"
          >
            <div className="">
              <Table className="valley-forest-display-table">
                <tr>
                  <div className="valley-forest-display-item">
                    <td>
                      <Image
                        className="valley-forest-pic"
                        src={ForestDefaultIcon}
                      ></Image>
                    </td>
                    <td>
                      <h3 className="valley-forest-title"> Forest #1</h3>
                    </td>
                  </div>
                </tr>
                <tr>
                  <div className="valley-forest-display-item">
                    <td>
                      <Image
                        className="valley-forest-pic"
                        src={ForestDefaultIcon}
                      ></Image>
                    </td>
                    <td>
                      <h3 className="valley-forest-title"> Forest #2</h3>
                    </td>
                  </div>
                </tr>
              </Table>
            </div>
          </Container>
        </Col>
      </React.Fragment>
    );
  }
}

export default ValleyForestDisplay;
