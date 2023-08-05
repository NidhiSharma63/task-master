import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import TaskBoxConatiner from "./components/TaskBoxConatiner";
import { useGetTaskAccordingToStatus } from "../../hook/useTaskQuery";
import BoardDrawer from "../../components/projectPage/components/BoardDrawer";
import { statesOfTaskManager } from "../../constant/Misc";
import { DragDropContext } from "react-beautiful-dnd";
import {
  useUpdateTaskQuery,
  useUpdateTaskQueryWithStatus,
} from "../../hook/useTaskQuery";
import { useSelector, useDispatch } from "react-redux";
import {
  booleanDataInStore,
  isUpdatingTask,
} from "../../redux/boolean/booleanSlice";
import { useGetProjectQuery } from "../../hook/useProjectQuery";
import { useNavigate } from "react-router-dom";
import { isTaskDisplayed } from "../../redux/boolean/booleanSlice";

const Board = () => {
  const dispatch = useDispatch();
  const { is_updating_task } = useSelector(booleanDataInStore);
  const { data, isLoading, status } = useGetTaskAccordingToStatus();
  const [inTodo, setInTodo] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [inPrority, setInPrority] = useState([]);
  const [inDone, setInDone] = useState([]);
  const { mutate } = useUpdateTaskQuery();
  const { data: projectData } = useGetProjectQuery();
  const { mutate: updateTaskWithStatus } = useUpdateTaskQueryWithStatus();
  const navigate = useNavigate();

  useEffect(() => {
    if (projectData?.projects?.length === 0) {
      navigate("/Dashboard");
    }
  }, [projectData]);

  const statusStates = {
    Todo: [inTodo, setInTodo],
    "In progress": [inProgress, setInProgress],
    "In priority": [inPrority, setInPrority],
    Done: [inDone, setInDone],
  };

  useEffect(() => {
    if (is_updating_task) return;
    // Only proceed if the data is loaded and not empty.
    if (!isLoading && data && data.length > 0) {
      // State and respective setters for each status

      // Iterate over each task status
      statesOfTaskManager.forEach((taskStatus) => {
        // Find the corresponding data items for the current task status
        const items = data.filter((item, i) => status[i] === taskStatus).flat();

        // Get current state and its setter for the status
        const [currentState, setter] = statusStates[taskStatus];

        // Convert both old and new data items to JSON for comparison
        const oldItemsJson = JSON.stringify(currentState);
        const newItemsJson = JSON.stringify(items);

        // If the data items for the current task status have changed...
        if (oldItemsJson !== newItemsJson) {
          // ...Update the state with the new data items.
          setter(items);
        }
      });
      dispatch(isTaskDisplayed(true));
      dispatch(isUpdatingTask(false));
    }
  }, [isLoading, data]);

  const hanldeDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    if (destination.droppableId === source.droppableId) {
      // find in which row task is drag and dropped
      // Get current state and its setter for the status
      const [activeState, acitveStateSetter] =
        statusStates[destination.droppableId];

      // find th updated task
      const moveAbleTask = activeState[source.index];

      // for updated
      const updatedTask = {
        ...moveAbleTask,
        currentIndex: destination.index,
      };
      // for local
      const updateTaskForLocal = {
        ...moveAbleTask,
        index: destination.index,
      };

      let finalStateOfTask = [];
      // now update the index ass well

      if (destination.index > source.index) {
        const allTheTaskThatHavelessIndexValueOfDestinationIndex = activeState
          .filter(
            (item) =>
              item.index <= destination.index && item.index !== source.index
          )
          .map((item) => ({ ...item, index: item.index - 1 }));

        // other remaining tasks
        const remainingTask = activeState.filter(
          (item) =>
            item.index > destination.index && item.index !== source.index
        );
        finalStateOfTask = [
          ...allTheTaskThatHavelessIndexValueOfDestinationIndex,
          ...remainingTask,
          updateTaskForLocal,
        ].sort((a, b) => a.index - b.index);
        acitveStateSetter(finalStateOfTask);
        finalStateOfTask = [];
      } else {
        // step - 1 find all task that are >= destination and < then source
        const allTaskToUpdate = activeState
          .filter(
            (item) =>
              item.index >= destination.index && item.index < source.index
          )
          .map((item) => ({ ...item, index: item.index + 1 }));

        // step - 2 find all task that have greater then index of destination
        const remaningTaskHavingIndexGreaterThanDestination =
          activeState.filter((item) => item.index < destination.index);
        // step - 3 find all task that have less then index of source
        const remaningTaskHavingIndexLessThanDestination = activeState.filter(
          (item) => item.index > source.index
        );

        finalStateOfTask = [
          ...remaningTaskHavingIndexGreaterThanDestination,
          ...remaningTaskHavingIndexLessThanDestination,
          ...allTaskToUpdate,
          updateTaskForLocal,
        ].sort((a, b) => a.index - b.index);

        acitveStateSetter(finalStateOfTask);
        finalStateOfTask = [];
      }
      mutate(updatedTask);
      dispatch(isUpdatingTask(true));

      return;
    }
    if (destination.droppableId !== source.droppableId) {
      // if (is_updating_task) return;
      const [activeState, settersActiveState] =
        statusStates[source.droppableId];
      const [destinationState, setterDestination] =
        statusStates[destination.droppableId];

      const moveAbleTask = activeState[source.index];

      // for payload
      const updateTask = {
        ...moveAbleTask,
        status: destination.droppableId,
        currentIndex: destination.index,
        prevStatus: source.droppableId,
        prevIndex: source.index,
      };
      updateTaskWithStatus(updateTask);

      // for local
      const updateTaskInDestination = {
        ...moveAbleTask,
        index: destination.index,
        status: destination.droppableId,
      };

      // remove the task from Active state and update the index

      const updatedIndexOfTaskInRangeOfSource = activeState
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

      const updatedIndexOfTaskInRangeOfDestination = destinationState?.map(
        (item) => {
          if (item.index >= source.index) {
            return { ...item, index: item.index + 1 };
          } else {
            return item;
          }
        }
      );

      const finalArrayWithDroppedTask = [
        ...updatedIndexOfTaskInRangeOfDestination,
        updateTaskInDestination,
      ].sort((a, b) => a.index - b.index);

      settersActiveState(updatedIndexOfTaskInRangeOfSource);
      setterDestination(finalArrayWithDroppedTask);
      dispatch(isUpdatingTask(true));
      return;
    }
  };

  return (
    <Grid
      container
      gap={2}
      sx={{
        position: "relative",
        height: "calc(100vh - 140px)",
        marginTop: 8,
        width: "1115px",
        pl: 3,
      }}
    >
      <DragDropContext onDragEnd={hanldeDragEnd}>
        <TaskBoxConatiner name={"Todo"} data={inTodo} />
        <TaskBoxConatiner name={"In progress"} data={inProgress} />
        <TaskBoxConatiner name={"In priority"} data={inPrority} />
        <TaskBoxConatiner name={"Done"} data={inDone} />
        <BoardDrawer />
      </DragDropContext>
    </Grid>
  );
};

export default Board;
