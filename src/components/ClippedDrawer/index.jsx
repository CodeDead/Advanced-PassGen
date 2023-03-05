import React, { useContext } from 'react';
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
import ListIcon from '@mui/icons-material/List';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FolderIcon from '@mui/icons-material/Folder';
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

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={closeDrawer}
    >
      <Toolbar />
      <Box
        sx={{ width: 220 }}
      >
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
      </Box>
    </Drawer>
  );
};

export default ClippedDrawer;
