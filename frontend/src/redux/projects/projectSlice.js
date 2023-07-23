import { createSlice } from "@reduxjs/toolkit";
import { KEY_FOR_STORING_ACTIVE_PROJECT } from "src/constant/Misc";
import { getValueFromLS } from "src/utils/localstorage";

const projectSlice = createSlice({
  name: "project",
  initialState: {
    active_project: getValueFromLS(KEY_FOR_STORING_ACTIVE_PROJECT),
  },
  reducers: {
    activeProject: (state, action) => {
      state.active_project = action.payload;
    },
  },
});

export const { activeProject } = projectSlice.actions;
export const projectDataInStore = (state) => state.project;
export default projectSlice.reducer;
