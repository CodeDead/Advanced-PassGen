import React, { useContext, useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import { DataGrid } from '@mui/x-data-grid';
import { createWorkerFactory, useWorker } from '@shopify/react-web-worker';
import { invoke } from '@tauri-apps/api/core';
import { save } from '@tauri-apps/plugin-dialog';
import Graphemer from 'graphemer';
import LoadingBar from '../../components/LoadingBar';
import { MainContext } from '../../contexts/MainContextProvider';
import { PasswordContext } from '../../contexts/PasswordContextProvider';
import {
  setError,
  setLoading,
  setPageIndex,
} from '../../reducers/MainReducer/Actions';
import {
  generatePasswordArray,
  getFullCharacterSet,
  setPasswords,
} from '../../reducers/PasswordReducer/Actions';
import PasswordStrength from '../../utils/PasswordStrength';

const createWorker = createWorkerFactory(
  () => import('../../utils/PasswordGenerator/index'),
);

const Generate = () => {
  const [state1, d1] = useContext(MainContext);
  const [state2, d2] = useContext(PasswordContext);

  const { languageIndex, loading, sortByStrength } = state1;
  const language = state1.languages[languageIndex];

  const [exportType, setExportType] = useState('application/json');
  const [snackOpen, setSnackOpen] = useState(false);

  const {
    min,
    max,
    amount,
    characterSet,
    includeSymbols,
    passwords,
    useAdvanced,
    smallLetters,
    capitalLetters,
    spaces,
    specialCharacters,
    numbers,
    brackets,
    allowDuplicates,
    useEmojis,
  } = state2;

  const worker = useWorker(createWorker);

  const simpleCharacterSet = getFullCharacterSet(
    characterSet,
    useAdvanced,
    smallLetters,
    capitalLetters,
    spaces,
    numbers,
    specialCharacters,
    brackets,
    useEmojis,
  );

  const cannotGenerate =
    !simpleCharacterSet ||
    simpleCharacterSet.length === 0 ||
    min > max ||
    max < min;

  /**
   * Close the snackbar
   */
  const closeSnack = () => {
    setSnackOpen(false);
  };

  /**
   * Generate passwords
   */
  const generatePasswords = () => {
    if (cannotGenerate) {
      return;
    }
    d1(setLoading(true));
    generatePasswordArray(
      min,
      max,
      simpleCharacterSet,
      includeSymbols,
      amount,
      allowDuplicates,
      worker,
    )
      .then((res) => {
        d2(setPasswords(res));
      })
      .catch((err) => {
        d1(setError(err));
      })
      .finally(() => {
        d1(setLoading(false));
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
      passwordArray.forEach((e) => {
        toExport += `${e}\n`;
      });
    } else if (type === 'application/json') {
      toExport = JSON.stringify(passwordArray, null, 2);
    } else if (type === 'text/csv') {
      passwordArray.forEach((e) => {
        toExport += `"${e.replaceAll('"', '""')}",\n`;
      });
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

    setSnackOpen(true);
  };

  /**
   * Export the passwords
   */
  const onExport = () => {
    if (window.__TAURI__) {
      let ext = '';
      switch (exportType) {
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
        filters: [
          {
            name: exportType,
            extensions: [ext],
          },
        ],
      })
        .then((res) => {
          if (res && res.length > 0) {
            const resExt = res.slice(((res.lastIndexOf('.') - 1) >>> 0) + 2);
            const path = resExt && resExt.length > 0 ? res : `${res}.${ext}`;
            invoke('save_string_to_disk', {
              content: getExportData(passwords, exportType),
              path,
            })
              .then(() => {
                setSnackOpen(true);
              })
              .catch((e) => {
                d1(setError(e));
              });
          }
        })
        .catch((e) => {
          d1(setError(e));
        });
    } else {
      downloadFile(passwords, exportType);
    }
  };

  /**
   * Create a JSON object with the passwords and their strength
   * @param id The ID
   * @param password The password
   * @param passwordLength The length of the password
   * @param strength The strength of the password
   * @returns {{password, strength: string, length}} The JSON object
   */
  const createData = (id, password, passwordLength, strength) => ({
    id,
    password,
    length: passwordLength,
    strength,
  });

  /**
   * Set the export type
   * @param e The change event
   */
  const handleExportTypeChange = (e) => {
    setExportType(e.target.value);
  };

  /**
   * Clear all passwords
   */
  const clearPasswords = () => {
    d2(setPasswords(null));
  };

  useEffect(() => {
    d1(setPageIndex(1));
    document.title = 'Password Generator | Advanced PassGen';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let passwordRows = [];
  if (passwords && passwords.length > 0) {
    const splitter = new Graphemer();
    passwords.forEach((e, i) => {
      passwordRows.push(
        createData(
          `${e}${i}`,
          e,
          splitter.countGraphemes(e),
          PasswordStrength(e),
        ),
      );
    });

    if (sortByStrength) {
      passwordRows = passwordRows.sort(
        (a, b) => parseFloat(b.strength) - parseFloat(a.strength),
      );
    }
  }

  if (loading) {
    return <LoadingBar />;
  }

  const columns = [
    {
      field: 'password',
      headerName: language.password,
      editable: false,
      flex: 1,
    },
    {
      field: 'length',
      headerName: language.length,
      type: 'number',
      editable: false,
    },
    {
      field: 'strength',
      headerName: language.strength,
      editable: false,
      valueFormatter: (params) => {
        const valueFormatted = Number(params).toLocaleString();
        return `${valueFormatted}%`;
      },
    },
  ];

  return (
    <Container maxWidth="xl">
      <Paper style={{ height: '70vh', width: '100%' }}>
        <DataGrid
          rows={passwordRows}
          columns={columns}
          pageSize={50}
          rowsPerPageOptions={[50]}
          disableSelectionOnClick
        />
      </Paper>
      <Button
        variant="contained"
        color="primary"
        onClick={clearPasswords}
        sx={{ mt: 2 }}
        style={{ float: 'left' }}
      >
        {language.clear}
      </Button>
      <Button
        variant="contained"
        color="primary"
        disabled={cannotGenerate}
        onClick={generatePasswords}
        sx={{ mt: 2, ml: 2 }}
        style={{ float: 'right' }}
      >
        {language.generate}
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={onExport}
        sx={{ mt: 2, ml: 2 }}
        disabled={!passwords || passwords.length === 0 || exportType === null}
        style={{ float: 'right' }}
      >
        {language.export}
      </Button>
      <FormControl sx={{ mt: 2, minWidth: 100, float: 'right' }} size="small">
        <InputLabel id="export-type-label">{language.exportType}</InputLabel>
        <Select
          labelId="export-type-label"
          id="export-type-select"
          value={exportType}
          label={language.exportType}
          autoWidth
          onChange={handleExportTypeChange}
          variant="outlined"
        >
          <MenuItem value="application/json">JSON</MenuItem>
          <MenuItem value="text/csv">CSV</MenuItem>
          <MenuItem value="text/plain">{language.plainText}</MenuItem>
        </Select>
      </FormControl>
      <Snackbar open={snackOpen} autoHideDuration={3000} onClose={closeSnack}>
        <Alert onClose={closeSnack} severity="success" sx={{ width: '100%' }}>
          {language.exportSuccessful}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Generate;
