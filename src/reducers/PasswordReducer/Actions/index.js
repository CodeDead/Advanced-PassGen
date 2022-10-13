import {
  SET_BRACKETS,
  SET_CAPITAL_LETTERS,
  SET_CHARACTER_SET,
  SET_NUMBERS,
  SET_PASSWORD_AMOUNT,
  SET_PASSWORD_LENGTH,
  SET_PASSWORD_LENGTH_MAX,
  SET_PASSWORD_LENGTH_MIN,
  SET_SMALL_LETTERS,
  SET_SPACES,
  SET_SPECIAL_CHARACTERS,
  SET_USE_ADVANCED,
} from './actionTypes';

export const setPasswordLength = (length) => ({
  type: SET_PASSWORD_LENGTH,
  payload: length,
});

export const setPasswordLengthMin = (min) => ({
  type: SET_PASSWORD_LENGTH_MIN,
  payload: min,
});

export const setPasswordLengthMax = (max) => ({
  type: SET_PASSWORD_LENGTH_MAX,
  payload: max,
});

export const setPasswordAmount = (amount) => ({
  type: SET_PASSWORD_AMOUNT,
  payload: amount,
});

export const setSmallLetters = (value) => ({
  type: SET_SMALL_LETTERS,
  payload: value,
});

export const setCapitalLetters = (value) => ({
  type: SET_CAPITAL_LETTERS,
  payload: value,
});

export const setSpaces = (value) => ({
  type: SET_SPACES,
  payload: value,
});

export const setNumbers = (value) => ({
  type: SET_NUMBERS,
  payload: value,
});

export const setSpecialCharacters = (value) => ({
  type: SET_SPECIAL_CHARACTERS,
  payload: value,
});

export const setBrackets = (value) => ({
  type: SET_BRACKETS,
  payload: value,
});

export const setCharacterSet = (value) => ({
  type: SET_CHARACTER_SET,
  payload: value,
});

export const setUseAdvanced = (value) => ({
  type: SET_USE_ADVANCED,
  payload: value,
});
