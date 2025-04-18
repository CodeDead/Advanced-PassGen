import React, { createContext, useReducer } from 'react';
import PasswordReducer from '../../reducers/PasswordReducer';

const characterSet = localStorage.characterSet ? localStorage.characterSet : '';
const includeSymbols = localStorage.includeSymbols
  ? localStorage.includeSymbols
  : '';

const initState = {
  length: 1,
  min: 8,
  max: 30,
  amount: 100,
  smallLetters: true,
  capitalLetters: true,
  spaces: false,
  specialCharacters: true,
  numbers: true,
  brackets: true,
  characterSet,
  includeSymbols,
  useAdvanced: false,
  passwords: null,
  allowDuplicates: true,
  useEmojis: false,
};

// eslint-disable-next-line react-refresh/only-export-components
export const PasswordContext = createContext(initState);

const PasswordContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PasswordReducer, initState);

  return (
    <PasswordContext.Provider value={[state, dispatch]}>
      {children}
    </PasswordContext.Provider>
  );
};

export default PasswordContextProvider;
