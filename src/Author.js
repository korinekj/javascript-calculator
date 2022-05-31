import React from "react";

class Author extends React.Component {
  render() {
    const text = "Designed and Coded by";
    return (
      <div className="author">
        {text}
        <br />
        <a href="https://korinekj.github.io/" target="_blank">
          jK
        </a>
      </div>
    );
  }
}

export default Author;
