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
import { MainContext } from '../../contexts/MainContextProvider';
import { PasswordContext } from '../../contexts/PasswordContextProvider';
import { setError } from '../../reducers/MainReducer/Actions';
import {
  generatePasswordArray,
  getFullCharacterSet,
} from '../../reducers/PasswordReducer/Actions';
import PasswordStrength from '../../utils/PasswordStrength';
import LinearProgressWithLabel from '../LinearProgressWithLabel';

const EditPasswordDialog = ({ data, open, onSave, onClose }) => {
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

  const [title, setTitle] = useState(data && data.title ? data.title : '');
  const [description, setDescription] = useState(
    data && data.description ? data.description : '',
  );
  const [url, setUrl] = useState(data && data.url ? data.url : '');
  const [password, setPassword] = useState(
    data && data.password ? data.password : '',
  );
  const [username, setUsername] = useState(
    data && data.username ? data.username : '',
  );
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
  };

  /**
   * Create a new vault
   */
  const save = () => {
    if (onSave) {
      onSave(data.id, title, description, url, username, password);
    }
    handleClose();
  };

  /**
   * Handle the key up event
   * @param e The event argument
   */
  const handleKeyUp = (e) => {
    if (e.key === 'Enter' && password.length > 0 && title.length > 0) {
      save();
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
      null,
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
      aria-labelledby="edit-vault-dialog-title"
    >
      <DialogTitle id="edit-vault-dialog-title">
        {language.editPassword}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid size={12}>
            <TextField
              value={data.id}
              label={language.id}
              autoComplete="off"
              variant="outlined"
              disabled
              fullWidth
            />
          </Grid>
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
          <Grid size={{ xs: 12, md: 8, lg: 8 }}>
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
          <Grid size={{ xs: 6, md: 2, lg: 2 }}>
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
          <Grid size={{ xs: 6, md: 2, lg: 2 }}>
            <IconButton
              color="primary"
              size="large"
              sx={{ width: '100%', height: '100%' }}
              disabled={cannotGenerate}
              onClick={generatePassword}
            >
              <RefreshIcon fontSize="inherit" />
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
          onClick={save}
          autoFocus
          disabled={password.length === 0 || title.length === 0}
        >
          {language.save}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditPasswordDialog;
