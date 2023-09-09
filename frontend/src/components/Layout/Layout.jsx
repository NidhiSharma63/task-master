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
  Menu,
  MenuItem,
} from "@mui/material";
import { UPPER_SIDE_BAR, LOWER_PART, INSIGHTS, BOTTOM } from "src/constant/sidebar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import useLayout from "src/hook/layout/useLayout";
import { ClipLoader } from "react-spinners";
import DeleteIcon from "@mui/icons-material/Delete";
import { CommonLoaderWithBackDrop } from "src/common/loader/CommonLoader";
import UserName from "src/common/UserName";
import colors from "src/theme/variables";
const drawerWidth = 160;

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
    handleClickOnPages,
    anchorEl,
    open,
    isLoading,
    anchorElForProjectIcons,
    openPorjectsIcons,
    allProjects,
    pagesData,
    pagesLoading,
    // userName,
  } = useLayout();

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          display="flex"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            // background: "#121212",
            background: colors.navigationColor,
            boxShadow: "none",
          }}>
          <Toolbar
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}>
            <Typography variant="h6" noWrap component="div" sx={{ color: `${colors.secondaryColor}` }}>
              Task Master
            </Typography>
            <UserName handleOpen={handleOpen} />
            <Menu id="logout" anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Toolbar>
          <Divider />
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              background: colors.navigationColor,
            },
            // backgroundColor: "red",
          }}>
          <Toolbar />
          <Box
            sx={{
              overflow: "auto",
            }}>
            <List>
              {UPPER_SIDE_BAR.map((i) => {
                return Object.entries(i).map(([key, value]) => {
                  return (
                    <ListItemButton key={key} onClick={handleClickOnHome}>
                      <ListItemIcon sx={{ color: colors.secondaryTextColor }}>{value}</ListItemIcon>
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
                    <ListItemButton key={key} onClick={() => handleClickOnInsights(key)}>
                      <ListItemIcon sx={{ color: colors.secondaryTextColor }}>{value}</ListItemIcon>
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
                      <ListItemIcon sx={{ color: colors.secondaryTextColor }}>{value}</ListItemIcon>
                      <ListItemText primary={key} />
                    </ListItemButton>
                  );
                });
              })}
              {isLoading ? (
                <ListItemButton>
                  <ListItemIcon>
                    <ClipLoader color="white" />
                  </ListItemIcon>
                </ListItemButton>
              ) : (
                allProjects?.map((item) => {
                  return (
                    <ListItemButton key={item._id}>
                      <ListItemText primary={item.name} onClick={() => handleActiveProject(item.name)} />
                      <ListItemIcon data-id={item._id}>
                        <MoreVertIcon
                          sx={{ color: colors.secondaryTextColor }}
                          onClick={handleClickOnThreeDots}
                          data-id={item._id}
                        />
                        <Menu
                          data-id={item._id}
                          anchorEl={anchorElForProjectIcons}
                          open={openPorjectsIcons}
                          onClose={handleCloseOfProjectsIcons}>
                          <MenuItem
                            sx={{
                              color: colors.secondaryTextColor,
                            }}
                            onClick={handleClickOnRename}>
                            <DriveFileRenameOutlineIcon />
                          </MenuItem>
                          <MenuItem
                            sx={{
                              color: colors.secondaryTextColor,
                            }}
                            onClick={handleDelete}>
                            <DeleteIcon />
                          </MenuItem>
                        </Menu>
                      </ListItemIcon>
                    </ListItemButton>
                  );
                })
              )}
            </List>
            <Divider />
            <List>
              {BOTTOM.map((i) => {
                return Object.entries(i).map(([key, value]) => {
                  return (
                    <ListItemButton key={key} onClick={() => handleClickOnPages(key)}>
                      <ListItemIcon sx={{ color: colors.secondaryTextColor }}>{value}</ListItemIcon>
                      <ListItemText primary={key} />
                    </ListItemButton>
                  );
                });
              })}
              {pagesData?.data?.map((item) => {
                return (
                  <ListItemButton key={item._id}>
                    <ListItemText primary={item.name} onClick={() => handleActiveProject(item.name)} />
                    <ListItemIcon data-id={item._id}>
                      <MoreVertIcon
                        sx={{ color: colors.secondaryTextColor }}
                        onClick={handleClickOnThreeDots}
                        data-id={item._id}
                      />
                      <Menu
                        data-id={item._id}
                        anchorEl={anchorElForProjectIcons}
                        open={openPorjectsIcons}
                        onClose={handleCloseOfProjectsIcons}>
                        <MenuItem
                          sx={{
                            color: colors.secondaryTextColor,
                          }}
                          onClick={handleDelete}>
                          <DeleteIcon />
                        </MenuItem>
                      </Menu>
                    </ListItemIcon>
                  </ListItemButton>
                );
              })}
            </List>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, mt: 9 }}>
          <Outlet />
        </Box>
      </Box>
      <CommonLoaderWithBackDrop />
    </>
  );
};
