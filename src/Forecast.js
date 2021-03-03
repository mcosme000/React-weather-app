import React, { useState } from "react";
import axios from "axios";

//REACT COMPONENTS
import DateComponent from "./DateComponent";
import IconComponent from "./IconComponent";
import Temperature from "./Temperature";

import sunny from "./media/sunny.png";
import overcast from "./media/overcast.png";
import clouds from "./media/clouds.png";
import rain from "./media/rain.png";
import snow from "./media/snow.png";
import mist from "./media/mist.png";
import thunderstorm from "./media/thunderstorm.png";

export default function ForecastItem(props) {
  const [loaded, setLoaded] = useState(false);
  //this will track if the API is loaded
  const [forecast, setForecast] = useState(null);

  function showForecast(results) {
    setForecast(results.data);
    setLoaded(true);
  }

  if (loaded) {
    console.log(forecast);
    return (
      <div className="forecast">
        <div className="forecastItem">
          <div className="time">
            <p>{new Date(forecast.list[0].dt * 1000).getHours()}</p>
          </div>
          <div className="forecastIcon">
            <IconComponent code={forecast.list[0].weather[0].icon} />
          </div>
          <p>
            <span className="forecastMax">ºC</span> |
            <span className="forecastMin">20</span>
          </p>
        </div>
      </div>
    );
    return Math.round(forecast.list[0].main.temp);
  } else {
    //FORECAST API / 5 day / 3 hour forecast data
    const apiId = "36c8bd885e1b84703cd48d295c95399d";
    const forecastApi = `https://api.openweathermap.org/data/2.5/forecast?q=${props.city}&appid=${apiId}&units=metric`;
    axios.get(forecastApi).then(showForecast);

    return null;
  }
}
