import { combineReducers } from "redux";
import {variables} from '../variables/variables';


function mainpageReducer(state = variables, action){
    switch (action.type){
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
        case 'task_index': {
            return {
                ...state,
                task_index: action.payload
            }
        }
        case 'toggleBoolean': {
            return {
                ...state,
                [action.payload]: !state[action.payload]
            }
        }
        case 'statistics': {
            return {
                ...state,
                statistics_data: action.payload
            }
        }
        default:
        return state
    }
}


export const rootReducer = combineReducers({
    mainpage: mainpageReducer,
});