import { useMemo, useState } from "react";
import { columns } from "./columns";
import { applySortAndFilter } from "../../utils/filterSort";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  CircularProgress,
} from "@mui/material";
const DataTable = ({
  rows,
  total,
  page,
  pageSize,
  loading,
  selectedId,
  onRowSelect,
  onPageChange,
}) => {
  const [orderBy, setOrderBy] = useState("projectName");
  const [order, setOrder] = useState("asc");
const sortedRows = useMemo(() => {
  return applySortAndFilter(rows, {
    orderBy,
    order,
    filters: {}
  });
}, [rows, orderBy, order]);

  const handleSort = (columnId) => {
    const isAsc = orderBy === columnId && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(columnId);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <CircularProgress />
      </div>
    );
  }
  return (
    <>
      <TableContainer className="max-h-[calc(100vh-120px)]">
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.id}>
                  {col.sortable ? (
                    <TableSortLabel
                      active={orderBy === col.id}
                      direction={orderBy === col.id ? order : "asc"}
                      onClick={() => handleSort(col.id)}
                    >
                      {col.label}
                    </TableSortLabel>
                  ) : (
                    col.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {sortedRows.map((row) => (
              <TableRow
                key={row.id}
                hover
                selected={row.id === selectedId}
                onClick={() => onRowSelect(row.id)}
                className="cursor-pointer"
              >
                <TableCell>{row.projectName}</TableCell>
                <TableCell>{row.latitude}</TableCell>
                <TableCell>{row.longitude}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.lastUpdated}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={total}
        page={page}
        rowsPerPage={pageSize}
        rowsPerPageOptions={[pageSize]}
        onPageChange={(_, newPage) => onPageChange(newPage)}
      />
    </>
  );
};

export default DataTable;
