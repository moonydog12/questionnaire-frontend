import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import SurveyList from './front-stage/pages/SurveyList';
import Layout from './ui/Layout';
import SurveyQuestion from './front-stage/pages/SurveyQuestion';
import SurveyConfirm from './front-stage/pages/SurveyConfirm';
import SurveyResult from './front-stage/pages/SurveyResult';
import BackStageSurveyList from './back-stage/pages/SurveyList';
import NotFound from './ui/NotFound';

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
          { index: true, element: <Navigate to={'list'}></Navigate> },
          {
            path: 'list',
            element: <BackStageSurveyList />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
