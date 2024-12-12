import { useState } from 'react';
import { SearchResult } from '../context/SearchResult/interface';

interface UseSearchReturn {
  searchQuery: string;
  startDate: string | null;
  endDate: string | null;
  rows: SearchResult[];
  handleSearchChange: (query: string) => void;
  handleStartDateChange: (date: string | null) => void;
  handleEndDateChange: (date: string | null) => void;
  handleSearchSubmit: () => Promise<void>; // 提交搜尋時使用 async
}

export default function useSearch(): UseSearchReturn {
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [rows, setRows] = useState<SearchResult[]>([]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleStartDateChange = (date: string | null) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: string | null) => {
    setEndDate(date);
  };

  const determineStatus = (quiz: SearchResult): string => {
    const today = new Date();
    const quizStartDate = new Date(quiz.startDate);
    const quizEndDate = new Date(quiz.endDate);

    if (today < quizStartDate) return '尚未開始';
    if (today > quizEndDate) return '已結束';
    return '進行中';
  };

  const handleSearchSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8080/quiz/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: searchQuery,
          startDate,
          endDate,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const updatedRows = data.quizList.map((quiz: SearchResult) => ({
        ...quiz,
        status: determineStatus(quiz),
      }));

      setRows(updatedRows);
    } catch (error) {
      // TODO:modal
      console.error('Failed to fetch search results:', error);
    }
  };

  return {
    searchQuery,
    startDate,
    endDate,
    rows,
    handleSearchChange,
    handleStartDateChange,
    handleEndDateChange,
    handleSearchSubmit,
  };
}
