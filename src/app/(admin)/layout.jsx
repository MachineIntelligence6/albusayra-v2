import AdminLayout from "@/layouts/AdminLayout";
import AdminProviders from "@/redux/AdminProvider";

export const metadata = {
  title: "Al-Busayra",
  description: "Generated by Al-Busayra",
};

export default function AdminRootLayout({ children }) {
  return (
    <html lang="en" className="">
      <body className={` antialiased`}>
        <AdminProviders>
          <AdminLayout>{children}</AdminLayout>
        </AdminProviders>
      </body>
    </html>
  );
}
