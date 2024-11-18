import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  TablePagination,
  TableBody,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  TableCell,
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import usePagination from '../../hooks/usePagination';
import SearchBar from '../../components/SearchBar';
import useSearch from '../../hooks/useSearch';
import StyledTableCell from '../../ui/giget/StyledTableCell';
import StyledTableRow from '../../ui/giget/StyledTableRow';

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

const data = [
  createData('1', '測試畫面', '進行中', '2024/11/5', '2024/11/6', '前往'),
  createData('2', '測試畫面', '進行中', '2024/11/5', '2024/11/6', '前往'),
  createData('3', '測試畫面', '進行中', '2024/11/5', '2024/11/6', '前往'),
  createData('4', '測試畫面', '進行中', '2024/11/5', '2024/11/6', '前往'),
  createData('5', '測試畫面5', '進行中', '2024/11/5', '2024/11/6', '前往'),
  createData('6', '測試畫面', '進行中', '2024/11/5', '2024/11/6', '前往'),
  createData('7', '測試畫面', '進行中', '2024/11/5', '2024/11/6', '前往'),
  createData('8', '測試畫面', '進行中', '2024/11/5', '2024/11/6', '前往'),
];

export default function QuestionList() {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const [rows, setRows] = useState(data);

  const navigate = useNavigate();

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

  const visibleRows = useMemo(
    () => [...filteredRows].slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, rowsPerPage, filteredRows]
  );

  const handleSelectRow = (id: string) => {
    setSelectedRows((prevSelected) => {
      return prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id];
    });
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

      <SearchBar
        searchQuery={searchQuery}
        startDate={startDate}
        endDate={endDate}
        onSearchChange={handleSearchChange}
        onStartDateChange={handleStartDateChange}
        onEndDateChange={handleEndDateChange}
        onSubmit={handleSearchSubmit}
      />

      <Box>
        <DeleteIcon
          sx={{ cursor: 'pointer', color: 'secondary.dark', fontSize: '2rem' }}
          onClick={() => {
            const updatedRows = rows.filter((row) => !selectedRows.includes(row.id));
            setRows(updatedRows);
            setSelectedRows([]);
          }}
        />
        <AddIcon
          sx={{ cursor: 'pointer', color: 'secondary.dark', fontSize: '2rem' }}
          onClick={() => {
            navigate('/');
          }}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell padding="checkbox"></StyledTableCell>
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
