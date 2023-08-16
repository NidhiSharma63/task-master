// import { statesOfTaskManager } from "../../constant/Misc";
// import {
//   useUpdateTaskQuery,
//   useUpdateTaskQueryWithStatus,
// } from "../../hook/useTaskQuery";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   booleanDataInStore,
//   isUpdatingTask,
// } from "../../redux/boolean/booleanSlice";
// import { isTaskDisplayed } from "../../redux/boolean/booleanSlice";
// import { useGetProjectQuery } from "../../hook/useProjectQuery";
// import { useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { useGetTaskAccordingToStatus } from "../../hook/useTaskQuery";
import { useGetColumnQuery } from "../useColumnQuery";
import { useDispatch, useSelector } from "react-redux";
import { totalStatus } from "../../redux/status/statusSlice";
import {
  booleanDataInStore,
  isUpdatingTask,
} from "../../redux/boolean/booleanSlice";
import {
  useUpdateTaskQueryWithStatus,
  useUpdateTaskQuery,
} from "../../hook/useTaskQuery";

const useBoard = () => {
  const { data: columnData } = useGetColumnQuery();
  const { mutate: updateTaskWithStatus } = useUpdateTaskQueryWithStatus();
  const { data } = useGetTaskAccordingToStatus();
  const [isAddColBtnClicked, setIsAddColBtnClicked] = useState(false);
  const dispatch = useDispatch();
  const { is_updating_task } = useSelector(booleanDataInStore);
  const [fff, setFff] = useState([]);
  const { mutate: updateTaskWithIndex } = useUpdateTaskQuery();
  /**
   * when ever value get's true set it to false
   */

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
      return fff;
    }
    return columnDataWithTaskProperty?.map((column) => ({
      ...column,
      tasks: data.flat().filter((task) => task?.status === column.name),
    }));
  }, [columnDataWithTaskProperty, data, is_updating_task, fff]);

  /**
   * handle dispaly column button
   */
  const handleClickOnAddColsBtn = () => {
    setIsAddColBtnClicked(true);
  };

  /**
   * handle drag end
   */
  const handleDragEnd = (result) => {
    const { source, destination } = result;
    const allTasksWithColumns = finalState;
    let finalStateOfTask = [];
    if (!destination) return;

    /**
     * if task is moved into same column
     */

    if (destination.droppableId === source.droppableId) {
      // find in which row task is drag and dropped
      // Get current state and its setter for the status
      const columnWhereTaskIsDragAndDrop = finalState.filter(
        (item) => item.name === destination.droppableId
      );

      // find which task is moved
      const movedTask = columnWhereTaskIsDragAndDrop[0]?.tasks[source.index];

      // for update
      const updateTaskForBE = {
        ...movedTask,
        currentIndex: destination.index,
      };

      // for local
      const updateTaskForLocal = {
        ...movedTask,
        index: destination.index,
      };

      // now update the local state as well

      /**
       * get all the task ( task is moving from top to bottom )
       */

      if (destination.index > source.index) {
        const allTheTaskThatHavelessIndexValueOfDestinationIndex =
          columnWhereTaskIsDragAndDrop[0]?.tasks
            .filter(
              (item) =>
                item.index <= destination.index && item.index !== source.index
            )
            .map((item) => ({ ...item, index: item.index - 1 }));

        // other remaining tasks
        const remainingTask = columnWhereTaskIsDragAndDrop[0]?.tasks.filter(
          (item) =>
            item.index > destination.index && item.index !== source.index
        );
        finalStateOfTask = [
          ...allTheTaskThatHavelessIndexValueOfDestinationIndex,
          ...remainingTask,
          updateTaskForLocal,
        ].sort((a, b) => a.index - b.index);

        /**
         * update the task in array as well
         */
        const updatedValues = allTasksWithColumns.map((item) => {
          if (item.name === destination.droppableId) {
            return { ...item, tasks: finalStateOfTask };
          }
          return item; // Return unchanged item for other columns
        });
        console.log(updatedValues, "::::::allTaskWithColumns");
        setFff(updatedValues);
      } else {
        /**
         * if task is moving from bottom to top
         */

        const allTaskToUpdate = columnWhereTaskIsDragAndDrop[0]?.tasks
          .filter(
            (item) =>
              item.index >= destination.index && item.index < source.index
          )
          .map((item) => ({ ...item, index: item.index + 1 }));

        // step - 2 find all task that have greater then index of destination
        const remaningTaskHavingIndexGreaterThanDestination =
          columnWhereTaskIsDragAndDrop[0]?.tasks.filter(
            (item) => item.index < destination.index
          );

        // step - 3 find all task that have less then index of source
        const remaningTaskHavingIndexLessThanDestination =
          columnWhereTaskIsDragAndDrop[0]?.tasks.filter(
            (item) => item.index > source.index
          );

        finalStateOfTask = [
          ...remaningTaskHavingIndexGreaterThanDestination,
          ...remaningTaskHavingIndexLessThanDestination,
          ...allTaskToUpdate,
          updateTaskForLocal,
        ].sort((a, b) => a.index - b.index);

        const updatedValues = allTasksWithColumns.map((item) => {
          if (item.name === destination.droppableId) {
            return { ...item, tasks: finalStateOfTask };
          }
          return item; // Return unchanged item for other columns
        });
        setFff(updatedValues);
      }
      // setShowRerender(true);
      dispatch(isUpdatingTask(true));
      updateTaskWithIndex(updateTaskForBE);
    } else {
      // find in which row task is drag and dropped
      // Get current state and its setter for the status
      const columnWhereTaskIsDragAndDrop = finalState.filter(
        (item) => item.name === destination.droppableId
      );

      /**
       * source tasks
       */
      const sourceOfTask = finalState.filter(
        (item) => item.name === source.droppableId
      );

      // find which task is moved
      const movedTask = sourceOfTask[0]?.tasks[source.index];

      // for payload
      const updateTask = {
        ...movedTask,
        status: destination.droppableId,
        currentIndex: destination.index,
        prevStatus: source.droppableId,
        prevIndex: source.index,
      };
      updateTaskWithStatus(updateTask);

      // for local
      const updateTaskInDestination = {
        ...movedTask,
        index: destination.index,
        status: destination.droppableId,
      };

      // remove the task from Active state and update the index

      const updatedIndexOfTaskInRangeOfSource = sourceOfTask[0]?.tasks
        ?.map((item) => {
          if (item.index === source.index) {
            // Skip the item with the same index as the source index
            return null; // Or return any unique value that won't be present in the actual data
          } else if (item.index > source.index) {
            return { ...item, index: item.index - 1 };
          } else {
            return item;
          }
        })
        .filter((item) => item !== null) // Filter out the skipped items directly
        .sort((a, b) => a.index - b.index);

      // add the task into destination state and update the index
      const updatedIndexOfTaskInRangeOfDestination =
        columnWhereTaskIsDragAndDrop[0]?.tasks?.map((item) => {
          if (item.index >= source.index) {
            return { ...item, index: item.index + 1 };
          } else {
            return item;
          }
        });

      const finalArrayWithDroppedTask = [
        ...updatedIndexOfTaskInRangeOfDestination,
        updateTaskInDestination,
      ].sort((a, b) => a.index - b.index);

      console.log(
        finalArrayWithDroppedTask,
        ":::final array with dropped task"
      );
      /**
       * final update
       */

      const updatedValues = allTasksWithColumns.map((item) => {
        if (item.name === destination.droppableId) {
          return { ...item, tasks: finalArrayWithDroppedTask };
        }
        if (item.name === source.droppableId) {
          return { ...item, tasks: updatedIndexOfTaskInRangeOfSource };
        }
        return item; // Return unchanged item for other columns
      });
      setFff(updatedValues);
      dispatch(isUpdatingTask(true));
      console.log(updatedValues, "::::updatedValues:::");
    }
  };

  // console.log(finalState, ":::::::::column Data::::::::::");
  return {
    finalState,
    isAddColBtnClicked,
    handleClickOnAddColsBtn,
    setIsAddColBtnClicked,
    handleDragEnd,
  };
};

export default useBoard;
