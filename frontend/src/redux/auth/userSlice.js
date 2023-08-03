import { createSlice } from "@reduxjs/toolkit";
import { KEY_FOR_STORING_USER_DETAILS } from "./constant/Misc";
import { getValueFromLS } from "./utils/localstorage";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user_email: getValueFromLS(KEY_FOR_STORING_USER_DETAILS)?.email ?? "",
  },
  reducers: {
    userEmail: (state, action) => {
      state.user_email = action.payload;
    },
  },
});

export const { userEmail } = userSlice.actions;
export const usersDataInStore = (state) => state.user;
export default userSlice.reducer;
