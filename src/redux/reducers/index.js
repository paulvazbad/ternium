import authReducer from "./authReducer";
import userReducer from "./userReducer";
import sessionReducer from "./sessionReducer";
import { combineReducers } from "redux";
const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  session:sessionReducer
});

export default rootReducer;
