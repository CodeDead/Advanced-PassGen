import React, { createContext, useReducer } from 'react';
import MainReducer from '../../reducers/MainReducer';
import enUs from '../../languages/en_us.json';
import deDe from '../../languages/de_de.json';
import frFr from '../../languages/fr_fr.json';
import nlNl from '../../languages/nl_nl.json';

const languageIndex = localStorage.languageIndex ? parseFloat(localStorage.languageIndex) : 1;
const themeIndex = localStorage.themeIndex ? parseFloat(localStorage.themeIndex) : 0;
const themeType = localStorage.themeType ? localStorage.themeType : 'light';
const autoUpdate = localStorage.autoUpdate ? (localStorage.autoUpdate === 'true') : true;
const languageSelector = localStorage.languageSelector
  ? (localStorage.languageSelector === 'true')
  : true;

const initState = {
  autoUpdate,
  languageIndex,
  languages: [
    deDe,
    enUs,
    frFr,
    nlNl,
  ],
  themeIndex,
  themeType,
  pageIndex: 0,
  update: null,
  error: null,
  languageSelector,
};

export const MainContext = createContext(initState);

const MainContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(MainReducer, initState);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <MainContext.Provider value={[state, dispatch]}>
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;
