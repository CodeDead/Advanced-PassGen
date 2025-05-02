import React, { useContext, useEffect } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import packageJson from '../../../package.json';
import { MainContext } from '../../contexts/MainContextProvider';
import { openWebSite, setPageIndex } from '../../reducers/MainReducer/Actions';

const About = () => {
  const [state, d1] = useContext(MainContext);
  const language = state.languages[state.languageIndex];

  /**
   * Open the license page
   */
  const openLicense = () => {
    openWebSite('https://codedead.com/Software/Advanced%20PassGen/gpl.pdf');
  };

  /**
   * Open the home page
   */
  const openHomePage = () => {
    openWebSite('https://codedead.com/');
  };

  useEffect(() => {
    d1(setPageIndex(5));
    document.title = 'About | Advanced PassGen';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Typography component="h2" variant="h5" color="primary" gutterBottom>
        {language.about}
      </Typography>
      <Card>
        <CardContent>
          <Typography style={{ whiteSpace: 'pre-wrap' }}>
            {language.aboutText
              .replace('{x}', packageJson.version)
              .replace('{year}', new Date().getFullYear())}
          </Typography>
        </CardContent>
      </Card>
      <Button
        variant="contained"
        style={{ float: 'left' }}
        sx={{ mt: 2 }}
        onClick={openLicense}
      >
        {language.license}
      </Button>
      <Button
        variant="contained"
        style={{ float: 'right' }}
        sx={{ mt: 2 }}
        onClick={openHomePage}
      >
        {language.website}
      </Button>
    </Container>
  );
};

export default About;
