import { combineReducers } from "redux";
import {variables} from '../variables/variables';


function mainpageReducer(state = variables, action){
    switch (action.type){
        case 'toggleInfo': {
            return {
                ...state,
                infoStatus: action.payload
            }
        }
        case 'setActive': {
            return {
                ...state,
                [action.payload]: true
            }
        }
        case 'weapon_achievement': {
            return {
                ...state,
                [action.payload[0][action.payload[1]]]: true
            }
        }
        default:
        return state
    }
}


export const rootReducer = combineReducers({
    mainpage: mainpageReducer,
});