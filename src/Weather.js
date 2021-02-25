import React, { useState } from "react";
import "./Weather.css";
import DateComponent from "./DateComponent";
import sunny from "./media/sunny.png";
import overcast from "./media/overcast.png";
import clouds from "./media/clouds.png";
import rain from "./media/rain.png";
import snow from "./media/snow.png";
import mist from "./media/mist.png";

import axios from "axios";

export default function Weather(props) {
  /* - - - STATES - - - */
  const [city, setCity] = useState("Tokyo");
  const [weather, setWeather] = useState(" ");
  const [loaded, setLoaded] = useState(false);
  const [temperature, setTemperature] = useState(weather.temperature);
  /* - - - FUNCTIONS - - - */

  function showWeather(result) {
    console.log(result.data);
    /* - - Getting the weather data from API - - */
    setWeather({
      name: city,
      temperature: result.data.main.temp,
      tempmax: result.data.main.temp_max,
      tempmin: result.data.main.temp_min,
      date: new Date(result.data.dt * 1000),
      description: result.data.weather[0].description,
      wind: result.data.wind.speed,
      humidity: result.data.main.humidity,
      icon: result.data.weather[0].icon,
    });

    setLoaded(true);
  }

  // - - - TEMPERATURE CHANGE FUNCTIONS - - - //
  function toCelsius() {
    setTemperature(weather.temperature);
  }

  function toFahrenheit() {
    setTemperature((weather.temperature.value * 9) / 5 + 32);
  }

  function formSubmit(e) {
    e.preventDefault();
    /* API documentation */
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=36c8bd885e1b84703cd48d295c95399d&units=metric`;
    axios.get(apiUrl).then(showWeather);
  }
  function getInput(e) {
    setCity(e.target.value);
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
        <div className="forecast">
          <div className="forecastItem">
            <p className="time">9.00</p>
            <div>
              <img src={overcast} />
            </div>
            <p>
              <span className="forecastMax">24</span> |
              <span className="forecastMin">20</span>
            </p>
          </div>
          <div className="forecastItem">
            <p className="time">9.00</p>
            <div>
              <img src={rain} />
            </div>
            <p>
              <span className="forecastMax">24</span> |
              <span className="forecastMin">20</span>
            </p>
          </div>
          <div className="forecastItem">
            <p className="time">9.00</p>
            <div>
              <img src={rain} />
            </div>
            <p>
              <span className="forecastMax">24</span> |
              <span className="forecastMin">20</span>
            </p>
          </div>
          <div className="forecastItem">
            <p className="time">9.00</p>
            <div>
              <img src={sunny} />
            </div>
            <p>
              <span className="forecastMax">24</span> |
              <span className="forecastMin">20</span>
            </p>
          </div>
          <div className="forecastItem">
            <p className="time">9.00</p>
            <div>
              <img src={overcast} />
            </div>
            <p>
              <span className="forecastMax">24</span> |
              <span className="forecastMin">20</span>
            </p>
          </div>
        </div>
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
      weather.description === "clear sky" ||
      weather.description === "few clouds"
    ) {
      styles.backgroundColor = "#f5d98e";
      weatherIcon = "sunny";
    } else {
      if (
        weather.description === "scattered clouds" ||
        weather.description === "broken clouds" ||
        weather.description === "overcast clouds"
      ) {
        styles.backgroundColor = "#BFBFBF";
        weatherIcon = "clouds";
      } else {
        if (
          weather.description === "shower rain" ||
          weather.description === "rain"
        ) {
          styles.backgroundColor = "#0140dd";
          weatherIcon = "rain";
        } else {
          if (
            weather.description === "light snow" ||
            weather.description === "snow" ||
            weather.description === "mist"
          ) {
            styles.backgroundColor = "#D6E3F8";
            weatherIcon = "snow";
          } else {
            if (weather.description === "thunderstorm") {
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
              <img src={sunny} />
            </div>
            <div className="temperature">
              <p>
                <span className="tempValue">
                  {Math.round(weather.temperature)}
                </span>
                <a href="#" onClick={toCelsius}>
                  ºC
                </a>
                |
                <a href="#" onClick={toFahrenheit}>
                  F
                </a>
              </p>
            </div>
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
              <p>Feels like ºC</p>
            </div>
          </section>
        </div>
        <footer>
          <div className="forecast">
            <div className="forecastItem">
              <p className="time">9.00</p>
              <div>
                <img src={sunny} />
              </div>
              <p>
                <span className="forecastMax">24</span> |
                <span className="forecastMin">20</span>
              </p>
            </div>
            <div className="forecastItem">
              <p className="time">9.00</p>
              <div>
                <img src={overcast} />
              </div>
              <p>
                <span className="forecastMax">24</span> |
                <span className="forecastMin">20</span>
              </p>
            </div>
            <div className="forecastItem">
              <p className="time">9.00</p>
              <div>
                <img src={sunny} />
              </div>
              <p>
                <span className="forecastMax">24</span> |
                <span className="forecastMin">20</span>
              </p>
            </div>
            <div className="forecastItem">
              <p className="time">9.00</p>
              <div>
                <img src={rain} />
              </div>
              <p>
                <span className="forecastMax">24</span> |
                <span className="forecastMin">20</span>
              </p>
            </div>
            <div className="forecastItem">
              <p className="time">9.00</p>
              <div>
                <img src={snow} />
              </div>
              <p>
                <span className="forecastMax">24</span> |
                <span className="forecastMin">20</span>
              </p>
            </div>
          </div>
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
