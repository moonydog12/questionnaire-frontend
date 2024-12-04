import { createContext } from 'react';
import { SurveyAction, SurveyData } from './interface';

export const SurveyDataContext = createContext<{
  surveyData: SurveyData;
  dispatch: React.Dispatch<SurveyAction>;
}>({
  surveyData: {
    name: '',
    phone: '',
    email: '',
    age: '',
    answers: {},
  },
  dispatch: () => {},
});
