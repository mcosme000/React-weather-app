import React, { useState } from "react";
import "./Weather.css";
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
      iconURL: `http://openweathermap.org/img/wn/${result.data.weather[0].icon}@2x.png`,
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
          <h6>few clouds</h6>
          <h6>Friday 12th, 10.45AM</h6>
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
            <p className="tempmax">max 20ºC | min 18ºC</p>
          </div>
        </section>

        <section className="weatherData">
          <p>
            <span>Humidity</span>
          </p>
          <p>Wind</p>
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

  let styles = {
    backgroundColor: "#yellow",
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px",
  };
  let stylesForecast = {
    backgroundColor: "#yellow",
  };

  //ESTILOS DE COLORES

  /*if (
    weather.description === "clear sky" ||
    weather.description === "few clouds"
  ) {
    styles.backgroundColor = "#f3e6b9";
    stylesForecast.backgroundColor = "#f5d98e";
  } else {
    if (
      weather.description === "scattered clouds" ||
      weather.description === "broken clouds"
    ) {
      styles.backgroundColor = "#BFBFBF";
      stylesForecast.background = "#96939B";
    } else {
      if (
        weather.description === "shower rain" ||
        weather.description === "rain"
      ) {
        styles.backgroundColor = "#e6e3d2";
        stylesForecast.backgroundColor = "#4472CA";
      } else {
        if (
          weather.description === "light snow" ||
          weather.description === "snow" ||
          weather.description === "mist"
        ) {
          styles.backgroundColor = "#D6E3F8";
          stylesForecast.backgroundColor = "blue";
        }
      }
    }
  }

  */

  const updatedContent = (
    <div className="newWeather">
      <div className="paddingContent" style={styles}>
        <form onSubmit={formSubmit}>
          <input type="text" onChange={getInput} />
          <button type="submit" value="Search">
            <i className="fas fa-search"></i>
          </button>
        </form>

        <header>
          <h1>{weather.name}</h1>
          <h6>{weather.description}</h6>
          <h6>{weather.date.getMinutes()}</h6>
        </header>

        <section className="main">
          <div className="icon">
            <img src={weather.iconUrl} />
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
          <p>
            Humidity:
            <span> {weather.humidity}%</span>
          </p>
          <p>
            Wind:
            <span> {Math.round(weather.wind)}m/h</span>
          </p>
        </section>
      </div>
      <footer style={stylesForecast}>
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
