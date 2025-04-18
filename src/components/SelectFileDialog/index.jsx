import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

const SelectFileDialog = ({
  open,
  onClose,
  onAccept,
  selectFileLabel,
  cancelLabel,
  acceptLabel,
}) => {
  const [data, setData] = useState(null);

  /**
   * Close the dialog
   */
  const handleClose = () => {
    setData(null);
    if (onClose) {
      onClose();
    }
  };

  /**
   * Accept and read the file
   * @param e The event argument
   */
  const handleFileChange = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const text = ev.target.result;
      setData(text);
    };
    reader.readAsText(e.target.files[0]);
  };

  /**
   * Accept the file
   */
  const accept = () => {
    if (onAccept && data && data.length > 0) {
      onAccept(data);
    }
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{selectFileLabel}</DialogTitle>
      <DialogContent>
        <TextField type="file" onChange={handleFileChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{cancelLabel}</Button>
        <Button
          onClick={accept}
          autoFocus
          disabled={!data || data.length === 0}
        >
          {acceptLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SelectFileDialog;
