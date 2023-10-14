import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { IForTaskDisplaying } from 'src/common/Interface/Interface';
import { isCreateTaskModalOpen } from 'src/redux/boolean/booleanSlice';
import { statusDataInStore } from 'src/redux/status/statusSlice';
import {
  activeLink,
  activeTask,
  taskDataInStore,
} from 'src/redux/task/taskSlice';
import { useAppSelector } from '../redux/hooks';

/*
 * inteface
 */

interface IuseTaskComponent {
  backgroundColors: string[];
  taskData: IForTaskDisplaying[][];
}

interface IForTaskWithStatus {
  taskName: string;
  count: number;
}
const useTaskComponent = ({
  backgroundColors,
  taskData,
}: IuseTaskComponent) => {
  const [allTask, setAllTask] = useState<IForTaskDisplaying[]>([]);
  const dispatch = useDispatch();
  const [totalTask, setTotalTask] = useState<IForTaskWithStatus[] | null>(null);
  const { active_link } = useAppSelector(taskDataInStore);
  const { total_status } = useAppSelector(statusDataInStore);

  /**
   * set link when user click on that
   */
  const handleClickOnLink = (name: string) => {
    dispatch(activeLink(name));
  };

  /**
   * adding colors property and categorising the task and total task
   */
  useEffect(() => {
    if (!taskData) return;
    const taskWithCount: IForTaskWithStatus[] = [];

    total_status?.forEach((status: string) => {
      taskWithCount.push({ taskName: status, count: 0 });
    });

    taskData?.forEach((tasks) => {
      tasks?.forEach((task) => {
        const isAlreadyAddedTask = taskWithCount.find(
          (val) => val.taskName === task.status,
        );
        if (isAlreadyAddedTask) {
          isAlreadyAddedTask.count = isAlreadyAddedTask.count + 1;
        }
      });
    });

    console.log(taskWithCount, ':::taskWithCount');
    setAllTask(taskData.flat());
    setTotalTask(taskWithCount);
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

  const handleClickOnTask = (item: IForTaskDisplaying) => {
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
