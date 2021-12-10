import React from "react";
import { Link } from "react-router-dom";

export default class FourOhFour extends React.Component {
  render() {
    return (
      <div>
        <h1>404</h1>
        <p>Oops you found a broken page....try again</p>
        <Link to="home">Go back to home</Link>
      </div>
    );
  }
}
