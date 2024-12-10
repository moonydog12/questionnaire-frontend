import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Layout from './ui/Layout';
import NotFound from './ui/NotFound';
import QuizList from './front-stage/pages/QuizList';
import Quiz from './front-stage/pages/Quiz';
import SurveyConfirm from './front-stage/pages/SurveyConfirm';
import SurveyResult from './front-stage/pages/SurveyResult';
import BackStageSurveyList from './back-stage/pages/QuizList';
import Panel from './back-stage/pages/Panel';
import TabSurvey from './back-stage/pages/TabSurvey';
import TabQuestions from './back-stage/pages/TabQuestions';
import TabFeedback from './back-stage/pages/TabFeedback';
import TabStatistics from './back-stage/pages/TabStatistics';
import { SearchResultProvider } from './context/SearchResult/SearchResultProvider';
import QuizProvider from './context/CreateUpdate/QuizProvider';
import FillInProvider from './context/FeedIn/FillInProvider';

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
