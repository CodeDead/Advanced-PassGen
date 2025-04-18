import React, { useContext, useState } from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import { createWorkerFactory, useWorker } from '@shopify/react-web-worker';
import { MainContext } from '../../contexts/MainContextProvider';
import { PasswordContext } from '../../contexts/PasswordContextProvider';
import { setError } from '../../reducers/MainReducer/Actions';
import {
  generatePasswordArray,
  getFullCharacterSet,
} from '../../reducers/PasswordReducer/Actions';
import PasswordStrength from '../../utils/PasswordStrength';
import LinearProgressWithLabel from '../LinearProgressWithLabel';

const createWorker = createWorkerFactory(
  () => import('../../utils/PasswordGenerator/index'),
);

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
    includeSymbols,
    allowDuplicates,
    useEmojis,
  } = state2;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const simpleCharacterSet = getFullCharacterSet(
    characterSet,
    useAdvanced,
    smallLetters,
    capitalLetters,
    spaces,
    numbers,
    specialCharacters,
    brackets,
    useEmojis,
  );

  const worker = useWorker(createWorker);

  const cannotGenerate =
    !simpleCharacterSet ||
    simpleCharacterSet.length === 0 ||
    min > max ||
    max < min;

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
    setUsername('');
  };

  /**
   * Create a new vault
   */
  const create = () => {
    if (onCreate) {
      onCreate(title, description, url, username, password);
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
    if (cannotGenerate) {
      return;
    }

    generatePasswordArray(
      min,
      max,
      simpleCharacterSet,
      includeSymbols,
      1,
      allowDuplicates,
      worker,
    )
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
          <Grid size={12}>
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
          <Grid size={12}>
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
          <Grid size={12}>
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
          <Grid size={12}>
            <TextField
              value={username}
              type="text"
              label={language.username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyUp={handleKeyUp}
              autoComplete="off"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 10, lg: 10 }}>
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
          <Grid size={{ xs: 6, md: 1, lg: 1 }}>
            <IconButton
              color="primary"
              size="large"
              sx={{ width: '100%', height: '100%' }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <Tooltip title={language.hidePassword}>
                  <VisibilityOffIcon fontSize="inherit" />
                </Tooltip>
              ) : (
                <Tooltip title={language.showPassword}>
                  <VisibilityIcon fontSize="inherit" />
                </Tooltip>
              )}
            </IconButton>
          </Grid>
          <Grid size={{ xs: 6, md: 1, lg: 1 }}>
            <IconButton
              color="primary"
              size="large"
              sx={{ width: '100%', height: '100%' }}
              disabled={cannotGenerate}
              onClick={generatePassword}
            >
              <Tooltip title={language.generate}>
                <RefreshIcon fontSize="inherit" />
              </Tooltip>
            </IconButton>
          </Grid>
          <Grid size={12}>
            <LinearProgressWithLabel value={PasswordStrength(password)} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{language.cancel}</Button>
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
