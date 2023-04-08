export function getInputValue() {
  if (typeof window !== "undefined") {
    const storedValue = localStorage.getItem("inputValue");
    console.log(storedValue); // Log the value to the console
  }
  const defaultValue = null;
  return defaultValue;
}