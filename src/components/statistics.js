import React from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as f from './functions';

import './statistics.css';
import '../App.css';

function Statystyki(){
    const dispatch = useDispatch();
    let mainpage = useSelector(state => state.mainpage);
    let statistics_data_copy = mainpage.statistics_data;
    
    let getTasksCategory = ()=>{
        let tasks = mainpage.tasks_array;
        statistics_data_copy.praca = 0;
        statistics_data_copy.dom = 0;
        statistics_data_copy.czas_wolny = 0;
        statistics_data_copy.inne = 0;
        statistics_data_copy.liczba_zadan = 0;
        statistics_data_copy.dlugosc_zadan = 0;
        statistics_data_copy.praca_percent = 0;
        statistics_data_copy.dom_percent = 0;
        statistics_data_copy.czas_wolny_percent = 0;
        statistics_data_copy.inne_percent = 0;
        statistics_data_copy.srednia_dlugosc_zadania = 0;
        statistics_data_copy.ukonczone_zadania = 0;
        statistics_data_copy.procent_ukonczonych = 0;
        statistics_data_copy.najdluzsze_zadanie = 0;
        for(let i = 0; i < tasks.length; i++){
            if(tasks[i].category === "praca"){statistics_data_copy.praca += 1;};
            if(tasks[i].category === "dom"){statistics_data_copy.dom += 1;};
            if(tasks[i].category === "czas_wolny"){statistics_data_copy.czas_wolny += 1;};
            if(tasks[i].category === "inne"){statistics_data_copy.inne += 1;};
            if(tasks[i].ended === true){statistics_data_copy.ukonczone_zadania += 1;};
            if(tasks[i].width/80 >= statistics_data_copy.najdluzsze_zadanie){
                statistics_data_copy.najdluzsze_zadanie = tasks[i].width/80;
            };
            statistics_data_copy.liczba_zadan += 1;
            statistics_data_copy.dlugosc_zadan += (tasks[i].width/80);
        }

        statistics_data_copy.praca_percent = ((statistics_data_copy.praca/statistics_data_copy.liczba_zadan)*100).toFixed(0);
        statistics_data_copy.dom_percent = ((statistics_data_copy.dom/statistics_data_copy.liczba_zadan)*100).toFixed(0);
        statistics_data_copy.czas_wolny_percent = ((statistics_data_copy.czas_wolny/statistics_data_copy.liczba_zadan)*100).toFixed(0);
        statistics_data_copy.inne_percent = ((statistics_data_copy.inne/statistics_data_copy.liczba_zadan)*100).toFixed(0);
        statistics_data_copy.srednia_dlugosc_zadania = (statistics_data_copy.dlugosc_zadan/statistics_data_copy.liczba_zadan).toFixed(2);
        statistics_data_copy.procent_ukonczonych = ((statistics_data_copy.ukonczone_zadania/statistics_data_copy.liczba_zadan)*100).toFixed(2);
        dispatch({type: 'statistics', payload: statistics_data_copy});

        let deg = (360 / mainpage.statistics_data.liczba_zadan).toFixed(2);
        let deg1 = (deg * mainpage.statistics_data.praca).toFixed(0);
        let deg2 = (deg * mainpage.statistics_data.dom).toFixed(0);
        let deg_2 = parseInt(deg1) + parseInt(deg2);
        let deg3 = (deg * mainpage.statistics_data.czas_wolny).toFixed(0);
        let deg_3 = parseInt(deg_2) + parseInt(deg3);
        let deg4 = (deg * mainpage.statistics_data.inne).toFixed(0);
        let deg_4 = parseInt(deg_3) + parseInt(deg4);
        if(deg_4 > 360){
            deg_4 = 360;
        }
        
        let radial_diagram = f.g(".radial_diagram");
        f.change_element(radial_diagram, 0, ["set_property", "--deg1", deg1 + "deg", "--deg2", deg_2 + "deg", "--deg3", deg_3 + "deg", "--deg4", deg_4 + "deg",]);
    }
    useEffect(()=>{
        getTasksCategory();
    },[]);
    return (
        <>
            <div className="statistics_box">
                <div className="close" onClick={()=>dispatch({type: 'toggleBoolean', payload: 'statistics'})}>X</div>
                <div className="statistics_main_title">STATYSTYKI</div>
                <div className="statistics_data flexCC">Liczba zadań: {mainpage.statistics_data.liczba_zadan}</div>
                <div className="statistics_data flexCC">Liczba ukończonych zadań: {mainpage.statistics_data.ukonczone_zadania} ({mainpage.statistics_data.procent_ukonczonych}%) </div>
                <div className="statistics_data flexCC">Średnia długość zadania w dniach: {mainpage.statistics_data.srednia_dlugosc_zadania} </div>
                <div className="statistics_data flexCC">Najdłuższe zadanie w dniach: {mainpage.statistics_data.najdluzsze_zadanie} </div>
                <div className="statistics_data flexCC">
                    <div className="category_statistics flexCC">Praca <div className="square_data square1"></div>: {mainpage.statistics_data.praca} ({mainpage.statistics_data.praca_percent}%)</div>
                    <div className="category_statistics flexCC">Dom <div className="square_data square2"></div>: {mainpage.statistics_data.dom} ({mainpage.statistics_data.dom_percent}%)</div>
                    <div className="category_statistics flexCC">Czas wolny <div className="square_data square3"></div>: {mainpage.statistics_data.czas_wolny} ({mainpage.statistics_data.czas_wolny_percent}%)</div>
                    <div className="category_statistics flexCC">Inne <div className="square_data square4"></div>: {mainpage.statistics_data.inne} ({mainpage.statistics_data.inne_percent}%)</div>
                </div>
                <div className="statistics_diagram flexCC">
                    <div className="radial_diagram"></div>
                </div>
            </div>
        </>
    )
}
export default Statystyki;