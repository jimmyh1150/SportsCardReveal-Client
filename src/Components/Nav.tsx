import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from "reactstrap";
import { IWithAppState, withAppState } from "../AppContext";
import { UserRoles } from "../constants";

class Nav extends React.Component<IWithAppState> {
  handleLogout = () => {
    this.props.setAppState({ session: {}, sportsCards: [], users: [] });
  };
  render() {
    const { session } = this.props.appState;
    return (
      <nav className="header-navbar">
        <Link className="navbar-brand" to={"/home"}>
          Sportscard Reveal
        </Link>
        <UncontrolledDropdown>
          <DropdownToggle>
            <span className="navbar-toggler-icon" />
          </DropdownToggle>
          <DropdownMenu>
            {/* temporary location for add/create sports card link */}
            {/* <Link to="/sportscard/new">Add Card</Link> */}
            {/* <Link to="/sports-cards/edit">Update Card</Link> */}
            {session?.role === UserRoles.Admin && (
              <Link to="/admin">
                <DropdownItem>Admin Settings</DropdownItem>
              </Link>
            )}
            <Link to="/login" onClick={this.handleLogout}>
              <DropdownItem>Logout</DropdownItem>
            </Link>
          </DropdownMenu>
        </UncontrolledDropdown>
        {/* <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link to={"/"} className="nav-link active" aria-current="page">
                Sportscard Reveal
              </Link>
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </div>
          </div> */}
      </nav>
    );
  }
}
export default withAppState(Nav);
