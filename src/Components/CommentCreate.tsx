import React, { Component } from "react";
//import { API_SERVER } from "../constants";
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
import APIURL from "../helpers/environment";

type State = {
  content: string;
};

type Props = {
  sessionToken: string | undefined;
  sportscardId: number;
  onClose: () => void;
  refetch: () => void;
};

export default class CreateComment extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      content: "",
    };
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ content: event.target.value });
  };

  createComment = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(this.props);

    fetch(`${APIURL}/comments/comment/${this.props.sportscardId}`, {
      method: "POST",
      body: JSON.stringify({
        comment: {
          content: this.state.content,
          sportscardId: this.props.sportscardId,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.sessionToken}`,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log("comment Error:", error));
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
          Add Comment
        </ModalHeader>
        <ModalBody style={{ backgroundColor: "lightgray" }}>
          <Form>
            <FormGroup>
              <Label htmlFor="cardComment"></Label>
              <Input
                placeholder="Enter Comment"
                name="cardComment"
                type="textarea"
                value={this.state.content}
                onChange={(e) => this.handleChange(e)}
              ></Input>
            </FormGroup>

            <Button
              className="login-button"
              onClick={(e) => this.createComment(e)}
              type="submit"
            >
              Comment
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}
