// Chatbox component where all the chat interactions take place
import React from "react";
import "./Chatbox.css";
import ChatHeader from "./ChatHeader";
import RobotMessage from "./RobotMessage";
import UserMessage from "./UserMessage";
import UserInput from "./UserInput";

class Chatbox extends React.Component {
  render() {
    return (
      <div id="chatbox">
        <ChatHeader className="fixed-top" />
        <div id="messages">
          {this.props.messages.map((message) => {
            return message.speaker === "bot" ? (
              <RobotMessage message={message.text} />
            ) : (
              <UserMessage message={message.text} />
            );
          })}
        </div>
        <UserInput />
      </div>
    );
  }
}

export default Chatbox;
