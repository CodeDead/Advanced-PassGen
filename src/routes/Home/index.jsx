import React, { useContext, useEffect } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { MainContext } from '../../contexts/MainContextProvider';
import { setPageIndex } from '../../reducers/MainReducer/Actions';
import { PasswordContext } from '../../contexts/PasswordContextProvider';
import {
  setBrackets,
  setCapitalLetters,
  setNumbers,
  setPasswordAmount,
  setPasswordLength,
  setSmallLetters,
  setSpaces,
  setSpecialCharacters,
} from '../../reducers/PasswordReducer/Actions';

const Home = () => {
  const [state, d1] = useContext(MainContext);
  const [state2, d2] = useContext(PasswordContext);

  const { languageIndex } = state;
  const language = state.languages[languageIndex];

  const {
    length,
    amount,
    smallLetters,
    capitalLetters,
    spaces,
    specialCharacters,
    numbers,
    brackets,
  } = state2;

  const navigate = useNavigate();

  useEffect(() => {
    d1(setPageIndex(0));
  }, []);

  return (
    <Container>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={12}>
              <TextField
                type="number"
                label={language.length}
                value={length}
                onChange={(e) => d2(setPasswordLength(e.target.value))}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <TextField
                type="number"
                label={language.amount}
                value={amount}
                onChange={(e) => d2(setPasswordAmount(e.target.value))}
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6} md={6} lg={6}>
              <FormGroup>
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={smallLetters}
                      onChange={(e) => d2(setSmallLetters(e.target.checked))}
                    />
                  )}
                  label={language.smallLetters}
                />
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={capitalLetters}
                      onChange={(e) => d2(setCapitalLetters(e.target.checked))}
                    />
                  )}
                  label={language.capitalLetters}
                />
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={spaces}
                      onChange={(e) => d2(setSpaces(e.target.checked))}
                    />
                  )}
                  label={language.spaces}
                />
              </FormGroup>
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
              <FormGroup>
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={specialCharacters}
                      onChange={(e) => d2(setSpecialCharacters(e.target.checked))}
                    />
                  )}
                  label={language.specialCharacters}
                />
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={numbers}
                      onChange={(e) => d2(setNumbers(e.target.checked))}
                    />
                  )}
                  label={language.numbers}
                />
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={brackets}
                      onChange={(e) => d2(setBrackets(e.target.checked))}
                    />
                  )}
                  label={language.brackets}
                />
              </FormGroup>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Button
        variant="contained"
        color="primary"
        style={{ float: 'right' }}
        sx={{ mt: 2, ml: 2 }}
        onClick={() => navigate('/generate')}
      >
        {language.generate}
      </Button>
      <Button
        variant="contained"
        color="primary"
        style={{ float: 'right' }}
        sx={{ mt: 2 }}
        onClick={() => navigate('/advanced')}
      >
        {language.advanced}
      </Button>
    </Container>
  );
};

export default Home;
