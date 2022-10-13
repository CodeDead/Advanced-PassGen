import React, { useContext, useEffect } from 'react';
import {
  Card, CardContent, Checkbox, Container, FormControlLabel, FormGroup, Grid, TextField,
} from '@mui/material';
import { MainContext } from '../../contexts/MainContextProvider';
import { setPageIndex } from '../../reducers/MainReducer/Actions';
import { PasswordContext } from '../../contexts/PasswordContextProvider';
import {
  setBrackets,
  setCapitalLetters, setNumbers,
  setPasswordAmount,
  setPasswordLength, setSmallLetters,
  setSpaces, setSpecialCharacters,
} from '../../reducers/PasswordReducer/Actions';

const Home = () => {
  const [state, d1] = useContext(MainContext);
  const [state2, d2] = useContext(PasswordContext);

  const { languageIndex } = state;
  const language = state.languages[languageIndex];

  const {
    min,
    max,
    amount,
    smallLetters,
    capitalLetters,
    spaces,
    specialCharacters,
    numbers,
    brackets,
  } = state2;
  const length = max - min + 1;

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
                onChange={(e) => d2(setPasswordLength(1, e.target.value))}
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
    </Container>
  );
};

export default Home;
