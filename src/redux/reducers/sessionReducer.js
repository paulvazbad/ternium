/*
CurrentSessions: [],
PastSessions: [],

*/
import {
  GET_ACTIVE_SESSIONS,
  FAILED_ACTIVE_SESSIONS,
  FAILED_A_SESSION
} from "../../constants/index";
const defaultState = {
  currentSessions: [],
  pastSessions: [],
  failedAttempts: null,
  failedAllConnections: false,
  failedConnections: []
};
const sessionReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_ACTIVE_SESSIONS:
      return {
        ...state,
        failedConnection: true,
        pastSessions: state.currentSessions,
        currentSessions: action.payload
      };
    case FAILED_ACTIVE_SESSIONS:
      return { ...state, failedAllConnections: true };
    case FAILED_A_SESSION:
      return { ...state, failedConnections: action.payload };
    default:
      return state;
  }
};
export default sessionReducer;
