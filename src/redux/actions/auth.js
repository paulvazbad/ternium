import { LOGIN, LOGOUT, LOAD_USER } from "../../constants/index";
import jwt from "jwt-simple";
const secret = process.env.REACT_APP_JWT_COOKIE;
export const logIn = (/*Optional parameter*/) => {
  return (dispatch, geState) => {
    //dummy user
    let newUser = {
      username: "abc",
      id: "A00819877",
      area: "aceria",
      rol: "eljefe",
      team: "lol"
    };
    //cookie
    let cookie = jwt.encode(newUser, secret);
    sessionStorage.setItem("username", cookie);
    dispatch({
      type: LOGIN,
      payload: newUser
    });
  };
};
export const loadUser = user => {
  return dispatch => {
    let cookie = "";
    let JSONUSer = {};
    cookie = sessionStorage.getItem("username");
    if (cookie) {
      const cachedUser = jwt.decode(cookie, secret);
      JSONUSer = cachedUser;
    }

    //Dispatch loadUser

    dispatch({
      type: LOAD_USER,
      payload: JSONUSer
    });
  };
};
export const logOut = (/*Optional parameter*/) => {
  return (dispatch, geState) => {
    sessionStorage.removeItem("username");
    dispatch({
      type: LOGOUT
    });
  };
};
