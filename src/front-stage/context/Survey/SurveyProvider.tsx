import { ReactNode, useReducer } from 'react';
import { SurveyContext } from './SurveyContext';
import { SurveyAction, SurveyData } from './interface';

// 定義初始狀態
const initialState: SurveyData = {
  name: '',
  phone: '',
  email: '',
  age: '',
  answers: {},
};

function surveyReducer(state: SurveyData, action: SurveyAction): SurveyData {
  switch (action.type) {
    case 'SET_FIELD': {
      return { ...state, [action.field]: action.value };
    }

    case 'SET_SINGLE_CHOICE':
    case 'SET_FIELD_ANSWER': {
      return {
        ...state,
        answers: { ...state.answers, [action.questionId]: action.value },
      };
    }

    case 'SET_MULTIPLE_CHOICE': {
      const currentAnswers = (state.answers[action.questionId] as string[]) || [];
      let updatedAnswers;

      if (action.checked && !currentAnswers.includes(action.value)) {
        updatedAnswers = [...currentAnswers, action.value];
      } else {
        updatedAnswers = currentAnswers.filter((option: string) => option !== action.value);
      }

      return {
        ...state,
        answers: {
          ...state.answers,
          [action.questionId]: updatedAnswers,
        },
      };
    }

    default:
      return state;
  }
}

// Provider function
export default function SurveyProvider({ children }: { children: ReactNode }): JSX.Element {
  const [surveyData, dispatch] = useReducer(surveyReducer, initialState);

  return (
    <SurveyContext.Provider value={{ surveyData, dispatch }}>{children}</SurveyContext.Provider>
  );
}
