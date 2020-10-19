import React, { Component } from "react";
import {
  Navbar,
  Nav,
  NavItem,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import "./mainNavBar.css";

class MainNavBar extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-info">Search</Button>
            </Form>
            <Nav className="justify-content-end">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
          </Navbar>
        </div>
      </React.Fragment>
    );
  }
}

export default MainNavBar;
