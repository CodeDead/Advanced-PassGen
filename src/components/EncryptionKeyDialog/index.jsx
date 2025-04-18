import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { MainContext } from '../../contexts/MainContextProvider';

const EncryptionKeyDialog = ({ title, open, onAccept, onClose, verify }) => {
  const [state] = useContext(MainContext);
  const language = state.languages[state.languageIndex];

  const [key, setKey] = useState('');
  const [key2, setKey2] = useState('');

  /**
   * Close the dialog
   */
  const handleClose = () => {
    setKey('');
    setKey2('');
    if (onClose) {
      onClose();
    }
  };

  /**
   * Accept the encryption/decryption key
   */
  const accept = () => {
    if (key.length === 0) {
      return;
    }
    if (verify && key !== key2) {
      return;
    }
    if (onAccept) {
      onAccept(key);
    }
    handleClose();
  };

  /**
   * Change the key value
   * @param e The event argument
   */
  const handleChange = (e) => {
    setKey(e.target.value);
  };

  /**
   * Change the verification key value
   * @param e The event argument
   */
  const handleVerifyChange = (e) => {
    setKey2(e.target.value);
  };

  /**
   * Handle the key up event
   * @param e The event argument
   */
  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      accept();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="create-vault-dialog-title"
    >
      <DialogTitle id="create-vault-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid size={12}>
            <TextField
              value={key}
              type="password"
              error={key.length === 0 || (verify && key !== key2)}
              label={language.decryptionKey}
              onChange={handleChange}
              onKeyUp={handleKeyUp}
              autoComplete="off"
              variant="outlined"
              fullWidth
            />
          </Grid>
          {verify ? (
            <Grid size={12}>
              <TextField
                value={key2}
                type="password"
                error={key2.length === 0 || (verify && key !== key2)}
                label={language.decryptionKey}
                onChange={handleVerifyChange}
                onKeyUp={handleKeyUp}
                autoComplete="off"
                variant="outlined"
                fullWidth
              />
            </Grid>
          ) : null}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{language.cancel}</Button>
        <Button
          onClick={accept}
          autoFocus
          disabled={key.length === 0 || (verify && key !== key2)}
        >
          {language.ok}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EncryptionKeyDialog;
