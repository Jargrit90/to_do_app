import React from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Calendar_day from "./calendar_day";
import Task from "./task";

import * as f from './functions';

import './calendar.css';
import '../App.css';
let index = 0;
let arr = Array.apply(null, Array(365)).map(el => <Calendar_day key={index++}/>);

function scrollPage(){
    let calendar_box = f.g(".calendar_box");
    let calendar_day = f.g(".calendar_day");
    let first_day = new Date('2023/01/01');
    let today = new Date();
    let day_length = 1000 * 60 * 60 * 24;
    let utc_first_day = Date.UTC(first_day.getFullYear(), first_day.getMonth(), first_day.getDate());
    let utc_today = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
    let diff = Math.floor((utc_today - utc_first_day)/day_length);
    let diff_px = (diff-2) * 80;
    if(diff_px > window.innerWidth/2){
        window.scrollTo(diff_px, 0);
    }
    for(let i = 0; i < diff; i++){
        f.change_element(calendar_day, i, ["style", "background-color", "lightgray"]);
    }
}
function Calendar(){
    const dispatch = useDispatch();
    let mainpage = useSelector(state => state.mainpage);
    useEffect(()=>{
        let month_arr = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
        let month_length = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let day_date = f.g(".day_date");
        let index_day = 1;
        let index_month = 0;
        for(let k = 0; k < day_date.length; k++){
            if(index_day > month_length[index_month]){
                index_day = 1;
                index_month += 1;
            }
            day_date[k].innerText = index_day + "/" + month_arr[index_month] + "/2023";
            index_day++;
        }
        scrollPage();
    },[]);
    let index = 0;
    let tasks = mainpage.tasks_array.map(el => <Task ended={el.ended} square_size={el.square_size} info_width={el.info_width} bg_color={el.background_color} color={el.text_color} date_2={el.date_2} date_1={el.date_1} top={el.top} left={el.left} category={el.category} desc={el.desc} title={el.title} height={el.height} width={el.width} id={index} key={index++}/>);
    return (
        <>
            <div className="calendar_box">
                {arr}
                <div className="tasks_container">
                    {tasks}
                </div>
            </div>
        </>
    )
}
export default Calendar;