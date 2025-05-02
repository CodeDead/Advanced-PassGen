import { invoke } from '@tauri-apps/api/core';
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

export const setAutoUpdate = (value) => ({
  type: SET_AUTO_UPDATE,
  payload: value,
});

export const openWebSite = (website) => {
  if (window.__TAURI__) {
    invoke('open_website', { website }).catch((e) => {
      console.error(e);
    });
  } else {
    window.open(website, '_blank'); // We're running in a browser
  }
};

export const setUpdate = (update) => ({
  type: SET_UPDATE,
  payload: update,
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});

export const setLanguageSelector = (value) => ({
  type: SET_LANGUAGE_SELECTOR,
  payload: value,
});

export const setLoading = (value) => ({
  type: SET_LOADING,
  payload: value,
});

export const setCheckedForUpdates = (value) => ({
  type: SET_CHECKED_FOR_UPDATES,
  payload: value,
});

export const setColorOnDark = (value) => ({
  type: SET_COLOR_ON_DARK,
  payload: value,
});

export const setTips = (value) => ({
  type: SET_TIPS,
  payload: value,
});

export const setDefaultSortByStrength = (value) => ({
  type: SET_DEFAULT_SORT_BY_STRENGTH,
  payload: value,
});
