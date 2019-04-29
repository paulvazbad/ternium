import {
  GET_ACTIVE_SESSIONS,
  FAILED_ACTIVE_SESSIONS,
  FAILED_A_SESSION,
  FAILED_ATTEMPTS,
  NEW_SESSION,
  LOADING_NEW_SESSION,
  FAILED_NEW_SESSION
} from "../../constants/index";
import axios from "axios";

const linkBack = "http://terniumapp.herokuapp.com/";

//GET_ACTIVE_SESSIONS
const checkIfAll = currentSessions => {
  return (dispatch, getState) => {
    const failedConnections = [];
    const state = getState();
    let pastSessions = state.sessions.currentSessions;
    const failedAttempts = state.sessions.failedAttempts;
    currentSessions.map((value, index) => {
      console.log("Element in currentSessions" + value);
      let obj = pastSessions.find(o => o.deviceId === value.deviceId);
      if (!obj) {
        console.log("No lo encontro en el fetch");
        if (failedAttempts[obj.deviceId]) {
          if (failedAttempts[obj.deviceId] > 1) {
            console.log("Confirmed it is disconnected");
            failedConnections.push(obj.deviceId);
          } else {
            failedAttempts[obj.deviceId]++;
          }
        } else {
          failedAttempts[obj.value] = 0;
          console.log("No fallo la primera vez");
        }
      }
      console.log("Device  that failed this time: " + failedAttempts);
      console.log("Devices that failed several times now " + failedConnections);
      if (failedAttempts.size > 1) {
        dispatch({
          type: FAILED_ATTEMPTS,
          payload: failedAttempts
        });
      }

      if (failedConnections.size > 1) {
        dispatch({
          type: FAILED_A_SESSION,
          payload: failedConnections
        });
      }
      return false;
    });
  };
};

export const getActiveSessions = userInfo => {
  return dispatch => {
    //dummy session
    axios({
      method: "get",
      url: linkBack + "/api/sessions/active/", //userID,
      proxyHeaders: false,
      credentials: false
    })
      .then(response => {
        //define the  parameters of a  session
        console.log(response);
        checkIfAll(response.data);
        dispatch({
          type: GET_ACTIVE_SESSIONS,
          payload: response.data
        });
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: FAILED_ACTIVE_SESSIONS
        });
      });
  };
};
//NEW_SESSION
export const newSession = (deviceID, workerID, username) => {
  return dispatch => {
    console.log(
      "device ID " +
        deviceID +
        "worker ID " +
        workerID +
        "suerpvisor username" +
        username
    );
    dispatch({
      type:LOADING_NEW_SESSION
    });
    axios.post(linkBack + "api/sessions", {
      staff: workerID,
      supervisor: username,
      mac: deviceID
    }).then(response =>{
      dispatch({
        type: NEW_SESSION
      });
    })
    .catch(error =>{
      dispatch({
        type:FAILED_NEW_SESSION,
        payload:error
      })
    })
    
  };
};

//GET_PAST_SESSIONS
//END_SESSION
//CHECK_SESSIONS_ALIVE
