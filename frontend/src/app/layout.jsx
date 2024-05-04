import "./globals.css";

// The version should match the installed NextJs (currently v14)
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import ResponsiveDrawer from "../components/Sidebar";
import RtlCacheProvider from "../components/RtlCacheProvider";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

export const metadata = {
  title: "کتاب‌خانه",
  description: "سامانه مدیریت کتاب‌خانه حلی ۷",
};

const rootContainerSX = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
};

export default function RootLayout({ children }) {
  return (
    <html dir="rtl" lang="fa">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <RtlCacheProvider>
              <Container sx={rootContainerSX}>
                <ResponsiveDrawer />
                {children}
              </Container>
            </RtlCacheProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
