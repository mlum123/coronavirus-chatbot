// UserInput component that allows user to type message to chatbot
import React from "react";
import "./UserInput.css";
import { Row, Col, Form, Input } from "reactstrap";

class UserInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onKeyDownHandler = this.onKeyDownHandler.bind(this);
    this.submitUserInput = this.submitUserInput.bind(this);
  }

  // called whenever user makes changes to text input area
  handleInputChange(event) {
    this.setState({ userInput: event.target.value });
  }

  // if user presses enter key while in text input area, call submitUserInput function
  onKeyDownHandler = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault(); // prevent page from refreshing on submit using enter key
      this.submitUserInput();
    }
  };

  // called when user hits enter in text input area, or clicks arrow button to submit message
  submitUserInput(event) {
    this.props.getChatbotResponse(this.state.userInput);
    this.setState({ userInput: "" }); // clear input area after submitting user's text
  }

  render() {
    return (
      <>
        <hr></hr>
        <Form id="input-box" onSubmit={this.submitUserInput}>
          <Row>
            <Col xs="10">
              <Input
                type="text"
                name="user-input"
                id="user-input"
                placeholder="ask away!"
                onChange={this.handleInputChange}
                onKeyDown={this.onKeyDownHandler}
                value={this.state.userInput}
              ></Input>
            </Col>
            <Col xs="2">
              <i
                className="fas fa-chevron-circle-right fa-2x"
                onClick={this.submitUserInput}
              ></i>
            </Col>
          </Row>
        </Form>
      </>
    );
  }
}

export default UserInput;
