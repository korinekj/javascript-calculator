import React from "react";

class Display extends React.Component {
  render() {
    return <div id="display">{this.props.currentInput}</div>;
  }
}

export default Display;
