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
  Menu,
  MenuItem,
} from "@mui/material";
import { UPPER_SIDE_BAR, LOWER_PART, INSIGHTS } from "src/constant/sidebar";
import { useSelector, useDispatch } from "react-redux";
import { usersDataInStore } from "src/redux/auth/userSlice";
import { getUserFirstName } from "src/utils/getUserFirstName";
import useLogoutQuery from "src/hook/useLogoutQuery";
import {
  useGetProjectQuery,
  useDeleteProjectQuery,
} from "src/hook/useProjectQuery";
import { isProjectNameModalOpen } from "src/redux/boolean/booleanSlice";
import { ClipLoader } from "react-spinners";
import DeleteIcon from "@mui/icons-material/Delete";
import { activeProject } from "src/redux/projects/projectSlice";
import { setValueToLs } from "src/utils/localstorage";
import { KEY_FOR_STORING_ACTIVE_PROJECT } from "src/constant/Misc";

const drawerWidth = 180;

export const Layout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user_email } = useSelector(usersDataInStore);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const { mutate } = useLogoutQuery();
  const { data, isLoading } = useGetProjectQuery();
  const [allProjects, setAllProjects] = useState([]);
  const { mutate: deleteProject, isLoading: deleteInProgress } =
    useDeleteProjectQuery();

  const [userName, setUserName] = useState("");

  // navigate the user to /todo directly
  useEffect(() => {
    navigate("Dashboard");
  }, []);

  // if only single present or first time project is created then make that as active project\
  useEffect(() => {
    if (allProjects?.length === 1) {
      dispatch(activeProject(allProjects[0].name));
    }
  }, [allProjects]);

  useEffect(() => {
    setAllProjects(data?.projects);
  }, [data]);

  useEffect(() => {
    setUserName(getUserFirstName(user_email));
  }, [user_email]);

  const handleLogout = () => {
    mutate();
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleOpen = (event) => {
    setAnchorEl(event.target);
    setOpen(true);
  };

  const handleOpenProjectModal = () => {
    dispatch(isProjectNameModalOpen(true));
  };

  const handleDelete = (id) => {
    deleteProject({ id });
    setValueToLs(KEY_FOR_STORING_ACTIVE_PROJECT, null);
  };

  const handleActiveProject = (name) => {
    dispatch(activeProject(name));
    setValueToLs(KEY_FOR_STORING_ACTIVE_PROJECT, name);
  };

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
              onClick={handleOpen}
            >
              {userName}
            </Avatar>
            <Menu
              id="logout"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem
                sx={{
                  color: (theme) => theme.palette.primary.main,
                }}
                onClick={handleLogout}
              >
                Logout
              </MenuItem>
            </Menu>
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
                    <ListItemButton key={key}>
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
                    <ListItemButton key={key}>
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
                    <ListItemButton key={key} onClick={handleOpenProjectModal}>
                      <ListItemIcon>{value}</ListItemIcon>
                      <ListItemText primary={key} />
                    </ListItemButton>
                  );
                });
              })}
              {isLoading ? (
                <ListItemButton>
                  <ListItemIcon>
                    <ClipLoader color="#571159" />
                  </ListItemIcon>
                </ListItemButton>
              ) : (
                allProjects?.map((item) => {
                  return (
                    <ListItemButton key={item._id}>
                      <ListItemIcon>
                        <DeleteIcon onClick={() => handleDelete(item._id)} />
                      </ListItemIcon>
                      <ListItemText
                        primary={item.name}
                        onClick={() => handleActiveProject(item.name)}
                      />
                    </ListItemButton>
                  );
                })
              )}
            </List>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, mt: 9 }}>
          <Outlet />
        </Box>
      </Box>
    </>
  );
};
