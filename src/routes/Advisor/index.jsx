import React, {
  useContext, useEffect, useState, useRef,
} from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { MainContext } from '../../contexts/MainContextProvider';
import LinearProgressWithLabel from '../../components/LinearProgressWithLabel';
import PasswordStrength from '../../utils/PasswordStrength';
import { setPageIndex } from '../../reducers/MainReducer/Actions';

const Advisor = () => {
  const [state, d1] = useContext(MainContext);

  const { languageIndex, tips } = state;
  const language = state.languages[languageIndex];

  const [password, setPassword] = useState('');
  const [tipsOpen, setTipsOpen] = useState(tips);
  const intervalId = useRef();
  const [currentTip, setCurrentTip] = useState(language.passwordTips[Math.floor(Math.random()
    * language.passwordTips.length)]);

  /**
   * Update the password
   * @param event The event argument
   */
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  /**
   * Generate a new tipper
   */
  const generateNewTipper = () => {
    if (intervalId.current !== null) {
      clearInterval(intervalId.current);
    }

    const x = setInterval(() => {
      setCurrentTip(language.passwordTips[Math.floor(Math.random()
        * language.passwordTips.length)]);
    }, 10000);

    intervalId.current = x;
  };

  useEffect(() => {
    d1(setPageIndex(2));
    if (tips) {
      generateNewTipper();
    }

    return () => (intervalId !== null
      ? clearInterval(intervalId.current)
      : null);
  }, []);

  useEffect(() => {
    if (tips) {
      setCurrentTip(language.passwordTips[Math.floor(Math.random()
        * language.passwordTips.length)]);
    }
  }, [language]);

  useEffect(() => {
    if (tips) {
      generateNewTipper();
    } else {
      clearInterval(intervalId.current);
    }
  }, [tips]);

  return (
    <Container>
      <Typography component="h2" variant="h5" color="primary" gutterBottom>
        {language.checkPasswordStrength}
      </Typography>
      <Collapse in={tipsOpen}>
        <Alert
          severity="info"
          action={(
            <IconButton
              aria-label="close"
              color="inherit"
              onClick={() => {
                setTipsOpen(false);
                clearInterval(intervalId.current);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          )}
          sx={{ mb: 2 }}
        >
          <AlertTitle>{language.tips}</AlertTitle>
          {currentTip}
        </Alert>
      </Collapse>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={12}>
              <TextField
                value={password}
                onChange={handlePasswordChange}
                label={language.password}
                fullWidth
                type="password"
              />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <LinearProgressWithLabel value={PasswordStrength(password)} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Advisor;
