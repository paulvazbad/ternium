import {
  LOADED_WORKERS,
  SELECT_WORKER,
  SELECT_DEVICE,
  LOADED_DEVICES,
  FAILED_DEVICES,
  FAILED_USER,
  NEW_USER,
  DELETED_USER,
  GET_USERS,
  ERROR_NOTIFIED,
  LOADING_USERS,
  NEW_DEVICE,
  ERROR,
  NEW_WORKER
} from "../../constants";
import axios from "axios";
//const linkBack = "http://terniumapp.herokuapp.com";
const linkBack = process.env.REACT_APP_API_BACKEND;

export const fetchWorkers = () => {
  return (dispatch, getState) => {
    const { auth } = getState();
    const user = auth.username;

    //FETCH workers from the api  here
    axios
      .get("/api/users/" + user)
      .then(function(response) {
        var state = getState();
        let filteredWorkers = response.data.team.filter((value, index) => {
          console.log(value);
          console.log(state.session.usedWorkers);
          return !state.session.usedWorkers.includes(value.registrationId);
        });
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
      .get("/api/devices")
      .then(response => {
        let state = getState();

        let filteredDevices = response.data.filter((value, index) => {
          return !state.session.usedDevices.includes(value.mac);
        });

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

//New Device
export const newDevice = id => {
  return (dispatch, getState) => {
    //FETCH workers from the api  here
    let state = getState();
    console.log(state.session.usedDevices.includes(id));
    console.log(state.user.devices.includes(id));
    console.log(
      !(
        state.session.usedDevices.includes(id) ||
        state.user.devices.includes(id)
      )
    );
    const { x_auth_token } = getState().auth;
    axios({
      method: "post",
      url: "/api/devices",
      proxyHeaders: false,
      credentials: false,
      headers: { "x-auth-token": x_auth_token },
      data: { mac: id }
    })
      .then(response => {
        dispatch({
          type: NEW_DEVICE,
          payload: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
};

//newWorker


export const setSelectedWorker = id => ({
  type: SELECT_WORKER,
  payload: id
});

export const setSelectedDevice = id => {
  return (dispatch, getState) => {
    let state = getState();
    if (!state.session.usedDevices.includes(id)) {
      dispatch({
        type: SELECT_DEVICE,
        payload: id
      });
    } else {
      dispatch({
        type: ERROR,
        payload: "Device already in use"
      });
    }
  };
};
//Get users
export const getUsers = () => {
  return dispatch => {
    dispatch({
      type: LOADING_USERS
    });

    axios
      .get("/api/users")
      .then(response => {
        dispatch({
          type: GET_USERS,
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: FAILED_USER,
          payload: error.response.data
        });
      });
  };
};

//Edit User info
export const editUser = userInfo => {
  return dispatch => {
    const userExample = {
      name: "Jorge Sabella",
      password: "12345678",
      username: "jorge_andres1998@hotmail.com",
      area: "REDI",
      rol: "SA"
    };
    console.log(userInfo);
    axios
      .put("/api/users/" + userInfo.username, userInfo)
      .then(response => {
        dispatch({
          type: NEW_USER,
          payload: userInfo
        });
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: FAILED_USER,
          payload: "Cant update user"
        });
      });
  };
};

//Add new User
export const newUser = userInfo => {
  return dispatch => {
    const userExample = {
      name: "Jorge Sabella",
      password: "12345678",
      username: "jorge_andres1998@hotmail.com",
      area: "REDI",
      rol: "SA"
    };
    axios
      .post("/api/users", userInfo)
      .then(response => {
        dispatch({
          type: NEW_USER,
          payload: userInfo
        });
      })
      .catch(error => {
        dispatch({
          type: FAILED_USER,
          payload: error.response.data
        });
      });
  };
};

//Delete user
export const deleteUser = (userInfo, index) => {
  return dispatch => {
    const userExample = {
      name: "Jorge Sabella",
      password: "12345678",
      username: "jorge_andres1998@hotmail.com",
      area: "REDI",
      rol: "SA"
    };
    axios
      .delete("/api/users/" + userInfo.username)
      .then(response => {
        dispatch({
          type: DELETED_USER,
          payload: index
        });
      })
      .catch(error => {
        dispatch({
          type: FAILED_USER,
          payload: "Cant delete user"
        });
      });
  };
};
export const errorNotified = () => ({
  type: ERROR_NOTIFIED
});
