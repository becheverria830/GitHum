/* Importing React & Router */
import React, { Component } from "react";
import * as d3 from "d3";

/* Importing All Bootstrap Components */
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

/* Importing All Resources & Custom CSS */
import "./hierarchy.css";
import SearchIcon from "../../assets/search.svg";

import Tree from 'react-d3-tree';

class HierarchyButton extends Component {
  constructor(props) {
    super(props);

    this.treeContainer = React.createRef();

    this.state = {
      hierarchy: {},
      forest: {},
      show: false,
      translate: {
        x: window.innerWidth * .9 / 2,
        y: 50
      },
      separation: {
        siblings: 2,
        nonSiblings: 2,
      },
      search: "",
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.searchForForests = this.searchForForests.bind(this);
  }

  showModal = (e) => {
    this.setState({
      show: !this.state.show,
    });
  };
  onClose = (e) => {
    this.props.onClose && this.props.onClose(e);
  };

  updateHierarchy(state) {
    this.setState({
      hierarchy: state,
    });
  }

  updateForest(state) {
    this.setState({
      forest: state,
    });
  }

  handleClick = (nodeData, evt) => {
    if(nodeData.nodeSvgShape.shapeProps.fill === 'green'){
      //EVENTUALLY MAKE THIS JUST REDIRECT BASED OFF THE PREVIOUS URL
      window.location.href = "http://localhost:3000/forests/" + nodeData.forest_id;
    }
   }

  handleResize = (e) => {
    this.setState({
      translate: {
        x: window.innerWidth * .9 / 2,
        y: 50
      }
    });
  };

  searchForForests(){
    console.log(this.state.search);
    // var svg = d3.selectAll("circle").style('backgroundColor', 'blue');
    // var svg = d3.selectAll("circle").attr("style","stroke: yellow").attr("style","opacity: .2");
    // var svg = d3.selectAll("circle").attr({style, stroke: yellow, opacity: .2});
    var svg = d3.selectAll("circle").style("stroke", "yellow");
    svg.style("opacity", ".2");
    console.log(svg);
    
  }

  handleSearchChange(event) {
    this.setState({search: event.target.value});
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnMount() {
    window.addEventListener("resize", this.handleResize);
  }

  render() {
    return (
      <div>
        <Button  onClick={(e) => { this.showModal(); }} id="hierarchy-button">
          SEE<br/>HIERARCHY
        </Button>

        <Modal show={this.state.show} onHide={this.showModal} id="hierarchy-modal">
          <Modal.Header closeButton id="hierarchy-modal-header" className="text-center" >
            <Modal.Title id="hierarchy-modal-title">Hierarchy</Modal.Title>
          </Modal.Header>
          <Modal.Body id="hierarchy-modal-body">
            <Row>
              <Col lg="12" md="12" sm="12" xs="12">
                <p id="hierarchy-forest-title">{this.state.forest.name}</p>
              </Col>
            </Row>
            <div ref={this.treeContainer} id="treeWrapper" style={{width: '100%', height: '500px'}}>
              <Tree orientation="vertical" separation = {this.state.separation} translate={this.state.translate} onClick={this.handleClick} collapsible={false} data={this.state.hierarchy} />
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Navbar>
              <Form inline onSubmit={this.searchForForests}>
                <FormControl
                  type="text"
                  value={this.state.search}
                  onChange={this.handleSearchChange}
                  placeholder="Search for keywords (eg: study, lo-fi, dance...)"
                  className="ml-sm-2 search-bar"
                />
                <Button onClick={this.searchForForests} variant="dark" className="search-icon-button">
                  <Image className="search-button" src={SearchIcon} />
                </Button>
              </Form>
            </Navbar>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default HierarchyButton;
