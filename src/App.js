import React from "react";
import "./App.css";
import { Button } from "reactstrap";
import Coronavirus from "./util/Coronavirus";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getUSStats = this.getUSStats.bind(this);
    this.getStateStats = this.getStateStats.bind(this);
    this.getStateInfo = this.getStateInfo.bind(this);
  }

  getUSStats() {
    Coronavirus.getUSStats().then((USStats) => {
      this.setState({ USStats: USStats });
      console.log(this.state);
    });
  }

  getStateStats(state) {
    Coronavirus.getStateStats("ca").then((StateStats) => {
      this.setState({ StateStats: StateStats });
      console.log(this.state);
    });
  }

  getStateInfo(state) {
    Coronavirus.getStateInfo("ca").then((StateInfo) => {
      this.setState({ StateInfo: StateInfo });
      console.log(this.state);
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header"></header>
        <Button onClick={this.getUSStats}>US Stats</Button>
        <Button onClick={this.getStateStats}>State Stats</Button>
        <Button onClick={this.getStateInfo}>State Info</Button>
      </div>
    );
  }
}

export default App;
