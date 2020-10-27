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
import SmallLogo from "../../assets/githum-tree.svg";
import SearchIcon from "../../assets/search.svg";

class MainNavBar extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div>
          <Navbar className="main-nav">
            <Link to="/feed">
              <Navbar.Brand>
                <Image className="small-logo" src={SmallLogo} />
                GitHum
              </Navbar.Brand>
            </Link>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search for songs and artists"
                className="ml-sm-2 search-bar"
              />
              <Link to="/search?=Avicii">
                <Button variant="dark">
                  <Image className="search-button" src={SearchIcon} />
                </Button>
              </Link>
            </Form>
            <Nav className="ml-auto nav-opts">
              <Nav.Link className="nav-my-valley" id="my-valley-link" href="/valley/3">
                My Valley
              </Nav.Link>
              <Nav.Link href="/" id="log-out-link">
                Log Out
              </Nav.Link>
            </Nav>
          </Navbar>
        </div>
      </React.Fragment>
    );
  }
}

export default MainNavBar;
