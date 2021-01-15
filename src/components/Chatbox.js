import React from "react";
import "./Chatbox.css";
import ChatHeader from "./ChatHeader";
import Robot from "./Robot";

class Chatbox extends React.Component {
  render() {
    return (
      <div id="chatbox">
        <ChatHeader />
      </div>
    );
  }
}

export default Chatbox;
