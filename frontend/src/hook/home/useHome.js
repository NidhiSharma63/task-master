import { useGetProjectQuery } from "../useProjectQuery";
import { useMemo } from "react";
import { generateBackgroundColors } from "../../utils/generateRandomColor";
import { useGetAllTaskAccordingToStatusForEachProject } from "../useTaskQuery";

const useHome = () => {
  const { data: projectData, isLoading: projectIsLoading } =
    useGetProjectQuery();

  const backgroundColors = useMemo(
    () => generateBackgroundColors(projectData?.projects || []),
    [projectData?.projects]
  );

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
