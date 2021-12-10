import React, { Component } from "react";
import { Table, Button } from "reactstrap";
//import { API_SERVER } from "../constants";
import APIURL from "../helpers/environment";
import { IWithAppState, withAppState, User } from "../AppContext";
import "./DisplayUsers.css";

class DisplayUsers extends Component<IWithAppState> {
  componentDidMount() {
    this.loadUsers();
  }
  loadUsers = () => {
    const url = `${APIURL}/user/allUsers`;
    fetch(url, {
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.appState.session.sessionToken}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.props.setAppState({
          users: data,
        });
      });
  };
  render() {
    return (
      <div className="admin">
        <div className="admin-menu">
          <h1>Users</h1>
        </div>
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Username</th>
              <th>Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.appState.users.map((user) => (
              <UserRow
                key={user.id}
                sessionToken={this.props.appState.session.sessionToken}
                refetch={this.loadUsers}
                {...user}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
interface IUserRow {
  sessionToken?: string;
  refetch: () => void;
}
class UserRow extends Component<User & IUserRow> {
  handleDelete = () => {
    const url = `${APIURL}/user/delete/${this.props.id}`;
    fetch(url, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.sessionToken}`,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw response.json();
        }
        this.props.refetch();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    return (
      <tr>
        <td>{this.props.email}</td>
        <td>{this.props.username}</td>
        <td>{this.props.role}</td>
        <td>
          <button onClick={this.handleDelete}>Delete</button>
        </td>
      </tr>
    );
  }
}

export default withAppState(DisplayUsers);
