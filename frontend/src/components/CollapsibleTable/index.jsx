"use client";

import { useState } from "react";

import { format } from "date-fns-jalali";

import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import BasicModal from "@/components/BasicModal";
import { enToFaDigit } from "@/helpers";

function Row({ data }) {
  const [open, setOpen] = useState(false);
  const [rowData, setRowData] = useState(data);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {rowData.title}
        </TableCell>
        <TableCell>{rowData.author}</TableCell>
        <TableCell>{rowData.publisher}</TableCell>
        <TableCell>{enToFaDigit(rowData.copies.toString())}</TableCell>
        <TableCell>
          <BasicModal rowData={rowData} setRowData={setRowData} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                تاریخچه
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>نام</TableCell>
                    <TableCell>نام خانوادگی</TableCell>
                    <TableCell>کلاس</TableCell>
                    <TableCell>کد ملی</TableCell>
                    <TableCell>تاریخ بازپس گیری</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rowData.active_history.map((data) => (
                    <TableRow
                      key={`${data.return_date}${data.student.national_code}`}
                    >
                      <TableCell>{data.student.first_name}</TableCell>
                      <TableCell>{data.student.last_name}</TableCell>
                      <TableCell>
                        {enToFaDigit(data.student.class_number.toString())}
                      </TableCell>
                      <TableCell>
                        {enToFaDigit(data.student.national_code.toString())}
                      </TableCell>
                      <TableCell>
                        {enToFaDigit(format(data.return_date, "yyyy-MM-dd"))}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

Row.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    copies: PropTypes.number.isRequired,
    publisher: PropTypes.string.isRequired,
    active_history: PropTypes.arrayOf(
      PropTypes.shape({
        student: PropTypes.shape({
          class_number: PropTypes.number.isRequired,
          first_name: PropTypes.string.isRequired,
          last_name: PropTypes.string.isRequired,
        }),
        return_date: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

function getRowsPerPage() {
  return [
    { label: "۵", value: 5 },
    { label: "۱۰", value: 10 },
    { label: "۲۵", value: 25 },
    { label: "۱۰۰", value: 100 },
  ];
}

export default function CollapsibleTable({ rows }) {
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
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>نام کتاب</TableCell>
              <TableCell>نویسنده</TableCell>
              <TableCell>ناشر</TableCell>
              <TableCell>کپی‌ها</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <Row key={row.isbn} data={row} />
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
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
