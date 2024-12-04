import { useContext, useState } from 'react';
import { TextField, Typography, Box, Grid2 as Grid, Button } from '@mui/material';
import { QuizDataContext } from '../../context/CreateUpdateContext/CreateUpdateContext';
import { useNavigate } from 'react-router-dom';

export default function TabSurvey() {
  const [surveyName, setSurveyName] = useState('');
  const [surveyDescription, setSurveyDescription] = useState('');
  const [startTime, setStartTime] = useState<string | null>(null);
  const [endTime, setEndTime] = useState<string | null>(null);

  const { dispatch } = useContext(QuizDataContext);

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!surveyName || !startTime || !endTime) {
      alert('請填寫完整問卷資訊');
      return;
    }
    dispatch({ type: 'SET_NAME', payload: surveyName });
    dispatch({ type: 'SET_DESCRIPTION', payload: surveyDescription });
    dispatch({ type: 'SET_START_DATE', payload: startTime });
    dispatch({ type: 'SET_END_DATE', payload: endTime });

    navigate('../questions');
  };

  return (
    <Box sx={{ p: 3, maxWidth: '60%', margin: '0 auto' }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        新增問卷
      </Typography>
      <Grid container spacing={2}>
        {/* 問卷名稱 */}
        <Grid size={12}>
          <TextField
            fullWidth
            label="問卷名稱"
            variant="outlined"
            value={surveyName}
            onChange={(e) => setSurveyName(e.target.value)}
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
            value={surveyDescription}
            onChange={(e) => setSurveyDescription(e.target.value)}
          />
        </Grid>

        {/* 啟始時間 */}
        <Grid size={6}>
          <TextField
            type="date"
            onChange={(e) => {
              setStartTime(e.target.value);
            }}
            sx={{ width: 200 }}
            size="small"
          />
        </Grid>

        {/* 結束時間 */}
        <Grid size={6}>
          <TextField
            type="date"
            onChange={(e) => {
              setEndTime(e.target.value);
            }}
            sx={{ width: 200 }}
            size="small"
          />
        </Grid>

        {/* 提交按鈕 */}
        <Grid size={12} sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
            下一步
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
