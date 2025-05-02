import React, { createContext, useReducer } from 'react';
import deDe from '../../languages/de_de.json';
import enUs from '../../languages/en_us.json';
import esEs from '../../languages/es_es.json';
import frFr from '../../languages/fr_fr.json';
import jpJp from '../../languages/jp_jp.json';
import nlNl from '../../languages/nl_nl.json';
import ruRu from '../../languages/ru_ru.json';
import trTR from '../../languages/tr_tr.json';
import zhCn from '../../languages/zh_cn.json';
import MainReducer from '../../reducers/MainReducer';

const languageIndex = localStorage.languageIndex
  ? parseFloat(localStorage.languageIndex)
  : 1;
const themeIndex = localStorage.themeIndex
  ? parseFloat(localStorage.themeIndex)
  : 0;
const themeType = localStorage.themeType ? localStorage.themeType : 'light';
const autoUpdate = localStorage.autoUpdate
  ? localStorage.autoUpdate === 'true'
  : true;
const colorOnDark = localStorage.colorOnDark
  ? localStorage.colorOnDark === 'true'
  : false;
const languageSelector = localStorage.languageSelector
  ? localStorage.languageSelector === 'true'
  : false;
const tips = localStorage.tips ? localStorage.tips === 'true' : true;
const sortByStrength = localStorage.sortByStrength
  ? localStorage.sortByStrength === 'true'
  : true;

const initState = {
  autoUpdate,
  languageIndex,
  languages: [deDe, enUs, esEs, frFr, jpJp, nlNl, ruRu, zhCn, trTR],
  themeIndex,
  themeType,
  pageIndex: 0,
  update: null,
  checkedForUpdates: false,
  error: null,
  languageSelector,
  loading: false,
  colorOnDark,
  tips,
  sortByStrength,
};

// eslint-disable-next-line react-refresh/only-export-components
export const MainContext = createContext(initState);

const MainContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(MainReducer, initState);

  return (
    <MainContext.Provider value={[state, dispatch]}>
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;
