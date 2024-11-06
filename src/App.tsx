import { Grid2 as Grid } from '@mui/material';
// import QuestionList from './front-stage/pages/QuestionList';
import Answer from './front-stage/pages/Answer';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  return (
    <>
      <Grid container sx={{ display: 'grid', justifyItems: 'center' }}>
        <Grid size={8}>
          {/* <QuestionList /> */}
          <Answer />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
