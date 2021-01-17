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
      isLoading: false,
      messages: [
        {
          speaker: "bot",
          text:
            "Hello! I'm a coronavirus chatbot. Ask me any questions you have about COVID-19.",
        },
      ],
    };
    this.getChatbotResponse = this.getChatbotResponse.bind(this);
    this.submitUserInput = this.submitUserInput.bind(this);
  }

  // add user input to messages array in state
  // call asynchronous getChatbotResponse function to get best response to user input using Reply module logic
  submitUserInput(userInput) {
    let messages = this.state.messages;
    messages.push({
      speaker: "user",
      text: userInput,
    });

    this.setState({ messages: messages });

    this.getChatbotResponse(userInput);
  }

  // use Reply module to get chatbot response to user input
  // add chatbot response to messages array in state
  async getChatbotResponse(userInput) {
    // set isLoading to true in state to display chatLoading dots
    this.setState({ isLoading: true });

    let messages = this.state.messages;
    await Reply.getChatbotResponse(userInput).then((botResponse) => {
      messages.push({
        speaker: "bot",
        text: botResponse,
      });

      this.setState({ isLoading: false, messages: messages });
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
                submitUserInput={this.submitUserInput}
                isLoading={this.state.isLoading}
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
