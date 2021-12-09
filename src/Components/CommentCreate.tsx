import React, { Component } from "react";

type State = {
  content: string;
};

type Props = {
  sessionToken: string;
  postId: string;
  fetchpost?: any;
};

export default class CreateComment extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      content: "",
    };
  }

  handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ content: event.target.value });
  };

  handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    fetch(`http://localhost:4000/comments/comment`, {
      method: "POST",
      body: JSON.stringify({
        comment: {
          content: this.state.content,
          sportscardId: this.props.postId,
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
        this.props.fetchpost;
      })
      .catch((error) => console.log("comment Error:", error));
  };

  render() {
    return (
      <div className="create-comment">
        <textarea
          className="commentbox"
          placeholder="Enter comment"
          name="comment"
          value={this.state.content}
          onChange={(e) => this.handleChange(e)}
        />
        <br />
        <button
          className="login-button"
          onClick={(e) => this.handleSubmit(e)}
          type="submit"
        >
          Comment
        </button>
      </div>
    );
  }
}
