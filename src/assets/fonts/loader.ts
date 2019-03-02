import localFont from "next/font/local";
import { Geist, Geist_Mono, Libre_Barcode_128 } from "next/font/google";

export const circularStd = localFont({
  variable: "--font-circular",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "-apple-system", "sans-serif"],
  src: [
    {
      path: "./circularsdt/CircularStd-Book.woff2",
      style: "normal",
      weight: "400",
    },
    {
      path: "./circularsdt/CircularStd-BookItalic.woff2",
      style: "italic",
      weight: "400",
    },
    {
      path: "./circularsdt/CircularStd-Medium.woff2",
      style: "normal",
      weight: "500",
    },
    {
      path: "./circularsdt/CircularStd-MediumItalic.woff2",
      style: "italic",
      weight: "500",
    },
    {
      path: "./circularsdt/CircularStd-Bold.woff2",
      style: "normal",
      weight: "700",
    },
    {
      path: "./circularsdt/CircularStd-BoldItalic.woff2",
      style: "italic",
      weight: "700",
    },
    {
      path: "./circularsdt/CircularStd-Black.woff2",
      style: "normal",
      weight: "900",
    },
    {
      path: "./circularsdt/CircularStd-BlackItalic.woff2",
      style: "italic",
      weight: "900",
    },
  ],
});

export const libreBarcode128 = Libre_Barcode_128({
  subsets: ["latin"],
  variable: "--font-barcode",
  weight: "400",
  display: "swap",
});

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const fontVariables = `${circularStd.variable} ${geist.variable} ${geistMono.variable}`;
