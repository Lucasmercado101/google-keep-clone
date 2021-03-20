import { observable } from "mobx";
import { createContext } from "react";

type state = {
  userData: null | { [key: string]: any };
  isMenuExpanded: boolean;
};

export const GlobalStateContext = createContext<state>(
  observable({ userData: null, isMenuExpanded: false })
);

const StateProvider: React.FC = ({ children }) => {
  return (
    <GlobalStateContext.Provider
      value={observable({ userData: null, isMenuExpanded: false })}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export default StateProvider;
