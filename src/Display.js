import React from "react";

class Display extends React.Component {
  render() {
    return (
      <div id="display">
        {this.props.text}
        <p>{this.props.vozy}</p>
      </div>
    );
  }
}

export default Display;
