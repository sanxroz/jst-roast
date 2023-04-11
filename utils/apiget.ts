import { useState, useEffect } from "react";

type InputValue = string | null;

export function useInputValue(): InputValue {
  const [inputValue, setInputValue] = useState<InputValue>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedValue = localStorage.getItem("inputValue");
      setInputValue(storedValue);
    }
  }, []);

  return inputValue;
}
