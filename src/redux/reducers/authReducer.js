import {LOGIN, LOGOUT} from '../../constants/index';
const defaultState = {
    user:null,
    area:null,
    rol:null,
    team:null
}
const  authReducer = (state=defaultState,action) =>{
    switch(action.type){
        case LOGIN:
            return{...state,  ...action.payload};
        case LOGOUT:
            return{...state,user:null,area:null,rol:null,team:null};
        default:
            return state;
    }
}
export default authReducer;