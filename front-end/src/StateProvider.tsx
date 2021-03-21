import { observable } from "mobx";
import { createContext } from "react";

type state = {
  userData: null | { [key: string]: any };
  isMenuExpanded: boolean;
  darkMode: boolean;
};

export const GlobalStateContext = createContext<state>(
  observable({
    userData: null,
    isMenuExpanded: false,
    darkMode: window.matchMedia("(prefers-color-scheme: dark)").matches
  })
);

const StateProvider: React.FC = ({ children }) => {
  return (
    <GlobalStateContext.Provider
      value={observable({
        userData: null,
        isMenuExpanded: false,
        darkMode: window.matchMedia("(prefers-color-scheme: dark)").matches
      })}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export default StateProvider;
