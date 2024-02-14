"use client";

import "./WeatherApp.css";
import search_icon from "../Assets/search.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";
import { WeatherIcon } from "./WeatherIcon";
import Image from "next/image";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";
import { useWeatherDataAPI } from "./useWeatherDataAPI";
export const WeatherApp = () => {
  const [location, setLocation] = useState<string>("Girona");

  const [conditions, setConditions] = useState<
    Array<{ id: number; main: string; description: string; icon: string }>
  >([]);
  const [temperature, setTemperature] = useState<string>("");
  const [humidity, setHumidity] = useState<string>("");
  const [windSpeed, setWindSpeed] = useState<string>("");

  const debouncedLocationValue = useDebounce(location, 750);
  const { data, isLoading, error } = useWeatherDataAPI(debouncedLocationValue);

  useEffect(() => {
    if (data) {
      const temperature = Math.floor(data?.main?.temp ?? 0);
      setTemperature(String(temperature));
      setHumidity(String(data.main.humidity));
      setWindSpeed(String(data.wind.speed));
      setConditions((prevConditions) => [...prevConditions, ...data.weather]);
    }
  }, [data]);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    //console.log("handleChange==========e", e);
    const searchLocation = e.target.value;
    setLocation(searchLocation);
    // console.log("handleChange==========searchLocation", searchLocation);
    // console.log("handleChange==========data", data);
  };

  const handleClick = (
    event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ): void => {
    console.log("handleClick==========searchLocation", event);
    console.log("handleClick==========data", data);

    alert("handleClick image");
    //onLocation(location)
    event.preventDefault();
  };

  return (
    //isloading
    <div className="container">
      <div className="top-bar">
        <input
          type="text"
          className="cityInput"
          placeholder="Search"
          onChange={handleChange}
        />

        <div
          className="search-icon"
          tabIndex={0}
          onClick={(event) => handleClick(event)}
        >
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
            {/* <input className="humidity-percent" type="text" value={`${windSpeed} km/h`} onChange={(e) => setWindSpeed(e.target.value)} placeholder="Search" autoFocus /> */}
            <div className="text">Wind speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};
