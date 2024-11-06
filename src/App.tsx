import { Grid2 as Grid } from '@mui/material';
import BasicTable from './front-stage/ListPage';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid container sx={{ display: 'grid', justifyItems: 'center' }}>
          <Grid size={8}>
            <BasicTable />
          </Grid>
        </Grid>
      </LocalizationProvider>
    </>
  );
}

export default App;
