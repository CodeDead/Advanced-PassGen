import React, { useContext, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { MainContext } from '../../contexts/MainContextProvider';
import PasswordStrength from '../../utils/PasswordStrength';
import LinearProgressWithLabel from '../LinearProgressWithLabel';

const EditPasswordDialog = ({
  data, open, onSave, onClose,
}) => {
  const [state] = useContext(MainContext);
  const language = state.languages[state.languageIndex];

  const [title, setTitle] = useState(data && data.title ? data.title : '');
  const [description, setDescription] = useState(data && data.description ? data.description : '');
  const [url, setUrl] = useState(data && data.url ? data.url : '');
  const [password, setPassword] = useState(data && data.password ? data.password : '');

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
      onSave(data.id, title, description, url, password);
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
        <LinearProgressWithLabel value={PasswordStrength(password)} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          {language.cancel}
        </Button>
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
