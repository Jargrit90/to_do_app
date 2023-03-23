import React from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';



import * as f from './functions';

import './buttonsBox.css';
import '../App.css';


function ButtonsBox(){
    const dispatch = useDispatch();
    let mainpage = useSelector(state => state.mainpage);
    let filterTasks = (name)=>{
        let tasks = f.g(".task_box");
        if(name === "wszystkie"){
            for(let i = 0; i < tasks.length; i++){
                f.change_element(tasks, i , ["style", "display", "flex"]);
            }
        }
        else {
            for(let i = 0; i < tasks.length; i++){
                if(tasks[i].classList.contains(name) === true){
                    f.change_element(tasks, i , ["style", "display", "flex"]);
                }
                else {
                    f.change_element(tasks, i , ["style", "display", "none"]);
                }
            }
        }
    }
    return (
        <div className="buttons_box">
            <div className="buttons flexCC">
                <div className="main_btn_box flexCC">
                    <div className="btn_title"><div>Menu główne</div></div>
                    <div className="main_btn flexCC"><div onClick={()=>dispatch({type: 'toggleBoolean', payload: 'inputDataBoolean'})}>Nowe zadanie</div></div>
                    <div className="main_btn flexCC"><div onClick={()=>{
                        let tasks_copy = [...mainpage.tasks_array];
                        let json = JSON.stringify(tasks_copy);
                        localStorage.setItem("tasks_array", json);
                    }}>Zapisz dane</div></div>
                    <div className="main_btn flexCC" onClick={()=>{
                        let json = localStorage.getItem("tasks_array");
                        let tasks_copy = JSON.parse(json);
                        console.log(tasks_copy);
                    }}><div>Wczytaj dane</div></div>
                    <div className="main_btn flexCC"><div onClick={()=>dispatch({type: 'toggleBoolean', payload: 'statistics'})}>Statystyki</div></div>
                </div>
                <div className="main_btn_box flexCC">
                    <div className="btn_title"><div>Filtry</div></div>
                    <div className="main_btn flexCC" onClick={()=>{filterTasks("wszystkie")}}><div>Wszytkie</div></div>
                    <div className="main_btn flexCC" onClick={()=>{filterTasks("praca")}}><div>Praca</div></div>
                    <div className="main_btn flexCC" onClick={()=>{filterTasks("dom")}}><div>Dom</div></div>
                    <div className="main_btn flexCC" onClick={()=>{filterTasks("czas_wolny")}}><div>Czas wolny</div></div>
                    <div className="main_btn flexCC" onClick={()=>{filterTasks("inne")}}><div>Inne</div></div>
                </div>
            </div>
        </div>
    )
}
export default ButtonsBox;