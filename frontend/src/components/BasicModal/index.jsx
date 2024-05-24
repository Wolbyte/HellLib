import * as React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import AutoCompleteInput from "../AutoCompleteInput";

import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalaliV3";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { faIR } from "date-fns-jalali/locale/fa-IR";

import { getCookie } from "@/helpers";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
};

export default function BasicModal({ rowData, setRowData }) {
  const [open, setOpen] = React.useState(false);
  const [cleared, setCleared] = React.useState(false);
  const [student, setStudent] = React.useState(null);
  const [returnDate, setReturnDate] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setErrorMessage(null);
    setReturnDate(null);
    setStudent(null);
    setOpen(false);
  };

  React.useEffect(() => {
    if (cleared) {
      const timeout = setTimeout(() => {
        setCleared(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
    return () => {};
  }, [cleared]);

  return (
    <div>
      <Button onClick={handleOpen}>قرض دادن</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            تحویل: {rowData.title}
          </Typography>

          {errorMessage ? (
            <Typography color="error" gutterBottom>
              {errorMessage}
            </Typography>
          ) : null}

          <AutoCompleteInput onChange={(newValue) => setStudent(newValue)} />
          <LocalizationProvider
            adapterLocale={faIR}
            dateAdapter={AdapterDateFnsJalali}
            localeText={{
              fieldYearPlaceholder: () => "سال",
              fieldMonthPlaceholder: () => "ماه",
              fieldDayPlaceholder: () => "روز",
            }}
          >
            <DatePicker
              sx={{ mt: 2 }}
              label="انتخاب تاریخ بازپس گیری"
              onChange={(value) =>
                setReturnDate(
                  value ? value.toISOString().replace(/T.*Z/g, "") : null,
                )
              }
              slotProps={{
                field: { clearable: true, onClear: () => setCleared(true) },
              }}
            />
          </LocalizationProvider>
          <Button
            sx={{ mt: 2 }}
            onClick={async () => {
              if (student == null || returnDate == null) return;

              setErrorMessage(null);

              const csrftoken = getCookie("csrftoken");

              const res = await fetch("/api/books/borrow", {
                method: "post",
                headers: {
                  "Content-Type": "application/json",
                  "X-CSRFToken": csrftoken,
                },
                body: JSON.stringify({
                  return_date: returnDate,
                  book: rowData.id,
                  student: student.national_code,
                }),
              });

              if (res.status != 201) {
                const resData = await res.json();

                if (resData["record"]) {
                  setErrorMessage("این دانش‌آموز قبلا کتاب را گرفته است!");
                } else if (resData["book"]) {
                  setErrorMessage("موجودی این کتاب به پایان رسیده است!");
                }

                return;
              }

              let newData = { ...rowData };
              newData.copies--;
              newData.active_history.push({
                student: student,
                return_date: returnDate,
                book: rowData,
              });

              setRowData(newData);

              setOpen(false);
            }}
            variant="contained"
            color="success"
            type="submit"
          >
            تایید
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
