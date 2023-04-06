import { useState, useEffect } from "react";

const Openkey: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedValue = localStorage.getItem("inputValue");
      setInputValue(storedValue || "");
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (typeof window !== "undefined") {
      localStorage.setItem("inputValue", newValue);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowInput(false);
  };

  const handleButtonClick = () => {
    setShowInput(true);
  };

  return (
    <div>
      {!showInput && (
        <button
          className="px-5 text-[#efece6] py-2 border border-solid border-[#00000033] rounded-full bg-[#ffffff26] shadow-[inset_0_1px_0_0_rgb(255,255,255,10%)] hover:shadow"
          onClick={handleButtonClick}
        >
          OpenAI Key
        </button>
      )}
      {showInput && (
        <form
          className="p-1.5 gap-1 rounded-full border bg-[#333] border-[#ffffff1a] flex"
          onSubmit={handleSubmit}
        >
          <input
            className="w-full border-0 text-[#efece6] placeholder:text-[#aaa] bg-transparent px-3 py-2 rounded-full focus:outline-none focus:border-0"
            id="input"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder={"Enter OpenAI key"}
          />
          <button
            className="bg-[#222] shadow-[inset_0_1px_0_0_rgb(255,255,255,10%)] border border-[#000] rounded-full text-white font-medium px-4 py-2 hover:bg-[#222] w-fit"
            type="submit"
          >
            Save
          </button>
        </form>
      )}
    </div>
  );
};

export default Openkey;
