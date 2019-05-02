/*
CurrentSessions: [],
PastSessions: [],

*/
import {
  GET_ACTIVE_SESSIONS,
  FAILED_ACTIVE_SESSIONS,
  FAILED_A_SESSION,
  NEW_SESSION,
  FAILED_NEW_SESSION,
  LOADING_NEW_SESSION,
  END_SESSION
} from "../../constants/index";
const defaultState = {
  currentSessions: [],
  pastSessions: [],
  failedAttempts: null,
  failedAllConnections: false,
  failedConnections: [],
  loading: true,
  usedDevices:[],
  usedWorkers:[]
};
const sessionReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_ACTIVE_SESSIONS:
      return {
        ...state,
        pastSessions: state.currentSessions,
        currentSessions: action.payload.sessions,
        usedDevices: action.payload.devices,
        usedWorkers: action.payload.workers,
        loading:false
      };
    case FAILED_ACTIVE_SESSIONS:
      return { ...state, failedAllConnections: true,loading:false };
    case FAILED_A_SESSION:
      return { ...state, failedConnections: action.payload };
    case NEW_SESSION:
      return { ...state, loading: false,succesful:true };
    case FAILED_NEW_SESSION:
      return {...state, loading:false, succesful:false}
    case LOADING_NEW_SESSION:
    return {...state, loading:true}
    case END_SESSION:
      return {...state,currentSessions:action.payload}
    default:
      return state;
  }
};
export default sessionReducer;
