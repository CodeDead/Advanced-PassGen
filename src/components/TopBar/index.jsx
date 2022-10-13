import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import { MainContext } from '../../contexts/MainContextProvider';

const TopBar = () => {
  const [state] = useContext(MainContext);

  const { languageIndex } = state;
  const language = state.languages[languageIndex];

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          {language.appName}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
