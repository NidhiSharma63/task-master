import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  IColumnItem,
  ITaskItem,
  IUpdatedColumnItem,
} from 'src/common/Interface/Interface';
import { useGetColumnQuery } from 'src/hook/useColumnQuery';
import { useGetProjectQuery } from 'src/hook/useProjectQuery';
import {
  useGetTaskAccordingToStatus,
  useUpdateTaskQuery,
  useUpdateTaskQueryWithStatus,
} from 'src/hook/useTaskQuery';
import {
  booleanDataInStore,
  isUpdatingTask,
} from 'src/redux/boolean/booleanSlice';
import { totalStatus } from 'src/redux/status/statusSlice';
import { taskDataInStore } from 'src/redux/task/taskSlice';

interface IExtendedItem extends ITaskItem {
  currentIndex: number;
}

const useBoard = () => {
  const { data: columnData, isLoading } = useGetColumnQuery();
  const { data } = useGetTaskAccordingToStatus();
  const { data: projectData } = useGetProjectQuery();
  const { mutate: updateTaskWithStatus } = useUpdateTaskQueryWithStatus();
  const [isAddColBtnClicked, setIsAddColBtnClicked] = useState(false);
  const dispatch = useDispatch();
  const { is_updating_task } = useSelector(booleanDataInStore);
  const [finalTaskUpdate, setFinalTaskUpdate] = useState([]);
  const { mutate: updateTaskWithIndex } = useUpdateTaskQuery();
  const { dragged_task_id, dragged_task_index, dragged_task_status } =
    useSelector(taskDataInStore);
  const navigate = useNavigate();

  /**
   * navigate the use to /Dashboard when user do not have any project
   */

  useEffect(() => {
    if (projectData?.projects?.length === 0) navigate('/Dashboard');
  }, [projectData, navigate]);

  /**
   * return colum data with adding tasks property
   */
  let columnDataWithTaskProperty = useMemo(() => {
    return columnData?.data?.map((item: IColumnItem) => ({
      name: item.name,
      _id: item._id,
      tasks: [],
    }));
  }, [columnData]);

  /**
   * dispatch the action to save all the status(columns) in redux
   */
  useEffect(() => {
    const onlyColumns = columnData?.data?.map((item: IColumnItem) => item.name);
    if (onlyColumns) {
      dispatch(totalStatus(onlyColumns));
    }
  }, [columnData, dispatch]);

  /**
   * add the task in each columns or status
   */

  let finalState = useMemo(() => {
    if (is_updating_task) {
      return finalTaskUpdate;
    }
    if (!is_updating_task) {
      return columnDataWithTaskProperty?.map((column: IUpdatedColumnItem) => ({
        ...column,
        tasks: data.flat().filter((task) => task?.status === column.name),
      }));
    }
  }, [columnDataWithTaskProperty, data, is_updating_task, finalTaskUpdate]);

  /**
   * handle dispaly column button
   */
  const handleClickOnAddColsBtn = () => {
    setIsAddColBtnClicked(true);
  };

  const onDrop = useCallback(
    (statusInWhichTaskMoved: string, id: number) => {
      if (id === undefined || !statusInWhichTaskMoved) return;

      /* find the task from where task is moved  */
      const columnFromTaskIsDragged = finalState.find(
        (item: IUpdatedColumnItem) => item.name === dragged_task_status,
      );

      const draggedTask = columnFromTaskIsDragged.tasks?.find(
        (item: ITaskItem) => item._id === dragged_task_id,
      );

      /* if task is moved into same column */
      if (columnFromTaskIsDragged.name === statusInWhichTaskMoved) {
        /**
         * if initial task is moved up and down
         */
        if (
          id === draggedTask.index ||
          (id === 1 && draggedTask.index === 0) ||
          dragged_task_index + 1 === id
        )
          return;

        /**
         * if task is moved to upside
         */
        if (id < dragged_task_index) {
          /**
           * setting the value for backend update
           */
          let draggedTaskValueForBackend: IExtendedItem = {
            ...draggedTask,
            currentIndex: id,
          };
          /**
           * filter the task which id is not same as dragged task id
           */
          const filterTheTaskWhichIsDragged =
            columnFromTaskIsDragged.tasks?.filter(
              (item: ITaskItem) => item._id !== dragged_task_id,
            );

          /**
           * increase the index+1 because task is moved to up side so we need to make the space for
           * dragged task but but only increase the index of task which index is less the index of
           * drgged task
           * ex- let's say we have four task A,B,C,D
           * now c is moved to 0th index then increase the index+1 of only A and B
           */

          const updateTheIndexOfTask = filterTheTaskWhichIsDragged?.map(
            (item: ITaskItem) => {
              const taskToUpdate = item;
              if (
                taskToUpdate.index < dragged_task_index &&
                taskToUpdate.index >= id
              ) {
                taskToUpdate.index = taskToUpdate.index + 1;
              }
              return taskToUpdate;
            },
          );
          /**
           * update the index of dragged task
           */
          const updatedDraggedTaskIndex = {
            ...draggedTask,
            index: id,
          };
          updateTheIndexOfTask.push(updatedDraggedTaskIndex);

          const finalUpdate = finalState.map((item: IUpdatedColumnItem) => {
            if (item.name === dragged_task_status) {
              return {
                ...item,
                tasks: updateTheIndexOfTask.sort(
                  (a: ITaskItem, b: ITaskItem) => a.index - b.index,
                ),
              };
            }
            return item;
          });

          setFinalTaskUpdate(finalUpdate);

          /**
           * calling the mutate function
           */
          updateTaskWithIndex(draggedTaskValueForBackend);
        }
        if (id > dragged_task_index) {
          /**
           * setting the value for backend update
           */
          let draggedTaskValueForBackend: IExtendedItem = {
            ...draggedTask,
            currentIndex: id - 1,
          };
          /**
           * filter the task which id is not same as dragged task id
           */

          const filterTheTaskWhichIsDragged =
            columnFromTaskIsDragged.tasks?.filter(
              (item: IUpdatedColumnItem) => item._id !== dragged_task_id,
            );

          /**
           * reduce the index by -1 because task is moved to downside..means let's assume we have A,B,C,D
           * and A task is moved to C place then reduce the index -1 of B AND C so that B can take C's position
           */
          const updateTheIndexOfTask = filterTheTaskWhichIsDragged.map(
            (item: ITaskItem) => {
              if (item.index <= id - 1 && item.index > dragged_task_index) {
                return { ...item, index: item.index - 1 };
              }
              return item;
            },
          );
          /**
           * update the index of dragged task
           */
          const updatedDraggedTaskIndex = {
            ...draggedTask,
            index: id - 1,
          };
          updateTheIndexOfTask.push(updatedDraggedTaskIndex);
          /**
           * update the state
           */
          const finalUpdate = finalState.map((item: IUpdatedColumnItem) => {
            if (item.name === dragged_task_status) {
              return {
                ...item,
                tasks: updateTheIndexOfTask.sort(
                  (a: ITaskItem, b: ITaskItem) => a.index - b.index,
                ),
              };
            } else {
              return item;
            }
          });

          setFinalTaskUpdate(finalUpdate);

          /**
           * calling the mutate function
           */
          updateTaskWithIndex(draggedTaskValueForBackend);
        }
      }
      /* if task is moved into another column */
      if (columnFromTaskIsDragged.name !== statusInWhichTaskMoved) {
        /**
         * update task for backend
         */
        // update task in Backend
        const updateTaskInBE = {
          ...draggedTask,
          status: statusInWhichTaskMoved,
          currentIndex: id,
          prevStatus: columnFromTaskIsDragged.name,
          prevIndex: dragged_task_index,
        };
        /**
         * find where task is move
         */
        const columnInWhichTaskIsMoved = finalState?.find(
          (item: IUpdatedColumnItem) => item.name === statusInWhichTaskMoved,
        );
        /**
         * increase the index by +1 all the tasks that are present next to id
         */

        const updatedColumInWhichTaskIsMoved =
          columnInWhichTaskIsMoved.tasks?.map((task: ITaskItem) => {
            if (task.index >= id) {
              return { ...task, index: task.index + 1 };
            }
            return task;
          });

        /**
         * update the index and status of dragged task
         */
        const updatedDraggedTaskIndex = {
          ...draggedTask,
          index: id,
          status: statusInWhichTaskMoved,
        };
        updatedColumInWhichTaskIsMoved.push(updatedDraggedTaskIndex);

        /**
         * remove the task from it's original column and reduce the index-1 and filter the
         * null task at the end
         */
        const removeDraggedTaskFromItsColumn = columnFromTaskIsDragged.tasks
          ?.map((task: ITaskItem) => {
            if (task._id === dragged_task_id) {
              return null;
            }
            if (task.index > dragged_task_index) {
              return { ...task, index: task.index - 1 };
            }
            return task;
          })
          .filter((item: ITaskItem | null) => item !== null);

        /**
         * update the state
         */
        const finalUpdate = finalState.map((item: IUpdatedColumnItem) => {
          if (item.name === statusInWhichTaskMoved) {
            return {
              ...item,
              tasks: updatedColumInWhichTaskIsMoved.sort(
                (a: ITaskItem, b: ITaskItem) => a.index - b.index,
              ),
            };
          }
          if (item.name === dragged_task_status) {
            return {
              ...item,
              tasks: removeDraggedTaskFromItsColumn.sort(
                (a: ITaskItem, b: ITaskItem) => a.index - b.index,
              ),
            };
          }
          return item;
        });
        setFinalTaskUpdate(finalUpdate);
        updateTaskWithStatus(updateTaskInBE);
      }
      dispatch(isUpdatingTask(true));
    },
    [
      dispatch,
      dragged_task_id,
      dragged_task_index,
      dragged_task_status,
      finalState,
      updateTaskWithIndex,
      updateTaskWithStatus,
    ],
  );

  return {
    finalState,
    isAddColBtnClicked,
    handleClickOnAddColsBtn,
    setIsAddColBtnClicked,
    onDrop,
    isLoading,
  };
};

export default useBoard;
