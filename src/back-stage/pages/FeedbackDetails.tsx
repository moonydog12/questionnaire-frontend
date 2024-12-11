import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
} from '@mui/material';

export default function FeedbackDetails() {
  const location = useLocation();
  const record = location.state?.record;
  const quizData = location.state?.quizData;
  const navigate = useNavigate();

  if (!record || !quizData) {
    return (
      <Box sx={{ p: 3, maxWidth: '70%', margin: '0 auto', textAlign: 'center' }}>
        <Typography variant="h6" color="error">
          無法顯示詳細資訊，請檢查資料來源。
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: '70%', margin: '0 auto' }}>
      <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          {quizData.name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {quizData.description}
        </Typography>
        <Typography variant="h5" gutterBottom>
          填寫者：{record.username}
        </Typography>
      </Paper>

      <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
        <Typography variant="h6" gutterBottom>
          回答：
        </Typography>
        <List>
          {record.answers.map((answer: { quesId: any; answerStr: any[] }, index: number) => (
            <Box key={index}>
              <ListItem>
                <ListItemText
                  primary={`${answer.quesId}: ${
                    quizData.quesList?.find((que: { quesId: any }) => que.quesId === answer.quesId)
                      ?.quesName || ''
                  }`}
                  secondary={`${answer.answerStr.join(', ')}`}
                />
              </ListItem>
              {index < record.answers.length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      </Paper>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button variant="contained" color="secondary" onClick={() => navigate(-1)}>
          回上一頁
        </Button>
      </Box>
    </Box>
  );
}
