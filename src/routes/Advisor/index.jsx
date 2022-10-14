import React, { useContext, useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { MainContext } from '../../contexts/MainContextProvider';
import LinearProgressWithLabel from '../../components/LinearProgressWithLabel';
import PasswordStrength from '../../utils/PasswordStrength';
import { setPageIndex } from '../../reducers/MainReducer/Actions';

const Advisor = () => {
  const [state, d1] = useContext(MainContext);
  const { languageIndex } = state;
  const language = state.languages[languageIndex];

  const [password, setPassword] = useState('');

  useEffect(() => {
    d1(setPageIndex(3));
  }, []);

  return (
    <Container>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={12}>
              <TextField
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
