import React, { useContext, useEffect } from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { createWorkerFactory, useWorker } from '@shopify/react-web-worker';
import { styled } from '@mui/material/styles';
import { Paper } from '@mui/material';
import { save } from '@tauri-apps/api/dialog';
import { MainContext } from '../../contexts/MainContextProvider';
import { PasswordContext } from '../../contexts/PasswordContextProvider';
import { setPageIndex } from '../../reducers/MainReducer/Actions';
import PasswordStrength from '../../utils/PasswordStrength';
import { setPasswords } from '../../reducers/PasswordReducer/Actions';
import MuiVirtualizedTable from '../../components/MuiVirtualizedTable';

const classes = {
  flexContainer: 'ReactVirtualizedDemo-flexContainer',
  tableRow: 'ReactVirtualizedDemo-tableRow',
  tableRowHover: 'ReactVirtualizedDemo-tableRowHover',
  tableCell: 'ReactVirtualizedDemo-tableCell',
  noClick: 'ReactVirtualizedDemo-noClick',
};

const styles = ({ theme }) => ({
  // temporary right-to-left patch, waiting for
  // https://github.com/bvaughn/react-virtualized/issues/454
  '& .ReactVirtualized__Table__headerRow': {
    ...(theme.direction === 'rtl' && {
      paddingLeft: '0 !important',
    }),
    ...(theme.direction !== 'rtl' && {
      paddingRight: undefined,
    }),
  },
  [`& .${classes.flexContainer}`]: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  [`& .${classes.tableRow}`]: {
    cursor: 'pointer',
  },
  [`& .${classes.tableRowHover}`]: {
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  [`& .${classes.tableCell}`]: {
    flex: 1,
  },
  [`& .${classes.noClick}`]: {
    cursor: 'initial',
  },
});

const createWorker = createWorkerFactory(() => import('../../utils/PasswordGenerator/index'));
const VirtualizedTable = styled(MuiVirtualizedTable)(styles);

const Generate = () => {
  const [state1, d1] = useContext(MainContext);
  const [state2, d2] = useContext(PasswordContext);

  const { languageIndex } = state1;
  const language = state1.languages[languageIndex];

  const {
    min, max, amount, characterSet, passwords, useAdvanced, smallLetters,
    capitalLetters, spaces, specialCharacters, numbers, brackets, allowDuplicates,
  } = state2;

  const worker = useWorker(createWorker);

  /**
   * Generate passwords
   */
  const generatePasswords = () => {
    let simpleCharacterSet = '';
    if (useAdvanced) {
      if (!characterSet || characterSet.length === 0) {
        return;
      }
      simpleCharacterSet = characterSet;
    } else {
      if (smallLetters) {
        simpleCharacterSet += 'abcdefghijklmnopqrstuvwxyz';
      }
      if (capitalLetters) {
        simpleCharacterSet += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      }
      if (spaces) {
        simpleCharacterSet += ' ';
      }
      if (specialCharacters) {
        simpleCharacterSet += '=+-_!?.,;:\'\\"/%^*$€£&µ@#';
      }
      if (numbers) {
        simpleCharacterSet += '0123456789';
      }
      if (brackets) {
        simpleCharacterSet += '[]{}()<>';
      }
    }

    if (simpleCharacterSet.length === 0) {
      return;
    }

    worker.PasswordGenerator(min, max, simpleCharacterSet, amount, allowDuplicates)
      .then((res) => {
        d2(setPasswords(res));
      });
  };

  /**
   * Export the passwords to a file
   */
  const exportPasswords = async () => {
    const filePath = await save({
      multiple: true,
      filters: [{
        name: 'Text file',
        extensions: ['txt'],
      },
      {
        name: 'JSON',
        extensions: ['json'],
      },
      {
        name: 'CSV',
        extensions: ['csv'],
      }],
    });

    console.log(filePath);
  };

  /**
   * Create a JSON object with the passwords and their strength
   * @param password The password
   * @param passwordLength The length of the password
   * @param strength The strength of the password
   * @returns {{password, strength: string, length}} The JSON object
   */
  const createData = (password, passwordLength, strength) => (
    { password, length: passwordLength, strength: `${strength}%` }
  );

  useEffect(() => {
    d1(setPageIndex(2));
  }, []);

  const passwordRows = [];
  if (passwords && passwords.length > 0) {
    passwords.forEach((e) => passwordRows.push(createData(e, e.length, PasswordStrength(e))));
  }

  return (
    <Container
      maxWidth="xl"
    >
      <Paper style={{ height: '60vh', width: '100%' }}>
        <VirtualizedTable
          rowCount={passwordRows.length}
          rowGetter={({ index }) => passwordRows[index]}
          columns={[
            {
              width: 800,
              label: language.password,
              dataKey: 'password',
            },
            {
              width: 120,
              label: language.length,
              dataKey: 'length',
              numeric: true,
            },
            {
              width: 120,
              label: language.strength,
              dataKey: 'strength',
            },
          ]}
        />
      </Paper>
      <Button
        variant="contained"
        color="primary"
        onClick={() => d2(setPasswords(null))}
        sx={{ mt: 2 }}
        style={{ float: 'left' }}
      >
        {language.clear}
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => generatePasswords()}
        sx={{ mt: 2, ml: 2 }}
        style={{ float: 'right' }}
      >
        {language.generate}
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => exportPasswords()}
        sx={{ mt: 2 }}
        style={{ float: 'right' }}
      >
        {language.export}
      </Button>
    </Container>
  );
};

export default Generate;
