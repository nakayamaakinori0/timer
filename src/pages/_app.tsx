import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";

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
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
