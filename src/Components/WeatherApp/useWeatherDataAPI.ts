import { useEffect, useState } from "react";

type WeatherDataProps = {
  debouncedLocationValue: string;
};


interface DataProps {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}


export const useWeatherDataAPI = ({
  debouncedLocationValue,
}: WeatherDataProps) => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${debouncedLocationValue}&units=Metric&appid=${process.env.NEXT_PUBLIC_BASE_WEATHER_MAP_API_KEY}`;

  const [data, setData] = useState<null | undefined | DataProps>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | unknown>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(URL);
        const data:DataProps = await response.json();
        if (response.ok) {
          //console.log("useEffect data==========response ok");
          setData(data);
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (debouncedLocationValue) {
      fetchData();
    }
  }, [URL, debouncedLocationValue]);

  return { data, isLoading, error };
};
