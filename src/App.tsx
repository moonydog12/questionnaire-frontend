import { Grid2 as Grid } from '@mui/material';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SurveyList from './front-stage/pages/SurveyList';

const router = createBrowserRouter([{ path: '/', element: <SurveyList /> }]);

function App() {
  return (
    <>
      <Grid container sx={{ display: 'grid', justifyItems: 'center' }}>
        <Grid size={8}>
          <RouterProvider router={router}></RouterProvider>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
