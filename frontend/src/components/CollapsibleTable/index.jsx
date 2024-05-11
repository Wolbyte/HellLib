"use client";
import * as React from "react";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function createData(name, writer, publisher, copies) {
  return {
    name,
    writer,
    publisher,
    copies,
    history: [
      {
        customerName: "محمد",
        customerLastName: "سومبول",
        customerClassroom: 114,
        repossessionDate: "2020-01-05",
      },
      {
        customerName: "قاسم",
        customerLastName: "ابدخافی",
        customerClassroom: 115,
        repossessionDate: "2020-01-02",
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
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
          {row.name}
        </TableCell>
        <TableCell>{row.writer}</TableCell>
        <TableCell>{row.publisher}</TableCell>
        <TableCell>{row.copies}</TableCell>
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
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.repossessionDate}>
                      <TableCell>{historyRow.customerName}</TableCell>
                      <TableCell>{historyRow.customerLastName}</TableCell>
                      <TableCell>{historyRow.customerClassroom}</TableCell>
                      <TableCell>{historyRow.customerClassroom}</TableCell>
                      <TableCell component="th" scope="row">
                        {historyRow.repossessionDate}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    writer: PropTypes.number.isRequired,
    copies: PropTypes.number.isRequired,
    publisher: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        customerClassroom: PropTypes.number.isRequired,
        customerName: PropTypes.string.isRequired,
        customerLastName: PropTypes.string.isRequired,
        repossessionDate: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

const rows = [
  createData("روزی روزگاری قلمبه", "قلمبه", "انتشارات قلمبه", 24, 3.99),
  createData("روزی روزگاری تلمبه", "تلمبه", "انتشارات تلمبه", 37, 4.99),
  createData("روزی روزگاری سلمبه", "سلمبه", "انتشارات سلمبه", 24, 3.79),
  createData("روزی روزگاری ملمبه", "ملمبه", "انتشارات ملمبه", 67, 2.5),
  createData("روزی روزگاری فلمبه", "فلمبه", "انتشارات فلمبه", 49, 1.5),
  createData("روزی روزگاری شلمبه", "شلمبه", "انتشارات شلمبه", 50, 2),
  createData("روزی روزگاری ذلمبه", "ذلمبه", "انتشارات ذلمبه", 50, 2),
];

export default function CollapsibleTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
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
              <TableCell>اسم کتاب</TableCell>
              <TableCell>نویسنده</TableCell>
              <TableCell>ناشر</TableCell>
              <TableCell>کپی ها</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <Row key={row.name} row={row} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        labelRowsPerPage={"تعداد ردیف ها:"}
        rowsPerPageOptions={[5, 10, 25, 100]}
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
