import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { MdEdit } from 'react-icons/md';

import ConfigApiClient from '../api/api.controller';


const configApiClient = new ConfigApiClient('https://da054609-5f9f-4f8d-9560-065a5f4cdc93-00-28hyinnf7xypk.sisko.replit.dev');

const Settings = () => {
  const [telegramBotKey, setTelegramBotKey] = useState('demo value');
  const [mapsApiKey, setMapsApiKey] = useState('demo value');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {

    fetchData();
  }, []);


  async function updateKeys(){
    if(mapsApiKey.length!==0 && telegramBotKey.length!==0){
      await configApiClient.updateconfig(telegramBotKey,mapsApiKey);
    }
  }



  async function fetchData() {
    try {
      const usersResponse = await configApiClient.getConfig('MAPS_API_KEY');
      setMapsApiKey(usersResponse.key)

      const resp = await configApiClient.getConfig('TELEGRAM_BOT_KEY');
      setTelegramBotKey(resp.key)
      console.log(usersResponse)
    } catch (error) {
      console.error('An error occurred:', error.message);
    }
  }

  const handlePencilClick = () => {
    setIsPopupOpen(true);
  };

  const handlePopupSubmit = async () => {
    console.log(telegramBotKey,mapsApiKey)
    await updateKeys()
    setIsPopupOpen(false);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Card style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px', minWidth: '300px' }}>
        <CardContent>
          <Typography variant="h4">Manage Keys</Typography>
          <Typography>
            <strong>Telegram-bot-key:</strong> {telegramBotKey}
          </Typography>
          <Typography>
            <strong>Maps-api-key:</strong> {mapsApiKey}
          </Typography>
          <IconButton
            style={{
              top: '10px',
              right: '10px',
            }}
            onClick={handlePencilClick}
          >
            <MdEdit/>
          </IconButton>
        </CardContent>
      </Card>

      <Dialog open={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        <DialogTitle>After editing keys you have to manually restart the bot service for changes</DialogTitle>
        <DialogContent>
          <TextField
            label="Telegram-bot-key"
            value={telegramBotKey}
            onChange={(e) => setTelegramBotKey(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Maps-api-key"
            value={mapsApiKey}
            onChange={(e) => setMapsApiKey(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" onClick={handlePopupSubmit}>
            Submit
          </Button>
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default Settings;
