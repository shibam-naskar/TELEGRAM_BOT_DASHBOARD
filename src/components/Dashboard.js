import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import ConfigApiClient from '../api/api.controller';
import BlockIcon from '@mui/icons-material/Block';
import RestoreIcon from '@mui/icons-material/Restore';

const configApiClient = new ConfigApiClient('https://example.com');



const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function Dashboard() {
  const dense = false;
  const secondary = true;
  const [users, setUsers] = React.useState([]);

  async function fetchData() {
    try {
      const usersResponse = await configApiClient.getUsers();
      setUsers(usersResponse.users);
      console.log(usersResponse)
    } catch (error) {
      console.error('An error occurred:', error.message);
    }
  }




  React.useEffect(() => {

    fetchData();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <FormGroup row>

      </FormGroup>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            All Users
          </Typography>
          <Demo>
            <List dense={dense}>
              {users.map((user, index) => (
                !user.blocked ? (
                  <ListItem key={index}>

                    <ListItemAvatar>
                      <Avatar>
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={user.name}
                      secondary={secondary ? `${user.lst}  , ${user.lng}` : null}
                    />

                    <IconButton edge="end" aria-label="delete"
                      onClick={async () => {
                        await configApiClient.blockUser(user.chatId)
                        fetchData()
                      }

                      }
                    >
                      <BlockIcon />
                    </IconButton>
                  </ListItem>
                ) : null
              ))}

            </List>
          </Demo>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Blocked Users
          </Typography>
          <Demo>
            <List dense={dense}>

              {users.map((user, index) => (
                user.blocked ? (
                  <ListItem key={index}
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete"
                        onClick={async () => {
                          await configApiClient.unblockUser(user.chatId)
                          fetchData()
                        }}
                      >
                        <RestoreIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={user.name}
                      secondary={secondary ? `${user.lst}  , ${user.lng}` : null}
                    />
                  </ListItem>
                ) : null
              ))}

            </List>
          </Demo>
        </Grid>
      </Grid>
    </Box>
  );
}