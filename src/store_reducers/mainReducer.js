import { combineReducers } from "redux";
import {variables} from '../variables/variables';


function mainpageReducer(state = variables, action){
    switch (action.type){
        case 'changeInput': {
            return {
                ...state,
                inputDataBoolean: !state.inputDataBoolean
            }
        }
        case 'add_task': {
            return {
                ...state,
                tasks_array: action.payload
            }
        }
        case 'task_input_title': {
            return {
                ...state,
                task_input_title: action.payload
            }
        }
        case 'clear_input_title': {
            return {
                ...state,
                task_input_title: ""
            }
        }
        default:
        return state
    }
}


export const rootReducer = combineReducers({
    mainpage: mainpageReducer,
});