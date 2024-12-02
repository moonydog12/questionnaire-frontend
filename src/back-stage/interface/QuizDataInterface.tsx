// 定義資料型別
export interface Option {
  optionNumber: number;
  option: string;
}

export interface Question {
  quizId: string;
  quesId: string;
  type: 'text' | 'single' | 'multiple';
  questionName: string;
  options?: Option[];
}

export interface QuizData {
  name: string;
  description: string;
  startDate: Date | null;
  endDate: Date | null;
  questions: Question[];
}
