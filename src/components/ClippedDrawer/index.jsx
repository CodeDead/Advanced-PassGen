import React, { useContext } from 'react';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CloseIcon from '@mui/icons-material/Close';
import FolderIcon from '@mui/icons-material/Folder';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ListIcon from '@mui/icons-material/List';
import SettingsIcon from '@mui/icons-material/Settings';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import { invoke } from '@tauri-apps/api/core';
import { useNavigate } from 'react-router-dom';
import { MainContext } from '../../contexts/MainContextProvider';
import { openWebSite } from '../../reducers/MainReducer/Actions';

const ClippedDrawer = ({ open, onClose }) => {
  const [state] = useContext(MainContext);

  const { languageIndex, pageIndex } = state;
  const language = state.languages[languageIndex];

  const navigate = useNavigate();

  /**
   * Close the drawer
   */
  const closeDrawer = () => {
    if (onClose) {
      onClose();
    }
  };

  /**
   * Handle a navigate event
   * @param page The page to navigate to
   */
  const handleNavigate = (page) => {
    navigate(page);
    closeDrawer();
  };

  /**
   * Exit the application
   */
  const exitApp = () => {
    if (window.__TAURI__) {
      invoke('exit_app');
    }
  };

  return (
    <Drawer anchor="left" open={open} onClose={closeDrawer}>
      <Toolbar />
      <Box sx={{ width: 240 }}>
        <List>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              selected={pageIndex === 0}
              onClick={() => handleNavigate('/')}
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={language.general} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              selected={pageIndex === 1}
              onClick={() => handleNavigate('/generate')}
            >
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary={language.list} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton
              selected={pageIndex === 2}
              onClick={() => handleNavigate('/advisor')}
            >
              <ListItemIcon>
                <LightbulbIcon />
              </ListItemIcon>
              <ListItemText primary={language.advisor} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              selected={pageIndex === 3}
              onClick={() => handleNavigate('/vault')}
            >
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>
              <ListItemText primary={language.vault} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton
              selected={pageIndex === 4}
              onClick={() => handleNavigate('/settings')}
            >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={language.settings} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                openWebSite('https://codedead.com/donate');
                closeDrawer();
              }}
            >
              <ListItemIcon>
                <AttachMoneyIcon />
              </ListItemIcon>
              <ListItemText primary={language.donate} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              selected={pageIndex === 5}
              onClick={() => handleNavigate('/about')}
            >
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary={language.about} />
            </ListItemButton>
          </ListItem>
        </List>
        {}
        {window.__TAURI__ ? (
          <>
            <Divider />
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={() => exitApp()}>
                  <ListItemIcon>
                    <CloseIcon />
                  </ListItemIcon>
                  <ListItemText primary={language.exit} />
                </ListItemButton>
              </ListItem>
            </List>
          </>
        ) : null}
      </Box>
    </Drawer>
  );
};

export default ClippedDrawer;
