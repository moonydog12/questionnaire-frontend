import { Grid2 as Grid } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import SurveyDataProvider from './front-stage/context/SurveyData/SurveyDataProvider';
import { SurveyQuestionsProvider } from './front-stage/context/SurveyQuestion/SurveyQuestionContext';
import Survey from './front-stage/pages/Survey';

function App() {
  return (
    <>
      <Grid container sx={{ display: 'grid', justifyItems: 'center' }}>
        <Grid size={8}>
          <SurveyQuestionsProvider>
            <SurveyDataProvider>
              <Survey />
            </SurveyDataProvider>
          </SurveyQuestionsProvider>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
