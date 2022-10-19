import React, {
  useContext, useEffect, useState, lazy, Suspense,
} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { type } from '@tauri-apps/api/os';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { MainContext } from '../../contexts/MainContextProvider';
import ThemeSelector from '../../utils/ThemeSelector';
import TopBar from '../TopBar';
import ClippedDrawer from '../ClippedDrawer';
import UpdateDialog from '../UpdateDialog';
import { openWebSite, setError, setUpdate } from '../../reducers/MainReducer/Actions';
import Updater from '../../utils/Updater';
import AlertDialog from '../AlertDialog';
import packageJson from '../../../package.json';
import LoadingBar from '../LoadingBar';

const Home = lazy(() => import('../../routes/Home'));
const Advanced = lazy(() => import('../../routes/Advanced'));
const Generate = lazy(() => import('../../routes/Generate'));
const About = lazy(() => import('../../routes/About'));
const Settings = lazy(() => import('../../routes/Settings'));
const Advisor = lazy(() => import('../../routes/Advisor'));
const NotFound = lazy(() => import('../../routes/NotFound'));

const App = () => {
  const [state, d1] = useContext(MainContext);
  const {
    themeIndex, themeType, update, languageIndex, autoUpdate, error,
  } = state;

  const [loading, setLoading] = useState(false);
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
   * Open a website
   * @param website The website that needs to be opened
   */
  const openWebsite = (website) => {
    d1(openWebSite(website));
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
          })
          .catch((err) => {
            d1(setError(err));
          });
      })
      .catch((e) => {
        d1(setError(e));
      })
      .finally(() => {
        setLoading(false);
      });
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

  useEffect(() => {
    // eslint-disable-next-line no-underscore-dangle
    if (window.__TAURI__) {
      if (autoUpdate) {
        checkForUpdates();
      }
    } else {
      setSnackOpen(true);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <Box sx={{ display: 'flex' }}>
          <TopBar />
          <ClippedDrawer />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            <Suspense fallback={<LoadingBar />}>
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/advanced" element={<Advanced />} />
                <Route exact path="/generate" element={<Generate />} />
                <Route exact path="/advisor" element={<Advisor />} />
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
        {update && update.updateAvailable ? (
          <UpdateDialog
            downloadUrl={update.updateUrl}
            infoUrl={update.infoUrl}
            openWebsite={openWebsite}
            newVersion={update.version}
            onClose={() => d1(setUpdate(null))}
            updateAvailable={language.updateAvailable}
            newVersionText={language.newVersion}
            information={language.information}
            download={language.download}
            cancel={language.cancel}
          />
        ) : null}
        <Snackbar open={snackOpen} onClose={closeSnack}>
          <Alert onClose={closeSnack} severity="info" sx={{ width: '100%' }}>
            <Typography>
              {language.downloadApp}
            </Typography>
            <Button
              onClick={() => window.open('https://codedead.com/software/advanced-passgen')}
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
