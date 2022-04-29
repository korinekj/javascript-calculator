import "./App.css";
import React from "react";

import Display from "./Display.js";
import Buttons from "./Buttons.js";
import FormulaScreen from "./FormulaScreen";
import Author from "./Author";
import CalculatorContainer from "./CalculatorContainer";
class App extends React.Component {
  state = {
    kozy: "jak vozy",
  };

  render() {
    return (
      <CalculatorContainer>
        <FormulaScreen />
        <Display />
        <Buttons />
        <Author />
      </CalculatorContainer>
    );
  }
}

export default App;
