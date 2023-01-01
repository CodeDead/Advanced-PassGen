import React, { useContext, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import RefreshIcon from '@mui/icons-material/Refresh';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { MainContext } from '../../contexts/MainContextProvider';
import PasswordStrength from '../../utils/PasswordStrength';
import LinearProgressWithLabel from '../LinearProgressWithLabel';
import { setError } from '../../reducers/MainReducer/Actions';
import { generatePasswordArray, getFullCharacterSet } from '../../reducers/PasswordReducer/Actions';
import { PasswordContext } from '../../contexts/PasswordContextProvider';

const CreatePasswordDialog = ({ open, onCreate, onClose }) => {
  const [state, d1] = useContext(MainContext);
  const [state2] = useContext(PasswordContext);

  const language = state.languages[state.languageIndex];
  const {
    min,
    max,
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

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  /**
   * Close the dialog
   */
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
    setTitle('');
    setDescription('');
    setUrl('');
    setPassword('');
  };

  /**
   * Create a new vault
   */
  const create = () => {
    if (onCreate) {
      onCreate(title, description, url, password);
    }
    handleClose();
  };

  /**
   * Handle the key up event
   * @param e The event argument
   */
  const handleKeyUp = (e) => {
    if (e.key === 'Enter' && password.length > 0 && title.length > 0) {
      create();
    }
  };

  /**
   * Generate passwords
   */
  const generatePassword = () => {
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

    generatePasswordArray(min, max, simpleCharacterSet, 1, allowDuplicates, null)
      .then((res) => {
        setPassword(res[0]);
      })
      .catch((err) => {
        d1(setError(err));
      });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="create-vault-dialog-title"
    >
      <DialogTitle id="create-vault-dialog-title">
        {language.createPassword}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} md={12} lg={12}>
            <TextField
              value={title}
              error={title.length === 0}
              label={language.title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyUp={handleKeyUp}
              autoComplete="off"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <TextField
              value={description}
              label={language.description}
              onChange={(e) => setDescription(e.target.value)}
              onKeyUp={handleKeyUp}
              autoComplete="off"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <TextField
              value={url}
              label={language.url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyUp={handleKeyUp}
              autoComplete="off"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={8} lg={8}>
            <TextField
              value={password}
              type={showPassword ? 'text' : 'password'}
              error={password.length === 0}
              label={language.password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyUp={handleKeyUp}
              autoComplete="off"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6} md={2} lg={2}>
            <IconButton
              color="primary"
              size="large"
              sx={{ width: '100%', height: '100%' }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <VisibilityOffIcon fontSize="inherit" />
              ) : (
                <VisibilityIcon fontSize="inherit" />
              )}
            </IconButton>
          </Grid>
          <Grid item xs={6} md={2} lg={2}>
            <IconButton
              color="primary"
              size="large"
              sx={{ width: '100%', height: '100%' }}
              onClick={generatePassword}
            >
              <RefreshIcon fontSize="inherit" />
            </IconButton>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <LinearProgressWithLabel value={PasswordStrength(password)} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          {language.cancel}
        </Button>
        <Button
          onClick={create}
          autoFocus
          disabled={password.length === 0 || title.length === 0}
        >
          {language.ok}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreatePasswordDialog;
