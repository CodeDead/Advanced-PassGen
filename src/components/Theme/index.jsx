import React from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import blank from './blank.png';

const Theme = ({
  title, description, color, selected, onAction,
}) => {
  const action = onAction || null;

  return (
    <Card raised={!selected}>
      <CardActionArea onClick={action}>
        <CardMedia
          style={{
            height: 60,
            backgroundColor: color,
          }}
          title={title}
          image={blank}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Theme;
