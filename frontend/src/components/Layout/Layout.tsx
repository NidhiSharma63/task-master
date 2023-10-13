import DeleteIcon from '@mui/icons-material/Delete';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { Outlet } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';
// import image from 'src/assets/icons/Logo.png';
import UserName from 'src/common/UserName';
import { CommonLoaderWithBackDrop } from 'src/common/loader/CommonLoader';
import { IItems } from 'src/components/Layout/Interface/InterFace';
import PagesModal from 'src/components/userPages/components/PagesModal';
import {
  BOTTOM,
  INSIGHTS,
  LOWER_PART,
  UPPER_SIDE_BAR,
} from 'src/constant/sidebar';
import useLayout from 'src/hook/layout/useLayout';
import colors from 'src/theme/variables';

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
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            // background: "#121212",
            background: colors.offWhite,
            boxShadow: 'none',
            display: 'flex',
          }}
        >
          <Toolbar
            sx={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {/* <img src={image} alt="logo" style={{ width: '40px' }} /> */}
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ color: `${colors.textColor}` }}
              >
                Task Master
              </Typography>
            </Box>
            <UserName handleOpen={handleOpen} />
            <Menu
              id="logout"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
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
              boxSizing: 'border-box',
              background: colors.offWhite,
              borderRight: '1px solid white',
            },
            // backgroundColor: "red",
          }}
        >
          <Toolbar />
          <Divider sx={{ borderColor: 'white' }} />
          <Box
            sx={{
              overflow: 'auto',
            }}
          >
            <List>
              {UPPER_SIDE_BAR.map((i) => {
                return Object.entries(i).map(([key, value]) => {
                  return (
                    <ListItemButton key={key} onClick={handleClickOnHome}>
                      <ListItemText primary={key} />
                      <ListItemIcon sx={{ color: colors.textColor }}>
                        {value}
                      </ListItemIcon>
                    </ListItemButton>
                  );
                });
              })}
            </List>
            <List>
              {INSIGHTS.map((i) => {
                return Object.entries(i).map(([key, value]) => {
                  return (
                    <ListItemButton
                      key={key}
                      onClick={() => handleClickOnInsights(key)}
                    >
                      <ListItemText primary={key} />
                      <ListItemIcon sx={{ color: colors.textColor }}>
                        {value}
                      </ListItemIcon>
                    </ListItemButton>
                  );
                });
              })}
            </List>
            <List>
              {LOWER_PART.map((i) => {
                return Object.entries(i).map(([key, value]) => {
                  return (
                    <ListItemButton key={key} onClick={handleOpenProjectModal}>
                      <ListItemText primary={key} />
                      <ListItemIcon sx={{ color: colors.textColor }}>
                        {value}
                      </ListItemIcon>
                    </ListItemButton>
                  );
                });
              })}
              {isLoading ? (
                <ListItemButton>
                  <ListItemIcon>
                    <FadeLoader color="#3E3A3A" />
                  </ListItemIcon>
                </ListItemButton>
              ) : (
                allProjects?.map((item: IItems) => {
                  return (
                    <ListItemButton key={item._id}>
                      <ListItemText
                        primary={item.name}
                        onClick={() => handleActiveProject(item.name)}
                      />
                      <ListItemIcon data-id={item._id}>
                        <MoreVertIcon
                          sx={{ color: colors.textColor }}
                          onClick={handleClickOnThreeDots}
                          data-id={item._id}
                        />
                        <Menu
                          data-id={item._id}
                          anchorEl={anchorElForProjectIcons}
                          open={isProjectIconsOpen}
                          onClose={handleCloseOfProjectsIcons}
                        >
                          <MenuItem
                            sx={{
                              color: colors.textColor,
                            }}
                            onClick={handleClickOnRename}
                          >
                            <DriveFileRenameOutlineIcon />
                          </MenuItem>
                          <MenuItem
                            sx={{
                              color: colors.textColor,
                            }}
                            onClick={handleDelete}
                          >
                            <DeleteIcon />
                          </MenuItem>
                        </Menu>
                      </ListItemIcon>
                    </ListItemButton>
                  );
                })
              )}
            </List>
            <List>
              {BOTTOM.map((i) =>
                Object.entries(i).map(([key, value]) => {
                  return (
                    <ListItemButton
                      key={key}
                      onClick={handleClickOnPageAddIcon}
                    >
                      <ListItemText primary={key} />
                      <ListItemIcon sx={{ color: colors.textColor }}>
                        {value}
                      </ListItemIcon>
                    </ListItemButton>
                  );
                }),
              )}
              {pagesLoading ? (
                <ListItemButton>
                  <ListItemIcon>
                    <FadeLoader color="#3E3A3A" />
                  </ListItemIcon>
                </ListItemButton>
              ) : (
                pagesData?.data?.map((item: IItems) => {
                  return (
                    <ListItemButton key={item._id} sx={{ p: '.5 0' }}>
                      <ListItemText
                        primary={item.name}
                        onClick={() => handleClickOnPages(item._id)}
                        sx={{ wordBreak: 'break-all' }}
                      />
                      <ListItemIcon data-id={item._id} sx={{ minWidth: 0 }}>
                        <MoreVertIcon
                          sx={{ color: colors.textColor }}
                          onClick={handleClickOnThreeDotsPages}
                          data-id={item._id}
                        />
                        <Menu
                          data-id={item._id}
                          anchorEl={anchorElementForPages}
                          open={isPageIconsOpen}
                          onClose={handleCloseOnPage}
                        >
                          <MenuItem
                            sx={{
                              color: colors.textColor,
                            }}
                            onClick={handleClickOnPageRename}
                          >
                            <DriveFileRenameOutlineIcon />
                          </MenuItem>
                          <MenuItem
                            sx={{
                              color: colors.textColor,
                            }}
                            onClick={handlePageDelete}
                          >
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
