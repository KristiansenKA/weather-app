import { useEffect, useState } from "react";

const useLocalStorage = <T,>(key: string): {
  data: T | undefined;
  setData: (data: T) => void;
} => {
  const [data, setData] = useState<T>();

  useEffect(() => {
    const data = localStorage.getItem(key);
    if (data) {
      setData(JSON.parse(data));
    }
  }, [key]);

  useEffect(() => {
    data && localStorage.setItem(key, JSON.stringify(data));
  }, [data, key]);

  return {
    data,
    setData,
  };
}

export default useLocalStorage;