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
  }

  clear() {
    this.setState({
      currentInput: "0",
      currentFormulaScreen: "",
      prevInput: "",
    });
  }

  handleClick(event) {
    const operators = [":", "*", "-", "+", "="];
    const clickedButton = event.target.value;

    if (operators.includes(clickedButton)) {
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
        case "=":
          console.log("rovná se");
          break;
      }
    } else {
      console.log("something else");

      let test = parseInt(this.state.prevInput) || 0;
      console.log(test);
      let test1 = parseInt(clickedButton) || ".";
      console.log(typeof test1);

      this.setState(
        {
          currentInput: test + test1,
        },
        () => {
          this.setState((prevState) => ({
            prevInput: prevState.currentInput,
          }));
        }
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
