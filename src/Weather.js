import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";

import Icon from "./Icons";
import Temperature from "./Temperature";
import Forecast from "./Forecast";
import DateComponent from "./DateComponent";

import sunny from "./media/sunny.png";

export default function Weather(props) {
  /* - - - STATES - - - */
  const [city, setCity] = useState("Tokyo");
  const [weather, setWeather] = useState(" ");
  const [loaded, setLoaded] = useState(false);

  /* - - - FUNCTIONS - - - */
  function getInput(e) {
    setCity(e.target.value);
  }

  function showWeather(result) {
    console.log(result.data);
    /* - - Getting the weather data from API - - */
    setWeather({
      name: city,
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

  /*function showForecast(forecast) {
    console.log(forecast.data);
  } */

  function formSubmit(e) {
    e.preventDefault();

    /* API: WEATHER DATA */
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=36c8bd885e1b84703cd48d295c95399d&units=metric`;
    axios.get(apiUrl).then(showWeather);

    /*
    // FORECAST API / 5 day / 3 hour forecast data 
    const forecastApi = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=36c8bd885e1b84703cd48d295c95399d&units=metric`;
    axios.get(forecastApi).then(showForecast);
    */
  }

  const baseContent = (
    <div className="newWeather">
      <div id="paddingContent">
        <form onSubmit={formSubmit}>
          <input type="text" onChange={getInput} />

          <button type="submit" value="Search">
            <i className="fas fa-search"></i>
          </button>
        </form>

        <header>
          <h1>Tokyo</h1>
          <div>
            <h6>few clouds</h6>
            <h6>Friday 12, 10:45AM</h6>
          </div>
        </header>

        <section className="main">
          <div className="icon">
            <img src={sunny} />
          </div>
          <div className="temperature">
            <p>
              <span className="tempValue">24</span> <a href="#">ºC</a> |{" "}
              <a href="#">F</a>
            </p>
          </div>
        </section>

        <section className="weatherData">
          <div className="dataValues">
            <p>Humidity</p>
            <p>Wind</p>
          </div>
          <div className="tempmax">
            <p>↑ 20ºC | ↓ 18ºC</p>
            <p>Feels like 16ºC</p>
          </div>
        </section>
      </div>
      <footer>
        <Forecast />
      </footer>
    </div>
  );

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

          <header>
            <h1>{weather.name}</h1>
            <div>
              <h6>{weather.description}</h6>
              <h6>
                <DateComponent date={weather.date} />
              </h6>
            </div>
          </header>

          <section className="main">
            <div className="icon">
              <Icon code={weather.icon} />
            </div>
            <Temperature temp={weather.temperature} />
          </section>

          <section className="weatherData">
            <div className="dataValues">
              <p>
                Humidity:
                <span> {weather.humidity}%</span>
              </p>
              <p>
                Wind:
                <span> {Math.round(weather.wind)}m/h</span>
              </p>
            </div>
            <div className="tempmax">
              <p>
                <span>↑ {Math.round(weather.tempmax)}ºC</span> |
                <span> ↓ {Math.round(weather.tempmin)}ºC</span>
              </p>
              <p>Feels like {Math.round(weather.feelslike)}ºC</p>
            </div>
          </section>
        </div>
        <footer>
          <Forecast city={weather.name} />
        </footer>
      </div>
    );
  } else {
    return baseContent;
  }
}

/* - - - - - - - - - - - - - - -  NOTES  - - - - - - - - - - - - */
/* 
a different way for the changing styles: 

1. create empty variables
2. assign the class name for those variables depending on the
weather description 
  (the css goes in the .css file)


let containerStyle = "";
    let forecastStyle = "";

    if (
      weather.description === "clear sky" ||
      weather.description === "few clouds"
    ) {
      containerStyle = "sunny";
      forecastStyle = "sunnyForecast";
    } else {
      if (
        weather.description === "scattered clouds" ||
        weather.description === "broken clouds" ||
        weather.description === "overcast clouds"
      ) {
        containerStyle = "clouds";
        forecastStyle = "cloudsForecast";
      } else {
        if (
          weather.description === "shower rain" ||
          weather.description === "rain"
        ) {
          containerStyle = "rain";
          forecastStyle = "rainForecast";
        } else {
          if (
            weather.description === "light snow" ||
            weather.description === "snow" ||
            weather.description === "mist"
          ) {
            containerStyle = "snow";
            forecastStyle = "snowForecast";
          }
        }
      }
    }

*/
