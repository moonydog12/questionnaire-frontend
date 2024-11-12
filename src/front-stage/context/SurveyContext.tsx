import React, { createContext, useReducer, ReactNode } from 'react';

// 定義 SurveyData 型別
type SurveyData = {
  name: string;
  phone: string;
  email: string;
  age: string;
  answers: { [questionId: string]: any }; // 用來儲存問卷的回答
};

// 定義初始狀態
const initialState: SurveyData = {
  name: '',
  phone: '',
  email: '',
  age: '',
  answers: {},
};

// 創建 SurveyContext
export const SurveyContext = createContext<{
  surveyData: SurveyData;
  dispatch: React.Dispatch<SurveyAction>;
}>({
  surveyData: initialState,
  dispatch: () => {}, // 預設的 dispatch 函數
});

enum SurveyActionType {
  SET_FIELD = 'SET_FIELD',
  SET_SINGLE_CHOICE = 'SET_SINGLE_CHOICE',
  SET_MULTIPLE_CHOICE = 'SET_MULTIPLE_CHOICE',
}

type SurveyAction =
  | { type: SurveyActionType.SET_FIELD; field: string; value: string }
  | { type: SurveyActionType.SET_SINGLE_CHOICE; questionId: string; value: string }
  | {
      type: SurveyActionType.SET_MULTIPLE_CHOICE;
      questionId: string;
      value: string;
      checked: boolean;
    };

// reducer 函數
function surveyReducer(state: SurveyData, action: SurveyAction): SurveyData {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };

    case 'SET_SINGLE_CHOICE':
      return {
        ...state,
        answers: { ...state.answers, [action.questionId]: action.value },
      };

    case 'SET_MULTIPLE_CHOICE':
      // 處理多選題邏輯
      const currentAnswers = state.answers[action.questionId] || [];
      let newAnswers;
      if (action.checked) {
        newAnswers = [...currentAnswers, action.value];
      } else {
        newAnswers = currentAnswers.filter((option: string) => option !== action.value);
      }

      return {
        ...state,
        answers: {
          ...state.answers,
          [action.questionId]: newAnswers,
        },
      };

    default:
      return state;
  }
}

// SurveyProvider
export function SurveyProvider({ children }: { children: ReactNode }): JSX.Element {
  const [surveyData, dispatch] = useReducer(surveyReducer, initialState);

  return (
    <SurveyContext.Provider value={{ surveyData, dispatch }}>{children}</SurveyContext.Provider>
  );
}
