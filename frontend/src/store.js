import { configureStore } from "@reduxjs/toolkit";
import userSlice from "src/redux/auth/userSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

export default store;
