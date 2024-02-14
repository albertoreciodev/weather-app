import { useEffect, useState } from "react";


export const useDebounce = (location: string, delay = 500) => {
  const [debouncedLocationValue, setDebounceLocationValue] = useState(location);

  useEffect(() => {
    const id = setTimeout(() => {
      console.log("setting new timeout");
      setDebounceLocationValue(location);
    }, delay);

    // Cleanup function
    return () => {
      console.log("clearing the timeout");
      clearTimeout(id);
    };
  }, [location, delay]);

  return { debouncedLocationValue };
};
