// Chat Loading Dots component to display when waiting for chatbot response
import React from "react";
import "./ChatLoading.css";
import { Row, Col } from "reactstrap";

class ChatLoading extends React.Component {
  render() {
    return (
      <>
        <Row>
          <Col xs="2">
            <i className="fab fa-android fa-3x bot-chat-icon"></i>
          </Col>
          <Col xs="10">
            <div class="spinner">
              <div class="bounce1"></div>
              <div class="bounce2"></div>
              <div class="bounce3"></div>
            </div>
          </Col>
        </Row>
      </>
    );
  }
}

export default ChatLoading;
