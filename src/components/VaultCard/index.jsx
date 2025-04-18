import React from 'react';
import LockIcon from '@mui/icons-material/Lock';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ThemeSelector from '../../utils/ThemeSelector';

const VaultCard = ({
  id,
  title,
  description,
  url,
  openLabel,
  editLabel,
  copyLabel,
  deleteLabel,
  onClick,
  onEdit,
  onDelete,
  onCopy,
  themeIndex,
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

  /**
   * Copy the password to the clipboard
   */
  const copy = () => {
    onCopy(id);
  };

  return (
    <Card style={{ height: '100%' }}>
      <CardActionArea onClick={copy}>
        <CardMedia
          style={{
            height: 120,
            backgroundColor: ThemeSelector(themeIndex)['500'],
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          title={title}
        >
          <LockIcon color="inherit" fontSize="large" />
        </CardMedia>
        <CardContent>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          {description && description.length > 0 ? (
            <Typography variant="body2">{description}</Typography>
          ) : null}
        </CardContent>
      </CardActionArea>
      <CardActions>
        {url && onClick ? (
          <Button size="small" onClick={open}>
            {openLabel}
          </Button>
        ) : null}
        <Button size="small" onClick={copy}>
          {copyLabel}
        </Button>
        {onEdit ? (
          <Button size="small" onClick={edit}>
            {editLabel}
          </Button>
        ) : null}
        {onDelete ? (
          <Button size="small" onClick={del}>
            {deleteLabel}
          </Button>
        ) : null}
      </CardActions>
    </Card>
  );
};

export default VaultCard;
