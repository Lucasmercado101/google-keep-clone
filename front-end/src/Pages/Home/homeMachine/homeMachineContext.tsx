import { useContext } from "react";
import { useMachine } from "@xstate/react";
import { createContext } from "react";
import { routerMachine } from "./index";

export const homeMachineFSM = createContext<any>([]);

const HomeMachineContext: React.FC = ({ children }) => {
  const machineInstance = useMachine(routerMachine);

  return (
    <homeMachineFSM.Provider value={machineInstance}>
      {children}
    </homeMachineFSM.Provider>
  );
};

export const useHomeMachineFSM = () => useContext(homeMachineFSM);

export default HomeMachineContext;
