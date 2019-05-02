import {
  LOADED_WORKERS,
  SELECT_WORKER,
  SELECT_DEVICE,
  LOADED_DEVICES,
  FAILED_DEVICES
} from "../../constants";
import axios from "axios";
//const linkBack = "http://terniumapp.herokuapp.com";
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
    const user = auth._id;
     
    //FETCH workers from the api  here
    axios
      .get(linkBack + "/api/users/" + user)
      .then(function(response) {
        var state = getState();
        let filteredWorkers = response.data.team.filter((value,index)=>{
          return !state.session.usedWorkers.includes(value.mac);
        })
        dispatch({
          type: LOADED_WORKERS,
          payload: filteredWorkers
        });
      })
      .catch(function(error) {
        console.log(error);
         console.log("Cant get workers");
      });
  };
};

export const fetchDevices = () => {
  return (dispatch, getState) => {
    //FETCH workers from the api  here

    axios
      .get(linkBack + "/api/devices")
      .then(response => {
        let state = getState();
         
        let filteredDevices = response.data.filter((value,index)=>{
          return !state.session.usedDevices.includes(value.mac);
        })
         
        dispatch({
          type: LOADED_DEVICES,
          payload: filteredDevices
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
