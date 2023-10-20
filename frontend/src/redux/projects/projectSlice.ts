import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { KEY_FOR_STORING_ACTIVE_PROJECT } from 'src/constant/Misc';
import { RootState } from 'src/store';
import { getValueFromLS } from 'src/utils/localstorage';

interface IProjectRename {
  projectName: string;
  projectId: string;
  color: string;
}

interface ProjectState {
  active_project: string | null; // Replace 'any' with the actual type of active_project
  project_rename: IProjectRename | null;
}

const initialState: ProjectState = {
  active_project: getValueFromLS(KEY_FOR_STORING_ACTIVE_PROJECT)?.activeProject,
  project_rename: null,
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    activeProject: (state, action: PayloadAction<string>) => {
      state.active_project = action.payload;
    },
    projectRename: (state, action: PayloadAction<IProjectRename | null>) => {
      state.project_rename = action.payload;
    },
  },
});

export const { activeProject, projectRename } = projectSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const projectDataInStore = (state: RootState) => state.project;
export default projectSlice.reducer;
