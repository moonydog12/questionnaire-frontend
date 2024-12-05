import { styled, Tab, TabProps } from '@mui/material';

interface StyledTabProps extends TabProps {
  selected?: boolean;
}

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

export default StyledTab;
