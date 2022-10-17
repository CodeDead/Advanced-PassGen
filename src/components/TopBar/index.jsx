import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { setThemeType } from '../../reducers/MainReducer/Actions';
import { MainContext } from '../../contexts/MainContextProvider';

const TopBar = () => {
  const [state, d1] = useContext(MainContext);

  const { languageIndex, themeType } = state;
  const language = state.languages[languageIndex];

  /**
   * Change the theme style
   */
  const changeThemeStyle = () => {
    d1(setThemeType(themeType === 'dark' ? 'light' : 'dark'));
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          {language.appName}
        </Typography>
        <div style={{ flexGrow: 1 }} />
        <IconButton color="inherit" onClick={changeThemeStyle}>
          {themeType === 'dark' ? <Brightness5Icon /> : <Brightness7Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
