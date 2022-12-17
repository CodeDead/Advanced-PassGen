import React, { createContext, useReducer } from 'react';
import VaultReducer from '../../reducers/VaultReducer';

const initState = {
  vault: null,
};

export const VaultContext = createContext(initState);

const VaultContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(VaultReducer, initState);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <VaultContext.Provider value={[state, dispatch]}>
      {children}
    </VaultContext.Provider>
  );
};

export default VaultContextProvider;
