import {LOGIN, LOGOUT, LOAD_USER} from '../../constants/index';
const defaultState = {
    username:null,
    id:null,
    area:null,
    rol:null,
    team:null,
    loaded:null
}
const  authReducer = (state=defaultState,action) =>{
    switch(action.type){
        case LOGIN:
            return{...state,  ...action.payload};
        case LOGOUT:
            return defaultState;
        case LOAD_USER:
            return {...action.payload,loaded:true};
        default:
            return state;
    }
}
export default authReducer;