import React, { useEffect, useState } from "react";
import MonthPickerApp from './MonthPickerApp';
import asyncFetch from './AsyncFetch';
import './App.css';

import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';

const waterReservoirs = ["SHA", "ORO", "CLE", "NML", "SNL", "DNP", "BER"];
const waterReservoirsCapacityArray = [4552000, 3537577, 2447650, 2400000, 2041000, 2030000, 1602000];

function App() {
  const [tileTwoVisible, setTileTwoVisible] = useState(false)
  const [buttonText, setButtonText] = useState("See more")

  const [currentDate, setDate] = useState({month: 4, year: 2022});
  const [waterData, setWaterData] = useState([]);
  
  function changeYear(year) {
    setDate({month: currentDate.month, year: year})
  }

  function changeMonth(month) {
    setDate({month: month, year: currentDate.year})
  }

  function changeWaterData(waterData) {
    setWaterData(waterData);
  }

  function catchWaterData() {
    console.log(error);
  }

  asyncFetch({method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({month:   currentDate.month, year: currentDate.year})}, currentDate, changeWaterData, catchWaterData);
  
  function buttonClicked() {
    if (tileTwoVisible) {
      setTileTwoVisible(false);
      setButtonText("See more")
    } else {
      setTileTwoVisible(true);
      setButtonText("See less")
    }
  }

  return (
    <main>
      <div id="top-bar">
		<p id="bar-text">Water storage in California reservoirs</p>
      </div>
      <div id="main-holder">
        <div id="info-holder">
          <div id="tile-1">
            <div id="tile-1-holder">
				<p id="body-text-1">
					California's reservoirs are part of a <a href="https://www.ppic.org/wp-content/uploads/californias-water-storing-water-november-2018.pdf">complex water storage system</a>.  The State has very variable weather, both seasonally and from year-to-year, so storage and water management is essential.  Natural features - the Sierra snowpack and vast underground aquifers - provide more storage capacity,  but reservoirs are the part of the system that people control on a day-to-day basis.  Managing the flow of surface water through rivers and aqueducts, mostly from North to South, reduces flooding and attempts to provide a steady flow of water to cities and farms, and to maintain natural riparian habitats.  Ideally, it also transfers some water from the seasonal snowpack into long-term underground storage.  Finally, hydro-power from the many dams provides carbon-free electricity. 
				</p>
				<p id="body-text-2">
					California's water managers monitor the reservoirs carefully, and the state publishes daily data on reservoir storage.
				</p>
            <button id="see-more-button" onClick={buttonClicked}>{buttonText}</button>
            </div>
            <div id="tile-1-image-holder">
				<img id="lake-image" src="https://cdn.theatlantic.com/thumbor/HYdYHLTb9lHl5ds-IB0URvpSut0=/900x583/media/img/photo/2014/09/dramatic-photos-of-californias-historic-drought/c01_53834006/original.jpg"/>
				<p id="image-caption">Lake Oroville in the 2012-2014 drought. Image credit Justin Sullivan, from The Atlatic article Dramatic Photos of California's Historic Drought.</p>
            </div>
          </div>
          {tileTwoVisible && <div id="tile-2">
            <div id="graph-holder">
              <WaterChart waterData={waterData}/>
            </div>
            <div id="tile-2-holder">
				<p>
					Here's a quick look at some of the data on reservoirs from the <a href="https://cdec.water.ca.gov/index.html">California Data Exchange Center</a>, which consolidates climate and water data from multiple federal and state government agencies, and  electric utilities.  Select a month and year to see storage levels in the eleven largest in-state reservoirs.
				</p>
				<p id="change-month">Change month:</p>
            <MonthPickerApp 
              currentDate={currentDate} 
              changeMonthFunction={changeMonth}
              changeYearFunction={changeYear}
              />
            </div>
          </div>}
        </div>
      </div>
    </main>
  );
}

function WaterChart(props) {
  const waterReservoirsMap = new Map();
  waterReservoirsMap.set(0, "Shasta");
  waterReservoirsMap.set(1, "Ororville");
  waterReservoirsMap.set(2, "Trinity Lake");
  waterReservoirsMap.set(3, "New Melones");
  waterReservoirsMap.set(4, "San Luis");
  waterReservoirsMap.set(5, "Don Pedro");
  waterReservoirsMap.set(6, "Berryessa");

  let maxWaterLevel = {data: [], backgroundColor: 'rgb(120,199,227)', barThickness: 35};
  for (let i=0; i<waterReservoirsCapacityArray.length; i++) {
    maxWaterLevel.data.push(waterReservoirsCapacityArray[i]/100000);
  }
  let currentWaterLevel = {data: [], backgroundColor: 'rgb(66,145,152)', barThickness: 35};
  for (let i=0; i<props.waterData.length; i++) {
    currentWaterLevel.data.push(props.waterData[i].waterLevel/100000);
  }
  
  let graphData = {};
  graphData.labels = Array.from(waterReservoirsMap.values());
  graphData.datasets = [currentWaterLevel,maxWaterLevel];
  let graphOptions = {
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        }
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
            stepSize: 10
        }
      }
    },
  };
  return (
    <Bar options={graphOptions} data={graphData}/>    
  )
}

export default App;