import { createSlice } from "@reduxjs/toolkit";

const statusSlice = createSlice({
  name: "status",
  initialState: {
    total_status: [],
  },
  reducers: {
    totalStatus: (state, action) => {
      state.active_project = action.payload;
    },
  },
});

export const { totalStatus } = statusSlice.actions;
export const statusDataInStore = (state) => state.status;
export default statusSlice.reducer;
