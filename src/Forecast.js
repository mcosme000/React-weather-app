import React, { useState } from "react";
import axios from "axios";

//REACT COMPONENTS
import ForecastItem from "./ForecastItem";

export default function Forecast(props) {
  const [loaded, setLoaded] = useState(false);
  //this will track if the API is loaded
  const [forecast, setForecast] = useState(null);

  function showForecast(results) {
    setForecast(results.data); //returns an array of 40 items
    setLoaded(true);
  }

  if (loaded) {
    console.log(`${forecast.city.name} is the same as ${props.city}`);
    return (
      <div className="forecast">
        <ForecastItem forecast={forecast.list[8]} />
        <ForecastItem forecast={forecast.list[16]} />
        <ForecastItem forecast={forecast.list[24]} />
        <ForecastItem forecast={forecast.list[32]} />
        <ForecastItem forecast={forecast.list[39]} />
      </div>
    );
  } else {
    //FORECAST API / 5 day / 3 hour forecast data
    const apiId = "36c8bd885e1b84703cd48d295c95399d";
    const forecastApi = `https://api.openweathermap.org/data/2.5/forecast?q=${props.city}&appid=${apiId}&units=metric`;
    axios.get(forecastApi).then(showForecast);

    return null;
  }
}
