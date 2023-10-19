import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { usePostProjectQuery, useUpdateProjectQuery } from '../useProjectQuery';

const useProjectNameModal = () => {
  const { is_project_name_modal_open } = useSelector(booleanDataInStore);
  const { project_rename } = useSelector(projectDataInStore);
  const [open, setOpen] = useState(is_project_name_modal_open);
  const [projectName, setProjectName] = useState('');
  const dispatch = useDispatch();
  const { mutate, isLoading } = usePostProjectQuery();
  const { mutate: updateProject, isLoading: projectUpdateIsLoading } =
    useUpdateProjectQuery();

  const [colorName, setColorName] = useState('');

  useEffect(() => {
    setOpen(is_project_name_modal_open);
  }, [is_project_name_modal_open]);

  const handleClose = () => {
    dispatch(isProjectNameModalOpen(false));
    setOpen(false);
  };

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

  const handleSave = () => {
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
      if (project_rename.projectId) {
        updateProject({
          name: projectName.trim(),
          _id: project_rename.projectId,
          previousName: project_rename.projectName,
          color: colorName,
        });
        setProjectName('');
        dispatch(projectRename({}));
      } else {
        /**
         * create new project
         */
        mutate({ name: projectName.trim(), color: colorName });
        setProjectName('');
      }
      handleClose();
    }
  };

  const handleChangeInput = (event) => {
    setProjectName(event.target.value);
  };

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
