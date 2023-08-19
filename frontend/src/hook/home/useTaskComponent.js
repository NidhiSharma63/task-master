import { useDispatch, useSelector } from "react-redux";
import { isCreateTaskModalOpen } from "../../redux/boolean/booleanSlice";
import {
  activeLink,
  activeTask,
  taskDataInStore,
} from "../../redux/task/taskSlice";
import { useEffect, useState } from "react";
import { statusDataInStore } from "../../redux/status/statusSlice";

const useTaskComponent = ({ backgroundColors, taskData }) => {
  const [allTask, setAllTask] = useState([]);
  const dispatch = useDispatch();
  const [totalTask, setTotalTask] = useState(null);
  const { active_link } = useSelector(taskDataInStore);
  const { total_status } = useSelector(statusDataInStore);

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
    if (!taskData) return;
    const taskWithStatus = [];
    taskData?.forEach((task, i) => {
      let indexForTask = 0;
      if (task?.length > 0) {
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

    setAllTask(taskData.flat());
    setTotalTask(taskWithStatus);
  }, [taskData, backgroundColors]);

  /**
   * return task according to active link
   */

  const getTaskToDisplay = () => {
    return allTask.filter((task) => task?.status === active_link);
  };

  /**
   * handle click on add task and open modal with empty values
   */

  const handleClickOnAddTask = () => {
    dispatch(activeTask({}));
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
    total_status,
    totalTask,
    active_link,
  };
};

export default useTaskComponent;
