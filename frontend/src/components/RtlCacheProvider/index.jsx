"use client";

import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

export default function RtlCacheProvider({ children }) {
  return (
    <AppRouterCacheProvider
      options={{ key: "muirtl", stylisPlugins: [prefixer, rtlPlugin] }}
    >
      {children}
    </AppRouterCacheProvider>
  );
}
