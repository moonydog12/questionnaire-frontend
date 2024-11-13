import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SurveyList from './front-stage/pages/SurveyList';
import Layout from './ui/Layout';
import SurveyQuestion from './front-stage/pages/SurveyQuestion';
import SurveyConfirm from './front-stage/pages/SurveyConfirm';

const router = createBrowserRouter([
  {
    element: <Layout />,

    children: [
      { path: '/list', element: <SurveyList /> },
      {
        path: '/question',
        element: <SurveyQuestion />,
      },
      {
        path: '/confirm',
        element: <SurveyConfirm />,
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
