import {
  RESET_STATE,
  SET_AUTO_UPDATE,
  SET_CHECKED_FOR_UPDATES,
  SET_COLOR_ON_DARK,
  SET_DEFAULT_SORT_BY_STRENGTH,
  SET_ERROR,
  SET_LANGUAGE_INDEX,
  SET_LANGUAGE_SELECTOR,
  SET_LOADING,
  SET_PAGE_INDEX,
  SET_THEME_INDEX,
  SET_THEME_TYPE,
  SET_TIPS,
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
        languageSelector: false,
        colorOnDark: false,
        tips: true,
        sortByStrength: true,
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
    case SET_CHECKED_FOR_UPDATES:
      return {
        ...state,
        checkedForUpdates: action.payload,
      };
    case SET_COLOR_ON_DARK:
      localStorage.colorOnDark = action.payload;
      return {
        ...state,
        colorOnDark: action.payload,
      };
    case SET_TIPS:
      localStorage.tips = action.payload;
      return {
        ...state,
        tips: action.payload,
      };
    case SET_DEFAULT_SORT_BY_STRENGTH:
      localStorage.sortByStrength = action.payload;
      return {
        ...state,
        sortByStrength: action.payload,
      };
    default:
      return state;
  }
};

export default MainReducer;
