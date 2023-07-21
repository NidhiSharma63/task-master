import { createSlice } from "@reduxjs/toolkit";
import { KEY_FOR_STORING_USER_DETAILS } from "src/constant/Misc";
import { getValueFromLS } from "src/utils/localstorage";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user_email: "",
  },
  reducers: {
    userEmail: (state) => {
      state.user_email = getValueFromLS(KEY_FOR_STORING_USER_DETAILS);
    },
  },
});

export const { userEmail } = userSlice.actions;
export const usersDataInStore = (state) => state.user;
export default userSlice.reducer;