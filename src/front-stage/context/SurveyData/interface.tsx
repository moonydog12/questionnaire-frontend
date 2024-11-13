export enum SurveyActionType {
  SET_FIELD = 'SET_FIELD',
  SET_FIELD_ANSWER = 'SET_FIELD_ANSWER',
  SET_SINGLE_CHOICE = 'SET_SINGLE_CHOICE',
  SET_MULTIPLE_CHOICE = 'SET_MULTIPLE_CHOICE',
}

export type SurveyData = {
  name: string;
  phone: string;
  email: string;
  age: string;
  answers: { [questionId: string]: string | string[] };
};

export type SurveyAction =
  | { type: SurveyActionType.SET_FIELD; field: string; value: string }
  | { type: SurveyActionType.SET_FIELD_ANSWER; questionId: string; value: string }
  | { type: SurveyActionType.SET_SINGLE_CHOICE; questionId: string; value: string }
  | {
      type: SurveyActionType.SET_MULTIPLE_CHOICE;
      questionId: string;
      value: string;
      checked: boolean;
    };
