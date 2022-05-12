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
    this.calculate = this.calculate.bind(this);

    this.decimal = this.decimal.bind(this);
    this.division = this.division.bind(this);
    this.multiply = this.multiply.bind(this);
    this.subtraction = this.subtraction.bind(this);
    this.addition = this.addition.bind(this);

    this.handleClick = this.handleClick.bind(this);
  }

  clear() {
    document.getElementById("decimal").disabled = false;
    this.setState(() => {
      return {
        currentInput: "0",
        currentFormulaScreen: "",
        prevInput: "",
      };
    });
  }

  calculate() {
    const fullFormula = this.state.currentFormulaScreen;
    console.log(fullFormula);

    const regex = /[-+/*]/;
    const fullFormulaToArray = fullFormula.split(regex);

    console.log(fullFormulaToArray);
  }

  decimal() {
    document.getElementById("decimal").disabled = true;
    document.getElementById("zero").disabled = false;

    //pokud currentInput není 0 NEBO currentFormula není 0
    if (
      this.state.currentInput !== 0 ||
      this.state.currentFormulaScreen !== 0
    ) {
      this.setState(
        (prevState) => {
          return {
            currentInput: prevState.currentInput + ".",
            currentFormulaScreen: prevState.currentFormulaScreen + ".",
          };
        },
        () =>
          this.setState((prevState) => {
            return {
              prevInput: prevState.currentInput,
            };
          })
      );
    } else {
      this.setState(
        (prevState) => {
          return {
            currentInput: prevState.currentInput + ".",
            currentFormulaScreen: "0.",
          };
        },
        () =>
          this.setState((prevState) => {
            return {
              prevInput: prevState.currentInput,
            };
          })
      );
    }
  }

  division() {
    this.setState(
      {
        currentInput: "/",
        prevInput: "",
      },
      () =>
        this.setState((prevState) => {
          document.getElementById("decimal").disabled = false;
          return {
            currentFormulaScreen:
              prevState.currentFormulaScreen + prevState.currentInput,
          };
        })
    );
  }

  multiply() {
    this.setState(
      {
        currentInput: "*",
        prevInput: "",
      },
      () =>
        this.setState((prevState) => {
          document.getElementById("decimal").disabled = false;
          return {
            currentFormulaScreen:
              prevState.currentFormulaScreen + prevState.currentInput,
          };
        })
    );
  }

  subtraction() {
    this.setState(
      {
        currentInput: "-",
        prevInput: "",
      },
      () =>
        this.setState((prevState) => {
          document.getElementById("decimal").disabled = false;
          return {
            currentFormulaScreen:
              prevState.currentFormulaScreen + prevState.currentInput,
          };
        })
    );
  }

  addition() {
    this.setState(
      {
        currentInput: "+",
        prevInput: "",
      },
      () =>
        this.setState((prevState) => {
          document.getElementById("decimal").disabled = false;
          return {
            currentFormulaScreen:
              prevState.currentFormulaScreen + prevState.currentInput,
          };
        })
    );
  }

  handleClick(event) {
    const operators = ["/", "*", "-", "+", "=", "."];
    const clickedButton = event.target.value;

    if (operators.includes(clickedButton)) {
      switch (clickedButton) {
        case "/":
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
          this.calculate();
          break;
        case ".":
          this.decimal();
      }
    } else {
      document.getElementById("zero").disabled = false;
      this.setState(
        (prevState) => {
          return {
            currentInput: prevState.prevInput + clickedButton,
            currentFormulaScreen:
              prevState.currentFormulaScreen + clickedButton,
          };
        },
        () =>
          this.setState((prevState) => {
            if (prevState.currentInput === "0") {
              document.getElementById("zero").disabled = true;
            }
            return {
              prevInput: prevState.currentInput,
            };
          })
      );
    }
  }

  componentDidMount() {
    const buttons = document.getElementsByClassName("buttons")[0].childNodes;

    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", this.handleClick);
    }
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.currentInput.includes(".")) {
  //     document.getElementById("decimal").disabled = true;
  //   }
  // }

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
