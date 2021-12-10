import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { IWithAppState, withAppState } from "../AppContext";

import Nav from "../Components/Nav";
import { UserRoles } from "../constants";

class AuthContainer extends React.Component<
  IWithAppState & { requiredRole?: UserRoles }
> {
  needsRedirect = () => {
    return (
      !this.props.appState?.session?.email &&
      !window.location.pathname.includes("login")
    );
  };
  render() {
    if (this.needsRedirect()) {
      console.log("auth-container: no user, redirect login");
      return <RedirectHandler to="/login" />;
    }
    if (
      this.props.requiredRole &&
      this.props.appState?.session?.role !== this.props.requiredRole
    ) {
      console.log("auth-container: invalid role, redirect home");
      return <RedirectHandler />;
    }
    return (
      <main id="app-main">
        <header id="app-header">
          <Nav />
        </header>
        <section id="app-content">{this.props.children}</section>
      </main>
    );
  }
}

// Have to use a functional component to handle navigation with
// React Router as it only exposes a hook method to navigate
function RedirectHandler({ to = "/home" }) {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(to);
  }, [navigate, to]);
  return null;
}

export default withAppState(AuthContainer);
