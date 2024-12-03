import { useContext, useState } from 'react';
import { QuizDataContext } from '../context/QuizDataContext';
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid2 as Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Switch,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Option } from '../interface/QuizDataInterface';

export default function TabQuestions() {
  const { dispatch, quizData } = useContext(QuizDataContext);
  const navigate = useNavigate();

  const [questionText, setQuestionText] = useState('');
  const [questionType, setQuestionType] = useState<'text' | 'single' | 'multi'>('text');
  const [options, setOptions] = useState<Option[]>([]);
  const [required, setRequired] = useState(false);

  const handleAddOption = () => {
    const nextOptionNumber = (options.length + 1).toString();
    setOptions([...options, { optionName: '', optionNumber: nextOptionNumber }]);
  };

  const handleRemoveOption = (optionNumber: string) => {
    setOptions(options.filter((opt) => opt.optionNumber !== optionNumber));
  };

  const handleOptionChange = (optionNumber: string, value: string) => {
    setOptions(
      options.map((opt) =>
        opt.optionNumber === optionNumber ? { ...opt, optionName: value } : opt
      )
    );
  };

  const handleAddQuestion = () => {
    if (!questionText) {
      alert('請填寫問題內容');
      return;
    }

    const newQuestion = {
      quesId: String(quizData.quesList.length + 1),
      quesName: questionText,
      type: questionType,
      required,
      options: JSON.stringify(options),
    };

    dispatch({ type: 'ADD_QUESTION', payload: newQuestion });

    setQuestionText('');
    setQuestionType('text');
    setOptions([]);
    setRequired(false);
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch('http://localhost:8080/quiz/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quizData),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      navigate('../../list');
    } catch (error) {
      // TODO: 改用彈出 modal 顯示錯誤
      console.error('Request failed:', error);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: '800px', margin: '0 auto' }}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <TextField
            fullWidth
            label="題目"
            variant="outlined"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />
        </Grid>

        <Grid size={12}>
          <TextField
            select
            fullWidth
            label="題目類型"
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value as 'text' | 'single' | 'multi')}
          >
            <MenuItem value="text">文字回答</MenuItem>
            <MenuItem value="single">單選</MenuItem>
            <MenuItem value="multi">多選</MenuItem>
          </TextField>
        </Grid>

        {questionType !== 'text' && (
          <Grid size={12}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              選項
            </Typography>
            {options.map((option, index) => (
              <Box key={option.optionNumber} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <TextField
                  fullWidth
                  label={`選項 ${index + 1}`}
                  value={option.optionName}
                  onChange={(e) => handleOptionChange(option.optionNumber, e.target.value)}
                />
                <IconButton
                  color="error"
                  sx={{ ml: 1 }}
                  onClick={() => handleRemoveOption(option.optionNumber)}
                >
                  <Delete />
                </IconButton>
              </Box>
            ))}
            <Button variant="outlined" startIcon={<Add />} onClick={handleAddOption} sx={{ mt: 1 }}>
              新增選項
            </Button>
          </Grid>
        )}

        <Grid size={12} sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <Typography sx={{ mr: 2 }}>此題是否必填：</Typography>
          <Switch
            checked={required}
            onChange={(e) => setRequired(e.target.checked)}
            color="primary"
          />
        </Grid>

        <Grid size={12} sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleAddQuestion}>
            新增問題
          </Button>

          <Button variant="contained" color="primary" onClick={handleSubmit}>
            送出
          </Button>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          當前問題列表
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>題目 ID</TableCell>
                <TableCell>題目名稱</TableCell>
                <TableCell>題目類型</TableCell>
                <TableCell>選項</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {quizData.quesList?.map((question) => (
                <TableRow key={question.quesId}>
                  <TableCell>{question.quesId}</TableCell>
                  <TableCell>{question.quesName}</TableCell>
                  <TableCell>{question.type}</TableCell>
                  <TableCell>
                    {question.options
                      ? JSON.parse(question.options)
                          .map(
                            (option: { optionName: string; optionNumber: string }) =>
                              `(${option.optionNumber}) ${option.optionName}`
                          )
                          .join(', ')
                      : '無'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
