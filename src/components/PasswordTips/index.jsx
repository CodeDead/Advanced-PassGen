import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AlertTitle from '@mui/material/AlertTitle';
import Collapse from '@mui/material/Collapse';
import { MainContext } from '../../contexts/MainContextProvider';

const PasswordTips = () => {
  const [state] = useContext(MainContext);

  const { languageIndex, tips } = state;
  const language = state.languages[languageIndex];

  const [tipsOpen, setTipsOpen] = useState(tips);
  const intervalId = useRef();
  const [currentTip, setCurrentTip] = useState(language.passwordTips[Math.floor(Math.random()
    * language.passwordTips.length)]);

  /**
   * Generate a new tipper
   */
  const generateNewTipper = () => {
    if (intervalId.current !== null) {
      clearInterval(intervalId.current);
    }

    const x = setInterval(() => {
      setCurrentTip(language.passwordTips[Math.floor(Math.random()
        * language.passwordTips.length)]);
    }, 30000);

    intervalId.current = x;
  };

  useEffect(() => {
    if (tips) {
      generateNewTipper();
    }

    return () => (intervalId !== null
      ? clearInterval(intervalId.current)
      : null);
  }, []);

  useEffect(() => {
    if (tips) {
      setCurrentTip(language.passwordTips[Math.floor(Math.random()
        * language.passwordTips.length)]);
    }
  }, [language]);

  useEffect(() => {
    if (tips) {
      generateNewTipper();
    } else {
      clearInterval(intervalId.current);
    }
  }, [tips]);

  return (
    <Collapse in={tipsOpen}>
      <Alert
        severity="info"
        action={(
          <IconButton
            aria-label="close"
            color="inherit"
            onClick={() => {
              setTipsOpen(false);
              clearInterval(intervalId.current);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        )}
        sx={{ mb: 2 }}
      >
        <AlertTitle>{language.tips}</AlertTitle>
        {currentTip}
      </Alert>
    </Collapse>
  );
};

export default PasswordTips;
