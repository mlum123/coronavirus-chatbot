import React from "react";
import "./App.css";
import { Container, Row, Col } from "reactstrap";
import Coronavirus from "./util/Coronavirus";
import Chatbox from "./components/Chatbox";
import Header from "./components/Header";
import Acknowledgements from "./components/Acknowledgements";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        {
          speaker: "bot",
          text:
            "Hello! I'm a coronavirus chatbot. Ask me any questions you have about COVID-19.",
        },
        {
          speaker: "user",
          text: "WOWOWOWOW",
        },
        {
          speaker: "user",
          text: "WOWOWOW WOWOWOWOWWOWO OWOW",
        },
        {
          speaker: "bot",
          text:
            "WOWOWOWOWWOWO WOWOWWOWOWOWOWWO OWOW OWWOWOWOWOWWO WOWOWOW WOWOWOWOWWOWO OWOW",
        },
        {
          speaker: "bot",
          text:
            "WOWOWOWOWWOWO WOWOWWOWOWOWOWWO OWOW OWWOWOWOWOWWO WOWOWOW WOWOWOWOWWOWO OWOW",
        },
        {
          speaker: "bot",
          text:
            "WOWOWOWOWWOWO WOWOWWOWOWOWOWWO OWOW OWWOWOWOWOWWO WOWOWOW WOWOWOWOWWOWO OWOW",
        },
      ],
    };
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
              <Chatbox messages={this.state.messages} />
            </Col>
            <Col xs="12" lg="6">
              <Row>
                <Col>
                  <Header />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Acknowledgements />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
