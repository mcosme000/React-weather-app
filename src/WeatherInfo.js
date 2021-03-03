import React from "react";

//import components
import DateComponent from "./DateComponent";
import IconComponent from "./IconComponent";
import Temperature from "./Temperature";

export default function WeatherInfo(props) {
  return (
    <div>
      <header>
        <h1>{props.data.name}</h1>
        <div>
          <h6>{props.data.description}</h6>
          <h6>
            <DateComponent date={props.data.date} />
          </h6>
        </div>
      </header>
      <section className="main">
        <div className="icon">
          <IconComponent code={props.data.icon} />
        </div>
        <Temperature temp={props.data.temperature} />
      </section>
      <section className="weatherData">
        <div className="dataValues">
          <p>
            Humidity:
            <span> {props.data.humidity}%</span>
          </p>
          <p>
            Wind:
            <span> {Math.round(props.data.wind)}m/h</span>
          </p>
        </div>
        <div className="tempmax">
          <p>
            <span>↑ {Math.round(props.data.tempmax)}ºC</span> |
            <span> ↓ {Math.round(props.data.tempmin)}ºC</span>
          </p>
          <p>Feels like {Math.round(props.data.feelslike)}ºC</p>
        </div>
      </section>
    </div>
  );
}
