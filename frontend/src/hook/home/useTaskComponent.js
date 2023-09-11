import { useDispatch, useSelector } from "react-redux";
import { isCreateTaskModalOpen } from "src/redux/boolean/booleanSlice";
import { activeLink, activeTask, taskDataInStore } from "src/redux/task/taskSlice";
import { useEffect, useState } from "react";
import { statusDataInStore } from "src/redux/status/statusSlice";

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

    total_status?.forEach((status) => {
      taskWithStatus.push({ taskName: status, count: 0 });
    });

    taskData?.forEach((tasks) => {
      tasks?.forEach((task) => {
        const isAlreadyAddedTask = taskWithStatus.find((val) => val.taskName === task.status);
        if (isAlreadyAddedTask) {
          isAlreadyAddedTask.count = isAlreadyAddedTask.count + 1;
        }
      });
    });
    setAllTask(taskData.flat());
    setTotalTask(taskWithStatus);
  }, [taskData, backgroundColors, total_status]);

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
