import React, { useState } from "react";

export default function Temperature(props) {
  const [unit, setUnit] = useState("celsius");

  // - - - TEMPERATURE CHANGE FUNCTIONS - - - //
  function toCelsius() {
    setUnit("celsius");
  }

  function toFahrenheit(e) {
    e.preventDefault();
    setUnit("fahrenheit");
  }

  if (unit === "celsius") {
    return (
      <div className="temperature">
        <p>
          <span className="tempValue">{Math.round(props.temp)}</span>
          <span className="active"> ºC</span> |
          <a href="#" onClick={toFahrenheit}>
            {" "}
            F
          </a>
        </p>
      </div>
    );
  } else {
    return (
      <div className="temperature">
        <p>
          <span className="tempValue">
            {Math.round((props.temp * 9) / 5 + 32)}
          </span>
          <a href="#" onClick={toCelsius}>
            {" "}
            ºC{" "}
          </a>
          | <span className="active">F</span>
        </p>
      </div>
    );
  }
}

// - - - NOTES - - - //

//I create two states: one for celsius and other for F.
//In each one of those, I return the temperature in C or F
/* I only need to remember to change the state */
