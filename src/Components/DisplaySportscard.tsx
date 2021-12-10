import React, { Component } from "react";
//import { Table, Button } from "reactstrap";
import { API_SERVER } from "../constants";
import APIURL from "../helpers/environment";
import { ISportsCard, IWithAppState, withAppState } from "../AppContext";
import SportscardUpdate from "./SportscardUpdate";
import CommentCreate from "./CommentCreate";
import "./DisplaySportscard.css";

class DisplaySportscard extends Component<IWithAppState> {
  componentDidMount() {
    this.loadMyCards();
  }
  loadMyCards = () => {
    console.log(APIURL);
    const url = `${APIURL}/sportscard/mine`;
    fetch(url, {
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.appState.session.sessionToken}`,
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
      <div>
        <div className="title">
          <h1>My Cards</h1>
        </div>
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
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {this.props.appState.sportsCards.map((card) => (
              <SportsCardRow
                key={card.id}
                sessionToken={this.props.appState.session.sessionToken}
                refetch={this.loadMyCards}
                sportsCard={card}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
interface ISportsCardRow {
  sessionToken?: string;
  refetch: () => void;
  sportsCard: ISportsCard;
}
class SportsCardRow extends Component<
  ISportsCardRow,
  { isEditing: boolean; isCommenting: boolean }
> {
  state = { isEditing: false, isCommenting: false };
  handleDelete = () => {
    const url = `${APIURL}/Sportscard/delete/${this.props.sportsCard.id}`;
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

  handleToggleEdit = () => {
    this.setState({ isEditing: !this.state.isEditing });
  };

  handleCommentCreate = () => {
    this.setState({ isCommenting: !this.state.isCommenting });
  };

  render() {
    const { sportsCard } = this.props;

    return (
      <>
        {this.state.isEditing && (
          <SportscardUpdate
            sportsCard={this.props.sportsCard}
            onClose={this.handleToggleEdit}
            refetch={this.props.refetch}
          />
        )}
        {this.state.isCommenting && (
          <CommentCreate
            sportscardId={this.props.sportsCard.id}
            onClose={this.handleCommentCreate}
            refetch={this.props.refetch}
            sessionToken={this.props.sessionToken}
          />
        )}

        <tr>
          <td>{sportsCard.playerFirstName}</td>
          <td>{sportsCard.playerLastName}</td>
          <td>{sportsCard.playerTeamCity}</td>
          <td>{sportsCard.playerTeamName}</td>
          <td>{sportsCard.playerSport}</td>
          <td>{sportsCard.cardBrand}</td>
          <td>{sportsCard.cardYear}</td>
          <td>{sportsCard.cardNumber}</td>
          <td>{sportsCard.cardDescription}</td>
          <td>
            <button onClick={this.handleToggleEdit}>Edit</button>
            <button onClick={this.handleCommentCreate}>Comment</button>
            <button onClick={this.handleDelete}>Delete</button>
          </td>
        </tr>
      </>
    );
  }
}

export default withAppState(DisplaySportscard);
