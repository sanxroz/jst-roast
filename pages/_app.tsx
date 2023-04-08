import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from "next/app";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <div className="z-[-2] bg-[length:1440px_100%] bg-top bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#6633ee] via-black to-black top-0 left-0 right-0 w-full h-full fixed"></div>
      <div className="z-[-1] opacity-50 top-0 left-0 right-0 w-full h-full fixed bg-no-repeat bg-top bg-[url(/Button-test.png)]"></div>
      <Component {...pageProps} />
      <Analytics />
    </div>
  );
}

export default MyApp;
