import React from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as f from './functions';

import './task.css';
import '../App.css';

import TaskInfo from "./taskInfo";

function Task(props){
    let style={
        width: props.width + "px",
        height: props.height + "px",
        left: props.left + "px",
        top: props.top + "px",
        color: props.color
    }
    let style2 = {
        width: props.info_width + "px",
        backgroundColor: props.bg_color,
    }
    let square_left = {
        width: props.square_size + "px",
        height: props.square_size + "px",
        left: "calc(0px - "+props.square_size/2+"px)",
        backgroundColor: props.bg_color
    }
    let square_right = {
        width: props.square_size + "px",
        height: props.square_size + "px",
        right: "calc(0px - "+props.square_size/2+"px)",
        backgroundColor: props.bg_color
    }
    const dispatch = useDispatch();
    let mainpage = useSelector(state => state.mainpage);
    return (
        <>
            <div className={"task_box flexCC " + props.category} style={style} onClick={()=>{
                dispatch({type: 'toggleBoolean', payload: 'task_info'});
                dispatch({type: 'task_index', payload: props.id});
            }}>
                <div className="task_title flexCC">{props.title}{mainpage.tasks_array[props.id].ended ? <i className="fa-solid fa-star"></i>: null}</div>
                <div className="task_info_box flexCC" style={style2}>
                    <div className="square square_left" style={square_left}></div>
                    <div className="square square_right" style={square_right}></div>
                </div>
            </div>
        </>
    )
}
export default Task;