import { useCallback, useEffect, useState } from 'react';
import {
  booleanDataInStore,
  isBackDropLoaderDisplayed,
  isBackdropLoaderDisplayedForProjects,
  isProjectNameModalOpen,
} from 'src/redux/boolean/booleanSlice';

import {
  projectDataInStore,
  projectRename,
} from 'src/redux/projects/projectSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { usePostProjectQuery, useUpdateProjectQuery } from '../useProjectQuery';

const useProjectNameModal = () => {
  const { is_project_name_modal_open } = useAppSelector(booleanDataInStore);
  const { project_rename } = useAppSelector(projectDataInStore);
  const [open, setOpen] = useState<boolean>(is_project_name_modal_open);
  const [projectName, setProjectName] = useState('');
  const dispatch = useAppDispatch();
  const { mutate, isLoading } = usePostProjectQuery();
  const { mutate: updateProject, isLoading: projectUpdateIsLoading } =
    useUpdateProjectQuery();

  const [colorName, setColorName] = useState<string>('');

  useEffect(() => {
    setOpen(is_project_name_modal_open);
  }, [is_project_name_modal_open]);

  const handleClose = useCallback((): void => {
    dispatch(isProjectNameModalOpen(false));
    setOpen(false);
  }, [dispatch]);

  useEffect(() => {
    if (isLoading) {
      dispatch(isBackDropLoaderDisplayed(true));
      dispatch(isBackdropLoaderDisplayedForProjects(true));
    }
  }, [isLoading, dispatch]);

  useEffect(() => {
    if (projectUpdateIsLoading) {
      dispatch(isBackDropLoaderDisplayed(true));
      dispatch(isBackdropLoaderDisplayedForProjects(true));
    }
  }, [projectUpdateIsLoading, dispatch]);

  useEffect(() => {
    if (project_rename) {
      setProjectName(project_rename.projectName);
      setColorName(project_rename.color);
    }
  }, [project_rename]);

  const handleSave = useCallback((): void => {
    console.log(project_rename, 'prject rename');
    /**
     * if project name have no value then return
     */
    if (projectName?.trim()?.length === 0) return;

    /**
     * if project has value then run the if block
     */
    if (projectName?.trim()) {
      /**
       * if project rename obj is present that's mean user is trying to update the project name
       */
      if (project_rename !== null && project_rename.projectId) {
        updateProject({
          name: projectName.trim(),
          _id: project_rename.projectId,
          previousName: project_rename.projectName,
          color: colorName,
        });
        setProjectName('');
        dispatch(projectRename(null));
      } else {
        /**
         * create new project
         */
        mutate({ name: projectName.trim(), color: colorName });
        setProjectName('');
      }
      handleClose();
    }
  }, [
    colorName,
    dispatch,
    handleClose,
    mutate,
    projectName,
    project_rename,
    updateProject,
  ]);

  const handleChangeInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setProjectName(event.target.value);
    },
    [],
  );

  return {
    handleChangeInput,
    handleSave,
    handleClose,
    isLoading,
    projectName,
    open,
    colorName,
    setColorName,
  };
};

export default useProjectNameModal;
