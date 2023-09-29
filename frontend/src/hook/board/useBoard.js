import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetProjectQuery } from '../../hook/useProjectQuery';
import {
  useGetTaskAccordingToStatus,
  useUpdateTaskQuery,
  useUpdateTaskQueryWithStatus,
} from '../../hook/useTaskQuery';
import {
  booleanDataInStore,
  isUpdatingTask,
} from '../../redux/boolean/booleanSlice';
import { totalStatus } from '../../redux/status/statusSlice';
import { useGetColumnQuery } from '../useColumnQuery';

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
    return columnData?.data?.map((item) => ({
      name: item.name,
      _id: item._id,
      tasks: [],
    }));
  }, [columnData]);

  /**
   * dispatch the action to save all the status(columns) in redux
   */
  useEffect(() => {
    const onlyColumns = columnData?.data?.map((item) => item.name);
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
      return columnDataWithTaskProperty?.map((column) => ({
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

  const handleDragEnd = useCallback(
    (result) => {
      if (!result) return;
      const { destination, source, draggableId } = result;
      if (!destination || !source) return;
      let finalData = finalState;

      // if user moved the task into same column

      if (destination.droppableId === source.droppableId) {
        // if source.index is equal to destination.index means task at same postition then do nothing

        if (source.index === destination.index) return;

        // check in which column task is moved
        const activeColumn = finalData.find(
          (item) => item?.name === source?.droppableId,
        )?.tasks;

        // find moved tasks
        let movedTask = activeColumn.find((task) => task?._id === draggableId);

        // update the index and also add the currentIndex property to update from backend
        let updatedTaskForBackend = {
          ...movedTask,
          currentIndex: destination?.index,
        };

        // update the index value of all the task from moved task
        const updatedColumnsValue = activeColumn?.map((task) => {
          const updatedTask = { ...task };

          /**
           * If destination.index is greater than source.index, it means the task is moved down,
           * so deduct -1 from all the task indexes that are next to the moved task
           */
          if (task.index === source.index) {
            updatedTask.index = destination.index;
          }
          if (destination.index > source.index) {
            if (task.index > source.index && task.index <= destination.index) {
              updatedTask.index = task.index - 1;
            }
          } else {
            if (task.index >= destination.index && task.index < source.index) {
              updatedTask.index = task.index + 1;
            }
          }
          // }
          return updatedTask;
        });

        let completeUpdatedTask = finalData.map((item) => {
          if (item.name === source.droppableId) {
            // Update the tasks property with activeColumn
            const updatedItem = { ...item, tasks: updatedColumnsValue };

            // Sort the tasks array within updatedItem based on the 'index' property
            updatedItem.tasks.sort((a, b) => a.index - b.index);

            return updatedItem;
          }
          return item; // Return the item as is for other columns
        });

        setFinalTaskUpdate(completeUpdatedTask);
        // dispatch(isBackDropLoaderDisplayed(true));
        // dispatch(isBackdropLoaderDisplayedForTask(true));
        dispatch(isUpdatingTask(true));
        updateTaskWithIndex(updatedTaskForBackend);
      } else {
        // find the columns from where task is moved
        const columnFromWhereTaskIsMoved = finalData.find(
          (item) => item?.name === source?.droppableId,
        )?.tasks;

        // find move task
        let movedTask = columnFromWhereTaskIsMoved.find(
          (task) => task.index === source.index,
        );

        // task to update frontend
        const updateTaskInFE = {
          ...movedTask,
          index: destination.index,
          status: destination.droppableId,
        };

        // update task in Backend
        const updateTaskInBE = {
          ...movedTask,
          status: destination.droppableId,
          currentIndex: destination.index,
          prevStatus: source.droppableId,
          prevIndex: source.index,
        };

        // now decrease -1 from all the tasks that are next to moved task
        const updatedTaskColumnFromWhereTaskIsMoved = columnFromWhereTaskIsMoved
          .filter((task) => task.index !== source.index)
          .map((task) => {
            //Shallow copy of task (potential immutability issue if nested objects/arrays exist)
            const taskToUpdate = { ...task };
            if (task.index > source.index) {
              taskToUpdate.index = task.index - 1;
            }
            return taskToUpdate;
          });

        // find the column where task is moved
        const columnWhereTaskIsMoved = finalData.find(
          (item) => item?.name === destination?.droppableId,
        )?.tasks;

        const updatedTaskWhereTaskIsMoved = columnWhereTaskIsMoved?.map(
          (task) => {
            let updateTask = { ...task };
            if (task.index >= destination.index) {
              updateTask.index = updateTask.index + 1;
            }
            return updateTask;
          },
        );

        // Then, push the new task into the updated array
        updatedTaskWhereTaskIsMoved.push(updateTaskInFE);

        let completeUpdatedTask = finalData.map((item) => {
          let updateTaskColumn = { ...item };

          if (updateTaskColumn.name === source.droppableId) {
            updateTaskColumn.tasks = updatedTaskColumnFromWhereTaskIsMoved;
            // Sort the tasks array within updateTaskColumn based on the 'index' property
            updateTaskColumn.tasks.sort((a, b) => a.index - b.index);
          }

          if (updateTaskColumn.name === destination.droppableId) {
            updateTaskColumn.tasks = updatedTaskWhereTaskIsMoved;
            // Sort the tasks array within updateTaskColumn based on the 'index' property
            updateTaskColumn.tasks.sort((a, b) => a.index - b.index);
          }

          return updateTaskColumn;
        });

        setFinalTaskUpdate(completeUpdatedTask);
        // dispatch(isBackDropLoaderDisplayed(true));
        dispatch(isUpdatingTask(true));
        updateTaskWithStatus(updateTaskInBE);
        // dispatch(isBackdropLoaderDisplayedForTask(true));
      }
    },
    [finalState, dispatch, updateTaskWithStatus, updateTaskWithIndex],
  );

  return {
    finalState,
    isAddColBtnClicked,
    handleClickOnAddColsBtn,
    setIsAddColBtnClicked,
    handleDragEnd,
    isLoading,
  };
};

export default useBoard;
