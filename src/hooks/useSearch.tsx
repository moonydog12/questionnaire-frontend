import { useState, FormEvent } from 'react';

interface UseSearchReturn {
  searchQuery: string;
  startDate: Date | null;
  endDate: Date | null;
  filteredRows: IData[];
  handleSearchChange: (query: string) => void;
  handleStartDateChange: (date: Date | null) => void;
  handleEndDateChange: (date: Date | null) => void;
  handleSearchSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

interface IData {
  id: string;
  name: string;
  status: string;
  startTime: string;
  endTime: string;
  result: string;
}

export default function useSearch(rows: IData[]): UseSearchReturn {
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [filteredRows, setFilteredRows] = useState(rows);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
  };

  const handleSearchSubmit = (event: FormEvent) => {
    event.preventDefault();
    const filtered = rows.filter((row) => {
      const matchesQuery = row.name.includes(searchQuery);
      const matchesStartDate = startDate ? new Date(row.startTime) >= startDate : true;
      const matchesEndDate = endDate ? new Date(row.endTime) <= endDate : true;
      return matchesQuery && matchesStartDate && matchesEndDate;
    });

    setFilteredRows(filtered);
  };

  return {
    searchQuery,
    startDate,
    endDate,
    filteredRows,
    handleSearchChange,
    handleStartDateChange,
    handleEndDateChange,
    handleSearchSubmit,
  };
}
