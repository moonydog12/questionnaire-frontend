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
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { Option } from '../interface/QuizDataInterface';

export default function TabQuestions() {
  const { dispatch, quizData } = useContext(QuizDataContext);

  const [questionText, setQuestionText] = useState('');
  const [questionType, setQuestionType] = useState<'text' | 'single' | 'multiple'>('text');
  const [options, setOptions] = useState<Option[]>([]);

  const handleAddOption = () => {
    const newOption = {
      optionNumber: options.length + 1,
      option: '',
    };
    setOptions([...options, newOption]);
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = options
      .filter((_, i) => i !== index)
      .map((option, idx) => ({ ...option, optionNumber: idx + 1 })); // 更新序號
    setOptions(newOptions);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = options.map((option, i) =>
      i === index ? { ...option, option: value } : option
    );
    setOptions(newOptions);
  };

  const handleAddQuestion = () => {
    if (!questionText) {
      alert('請填寫問題內容');
      return;
    }

    const newQuestion = {
      quesId: quizData.questions.length + 1, // 使用 index + 1 作為 quesId
      type: questionType,
      questionName: questionText,
      options: questionType !== 'text' ? options : undefined,
    };

    dispatch({ type: 'ADD_QUESTION', payload: newQuestion });
    console.log(quizData);

    // 清空表單
    setQuestionText('');
    setQuestionType('text');
    setOptions([]);
  };

  return (
    <Box sx={{ p: 3, maxWidth: '800px', margin: '0 auto' }}>
      <Grid container spacing={2}>
        {/* 問題內容 */}
        <Grid size={12}>
          <TextField
            fullWidth
            label="題目"
            variant="outlined"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />
        </Grid>

        {/* 問題類型 */}
        <Grid size={12}>
          <TextField
            select
            fullWidth
            label="題目類型"
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value as 'text' | 'single' | 'multiple')}
          >
            <MenuItem value="text">文字回答</MenuItem>
            <MenuItem value="single">單選</MenuItem>
            <MenuItem value="multiple">多選</MenuItem>
          </TextField>
        </Grid>

        {/* 選項（僅單選、多選顯示） */}
        {questionType !== 'text' && (
          <Grid size={12}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              選項
            </Typography>
            {options.map((option, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <TextField
                  fullWidth
                  label={`選項 ${index + 1}`}
                  value={option.option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                />
                <IconButton color="error" sx={{ ml: 1 }} onClick={() => handleRemoveOption(index)}>
                  <Delete />
                </IconButton>
              </Box>
            ))}
            <Button variant="outlined" startIcon={<Add />} onClick={handleAddOption} sx={{ mt: 1 }}>
              新增選項
            </Button>
          </Grid>
        )}

        {/* 添加問題按鈕 */}
        <Grid size={12} sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" fullWidth onClick={handleAddQuestion}>
            新增問題
          </Button>
        </Grid>
      </Grid>

      {/* 問題列表 */}
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
              {quizData.questions.map((question) => (
                <TableRow key={question.quesId}>
                  <TableCell>{question.quesId}</TableCell>
                  <TableCell>{question.questionName}</TableCell>
                  <TableCell>{question.type}</TableCell>
                  <TableCell>
                    {question.options
                      ? question.options
                          .map((opt) => `(${opt.optionNumber}) ${opt.option}`)
                          .join(' ')
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
