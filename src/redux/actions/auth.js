import { LOGIN, LOGOUT, LOAD_USER, FAILED_LOGIN } from "../../constants/index";
import axios from "axios";
import jwt from "jwt-simple";
// Encrypt with jwt standard encryption
const linkBack = process.env.REACT_APP_API_BACKEND;
let secret = process.env.REACT_APP_JWT_COOKIE;
let x_auth_token = null;
var newUser = {
  username: "noBackend",
  password: "noPass",
  name: "NoName Jimenez",
  rol: "SA",
  area: "REDI"
};

const backedOn = true;

export const logIn = userInfo => {
  return dispatch => {
    console.log(linkBack);
    //dummy user
    //userInfo.password = jwt.encode(userInfo.password,secret);
    //validate user

    axios({
      method: "post",
      url: linkBack + "/api/auth/",
      proxyHeaders: false,
      credentials: false,
      data: { username: userInfo.username, password: userInfo.password }
    })
      .then(response => {
        //IF LOGIN SUCCESSFUL
        console.log(response);
        //SAVE COOKIE WITH USERNAME&PASSWORD
        let cookie = jwt.encode(userInfo, secret);
        sessionStorage.setItem("user", cookie);

        //GET REST OF INFO
        x_auth_token = response.data;
        
        axios({
          method: "get",
          url: linkBack + "/api/users/me",
          proxyHeaders: false,
          credentials: false,
          headers: { "x-auth-token": x_auth_token }
        })
          .then(response => {
            console.log("SI PUDE RECIBIR EL RESTO DE LA INFO");
            console.log(response);
            let newUser = { ...response.data };
            if (!response.data.rol) {
              console.log("no rol in db");
              newUser = { ...response.data, rol: "SA" };
            }
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
      })
      .catch(error => {
        console.log("NO PUDE");
        //Decide what to do in this case
        console.log(error);
        dispatch({
          type: FAILED_LOGIN
        });
      });
  };
};

export const loadUser =  () => {
  return dispatch => {
    let cookie = "";
    let JSONUSer = {};
    cookie = sessionStorage.getItem("user");
    if (cookie) {
      console.log("FOUND A USER");
      const cachedUser = jwt.decode(cookie, secret);
      JSONUSer = cachedUser;
      axios
        .post(linkBack + "/api/auth", JSONUSer)
        .then( response => {
          x_auth_token = response.data;
          //Delete this          
          console.log(x_auth_token);
          axios({
            method: "get",
            url: linkBack + "/api/users/me",
            proxyHeaders: false,
            credentials: false,
            headers: { "x-auth-token": x_auth_token }
          })
            .then(response => {
              let newUser = { ...response.data };
              dispatch({
                type: LOAD_USER,
                payload: newUser
              });
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          sessionStorage.removeItem("user");
          dispatch({
            type: LOAD_USER,
            payload: {}
          });
        });
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
