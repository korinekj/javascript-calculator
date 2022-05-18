import { click } from "@testing-library/user-event/dist/click";
import React from "react";

class CalculatorContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prevInput: "",
      prevOperator: "",
      currentInput: "0",
      currentFormulaScreen: "",
      evaluated: false,
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
        prevOperator: "",
        evaluated: false,
      };
    });
  }

  calculate() {
    const fullFormula = this.state.currentFormulaScreen;

    this.setState(
      {
        currentInput: eval(fullFormula),
        evaluated: true,
      },
      () => {
        return {};
      }
    );
  }

  decimal() {
    const prevOperators = ["*", "+", "-", "/"];
    const regex = /[\-+*/]/;
    document.getElementById("decimal").disabled = true;
    document.getElementById("zero").disabled = false;
    console.log(this.state.currentInput);

    //pokud currentInput není 0 NEBO currentFormula není ""
    if (
      this.state.currentInput !== "0" ||
      this.state.currentFormulaScreen !== ""
    ) {
      console.log(prevOperators.includes(this.state.currentInput));
      if (prevOperators.includes(this.state.currentInput)) {
        this.setState((prevState) => {
          return {
            currentInput: "0",
            currentFormulaScreen: prevState.currentFormulaScreen + "0",
          };
        });
      }
      if (
        this.state.currentInput === "0" &&
        this.state.currentFormulaScreen
          .charAt(this.state.currentFormulaScreen.length - 1)
          .match(regex)
      ) {
        this.setState((prevState) => {
          console.log("i am here bitch");
          return {
            currentFormulaScreen: prevState.currentFormulaScreen + "0",
          };
        });
      }
      this.setState(
        (prevState) => {
          console.log("i am here");
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
          console.log("and im here");
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
    const prevOperators = ["*", "+", "-"];
    console.log(this.state.currentInput);

    if (this.state.currentInput !== "/") {
      if (prevOperators.includes(this.state.currentInput)) {
        this.setState((prevState) => {
          return {
            currentFormulaScreen: prevState.currentFormulaScreen.replace(
              /[-+*/]*[/\-+*]$/,
              ""
            ),
          };
        });
      }
      this.setState(
        (prevState) => {
          console.log(this.state.currentFormulaScreen);
          return {
            currentInput: "/",
            prevInput: "",
            currentFormulaScreen:
              prevState.evaluated === true
                ? prevState.currentInput
                : prevState.currentFormulaScreen,
          };
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
    this.setState({
      prevInput: "",
    });
  }

  multiply() {
    const prevOperators = ["/", "+", "-"];

    if (this.state.currentInput !== "*") {
      if (prevOperators.includes(this.state.currentInput)) {
        this.setState((prevState) => {
          return {
            currentFormulaScreen: prevState.currentFormulaScreen.replace(
              /[-+*/]*[/\-+*]$/,
              ""
            ),
          };
        });
      }
      this.setState(
        (prevState) => {
          console.log(this.state.currentFormulaScreen);
          return {
            currentInput: "*",
            prevInput: "",
            currentFormulaScreen:
              prevState.evaluated === true
                ? prevState.currentInput
                : prevState.currentFormulaScreen,
          };
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
  }

  subtraction() {
    if (this.state.currentInput !== "-") {
      this.setState(
        (prevState) => {
          console.log(this.state.currentFormulaScreen);
          return {
            currentInput: "-",
            prevInput: "",
            currentFormulaScreen:
              prevState.evaluated === true
                ? prevState.currentInput
                : prevState.currentFormulaScreen,
          };
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
  }

  addition() {
    const prevOperators = ["/", "*", "-"];

    if (this.state.currentInput !== "+") {
      if (prevOperators.includes(this.state.currentInput)) {
        this.setState((prevState) => {
          return {
            currentFormulaScreen: prevState.currentFormulaScreen.replace(
              /[-+*/]*[/\-+*]$/,
              ""
            ),
          };
        });
      }
      this.setState(
        (prevState) => {
          console.log(this.state.currentFormulaScreen);
          return {
            currentInput: "+",
            prevInput: "",
            currentFormulaScreen:
              prevState.evaluated === true
                ? prevState.currentInput
                : prevState.currentFormulaScreen,
          };
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
            console.log(prevState.currentInput);
            if (prevState.currentInput === "0") {
              document.getElementById("zero").disabled = true;
            }

            return {
              prevInput:
                prevState.currentInput === "0" ? "" : prevState.currentInput,
              currentFormulaScreen: (function () {
                if (
                  prevState.currentInput === "0" &&
                  prevState.currentFormulaScreen.charAt(
                    prevState.currentFormulaScreen.length - 1
                  ) === "0"
                ) {
                  return prevState.currentFormulaScreen.slice(0, -1);
                } else if (prevState.currentFormulaScreen !== 0) {
                  return prevState.currentFormulaScreen;
                }
              })(),
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
