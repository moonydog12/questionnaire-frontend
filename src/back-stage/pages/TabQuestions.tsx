import { useContext, useState } from 'react';
import { QuizContext } from '../../context/CreateUpdate/QuizContext';
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
import { Add, Delete, Check, Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Option, Question } from '../interface/QuizDataInterface';

// 把問題類型轉型成對應顯示
function convertQuestionType(type: string) {
  if (type === 'single') return '單選題';
  if (type === 'multi') return '多選題';
  return '文字題';
}

export default function TabQuestions() {
  const navigate = useNavigate();
  const { dispatch, quizData } = useContext(QuizContext);

  const [questionText, setQuestionText] = useState('');
  const [questionType, setQuestionType] = useState<'text' | 'single' | 'multi'>('text');
  const [options, setOptions] = useState<Option[]>([]);
  const [required, setRequired] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null); // Holds the question being edited

  // 新增選項
  const handleAddOption = () => {
    const nextOptionNumber = (options.length + 1).toString();
    setOptions([...options, { option: '', optionNumber: nextOptionNumber }]);
  };

  // 移除選項並重新排序
  const handleRemoveOption = (optionNumber: string) => {
    const updatedOptions = options
      .filter((option) => option.optionNumber !== optionNumber)
      .map((option, index) => ({ ...option, optionNumber: String(index + 1) }));

    setOptions(updatedOptions);
  };

  // 題目更新
  const handleOptionChange = (optionNumber: string, value: string) => {
    setOptions(
      options.map((opt) => (opt.optionNumber === optionNumber ? { ...opt, option: value } : opt))
    );
  };

  // 新增或儲存題目
  const handleSaveQuestion = () => {
    if (!questionText) {
      alert('請填寫問題內容');
      return;
    }

    const updatedQuestion = {
      quesId: editingQuestion ? editingQuestion.quesId : String(quizData.quesList.length + 1),
      quesName: questionText,
      type: questionType,
      required,
      options: JSON.stringify(options),
    };

    if (editingQuestion) {
      dispatch({
        type: 'UPDATE_QUESTION',
        payload: { quesId: editingQuestion.quesId, updatedQuestion: updatedQuestion },
      });
    } else {
      dispatch({ type: 'ADD_QUESTION', payload: updatedQuestion });
    }

    // 儲存後重設狀態
    setEditingQuestion(null);
    setQuestionText('');
    setQuestionType('text');
    setOptions([]);
    setRequired(false);
  };

  // Handle editing a question
  const handleEditQuestion = (question: Question) => {
    setEditingQuestion({ ...question });
    setQuestionText(question.quesName);
    setQuestionType(question.type);
    setOptions(question.type !== 'text' ? JSON.parse(question.options) : []);
    setRequired(question.required);
  };

  // Cancel editing mode
  const handleCancelEdit = () => {
    setEditingQuestion(null);
    setQuestionText('');
    setQuestionType('text');
    setOptions([]);
    setRequired(false);
  };

  const handleSubmit = async (published: boolean) => {
    // 確保 quizData 是最新值
    const updatedQuizData = { ...quizData }; // 複製當前 quizData 狀態

    updatedQuizData.published = published;
    // 確保每個題目有 quizId
    updatedQuizData.quesList.forEach((question) => {
      if (!question.quizId) {
        question.quizId = updatedQuizData.id;
      }
    });

    try {
      const url = updatedQuizData.id
        ? 'http://localhost:8080/quiz/update'
        : 'http://localhost:8080/quiz/create';
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedQuizData),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      navigate('../../list');
    } catch (error) {
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
                  value={option.option}
                  onChange={(e) => handleOptionChange(option.optionNumber, e.target.value)}
                />
                <IconButton
                  color="error"
                  sx={{ ml: 1 }}
                  onClick={() => handleRemoveOption(option.optionNumber)}
                >
                  <Delete sx={{ color: '#bb4b9f' }} />
                </IconButton>
              </Box>
            ))}
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<Add />}
              onClick={handleAddOption}
              sx={{ mt: 1 }}
            >
              新增選項
            </Button>
          </Grid>
        )}

        <Grid size={12} sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <Typography sx={{ mr: 2 }}>此題是否必填：</Typography>
          <Switch
            checked={required}
            onChange={(e) => setRequired(e.target.checked)}
            color="secondary"
          />
        </Grid>

        <Grid size={12} sx={{ mt: 2 }}>
          {editingQuestion ? (
            <>
              <Button variant="outlined" color="secondary" onClick={handleSaveQuestion}>
                儲存變更
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleCancelEdit}
                sx={{ ml: 2 }}
              >
                取消
              </Button>
            </>
          ) : (
            <Button variant="contained" color="secondary" onClick={handleSaveQuestion}>
              新增問題
            </Button>
          )}

          {!editingQuestion && (
            <Button
              variant="contained"
              color="secondary"
              sx={{ ml: 2 }}
              onClick={async () => {
                await handleSubmit(false); // 確保執行順序
              }}
            >
              儲存
            </Button>
          )}
          {!editingQuestion && (
            <Button
              variant="contained"
              color="secondary"
              onClick={async () => {
                await handleSubmit(true); // 確保執行順序
              }}
            >
              發布
            </Button>
          )}
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
                <TableCell>題目名稱</TableCell>
                <TableCell>題目類型</TableCell>
                <TableCell>必填</TableCell>
                <TableCell>編輯</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {quizData.quesList.map((question) => (
                <TableRow key={question.quesId}>
                  <TableCell>{question.quesName}</TableCell>
                  <TableCell>{convertQuestionType(question.type)}</TableCell>
                  <TableCell>{question.required ? <Check /> : ''}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditQuestion(question)}>
                      <Edit />
                    </IconButton>
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
