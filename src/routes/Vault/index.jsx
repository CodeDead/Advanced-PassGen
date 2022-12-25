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
import { v4 as uuidv4 } from 'uuid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { MainContext } from '../../contexts/MainContextProvider';
import { openWebSite, setPageIndex } from '../../reducers/MainReducer/Actions';
import { VaultContext } from '../../contexts/VaultContextProvider';
import CreateVaultDialog from '../../components/CreateVaultDialog';
import { saveVault, setVault } from '../../reducers/VaultReducer/Actions';
import VaultCard from '../../components/VaultCard';
import CreatePasswordDialog from '../../components/CreatePasswordDialog';

const Vault = () => {
  const [state, d1] = useContext(MainContext);
  const [vaultState, d3] = useContext(VaultContext);

  const language = state.languages[state.languageIndex];
  const { vault } = vaultState;

  const [phrase, setPhrase] = useState('');
  const [search, setSearch] = useState('');
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [createPasswordDialogOpen, setCreatePasswordDialogOpen] = useState(false);

  /**
   * Create a new vault
   * @param key The decryption key
   */
  const createVault = (key) => {
    if (!key || key.length === 0) {
      return;
    }
    setPhrase(key);
    d3(setVault([]));
  };

  /**
   * Save the vault
   */
  const saveVaultDetails = () => {
    saveVault(vault, phrase);
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
            onClick={openPassword}
            onEdit={() => {}}
            onDelete={deletePassword}
          />
        </Grid>
      ));
    }
  }

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
          <Typography component="h2" variant="h5" color="primary" gutterBottom>
            {language.vault}
          </Typography>
        </Grid>
        {vault && vault.length > 0 ? (
          <Grid item xs={12} md={12} lg={12}>
            <Card>
              <CardContent>
                <TextField
                  variant="outlined"
                  label={language.search}
                  fullWidth
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </CardContent>
            </Card>
          </Grid>
        ) : null}
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
        >
          <FileOpenIcon />
        </Fab>
        <Fab
          color="primary"
          aria-label={language.new}
          sx={{
            position: 'absolute',
            bottom: 16,
            right: 84,
          }}
          onClick={() => setCreateDialogOpen(true)}
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
              color="primary"
              aria-label={language.save}
              onClick={saveVaultDetails}
              sx={{
                position: 'absolute',
                bottom: 16,
                right: 152,
              }}
            >
              <SaveIcon />
            </Fab>
          </>
        ) : null}
      </Box>
      <CreateVaultDialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        onCreate={createVault}
      />
      <CreatePasswordDialog
        open={createPasswordDialogOpen}
        onClose={() => setCreatePasswordDialogOpen(false)}
        onCreate={addPassword}
      />
    </Container>
  );
};

export default Vault;
