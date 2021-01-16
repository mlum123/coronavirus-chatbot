// Header component of the page, describes intent of web app
import React from "react";
import "./Header.css";

class Header extends React.Component {
  render() {
    return (
      <header>
        <h1>have questions about coronavirus?</h1>
        <h2>ask our chatbot!</h2>
      </header>
    );
  }
}

export default Header;
