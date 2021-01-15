// RobotMessage component for the chatbot's chat icon and message
import React from "react";
import "./RobotMessage.css";
import { Row, Col } from "reactstrap";

class RobotMessage extends React.Component {
  render() {
    return (
      <>
        <Row>
          <Col xs="2">
            <i className="fab fa-android fa-3x bot-chat-icon"></i>
          </Col>
          <Col xs="10">
            <div className="bot-message">{this.props.message}</div>
          </Col>
        </Row>
      </>
    );
  }
}

export default RobotMessage;
