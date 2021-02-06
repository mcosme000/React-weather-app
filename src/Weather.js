import React, { useState } from "react";
import "./Weather.css";
import axios from "axios";

export default function Weather(props) {
  const [city, setCity] = useState(" ");
  const [info, setInfo] = useState(" ");
  const [weather, setWeather] = useState("");

  function showWeather(result) {
    console.log(result.data);

    setWeather({
      temperature: result.data.main.temp,
      humidity: result.data.main.humidity,
      wind: result.data.wind.speed,
      description: result.data.weather[0].description,
    });

    setInfo(
      <div>
        <p>hola, usuario</p>
        <p>Aquí tienes el forecast para {city}: </p>
        <p>Temperature: {Math.round(weather.temperature)}ºC</p>
        <p>Humidity: {weather.humidity}%</p>
        <p>Wind: {weather.wind}km/h</p>
        <p>{weather.description}</p>
      </div>
    );
  }

  //función de SUBMIT FORM
  function formSubmit(e) {
    e.preventDefault();

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=36c8bd885e1b84703cd48d295c95399d&units=metric`;

    axios.get(apiUrl).then(showWeather);
  }

  //GET INPUT ELEMENT
  function getCity(e) {
    setCity(e.target.value);
  }

  if (setInfo) {
    return (
      <div className="Weather">
        <h1>React weather app</h1>
        <form onSubmit={formSubmit}>
          <input type="text" placeholder="Enter a city" onChange={getCity} />
          <input type="submit" value="Search" />
        </form>

        <div>{info}</div>
      </div>
    );
  } else {
    return (
      <div className="Weather">
        <h1>React weather app</h1>
        <form onSubmit={formSubmit}>
          <input type="text" placeholder="Enter a city" onChange={getCity} />
          <input type="submit" value="Search" />
        </form>
      </div>
    );
  }
}
