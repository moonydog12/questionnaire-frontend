import { PieChart } from '@mui/x-charts/PieChart';
import { useContext, useEffect, useState } from 'react';
import { FillInContext } from '../../context/FeedIn/FillInContext';
import { Box, Typography, Paper, styled, Button } from '@mui/material';
import Unicorn from '../../ui/Unicorn';
import { useNavigate } from 'react-router-dom';

const StyledContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(5),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
}));

const StyledChartContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
}));

interface Statistic {
  quizName: string;
  quesId: number;
  quesName: string;
  optionCountMap: Record<string, number>;
}

const palette = ['#a091bd', '#f8d1d5', '#fdefef', '#83d0e0', '#bb4b9f', '#facf9a'];

export default function SurveyResult() {
  const { fillInData } = useContext(FillInContext);
  const [statistics, setStatistics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/quiz/statistics?quizId=${fillInData.id}`
        );
        const data = await response.json();

        setStatistics(data.statisticsVolist || []);
      } catch (error) {
        console.error('Failed to fetch survey statistics:', error);
      }
    };

    fetchData();
  }, [fillInData.id]);

  if (statistics.length === 0) {
    return (
      <StyledContainer>
        <Typography variant="h4" textAlign="center" gutterBottom>
          目前尚無統計資料
        </Typography>
        <Button
          sx={{ marginLeft: 'auto' }}
          color="secondary"
          variant="contained"
          onClick={() => {
            navigate(-1);
          }}
        >
          回上一頁
        </Button>
        <Unicorn imgSrc="/src/assets/unicorn-enjoy.png" sx={{ textAlign: 'center' }} />
      </StyledContainer>
    );
  }

  return (
    <StyledContainer>
      <Typography variant="h4" textAlign="center" gutterBottom>
        問卷統計結果
      </Typography>
      <Button
        sx={{ marginLeft: 'auto' }}
        color="secondary"
        variant="contained"
        onClick={() => {
          navigate(-1);
        }}
      >
        回上一頁
      </Button>
      {statistics.map((question: Statistic) => {
        const totalVotes = Object.values(question.optionCountMap).reduce(
          (sum, value) => sum + value,
          0
        );

        const pieData = Object.entries(question.optionCountMap).map(([label, value], id) => ({
          id,
          label,
          value,
          percentage: totalVotes > 0 ? ((value / totalVotes) * 100).toFixed(1) : '0.0',
        }));

        return (
          <StyledChartContainer key={question.quesId}>
            <Typography variant="h6" gutterBottom>
              {question.quesName}
            </Typography>
            {pieData.length > 0 ? (
              <PieChart
                colors={palette}
                series={[
                  {
                    data: pieData.map((item) => ({
                      id: item.id,
                      label: `${item.label} (${item.percentage}%)`,
                      value: item.value,
                    })),
                    arcLabel: (item) => `${item.value}`, // 顯示百分比
                  },
                ]}
                height={300}
              />
            ) : (
              <Typography color="textSecondary">沒有數據可用</Typography>
            )}
          </StyledChartContainer>
        );
      })}
    </StyledContainer>
  );
}
