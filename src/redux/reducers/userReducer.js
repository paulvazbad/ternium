import {
  LOADED_WORKERS,
  SELECT_DEVICE,
  SELECT_WORKER,
  LOADED_DEVICES,
  FAILED_DEVICES,
  NEW_USER,
  FAILED_USER,
  DELETED_USER,
  GET_USERS
} from "../../constants";

const defaultState = {
  workers: null,
  selectedWorker: null,
  selectedDevice: null,
  devices: null,
  users: [],
  error: null
};

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOADED_WORKERS:
      return { ...state, workers: action.payload };
    case SELECT_DEVICE:
      return { ...state, selectedDevice: action.payload };
    case SELECT_WORKER:
      return { ...state, selectedWorker: action.payload };
    case LOADED_DEVICES:
      return { ...state, devices: action.payload };
    case FAILED_DEVICES:
      return { ...state, devices: [] };
    case GET_USERS:
      return { ...state, users: action.payload };
    case NEW_USER:
      return { ...state, users: [...state.users, action.payload], error: null };
    case DELETED_USER:
      let newState = [...state];
      newState.splice(action.payload, 1);
      return { newState };
    case FAILED_USER:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
export default userReducer;
