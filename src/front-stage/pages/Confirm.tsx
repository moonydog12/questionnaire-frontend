import { useContext } from 'react';
import {
  Paper,
  Typography,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FillInContext } from '../../context/FeedIn/FillInContext';

export default function Confirm() {
  const navigate = useNavigate();
  const { fillInData, dispatch } = useContext(FillInContext);

  const handleSubmit = async () => {
    const data = {
      quizId: fillInData.id,
      userName: fillInData.user.userName,
      phone: fillInData.user.phone,
      email: fillInData.user.email,
      age: fillInData.user.age,
      fillinDate: '2024-12-14', // 自動填入今天日期
      answer: fillInData.answer,
    };

    try {
      await fetch('http://localhost:8080/quiz/fillin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      // 填完之後清空 context 資料、跳轉畫面
      dispatch({ type: 'CLEAR_DATA' });
      navigate('../list');
    } catch (error) {
      console.error('Submission failed:', error);
      alert('提交失敗！');
    }
  };

  // 確認 fillInData 是否存在，避免空值錯誤
  if (!fillInData) {
    return <Typography>加載中...</Typography>;
  }

  return (
    <Box sx={{ p: 3, maxWidth: '70%', margin: '0 auto' }}>
      {/* 問卷標題與描述 */}
      <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          {fillInData.quiz.name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {fillInData.quiz.description}
        </Typography>
        <Typography variant="h5" gutterBottom>
          填寫者：{fillInData.user.userName}
        </Typography>
      </Paper>

      {/* 問卷回答區 */}
      <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
        <Typography variant="h6" gutterBottom>
          回答：
        </Typography>
        <List>
          {fillInData.questions.map((question, index) => {
            const userAnswer = fillInData.answer[question.quesId];
            let displayAnswer;

            // 根據題目類型解析回答
            if (question.type === 'text') {
              displayAnswer = userAnswer.join(', ');
            } else if (question.type === 'single') {
              const selectedOption = JSON.parse(question.options).find(
                (option) => option.option === userAnswer[0]
              );
              displayAnswer = selectedOption ? selectedOption.option : '無回答';
            } else if (question.type === 'multi') {
              const selectedOptions = JSON.parse(question.options).filter((option) =>
                userAnswer.includes(option.option)
              );
              displayAnswer = selectedOptions.map((opt) => opt.option).join(', ') || '無回答';
            }

            return (
              <Box key={index}>
                <ListItem>
                  <ListItemText
                    primary={`${index + 1}. ${question.quesName}`}
                    secondary={displayAnswer}
                  />
                </ListItem>
                {index < fillInData.questions.length - 1 && <Divider />}
              </Box>
            );
          })}
        </List>
      </Paper>

      {/* 返回按鈕 */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button variant="contained" color="secondary" onClick={() => navigate(-1)}>
          回上一頁
        </Button>

        <Button variant="contained" color="secondary" onClick={handleSubmit}>
          送出
        </Button>
      </Box>
    </Box>
  );
}
