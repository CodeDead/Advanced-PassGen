import React, { useContext, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { MainContext } from '../../contexts/MainContextProvider';

const EncryptionKeyDialog = ({ open, onAccept, onClose }) => {
  const [state] = useContext(MainContext);
  const language = state.languages[state.languageIndex];

  const [key, setKey] = useState('');

  /**
   * Close the dialog
   */
  const handleClose = () => {
    setKey('');
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
      <DialogTitle id="create-vault-dialog-title">
        {language.decryptionKey}
      </DialogTitle>
      <DialogContent>
        <TextField
          sx={{ mt: 2 }}
          value={key}
          type="password"
          error={key.length === 0}
          label={language.decryptionKey}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          autoComplete="off"
          variant="outlined"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          {language.cancel}
        </Button>
        <Button
          onClick={accept}
          autoFocus
          disabled={key.length === 0}
        >
          {language.ok}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EncryptionKeyDialog;
