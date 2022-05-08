import { click } from "@testing-library/user-event/dist/click";
import React from "react";

class CalculatorContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prevInput: "",
      currentInput: "0",
      currentFormulaScreen: "",
    };

    this.clear = this.clear.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.division = this.division.bind(this);
    this.multiply = this.multiply.bind(this);
    this.subtraction = this.subtraction.bind(this);
    this.addition = this.addition.bind(this);
  }

  clear() {
    this.setState({
      currentInput: "0",
      currentFormulaScreen: "",
      prevInput: "",
    });
  }

  division() {
    console.log("dělení");
  }

  multiply() {
    console.log("násobení");
  }

  subtraction() {
    console.log("odečítání");
  }

  addition() {
    let previousCurrentInput = this.state.currentFormulaScreen;

    console.log(previousCurrentInput);
    this.setState(
      {
        currentInput: "+",
        prevInput: "",
      },
      () =>
        this.setState((prevState) => ({
          currentFormulaScreen: previousCurrentInput + prevState.currentInput,
        }))
    );
  }

  handleClick(event) {
    const operators = [":", "*", "-", "+", "="];
    const clickedButton = event.target.value;

    if (operators.includes(clickedButton)) {
      switch (clickedButton) {
        case ":":
          this.division();
          break;
        case "*":
          this.multiply();
          break;
        case "-":
          this.subtraction();
          break;
        case "+":
          this.addition();
          break;
        case "=":
          console.log("rovná se");
          break;
      }
    } else {
      console.log("something else");
      //let test = parseInt(this.state.prevInput) || 0;
      //let test1 = parseInt(clickedButton) || ".";
      this.setState(
        (prevState) => ({
          currentInput: parseInt(prevState.prevInput + clickedButton),
        }),
        () =>
          this.setState((prevState) => {
            return {
              prevInput: prevState.currentInput,
              currentFormulaScreen: prevState.currentInput,
            };
          })
      );
    }
  }

  componentDidMount() {
    const buttons = document.getElementsByClassName("buttons")[0].childNodes;

    for (let i = 1; i < buttons.length; i++) {
      buttons[i].addEventListener("click", this.handleClick);
    }
  }

  render() {
    /**
     * *KÓD NÍŽE NÁM vyrenderuje CalculatorContainer Children a ZAJISTÍ, ŽE VŠECHNY CHILDREN MAJÍ PŘÍSTUP K PROPS
     */

    const updateChildrenWithProps = React.Children.map(
      this.props.children,
      (child) => {
        return React.cloneElement(child, {
          clearInputOutput: this.clear,
          currentInput: this.state.currentInput,
          currentFormulaScreen: this.state.currentFormulaScreen,
        });
      }
    );
    return <div className="calculator">{updateChildrenWithProps}</div>;
  }
}

export default CalculatorContainer;
