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
import { setPageIndex } from '../../reducers/MainReducer/Actions';
import { MainContext } from '../../contexts/MainContextProvider';
import { PasswordContext } from '../../contexts/PasswordContextProvider';
import {
  setAllowDuplicates,
  setCharacterSet,
  setUseAdvanced,
} from '../../reducers/PasswordReducer/Actions';

const Advanced = () => {
  const [state1, d1] = useContext(MainContext);
  const [state2, d2] = useContext(PasswordContext);

  const { languageIndex } = state1;
  const { characterSet, useAdvanced, allowDuplicates } = state2;

  const language = state1.languages[languageIndex];
  const navigate = useNavigate();

  useEffect(() => {
    d1(setPageIndex(1));
  }, []);

  return (
    <Container>
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
      <Card
        sx={{ mt: 2 }}
      >
        <CardContent>
          <Grid container spacing={2}>
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
        onClick={() => navigate('/generate')}
      >
        {language.generate}
      </Button>
    </Container>
  );
};

export default Advanced;
