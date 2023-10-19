import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IForTaskDisplaying } from 'src/common/Interface/Interface';
import { RootState } from 'src/store';
/**
 * interface
 */

/**
 * ACTIVE task obj
 */

interface ITaskCard {
  active_task: IForTaskDisplaying | null;
  active_link: string;
  dragged_task_id: null | string;
  dragged_task_index: null | number;
  dragged_task_status: null | string;
}
const initialState: ITaskCard = {
  active_task: null,
  active_link: 'Todo',
  dragged_task_id: null,
  dragged_task_index: null,
  dragged_task_status: null,
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    activeTask: (state, action: PayloadAction<IForTaskDisplaying | null>) => {
      state.active_task = action.payload;
    },
    activeLink: (state, action: PayloadAction<string>) => {
      state.active_link = action.payload;
    },
    draggedTaskId: (state, action: PayloadAction<string | null>) => {
      state.dragged_task_id = action.payload;
    },
    drggedTaskIndex: (state, action: PayloadAction<number | null>) => {
      state.dragged_task_index = action.payload;
    },
    draggedTaskStatus: (state, action: PayloadAction<string | null>) => {
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
