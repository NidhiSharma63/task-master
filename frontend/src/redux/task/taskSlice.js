import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
  name: 'task',
  initialState: {
    active_task: {},
    active_link: 'Todo',
    dragged_task_id: null,
    dragged_task_index: null,
    dragged_task_status: null,
  },
  reducers: {
    activeTask: (state, action) => {
      state.active_task = action.payload;
    },
    activeLink: (state, action) => {
      state.active_link = action.payload;
    },
    draggedTaskId: (state, action) => {
      state.dragged_task_id = action.payload;
    },
    drggedTaskIndex: (state, action) => {
      state.dragged_task_index = action.payload;
    },
    draggedTaskStatus: (state, action) => {
      state.dragged_task_status = action.payload;
    },
  },
});

export const {
  activeTask,
  activeLink,
  draggedTaskId,
  drggedTaskIndex,
  draggedTaskStatus,
} = taskSlice.actions;
export const taskDataInStore = (state) => state.task;
export default taskSlice.reducer;
