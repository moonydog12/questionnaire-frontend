import { createContext, ReactNode } from 'react';
import { Survey } from './interface';
import { data } from './fakedata';

interface SurveyQuestionsContextType {
  survey: Survey;
}

export const SurveyQuestionsContext = createContext<SurveyQuestionsContextType>({
  survey: {
    title: '',
    description: '',
    questions: [],
  },
});

export function SurveyQuestionsProvider({ children }: { children: ReactNode }) {
  const surveyData = data;

  return (
    <SurveyQuestionsContext.Provider value={{ survey: surveyData }}>
      {children}
    </SurveyQuestionsContext.Provider>
  );
}
