import React, {
  useContext, useEffect, useState,
} from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ReactGA from 'react-ga4';
import { MainContext } from '../../contexts/MainContextProvider';
import LinearProgressWithLabel from '../../components/LinearProgressWithLabel';
import PasswordStrength from '../../utils/PasswordStrength';
import { setPageIndex } from '../../reducers/MainReducer/Actions';
import PasswordTips from '../../components/PasswordTips';

const Advisor = () => {
  const [state, d1] = useContext(MainContext);

  const { languageIndex, allowCookies } = state;
  const language = state.languages[languageIndex];

  const [password, setPassword] = useState('');

  /**
   * Update the password
   * @param event The event argument
   */
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    d1(setPageIndex(2));
    document.title = 'Advisor | Advanced PassGen';
    if (allowCookies) {
      ReactGA.send({
        hitType: 'pageview',
        page: '/about',
        title: 'Advisor | Advanced PassGen',
      });
    }
  }, []);

  return (
    <Container>
      <Typography component="h2" variant="h5" color="primary" gutterBottom>
        {language.checkPasswordStrength}
      </Typography>
      <PasswordTips />
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField
                value={password}
                onChange={handlePasswordChange}
                label={language.password}
                fullWidth
                type="password"
              />
            </Grid>
            <Grid size={12}>
              <LinearProgressWithLabel value={PasswordStrength(password)} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Advisor;
