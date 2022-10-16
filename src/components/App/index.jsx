import React, { useContext, useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { type } from '@tauri-apps/api/os';
import { MainContext } from '../../contexts/MainContextProvider';
import ThemeSelector from '../../utils/ThemeSelector';
import TopBar from '../TopBar';
import ClippedDrawer from '../ClippedDrawer';
import Home from '../../routes/Home';
import Advanced from '../../routes/Advanced';
import Generate from '../../routes/Generate';
import About from '../../routes/About';
import Settings from '../../routes/Settings';
import Advisor from '../../routes/Advisor';
import UpdateDialog from '../UpdateDialog';
import { openWebSite, setError, setUpdate } from '../../reducers/MainReducer/Actions';
import Updater from '../../utils/Updater';
import AlertDialog from '../AlertDialog';
import packageJson from '../../../package.json';

const App = () => {
  const [state, d1] = useContext(MainContext);
  const {
    themeIndex, themeType, update, languageIndex, autoUpdate, error,
  } = state;

  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    // eslint-disable-next-line no-underscore-dangle
    if (autoUpdate && window.__TAURI__) {
      checkForUpdates();
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
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/advanced" element={<Advanced />} />
              <Route exact path="/generate" element={<Generate />} />
              <Route exact path="/advisor" element={<Advisor />} />
              <Route exact path="/settings" element={<Settings />} />
              <Route exact path="/about" element={<About />} />
            </Routes>
          </Box>
        </Box>
        {error && error.length > 0 ? (
          <AlertDialog
            open
            title={language.error}
            content={error}
            agreeLabel={language.ok}
            onOk={() => d1(setError(null))}
            onClose={() => d1(setError(null))}
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
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
