import { useDispatch, useSelector } from "react-redux";
import { isCreateTaskModalOpen } from "../../redux/boolean/booleanSlice";
import {
  activeLink,
  activeTask,
  taskDataInStore,
} from "../../redux/task/taskSlice";
import { useEffect, useState } from "react";

const useTaskComponent = ({ backgroundColors, taskData }) => {
  const [allTask, setAllTask] = useState([]);
  const dispatch = useDispatch();
  const [totalTask, setTotalTask] = useState(null);
  const { active_link } = useSelector(taskDataInStore);

  /**
   * set link when user click on that
   */
  const handleClickOnLink = (name) => {
    dispatch(activeLink(name));
  };

  /**
   * adding colors property and categorising the task and total task
   */
  useEffect(() => {
    console.log("RUUNING");
    if (!taskData) return;
    const tempData = [];
    const taskWithStatus = [];
    taskData?.forEach((task, i) => {
      let index = 0;
      let indexForTask = 0;
      if (task.length > 0) {
        task.forEach((task) => {
          const isAlreadyAddedProjectName = tempData.find(
            (val) => val.projectName === task.projectName
          );
          if (isAlreadyAddedProjectName) {
            isAlreadyAddedProjectName.task = isAlreadyAddedProjectName.task + 1;
            tempData.push({ ...task, color: isAlreadyAddedProjectName.color });
          } else {
            tempData.push({ ...task, color: backgroundColors[index] });
            index += 1;
          }
        });
        task.forEach((task) => {
          const isAlreadyAddedTask = taskWithStatus.find(
            (val) => val.taskName === task.status
          );
          if (isAlreadyAddedTask) {
            isAlreadyAddedTask.count = isAlreadyAddedTask.count + 1;
          } else {
            taskWithStatus.push({ taskName: task.status, count: 1 });
            indexForTask += 1;
          }
        });
      }
    });

    setAllTask(tempData);
    setTotalTask(taskWithStatus);
  }, [taskData, backgroundColors]);

  /**
   * return task according to active link
   */

  const getTaskToDisplay = () => {
    return allTask.filter((task) => task.status === active_link);
  };

  /**
   * handle click on add task and open modal with empty values
   */

  const handleClickOnAddTask = () => {
    dispatch(isCreateTaskModalOpen(true));
  };

  /**
   * handle click on task and open a modal with pre-filled values
   */

  const handleClickOnTask = (item) => {
    dispatch(activeTask(item));
    dispatch(isCreateTaskModalOpen(true));
  };

  return {
    handleClickOnAddTask,
    handleClickOnTask,
    handleClickOnLink,
    getTaskToDisplay,
    allTask,
    totalTask,
  };
};

export default useTaskComponent;
