import {
  LOADED_WORKERS,
  SELECT_WORKER,
  SELECT_DEVICE,
  LOADED_DEVICES,
  FAILED_DEVICES
} from "../../constants";
import axios from "axios";
const linkBack = "http://terniumapp.herokuapp.com/";


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
    const user = auth._id;
    console.log(user);
    //FETCH workers from the api  here
    axios
      .get(linkBack + "api/users/" + user)
      .then(function(response) {
        console.log('Fetched workers');
        console.log(response.data);
        dispatch({
          type: LOADED_WORKERS,
          payload: response.data.team
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
};

export const fetchDevices = () => {
  return (dispatch, getState) => {
    //FETCH workers from the api  here

    axios
      .get(linkBack + "api/devices")
      .then(response => {
        console.log("Devices fetched ");
        console.log(response);
        dispatch({
          type: LOADED_DEVICES,
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: FAILED_DEVICES,
          payload: error
        });
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
