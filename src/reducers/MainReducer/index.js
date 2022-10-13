import {
  RESET_STATE,
  SET_LANGUAGE_INDEX, SET_PAGE_INDEX,
  SET_THEME_INDEX,
  SET_THEME_TYPE,
} from './Actions/actionTypes';

const MainReducer = (state, action) => {
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
        languageIndex: 0,
        themeIndex: 0,
        themeType: 'light',
      };
    default:
      return state;
  }
};

export default MainReducer;
