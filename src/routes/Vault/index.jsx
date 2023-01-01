import React, { useContext, useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { v4 as uuidv4 } from 'uuid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { open, save } from '@tauri-apps/api/dialog';
import { invoke } from '@tauri-apps/api/tauri';
import CryptoJS from 'crypto-js';
import { writeText } from '@tauri-apps/api/clipboard';
import { MainContext } from '../../contexts/MainContextProvider';
import { openWebSite, setError, setPageIndex } from '../../reducers/MainReducer/Actions';
import { VaultContext } from '../../contexts/VaultContextProvider';
import { setVault } from '../../reducers/VaultReducer/Actions';
import VaultCard from '../../components/VaultCard';
import CreatePasswordDialog from '../../components/CreatePasswordDialog';
import EditPasswordDialog from '../../components/EditPasswordDialog';
import EncryptionKeyDialog from '../../components/EncryptionKeyDialog';

const Vault = () => {
  const [state, d1] = useContext(MainContext);
  const [vaultState, d3] = useContext(VaultContext);

  const language = state.languages[state.languageIndex];
  const { vault } = vaultState;

  const [phrase, setPhrase] = useState('');
  const [search, setSearch] = useState('');
  const [keyDialogOpen, setKeyDialogOpen] = useState(false);
  const [createPasswordDialogOpen, setCreatePasswordDialogOpen] = useState(false);
  const [editPasswordDialogOpen, setEditPasswordDialogOpen] = useState(false);
  const [editPasswordId, setEditPasswordId] = useState(null);
  const [keyAction, setKeyAction] = useState(null);

  /**
   * Save the vault
   */
  const saveVault = async () => {
    try {
      const path = await save();
      if (path && path.length > 0) {
        const encVault = CryptoJS.AES.encrypt(JSON.stringify(vault), phrase).toString();
        await invoke('save_string_to_disk', { content: encVault, path });
      }
    } catch (e) {
      d1(setError(e.toString()));
    }
  };

  /**
   * Open a vault
   * @param decryptionKey The decryption key
   * @returns {Promise<void>}
   */
  const openVaultDetails = async (decryptionKey) => {
    try {
      const path = await open({
        multiple: false,
      });
      if (path && path.length > 0) {
        const res = await invoke('read_string_from_file', { path });

        const bytes = CryptoJS.AES.decrypt(res.toString(), decryptionKey);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);

        d3(setVault(JSON.parse(originalText)));
      }
    } catch (e) {
      d1(setError(e.toString()));
    }
  };

  /**
   * Open a password URL
   * @param url The URL that needs to be opened
   */
  const openPassword = (url) => {
    openWebSite(url);
  };

  /**
   * Create a new password
   * @param title The title
   * @param description The description
   * @param url The URL
   * @param password The password
   */
  const addPassword = (title, description, url, password) => {
    const id = uuidv4();
    const newVault = JSON.parse(JSON.stringify(vault));
    newVault.push({
      id, title, description, url, password,
    });
    d3(setVault(newVault));
  };

  /**
   * Delete a password from the vault
   * @param id The ID of the password
   */
  const deletePassword = (id) => {
    const newVault = JSON.parse(JSON.stringify(vault)).filter((p) => p.id !== id);
    d3(setVault(newVault));
  };

  /**
   * Copy a password to the clipboard
   * @param id The ID of the password
   */
  const copyToClipboard = async (id) => {
    const { password } = vault.find((p) => p.id === id);
    try {
      await writeText(password);
    } catch (e) {
      d1(setError(e.toString()));
    }
  };

  /**
   * Open the edit password dialog
   * @param id The ID of the password that needs to be edited
   */
  const openEditPasswordDialog = (id) => {
    setEditPasswordId(id);
    setEditPasswordDialogOpen(true);
  };

  /**
   * Close the dialog to edit a password
   */
  const closeEditPasswordDialog = () => {
    setEditPasswordId(null);
    setEditPasswordDialogOpen(false);
  };

  /**
   * Edit a password
   * @param id The ID of the password
   * @param title The new title
   * @param description The new description
   * @param url The new URL
   * @param password The new password
   */
  const editPassword = (id, title, description, url, password) => {
    const newVault = JSON.parse(JSON.stringify(vault));
    newVault.filter((e) => e.id === id).forEach((e) => {
      e.title = title;
      e.description = description;
      e.url = url;
      e.password = password;
    });
    d3(setVault(newVault));
  };

  /**
   * Create a new vault
   * @param key The decryption key
   */
  const acceptKey = (key) => {
    if (!key || key.length === 0) {
      return;
    }
    setPhrase(key);

    if (keyAction === 'create') {
      d3(setVault([]));
    } else if (keyAction === 'open') {
      openVaultDetails(key);
    }
  };

  /**
   * Open a vault
   */
  const openVault = () => {
    setKeyAction('open');
    setKeyDialogOpen(true);
  };

  /**
   * Create a new vault
   */
  const createVault = () => {
    setKeyAction('create');
    setKeyDialogOpen(true);
  };

  /**
   * Change the search string
   * @param e The event argument
   */
  const changeSearch = (e) => {
    setSearch(e.target.value);
  };

  /**
   * Close a vault
   */
  const closeVault = () => {
    d3(setVault(null));
    setPhrase('');
    setSearch('');
  };

  /**
   * Close the encryption key dialog
   */
  const closeEncryptionKeyDialog = () => {
    setKeyDialogOpen(false);
  };

  useEffect(() => {
    d1(setPageIndex(4));
  }, []);

  let gridItems = null;
  if (vault && vault.length > 0) {
    const filteredVault = search && search.length > 0
      ? vault.filter((e) => e.title.toLowerCase().includes(search.toLowerCase())
        || e.description.toLowerCase().includes(search.toLowerCase())
        || e.url.toLowerCase().includes(search.toLowerCase()))
      : vault;

    if (!filteredVault || filteredVault.length === 0) {
      gridItems = (
        <Grid item xs={12} md={12} lg={12}>
          <Typography variant="h6" component="h6" gutterBottom>
            {language.noResults}
          </Typography>
        </Grid>
      );
    } else {
      gridItems = filteredVault.map((item) => (
        <Grid key={item.id} item xs={12} md={6} lg={4}>
          <VaultCard
            id={item.id}
            title={item.title}
            description={item.description}
            url={item.url}
            openLabel={language.open}
            editLabel={language.edit}
            deleteLabel={language.delete}
            copyLabel={language.copy}
            onClick={openPassword}
            onEdit={openEditPasswordDialog}
            onDelete={deletePassword}
            onCopy={copyToClipboard}
          />
        </Grid>
      ));
    }
  }

  const toEdit = vault && vault.length > 0 ? vault.filter((p) => p.id === editPasswordId)[0] : null;

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
          <Typography component="h2" variant="h5" color="primary" gutterBottom>
            {language.vault}
          </Typography>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          {vault && vault.length > 0 ? (
            <Card>
              <CardContent>
                <TextField
                  variant="outlined"
                  label={language.search}
                  fullWidth
                  value={search}
                  onChange={changeSearch}
                />
              </CardContent>
            </Card>
          ) : (
            <Typography variant="body1" gutterBottom>
              {language.createOrOpenVault}
            </Typography>
          )}
        </Grid>
        {gridItems}
      </Grid>
      <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <Fab
          color="primary"
          aria-label={language.open}
          sx={{
            position: 'absolute',
            bottom: 16,
            right: 16,
          }}
          onClick={openVault}
        >
          <FileOpenIcon />
        </Fab>
        <Fab
          color="secondary"
          aria-label={language.new}
          sx={{
            position: 'absolute',
            bottom: 16,
            right: 84,
          }}
          onClick={createVault}
        >
          <NoteAddIcon />
        </Fab>
        {vault ? (
          <>
            <Fab
              color="primary"
              aria-label={language.add}
              onClick={() => setCreatePasswordDialogOpen(true)}
              sx={{
                position: 'absolute',
                bottom: 84,
                right: 16,
              }}
            >
              <AddIcon />
            </Fab>
            <Fab
              color="error"
              aria-label={language.close}
              onClick={closeVault}
              sx={{
                position: 'absolute',
                bottom: 16,
                right: 152,
              }}
            >
              <CloseIcon />
            </Fab>
            <Fab
              color="success"
              aria-label={language.save}
              onClick={saveVault}
              sx={{
                position: 'absolute',
                bottom: 16,
                right: 220,
              }}
            >
              <SaveIcon />
            </Fab>
          </>
        ) : null}
      </Box>
      <EncryptionKeyDialog
        open={keyDialogOpen}
        onClose={closeEncryptionKeyDialog}
        onAccept={acceptKey}
      />
      <CreatePasswordDialog
        open={createPasswordDialogOpen}
        onClose={() => setCreatePasswordDialogOpen(false)}
        onCreate={addPassword}
      />
      {editPasswordDialogOpen && toEdit ? (
        <EditPasswordDialog
          open={editPasswordDialogOpen}
          onClose={closeEditPasswordDialog}
          onSave={editPassword}
          data={toEdit}
        />
      ) : null}
    </Container>
  );
};

export default Vault;
