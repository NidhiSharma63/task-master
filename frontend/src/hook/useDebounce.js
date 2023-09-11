import { useState, useEffect } from "react";

const useDebounce = (value, milliSeconds) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // const handler = setInterval(() => {
    //   setDebouncedValue(value);
    //   console.log("calling....");
    // }, milliSeconds);
    // return () => {
    //   clearTimeout(handler);
    // };
  }, [value, milliSeconds]);

  return debouncedValue;
};

export default useDebounce;
