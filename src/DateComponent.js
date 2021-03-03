import React from "react";

export default function DateComponent(props) {
  let time = props.date;

  let weekdays = [
    "Sunday",
    "Monday",
    "Thuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let hours = time.getHours();
  let day = weekdays[time.getDay()];
  let minutes = time.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${hours}:${minutes}`;
}
