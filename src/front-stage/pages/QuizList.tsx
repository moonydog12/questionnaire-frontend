import { useContext, useEffect, useMemo } from 'react';
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
import StyledTableCell from '../../ui/widgets/StyledTableCell';
import StyledTableRow from '../../ui/widgets/StyledTableRow';
import { FillInContext } from '../../context/FeedIn/FillInContext';

const columns = ['名稱', '狀態', '開始時間', '結束時間', '結果'];
const initialPage = 0;
const initialRowsPerPage = 10;

export default function QuizList() {
  const { dispatch } = useContext(FillInContext);

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

  // 用篩選後的資料進行分頁(篩出已發布)
  const visibleRows = useMemo(
    () =>
      [...rows]
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .filter((row) => row.published),
    [page, rowsPerPage, rows]
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
                <StyledTableCell align="left" key={column}>
                  {column}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell align="left">
                  <Link
                    to={row.status === '進行中' ? '/question' : '#'}
                    onClick={(e) => {
                      if (row.status !== '進行中') {
                        // 防止非進行中狀態的連結跳轉
                        e.preventDefault();
                      } else {
                        // 設定 quizId 供填答頁使用
                        dispatch({ type: 'SET_QUIZ_ID', payload: row.id });
                      }
                    }}
                    style={{
                      color: row.status === '進行中' ? 'black' : 'gray', // 禁用狀態改為灰色
                      pointerEvents: row.status === '進行中' ? 'auto' : 'none', // 禁用點擊
                      textDecoration: row.status === '進行中' ? 'underline' : 'none', // 加強視覺差異
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
                      color: row.status === '進行中' ? 'black' : 'gray', // 禁用狀態改為灰色
                      pointerEvents: row.status === '進行中' ? 'auto' : 'none', // 禁用點擊
                      textDecoration: row.status === '進行中' ? 'underline' : 'none', // 加強視覺差異
                    }}
                    onClick={() => {
                      // 讓統計那一頁有quizId能夠用來撈資料
                      dispatch({ type: 'SET_QUIZ_ID', payload: row.id });
                    }}
                  >
                    統計
                  </Link>
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
