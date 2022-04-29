import React from "react";

class CalculatorContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: "HAHA",
    };
  }

  componentDidMount() {
    const buttons = document
      .querySelectorAll(".buttons")[0]
      .childNodes.forEach((button) => {
        button.addEventListener("click", () => {
          alert(button.id);
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
          text: this.state.test,
        });
      }
    );
    return <div className="calculator">{updateChildrenWithProps}</div>;
  }
}

export default CalculatorContainer;
