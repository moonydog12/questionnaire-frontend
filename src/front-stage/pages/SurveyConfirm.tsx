import { useContext } from 'react';
// import { SurveyDataContext } from '../../context/SearchResult/SurveyDataContext';
import { SurveyQuestionsContext } from '../../context/SurveyQuestion/SurveyQuestionContext';
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

export default function SurveyConfirm() {
  // const { surveyData } = useContext(SurveyDataContext);
  const { survey } = useContext(SurveyQuestionsContext);
  const navigate = useNavigate();

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        確認問卷填寫
      </Typography>

      {/* 顯示個人資料 */}
      <Box sx={{ mt: 3, mb: 2 }}>
        <Typography variant="h6" color="primary">
          個人資料
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="姓名" secondary={surveyData.name} />
          </ListItem>
          <ListItem>
            <ListItemText primary="手機" secondary={surveyData.phone} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Email" secondary={surveyData.email} />
          </ListItem>
          <ListItem>
            <ListItemText primary="年齡" secondary={surveyData.age} />
          </ListItem>
        </List>
      </Box>

      <Divider />

      {/* 顯示問卷回答 */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" color="primary">
          問卷回答
        </Typography>
        <List>
          {survey.questions.map((question) => {
            const userAnswer = surveyData.answers[question.id];
            let displayAnswer;

            if (question.type === 'text') {
              displayAnswer = userAnswer;
            } else if (question.type === 'multiple-choice' && Array.isArray(userAnswer)) {
              displayAnswer = userAnswer
                .map((answerId) => {
                  const option = question.options?.find((opt) => opt.optionId === answerId);
                  return option?.optionText;
                })
                .join(', ');
            } else if (question.type === 'single-choice') {
              const option = question.options?.find((opt) => opt.optionId === userAnswer);
              displayAnswer = option?.optionText;
            }

            return (
              <ListItem key={question.id}>
                <ListItemText primary={question.questionText} secondary={displayAnswer} />
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Button
        onClick={() => {
          navigate('/question');
        }}
      >
        回上一頁
      </Button>
    </Paper>
  );
}
