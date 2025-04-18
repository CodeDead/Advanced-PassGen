import { SET_PHRASE, SET_VAULT } from './actionTypes';

export const setVault = (vault) => ({
  type: SET_VAULT,
  payload: vault,
});

export const setPhrase = (phrase) => ({
  type: SET_PHRASE,
  payload: phrase,
});
