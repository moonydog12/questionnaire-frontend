import { Outlet, Link } from 'react-router-dom';
import { Grid2 as Grid, AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import Unicorn from './Unicorn';

function Layout() {
  return (
    <>
      <AppBar position="static" sx={{ bgcolor: 'secondary.dark' }}>
        <Unicorn />
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Dynamic Questionnaire
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/surveys">
            Surveys
          </Button>
          <Button color="inherit" component={Link} to="/about">
            <MeetingRoomIcon />
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 3 }}>
        <Grid container justifyContent={'center'}>
          <Grid size={8}>
            <Outlet />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Layout;
