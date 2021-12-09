import React, { Component } from "react";
//import { Table, Button } from "reactstrap";
import { API_SERVER } from "../constants";
import {
  addSportsCards,
  //addSportsCards,
  ISportsCard,
  IWithAppState,
  withAppState,
} from "../AppContext";

class DisplaySportscard extends Component<IWithAppState> {
  componentDidMount() {
    this.loadMyCards();
  }
  loadMyCards = () => {
    const url = `${API_SERVER}/sportscard/mine`;
    fetch(url, {
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.appState.user.sessionToken}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.props.setAppState({
          sportsCards: data,
        });
      });
  };
  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Team City</th>
            <th>Team Name</th>
            <th>Sport</th>
            <th>Card Brand</th>
            <th>Year</th>
            <th>Card #</th>
            <th>Description</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.props.appState.sportsCards.map((card) => (
            <SportsCardRow
              key={card.id}
              sessionToken={this.props.appState.user.sessionToken}
              refetch={this.loadMyCards}
              {...card}
            />
          ))}
        </tbody>
      </table>
    );
  }
}
interface ISportsCardRow {
  sessionToken?: string;
  refetch: () => void;
}
class SportsCardRow extends Component<ISportsCard & ISportsCardRow> {
  handleDelete = () => {
    const url = `${API_SERVER}/Sportscard/delete/${this.props.id}`;
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
  handleUpdate = () => {
    const url = `${API_SERVER}/Sportscard/update/${this.props.id}`;
    fetch(url, {
      method: "PUT",
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
        <td>{this.props.playerFirstName}</td>
        <td>{this.props.playerLastName}</td>
        <td>{this.props.playerTeamCity}</td>
        <td>{this.props.playerTeamName}</td>
        <td>{this.props.playerSport}</td>
        <td>{this.props.cardBrand}</td>
        <td>{this.props.cardYear}</td>
        <td>{this.props.cardNumber}</td>
        <td>{this.props.cardDescription}</td>
        <td>
          <button onClick={this.handleUpdate}>Update</button>
          <button onClick={this.handleDelete}>Delete</button>
        </td>
      </tr>
    );
  }
}

export default withAppState(DisplaySportscard);
