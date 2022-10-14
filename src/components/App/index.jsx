import React, { useContext } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

const App = () => {
  const [state] = useContext(MainContext);
  const { themeIndex, themeType } = state;

  const color = ThemeSelector(themeIndex);

  const theme = createTheme({
    palette: {
      primary: color,
      mode: themeType,
    },
  });

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
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
