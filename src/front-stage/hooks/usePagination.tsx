import { useState } from 'react';

const usePagination = (initialPage: number, initialRowsPerPage: number, rowLength: number) => {
  const [page, setPage] = useState(initialPage);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rowLength) : 0;

  const handleChangePage = (_event: React.ChangeEvent<HTMLInputElement>, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage, emptyRows };
};

export default usePagination;