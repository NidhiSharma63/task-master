import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/store';
/**
 * inteface
 */

interface IInitialState {
  [key: string]: boolean;
}

const initialState: IInitialState = {
  is_project_name_modal_open: false,
  is_board_drawer_open: false,
  is_updating_task: false,
  is_create_task_modal_open: false,
  is_task_displayed: false,
  is_back_Drop_loader_displayed: false,
  show_loader_for_task: false,
  is_backdrop_loader_displayed_for_projects: false,
  is_backdrop_loader_displayed_for_Columns: false,
  is_dialog_box_open: false,
  is_back_Drop_loader_displayed_for_page: false,
  is_backdrop_loader_displayed_for_Task: false,
};

const booleanSlice = createSlice({
  name: 'boolean',
  initialState,
  reducers: {
    isProjectNameModalOpen: (state, action: PayloadAction<boolean>) => {
      state.is_project_name_modal_open = action.payload;
    },
    isBoardDrawerOpen: (state, action: PayloadAction<boolean>) => {
      state.is_board_drawer_open = action.payload;
    },
    isUpdatingTask: (state, action: PayloadAction<boolean>) => {
      state.is_updating_task = action.payload;
    },
    isCreateTaskModalOpen: (state, action: PayloadAction<boolean>) => {
      state.is_create_task_modal_open = action.payload;
    },
    isTaskDisplayed: (state, action: PayloadAction<boolean>) => {
      state.is_task_displayed = action.payload;
    },
    isBackDropLoaderDisplayed: (state, action: PayloadAction<boolean>) => {
      state.is_back_Drop_loader_displayed = action.payload;
    },
    showLoaderForTask: (state, action: PayloadAction<boolean>) => {
      state.show_loader_for_task = action.payload;
    },
    isBackdropLoaderDisplayedForProjects: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      state.is_backdrop_loader_displayed_for_projects = action.payload;
    },
    isBackDropLoaderDisplayedForColumns: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      state.is_backdrop_loader_displayed_for_Columns = action.payload;
    },
    isDialogBoxOpen: (state, action: PayloadAction<boolean>) => {
      state.is_dialog_box_open = action.payload;
    },
    isBackDropLoaderDisplayedForPage: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      state.is_back_Drop_loader_displayed_for_page = action.payload;
    },
    isBackdropLoaderDisplayedForTask: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      state.is_backdrop_loader_displayed_for_Task = action.payload;
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
  isBackdropLoaderDisplayedForProjects,
  isBackDropLoaderDisplayedForColumns,
  isDialogBoxOpen,
  isBackDropLoaderDisplayedForPage,
  isBackdropLoaderDisplayedForTask,
} = booleanSlice.actions;
export const booleanDataInStore = (state: RootState) => state.boolean;
export default booleanSlice.reducer;
