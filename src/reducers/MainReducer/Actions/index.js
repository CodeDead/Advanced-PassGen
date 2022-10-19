import { invoke } from '@tauri-apps/api';
import {
  RESET_STATE,
  SET_AUTO_UPDATE,
  SET_ERROR,
  SET_LANGUAGE_INDEX,
  SET_LANGUAGE_SELECTOR,
  SET_PAGE_INDEX,
  SET_THEME_INDEX,
  SET_THEME_TYPE,
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
  // eslint-disable-next-line no-underscore-dangle
  if (window.__TAURI__) {
    invoke('open_website', { website })
      .catch((e) => {
        // eslint-disable-next-line no-console
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
