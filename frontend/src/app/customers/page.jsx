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
  { id: "customerName", label: "نام", minWidth: 150 },
  { id: "customerLastName", label: "نام خانوادگی", minWidth: 150 },
  { id: "customerClassroom", label: "کلاس", minWidth: 150 },
  { id: "customerID", label: "کد ملی", minWidth: 150 },
  { id: "repossessionDate", label: "تاریخ بازپس گیری", minWidth: 150 },
];

function createData(
  customerName,
  customerLastName,
  customerClassroom,
  customerID,
  repossessionDate
) {
  return {
    customerName,
    customerLastName,
    customerClassroom,
    customerID,
    repossessionDate,
  };
}

const rows = [
  createData("قاسم","ابدخافی","۱۱۵","۱۲۳۴۵۶۷۸۹۰","۱۴۰۳-۰۶-۱۷"),
  createData("محمد","سومبول","۱۱۴","۰۹۸۷۶۵۴۳۲۱","۱۴۰۳-۱۱-۰۵"),
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
                    key={row.customerLastName}
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
