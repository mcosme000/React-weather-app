import React, { useState } from "react";
import "./newWeather.css";
import axios from "axios";

export default function NewWeather(props) {
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
      description: result.data.weather[0].description,
      wind: result.data.wind.speed,
      humidity: result.data.main.humidity,
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
      <div className="paddingContent">
        <form onSubmit={formSubmit}>
          <input type="text" onChange={getInput} />
          <button type="submit" value="Search">
            <i className="fas fa-search"></i>
          </button>
        </form>

        <header>
          <h1>Tokyo</h1>
          <h4>few clouds</h4>
          <h4>Friday 12th, 10.45AM</h4>
        </header>

        <section className="main">
          <div className="icon">
            <i className="far fa-sun"></i>
          </div>
          <div className="temperature">
            <p>
              <span className="tempValue">24</span> <a href="#">ºC</a> |{" "}
              <a href="#">F</a>
            </p>
            <p className="tempmax">
              <span>max 20ºC</span> | <span>min 18ºC</span>
            </p>
          </div>
        </section>

        <section className="weatherData">
          <ul>
            <li>
              <span>Humidity</span>
            </li>
            <li>
              <span>Wind</span>
            </li>
          </ul>
          <ul>
            <li></li>
            <li>2</li>
          </ul>
        </section>
      </div>
      <footer>
        <h5 className="title">Forecast</h5>
        <div className="forecast">
          <div className="forecastItem">
            <p className="time">9.00</p>
            <p>
              <i className="fas fa-sun"></i>
            </p>
            <p>
              <span className="forecastMax">24</span> |
              <span className="forecastMin">20</span>
            </p>
          </div>
          <div className="forecastItem">
            <p className="time">9.00</p>
            <p>
              <i className="fas fa-sun"></i>
            </p>
            <p>
              <span className="forecastMax">24</span> |
              <span className="forecastMin">20</span>
            </p>
          </div>
          <div className="forecastItem">
            <p className="time">9.00</p>
            <p>
              <i className="fas fa-sun"></i>
            </p>
            <p>
              <span className="forecastMax">24</span> |
              <span className="forecastMin">20</span>
            </p>
          </div>
          <div className="forecastItem">
            <p className="time">9.00</p>
            <p>
              <i className="fas fa-sun"></i>
            </p>
            <p>
              <span className="forecastMax">24</span> |
              <span className="forecastMin">20</span>
            </p>
          </div>
          <div className="forecastItem">
            <p className="time">9.00</p>
            <p>
              <i className="fas fa-sun"></i>
            </p>
            <p>
              <span className="forecastMax">24</span> |
              <span className="forecastMin">20</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );

  const updatedContent = (
    <div className="newWeather">
      <div className="paddingContent">
        <form onSubmit={formSubmit}>
          <input type="text" onChange={getInput} />
          <button type="submit" value="Search">
            <i className="fas fa-search"></i>
          </button>
        </form>

        <header>
          <h1>{weather.name}</h1>
          <h4>{weather.description}</h4>
          <h4>Friday 12th, 10.45AM</h4>
        </header>

        <section className="main">
          <div className="icon">
            <i className="far fa-sun"></i>
          </div>
          <div className="temperature">
            <p>
              <span className="tempValue">
                {Math.round(weather.temperature)}
              </span>{" "}
              <a href="#" onClick={toCelsius}>
                ºC
              </a>{" "}
              |{" "}
              <a href="#" onClick={toFahrenheit}>
                F
              </a>
            </p>
            <p className="tempmax">
              <span>max {Math.round(weather.tempmax)}ºC</span> |
              <span> min{Math.round(weather.tempmin)}ºC</span>
            </p>
          </div>
        </section>

        <section className="weatherData">
          <ul>
            <li>
              <span>{weather.humidity}%</span>
            </li>
            <li>
              <span>{Math.round(weather.wind)}km/h</span>
            </li>
          </ul>
          <ul>
            <li></li>
            <li>2</li>
          </ul>
        </section>
      </div>
      <footer>
        <h5 className="title">Forecast</h5>
        <div className="forecast">
          <div className="forecastItem">
            <p className="time">9.00</p>
            <p>
              <i className="fas fa-sun"></i>
            </p>
            <p>
              <span className="forecastMax">24</span> |
              <span className="forecastMin">20</span>
            </p>
          </div>
          <div className="forecastItem">
            <p className="time">9.00</p>
            <p>
              <i className="fas fa-sun"></i>
            </p>
            <p>
              <span className="forecastMax">24</span> |
              <span className="forecastMin">20</span>
            </p>
          </div>
          <div className="forecastItem">
            <p className="time">9.00</p>
            <p>
              <i className="fas fa-sun"></i>
            </p>
            <p>
              <span className="forecastMax">24</span> |
              <span className="forecastMin">20</span>
            </p>
          </div>
          <div className="forecastItem">
            <p className="time">9.00</p>
            <p>
              <i className="fas fa-sun"></i>
            </p>
            <p>
              <span className="forecastMax">24</span> |
              <span className="forecastMin">20</span>
            </p>
          </div>
          <div className="forecastItem">
            <p className="time">9.00</p>
            <p>
              <i className="fas fa-sun"></i>
            </p>
            <p>
              <span className="forecastMax">24</span> |
              <span className="forecastMin">20</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );

  if (loaded) {
    return updatedContent;
  } else {
    return baseContent;
  }
}
