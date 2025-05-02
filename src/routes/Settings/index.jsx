import React, { useContext, useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
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
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { platform } from '@tauri-apps/plugin-os';
import packageJson from '../../../package.json';
import AlertDialog from '../../components/AlertDialog';
import GridList from '../../components/GridList';
import Theme from '../../components/Theme';
import { MainContext } from '../../contexts/MainContextProvider';
import {
  resetState,
  setAutoUpdate,
  setCheckedForUpdates,
  setColorOnDark,
  setDefaultSortByStrength,
  setError,
  setLanguageIndex,
  setLanguageSelector,
  setPageIndex,
  setThemeIndex,
  setThemeType,
  setTips,
  setUpdate,
} from '../../reducers/MainReducer/Actions';
import Updater from '../../utils/Updater';

const Settings = () => {
  const [state, d1] = useContext(MainContext);

  const {
    themeIndex,
    themeType,
    languageIndex,
    autoUpdate,
    languageSelector,
    colorOnDark,
    tips,
    sortByStrength,
  } = state;

  const language = state.languages[languageIndex];

  const [generalExpanded, setGeneralExpanded] = useState(true);
  const [themeExpanded, setThemeExpanded] = useState(!window.__TAURI__);

  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  /**
   * Change the theme
   * @param index The index of the theme
   */
  const changeTheme = (index) => {
    d1(setThemeIndex(index));
  };

  /**
   * Dispatch an event to change the language
   * @param e The event that contains the language index
   */
  const handleLanguageChange = (e) => {
    d1(setLanguageIndex(e.target.value));
  };

  /**
   * Change the theme style
   * @param event The event argument
   */
  const changeThemeStyle = (event) => {
    d1(setThemeType(event.target.value));
  };

  /**
   * Reset all settings
   */
  const resetSettings = () => {
    d1(resetState());
  };

  /**
   * Check for updates
   */
  const checkForUpdates = () => {
    if (loading) {
      return;
    }

    d1(setUpdate(null));
    d1(setError(null));

    try {
      const res = platform();
      Updater(res.toLowerCase(), packageJson.version)
        .then((up) => {
          d1(setUpdate(up));
          d1(setCheckedForUpdates(true));
        })
        .catch((error) => {
          d1(setError(error));
        });
    } catch (e) {
      d1(setError(e));
    }
    setLoading(false);
  };

  useEffect(() => {
    d1(setPageIndex(4));
    document.title = 'Settings | Advanced PassGen';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Accordion
        expanded={generalExpanded}
        onChange={() => setGeneralExpanded((prev) => !prev)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{language.general}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {}
            {window.__TAURI__ ? (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={autoUpdate}
                    onChange={(e) => d1(setAutoUpdate(e.target.checked))}
                    value="autoUpdate"
                  />
                }
                label={language.autoUpdate}
              />
            ) : null}
            <FormControlLabel
              control={
                <Checkbox
                  checked={colorOnDark}
                  onChange={(e) => d1(setColorOnDark(e.target.checked))}
                  value="colorOnDarkSelector"
                />
              }
              label={language.colorOnDark}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={tips}
                  onChange={(e) => d1(setTips(e.target.checked))}
                  value="tipsSelector"
                />
              }
              label={language.tips}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={languageSelector}
                  onChange={(e) => d1(setLanguageSelector(e.target.checked))}
                  value="languageSelector"
                />
              }
              label={language.languageSelector}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={sortByStrength}
                  onChange={(e) =>
                    d1(setDefaultSortByStrength(e.target.checked))
                  }
                  value="strengthSortSelector"
                />
              }
              label={language.sortByStrength}
            />
            <FormControl variant="outlined" sx={{ mt: 2 }}>
              <InputLabel id="language-label">{language.language}</InputLabel>
              <Select
                value={languageIndex}
                onChange={handleLanguageChange}
                id="language-simple"
                labelId="language-label"
                label={language.language}
                variant="outlined"
              >
                <MenuItem value={0}>Deutsch</MenuItem>
                <MenuItem value={1}>English</MenuItem>
                <MenuItem value={2}>Español</MenuItem>
                <MenuItem value={3}>Français</MenuItem>
                <MenuItem value={4}>日本</MenuItem>
                <MenuItem value={5}>Nederlands</MenuItem>
                <MenuItem value={6}>Русский</MenuItem>
                <MenuItem value={7}>中文（简体）</MenuItem>
                <MenuItem value={8}>Türkçe</MenuItem>
              </Select>
            </FormControl>
          </FormGroup>
        </AccordionDetails>
      </Accordion>
      <Accordion
        slotProps={{ transition: { unmountOnExit: true } }}
        expanded={themeExpanded}
        onChange={() => setThemeExpanded((prev) => !prev)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography>{language.theme}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <GridList spacing={2} xs={6} md={4} lg={4}>
            <Theme
              title={language.default}
              description={language.defaultThemeDescription}
              color={blue[500]}
              selected={themeIndex === 0}
              onAction={() => changeTheme(0)}
            />
            <Theme
              title={language.lightBlue}
              description={language.lightBlueDescription}
              color={lightBlue[500]}
              selected={themeIndex === 1}
              onAction={() => changeTheme(1)}
            />
            <Theme
              title={language.red}
              description={language.redDescription}
              color={red[500]}
              selected={themeIndex === 2}
              onAction={() => changeTheme(2)}
            />
            <Theme
              title={language.green}
              description={language.greenDescription}
              color={green[500]}
              selected={themeIndex === 3}
              onAction={() => changeTheme(3)}
            />
            <Theme
              title={language.lightGreen}
              description={language.lightGreenDescription}
              color={lightGreen[500]}
              selected={themeIndex === 4}
              onAction={() => changeTheme(4)}
            />
            <Theme
              title={language.purple}
              description={language.purpleDescription}
              color={purple[500]}
              selected={themeIndex === 5}
              onAction={() => changeTheme(5)}
            />
            <Theme
              title={language.deepPurple}
              description={language.deepPurpleDescription}
              color={deepPurple[500]}
              selected={themeIndex === 6}
              onAction={() => changeTheme(6)}
            />
            <Theme
              title={language.grey}
              description={language.greyDescription}
              color={grey[500]}
              selected={themeIndex === 7}
              onAction={() => changeTheme(7)}
            />
            <Theme
              title={language.orange}
              description={language.orangeThemeDescription}
              color={orange[500]}
              selected={themeIndex === 8}
              onAction={() => changeTheme(8)}
            />
            <Theme
              title={language.deepOrange}
              description={language.deepOrangeDescription}
              color={deepOrange[500]}
              selected={themeIndex === 9}
              onAction={() => changeTheme(9)}
            />
            <Theme
              title={language.amber}
              description={language.amberDescription}
              color={amber[500]}
              selected={themeIndex === 10}
              onAction={() => changeTheme(10)}
            />
            <Theme
              title={language.brown}
              description={language.brownDescription}
              color={brown[500]}
              selected={themeIndex === 11}
              onAction={() => changeTheme(11)}
            />
            <Theme
              title={language.pink}
              description={language.pinkDescription}
              color={pink[500]}
              selected={themeIndex === 12}
              onAction={() => changeTheme(12)}
            />
            <Theme
              title={language.indigo}
              description={language.indigoDescription}
              color={indigo[500]}
              selected={themeIndex === 13}
              onAction={() => changeTheme(13)}
            />
            <Theme
              title={language.cyan}
              description={language.cyanDescription}
              color={cyan[500]}
              selected={themeIndex === 14}
              onAction={() => changeTheme(14)}
            />
            <Theme
              title={language.teal}
              description={language.tealDescription}
              color={teal[500]}
              selected={themeIndex === 15}
              onAction={() => changeTheme(15)}
            />
            <Theme
              title={language.lime}
              description={language.limeDescription}
              color={lime[500]}
              selected={themeIndex === 16}
              onAction={() => changeTheme(16)}
            />
            <Theme
              title={language.yellow}
              description={language.yellowDescription}
              color={yellow[500]}
              selected={themeIndex === 17}
              onAction={() => changeTheme(17)}
            />
          </GridList>
          <FormControl style={{ marginTop: 10 }} component="fieldset">
            <FormLabel component="legend">{language.themeStyle}</FormLabel>
            <RadioGroup row value={themeType} onChange={changeThemeStyle}>
              <FormControlLabel
                value="light"
                control={<Radio />}
                label={language.light}
              />
              <FormControlLabel
                value="dark"
                control={<Radio />}
                label={language.dark}
              />
            </RadioGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>
      {}
      {window.__TAURI__ ? (
        <Button variant="contained" sx={{ mt: 2 }} onClick={checkForUpdates}>
          {language.checkForUpdates}
        </Button>
      ) : null}
      <Button
        variant="contained"
        sx={{ mt: 2 }}
        style={{ float: 'right' }}
        onClick={() => setResetDialogOpen(true)}
      >
        {language.reset}
      </Button>
      <AlertDialog
        open={resetDialogOpen}
        title={language.confirmation}
        content={language.confirmResetSettings}
        onOk={() => resetSettings()}
        onCancel={() => setResetDialogOpen(false)}
        onClose={() => setResetDialogOpen(false)}
        agreeLabel={language.yes}
        cancelLabel={language.no}
      />
    </Container>
  );
};

export default Settings;
