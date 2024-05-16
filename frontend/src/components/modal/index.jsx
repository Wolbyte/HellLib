import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Virtualize from "../AutoCompleteInput";
import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalaliV3";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { faIR } from "date-fns-jalali/locale/fa-IR";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #E0E0E0",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
};

export default function BasicModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const rowName = props.rowData;
  const [cleared, setCleared] = React.useState(false);

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
            تحویل: {rowName}
          </Typography>
          <Virtualize />
          {/* <TextField margin="dense" id="outlined-basic" label="کد ملی" variant="outlined" /> */}
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
              slotProps={{
                field: { clearable: true, onClear: () => setCleared(true) },
              }}
            />
          </LocalizationProvider>
          <Button sx={{ mt: 2 }} variant="contained" color="success" type="submit">
            تایید
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
