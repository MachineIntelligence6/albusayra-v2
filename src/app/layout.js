import localFont from "next/font/local";
import "./globals.css";
import ThemeRegistry from "./ThemeRegistry";

// Redux
import ReduxProvider from "@/redux/ReduxProvider";
import { Toaster } from "react-hot-toast";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Al-Busayra",
  description: "Generated by Al-Busayra",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="">
      <body
        className={`${geistSans.variable} ${geistMono.variable}   antialiased`}
      >
        <ReduxProvider>
          <Toaster position="top-right" />
          <ThemeRegistry>{children}</ThemeRegistry>
        </ReduxProvider>
      </body>
    </html>
  );
}
