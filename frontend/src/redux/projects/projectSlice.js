import { createSlice } from "@reduxjs/toolkit";
import { KEY_FOR_STORING_ACTIVE_PROJECT } from "../../constant/Misc";
import { getValueFromLS } from "../../utils/localstorage";

const projectSlice = createSlice({
  name: "project",
  initialState: {
    active_project: getValueFromLS(KEY_FOR_STORING_ACTIVE_PROJECT),
    project_rename: {},
  },
  reducers: {
    activeProject: (state, action) => {
      state.active_project = action.payload;
    },
    projectRename: (state, action) => {
      state.project_rename = action.payload;
    },
  },
});

export const { activeProject, projectRename } = projectSlice.actions;
export const projectDataInStore = (state) => state.project;
export default projectSlice.reducer;
