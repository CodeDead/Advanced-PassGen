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
import { createWorkerFactory, useWorker } from '@shopify/react-web-worker';
import { MainContext } from '../../contexts/MainContextProvider';
import { setError, setLoading, setPageIndex } from '../../reducers/MainReducer/Actions';
import { PasswordContext } from '../../contexts/PasswordContextProvider';
import {
  generatePasswordArray,
  setBrackets,
  setCapitalLetters,
  setNumbers,
  setPasswordAmount,
  setPasswordLengthMax,
  setPasswordLengthMin, setPasswords,
  setSmallLetters,
  setSpaces,
  setSpecialCharacters,
} from '../../reducers/PasswordReducer/Actions';
import LoadingBar from '../../components/LoadingBar';

const createWorker = createWorkerFactory(() => import('../../utils/PasswordGenerator/index'));

const Home = () => {
  const [state, d1] = useContext(MainContext);
  const [state2, d2] = useContext(PasswordContext);

  const { languageIndex, loading } = state;
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
    useAdvanced,
    characterSet,
    allowDuplicates,
  } = state2;

  const navigate = useNavigate();
  const worker = useWorker(createWorker);

  /**
   * Generate passwords
   */
  const generatePasswords = () => {
    let simpleCharacterSet = characterSet;
    if (!useAdvanced) {
      simpleCharacterSet = '';
      if (smallLetters) {
        simpleCharacterSet += 'abcdefghijklmnopqrstuvwxyz';
      }
      if (capitalLetters) {
        simpleCharacterSet += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      }
      if (spaces) {
        simpleCharacterSet += ' ';
      }
      if (specialCharacters) {
        simpleCharacterSet += '=+-_!?.,;:\'\\"/%^*$€£&µ@#';
      }
      if (numbers) {
        simpleCharacterSet += '0123456789';
      }
      if (brackets) {
        simpleCharacterSet += '[]{}()<>';
      }
    }

    if (!simpleCharacterSet || simpleCharacterSet.length === 0 || min > max || max < min) {
      return;
    }

    d1(setLoading(true));
    generatePasswordArray(min, max, simpleCharacterSet, amount, allowDuplicates, worker)
      .then((res) => {
        d2(setPasswords(res));
        navigate('/generate');
      })
      .catch((err) => {
        d1(setError(err));
      })
      .finally(() => {
        d1(setLoading(false));
      });
  };

  useEffect(() => {
    d1(setPageIndex(0));
  }, []);

  if (loading) {
    return (
      <LoadingBar />
    );
  }

  return (
    <Container>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={12}>
              <TextField
                label={language.minimumLength}
                type="number"
                value={min}
                error={min > max}
                fullWidth
                onChange={(e) => d2(setPasswordLengthMin(parseInt(e.target.value, 10)))}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <TextField
                label={language.maximumLength}
                type="number"
                value={max}
                error={max < min}
                fullWidth
                onChange={(e) => d2(setPasswordLengthMax(parseInt(e.target.value, 10)))}
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
                      disabled={useAdvanced}
                      onChange={(e) => d2(setSmallLetters(e.target.checked))}
                    />
                  )}
                  label={language.smallLetters}
                />
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={capitalLetters}
                      disabled={useAdvanced}
                      onChange={(e) => d2(setCapitalLetters(e.target.checked))}
                    />
                  )}
                  label={language.capitalLetters}
                />
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={spaces}
                      disabled={useAdvanced}
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
                      disabled={useAdvanced}
                      onChange={(e) => d2(setSpecialCharacters(e.target.checked))}
                    />
                  )}
                  label={language.specialCharacters}
                />
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={numbers}
                      disabled={useAdvanced}
                      onChange={(e) => d2(setNumbers(e.target.checked))}
                    />
                  )}
                  label={language.numbers}
                />
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={brackets}
                      disabled={useAdvanced}
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
        onClick={generatePasswords}
      >
        {language.generate}
      </Button>
      <Button
        variant="contained"
        color="primary"
        style={{ float: 'left' }}
        sx={{ mt: 2 }}
        onClick={() => navigate('/advanced')}
      >
        {language.advanced}
      </Button>
    </Container>
  );
};

export default Home;
