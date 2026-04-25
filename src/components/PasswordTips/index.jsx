import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { MainContext } from '../../contexts/MainContextProvider';

const getRandomTipIndex = (length) =>
  length > 0 ? Math.floor(Math.random() * length) : 0;

const PasswordTips = () => {
  const [state] = useContext(MainContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { languageIndex, tips } = state;
  const language = state.languages[languageIndex];

  const [tipsOpen, setTipsOpen] = useState(tips);
  const intervalId = useRef(null);
  const [tipIndex, setTipIndex] = useState(() =>
    getRandomTipIndex(language.passwordTips.length),
  );
  const currentTip =
    language.passwordTips[tipIndex % language.passwordTips.length] ?? '';

  /**
   * Clear the active tip timer
   */
  const clearTipInterval = useCallback(() => {
    if (intervalId.current !== null) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
  }, []);

  /**
   * Start rotating the current tip
   * @param passwordTips The available tips for the current language
   */
  const startTipRotation = useCallback(
    (passwordTips) => {
      clearTipInterval();

      if (!passwordTips || passwordTips.length === 0) {
        return;
      }

      intervalId.current = setInterval(() => {
        setTipIndex(getRandomTipIndex(passwordTips.length));
      }, 30000);
    },
    [clearTipInterval],
  );

  useEffect(() => {
    if (!tips) {
      clearTipInterval();
      return clearTipInterval;
    }

    startTipRotation(language.passwordTips);

    return clearTipInterval;
  }, [clearTipInterval, language.passwordTips, startTipRotation, tips]);

  const closeTips = () => {
    setTipsOpen(false);
    clearTipInterval();
  };

  return (
    <Collapse in={tips && tipsOpen && !isMobile}>
      <Alert
        severity="info"
        action={
          <IconButton aria-label="close" color="inherit" onClick={closeTips}>
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
