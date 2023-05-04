import React, { createContext, useReducer } from 'react';
import PasswordReducer from '../../reducers/PasswordReducer';

const characterSet = localStorage.characterSet ? localStorage.characterSet : '';

const initState = {
  length: 1,
  min: 1,
  max: 30,
  amount: 1,
  smallLetters: false,
  capitalLetters: false,
  spaces: false,
  specialCharacters: false,
  numbers: false,
  brackets: false,
  characterSet,
  useAdvanced: false,
  passwords: null,
  allowDuplicates: true,
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
