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
  //this will track if the API is loaded
  const [forecast, setForecast] = useState(null);

  function showForecast(forecast) {
    setForecast(forecast.data);
    setLoaded(true);
  }

  if (loaded) {
    console.log(forecast.list[0]);
    return "loaded";
  } else {
    //FORECAST API / 5 day / 3 hour forecast data
    const apiId = "36c8bd885e1b84703cd48d295c95399d";
    const forecastApi = `https://api.openweathermap.org/data/2.5/forecast?q=${props.city}&appid=${apiId}&units=metric`;
    axios.get(forecastApi).then(showForecast);

    return null;
  }
}
