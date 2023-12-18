import {
  SET_ALLOW_DUPLICATES,
  SET_BRACKETS,
  SET_CAPITAL_LETTERS,
  SET_CHARACTER_SET,
  SET_INCLUDE_SYMBOLS,
  SET_NUMBERS,
  SET_PASSWORD_AMOUNT,
  SET_PASSWORD_LENGTH_MAX,
  SET_PASSWORD_LENGTH_MIN,
  SET_PASSWORDS,
  SET_SMALL_LETTERS,
  SET_SPACES,
  SET_SPECIAL_CHARACTERS,
  SET_USE_ADVANCED,
  SET_USE_EMOJIS,
} from './Actions/actionTypes';

const PasswordReducer = (state, action) => {
  if (!action || !action.type) {
    return state;
  }
  switch (action.type) {
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
      localStorage.characterSet = action.payload;
      return {
        ...state,
        characterSet: action.payload,
      };
    case SET_INCLUDE_SYMBOLS:
      localStorage.includeSymbols = action.payload;
      return {
        ...state,
        includeSymbols: action.payload,
      };
    case SET_USE_ADVANCED:
      return {
        ...state,
        useAdvanced: action.payload,
      };
    case SET_PASSWORDS:
      return {
        ...state,
        passwords: action.payload,
      };
    case SET_ALLOW_DUPLICATES:
      return {
        ...state,
        allowDuplicates: action.payload,
      };
    case SET_USE_EMOJIS:
      return {
        ...state,
        useEmojis: action.payload,
      };
    default:
      return state;
  }
};

export default PasswordReducer;
