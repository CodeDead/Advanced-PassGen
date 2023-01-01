import { invoke } from '@tauri-apps/api';
import {
  SET_ALLOW_DUPLICATES,
  SET_BRACKETS,
  SET_CAPITAL_LETTERS,
  SET_CHARACTER_SET,
  SET_NUMBERS,
  SET_PASSWORD_AMOUNT,
  SET_PASSWORD_LENGTH_MAX,
  SET_PASSWORD_LENGTH_MIN,
  SET_PASSWORDS,
  SET_SMALL_LETTERS,
  SET_SPACES,
  SET_SPECIAL_CHARACTERS,
  SET_USE_ADVANCED,
} from './actionTypes';

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

export const setPasswords = (passwords) => ({
  type: SET_PASSWORDS,
  payload: passwords,
});

export const setAllowDuplicates = (value) => ({
  type: SET_ALLOW_DUPLICATES,
  payload: value,
});

// eslint-disable-next-line max-len
export const generatePasswordArray = (min, max, characterSet, amount, allowDuplicates, worker) => {
  // eslint-disable-next-line no-underscore-dangle
  if (window.__TAURI__) {
    return invoke('generate_passwords', {
      minLength: parseFloat(min),
      maxLength: parseFloat(max),
      characterSet,
      amount: parseFloat(amount),
      allowDuplicates,
    });
  }
  return worker.PasswordGenerator(min, max, characterSet, amount, allowDuplicates);
};

// eslint-disable-next-line max-len
export const getFullCharacterSet = (characterSet, useAdvanced, smallLetters, capitalLetters, spaces, numbers, specialCharacters, brackets) => {
  let simpleCharacterSet = characterSet;
  if (!useAdvanced) {
    simpleCharacterSet = '';
    if (smallLetters) {
      simpleCharacterSet += 'abcdefghijklmnopqrstuvwxyz';
    }
    if (capitalLetters) {
      simpleCharacterSet += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    if (spaces) {
      simpleCharacterSet += ' ';
    }
    if (specialCharacters) {
      simpleCharacterSet += '=+-_!?.,;:\'\\"/%^*$€£&µ@#';
    }
    if (numbers) {
      simpleCharacterSet += '0123456789';
    }
    if (brackets) {
      simpleCharacterSet += '[]{}()<>';
    }
  }

  return simpleCharacterSet;
};
