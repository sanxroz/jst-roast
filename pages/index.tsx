import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Footer from "../components/Footer";
import LoadingDots from "../components/LoadingDots";
import Openkey from "../components/Openkey";
import axios from "axios";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState("");
  const [generatedBios, setGeneratedBios] = useState<String>("");

  const bioRef = useRef<null | HTMLDivElement>(null);

  const scrollToBios = () => {
    if (bioRef.current !== null) {
      bioRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const prompt = `${bio}`;

  const generateBio = async (e: any) => {
    e.preventDefault();
    setGeneratedBios("");
    setLoading(true);

    const webdata = await fetch(`/api/scraper?url=${encodeURIComponent(prompt)}`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
});


    if (!webdata.ok) {
      throw new Error(webdata.statusText);
    }

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        webdata,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedBios((prev) => prev + chunkValue);
    }
    scrollToBios();
    setLoading(false);
  };

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>Twitter Bio Generator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Openkey />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
        <h1 className="sm:text-9xl text-[#efece6] text-4xl max-w-[708px] font-bold">
          Jst Roast
        </h1>
        <div className="max-w-xl w-full">
          <div className="flex mt-5 items-center space-x-1">
            <p className="text-center w-full text-[#efece6] font-medium">
              Copy your current bio .
            </p>
          </div>
          <div className="p-1.5 gap-1 mt-5 rounded-full border bg-[#333] border-[#ffffff1a] flex">
            <input
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full text-[#efece6] placeholder:text-[#aaa] bg-transparent px-3 py-2 rounded-full focus:outline-none focus:border-sky-500"
              placeholder={"Roast Me"}
            />

            {!loading && (
              <button
                className="bg-[#222] shadow-[inset_0_2px_0_0_rgb(255,255,255,10%)] border border-[#000] rounded-full text-white font-medium px-4 py-2 hover:bg-[#222] w-fit"
                onClick={(e) => generateBio(e)}
              >
                Roast
              </button>
            )}
            {loading && (
              <button
                className="bg-[#222] shadow-[inset_0_2px_0_0_rgb(255,255,255,10%)] border border-[#000] rounded-full text-white font-medium px-4 py-2 hover:bg-[#222] w-fit"
                disabled
              >
                <LoadingDots color="white" style="large" />
              </button>
            )}
          </div>
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
        <div className="space-y-10 my-10">
          {generatedBios && (
            <>
              <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                {generatedBios
                  .substring(generatedBios.indexOf("1"))
                  .split("____")
                  .map((generatedBio) => {
                    return (
                      <div
                        className="text-[#efece6] font-bold transition"
                        key={generatedBio}
                      >
                        <p>{generatedBio}</p>
                      </div>
                    );
                  })}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
