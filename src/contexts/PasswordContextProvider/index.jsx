import React, { createContext, useReducer } from 'react';
import PasswordReducer from '../../reducers/PasswordReducer';

const initState = {
  min: 1,
  max: 1,
  amount: 1,
  smallLetters: false,
  capitalLetters: false,
  spaces: false,
  specialCharacters: false,
  numbers: false,
  brackets: false,
};

export const PasswordContext = createContext(initState);

const PasswordContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PasswordReducer, initState);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <PasswordContext.Provider value={[state, dispatch]}>
      {children}
    </PasswordContext.Provider>
  );
};

export default PasswordContextProvider;
