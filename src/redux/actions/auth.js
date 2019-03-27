import { LOGIN, LOGOUT, LOAD_USER } from "../../constants/index";

export const logIn = (/*Optional parameter*/) => {
  return ( dispatch, geState ) => {
    //dummy user
    const newUser = {
      username: "abc",
      id: "A00819877",
      area: "aceria",
      rol: "eljefe",
      team: "lol"
    };
    //cookie
    sessionStorage.setItem("username", JSON.stringify(newUser));
    dispatch({
      type: LOGIN,
      payload: newUser
    });
  };
};
export const loadUser = user => {
  return dispatch => {
    const cachedUser = sessionStorage.getItem("username");
      let JSONUSer = JSON.parse(cachedUser);
      //Dispatch loadUser

      dispatch({
          type:LOAD_USER,
          payload:JSONUSer
      });
  };
};
export const logOut = (/*Optional parameter*/) => {
  return ( dispatch, geState ) => {
    sessionStorage.removeItem("username");
    dispatch({
      type: LOGOUT
    });
  };
};
