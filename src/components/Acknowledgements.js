// Acknowledgements component
import React from "react";
import "./Acknowledgements.css";

class Acknowledgements extends React.Component {
  render() {
    return (
      <div id="acknowledgements">
        <h4 id="thanks">thank you to...</h4>
        <h4>
          the atlantic's{" "}
          <a href="https://covidtracking.com/" target="_blank" rel="noreferrer">
            covid tracking project
          </a>
        </h4>
      </div>
    );
  }
}

export default Acknowledgements;
