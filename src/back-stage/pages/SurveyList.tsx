import { useContext, useMemo, useState } from 'react';
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
import Unicorn from '../../ui/Unicorn';
import { SurveyQuestionsContext } from '../../front-stage/context/SurveyQuestion/SurveyQuestionContext';

const columns = ['選取', '編號', '名稱', '狀態', '開始時間', '結束時間', '結果'];
const initialPage = 0;
const initialRowsPerPage = 10;

export default function SurveyList() {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const { survey } = useContext(SurveyQuestionsContext);

  const [rows, setRows] = useState(survey);

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
  } = useSearch(survey);

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
          onClick={() => {
            const updatedRows = rows.filter((row) => {
              return !selectedRows.includes(row.id);
            });
            console.log(updatedRows);

            setRows([]);
            setSelectedRows([]);
          }}
        />
        <AddIcon
          sx={{ cursor: 'pointer', color: 'secondary.dark', fontSize: '2rem' }}
          onClick={() => {
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
                  <Checkbox
                    checked={selectedRows.includes(row.id)}
                    onChange={() => handleSelectRow(row.id)}
                  />
                </StyledTableCell>
                <StyledTableCell align="left">{row.id}</StyledTableCell>
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
