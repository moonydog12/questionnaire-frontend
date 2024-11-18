import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Layout from './ui/Layout';
import NotFound from './ui/NotFound';
import SurveyList from './front-stage/pages/SurveyList';
import SurveyQuestion from './front-stage/pages/SurveyQuestion';
import SurveyConfirm from './front-stage/pages/SurveyConfirm';
import SurveyResult from './front-stage/pages/SurveyResult';
import BackStageSurveyList from './back-stage/pages/SurveyList';
import Panel from './back-stage/pages/Panel';

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <NotFound />,

    children: [
      { path: '/', element: <Navigate to={'list'} /> },
      { path: '/list', element: <SurveyList /> },
      {
        path: '/question',
        element: <SurveyQuestion />,
      },
      {
        path: '/confirm',
        element: <SurveyConfirm />,
      },
      {
        path: '/result',
        element: <SurveyResult />,
      },
      {
        path: '/backstage',
        children: [
          { index: true, element: <Navigate to={'list'} /> },
          {
            path: 'list',
            element: <BackStageSurveyList />,
          },
          {
            path: 'panel',
            element: <Panel />,
            children: [
              { index: true, element: <Navigate to="survey" /> },
              {
                path: 'survey',
              },
              {
                path: 'questions',
              },
              {
                path: 'feedback',
              },
              {
                path: 'statistics',
              },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
