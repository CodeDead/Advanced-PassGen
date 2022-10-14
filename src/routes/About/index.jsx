import React, { useContext, useEffect } from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { invoke } from '@tauri-apps/api';
import { MainContext } from '../../contexts/MainContextProvider';
import { setPageIndex } from '../../reducers/MainReducer/Actions';
import packageJson from '../../../package.json';

const About = () => {
  const [state, d1] = useContext(MainContext);
  const { languageIndex } = state;
  const language = state.languages[languageIndex];

  /**
   * Open a website
   * @param website The website that needs to be opened
   */
  const openWebsite = (website) => {
    invoke('open_website', { website })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e);
        window.open(website, '_blank'); // We're running in a browser
      });
  };

  useEffect(() => {
    d1(setPageIndex(5));
  }, []);

  return (
    <Container>
      <Card>
        <CardContent>
          <Typography style={{ whiteSpace: 'pre-wrap' }}>
            {language.aboutText.replace('{x}', packageJson.version)}
          </Typography>
        </CardContent>
      </Card>
      <Button
        variant="contained"
        style={{ float: 'left' }}
        sx={{ mt: 2 }}
        onClick={() => openWebsite('https://codedead.com/Software/Advanced%20PassGen/gpl.pdf')}
      >
        {language.license}
      </Button>
      <Button
        variant="contained"
        style={{ float: 'right' }}
        sx={{ mt: 2 }}
        onClick={() => openWebsite('https://codedead.com/')}
      >
        {language.website}
      </Button>
    </Container>
  );
};

export default About;
