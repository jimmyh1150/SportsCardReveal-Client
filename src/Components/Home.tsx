import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  //addSportsCards,
  ISportsCard,
  IWithAppState,
  withAppState,
} from "../AppContext";
import { API_SERVER } from "../constants";
import DisplaySportscard from "./DisplaySportscard";

class Home extends Component<IWithAppState> {
  render() {
    return (
      <div>
        <h2>
          Welcome, <br />
          {this.props.appState.user.username}
        </h2>
        <DisplaySportscard />
      </div>
    );
  }
}

export default withAppState(Home);
