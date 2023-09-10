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
import { useState, useEffect, useCallback, useRef } from "react";
import { useBackDropLoaderContext } from "src/context/BackDropLoaderContext";
import { useGetPages } from "src/hook/usePagesQuery";
import { usePagesContext } from "src/context/PagesContextProvider";
import { useDeletePage } from "src/hook/usePagesQuery";

const useLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { active_project } = useSelector(projectDataInStore);

  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [allProjects, setAllProjects] = useState([]);
  const [anchorElForProjectIcons, setAnchorElForProjectIcons] = useState(null);

  const [anchorElementForPages, setAnchorElementForPages] = useState(null);
  const [isProjectIconsOpen, setIsProjectIconsOpen] = useState(false);
  const [isPageIconsOpen, setIsPageIconsOpen] = useState(false);
  const { mutate: deletePage } = useDeletePage();

  const pageItemId = useRef();
  const projectItemId = useRef();

  const { data, isLoading } = useGetProjectQuery();
  const { mutate: deleteProject, isLoading: deleteInProgress } = useDeleteProjectQuery();
  const { data: pagesData, isLoading: pagesLoading } = useGetPages();
  const { mutate } = useLogoutQuery();

  const { setValue } = useBackDropLoaderContext();
  const { setPageData } = usePagesContext();

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

  useEffect(() => {
    setAllProjects(data?.projects);
  }, [data]);

  useEffect(() => {
    queryKeyForTask.map((status) => queryClient.invalidateQueries(status));
  }, [active_project]);

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

  const handleClickOnHome = () => {
    navigate("/Home");
  };
  /**
   * Insights
   */
  const handleClickOnInsights = (name) => {
    navigate(`Charts/${name}`);
  };

  /**
   * projects
   */
  const handleOpenProjectModal = () => {
    dispatch(projectRename({}));
    dispatch(isProjectNameModalOpen(true));
    navigate("/Dashboard");
  };

  const handleDelete = () => {
    deleteProject({ id: projectItemId.current });
    setValueToLs(KEY_FOR_STORING_ACTIVE_PROJECT, null);
    setAnchorEl(null);
  };

  const handleActiveProject = (name) => {
    dispatch(activeProject(name));
    setValueToLs(KEY_FOR_STORING_ACTIVE_PROJECT, name);
    dispatch(isUpdatingTask(false));
    navigate("/Dashboard");
  };

  const handleClickOnThreeDots = (event) => {
    if (!event.target.dataset.id) return;
    setAnchorElForProjectIcons(event.target);
    setIsProjectIconsOpen(true);
    projectItemId.current = event.target.dataset.id;
    console.log(projectItemId.current, event.target.dataset.id);
  };

  const handleCloseOfProjectsIcons = () => {
    setAnchorElForProjectIcons(null);
    setIsProjectIconsOpen(false);
  };

  const handleClickOnRename = () => {
    if (!projectItemId.current) return;
    const projectToUpdate = allProjects.find((item) => item._id === projectItemId.current);

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

  /**
   * navigate to pages
   */

  const handleClickOnPages = useCallback((val) => {
    navigate(`/pages/${val}`);
  }, []);

  /**
   * Add page icon
   */
  const handleClickOnPageAddIcon = useCallback(() => {
    setPageData({});
    dispatch(isDialogBoxOpen(true));
  }, []);

  /**
   * show page icons
   */

  const handleClickOnThreeDotsPages = (event) => {
    const id = event.target.dataset.id;
    if (!id) return;
    setAnchorElementForPages(event.target);
    setIsPageIconsOpen(true);
    pageItemId.current = id;
  };

  /**
   * close menu icons
   */

  const handleCloseOnPage = () => {
    setAnchorElementForPages(null);
    dispatch(isDialogBoxOpen(false));
    setIsPageIconsOpen(false);
    setPageData({});
  };

  /**
   * page rename
   */

  const handleClickOnPageRename = () => {
    const updatedPage = pagesData?.data?.find((item) => item._id === pageItemId.current);
    dispatch(isDialogBoxOpen(true));
    setPageData(updatedPage);
    setAnchorElementForPages(null);
    setIsPageIconsOpen(false);
  };

  /**
   * page delete
   */

  const handlePageDelete = () => {
    deletePage({ _id: pageItemId.current });
    setAnchorElementForPages(null);
    setIsPageIconsOpen(false);
  };

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
    deleteInProgress,
    allProjects,
    pagesData,
    pagesLoading,
    anchorElementForPages,
    isProjectIconsOpen,
    isPageIconsOpen,
    // userName,
  };
};

export default useLayout;
