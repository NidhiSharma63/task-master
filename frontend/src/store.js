import { configureStore } from "@reduxjs/toolkit";
import userSlice from "src/redux/auth/userSlice";
import booleanSlice from "src/redux/boolean/booleanSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    boolean: booleanSlice,
  },
});

export default store;
