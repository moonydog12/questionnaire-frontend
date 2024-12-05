// 定義資料型別
export interface Option {
  optionName: string;
  optionNumber: string;
}

export interface Question {
  quizId?: string;
  quesId: string;
  quesName: string;
  type: 'text' | 'single' | 'multi';
  options?: string;
  required: boolean;
}

export interface QuizData {
  id?: string | null;
  name: string;
  description: string;
  startDate: string | null;
  endDate: string | null;
  quesList: Question[];
  published?: boolean;
}
