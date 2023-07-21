import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  CssBaseline,
  Box,
  Typography,
  Toolbar,
  Drawer,
  AppBar,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
} from "@mui/material";
import { UPPER_SIDE_BAR, LOWER_PART, INSIGHTS } from "src/constant/sidebar";
import { useSelector } from "react-redux";
import { usersDataInStore } from "src/redux/auth/userSlice";
import { getUserFirstName } from "src/utils/getUserFirstName";
const drawerWidth = 180;

export const Layout = () => {
  const navigate = useNavigate();
  const { user_email } = useSelector(usersDataInStore);

  const [userName, setUserName] = useState("");

  // navigate the user to /todo directly
  useEffect(() => {
    navigate("todo");
  }, []);

  useEffect(() => {
    console.log(user_email);
    setUserName(getUserFirstName(user_email));
  }, [user_email]);
  console.log(user_email);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          display="flex"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar
            sx={{
              display: "flex",
              width: "100%",
              border: "1px solid red",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6" noWrap component="div">
              Task Manager
            </Typography>
            <Avatar
              sx={{
                bgcolor: "secondary.main",
                cursor: "pointer",
                fontWeight: 600,
                color: (theme) => theme.palette.primary.main,
              }}
              variant="circle"
            >
              N
            </Avatar>
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
