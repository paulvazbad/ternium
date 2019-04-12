import { LOGIN, LOGOUT, LOAD_USER, FAILED_LOGIN } from "../../constants/index";
import axios from "axios";
import jwt from "jwt-simple";
// Encrypt with jwt standard encryption
const linkBack = "http://localhost:4000";
let secret = process.env.REACT_APP_JWT_COOKIE;
var newUser = {
  username: "noBackend",
  password: "noPass",
  name:"NoName Jimenez",
  rol: "SA",
  area: "REDI",
  id: "13465"
};

const backedOn = true;
export const logIn = userInfo => {
  return dispatch => {
    //dummy user
    userInfo.password = jwt.encode(userInfo.password,secret);
    console.log(userInfo.password);
    //validate user
    if (backedOn) {
      axios({
        method: "post",
        url: linkBack+"/api/users/login",
        proxyHeaders: false,
        credentials: false,
        data: userInfo
      })
        .then(response => {
          console.log(response);
          let cookie = jwt.encode(userInfo, secret);
          sessionStorage.setItem("user", cookie);
          let newUser = { ...response.data};
          if(!response.data.rol){
            console.log("no rol in db");
             newUser = { ...response.data, rol:"SA"};
          }
          console.log(newUser);
          dispatch({
            type: LOGIN,
            payload: newUser
          });
        })
        .catch(error => {
          console.log(error);
          dispatch({
            type: FAILED_LOGIN
          });
        });
    }
    else{
      let cookie = jwt.encode(userInfo, secret);
      sessionStorage.setItem("user", cookie);
      dispatch({
        type: LOGIN,
        payload: newUser
      });
    }
  };
};

export const loadUser = () => {
  return dispatch => {
    let cookie = "";
    let JSONUSer = {};
    cookie = sessionStorage.getItem("user");
    if (cookie) {
      console.log("FOUND A USER");
      const cachedUser = jwt.decode(cookie, secret);
      JSONUSer = cachedUser;
      if(backedOn){
        axios
        .post(linkBack+"/api/users/login", JSONUSer)
        .then(response => {
          let newUser = { ...response.data};
          if(!response.data.rol){
            console.log("no rol in db");
             newUser = { ...response.data, rol:"SA"};
          }
          dispatch({
            type: LOAD_USER,
            payload: newUser
          });
        })
        .catch(error => {
          sessionStorage.removeItem("user");
          dispatch({
            type: FAILED_LOGIN
          });
        });
      }
      else{
        dispatch({
          type: LOAD_USER,
          payload: newUser
        });
      }
      
    } else {
      dispatch({
        type: LOAD_USER,
        payload: {}
      });
    }

    //Dispatch loadUser
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
