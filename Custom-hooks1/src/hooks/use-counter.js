import { useState, useEffect } from "react";

const useCounter = (initialVal, countOrder) => {
  const [counter, setCounter] = useState(initialVal);

  const increment = countOrder === 'ASC' ? 1 : -1

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => prevCounter + increment);
    }, 1000);

    return () => clearInterval(interval);
  }, [increment]);

  return counter;
};
export default useCounter;
