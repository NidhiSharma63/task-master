import useAllTaskAccordingToSatusQuery from "../useAllTaskAccordingToSatusQuery";
import { useState, useEffect } from "react";

const useInsight = ({ status }) => {
  const { useGetTaskQuery } = useAllTaskAccordingToSatusQuery(status);
  const { data, isLoading } = useGetTaskQuery();
  const [allProjects, setAllProjects] = useState([]);
  const [allTask, setAllTasks] = useState([]);
  const [bgColors, setBgColors] = useState([]);

  useEffect(() => {
    let tempData = [];
    if (status === "Insights") {
      data?.data?.forEach((item) => {
        // check if task status is already added or not
        const isAlreadyAddedProjectName = tempData.find(
          (val) => val.projectName === item.projectName
        );

        if (isAlreadyAddedProjectName) {
          isAlreadyAddedProjectName.task = isAlreadyAddedProjectName.task + 1;
        } else {
          tempData.push({
            task: 1,
            projectName: item.projectName,
            color: item.color,
          });
        }
      });
    } else {
      data?.data?.forEach((item) => {
        // check if project name is already added or not
        const isAlreadyAddedProjectName = tempData.find(
          (val) => val.projectName === item.projectName
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
    }
    /**
     * set the colors for each project
     */

    let allProjects = [];
    let allTaskOfEachProjects = [];
    let colorsForEachProjects = [];

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
        label: `Total Tasks ${status === "All" ? "" : "in" + status}`,
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
