import { TextField, FormControl, Button } from '@mui/material';
import React from 'react';

type SearchBarProps = {
  searchQuery: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchSubmit: (e: React.SyntheticEvent) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  handleSearchChange,
  handleSearchSubmit,
}) => (
  <form onSubmit={handleSearchSubmit}>
    <FormControl fullWidth sx={{ mb: 2 }}>
      <TextField
        id="search-field"
        label="Search"
        variant="outlined"
        size="small"
        value={searchQuery}
        onChange={handleSearchChange}
        fullWidth
        sx={{ maxWidth: '100%' }}
      />
    </FormControl>
    <Button type="submit" variant="contained" color="primary">
      Search
    </Button>
  </form>
);

export default SearchBar;
