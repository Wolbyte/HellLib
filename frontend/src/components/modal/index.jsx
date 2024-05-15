import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Virtualize from "../AutoCompleteInput";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";

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
};

export default function BasicModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const rowName = props.rowData;

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
             تحویل {rowName} 
          </Typography>
          {/* <Virtualize /> */}
          <TextField margin="dense" id="outlined-basic" label="کد ملی" variant="outlined" />
          {/* <DatePicker label="Basic date picker" /> */}
        </Box>
      </Modal>
    </div>
  );
}
