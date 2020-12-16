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

    this.DFS = this.DFS.bind(this);
    this.parseHierarchy = this.parseHierarchy.bind(this);
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

  DFS(forest, all_arr, visited){
    all_arr.push(forest.forest_id);
    visited.push(forest)
    //Get Forest

    // var forest = res.forests;
    if(forest.children !== null){
      for (var i = 0; i < forest.children.length; i++){
        var check_visited = visited.indexOf(forest.children[i]) //returns -1 or a num
        if(check_visited === -1){
          this.DFS(forest.children[i], all_arr, visited);
        }
      }
    }
  }

  parseHierarchy(forest_id, keywords, all_arr, key_arr, num_nodes){
    // Add iterated forest to list of all forests
    all_arr.push(forest_id)

    // ASYNC COMMENTED OUT

    // Get Forest
    fetch("http://localhost:9000/user/forests/" + forest_id)
      .then((res) => res.json())
      .then((res) => {
        var forest = res.forests;

        // See if name matches keyword
        var forestName = forest.name;
        keywords = keywords.toLowerCase();
        forestName = forestName.toLowerCase();
        // console.log("NAME: " + forestName + " INDEX OF: " + forestName.indexOf(keywords));
        if(forestName.indexOf(keywords) !== -1){
          // Mark this id or index as searched
          key_arr.push(forest_id);
        }

        // If there exists children, keep parsing
        if(forest.children !== null && forest.children.length > 0){
          for(var i = 0; i < forest.children.length; i++){
            this.parseHierarchy(forest.children[i], keywords, all_arr, key_arr, num_nodes);
          }
        }
      })
      .catch((err) => err);
  }


  searchForForests(event){
    event.preventDefault();

    ////////////////////////
    //RESET
    var svg = d3.selectAll("circle").style("stroke", "black");
    svg = svg.style("opacity", "1");

    console.log(this.state.search);
    console.log(this.state.hierarchy);

    // Get this forest's root
    var rootId = this.state.hierarchy.forest_id;

    // GET ALL ARR
    var all_arr_real = [];
    var visited = [];
    this.DFS(this.state.hierarchy, all_arr_real, visited);
    setTimeout(function(){
      console.log(all_arr_real);
    }, 1000);

    // Get Number of Nodes
    var all_nodes = d3.selectAll("circle");
    var num_nodes = all_nodes[0].length;

    // Parse Hierarchy
    var all_arr = []
    var key_arr = []
    var keywords = this.state.search
    this.parseHierarchy(rootId, keywords, all_arr, key_arr, num_nodes);

    // WAIT
    setTimeout(function() {
      // If te whole tree was traversed
      if(all_arr.length === num_nodes){
        console.log("KEYWORD: ", keywords);
        console.log("ALL ARR: ", all_arr);
        console.log("KEY ARR: ", key_arr);
        // Style the Searched Forests
        var svg = [];
        for (var i = 0; i < all_arr_real.length; i++){
          console.log(key_arr.indexOf(all_arr_real[i]));
          if(key_arr.indexOf(all_arr_real[i]) === -1){
            svg = d3.selectAll("circle").filter(function(d,index){
              return index == i;
            }).style("opacity", ".2");
          }
          else {
            svg = d3.selectAll("circle").filter(function(d,index){return index == i;}).style("stroke", "yellow");
          }
        }

      }
     }, 500);

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
