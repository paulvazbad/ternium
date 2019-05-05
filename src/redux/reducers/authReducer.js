import {LOGIN, LOGOUT, LOAD_USER, FETCHING_USER, FAILED_LOGIN} from '../../constants/index';
const defaultState = {
    username:null,
    area:null,
    rol:null,
    team:null,
    loaded:null,
    fetching:false,
    failed:false,
    x_auth_token:null,
}
const  authReducer = (state=defaultState,action) =>{
    switch(action.type){
        case LOGIN:
            return{...state,fetching:false, ...action.payload};
        case LOGOUT:
            return {...defaultState, loaded:true};
        case LOAD_USER:
            return {...action.payload,loaded:true};
        case FETCHING_USER:
        return {...state,fetching:true};
        case FAILED_LOGIN:
            return {...state, fetching:false,failed:true, loaded:true};
        default:
            return state;
    }
}
export default authReducer;