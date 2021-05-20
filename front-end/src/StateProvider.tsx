import { observable } from "mobx";
import { createContext } from "react";

type state = {
  userData: null | { [key: string]: any };
  darkMode: boolean;
  listView: boolean;
};

export const GlobalStateContext = createContext<state>(
  observable({
    userData: null,
    darkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
    listView: false
  })
);

const StateProvider: React.FC = ({ children }) => {
  return (
    <GlobalStateContext.Provider
      value={observable({
        userData: null,
        darkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
        listView: false
      })}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export default StateProvider;
