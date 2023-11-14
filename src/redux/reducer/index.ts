import { combineReducers } from "redux";

import checkLogin from "./checkLogin";
import listTask from "./listTask";
import updateTask from "./updateTask";

const rootReducer = combineReducers({
  checkLogin: checkLogin,
  listTask: listTask,
  updateTask: updateTask,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
