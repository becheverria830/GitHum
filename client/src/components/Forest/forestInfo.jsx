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
import "./forestInfo.css";

class ForestInfo extends Component {
  render() {
    return (
      <React.Fragment>
        <Row>
          <Col md="6" sm="12" className="info-holder-container">
            <div className="info-holder">
              <Row>
                <Col className="valley-forest-title-holder">
                  <h3 className="valley-forest-title">Forest Owner</h3>
                </Col>
              </Row>
              <Row>
                <Col className="valley-forest-title-holder">
                  <h3 className="valley-forest-title"><b>becheverria830</b></h3>
                </Col>
              </Row>
            </div>
          </Col>
          <Col md="6" sm="12" className="info-holder-container">
            <div className="info-holder">
              <Row>
                <Col className="valley-forest-title-holder">
                  <h3 className="valley-forest-title">Number Of Branched Forests</h3>
                </Col>
              </Row>
              <Row>
                <Col className="valley-forest-title-holder">
                  <h3 className="valley-forest-title"><b>24</b></h3>
                </Col>
              </Row>
            </div>
          </Col>
          <Col md="6" sm="12" className="info-holder-container">
            <div className="info-holder">
              <Row>
                <Col className="valley-forest-title-holder">
                  <h3 className="valley-forest-title">This is an Original Forest</h3>
                </Col>
              </Row>
            </div>
          </Col>
          <Col md="6" sm="12" className="info-holder-container">
            <div className="info-holder">
              <Row>
                <Col className="valley-forest-title-holder">
                  <h3 className="valley-forest-title">Number of Times Saved</h3>
                </Col>
              </Row>
              <Row>
                <Col className="valley-forest-title-holder">
                  <h3 className="valley-forest-title"><b>36</b></h3>
                </Col>
              </Row>
            </div>
          </Col>
          <Col md="6" sm="12" className="offset-md-3 offset-sm-0 info-holder-container">
            <div className="info-holder">
              <Row>
                <Col className="valley-forest-title-holder">
                  <h3 className="valley-forest-title"> S E E <br></br>   H I E R A R C H Y</h3>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </React.Fragment>
    );
  }





  //
  // render() {
  //   return (
  //           <Col>
  //             <Container className="forest-info-panel" id="owner-panel">
  //               <Row>
  //                 <Col>
  //                   <h3>Forest Owner</h3>
  //                 </Col>
  //               </Row>
  //               <Row>
  //                 <Col>
  //                   <p>becheverria830</p>
  //                 </Col>
  //               </Row>
  //               <Row></Row>
  //             </Container>
  //           </Col>
  //           <Col>
  //             <Container
  //               className="forest-info-panel"
  //               id="number-branched-panel"
  //             >
  //               <Row>
  //                 <Col>
  //                   <h3>Number of Branched Forests</h3>
  //                 </Col>
  //               </Row>
  //               <Row>
  //                 <Col>
  //                   <p>12</p>
  //                 </Col>
  //               </Row>
  //               <Row></Row>
  //             </Container>
  //           </Col>
  //           <Col>
  //             <Container
  //               className="forest-info-panel"
  //               id="original-forest-panel"
  //             >
  //               <Row>
  //                 <Col>
  //                   <h3> Root Forest Owner </h3>
  //                 </Col>
  //               </Row>
  //               <Row>
  //                 <Col>
  //                   <p>forest_master_5000</p>
  //                 </Col>
  //               </Row>
  //               <Row></Row>
  //             </Container>
  //           </Col>
  //           <Col>
  //             <Container
  //               className="forest-info-panel"
  //               id="number-saved-panel"
  //             >
  //               <Row>
  //                 <Col>
  //                   <h3>Number of Times Saved</h3>
  //                 </Col>
  //               </Row>
  //               <Row>
  //                 <Col>
  //                   <p>5</p>
  //                 </Col>
  //               </Row>
  //               <Row></Row>
  //             </Container>
  //           </Col>
  //         </Row>
  //         <Row>
  //             <Col>
  //               <Button id="see-hierarchy-button"> S E E <br></br>   H I E R A R C H Y</Button>
  //             </Col>
  //         </Row>
  //       </Container>
  //     </React.Fragment>
  //   );
  // }
}

export default ForestInfo;
