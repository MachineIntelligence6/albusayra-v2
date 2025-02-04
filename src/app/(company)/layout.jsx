import CompanyLayout from "@/Layouts/CompanyLayout";

export const metadata = {
  title: "Al-Busayra",
  description: "Generated by Al-Busayra",
};

export default function AdminRootLayout({ children }) {
  return (
    <html lang="en" className="">
      <body className={` antialiased`}>
        <CompanyLayout>{children}</CompanyLayout>
      </body>
    </html>
  );
}
