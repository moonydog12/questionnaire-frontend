import { createContext, Dispatch } from 'react';
import { FillInAction } from './FillInProvider';

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

const initialFillInData: FillInData = {
  id: '',
  quiz: {
    id: 0,
    name: '',
    description: '',
  },
  questions: [],
  answer: {},
  user: {
    userName: '',
    phone: '',
    email: '',
    age: 0,
  },
};

// 保存前台作答資料
export const FillInContext = createContext<{
  fillInData: FillInData;
  dispatch: Dispatch<FillInAction>;
}>({
  fillInData: initialFillInData,
  dispatch: () => {},
});
