import { LOGIN, LOGOUT, LOAD_USER, FAILED_LOGIN, FETCHING_USER } from "../../constants/index";
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
     
    //dummy user
    //userInfo.password = jwt.encode(userInfo.password,secret);
    //validate user
    dispatch({
      type:FETCHING_USER
    });
    axios({
      method: "post",
      url: linkBack + "/api/auth/",
      proxyHeaders: false,
      credentials: false,
      data: { username: userInfo.username, password: userInfo.password }
    })
      .then(response => {
        //IF LOGIN SUCCESSFUL
         
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
             
            let newUser = { ...response.data, x_auth_token:x_auth_token };
            if (!response.data.rol) {
               
              newUser = { ...response.data, rol: "SA" };
            }
            dispatch({
              type: LOGIN,
              payload: newUser
            });
          })
          .catch(error => {
             
            dispatch({
              type: FAILED_LOGIN
            });
          });
      })
      .catch(error => {
         
        //Decide what to do in this case
         
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
       dispatch({
         type:FETCHING_USER
       })
      const cachedUser = jwt.decode(cookie, secret);
      JSONUSer = cachedUser;
      axios
        .post(linkBack + "/api/auth", JSONUSer)
        .then( response => {
          x_auth_token = response.data;
          //Delete this          
           
          axios({
            method: "get",
            url: linkBack + "/api/users/me",
            proxyHeaders: false,
            credentials: false,
            headers: { "x-auth-token": x_auth_token }
          })
            .then(response => {
              let newUser = { ...response.data, x_auth_token:x_auth_token };
              dispatch({
                type: LOAD_USER,
                payload: newUser
              });
            })
            .catch(error => {
               
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
