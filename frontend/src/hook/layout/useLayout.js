import { useSelector, useDispatch } from "react-redux";
import { usersDataInStore } from "../../redux/auth/userSlice";
import { getUserFirstNameFirstLetter } from "../../utils/getUserFirstName";
import useLogoutQuery from "../../hook/useLogoutQuery";
import {
  useGetProjectQuery,
  useDeleteProjectQuery,
} from "../../hook/useProjectQuery";
import {
  isBackDropLoaderDisplayed,
  isProjectNameModalOpen,
  isUpdatingTask,
} from "../../redux/boolean/booleanSlice";
import {
  activeProject,
  projectDataInStore,
  projectRename,
} from "../../redux/projects/projectSlice";
import { setValueToLs } from "../../utils/localstorage";
import { KEY_FOR_STORING_ACTIVE_PROJECT } from "../../constant/Misc";
import { queryKeyForTask } from "../../constant/queryKey";
import { queryClient } from "../../index";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useBackDropLoaderContext } from "../../context/BackDropLoaderContext";

const useLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user_email } = useSelector(usersDataInStore);
  const { active_project } = useSelector(projectDataInStore);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const { mutate } = useLogoutQuery();
  const { data, isLoading } = useGetProjectQuery();
  const [allProjects, setAllProjects] = useState([]);
  const [anchorElForProjectIcons, setAnchorElForProjectIcons] = useState(null);
  const [openPorjectsIcons, setOpenPorjectsIcons] = useState(false);
  const { mutate: deleteProject, isLoading: deleteInProgress } =
    useDeleteProjectQuery();

  const { setValue } = useBackDropLoaderContext();
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
    setUserName(getUserFirstNameFirstLetter(user_email));
  }, [user_email]);

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
    dispatch(isProjectNameModalOpen(true));
    navigate("/Dashboard");
  };

  const handleDelete = (id) => {
    deleteProject({ id });
    setValueToLs(KEY_FOR_STORING_ACTIVE_PROJECT, null);
  };

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

  useEffect(() => {
    queryKeyForTask.map((status) => queryClient.invalidateQueries(status));
  }, [active_project]);

  const handleClickOnThreeDots = (event) => {
    setOpenPorjectsIcons(true);
    setAnchorElForProjectIcons(event.target);
  };

  const handleCloseOfProjectsIcons = () => {
    setOpenPorjectsIcons(false);
  };

  const handleClickOnRename = (projectName, projectId) => {
    dispatch(
      projectRename({
        projectName,
        projectId,
      })
    );
    dispatch(isProjectNameModalOpen(true));
    handleCloseOfProjectsIcons();
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
    anchorEl,
    open,
    isLoading,
    anchorElForProjectIcons,
    openPorjectsIcons,
    deleteInProgress,
    allProjects,
    userName,
  };
};

export default useLayout;
