import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { IPage, IProjects } from 'src/common/Interface/Interface';
import { KEY_FOR_STORING_ACTIVE_PROJECT } from 'src/constant/Misc';
import { usePagesContext } from 'src/context/PagesContextProvider';
import useLogoutQuery from 'src/hook/useLogoutQuery';
import { useDeletePage, useGetPages } from 'src/hook/usePagesQuery';
import {
  useDeleteProjectQuery,
  useGetProjectQuery,
} from 'src/hook/useProjectQuery';
import {
  isBackDropLoaderDisplayed,
  isBackDropLoaderDisplayedForPage,
  isBackdropLoaderDisplayedForProjects,
  isDialogBoxOpen,
  isProjectNameModalOpen,
  isUpdatingTask,
} from 'src/redux/boolean/booleanSlice';
import { activeProject, projectRename } from 'src/redux/projects/projectSlice';
import { setValueToLs } from 'src/utils/localstorage';
import { useAppDispatch } from '../redux/hooks';

const useLayout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [activeLink, setAcitveLink] = useState<string>('');

  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [allProjects, setAllProjects] = useState<IProjects[] | []>([]);
  const [anchorElForProjectIcons, setAnchorElForProjectIcons] =
    useState<null | HTMLElement>(null);

  const [anchorElementForPages, setAnchorElementForPages] =
    useState<null | HTMLElement>(null);
  const [isProjectIconsOpen, setIsProjectIconsOpen] = useState<boolean>(false);
  const [isPageIconsOpen, setIsPageIconsOpen] = useState<boolean>(false);
  const { mutate: deletePage } = useDeletePage();

  const pageItemId = useRef<string>('');
  const projectItemId = useRef<string>('');

  const { data, isLoading } = useGetProjectQuery();
  const { mutate: deleteProject, isLoading: deleteInProgress } =
    useDeleteProjectQuery();
  const { data: pagesData, isLoading: pagesLoading } = useGetPages();
  const { mutate } = useLogoutQuery();

  const { setPageData } = usePagesContext();

  // // navigate the user to /todo directly
  useEffect(() => {
    navigate('Dashboard');
    dispatch(isBackDropLoaderDisplayed(false));
  }, [navigate, dispatch]);

  // if only single present or first time project is created then make that as active project\
  useEffect(() => {
    if (allProjects?.length === 1) {
      dispatch(activeProject(allProjects[0].name));
    }
  }, [allProjects, dispatch]);

  /**
   * Show backdrop
   */
  useEffect(() => {
    if (deleteInProgress) {
      dispatch(isBackDropLoaderDisplayed(true));
      dispatch(isBackdropLoaderDisplayedForProjects(true));
    }
  }, [deleteInProgress, dispatch]);

  useEffect(() => {
    setAllProjects(data?.projects);
  }, [data]);

  // useEffect(() => {
  //   queryKeyForTask.map((status: string) =>
  //     queryClient.invalidateQueries(status),
  // const [activeLink, setAcitveLink] = useState<string>(''); //   );

  const handleLogout = useCallback(() => {
    mutate();
    dispatch(isBackDropLoaderDisplayed(true));
  }, [mutate, dispatch]);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
    setOpen(false);
  }, []);

  const handleOpen = useCallback(
    (event: React.MouseEvent<HTMLDivElement>): void => {
      setAnchorEl(event.currentTarget);
      setOpen(true);
    },
    [],
  );

  const handleClickOnHome = useCallback((): void => {
    navigate('/Home');
    setAcitveLink('Home');
  }, [navigate]);
  /**
   * Insights
   */
  const handleClickOnInsights = useCallback(
    (name: string): void => {
      navigate(`Charts/${name}`);
      setAcitveLink('Insights');
    },
    [navigate],
  );

  /**
   * projects
   */
  const handleOpenProjectModal = useCallback((): void => {
    dispatch(projectRename(null));
    dispatch(isProjectNameModalOpen(true));
    navigate('/Dashboard');
    setAcitveLink('Projects');
  }, [dispatch, navigate]);

  const handleDelete = useCallback(() => {
    deleteProject({ id: projectItemId.current });
    setValueToLs(KEY_FOR_STORING_ACTIVE_PROJECT, null);
    setAnchorEl(null);
    setIsProjectIconsOpen(false);
  }, [deleteProject]);

  const handleActiveProject = useCallback(
    (name: string) => {
      dispatch(activeProject(name));
      // setValueToLs(KEY_FOR_STORING_ACTIVE_PROJECT, name);
      setValueToLs(
        KEY_FOR_STORING_ACTIVE_PROJECT,
        JSON.stringify({ activeProject: name }),
      );
      dispatch(isUpdatingTask(false));
      navigate('/Dashboard');
      setAcitveLink(name);
    },
    [dispatch, navigate],
  );

  const handleClickOnThreeDots: MouseEventHandler<SVGSVGElement> = useCallback(
    (event): void => {
      if (event.currentTarget instanceof HTMLElement) {
        if (!event.currentTarget.dataset.id) return;
        setAnchorElForProjectIcons(event.currentTarget);
        setIsProjectIconsOpen(true);
        projectItemId.current = event.currentTarget.dataset.id;
      }
    },
    [],
  );

  const handleCloseOfProjectsIcons = useCallback((): void => {
    setAnchorElForProjectIcons(null);
    setIsProjectIconsOpen(false);
  }, []);

  const handleClickOnRename = useCallback((): void => {
    if (!projectItemId.current) return;
    const projectToUpdate = allProjects.find(
      (item) => item._id === projectItemId.current,
    );

    if (projectToUpdate !== undefined) {
      dispatch(
        projectRename({
          projectName: projectToUpdate.name,
          projectId: projectToUpdate._id,
          color: projectToUpdate.color,
        }),
      );
    }

    dispatch(isProjectNameModalOpen(true));
    handleCloseOfProjectsIcons();
  }, [allProjects, dispatch, handleCloseOfProjectsIcons]);
  /**
   * pages
   */

  /**
   * navigate to pages
   */

  const handleClickOnPages = useCallback(
    (val: string, name: string): void => {
      navigate(`/pages/${val}`);
      setAcitveLink(name);
    },
    [navigate],
  );

  /**
   * Add page icon
   */
  const handleClickOnPageAddIcon = useCallback((): void => {
    setPageData(null);
    dispatch(isDialogBoxOpen(true));
  }, [dispatch, setPageData]);

  /**
   * show page icons
   */

  const handleClickOnThreeDotsPages: MouseEventHandler<SVGSVGElement> =
    useCallback((event): void => {
      // console.log()
      if (event.currentTarget instanceof HTMLElement) {
        const id = event.currentTarget.dataset.id;
        if (!id) return;
        setAnchorElementForPages(event.currentTarget);
        setIsPageIconsOpen(true);
        pageItemId.current = id;
      }
    }, []);

  /**
   * close menu icons
   */

  const handleCloseOnPage = useCallback((): void => {
    setAnchorElementForPages(null);
    dispatch(isDialogBoxOpen(false));
    setIsPageIconsOpen(false);
    setPageData(null);
  }, [dispatch, setPageData]);

  /**
   * page rename
   */

  const handleClickOnPageRename = useCallback((): void => {
    const updatedPage: IPage = pagesData?.data?.find((item: IPage) => {
      return item._id === pageItemId.current;
    });
    dispatch(isDialogBoxOpen(true));
    setPageData(updatedPage);
    setAnchorElementForPages(null);
    setIsPageIconsOpen(false);
  }, [dispatch, setPageData]);

  /**
   * page delete
   */

  const handlePageDelete = useCallback(() => {
    deletePage({ _id: pageItemId.current });
    setAnchorElementForPages(null);
    setIsPageIconsOpen(false);
    dispatch(isBackDropLoaderDisplayedForPage(true));
    dispatch(isBackDropLoaderDisplayed(true));
  }, [deletePage, dispatch]);

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
    activeLink,
  };
};

export default useLayout;
