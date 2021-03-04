import React from "react";
import "./Weather.css";

import IconComponent from "./IconComponent";

export default function ForecastItem(props) {
  function getDay() {
    var time = new Date(props.forecast.dt * 1000);
    var days = [
      "Sunday",
      "Monday",
      "Thuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    return `${days[time.getDay()]}`;
  }
  return (
    <div className="forecastItem">
      <div className="date">{getDay()}</div>
      <div className="right-align">
        <div className="forecastIcon">
          <IconComponent code={props.forecast.weather[0].icon} />
        </div>
        <p>
          <span className="forecastMax">
            {Math.round(props.forecast.main.temp_max)}ºC
          </span>{" "}
          |
          <span className="forecastMin">
            {Math.round(props.forecast.main.temp_min)}ºC
          </span>
        </p>
      </div>
    </div>
  );
}
