import { Outlet } from "react-router-dom";
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
import { UPPER_SIDE_BAR, LOWER_PART, INSIGHTS } from "../../constant/sidebar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import useLayout from "../../hook/layout/useLayout";
import { ClipLoader } from "react-spinners";
import DeleteIcon from "@mui/icons-material/Delete";
const drawerWidth = 180;

export const Layout = () => {
  const {
    handleClickOnRename,
    handleClickOnThreeDots,
    handleClickOnHome,
    handleActiveProject,
    handleClickOnInsights,
    handleDelete,
    handleLogout,
    handleClose,
    handleOpen,
    handleCloseOfProjectsIcons,
    handleOpenProjectModal,
    anchorEl,
    open,
    isLoading,
    anchorElForProjectIcons,
    openPorjectsIcons,
    allProjects,
    userName,
  } = useLayout();

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
                    <ListItemButton key={key} onClick={handleClickOnHome}>
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
                    <ListItemButton
                      key={key}
                      onClick={() => handleClickOnInsights(key)}
                    >
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
                      <ListItemText
                        primary={item.name}
                        onClick={() => handleActiveProject(item.name)}
                      />
                      <ListItemIcon>
                        <MoreVertIcon onClick={handleClickOnThreeDots} />
                        <Menu
                          id="logout"
                          anchorEl={anchorElForProjectIcons}
                          open={openPorjectsIcons}
                          onClose={handleCloseOfProjectsIcons}
                        >
                          <MenuItem
                            sx={{
                              color: (theme) => theme.palette.primary.main,
                            }}
                            onClick={handleLogout}
                          >
                            <DriveFileRenameOutlineIcon
                              onClick={handleClickOnRename}
                            />
                          </MenuItem>
                          <MenuItem
                            sx={{
                              color: (theme) => theme.palette.primary.main,
                            }}
                            onClick={handleLogout}
                          >
                            <DeleteIcon
                              onClick={() => handleDelete(item._id)}
                            />
                          </MenuItem>
                        </Menu>
                      </ListItemIcon>
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
