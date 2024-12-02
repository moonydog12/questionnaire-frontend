import { ReactNode, useReducer } from 'react';
import { Question, QuizData } from '../interface/QuizDataInterface';
import { QuizDataContext } from './QuizDataContext';

export type QuizAction =
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_DESCRIPTION'; payload: string }
  | { type: 'SET_START_DATE'; payload: Date | null }
  | { type: 'SET_END_DATE'; payload: Date | null }
  | { type: 'ADD_QUESTION'; payload: Question }
  | { type: 'UPDATE_QUESTION'; payload: { quesId: string; updatedQuestion: Partial<Question> } }
  | { type: 'REMOVE_QUESTION'; payload: string };

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
    case 'ADD_QUESTION':
      return { ...state, questions: [...state.questions, action.payload] };
    case 'UPDATE_QUESTION':
      return {
        ...state,
        questions: state.questions.map((question) =>
          question.quesId === action.payload.quesId
            ? { ...question, ...action.payload.updatedQuestion }
            : question
        ),
      };
    case 'REMOVE_QUESTION':
      return {
        ...state,
        questions: state.questions.filter((question) => question.quesId !== action.payload),
      };
    default:
      return state;
  }
}

const initialState: QuizData = {
  name: '',
  description: '',
  startDate: null,
  endDate: null,
  questions: [],
};

export default function QuizDataProvider({ children }: { children: ReactNode }): JSX.Element {
  const [quizData, dispatch] = useReducer(quizReducer, initialState);

  return (
    <QuizDataContext.Provider value={{ quizData, dispatch }}>{children}</QuizDataContext.Provider>
  );
}
