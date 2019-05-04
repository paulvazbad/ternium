import {
  GET_ACTIVE_SESSIONS,
  FAILED_ACTIVE_SESSIONS,
  FAILED_A_SESSION,
  FAILED_ATTEMPTS,
  NEW_SESSION,
  LOADING_NEW_SESSION,
  FAILED_NEW_SESSION,
  END_SESSION
} from "../../constants/index";
import axios from "axios";
const linkBack = process.env.REACT_APP_API_BACKEND;
//const linkBack = http://terniumapp.herokuapp.com/";

//GET_ACTIVE_SESSIONS
const checkIfAll = currentSessions => {
  return (dispatch, getState) => {
    const failedConnections = [];
    const state = getState();
    let pastSessions = state.sessions.currentSessions;
    const failedAttempts = state.sessions.failedAttempts;
    currentSessions.map((value, index) => {
      let obj = pastSessions.find(o => o.deviceId === value.deviceId);
      if (!obj) {
        if (failedAttempts[obj.deviceId]) {
          if (failedAttempts[obj.deviceId] > 1) {
            failedConnections.push(obj.deviceId);
          } else {
            failedAttempts[obj.deviceId]++;
          }
        } else {
          failedAttempts[obj.value] = 0;
        }
      }

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

export const getActiveSessions = username => {
  return dispatch => {
    axios({
      method: "get",
      url: linkBack + "/api/sessions", //userID,
      proxyHeaders: false,
      credentials: false
    })
      .then(response => {
        //define the  parameters of a  session

        checkIfAll(response.data);
        var devices = [];
        var workers = [];
        for (var i = 0; i < response.data.length; i++) {
          devices.push(response.data[i].mac);
          workers.push(response.data[i].staff.registrationId);
        }
        dispatch({
          type: GET_ACTIVE_SESSIONS,
          payload: {
            sessions: response.data,
            devices: devices,
            workers: workers
          }
        });
      })
      .catch(error => {
        dispatch({
          type: FAILED_ACTIVE_SESSIONS
        });
      });
  };
};
//NEW_SESSION
export const newSession = (deviceID, workerID, username) => {
  return (dispatch, getState) => {
    dispatch({
      type: LOADING_NEW_SESSION
    });
    axios
      .post(linkBack + "/api/sessions", {
        staff: workerID,
        supervisor: username,
        mac: deviceID
      })
      .then(response => {
        dispatch({
          type: NEW_SESSION
        });
      })
      .catch(error => {
        dispatch({
          type: FAILED_NEW_SESSION,
          payload: error
        });
      });
  };
};

//GET_PAST_SESSIONS
//END_SESSION

export const endSession = sessionId => {
  return (dispatch, getState) => {
    axios
      .delete(linkBack + "/api/sessions/" + sessionId)
      .then(response => {
        var sessions = getState().session.currentSessions;
        var newSessions = sessions.filter((value, index) => {
          return value._id !== sessionId;
        });
        console.log(newSessions);
        dispatch({
          type: END_SESSION,
          payload: newSessions
        });
      })
      .catch(error => {
        console.log("No pude borrar la sesion");
      });
  };
};
//CHECK_SESSIONS_ALIVE
