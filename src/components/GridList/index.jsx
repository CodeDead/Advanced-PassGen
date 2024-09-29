import React from 'react';
import Grid from '@mui/material/Grid2';

const GridList = ({
  spacing, children, xs, md, lg,
}) => (
  <Grid container spacing={spacing}>
    {children.map((e, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <Grid key={i} size={{ xs, md, lg }}>
        {e}
      </Grid>
    ))}
  </Grid>
);

export default GridList;
