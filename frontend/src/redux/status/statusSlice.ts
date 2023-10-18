import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/store';

/**
 * inteface
 */

interface IInitialState {
  total_status: string[] | [];
}

const initialState: IInitialState = {
  total_status: [],
};
const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    totalStatus: (state, action: PayloadAction<string[] | []>) => {
      state.total_status = action.payload;
    },
  },
});

export const { totalStatus } = statusSlice.actions;
export const statusDataInStore = (state: RootState) => state.status;
export default statusSlice.reducer;
