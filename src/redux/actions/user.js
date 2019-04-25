import {
  LOADED_WORKERS,
  SELECT_WORKER,
  SELECT_DEVICE,
  LOADED_DEVICES
} from "../../constants";
import axios from "axios";
const linkBack = process.env.REACT_APP_API_BACKEND;

const backedOn = false;
const workers = [
  {
    id: 23568428,
    name: "Eduardo Angulo Martinez",
    Lugar: "Molino Caliente 2",
    Area: "Aceria"
  },
  {
    id: 11821596,
    name: "Jose Gonzalez Gonzalez",
    Lugar: "Patio Pegi",
    Area: "Aceria"
  }
];
export const fetchWorkers = () => {
  return (dispatch, getState) => {
    const { auth } = getState();
    const user = auth.id;
    if (backedOn) {
      //FETCH workers from the api  here
      axios
        .get(linkBack + "/trabajadores?username=" + user)
        .then(function(response) {
          dispatch({
            type: LOADED_WORKERS,
            payload: response.data
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      dispatch({
        type: LOADED_WORKERS,
        payload: workers
      });
    }
  };
};

export const fetchDevices = () => {
  return (dispatch, getState) => {
    //FETCH workers from the api  here
    let devices = [];
    for (var i = 0; i < 10; i++) {
      let device = "Device " + Math.random() * 100;
      devices.push({ id: i, name: device });
    }
    dispatch({
      type: LOADED_DEVICES,
      payload: devices
    });
  };
};

export const setSelectedWorker = id => ({
  type: SELECT_WORKER,
  payload: id
});

export const setSelectedDevice = id => ({
  type: SELECT_DEVICE,
  payload: id
});
