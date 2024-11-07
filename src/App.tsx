import { Grid2 as Grid } from '@mui/material';
import Survey from './front-stage/pages/Survey';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  return (
    <>
      <Grid container sx={{ display: 'grid', justifyItems: 'center' }}>
        <Grid size={8}>
          <Survey />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
