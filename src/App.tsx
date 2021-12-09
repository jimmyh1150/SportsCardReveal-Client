import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {
  AppState,
  IAppState,
  IFullAppState,
  rehydrateSession,
} from "./AppContext";
import FourOhFour from "./Components/FourOhFour";
import Home from "./Components/Home";
import { UserRoles } from "./constants";
import Auth from "./Site/Auth";
import AuthContainer from "./Site/AuthContainer";
import SportscardCreate from "./Components/SportscardCreate";
import SportscardUpdate from "./Components/SportscardUpdate";
import DisplayUsers from "./Components/DisplayUsers";

const defaultState = Object.freeze({
  session: rehydrateSession(),
  users: [],
  sportsCards: [],
});

class App extends React.Component<{}, IFullAppState> {
  setAppState = (newValues: Partial<IAppState>) => {
    if (!newValues) {
      return null;
    }
    this.setState({ ...this.state, ...newValues });
    return null;
  };
  state = {
    ...defaultState,
    setAppState: this.setAppState,
  };

  render() {
    return (
      <BrowserRouter>
        <AppState.Provider value={this.state}>
          <Routes>
            <Route path="/login" element={<Auth />} />
            <Route
              path="/home"
              element={
                <AuthContainer>
                  <Home />
                </AuthContainer>
              }
            />
            <Route
              path="/sportscard/new"
              element={
                <AuthContainer>
                  <SportscardCreate />
                </AuthContainer>
              }
            />

            <Route
              path="/admin"
              element={
                <AuthContainer requiredRole={UserRoles.Admin}>
                  <DisplayUsers />
                </AuthContainer>
              }
            />
            <Route path="*" element={<FourOhFour />} />
          </Routes>
        </AppState.Provider>
      </BrowserRouter>
    );
  }
}

// function App() {
//   return (
//     <BrowserRouter>
//       <div className="App">
//         <Nav />
//         <Auth />
//         {/* <SportscardCreate />
//         <div className="auth-wrapper">
//           <div className="auth-inner">
//             <Routes>
//               <Route path="/home" element={<Home />} />
//               {/* <Route path="/login" element={<Login />} /> */}
//               {/* <Route path="/register" element={<Register />} /> */}
//             </Routes>
//           </div>
//         </div>
//       </div>
//     </BrowserRouter>
//   );
// }

export default App;
