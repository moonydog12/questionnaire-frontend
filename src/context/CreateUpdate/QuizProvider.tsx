import { ReactNode, useReducer } from 'react';
import { Question, QuizData } from '../../back-stage/interface/QuizDataInterface';
import { QuizContext } from './QuizContext';

export type QuizAction =
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_DESCRIPTION'; payload: string }
  | { type: 'SET_START_DATE'; payload: string | null }
  | { type: 'SET_END_DATE'; payload: string | null }
  | { type: 'ADD_QUESTION'; payload: Question }
  | { type: 'UPDATE_QUESTION'; payload: { quesId: string; updatedQuestion: Partial<Question> } }
  | { type: 'REMOVE_QUESTION'; payload: string }
  | { type: 'SET_QUIZ_ID'; payload: string }
  | { type: 'SET_QUESTION'; payload: Question[] }
  | { type: 'CLEAR_QUIZ_DATA' }
  | { type: 'SET_PUBLISHED'; payload: boolean };

function quizReducer(state: QuizData, action: QuizAction) {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.payload };
    case 'SET_DESCRIPTION':
      return { ...state, description: action.payload };
    case 'SET_START_DATE':
      return { ...state, startDate: action.payload };
    case 'SET_END_DATE':
      return { ...state, endDate: action.payload };
    case 'SET_QUESTION':
      return { ...state, quesList: action.payload };
    case 'SET_PUBLISHED':
      return { ...state, published: action.payload };
    case 'ADD_QUESTION':
      return { ...state, quesList: [...state.quesList, action.payload] };

    // 用在編輯問卷，因為資料庫已經存在該筆 quiz
    case 'SET_QUIZ_ID':
      return { ...state, id: action.payload };
    case 'UPDATE_QUESTION':
      return {
        ...state,
        quesList: state.quesList.map((question) =>
          question.quesId === action.payload.quesId
            ? { ...question, ...action.payload.updatedQuestion }
            : question
        ),
      };
    case 'REMOVE_QUESTION':
      return {
        ...state,
        quesList: state.quesList.filter((question) => question.quesId !== action.payload),
      };

    // 重設 state 為 initialState
    case 'CLEAR_QUIZ_DATA':
      return initialState;
    default:
      return state;
  }
}

const initialState: QuizData = {
  id: '',
  name: '',
  description: '',
  startDate: null,
  published: false,
  endDate: null,
  quesList: [],
};

export default function QuizProvider({ children }: { children: ReactNode }): JSX.Element {
  const [quizData, dispatch] = useReducer(quizReducer, initialState);

  return <QuizContext.Provider value={{ quizData, dispatch }}>{children}</QuizContext.Provider>;
}
