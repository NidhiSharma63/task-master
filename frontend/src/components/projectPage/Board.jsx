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
      const [destinationState, destinationSetter] =
        statusStates[destination.droppableId];
      const [sourceState, sourceSetter] = statusStates[source.droppableId];

      // find th updated task
      const moveAbleTask = destinationState.splice(source.index, 1);
      // update the status

      const updatedTask = {
        ...moveAbleTask[0],
        currentIndex: destination.index,
      };

      // After updating task remove it from source task array

      mutate(updatedTask);
      return;
    }
    if (destination.droppableId !== source.droppableId) {
      if (is_updating_task) return;
      const [activeState, settersActiveState] =
        statusStates[source.droppableId];
      const [destinationState, setterDestination] =
        statusStates[destination.droppableId];
      console.log(activeState, "::source state");

      const moveAbleTask = activeState[source.index];

      console.log(source, ":::source", moveAbleTask);

      const updateTask = {
        ...moveAbleTask,
        status: destination.droppableId,
        currentIndex: destination.index,
      };
      updateTaskWithStatus(updateTask);

      settersActiveState((prev) =>
        prev.filter((_item, index) => index !== source.index)
      );
      setterDestination((prev) => [...prev, updateTask]);
      dispatch(isUpdatingTask(true));
      return;
    }
  };

  console.log(inTodo, ":::inTodo:::", inProgress, "::in progress");

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
