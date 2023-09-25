import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetColumnQuery } from 'src/hook/useColumnQuery';
import { useGetProjectQuery } from 'src/hook/useProjectQuery';
import { useGetAllTaskAccordingToStatusForEachProject } from 'src/hook/useTaskQuery';
import { statusDataInStore, totalStatus } from 'src/redux/status/statusSlice';

const useHome = () => {
  const { data: projectData, isLoading: projectIsLoading } =
    useGetProjectQuery();
  const [backgroundColors, setBackgroundColors] = useState([]);
  const dispatch = useDispatch();
  const { total_status } = useSelector(statusDataInStore);
  /**
   * task data
   */

  const { data: taskData, isLoading: isTaskLoading } =
    useGetAllTaskAccordingToStatusForEachProject();
  /**
   *
   */
  const { data: columnData } = useGetColumnQuery();
  /**
   * dispatch the action to save all the status(columns) in redux
   */
  useEffect(() => {
    if (total_status?.length === 0) {
      const onlyColumns = columnData?.data?.map((item) => item.name);
      if (onlyColumns) {
        dispatch(totalStatus(onlyColumns));
      }
    }
  }, [columnData, dispatch, total_status]);

  /**
   * bg colors
   */
  useEffect(() => {
    let bgColors = [];
    projectData?.projects?.map((item) => {
      bgColors.push(item.color);
    });
    setBackgroundColors(bgColors);
  }, [projectData]);

  return {
    projectData,
    projectIsLoading,
    backgroundColors,
    taskData,
    isTaskLoading,
  };
};

export default useHome;
