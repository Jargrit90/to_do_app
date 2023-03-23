import './App.css';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ButtonsBox from './components/buttonsBox';
import InputData from './components/inputData';
import Calendar from './components/calendar';
import TaskInfo from './components/taskInfo';
import Statystyki from './components/statistics';
function App() {
  const dispatch = useDispatch();
  let mainpage = useSelector(state => state.mainpage);
  useEffect(()=>{
      let json = localStorage.getItem("tasks_array");
      if(json === null){
          json = [];
      }
      else {
          let tasks_copy = JSON.parse(json);
          dispatch({type: "add_task", payload: tasks_copy});
      }
      
  },[]);
  return (
    <div className="App">
        <div className='app_container'>
            <ButtonsBox />
            <Calendar />
            {
                mainpage.inputDataBoolean === true ? <InputData /> : null
            }
            {
                mainpage.task_info ? <TaskInfo /> : null
            }
            {
                mainpage.statistics ? <Statystyki /> : null
            }
        </div>
    </div>
  );
}

export default App;
