import {LOGIN, LOGOUT} from '../../constants/index';
const defaultState = {
    username:null,
    id:null,
    area:null,
    rol:null,
    team:null
}
const  authReducer = (state=defaultState,action) =>{
    switch(action.type){
        case LOGIN:
            return{...state,  ...action.payload};
        case LOGOUT:
            return defaultState;
        default:
            return state;
    }
}
export default authReducer;