import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import {
  TablePagination,
  TableBody,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import usePagination from '../../hooks/usePagination';
import Unicorn from '../../ui/Unicorn';
import SearchBar from '../../components/SearchBar';
import useSearch from '../../hooks/useSearch';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.secondary.contrastText,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const columns = ['編號', '名稱', '狀態', '開始時間', '結束時間', '結果'];
const initialPage = 0;
const initialRowsPerPage = 5;

function createData(
  id: number,
  name: string,
  status: string,
  startTime: string,
  endTime: string,
  result: string
) {
  return { id, name, status, startTime, endTime, result };
}

const rows = [
  createData(1, '測試畫面', '進行中', '2024/11/5', '2024/11/6', '前往'),
  createData(2, '測試畫面', '進行中', '2024/11/5', '2024/11/6', '前往'),
  createData(3, '測試畫面', '進行中', '2024/11/5', '2024/11/6', '前往'),
  createData(4, '測試畫面', '進行中', '2024/11/5', '2024/11/6', '前往'),
  createData(5, '測試畫面', '進行中', '2024/11/5', '2024/11/6', '前往'),
  createData(6, '測試畫面', '進行中', '2024/11/5', '2024/11/6', '前往'),
  createData(7, '測試畫面', '進行中', '2024/11/5', '2024/11/6', '前往'),
  createData(8, '測試畫面', '進行中', '2024/11/5', '2024/11/6', '前往'),
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
  } = useSearch();

  const visibleRows = useMemo(
    () => [...rows].slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, rowsPerPage]
  );

  return (
    <>
      <Unicorn />

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
