import React, { useState } from "react";
import axios from "axios";

//STYLE SHEETS
import "./Weather.css";

//REACT COMPONENTS
import WeatherInfo from "./WeatherInfo";
import Forecast from "./Forecast";

export default function Weather(props) {
  /* - - - STATES - - - */
  const [city, setCity] = useState(props.city);
  const [weather, setWeather] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [input, setInput] = useState("");
  /* - - - FUNCTIONS - - - */

  function search() {
    /* API: WEATHER DATA */
    const apiId = "7814e5944f598a9e5f5e2d1de4cadb44";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiId}&units=metric`;
    axios.get(apiUrl).then(showWeather);
  }

  function formSubmit(e) {
    e.preventDefault();
    search();
  }

  function showWeather(result) {
    /* - - Getting the weather data from API - - */
    setWeather({
      name: result.data.name,
      temperature: result.data.main.temp,
      tempmax: result.data.main.temp_max,
      tempmin: result.data.main.temp_min,
      feelslike: result.data.main.feels_like,
      date: new Date(result.data.dt * 1000),
      description: result.data.weather[0].description,
      wind: result.data.wind.speed,
      humidity: result.data.main.humidity,
      icon: result.data.weather[0].icon,
    });

    setLoaded(true);
  }

  //- - - - - - HERE THE UPDATED CONTENT LOADS - - - - - - //
  if (loaded) {
    let styles = {
      backgroundColor: "#yellow",
    };
    let stylesForecast = {
      backgroundColor: "#yellow",
    };

    let weatherIcon = "";
    if (
      //sunny
      weather.icon === "01d" ||
      weather.icon === "01n" ||
      weather.icon === "02d" ||
      weather.icon === "02n"
    ) {
      styles.backgroundColor = "#f5d98e";
    } else {
      if (
        //clouds
        weather.icon === "03d" ||
        weather.icon === "03n" ||
        weather.icon === "04d" ||
        weather.icon === "04n"
      ) {
        styles.backgroundColor = "#BFBFBF";
      } else {
        if (
          //rain
          weather.icon === "09d" ||
          weather.icon === "09n" ||
          weather.icon === "10d" ||
          weather.icon === "10n"
        ) {
          styles.backgroundColor = "#BBD5ED";
        } else {
          if (
            //snow & mist
            weather.icon === "13d" ||
            weather.icon === "13n" ||
            weather.icon === "50d" ||
            weather.icon === "50n"
          ) {
            styles.backgroundColor = "#D6E3F8";
          } else {
            if (
              //thunderstorm
              weather.icon === "11d" ||
              weather.icon === "11n"
            ) {
              styles.backgroundColor = "purple";
            }
          }
        }
      }
    }

    return (
      <div className="newWeather" style={styles}>
        <div id="paddingContent">
          <form onSubmit={formSubmit}>
            <input type="text" onChange={(e) => setCity(e.target.value)} />
            <button type="submit" value="Search">
              <i className="fas fa-search"></i>
            </button>
          </form>

          <WeatherInfo data={weather} />
        </div>
        <footer>
          <Forecast city={weather.name} />
        </footer>
      </div>
    );
  } else {
    search();
    return null;
  }
}
