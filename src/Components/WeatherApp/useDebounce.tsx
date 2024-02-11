import { useEffect, useState } from "react";

type useDebounceProps = {
  value?: string;
  delay: number;
};

export const useDebounce = (value: string, delay = 500) => {
  const [debouncedValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => {
      console.log("setting new timeout");
      setDebounceValue(value);
    }, delay);

    // Cleanup function
    return () => {
      console.log("clearing the timeout");
      clearTimeout(id);
    };
  }, [value, delay]);

  return <div>useDebounce</div>;
};
