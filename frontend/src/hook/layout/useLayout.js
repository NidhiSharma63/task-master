import { useSelector, useDispatch } from "react-redux";
import useLogoutQuery from "src/hook/useLogoutQuery";
import { useGetProjectQuery, useDeleteProjectQuery } from "src/hook/useProjectQuery";
import {
  isBackDropLoaderDisplayed,
  isBackdropLoaderDisplayedForProjects,
  isDialogBoxOpen,
  isProjectNameModalOpen,
  isUpdatingTask,
} from "src/redux/boolean/booleanSlice";
import { activeProject, projectDataInStore, projectRename } from "src/redux/projects/projectSlice";
import { setValueToLs } from "src/utils/localstorage";
import { KEY_FOR_STORING_ACTIVE_PROJECT } from "src/constant/Misc";
import { queryKeyForTask } from "src/constant/queryKey";
import { queryClient } from "src/index";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { useBackDropLoaderContext } from "src/context/BackDropLoaderContext";
import { useGetPages } from "src/hook/usePagesQuery";

const useLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { user_email } = useSelector(usersDataInStore);
  const { active_project } = useSelector(projectDataInStore);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const { mutate } = useLogoutQuery();
  const { data, isLoading } = useGetProjectQuery();
  const [allProjects, setAllProjects] = useState([]);
  const [anchorElForProjectIcons, setAnchorElForProjectIcons] = useState(null);
  const [openPorjectsIcons, setOpenPorjectsIcons] = useState(false);
  const [itemId, setItemId] = useState(null);
  const { mutate: deleteProject, isLoading: deleteInProgress } = useDeleteProjectQuery();

  const { data: pagesData, isLoading: pagesLoading } = useGetPages();

  const { setValue } = useBackDropLoaderContext();

  // // navigate the user to /todo directly
  useEffect(() => {
    navigate("Dashboard");
    dispatch(isBackDropLoaderDisplayed(false));
    setValue("");
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

  const handleLogout = () => {
    mutate();
    dispatch(isBackDropLoaderDisplayed(true));
    setValue("Please wait");
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
    dispatch(projectRename({}));
    dispatch(isProjectNameModalOpen(true));
    navigate("/Dashboard");
  };

  const handleDelete = () => {
    deleteProject({ id: itemId });
    // console.log(id, ":::this is the id coming");
    setValueToLs(KEY_FOR_STORING_ACTIVE_PROJECT, null);
    setAnchorEl(null);
    setOpenPorjectsIcons(false);
  };

  /**
   * Show backdrop
   */
  useEffect(() => {
    if (deleteInProgress) {
      dispatch(isBackDropLoaderDisplayed(true));
      setValue("Deleting project");
      dispatch(isBackdropLoaderDisplayedForProjects(true));
    }
  }, [deleteInProgress, setValue, dispatch]);

  const handleClickOnInsights = (name) => {
    navigate(`Charts/${name}`);
  };

  const handleActiveProject = (name) => {
    dispatch(activeProject(name));
    setValueToLs(KEY_FOR_STORING_ACTIVE_PROJECT, name);
    dispatch(isUpdatingTask(false));
    navigate("/Dashboard");
  };

  const handleClickOnHome = () => {
    navigate("/Home");
  };
  /**
   * navigate to pages
   */

  const handleClickOnPages = useCallback((val) => {
    navigate(`/pages/${val}`);
  }, []);

  useEffect(() => {
    queryKeyForTask.map((status) => queryClient.invalidateQueries(status));
  }, [active_project]);

  const handleClickOnThreeDots = (event) => {
    if (!event.target.dataset.id) return;
    setOpenPorjectsIcons(true);
    setAnchorElForProjectIcons(event.target);
    setItemId(event.target.dataset.id);
  };

  const handleCloseOfProjectsIcons = () => {
    setOpenPorjectsIcons(false);
  };

  const handleClickOnRename = () => {
    const projectToUpdate = allProjects.find((item) => item._id === itemId);

    if (!itemId) return;
    dispatch(
      projectRename({
        projectName: projectToUpdate?.name,
        projectId: projectToUpdate?._id,
        color: projectToUpdate?.color,
      })
    );
    dispatch(isProjectNameModalOpen(true));
    handleCloseOfProjectsIcons();
  };
  /**
   * pages
   */

  const handleClickOnPageAddIcon = useCallback(() => {
    dispatch(isDialogBoxOpen(true));
  }, []);

  return {
    handleClickOnRename,
    handleClickOnThreeDots,
    handleClickOnHome,
    handleActiveProject,
    handleClickOnInsights,
    handleDelete,
    handleLogout,
    handleClose,
    handleOpen,
    handleOpenProjectModal,
    handleCloseOfProjectsIcons,
    setItemId,
    handleClickOnPages,
    handleClickOnPageAddIcon,
    anchorEl,
    open,
    isLoading,
    anchorElForProjectIcons,
    openPorjectsIcons,
    deleteInProgress,
    allProjects,
    itemId,
    pagesData,
    pagesLoading,
    // userName,
  };
};

export default useLayout;
