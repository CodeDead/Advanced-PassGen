import React, { useContext, useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { createWorkerFactory, useWorker } from '@shopify/react-web-worker';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { save } from '@tauri-apps/api/dialog';
import { invoke } from '@tauri-apps/api/tauri';
import { MainContext } from '../../contexts/MainContextProvider';
import { PasswordContext } from '../../contexts/PasswordContextProvider';
import { setError, setPageIndex } from '../../reducers/MainReducer/Actions';
import PasswordStrength from '../../utils/PasswordStrength';
import { setPasswords } from '../../reducers/PasswordReducer/Actions';
import MuiVirtualizedTable from '../../components/MuiVirtualizedTable';
import ExportDialog from '../../components/ExportDialog';

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

  const [exportOpen, setExportOpen] = useState(false);

  const {
    min, max, amount, characterSet, passwords, useAdvanced, smallLetters,
    capitalLetters, spaces, specialCharacters, numbers, brackets, allowDuplicates,
  } = state2;

  const worker = useWorker(createWorker);

  /**
   * Generate passwords
   */
  const generatePasswords = () => {
    let simpleCharacterSet = characterSet;
    if (!useAdvanced) {
      simpleCharacterSet = '';
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

    if (!simpleCharacterSet || simpleCharacterSet.length === 0 || min > max || max < min) {
      return;
    }

    worker.PasswordGenerator(min, max, simpleCharacterSet, amount, allowDuplicates)
      .then((res) => {
        d2(setPasswords(res));
      })
      .catch((e) => {
        d1(setError(e));
      });
  };

  /**
   * Get the export data
   * @param passwordArray The array of passwords
   * @param type The type of export
   * @returns {string} The export data
   */
  const getExportData = (passwordArray, type) => {
    let toExport = '';
    if (type === 'text/plain') {
      for (let i = 0; i < passwordArray.length; i += 1) {
        toExport += `${passwordArray[i]}\n`;
      }
    } else if (type === 'application/json') {
      toExport = JSON.stringify(passwordArray, null, 2);
    } else if (type === 'text/csv') {
      for (let i = 0; i < passwordArray.length; i += 1) {
        toExport += `"${passwordArray[i].replace('"', '""')}",\n`;
      }
    }
    return toExport;
  };

  /**
   * Download a file
   * @param data The data that needs to be saved
   * @param type The file type
   */
  const downloadFile = (data, type) => {
    let fileName = 'export';

    if (type === 'text/plain') {
      fileName += '.txt';
    } else if (type === 'application/json') {
      fileName += '.json';
    } else if (type === 'text/csv') {
      fileName += '.csv';
    }

    const blob = new Blob([getExportData(data, type)], { type });
    const href = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = href;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  /**
   * Open the export dialog
   */
  const openExportDialog = () => {
    setExportOpen(true);
  };

  /**
   * Close the export dialog
   */
  const closeExportDialog = () => {
    setExportOpen(false);
  };

  /**
   * Export the passwords
   * @param type The export type
   */
  const onExport = (type) => {
    // eslint-disable-next-line no-underscore-dangle
    if (window.__TAURI__) {
      let ext = '';
      switch (type) {
        case 'text/plain':
          ext = 'txt';
          break;
        case 'application/json':
          ext = 'json';
          break;
        default:
          ext = 'csv';
          break;
      }
      save({
        multiple: false,
        filters: [{
          name: type,
          extensions: [ext],
        }],
      })
        .then((res) => {
          if (res && res.length > 0) {
            // eslint-disable-next-line no-bitwise
            const resExt = res.slice((res.lastIndexOf('.') - 1 >>> 0) + 2);
            const path = resExt && resExt.length > 0 ? res : `${res}.${ext}`;
            invoke('save_string_to_disk', { content: getExportData(passwords, type), path })
              .catch((e) => {
                d1(setError(e));
              });
          }
        })
        .catch((e) => {
          d1(setError(e));
        });
    } else {
      downloadFile(passwords, type);
    }
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
        disabled={min > max || max < min}
        onClick={generatePasswords}
        sx={{ mt: 2, ml: 2 }}
        style={{ float: 'right' }}
      >
        {language.generate}
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={openExportDialog}
        sx={{ mt: 2 }}
        disabled={!passwords || passwords.length === 0}
        style={{ float: 'right' }}
      >
        {language.export}
      </Button>
      <ExportDialog
        open={exportOpen}
        title={language.export}
        content={language.exportType}
        onCancel={closeExportDialog}
        onExport={onExport}
        onClose={closeExportDialog}
        cancelLabel={language.cancel}
        jsonLabel="JSON"
        csvLabel="CSV"
        plainTextLabel={language.plainText}
      />
    </Container>
  );
};

export default Generate;
