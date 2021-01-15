// UserMessage component for the user's chat icon and message
import React from "react";
import "./UserMessage.css";

class UserMessage extends React.Component {
  render() {
    return <div className="user-message">{this.props.message}</div>;
  }
}

export default UserMessage;
