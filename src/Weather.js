import React, { useState } from "react";
import axios from "axios";

//STYLE SHEETS
import "./Weather.css";

//REACT COMPONENTS
import WeatherInfo from "./WeatherInfo";
import Forecast from "./Forecast";

//ICONS
import sunny from "./media/sunny.png";

export default function Weather(props) {
  /* - - - STATES - - - */
  const [city, setCity] = useState(props.city);
  const [weather, setWeather] = useState({});
  const [loaded, setLoaded] = useState(false);

  /* - - - FUNCTIONS - - - */

  function search() {
    /* API: WEATHER DATA */
    const apiId = "36c8bd885e1b84703cd48d295c95399d";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiId}&units=metric`;
    axios.get(apiUrl).then(showWeather);
  }

  function getInput(e) {
    setCity(e.target.value);
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
            <input type="text" onChange={getInput} />
            <button type="submit" value="Search">
              <i className="fas fa-search"></i>
            </button>
          </form>

          <WeatherInfo data={weather} />
        </div>
        <footer>
          <Forecast city={city} />
        </footer>
      </div>
    );
  } else {
    search();
    return null;
  }
}
