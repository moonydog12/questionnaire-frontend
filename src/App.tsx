import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Layout from './ui/Layout';
import NotFound from './ui/NotFound';
import QuizList from './front-stage/pages/QuizList';
import Quiz from './front-stage/pages/Quiz';
import Statistics from './front-stage/pages/Statistics';
import BackStageSurveyList from './back-stage/pages/QuizList';
import Panel from './back-stage/pages/Panel';
import TabSurvey from './back-stage/pages/TabSurvey';
import TabQuestions from './back-stage/pages/TabQuestions';
import TabFeedback from './back-stage/pages/TabFeedback';
import TabStatistics from './back-stage/pages/TabStatistics';
import { SearchResultProvider } from './context/SearchResult/SearchResultProvider';
import QuizProvider from './context/CreateUpdate/QuizProvider';
import FillInProvider from './context/FeedIn/FillInProvider';
import FeedbackDetails from './back-stage/pages/FeedbackDetails';
import Confirm from './front-stage/pages/Confirm';

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <NotFound />,

    children: [
      { path: '/', element: <Navigate to={'list'} /> },
      { path: '/list', element: <QuizList /> },
      {
        path: '/question',
        element: <Quiz />,
      },
      {
        path: '/confirm',
        element: <Confirm />,
      },
      {
        path: '/statistics',
        element: <Statistics />,
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
            path: 'feedback/:email',
            element: <FeedbackDetails />,
          },
          {
            path: 'panel/*',
            element: <Panel />,
            children: [
              { index: true, element: <Navigate to="survey" /> },
              {
                path: 'survey',
                element: <TabSurvey />,
              },
              {
                path: 'questions',
                element: <TabQuestions />,
              },
              {
                path: 'feedback',
                element: <TabFeedback />,
              },
              {
                path: 'statistics',
                element: <TabStatistics />,
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
    <SearchResultProvider>
      <QuizProvider>
        <FillInProvider>
          <RouterProvider router={router} />
        </FillInProvider>
      </QuizProvider>
    </SearchResultProvider>
  );
}

export default App;
