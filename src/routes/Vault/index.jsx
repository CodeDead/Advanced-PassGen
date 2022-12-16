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
import { setPageIndex } from '../../reducers/MainReducer/Actions';
import { VaultContext } from '../../contexts/VaultContextProvider';
import CreateVaultDialog from '../../components/CreateVaultDialog';

const Vault = () => {
  const [state, d1] = useContext(MainContext);
  const [vaultState] = useContext(VaultContext);

  const language = state.languages[state.languageIndex];
  const { vault } = vaultState;

  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  /**
   * Create a new vault
   * @param key The decryption key
   */
  const createVault = (key) => {
    if (!key || key.length === 0) {
      return;
    }
    console.log(key);
  };

  useEffect(() => {
    d1(setPageIndex(4));
  }, []);

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
          <Typography component="h2" variant="h5" color="primary" gutterBottom>
            {language.vault}
          </Typography>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
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
        </Grid>
      </Grid>
      <CreateVaultDialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        onCreate={createVault}
      />
    </Container>
  );
};

export default Vault;
