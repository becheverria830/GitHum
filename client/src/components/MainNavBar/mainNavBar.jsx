/* Importing React & Router */
import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";

/* Importing All Bootstrap Components */
import "bootstrap/dist/css/bootstrap.css";
import Image from "react-bootstrap/Image";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavItem from "react-bootstrap/NavItem";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

/* Importing All Resources & Custom CSS */
import "./mainNavBar.css";
import SmallLogo from "../assets/githum-tree.svg";
import SearchIcon from "../assets/search.svg";

class MainNavBar extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div>
          <Navbar className="main-nav">
            <Navbar.Brand href="#home">
              <Image className="small-logo" src={SmallLogo} />
              GitHum
            </Navbar.Brand>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search for songs and artists"
                className="ml-sm-2 search-bar"
              />
              <Button variant="dark">
                <Image className="search-button" src={SearchIcon} />
              </Button>
            </Form>
            <Nav className="ml-auto">
              <Nav.Link className="nav-my-valley" href="#">
                My Valley
              </Nav.Link>
              <Nav.Link href="#">Log Out</Nav.Link>
            </Nav>
          </Navbar>
        </div>
      </React.Fragment>
    );
  }
}

export default MainNavBar;
