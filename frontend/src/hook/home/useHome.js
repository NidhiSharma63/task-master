import { useEffect, useState } from 'react';
import { useGetProjectQuery } from 'src/hook/useProjectQuery';
import { useGetAllTaskAccordingToStatusForEachProject } from 'src/hook/useTaskQuery';

const useHome = () => {
  const { data: projectData, isLoading: projectIsLoading } =
    useGetProjectQuery();
  const [backgroundColors, setBackgroundColors] = useState([]);

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

  /**
   * task data
   */

  const { data: taskData, isLoading: isTaskLoading } =
    useGetAllTaskAccordingToStatusForEachProject();

  console.log(taskData, ':::taskData');

  return {
    projectData,
    projectIsLoading,
    backgroundColors,
    taskData,
    isTaskLoading,
  };
};

export default useHome;
