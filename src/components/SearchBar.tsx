import { Card, CardContent, Typography, FormControl, TextField, Box, Button } from '@mui/material';
import { FormEvent } from 'react';

interface SearchBarProps {
  searchQuery: string;
  startDate: Date | null;
  endDate: Date | null;
  onSearchChange: (query: string) => void;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
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
        <form onSubmit={onSubmit} style={{ width: '100%' }}>
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

          {/* Start Date Picker */}
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
              onChange={(e) => onStartDateChange(new Date(e.target.value))}
              sx={{ width: 200 }}
              size="small"
            />

            <span>到</span>

            {/* End Date Picker */}
            <TextField
              type="date"
              onChange={(e) => onEndDateChange(new Date(e.target.value))}
              sx={{ width: 200 }}
              size="small"
            />

            <Button type="submit" variant="contained" color="secondary" sx={{ marginLeft: 'auto' }}>
              Search
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
}
