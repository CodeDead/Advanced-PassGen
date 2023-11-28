import React, { useContext, useEffect } from 'react';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { createWorkerFactory, useWorker } from '@shopify/react-web-worker';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import { MainContext } from '../../contexts/MainContextProvider';
import { setError, setLoading, setPageIndex } from '../../reducers/MainReducer/Actions';
import { PasswordContext } from '../../contexts/PasswordContextProvider';
import {
  generatePasswordArray,
  getFullCharacterSet,
  setAllowDuplicates,
  setBrackets,
  setCapitalLetters,
  setCharacterSet,
  setNumbers,
  setPasswordAmount,
  setPasswordLengthMax,
  setPasswordLengthMin,
  setPasswords,
  setSmallLetters,
  setSpaces,
  setSpecialCharacters,
  setUseAdvanced,
} from '../../reducers/PasswordReducer/Actions';
import LoadingBar from '../../components/LoadingBar';
import PasswordTips from '../../components/PasswordTips';

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

  const cannotGenerate = !simpleCharacterSet || simpleCharacterSet.length === 0
    || min > max || max < min;

  /**
   * Generate passwords
   */
  const generatePasswords = () => {
    if (cannotGenerate) {
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

  /**
   * Change a number value
   * @param e The change event
   * @param action The action to dispatch
   */
  const changeNumberValue = (e, action) => {
    if (e.target.value && e.target.value.length > 0) {
      switch (action) {
        case 'min':
          d2(setPasswordLengthMin(parseInt(e.target.value, 10)));
          break;
        case 'max':
          d2(setPasswordLengthMax(parseInt(e.target.value, 10)));
          break;
        case 'amount':
        default:
          d2(setPasswordAmount(parseInt(e.target.value, 10)));
          break;
      }
    }
  };

  /**
   * Change whether duplicates are allowed or not
   * @param event The event argument
   */
  const handleDuplicateChange = (event) => {
    d2(setAllowDuplicates(event.target.checked));
  };

  /**
   * Change whether advanced options are being used or not
   * @param event The event argument
   */
  const handleAdvancedChange = (event) => {
    d2(setUseAdvanced(event.target.checked));
  };

  /**
   * Change the character set
   * @param event The event argument
   */
  const handleCharacterSetChange = (event) => {
    d2(setCharacterSet(event.target.value));
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
      <PasswordTips />
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={6}>
              <TextField
                label={language.minimumLength}
                type="number"
                autoComplete="off"
                value={min}
                error={min > max}
                fullWidth
                onChange={(e) => changeNumberValue(e, 'min')}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <TextField
                label={language.maximumLength}
                type="number"
                autoComplete="off"
                value={max}
                error={max < min}
                fullWidth
                onChange={(e) => changeNumberValue(e, 'max')}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <TextField
                type="number"
                autoComplete="off"
                label={language.amount}
                value={amount}
                error={amount.length === 0 || amount < 1}
                onChange={(e) => changeNumberValue(e, 'amount')}
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
      <Accordion
        sx={{ mt: 2 }}
        /* eslint-disable-next-line no-underscore-dangle */
        defaultExpanded={!window.__TAURI__}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
            {language.advanced}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={12}>
              <FormGroup>
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={allowDuplicates}
                      onChange={handleDuplicateChange}
                    />
                  )}
                  label={language.allowDuplicates}
                />
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={useAdvanced}
                      onChange={handleAdvancedChange}
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
                onChange={handleCharacterSetChange}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Button
        variant="contained"
        color="primary"
        style={{ float: 'right' }}
        sx={{ mt: 2 }}
        disabled={cannotGenerate}
        onClick={generatePasswords}
      >
        {language.generate}
      </Button>
    </Container>
  );
};

export default Home;
