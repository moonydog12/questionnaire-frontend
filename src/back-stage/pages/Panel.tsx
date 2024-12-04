import { Box, Tab, Tabs, Paper, styled, TabsProps, TabProps } from '@mui/material';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import TabSurvey from './TabSurvey';
import TabFeedback from './TabFeedback';
import TabStatistics from './TabStatistics';
import TabQuestions from './TabQuestions';
import Unicorn from '../../ui/Unicorn';
import QuizDataProvider from '../../context/CreateUpdateContext/CreateUpdateProvider';

interface StyledTabsProps extends TabsProps {
  children?: React.ReactNode;
  value: string;
  onChange: (_event: React.SyntheticEvent, newValue: string) => void;
}

interface StyledTabProps extends TabProps {
  selected?: boolean;
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{
      children: <span className="MuiTabs-indicatorSpan" />,
    }}
  />
))({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: 40,
    width: '100%',
    backgroundColor: '#f05a7e',
  },
});

const StyledTab = styled((props: StyledTabProps) => <Tab disableRipple {...props} />)(
  ({ theme, selected }) => ({
    color: selected ? theme.palette.common.white : theme.palette.grey[500],
    backgroundColor: selected ? theme.palette.secondary.main : 'transparent',
    '&:hover': {
      color: selected ? theme.palette.common.white : theme.palette.grey[500],
    },
    '&:focus': {
      color: selected ? theme.palette.common.white : theme.palette.grey[500],
      outline: 'none',
    },
    '&.Mui-selected': {
      color: theme.palette.common.white,
    },
    '&:not(.Mui-selected)': {
      color: theme.palette.grey[500],
    },
    '&:active': {
      color: selected ? theme.palette.common.white : theme.palette.grey[500],
    },
    transition: 'background-color 0.3s ease, color 0.3s ease',
  })
);

export default function Panel() {
  const navigate = useNavigate();
  const location = useLocation();

  const currentTab = location.pathname.split('/').pop() || 'survey';

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    navigate(`/backstage/panel/${newValue}`);
  };

  return (
    <QuizDataProvider>
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
            <StyledTab label="統計" value="statistics" selected={currentTab === 'statistics'} />
          </StyledTabs>
        </Paper>

        <Paper sx={{ minHeight: '80vh' }}>
          <Routes>
            <Route path="survey" element={<TabSurvey />} />
            <Route path="questions" element={<TabQuestions />} />
            <Route path="feedback" element={<TabFeedback />} />
            <Route path="statistics" element={<TabStatistics />} />
          </Routes>
        </Paper>
      </Box>
    </QuizDataProvider>
  );
}
