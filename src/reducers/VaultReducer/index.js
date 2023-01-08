import { SET_PHRASE, SET_VAULT } from './Actions/actionTypes';

const VaultReducer = (state, action) => {
  if (!action || !action.type) {
    return state;
  }
  switch (action.type) {
    case SET_VAULT:
      return {
        ...state,
        vault: action.payload,
      };
    case SET_PHRASE:
      return {
        ...state,
        phrase: action.payload,
      };
    default:
      return state;
  }
};

export default VaultReducer;
