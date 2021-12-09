import React, { useCallback } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";

export interface ILogin {
  user: User;
  message: string;
  sessionToken: string;
}

export interface ISportsCard {
  id: number;
  playerFirstName: string;
  playerLastName: string;
  playerTeamCity: string;
  playerTeamName: string;
  playerSport: string;
  cardBrand: string;
  cardYear: string;
  cardNumber: string;
  cardDescription: string;
}

export interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  sessionToken: string;
}

export interface IAppState {
  user: Partial<User>;
  sportsCards: ISportsCard[];
}
export interface IFullAppState extends IAppState {
  setAppState: (newValues: Partial<IAppState>) => null;
}
export interface IWithAppState {
  appState: IAppState;
  setAppState: IFullAppState["setAppState"];
}
export interface IWithNavigation {
  navigate: NavigateFunction;
}
export const rehydrateSession = () => {
  try {
    return JSON.parse(localStorage.getItem("user-session") || "");
  } catch {
    return {};
  }
};

export const addSportsCards = (
  currentCards: ISportsCard[],
  newCards: ISportsCard[] | ISportsCard
) => {
  const addedCards: ISportsCard[] = [];
  return addedCards.concat(
    currentCards,
    Array.isArray(newCards) ? newCards : [newCards]
  );
};

export const AppState = React.createContext<IFullAppState>({
  user: {},
  sportsCards: [],
  setAppState: () => null,
});

export const withAppState = (Component: any) => (props: any) =>
  (
    <AppState.Consumer>
      {({ setAppState, ...appState }: any) => (
        <Component {...props} appState={appState} setAppState={setAppState} />
      )}
    </AppState.Consumer>
  );

export const withNavigation = (Component: any) => (props: any) => {
  const navigate = useNavigate();
  const navigateCB = useCallback(
    (value, opts = undefined) => {
      navigate(value, opts);
    },
    [navigate]
  );
  return <Component {...props} navigate={navigateCB} />;
};
