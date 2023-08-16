import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./redux/auth/userSlice";
import booleanSlice from "./redux/boolean/booleanSlice";
import projectSlice from "./redux/projects/projectSlice";
import taskSlice from "./redux/task/taskSlice";
import statusSlice from "./redux/status/statusSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    boolean: booleanSlice,
    project: projectSlice,
    task: taskSlice,
    status: statusSlice,
  },
});

export default store;
