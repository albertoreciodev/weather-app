"use client";

import "./WeatherApp.css";
import search_icon from "../Assets/search.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";
import { WeatherIcon } from "./WeatherIcon";
import Image from "next/image";
import { ChangeEvent, useState } from "react";

export const WeatherApp = () => {
  const [location, setLocation] = useState("Girona");

  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [windSpeed, setWindSpeed] = useState("");
  const [conditions, setConditions] = useState([]);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const searchLocation = e.target.value;
    setLocation(searchLocation);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchLocation}&units=Metric&appid=${process.env.NEXT_PUBLIC_BASE_WEATHER_MAP_API_KEY}`;

    if (searchLocation.length > 3) {
      const response = await fetch(url);
      const data = await response.json();

      if (data && data !== undefined) {
        let temperature = Math.floor(data.main?.temp);
        setTemperature(String(temperature));
        setHumidity(data.main?.humidity);
        setWindSpeed(data.wind?.speed);
        setConditions(data.weather);
      }
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input
          type="text"
          className="cityInput"
          placeholder="Search"
          onChange={handleChange}
        />
        <div className="search-icon">
          <Image src={search_icon} alt="Search icon" />
        </div>
      </div>

      <div className="weather-image">
        {conditions && conditions.length > 0 && (
          <WeatherIcon conditions={conditions} />
        )}
      </div>
      <div className="weather-temp">{`${temperature} ºc`}</div>
      <div className="weather-location">{location}</div>
      <div className="data-container">
        <div className="element">
          <Image src={humidity_icon} alt="Humidity icon" className="icon" />
          <div className="data">
            <div className="humidity-percent">{`${humidity}%`}</div>
            <div className="text">Humidity</div>
          </div>
        </div>

        <div className="element">
          <Image src={wind_icon} alt="Wind icon" className="icon" />
          <div className="data">
            <div className="humidity-percent">{`${windSpeed} km/h`}</div>
            <div className="text">Wind speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};
