import { LOGIN, LOGOUT, LOAD_USER, FAILED_LOGIN } from "../../constants/index";
import axios from "axios";
import jwt from "jwt-simple";
// eslint-disable-next-line no-undef
const linkPost = "https://d31e1bb5-30af-411e-9746-26902dd9fc3a.mock.pstmn.io";
const secret = process.env.REACT_APP_JWT_COOKIE;

export const logIn = (/*Optional parameter*/) => {
  return dispatch => {
    //dummy user
    let newUser = {
      username: "A00819877",
      password: "good"
    };
    //validate user
  
    axios
      .post(linkPost + (newUser.password==="good"?"/auth/login":"/auth/loginbad"), newUser)
      .then(response => {
        let cookie = jwt.encode(newUser, secret);
        sessionStorage.setItem("user", cookie);
        dispatch({
          type: LOGIN,
          payload: response.data
        });
      })
      .catch(error =>
        dispatch({
          type: FAILED_LOGIN
        })
      );
  };
};

export const loadUser = () => {
  return dispatch => {
    let cookie = "";
    let JSONUSer = {};
    cookie = sessionStorage.getItem("user");
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
  return dispatch => {
    sessionStorage.removeItem("user");
    dispatch({
      type: LOGOUT
    });
  };
};
