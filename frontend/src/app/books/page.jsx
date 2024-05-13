"use client";

import { useState } from "react";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import { enToFaDigit } from "@/helpers";


const columns = [
  { id: "name", label: "نام کتاب", minWidth: 200 },
  { id: "writer", label: "نویسنده", minWidth: 200 },
  { id: "publisher", label: "ناشر", minWidth: 200 },
  { id: "copies", label: "کپی‌ها", minWidth: 100 },
];

function createData(name, writer, publisher, copies) {
  return { name, writer, publisher, copies };
}

const rows = [
  createData("روزی روزگاری قلمبه", "قلمبه", "انتشارات قلمبه", "۲۴"),
  createData("روزی روزگاری تلمبه", "تلمبه", "انتشارات تلمبه", "۳۷"),
  createData("روزی روزگاری سلمبه", "سلمبه", "انتشارات سلمبه", "۲۵"),
  createData("روزی روزگاری ملمبه", "ملمبه", "انتشارات ملمبه", "۶۷"),
  createData("روزی روزگاری فلمبه", "فلمبه", "انتشارات فلمبه", "۴۹"),
  createData("روزی روزگاری شلمبه", "شلمبه", "انتشارات شلمبه", "۵۰"),
  createData("روزی روزگاری ذلمبه", "ذلمبه", "انتشارات ذلمبه", "۵۵"),
];

function getRowsPerPage() {
  return [
    { label: "۵", value: 5 },
    { label: "۱۰", value: 10 },
    { label: "۲۵", value: 25 },
    { label: "۱۰۰", value: 100 },
  ];
}

export default function StickyHeadTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.writer}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
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
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
