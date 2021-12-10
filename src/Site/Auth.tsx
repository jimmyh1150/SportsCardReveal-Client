import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from "reactstrap";

import {
  ILogin,
  IWithAppState,
  IWithNavigation,
  withAppState,
  withNavigation,
} from "../AppContext";
import { API_SERVER, UserRoles } from "../constants";
import APIURL from "../helpers/environment";

type State = {
  isLogin: boolean;
  loading: boolean;
  error: string;
  email: string;
  username: string;
  password: string;
  role: string;
};

interface Props extends IWithAppState, IWithNavigation {}

class Auth extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isLogin: true,
      loading: false,
      error: "",
      email: "",
      username: "",
      password: "",
      role: "",
    };
  }
  title = () => {
    return !this.state.isLogin ? "Signup" : "Login";
  };

  loginToggle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    this.setState({
      isLogin: !this.state.isLogin,
    });
  };

  handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      email: e.target.value,
    });
  };

  handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      username: e.target.value,
    });
  };
  handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      password: e.target.value,
    });
  };

  handleRoleChange = (role) => () => {
    this.setState({ role });
  };

  validate = () => {
    const { username, email, password, role, isLogin } = this.state;
    let isValid = true;
    let message = "";
    if (!password) {
      isValid = false;
      message = "Password is required.";
    } else if (!email) {
      isValid = false;
      message = "Email is required.";
    } else if (!username && !isLogin) {
      isValid = false;
      message = "Username is required.";
    } else if (!role && !isLogin) {
      isValid = false;
      message = "Role is required.";
    }

    return { isValid, message };
  };

  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { isValid, message } = this.validate();
    if (!isValid) {
      this.setState({ error: message });
      return;
    }
    const { isLogin, email, password, username, role } = this.state;
    const body = isLogin
      ? {
          user: {
            email,
            password,
          },
        }
      : {
          user: {
            email,
            username,
            password,
            role,
          },
        };

    const url = `${APIURL}/user/${isLogin ? "login" : "register"}`;

    this.setState({ loading: true });
    fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data: ILogin) => {
        console.log(data);
        const session = { ...data.user, sessionToken: data.sessionToken };

        this.setState({ loading: false });
        localStorage.setItem("user-session", JSON.stringify(session));
        this.props.setAppState({ session });
        this.props.navigate("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    const { isLogin, loading, error, role, email, username, password } =
      this.state;
    return (
      <section id="login-page">
        <Form onSubmit={this.handleSubmit}>
          <h1>{this.title()}</h1>
          <FormGroup>
            <Label>Email</Label>
            <Input
              onChange={(e) => this.handleEmail(e)}
              type="email"
              name="email"
              placeholder="Email"
              id="email"
              value={email}
            />
          </FormGroup>
          {!isLogin && (
            <FormGroup>
              <Label>Username</Label>
              <Input
                onChange={(e) => this.handleUsername(e)}
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                value={username}
              />
            </FormGroup>
          )}
          <FormGroup>
            <Label>Password</Label>
            <Input
              onChange={(e) => this.handlePassword(e)}
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
            />
          </FormGroup>
          {!isLogin && (
            <UncontrolledDropdown>
              <DropdownToggle caret>{role || "Choose Role..."}</DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={this.handleRoleChange(UserRoles.Admin)}>
                  Admin
                </DropdownItem>
                <DropdownItem onClick={this.handleRoleChange(UserRoles.User)}>
                  User
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          )}
          {!!error && <p style={{ color: "red" }}>{error}</p>}
          <Button
            disabled={loading}
            type="submit"
            className="btn-lg btn-dark btn-block"
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
          <button
            onClick={(e) => this.loginToggle(e)}
            style={{ cursor: "pointer" }}
          >
            <u>{isLogin ? "Register" : "Already have an account? Sign in!"}</u>
          </button>
        </Form>
      </section>
    );
  }
}
export default withNavigation(withAppState(Auth));
