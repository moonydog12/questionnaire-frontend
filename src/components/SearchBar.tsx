import { Card, CardContent, Typography, FormControl, TextField, Box, Button } from '@mui/material';

interface SearchBarProps {
  searchQuery: string | null;
  startDate: string | null;
  endDate: string | null;
  onSearchChange: (query: string) => void;
  onStartDateChange: (date: string | null) => void;
  onEndDateChange: (date: string | null) => void;
  onSubmit: () => void;
}

export default function SearchBar({
  searchQuery,
  onSearchChange,
  onStartDateChange,
  onEndDateChange,
  onSubmit,
}: SearchBarProps) {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography>問卷名稱:</Typography>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <TextField
            id="search-field"
            label="Search"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => {
              onSearchChange(e.target.value);
            }}
            fullWidth
          />
        </FormControl>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography>統計時間:</Typography>
          <TextField
            type="date"
            onChange={(e) => onStartDateChange(e.target.value)}
            sx={{ width: 200 }}
            size="small"
          />

          <span>到</span>

          <TextField
            type="date"
            onChange={(e) => onEndDateChange(e.target.value)}
            sx={{ width: 200 }}
            size="small"
          />

          <Button
            type="submit"
            variant="contained"
            color="secondary"
            sx={{ marginLeft: 'auto' }}
            onClick={onSubmit}
          >
            Search
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
