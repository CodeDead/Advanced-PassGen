import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const UpdateDialog = ({
  downloadUrl,
  openWebsite,
  infoUrl,
  newVersion,
  onClose,
  updateAvailable,
  newVersionText,
  information,
  download,
  cancel,
}) => {
  /**
   * Close the UpdateDialog
   */
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  /**
   * Open the information page
   */
  const openInformation = () => {
    openWebsite(infoUrl);
  };

  /**
   * Open the download page
   */
  const openDownload = () => {
    openWebsite(downloadUrl);
    handleClose();
  };

  return (
    <Dialog
      open
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{updateAvailable}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {newVersionText.replace('{x}', newVersion)}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{cancel}</Button>
        <Button onClick={openInformation}>{information}</Button>
        <Button onClick={openDownload} autoFocus>
          {download}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateDialog;
