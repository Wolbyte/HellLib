import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import PersonIcon from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";

import SearchField from "../components/SearchField";
import ContainedImage from "../components/ContainedImage";

const flexGridItemSX = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

export default function Home() {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      p={5}
      spacing={3}
    >
      <Grid item xs={12} sx={flexGridItemSX}>
        <ContainedImage src="sampad.svg" alt="sampad_logo" gutterBottom />

        <Typography variant="h3" fontWeight="bold" align="center">
          به کتابخانه‌ی حلی خوش آمدید! 👋
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <SearchField />
      </Grid>

      <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          startIcon={<PersonIcon />}
          size="large"
          href="/register/student"
        >
          نام‌نویسی دانش‌آموز
        </Button>
      </Grid>
    </Grid>
  );
}
