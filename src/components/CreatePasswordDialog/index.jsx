import React, { useContext, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { MainContext } from '../../contexts/MainContextProvider';

const CreatePasswordDialog = ({ open, onCreate, onClose }) => {
  const [state] = useContext(MainContext);
  const language = state.languages[state.languageIndex];

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [password, setPassword] = useState('');

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
        <TextField
          sx={{ mt: 2 }}
          value={title}
          error={title.length === 0}
          label={language.title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyUp={handleKeyUp}
          autoComplete="off"
          variant="outlined"
          fullWidth
        />
        <TextField
          sx={{ mt: 2 }}
          value={description}
          label={language.description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyUp={handleKeyUp}
          autoComplete="off"
          variant="outlined"
          fullWidth
        />
        <TextField
          sx={{ mt: 2 }}
          value={url}
          label={language.url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyUp={handleKeyUp}
          autoComplete="off"
          variant="outlined"
          fullWidth
        />
        <TextField
          sx={{ mt: 2 }}
          value={password}
          type="password"
          error={password.length === 0}
          label={language.password}
          onChange={(e) => setPassword(e.target.value)}
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
