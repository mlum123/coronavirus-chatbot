// Chatbox component where all the chat interactions take place
import React from "react";
import "./Chatbox.css";
import ChatHeader from "./ChatHeader";
import RobotMessage from "./RobotMessage";
import UserMessage from "./UserMessage";
import UserInput from "./UserInput";

class Chatbox extends React.Component {
  // use messagesRef for chatbox's automatic scroll to bottom when new messages are added
  constructor(props) {
    super(props);
    this.messagesRef = React.createRef();
  }

  componentDidUpdate() {
    let el = this.messagesRef.current;
    el.scrollTop = el.scrollHeight;
  }

  render() {
    return (
      <div id="chatbox">
        <ChatHeader className="fixed-top" />
        <div id="messages" ref={this.messagesRef}>
          {this.props.messages.map((message) => {
            return message.speaker === "bot" ? (
              <RobotMessage
                key={this.props.messages.indexOf(message)}
                message={message.text}
              />
            ) : (
              <UserMessage
                key={this.props.messages.indexOf(message)}
                message={message.text}
              />
            );
          })}
        </div>
        <UserInput submitUserInput={this.props.submitUserInput} />
      </div>
    );
  }
}

export default Chatbox;
