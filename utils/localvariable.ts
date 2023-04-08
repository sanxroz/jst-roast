export function getInputValue() {
  if (typeof window !== "undefined") {
    const inputValue = localStorage.getItem("inputValue");
    return inputValue ? JSON.parse(inputValue) : null;
  }
  return null;
}
