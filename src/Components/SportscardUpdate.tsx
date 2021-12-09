import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import {
  addSportsCards,
  IWithAppState,
  IWithNavigation,
  withAppState,
  withNavigation,
} from "../AppContext";
import { API_SERVER } from "../constants";

type State = {
  playerFirstName: string;
  playerLastName: string;
  playerTeamCity: string;
  playerTeamName: string;
  playerSport: string;
  cardBrand: string;
  cardYear: string;
  cardNumber: string;
  cardDescription: string;
};

interface Props extends IWithAppState, IWithNavigation {}
class SportscardUpdate extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      playerFirstName: "",
      playerLastName: "",
      playerTeamCity: "",
      playerTeamName: "",
      playerSport: "",
      cardBrand: "",
      cardYear: "",
      cardNumber: "",
      cardDescription: "",
    };
  }

  updateSportscard = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fetch(`${API_SERVER}/Sportscard/update`, {
      method: "PUT",

      body: JSON.stringify({
        Sportscard: { ...this.state },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.appState.user.sessionToken}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({
          playerFirstName: "",
          playerLastName: "",
          playerTeamCity: "",
          playerTeamName: "",
          playerSport: "",
          cardBrand: "",
          cardYear: "",
          cardNumber: "",
          cardDescription: "",
        });
        this.props.setAppState({
          sportsCards: addSportsCards(this.props.appState.sportsCards, data),
        });
        this.props.navigate("/home");
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <Form>
          <FormGroup>
            <h3>New Sports Entry</h3>
            <Label htmlFor="playerFirstName">First Name</Label>
            <Input
              placeholder="First Name"
              name="playerFirstName"
              type="text"
              value={this.state.playerFirstName}
              onChange={(e) =>
                this.setState({ playerFirstName: String(e.target.value) })
              }
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="playerLastName">Last Name</Label>
            <Input
              placeholder="Last Name"
              name="playerLastName"
              type="text"
              value={this.state.playerLastName}
              onChange={(e) =>
                this.setState({ playerLastName: String(e.target.value) })
              }
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="playerTeamCity">Team City</Label>
            <Input
              placeholder="Team City"
              name="playerTeamCity"
              type="text"
              value={this.state.playerTeamCity}
              onChange={(e) =>
                this.setState({ playerTeamCity: String(e.target.value) })
              }
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="playerTeamName">Team Name</Label>
            <Input
              placeholder="Team Name"
              name="playerTeamName"
              type="text"
              value={this.state.playerTeamName}
              onChange={(e) =>
                this.setState({ playerTeamName: String(e.target.value) })
              }
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label for="sportSelect">Sport</Label>
            <Input
              type="select"
              name="sportSelect"
              id="sportSelect"
              placeholder="Select One"
              onChange={(e) =>
                this.setState({ playerSport: String(e.target.value) })
              }
            >
              <option value="" disabled selected hidden>
                Select a sport...
              </option>
              <option value="Baseball">Baseball</option>
              <option value="Basketball">Basketball</option>
              <option value="Football">Football</option>
              <option value="Hockey">Hockey</option>
              <option value="Soccer">Soccer</option>
              <option value="Other">Other</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="cardBrand">Card Brand</Label>
            <Input
              placeholder="Brand"
              name="cardBrand"
              type="text"
              value={this.state.cardBrand}
              onChange={(e) =>
                this.setState({ cardBrand: String(e.target.value) })
              }
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="cardYear">Year</Label>
            <Input
              placeholder="Year"
              name="cardYear"
              type="text"
              value={this.state.cardYear}
              onChange={(e) =>
                this.setState({ cardYear: String(e.target.value) })
              }
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="cardNumber">Card #</Label>
            <Input
              placeholder="#"
              name="cardNumber"
              type="text"
              value={this.state.cardNumber}
              onChange={(e) =>
                this.setState({ cardNumber: String(e.target.value) })
              }
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="cardDescription">Description</Label>
            <Input
              placeholder="Enter a description..."
              name="cardDescription"
              type="textarea"
              value={this.state.cardDescription}
              onChange={(e) =>
                this.setState({ cardDescription: String(e.target.value) })
              }
            ></Input>
          </FormGroup>

          <Button
            onClick={(e) => {
              this.updateSportscard(e);
            }}
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default withNavigation(withAppState(SportscardUpdate));
