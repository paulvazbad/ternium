import authReducer from "./authReducer";
import userReducer from "./userReducer";
import { combineReducers } from "redux";
const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer
});

export default rootReducer;
