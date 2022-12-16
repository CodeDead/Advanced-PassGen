import React, { useContext, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { MainContext } from '../../contexts/MainContextProvider';

const CreateVaultDialog = ({ open, onCreate, onClose }) => {
  const [state] = useContext(MainContext);
  const language = state.languages[state.languageIndex];

  const [key, setKey] = useState('');

  /**
   * Close the dialog
   */
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
    setKey('');
  };

  /**
   * Create a new vault
   */
  const create = () => {
    if (onCreate) {
      onCreate(key);
    }
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="create-vault-dialog-title"
    >
      <DialogTitle id="create-vault-dialog-title">
        {language.createVault}
      </DialogTitle>
      <DialogContent>
        <TextField
          sx={{ mt: 2 }}
          value={key}
          error={key.length === 0}
          label={language.decryptionKey}
          onChange={(e) => setKey(e.target.value)}
          autoComplete="off"
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          {language.cancel}
        </Button>
        <Button
          onClick={create}
          autoFocus
          disabled={key.length === 0}
        >
          {language.ok}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateVaultDialog;
