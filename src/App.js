import './App.css';
import React, { useState } from "react";
import Axios from "axios";

function App() {

  const [data, setData] = useState({})
  const [location, setlocation] = useState('')
  const api_key = '6a6892118054de9b8b5b79ad75395212'
  const units = 'metric'
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${api_key}&units=${units}`;


  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      Axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
        .catch(function (error) {
          console.log(error.toJSON());
        });
      setlocation('')
    }
  }

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={event => setlocation(event.target.value)}
          onKeyUp={searchLocation}
          placeholder='Enter Location'
          type="text">
        </input>
      </div>
      <div className="container">
        <div className="top">
          <div className="location"><h2>{data.name}</h2></div>
          <div className="temp">{data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null} </div>
          <div className="description"><p>{data.weather ? data.weather[0].description : null}</p>
          </div>
        </div>
        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              <p className='bold'>{data.main ? <h3>{data.main.feels_like.toFixed()}°C</h3> : null}</p>
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              <p className='bold'>{data.main ? <h3>{data.main.humidity.toFixed()}%</h3> : null}</p>
              <p>Humidity</p>
            </div>
            <div className="wind">
              <p className='bold'>{data.wind ? <h3>{data.wind.speed.toFixed()} MPH</h3> : null}</p>
              <p>Wind Speed</p>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
