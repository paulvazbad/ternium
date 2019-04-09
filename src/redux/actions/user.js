import { LOADED_WORKERS, SELECT_WORKER, SELECT_DEVICE, LOADED_DEVICES } from "../../constants";
import axios from 'axios';
const linkGet = "https://d31e1bb5-30af-411e-9746-26902dd9fc3a.mock.pstmn.io";
export const fetchWorkers = () => {
  return (dispatch, getState) => {
    const { auth } = getState();
    const user = auth.id;
    axios.get(linkGet+"/trabajadores?username="+user)
    .then(function(response){
      dispatch({
        type: LOADED_WORKERS,
        payload: response.data
      });
    })
    .catch(function(error){
      console.log(error);
    })
    //FETCH workers from the api  here

   
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

export const setSelectedWorker = (id) =>({
    type:SELECT_WORKER,
    payload:id
})

export const setSelectedDevice = (id) =>({
    type: SELECT_DEVICE,
    payload: id
})