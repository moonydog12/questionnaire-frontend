import { Grid2 as Grid } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import SurveyProvider from './front-stage/context/Survey/SurveyProvider';
import Survey from './front-stage/pages/Survey';

function App() {
  return (
    <>
      <Grid container sx={{ display: 'grid', justifyItems: 'center' }}>
        <Grid size={8}>
          <SurveyProvider>
            <Survey />
          </SurveyProvider>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
