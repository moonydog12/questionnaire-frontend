import { useState, FormEvent, useEffect } from 'react';
import { Survey } from '../front-stage/context/SurveyQuestion/interface';

interface UseSearchReturn {
  searchQuery: string;
  startDate: Date | null;
  endDate: Date | null;
  filteredRows: Survey[];
  handleSearchChange: (query: string) => void;
  handleStartDateChange: (date: Date | null) => void;
  handleEndDateChange: (date: Date | null) => void;
  handleSearchSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export default function useSearch(rows: Survey[]): UseSearchReturn {
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [filteredRows, setFilteredRows] = useState(rows);

  useEffect(() => {
    setFilteredRows(rows);
  }, [rows]);

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
      const matchesQuery = row.title.includes(searchQuery);
      const matchesStartDate = startDate ? new Date(row.startDate) >= startDate : true;
      const matchesEndDate = endDate ? new Date(row.endDate) <= endDate : true;
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
