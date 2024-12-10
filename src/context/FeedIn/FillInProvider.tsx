import { useReducer, ReactNode } from 'react';
import { FillInContext } from './FillInContext';

// 定義問卷和答案數據結構
interface Question {
  quesId: number;
  quesName: string;
  options: string;
  type: string;
  required: boolean;
}

interface IQuiz {
  id: number;
  name: string;
  description: string;
  startDate?: string;
  endDate?: string;
}

interface FillInData {
  id: string; // 問卷 ID
  quiz: IQuiz; // 問卷資訊
  questions: Question[]; // 問卷問題
  answer: Record<number, string[]>; // 答案
  user: {
    userName: string;
    phone: string;
    email: string;
    age: number;
  };
}

// 定義 Reducer 動作類型
export type FillInAction =
  | { type: 'SET_QUIZ_ID'; payload: string }
  | { type: 'SET_QUIZ_DATA'; payload: { quiz: IQuiz; questions: Question[] } }
  | { type: 'SET_ANSWER'; payload: { quesId: number; answer: string | string[] } }
  | { type: 'SET_USER'; payload: { field: keyof FillInData['user']; value: string | number } }
  | { type: 'CLEAR_DATA' };

// Reducer
function feedInReducer(state: FillInData, action: FillInAction): FillInData {
  switch (action.type) {
    case 'SET_QUIZ_ID':
      return { ...state, id: action.payload };
    case 'SET_QUIZ_DATA':
      return { ...state, quiz: action.payload.quiz, questions: action.payload.questions };
    case 'SET_ANSWER':
      return {
        ...state,
        answer: {
          ...state.answer,
          [action.payload.quesId]: Array.isArray(action.payload.answer)
            ? action.payload.answer
            : [action.payload.answer],
        },
      };
    case 'SET_USER':
      return {
        ...state,
        user: {
          ...state.user,
          [action.payload.field]: action.payload.value,
        },
      };
    case 'CLEAR_DATA':
      return {
        id: '',
        quiz: { id: 0, name: '', description: '' },
        questions: [],
        answer: {},
        user: { userName: '', phone: '', email: '', age: 0 },
      };
    default:
      return state;
  }
}

// 初始數據
const initialFillInData: FillInData = {
  id: '',
  quiz: { id: 0, name: '', description: '' },
  questions: [],
  answer: {},
  user: {
    userName: '',
    phone: '',
    email: '',
    age: 0,
  },
};

export default function FillInProvider({ children }: { children: ReactNode }): JSX.Element {
  const [fillInData, dispatch] = useReducer(feedInReducer, initialFillInData);

  return (
    <FillInContext.Provider value={{ fillInData, dispatch }}>{children}</FillInContext.Provider>
  );
}
