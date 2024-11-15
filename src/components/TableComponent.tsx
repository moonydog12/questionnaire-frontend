import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import StyledTableRow from '../ui/giget/StyledTableRow';
import StyledTableCell from '../ui/giget/StyledTableCell';

type TableComponentProps = {
  columns: string[];
  rows: any[];
  emptyRows: number;
};

const TableComponent: React.FC<TableComponentProps> = ({ columns, rows, emptyRows }) => {
  return (
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
        {rows.map((row) => (
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
  );
};

export default TableComponent;
