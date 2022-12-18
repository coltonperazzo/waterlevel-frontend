import React, {useState} from 'react';
import MonthYearPicker from 'react-month-year-picker';
import './MonthPickerApp.css';

let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function MonthPickerApp(props) {
  let currentDate = props.currentDate;
  const [isVisible, setVisibility] = useState(false);
  
  function buttonClicked() {
    setVisibility(true);
  }

  function changeYear(year) {
    props.changeYearFunction(year);
  }

  function changeMonth(month) {
    props.changeMonthFunction(month);
    setVisibility(false);
  }
  
  if (isVisible) {
    return (
      <div>
        <button id="month-button" onClick={buttonClicked}>{monthNames[currentDate.month-1]} {currentDate.year}</button>
        <div id="month-holder">
          <MonthYearPicker
            selectedMonth = {currentDate.month}
            selectedYear = {currentDate.year}
            minYear={2000}
            maxYear={2022}
            onChangeYear = {changeYear}
            onChangeMonth = {changeMonth}
          />
        </div>
      </div>
    )
  } else {
    return (
      <button id="month-button" onClick={buttonClicked}>{monthNames[currentDate.month-1]} {currentDate.year}</button>
    )
  }
}

export default MonthPickerApp;