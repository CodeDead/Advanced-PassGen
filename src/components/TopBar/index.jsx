import React, { useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Menu from '@mui/material/Menu';
import LanguageIcon from '@mui/icons-material/Language';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuItem from '@mui/material/MenuItem';
import { setLanguageIndex, setThemeType } from '../../reducers/MainReducer/Actions';
import { MainContext } from '../../contexts/MainContextProvider';

const TopBar = () => {
  const [state, d1] = useContext(MainContext);

  const {
    languageIndex,
    themeType,
    languageSelector,
    colorOnDark,
  } = state;
  const language = state.languages[languageIndex];

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  /**
   * Change the theme style
   */
  const changeThemeStyle = () => {
    d1(setThemeType(themeType === 'dark' ? 'light' : 'dark'));
  };

  /**
   * Handle a click event on the menu
   * @param event The event that the dispatcher passes
   */
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * Handle the closing of the menu
   */
  const handleClose = () => {
    setAnchorEl(null);
  };

  /**
   * Change the language of the application
   * @param lang The language index
   */
  const changeLanguage = (lang) => {
    handleClose();
    d1(setLanguageIndex(lang));
  };

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      enableColorOnDark={colorOnDark}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          {language.appName}
        </Typography>
        <div style={{ flexGrow: 1 }} />
        {languageSelector ? (
          <div>
            <IconButton
              aria-label={language.language}
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <LanguageIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => changeLanguage(0)}
                selected={languageIndex === 0}
              >
                Deutsch
              </MenuItem>
              <MenuItem
                onClick={() => changeLanguage(1)}
                selected={languageIndex === 1}
              >
                English
              </MenuItem>
              <MenuItem
                onClick={() => changeLanguage(2)}
                selected={languageIndex === 2}
              >
                Français
              </MenuItem>
              <MenuItem
                onClick={() => changeLanguage(3)}
                selected={languageIndex === 3}
              >
                日本
              </MenuItem>
              <MenuItem
                onClick={() => changeLanguage(4)}
                selected={languageIndex === 4}
              >
                Nederlands
              </MenuItem>
              <MenuItem
                onClick={() => changeLanguage(5)}
                selected={languageIndex === 5}
              >
                Русский
              </MenuItem>
              <MenuItem
                onClick={() => changeLanguage(6)}
                selected={languageIndex === 6}
              >
                中文（简体）
              </MenuItem>
            </Menu>
          </div>
        ) : null}
        <IconButton color="inherit" onClick={changeThemeStyle}>
          {themeType === 'dark' ? <Brightness5Icon /> : <Brightness7Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
