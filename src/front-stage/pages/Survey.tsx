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
import { ChangeEvent, FormEvent, useState } from 'react';
import { survey } from './fakedata';

// 定義獨立的樣式元件
const StyledFormControl = styled(FormControl)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

// 定義重複利用的 LabeledTextField 元件
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

function Survey() {
  const [answers, setAnswers] = useState<any>({
    name: '',
    phone: '',
    email: '',
    age: '',
  });

  function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { id, value } = event.target;
    setAnswers({ ...answers, [id]: value });
    console.log(answers);
  }

  function handleRadioChange(event: ChangeEvent<HTMLInputElement>, questionId: string) {
    const { value } = event.target;
    console.log(value);
    setAnswers({ ...answers, [questionId]: value });
  }

  function handleCheckboxChange(event: ChangeEvent<HTMLInputElement>, questionId: string) {
    const { value, checked } = event.target;
    setAnswers({
      ...answers,
      [questionId]: {
        ...answers[questionId],
        [value]: checked,
      },
    });
    console.log(answers);
  }

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(answers);
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
          value={answers.name}
          onChange={handleInputChange}
        />
        <LabeledTextField
          label="手機"
          id="phone"
          type="tel"
          value={answers.phone}
          onChange={handleInputChange}
        />
        <LabeledTextField
          label="Email"
          id="email"
          type="email"
          value={answers.email}
          onChange={handleInputChange}
        />
        <LabeledTextField
          label="年齡"
          id="age"
          type="number"
          value={answers.age}
          onChange={handleInputChange}
        />

        {/* 動態生成問卷 */}
        {survey.questions.map((question) => (
          <Box key={question.id}>
            <Typography variant="h6" sx={{ mt: 3 }}>
              {question.questionText}
            </Typography>
            {question.type === 'single-choice' && (
              <FormControl component="fieldset" fullWidth sx={{ mb: 2 }}>
                <RadioGroup
                  name={String(question.id)}
                  value={answers[question.id] || ''}
                  onChange={(event) => handleRadioChange(event, String(question.id))}
                >
                  {question.options?.map((option: any) => (
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
            {question.type === 'multiple-choice' && (
              <FormControl component="fieldset" fullWidth sx={{ mb: 2 }}>
                <FormGroup>
                  {question.options?.map((option: any) => (
                    <FormControlLabel
                      key={option.optionId}
                      control={<Checkbox />}
                      label={option.optionText}
                      value={option.optionId || ''}
                      checked={answers[question.id]?.[option.optionId] || false}
                      onChange={(event) => handleCheckboxChange(event, question.id)}
                    />
                  ))}
                </FormGroup>
              </FormControl>
            )}
            {question.type === 'text' && (
              <StyledFormControl fullWidth>
                <TextField
                  id={String(question.id)}
                  value={answers[question.id] || ''}
                  onChange={(event) => handleInputChange(event)}
                  required
                  size="small"
                  multiline
                  rows={4}
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

export default Survey;
