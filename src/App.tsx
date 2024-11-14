import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import SurveyList from './front-stage/pages/SurveyList';
import Layout from './ui/Layout';
import SurveyQuestion from './front-stage/pages/SurveyQuestion';
import SurveyConfirm from './front-stage/pages/SurveyConfirm';
import SurveyResult from './front-stage/pages/SurveyResult';
import Test from './back-stage/pages/test';
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
          { index: true, element: <Navigate to={'test'}></Navigate> },
          {
            path: 'test',
            element: <Test />,
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
