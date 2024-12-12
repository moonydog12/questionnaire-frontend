import { Box, Paper } from '@mui/material';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import TabSurvey from './TabSurvey';
import TabFeedback from './TabFeedback';
import TabQuestions from './TabQuestions';
import Unicorn from '../../ui/Unicorn';
import StyledTab from '../../ui/widgets/StyledTab';
import StyledTabs from '../../ui/widgets/StyledTabs';

export default function Panel() {
  const navigate = useNavigate();
  const location = useLocation();

  const currentTab = location.pathname.split('/').pop() || 'survey';

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    navigate(`/backstage/panel/${newValue}`);
  };

  return (
    <Box>
      <Unicorn
        imgSrc="/src/assets/unicorn-question.png"
        sx={{
          position: 'absolute',
          right: 0,
          zIndex: -1,
          bottom: 0,
          transform: 'rotateY(180deg)',
        }}
      />
      <Paper>
        <StyledTabs
          value={currentTab}
          onChange={handleTabChange}
          sx={{ bgcolor: 'secondary.dark' }}
        >
          <StyledTab label="問卷" value="survey" selected={currentTab === 'survey'} />
          <StyledTab label="題目" value="questions" selected={currentTab === 'questions'} />
          <StyledTab label="回饋" value="feedback" selected={currentTab === 'feedback'} />
        </StyledTabs>
      </Paper>

      <Paper sx={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="survey" element={<TabSurvey />} />
          <Route path="questions" element={<TabQuestions />} />
          <Route path="feedback" element={<TabFeedback />} />
        </Routes>
      </Paper>
    </Box>
  );
}
