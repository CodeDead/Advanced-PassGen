import blue from '@mui/material/colors/blue';
import lightBlue from '@mui/material/colors/lightBlue';
import red from '@mui/material/colors/red';
import green from '@mui/material/colors/green';
import lightGreen from '@mui/material/colors/lightGreen';
import purple from '@mui/material/colors/purple';
import deepPurple from '@mui/material/colors/deepPurple';
import grey from '@mui/material/colors/grey';
import orange from '@mui/material/colors/orange';
import deepOrange from '@mui/material/colors/deepOrange';
import amber from '@mui/material/colors/amber';
import brown from '@mui/material/colors/brown';

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
    default:
      return blue;
  }
};

export default ThemeSelector;
