import {LOGIN, LOGOUT} from '../../constants/index';

export const logIn = (/*Optional parameter*/ ) =>{
    return ({dispatch,geState}) => {
        //dummy user
        const user ={
            user:"abc",
            area:"aceria",
            rol:"eljefe",
            team:"lol"
        }
        //store in cookies
        dispatch({
            type:LOGIN,
            payload:user
        })
    }
}

export const logOut = (/*Optional parameter*/ ) =>{
    return ({dispatch,geState}) => {
        //dummy user
        //remove from in cookies
        dispatch({
            type:LOGOUT
        })
    }
}