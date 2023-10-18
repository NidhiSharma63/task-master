import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/store';
/**
 * interface
 */

/**
 * ACTIVE task obj
 */

interface IActiveTask {
  [key: string]: string | boolean | null | number;
}
interface IInitialState {
  [key: string]: string | null | IActiveTask;
}

const initialState: IInitialState = {
  active_task: {},
  active_link: 'Todo',
  dragged_task_id: null,
  dragged_task_index: null,
  dragged_task_status: null,
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    activeTask: (state, action: PayloadAction<IActiveTask>) => {
      state.active_task = action.payload;
    },
    activeLink: (state, action: PayloadAction<string>) => {
      state.active_link = action.payload;
    },
    draggedTaskId: (state, action: PayloadAction<string>) => {
      state.dragged_task_id = action.payload;
    },
    drggedTaskIndex: (state, action: PayloadAction<string>) => {
      state.dragged_task_index = action.payload;
    },
    draggedTaskStatus: (state, action: PayloadAction<string>) => {
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
export const taskDataInStore = (state: RootState) => state.task;
export default taskSlice.reducer;
