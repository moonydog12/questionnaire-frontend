// hooks/useSearch.ts
import { useState, FormEvent } from 'react';

interface UseSearchReturn {
  searchQuery: string;
  startDate: Date | null;
  endDate: Date | null;
  handleSearchChange: (query: string) => void;
  handleStartDateChange: (date: Date | null) => void;
  handleEndDateChange: (date: Date | null) => void;
  handleSearchSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export default function useSearch(): UseSearchReturn {
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
  };

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Search Query:', searchQuery);
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);
  };

  return {
    searchQuery,
    startDate,
    endDate,
    handleSearchChange,
    handleStartDateChange,
    handleEndDateChange,
    handleSearchSubmit,
  };
}
