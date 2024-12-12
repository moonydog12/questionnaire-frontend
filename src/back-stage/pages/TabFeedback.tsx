import { useContext, useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link,
  Box,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { QuizContext } from '../../context/CreateUpdate/QuizContext';
import StyledTableRow from '../../ui/widgets/StyledTableRow';

interface Feedback {
  quizId: number;
  fillinDate: string;
  quizName: string;
  username: string;
  age: number;
  quesId: number;
  quesName: string;
  answerStr: string;
  email: string;
  phone: string;
  quizDesc: string;
}

export default function TabFeedback() {
  const [records, setRecords] = useState<any[]>([]);

  const { quizData } = useContext(QuizContext);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:8080/quiz/feedback?quizId=${quizData.id}`);
      const { feedbackDtoList } = await res.json();

      // 使用 Map 來追蹤不重複使用者
      const userMap = new Map();

      feedbackDtoList.forEach((feedback: Feedback) => {
        if (!userMap.has(feedback.email)) {
          // 如果 Map 中尚未存在該 email 表示該使用者的資料尚未被加入，所以將該使用者加入map
          userMap.set(feedback.email, {
            username: feedback.username,
            phone: feedback.phone,
            email: feedback.email,
            age: feedback.age,
            fillinDate: feedback.fillinDate,
            answers: [],
          });
        }

        // 新增該使用者的問答資料
        const userRecord = userMap.get(feedback.email);
        userRecord.answers.push({
          quesId: feedback.quesId,
          answerStr: JSON.parse(feedback.answerStr),
        });
      });

      // 將 Map 轉換為陣列
      const convertedRecords = Array.from(userMap.values());
      setRecords([...convertedRecords]);
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ p: 3, maxWidth: '70%', margin: '0 auto' }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <StyledTableRow sx={{ background: 'red' }}>
              <TableCell>姓名</TableCell>
              <TableCell>填寫日期</TableCell>
              <TableCell>觀看回覆</TableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {records.map((record, index) => (
              <TableRow key={index}>
                <TableCell>{record.username}</TableCell>
                <TableCell>{record.fillinDate}</TableCell>
                <TableCell>
                  <Link
                    component={RouterLink}
                    to={`/backstage/feedback/${record.email}`}
                    state={{ record, quizData }}
                  >
                    查看回答
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
