import React, { useState } from "react";
import axios from "axios";
import "./App.css";

export default function Search() {
  let [city, setCity] = useState("");
  let [weather, setWeather] = useState("");
  let [submitted, setSubmitted] = useState(false);

  function handleSearch(event) {
    event.preventDefault();
    let units = "metric";
    let apiKey = "cf6b50b908fa2e0baca3eed8a569a5f6";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
    console.log(apiUrl);
    axios.get(apiUrl).then(showTemperature);
    setSubmitted(true);
  }
  function updateCity(event) {
    event.preventDefault();
    setCity(event.target.value);
  }
  function showTemperature(response) {
    setWeather({
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
  }
  let form = (
    <form onSubmit={handleSearch}>
      <input
        type="search"
        placeholder="Enter a city..."
        onChange={updateCity}
      />
      <input type="submit" value="Search" />
    </form>
  );

  if (submitted) {
    return (
      <div>
        {form}
        <ul>
          <li>Temperature: {Math.round(weather.temperature)}°C</li>
          <li>Description: {weather.description}</li>
          <li>Humidity: {weather.humidity}%</li>
          <li>Wind: {Math.round(weather.wind)} km/h</li>
          <li>
            {" "}
            <img src={weather.icon} alt="Weather icon" />
          </li>
        </ul>
      </div>
    );
  } else {
    return <div> {form} </div>;
  }
}
