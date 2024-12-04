import { createContext, Dispatch } from 'react';
import { QuizData } from '../../back-stage/interface/QuizDataInterface';
import { QuizAction } from './CreateUpdateProvider';

const initialQuizData: QuizData = {
  name: '',
  description: '',
  startDate: '',
  endDate: '',
  published: false,
  quesList: [],
};

// 保存新增 / 修改問卷狀態
export const QuizDataContext = createContext<{
  quizData: QuizData;
  dispatch: Dispatch<QuizAction>;
}>({
  quizData: initialQuizData,
  dispatch: () => {},
});
