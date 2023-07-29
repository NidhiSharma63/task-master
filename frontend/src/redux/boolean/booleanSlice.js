import { createSlice } from "@reduxjs/toolkit";

const booleanSlice = createSlice({
  name: "boolean",
  initialState: {
    is_project_name_modal_open: false,
    is_board_drawer_open: false,
    is_updating_task: false,
    is_create_task_modal_open: false,
    is_task_displayed: false,
  },
  reducers: {
    isProjectNameModalOpen: (state, action) => {
      state.is_project_name_modal_open = action.payload;
    },
    isBoardDrawerOpen: (state, action) => {
      state.is_board_drawer_open = action.payload;
    },
    isUpdatingTask: (state, action) => {
      state.is_updating_task = action.payload;
    },
    isCreateTaskModalOpen: (state, action) => {
      state.is_create_task_modal_open = action.payload;
    },
    isTaskDisplayed: (state, action) => {
      state.is_task_displayed = action.payload;
    },
  },
});

export const {
  isProjectNameModalOpen,
  isBoardDrawerOpen,
  isUpdatingTask,
  isCreateTaskModalOpen,
  isTaskDisplayed,
} = booleanSlice.actions;
export const booleanDataInStore = (state) => state.boolean;
export default booleanSlice.reducer;
