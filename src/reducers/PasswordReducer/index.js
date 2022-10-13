import {
  SET_BRACKETS,
  SET_CAPITAL_LETTERS,
  SET_NUMBERS,
  SET_PASSWORD_AMOUNT,
  SET_PASSWORD_LENGTH,
  SET_SMALL_LETTERS,
  SET_SPACES,
  SET_SPECIAL_CHARACTERS,
} from './Actions/actionTypes';

const PasswordReducer = (state, action) => {
  switch (action.type) {
    case SET_PASSWORD_LENGTH:
      return {
        ...state,
        min: action.payload.min,
        max: action.payload.max,
      };
    case SET_PASSWORD_AMOUNT:
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
    default:
      return state;
  }
};

export default PasswordReducer;
