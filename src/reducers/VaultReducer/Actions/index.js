import { SET_VAULT } from './actionTypes';

// eslint-disable-next-line import/prefer-default-export
export const setVault = (vault) => ({
  type: SET_VAULT,
  payload: vault,
});
