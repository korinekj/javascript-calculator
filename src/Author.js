import React from "react";

class Author extends React.Component {
  render() {
    const text = "Designed and Coded by";
    return (
      <div className="author">
        {text}
        <br />
        <a href="#">jK</a>
      </div>
    );
  }
}

export default Author;
