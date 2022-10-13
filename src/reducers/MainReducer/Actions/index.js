import {
  RESET_STATE,
  SET_LANGUAGE_INDEX,
  SET_PAGE_INDEX,
  SET_THEME_INDEX,
  SET_THEME_TYPE,
} from './actionTypes';

export const setLanguageIndex = (index) => ({
  type: SET_LANGUAGE_INDEX,
  payload: index,
});

export const setThemeIndex = (index) => ({
  type: SET_THEME_INDEX,
  payload: index,
});

export const setThemeType = (type) => ({
  type: SET_THEME_TYPE,
  payload: type,
});

export const resetState = () => ({
  type: RESET_STATE,
});

export const setPageIndex = (index) => ({
  type: SET_PAGE_INDEX,
  payload: index,
});
