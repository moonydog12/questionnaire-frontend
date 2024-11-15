import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  TablePagination,
  TextField,
  Typography,
  TableBody,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
} from '@mui/material';
import usePagination from '../../hooks/usePagination';

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

const columns = ['選取', '編號', '名稱', '狀態', '開始時間', '結束時間', '結果'];
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
  createData('1', '測試畫面', '進行中', '2024/11/5', '2024/11/6', '前往'),
  createData('2', '測試畫面', '進行中', '2024/11/5', '2024/11/6', '前往'),
  createData('3', '測試畫面', '進行中', '2024/11/5', '2024/11/6', '前往'),
  createData('4', '測試畫面', '進行中', '2024/11/5', '2024/11/6', '前往'),
  createData('5', '測試畫面', '進行中', '2024/11/5', '2024/11/6', '前往'),
  createData('6', '測試畫面', '進行中', '2024/11/5', '2024/11/6', '前往'),
  createData('7', '測試畫面', '進行中', '2024/11/5', '2024/11/6', '前往'),
  createData('8', '測試畫面', '進行中', '2024/11/5', '2024/11/6', '前往'),
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
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

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
  };

  const handleSelectRow = (id: string) => {
    setSelectedRows((prevSelected) => {
      console.log(prevSelected);
      return prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id];
    });
  };

  const handleSelectAllRows = (event: any) => {
    if (selectedRows.length > 0) {
      setSelectedRows([]);
      return;
    }
    setSelectedRows(rows.map((row) => row.id));
  };

  return (
    <>
      <Box
        sx={{
          position: 'absolute',
          top: '5rem',
          left: 0,
          zIndex: -1,
          transform: 'rotateY(180deg)',
        }}
      >
        <img src="/src/assets/unicorn-admin.png" alt="Unicorn" style={{ width: '25rem' }} />
      </Box>
      {/* 上方搜尋欄 */}
      <Card sx={{ mb: 3 }}>
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
              <StyledTableCell padding="checkbox">
                {/* <Checkbox
                  indeterminate={selectedRows.length > 0 && selectedRows.length < rows.length}
                  checked={selectedRows.length === rows.length}
                  onChange={handleSelectAllRows}
                /> */}
                <button onClick={handleSelectAllRows}>犬選</button>
              </StyledTableCell>
              {columns.slice(1).map((column) => (
                <StyledTableCell align="right" key={column}>
                  {column}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell padding="checkbox">
                  <Checkbox
                    checked={selectedRows.includes(row.id)}
                    onChange={() => handleSelectRow(row.id)}
                  />
                </StyledTableCell>
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
                  colSpan={7}
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
        rowsPerPageOptions={[10, 15, 20]}
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
