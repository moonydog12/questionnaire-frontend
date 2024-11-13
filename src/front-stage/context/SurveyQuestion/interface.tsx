// 定義單個問題的型別
interface SurveyQuestion {
  id: string;
  type: 'text' | 'single-choice' | 'multiple-choice';
  questionText: string;
  options?: { optionId: string; optionText: string }[];
}

// 定義整個問卷的型別
export interface Survey {
  title: string;
  description: string;
  questions: SurveyQuestion[];
}
