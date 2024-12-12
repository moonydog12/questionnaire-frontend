import { useContext, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  styled,
} from '@mui/material';
import { FillInContext } from '../../context/FeedIn/FillInContext';
import { useNavigate } from 'react-router-dom';

const StyledQuestionContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

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

interface FeedInData {
  id: string; // 問卷 ID
  quiz: IQuiz; // 問卷資訊
  questions: Question[]; // 問卷問題
  answers: Record<number, string[]>; // 答案
  user: {
    userName: string;
    phone: string;
    email: string;
    age: number;
  };
}

interface Option {
  option: string;
  optionNumber: string;
}

export default function Quiz() {
  const { fillInData, dispatch } = useContext(FillInContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizData = async () => {
      if (!fillInData.id) return; // 避免 quizId 未準備好時觸發請求

      try {
        const response = await fetch('http://localhost:8080/quiz/getone', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ quizId: fillInData.id }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        dispatch({
          type: 'SET_QUIZ_DATA',
          payload: { quiz: data.quiz, questions: data.ques },
        });
      } catch (error) {
        console.error('Failed to fetch quiz data:', error);
      }
    };

    fetchQuizData();
  }, [fillInData.id]);

  const handleAnswerChange = (quesId: number, value: string | string[]) => {
    dispatch({
      type: 'SET_ANSWER',
      payload: { quesId, answer: value },
    });
  };

  const handleUserChange = (field: keyof FeedInData['user'], value: string | number) => {
    dispatch({
      type: 'SET_USER',
      payload: { field, value },
    });
  };

  const handleSubmit = async () => {
    const fillinData = {
      quizId: quiz.id,
      userName: fillInData.user.userName,
      phone: fillInData.user.phone,
      email: fillInData.user.email,
      age: fillInData.user.age,
      fillinDate: '2024-12-14', // 自動填入今天日期
      answer: fillInData.answer,
    };

    try {
      const res = await fetch('http://localhost:8080/quiz/fillin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fillinData),
      });

      // 填完之後清空 context 資料、跳轉畫面
      dispatch({ type: 'CLEAR_DATA' });
      navigate('../list');
    } catch (error) {
      console.error('Submission failed:', error);
      alert('提交失敗！');
    }
  };

  const { quiz, questions, answer } = fillInData;

  return (
    <Box
      component={Paper}
      sx={{
        padding: (theme) => theme.spacing(5),
      }}
    >
      {/* 問卷標題 */}
      <Typography variant="h4" textAlign="center" gutterBottom>
        {quiz.name}
      </Typography>

      {/* 問卷描述 */}
      <Typography variant="h6" color="textSecondary" gutterBottom>
        {quiz.description}
      </Typography>

      {/* 使用者資訊表單 */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { sm: '1fr' },
          gap: 2,
          mb: 4,
          maxWidth: '60%',
        }}
      >
        <TextField
          label="姓名"
          variant="outlined"
          fullWidth
          value={fillInData.user.userName || ''}
          onChange={(e) => handleUserChange('userName', e.target.value)}
        />
        <TextField
          label="電話"
          variant="outlined"
          fullWidth
          value={fillInData.user.phone || ''}
          onChange={(e) => handleUserChange('phone', e.target.value)}
        />
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          value={fillInData.user.email || ''}
          onChange={(e) => handleUserChange('email', e.target.value)}
        />
        <TextField
          label="年齡"
          type="number"
          variant="outlined"
          fullWidth
          value={fillInData.user.age || ''}
          onChange={(e) => handleUserChange('age', Number(e.target.value))}
        />
      </Box>

      {/* 問題區塊 */}
      {questions.map((question) => {
        const options: Option[] = JSON.parse(question.options || '[]');
        return (
          <StyledQuestionContainer key={question.quesId}>
            {/* 問題標題 */}
            <Typography variant="h6" gutterBottom>
              {question.quesName}
            </Typography>

            {/* 單選題 */}
            {question.type === 'single' && (
              <RadioGroup
                value={answer[question.quesId]?.[0] || ''}
                onChange={(e) => handleAnswerChange(question.quesId, e.target.value)}
                sx={{ pl: 2 }}
              >
                {options.map((option) => (
                  <FormControlLabel
                    key={option.optionNumber}
                    value={option.option} // 使用選項的文字值作為 value
                    control={<Radio color="primary" />}
                    label={option.option}
                  />
                ))}
              </RadioGroup>
            )}

            {/* 多選題 */}
            {question.type === 'multi' && (
              <Box sx={{ pl: 2 }}>
                {options.map((option) => (
                  <FormControlLabel
                    key={option.optionNumber}
                    control={
                      <Checkbox
                        color="primary"
                        checked={answer[question.quesId]?.includes(option.option) || false} // 檢查是否包含 option
                        onChange={(e) => {
                          const prevAnswers = answer[question.quesId] || [];
                          const newAnswers = e.target.checked
                            ? [...prevAnswers, option.option] // 使用 option 作為答案值
                            : prevAnswers.filter((value) => value !== option.option);
                          handleAnswerChange(question.quesId, newAnswers);
                        }}
                      />
                    }
                    label={option.option}
                  />
                ))}
              </Box>
            )}

            {/* 開放式文字題 */}
            {question.type === 'text' && (
              <TextField
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                value={answer[question.quesId]?.[0] || ''}
                onChange={(e) => handleAnswerChange(question.quesId, e.target.value)}
                placeholder="請輸入您的答案"
                sx={{ mt: 2 }}
              />
            )}
          </StyledQuestionContainer>
        );
      })}

      {/* 提交按鈕 */}
      <Box textAlign="right" sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleSubmit}
          sx={{ textTransform: 'none', px: 4 }}
        >
          送出
        </Button>
      </Box>
    </Box>
  );
}
