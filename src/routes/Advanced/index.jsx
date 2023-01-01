import React, { useContext, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import { createWorkerFactory, useWorker } from '@shopify/react-web-worker';
import { setError, setLoading, setPageIndex } from '../../reducers/MainReducer/Actions';
import { MainContext } from '../../contexts/MainContextProvider';
import { PasswordContext } from '../../contexts/PasswordContextProvider';
import {
  generatePasswordArray, getFullCharacterSet,
  setAllowDuplicates,
  setCharacterSet, setPasswords,
  setUseAdvanced,
} from '../../reducers/PasswordReducer/Actions';
import LoadingBar from '../../components/LoadingBar';

const createWorker = createWorkerFactory(() => import('../../utils/PasswordGenerator/index'));

const Advanced = () => {
  const [state1, d1] = useContext(MainContext);
  const [state2, d2] = useContext(PasswordContext);

  const { languageIndex, loading } = state1;
  const {
    characterSet, useAdvanced, allowDuplicates, smallLetters, capitalLetters, spaces,
    specialCharacters, numbers, brackets, min, max, amount,
  } = state2;

  const language = state1.languages[languageIndex];

  const navigate = useNavigate();
  const worker = useWorker(createWorker);

  /**
   * Generate passwords
   */
  const generatePasswords = () => {
    const simpleCharacterSet = getFullCharacterSet(
      characterSet,
      useAdvanced,
      smallLetters,
      capitalLetters,
      spaces,
      numbers,
      specialCharacters,
      brackets,
    );

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
    d1(setPageIndex(1));
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
              <FormGroup>
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={allowDuplicates}
                      onChange={(e) => d2(setAllowDuplicates(e.target.checked))}
                    />
                  )}
                  label={language.allowDuplicates}
                />
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={useAdvanced}
                      onChange={(e) => d2(setUseAdvanced(e.target.checked))}
                    />
                  )}
                  label={language.useCustomCharacterSet}
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <TextField
                label={language.characterSet}
                disabled={!useAdvanced}
                value={characterSet}
                fullWidth
                onChange={(e) => d2(setCharacterSet(e.target.value))}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Button
        variant="contained"
        color="primary"
        style={{ float: 'left' }}
        sx={{ mt: 2 }}
        onClick={() => navigate('/')}
      >
        {language.general}
      </Button>
      <Button
        variant="contained"
        color="primary"
        style={{ float: 'right' }}
        sx={{ mt: 2 }}
        onClick={generatePasswords}
      >
        {language.generate}
      </Button>
    </Container>
  );
};

export default Advanced;
