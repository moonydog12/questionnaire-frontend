import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useMemo, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  TablePagination,
  TextField,
  Typography,
} from '@mui/material';
import usePagination from '../hooks/usePagination';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const visibleRows = useMemo(
    () => [...rows].slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, rowsPerPage]
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
  };

  const handleSearchSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log('Search Query:', searchQuery);
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);
  };

  return (
    <>
      {/* 上方搜尋欄 */}
      <Card sx={{ minWidth: 275, marginBottom: '2rem' }}>
        <CardContent>
          <form onSubmit={handleSearchSubmit} style={{ width: '100%' }}>
            <Typography>問卷名稱:</Typography>
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
                onChange={(e) => handleStartDateChange(new Date(e.target.value))}
                sx={{ width: 200 }}
                size="small"
              />

              <span>到</span>

              {/* End Date Picker */}
              <TextField
                type="date"
                onChange={(e) => handleEndDateChange(new Date(e.target.value))}
                sx={{ width: 200 }}
                size="small"
              />

              <Button
                type="submit"
                variant="contained"
                color="secondary"
                sx={{ marginLeft: 'auto' }}
              >
                Search
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>

      {/* 列表 table */}
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
                <StyledTableCell align="right">{row.name}</StyledTableCell>
                <StyledTableCell align="right">{row.status}</StyledTableCell>
                <StyledTableCell align="right">{row.startTime}</StyledTableCell>
                <StyledTableCell align="right">{row.endTime}</StyledTableCell>
                <StyledTableCell align="right">{row.result}</StyledTableCell>
              </StyledTableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  style={{
                    height: 33 * emptyRows,
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
