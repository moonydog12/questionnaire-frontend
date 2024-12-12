import { useContext, useEffect, useMemo, useState } from 'react';
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
import StyledTableCell from '../../ui/widgets/StyledTableCell';
import StyledTableRow from '../../ui/widgets/StyledTableRow';
import Unicorn from '../../ui/Unicorn';
import { QuizContext } from '../../context/CreateUpdate/QuizContext';

const columns = ['選取', '編號', '名稱', '狀態', '開始時間', '結束時間', '結果'];
const initialPage = 0;
const initialRowsPerPage = 10;

export default function QuizList() {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const { dispatch } = useContext(QuizContext);

  const navigate = useNavigate();

  // 初次載入時獲取全部資料
  useEffect(() => {
    handleSearchSubmit();
  }, []);

  const {
    searchQuery,
    startDate,
    endDate,
    handleSearchChange,
    handleStartDateChange,
    handleEndDateChange,
    handleSearchSubmit,
    rows,
  } = useSearch();

  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage, emptyRows } = usePagination(
    initialPage,
    initialRowsPerPage,
    rows.length
  );

  const visibleRows = useMemo(
    () => [...rows].slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, rowsPerPage, rows]
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
      <Unicorn
        imgSrc="/src/assets/unicorn-admin.png"
        sx={{
          position: 'absolute',
          top: '5rem',
          right: 0,
          zIndex: -1,
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

      <Box>
        <DeleteIcon
          sx={{ cursor: 'pointer', color: 'secondary.dark', fontSize: '2rem' }}
          onClick={async () => {
            try {
              await fetch('http://localhost:8080/quiz/delete', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  quizIdList: selectedRows,
                }),
              });

              // 刪除成功後重新抓取資料
              handleSearchSubmit();
              setSelectedRows([]);
            } catch (error) {
              // TODO:modal顯示錯誤
            }
          }}
        />
        <AddIcon
          sx={{ cursor: 'pointer', color: 'secondary.dark', fontSize: '2rem' }}
          onClick={() => {
            dispatch({ type: 'SET_QUIZ_ID', payload: '' });
            navigate('/backstage/panel/survey');
          }}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell padding="checkbox" align="left"></StyledTableCell>
              {columns.slice(1).map((column) => (
                <StyledTableCell align="left" key={column}>
                  {column}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell padding="checkbox">
                  {/* 尚未開始或已結束問卷才可以刪 */}
                  {row.status === '尚未開始' || row.status === '已結束' ? (
                    <Checkbox
                      checked={selectedRows.includes(row.id)}
                      onChange={() => handleSelectRow(row.id)}
                    />
                  ) : null}
                </StyledTableCell>
                <StyledTableCell align="left">{row.id}</StyledTableCell>
                <StyledTableCell align="left">
                  <Link
                    to={'../panel/survey'}
                    style={{
                      color: row.status === '進行中' ? 'gray' : 'black',
                      // pointerEvents: row.status === '進行中' ? 'none' : 'auto',
                      textDecoration: row.status === '進行中' ? 'none' : 'underline',
                    }}
                    onClick={() => {
                      dispatch({ type: 'SET_QUIZ_ID', payload: String(row.id) });
                    }}
                  >
                    {row.name}
                  </Link>
                </StyledTableCell>
                <StyledTableCell align="left">{row.status}</StyledTableCell>
                <StyledTableCell align="left">
                  {new Date(row.startDate).toLocaleDateString()}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {new Date(row.endDate).toLocaleDateString()}
                </StyledTableCell>
                <StyledTableCell align="left">
                  <Link
                    to={'/statistics'}
                    style={{
                      color: row.status === '進行中' ? 'gray' : 'black',
                      pointerEvents: row.status === '進行中' ? 'none' : 'auto',
                      textDecoration: row.status === '進行中' ? 'none' : 'underline',
                    }}
                    onClick={() => {
                      // 讓統計那一頁有quizId能夠用來撈資料
                      dispatch({ type: 'SET_QUIZ_ID', payload: row.id });
                    }}
                  >
                    結果
                  </Link>
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
