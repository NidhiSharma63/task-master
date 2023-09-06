import { createSlice } from "@reduxjs/toolkit";

const booleanSlice = createSlice({
  name: "boolean",
  initialState: {
    is_project_name_modal_open: false,
    is_board_drawer_open: false,
    is_updating_task: false,
    is_create_task_modal_open: false,
    is_task_displayed: false,
    is_back_Drop_loader_displayed: false,
    show_loader_for_task: false,
    is_backdrop_loader_displayed_for_projects: false,
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
    isBackDropLoaderDisplayed: (state, action) => {
      state.is_back_Drop_loader_displayed = action.payload;
    },
    showLoaderForTask: (state, action) => {
      state.show_loader_for_task = action.payload;
    },
    isBackdropLoaderDisplayedForProjects: (state, action) => {
      state.is_backdrop_loader_displayed_for_projects = action.payload;
    },
  },
});

export const {
  isProjectNameModalOpen,
  isBoardDrawerOpen,
  isUpdatingTask,
  isCreateTaskModalOpen,
  isTaskDisplayed,
  isBackDropLoaderDisplayed,
  showLoaderForTask,
  isBackdropLoaderDisplayedForProjects
} = booleanSlice.actions;
export const booleanDataInStore = (state) => state.boolean;
export default booleanSlice.reducer;
