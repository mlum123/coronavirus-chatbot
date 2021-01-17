// Chat Loading Dots component to display when waiting for chatbot response
import React from "react";
import "./ChatLoading.css";

class ChatLoading extends React.Component {
  render() {
    return (
      <>
        <div class="spinner">
          <div class="bounce1"></div>
          <div class="bounce2"></div>
          <div class="bounce3"></div>
        </div>
      </>
    );
  }
}

export default ChatLoading;
