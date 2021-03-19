import { observable } from "mobx";
import { createContext } from "react";

type state = {
  userData: null | { [key: string]: any };
};

export const GlobalStateContext = createContext<state>(
  observable({ userData: null })
);

const StateProvider: React.FC = ({ children }) => {
  return (
    <GlobalStateContext.Provider value={observable({ userData: null })}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export default StateProvider;
