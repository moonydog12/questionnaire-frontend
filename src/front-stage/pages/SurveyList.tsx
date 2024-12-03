import { useContext, useMemo } from 'react';
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
import { SurveyQuestionsContext } from '../context/SurveyQuestion/SurveyQuestionContext';

const columns = ['名稱', '狀態', '開始時間', '結束時間', '結果'];
const initialPage = 0;
const initialRowsPerPage = 10;

export default function QuestionList() {
  const { survey } = useContext(SurveyQuestionsContext);

  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage, emptyRows } = usePagination(
    initialPage,
    initialRowsPerPage,
    survey.length
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
  } = useSearch(survey);

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

      {/* FIXME: 表格跑版 */}
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
                <StyledTableCell align="left">
                  <Link to={'/question'}>{row.title}</Link>
                </StyledTableCell>
                <StyledTableCell align="left">{row.status}</StyledTableCell>
                <StyledTableCell align="left">
                  {new Date(row.startDate).toLocaleDateString()}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {new Date(row.endDate).toLocaleDateString()}
                </StyledTableCell>
                <StyledTableCell align="left">
                  <Link to={'/result'}>結果</Link>
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
        count={survey.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="每頁筆數"
      />
    </>
  );
}
