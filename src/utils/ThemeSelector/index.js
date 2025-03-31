import {
  blue,
  lightBlue,
  red,
  green,
  lightGreen,
  purple,
  deepOrange,
  deepPurple,
  grey,
  orange,
  amber,
  brown,
  pink,
  indigo,
  cyan,
  teal,
  lime,
  yellow,
} from '@mui/material/colors';

/**
 * Select the theme, depending on the theme index
 * @param index The theme index
 * @returns The required color scheme
 * @constructor
 */
const ThemeSelector = (index) => {
  switch (index) {
    case 1:
      return lightBlue;
    case 2:
      return red;
    case 3:
      return green;
    case 4:
      return lightGreen;
    case 5:
      return purple;
    case 6:
      return deepPurple;
    case 7:
      return grey;
    case 8:
      return orange;
    case 9:
      return deepOrange;
    case 10:
      return amber;
    case 11:
      return brown;
    case 12:
      return pink;
    case 13:
      return indigo;
    case 14:
      return cyan;
    case 15:
      return teal;
    case 16:
      return lime;
    case 17:
      return yellow;
    default:
      return blue;
  }
};

export default ThemeSelector;
