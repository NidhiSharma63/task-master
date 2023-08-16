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
import { useDispatch } from "react-redux";
import { totalStatus } from "../../redux/status/statusSlice";

const useBoard = () => {
  const { data: columnData } = useGetColumnQuery();
  const { data } = useGetTaskAccordingToStatus();
  const [isAddColBtnClicked, setIsAddColBtnClicked] = useState(false);
  const dispatch = useDispatch();

  /**
   * return colum data with adding tasks property
   */
  const columnDataWithTaskProperty = useMemo(() => {
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
  const finalState = useMemo(() => {
    return columnDataWithTaskProperty?.map((column) => ({
      ...column,
      tasks: data.flat().filter((task) => task?.status === column.name),
    }));
  }, [columnDataWithTaskProperty, data]);

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
      let finalStateOfTask = [];

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

        console.log(finalStateOfTask);
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
        console.log(finalStateOfTask, "from bottom to top");
      }

      // const movedTask = finalState[destination.droppableId];
      // console.log(movedTask);
    }
  };

  return {
    finalState,
    isAddColBtnClicked,
    handleClickOnAddColsBtn,
    setIsAddColBtnClicked,
    handleDragEnd,
  };
};

export default useBoard;
