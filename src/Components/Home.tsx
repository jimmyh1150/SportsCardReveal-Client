import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import {
  //addSportsCards,
  ISportsCard,
  IWithAppState,
  withAppState,
} from "../AppContext";
//import { API_SERVER } from "../constants";
import DisplaySportscard from "./DisplaySportscard";

class Home extends Component<IWithAppState> {
  render() {
    return (
      <div>
        <h2>
          Welcome, <br />
          {this.props.appState.session.username}
        </h2>
        {/* <Link className="navbar-brand" to={"/sportscard/new"}>
          Add Card
        </Link> */}
        <Button variant="success" href="/sportscard/new">
          Add Card
        </Button>
        <div>
          <DisplaySportscard />
        </div>
      </div>
    );
  }
}

export default withAppState(Home);
