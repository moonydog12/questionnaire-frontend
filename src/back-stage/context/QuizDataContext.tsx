import { createContext, Dispatch } from 'react';
import { QuizData } from '../interface/QuizDataInterface';
import { QuizAction } from './QuizDataProvider';

const initialQuizData: QuizData = {
  name: '',
  description: '',
  startDate: '',
  endDate: '',
  published: false,
  quesList: [],
};

export const QuizDataContext = createContext<{
  quizData: QuizData;
  dispatch: Dispatch<QuizAction>;
}>({
  quizData: initialQuizData,
  dispatch: () => {},
});
