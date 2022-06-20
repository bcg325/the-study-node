import { useEffect, useState } from "react";

const useLocalStorage = (key, initialValue) => {
  const savedValue = localStorage.getItem(key);
  const [value, setValue] = useState(
    savedValue ? JSON.parse(savedValue) : initialValue
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};
export default useLocalStorage;
