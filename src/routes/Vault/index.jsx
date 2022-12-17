import React, { useContext, useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import SaveIcon from '@mui/icons-material/Save';
import { MainContext } from '../../contexts/MainContextProvider';
import { openWebSite, setPageIndex } from '../../reducers/MainReducer/Actions';
import { VaultContext } from '../../contexts/VaultContextProvider';
import CreateVaultDialog from '../../components/CreateVaultDialog';
import { setVault } from '../../reducers/VaultReducer/Actions';
import VaultCard from '../../components/VaultCard';

const Vault = () => {
  const [state, d1] = useContext(MainContext);
  const [vaultState, d3] = useContext(VaultContext);

  const language = state.languages[state.languageIndex];
  const { vault } = vaultState;

  const [phrase, setPhrase] = useState('');
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

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
   * Open a password URL
   * @param url The URL that needs to be opened
   */
  const openPassword = (url) => {
    openWebSite(url);
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

  const gridItems = vault && vault.length > 0 ? vault.map((item) => (
    <Grid
      key={item.id}
      item
      xs={12}
      md={4}
      lg={3}
    >
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
  )) : null;

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
          <Typography component="h2" variant="h5" color="primary" gutterBottom>
            {language.vault}
          </Typography>
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
          <Fab
            color="primary"
            aria-label={language.save}
            sx={{
              position: 'absolute',
              bottom: 16,
              right: 152,
            }}
          >
            <SaveIcon />
          </Fab>
        ) : null}
      </Box>
      <CreateVaultDialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        onCreate={createVault}
      />
    </Container>
  );
};

export default Vault;
