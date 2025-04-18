import React, { createContext, useReducer } from 'react';
import VaultReducer from '../../reducers/VaultReducer';

const initState = {
  vault: null,
  phrase: '',
};

// eslint-disable-next-line react-refresh/only-export-components
export const VaultContext = createContext(initState);

const VaultContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(VaultReducer, initState);

  return (
    <VaultContext.Provider value={[state, dispatch]}>
      {children}
    </VaultContext.Provider>
  );
};

export default VaultContextProvider;
