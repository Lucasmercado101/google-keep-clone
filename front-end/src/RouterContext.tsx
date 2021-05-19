import { useContext } from "react";
import { useMachine } from "@xstate/react";
import { createContext } from "react";
import { routerMachine } from "./routerMachine";

export const FSMContext = createContext<any>([]);

const RouterContext: React.FC = ({ children }) => {
  const machineInstance = useMachine(routerMachine);
  return (
    <FSMContext.Provider value={machineInstance}>
      {children}
    </FSMContext.Provider>
  );
};

export const useRouterFSM = () => useContext(FSMContext);

export default RouterContext;
