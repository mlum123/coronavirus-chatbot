import React from "react";
import "./App.css";
import { Container, Row, Col } from "reactstrap";
import Reply from "./util/Reply";
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
          text: "What is coronavirus?",
        },
        {
          speaker: "bot",
          text:
            "According to Johns Hopkins Medecine, 'Coronaviruses are a type of virus. There are many different kinds, and some cause disease. A newly identified coronavirus, SARS-CoV-2, has caused a worldwide pandemic of respiratory illness, called COVID-19.'",
        },
        {
          speaker: "user",
          text: "Where can I get a vaccine?",
        },
        {
          speaker: "bot",
          text: "California has had 2.9 million coronavirus cases, to date.",
        },
      ],
    };
    this.getChatbotResponse = this.getChatbotResponse.bind(this);
  }

  // add user input to messages array in state
  // use Reply module to get chatbot response to user input
  // add chatbot response to messages array in state
  async getChatbotResponse(userInput) {
    let messages = this.state.messages;
    messages.push({
      speaker: "user",
      text: userInput,
    });

    await Reply.getChatbotResponse(userInput).then((botResponse) => {
      messages.push({
        speaker: "bot",
        text: botResponse,
      });

      this.setState({ messages: messages });
    });
  }

  render() {
    return (
      <div className="App">
        <Container>
          <div className="skewed"></div>
          <Row>
            <Col xs="12" lg="6" className="d-flex justify-content-center">
              <Chatbox
                messages={this.state.messages}
                getChatbotResponse={this.getChatbotResponse}
              />
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
