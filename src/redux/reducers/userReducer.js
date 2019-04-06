import { LOADED_WORKERS, SELECT_DEVICE, SELECT_WORKER, LOADED_DEVICES } from "../../constants";

const defaultState = {
  workers: null,
  selectedWorker: null,
  selectedDevice: null,
  devices:null
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
      return {...state, devices:action.payload};
    default:
      return state;
  }
};
export default userReducer;
