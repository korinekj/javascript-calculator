import "./App.css";
import React from "react";

import Display from "./Display.js";
import Buttons from "./Buttons.js";
import OutputScreen from "./OutputScreen";
class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="root-div">
        <div className="App">
          <CalculatorContainer />
        </div>
        <div className="author">
          <Author />
        </div>
      </div>
    );
  }
}

class CalculatorContainer extends React.Component {
  render() {
    return (
      <div className="calculator">
        <Display />
        <OutputScreen />
        <Buttons />
      </div>
    );
  }
}

class Author extends React.Component {
  render() {
    const text = "Designed and Coded by";
    return (
      <div className="author">
        {text}
        <br />
        <a href="#">Odkaz na portfolio</a>
      </div>
    );
  }
}

export default App;
