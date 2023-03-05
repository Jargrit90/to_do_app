import './App.css';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ButtonsBox from './components/buttonsBox';
import InputData from './components/inputData';
import Calendar from './components/calendar';
function App() {
  const dispatch = useDispatch();
  let mainpage = useSelector(state => state.mainpage);
  return (
    <div className="App">
        <div className='app_container'>
            <ButtonsBox />
            <Calendar />
            {
                mainpage.inputDataBoolean === true ? <InputData /> : null
            }
        </div>
    </div>
  );
}

export default App;
