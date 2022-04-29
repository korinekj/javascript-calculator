import React from "react";

class CalculatorContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentInput: 0,
    };
  }

  componentDidMount() {
    const buttons = document
      .querySelectorAll(".buttons")[0]
      .childNodes.forEach((button) => {
        button.addEventListener("click", (e) => {
          this.setState({
            currentInput: e.target.value,
          });
        });
      });
  }

  render() {
    /**
     * *KÓD NÍŽE NÁM ZAJISTÍ, ŽE VŠECHNY CHILDREN MAJÍ PŘÍSTUP K PROPS
     */
    const updateChildrenWithProps = React.Children.map(
      this.props.children,
      (child) => {
        return React.cloneElement(child, {
          currentInput: this.state.currentInput,
        });
      }
    );
    return <div className="calculator">{updateChildrenWithProps}</div>;
  }
}

export default CalculatorContainer;
