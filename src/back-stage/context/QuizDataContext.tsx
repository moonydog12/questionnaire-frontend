import { createContext, Dispatch } from 'react';
import { QuizData } from '../interface/QuizDataInterface';
import { QuizAction } from './QuizDataProvider';

export const QuizDataContext = createContext<{
  quizData: QuizData;
  dispatch: Dispatch<QuizAction>;
}>({
  quizData: {
    name: '',
    description: '',
    startDate: null,
    endDate: null,
    questions: [],
  },
  dispatch: () => {},
});
