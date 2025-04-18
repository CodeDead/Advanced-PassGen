import React from 'react';
import Grid from '@mui/material/Grid';

const GridList = ({ spacing, children, xs, md, lg }) => (
  <Grid container spacing={spacing}>
    {children.map((e, i) => (
      <Grid key={i} size={{ xs, md, lg }}>
        {e}
      </Grid>
    ))}
  </Grid>
);

export default GridList;
