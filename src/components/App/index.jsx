import React, { useContext, useEffect, useState, lazy, Suspense } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Snackbar from '@mui/material/Snackbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { platform } from '@tauri-apps/plugin-os';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import packageJson from '../../../package.json';
import { MainContext } from '../../contexts/MainContextProvider';
import {
  openWebSite,
  setCheckedForUpdates,
  setError,
  setLoading,
  setUpdate,
} from '../../reducers/MainReducer/Actions';
import ThemeSelector from '../../utils/ThemeSelector';
import Updater from '../../utils/Updater';
import AlertDialog from '../AlertDialog';
import ClippedDrawer from '../ClippedDrawer';
import LoadingBar from '../LoadingBar';
import TopBar from '../TopBar';
import UpdateDialog from '../UpdateDialog';

const Home = lazy(() => import('../../routes/Home'));
const Generate = lazy(() => import('../../routes/Generate'));
const About = lazy(() => import('../../routes/About'));
const Settings = lazy(() => import('../../routes/Settings'));
const Advisor = lazy(() => import('../../routes/Advisor'));
const Vault = lazy(() => import('../../routes/Vault'));
const NotFound = lazy(() => import('../../routes/NotFound'));

const App = () => {
  const [state, d1] = useContext(MainContext);
  const {
    themeIndex,
    themeType,
    update,
    languageIndex,
    autoUpdate,
    error,
    loading,
    checkedForUpdates,
  } = state;

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const language = state.languages[languageIndex];

  const color = ThemeSelector(themeIndex);

  const theme = createTheme({
    palette: {
      primary: color,
      mode: themeType,
    },
  });

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
        })
        .catch((err) => {
          d1(setError(err));
        });
    } catch (e) {
      d1(setError(e));
    }
    d1(setLoading(false));
  };

  /**
   * Close the alert dialog
   */
  const closeAlertDialog = () => {
    d1(setError(null));
  };

  /**
   * Close the snack bar
   */
  const closeSnack = () => {
    setSnackOpen(false);
  };

  /**
   * Close the dialog that displays a message that no updates are available
   */
  const closeNoUpdate = () => {
    d1(setCheckedForUpdates(false));
  };

  useEffect(() => {
    if (window.__TAURI__) {
      if (autoUpdate) {
        checkForUpdates();
      }
    } else {
      setSnackOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <Box sx={{ display: 'flex' }}>
          <TopBar
            onOpenDrawer={() => setDrawerOpen(!drawerOpen)}
            onTitleClick={() => {
              setDrawerOpen(false);
            }}
          />
          <ClippedDrawer
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            <Suspense fallback={<LoadingBar />}>
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/generate" element={<Generate />} />
                <Route exact path="/advisor" element={<Advisor />} />
                <Route exact path="/vault" element={<Vault />} />
                <Route exact path="/settings" element={<Settings />} />
                <Route exact path="/about" element={<About />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </Box>
        </Box>
        {error && error.length > 0 ? (
          <AlertDialog
            open
            title={language.error}
            content={error}
            agreeLabel={language.ok}
            onOk={closeAlertDialog}
            onClose={closeAlertDialog}
          />
        ) : null}
        {}
        {update && update.updateAvailable ? (
          <UpdateDialog
            downloadUrl={update.updateUrl}
            infoUrl={update.infoUrl}
            openWebsite={openWebSite}
            newVersion={update.version}
            onClose={() => d1(setUpdate(null))}
            updateAvailable={language.updateAvailable}
            newVersionText={language.newVersion}
            information={language.information}
            download={language.download}
            cancel={language.cancel}
          />
        ) : update && !update.updateAvailable && checkedForUpdates ? (
          <AlertDialog
            open
            title={language.checkForUpdates}
            content={language.runningLatestVersion}
            onOk={closeNoUpdate}
            onClose={closeNoUpdate}
            agreeLabel={language.ok}
          />
        ) : null}
        <Snackbar open={snackOpen} onClose={closeSnack}>
          <Alert onClose={closeSnack} severity="info" sx={{ width: '100%' }}>
            <Typography>{language.downloadApp}</Typography>
            <Button
              onClick={() =>
                openWebSite('https://codedead.com/software/advanced-passgen')
              }
              size="small"
              color="secondary"
            >
              {language.download}
            </Button>
          </Alert>
        </Snackbar>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
