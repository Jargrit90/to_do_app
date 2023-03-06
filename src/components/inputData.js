import React from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as f from './functions';

import './inputData.css';
import '../App.css';

let task_arr;
function InputData(){
    const dispatch = useDispatch();
    let mainpage = useSelector(state => state.mainpage);
    
    let store_task = ()=>{
        task_arr = mainpage.tasks_array;
        let task_title = f.g(".task_title_input_value");
        let task_date_1 = f.g(".date_1_input_value");
        let task_date_2 = f.g(".date_2_input_value");
        let task_desc = f.g(".task_desc");
        let task_category = f.g("#task_category");
        let first_day = new Date('2023/01/01');
        let task_start = new Date(task_date_1[0].value);
        let task_end = new Date(task_date_2[0].value);
        let day_length = 1000 * 60 * 60 * 24;
        let utc_first_day = Date.UTC(first_day.getFullYear(), first_day.getMonth(), first_day.getDate());
        let utc_task_start = Date.UTC(task_start.getFullYear(), task_start.getMonth(), task_start.getDate());
        let utc_task_end = Date.UTC(task_end.getFullYear(), task_end.getMonth(), task_end.getDate());
        //let diff = Math.floor((utc_today - utc_first_day)/day_length);
        let left_position = Math.floor((utc_task_start - utc_first_day)/day_length);
        let task_width = Math.floor((utc_task_end - utc_task_start)/day_length);
        let top_position = 0;
        let task_height = 80;
        for(let i = 0; i < task_arr.length; i++){
            let tasks_date_start = task_arr[i].date_1;
            let tasks_date_end = task_arr[i].date_2;
            let task_arr_date_start = new Date(tasks_date_start);
            let task_arr_date_end = new Date(tasks_date_end);
            let utc_tasks_date_start = Date.UTC(task_arr_date_start.getFullYear(), task_arr_date_start.getMonth(), task_arr_date_start.getDate());
            let utc_tasks_date_end = Date.UTC(task_arr_date_end.getFullYear(), task_arr_date_end.getMonth(), task_arr_date_end.getDate());
            if((Math.floor((utc_task_start - utc_tasks_date_start)/day_length) >= 0 && Math.floor((utc_tasks_date_end - utc_task_start)/day_length) >= 1 && top_position === task_arr[i].top)||(Math.floor((utc_task_end - utc_tasks_date_start)/day_length) >= 1 && Math.floor((utc_tasks_date_end - utc_task_end)/day_length) >= 0 && top_position === task_arr[i].top))
            {
                top_position += task_height;
                i = 0;
            }
        }
        let obj = {
            title: task_title[0].value,
            date_1: task_date_1[0].value,
            date_2: task_date_2[0].value,
            desc: task_desc[0].value,
            category: task_category.value,
            left: left_position * 80,
            top: top_position,
            width: task_width * 80,
            height: task_height
        }
        
        task_arr.push(obj); 
    }
    let changeTitle = ()=>{
        let ttiv = f.g(".task_title_input_value");
        let ttiv_value = ttiv[0].value;
        dispatch({type: 'task_input_title', payload: ttiv_value});
    }
    return (
        <div className="input_box">
            <div className="task_bar flexCC"><div className="task_bar_value flexCC">{mainpage.task_input_title !== "" ? mainpage.task_input_title : "Tytuł"}<div className="close" onClick={()=>dispatch({type: 'changeInput'})}>X</div></div></div>
            <div className="task_title_box">
                <div className="part_title">Podaj tytuł zadania:</div>
                <div className="input_title">
                    <input type="text" className="task_title_input_value" onChange={()=>changeTitle()}/>
                </div>
            </div>
            <div className="task_dat_box">
                <div className="date">
                    <div className="part_title">Początek:</div>
                    <div className="input_date">
                        <input type="date" className="date_1_input_value"/>
                    </div>
                </div>
                <div className="date">
                    <div className="part_title">Koniec:</div>
                    <div className="input_date">
                        <input type="date" className="date_2_input_value"/>
                    </div>
                </div>
            </div>
            
            <div className="task_desc_box">
                <div className="part_title">Podaj opis zadania:</div>
                <div className="input_title">
                    <textarea className="task_desc"/>
                </div>
            </div>
            
            <div className="task_type_box">
                <div className="part_title">Wybierz typ zadania:</div>
                <div className="input_select">
                    <select name="category" id="task_category">
                        <option value="praca">Praca</option>
                        <option value="dom">Dom</option>
                        <option value="czas_wolny">Czas wolny</option>
                        <option value="inne">Inne</option>
                    </select> 
                </div>
            </div>
            <div className="task_submit flexCC">
                <div className="submit_btn flexCC" onClick={()=>{store_task(); dispatch({type: 'add_task', payload: task_arr}); dispatch({type: 'changeInput'}); dispatch({type: 'clear_input_title'}); }}>Zapisz</div>
            </div>
        </div>
    )
}

export default InputData;