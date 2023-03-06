import React from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as f from './functions';

import './task.css';
import '../App.css';
/*title: task_title[0].value,
    date_1: task_date_1[0].value,
    date_2: task_date_2[0].value,
    desc: task_desc[0].value,
    category: task_category.value,
    left: left_position,
    top: top_position,
    width: task_width,
    height: task_height*/
function Task(props){
    let style={
        width: props.width + "px",
        height: props.height + "px",
        left: props.left + "px",
        top: props.top + "px"
    }
    return (
        <>
            <div className="task_box" style={style}>{props.title}</div>
        </>
    )
}
export default Task;