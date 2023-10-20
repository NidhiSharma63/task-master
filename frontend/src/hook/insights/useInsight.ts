import { useEffect, useState } from 'react';
import { IForTaskDisplaying } from 'src/common/Interface/Interface';
import useAllTaskAccordingToSatusQuery from 'src/hook/useAllTaskAccordingToSatusQuery';
/**
 * interface
 */
interface IuseInsight {
  status: string;
}

interface ITempData {
  task: number;
  projectName: string;
  color: string;
}
const useInsight = ({ status }: IuseInsight) => {
  const { useGetTaskQuery } = useAllTaskAccordingToSatusQuery(status);
  const { data, isLoading } = useGetTaskQuery();
  const [allProjects, setAllProjects] = useState<string[]>([]);
  const [allTask, setAllTasks] = useState<number[]>([]);
  const [bgColors, setBgColors] = useState<string[]>([]);

  useEffect(() => {
    let tempData: ITempData[] = [];

    data?.data?.forEach((item: IForTaskDisplaying) => {
      // check if project name is already added or not
      const isAlreadyAddedProjectName = tempData.find(
        (val) => val.projectName === item.projectName,
      );

      if (isAlreadyAddedProjectName) {
        isAlreadyAddedProjectName.task = isAlreadyAddedProjectName.task + 1;
      }
      if (!isAlreadyAddedProjectName) {
        tempData.push({
          projectName: item.projectName,
          task: 1,
          color: item.color,
        });
      }
    });

    /**
     * set the colors for each project
     */

    let allProjects: string[] = [];
    let allTaskOfEachProjects: number[] = [];
    let colorsForEachProjects: string[] = [];

    tempData?.forEach((item) => {
      allProjects.push(item.projectName);
      allTaskOfEachProjects.push(item.task);
      colorsForEachProjects.push(item.color);
    });

    setAllProjects(allProjects);
    setAllTasks(allTaskOfEachProjects);
    setBgColors(colorsForEachProjects);
  }, [data, status]);

  const chartData = {
    labels: allProjects,
    datasets: [
      {
        label: `Total Tasks ${status === 'All' ? '' : 'in' + status}`,
        data: allTask,
        backgroundColor: bgColors,
        borderWidth: 1,
      },
    ],
  };

  return {
    data,
    isLoading,
    chartData,
    allProjects,
    allTask,
    bgColors,
  };
};

export default useInsight;
