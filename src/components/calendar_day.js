import React from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';



import * as f from './functions';

import './calendar_day.css';
import '../App.css';


function Calendar_day(){
    return (
        <>
            <div className="calendar_day">
                <div className="day_date flexCC"></div>
            </div>
        </>
    )
}
export default Calendar_day;