import { useEffect, useState } from "react";

const useLocalStorage = (key, initialValue) => {
  const savedValue = JSON.parse(localStorage.getItem(key));
  const [value, setValue] = useState(savedValue || initialValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
};
export default useLocalStorage;
