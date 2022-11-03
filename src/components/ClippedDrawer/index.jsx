import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import BuildIcon from '@mui/icons-material/Build';
import ListIcon from '@mui/icons-material/List';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useNavigate } from 'react-router-dom';
import { MainContext } from '../../contexts/MainContextProvider';
import { openWebSite } from '../../reducers/MainReducer/Actions';

const drawerWidth = 220;

const ClippedDrawer = () => {
  const [state] = useContext(MainContext);

  const { languageIndex, pageIndex, fixedMenu } = state;
  const language = state.languages[languageIndex];

  const [textVisible, setTextVisible] = useState(fixedMenu);

  const navigate = useNavigate();

  /**
   * Change the menu visibility
   * @param visible True if the text should be visible, false otherwise
   */
  const changeTextMenuVisibility = (visible) => {
    if (fixedMenu) return;
    setTextVisible(visible);
  };

  useEffect(() => {
    setTextVisible(fixedMenu);
  }, [fixedMenu]);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: textVisible ? drawerWidth : 50,
        flexShrink: 0,
        whiteSpace: textVisible ? null : 'nowrap',
        '& .MuiDrawer-paper': { width: textVisible ? drawerWidth : null, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box
        sx={{ overflow: 'auto' }}
        onMouseEnter={() => changeTextMenuVisibility(true)}
        onMouseLeave={() => changeTextMenuVisibility(false)}
      >
        <List>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              selected={pageIndex === 0}
              onClick={() => navigate('/')}
              sx={{
                minHeight: 48,
                justifyContent: textVisible ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: textVisible ? null : 0,
                  mr: textVisible ? null : 'auto',
                }}
              >
                <HomeIcon />
              </ListItemIcon>
              {textVisible ? <ListItemText primary={language.general} /> : null}
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: textVisible ? 'block' : null }}>
            <ListItemButton
              selected={pageIndex === 1}
              onClick={() => navigate('/advanced')}
              sx={{
                minHeight: 48,
                justifyContent: textVisible ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: textVisible ? null : 0,
                  mr: textVisible ? null : 'auto',
                }}
              >
                <BuildIcon />
              </ListItemIcon>
              {textVisible ? <ListItemText primary={language.advanced} /> : null}
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: textVisible ? 'block' : null }}>
            <ListItemButton
              selected={pageIndex === 2}
              onClick={() => navigate('/generate')}
              sx={{
                minHeight: 48,
                justifyContent: textVisible ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: textVisible ? null : 0,
                  mr: textVisible ? null : 'auto',
                }}
              >
                <ListIcon />
              </ListItemIcon>
              {textVisible ? <ListItemText primary={language.list} /> : null}
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem disablePadding sx={{ display: textVisible ? 'block' : null }}>
            <ListItemButton
              selected={pageIndex === 3}
              onClick={() => navigate('/advisor')}
              sx={{
                minHeight: 48,
                justifyContent: textVisible ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: textVisible ? null : 0,
                  mr: textVisible ? null : 'auto',
                }}
              >
                <LightbulbIcon />
              </ListItemIcon>
              {textVisible ? <ListItemText primary={language.advisor} /> : null}
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem disablePadding sx={{ display: textVisible ? 'block' : null }}>
            <ListItemButton
              selected={pageIndex === 4}
              onClick={() => navigate('/settings')}
              sx={{
                minHeight: 48,
                justifyContent: textVisible ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: textVisible ? null : 0,
                  mr: textVisible ? null : 'auto',
                }}
              >
                <SettingsIcon />
              </ListItemIcon>
              {textVisible ? <ListItemText primary={language.settings} /> : null}
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem disablePadding sx={{ display: textVisible ? 'block' : null }}>
            <ListItemButton
              onClick={() => openWebSite('https://codedead.com/donate')}
              sx={{
                minHeight: 48,
                justifyContent: textVisible ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: textVisible ? null : 0,
                  mr: textVisible ? null : 'auto',
                }}
              >
                <AttachMoneyIcon />
              </ListItemIcon>
              {textVisible ? <ListItemText primary={language.donate} /> : null}
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: textVisible ? 'block' : null }}>
            <ListItemButton
              selected={pageIndex === 5}
              onClick={() => navigate('/about')}
              sx={{
                minHeight: 48,
                justifyContent: textVisible ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: textVisible ? null : 0,
                  mr: textVisible ? null : 'auto',
                }}
              >
                <InfoIcon />
              </ListItemIcon>
              {textVisible ? <ListItemText primary={language.about} /> : null}
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default ClippedDrawer;
