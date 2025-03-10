import RegistrationLayout from "@/layouts/RegistrationLayout";

export const metadata = {
  title: "Registration form",
  description: "Generated by Al-Busayra",
};

export default function RegistrationFormLayout({ children }) {
  return (
    <html lang="en" className="" key={"auth-layout"}>
      <body className={` antialiased`}>
        <RegistrationLayout>{children}</RegistrationLayout>
      </body>
    </html>
  );
}
