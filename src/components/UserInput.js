// UserInput component that allows user to type message to chatbot
import React from "react";
import "./UserInput.css";
import { Row, Col, Form, Input } from "reactstrap";

class UserInput extends React.Component {
  render() {
    return (
      <>
        <hr></hr>
        <Form id="input-box">
          <Row>
            <Col xs="10">
              <Input
                type="text"
                name="user-input"
                id="user-input"
                placeholder="ask away!"
              ></Input>
            </Col>
            <Col xs="2">
              <i class="fas fa-chevron-circle-right fa-2x"></i>
            </Col>
          </Row>
        </Form>
      </>
    );
  }
}

export default UserInput;
