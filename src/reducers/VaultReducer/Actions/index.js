import { invoke } from '@tauri-apps/api';
import { SET_VAULT } from './actionTypes';

export const setVault = (vault) => ({
  type: SET_VAULT,
  payload: vault,
});

export const openVault = (key) => {
  if (!key || key.length === 0) {
    return null;
  }
  // eslint-disable-next-line no-underscore-dangle
  if (window.__TAURI__) {
    return invoke('open_vault');
  }
  return null;
};

export const saveVault = (vault, key) => {
  if (!vault || !key || key.length === 0) {
    return null;
  }
  // eslint-disable-next-line no-underscore-dangle
  if (window.__TAURI__) {
    return invoke('save_vault', { vault, key });
  }
  return null;
};
