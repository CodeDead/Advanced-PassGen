import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const ExportDialog = ({
  open, title, content, onCancel, onExport, onClose,
  cancelLabel, jsonLabel, csvLabel, plainTextLabel,
}) => {
  /**
   * Close the dialog
   */
  const close = () => {
    if (onClose) {
      onClose();
    }
  };

  /**
   * Cancel the export
   */
  const cancel = () => {
    if (onCancel) {
      onCancel();
      close();
    }
  };

  /**
   * Export the data
   * @param type The data type
   */
  const exportData = (type) => {
    if (onExport) {
      onExport(type);
      close();
    }
  };

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={open}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {onCancel ? (
          <Button
            onClick={cancel}
          >
            {cancelLabel}
          </Button>
        ) : null}
        {onExport ? (
          <>
            <Button onClick={() => exportData('application/json')}>
              {jsonLabel}
            </Button>
            <Button onClick={() => exportData('text/csv')}>
              {csvLabel}
            </Button>
            <Button onClick={() => exportData('text/plain')}>
              {plainTextLabel}
            </Button>
          </>
        ) : null}
      </DialogActions>
    </Dialog>
  );
};

export default ExportDialog;
