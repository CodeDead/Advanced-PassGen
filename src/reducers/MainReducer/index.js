import {
  RESET_STATE,
  SET_AUTO_UPDATE,
  SET_ERROR,
  SET_FIXED_MENU,
  SET_LANGUAGE_INDEX,
  SET_LANGUAGE_SELECTOR,
  SET_LOADING,
  SET_PAGE_INDEX,
  SET_THEME_INDEX,
  SET_THEME_TYPE,
  SET_UPDATE,
} from './Actions/actionTypes';

const MainReducer = (state, action) => {
  if (!action || !action.type) {
    return state;
  }
  switch (action.type) {
    case SET_LANGUAGE_INDEX:
      localStorage.languageIndex = action.payload;
      return {
        ...state,
        languageIndex: action.payload,
      };
    case SET_THEME_INDEX:
      localStorage.themeIndex = action.payload;
      return {
        ...state,
        themeIndex: action.payload,
      };
    case SET_THEME_TYPE:
      localStorage.themeType = action.payload;
      return {
        ...state,
        themeType: action.payload,
      };
    case SET_PAGE_INDEX:
      return {
        ...state,
        pageIndex: action.payload,
      };
    case RESET_STATE:
      localStorage.clear();
      return {
        ...state,
        languageIndex: 1,
        themeIndex: 0,
        themeType: 'light',
        autoUpdate: true,
        languageSelector: true,
        fixedMenu: false,
      };
    case SET_AUTO_UPDATE:
      localStorage.autoUpdate = action.payload;
      return {
        ...state,
        autoUpdate: action.payload,
      };
    case SET_UPDATE:
      return {
        ...state,
        update: action.payload,
      };
    case SET_LANGUAGE_SELECTOR:
      localStorage.languageSelector = action.payload;
      return {
        ...state,
        languageSelector: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case SET_FIXED_MENU:
      localStorage.fixedMenu = action.payload;
      return {
        ...state,
        fixedMenu: action.payload,
      };
    default:
      return state;
  }
};

export default MainReducer;
