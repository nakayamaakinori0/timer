import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  // モバイルでスクロールさせない
  if (typeof window !== "undefined") {
    document.addEventListener(
      "touchmove",
      (e) => {
        e.preventDefault();
      },
      { passive: false }
    );
  }
  return <Component {...pageProps} />;
}
