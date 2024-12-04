import { useContext, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  TextField,
  Typography,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormGroup,
  Checkbox,
  styled,
} from '@mui/material';
import { SurveyQuestionsContext } from '../../context/SurveyQuestion/SurveyQuestionContext';

// 定義重複利用的樣式
const StyledFormControl = styled(FormControl)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

function LabeledTextField({
  label,
  id,
  type = 'text',
  value,
  onChange,
}: {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <StyledFormControl fullWidth>
      <Typography sx={{ minWidth: '4rem' }}>{label}:</Typography>
      <TextField id={id} value={value} onChange={onChange} type={type} required size="small" />
    </StyledFormControl>
  );
}

export default function SurveyQuestion() {
  const { surveyData, dispatch } = useContext(SurveyDataContext);
  const { survey } = useContext(SurveyQuestionsContext);
  const navigate = useNavigate();

  function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { id, value } = event.target;
    dispatch({ type: SurveyActionType.SET_FIELD, field: id, value });
  }

  function handleInputAnswerChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    questionId: string
  ) {
    const { value } = event.target;
    dispatch({ type: SurveyActionType.SET_FIELD_ANSWER, questionId, value });
  }

  function handleRadioChange(event: ChangeEvent<HTMLInputElement>, questionId: string) {
    const { value } = event.target;
    dispatch({ type: SurveyActionType.SET_SINGLE_CHOICE, questionId, value });
  }

  function handleCheckboxChange(event: ChangeEvent<HTMLInputElement>, questionId: string) {
    const { value, checked } = event.target;
    dispatch({
      type: SurveyActionType.SET_MULTIPLE_CHOICE,
      questionId,
      value,
      checked,
    });
  }

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    navigate('/confirm');
  }

  return (
    <Paper sx={{ p: 5 }}>
      <Typography variant="h4" textAlign="center" sx={{ mb: 3 }}>
        {survey.title}
      </Typography>
      <Typography variant="h6" sx={{ mb: 5 }}>
        {survey.description}
      </Typography>

      {/* 必填欄位 */}
      <form onSubmit={handleFormSubmit}>
        <LabeledTextField
          label="姓名"
          id="name"
          value={surveyData.name}
          onChange={handleInputChange}
        />
        <LabeledTextField
          label="手機"
          id="phone"
          type="tel"
          value={surveyData.phone}
          onChange={handleInputChange}
        />
        <LabeledTextField
          label="Email"
          id="email"
          type="email"
          value={surveyData.email}
          onChange={handleInputChange}
        />
        <LabeledTextField
          label="年齡"
          id="age"
          type="number"
          value={surveyData.age}
          onChange={handleInputChange}
        />

        {/* 動態生成欄位 */}
        {survey.questions.map((question) => (
          <Box key={question.id}>
            <Typography variant="h6" sx={{ mt: 3 }}>
              {question.questionText}
            </Typography>

            {/* 單選 */}
            {question.type === 'single-choice' && (
              <FormControl component="fieldset" fullWidth sx={{ mb: 2 }}>
                <RadioGroup
                  name={question.id}
                  value={surveyData.answers[question.id]}
                  onChange={(event) => handleRadioChange(event, question.id)}
                >
                  {question.options?.map((option) => (
                    <FormControlLabel
                      key={option.optionId}
                      control={<Radio />}
                      label={option.optionText}
                      value={option.optionId}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            )}

            {/* 多選 */}
            {question.type === 'multiple-choice' && (
              <FormControl component="fieldset" fullWidth sx={{ mb: 2 }}>
                <FormGroup>
                  {question.options?.map((option) => (
                    <FormControlLabel
                      key={option.optionId}
                      control={<Checkbox />}
                      label={option.optionText}
                      value={option.optionId || ''}
                      checked={surveyData.answers[question.id]?.includes(option.optionId) || false}
                      onChange={(event) => handleCheckboxChange(event, question.id)}
                    />
                  ))}
                </FormGroup>
              </FormControl>
            )}

            {/* 文字 */}
            {question.type === 'text' && (
              <StyledFormControl fullWidth>
                <TextField
                  id={String(question.id)}
                  value={surveyData.answers[question.id]}
                  onChange={(event) => handleInputAnswerChange(event, question.id)}
                  required
                  size="small"
                  multiline
                  rows={4}
                  sx={{ mb: 2 }}
                />
              </StyledFormControl>
            )}
          </Box>
        ))}

        <Box textAlign="right" sx={{ mt: 3 }}>
          <Button type="submit" variant="contained" color="secondary">
            送出
          </Button>
        </Box>
      </form>
    </Paper>
  );
}
