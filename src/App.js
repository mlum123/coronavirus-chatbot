import React from "react";
import "./App.css";
import { Container, Row, Col, Button } from "reactstrap";
import Coronavirus from "./util/Coronavirus";
import Header from "./components/Header";
import Chatbox from "./components/Chatbox";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getUSStats = this.getUSStats.bind(this);
    this.getStateStats = this.getStateStats.bind(this);
    this.getStateInfo = this.getStateInfo.bind(this);
  }

  getUSStats() {
    Coronavirus.getUSStats().then((USStats) => {
      this.setState({ USStats: USStats });
      console.log(this.state);
    });
  }

  getStateStats(state) {
    Coronavirus.getStateStats(state).then((StateStats) => {
      this.setState({ StateStats: StateStats });
      console.log(this.state);
    });
  }

  getStateInfo(state) {
    Coronavirus.getStateInfo(state).then((StateInfo) => {
      this.setState({ StateInfo: StateInfo });
      console.log(this.state);
    });
  }

  render() {
    return (
      <div className="App">
        <Container>
          <div class="skewed"></div>
          <Row>
            <Col xs="12" lg="6">
              <Chatbox></Chatbox>
            </Col>
            <Col xs="12" lg="6">
              <Header></Header>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
