import "./App.css";
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <CalculatorContainer />
      </div>
    );
  }
}

class CalculatorContainer extends React.Component {
  render() {
    return (
      <div>
        <h1>Calculator container</h1>
      </div>
    );
  }
}

export default App;
