import React from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';



import * as f from './functions';

import './buttonsBox.css';
import '../App.css';


function ButtonsBox(){
    const dispatch = useDispatch();
    return (
        <div className="buttons_box">
            <div className="buttons flexCC">
                <div className="main_btn_box flexCC">
                    <div className="btn_title"><div>Menu główne</div></div>
                    <div className="main_btn flexCC"><div onClick={()=>dispatch({type: 'changeInput'})}>Nowe zadanie</div></div>
                    <div className="main_btn flexCC"><div>Zapisz dane</div></div>
                    <div className="main_btn flexCC"><div>Statystyki</div></div>
                </div>
                <div className="main_btn_box flexCC">
                    <div className="btn_title"><div>Filtry</div></div>
                    <div className="main_btn flexCC"><div>Praca</div></div>
                    <div className="main_btn flexCC"><div>Dom</div></div>
                    <div className="main_btn flexCC"><div>Czas wolny</div></div>
                    <div className="main_btn flexCC"><div>Inne</div></div>
                </div>
            </div>
        </div>
    )
}
export default ButtonsBox;