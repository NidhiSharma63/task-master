import React from "react";
import { Outlet } from "react-router-dom";
import {
  CssBaseline,
  Box,
  Typography,
  Toolbar,
  Drawer,
  AppBar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  InboxIcon,
  Divider,
  MailIcon,
} from "@mui/material";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import { UPPER_SIDE_BAR, LOWER_PART, INSIGHTS } from "src/constant/sidebar";

const drawerWidth = 180;

export const Layout = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Task Manager
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>
            <List>
              {UPPER_SIDE_BAR.map((i) => {
                return Object.entries(i).map(([key, value]) => {
                  return (
                    <ListItemButton>
                      <ListItemIcon>{value}</ListItemIcon>
                      <ListItemText primary={key} />
                    </ListItemButton>
                  );
                });
              })}
            </List>
            <Divider />
            <List>
              {INSIGHTS.map((i) => {
                return Object.entries(i).map(([key, value]) => {
                  return (
                    <ListItemButton>
                      <ListItemIcon>{value}</ListItemIcon>
                      <ListItemText primary={key} />
                    </ListItemButton>
                  );
                });
              })}
            </List>
            <Divider />
            <List>
              {LOWER_PART.map((i) => {
                return Object.entries(i).map(([key, value]) => {
                  return (
                    <ListItemButton>
                      <ListItemIcon>{value}</ListItemIcon>
                      <ListItemText primary={key} />
                    </ListItemButton>
                  );
                });
              })}
            </List>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}></Box>
      </Box>
      <Outlet />
    </>
  );
};
