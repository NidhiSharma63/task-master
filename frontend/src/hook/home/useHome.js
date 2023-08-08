import { useGetProjectQuery } from "../useProjectQuery";
import { useEffect, useMemo, useState } from "react";
import { generateBackgroundColors } from "../../utils/generateRandomColor";
import { useGetAllTaskAccordingToStatusForEachProject } from "../useTaskQuery";

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

  return {
    projectData,
    projectIsLoading,
    backgroundColors,
    taskData,
    isTaskLoading,
  };
};

export default useHome;
