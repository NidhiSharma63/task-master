import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "task",
  initialState: {
    active_task: {},
  },
  reducers: {
    activeTask: (state, action) => {
      state.active_task = action.payload;
    },
  },
});

export const { activeTask } = taskSlice.actions;
export const taskDataInStore = (state) => state.task;
export default taskSlice.reducer;
