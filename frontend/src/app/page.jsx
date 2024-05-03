import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import PersonIcon from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";

import SearchField from "../components/SearchField";
import ContainedImage from "../components/ContainedImage";

const rootContainerSX = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
};

const flexGridItemSX = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

export default function Home() {
  return (
    <Container sx={rootContainerSX}>
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
          <Button variant="contained" startIcon={<PersonIcon />} size="large">
            نام‌نویسی دانش‌آموز
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
