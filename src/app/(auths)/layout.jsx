import AuthLayout from "@/layouts/AuthLayout";
import "../globals.css";

export const metadata = {
  title: "Al-Busayra",
  description: "Generated by Al-Busayra",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="">
      <body className={` antialiased`}>
        <AuthLayout>{children}</AuthLayout>
      </body>
    </html>
  );
}
