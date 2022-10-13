import {
  SET_BRACKETS,
  SET_CAPITAL_LETTERS,
  SET_NUMBERS,
  SET_PASSWORD_AMOUNT,
  SET_PASSWORD_LENGTH,
  SET_SMALL_LETTERS,
  SET_SPACES,
  SET_SPECIAL_CHARACTERS,
} from './actionTypes';

export const setPasswordLength = (min, max) => ({
  type: SET_PASSWORD_LENGTH,
  payload: { min, max },
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
