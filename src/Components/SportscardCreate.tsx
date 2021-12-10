import React, { Component } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
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
class SportscardCreate extends Component<Props, State> {
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

  createSportscard = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fetch(`${API_SERVER}/Sportscard/create`, {
      method: "POST",

      body: JSON.stringify({
        Sportscard: { ...this.state },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.appState.session.sessionToken}`,
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
      <Modal
        style={{
          padding: "25px 25px 25px 25px",
          backgroundColor: "#01730A",
          borderRadius: "10px",
          textAlign: "center",
        }}
        isOpen={true}
      >
        <ModalHeader
          style={{ backgroundColor: "lightgray", justifyContent: "center" }}
        >
          <h3>Add Sports Card</h3>
        </ModalHeader>
        <ModalBody style={{ backgroundColor: "lightgray" }}>
          <Form>
            <FormGroup>
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
                type="select"
                value={this.state.cardBrand}
                onChange={(e) =>
                  this.setState({ cardBrand: String(e.target.value) })
                }
              >
                <option value="" disabled selected hidden>
                  Select a brand...
                </option>
                <option value="Bowman">Bowman</option>
                <option value="Donruss">Donruss</option>
                <option value="Fleer">Fleer</option>
                <option value="Leaf">Leaf</option>
                <option value="Panini">Panini</option>
                <option value="Pinnacle">Pinnacle</option>
                <option value="Score">Score</option>
                <option value="Topps">Topps</option>
                <option value="Upper Deck">Upper Deck</option>
                <option value="Other">Other</option>
              </Input>
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
                this.createSportscard(e);
              }}
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}

export default withNavigation(withAppState(SportscardCreate));
