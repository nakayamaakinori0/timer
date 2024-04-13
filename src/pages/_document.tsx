import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="icon"
          type="image/svg+xml"
          href="/assets/images/favicon.svg"
        ></link>
        <link
          rel="icon"
          type="image/png"
          href="/assets/images/favicon.png"
        ></link>
        <link rel="manifest" href="/manifest.json"></link>
        <link rel="apple-touch-icon" href="/icon.png"></link>
        <meta name="theme-color" content="#fff"></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
