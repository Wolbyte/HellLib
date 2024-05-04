"use client";

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

const drawerWidth = 200;

function ResponsiveDrawer(props) {
  const { window } = props;
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

  const drawer = (
    <div>
      <List>
        {[
          { text: "خانه", icon: <HomeIcon /> },
          { text: "دانش‌آموزان", icon: <AccountCircleIcon /> },
          { text: "کتاب‌ها", icon: <MenuBookIcon /> },
          { text: "تاریخچه", icon: <HistoryIcon /> },
        ].map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

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
          {drawer}
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
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
