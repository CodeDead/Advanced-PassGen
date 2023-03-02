import React, { useContext, useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Grid from '@mui/material/Grid';
import blue from '@mui/material/colors/blue';
import purple from '@mui/material/colors/purple';
import deepPurple from '@mui/material/colors/deepPurple';
import lightBlue from '@mui/material/colors/lightBlue';
import red from '@mui/material/colors/red';
import green from '@mui/material/colors/green';
import lightGreen from '@mui/material/colors/lightGreen';
import grey from '@mui/material/colors/grey';
import orange from '@mui/material/colors/orange';
import deepOrange from '@mui/material/colors/deepOrange';
import amber from '@mui/material/colors/amber';
import brown from '@mui/material/colors/brown';
import pink from '@mui/material/colors/pink';
import indigo from '@mui/material/colors/indigo';
import cyan from '@mui/material/colors/cyan';
import teal from '@mui/material/colors/teal';
import lime from '@mui/material/colors/lime';
import yellow from '@mui/material/colors/yellow';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { type } from '@tauri-apps/api/os';
import Theme from '../../components/Theme';
import GridList from '../../components/GridList';
import {
  resetState,
  setAutoUpdate,
  setCheckedForUpdates,
  setColorOnDark,
  setError,
  setFixedMenu,
  setLanguageIndex,
  setLanguageSelector,
  setPageIndex,
  setThemeIndex,
  setThemeType,
  setUpdate,
} from '../../reducers/MainReducer/Actions';
import { MainContext } from '../../contexts/MainContextProvider';
import AlertDialog from '../../components/AlertDialog';
import Updater from '../../utils/Updater';
import packageJson from '../../../package.json';

const Settings = () => {
  const [state, d1] = useContext(MainContext);

  const {
    themeIndex,
    themeType,
    languageIndex,
    autoUpdate,
    languageSelector,
    fixedMenu,
    colorOnDark,
  } = state;

  const language = state.languages[languageIndex];

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

    type()
      .then((res) => {
        Updater(res.toLowerCase(), packageJson.version)
          .then((up) => {
            d1(setUpdate(up));
            d1(setCheckedForUpdates(true));
          })
          .catch((error) => {
            d1(setError(error));
          });
      })
      .catch((e) => {
        d1(setError(e));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    d1(setPageIndex(5));
  }, []);

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
          <Typography component="h2" variant="h5" color="primary" gutterBottom>
            {language.general}
          </Typography>
          <Card>
            <CardContent>
              <FormGroup>
                {/* eslint-disable-next-line no-underscore-dangle */}
                {window.__TAURI__ ? (
                  <FormControlLabel
                    control={(
                      <Checkbox
                        checked={autoUpdate}
                        onChange={(e) => d1(setAutoUpdate(e.target.checked))}
                        value="autoUpdate"
                      />
                      )}
                    label={language.autoUpdate}
                  />
                ) : null}
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={fixedMenu}
                      onChange={(e) => d1(setFixedMenu(e.target.checked))}
                      value="fixedMenu"
                    />
                  )}
                  label={language.fixedMenu}
                />
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={colorOnDark}
                      onChange={(e) => d1(setColorOnDark(e.target.checked))}
                      value="colorOnDarkSelector"
                    />
                  )}
                  label={language.colorOnDark}
                />
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={languageSelector}
                      onChange={(e) => d1(setLanguageSelector(e.target.checked))}
                      value="languageSelector"
                    />
                  )}
                  label={language.languageSelector}
                />
                <FormControl variant="outlined" sx={{ mt: 2 }}>
                  <InputLabel id="language-label">{language.language}</InputLabel>
                  <Select
                    value={languageIndex}
                    onChange={handleLanguageChange}
                    id="language-simple"
                    labelId="language-label"
                    label={language.language}
                  >
                    <MenuItem value={0}>Deutsch</MenuItem>
                    <MenuItem value={1}>English</MenuItem>
                    <MenuItem value={2}>Français</MenuItem>
                    <MenuItem value={3}>日本</MenuItem>
                    <MenuItem value={4}>Nederlands</MenuItem>
                    <MenuItem value={5}>Русский</MenuItem>
                    <MenuItem value={6}>中文（简体）</MenuItem>
                  </Select>
                </FormControl>
              </FormGroup>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Typography component="h2" variant="h5" color="primary" gutterBottom>
            {language.theme}
          </Typography>

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
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <FormControl style={{ marginTop: 10 }} component="fieldset">
            <FormLabel component="legend">{language.themeStyle}</FormLabel>
            <RadioGroup row value={themeType} onChange={changeThemeStyle}>
              <FormControlLabel value="light" control={<Radio />} label={language.light} />
              <FormControlLabel value="dark" control={<Radio />} label={language.dark} />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
      {/* eslint-disable-next-line no-underscore-dangle */}
      {window.__TAURI__ ? (
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={checkForUpdates}
        >
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
