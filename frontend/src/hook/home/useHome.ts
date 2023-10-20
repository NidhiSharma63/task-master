import { useEffect, useState } from 'react';
import { IColumnItem, IProjects } from 'src/common/Interface/Interface';
import { useGetColumnQuery } from 'src/hook/useColumnQuery';
import { useGetProjectQuery } from 'src/hook/useProjectQuery';
import { useGetAllTaskAccordingToStatusForEachProject } from 'src/hook/useTaskQuery';
import { statusDataInStore, totalStatus } from 'src/redux/status/statusSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
/**
 *
 * @returns home hook
 */
const useHome = () => {
  const { data: projectData, isLoading: projectIsLoading } =
    useGetProjectQuery();
  const [backgroundColors, setBackgroundColors] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const { total_status } = useAppSelector(statusDataInStore);
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
      const onlyColumnsData = columnData?.data?.map((item: IColumnItem) => {
        return item?.name;
      });
      if (onlyColumnsData) {
        dispatch(totalStatus(onlyColumnsData));
      }
    }
  }, [columnData, dispatch, total_status]);

  /**
   * bg colors
   */
  useEffect(() => {
    const bgColors = projectData?.projects?.map((item: IProjects): string => {
      return item.color; // Wrap the object in parentheses
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
