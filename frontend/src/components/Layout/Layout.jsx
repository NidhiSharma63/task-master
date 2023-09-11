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
import PagesModal from "src/components/userPages/components/PagesModal";
import image from "src/assets/icons/Logo.png";

const drawerWidth = 150;

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
    handleClickOnPageAddIcon,
    handleClickOnThreeDotsPages,
    handleCloseOnPage,
    handleClickOnPageRename,
    handlePageDelete,
    anchorEl,
    open,
    isLoading,
    anchorElForProjectIcons,
    anchorElementForPages,
    allProjects,
    pagesData,
    pagesLoading,
    isProjectIconsOpen,
    isPageIconsOpen,
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
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <img src={image} alt="logo" style={{ width: "40px" }} />
              <Typography variant="h6" noWrap component="div" sx={{ color: `${colors.secondaryColor}` }}>
                Task Master
              </Typography>
            </Box>
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
                      <ListItemText primary={key} />
                      <ListItemIcon sx={{ color: colors.secondaryTextColor }}>{value}</ListItemIcon>
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
                      <ListItemText primary={key} />
                      <ListItemIcon sx={{ color: colors.secondaryTextColor }}>{value}</ListItemIcon>
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
                      <ListItemText primary={key} />
                      <ListItemIcon sx={{ color: colors.secondaryTextColor }}>{value}</ListItemIcon>
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
                          open={isProjectIconsOpen}
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
                    <ListItemButton key={key}>
                      <ListItemText primary={key} />
                      <ListItemIcon sx={{ color: colors.secondaryTextColor }} onClick={handleClickOnPageAddIcon}>
                        {value}
                      </ListItemIcon>
                    </ListItemButton>
                  );
                });
              })}
              {pagesLoading ? (
                <ListItemButton>
                  <ListItemIcon>
                    <ClipLoader color="white" />
                  </ListItemIcon>
                </ListItemButton>
              ) : (
                pagesData?.data?.map((item) => {
                  return (
                    <ListItemButton key={item._id} sx={{ p: ".5 0" }}>
                      <ListItemText
                        primary={item.name}
                        onClick={() => handleClickOnPages(item._id)}
                        sx={{ wordBreak: "break-all" }}
                      />
                      <ListItemIcon data-id={item._id} sx={{ minWidth: 0 }}>
                        <MoreVertIcon
                          sx={{ color: colors.secondaryTextColor }}
                          onClick={handleClickOnThreeDotsPages}
                          data-id={item._id}
                        />
                        <Menu
                          data-id={item._id}
                          anchorEl={anchorElementForPages}
                          open={isPageIconsOpen}
                          onClose={handleCloseOnPage}>
                          <MenuItem
                            sx={{
                              color: colors.secondaryTextColor,
                            }}
                            onClick={handleClickOnPageRename}>
                            <DriveFileRenameOutlineIcon />
                          </MenuItem>
                          <MenuItem
                            sx={{
                              color: colors.secondaryTextColor,
                            }}
                            onClick={handlePageDelete}>
                            <DeleteIcon />
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
          <PagesModal />
        </Box>
      </Box>
      <CommonLoaderWithBackDrop />
    </>
  );
};
