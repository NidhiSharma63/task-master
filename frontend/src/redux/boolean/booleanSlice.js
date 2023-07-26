import { createSlice } from "@reduxjs/toolkit";

const booleanSlice = createSlice({
  name: "boolean",
  initialState: {
    is_project_name_modal_open: false,
    is_board_drawer_open: false,
    is_updating_task: false,
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
  },
});

export const { isProjectNameModalOpen, isBoardDrawerOpen, isUpdatingTask } =
  booleanSlice.actions;
export const booleanDataInStore = (state) => state.boolean;
export default booleanSlice.reducer;
