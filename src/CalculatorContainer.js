import React from "react";

class CalculatorContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentInput: 0,
      currentFormulaScreen: "",
    };

    this.array = [];

    this.clear = this.clear.bind(this);
    this.test = this.test.bind(this);
  }

  clear() {
    this.array = [];
    this.setState({
      currentInput: 0,
    });
  }

  test(event) {
    const operators = [":", "*", "-", "+"];
    const clickedButton = event.target.value;

    if (operators.includes(clickedButton)) {
      console.log("kliknul si na početní operaci");
      switch (clickedButton) {
        case ":":
          console.log("dělení");
          break;
        case "*":
          console.log("násobení");
          break;
        case "-":
          console.log("odečítání");
          break;
        case "+":
          console.log("sčítání");
          break;
        default:
          console.log("Test");
      }
    } else if (clickedButton === "=") {
      console.log("kliknul jsi na rovná se");
    } else {
      const value = parseInt(clickedButton);

      // uloží nakliknuté čísla do pole, pole převede string, kde jsou všechna čísla pohromadě, poté převede na Integer
      this.array.push(value);
      const newArray = this.array.join("");
      const integerArray = parseInt(newArray);

      this.setState({
        currentInput: integerArray,
      });
    }
  }

  componentDidMount() {
    const buttons = document.getElementsByClassName("buttons")[0].childNodes;

    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", this.test);
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
