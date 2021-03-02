import React, { useState } from "react";
import axios from "axios";

import sunny from "./media/sunny.png";
import overcast from "./media/overcast.png";
import clouds from "./media/clouds.png";
import rain from "./media/rain.png";
import snow from "./media/snow.png";
import mist from "./media/mist.png";
import thunderstorm from "./media/thunderstorm.png";

export default function ForecastItem(props) {
  const [loaded, setLoaded] = useState(false);
  const [forecast, setForecast] = useState(" ");

  function showForecast(forecast) {
    console.log(forecast.data);

    setForecast({
      day1: forecast.data.list[1],
    });
  }

  //FORECAST API / 5 day / 3 hour forecast data
  const apiId = "36c8bd885e1b84703cd48d295c95399d";
  const forecastApi = `https://api.openweathermap.org/data/2.5/forecast?q=${props.city}&appid=${apiId}&units=metric`;

  axios.get(forecastApi).then(showForecast);

  return (
    <div className="forecast">
      <div className="forecastItem">
        <p className="time">9.00</p>
        <div>
          <img src={sunny} />
        </div>
        <p>
          <span className="forecastMax">22</span> |
          <span className="forecastMin">20</span>
        </p>
      </div>
    </div>
  );
}
