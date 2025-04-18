import React, { useContext, useEffect, useRef, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import { MainContext } from '../../contexts/MainContextProvider';

const PasswordTips = () => {
  const [state] = useContext(MainContext);

  const { languageIndex, tips } = state;
  const language = state.languages[languageIndex];

  const [tipsOpen, setTipsOpen] = useState(tips);
  const intervalId = useRef();
  const [currentTip, setCurrentTip] = useState(
    language.passwordTips[
      Math.floor(Math.random() * language.passwordTips.length)
    ],
  );

  /**
   * Generate a new tipper
   */
  const generateNewTipper = () => {
    if (intervalId.current !== null) {
      clearInterval(intervalId.current);
    }

    intervalId.current = setInterval(() => {
      setCurrentTip(
        language.passwordTips[
          Math.floor(Math.random() * language.passwordTips.length)
        ],
      );
    }, 30000);
  };

  useEffect(() => {
    if (tips) {
      generateNewTipper();
    }

    return () =>
      intervalId !== null ? clearInterval(intervalId.current) : null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (tips) {
      setCurrentTip(
        language.passwordTips[
          Math.floor(Math.random() * language.passwordTips.length)
        ],
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  useEffect(() => {
    if (tips) {
      generateNewTipper();
    } else {
      clearInterval(intervalId.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tips]);

  return (
    <Collapse in={tipsOpen}>
      <Alert
        severity="info"
        action={
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
        }
        sx={{ mb: 2 }}
      >
        <AlertTitle>{language.tips}</AlertTitle>
        {currentTip}
      </Alert>
    </Collapse>
  );
};

export default PasswordTips;
