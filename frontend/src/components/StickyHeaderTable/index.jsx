"use client;";

import { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import { format } from "date-fns-jalali";

import { enToFaDigit, getNestedKeys } from "@/helpers";

function getRowsPerPage() {
  return [
    { label: "۵", value: 5 },
    { label: "۱۰", value: 10 },
    { label: "۲۵", value: 25 },
    { label: "۱۰۰", value: 100 },
  ];
}

function processRowValue(column, value) {
  if (column.includes("date")) {
    value = format(value, "yyyy-MM-dd");
  }

  return enToFaDigit(value);
}

function Row({ columns, row, actionFn, setRowList, rowList }) {
  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={Math.random() * 9000000}>
      {columns.map((column) => {
        const value = getNestedKeys(row, column.id);
        return (
          <TableCell key={column.id} align={column.align}>
            {column.format && typeof value === "number"
              ? column.format(value)
              : processRowValue(column.id, value.toString())}
          </TableCell>
        );
      })}
      {typeof actionFn == "function" ? (
        <TableCell key="StickyHeaderTable-ACTIONFN_PROP">
          {actionFn(row, rowList, setRowList)}
        </TableCell>
      ) : null}
    </TableRow>
  );
}

export default function StickyHeaderTable({ rows, columns, actionFn }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rowList, setRowList] = useState(rows);

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              {typeof actionFn == "function" ? <TableCell /> : null}
            </TableRow>
          </TableHead>
          <TableBody>
            {rowList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <Row
                  columns={columns}
                  row={row}
                  rowList={rowList}
                  actionFn={actionFn}
                  setRowList={setRowList}
                  key={Math.random() * 99999999}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        labelRowsPerPage={"تعداد ردیف‌های هر برگه:"}
        rowsPerPageOptions={getRowsPerPage()}
        labelDisplayedRows={({ from, to, count }) => {
          const faFrom = enToFaDigit(from.toString());
          const faTo = enToFaDigit(to.toString());
          const faCount = enToFaDigit(count.toString());
          return `${faFrom}–${faTo} از ${count !== -1 ? faCount : `+${faTo}`}`;
        }}
        component="div"
        count={rowList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
