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
  SET_SPECIAL_CHARACTERS, SET_USE_ADVANCED,
} from './Actions/actionTypes';

const PasswordReducer = (state, action) => {
  switch (action.type) {
    case SET_PASSWORD_LENGTH:
      if (parseFloat(action.payload) < 1) return state;
      return {
        ...state,
        length: action.payload,
      };
    case SET_PASSWORD_LENGTH_MIN:
      if (parseFloat(action.payload) < 1) return state;
      return {
        ...state,
        min: action.payload,
      };
    case SET_PASSWORD_LENGTH_MAX:
      if (parseFloat(action.payload) < 1) return state;
      return {
        ...state,
        max: action.payload,
      };
    case SET_PASSWORD_AMOUNT:
      if (action.payload <= 0) return state;
      return {
        ...state,
        amount: action.payload,
      };
    case SET_SMALL_LETTERS:
      return {
        ...state,
        smallLetters: action.payload,
      };
    case SET_CAPITAL_LETTERS:
      return {
        ...state,
        capitalLetters: action.payload,
      };
    case SET_SPACES:
      return {
        ...state,
        spaces: action.payload,
      };
    case SET_NUMBERS:
      return {
        ...state,
        numbers: action.payload,
      };
    case SET_SPECIAL_CHARACTERS:
      return {
        ...state,
        specialCharacters: action.payload,
      };
    case SET_BRACKETS:
      return {
        ...state,
        brackets: action.payload,
      };
    case SET_CHARACTER_SET:
      return {
        ...state,
        characterSet: action.payload,
      };
    case SET_USE_ADVANCED:
      return {
        ...state,
        useAdvanced: action.payload,
      };
    default:
      return state;
  }
};

export default PasswordReducer;
