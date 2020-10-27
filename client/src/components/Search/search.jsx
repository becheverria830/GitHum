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
import "./search.css";
import MainNavBar from "../MainNavBar/mainNavBar";
import NowPlaying from "../NowPlaying/nowPlaying";
import SongList from "../SongList/songList";

class SearchPage extends Component {

  constructor(props) {
    super(props);
    this.songListElement = React.createRef();
  }

  getSearchResults() {
    fetch("http://localhost:9000/search")
      .then(res => res.json())
      .then(res => {
        this.songListElement.current.updateSongs(res.songs);
      })
      .catch(err => err);
  }

  componentDidMount() {
    this.getSearchResults();
  }

  render() {
    return (
      <React.Fragment>
        <MainNavBar />
        <Row>
          <Col xl="8" lg="8" md="8" sm="12" xs="12">
            <Row>
              <Col id="search-text-div">
                <h1 id="searching-for-text">Searching for: </h1>
                <h4 id="search-input">Just Can't Wait to be King</h4>
              </Col>
            </Row>
            <Row>
              <Col id="song-list-div">
                <div id="song-container">
                  <SongList ref={this.songListElement}/>
                </div>
              </Col>
            </Row>
          </Col>
          <Col xl="4" lg="4" md="4" sm="12" xs="12">
            <Row>
              <Col id="filter-by-div">
                <h3 id="filter-by-header">Filter By:</h3>
                <Button id="search-action-1" className="filter-by-button"> By Keyword </Button>
                <br/>
                <Button id="search-action-2" className="filter-by-button"> By Most Popular </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <NowPlaying/>
              </Col>
            </Row>
          </Col>
        </Row>

      </React.Fragment>





      //
      //
      //
      //   <div>
      //     {/* <Container> */}
      //     <Row>
      //       <Col lg="8" md="8" sm="8">
      //         <Row>
      //           <Container
      //             className="container-fluid"
      //             id="search-title-container"
      //           >
      //             <Col lg="3" md="3" sm="3">
      //               <h1 id="searching-for-text">Searching for: </h1>
      //               <h4 id="search-input">Just Can't Wait to be King</h4>
      //             </Col>
      //             <Col lg="6" md="6" sm="6"></Col>
      //           </Container>
      //         </Row>
      //       </Col>
      //       <Col lg="4" md="4" sm="4">
      //         <Container
      //           className="container container-fluid"
      //           id="search-action-container"
      //         >
      //           <Col lg="1" md="1" sm="1"></Col>
      //           <Col lg="10" md="10" sm="10">
      //             <Row>
      //               <h3 className="filter-by-header">Filter By:</h3>
      //             </Row>
      //             <Row>
      //               <Button
      //                 id="search-action-1"
      //                 className="search-action-buttons"
      //               >
      //                 By Keyword
      //               </Button>
      //             </Row>
      //             <br></br>
      //             <Row>
      //               <Button
      //                 id="search-action-2"
      //                 className="search-action-buttons"
      //               >
      //                 By Most Popular
      //               </Button>
      //             </Row>
      //             <br></br>
      //           </Col>
      //           <Col lg="1" md="1" sm="1"></Col>
      //         </Container>
      //       </Col>
      //     </Row>
      //     <Row>
      //       <Col lg="8" md="8" sm="8">
      //         <Container
      //           className="container-fluid"
      //           id="forest-song-display-container">
      //         </Container>
      //       </Col>
      //       <Col lg="4" md="4" sm="4">
      //         <Container
      //           className="container"
      //           id="search-now-playing-container"
      //         >
      //           <NowPlaying></NowPlaying>
      //         </Container>
      //       </Col>
      //     </Row>
      //   </div>
      // </React.Fragment>
    );
  }
}

export default SearchPage;
