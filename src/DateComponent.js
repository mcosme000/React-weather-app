import React from "react";

export default function DateComponent(props) {
  let weekdays = [
    "Sunday",
    "Monday",
    "Thuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = weekdays[props.date.getDay()];
  let hours = props.date.getHours();
  let minutes = props.date.getMinutes();
  let time = "";

  if (hours > 12) {
    time = "PM";
  } else {
    time = "AM";
  }

  if (hours < 10) {
    hours = `0${hours} AM`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${hours}:${minutes} ${time}`;
}
