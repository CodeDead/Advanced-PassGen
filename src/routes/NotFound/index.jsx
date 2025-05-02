import React, { useContext, useEffect } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { MainContext } from '../../contexts/MainContextProvider';
import { setPageIndex } from '../../reducers/MainReducer/Actions';

const NotFound = () => {
  const [state, d1] = useContext(MainContext);
  const language = state.languages[state.languageIndex];

  useEffect(() => {
    d1(setPageIndex(-1));
    document.title = 'Not Found | Advanced PassGen';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxWidth="md">
      <Card>
        <CardContent>
          <Typography gutterBottom>{language.notFound}</Typography>
          <Typography>{language.notFoundGoHome}</Typography>
        </CardContent>
        <CardActions>
          <Button color="primary" variant="contained" href="/">
            {language.home}
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default NotFound;
