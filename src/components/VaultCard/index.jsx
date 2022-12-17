import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const VaultCard = ({
  id, title, description, url, openLabel, editLabel,
  deleteLabel, onClick, onEdit, onDelete,
}) => {
  /**
   * Open the URL
   */
  const open = () => {
    onClick(url);
  };

  /**
   * Edit the password
   */
  const edit = () => {
    onEdit(id);
  };

  /**
   * Delete the password from the vault
   */
  const del = () => {
    onDelete(id);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        {url && onClick ? (
          <Button
            size="small"
            onClick={open}
          >
            {openLabel}
          </Button>
        ) : null}
        {onEdit ? (
          <Button
            size="small"
            onClick={edit}
          >
            {editLabel}
          </Button>
        ) : null}
        {onDelete ? (
          <Button
            size="small"
            onClick={del}
          >
            {deleteLabel}
          </Button>
        ) : null}
      </CardActions>
    </Card>
  );
};

export default VaultCard;
