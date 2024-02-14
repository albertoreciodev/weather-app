import clear_icon from "../Assets/weather/clear.png";
import cloud_icon from "../Assets/weather/cloud.png";
import drizzle_icon from "../Assets/weather/drizzle.png";
import rain_icon from "../Assets/weather/rain.png";
import snow_icon from "../Assets/weather/snow.png";
import clear_day_sky from "../Assets/weather/01d.png";

import clear_day from "../Assets/weather/01d.png";
import clear_night from "../Assets/weather/01n.png";
import few_clouds_day from "../Assets/weather/02d.png";
import few_clouds_night from "../Assets/weather/02n.png";
import scattered_clouds_day from "../Assets/weather/03d.png";
import scattered_clouds_night from "../Assets/weather/03n.png";
import broken_clouds_day from "../Assets/weather/04d.png";
import broken_clouds_night from "../Assets/weather/04n.png";
import shower_rain_day from "../Assets/weather/09d.png";
import shower_rain_night from "../Assets/weather/09n.png";
import rain_day from "../Assets/weather/10d.png";
import rain_night from "../Assets/weather/10n.png";
import thunderstorm_day from "../Assets/weather/11d.png";
import thunderstorm_night from "../Assets/weather/11n.png";
import snow_day from "../Assets/weather/13d.png";
import snow_night from "../Assets/weather/13n.png";
import mist_day from "../Assets/weather/50d.png";
import mist_night from "../Assets/weather/50n.png";

import Image from "next/image";

interface WeatherConditionProps {
  main: string;
  icon: string;
  description: string;
  id: number;
}

const weatherIcons: any =
  {
    Clear: { day: clear_day, night: clear_night },
    Clouds: { day: few_clouds_day, night: few_clouds_night },
    "Scattered Clouds": {
      day: scattered_clouds_day,
      night: scattered_clouds_night,
    },
    "Broken Clouds": { day: broken_clouds_day, night: broken_clouds_night },
    "Shower Rain": { day: shower_rain_day, night: shower_rain_night },
    Rain: { day: rain_day, night: rain_night },
    Thunderstorm: { day: thunderstorm_day, night: thunderstorm_night },
    Snow: { day: snow_day, night: snow_night },
    Mist: { day: mist_day, night: mist_night },
    Fog: { day: mist_day, night: mist_night },
  } || undefined;

export const WeatherIcon = ({ conditions }: any) => {
  for (const condition of conditions) {
    const { main, icon, description } = condition;
    console.log("handleChange==========weather", condition);
    const isDay = icon.endsWith("d");
    console.log("handleChange==========isDay", isDay);
    const iconName = weatherIcons[main][isDay ? "day" : "night"];
    console.log("handleChange==========iconName", iconName);
    return <Image src={iconName} alt={main} width={176} height={176} />;
  }
};
