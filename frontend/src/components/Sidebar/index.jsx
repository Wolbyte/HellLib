"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import HistoryIcon from "@mui/icons-material/History";
import HomeIcon from "@mui/icons-material/Home";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

const drawerWidth = 200;

function ResponsiveDrawer() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const DrawerContent = () => {
    const currentPath = usePathname();

    return (
      <div>
        <List>
          {[
            { text: "خانه", icon: <HomeIcon />, url: "/" },
            {
              text: "جست‌وجو",
              icon: <SearchIcon />,
              url: "/search/books",
            },
            {
              text: "دانش‌آموزان",
              icon: <AccountCircleIcon />,
              url: "/students",
            },
            { text: "کتاب‌ها", icon: <MenuBookIcon />, url: "/books" },
            { text: "تاریخچه", icon: <HistoryIcon />, url: "/history" },
          ].map((item, _index) => (
            <ListItem key={item.text}>
              <ListItemButton
                href={item.url}
                selected={currentPath == item.url}
                sx={{
                  borderRadius: 3,
                  "&.Mui-selected": {
                    backgroundColor: "rgba(25, 118, 210, 0.25)",
                  },
                  "&.Mui-selected:hover": {
                    backgroundColor: "rgba(25, 118, 210, 0.35)",
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>
    );
  };

  return (
    <Box sx={{ display: "flex" }}>
      <IconButton
        color="foreground"
        aria-label="open drawer"
        onClick={handleDrawerToggle}
        edge="start"
        sx={{ display: { position: "absolute", top: 5, md: "none" } }}
      >
        <MenuIcon />
      </IconButton>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              right: 0,
            },
          }}
        >
          <DrawerContent />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              right: 0,
            },
          }}
          open
        >
          <DrawerContent />
        </Drawer>
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
