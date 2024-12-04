import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Layout from './ui/Layout';
import NotFound from './ui/NotFound';
import SurveyList from './front-stage/pages/SurveyList';
import SurveyQuestion from './front-stage/pages/SurveyQuestion';
import SurveyConfirm from './front-stage/pages/SurveyConfirm';
import SurveyResult from './front-stage/pages/SurveyResult';
import BackStageSurveyList from './back-stage/pages/QuizList';
import Panel from './back-stage/pages/Panel';
import TabSurvey from './back-stage/pages/TabSurvey';
import TabQuestions from './back-stage/pages/TabQuestions';
import TabFeedback from './back-stage/pages/TabFeedback';
import TabStatistics from './back-stage/pages/TabStatistics';
import SurveyDataProvider from './context/SurveyData/SurveyDataProvider';
import { SurveyQuestionsProvider } from './context/SurveyQuestion/SurveyQuestionContext';
import { useEffect, useState } from 'react';
import { SurveyData } from './context/SurveyData/interface';

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
  const [initialData, setInitialData] = useState<SurveyData | null>(null);

  useEffect(() => {
    async function fetchInitialData() {
      try {
        const response = await fetch('http://localhost:8080/quiz/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: '',
            startDate: '',
            endDate: '',
          }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        setInitialData(data);
      } catch (error) {
        console.error('Failed to fetch survey data:', error);
      }
    }

    fetchInitialData();
  }, []);

  console.log(initialData);

  return (
    <>
      <SurveyDataProvider initialData={initialData!}>
        <SurveyQuestionsProvider>
          <RouterProvider router={router} />
        </SurveyQuestionsProvider>
      </SurveyDataProvider>
    </>
  );
}

export default App;
