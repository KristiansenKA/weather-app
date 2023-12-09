import { useEffect, useState } from "react";

const useLocalStorage = <T,>(key: string): {
  data: T;
  setData: (data: T) => void;
} => {
  const [data, setData] = useState<T>(() => {
    const storedData = localStorage?.getItem(key);
    return storedData ? JSON.parse(storedData) : [];
  });

  useEffect(() => {
    localStorage?.setItem(key, JSON.stringify(data));
  }, [data, key]);

  return {
    data,
    setData,
  };
}

export default useLocalStorage;