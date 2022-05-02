import React from "react";

class CalculatorContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentInput: 5,
      currentFormulaScreen: "",
    };

    this.clear = this.clear.bind(this);
    this.test = this.test.bind(this);
  }

  clear() {
    this.setState({
      currentInput: 0,
    });
  }

  test(event) {
    const operators = [":", "*", "-", "+"];
    const clickedButton = event.target.value;

    if (operators.includes(clickedButton)) {
      alert("kliknul si na početní operaci");
      switch (clickedButton) {
        case ":":
          alert("dělení");
          break;
        case "*":
          alert("násobení");
          break;
        case "-":
          alert("odečítání");
          break;
        case "+":
          alert("sčítání");
          break;
        default:
          console.log("Test");
      }
    } else if (clickedButton === "=") {
      alert("kliknul jsi na rovná se");
    } else {
      const value = parseInt(clickedButton);

      this.setState({
        currentInput: value,
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
