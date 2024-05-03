"use client";

import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import localFont from "next/font/local";

const vazir = localFont({
  src: "./fonts/Vazirmatn[wght].woff2",
  display: "swap",
});

let theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: vazir.style.fontFamily,
  },
});

theme = responsiveFontSizes(theme);

export default theme;
