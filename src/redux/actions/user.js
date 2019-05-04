import {
  LOADED_WORKERS,
  SELECT_WORKER,
  SELECT_DEVICE,
  LOADED_DEVICES,
  FAILED_DEVICES,
  FAILED_USER,
  NEW_USER,
  DELETED_USER,
  GET_USERS
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
      .get(linkBack + "/api/users/" + user)
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
      .get(linkBack + "/api/devices")
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

export const setSelectedWorker = id => ({
  type: SELECT_WORKER,
  payload: id
});

export const setSelectedDevice = id => ({
  type: SELECT_DEVICE,
  payload: id
});
//Get users
export const getUsers = () => {
  return dispatch => {
    axios
      .get(linkBack + "/api/users")
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
    axios
      .put(linkBack + "/api/users", userInfo)
      .then(response => {
        dispatch({
          type: NEW_USER,
          payload: userInfo
        });
      })
      .catch(error => {
        dispatch({
          type: FAILED_USER,
          payload: 'Cant update user'
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
      .post(linkBack + "/api/users", userInfo)
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
      .delete(linkBack + "/api/users/", userInfo.username)
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
