import { useContext, useEffect } from 'react';
import { TextField, Typography, Box, Grid2 as Grid, Button } from '@mui/material';
import { QuizContext } from '../../context/CreateUpdate/QuizContext';
import { useNavigate } from 'react-router-dom';

export default function TabSurvey() {
  const { dispatch, quizData } = useContext(QuizContext);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!quizData.name || !quizData.startDate || !quizData.endDate) {
      alert('請填寫完整問卷資訊');
      return;
    }
    navigate('../questions');
  };

  useEffect(() => {
    // 表示是新建問卷，不需要呼叫 API
    if (!quizData.id) {
      dispatch({ type: 'CLEAR_QUIZ_DATA' });
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/quiz/getone', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ quizId: quizData.id }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch quiz data');
        }

        const data = await response.json();

        const { quiz, ques } = data;

        dispatch({ type: 'SET_NAME', payload: quiz.name });
        dispatch({ type: 'SET_DESCRIPTION', payload: quiz.description });
        dispatch({ type: 'SET_START_DATE', payload: quiz.startDate });
        dispatch({ type: 'SET_END_DATE', payload: quiz.endDate });
        dispatch({ type: 'SET_QUESTION', payload: [...ques] });
      } catch (error) {
        // TODO:modal
        console.error('Error fetching quiz data:', error);
      }
    };

    fetchData();
  }, [quizData.id]);

  return (
    <Box sx={{ p: 3, maxWidth: '60%', margin: '0 auto' }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {!quizData.id ? '新增' : '編輯'}問卷
      </Typography>
      <Grid container spacing={2}>
        {/* 問卷名稱 */}
        <Grid size={12}>
          <TextField
            fullWidth
            label="問卷名稱"
            variant="outlined"
            value={quizData.name}
            onChange={(e) => dispatch({ type: 'SET_NAME', payload: e.target.value })}
          />
        </Grid>

        {/* 問卷描述 */}
        <Grid size={12}>
          <TextField
            fullWidth
            label="問卷描述"
            variant="outlined"
            multiline
            rows={4}
            value={quizData.description}
            onChange={(e) => dispatch({ type: 'SET_DESCRIPTION', payload: e.target.value })}
          />
        </Grid>

        {/* 開始時間 */}
        <Grid size={6}>
          <TextField
            type="date"
            onChange={(e) => dispatch({ type: 'SET_START_DATE', payload: e.target.value })}
            sx={{ width: 200 }}
            size="small"
            value={quizData.startDate || ''}
            slotProps={{
              htmlInput: {
                min: new Date().toISOString().split('T')[0],
                max: new Date(new Date().setDate(new Date().getDate() + 10))
                  .toISOString()
                  .split('T')[0],
              },
            }}
          />
        </Grid>

        {/* 結束時間 */}
        <Grid size={6}>
          <TextField
            type="date"
            onChange={(e) => dispatch({ type: 'SET_END_DATE', payload: e.target.value })}
            sx={{ width: 200 }}
            size="small"
            value={quizData.endDate || ''}
            slotProps={{
              htmlInput: {
                min: new Date().toISOString().split('T')[0],
                max: new Date(new Date().setDate(new Date().getDate() + 10))
                  .toISOString()
                  .split('T')[0],
              },
            }}
          />
        </Grid>

        <Grid size={12} sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
            下一步
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
