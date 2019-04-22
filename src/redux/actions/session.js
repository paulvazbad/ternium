import { GET_ACTIVE_SESSIONS, FAILED_ACTIVE_SESSIONS } from "../../constants/index";
import axios from "axios";

const linkBack = "http://localhost:4000";

//GET_ACTIVE_SESSIONS
export const getActiveSessions = userInfo => {
    return dispatch => {
      //dummy user
      //userInfo.password = jwt.encode(userInfo.password,secret);
      console.log(userInfo.password);
      //validate user
      
        axios({
          method: "get",
          url: linkBack+"/api/sessions/active/",//userID,
          proxyHeaders: false,
          credentials: false,
        })
          .then(response => {
            console.log(response);
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
      
    }
  }
//GET_PAST_SESSIONS
//NEW_SESSION
//END_SESSION
//CHECK_SESSIONS_ALIVE
