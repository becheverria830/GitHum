/* Importing React & Router */
import React, { Component } from "react";
import { Link, Route, Switch, withRouter } from "react-router-dom";

/* Importing All Bootstrap Components */
import "bootstrap/dist/css/bootstrap.css";
import Image from "react-bootstrap/Image";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavItem from "react-bootstrap/NavItem";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/authActions";

/* Importing All Resources & Custom CSS */
import "./mainNavBar.css";
import SmallLogo from "../../assets/githum-tree.svg";
import SearchIcon from "../../assets/search.svg";

class MainNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    }

    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  search = e => {
    e.preventDefault();
    this.props.history.push("/search/" + this.state.search);
  };

  handleSearchChange(event) {
    this.setState({search: event.target.value});
  }

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
                value={this.state.search}
                onChange={this.handleSearchChange}
                placeholder="Search for Songs and Artists"
                className="ml-sm-2 search-bar"
              />
              <Button onClick={this.search} variant="dark" className="search-icon-button">
                <Image className="search-button" src={SearchIcon} />
              </Button>
            </Form>
            <Nav className="ml-auto nav-opts">
              <Nav.Link className="nav-my-valley" id="my-valley-link" href="/valley/1">
                My Valley
              </Nav.Link>
              <Nav.Link onClick={this.onLogoutClick} id="log-out-link">
                Log Out
              </Nav.Link>
            </Nav>
          </Navbar>
        </div>
      </React.Fragment>
    );
  }
}

MainNavBar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(MainNavBar));
