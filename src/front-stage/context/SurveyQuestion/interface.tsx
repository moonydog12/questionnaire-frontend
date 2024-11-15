// 定義單一問題型別
interface SurveyQuestion {
  id: string;
  type: 'text' | 'single-choice' | 'multiple-choice';
  questionText: string;
  options?: { optionId: string; optionText: string }[];
}

// 定義問卷的型別
export interface Survey {
  title: string;
  description: string;
  questions: SurveyQuestion[];
}
