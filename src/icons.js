import React from "react";

//ICONS
import sunny from "./media/sunny.png";
import overcast from "./media/overcast.png";
import clouds from "./media/clouds.png";
import rain from "./media/rain.png";
import snow from "./media/snow.png";
import mist from "./media/mist.png";
import thunderstorm from "./media/thunderstorm.png";

export default function Icons(props) {
  let icons = {
    "01d": sunny,
    "01n": sunny,
    "02d": overcast,
    "02n": overcast,
    "03d": clouds,
    "03n": clouds,
    "04d": clouds,
    "04n": clouds,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "11d": thunderstorm,
    "11n": thunderstorm,
    "13d": snow,
    "13n": snow,
    "50d": mist,
    "50n": mist,
  };

  return <img src={icons[props.code]} />;
}
