import React from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as f from './functions';

import './taskInfo.css';
import '../App.css';

function TaskInfo(){
    const dispatch = useDispatch();
    let mainpage = useSelector(state => state.mainpage);
    let changeTask = (num, option)=>{
        let tasks_copy = [...mainpage.tasks_array];
        if(option === "end"){
            tasks_copy[num].ended = true;
            dispatch({type: 'add_task', payload: tasks_copy});
            dispatch({type: 'task_info'});
        }
        if(option === "delete"){
            tasks_copy.splice(num, 1);
            dispatch({type: 'add_task', payload: tasks_copy});
            dispatch({type: 'task_info'});
        }
        if(option === "edit"){
            tasks_copy.splice(num, 1);
            dispatch({type: 'add_task', payload: tasks_copy});
            dispatch({type: 'task_info'});
            dispatch({type: 'changeInput'});
        }
    }
    return (
        <>
            <div className="task_info flexCC">
                <div className="task_info_data_box">
                    <div className="close" onClick={()=>dispatch({type: 'task_info'})}>X</div>
                    <div className="task_info_title">{mainpage.tasks_array[mainpage.task_index].title}</div>
                    <div className="task_info_date_box flexCC">
                        <div className="task_info_date_box_title"><b>Termin:</b></div>
                        <div className="task_info_date">{mainpage.tasks_array[mainpage.task_index].date_1} / {mainpage.tasks_array[mainpage.task_index].date_2}</div>
                    </div>
                    
                    <div className="task_info_category flexCC"><b>Kategoria: </b>   {mainpage.tasks_array[mainpage.task_index].category}</div>
                    <div className="task_info_desc_box flexCC">
                        <div className="task_info_date_box_title"><b>Opis zadania:</b></div>
                        <div className="task_info_desc">{mainpage.tasks_array[mainpage.task_index].desc}</div>
                    </div>
                    <div className="task_info_buttons_box flexCC">
                        {mainpage.tasks_array[mainpage.task_index].ended ? null : <div className="task_info_button" onClick={()=>{changeTask(mainpage.task_index, "end")}}>Zakończ zadanie</div>}
                        <div className="task_info_button" onClick={()=>{changeTask(mainpage.task_index, "delete")}}>Usuń zadanie</div>
                        <div className="task_info_button" onClick={()=>{changeTask(mainpage.task_index, "edit")}}>Edytuj zadanie</div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default TaskInfo;