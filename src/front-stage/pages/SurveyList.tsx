import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  TablePagination,
  TableBody,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableCell,
} from '@mui/material';
import usePagination from '../../hooks/usePagination';
import Unicorn from '../../ui/Unicorn';
import SearchBar from '../../components/SearchBar';
import useSearch from '../../hooks/useSearch';
import StyledTableCell from '../../ui/giget/StyledTableCell';
import StyledTableRow from '../../ui/giget/StyledTableRow';

const columns = ['編號', '名稱', '狀態', '開始時間', '結束時間', '結果'];
const initialPage = 0;
const initialRowsPerPage = 10;

function createData(
  id: string,
  name: string,
  status: string,
  startTime: string,
  endTime: string,
  result: string
) {
  return { id, name, status, startTime, endTime, result };
}

const rows = [
  createData('1', '測試畫面1', '進行中', '2024/11/5', '2024/11/6', '前往'),
  createData('2', '測試畫面2', '進行中', '2024/11/5', '2024/11/6', '前往'),
  createData('3', '測試畫面3', '進行中', '2024/11/5', '2024/11/6', '前往'),
  createData('4', '測試畫面4', '進行中', '2024/11/5', '2024/11/6', '前往'),
  createData('5', '測試畫面5', '進行中', '2024/11/5', '2024/11/6', '前往'),
  createData('6', '測試畫面6', '進行中', '2024/11/5', '2024/11/6', '前往'),
  createData('7', '測試畫面7', '進行中', '2024/11/5', '2024/11/6', '前往'),
  createData('8', '測試畫面8', '進行中', '2024/11/5', '2024/11/6', '前往'),
];

export default function QuestionList() {
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage, emptyRows } = usePagination(
    initialPage,
    initialRowsPerPage,
    rows.length
  );

  const {
    searchQuery,
    startDate,
    endDate,
    handleSearchChange,
    handleStartDateChange,
    handleEndDateChange,
    handleSearchSubmit,
    filteredRows,
  } = useSearch(rows);

  // 用篩選後的資料進行分頁
  const visibleRows = useMemo(
    () => [...filteredRows].slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, rowsPerPage, filteredRows]
  );

  return (
    <>
      <Unicorn
        imgSrc="/src/assets/unicorn-left.png"
        sx={{ position: 'absolute', top: '5rem', left: 0, zIndex: -1 }}
      />

      <Unicorn
        imgSrc="/src/assets/unicorn-left.png"
        sx={{
          position: 'absolute',
          top: '5rem',
          right: 0,
          zIndex: -1,
          transform: 'rotateY(180deg)',
        }}
      />

      <SearchBar
        searchQuery={searchQuery}
        startDate={startDate}
        endDate={endDate}
        onSearchChange={handleSearchChange}
        onStartDateChange={handleStartDateChange}
        onEndDateChange={handleEndDateChange}
        onSubmit={handleSearchSubmit}
      />

      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell align="right" key={column}>
                  {column}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell align="right">{row.id}</StyledTableCell>
                <StyledTableCell align="right">
                  <Link to={'/question'}>{row.name}</Link>
                </StyledTableCell>
                <StyledTableCell align="right">{row.status}</StyledTableCell>
                <StyledTableCell align="right">{row.startTime}</StyledTableCell>
                <StyledTableCell align="right">{row.endTime}</StyledTableCell>
                <StyledTableCell align="right">
                  <Link to={'/result'}>{row.result}</Link>
                </StyledTableCell>
              </StyledTableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  style={{
                    height: 36 * emptyRows,
                  }}
                />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="每頁筆數"
      />
    </>
  );
}
