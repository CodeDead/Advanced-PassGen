import React, { useContext, useEffect } from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import ReactGA from 'react-ga4';
import { MainContext } from '../../contexts/MainContextProvider';
import { setPageIndex } from '../../reducers/MainReducer/Actions';

const NotFound = () => {
  const [state, d1] = useContext(MainContext);
  const { languageIndex, allowCookies } = state;
  const language = state.languages[languageIndex];

  useEffect(() => {
    d1(setPageIndex(-1));
    if (allowCookies) {
      ReactGA.send({
        hitType: 'pageview',
        page: '/about',
        title: 'Not Found | Advanced PassGen',
      });
    }
  }, []);

  return (
    <Container maxWidth="md">
      <Card>
        <CardContent>
          <Typography gutterBottom>
            {language.notFound}
          </Typography>
          <Typography>
            {language.notFoundGoHome}
          </Typography>
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
