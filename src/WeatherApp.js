import React, { useState } from "react";
import axios from "axios";
import "./weatherApp.css";

export default function WeatherApp(props) {
  /* - - - USE STATE CONSTS - - - */
  const [city, setCity] = useState(" ");
  const [weather, setWeather] = useState("");
  const [loaded, setLoaded] = useState(false);

  function showWeather(result) {
    console.log(result.data);

    setWeather({
      temperature: result.data.main.temp,
      feelslike: result.data.main.feels_like,
      tempmax: result.data.main.temp_max,
      tempmin: result.data.main.temp_min,
      humidity: result.data.main.humidity,
      wind: result.data.wind.speed,
      description: result.data.weather[0].description,
    });

    setLoaded(true);
  }

  function submitForm(e) {
    e.preventDefault();
    alert(`Getting data of ${city} city`);

    /* - - - API DATA - - - */
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=36c8bd885e1b84703cd48d295c95399d&units=metric`;
    axios.get(apiUrl).then(showWeather);
  }

  function getInput(e) {
    e.preventDefault();
    setCity(e.target.value);
  }

  const mainContent = (
    <div className="container">
      <header>
        <form onSubmit={submitForm}>
          <input
            type="text"
            placeholder="Search for a city"
            onChange={getInput}
          />
          <input type="submit" value="Search" />
        </form>
      </header>

      <section className="temperatureSection">
        <div className="temp">
          <p>
            <span id="tempValue">24</span>
            <span>
              <a href="#" id="celsius" className="active">
                ºC
              </a>{" "}
              |
              <a href="#" id="fa">
                F
              </a>{" "}
            </span>
          </p>
          <div className="tempM">
            <ul>
              <li>
                max <span id="tempmax"></span> / min <span id="tempmin"></span>
              </li>
              <li>
                Feels like <span id="feelTemp"></span>
              </li>
            </ul>
          </div>
        </div>
        <div className="icon">
          <img
            src="https://openweathermap.org/img/wn/01n@2x.png"
            id="icon"
          ></img>
        </div>
      </section>

      <section className="citySection">
        <div className="city">
          <h1 id="cityName">City</h1>
        </div>

        <div className="information">
          <div>
            <p id="date">Local time</p>
            <p>
              <span id="description">weather description</span>
            </p>
          </div>

          <div>
            <ul>
              <li>
                Wind speed: <span id="wind"></span>
              </li>
              <li>
                Humidity: <span id="humidity"></span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <footer>
        <div className="forecast">
          <p id="day1">9:00</p>
          <img
            src="https://openweathermap.org/img/wn/01n@2x.png"
            id="icon1"
          ></img>
          <p id="temp1">
            <strong>
              <span id="temp1-max">10</span>º{" "}
            </strong>{" "}
            / <span id="temp1-min">8</span>º
          </p>
        </div>

        <div className="forecast">
          <p id="day2">12:00</p>
          <img
            src="https://openweathermap.org/img/wn/01n@2x.png"
            id="icon2"
          ></img>
          <p id="temp2">
            <strong>
              <span id="temp2-max">10</span>º{" "}
            </strong>{" "}
            / <span id="temp2-min">8</span>º
          </p>
        </div>

        <div className="forecast">
          <p id="day3">15:00</p>
          <img
            src="https://openweathermap.org/img/wn/01n@2x.png"
            id="icon3"
          ></img>
          <p id="temp3">
            <strong>
              <span id="temp3-max">10</span>º{" "}
            </strong>{" "}
            / <span id="temp3-min">8</span>º
          </p>
        </div>

        <div className="forecast">
          <p id="day4">18.00</p>
          <img
            src="https://openweathermap.org/img/wn/01n@2x.png"
            id="icon4"
          ></img>
          <p id="temp4">
            <strong>
              <span id="temp4-max">10</span>º{" "}
            </strong>{" "}
            / <span id="temp4-min">8</span>º
          </p>
        </div>

        <div className="forecast">
          <p id="day5">21:00</p>
          <img
            src="https://openweathermap.org/img/wn/01n@2x.png"
            id="icon5"
          ></img>
          <p id="temp5">
            <strong>
              <span id="temp5-max">10</span>º{" "}
            </strong>{" "}
            / <span id="temp5-min">8</span>º
          </p>
        </div>
      </footer>

      <div className="row links">
        <div className="col location">
          <a href="#" className="geolocation" id="geolocation">
            📍Geolocation
          </a>
          <p id="locationInfo"></p>
        </div>

        <div className="col">
          <p>
            <a href="https://github.com/mcosme000">Open-source code</a> by Maria
            C.
          </p>
        </div>
      </div>
    </div>
  );

  const updatedContent = (
    <div className="container">
      <header>
        <form onSubmit={submitForm}>
          <input
            type="text"
            placeholder="Search for a city"
            onChange={getInput}
          />
          <input type="submit" value="Search" />
        </form>
      </header>

      <section className="temperatureSection">
        <div className="temp">
          <p>
            <span className="tempValue">{Math.round(weather.temperature)}</span>
            <span>
              <a href="#" id="celsius" className="active">
                ºC
              </a>{" "}
              |
              <a href="#" id="fa">
                F
              </a>{" "}
            </span>
          </p>
          <div className="tempM">
            <ul>
              <li>
                max <span>{Math.round(weather.tempmax)}</span> / min{" "}
                <span>{Math.round(weather.tempmin)}</span>
              </li>
              <li>
                Feels like <span>{Math.round(weather.feelslike)}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="icon">
          <img
            src="https://openweathermap.org/img/wn/01n@2x.png"
            id="icon"
          ></img>
        </div>
      </section>

      <section className="citySection">
        <div className="city">
          <h1>{city}</h1>
        </div>

        <div className="information">
          <div>
            <p id="date">Local time</p>
            <p>
              <span>{weather.description.toUpperCase()}</span>
            </p>
          </div>

          <div>
            <ul>
              <li>
                Wind speed: <span>{Math.round(weather.wind)}km/h</span>
              </li>
              <li>
                Humidity: <span>{weather.humidity}%</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <footer>
        <div className="forecast">
          <p id="day1">9:00</p>
          <img
            src="https://openweathermap.org/img/wn/01n@2x.png"
            id="icon1"
          ></img>
          <p id="temp1">
            <strong>
              <span id="temp1-max">10</span>º{" "}
            </strong>{" "}
            / <span id="temp1-min">8</span>º
          </p>
        </div>

        <div className="forecast">
          <p id="day2">12:00</p>
          <img
            src="https://openweathermap.org/img/wn/01n@2x.png"
            id="icon2"
          ></img>
          <p id="temp2">
            <strong>
              <span id="temp2-max">10</span>º{" "}
            </strong>{" "}
            / <span id="temp2-min">8</span>º
          </p>
        </div>

        <div className="forecast">
          <p id="day3">15:00</p>
          <img
            src="https://openweathermap.org/img/wn/01n@2x.png"
            id="icon3"
          ></img>
          <p id="temp3">
            <strong>
              <span id="temp3-max">10</span>º{" "}
            </strong>{" "}
            / <span id="temp3-min">8</span>º
          </p>
        </div>

        <div className="forecast">
          <p id="day4">18.00</p>
          <img
            src="https://openweathermap.org/img/wn/01n@2x.png"
            id="icon4"
          ></img>
          <p id="temp4">
            <strong>
              <span id="temp4-max">10</span>º{" "}
            </strong>{" "}
            / <span id="temp4-min">8</span>º
          </p>
        </div>

        <div className="forecast">
          <p id="day5">21:00</p>
          <img
            src="https://openweathermap.org/img/wn/01n@2x.png"
            id="icon5"
          ></img>
          <p id="temp5">
            <strong>
              <span id="temp5-max">10</span>º{" "}
            </strong>{" "}
            / <span id="temp5-min">8</span>º
          </p>
        </div>
      </footer>

      <div className="row links">
        <div className="col location">
          <a href="#" className="geolocation" id="geolocation">
            📍Geolocation
          </a>
          <p id="locationInfo"></p>
        </div>

        <div className="col">
          <p>
            <a href="https://github.com/mcosme000">Open-source code</a> by Maria
            C.
          </p>
        </div>
      </div>
    </div>
  );

  if (loaded) {
    return updatedContent;
  } else {
    return mainContent;
  }
}
