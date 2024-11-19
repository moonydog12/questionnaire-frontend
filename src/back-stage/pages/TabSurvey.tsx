import { useState } from 'react';
import { TextField, Typography, Box, Grid2 as Grid, Button } from '@mui/material';

export default function TabSurvey() {
  const [surveyName, setSurveyName] = useState('');
  const [surveyDescription, setSurveyDescription] = useState('');
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);

  const handleSubmit = () => {
    console.log({
      surveyName,
      surveyDescription,
      startTime: startTime,
      endTime: endTime,
    });
  };

  return (
    <Box sx={{ p: 3, maxWidth: '600px', margin: '0 auto' }}>
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
            onChange={(e) => setStartTime(new Date(e.target.value))}
            sx={{ width: 200 }}
            size="small"
          />
        </Grid>

        {/* 結束時間 */}
        <Grid size={6}>
          <TextField
            type="date"
            onChange={(e) => setEndTime(new Date(e.target.value))}
            sx={{ width: 200 }}
            size="small"
          />
        </Grid>

        {/* 提交按鈕 */}
        <Grid size={12} sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
            提交問卷
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
